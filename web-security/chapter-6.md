# HTML5 安全

## noreferrer

a标签和area标签的rel可以设为noreferrer，这样新打开的页面http头的Referer就不会提交

```html
<a href="http:jiangshanmeta.github.io" rel="noreferrer">
```
