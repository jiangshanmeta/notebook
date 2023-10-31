# type-challenges

[原项目地址](https://github.com/type-challenges/type-challenges)

## 151・Query String Parser

```typescript
type ParseItem<S extends string> = S extends `${infer K}=${infer V}`? Record<K,V>: Record<S,true>

type UniqueMerge<T extends any[],U extends any[],> = 
U extends [infer F,...infer R]? 
  F extends T[number]? UniqueMerge<T,R>:UniqueMerge<[...T,F],R> 
  :T


type Merge<A,B> = 
  A extends any[]?
    B extends any[]?
      UniqueMerge<A,B>
      :UniqueMerge<A,[B]>
    :
    B extends any[]?
      UniqueMerge<[A],B>
      : A extends B? A:[A,B]

type Combine<
  T,
  U,
> = 
  {
    [K in (keyof T) | (keyof U)]: 
      K extends keyof T?
        K extends keyof U?
          Merge<T[K],U[K]>
          : T[K]
        : 
        K extends keyof U?
          U[K]:never
  }

type ParseQueryString<S extends string,R = {}> = 
  S extends `${infer I}&${infer Z}`? 
    ParseQueryString<Z, Combine<R,ParseItem<I> > >
    :S extends ''?
      R:
      Combine<R,ParseItem<S> >
```

## 216・Slice

```typescript
type Repeat<T,C extends number,R extends T[] = []> = R['length'] extends C?R:Repeat<T,C,[...R,T]>

type MakePositive<
  N extends number,
  L extends any[],
  C extends any[] = []
> = 

`${N}` extends `-${string}`?
  L extends [any,...infer R]?
    `-${C['length']}` extends `${N}`? L['length']: MakePositive<N,R,[1,...C]>
    : 0
  : N


type SliceNormal<
  Arr extends any[],
  Start extends number,
  End extends number,
  Pre extends any[] = [],
  R extends any[] = []
> = 
Arr extends [infer F,...infer L]?
  Pre['length'] extends End? R
    : Pre['length'] extends Start? SliceNormal<L,Start,End,[...Pre,F],[F]>
      : R extends []? SliceNormal<L,Start,End,[...Pre,F],[]>: SliceNormal<L,Start,End,[...Pre,F],[...R,F]>
  : R


type Slice<
  Arr extends any[], 
  Start extends number = 0, 
  End extends number = Arr['length']
> = SliceNormal<
      Arr,
      MakePositive<Start,Repeat<0,Arr['length']>>,
      MakePositive<End,Repeat<0,Arr['length']>> 
    >
```

## 274・Integers Comparator

```typescript
enum Comparison {
  Greater,
  Equal,
  Lower,
}

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

type LargerThan<
  A extends number, 
  B extends number,
  AList extends number[] = [],
  BList extends number[] = [],
> = AList['length'] extends A?
      false:
      BList['length'] extends B?
        true: LargerThan<A,B,[1,...AList],[1,...BList]>

type Comparator<A extends number, B extends number> = A extends B?
  Comparison.Equal:
  `${A}` extends `-${infer A1}`?
    `${B}` extends `-${infer B1}`?
      LargerThan<ToNumber<A1>,ToNumber<B1>> extends true?Comparison.Lower:Comparison.Greater
      :Comparison.Lower
  : `${B}` extends `-${infer B1}`?
      Comparison.Greater:LargerThan<A,B> extends true?Comparison.Greater:Comparison.Lower ;

```

By Template-literal type

```typescript
enum Comparison {
  Greater,
  Equal,
  Lower,
}

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
    Comparison.Equal:
    A extends keyof GreatConfig?
      B extends GreatConfig[A]?
        Comparison.Lower:Comparison.Greater
      :never

type CompareDigits<
  A extends string,
  B extends string,
> = 
  [A,B] extends [`${infer AF}${infer AR}`,`${infer BF}${infer BR}`]?
    CompareDigit<AF,BF> extends infer CR?
      CR extends Comparison.Equal?
        CompareDigits<AR,BR>
        :CR
    :never
  : Comparison.Equal


type CompareByLength<
  A extends string,
  B extends string,
> = 
  A extends `${infer AF}${infer AR}`?
    B extends `${infer BF}${infer BR}`?
      CompareByLength<AR,BR>:
      Comparison.Greater
    : B extends `${infer BF}${infer BR}`?
      Comparison.Lower:Comparison.Equal


type CompareNonNegative<
  A extends string,
  B extends string,
  ByLength extends Comparison = CompareByLength<A,B>
> = 
  ByLength extends Comparison.Equal?
    CompareDigits<A,B>:
    ByLength


type Comparator<
  A extends number, 
  B extends number
> = 
`${A}` extends `-${infer ABS_A}`?
  `${B}` extends `-${infer ABS_B}`?
    CompareNonNegative<ABS_B,ABS_A>
    : Comparison.Lower
  : `${B}` extends `-${infer ABS_B}`?
    Comparison.Greater
    : CompareNonNegative<`${A}`,`${B}`>
```

## 462・Currying 2

```typescript
type Remove<T extends any[],U extends any[]> = 
[T,U] extends [[infer TF,...infer TR],[infer UF,...infer UR] ]?
  Remove<TR,UR>
  :T

type Overloads<T extends any[]> = 
T extends [infer F,...infer L]?
  [F] | [F,...Overloads<L>] | []
  : []

type Curried<P extends any[],R extends any> = 
P extends [infer F,...infer L]?
  <K extends Overloads<L>>(arg:F,...rest:K)=> Curried<Remove<L,K>,R >
  :R


declare function DynamicParamsCurrying<P extends any[],R>(fn: (...args:P)=>R ): Curried<P,R>
```

## 734・Inclusive Range

```typescript
type GreatThanByLength<A extends string,B extends string> = 
A extends `${string}${infer AR}`?
  B extends `${string}${infer BR}`?
    GreatThanByLength<AR,BR>
    : 1
  :
  B extends ''? 0: -1


type GreatThanByDigitConfig = {
  '0':never;
  '1': '0',
  '2': '0' | '1',
  '3': '0' | '1' | '2',
  '4': '0' | '1' | '2' | '3',
  '5': '0' | '1' | '2' | '3' | '4',
  '6': '0' | '1' | '2' | '3' | '4' | '5',
  '7': '0' | '1' | '2' | '3' | '4' | '5' | '6',
  '8': '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7',
  '9': '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'
}



type GreatThanBydigit<A extends string,B extends string> = 
A extends keyof GreatThanByDigitConfig?
  B extends GreatThanByDigitConfig[A]? true:false
  :false


type GreatThanByDigits<A extends string,B extends string> = 
A extends `${infer AF}${infer AR}`?
  B extends `${infer BF}${infer BR}`?
    AF extends BF?
      GreatThanByDigits<AR,BR>
      : GreatThanBydigit<AF,BF>
    :false
  :false


type GreatThan<A extends number,B extends number> = 
A extends B?
  false:
  GreatThanByLength<`${A}`,`${B}`> extends infer C?
    C extends 1?
      true:
      C extends 0?
        GreatThanByDigits<`${A}`,`${B}`>
        :false
    :never


type MakeTuple<T extends number,R extends number[] = []> = 
R['length'] extends T ?
  R:MakeTuple<T,[...R,0]>

type Range<L extends number,H extends number,R extends number[] = [],C extends number[] = MakeTuple<L> > = 
C['length'] extends H?
  [...R,H]
  :Range<L,H,[...R,C['length']],[...C,0]>


type InclusiveRange<Lower extends number, Higher extends number> = 
GreatThan<Lower,Higher> extends true?
  []:Range<Lower,Higher>
```

## 741・Sort

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


type SplitArray<T extends number[],L extends number[] = [],R extends number[] = []> = 
  T extends [infer A extends number,...infer M extends number[],infer B extends number]?
    SplitArray<M,[...L,A],[B,...R]>
    : T['length'] extends 1?
      [[...L,T[0]],R]
      :[L,R]


type Merge<A extends number[],B extends number[],R extends number[] = [] > = 
  [A,B] extends [
    [infer FA extends number,...infer RA extends number[]],
    [infer FB extends number,...infer RB extends number[]]
  ]?
    LTE<FA,FB> extends true?
      Merge<RA,B,[...R,FA]>
      :Merge<RB,A,[...R,FB]>
    : [...R,...A,...B]

type MergeSort<
  T extends number[],
  H extends [number[],number[]]= SplitArray<T>,
  > = 

  T['length'] extends (0 | 1)?
    T: 
      [MergeSort<H[0]>,MergeSort<H[1]>] extends [infer A extends number[],infer B extends number[]]?
        Merge<A,B>:T

type Reverse<T extends number[]> = T extends [infer F extends number,...infer M extends number[],infer R extends number] ?
  [R,...Reverse<M>,F]:T


type Sort<T extends number[],Desc extends boolean = false ,R extends number[]= MergeSort<T>> = Desc extends true? Reverse<R>:R
```
