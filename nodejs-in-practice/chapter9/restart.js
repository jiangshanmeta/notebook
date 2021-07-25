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