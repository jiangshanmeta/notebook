# [web性能实战](https://book.douban.com/subject/35083270/)

本书对web性能限定为网站的加载速度，主要措施是减少传输的数据量。

主要包括以下具体措施：

* 缩小资源
  * 缩小css
  * 缩小javascript
  * 缩小HTML
* 服务器压缩
* 压缩图像

## 优化CSS

* 简写CSS，比如margin padding这样的属性尽可能把属性值合并起来
* 减少CSS选择器的层级，尤其是使用了less/sass的嵌套
* 同样的CSS属性在不同选择器下多次声明，可合并选择器
* 分割CSS，减少入口CSS体积
* 如果直接使用CSS框架，按需下载需要的样式
* 避免使用@import(会造成串行下载而不是并行下载)(然而就没见人用过)
* 将link放在head标签中(解决无样式内容闪烁，同时尽早加载样式)
* 使用CSS动画/过渡而不是js动画
* 首屏CSS内联(无需请求独立的样式文件 首屏渲染快)
* 使用preload非阻塞加载样式文件(css加载会阻塞DOM树的渲染 css加载会阻塞后面js语句的执行)

## 优化图片

图片优化的一个主要目标是针对不同屏幕采用不同大小的图片，既能保证视觉效果，又能节约传输图片体积。下面的基于媒体查询优化CSS的图片，srcset属性以及picture元素都是这一思路的体现。

采用svg可保证同一张图片可以适配不同屏幕。

### 基于媒体查询优化CSS中的图片

可以基于不同屏幕采用不同的图片：

```css
#app{
  background-image:url('img/sm.png');
}

@media (min-width:1024px){
  #app{
    background-image:url('img/medium.png');
  }
}
```

针对高清屏的需要展示高清图片：

```css
@media screen (-webkit-min-device-pixel-ratio:2),(min-resolution:192dpi){
  #app{
    background-image:url('img/large.png');
  }
}
```

### 基于srcset选择不同图片

img标签的srcset属性相当于是加强版的src，它可以指定多张图片，并且指定图片宽度，浏览器会根据需求从srcset中选择一个最合适的下载：

```html
<img
  src="img/small.jpg"
  srcset="img/small.jpg 512w,img/medium.jpg 768w,img/large.jpg 1280w"
>
```

上面指定了三张图片，宽度分别为512 768和1280，w表示宽度

还可以使用sizes属性进一步控制：

```html
<img
  src="img/small.jpg"
  srcset="img/small.jpg 512w,img/medium.jpg 768w,img/large.jpg 1280w"
  sizes="(min-width:704px) 50vw, (min-width:480px) 75vw, 100vw"
>
```

上面代码的含义是： 屏幕704px及以上 图片宽度50w，480-703px 图片宽度75w，其他图片宽度100w

### 使用picture元素选择不同图片

picture元素和srcset属性所解决的问题很相似，都是提供一组图供浏览器选择，srcset适合一组图片长宽比一致的，不一致的适合picture元素。

```html
<picture>
  <source media="(min-width:704px)" srcset="img/medium.jpg 384w" sizes="33.3vw">
  <source srcset="img/small.jpg 320w" sizes="75vw">
  <img src="img/small.jpg">
</picture>
```

当屏幕宽度为704px或者更宽，采用medium图片，图片宽度384px，图片以33.3w渲染；小于704，第二个source标签生效，图片宽度320px，以75w展示。img标签是用来进行回退的。

为了适配高清屏，还可以可以进一步配置source元素的srcset属性

```html
<picture>
  <source media="(min-width:704px)" srcset="img/medium.jpg 384w,img/large.jpg 512w" sizes="33.3vw">
  <source srcset="img/small.jpg 1x,img/medium.jpg 2x" sizes="75vw">
  <img src="img/small.jpg">
</picture>
```

当屏幕尺寸不小于704px时，高清屏可以采用宽度为512的图片。其他情况下，即第二个source属性，1x表示适合标准DPI屏幕，2x表示适合更高DPI屏幕。

### 雪碧图

雪碧图其实是HTTP1时代合并请求这一策略在图片上的体现，它可以减少请求次数，但是一个图更改意味着整个图片都要替换，不利于缓存，在HTTP2时代这个认为是反模式，不推荐使用
