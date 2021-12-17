# 在网页中使用SVG

## 将SVG作为图像

局限性： 图像渲染时与主页面是分离的，而且无法在两者之间进行通信；主页面上的样式对SVG无效；主页面上的脚本无法感知或者修改SVG文档结构；SVG图像自身引用的文件，浏览器可能不会加载。

### 在```<img>```元素中包含SVG

```html
<img src="./cat.svg" title="cat" alt="cat"/>
```

图片宽高按照以下顺序决定：

* CSS属性设置。因为SVG的图像是可放大所以不失真的，所以通过CSS设置样式。
* 根元素```<svg>```如果设置width和height，则它们作为图片宽高(固有尺寸)
* 根元素```<svg>```有viewBox属性，根据viewBox计算(固有尺寸)
* 采用嵌入内容的默认HTML尺寸，尽可能不要依赖这个行为，不同浏览器可能有差异

## 在CSS中包含SVG

```css
.bg-cat{
    background-image:url('./cag.svg');
    background-size:100% 100%;
}
```

默认情况下，背景图会按照固有尺寸绘制，通过```background-size```可以设置尺寸。

## 使用嵌入对象

```html
<object data="./cat.svg" type="image/svg+xml">
    <p>No Svg Support</p>
    <img src="./cat.png" title="" alt=""/>
</object>
```

当SVG文件作为嵌入对象引入时，SVG文件的渲染方式与被包含在```<img />```中大致相同，不会继承父文档的样式。但是嵌入的SVG可以包含外部文件，同时脚本可以在该对象和父页面之间进行通信。

## 内联SVG

```html
<style>
    /* 可以通过css设置svg的样式 */
    svg {
        display:block;
        width:500px;
        height:500px;
        margin:auto;
    }
    circle {
        fill: lavender;
    }
</style>
<div>
    <h1>inline svg</h1>
    <svg viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg">
        <circle cx="125" cy="125" r="100"/>
    </svg>
</div>
```
