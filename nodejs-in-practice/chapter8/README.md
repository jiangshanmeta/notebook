# 子进程：利用Node整合外部应用程序

## 执行外部应用程序

### 技巧56 执行外部应用程序

最基本的执行外部应用程序。[demo](./execFile.js)

```javascript
const cp = require('child_process');
// 调用echo命令
cp.execFile('echo',['hello','world'],(err,stdout,stderr)=>{
    if(err){
        console.error('err',err);
    }
    // echo命令的输出 stdout或者stderr
    console.log('stdout',stdout);
    console.log('stderr',stderr);
});
```

### 技巧57 流和外部应用程序

执行外部程序并得到相应的输出流，可以使用spawn.[demo](./spawn.js)

```javascript
const cp = require('child_process');
const child = cp.spawn('echo',['hello','world']);
// stream
child.on('error',console.error);
child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);
```

在此基础上，我们可以模仿pipeline. [demo](./pipeline.js)

```javascript
const cp = require('child_process');
const cat = cp.spawn('cat',['messy.txt'])
const sort = cp.spawn('sort');
const uniq = cp.spawn('uniq');

cat.stdout.pipe(sort.stdin);
sort.stdout.pipe(uniq.stdin);
uniq.stdout.pipe(process.stdout);
```

### 技巧58 在shell中执行命令

使用exec执行shell命令.[demo](./shell.js)

```javascript
const cp = require('child_process');
cp.exec('cat messy.txt | sort | uniq',(err,stdout,stderr)=>{
    console.log(stdout)
})
```

### 技巧59 分离子进程

一般情况下，父进程终结，所有子进程都会被终结。子进程被认为是附加到父进程上的。但是spawn可以分离一个子进程，使得子进程和父进程拥有相同的级别，这样父进程终结，子进程会继续执行直到自己终结。

```javascript
const child = cp.spawn('./longrun',[],{detached:true})
```

通过设置detached为true，子进程升级为自己的进程组头。

但是这样子进程中断前，父进程会一直活跃，这是因为子进程的I/O和父进程是相互连接的。要处理子进程的I/O与父进程的连接，可以配置stdio参数。

stdio 支持字符串和数组形式。默认值为 'pipe', 等价于```['pipe','pipe','pipe']```,三个参数分别对应子进程的stdin stdout stderr。

可以直接采用```ignore```参数忽略这个流，也可以把I/O指向其他地方。

```javascript
const fs = require('fs');
const cp = require('child_process');

const outFd = fs.openSync('./longrun.our','a');
const errFd = fs.openSync('./longrun.err','a');

const child = cp.spawn('./longrun',[],{
    detached:true,
    // 不需要提供输入给子进程 子进程输出到文件 这样父子进程I/O切断
    stdio:['ignore',outFd,errFd]
});

```

还有一点小问题，父进程依然会有对子进程的引用，子进程不中断父进程也不会中断

```javascript
// 移除子进程在父进程的引用
child.unref();
```

## 执行Node 程序

### 技巧60 执行Node程序

在UNIX平台下，在文件开始添加```#!/usr/bin/env node```，即可作为可执行程序。

### 技巧61 Forking Node 模块

Node本身是单线程的，计算任务直接影响进程的性能，可以使用fork的进程运行计算任务。

```javascript
// 主进程
const cp = require('child_process');
const child = cp.fork('./myChild',{silent:true});
// 接受child的消息
child.on('message',(msg)=>{
    console.log(`get msg from child`,msg);
});
// 发送消息给child
child.send('data from main');
// 从fork的Node模块中断连接
child.disconnect();


// myChild
// 接受消息
process.on('message',(msg)=>{
    // 发送消息
    process.send(`${msg} received`)
});

```
