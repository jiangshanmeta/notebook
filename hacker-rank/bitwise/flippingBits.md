# [Flipping bits](https://www.hackerrank.com/challenges/flipping-bits/problem)

```typescript
function flippingBits(n: number): number {
    return (n^( (-1)>>>0 ))>>>0
}
```

-1的二进制就是32位全为1，然后做XOR操作实现flipBits。无符号右移0位，将数值视为无符号数
