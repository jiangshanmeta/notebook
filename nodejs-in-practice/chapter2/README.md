# 全局变量: Node环境

## 模块

### 技巧1 安装与加载模块

### 技巧2 创建及管理模块

可以通过```require.resolved(id)```判断node具体加载了哪个模块

一个模块被加载后，将会被缓存，多次加载它将会返回同一个对象。可以通过```delete require.cache(require.resolve(id))```删除缓存

### 技巧3 加载一组相关的模块

希望把一个目录下的相关文件结合起来，只通过一个require加载这些模块，可以创建一个index.js文件来加载各个模块并把它们一起导出。

### 技巧4 使用路径

使用__dirname和__filename

## 标准I/O以及console对象

### 技巧5 标准I/O流的读写

使用process.stdin和process.stdout

### 技巧6 打印日志消息

console.log和console.info将写入process.stdout, console.warn和console.error将写入process.stderr

### 技巧7 基准测试

console.time和console.timeEnd记录时间，然而是基于Date.now计量时间，精确到毫秒，用这个做基准性能测试应该不太够用。

## 操作系统与命令行

### 技巧8 获取平台信息

获取处理器架构 process.arch (当前电脑是 x64)

获取操作系统 process.platform (当前电脑是 linux)

获取当前进程内存使用情况 process.memoryUsage()

### 技巧9 传递命令行参数

使用process.argv

### 技巧10 退出程序

使用```process.exit(num)```退出程序，默认退出码为0，表示正常退出，任何非0退出码被认为是错误

### 技巧11 响应信号量

process对象是一个EventEmitter对象，因此可以对它添加监听器。

## 使用timer延迟执行

### 技巧12 通过setTimeout延迟函数执行

### 技巧13 通过定时器定时调用回调函数

### 技巧14 安全的操作异步接口

process.nextTick
