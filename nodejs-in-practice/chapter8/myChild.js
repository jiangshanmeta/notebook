process.on('message',(msg)=>{
    // 发送消息
    process.send(`${msg} received`)
});