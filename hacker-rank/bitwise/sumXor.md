# [Sum vs XOR](https://www.hackerrank.com/challenges/sum-vs-xor/problem)

这题首先要会[用位运算实现加法](https://leetcode.cn/problems/sum-of-two-integers/)

```typescript
function helper (a:number, b:number):number {
    if (a === 0) {
        return b;
    }
    if (b === 0) {
        return a;
    }
    return helper(a ^ b, (a & b) << 1);
}
```

注意到如果两个数的之和等于这两个数XOR，则两个数按位与为0，也就是说，X只能在L为0的比特位上为0或1，X只能在L为1的比特位上为0。于是问题就转换成了L的二进制表示中有多少个0。

```typescript
function sumXor(n: number): number {
    if(n === 0){
        return 1
    }
    let count = 0;
    const bininay = n.toString(2)
    for(let i=0;i<bininay.length;i++){
        if(bininay[i] === '0'){
            count++
        }
    }

    return 2**count;
}
```

这里有两个实现层面的小坑：

* L为0这个特殊的case，因为只有一个数，数零的个数不对的
* L的上限比较大，超过32位无符号数的表示范围，js用位运算处理零的个数会出错，需要转换为字符串计算零
