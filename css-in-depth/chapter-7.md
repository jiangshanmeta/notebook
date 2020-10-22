# 定位和层叠上下文

position属性有以下值：

* static 默认值
* fixed 固定定位
* absolute 绝对定位
* relative 相对定位
* sticky 粘性定位

当一个元素的position为static时，称为未定位，其他值都是已定位。

给一个定位的元素添加z-index会产生层叠上下文(另外 opacity、transform等属性也会产生层叠上下文)。

不同层叠上下文显示顺序按照z-index决定显示的前后顺序。

一个层叠上下文之外的元素无法叠放在层叠上下文内的两个元素之间。

同一个层叠上下文内的元素，从后到前层叠顺序为：

* 层叠上下文的根
* z-index为负的定位元素
* 非定位元素
* z-index为auto的定位元素
* z-index为正的定位元素
