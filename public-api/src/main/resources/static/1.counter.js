webpackJsonp([1],{332:function(e,n,t){"use strict";function u(e){return e&&e.__esModule?e:{"default":e}}function r(){var e=arguments.length<=0||void 0===arguments[0]?1:arguments[0];return{type:f,payload:e}}function o(){var e=arguments.length<=0||void 0===arguments[0]?s:arguments[0],n=arguments[1],t=_[n.type];return t?t(e,n):e}Object.defineProperty(n,"__esModule",{value:!0}),n.actions=n.doubleAsync=n.COUNTER_INCREMENT=void 0;var c=t(206),l=u(c),a=t(144),d=u(a);n.increment=r,n["default"]=o;var f=n.COUNTER_INCREMENT="COUNTER_INCREMENT",i=n.doubleAsync=function(){return function(e,n){return new d["default"](function(t){setTimeout(function(){e(r(n().counter)),t()},200)})}},_=(n.actions={increment:r,doubleAsync:i},(0,l["default"])({},f,function(e,n){return e+n.payload})),s=0},713:function(e,n,t){"use strict";function u(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0}),n.Counter=void 0;var r=t(1),o=u(r),c=t(849),l=u(c),a=n.Counter=function(e){return o["default"].createElement("div",null,o["default"].createElement("h2",{className:l["default"].counterContainer},"Counter:"," ",o["default"].createElement("span",{className:l["default"]["counter--green"]},e.counter)),o["default"].createElement("button",{className:"btn btn-default",onClick:e.increment},"Increment")," ",o["default"].createElement("button",{className:"btn btn-default",onClick:e.doubleAsync},"Double (Async)"))};n["default"]=a},714:function(e,n,t){"use strict";function u(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var r=t(713),o=u(r);n["default"]=o["default"]},746:function(e,n,t){"use strict";function u(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var r=t(180),o=t(332),c=t(714),l=u(c),a={increment:function(){return(0,o.increment)(1)},doubleAsync:o.doubleAsync},d=function(e){return{counter:e.counter}};n["default"]=(0,r.connect)(d,a)(l["default"])},849:function(e,n){e.exports={counter:"Counter__counter___2lTkh","counter--green":"Counter__counter--green___1oJPa Counter__counter___2lTkh",counterContainer:"Counter__counterContainer___3frWE"}}});