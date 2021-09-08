(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{375:function(t,s,a){"use strict";a.r(s);var n=a(42),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"模块化且可重用的代码"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#模块化且可重用的代码"}},[t._v("#")]),t._v(" 模块化且可重用的代码")]),t._v(" "),a("h2",{attrs:{id:"方法链与管道化"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#方法链与管道化"}},[t._v("#")]),t._v(" 方法链与管道化")]),t._v(" "),a("p",[t._v("之前几章提到了利用Lodash的_.chain实现方法链，这种方式相较于一层层调用函数具有更高的可读性，也能实现lazy功能，但是能使用的方法是有限的(决定于lodash本身，虽然可以通过mixin进行扩展)，难以轻易联合其他函数库提供的函数使用。")]),t._v(" "),a("p",[t._v("管道化可以打破方法链的约束，它是把函数的输入和输出松散地连接起来。")]),t._v(" "),a("p",[t._v("管道化中的函数的输入和输出需要满足两个兼容条件：")]),t._v(" "),a("ul",[a("li",[t._v("元数。接收函数必须声明至少一个参数才能处理上一个函数的返回值")]),t._v(" "),a("li",[t._v("类型。函数的返回类型必须与接收函数的参数类型相匹配")])]),t._v(" "),a("p",[t._v("关于类型一般是用haskell的一套符号标记，通用格式如下：")]),t._v(" "),a("div",{staticClass:"language-text extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("&lt;function-name> :: &lt;Inputs> -> &lt;Output>\n")])])]),a("p",[t._v("例如：")]),t._v(" "),a("div",{staticClass:"language-text extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("trim :: String->String\n")])])]),a("h2",{attrs:{id:"偏函数与柯力化"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#偏函数与柯力化"}},[t._v("#")]),t._v(" 偏函数与柯力化")]),t._v(" "),a("p",[t._v("偏函数和柯力化可以将函数元数兼容。通常在管道化中的函数参数都是一个，但是原始函数的参数可以为多个，这是就需要将元数降低。")]),t._v(" "),a("p",[t._v("在JavaScript可以使用bind方法(和偏函数以及柯力化有点不同，但够用了)，可以预填充部分参数，得到新函数，到达降元的目的。")]),t._v(" "),a("h2",{attrs:{id:"组合管道函数"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#组合管道函数"}},[t._v("#")]),t._v(" 组合管道函数")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("compose")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("fns")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" start "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" fns"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" i "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" start"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" result "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" fns"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("apply")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("arguments"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("i"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            result "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" fns"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("call")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("result"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" result"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("我们可以使用上面的compose函数实现函数的组合。")]),t._v(" "),a("p",[t._v("再来看函数组合中的类型兼容问题，")]),t._v(" "),a("div",{staticClass:"language-text extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("g::A->B\nf::B->C\n\nf.g = compose::(B->C)->(A->B)->(A->C)\n")])])]),a("p",[t._v("函数g接收类型A返回类型B，函数f接收类型B返回类型C，其组合compose(f,g)接收类型A，返回类型C")]),t._v(" "),a("h2",{attrs:{id:"组合子"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#组合子"}},[t._v("#")]),t._v(" 组合子")]),t._v(" "),a("p",[t._v("书中说的组合子似乎有点问题，大家看github上的资料吧")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://gist.github.com/Avaq/1f0636ec5c8d6aed2e45",target:"_blank",rel:"noopener noreferrer"}},[t._v("combinators.js"),a("OutboundLink")],1)]),t._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/benji6/combinators-js",target:"_blank",rel:"noopener noreferrer"}},[t._v("combinators-js"),a("OutboundLink")],1)])])}),[],!1,null,null,null);s.default=e.exports}}]);