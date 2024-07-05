(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{348:function(e,t,r){e.exports=r.p+"assets/img/movingStateDown.8e975bf7.png"},349:function(e,t,r){e.exports=r.p+"assets/img/memo.1df1809b.png"},426:function(e,t,r){"use strict";r.r(t);var n=r(42),o=Object(n.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"advanced-react"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#advanced-react"}},[e._v("#")]),e._v(" "),n("a",{attrs:{href:"https://book.douban.com/subject/36631232/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Advanced React"),n("OutboundLink")],1)]),e._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"https://www.developerway.com/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Developer Way"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("a",{attrs:{href:"https://www.advanced-react.com/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Advanced React"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("a",{attrs:{href:"https://www.youtube.com/@developerwaypatterns",target:"_blank",rel:"noopener noreferrer"}},[e._v("Author Youtube"),n("OutboundLink")],1)])]),e._v(" "),n("h2",{attrs:{id:"intro-to-re-renders"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#intro-to-re-renders"}},[e._v("#")]),e._v(" Intro-to re-renders")]),e._v(" "),n("p",[n("img",{attrs:{src:r(348),alt:"Moving State Down"}})]),e._v(" "),n("p",[n("img",{attrs:{src:r(349),alt:"React.memo"}})]),e._v(" "),n("ul",[n("li",[e._v("Re-rendering is how React updates components with new data. Without re-renders, there will be no interactivity in our apps.")]),e._v(" "),n("li",[e._v("State update is the initial source of all re-renders.")]),e._v(" "),n("li",[e._v("If a component's re-render is triggered, all nested components inside that component will be re-rendered.")]),e._v(" "),n("li",[e._v("During the normal React re-renders cycle ( without the use of memoization ) , props change doesn't matter: components will re-render even if they don't have any props.")]),e._v(" "),n("li",[e._v('We can use the pattern known as "moving state down" to prevent unnecessary re-renders in big apps.')]),e._v(" "),n("li",[e._v("State update in a hook will trigger the re-render of a component that uses this hook, even if the state is not used.")]),e._v(" "),n("li",[e._v("In the case of hooks using other hooks, any state update within that chain of hooks will trigger the re-render of a component that uses the very first hook.")])])])}),[],!1,null,null,null);t.default=o.exports}}]);