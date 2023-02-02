# [Maximizing XOR](https://www.hackerrank.com/challenges/maximizing-xor/problem)

先来几个例子：

```html
000100
101000
```

这两个数字范围内能构成的最大XOR是 ```111111```, 我们可以选择 ```100000```和```011111```这两个数构成。

这就启发我们要从高位到低位找第一个L和R不同的比特位，从这位开始就所有比特位均为1就是我们能找到的最大XOR值

```typescript
function maximizingXor(l: number, r: number): number {
    const strR = r.toString(2)
    const strL = padStart(l.toString(2),strR.length);
    for(let i=0;i<strL.length;i++){
        if(strR[i] !== strL[i]){
            return 2**(strR.length-i)-1
        }
    }
    return 0
}
function padStart(s:string,targerL:number):string{
    return ' '.repeat(targerL-s.length)+s;
}
```

这个是我最开始的实现，转换成字符串寻找第一个不同的比特位。

```typescript
function maximizingXor(l: number, r: number): number {
    return (1 << (32 - Math.clz32( l ^ r) ) ) - 1
}
```

这个是网友给的一个答案，寻找第一个高位不同位采用XOR运算。Math.clz32会```返回一个数字在转换成 32 无符号整形数字的二进制形式后，开头的 0 的个数```。
