const dgram = require('dgram');
const fs = require('fs');
const port = 41230;
const defaultSize = 16;
// 客户端
function Client(remoteIP){
    // 读取当前文件
    const inStream = fs.createReadStream(__filename);
    const socket = dgram.createSocket('udp4');
    // 文件可读后发送内容
    inStream.on('readable',()=>{
        sendData();
    })

    function sendData(){
        const message = inStream.read(defaultSize);
        if(!message){
            return socket.unref();
        }
        socket.send(message,0,message.length,port,remoteIP,()=>{
            sendData();
        });
    }
}
// 服务端
function Server(){
    const socket = dgram.createSocket('udp4');
    // 接受内容 然后输出
    socket.on('message',(msg)=>{
        process.stdout.write(msg.toString());
    });

    socket.on('listening',()=>{
        console.log('server ready',socket.address());
    });
    socket.bind(port)
}

if(process.argv[2] === 'client'){
    new Client(process.argv[3]);
}else{
    new Server();
}

