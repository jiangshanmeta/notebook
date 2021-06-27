# [Effective TypeScript](https://book.douban.com/subject/34893998/)

## Getting to Know TypeScript

### 1. Understand the Relationship Between TypeScript and JavaScript

TypeScript 是 JavaScript 的超集

### 2. Know Which TypeScript Options You're Using

TypeScript提供了可以影响语言层面的配置，比如 noImplicitAny strictNullChecks。显然要选择尽可能严格的配置。

### 3. Understand That Code Generation Is Independent of Types

代码生成和类型检查是独立的。

* 类型报错也可以生成代码
* 运行时没有TS类型
* 断言类型不影响运行时类型
* 运行时类型和声明的类型可能不一致
* 不支持静态重载，只支持类型签名实现重载
* TS类型不影响运行时性能

### 4. Get Comfortable with Structural Typing

JS是鸭子类型，TS通过结构化类型对此进行描述。子类型不一定通过extends(继承)实现，只要结构满足依然视为子类型。

### 5. Limit Use of the any Type

## TypeScript't Type System

### 6. Use Your Editor to Interrogate and Explore the Type System

### 7. Think of Types as Sets of Values

把类型当做值的集合思考

```typescript
type A= 'A' // 单值集合 { 'A' }
type B= 'B' // 单值集合 { 'B' }
type AB = 'A' | 'B'  // 集合的并集 { 'A', 'B' }
type twoInt =  2 | 4 | 5 ... // 无限元素集合 { 1,2,3,4}
type threeInt = 3 | 6 | 9 // 无限集合
type twoIntersectThreeInt = twoInt & threeInt // 无限集合的交集
type twoUnionThreeInt = 2| 3 | 4 | 6 ... // 无限集合的并集
keyof (A&B) = (keyof A) | (keyof B)
keyof (A|B) = (keyof A) & (keyof B)
```

| Typescript术语 |       集合术语          |
| :----------:  | :-------------------:  |
| never         |  空集 |
| literal type | 单值集合 |
| value 可赋值给 T | value ∈ T |
| T1 assignable to T2  | T1是T2的子集 |
| T1 extends T2  | T1是T2的子集 |
| T1丨T2 | T1和T2的并集 |
| T1 & T2  | T1 和T2的交集 |
| unknown | universal set |

### 9. Prefer Type Declarations to Type Assertions

### 10. Avoid Object Wrapper Types(String,Number,Boolean,Symbol,BigInt)

### 12. Apply Types to Entire Function Expressions When Possible

一个典型例子是React开发函数式组件，官方提供React.FC类型，开发时写函数表达式。

### 13. Know the Differences Between type and interface

inteface无法应用于union type | intersection type | conditional type | tuple

```typescript
type AorB = 'A' | 'B'
type NamedVariable = (Input | Output) & { name: string}
type IS<T,U> = T extends U?true:false
type Pair = [number,number]
```

interface 可以augumented(合并),而type不可以

## Type Inference

### 19. Avoid Cluttering Your Code with Inferable Types

避免对简单的可推导类型进行标注，TypeScript可以自动推导,而且后期改动的时候要改的地方也少。

常见的需要手动标注类型的场景：

* 函数参数和返回值类型。(ts规则 noImplicitAny 参数需要标注，不能有隐式any； eslint规则 explicit-function-return-type 函数需要标明返回值类型 )
* 对象字面量(抽出interface利于复用，还可以辅助检查拼写错误(新鲜对象字面量类型) )，空数组(默认是 any[])

### 20. Use Different Variables for Different Types

在JavaScript中可以把不同类型的值赋给同一个变量，这是一个非常坏的习惯。

* 变量值改变，类型尽可能不变。
* 不同类型的值应该赋给不同的变量。

### 21. Understand Type Widening

当使用一个常量初始化变量但是没有声明类型时，TS需要根据初始值决定类型，决定的类型通常会比常量类型要宽。比如```let a = 1```，TS认为a的类型时number，而初始值的类型是1。

通常限制类型断定宽化有这么几种方式：

* 使用const声明变量
* 声明类型
* 使用const断言

### 22. Understand Type Narrowing

通常类型收窄是我们主动编码的结果，有以下常见方式：

* 条件判断if typeof in instanceof 相等判断 不相等判断
* 可辨识联合类型 (通过 可辨识字段)
* 自定义类型守卫 (返回类型 x is y)

### 23. Create Objects All at Once

定义一个对象时，尽可能一次性把属性声明完，这样对于TS类型推导有利，动态加属性 TS可能会报错。

如果需要动态加属性，推荐使用spread operator：

```typescript
const a = {a:1}
const b = {b:2}
const ab = {...a,...b}
```

对于条件性添加属性，为了类型安全，可以在null或者{}上使用spread operator。

