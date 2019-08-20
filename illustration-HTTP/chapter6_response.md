# 响应首部字段

## Accept-Ranges

服务器使用 HTTP 响应头 Accept-Range 标识自身支持范围请求(partial requests)。值为bytes支持bytes为单位的请求，值为none不支持范围请求

## Age

Age 消息头里包含消息对象在缓存代理中存贮的时长，以秒为单位。

## ETag

资源的唯一表示

## Location

配合3XX重定向使用，重新请求的新地址

## WWW-Authenticate

配合401使用，需要客户端提供认证信息

## Proxy-Authenticate

代理服务器使用的WWW-Authenticate，配合401使用

## Retry-After

通知客户端多长时间后重新发送请求，一般配合503使用

## Server

告知客户端HTTP服务器应用程序的信息，比如是Apache还是Nginx 操作系统等

## Vary

通知缓存服务器根据Vary指定的字段分别进行缓存。

例如Vary：Accept-Language，则缓存服务器需要查找本地是否有该语言的缓存。
