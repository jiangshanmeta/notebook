# 返回结果的HTTP状态码

| 状态码 | 类别  | 原因短语 |
| :---:  | :--:  | :--: |
| 1XX | Informational 信息性状态码 | 接收的请求正在处理 |
| 2XX | Success 成功状态码 | 请求正常处理完毕 |
| 3XX | Redirection 重定向状态码 | 需要进行附加操作以完成请求 |
| 4XX | Client Error 客户端错误状态码 | 服务器无法处理请求 |
| 5XX | Server Error 服务器错误状态码 | 服务器处理请求错误 |

常见状态码：

* 200 OK。最常见的状态码，表示客户端发来的请求在服务器端被正常处理了
* 204 No Content。服务器成功处理了请求，但在返回的响应报文中不含实体的主体部分。一般在只需要从客户端往服务器发送信息，而对客户端不需要发送新信息的情况下使用
* 206 Partial Content。客户端进行了范围请求
* 301 Moved Permanently。永久重定向
* 302 Temporary Redirect。临时重定向，不再推荐使用，分化为303和307
* 303 See Other。303是对302的补充，对于302，规范不允许改变请求方法，然而许多浏览器会采用GET方法方法访问新URI，303明确了客户端必须使用GET访问新URI
* 304 Not Modified。服务器通知客户端可以使用缓存。
* 307 Temporary Redirect。如果原始请求是POST，那么客户端一定不能自动进行重定向，这是和303的区别。
* 400 Bad Request。请求报文有语法错误
* 401 Unauthorized。未授权，客户端需要用户填写授权信息
* 403 Forbidden。访问资源被拒绝，至于原因服务器不想说
* 404 Not Found
* 500 Internal Service Error 服务器在执行请求时发生了错误
* 503 Service Unavailable。服务器无法处理请求，可能是超负载或者正在进行停机维护
