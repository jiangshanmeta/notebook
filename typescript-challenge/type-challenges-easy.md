# type-challenges

[原项目地址](https://github.com/type-challenges/type-challenges)

## 4・Pick

```typescript
type MyPick<T, K extends keyof T> = {
  [P in K]:T[P]
}
```

## 7・Readonly

```typescript
type MyReadonly<T> = {
  readonly [K in keyof T]:T[K]
}
```

## 11・Tuple to Object 🤓

```typescript
type TupleToObject<T extends readonly any[]> = {
  [P in T[number]]:P
}
```

## 14・First of Array

```typescript
type First<T extends any[]> = T extends [first:infer U,...args:any] ? U:never;
```

## 18・Length of Tuple 🤓

```typescript
// 基于infer
type Length<T extends any> = T extends {length:infer U}?U:never;
// 基于索引访问
type Length<T extends any> = T extends {length:number}?T['length']:never;
```

## 43・Exclude

```typescript
type MyExclude<T , U > = T extends U?never:T;
```

## 189・Awaited

```typescript
type Awaited<T extends Promise<any>> = 
  T extends Promise<infer U>? 
    U extends Promise<any>?
      Awaited<U>:U
    :never
```

## 268・If

```typescript
type If<C extends boolean, T, F> = C extends true?T:F
```

## 533・Concat 🤓

```typescript
type Concat<T extends any[], U extends any[]> = [
  ...T,
  ...U
]
```

## 898・Includes

```typescript
type isAny<T> = 0 extends (1&T)?true:false;
// 前半部分都是处理any的情况
type MqEqual<A, B> = isAny<A> extends true?
    isAny<B> extends true?
        true:false
    : isAny<B> extends true ? false:
        // 到这里没有any了 那么就是可以互相作为子类
        // 要用非分布式类型 分布式类型处理不了never
        [A] extends [B] ?
        [B] extends [A]
        ? true: false
        :false
// 映射成新的数组 其值表示是否相等
//  {
//  [K in keyof T]:MqEqual<T[K],U> extends true?true:false;
//}
// 然后[number] 拿到把元素合并 这时可能会出现 true false boolean 三种情况
// 然后 true extends 判断是否有相等的
type Includes<T extends readonly any[], U> = true extends {
  [K in keyof T]:MqEqual<T[K],U> extends true?true:false;
}[number] ? true:false
```

## 3057・Push

```typescript
type Push<T extends any[], U> = [...T,U]
```

## 3060・Unshift

```typescript
type Unshift<T extends any[], U> = [U,...T]
```

## 3312・Parameters

```typescript
type MyParameters<T extends (...args: any[]) => any> = T extends (...args:infer U)=>any?U:never
```
