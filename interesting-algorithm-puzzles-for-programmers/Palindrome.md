# 回文十进制数

> 求用十进制、二进制、八进制表示都是回文数的所有数字中，大于十进制数10的最小值。

```typescript
// 判断是否是回文
function isPalindrome(s: string) {
  let left = 0
  let right = s.length - 1
  while (left < right) {
    if (s[left++] !== s[right--])
      return false
  }
  return true
}

function findNumIsPalindromeBinaryOctalDecimal() {
  // 题目要求大于10 所以从11开始
  let num = 11
  while (true) {
    if (isPalindrome(num.toString()) && isPalindrome(num.toString(2)) && isPalindrome(num.toString(8)))
      break
    // 每次+2, 因为偶数的十进制表示肯定不是回文(最后一位是0 首位不为0)
    num += 2
  }
  return num
}
```
