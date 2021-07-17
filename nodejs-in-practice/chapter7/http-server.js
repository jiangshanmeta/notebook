const http = require('http');

const server = http.createServer((req,res)=>{
    res.writeHead(200,{
        'Content-Type':'text/plain',
    });
    res.write('Hello, world \r\n');
    res.end();
});

server.listen(8000,()=>{
    console.log('listening on port 8000');
})
// 作为http 客户端发起请求
const req = http.request({port:8000},(res)=>{
    console.log('HTTP headers',res.headers);
    res.on('data',(data)=>{
        console.log('Body:',data.toString());
        server.unref()
    });
});
req.end()