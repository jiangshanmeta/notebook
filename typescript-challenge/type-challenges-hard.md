# type-challenges

[原项目地址](https://github.com/type-challenges/type-challenges)

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

```typescript
type Copy<T> = {
  [K in keyof T]:T[K]
}

type ObjectFromEntries<T extends [string,any]> = Copy<(T extends any? (arg:{
  [K in T[0]]:T[1]
})=>void:never) extends (arg:infer U)=>void ?U:never>;
```

## 4037・IsPalindrome

```typescript
type StringToTuple<T extends string> = T extends `${infer F}${infer R}`? [F,...StringToTuple<R>]:[];

type IsIsPalindromeArray<T extends any[]> = T extends [infer F,...infer M,infer L] ? 
  F extends L?IsIsPalindromeArray<M>:false
  :true;

type IsPalindrome<T extends string | number> = IsIsPalindromeArray<StringToTuple<`${T}`>>
```
