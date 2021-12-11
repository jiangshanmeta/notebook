# type-challenges

[原项目地址](https://github.com/type-challenges/type-challenges)

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
