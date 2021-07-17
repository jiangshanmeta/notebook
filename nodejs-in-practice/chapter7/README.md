# 网络：Node真正的 Hello World

## TCP 客户端和服务端

### 技巧45 创建TCP服务端和客户端

想启动自己的TCP服务，绑定一个端口，通过网络发送数据，可以使用net.createServer创建一个服务，然后调用server.listen绑定到一个端口。[服务端demo](./tcp-server.js)

```javascript
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
```

### 技巧46 使用客户端测试TCP服务端

[demo](./tcp-client.js)

```javascript
const assert = require('assert');
const net = require('net');
let clients = 0;
let expectedAssertions = 2;

const server = net.createServer((client)=>{
    clients++;
    const clientId = clients;
    console.log('client connected',clientId);
    client.on('end',()=>{
        console.log('client disconnected',clientId);
    });
    client.write(String(clientId));
    client.pipe(client);
});

server.listen(8000,()=>{
    console.log('server started at 8000');
    runTest(1,()=>{
        runTest(2,()=>{
            console.log('done')
            assert.strictEqual(expectedAssertions,0);
            server.close();
        });
    })
})

function runTest(expectedId,done){
    // 作为tcp客户端连接
    const client = net.connect(8000);
    client.on('data',(data)=>{
        assert.strictEqual(data.toString(),expectedId.toString());
        expectedAssertions--;
        client.end();
    });
    client.on('end',done);
}
```

### 技巧47 改进实时性低的应用

Nagle算法会把小段信息缓冲，然后组装成大数据块一起发送，这样可以减少网络拥塞，但是因为引入了缓冲区，所以实时性比较差。可以通过```setNoDelay```取消这一行为。

```javascript
const net = require('net');
const server = net.createServer((client)=>{
    client.setNoDelay(true);
    // 服务逻辑
});

server.listen(8000);
```

## UDP客户端和服务端

### 技巧48 通过UDP传输文件

```javascript
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
```

### 技巧49 UDP客户端服务应用

把消息发回给客户端 [demo](./udp-back.js)

## HTTP 客户端和服务端

### 技巧50 HTTP服务器

可以参用http模块创建http服务，也可以发起http请求。[demo](./http-server.js)

```javascript
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
```

### 技巧51 重定向

### 技巧52 HTTP代理

http模块本身就既可以作为服务端，也可以作为客户端发起请求

[demo](./http-proxy.js)

## 创建DNS请求

### 技巧53 创建DNS请求

```javascript
const dns = require('dns');

dns.resolve('www.manning.com',(err,address)=>{
    if(err){
        console.error('Error',err);
        return;
    }
    console.log('addresses: ',address)
});
```

## 加密
