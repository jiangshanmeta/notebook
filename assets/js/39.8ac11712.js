(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{430:function(a,t,s){"use strict";s.r(t);var n=s(42),e=Object(n.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"docker-mongo"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#docker-mongo"}},[a._v("#")]),a._v(" Docker-Mongo")]),a._v(" "),s("p",[a._v("目前是在ubuntu下获取mongo的image并且生成container")]),a._v(" "),s("h2",{attrs:{id:"获取mongodb镜像"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#获取mongodb镜像"}},[a._v("#")]),a._v(" 获取mongodb镜像")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("docker")]),a._v(" pull mongo:latest\n")])])]),s("h2",{attrs:{id:"创建并运行容器"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#创建并运行容器"}},[a._v("#")]),a._v(" 创建并运行容器")]),a._v(" "),s("p",[a._v("容器名称也叫mongo")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("docker")]),a._v(" run -itd --name mongo -p "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("27017")]),a._v(":27017 mongo\n")])])]),s("h2",{attrs:{id:"启动docker-container"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#启动docker-container"}},[a._v("#")]),a._v(" 启动docker container")]),a._v(" "),s("p",[a._v("mongo是container的名称")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("docker")]),a._v(" container start mongo\n")])])]),s("h2",{attrs:{id:"把mongodb的数据导入到容器中的mongo数据库"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#把mongodb的数据导入到容器中的mongo数据库"}},[a._v("#")]),a._v(" 把mongodb的数据导入到容器中的mongo数据库")]),a._v(" "),s("p",[s("a",{attrs:{href:"https://davejansen.com/how-to-dump-restore-a-mongodb-database-from-a-docker-container/",target:"_blank",rel:"noopener noreferrer"}},[a._v("参考文章"),s("OutboundLink")],1)]),a._v(" "),s("p",[a._v("把dump导入到container中")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("docker")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("cp")]),a._v(" /home/meta/下载/dump/anon_traveler mongo:/dump\n")])])]),s("p",[a._v("anon_traveler是一个数据库的dump的目录")]),a._v(" "),s("p",[a._v("mongo是container名称")]),a._v(" "),s("p",[a._v("最后一个dump是导入的地址，mongorestore默认从这里读")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("docker")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("exec")]),a._v(" -i mongo /usr/bin/mongorestore   --db anon_traveler \n")])])]),s("p",[a._v("第一个mongo指容器名称")]),a._v(" "),s("p",[a._v("执行导入，指定db名称为anon_traveler")])])}),[],!1,null,null,null);t.default=e.exports}}]);