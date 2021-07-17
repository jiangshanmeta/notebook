const http = require('http');
const url = require('url');

http.createServer((req,res)=>{
    console.log('start request:',req.url);
    const options = url.parse(req.url);
    options.headers = req.headers;
    // 作为客户端请求
    const proxyReq = http.request(options,(proxyRes)=>{
        proxyRes.on('data',(chunk)=>{
            console.log('proxy length',chunk.length);
            res.write(chunk,'binary');
        });
        proxyRes.on('end',()=>{
            console.log('proxy end');
            res.end();
        });

        res.writeHead(proxyRes.statusCode,proxyRes.headers);
    });

    req.on('data',(chunk)=>{
        console.log('in request length',chunk.length);
        // 转发请求
        proxyReq.write(chunk,'binary');
    });
    req.on('end',()=>{
        proxyReq.end();
    });

}).listen(8000);