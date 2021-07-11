# Events: 玩转EventEmitter

## 基础用法

### 技巧19 从EventEmitter继承

一个基本的从EventEmitter继承的例子可以参考[inherit.js](./inherit.js),不过现在继承应该统一成class的extends了吧。

### 技巧20 混合EventEmitter

说白了就是把EventEmitter原型上的方法merge过来，有点mixin的味道了

## 异常处理

### 技巧21 管理异常

对error事件添加一个监听器。

### 技巧22 通过domains管理异常

利用Node提供的domain模块管理异常

## 高级模式

### 技巧23 反射

要追踪监听器何时被添加，EventEmitter发出一个特殊的事件叫newListener。监听了这个事件的监听器会接收到事件的名称以及监听器的方法。

### 技巧24 探索EventEmitter

许多模块都是基于EventEmitter

### 技巧25 组织事件名称

事件太多，可以用一个对象存放所有的事件名称，统一存放事件。

## 第三方模块以及扩展

### 技巧26 EventEmitter的替代方案
