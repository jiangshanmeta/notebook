# 添加Expires响应头

本章标题其实叫HTTP缓存更好。

Expires是一个可以控制缓存的HTTP响应头，它通知了客户端资源的过期时间。Cache-Control响应头可以规定缓存策略，也可以规定缓存时间。

如果没有这些缓存响应头，客户端依然会缓存，在下次遇到相同资源的时候会**发起条件GET请求**，向服务器询问资源是否过期，没有过期则使用客户端资源，过期了使用服务器资源。
