# [Effective TypeScript](https://book.douban.com/subject/34893998/)

## Getting to Know TypeScript

### 1. Understand the Relationship Between TypeScript and JavaScript

* TypeScript 是 JavaScript 的超集
* TypeScript添加了一个类型系统，该类型系统可对JavaScript的运行时行为进行建模，并尝试发现运行时引发异常的代码

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

* JS是鸭子类型，TS通过结构化类型对此进行描述。子类型不一定通过extends(继承)实现，只要结构满足依然视为子类型。
* TypeScript类型不是“密封的”，一个满足特定interface的值可能会有额外的属性，所以遍历对象很难做到类型正确。

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

### 8. Know How to Tell Whether a Symbol Is in the Type Space or Value Space

TS中一个符号可以属于Type Space或者Value Space，也可以同时处于Type Space和Value Space

class和enum同时存在于Value Space和Type Space。对于class，既可以作为类型，也可以作为构造函数。enum本身就代表了类型，其编译后对应枚举对象(不用const修饰的情况下)

typeof总是对值进行操作，但是在Type Space返回类型，在Value Space返回js的类型。

### 9. Prefer Type Declarations to Type Assertions

### 10. Avoid Object Wrapper Types(String,Number,Boolean,Symbol,BigInt)

### 11. Recognize the Limits of Excess Property Checking

When you assign an object literal to a variable or pass it as an argument to a function,it undergoes excess property checking.

TS会根据这个对象字面量生成一个新鲜对象字面量类型(Fresh Object Literal Type),与变量类型进行比较。

因为是新鲜对象字面量类型，所以可以通过一个中间变量绕过去

```typescript
interface Point {
  x: number;
  y: number;
}
// 中间变量
const tmp = {
  x:1,
  y:2,
  z:3 
}
const point:Point= tmp; // 不报错
```

### 12. Apply Types to Entire Function Expressions When Possible

一个典型例子是React开发函数式组件，官方提供React.FC类型，开发时写函数表达式。

### 13. Know the Differences Between type and interface

inteface无法应用于union type | intersection type | mapped type | conditional type | tuple

```typescript
type AorB = 'A' | 'B'
type NamedVariable = (Input | Output) & { name: string}
type IS<T,U> = T extends U?true:false
type Pair = [number,number]
```

interface 可以augumented(合并),而type不可以

### 14. Use Type Operations and Generics to Avoid Repeating Yourself

DRY原则的类型版本。通过extends/intersection type/union type/ keyof / typeof / mapped type / generic type 等操作减少重复

### 15. Use Index Signatures for Dynamic Data

一般无法提前约定，只能在runtime获取的属性，采用索引签名进行建模。其他情况能用更精准类型就用更精准类型。

### 16. Prefer Arrays, Tuples, and ArrayLike to number Index Signatures

数组实际上是对象，其keys也是string而非number，Typescript里使用number index signature是为了进行更多的类型检查 即使如下代码x[0]和x[‘0’]的行为在运行时完全一致，但是只有x[0]才能正确的推导出类型。

```typescript
let a : string[] = []
let x = a[0] // x类型为string
let y = a['0'] // 但是y类型为any
```

一般也很少用number index signatures，用Array或者Tuple

### 17. Use readonly to Avoid Errors Associated with Mutation

* If your function does not modify its parameters then declare them readonly.This makes its contract clearer and prevents inadvertent mutations in its implementation.
* Use readonly to prevent errors with mutation and to find the places in your code where mutations occur.

### 18. Use Mapped Types to keep Values in Sync

* Use mapped types to keep related values and types synchronized.
* Consider using mapped types to force choices when adding new properties to an interface.

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

在TS 4.6对控制流分析做了优化

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

### 40. Hide Unsafe Type Assertions in Well-Typed Functions

有时候不使用any想编写一个完全类型安全的实现并非易事，但是一般对于使用者 并不关心内部的实现是否安全，只关心对外暴露的签名是否安全，此时我们可以将函数签名和 函数实现相分离，以简化内部的类型实现。

