const cp = require('child_process');
const child = cp.fork('./myChild',{silent:true});
// 接受child的消息
child.on('message',(msg)=>{
    console.log(`get msg from child`,msg);
});
// 发送消息给child
child.send('data from main');
// 从fork的Node模块中断连接

setTimeout(()=>{
    child.disconnect();
},1000)

