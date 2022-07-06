# 模块机制

## Node的模块实现

在Node中引入模块，需要经历如下3个步骤：

* 路径分析
* 文件定位
* 编译执行

### 路径分析

require()方法接受一个标识符作为参数。模块标识符在Node中主要分为以下几类：

* 核心模块，如http、fs。
* .或..开始的相对路径文件模块
* 以/开始的绝对路径文件模块
* 非路径形式的文件模块，比如各种自定义模块。

核心模块的优先级仅次于缓存加载，它在Node的源代码编译过程中已经编译为二进制代码，其加载过程最快。如果试图加载一个与核心模块标识符相同的自定义模块，那是不会成功的，必须选择一个不同的标识符。

相对路径模块和绝对路径模块，在分析文件模块时，require()方法会将路径转为真实路径，并以真实路径作为索引，将编译执行的结果放在缓存中。

自定义模块会沿着模块路径逐级向上查找，查找每一级目录下的node_modules目录。自定义模块加载最慢

### 文件定位

require()在分析标识符的过程中，会出现标识符中不包含文件扩展名的情况。Node会按照.js、.json、.node的次序补足扩展名，依次尝试。在尝试过程中，需要调用fs模块同步阻塞地判断文件是否存在。因为Node是单线程的，所以这里是一个会引起性能问题的地方。

require()通过分析文件扩展名后，可能没有找到对应的文件，但是却得到了一个目录，此时Node会把目录当做一个包来处理。先会查找package.json文件，从中取出main属性指定的文件名进行定位。如果main属性指定的文件名错误，或者没有package.json文件，Node会把index当做默认文件名，然后依次查找index.js、index.json、index.node。

### 模块编译

在Node中，每个文件模块都是一个对象，定义如下：

```javascript
function Module(id,parent){
    this.id = id;
    this.exports = {};
    this.parent = parent;
    if(parent && parent.children){
        parent.children.push(this);
    }

    this.filename = null;
    this.loaded = false;
    this.children = [];
}
```

定位到具体的文件后，Node会新建一个模块对象，然后根据路径载入并编译。对于不同的文件扩展名，具体载入的方法也不同：

* js文件，通过fs模块同步读取文件后编译执行
* node文件，这是用C/C++编写的扩展文件，通过dlopen()加载最后编译生成的文件
* json文件，通过fs模块同步读取文件，用JSON.parse()解析返回结果

每一个编译成功的模块都会将其文件路径作为索引缓存在Modele._cache对象上，提高二次引入的性能。
