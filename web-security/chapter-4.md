# 跨站点请求伪造(CSRF)

## 跨站点请求伪造成因

首先，用户在正常网站A登录，获取到cookie。然后用户被诱导到hacker网站，黑客网站会发起对A网站接口的请求(比如通过图片、iframe或者表单发起post请求)，此时发起的请求会带着A网站的cookie。

## CSRF防御

### Referer Check

服务器端校验HTTP请求的Referer字段，如果不是允许的业务页面，则判定为CSRF攻击。

这个方法的缺陷是浏览器可能不会发送Referer，可能会错杀。

### CSRF Token

重要操作前端的提交参数加一个后端生成的随机数字段(csrf token)，然后后端校验这个随机数。这样跨站点伪造的请求因为无法构造正确的随机数字段，因而提交无效。

### SameSite Cookie

cookie的sameSite属性可以控制在非同源请求中，是否允许带上cookie。有三个可选值：

* Strict，严格不允许第三方网站带上cookie
* Lax，仅允许第三方网站在 链接、预加载、GET表单携带cookie
* None，允许发送cookie

要是项目仅在一个特定域名下运行，cookie的sameSite设置为Strict完全可以
