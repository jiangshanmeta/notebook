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

## 3326・BEM style string

```typescript
type BEM<B extends string, E extends string[], M extends string[]> = `${B}${E['length'] extends 0? '':`__${E[number]}`}${M['length'] extends 0? '':`--${M[number]}`}`
```

## 3376・InorderTraversal 🤓

```typescript
interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}
type InorderTraversal<T extends TreeNode | null, U extends TreeNode = NonNullable<T>> = 
  T extends null?
    []
    :[...InorderTraversal<U['left']>,U['val'],...InorderTraversal<U['right']>]
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

## 4260・AllCombinations

```typescript
type Combination<
  S extends string,
  U extends string='',
  K = S
> = 
[S] extends [never]?
  U: 
  K extends S? 
    Combination<Exclude<S,K>,U | `${U}${K}`>
    :U

type String2Union<S extends string,R extends string = never> = S extends `${infer F}${infer L}`? String2Union<L,R | F>:R


type AllCombinations<S extends string> = Combination<String2Union<S>>
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

## 5117・Without

```typescript
type Includes<
  T extends any[],
  U
> = 
T extends [infer F,...infer R]? 
  F extends U? 
    true:Includes<R,U>
  :false

type WithoutMulti<
  T extends any[],
  U extends any[],
  R extends any[] = []
> = 
T extends [infer F,...infer L]?
  Includes<U,F> extends true? WithoutMulti<L,U,R>:WithoutMulti<L,U,[...R,F]>
  : R

type Without<T extends any[], U extends (number | number[] )> = U extends number[]? WithoutMulti<T,U>:WithoutMulti<T,[U]>
```

## 5140・Trunc

```typescript
type Trunc<T extends string | number> = `${T}` extends `${infer F}.${infer R}`? F: `${T}`
```

## 5153・IndexOf

```typescript
type IndexOf<
  T, 
  U,
  L extends any[] = []
> = 
  T extends [infer F,...infer R]?
    U extends F? L['length']:IndexOf<R,U,[1,...L]>
  : -1
```

## 5310・Join

```typescript
type Join<
  T extends any[], 
  U extends string | number,
  R extends string = ''
> = 
  T extends [infer F,...infer L]?
    L['length'] extends 0?
      `${R extends ''?'':`${R}${U}`}${F&string}`
      :Join<L,U,`${R extends ''?'':`${R}${U}`}${F&string}`>
  :R
```

## 5317・LastIndexOf

```typescript
type LastIndexOf<T extends any[], U> = T extends [...infer I,infer L]? L extends U?I['length']: LastIndexOf<I,U> : -1;
```

## 5360・Unique

```typescript
type Unique<T extends any[],R extends any[] = []> = T extends [infer F,...infer L]? Unique<L,F extends R[number]? R:[...R,F] >:R
```

## 5821・MapTypes

```typescript
type MapTypes<T, R extends {mapFrom:any,mapTo:any},U extends {mapFrom:any,mapTo:any} = R> = {
  [K in keyof T]:U extends R? (T[K] extends R['mapFrom']?  (T[K] extends U['mapFrom']?U['mapTo']:never ) :T[K]   ):never
}
```

## 7544・Construct Tuple

```typescript
type ConstructTuple<L extends number,R extends unknown[]= []> = R['length'] extends L? R: ConstructTuple<L,[...R,unknown]>
```

## 8640・NumberRange

```typescript
type MakeArrayByLength<L extends number,R extends any[] = []> = R['length'] extends L? R :MakeArrayByLength<L,[...R,0]>

type NumberRange<
  L extends number, 
  H extends number,
  A extends any[] = MakeArrayByLength<L>,
  R extends number = never
> = 
A['length'] extends H?
  R | A['length']
  : NumberRange<L,H,[...A,0],R | A['length']>
```

## 8767・Combination

```typescript
type Helper<T extends any[],Suffix extends any[] = []> =  T extends [infer F,...infer R]? Helper<R ,Suffix | [F,...Suffix] >: Suffix

type Join<
  T extends any[],
  Prefix extends string = ''
> = 
T extends [infer F,...infer R]?
  Join<R,`${Prefix}${Prefix extends ''?'':' '}${F&string}`>
  : Prefix;
type Combination<T extends any[],Suffix extends any[] = []> = Join<Filter<Helper<T>,T['length'] >> | Join<T>

type Filter<
  T extends any[],L 
  extends number,
  U extends any[] = T
> = 
U extends T? 
  U['length'] extends L | 0? 
  never
  :U
  :never
```

## 8987・Subsequence

```typescript
type Subsequence<T extends any[],Prefix extends any[] = []> = T extends [infer F,...infer R]? Subsequence<R,Prefix | [...Prefix,F]>:Prefix
```

## 9142・CheckRepeatedChars

