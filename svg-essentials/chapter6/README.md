# 坐标系统变换

## translate变换

```html
<use xlink:href="#square" transform="translate(50,50)" />
```

transform移动的不是我们的某个图形，而是整个网格，然后把它移动到画布的新位置。

![translate](./translate.svg)

## scale变换

形式如下：

* transform="scale(value)" 所有的x和y坐标乘以给定的value
* transform="scale(x-value,y-value)" 所有x坐标乘以给定的x-value,所有y坐标乘以给定的y-value

```html
<g id="square">
    <rect x="10" y="10" width="20" height="20" style="fill:none;stroke:black;" />
</g>
<use xlink:href="#square" transform="scale(2)" />
```

![scale](./scale.svg)

注意，变换时整个网格的，所以图形左上角的坐标也变为了以前的两倍(以原网格为度量)。

## 变换序列

一个图形可以做多个变换

```html
<rect x="10" y="10" width="20" height="15" transform="translate(30,20) scale(2)"  />
```

上面的示例先平移再缩放，等价于以下代码：

```html
<g transform="translate(30,20)">
    <g transform="scale(2)">
        <rect x="10" y="10" width="20" height="15" />
    </g>
</g>
```

变换序列的顺序会影响结果。

## rotate变换

角度按顺时针增加，水平线的角度为0度

默认旋转中心点被假定为(0,0)

```html
<rect x="70" y="30" width="20" height="20" style="fill:gray"  />
<rect x="70" y="30" width="20" height="20" style="fill:black;" transform="rotate(45)" />
```

同translate、scale一样，rotate变换也是变换整个坐标系统。

可以通过 ```rotate(angle,centerX,centerY)```指定旋转的中心。

## 技巧：围绕中心点缩放

想要围绕某个点缩放，需要结合translate以及scale：

```text
translate( -centerX * (factor-1), -centerY * (factor-1) ) scale(factor)
```

![scale-center](./scale-center.svg)

## skewX和skewY变换

skewX变换会按照指定角度推动所有的x坐标，y坐标不变。skewY变换会按照指定角度推动y坐标，x坐标不变。

![skew](./skew.svg)

skewX会保持水平线不变,skewY会保持垂直线不变
