# HTTP报文内的HTTP信息

## HTTP报文

HTTP报文大致可以分为报文首部和报文主体两部分。两者由第一个出现的空行划分。

对于请求报文，报文首部包括请求行(请求方法、URI、HTTP版本)和首部字段。

对于响应报文，报文首部包括状态行(HTTP版本、状态码、原因短语)和首部字段。

## 内容协商

内容协商机制是指客户端和服务器端就响应的资源内容进行交涉，然后提供给客户端最合适的资源。

### 服务器驱动协商

服务器端会以请求首部字段为参考，相关的请求头字段有：

* Accept
* Accept-Charset
* Accept-Encoding
* Accept-Language
* Content-Language

### 客户端驱动协商

客户端进行内容协商。用户从浏览器显示的可选列表中手动选择，比如选择语言，或者利用脚本自动选择，比如根据浏览器类型切换pc版或者手机版。
