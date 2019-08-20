# 实体首部字段

实体首部字段是包含在请求报文和响应报文中的实体部分所使用的的首部，用于描述实体的相关信息。

## Allow

Allow首部用于通知客户端指定URI所支持的HTTP方法。(话说这应该是响应首部字段吧)

## Content-Encoding

通知客户端实体的编码方式，如gzip，和Accept-Encoding对应

## Content-Language

通知客户端实体主体采用的自然语言，如zh-cn。和Accept-Language对应

## Content-Length

实体主体的大小

## Content-Location

指出报文主体对应的URI。这个在需要内容协商时会用到

## Content-MD5

内容的MD5->base64后的值

## Content-Range

范围请求用的，指出实体主体所在的范围

## Content-Type

内容的类型

## Expires

资源过期时间

## Last-Modified

资源最终修改时间