### 41. Understand Evolving any

Typescript中的any并不是一成不变的，会随着用户的操作，Typescript会猜测更加合理的类型

```typescript
function range(start:number,limit:number){
  const out = []; // any[]
  for(let i=start;i<limit;i++){
    out.push(i);
  }
  return out; // number[]
}


function range2(start:number,limit:number){
  const out = [] // any[]
  if(start === limit){
    return out // any[]
  }
  for(let i=start;i<limit;i++){
    out.push(i);
  }
  return out; // number[]
}
```

然而最好还是必要的时候明确的声明

### 42. Use unknown Instead of any for Values with an Unknown Type

* The unknown type is a type-safe alternative to any. Use it when you know you have a value but do not know what its type is.
* Use unknown to force your users to use a type assertion or do type checking.

### 43.Prefer Type-Safe Approaches to Monkey Patching

* Prefer structured code to storing data in globals or on the DOM
* If you must store data on built-in types,use one of the type-safe approaches (augmentation or asserting a custom interface)

### 44. Track Your Type Coverage to Prevent Regressions in Type Safety

## Types Declarations and @types

### 45. Put TypeScript and @types in devDependencies

### 46. Understand the Three Versions Involved in Type Declarations

一个库的类型声明和三个库的版本有关：库本身版本，@types版本，TypeScript版本，这三个版本不匹配可能会导致一些问题。

用TS开发，库本身就导出类型，可以减少一个变量。

### 47. Export All Types That Appear in Public APIs

将公用API里使用的类型也一并导出，方便其他人使用。即使不导出，其他用户也可以使用ReturnType Parameters获取。

### 48. Use TSDoc for API Comments

### 49. Provide a Type for this in Callbacks

### 50. Prefer Conditional Types to Overloaded Declarations

下面的例子，用条件类型比用函数重载更简介(我也不喜欢用函数重载)

```typescript
function double<T extends string | number>(val:T):T extends string?string:number{
  return val+val;
}
```

### 51. Mirror Types to Server Dependencies

尽量避免用户对@types的依赖，不要强制web用户依赖NodeJS的types

### 52. Be Aware of the Pitfalls of Testing Types

然而一般写业务也不用测试类型啊🤔

## Writing and Running Your Code

### 53. Prefer ECMAScript Features to TypeScript Features

优先考虑使用ES特性而不是TS独有特性，把TS定位在Type层面

* Enums 实际上枚举用的不多，一般是用字面量的联合类型替代
* Parameter Properties 给类constructor的参数提供修饰符 这些参数会自动挂载到同名属性上。这个feature其实有点鸡肋，而且现在class语法本身用的就不多了
* Namespace and Triple-Slash Imports 这两个是ES没提出模块方案前的替代品，没有使用意义了
* Decorators 装饰器的最大问题其实是他还不稳定

### 54. Know How to Iterate Over Objects

使用for k in obj语法遍历对象，k的类型被放宽到string，这是因为TS是结构化类型，对于某个可赋值给某个类型的变量，可能会有额外属性，所以k要放宽。

Object.entries 是一个可行的替代，然而类型还是有问题。。。

### 55. Understand the DOM hierarchy

Know the dofferences between Node,Element,HTMLElement,and EventTarget as well as those between Event and MouseEvent.

Either use a specific enough type for DOM elements and Events in your code or give TypeScript the context to infer it.

### 56. Dont`t Rely on Private to Hide Infomation

TS class的private protected 修饰符本身只是类型层面的，不存在于运行时，显然标记为私有的字段依然可以在运行时从外部访问。

private field是ES提出的私有字段解决方案(然而#语法好丑)

### 57. Use Source Maps to Debug TypeScript

## Migrating to TypeScript

### 58. Write Modern JavaScript

### 59. Use @ts-check and JSDoc to Experiment with TypeScript

### 60. Use allowJs to Mix TypeScript and JavaScript

### 61. Convert Module By Module Up Your Depency Graph

### 62. Dont`t Consider Migration Complete Until You Enable noImplicitAny
