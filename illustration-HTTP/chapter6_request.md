# 请求首部字段

## Accept

客户端通知服务器可以接受的媒体类型以及相对优先级。一般媒体类型以type/subtype的形式出现，如text/html、image/jpeg。

使用q=来表示权重，并与类型以分号(;)分割。例如

```html
Accept: text/plain; q=0.3, text/html
```

即text/html权重为1(不写权重默认为1)，text/plain权重为0.3

## Accept-Charset

客户端接受的字符集。类似于Accept，允许多个值，也有权重

## Accept-Encoding

通知服务器客户端接收的编码方式及权重。常见的编码方式有gzip、compress、deflate

## Accept-Language

通知服务器客户端能够处理的语言及权重，如zh-cn

## Authorization

服务器401之后，客户端需要通过该字段把认证信息提供给服务器端

## Proxy-Authorization

和代理服务器交互时的Authorization

## Expect

Expect 是一个请求消息头，包含一个期望条件，表示服务器只有在满足此期望条件的情况下才能妥善地处理请求。常见的浏览器不会发送 Expect 消息头。

## From

通知服务器用户的电子邮件地址

## Host

表示请求资源的主机名和端口号

## If-Match

当资源的ETag与If-Match一致时才返回资源，否则返回412

## If-None-Match

当资源的ETag与If-None-Match的不一致时才返回资源，否则304。一般用If-None-Match而不是If-Match

## If-Modified-Since

当服务器端资源更新时间大于If-Modified-Since，才返回资源，否则304

## If-Unmodified-Since

当服务器更新时间小于If-Unmodified-Since时才返回资源，否则412。一般不用而是用If-Modified-Since

## Range

范围请求，请求资源的一部分，服务器能返回部分资源则206，否则200返回整个资源

## If-Range

与Range配合使用，如果服务器的资源的ETag或者更新时间匹配，206返回部分资源，否则200返回整个资源

与If-Match不同的是，如果不匹配，服务器会先412，然后客户端重新发起一个请求。

## Max-Forward

通常与TRACE一起使用，可经过的服务器最大数量

## Referer

包含了当前请求页面的来源页面的地址

## TE

TE 请求型头部用来指定用户代理希望使用的传输编码类型

## User-Agent

客户代理类型
