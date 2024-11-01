angular.module("angularLazyImg",[]),angular.module("angularLazyImg").factory("LazyImgMagic",["$window","$rootScope","lazyImgConfig","lazyImgHelpers",function(n,o,e,t){"use strict";var r,i,s,a,c,u,l,g;function m(){for(var n=s.length-1;0<=n;n--){var e=s[n];e&&t.isElementInView(e.$elem[0],c.offset,r)&&(y(e),s.splice(n,1))}0===s.length&&d()}function f(e){g.forEach(function(n){n[e]("scroll",u),n[e]("touchmove",u)}),i[e]("resize",u),i[e]("resize",l)}function h(){a=!0,setTimeout(function(){m(),f("on")},1)}function d(){a=!1,f("off")}function y(t){var n=new Image;n.onerror=function(){c.errorClass&&t.$elem.addClass(c.errorClass),o.$emit("lazyImg:error",t),c.onError(t)},n.onload=function(){var n,e;n=t.$elem,e=t.src,"img"===n[0].nodeName.toLowerCase()?n[0].src=e:n.css("background-image",'url("'+e+'")'),c.successClass&&t.$elem.addClass(c.successClass),o.$emit("lazyImg:success",t),c.onSuccess(t)},n.src=t.src}function p(n){this.$elem=n}return a=!(s=[]),c=e.getOptions(),i=angular.element(n),r=t.getWinDimensions(),l=t.throttle(function(){r=t.getWinDimensions()},60),g=[c.container||i],u=t.throttle(m,30),p.prototype.setSource=function(n){this.src=n,s.unshift(this),a||h()},p.prototype.removeImage=function(){var n,e;n=this,-1!==(e=s.indexOf(n))&&s.splice(e,1),0===s.length&&d()},p.prototype.checkImages=function(){m()},p.addContainer=function(n){d(),g.push(n),h()},p.removeContainer=function(n){d(),g.splice(g.indexOf(n),1),h()},p}]),angular.module("angularLazyImg").provider("lazyImgConfig",function(){"use strict";this.options={offset:100,errorClass:null,successClass:null,onError:function(){},onSuccess:function(){}},this.$get=function(){var n=this.options;return{getOptions:function(){return n}}},this.setOptions=function(n){angular.extend(this.options,n)}}),angular.module("angularLazyImg").factory("lazyImgHelpers",["$window",function(n){"use strict";return{isElementInView:function(n,e,t){var o=n.getBoundingClientRect(),r=t.height+e;return 0<=o.left&&o.right<=t.width+e&&(0<=o.top&&o.top<=r||o.bottom<=r&&o.bottom>=0-e)},getWinDimensions:function(){return{height:n.innerHeight,width:n.innerWidth}},throttle:function(o,r,i){var s,a;return function(){var n=i||this,e=+new Date,t=arguments;s&&e<s+r?(clearTimeout(a),a=setTimeout(function(){s=e,o.apply(n,t)},r)):(s=e,o.apply(n,t))}}}}]),angular.module("angularLazyImg").directive("lazyImg",["$rootScope","LazyImgMagic",function(r,i){"use strict";return{link:function(n,e,t){var o=new i(e);t.$observe("lazyImg",function(n){n&&o.setSource(n)}),n.$on("$destroy",function(){o.removeImage()}),r.$on("lazyImg.runCheck",function(){o.checkImages()}),r.$on("lazyImg:refresh",function(){o.checkImages()})},restrict:"A"}}]).directive("lazyImgContainer",["LazyImgMagic",function(t){"use strict";return{link:function(n,e){t.addContainer(e),n.$on("$destroy",function(){t.removeContainer(e)})},restrict:"A"}}]);