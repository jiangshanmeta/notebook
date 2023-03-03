(window.webpackJsonp=window.webpackJsonp||[]).push([[111],{507:function(a,n,s){"use strict";s.r(n);var t=s(42),e=Object(t.a)({},(function(){var a=this,n=a.$createElement,s=a._self._c||n;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"在-ubuntu-上安装-nginx-并支持-php"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#在-ubuntu-上安装-nginx-并支持-php"}},[a._v("#")]),a._v(" 在 Ubuntu 上安装 Nginx 并支持 PHP")]),a._v(" "),s("p",[s("a",{attrs:{href:"http://www.caiyunlin.com/2021/05/install-php-for-nginx-on-ubuntu/",target:"_blank",rel:"noopener noreferrer"}},[a._v("参考文章"),s("OutboundLink")],1)]),a._v(" "),s("h2",{attrs:{id:"安装nginx"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装nginx"}},[a._v("#")]),a._v(" 安装Nginx")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 更新 APT 源")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("apt-get")]),a._v(" update\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 安装 nginx")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("apt-get")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" nginx\n")])])]),s("h2",{attrs:{id:"安装php-fpm"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装php-fpm"}},[a._v("#")]),a._v(" 安装php-fpm")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" add-apt-repository universe\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("apt")]),a._v(" update "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("&&")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("apt")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" php-fpm\n")])])]),s("p",[a._v("查看安装的版本：")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("ls")]),a._v(" /var/run/php \n")])])]),s("p",[a._v("这个版本会在nginx配置里面使用")]),a._v(" "),s("h2",{attrs:{id:"配置nginx"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#配置nginx"}},[a._v("#")]),a._v(" 配置Nginx")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("cd")]),a._v(" /etc/nginx/sites-available\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("cp")]),a._v(" default api.anontraveler.local.conf\n")])])]),s("p",[a._v("编辑conf文件如下：")]),a._v(" "),s("div",{staticClass:"language-conf extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("server {\n listen 80 ;\n listen [::]:80 ;\n\n\n root /home/meta/projects/anontraveler.com/server/public;\n\n index index.html index.htm index.nginx-debian.html index.php;\n\n server_name api.anontraveler.local;\n\n location / {\n  try_files $uri $uri/ /index.php;\n }\n\n location ~* \\.php$ {\n  include snippets/fastcgi-php.conf;\n\n  fastcgi_pass unix:/var/run/php/php-fpm.sock;\n\n }\n\n}\n")])])]),s("p",[a._v("校验配置合法：")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" nginx -t\n")])])]),s("p",[a._v("激活：")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("cd")]),a._v(" /etc/nginx/sites-enabled\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("ln")]),a._v(" -s /etc/nginx/sites-available/api.anontraveler.local.conf api.anontraveler.local.conf\n")])])]),s("p",[a._v("重启Nginx")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("service")]),a._v(" nginx reload\n")])])])])}),[],!1,null,null,null);n.default=e.exports}}]);