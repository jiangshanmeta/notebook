(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{437:function(t,e,s){"use strict";s.r(e);var r=s(42),n=Object(r.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"函数式优化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#函数式优化"}},[t._v("#")]),t._v(" 函数式优化")]),t._v(" "),s("p",[t._v("相较于命令式编程，函数式编程更消耗内存。一个典型的例子是柯力化，在javascript的实现中，柯力化是把一次执行函数转换为多个嵌套的函数(每个函数消耗一个参数)，每一个函数执行时都会将当前执行上下文放入栈中，因此多个嵌套个函数需要更多的空间")]),t._v(" "),s("p",[t._v("以下措施可以优化函数式代码：")]),t._v(" "),s("p",[t._v("惰性求值。利用一个返回值的函数而不是直接一个值，当需要时才调用函数获取值。")]),t._v(" "),s("p",[t._v("shortcut fusion.这是一种能够把多个函数合并的方法。")]),t._v(" "),s("p",[t._v("memoization. 这是利用了纯函数的特性，相同的输入必然有相同的输出，所以可以保存结果以便后续使用。underscore的memoize方法就实现了函数的记忆化。")]),t._v(" "),s("p",[t._v("尾递归优化。通过改写编码方式将非尾递归转化为尾递归，这样在运行时递归不会不断向栈中增加执行上下文，而是保证只放入一个执行上下文到栈中。然而，到目前V8还没支持尾递归优化。")])])}),[],!1,null,null,null);e.default=n.exports}}]);