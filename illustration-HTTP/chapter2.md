# 简单的HTTP协议

## 报文构成

### 请求报文的构成

* 请求方法，如GET、POST
* 请求URI，如/这种相对URI(需要Host请求头)，或者```http://example.com/index.html```这样的绝对URI
* 协议版本，如```HTTP/1.1```
* 请求首部字段，如Content-Type
* 请求内容实体，在GET请求中没有，POST请求会携带请求内容实体

### 响应报文的构成

* 协议版本，如```HTTP/1.1```
* 状态码，如200、304
* 原因短语。原因短语与状态码对应，如200对应OK
* 响应首部字段
* 响应体

## HTTP方法

### GET

GET方法是用来获取资源的。

### POST

POST方法主要用来传输实体的主体，用来把信息从客户端发送到服务器端

### PUT

PUT方法用来传输文件。就像FTP协议的文件上传一样，要求在请求报文的主体中包含文件内容，然后保存到请求URI指定的位置。

### DELETE

DELETE方法与PUT方法相反，用来删除指定位置的文件。

### HEAD

HEAD方法和GET方法一样，只是服务器不返回响应体。用于确认URI有效性及资源更新时间等。

### OPTIONS

OPTIONS方法用来查询针对请求URI制定资源支持的方法。服务器需要在响应头通过Allow首部字段返回支持的方法。

在一些跨域请求时浏览器会先发送OPTIONS请求。

### TRACE

TRACE方法是让web服务器将之前的请求通信换回给客户端的方法(响应体包含请求的内容)。

客户端发送请求时，在Max-Forwards首部字段中填入数字，每经过一个服务器端(代理)就将该数字减1，减到0时停止传输，最后接收到请求的服务器端则返回200响应。

这个方法可以用来查询请求是如何被加工/篡改的。

### CONNECT

客户端通过代理服务器发送HTTPS请求时需要先向代理服务器发送CONNECT请求，代理服务器会和目标服务器建立TCP通信。

## 持久连接

在HTTP1.0时代，没进行完一次HTTP通信底层的TCP连接就要断开一次，无法复用TCP连接。HTTP1.1默认采用了持久连接，建立完一次TCP连接后可以进行多次HTTP请求和响应。

## 管线化

持久连接虽然实现了对TCP连接的复用，但是对于HTTP请求，依然是发送请求等待响应后才能发起下一个HTTP请求(在等待响应期间什么都做不了)

管线化，也有人称作流水模式，是指无需等待响应，可以同时发起多个HTTP请求。
