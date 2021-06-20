# [Effective TypeScript](https://book.douban.com/subject/34893998/)

## 1. Understand the Relationship Between TypeScript and JavaScript

TypeScript 是 JavaScript 的超集

## 2. Know Which TypeScript Options You're Using

TypeScript提供了可以影响语言层面的配置，比如 noImplicitAny strictNullChecks。显然要选择尽可能严格的配置。

## 3. Understand That Code Generation Is Independent of Types

代码生成和类型检查是独立的。

* 类型报错也可以生成代码
* 运行时没有TS类型
* 断言类型不影响运行时类型
* 运行时类型和声明的类型可能不一致
* 不支持静态重载，只支持类型签名实现重载
* TS类型不影响运行时性能

## 4. Get Comfortable with Structural Typing

JS是鸭子类型，TS通过结构化类型对此进行描述。子类型不一定通过extends(继承)实现，只要结构满足依然视为子类型。

## 5. Limit Use of the any Type
