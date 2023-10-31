# type-challenges

[原项目地址](https://github.com/type-challenges/type-challenges)

## 17・Currying 1

```typescript
type Curry<T> = 
  T extends (...args:infer A)=>infer R?
    A extends [infer F,...infer L]?
      (a:F)=>Curry<(...args:L)=>R>
      : R
    :never;

declare function Currying<T >(fn: T): Curry<T>
```

## 55・Union to Intersection

```typescript
type UnionToIntersection<U> = (U extends any? (a:U)=>void : never) extends (a:infer T)=>void ? T:never
```

## 57・Get Required

```typescript
type FilterRequiredKey<T,K extends keyof T> = T extends {
  [k in K]-?:T[k]
}? K :never;

type GetRequired<T> = {
  [K in keyof T as FilterRequiredKey<T,K>]:T[K]
}
```

## 59・Get Optional

```typescript
type FilterOptionalKey<T,K extends keyof T> = T extends {
  [k in K]-?:T[k]
}? never:K;

type GetOptional<T> = {
  [K in keyof T as FilterOptionalKey<T,K>]:T[K]
}
```

## 89・Required Keys

```typescript
type RequiredKeys<T , K = keyof T> = K extends keyof T ? 
    T extends Required<Pick<T,K>> ? K : never
    :never
```

## 90・Optional Keys

```typescript
type OptionalKeys<T,K = keyof T> = K extends keyof T?
  T extends Required<Pick<T,K>>?never:K
  :never;
```

## 112・Capitalize Words

```typescript
type CapitalizeWords<S extends string> = Capitalize<
  CapitalizeSeparator< CapitalizeSeparator<CapitalizeSeparator<S,' '>,','> ,'.' >
>

type CapitalizeSeparator<T extends string,S extends string> = T extends `${infer F}${S}${infer L}`?
  `${Capitalize<F>}${S}${Capitalize<CapitalizeSeparator<L,S>>}`:T
```

## 114・CamelCase

```typescript
type CamelCase<S extends string,S1 = Lowercase<S>> = S1 extends `${infer F}_${infer R}`?`${F}${Capitalize<CamelCase<R>>}`:S1
```

## 147・C-printf Parser

```typescript
type ControlsMap = {
  c: 'char',
  s: 'string',
  d: 'dec',
  o: 'oct',
  h: 'hex',
  f: 'float',
  p: 'pointer',
}

type ParsePrintFormat<S extends string,T extends string[] = []> = S extends `${infer F}%${infer K}${infer R}`?
  K extends keyof ControlsMap?
    ParsePrintFormat<R,[...T,ControlsMap[K]]>
    :ParsePrintFormat<R,T>
  :T
```

## 223・IsAny

```typescript
type IsAny<T> = 0 extends (1&T) ? true:false
```

## 300・String to Number

```typescript
type Make10<T extends any[]> = [
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

type Make1<S extends string,T extends any[] = []> = `${T['length']}` extends S?T:Make1<S,[0,...T]>

type ToTuple<S extends string,T extends any[] = []> = S extends `${infer F}${infer R}`?ToTuple<R,[...Make10<T>,...Make1<F>]>:T

type ToNumber<S extends string> = ToTuple<S>['length']
```

A better way

```typescript
type ToNumber<S extends string> = S extends `${infer T extends number}`?T:never
```

## 399・Tuple Filter

```typescript
type FilterOut<T extends any[], F> = T extends [infer I,...infer R]?
  [I] extends [F] ? FilterOut<R,F>: [I,...FilterOut<R,F>]
  :[]
```

## 472・Tuple to Enum Object

```typescript
type Tuple2Object1<T extends readonly any[]> = {
  readonly [K in T[number] as Capitalize<K>]:K
}

type Copy<T> = {
  [K in keyof T]:T[K]
}

type Tuple2Object2<T extends readonly any[],C extends any[] = []> = T extends readonly [infer F,...infer R]?
  {
    readonly [K in (F&string) as Capitalize<K> ]:C['length']
  } & Tuple2Object2<R,[...C,0]>
  :{}

type Enum<T extends readonly string[], N extends boolean = false> = N extends false ? Tuple2Object1<T>:Copy<Tuple2Object2<T>>
```

## 651・Length of String 2

```typescript
type LengthOfString<S extends string,C extends number[] = []> = S extends `${infer F0}${infer F1}${infer F2}${infer F3}${infer F4}${infer F5}${infer F6}${infer F7}${infer F8}${infer F9}${infer R}`? LengthOfString<R,[...C,0,1,2,3,4,5,6,7,8,9]>
  : S extends `${infer F}${infer R}`?
    LengthOfString<R,[...C,0]>
    :C['length']
```

## 847・String Join

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
declare function join<U extends string>(delimiter: U): <T extends string[]>(...parts: T) => Join<T,U>;
```

## 956・DeepPick

```typescript
type DeepPick<T extends Record<string,any>, U extends string> = (U extends string? 
  U extends `${infer F}.${infer R}`?
    (arg:{
      [K in F]:DeepPick<T[F],R>
    })=>void
    :U extends keyof T?
      (arg:Pick<T,U>)=>void
      :(arg:unknown)=>void
  :never
  
  ) extends (arg:infer Z)=>void? Z:never;
```

## 1383・Camelize

```typescript
type CamelizeWord<T extends string> = T extends `${infer F}_${infer L}`?`${F}${Capitalize<L>}`:T

type Camelize<T> = T extends any[]?
    T extends [infer F,...infer R]?
      [Camelize<F>,...Camelize<R>]
    :[]
  :
  T extends Record<string,any>?
    {
      [K in keyof T as CamelizeWord<K&string>]:Camelize<T[K]>
    }

  :T

```

## 2095・Drop String

```typescript
type DropOne<S extends string,R extends string> = S extends `${infer A}${R}${infer B}`?
  DropOne<`${A}${B}`,R>
  :S

type DropString<S extends string, R extends string> = R extends `${infer F}${infer L}`?
  DropString<DropOne<S,F>,L>
  :S
```

## 2822・Split

```typescript
type NormalSplit<S extends string, SEP extends string> = S extends `${infer F}${SEP}${infer R}`?[
  F,
  ...Split<R,SEP>
]:[S]

type StringToTuple<S extends string> = S extends `${infer F}${infer R}`?[F,...StringToTuple<R>]:[] 

type Split<S extends string, SEP extends string> = string extends S?
  string[]
  :SEP extends ''?
    StringToTuple<S>
    :NormalSplit<S,SEP>
```

## 2828・ClassPublicKeys

解法一：

```typescript
type ClassPublicKeys<T extends any,K = keyof T> = K extends keyof T? T extends Pick<T,K>?K:never : never;
```

解法二：

```typescript
type ClassPublicKeys<A> = keyof A
```

## 2857・IsRequiredKey

```typescript
type IsRequiredKey<T, K extends keyof T> = (K extends keyof T?  
  T extends Required<Pick<T,K>>?true:false
  :never) extends true?true:false;
```

## 2949・ObjectFromEntries

解法1:

```typescript
type Copy<T> = {
  [K in keyof T]:T[K]
}

type ObjectFromEntries<T extends [string,any]> = Copy<(T extends any? (arg:{
  [K in T[0]]:T[1]
})=>void:never) extends (arg:infer U)=>void ?U:never>;
```

解法2:

```typescript
type ObjectFromEntries<T extends [string,any]> = {
  [K in T as K[0]]:K[1]
}
```

## 4037・IsPalindrome

```typescript
type StringToTuple<T extends string> = T extends `${infer F}${infer R}`? [F,...StringToTuple<R>]:[];

type IsIsPalindromeArray<T extends any[]> = T extends [infer F,...infer M,infer L] ? 
  F extends L?IsIsPalindromeArray<M>:false
  :true;

type IsPalindrome<T extends string | number> = IsIsPalindromeArray<StringToTuple<`${T}`>>
```

## 5423・Intersection

```typescript
type ToUnion<T> = T extends any[]? T[number]:T;

type Intersection<T extends any[],R = ToUnion<T[0]>> = T extends [infer F,...infer L]? Intersection<L,R & ToUnion<F>>:R
```

## 6141・Binary to Decimal

```typescript
type BinaryToDecimal<
  S extends string,
  R extends any[] = []
> = 
  S extends `${infer F}${infer L}`?
    F extends '0'? BinaryToDecimal<L,[...R,...R]>:BinaryToDecimal<L,[...R,...R,1]>
    :R['length']
```

## 7258・Object Key Paths

```typescript
type GenNode<K extends string | number,IsRoot extends boolean> = IsRoot extends true? `${K}`: `.${K}` | (K extends number? `[${K}]` | `.[${K}]`:never)

type ObjectKeyPaths<
  T extends object,
  IsRoot extends boolean = true,
  K extends keyof T = keyof T
> = 
K extends string | number ?
  GenNode<K,IsRoot> | (T[K] extends object? `${GenNode<K,IsRoot>}${ObjectKeyPaths<T[K],false>}`:never)
  :never;
```

## 8804・Two Sum

```typescript
type MakeArr<T extends number,R extends number[] = []> = R['length'] extends T? R:MakeArr<T,[...R,0]>

type TwoSum<
  T extends number[], 
  U extends number,
  C extends number[] = []
> =
  T extends [infer F,...infer R]?
    [
      U extends [...MakeArr<F&number>,...C]['length']? true:false,
      F extends U?true:false
    ] extends [true,false]
    ?
      true:
        R extends number[]?
          TwoSum<R,U,C | MakeArr<F&number>>
          :false

    :false
```

## 9155・ValidDate

```typescript
type one2nine = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
type zero2nine = '0' | one2nine;

type thirty = `0${one2nine}` | `1${zero2nine}` | `2${zero2nine}` | '30'
type thirtyone = thirty | '31'
type twentyeight = Exclude<thirty,'30' | '29'>

type DateMap = {
  '01':thirtyone;
  '02':twentyeight;
  '03':thirtyone;
  '04':thirty;
  '05':thirtyone;
  '06':thirty;
  '07':thirtyone;
  '08':thirtyone;
  '09':thirty;
  '10':thirtyone;
  '11':thirty;
  '12':thirtyone;
}

type ValidDate<
  T extends string
> = 
T extends `${infer F}${infer S}${infer D}`?
  `${F}${S}` extends keyof DateMap?
    D extends DateMap[`${F}${S}`]?true:false
    :false
  :never;
```

## 9160・Assign

```typescript
type Merge<T> = {
  [K in keyof T]:T[K]
}

type Assign<
  T extends Record<string, unknown>, 
  U extends any[]
> =
U extends [infer F,...infer L]?
  F extends Record<string,unknown>?
    Assign<Omit<T,keyof F>& F,L >
    :Assign<T,L>
  :Merge<T>
```

### 9384・Maximum

```typescript
type ParseNumber<
  S extends string
> = 
  S extends `${infer I}.${infer D}`?
    [I,D]
    :[S,'']
// l -> -1 e->0 g->1
type CompareLength<
  A extends string,
  B extends string,
> = 
  A extends `${string}${infer AR}`?
    B extends `${string}${infer BR}`?
      CompareLength<AR,BR>
      :1
    : 
    B extends A?
      0:-1

type GreatConfig  = {
  "0": '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'| '9'
  "1": '2' | '3' | '4' | '5' | '6' | '7' | '8'| '9',
  '2': '3' | '4' | '5' | '6' | '7' | '8'| '9',
  "3": '4' | '5' | '6' | '7' | '8'| '9',
  "4": '5' | '6' | '7' | '8'| '9',
  "5": '6' | '7' | '8'| '9',
  '6': '7' | '8'| '9',
  "7": '8'| '9'
  "8": '9',
  '9': never,
}

type CompareDigit<
  A extends string,
  B extends string,
> = 
  A extends B?
    0:
    A extends keyof GreatConfig?
      B extends GreatConfig[A]?
        -1:1
      :never

type CompareDigits<
  A extends string,
  B extends string,
> =
A extends `${infer AF}${infer AR}`?
    B extends `${infer BF}${infer BR}`?
        CompareDigit<AF, BF> extends infer CR?
            CR extends 0?
                CompareDigits<AR, BR>
                :CR
            :never
        : 1
  :
  B extends A?
    0:-1
    

type CompareNonNegetive<
  T extends string,
  U extends string,
  TP extends [string,string] = ParseNumber<T>,
  UP extends [string,string] = ParseNumber<U>,
  ByLength extends (0 | 1 | -1) = CompareLength<TP[0],UP[0]>
> = 

  ByLength extends 0?
    TP[0] extends UP[0]?
      CompareDigits<TP[1],UP[1]>
      :CompareDigits<TP[0],UP[0]>
    
    :ByLength


type LTE<
  A extends number,
  B extends number,
> = 
`${A}` extends `-${infer ABS_A}`?
  `${B}` extends `-${infer ABS_B}`?
    CompareNonNegetive<ABS_B,ABS_A> extends 1?false:true
    : true
  :
  `${B}` extends `-${string}`?
    false: 
    CompareNonNegetive<`${A}`,`${B}`> extends 1? false:true



type Max<
  T extends number[],
  R extends number
> =
T extends [infer F extends number,...infer L extends number[]]?
  LTE<R,F> extends true?
    Max<L,F>: Max<L,R>
  :R


type Maximum<T extends number[]> = 
T['length'] extends 0?
  never:
  Max<T,T[0]>
```

## 9775・Capitalize Nest Object Keys

```typescript
type CapitalizeNestObjectKeys<T> = T extends readonly any[]
  ? {
      [K in keyof T]: CapitalizeNestObjectKeys<T[K]>;
    }
  : T extends Record<keyof any, any>
  ? {
      [K in keyof T as Capitalize<K & string>]: CapitalizeNestObjectKeys<T[K]>;
    }
  : T;
```

## 13580・Replace Union

```typescript
type Replace<T, U extends [any,any][]> = 
  U extends [
    infer F extends [any,any],
    ...infer R extends [any,any][]
  ]? 
    T extends F[0]?
      F[1]:
      Replace<T,R>
    :never
  
type UnionReplace<T, U extends [any, any][]> = 
  T extends any?
    T extends U[number][0]?
      Replace<T,U>:T
    :never
```

## 14080・FizzBuzz

```typescript
type FizzBuzz<
  N extends number,
  R extends string[] = [],
  Three extends any[] = [0],
  Five extends any[] = [0]
> = 
R['length'] extends N?
  R:
  [Three['length'],Five['length']] extends [3,5]?
    FizzBuzz<N,[...R,'FizzBuzz'],[0],[0]>:
    Three['length'] extends 3?
      FizzBuzz<N,[...R,'Fizz'],[0],[...Five,0]>:
      Five['length'] extends 5?
        FizzBuzz<N,[...R,'Buzz'],[...Three,0],[0]>:
        FizzBuzz<N,[...R,`${[...R,0]['length']}`],[...Three,0],[...Five,0]>
```

## 14188・Run-length encoding

```typescript
type Make10<S extends string> = `${S}${S}${S}${S}${S}${S}${S}${S}${S}${S}`

type Repeat<T extends string,N extends string,R extends string = ''> = 
    N extends `${infer F}${infer L}`?
      F extends '1'?
        Repeat<T,L,`${Make10<R>}${T}`>:
        F extends '2'?
          Repeat<T,L,`${Make10<R>}${T}${T}`>:
            F extends '3'?
              Repeat<T,L,`${Make10<R>}${T}${T}${T}`>:
                F extends '4'?
                  Repeat<T,L,`${Make10<R>}${T}${T}${T}${T}`>:
                    F extends '5'?
                      Repeat<T,L,`${Make10<R>}${T}${T}${T}${T}${T}`>:
                        F extends '6'?
                          Repeat<T,L,`${Make10<R>}${T}${T}${T}${T}${T}${T}`>:
                            F extends '7'?
                              Repeat<T,L,`${Make10<R>}${T}${T}${T}${T}${T}${T}${T}`>:
                                F extends '8'?
                                  Repeat<T,L,`${Make10<R>}${T}${T}${T}${T}${T}${T}${T}${T}`>:
                                    F extends '9'?
                                      Repeat<T,L,`${Make10<R>}${T}${T}${T}${T}${T}${T}${T}${T}${T}`>:
                                        Repeat<T,L,Make10<R>>

      :R

namespace RLE {
  type Length<T extends number> = T extends 1?'':`${T}`


  export type Encode<S extends string,R extends string = '',Q extends string[] = []> = 
    S extends `${infer F}${infer L}`?
      Q['length'] extends 0?
        Encode<L,R,[F]>
        :F extends Q[0]?
          Encode<L,R,[...Q,F]>
          :Encode<L,`${R}${Length<Q['length']>}${Q[0]}`,[F]>

      :Q['length'] extends 0?
        R:`${R}${Length<Q['length']>}${Q[0]}`


  
  type Num = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
  export type Decode<S extends string,N extends string = '',R extends string = ''> = 
    S extends `${infer F}${infer L}`?
      F extends Num?
        Decode<L,`${N}${F}`,R>
        :Decode<L,'',`${R}${Repeat<F,N extends ''?'1':N>}`>
      :R
}
```

## 15260・Tree path array

```typescript
type Path<T,S extends any[] = [],K extends keyof T = keyof T> = 
  K extends keyof T?
    [...S,K] | (T[K] extends Record<keyof any,any>? Path<T[K],[...S,K]>:never)
    :never 
```

## 19458・SnakeCase

```typescript
type SnakeCase<
  T extends string,
  R extends string = ''
> = 
T extends `${infer F}${infer L}`?
  F extends Uppercase<F>?
    SnakeCase<L,`${R}_${Lowercase<F>}` >
    :SnakeCase<L,`${R}${F}` >
  :R;
```

## 25747・IsNegativeNumber

```typescript
type IsUnion<T,U = T> = T extends U ?
  [U] extends [T]?false:true
  :never
type IsNegativeNumber<
  T extends number
> = 
IsUnion<T> extends true?
  never:
  number extends T?
    never:
    `${T}` extends `-${string}`?
      true:false
```

## 28143・OptionalUndefined

```typescript
type Merge<T> = {
  [K in keyof T]:T[K]
}

type OptionalUndefined<
  T, 
  Props extends keyof T = keyof T,
  OptionsProps extends keyof T = 
    Props extends keyof T? 
      undefined extends T[Props]? 
        Props:never 
      :never
> = 
  Merge<{
    [K in OptionsProps]?:T[K]
  } & {
    [K in Exclude<keyof T,OptionsProps>    ]:T[K]
  }>
```

## 30575・・OptionalUndefined

```typescript
type MakePrefix<
  S extends string, 
  P extends string = ''
> = 
  S extends `${string}${infer R}`?
    MakePrefix<R,`${P}0`>
    :P

type Pad<S1 extends string,S2 extends string> = 
  [S1,S2]extends [`${string}${infer RS1}`,`${string}${infer RS2}`]?
    Pad<RS1,RS2>: [MakePrefix<S2>,MakePrefix<S1>]

type _XOR<
  S1 extends string,
  S2 extends string,
  R extends string = ''
> =  
[S1,S2] extends [`${infer F1}${infer R1}`,`${infer F2}${infer R2}`]?
  _XOR<R1,R2,`${R}${F1 extends F2?'0':'1'}`>
  :R


type BitwiseXOR<
  S1 extends string,
  S2 extends string
> = 
  Pad<S1,S2> extends [infer P1 extends string,infer P2 extends string]?
    _XOR<`${P1}${S1}`,`${P2}${S2}`>
    :never
```
