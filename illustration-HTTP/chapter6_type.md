# HTTP首部字段分类

HTTP首部字段根据实际用途被分为以下四种类型：

* 通用首部字段 请求报文和响应报文都会使用的首部
* 请求首部字段 从客户端向服务器端发送请求时使用的首部
* 响应首部字段 从服务器端向客户端返回响应报文时使用的首部
* 实体首部字段 针对请求报文和响应报文的实体部分使用的首部

## 通用首部字段

| 首部字段 | 说明 |
| :---:  | :--: |
| Cache-Control | 控制缓存的行为 |
| Connection | 逐跳首部、连接的管理 |
| Date | 创建报文的时间 |
| Pragma | 旧版本的Cache-Control |
| Trailer | 报文末端的首部一览 |
| Transfer-Encoding | 指定报文主体的传输编码方式 |
| Upgrade | 升级为其他协议 |
| Via | 经过的代理服务器信息 |
| Warning | 错误通知 |

## 请求首部字段

| 首部字段 | 说明 |
| :---:  | :--: |
| Accept | 用户代理可处理的媒体类型 |
| Accept-Charset | 用户代理可处理的字符集 |
| Accept-Encoding | 用户代理可处理的编码方式 |
| Accept-Language | 用户代理可处理的语言 |
| Authorization | web认证信息 |
| Proxy-Authorization | 代理服务器的认证信息 |
| Expect | 期待服务器的特定行为 |
| From | 用户的电子邮箱 |
| Host | 请求的主机名 |
| If-Macth | 条件请求，比较ETag |
| If-None-Match | 条件请求，比较ETag |
| If-Modified-Since | 条件请求，比较更新时间 |
| If-Unmodified-Since | 条件请求，比较更新时间 |
| Range | 范围请求 |
| If-Range | 与Range搭配，范围请求的If-Match |
| Max-Forwards | 最大跳数 |
| Referer | 对请求URI的原始获取方 |
| TE | 传输编码 |
| User-Agent | 客户代理类型 |

## 响应首部字段

| 首部字段 | 说明 |
| :---:  | :--: |
| Accept-Ranges | 是否接受范围请求 |
| Age | 资源创建经过时间 |
| ETag | 资源唯一标识 |
| Location | 重定向的地址 |
| WWW-Authenticate | 服务器对客户端的认证信息 |
| Proxy-Authenticate | 代理服务器对客户端的认证信息 |
| Retry-After | 再次发起请求的时间 |
| Server | HTTP服务器的安装信息 |
| Vary | 针对缓存服务器的缓存控制 |

## 实体首部字段

| 首部字段 | 说明 |
| :---:  | :--: |
| Allow | 资源可支持的HTTP方法 |
| Content-Encoding | 内容编码方式 |
| Content-Language | 内容对应的自然语言 |
| Content-Length | 内容大小 |
| Content-Location | 替代对应资源的URI |
| Content-MD5 | 内容的报文摘要 |
| Content-Range | 内容的位置范围 |
| Content-Type | 内容的媒体类型 |
| Expires | 过期时间 |
| Last-Modified | 最后修改时间 |

## End-to-end首部(端到端首部)和Hop-by-hop首部(逐跳首部)

端到端首部经过代理时会被转发给最终目标，切必须保存在由缓存生成的响应中。绝大部分首部都是端到端首部。

逐跳首部支队单次转发有效，通过代理时可不再转发。如果要使用逐跳首部，需要提供Connection首部字段。

以下首部属于逐跳首部：

* Connection
* Keep-Alive
* Proxy-Authenticate
* Proxy-Authorization
* Trailer
* TE
* Transfer-Encoding
* Upgrade
