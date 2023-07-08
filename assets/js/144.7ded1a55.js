(window.webpackJsonp=window.webpackJsonp||[]).push([[144],{548:function(s,e,t){"use strict";t.r(e);var i=t(42),o=Object(i.a)({},(function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"认证与会话管理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#认证与会话管理"}},[s._v("#")]),s._v(" 认证与会话管理")]),s._v(" "),t("h2",{attrs:{id:"密码保护"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#密码保护"}},[s._v("#")]),s._v(" 密码保护")]),s._v(" "),t("p",[s._v("密码应当加密(比如使用md5)后存储在数据库中，一定不能明文存储。")]),s._v(" "),t("p",[s._v("一种破解md5加密后的密码的方式是彩虹表，其思路是尽可能多收集明文及其md5值，然后根据md5值映射出明文")]),s._v(" "),t("p",[s._v("为了预防加密值泄露后，通过彩虹表查找出明文，可以在计算哈希值时，增加一个salt值(本质是一个字符串，是服务器端的一个配置)，这样使得彩虹表破解难度加大。")]),s._v(" "),t("h2",{attrs:{id:"多因素认证"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#多因素认证"}},[s._v("#")]),s._v(" 多因素认证")]),s._v(" "),t("p",[s._v("通常情况下只使用密码作为唯一认证手段，在密码丢失情况下会被伪造身份登录。采用多因素认证，比如密码+数字证书，两个因素都丢失概率很低，提高了攻击的门槛")]),s._v(" "),t("h2",{attrs:{id:"session-fixation-攻击"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#session-fixation-攻击"}},[s._v("#")]),s._v(" Session Fixation 攻击")]),s._v(" "),t("p",[s._v("为了保持会话，通常做法是在cookie中存一个SessionID表明身份。在生成SessionID时需要保证足够的随机性。")]),s._v(" "),t("p",[s._v("Session Fixation 攻击是针对SessionID的一种攻击方式，攻击过程是：攻击者先获取未认证的SessionID，然后把这个SessionID交给被攻击者(主要是通过URL记录sessionID这种情况，cookie比较难操作)，被攻击者登录后，攻击者就可以采用同样的SessionID伪装成被攻击者。解决方案是登录完成后重写SessionID。")]),s._v(" "),t("p",[s._v("由于大部分维护登录状态都是在cookie中写入SessionId，因而这种攻击方式不太常见。")]),s._v(" "),t("h2",{attrs:{id:"session保持攻击"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#session保持攻击"}},[s._v("#")]),s._v(" Session保持攻击")]),s._v(" "),t("p",[s._v("有些网站为了减少服务器压力，并不在服务器端维护Session，而是加密放在Cookie中，由于在客户端可以轻松更改cookie过期时间，所以就可以获得一个永久有效的Session，而服务器完全无法察觉。")]),s._v(" "),t("p",[s._v("解决方案是一定时间后强制销毁Session，这样可以解决Session保持攻击，但是用户体验不好，更好的做法是当用户的客户端，比如IP等变化，即销毁Session。")])])}),[],!1,null,null,null);e.default=o.exports}}]);