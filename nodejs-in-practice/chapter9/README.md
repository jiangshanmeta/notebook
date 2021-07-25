# 网络: 构建精简的网络应用

## 技巧64 快速的静态网站服务器

## 技巧65 在Node中使用DOM

例如cheerio解析HTML

## 技巧66 在浏览器使用Node模块

例如使用browserify转换语法。

## 技巧68 自动重启服务器

```javascript
const fs = require('fs');
const exec = require('child_process').exec;

function watch(){
    // 启动服务器进程
    const child = exec('node server.js');
    // 监听文件变化
    const watcher = fs.watch(__dirname+'/server.js',()=>{
        console.log('file change');
        // 关闭服务器
        child.kill();
        // 关闭监听器
        watcher.close();
        // 重启服务
        watch();
    });
}

watch();
```

上面只是个基本的思路，通常可以使用nodemon。

## 技巧69 配置web应用

配置文件

## 技巧70 优雅地处理错误

对于Express这样的框架，可以在业务逻辑把错误都next抛出去，在一个中间件统一处理

## 技巧73 使用事件进行解耦
