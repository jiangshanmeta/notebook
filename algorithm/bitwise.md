# Bitwise

## 二进制中最右侧的1

```typescript
function getRightMost1(n:number){
    return n&(-n)
}
```

例如 0b1010 得到 0b10 , 0b101 得到 0b1

还一种方式

```typescript
function getRightMost1(n:number){
    return n^( n&(n-1)  )
}
```

先清空低位1,然后XOR得到最右侧的1

## 位图

0~n-1数字 添加删除翻转验证存在

```typescript
class BitSet {
    private sequence:number[];
    constructor (n:number) {
        this.sequence = new Array<number>(Math.ceil(n / 32)).fill(0);
    }

    add (n:number) {
        this.sequence[Math.floor(n / 32)] |= 1 << (n % 32);
    }

    remove (n:number) {
        this.sequence[Math.floor(n / 32)] &= ~(1 << (n % 32));
    }

    reverse (n:number) {
        this.sequence[Math.floor(n / 32)] ^= 1 << (n % 32);
    }

    contains (n:number) {
        return (this.sequence[Math.floor(n / 32)] & (1 << (n % 32))) !== 0;
    }
}
```

一个更特殊的例子是 利用26位表示英文字母的存在， 只需要一个数字结合位运算即可