```typescript
type CheckRepeatedChars<
  T extends string,
  A extends string = never
> =
T extends `${infer F}${infer R}`?
  F extends A?
    true:CheckRepeatedChars<R, A | F>
  :false
```

## 9286・FirstUniqueCharIndex

```typescript
type GetCountMap<S extends string,M extends Record<string,boolean> = {}> = S extends `${infer F}${infer R}`? GetCountMap<R,F extends keyof M? Omit<M,F>&Record<F,false>: M &Record<F,true>   >:M

type FirstUniqueCharIndex<
  T extends string,
  P extends any[] = [],
  M extends Record<string,boolean> = GetCountMap<T>
> = 
T extends `${infer F}${infer R}`? 
  M[F] extends true?
    P['length']
    :FirstUniqueCharIndex<R,[...P,0],M>
  :-1
```

## 9616・Parse URL Params

```typescript
type ParseUrlParams<
  T extends string,
  R extends string = never
> = 
T extends `${string}:${infer S}/${infer L}`?
  ParseUrlParams<L,R | S>:
  T extends `${string}:${infer S}`?
    R | S
    : R

```

## 9896・GetMiddleElement

```typescript
type GetMiddleElement<T extends any[]> = 
  T['length'] extends 0 | 1 | 2?
    T:
    T extends [any,...infer M,any]?
      GetMiddleElement<M>:never
```

## 9898・Appear only once

```typescript
type DuplicateMap<
  T extends number[],
  M extends Record<number,boolean> = {}
> = 
  T extends [infer F extends number,...infer R extends number[]]?
    F extends keyof M?
      DuplicateMap<R, Omit<M,F>&Record<F,false>>
      :DuplicateMap<R, M&Record<F,true> >
    :M

type FindEles<
  T extends number[],
  R extends number[] = [],
  M extends Record<number,boolean>= DuplicateMap<T>,
> = 
T extends [infer F extends number,...infer L extends number[]]?
  M[F] extends true? 
    FindEles<L,[...R,F],M>
    :FindEles<L,R,M>
  :R
```

## 9989・CountElementNumberToObject

```typescript
type Flatten<T,R extends any[] = []> = 
  T extends [infer F,...infer L]?
    [F] extends [never]?
      Flatten<L,R>:
      F extends any[]?
        Flatten<L,[...R,...Flatten<F>]  >
        :Flatten<L,[...R,F]>
    :R 


type Count<
  T,
  R extends Record<string | number,any[]> = {}
> = 
T extends [infer F extends string | number,...infer L]?
  F extends keyof R?
    Count<L, Omit<R,F>& Record<F,[...R[F],0] > >
    : Count<L, R & Record<F,[0]>>
  :{
    [K in keyof R]:R[K]['length']
  }


type CountElementNumberToObject<
  T
> = 
  Count<Flatten<T>>
```

## 10969・Integer

```typescript
type Integer<T extends number> = 
  number extends T?
    never:
      `${T}` extends `${string}.${string}`?never:T
```

## 16259・ToPrimitive

```typescript
type ToPrimitive<T> = 
  T extends Record<keyof any,any>?
    {
      [K in keyof T]:ToPrimitive<T[K]>
    }:
    T extends number?
      number:
      T extends string?
        string:
        T extends boolean?
          boolean:
          T extends null?
            null:
            T extends undefined?
              undefined:never
```

## 17973・DeepMutable

```typescript
type DeepMutable<T extends Record<keyof any,any>> =
  T extends (...args:any[])=>any?
    T:
    {
      - readonly [K in keyof T]:DeepMutable<T[K]>
    }
```

## 18142・All

```typescript
type All<T extends any[],U> = [{
  [K in keyof T]:Equal<T[K],U>
}[number] ] extends [true]? true:false
```

## 18220・Filter

```typescript
type Filter<T extends any[], P,R extends any[] = []> = T extends [infer F,...infer L]? Filter<L,P,F extends P?[...R,F]:R>:R 
```

## 21104・FindAll

```typescript
type NormalFindAll<
  T extends string, 
  S extends string,
  P extends any[] = [],
  R extends number[] = [],
> = 
T extends `${string}${infer L}`?
  T extends `${S}${string}`?
    NormalFindAll<L,S,[...P,0],[...R,P['length']]>
    :NormalFindAll<L,S,[...P,0],R>
  :R

type FindAll<
  T extends string, 
  P extends string,
> = 
P extends ''?
  []:NormalFindAll<T,P>
```

## 21106・Combination key type

```typescript
type Combs<
  T extends string[]
> = 
  T extends [infer F extends string,...infer R extends string[] ]?
    `${F} ${R[number]}` | Combs<R>
  :never
```

## 21220・Permutations of Tuple

