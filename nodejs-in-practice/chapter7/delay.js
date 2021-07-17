const net = require('net');
const server = net.createServer((client)=>{
    client.setNoDelay(true);
    // 服务逻辑
});

server.listen(8000);