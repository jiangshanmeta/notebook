const net = require('net');

let clients = 0;

// 创建服务
const server = net.createServer((client)=>{
    clients++;
    const clientId = clients;
    console.log('clinet connected:',clientId);
    // 失去连接
    client.on('end',()=>{
        console.log('client disconnected',clientId);
    });
    // 输出信息
    client.write('Welcome client:'+clientId + ' rn');
    // 通过pipline返回
    client.pipe(client);
});
// 监听端口
server.listen(8000,()=>{
    console.log('start server at 8000');
});