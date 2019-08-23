# 确认访问用户身份的认证

HTTP协议的401状态码，以及WWW-Authenticate、Proxy-Authenticate、Authorization、Proxy-Authorization这几个首部字段都是用来认证用户身份的。然而这种方式一般不够灵活，安全性也并不高，其实并不常见。

一种方式是SSL客户端认证，类似于SSL服务端认证，只是证书在客户端，这种其实也并不常见

最常见的是有个表单，输入账户密码
