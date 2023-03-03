# 在 Ubuntu 上安装 Nginx 并支持 PHP

[参考文章](http://www.caiyunlin.com/2021/05/install-php-for-nginx-on-ubuntu/)

## 安装Nginx

```bash
# 更新 APT 源
sudo apt-get update
# 安装 nginx
sudo apt-get install nginx
```

## 安装php-fpm

```bash
sudo add-apt-repository universe
sudo apt update && sudo apt install php-fpm
```

查看安装的版本：

```bash
ls /var/run/php 
```

这个版本会在nginx配置里面使用

## 配置Nginx

```bash
cd /etc/nginx/sites-available
cp default api.anontraveler.local.conf
```

编辑conf文件如下：

```conf
server {
 listen 80 ;
 listen [::]:80 ;


 root /home/meta/projects/anontraveler.com/server/public;

 index index.html index.htm index.nginx-debian.html index.php;

 server_name api.anontraveler.local;

 location / {
  try_files $uri $uri/ /index.php;
 }

 location ~* \.php$ {
  include snippets/fastcgi-php.conf;

  fastcgi_pass unix:/var/run/php/php-fpm.sock;

 }

}
```

校验配置合法：

```bash
sudo nginx -t
```

激活：

```bash
cd /etc/nginx/sites-enabled
sudo ln -s /etc/nginx/sites-available/api.anontraveler.local.conf api.anontraveler.local.conf
```

重启Nginx

```bash
sudo service nginx reload
```
