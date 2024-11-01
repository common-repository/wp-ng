var duScrollDefaultEasing=function(e){"use strict";return e<.5?Math.pow(2*e,2)/2:1-Math.pow(2*(1-e),2)/2},duScroll=angular.module("duScroll",["duScroll.scrollspy","duScroll.smoothScroll","duScroll.scrollContainer","duScroll.spyContext","duScroll.scrollHelpers"]).value("duScrollDuration",350).value("duScrollSpyWait",100).value("duScrollSpyRefreshInterval",0).value("duScrollGreedy",!1).value("duScrollOffset",0).value("duScrollEasing",duScrollDefaultEasing).value("duScrollCancelOnEvents","scroll mousedown mousewheel touchmove keydown").value("duScrollBottomSpy",!1).value("duScrollActiveClass","active");"undefined"!=typeof module&&module&&module.exports&&(module.exports=duScroll),angular.module("duScroll.scrollHelpers",["duScroll.requestAnimation"]).run(["$window","$q","cancelAnimation","requestAnimation","duScrollEasing","duScrollDuration","duScrollOffset","duScrollCancelOnEvents",function(u,m,p,S,g,o,i,v){"use strict";var h,y,e={},c=function(e){return"undefined"!=typeof HTMLDocument&&e instanceof HTMLDocument||e.nodeType&&e.nodeType===e.DOCUMENT_NODE},a=function(e){return"undefined"!=typeof HTMLElement&&e instanceof HTMLElement||e.nodeType&&e.nodeType===e.ELEMENT_NODE},s=function(e){return a(e)||c(e)?e:e[0]};e.duScrollTo=function(e,t,n,r){var o;if(angular.isElement(e)?o=this.duScrollToElement:angular.isDefined(n)&&(o=this.duScrollToAnimated),o)return o.apply(this,arguments);var l=s(this);if(c(l))return u.scrollTo(e,t);l.scrollLeft=e,l.scrollTop=t},e.duScrollToAnimated=function(e,t,n,r){n&&!r&&(r=g);var o=this.duScrollLeft(),l=this.duScrollTop(),u=Math.round(e-o),i=Math.round(t-l),c=null,a=0,s=this,d=function(e){(!e||a&&0<e.which)&&(v&&s.unbind(v,d),p(h),y.reject(),h=null)};if(h&&d(),y=m.defer(),0===n||!u&&!i)return 0===n&&s.duScrollTo(e,t),y.resolve(),y.promise;var f=function(e){null===c&&(c=e);var t=n<=(a=e-c)?1:r(a/n);s.scrollTo(o+Math.ceil(u*t),l+Math.ceil(i*t)),t<1?h=S(f):(v&&s.unbind(v,d),h=null,y.resolve())};return s.duScrollTo(o,l),v&&s.bind(v,d),h=S(f),y.promise},e.duScrollToElement=function(e,t,n,r){var o=s(this);angular.isNumber(t)&&!isNaN(t)||(t=i);var l=this.duScrollTop()+s(e).getBoundingClientRect().top-t;return a(o)&&(l-=o.getBoundingClientRect().top),this.duScrollTo(0,l,n,r)},e.duScrollLeft=function(e,t,n){if(angular.isNumber(e))return this.duScrollTo(e,this.duScrollTop(),t,n);var r=s(this);return c(r)?u.scrollX||document.documentElement.scrollLeft||document.body.scrollLeft:r.scrollLeft},e.duScrollTop=function(e,t,n){if(angular.isNumber(e))return this.duScrollTo(this.duScrollLeft(),e,t,n);var r=s(this);return c(r)?u.scrollY||document.documentElement.scrollTop||document.body.scrollTop:r.scrollTop},e.duScrollToElementAnimated=function(e,t,n,r){return this.duScrollToElement(e,t,n||o,r)},e.duScrollTopAnimated=function(e,t,n){return this.duScrollTop(e,t||o,n)},e.duScrollLeftAnimated=function(e,t,n){return this.duScrollLeft(e,t||o,n)},angular.forEach(e,function(e,t){angular.element.prototype[t]=e;var n=t.replace(/^duScroll/,"scroll");angular.isUndefined(angular.element.prototype[n])&&(angular.element.prototype[n]=e)})}]),angular.module("duScroll.polyfill",[]).factory("polyfill",["$window",function(l){"use strict";var u=["webkit","moz","o","ms"];return function(e,t){if(l[e])return l[e];for(var n,r=e.substr(0,1).toUpperCase()+e.substr(1),o=0;o<u.length;o++)if(l[n=u[o]+r])return l[n];return t}}]),angular.module("duScroll.requestAnimation",["duScroll.polyfill"]).factory("requestAnimation",["polyfill","$timeout",function(e,l){"use strict";var u=0;return e("requestAnimationFrame",function(e,t){var n=(new Date).getTime(),r=Math.max(0,16-(n-u)),o=l(function(){e(n+r)},r);return u=n+r,o})}]).factory("cancelAnimation",["polyfill","$timeout",function(e,t){"use strict";return e("cancelAnimationFrame",function(e){t.cancel(e)})}]),angular.module("duScroll.spyAPI",["duScroll.scrollContainerAPI"]).factory("spyAPI",["$rootScope","$timeout","$interval","$window","$document","scrollContainerAPI","duScrollGreedy","duScrollSpyWait","duScrollSpyRefreshInterval","duScrollBottomSpy","duScrollActiveClass",function(m,l,o,p,S,n,g,u,r,v,h){"use strict";var i={},e=function(e){var d,t,f,n,r=e.$id,o={spies:[]};return o.handler=(d=o,f=t=!1,n=function(){f=!1;var e,t=d.container[0],n=0;if("undefined"!=typeof HTMLElement&&t instanceof HTMLElement||t.nodeType&&t.nodeType===t.ELEMENT_NODE)n=t.getBoundingClientRect().top,e=Math.round(t.scrollTop+t.clientHeight)>=t.scrollHeight;else{var r=S[0].body.scrollHeight||S[0].documentElement.scrollHeight;e=Math.round(p.pageYOffset+p.innerHeight)>=r}var o,l,u,i,c,a,s=v&&e?"bottom":"top";for(i=d.spies,l=d.currentlyActive,u=void 0,o=0;o<i.length;o++)(a=(c=i[o]).getTargetPosition())&&c.$element&&(v&&e||a.top+c.offset-n<20&&(g||-1*a.top+n)<a.height)&&(!u||u[s]<a[s])&&((u={spy:c})[s]=a[s]);u&&(u=u.spy),l===u||g&&!u||(l&&l.$element&&(l.$element.removeClass(h),m.$broadcast("duScrollspy:becameInactive",l.$element,angular.element(l.getTargetElement()))),u&&(u.$element.addClass(h),m.$broadcast("duScrollspy:becameActive",u.$element,angular.element(u.getTargetElement()))),d.currentlyActive=u)},u?function(){t?f=!0:(n(),t=l(function(){t=!1,f&&n()},u,!1))}:n),i[r]=o,e.$on("$destroy",function(){c(e)}),r},c=function(e){var t=e.$id,n=i[t],r=n.container;n.intervalPromise&&o.cancel(n.intervalPromise),r&&r.off("scroll",n.handler),delete i[t]},t=e(m),a=function(e){return i[e.$id]?i[e.$id]:e.$parent?a(e.$parent):i[t]},s=function(e){var t,n,r=e.$scope;if(r)return a(r);for(n in i)if(-1!==(t=i[n]).spies.indexOf(e))return t};return{addSpy:function(e){var t=s(e);t&&(t.spies.push(e),t.container&&function(e){for(;e.parentNode;)if((e=e.parentNode)===document)return!0;return!1}(t.container)||(t.container&&t.container.off("scroll",t.handler),t.container=n.getContainer(e.$scope),r&&!t.intervalPromise&&(t.intervalPromise=o(t.handler,r,0,!1)),t.container.on("scroll",t.handler).triggerHandler("scroll")))},removeSpy:function(e){var t=s(e);e===t.currentlyActive&&(m.$broadcast("duScrollspy:becameInactive",t.currentlyActive.$element),t.currentlyActive=null);var n=t.spies.indexOf(e);-1!==n&&t.spies.splice(n,1),e.$element=null},createContext:e,destroyContext:c,getContextForScope:a}}]),angular.module("duScroll.scrollContainerAPI",[]).factory("scrollContainerAPI",["$document",function(n){"use strict";var r={},o=function(e){return r[e.$id]?e.$id:e.$parent?o(e.$parent):void 0};return{getContainerId:o,getContainer:function(e){var t=o(e);return t?r[t]:n},setContainer:function(e,t){var n=e.$id;return r[n]=t,n},removeContainer:function(e){var t=o(e);t&&delete r[t]}}}]),angular.module("duScroll.smoothScroll",["duScroll.scrollHelpers","duScroll.scrollContainerAPI"]).directive("duSmoothScroll",["duScrollDuration","duScrollOffset","scrollContainerAPI",function(i,c,a){"use strict";return{link:function(l,e,u){e.on("click",function(e){if(u.href&&-1!==u.href.indexOf("#")||""!==u.duSmoothScroll){var t=u.href?u.href.replace(/.*(?=#[^\s]+$)/,"").substring(1):u.duSmoothScroll,n=document.getElementById(t)||document.getElementsByName(t)[0];if(n&&n.getBoundingClientRect){e.stopPropagation&&e.stopPropagation(),e.preventDefault&&e.preventDefault();var r=u.offset?parseInt(u.offset,10):c,o=u.duration?parseInt(u.duration,10):i;a.getContainer(l).duScrollToElement(angular.element(n),isNaN(r)?0:r,isNaN(o)?0:o)}}})}}}]),angular.module("duScroll.spyContext",["duScroll.spyAPI"]).directive("duSpyContext",["spyAPI",function(o){"use strict";return{restrict:"A",scope:!0,compile:function(e,t,n){return{pre:function(e,t,n,r){o.createContext(e)}}}}}]),angular.module("duScroll.scrollContainer",["duScroll.scrollContainerAPI"]).directive("duScrollContainer",["scrollContainerAPI",function(o){"use strict";return{restrict:"A",scope:!0,compile:function(e,t,n){return{pre:function(t,n,e,r){e.$observe("duScrollContainer",function(e){angular.isString(e)&&(e=document.getElementById(e)),e=angular.isElement(e)?angular.element(e):n,o.setContainer(t,e),t.$on("$destroy",function(){o.removeContainer(t)})})}}}}}]),angular.module("duScroll.scrollspy",["duScroll.spyAPI"]).directive("duScrollspy",["spyAPI","duScrollOffset","$timeout","$rootScope",function(u,i,c,a){"use strict";var s=function(e,t,n,r){angular.isElement(e)?this.target=e:angular.isString(e)&&(this.targetId=e),this.$scope=t,this.$element=n,this.offset=r};return s.prototype.getTargetElement=function(){return!this.target&&this.targetId&&(this.target=document.getElementById(this.targetId)||document.getElementsByName(this.targetId)[0]),this.target},s.prototype.getTargetPosition=function(){var e=this.getTargetElement();if(e)return e.getBoundingClientRect()},s.prototype.flushTargetCache=function(){this.targetId&&(this.target=void 0)},{link:function(n,r,o){var l,e=o.ngHref||o.href;if(e&&-1!==e.indexOf("#")?l=e.replace(/.*(?=#[^\s]+$)/,"").substring(1):o.duScrollspy?l=o.duScrollspy:o.duSmoothScroll&&(l=o.duSmoothScroll),l){var t=c(function(){var e=new s(l,n,r,-(o.offset?parseInt(o.offset,10):i));u.addSpy(e),n.$on("$locationChangeSuccess",e.flushTargetCache.bind(e));var t=a.$on("$stateChangeSuccess",e.flushTargetCache.bind(e));n.$on("$destroy",function(){u.removeSpy(e),t()})},0,!1);n.$on("$destroy",function(){c.cancel(t)})}}}}]);