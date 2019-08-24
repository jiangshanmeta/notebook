# 模块化且可重用的代码

## 方法链与管道化

之前几章提到了利用Lodash的_.chain实现方法链，这种方式相较于一层层调用函数具有更高的可读性，也能实现lazy功能，但是能使用的方法是有限的(决定于lodash本身，虽然可以通过mixin进行扩展)，难以轻易联合其他函数库提供的函数使用。

管道化可以打破方法链的约束，它是把函数的输入和输出松散地连接起来。

管道化中的函数的输入和输出需要满足两个兼容条件：

* 元数。接收函数必须声明至少一个参数才能处理上一个函数的返回值
* 类型。函数的返回类型必须与接收函数的参数类型相匹配

关于类型一般是用haskell的一套符号标记，通用格式如下：

```text
<function-name> :: <Inputs> -> <Output>
```

例如：

```text
trim :: String->String
```

## 偏函数与柯力化

偏函数和柯力化可以将函数元数兼容。通常在管道化中的函数参数都是一个，但是原始函数的参数可以为多个，这是就需要将元数降低。

在JavaScript可以使用bind方法(和偏函数以及柯力化有点不同，但够用了)，可以预填充部分参数，得到新函数，到达降元的目的。

## 组合管道函数

```javascript
function compose(...fns){
    let start = fns.length-1;
    return function(){
        let i = start;
        let result = fns[i].apply(this,arguments);
        while(i--){
            result = fns[i].call(this,result);
        }
        return result;
    }
}
```

我们可以使用上面的compose函数实现函数的组合。

再来看函数组合中的类型兼容问题，

```text
g::A->B
f::B->C

f.g = compose::(B->C)->(A->B)->(A->C)
```

函数g接收类型A返回类型B，函数f接收类型B返回类型C，其组合compose(f,g)接收类型A，返回类型C

## 组合子

书中说的组合子似乎有点问题，大家看github上的资料吧

[combinators.js](https://gist.github.com/Avaq/1f0636ec5c8d6aed2e45)

[combinators-js](https://github.com/benji6/combinators-js)
