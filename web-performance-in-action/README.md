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

### 图片压缩

在保证视觉效果的前提下压缩图片

### 使用webP图片

### 图片懒加载

## 优化字体

本书中提到可以限制字体数量，取字符子集限制字体等措施。然而中文环境下用字体主要是来做icon，所以这些措施基本无效。

## 优化JavaScript

### 合理放置script元素

因为script标签会阻塞页面渲染，一般推荐把script标签放在body底部，而不是head中。不过现在都是SPA，都是脚本控制的渲染，这个建议不是很有用。然而考虑到有骨架屏这个概念，显示纯展示一个骨架屏，等应用代码加载好再控制页面，这时显然script应该放在底部。

### 使用script的async属性

该属性使得script在加载的时候不会阻塞渲染，同时脚本下载完成后不需要等待其他脚本下载完成，立即执行。

## 基于service-worker和cacaheStorage缓存资源

service-worker相当于是前端能控制的代理服务器，可以用来缓存资源。

```javascript
const cacheVersion = 'v1';
// 要缓存的资源
const cacheAssets = [];
self.addEventListener("install",function(event){
  // cacheStorage 缓存资源
  event.waitUntil(caches.open(cacheVersion).then(function(cache){
    return cache.addAll(cacheAssets)
  }).then(function(){
    // 跳过waiting阶段(因为可能有别的serviceworker在控制)，当前service-wroker直接控制页面
    return self.skipWaiting();
  }));
});

self.addEventListener("fetch",function(event){
  // 缓存优先，无缓存时访问网络并缓存
  event.responseWith(
    caches.open(cacheVersion).then(function(cache){
      return cahce.match(event.request).then(function(cacheResponse){
        return cacheResponse || fetch(event.request).then(function(fetchResponse){
          cache.put(event.request,fetchResponse.clone())
          return fetchResponse;
        })
      })
    })

  )
});
```

当我们更新版本时，需要把旧的缓存删除

```javascript
self.addEventListener("activate",function(event){
  const whiteList = ["v2"];
  event.waitUntil(
    caches.keys().then(function(keyList){
      return Promise.all([
        ...keyList.map(function(key){
          if(!whiteList.includes(key)){
            return cahces.delete(key)
          }
          return Promise.resolve();
        }),
        self.clients.claim(),
      ])
    })
  )
});
```

## 使用资源提示

### dns-prefetch preconnect

```html
<link rel="preconnect" href="https://github.com/jiangshanmeta">
<link rel="dns-prefetch" href="https://github.com/jiangshanmeta">
```

这两个是针对跨域资源的优化，preconnect会建立连接 但是这个属性兼容性比较差，dns-prefetch只做dns解析，不建立连接，但是兼容性相对好点。

### prefetch preload

```html
<link rel="preload" href="/fonts/font.woff" as="font">
<link rel="prefetch" href="/uploads/images/pic.png">
```

preload用来指定页面加载后很快会被用到的资源，prefetch用来告诉浏览器在页面加载完成后，利用空闲时间提前获取用户未来可能会访问的内容。

## HTTP2优化

HTTP1有以下问题：

* 队首阻塞(HTTP1 可以通过管道化进行优化，管道化的意思是不必和以前一样在响应完成后再发起下一个请求，而是可以并行地发起多个请求，但是响应必须按照请求顺序进行，因此一旦一个响应需要的时间比较长就会阻塞后面的响应)
* 未压缩头部

HTTP2采用了新的传输机制，不同请求的响应可以不按顺序返回，因而解决了队首阻塞问题。对于HTTP头，采用HPACK压缩算法，增量传输头部字段，减少了传数量。

另外HTTP2还可以把后面很快就要用到的资源推给客户端。
