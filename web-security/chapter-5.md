# 点击劫持

## 点击劫持的成因

点击劫持基于iframe，透明的iframe(其内容是要hack的网站)遮罩在网页上，通过诱导用户操作页面，在用户不知情的情况下实际点击了iframe内的页面。

## 点击劫持的预防

可以采用```X-Frame-Options```HTTP响应头，控制浏览器是否加载iframe的内容。

X-Frame-Options有三个可能的值：

* deny。表示该页面不允许在 frame 中展示。
* sameorigin。表示该页面可以在相同域名页面的 frame 中展示。
* allow-from uri。表示该页面可以在指定来源的 frame 中展示。
