(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{357:function(t,a,s){"use strict";s.r(a);var n=s(42),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"轻数据结构-重操作"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#轻数据结构-重操作"}},[t._v("#")]),t._v(" 轻数据结构, 重操作")]),t._v(" "),s("h2",{attrs:{id:"函数式的基本操作"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#函数式的基本操作"}},[t._v("#")]),t._v(" 函数式的基本操作")]),t._v(" "),s("p",[t._v("介绍了几个函数式的基本操作：map、reduce、filter、some、every。这些在Array的原型上都有对应的方法，他们的功能不再赘述。")]),t._v(" "),s("h2",{attrs:{id:"声明式惰性计算函数链"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#声明式惰性计算函数链"}},[t._v("#")]),t._v(" 声明式惰性计算函数链")]),t._v(" "),s("p",[t._v("在第一章提到函数式编程的特点包括“使用流式链处理数据”，这里再次说明。")]),t._v(" "),s("p",[t._v("一般我们使用多个函数可能会这样：")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("func3")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("func2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("func1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("data"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("这种一层套一层的结构很难阅读，需要一层一层剥离外部函数才能知道到底实现了什么功能，也更难维护。函数链是一种更好的实践。文中提到了lodash的"),s("code",[t._v("_.chain")]),t._v("方法，其实underscore中也有(但似乎没实现惰性?)，使用函数链会这么写：")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("_"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("chain")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("data"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("func1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("func2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("value")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("_.chain方法把数据包裹，使其能链接许多方法，使用点语法即可调用而不是一层一层函数包裹。另一点优势是在调用value方法之前不会真正执行任何操作，因此是惰性的，有利于优化性能。")])])}),[],!1,null,null,null);a.default=e.exports}}]);