```typescript
const hasMiddle = Math.random()>0.5;
const firstLast = {first:'First',last:'last'}
const name = {...firstLast,...(hasMiddle?{middle:'M'}:{})}
```

name此时的类型为：

```typescript
type name = {
    first:string;
    last:string;
} | {
    first:string;
    last:string;
    middle:string;
}
```

然而想要的是middle可选而不是联合类型

```typescript
// 处理可选类型
function addOptional<T extends object,U extends object>(a:T,b:U | null):T & Partial<U>{
    return {...a,...b}
}
const name = addOptional(firstLast,hasMiddle?{middle:'M'}:null)
```

### 24. Be Consistent in Your Use of Aliases

```typescript
interface Whatever {
    str?:string;
}

const obj:Whatever = {
    str:'meow'
}
// str 是 obj.str的别名
const str = obj.str;
if(obj.str){
    // obj.str 现在是string类型
    // str 是 string | undefined类型
    // 这就是为什么当使用别名和类型收窄时 别名要一致
}
```

### 25. Use async Functions Instead of Callbacks for Asynchronous Code

### 26. Understand How Context Is Used in Type Inference

类型推断和上下文有关。一般而言，TS推断变量的类型是根据变量被引入时，而不是使用时，通常伴随着之前的Type Widening现象。

### 27. Use Functional Constructs and Libraries to Help Types Flow

## Type Design

### 28. Prefer Types That Always Represent Valid States

避免使用一个类型多个变量建模状态，用可辨识的多个类型联合建模状态。

### 29. Be Liberal in What You Accept and Strict in What You Produce

对入参宽松(支持多种类型参数)，对出参严格(统一格式)

### 30. Don't Repeat Type Infomation in Document

### 31. Push Null Values to the Perimeter of Your Type

* Avoid designs in which one value being null or not null is implicitly related to another value being null or not null
* Push null values to the perimeter of your API by making larger objects either null or fully non-null. This will make code clearer both for human readers and for the type checker.
* Consider creating a fully non-null class and constructing it when all values are available.

### 32. Prefer Unions of Interfaces to Interfaces of Unions

考虑下述类型定义

```typescript
interface Layer {
  layout: FillLayout | LineLayout | PointLayout;
  paint: FillPaint | LinePaint | PointPaint
}
```

这样设计的类型很难关联layout和对应的paint,重构如下

```typescript
interface FillLayer {
  type: 'fill',
  layout: FillLayout,
  paint: FillPaint
}
interface LineLayer {
  type: 'line',
  layout: LineLayout,
  paint: LinePaint
}
interface PointLayer {
  type: 'paint',
  layout: PointLayout,
  paint: PointPaint
}

type Layer = FillLayer | LineLayer |PointLayer
```

和28类似，都是使用可辨识联合类型，处理有关联的多个字段。

### 33. Prefer More Precise Alternatives to String Types

### 34. Prefer Incomplete Types to Inaccurate Types

### 35. Generate Types from APIs and Specs, Not Data

### 36. Name Types Using the Language of Your Problem Domain

### 37. Consider "Brands" for Norminal Typing

TS时结构化类型而不是名义类型，模拟名义类型可以参考[Simulating Nominal Types](https://react-typescript-cheatsheet.netlify.app/docs/basic/troubleshooting/types/#simulating-nominal-types)

```typescript
type OrderID = string & { readonly brand: unique symbol };
type UserID = string & { readonly brand: unique symbol };
type ID = OrderID | UserID;

function OrderID(id: string) {
  return id as OrderID;
}
function UserID(id: string) {
  return id as UserID;
}

function queryForUser(id: UserID) {
  // ...
}
queryForUser(OrderID("foobar")); // Error, Argument of type 'OrderID' is not assignable to parameter of type 'UserID'

```

## Working with any

### 38. Use the Narrowest Possible Scope for any Types

尽可能缩小any的影响范围：

```typescript
function f1(){
  const x: any = expressionReturningFoo(); // 不建议,后续的x都是any了 如果f1返回x any会影响到其他函数
  processBar(x)
}

function f2(){
  const x = expressionReturningFoo();
  processBar(x as any) // 建议，只有这里是any 后续x依然是Foo类型
}

```

对于对象：

```typescript
const config1:Config = {
  a:1,
  b:2,
  c:{
    key:'1',
    // 缺少foo属性
  }
} as any // 不推荐 因为只想不处理c属性，其他的属性还要类型校验

const config2:Config = {
  a:1,
  b:2,
  c:{
    key:'1'
  } as any // 推荐 any范围限于c
}
```

### 39. Prefer More Precise Variants of any to Plain any

虽说用any，也要有个下限。比如知道是数组，可是使用```any[]```；知道是对象，可以使用```{[x:string]:any}```；知道是函数，可以使用```(...args:any[])=>any```。
