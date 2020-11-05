# 模块化CSS

## 工具类

工具类是能在各处用到的非常小的CSS片段，比如：

```css
.text-center{
    text-align:center;
}
```

## CSS方法论

CSS非常容易互相影响，所以需要模块化来减少冲突，为此诞生了一些方法论：

* OOCSS 面向对象的CSS
* SMACSS 可扩展的、模块化的CSS
* BEM block(块)__element(元素)--modifier(修饰符)
* ITCSS

## BEM

button模块：

```less
.button{
    .button--success{}
    .button--danger{}
    .button--small{}
    .button--large{}
}
```

button模块没有子元素，只有修饰符

media模块：

```less
.media{
    .media__image{}
    .media__body{}
}
```

media模块具有两个子元素image和body
