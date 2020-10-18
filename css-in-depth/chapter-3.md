# 盒模型

## box-sizing

默认是content-box，但是个人习惯是全局重置为border-box

## 垂直居中

* flex。align-items:center使得flex-item垂直居中
* 绝对定位+transform。父元素高度不由这个垂直居中子元素决定，且无需知道子元素高度
* table-cell + vertical-align。父元素设置```display:table-cell```以及```vertical-align:center```
* 单行文字，设置行高