```typescript
type Insert<
  T extends unknown[],
  U
> = 
T extends [infer F,...infer L]
  ? [F,U,...L] | [F,...Insert<L,U> ] 
  : [U]

type PermutationsOfTuple<
  T extends unknown[],
  R extends unknown[] = []
> = 
T extends [infer F,...infer L]?
  PermutationsOfTuple<L,Insert<R,F> | [F,...R] >
  :R
```

## 25170・Replace First

```typescript
type ReplaceFirst<
  T extends readonly unknown[], 
  S, 
  R,
  P extends any[] = []
> = 
T extends [infer F,...infer L]?
  F extends S? [...P,R,...L]:ReplaceFirst<L,S,R,[...P,F]>
  :P
```

## 25270・Transpose

```typescript
type Transpose<M extends number[][],R = M['length'] extends 0?[]:M[0]> = {
  [X in keyof R]:{
    [Y in keyof M]:X extends keyof M[Y]?M[Y][X]:never
  }
}
```

## 26401・JSON Schema to TypeScript

```typescript
type Merge<T> = {
  [K in keyof T]:T[K]
}

type RequireByKeys<T, KS extends keyof T> = Merge< Required<Pick<T,KS>>& Omit<T,KS>>

type JSONSchema2TS<T> = 
T extends {type: "string"}?
  T extends {enum:string[] }? T['enum'][number]:string : 
    T extends {type:"number"}? 
      T extends {enum:number[]}? T['enum'][number]:number:
        T extends {type:"boolean"}?
          boolean:
          T extends {type: "object"}?
            T extends {properties:any}? 
              RequireByKeys<{[K in keyof T['properties']]?:JSONSchema2TS<T['properties'][K]>}, T extends {required:Array<keyof T['properties']>}?T['required'][number]: never  >
              :Record<string,unknown>:
              T extends {type: "array"}?
                T extends {items:any}? Array<JSONSchema2TS<T['items']>>:unknown[]
                :never
```

## 27862・CartesianProduct

```typescript
type CartesianProduct<T, U,TC = T,UC = U> = 
TC extends T?
  UC extends U?
    [TC,UC]
    :never
  :never
```

## 27932・MergeAll

```typescript
type Merge<T,U> = {
  [K in (keyof T) | (keyof U)]: 
    K extends keyof T?
      K extends keyof U?
        T[K] | U[K]
        : T[K]
      : K extends keyof U? U[K]:never
}

type MergeAll<XS extends any[],R = {}> = 
XS extends [infer F,...infer Z]?
  MergeAll<Z, Merge<R,F>>:R
```

## 27958・CheckRepeatedTuple

```typescript
type CheckRepeatedTuple<T extends unknown[],U extends unknown[] = []> = 
T extends [infer F,...infer R]?
  F extends U[number]?
    true:
    CheckRepeatedTuple<R,[...U,F]>
  :false
```

## 28333・Public Type

```typescript
type PublicType<T extends object> = {
  [K in keyof T as K extends `_${string}`? never:K]:T[K]
}
```

## 29650・ExtractToObject

```typescript
type Merge<T> = {
  [K in keyof T]:T[K]
}

type ExtractToObject<
  T, 
  U extends keyof T
> = 
Merge<
  Omit<T,U>&T[U]
>
```

## 29785・Deep Omit

```typescript
type DeepOmit<T,Keys> = {
  [K in keyof T as 
    K extends Keys? 
      never:
      K
  ]:K extends Keys?
      never:
      Keys extends `${infer F}.${infer R}`?
        K extends F?
          DeepOmit<T[K],R>:T[K]
        :T[K]
}
```

## 30301・IsOdd

```typescript
type ToString<T extends number> = `${T}`
type LastDigit<T extends string> = 
T extends `${infer F}${infer L}`?
  L extends ""?
    F:LastDigit<L>
  :never

type Match<T extends string> = T extends '1' | '3' | '5' | '7' | '9'?true:false

type IsOdd<T extends number> = Match<LastDigit<ToString<T>>>
```

## 30958・Pascal's triangle

```typescript
type GetLast<T extends number[][]> = T extends [...any,infer L extends number[]]?L:never;

type ToTuple<T extends number,R extends number[] = []> = R['length'] extends T? R: ToTuple<T,[...R,0]>

type Sum<T extends number,U extends number> = [...ToTuple<T>,...ToTuple<U>]['length']

type GenRow<
  T extends number[],
  R extends number[] = [1]
> = 
  T extends [infer F extends number,infer S extends number,...infer L extends number[]]?
    [Sum<F,S>] extends [infer A extends number]?

      GenRow<[S,...L],[...R,A]>:never
    :[...R,1]

type Pascal<
  N extends number, 
  R extends number[][] = [[1]]
> = 
  R['length'] extends N?
    R:
    Pascal<N,[...R,GenRow<GetLast<R>>]>
```
