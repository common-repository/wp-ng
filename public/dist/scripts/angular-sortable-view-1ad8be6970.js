!function(e,b){"use strict";function w(e){if(void 0===e.clientX&&void 0===e.clientY){var t=e.touches||e.originalEvent.touches;t&&t.length&&(e.clientX=t[0].clientX,e.clientY=t[0].clientY),e.preventDefault()}}function l(e,t){return parseInt(e.css(t))||0}function P(e,t){var n={},o=b.element(e),r=e.getBoundingClientRect(),i=t?l:function(){return 0};return n.left=r.left-i(o,"margin-left")-i(o,"border-left"),n.right=r.right+i(o,"margin-right")+i(o,"border-right"),n.top=r.top-i(o,"margin-top")-i(o,"border-top"),n.bottom=r.bottom+i(o,"margin-bottom")+i(o,"border-bottom"),n.width=n.right-n.left,n.height=n.bottom-n.top,n}function O(e,t){var n=function(e){if((e=e[0]).previousElementSibling)return b.element(e.previousElementSibling);for(var t=e.previousSibling;null!=t&&1!=t.nodeType;)t=t.previousSibling;return b.element(t)}(e);0<n.length?n.after(t):e.parent().prepend(t)}b.element(document.head).append(["<style>.sv-helper{position: absolute !important;z-index: 99999;margin: 0 !important;}.sv-candidate{}.sv-placeholder{}.sv-sorting-in-progress{-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;}.sv-visibility-hidden{visibility: hidden !important;opacity: 0 !important;}</style>"].join(""));var t=document.documentElement,n=t.matches?"matches":t.matchesSelector?"matchesSelector":t.webkitMatches?"webkitMatches":t.webkitMatchesSelector?"webkitMatchesSelector":t.msMatches?"msMatches":t.msMatchesSelector?"msMatchesSelector":t.mozMatches?"mozMatches":t.mozMatchesSelector?"mozMatchesSelector":null;if(null==n)throw"This browser doesn't support the HTMLElement.matches method";function R(e,t){if(e instanceof b.element&&(e=e[0]),null!==n)return e[n](t)}var k=b.element.prototype.closest||function(e){for(var t=this[0].parentNode;t!==document.documentElement&&!t[n](e);)t=t.parentNode;return t[n](e)?b.element(t):b.element()},o=b.module("angular-sortable-view",[]);o.directive("svRoot",[function(){function M(e){return o[e]}var T,o=Object.create(null),d=document.body;return{restrict:"A",controller:["$scope","$attrs","$interpolate","$parse","$element",function(f,e,t,n,v){var g,$,x,y,b,l,w=t(e.svRoot)(f)||f.$id,S=!1,a=n(e.svOnSort),s=!1;o[w]||(o[w]=[]),e.svOnStart=e.$$element[0].attributes["sv-on-start"],e.svOnStart=e.svOnStart&&e.svOnStart.value,e.svOnStop=e.$$element[0].attributes["sv-on-stop"],e.svOnStop=e.svOnStop&&e.svOnStop.value;var C=n(e.svOnStart),c=n(e.svOnStop),E=function(e,t){var n=v[0],o=n.scrollTop,r=Math.max(0,n.scrollHeight-n.clientHeight),i=Math.min(Math.max(0,n.scrollTop+e),r);s=!0,i!==o?(n.scrollTop=i,l=setTimeout(function(){l=null,s&&E(e,t)},t)):s=!1};if(this.sortingInProgress=function(){return T},this.stopScrolling=function(){l&&(clearTimeout(l),l=null),s=!1},e.svGrid){if(null===(S="true"===e.svGrid||"false"!==e.svGrid&&null))throw"Invalid value of sv-grid attribute"}else f.$watchCollection(function(){return M(w)},function(e){S=!1;var t=e.filter(function(e){return!e.container}).map(function(e){return{part:e.getPart().id,y:e.element[0].getBoundingClientRect().top}}),o=Object.create(null);t.forEach(function(e){o[e.part]?o[e.part].push(e.y):o[e.part]=[e.y]}),Object.keys(o).forEach(function(n){o[n].sort(),o[n].forEach(function(e,t){t<o[n].length-1&&0<e&&e===o[n][t+1]&&(S=!0)})})});this.$moveUpdate=function(s,a,e,t,n,o,r){var i,l,c=s.containment&&k.call(e,s.containment)[0],d=P(e[0],!0),u=P(v[0],!0),m=c&&P(c,!0),p=Math.max(u.top,m?m.top:0),h=Math.min(u.bottom,m?m.bottom:1/0);"element"===s.tolerance&&(a={x:~~(d.left+d.width/2),y:~~(d.top+d.height/2)}),$||(n?($=n.clone()).removeClass("ng-hide"):(($=t.clone()).addClass("sv-visibility-hidden"),$.addClass("sv-placeholder"),$.css({height:d.height+"px",width:d.width+"px"})),t.after($),t.addClass("ng-hide"),y=t,s,C(f,{$helper:{element:x=e},$part:o.model(o.scope),$index:r,$item:o.model(o.scope)[r]}),f.$root&&f.$root.$$phase||f.$apply()),l={x:~~((i=$[0].getBoundingClientRect()).left+i.width/2),y:~~(i.top+i.height/2)},T=!0,g=[],x[0].reposition({x:a.x-a.offset.x*d.width,y:a.y-a.offset.y*d.height},m),M(w).forEach(function(e,t){if(null==s.containment||R(e.element,s.containment)||R(e.element,s.containment+" *")){var n,o,r,i=e.element[0].getBoundingClientRect(),l={x:~~(i.left+i.width/2),y:~~(i.top+i.height/2)};e.container||!e.element[0].scrollHeight&&!e.element[0].scrollWidth||g.push({element:e.element,q:(l.x-a.x)*(l.x-a.x)+(l.y-a.y)*(l.y-a.y),view:e.getPart(),targetIndex:e.getIndex(),after:(n=l,o=a,r=S,r?n.x-o.x<0:n.y-o.y<0)}),e.container&&!e.element[0].querySelector("[sv-element]:not(.sv-placeholder):not(.sv-source)")&&g.push({element:e.element,q:(l.x-a.x)*(l.x-a.x)+(l.y-a.y)*(l.y-a.y),view:e.getPart(),targetIndex:0,container:!0})}}),g.push({q:(l.x-a.x)*(l.x-a.x)+(l.y-a.y)*(l.y-a.y),element:$,placeholder:!0}),g.sort(function(e,t){return e.q-t.q}),g.forEach(function(e,t){0!==t||e.placeholder||e.container?0===t&&e.container?(b=e).element.append($):e.element.removeClass("sv-candidate"):((b=e).element.addClass("sv-candidate"),e.after?e.element.after($):O(e.element,$))}),p>(d=P(e[0],!0)).top?E(-5,200):h<d.bottom?E(5,200):this.stopScrolling()},this.$drop=function(n,o,r){if($)if(r.revert){var e=$[0].getBoundingClientRect(),t=x[0].getBoundingClientRect(),i=Math.sqrt(Math.pow(t.top-e.top,2)+Math.pow(t.left-e.left,2)),l=+r.revert*i/200;l=Math.min(l,+r.revert),["-webkit-","-moz-","-ms-","-o-",""].forEach(function(e){void 0!==x[0].style[e+"transition"]&&(x[0].style[e+"transition"]="all "+l+"ms ease")}),setTimeout(s,l),x.css({top:e.top+d.scrollTop+"px",left:e.left+d.scrollLeft+"px"})}else s();function s(){if(T=!1,$.remove(),x.remove(),y.removeClass("ng-hide"),y=x=r=$=g=void 0,c(f,{$part:n.model(n.scope),$index:o,$item:n.model(n.scope)[o]}),b){b.element.removeClass("sv-candidate");var e=n.model(n.scope).splice(o,1),t=b.targetIndex;b.view===n&&b.targetIndex>o&&t--,b.after&&t++,b.view.model(b.view.scope).splice(t,0,e[0]),b.view===n&&o===t||a(f,{$partTo:b.view.model(b.view.scope),$partFrom:n.model(n.scope),$item:e[0],$indexTo:t,$indexFrom:o})}b=void 0,f.$root&&f.$root.$$phase||f.$apply()}},this.addToSortableElements=function(e){M(w).push(e)},this.removeFromSortableElements=function(e){var t=M(w),n=t.indexOf(e);-1<n&&(t.splice(n,1),0===t.length&&delete o[w])}}]}}]),o.directive("svPart",["$parse",function(l){return{restrict:"A",require:"^svRoot",controller:["$scope",function(n){(n.$ctrl=this).getPart=function(){return n.part},this.$drop=function(e,t){n.$sortableRoot.$drop(n.part,e,t)}}],scope:!0,link:function(e,t,n,o){if(!n.svPart)throw new Error("no model provided");var r=l(n.svPart);if(!r.assign)throw new Error("model not assignable");e.part={id:e.$id,element:t,model:r,scope:e},e.$sortableRoot=o;var i={element:t,getPart:e.$ctrl.getPart,container:!0};o.addToSortableElements(i),e.$on("$destroy",function(){o.removeFromSortableElements(i)})}}}]),o.directive("svElement",["$parse",function(y){return{restrict:"A",require:["^svPart","^svRoot"],controller:["$scope",function(e){e.$ctrl=this}],link:function(a,c,d,u){var m,h,f,v=document.body,r="touchend touchcancel",g="mouseup "+r,$="mousemove touchmove",t=c,e={element:c,getPart:u[0].getPart,getIndex:function(){return a.$index}},x=b.element(document.documentElement);function n(){t.off("touchstart",o),t.off("mousedown",i)}function o(e){var t,n=$+" "+g;function o(e){clearTimeout(t),x.off(n,o)}x.on("touchmove "+r,o),t=setTimeout(function(){o(),i(e,!0)},100)}function i(e,t){var n;if(w(e),"relative"!==v.style.position&&(n=v.style.position,v.style.position="relative"),!u[1].sortingInProgress()&&(0==e.button||"mousedown"!==e.type)){var p,o=c,r=c[0].getBoundingClientRect(),i=y(d.svElement)(a),l={x:(e.clientX-r.left)/r.width,y:(e.clientY-r.top)/r.height};m=!1,i=b.extend({},{tolerance:"pointer",revert:200,containment:"html"},i),h||(h=u[0].helper),f||(f=u[0].placeholder),h?((p=h.clone()).removeClass("ng-hide"),p.css({left:r.left+v.scrollLeft+"px",top:r.top+v.scrollTop+"px"}),o.addClass("sv-visibility-hidden")):(p=o.clone()).addClass("sv-helper").css({left:r.left+v.scrollLeft+"px",top:r.top+v.scrollTop+"px",width:r.width+"px"}),p[0].reposition=function(e,t){var n,o,r,i,l=p[0].getBoundingClientRect(),s=function(e){for(var t=e.parent(),n=t.css("position"),o=t.css("transform");0<t.length&&"BODY"!==t[0].tagName&&("static"===n||!n)&&("none"===o||!o);)n=(t=t.parent()).css("position"),o=t.css("transform");return 0===t.length&&(t=b.element(document.documentElement)),t}(p),a=s[0].getBoundingClientRect(),c=a.top-s[0].scrollTop,d=a.left-s[0].scrollLeft,u=e.x-d,m=e.y-c;t&&(n=t.top-c,o=t.left-d,r=n+t.height,i=o+t.width,m=Math.min(r-l.height,Math.max(m,n)),u=Math.min(i-l.width,Math.max(u,o))),this.style.left=u+"px",this.style.top=m+"px"},x.addClass("sv-sorting-in-progress"),x.on($,s).on(g,function e(t){u[1].stopScrolling();x.off($,s);x.off(g,e);x.removeClass("sv-sorting-in-progress");m&&u[0].$drop(a.$index,i);c.removeClass("sv-visibility-hidden");b.isDefined(n)&&(v.style.position=n)}),t&&s(e)}function s(e){w(e),m||(c.parent().prepend(p),m=!0),u[1].$moveUpdate(i,{x:e.clientX,y:e.clientY,offset:l},p,c,f,u[0].getPart(),a.$index)}}u[1].addToSortableElements(e),a.$on("$destroy",function(){!0,n(),u[1].removeFromSortableElements(e)}),t.on("touchstart",o),t.on("mousedown",i),a.$watch("$ctrl.handle",function(e){e&&(n(),(t=e).on("touchstart",o),t.on("mousedown",i))}),a.$watch("$ctrl.helper",function(e){e&&(h=e)}),a.$watch("$ctrl.placeholder",function(e){e&&(f=e)})}}}]),o.directive("svHandle",function(){return{require:"?^svElement",link:function(e,t,n,o){o&&(o.handle=function(e){var t,n=b.element();for(e=b.element(e),t=0;t<this.length;t++)n.push(this[t]);for(t=0;t<e.length;t++)n.push(e[t]);return n}.call(t,o.handle))}}}),o.directive("svHelper",function(){return{require:["?^svPart","?^svElement"],link:function(e,t,n,o){t.addClass("sv-helper").addClass("ng-hide"),o[1]?o[1].helper=t:o[0]&&(o[0].helper=t)}}}),o.directive("svPlaceholder",function(){return{require:["?^svPart","?^svElement"],link:function(e,t,n,o){t.addClass("sv-placeholder").addClass("ng-hide"),o[1]?o[1].placeholder=t:o[0]&&(o[0].placeholder=t)}}})}(window,window.angular);