# 坐标系统

## 视口

文档打算使用的画布区域称为视口。

我们可以在```<svg>```元素上使用width和height属性指定视口大小。属性值可以是数字，会被当作当前用户坐标下的像素，也可以使用单位：

* em 默认字体的大小
* ex 字母x的高度
* px 像素
* pt
* pc
* cm
* mm
* in

还可以使用百分比。当元素嵌套在另一个```<svg>```中时，其百分比根据外层包裹元素进行计算，如果```<svg>```为根元素，其百分比根据视口尺寸计算。

## 使用默认用户坐标

浏览器设置了一个坐标系统，其中水平坐标(x坐标)向右递增，垂直坐标(y坐标)垂直向下递增。定义视口左上角的x坐标和y坐标均为0.
