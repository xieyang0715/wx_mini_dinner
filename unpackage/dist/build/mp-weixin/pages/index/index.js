(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"147b":function(t,n,e){"use strict";var u,o=function(){var t=this,n=t.$createElement;t._self._c},c=[];e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return c})),e.d(n,"a",(function(){return u}))},"48b6":function(t,n,e){"use strict";(function(t){e("d129");u(e("66fd"));var n=u(e("ba87"));function u(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"90e6":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{title:"欢迎光临好吃客"}},onLoad:function(){console.log(111),this.getmethod(),console.log(222)},methods:{getmethod:function(){t.$u.http.post("/api/auth/RefreshToken1").then((function(t){console.log(t)})).catch((function(t){}))}}};n.default=e}).call(this,e("543d")["default"])},ba87:function(t,n,e){"use strict";e.r(n);var u=e("147b"),o=e("eede");for(var c in o)"default"!==c&&function(t){e.d(n,t,(function(){return o[t]}))}(c);e("f4b2");var a,f=e("f0c5"),i=Object(f["a"])(o["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],a);n["default"]=i.exports},bd0e:function(t,n,e){},eede:function(t,n,e){"use strict";e.r(n);var u=e("90e6"),o=e.n(u);for(var c in u)"default"!==c&&function(t){e.d(n,t,(function(){return u[t]}))}(c);n["default"]=o.a},f4b2:function(t,n,e){"use strict";var u=e("bd0e"),o=e.n(u);o.a}},[["48b6","common/runtime","common/vendor"]]]);