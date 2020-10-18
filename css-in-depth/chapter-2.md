# 相对单位

## em rem

em是相较于父元素，一般而言em不倾向于用在设置字体上(推荐用rem)，其他属性(比如padding)可以考虑使用em。非字体大小使用em，其最终计算值是根据字体大小来的。

rem是相较于根节点(即html 也可以使用伪类选择器:root)，适合设置字体大小。

## vw vh vmin vmax

* vw 视口宽度的1/100
* vh 视口高度的1/100
* vmin 视口高度、宽度较小的一方的1/100
* vmax 视口高度、宽度较大的一方的1/100

## CSS变量

```css
:root{
    /* 名称必须以--开头 */
    --main-color:red;
}
.selector{
    color:var(--main-color);
}
```

在有css预编译器的情况下，静态的css变量其实用处不大。但是我们可以动态改变css变量。

```css
.theme-1{
    --main-color:red;
}
.theme-2{
    --main-color:green;
}
```

这样可以比较容易实现主题色功能。
