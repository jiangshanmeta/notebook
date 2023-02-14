# [查询数组 Xor 美丽值](https://leetcode.cn/problems/find-xor-beauty-of-array/)

我们先把```(nums[i] | nums[j])```视为一个整体A,则我们要求的就转换为```(A&nums[k1])^(A&nums[k2]^...^(A&nums[kn]))```。 这个式子可以转换为 ```A&(nums[k1]^nums[k2]...^nums[kn])```，即一个数字与数组中每一个元素先做按位与，再把得到的数字做XOR，等于先把数组的元素做XOR，再和这个数字做按位与。

如何理解呢？如果A中某一位是0，那这一位做按位与都会得到0，再XOR依然是0。如果某一位是1，nums中这一位有m个1 n个0，最终这一位取决于m是奇数还是偶数，XOR正好可以用来处理。

下面的问题是如何处理这个A？只需要遍历求按位或即可。

```typescript
function xorBeauty (nums: number[]): number {
    let or = 0;
    let xor = 0;
    for (const num of nums) {
        or |= num;
        xor ^= num;
    }
    return or & xor;
}
```

还可以再优化一点：

```typescript
function xorBeauty (nums: number[]): number {
    let xor = 0;
    for (const num of nums) {
        xor ^= num;
    }
    return xor;
}
```

数组中某一位如果至少有一个1，则这一位的按位或为1，但是XOR的结果0 1都有可能，决定于XOR的结果。如果都是0，则怎么算都是0。最终我们可以只考虑XOR的结果。
