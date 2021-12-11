# type-challenges

[原项目地址](https://github.com/type-challenges/type-challenges)

## 2・Get Return Type

```typescript
type MyReturnType<T extends (...arg:any)=>any> = T extends (...arg:any)=>infer U?U:never;
```

## 3・Omit

```typescript
type MyOmit<T, K extends keyof T> = Pick<T,Exclude<keyof T,K>>
```

## 8・Readonly 2

```typescript
type MyReadonly2<T, K extends keyof T = keyof T> = Readonly<Pick<T,K>> & Omit<T,K>
```

## 9・Deep Readonly

```typescript
type DeepReadonly<T extends object> = {
  readonly [K in keyof T]:T[K] extends object? T[K] extends Function?T[K]: DeepReadonly<T[K]>:T[K]
}
```

## 10・Tuple to Union

```typescript
type TupleToUnion<T extends readonly any[]> = T[number]
```

## 12・Chainable Options

```typescript
type Chainable<T={}> = {
  option<K extends string,U>(key: K, value: U): Chainable<T & {[P in K]:U}>
  get(): T
}
```

## 15・Last of Array

```typescript
type Last<T extends any[]> = T extends [...any,infer U]?U:never;
```

## 16・Pop

```typescript
type Pop<T extends any[]> = T extends [...infer U,any]?U:never;
```

## 20・Promise.all

```typescript
type UnwrapPromise<T> = T extends Promise<infer U>?U:T;
declare function PromiseAll<T extends any[]>(values: readonly [...T]): Promise<{
  [K in keyof T]:UnwrapPromise<T[K]>
}>
```

## 62・Type Lookup

```typescript
type LookUp<U extends {type:string}, T extends U['type']> = U extends {type:T}?U:never;
```

## 106・Trim Left

```typescript
type Space = ' ' | '\n' | '\t'
type TrimLeft<S extends string> = S extends `${Space}${infer T}`?TrimLeft<T>:S
```

## 108・Trim

```typescript
type Space = ' ' | '\n' | '\t'
type TrimLeft<S extends string> = S extends `${Space}${infer T}`?TrimLeft<T>:S
type TrimRight<S extends string> = S extends `${infer T}${Space}`?TrimRight<T>:S;

type Trim<S extends string> = TrimRight<TrimLeft<S>>
```

## 110・Capitalize

```typescript
type Capitalize<S extends string> = S extends `${infer F}${infer R}`?`${Uppercase<F>}${R}`:S
```

## 116・Replace

```typescript
type Replace<S extends string, From extends string, To extends string> = From extends ''?S:S extends `${infer F}${From}${infer L}`?`${F}${To}${L}`:S;
```

## 119・ReplaceAll

```typescript
type ReplaceAll<S extends string, From extends string, To extends string> = From extends ''?S:S extends `${infer F}${From}${infer L}`?`${F}${To}${ReplaceAll<L,From,To>}`:S

```

## 191・Append Argument

```typescript
type AppendArgument<Fn extends (...args:any)=>any, A> = (...a:[...Parameters<Fn>,A])=>ReturnType<Fn>
```

## 296・Permutation

```typescript
type isNever<T> = [T] extends [never]?true:false;
type Permutation<T extends string,R extends string[] = [], K = T > = isNever<T> extends true?
  R:
  K extends T? Permutation<Exclude<T,K>,[...R,K]>:R
```

## 298・Length of String

```typescript
type LengthOfString<S extends string,L extends string[]=[]> = S extends `${infer A}${infer O}`?LengthOfString<O,[...L,A]>:L['length']
```

## 459・Flatten

```typescript
type Flatten<T extends any[]> = T extends [infer F,...infer R]? F extends any[]? [...Flatten<F>,...Flatten<R>]:[F,...Flatten<R>] : T;
```

## 527・Append to object

```typescript
type AppendToObject<T,U extends string,V> = {
  [K in (keyof T) | U]:K extends keyof T?T[K]:V
}
```

## 529・Absolute

```typescript
type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer U}`?`${U}`:`${T}`
```

## 531・String to Union

```typescript
type StringToUnion<T extends string> = T extends `${infer F}${infer O}`?F | StringToUnion<O>:never
```

## 599・Merge

```typescript
type Merge<F, S> = {
  [K in ( (keyof F) | (keyof S))]:K extends keyof S?S[K]:(K extends keyof F?F[K]:never)
}
```

## 610・CamelCase

```typescript
type CamelCase<S extends string> = S extends `${infer F}-${infer T}${infer R}`?
  T extends '-'?
    `${F}-${CamelCase<`${T}${R}`>}`
    :
    `${F}${T extends Uppercase<T>?`-${T}`:Uppercase<T>  }${CamelCase<R>}`:S;
```

## 612・KebabCase

```typescript
type KebabCase<S extends string,P extends string = ''> = 
  S extends `${infer F}${infer O}`?
    F extends Lowercase<F>?
      KebabCase<O,`${P}${F}`>
      :P extends ''? KebabCase<O,Lowercase<F>>:KebabCase<O,`${P}-${Lowercase<F>}`>
  :P

```

## 645・Diff

```typescript
type Diff<O,O1> = {
  [K in Exclude<keyof O,keyof O1> |  Exclude<keyof O1,keyof O>]:K extends keyof O?O[K]:K extends keyof O1?O1[K]:never
}
```

## 949・AnyOf

```typescript
type falsy = '' | false | 0| [] | {[x:string]:never};
type AnyOf<T extends readonly any[]> = T[number] extends falsy?false:true
```

## 1042・IsNever

```typescript
type IsNever<T> = [T] extends [never]?true:false
```

## 1097・IsUnion

```typescript
type IsUnion<T,U = T> = T extends U ?
  [U] extends [T]?false:true
  :never
```

## 1130・ReplaceKeys

```typescript
type ReplaceKeys<U, T extends string, Y > = {
  [K in keyof U]:K extends T? (K extends keyof Y?Y[K]:never) : U[K] 
}
```

## 1367・Remove Index Signature

```typescript
// 索引类型特点 不是具体的字面量类型 而是 string number
// 利用never类型过滤
type OmitIndexSignature<T> = 
  string extends T ? 
  never :
  number extends T?
    never:T
// https://github.com/zhongsp/TypeScript/blob/dev/zh/release-notes/typescript-4.1.md#%E5%9C%A8%E6%98%A0%E5%B0%84%E7%B1%BB%E5%9E%8B%E4%B8%AD%E6%9B%B4%E6%94%B9%E6%98%A0%E5%B0%84%E7%9A%84%E9%94%AE 
// 在映射类型中更改映射的键
type RemoveIndexSignature<T> = {
  [K in keyof T as OmitIndexSignature<K>]:T[K]
}
```

## 1978・Percentage Parser

```typescript
type ParseRest<T extends string> = T extends `${infer U}%`?[U,'%']:[T,'']
type PercentageParser<A extends string> = 
  A extends `${infer F}${infer R}`?
    F extends '+' | '-'?
      [F,...ParseRest<R>]
      :
      ['',...ParseRest<A>]
  :['','','']
```

## 2070・Drop Char

```typescript
type DropChar<S extends string, C extends string> = S extends `${infer A}${C}${infer B}`?
  DropChar<`${A}${B}`,C>
  :S
```

## 2257・MinusOne

```typescript
type Make10Array<T extends any[]> = [
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
]
type oneDigitNum = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
type Make1Array<T extends string,L extends any[] = []> = `${L['length']}` extends T? L:Make1Array<T,[1,...L]>
type MakeArray<T extends string,L extends any[] = []> = T extends `${infer F}${infer R}`? MakeArray< R,[
  ...Make10Array<L>,
  ...Make1Array<F>
]> : L

type Pop<T extends any[]> = T extends [...infer R, infer L]?R:[]

type MinusOne<T extends number> = Pop<MakeArray<`${T}`>>['length']
```

## 2595・PickByType

解法一 利用 Key Remapping in Mapped Types

```typescript
type FilterKey<V,U,K> = V extends U?K:never;

type PickByType<T, U> = {
  [K in keyof T as FilterKey<T[K],U,K>]:T[K]
}
```

解法二：

```typescript
type PickByType<T, U> = {
  [K in keyof T as (T[K] extends U?K:never)]:T[K]
}
```

## 2688・StartsWith

```typescript
type StartsWith<T extends string, U extends string> = T extends `${U}${string}`?true:false
```

## 2693・EndsWith

```typescript
type EndsWith<T extends string, U extends string> = T extends `${string}${U}`?true:false;
```

## 2757・PartialByKeys

```typescript
// 为什么需要这个Copy https://github.com/microsoft/TypeScript/blob/main/doc/spec-ARCHIVED.md#3.11.2
// Two types are considered identical when
// they are intersection types with identical sets of constituent types
// 一个是交叉类型的 一个不是交叉类型 他们不是identical 虽然可能是类型兼容互相assignable

type Copy<T> = {
  [K in keyof T]:T[K]
}
type PartialByKeys<T , K extends keyof any = keyof T> = Copy<Partial<Pick<T,Extract<keyof T, K>>> & Omit<T,K>>
```

## 2759・RequiredByKeys

```typescript
type Copy<T> = {
  [K in keyof T]:T[K]
}
type RequiredByKeys<T , K extends keyof any = keyof T> = Copy<Required<Pick<T,Extract<keyof T,K>>> & Omit<T,Extract<keyof T,K>>>
```

## 2793・Mutable

```typescript
type Mutable<T> = {
  -readonly [K in keyof T]:T[K]
}
```

## 2852・OmitByType

```typescript
type OmitByType<T, U> = {
  [K in keyof T as (T[K] extends U? never:K)]:T[K]
}
```

## 2946・ObjectEntries

```typescript
type ObjectEntries<T,U = Required<T>> = {
  [K in keyof U]:[K,U[K]]
}[keyof U]
```

## 3062・Shift

```typescript
type Shift<T extends any[]> = T extends [any,...infer U]?U:never 
```

## 3188・Tuple to Nested Object

```typescript
type TupleToNestedObject<T, U> = T extends [infer F,...infer R]?
  {
    [K in F&string]:TupleToNestedObject<R,U>
  }
  :U
```

## 3192・Reverse

```typescript
type Reverse<T> = T extends [infer F,...infer M,infer L]?
  [L,...Reverse<M>,F]
  :T
```

## 3196・Flip Arguments

```typescript
type Reverse<T> = T extends [infer F,...infer M,infer L]?
  [L,...Reverse<M>,F]
  :T
type FlipArguments<T extends (...args:any)=>any > = T extends (...args:infer P)=>infer R? (...args:Reverse<P>)=>R : never
```

## 3243・FlattenDepth

```typescript
type FlattenDepth<T extends any[], C extends number = 1, U extends any[] = []> = T extends [infer F,...infer R]?
  F extends any[]?
    U['length'] extends C?
      [F, ...FlattenDepth<R, C, U>]
      :[...FlattenDepth<F, C, [0,...U]>,...FlattenDepth<R, C, U>]
    :[F,...FlattenDepth<R, C, U>]

  : T;
```

## 4179・Flip

```typescript
type Flip<T extends Record<string,string | number | boolean>> = {
  [K in keyof T as `${T[K]}`]:K
}
```

## 4182・Fibonacci Sequence

```typescript
type Fibonacci<T extends number,C extends any[] = [1,1,1],A extends any[] = [1],B extends  any[] = [1]> = 
  T extends 1? 
    1:
    T extends 2?
    1:
      C['length'] extends T?
        [...A,...B]['length']
        :Fibonacci<T,[1,...C],B,[...A,...B]>
```

## 4425・Greater Than

```typescript
type GreaterThan<T extends number, U extends number,TL extends number[] = [],UL extends number[] = []> = 
  T extends U ?
    false:
    UL['length'] extends U?
      true :
      TL['length'] extends T?
        false:
        GreaterThan<T,U,[0,...TL],[0,...UL]>

```

## 4471・Zip

```typescript
type Zip<T extends any[],U extends any[]> = 
  T extends [infer TF,...infer TR]?
    U extends [infer UF,...infer UR]?
      [[TF,UF],...Zip<TR,UR>]
    :[]
  :[]
```

## 4484・IsTuple

```typescript
type IsTuple<T> = 
  T extends readonly any[]?
    number extends T['length']?false:true
  :false
```

## 4499・Chunk

```typescript
type Chunk<T extends any[],C extends number,S extends any[] = []> = 
  S['length'] extends C?
    [S,...Chunk<T,C>]
    : T extends [infer F,...infer R]?
        Chunk<R,C,[...S,F]>
      : S['length'] extends 0? []: [S]
```

## 4518・Fill

```typescript
type GreaterThan<T extends number, U extends number,TL extends number[] = [],UL extends number[] = []> = 
  T extends U ?
    false:
    UL['length'] extends U?
      true :
      TL['length'] extends T?
        false:
        GreaterThan<T,U,[0,...TL],[0,...UL]>

type FillNormal<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  R extends unknown[] = [],
  I extends boolean = false
> = T extends [infer F,...infer L]?
      R['length'] extends End? [...R,...T]:
            R['length'] extends Start? FillNormal<L,N,Start,End,[...R,N],true>
              : I extends true ? FillNormal<L,N,Start,End,[...R,N],true>
                  : FillNormal<L,N,Start,End,[...R,F],false>
    : R


type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
> = GreaterThan<End,Start> extends true?
      FillNormal<T,N,Start,End>:T
```

## 4803・Trim Right

```typescript
type Separator = ' ' | '\n' | '\t';

type TrimRight<S extends string> = S extends `${infer R}${Separator}`? TrimRight<R>:S;
```
