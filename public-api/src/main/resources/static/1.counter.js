webpackJsonp([1],{186:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(){var t=arguments.length<=0||void 0===arguments[0]?1:arguments[0];return{type:f,payload:t}}function i(){var t=arguments.length<=0||void 0===arguments[0]?v:arguments[0],e=arguments[1],n=d[e.type];return n?n(t,e):t}Object.defineProperty(e,"__esModule",{value:!0}),e.actions=e.doubleAsync=e.COUNTER_INCREMENT=void 0;var c=n(371),u=r(c),a=n(368),s=r(a);e.increment=o,e["default"]=i;var f=e.COUNTER_INCREMENT="COUNTER_INCREMENT",l=e.doubleAsync=function(){return function(t,e){return new s["default"](function(n){setTimeout(function(){t(o(e().counter)),n()},200)})}},d=(e.actions={increment:o,doubleAsync:l},(0,u["default"])({},f,function(t,e){return t+e.payload})),v=0},189:function(t,e,n){var r=n(71),o=n(21)("toStringTag"),i="Arguments"==r(function(){return arguments}()),c=function(t,e){try{return t[e]}catch(n){}};t.exports=function(t){var e,n,u;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=c(e=Object(t),o))?n:i?r(e):"Object"==(u=r(e))&&"function"==typeof e.callee?"Arguments":u}},200:function(t,e,n){var r,o,i,c=n(72),u=n(386),a=n(190),s=n(121),f=n(27),l=f.process,d=f.setImmediate,v=f.clearImmediate,h=f.MessageChannel,_=0,p={},m="onreadystatechange",y=function(){var t=+this;if(p.hasOwnProperty(t)){var e=p[t];delete p[t],e()}},b=function(t){y.call(t.data)};d&&v||(d=function(t){for(var e=[],n=1;arguments.length>n;)e.push(arguments[n++]);return p[++_]=function(){u("function"==typeof t?t:Function(t),e)},r(_),_},v=function(t){delete p[t]},"process"==n(71)(l)?r=function(t){l.nextTick(c(y,t,1))}:h?(o=new h,i=o.port2,o.port1.onmessage=b,r=c(i.postMessage,i,1)):f.addEventListener&&"function"==typeof postMessage&&!f.importScripts?(r=function(t){f.postMessage(t+"","*")},f.addEventListener("message",b,!1)):r=m in s("script")?function(t){a.appendChild(s("script"))[m]=function(){a.removeChild(this),y.call(t)}}:function(t){setTimeout(c(y,t,1),0)}),t.exports={set:d,clear:v}},331:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0}),e.Counter=void 0;var o=n(1),i=r(o),c=n(416),u=r(c),a=e.Counter=function(t){return i["default"].createElement("div",null,i["default"].createElement("h2",{className:u["default"].counterContainer},"Counter:"," ",i["default"].createElement("span",{className:u["default"]["counter--green"]},t.counter)),i["default"].createElement("button",{className:"btn btn-default",onClick:t.increment},"Increment")," ",i["default"].createElement("button",{className:"btn btn-default",onClick:t.doubleAsync},"Double (Async)"))};e["default"]=a},332:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(331),i=r(o);e["default"]=i["default"]},351:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(159),i=n(186),c=n(332),u=r(c),a={increment:function(){return(0,i.increment)(1)},doubleAsync:i.doubleAsync},s=function(t){return{counter:t.counter}};e["default"]=(0,o.connect)(s,a)(u["default"])},368:function(t,e,n){t.exports={"default":n(378),__esModule:!0}},371:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var o=n(187),i=r(o);e["default"]=function(t,e,n){return e in t?(0,i["default"])(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},378:function(t,e,n){n(202),n(203),n(204),n(412),t.exports=n(20).Promise},382:function(t,e){t.exports=function(t,e,n,r){if(!(t instanceof e)||void 0!==r&&r in t)throw TypeError(n+": incorrect invocation!");return t}},385:function(t,e,n){var r=n(72),o=n(389),i=n(387),c=n(36),u=n(201),a=n(405),s={},f={},e=t.exports=function(t,e,n,l,d){var v,h,_,p,m=d?function(){return t}:a(t),y=r(n,l,e?2:1),b=0;if("function"!=typeof m)throw TypeError(t+" is not iterable!");if(i(m)){for(v=u(t.length);v>b;b++)if(p=e?y(c(h=t[b])[0],h[1]):y(t[b]),p===s||p===f)return p}else for(_=m.call(t);!(h=_.next()).done;)if(p=o(_,y,h.value,e),p===s||p===f)return p};e.BREAK=s,e.RETURN=f},386:function(t,e){t.exports=function(t,e,n){var r=void 0===n;switch(e.length){case 0:return r?t():t.call(n);case 1:return r?t(e[0]):t.call(n,e[0]);case 2:return r?t(e[0],e[1]):t.call(n,e[0],e[1]);case 3:return r?t(e[0],e[1],e[2]):t.call(n,e[0],e[1],e[2]);case 4:return r?t(e[0],e[1],e[2],e[3]):t.call(n,e[0],e[1],e[2],e[3])}return t.apply(n,e)}},387:function(t,e,n){var r=n(73),o=n(21)("iterator"),i=Array.prototype;t.exports=function(t){return void 0!==t&&(r.Array===t||i[o]===t)}},389:function(t,e,n){var r=n(36);t.exports=function(t,e,n,o){try{return o?e(r(n)[0],n[1]):e(n)}catch(i){var c=t["return"];throw void 0!==c&&r(c.call(t)),i}}},391:function(t,e,n){var r=n(21)("iterator"),o=!1;try{var i=[7][r]();i["return"]=function(){o=!0},Array.from(i,function(){throw 2})}catch(c){}t.exports=function(t,e){if(!e&&!o)return!1;var n=!1;try{var i=[7],c=i[r]();c.next=function(){return{done:n=!0}},i[r]=function(){return c},t(i)}catch(u){}return n}},395:function(t,e,n){var r=n(27),o=n(200).set,i=r.MutationObserver||r.WebKitMutationObserver,c=r.process,u=r.Promise,a="process"==n(71)(c);t.exports=function(){var t,e,n,s=function(){var r,o;for(a&&(r=c.domain)&&r.exit();t;){o=t.fn,t=t.next;try{o()}catch(i){throw t?n():e=void 0,i}}e=void 0,r&&r.enter()};if(a)n=function(){c.nextTick(s)};else if(i){var f=!0,l=document.createTextNode("");new i(s).observe(l,{characterData:!0}),n=function(){l.data=f=!f}}else if(u&&u.resolve){var d=u.resolve();n=function(){d.then(s)}}else n=function(){o.call(r,s)};return function(r){var o={fn:r,next:void 0};e&&(e.next=o),t||(t=o,n()),e=o}}},400:function(t,e,n){var r=n(52);t.exports=function(t,e,n){for(var o in e)n&&t[o]?t[o]=e[o]:r(t,o,e[o]);return t}},401:function(t,e,n){"use strict";var r=n(27),o=n(20),i=n(42),c=n(40),u=n(21)("species");t.exports=function(t){var e="function"==typeof o[t]?o[t]:r[t];c&&e&&!e[u]&&i.f(e,u,{configurable:!0,get:function(){return this}})}},402:function(t,e,n){var r=n(36),o=n(119),i=n(21)("species");t.exports=function(t,e){var n,c=r(t).constructor;return void 0===c||void 0==(n=r(c)[i])?e:o(n)}},405:function(t,e,n){var r=n(189),o=n(21)("iterator"),i=n(73);t.exports=n(20).getIteratorMethod=function(t){return void 0!=t?t[o]||t["@@iterator"]||i[r(t)]:void 0}},412:function(t,e,n){"use strict";var r,o,i,c=n(86),u=n(27),a=n(72),s=n(189),f=n(41),l=n(63),d=(n(36),n(119)),v=n(382),h=n(385),_=(n(199).set,n(402)),p=n(200).set,m=n(395)(),y="Promise",b=u.TypeError,g=u.process,x=u[y],g=u.process,w="process"==s(g),E=function(){},C=!!function(){try{var t=x.resolve(1),e=(t.constructor={})[n(21)("species")]=function(t){t(E,E)};return(w||"function"==typeof PromiseRejectionEvent)&&t.then(E)instanceof e}catch(r){}}(),M=function(t,e){return t===e||t===x&&e===i},j=function(t){var e;return l(t)&&"function"==typeof(e=t.then)?e:!1},T=function(t){return M(x,t)?new N(t):new o(t)},N=o=function(t){var e,n;this.promise=new t(function(t,r){if(void 0!==e||void 0!==n)throw b("Bad Promise constructor");e=t,n=r}),this.resolve=d(e),this.reject=d(n)},P=function(t){try{t()}catch(e){return{error:e}}},A=function(t,e){if(!t._n){t._n=!0;var n=t._c;m(function(){for(var r=t._v,o=1==t._s,i=0,c=function(e){var n,i,c=o?e.ok:e.fail,u=e.resolve,a=e.reject,s=e.domain;try{c?(o||(2==t._h&&k(t),t._h=1),c===!0?n=r:(s&&s.enter(),n=c(r),s&&s.exit()),n===e.promise?a(b("Promise-chain cycle")):(i=j(n))?i.call(n,u,a):u(n)):a(r)}catch(f){a(f)}};n.length>i;)c(n[i++]);t._c=[],t._n=!1,e&&!t._h&&O(t)})}},O=function(t){p.call(u,function(){var e,n,r,o=t._v;if(R(t)&&(e=P(function(){w?g.emit("unhandledRejection",o,t):(n=u.onunhandledrejection)?n({promise:t,reason:o}):(r=u.console)&&r.error&&r.error("Unhandled promise rejection",o)}),t._h=w||R(t)?2:1),t._a=void 0,e)throw e.error})},R=function(t){if(1==t._h)return!1;for(var e,n=t._a||t._c,r=0;n.length>r;)if(e=n[r++],e.fail||!R(e.promise))return!1;return!0},k=function(t){p.call(u,function(){var e;w?g.emit("rejectionHandled",t):(e=u.onrejectionhandled)&&e({promise:t,reason:t._v})})},I=function(t){var e=this;e._d||(e._d=!0,e=e._w||e,e._v=t,e._s=2,e._a||(e._a=e._c.slice()),A(e,!0))},U=function(t){var e,n=this;if(!n._d){n._d=!0,n=n._w||n;try{if(n===t)throw b("Promise can't be resolved itself");(e=j(t))?m(function(){var r={_w:n,_d:!1};try{e.call(t,a(U,r,1),a(I,r,1))}catch(o){I.call(r,o)}}):(n._v=t,n._s=1,A(n,!1))}catch(r){I.call({_w:n,_d:!1},r)}}};C||(x=function(t){v(this,x,y,"_h"),d(t),r.call(this);try{t(a(U,this,1),a(I,this,1))}catch(e){I.call(this,e)}},r=function(t){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1},r.prototype=n(400)(x.prototype,{then:function(t,e){var n=T(_(this,x));return n.ok="function"==typeof t?t:!0,n.fail="function"==typeof e&&e,n.domain=w?g.domain:void 0,this._c.push(n),this._a&&this._a.push(n),this._s&&A(this,!1),n.promise},"catch":function(t){return this.then(void 0,t)}}),N=function(){var t=new r;this.promise=t,this.resolve=a(U,t,1),this.reject=a(I,t,1)}),f(f.G+f.W+f.F*!C,{Promise:x}),n(89)(x,y),n(401)(y),i=n(20)[y],f(f.S+f.F*!C,y,{reject:function(t){var e=T(this),n=e.reject;return n(t),e.promise}}),f(f.S+f.F*(c||!C),y,{resolve:function(t){if(t instanceof x&&M(t.constructor,this))return t;var e=T(this),n=e.resolve;return n(t),e.promise}}),f(f.S+f.F*!(C&&n(391)(function(t){x.all(t)["catch"](E)})),y,{all:function(t){var e=this,n=T(e),r=n.resolve,o=n.reject,i=P(function(){var n=[],i=0,c=1;h(t,!1,function(t){var u=i++,a=!1;n.push(void 0),c++,e.resolve(t).then(function(t){a||(a=!0,n[u]=t,--c||r(n))},o)}),--c||r(n)});return i&&o(i.error),n.promise},race:function(t){var e=this,n=T(e),r=n.reject,o=P(function(){h(t,!1,function(t){e.resolve(t).then(n.resolve,r)})});return o&&r(o.error),n.promise}})},416:function(t,e){t.exports={counter:"Counter__counter___2lTkh","counter--green":"Counter__counter--green___1oJPa Counter__counter___2lTkh",counterContainer:"Counter__counterContainer___3frWE"}}});