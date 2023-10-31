# bigfrontend的TypeScript问题

[bigfrontend](https://bigfrontend.dev/) 大前端？

这么多题做下来，感觉用的最多的其实是条件类型+infer

## TypeScript内置类型

* Partial
* Required
* Readonly
* Record
* Pick
* Omit
* Exclude
* Extract
* NonNullable
* Parameters
* ConstructorParameters
* ReturnType
* InstanceType
* ThisParameterType
* OmitThisParameter

## 技巧：数值转化成Tuple

### Repeat

先考虑这么一个问题：实现一个类型```Repeat<T,C>```,这个类型返回一个元组，元组的长度为C(意味着C是非负整数)，元组的每一项都是T类型。

以下是测试用例：

```typescript
type A = Repeat<number, 3> // [number, number, number]
type B = Repeat<string, 2> // [string, string]
type C = Repeat<1, 1> // [1]
type D = Repeat<0, 0> // []
```

以下是我们的答案：

```typescript
type Repeat<T, C extends number,R extends T[] = []> = R['length'] extends C?R:Repeat<T,C,[T,...R]>
```

其中R是我们结果存放的元组。当元组的长度达到我们需要的长度C时(条件类型的true分支)，我们返回R即可，当不满足时(其实就是长度不够)，我们递归调用Repeat，并且传入的R参数比当前的R长度+1。

这样我们就把数值和元组关联起来了。

### ToNumber

> 请实现```ToNumber<T>```用来转换字符串为整数。

测试用例：

```typescript
type A = ToNumber<'1'> // 1
type B = ToNumber<'40'> // 40
type C = ToNumber<'0'> // 0
```

答案：

```typescript
type ToNumber<T extends string,U extends number[]=[]> = T extends `${U['length']}`?U['length']:ToNumber<T,[1,...U]>
```

这里还有一个技巧时通过模板字面量类型把数字类型转成字符串类型

### Add

> 请实现```Add<A, B>```计算正整数之和。

测试用例：

```typescript
type A = Add<1, 2> // 3
type B = Add<0, 0> // 0
```

答案：

```typescript
type Num2Arr<T extends number,U extends number[] = []> = U['length'] extends T?U:Num2Arr<T,[1,...U]>

type Add<A extends number, B extends number> = [...Num2Arr<A>,...Num2Arr<B>]['length']
```

### LargerThan

> 请实现```LargerThan<A, B>```。

测试用例：

```typescript
type A = LargerThan<0, 1> // false
type B = LargerThan<1, 0> // true
type C = LargerThan<10, 9> // true
```

答案：

```typescript
type LargerThan<
  A extends number, 
  B extends number,
  AList extends number[] = [],
  BList extends number[] = [],
> = AList['length'] extends A?
      false:
      BList['length'] extends B?
        true: LargerThan<A,B,[1,...AList],[1,...BList]>
```

### SmallerThan

> 请实现```SmallerThan<A, B>```。

测试用例：

```typescript
type A = SmallerThan<0, 1> // true
type B = SmallerThan<1, 0> // false
type C = SmallerThan<10, 9> // false
```

答案：

```typescript
type SmallerThan<
  A extends number, 
  B extends number,
  AList extends number[]=[],
  BList extends number[] = [] 
> = AList['length'] extends A?
      BList['length'] extends B?
        false:true
      :
      BList['length'] extends B?
        false:SmallerThan<A,B,[1,...AList],[1,...BList]>

type A = SmallerThan<0, 1> // true
type B = SmallerThan<1, 0> // false
type C = SmallerThan<10, 9> // false
```

### RepeatString

> 类似于```String.prototype.repeat()```，请实现```RepeatString<T, C>```。

测试用例：

```typescript
type A = RepeatString<'a', 3> // 'aaa'
type B = RepeatString<'a', 0> // ''
```

答案：

```typescript
type TupleToString<T extends string[]> = T extends [infer A,...infer B]? B extends string[]? `${A & string}${TupleToString<B>}`:A :''
type Repeat2Tuple<T,C extends number,R extends T[] = []> = R['length'] extends C?R:Repeat2Tuple<T,C,[T,...R]>

type RepeatString<T extends string, C extends number> = TupleToString<Repeat2Tuple<T,C>>
```

## Tuple

### Push

> 请实现```Push<T, I>```。

测试用例：

```typescript
type A = Push<[1,2,3], 4> // [2,3]
type B = Push<[1], 2> // [1, 2]
type C = Push<[], string> // [string]
```

答案：

```typescript
type Push<T extends any[], I> = [...T,I]
```

### Shift

> 请实现```Shift<T>```来去掉tuple的第一个元素

测试用例：

```typescript
type A = Shift<[1,2,3]> // [2,3]
type B = Shift<[1]> // []
type C = Shift<[]> // []
```

答案：

```typescript
type Shift<T extends any[]> = T extends [any,...infer U]?U:[]
```

### ReverseTuple

> Implement ```ReverseTuple<T>``` to reverse a tuple type.

测试用例：

```typescript
type A = ReverseTuple<[string, number, boolean]> // [boolean, number, string]
type B = ReverseTuple<[1,2,3]> // [3,2,1]
type C = ReverseTuple<[]> // []
```

答案：

```typescript
type ReverseTuple<T extends any[]> = T extends [first:infer U,...rest:infer O]?[...ReverseTuple<O>,U]:T
```

### TupleToUnion

> Given a tuple type, implement ```TupleToUnion<T>``` to get a union type from it.

测试用例：

```typescript
type Foo = [string, number, boolean]

type Bar = TupleToUnion<Foo> // string | number | boolean
```

答案：

```typescript
type TupleToUnion<T extends any[]> = T[number]
```

### LengthOfTuple

> 请实现```LengthOfTuple<T>```返回tuple type的长度。

测试用例：

```typescript
type A = LengthOfTuple<['B', 'F', 'E']> // 3
type B = LengthOfTuple<[]> // 0
```

答案：

```typescript
type LengthOfTuple<T extends any[]> = T extends {length:infer U}?U:never;
```

### FirstItem

> 请实现```FirstItem<T>```来返回tuple type的第一个type。

测试用例：

```typescript
type A = FirstItem<[string, number, boolean]> // string
type B = FirstItem<['B', 'F', 'E']> // 'B'
```

答案：

```typescript
type FirstItem<T extends any[]> = T extends [infer U,...any[]]?U:never;
```

### LastItem

> 请实现```LastItem<T>```用以返回tuple的最后一个type。

测试用例：

```typescript
type A = LastItem<[string, number, boolean]> // boolean
type B = LastItem<['B', 'F', 'E']> // 'E'
type C = LastItem<[]> // never
```

答案：

```typescript
type LastItem<T extends any[]> = T extends [...any[],infer U]?U:never;
```

## String

字符串相关的基本需要TypeScript版本最少4.1

### FirstChar

> 请实现```FirstChar<T>```返回头文字type。

测试用例：

```typescript
type A = FirstChar<'BFE'> // 'B'
type B = FirstChar<'dev'> // 'd'
type C = FirstChar<''> // never
```

答案：

```typescript
type FirstChar<T extends string> = T extends `${infer U}${infer O}`?U:never
```

### LastChar

> 类似于```FirstChar<T>```，请实现```LastChar<T>```。

测试用例：

```typescript
type A = LastChar<'BFE'> // 'E'
type B = LastChar<'dev'> // 'v'
type C = LastChar<''> // never
```

答案：

```typescript
type LastChar<T extends string> = T extends `${infer U}${infer O}`?O extends ''?U:LastChar<O> :never
```

### StringToTuple

> 请实现```StringToTuple<T>```将字符串拆散为tuple。

测试用例：

```typescript
type A = StringToTuple<'BFE.dev'> // ['B', 'F', 'E', '.', 'd', 'e','v']
type B = StringToTuple<''> // []
```

答案：

```typescript
type StringToTuple<T extends string,U extends string[] = []> = T extends `${infer A}${infer B}`? StringToTuple<B,[...U,A]>:U
```

### LengthOfString

> 请实现```LengthOfString<T>```用以返回字符串长度。

测试用例：

```typescript
type A = LengthOfString<'BFE.dev'> // 7
type B = LengthOfString<''> // 0
```

答案：

```typescript
type LengthOfString<T extends string,U extends string[] = []> = T extends `${infer A}${infer B}`?LengthOfString<B,[A,...U]>:U['length']
```

类似于将数字转换为Tuple，这里通过递归和infer不断拆解字符串，转换为Tuple

### Trim

> 正如String.prototype.trim()，请实现```Trim<T>```

测试用例：

```typescript
type A = Trim<'    BFE.dev'> // 'BFE'
type B = Trim<' BFE. dev  '> // 'BFE. dev'
type C = Trim<'  BFE .   dev  '> // 'BFE .   dev'
```

答案：

```typescript
type TrimLeft<T extends string> = T extends ` ${infer U}`?TrimLeft<U>:T
type TrimRight<T extends string> = T extends `${infer U} `? TrimRight<U>:T;
type Trim<T extends string> = TrimRight<TrimLeft<T>>
```

### ReplaceAll

> Just like String.prototype.replaceAll(),please implement ```ReplaceAll<S, F, T>```.

```typescript
type ReplaceAll<
  S extends string, 
  F extends string, 
  T extends string,
  P extends string = ''
  > = F extends ''? S:
      S extends `${infer A}${F}${infer B}`? ReplaceAll<B,F,T,`${P}${A}${T}`>:`${P}${S}`
```

## is

### IsAny 🤓

测试用例：

```typescript
type A = IsAny<string> // false
type B = IsAny<any> // true
type C = IsAny<unknown> // false
type D = IsAny<never> // false
```

答案：

```typescript
type IsAny<T> = 0 extends (1&T)?true:false
```

需要知道any与除never之外的其他类型求交叉类型，都是any。

### IsNever 🤓

测试用例：

```typescript
type A = IsNever<never> // true
type B = IsNever<string> // false
type C = IsNever<undefined> // false
```

答案：

```typescript
type IsNever<T> = [T] extends [never]?true:false
```

注意不能写成```type IsNever<T> = T extends never?true:false```,当T为never时，结果时never。

### IsEmptyType 🤓

> Implement ```IsEmptyType<T>``` to check if T is empty type {}.

测试用例：

```typescript
type A = IsEmptyType<string> // false
type B = IsEmptyType<{a: 3}> // false
type C = IsEmptyType<{}> // true
type D = IsEmptyType<any> // false
type E = IsEmptyType<object> // false
type F = IsEmptyType<Object> // false
```

答案：

```typescript
// 先判断是否是对象
type IsEmptyType<T> = T extends Record<string,1>? 
  // 空对象 keyof操作是 never
  [keyof T] extends [never]?true:false :
  false;
```

## 杂

### Flat 🤓

> Implement ```Flat<T>``` to flatten a tuple type.

测试用例：

```typescript
type A = Flat<[1,2,3]> // [1,2,3]
type B = Flat<[1,[2,3], [4,[5,[6]]]]> // [1,2,3,4,5,6]
type C = Flat<[]> // []
```

答案：

```typescript
type Flat<T extends any[]> = 
  T extends [infer F,...infer R]? 
    // F有可能还是数组类型 也可能不是
    F extends any[]?
      [...Flat<F>,...Flat<R>]:
      [F,...Flat<R>]
    : T
```

### UnwrapPromise

> Implement ```UnwrapPromise<T>``` to return the resolved type of a promise.

测试用例：

```typescript
type A = UnwrapPromise<Promise<string>> // string
type B = UnwrapPromise<Promise<null>> // null
type C = UnwrapPromise<null> // Error
```

答案：

```typescript
type UnwrapPromise<T> = T extends Promise<infer U>?U:Error;
```

### UnionToIntersection

> 请实现```UnionToIntersection<T>```用以从Union得到Intersection。

测试用例：

```typescript
type A = UnionToIntersection<{a: string} | {b: string} | {c: string}> 
// {a: string} & {b: string} & {c: string}
```

答案：

```typescript
type UnionToIntersection<T> = (T extends any? (arg:T)=>any:never) extends (arg:infer R)=>void?R:never;
```

[参考文章](https://fettblog.eu/typescript-union-to-intersection/)。

第一个条件类型是分布式条件类型，其实起到了把联合类型拆开的目的，第二个条件类型是非分布式条件类型，同时由于函数的类型兼容性，对于函数参数是逆变，所以上面的R是各个被联合的类型的子类型。

### Filter<T, A>

> 请实现Filter<T, A>，返回T中能够assign给A的type所组成的新tuple。

测试用例：

```typescript
type A = Filter<[1,'BFE', 2, true, 'dev'], number> // [1, 2]
type B = Filter<[1,'BFE', 2, true, 'dev'], string> // ['BFE', 'dev']
type C = Filter<[1,'BFE', 2, any, 'dev'], string> // ['BFE', any, 'dev']
```

答案：

```typescript
// 拆分数组，一个元素一个元素处理
type Filter<T extends any[], A> = T extends [infer F,...infer R]?
    // 判断F是否可以赋给A
    // 这里要用非分布式条件类型 考虑到第三个case any的情况 如果是分布式条件类型的话 true和false分支都会运行
    [F] extends [A]?
        [F,...Filter<R,A>]:
        Filter<R,A>
    // 空数组了
    :[]
```

### Equal

> Implement Equal<A, B> to check if two types are identical.

测试用例：

```typescript
Equal<any, any> // true
Equal<any, 1> // false
Equal<never, never> // true
Equal<'BFE', 'BFE'> // true
Equal<'BFE', string> // false
Equal<1 | 2, 2 | 1> // true
Equal<{a : number}, {a: number}> // true
```

答案：

```typescript
type isAny<T> = 0 extends (1&T)?true:false;
// 前半部分都是处理any的情况
type Equal<A, B> = isAny<A> extends true?
    isAny<B> extends true?
        true:false
    : isAny<B> extends true ? false:
        // 到这里没有any了 那么就是可以互相作为子类
        // 要用非分布式类型 分布式类型处理不了never
        [A] extends [B] ?
        [B] extends [A]
        ? true: false
        :false

```

### FindIndex

> 正如Array.prototype.findIndex()， 请实现```FindIndex<T, E>```。

测试用例：

```typescript
type A = [any, never, 1, '2', true]
type B = FindIndex<A, 1> // 2
type C = FindIndex<A, 3> // never
```

答案：

```typescript
type FindIndex<T extends any[], E,H extends any[]=[]> = T extends [infer F,...infer O]?
  Equal<F,E> extends true? H['length']: FindIndex<O,E,[1,...H]>
  :never;
```

### UndefinedToNull

```typescript
type UndefinedToNull<T> = 
T extends Record<keyof any,any> ? 
  {
    [K in keyof T]:UndefinedToNull<T[K]>
  }: T extends undefined? null:T
```

### MapStringUnionToObjectUnion

```typescript
type MapStringUnionToObjectUnion<T> = 
T extends any? {
  value:T
} :never
```

### Diff

```typescript
type DiffKeys<
  A extends Record<string, any>,
  B extends Record<string, any>,
  KS = (keyof A) | (keyof B)
> = 
KS extends any?
  KS extends (keyof A)?
    KS extends (keyof B)?
      never:KS
    : 
    KS extends (keyof B)?
      KS:never

  :never

```

### ObjectPaths

```typescript
type ObjectPaths<O extends Record<string, any>, Path extends string = '',KS = keyof O > = 
  KS extends keyof O?
    O[KS] extends Record<string,any>?
      ObjectPaths<O[KS],Path extends ''? KS: `${Path}.${KS&string}`  >
      : Path extends ''? KS: `${Path}.${KS&string}`
    :never

```

### Abs

```typescript
type Abs<N extends number> = `${N}` extends `-${infer N1 extends number}`?N1:N
```

### StringToNumber

```typescript
type StringToNumber<S extends string> = S extends `${infer N extends number}`?N:never
```

### Split

```typescript
type Split<S extends string, D extends string,R extends string[] = []> = 
  S extends `${infer A}${D}${infer B}`?
    Split<B,D,[...R,A]>:[...R,S]
```

### Capitalize

```typescript
type MyCapitalize<T extends string> = T extends `${infer A}${infer B}`? `${Uppercase<A>}${B}`:T
```

### CamelCase

```typescript
type CamelCase<S extends string> = S extends `${infer A}_${infer B}`? `${Capitalize<A>}${CamelCase<B>}`:Capitalize<S>
```

### SnakeCase

```typescript
type SnakeCase<S extends string,P extends string = ''> = 
  S extends `${infer F}${infer R}`?
    F extends Uppercase<F>?
      SnakeCase<R, `${P}${P extends ''?'':'_' }${Lowercase<F>}`>
      :SnakeCase<R,`${P}${F}`>
    :`${P}${S}`

```

### Slice

```typescript
type Slice<
  A extends any[], 
  S extends number = 0, 
  E extends number = A['length'],
  P extends any[] = [],
  R extends any[] = [],
  I extends boolean = false,
> = 
P['length'] extends E?
  R:
  A extends [infer F,...infer G]?
    I extends false?
      P['length'] extends S?
        Slice<G,S,E,[...P,F],[...R,F],true>
        :Slice<G,S,E,[...P,F],R,false>
      :Slice<G,S,E,[...P,F],[...R,F],true>

    :R
```

### Prefix

```typescript
type Prefix<T extends Record<string, any>, P extends string> 
  = {
    [K in keyof T as `${P}_${K&string}`]:T[K]
  }
```
