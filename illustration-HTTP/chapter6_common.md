# 通用首部字段

## Cache-Control

通过Cache-Control的指令，可以操作缓存。

缓存请求指令：

| 指令 | 参数  | 说明 |
| :---:  | :--:  | :--: |
| no-cache | 无 | 经过缓存服务器，缓存服务器必须向原服务器验证缓存是否过期 |
| no-store | 无 | 缓存服务器不能缓存请求的任一部分 |
| max-age=[秒] | 必需 | 若缓存服务器缓存的时间小于max-age，则返回缓存的资源 |
| max-stale(=[秒]) | 可省略 | 允许接收过期缓存，过期时间在max-stale内的缓存都接受，默认时间是无限 |
| min-fresh=[秒] | 必需 | 在min-fresh之后未过期则缓存服务器可返回缓存 |
| no-transform | 无 | 缓存不能改变实体主体的媒体类型，防止缓存压缩图片等 |
| only-if-cached | 无 | 仅在缓存服务器有缓存的时候才返回 |

缓存响应指令

| 指令 | 参数  | 说明 |
| :---:  | :--:  | :--: |
| public | 无 | 缓存服务器可以缓存资源 |
| private | 可省略 | 仅对特定用户提供资源缓存，对其他用户不会返回缓存 |
| no-cache | 可省略 | 缓存代理和客户端可以缓存，下次使用时需要先询问是否过期 |
| no-store | 无 | 不能进行缓存 |
| no-transform | 无 | 缓存不能改变实体主体的媒体类型，防止缓存压缩图片等 |
| must-revalidate | 无 | 可以缓存但是下次使用必须先询问是否过期 |
| proxy-revalidate | 无 | 针对缓存服务器，可以缓存，使用缓存是先询问是否过期 |
| max-age=[秒] | 必需 | max-age时间内不需要询问是否过期 |
| s-maxage=[秒] | 必需 | 针对缓存服务器的max-age |

## Connection

Connection首部字段有两个作用：

* 控制不再转发的首部字段。代理遇到Connection，不再转发Connection指定的首部
* 管理持久连接。HTTP/1.1默认是持久连接，所以会有```Connection：Keep-Alive```

## Date

Date首部表明创建报文的时间

## Pragma

旧版本的遗留字段，应使用Cache-Control代替

## Trailer

分块传输时使用

## Transfer-Encoding

分块传输时使用

## Upgrade

询问是否可以使用其他通信协议

## Via

Via首部是为了追踪客户端和服务器之间的请求和响应报文的传输路径。

报文经过代理时会在Via中附加该服务器的信息然后再进行转发

经常会和Trace方法一起使用

## Warning

Warning包含报文当前状态可能存在的问题
