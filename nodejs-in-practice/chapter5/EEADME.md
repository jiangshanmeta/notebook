# 流: 最强大和最容易误解的功能

## 内置流

### 技巧27 使用内置流实现静态web服务器

```javascript
const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

http.createServer(function(req,res){
    res.writeHeader(200,{
        'content-encoding':'gzip',
    });
    // 使用createReadStream 而不是 readFile 对内存压力小 可以读取一点处理一点
    fs.createReadStream(__dirname + '/index.html')
        // 管道处理 gzip
        .pipe(zlib.createGzip())
        // 响应给客户端
        .pipe(res);

}).listen(8000);

```

### 技巧28 流的错误处理

想要获取流产生的错误，可以添加一个对错误的监听器(毕竟继承自EventEmitter)

```javascript
const fs = require('fs');
const stream = fs.createReadStream('not-found');

stream.on('error',()=>{
    console.trace();
})

```
