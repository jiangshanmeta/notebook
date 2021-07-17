const assert = require('assert');
const dgram = require('dgram');
const fs = require('fs');
const defaultSize = 16;
const port = 41234;

function Client(remoteIP){
    const socket = dgram.createSocket('udp4');
    const readline = require('readline');
    const rl = readline.createInterface(process.stdin,process.stdout);
    socket.send(new Buffer('<JOIN>',0,6,port,remoteIP));

    rl.setPrompt('Message> ');
    rl.prompt();

    rl.on('line',(line)=>{
        sendData(line);
    }).on('close',()=>{
        process.exit(0)
    });

    socket.on('message',(msg,rinfo)=>{
        console.log(`\n<${rinfo.address}>`,msg.toString());
        rl.prompt();
    })

    function sendData(message){
        socket.send(new Buffer(message),0,message.length,port,remoteIP,()=>{
            console.log('Sent: ',message);
            rl.prompt()
        });
    }

}

function Server(){
    const clients = {};
    const server = dgram.createSocket('udp4');
    server.on('message',(msg,rinfo)=>{
        const clientId = `${rinfo.address}:${rinfo.port}`;
        msg = msg.toString();
        if(!clients[clientId]){
            clients[clientId] = rinfo;
        }
        if(msg.match(/^</)){
            console.log('Control message',msg);
            return;
        }
        for(let client in clients){
            if(client !== clientId){
                client = clients[client];
                server.send(new Buffer(msg,0,msg.length,client.port,client.address,(err,bytes)=>{
                    if(err){
                        console.error(err);
                        return;
                    }
                    console.log('Bytes snet:',bytes);
                }))
            }
        }
        server.on('listening',()=>{
            console.log('server ready:',server.address())
        });
        server.bind(port);
    });
}

module.exports = {
    Client:Client,
    Server:Server
}