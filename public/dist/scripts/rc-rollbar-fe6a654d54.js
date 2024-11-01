!function(e){"use strict";var r=e.module("rcRollbar",[]);r.config(["$provide",function(r){r.decorator("$log",["$delegate","$injector","$window",function(r,n,e){function o(o,r){e.Rollbar[o](r[0],function(r,e){n.get("$rootScope").$emit("rollbar:log:"+o,{exception:o,err:r,data:e.result})})}var t=r;return e.Rollbar&&(t={log:function(){r.log.apply(r,arguments)},error:function(){r.error.apply(r,arguments),!0===e.Rollbar.options.enableLogLevel.error&&o("error",arguments)},warn:function(){r.warn.apply(r,arguments),!0===e.Rollbar.options.enableLogLevel.warning&&o("warning",arguments)},debug:function(){r.debug.apply(r,arguments),!0===e.Rollbar.options.enableLogLevel.debug&&o("debug",arguments)},info:function(){r.info.apply(r,arguments),!0===e.Rollbar.options.enableLogLevel.info&&o("info",arguments)}}),t}])}]),r.provider("Rollbar",function(){var t=!0,a={error:!0,warning:!0,debug:!0,info:!1};function r(e){function r(r){return function(){e.Rollbar[r].apply(e.Rollbar,arguments)}}function o(r){console.warn("Rollbar is deactivated")}var n={Rollbar:o,configure:o,critical:o,error:o,warning:o,info:o,debug:o,scope:o,verbose:o,enable:o,disable:o};return t&&(n.Rollbar=e.Rollbar,n.configure=r("configure"),n.critical=r("critical"),n.error=r("error"),n.warning=r("warning"),n.debug=r("debug"),n.info=r("info"),n.scope=r("scope"),n.verbose=function(r){void 0===r&&(r=!0),e.Rollbar.configure({verbose:r})},n.enable=function(){e.Rollbar.configure({enabled:!0})},n.disable=function(){e.Rollbar.configure({enabled:!1})},n.enableLogLevel=a),n}this.init=function(r){!e.isUndefined(r.enableLogLevel)&&e.isObject(r.enableLogLevel)||(r.enableLogLevel={}),r.enableLogLevel=e.extend(a,r.enableLogLevel);var i=r;t&&function(o){function n(r){if(t[r])return t[r].exports;var e=t[r]={exports:{},id:r,loaded:!1};return o[r].call(e.exports,e,e.exports,n),e.loaded=!0,e.exports}var t={};n.m=o,n.c=t,n.p="",n(0)}([function(r,e,o){var n=o(1),t=o(4);(i=i||{}).rollbarJsUrl=i.rollbarJsUrl||"https://cdnjs.cloudflare.com/ajax/libs/rollbar.js/2.3.9/rollbar.min.js",i.async=void 0===i.async||i.async;var a=n.setupShim(window,i),l=t(i);window.rollbar=n.Rollbar,a.loadFull(window,document,!i.async,i,l)},function(r,e,o){function d(r){return function(){try{return r.apply(this,arguments)}catch(r){try{console.error("[Rollbar]: Internal error",r)}catch(r){}}}}function n(r,e){this.options=r,this._rollbarOldOnError=null;var o=l++;this.shimId=function(){return o},"undefined"!=typeof window&&window._rollbarShims&&(window._rollbarShims[o]={handler:e,messages:[]})}function t(o){return d(function(){var r=Array.prototype.slice.call(arguments,0),e={shim:this,method:o,args:r,ts:new Date};window._rollbarShims[this.shimId()].messages.push(e)})}var a=o(2),l=0,i=o(3).bind(null,function(r,e){return new n(r,e)});n.prototype.loadFull=function(l,r,e,o,i){var n=!1,t=r.createElement("script"),a=r.getElementsByTagName("script")[0],c=a.parentNode;t.crossOrigin="",t.src=o.rollbarJsUrl,e||(t.async=!0),t.onload=t.onreadystatechange=d(function(){if(!(n||this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState)){t.onload=t.onreadystatechange=null;try{c.removeChild(t)}catch(r){}n=!0,function(){var r;if(void 0===l._rollbarDidLoad){r=new Error("rollbar.js did not load");for(var e,o,n,t,a=0;e=l._rollbarShims[a++];)for(e=e.messages||[];o=e.shift();)for(n=o.args||[],a=0;a<n.length;++a)if("function"==typeof(t=n[a])){t(r);break}}"function"==typeof i&&i(r)}()}}),c.insertBefore(t,a)},n.prototype.wrap=function(o,r,n){try{var t;if(t="function"==typeof r?r:function(){return r||{}},"function"!=typeof o)return o;if(o._isWrap)return o;if(!o._rollbar_wrapped&&(o._rollbar_wrapped=function(){n&&"function"==typeof n&&n.apply(this,arguments);try{return o.apply(this,arguments)}catch(r){var e=r;throw"string"==typeof e&&(e=new String(e)),e._rollbarContext=t()||{},e._rollbarContext._wrappedSource=o.toString(),window._rollbarWrappedError=e}},o._rollbar_wrapped._isWrap=!0,o.hasOwnProperty))for(var e in o)o.hasOwnProperty(e)&&(o._rollbar_wrapped[e]=o[e]);return o._rollbar_wrapped}catch(r){return o}};for(var c="log,debug,info,warn,warning,error,critical,global,configure,handleUncaughtException,handleUnhandledRejection,captureEvent,captureDomContentLoaded,captureLoad".split(","),s=0;s<c.length;++s)n.prototype[c[s]]=t(c[s]);r.exports={setupShim:function(e,o){if(e){var n=o.globalAlias||"Rollbar";if("object"==typeof e[n])return e[n];e._rollbarShims={},e._rollbarWrappedError=null;var t=new i(o);return d(function(){o.captureUncaught&&(t._rollbarOldOnError=e.onerror,a.captureUncaughtExceptions(e,t,!0),a.wrapGlobals(e,t,!0)),o.captureUnhandledRejections&&a.captureUnhandledRejections(e,t,!0);var r=o.autoInstrument;return!1!==o.enabled&&(void 0===r||!0===r||"object"==typeof r&&r.network)&&e.addEventListener&&(e.addEventListener("load",t.captureLoad.bind(t)),e.addEventListener("DOMContentLoaded",t.captureDomContentLoaded.bind(t))),e[n]=t})()}},Rollbar:i}},function(r,e){function l(n,r,e){if(r.hasOwnProperty&&r.hasOwnProperty("addEventListener")){for(var t=r.addEventListener;t._rollbarOldAdd&&t.belongsToShim;)t=t._rollbarOldAdd;var o=function(r,e,o){t.call(this,r,n.wrap(e),o)};o._rollbarOldAdd=t,o.belongsToShim=e,r.addEventListener=o;for(var a=r.removeEventListener;a._rollbarOldRemove&&a.belongsToShim;)a=a._rollbarOldRemove;var l=function(r,e,o){a.call(this,r,e&&e._rollbar_wrapped||e,o)};l._rollbarOldRemove=a,l.belongsToShim=e,r.removeEventListener=l}}r.exports={captureUncaughtExceptions:function(a,l,r){if(a){var i;"function"==typeof l._rollbarOldOnError?i=l._rollbarOldOnError:a.onerror&&!a.onerror.belongsToShim&&(i=a.onerror,l._rollbarOldOnError=i);var e=function(){var r,e,o,n,t=Array.prototype.slice.call(arguments,0);e=l,o=i,n=t,(r=a)._rollbarWrappedError&&(n[4]||(n[4]=r._rollbarWrappedError),n[5]||(n[5]=r._rollbarWrappedError._rollbarContext),r._rollbarWrappedError=null),e.handleUncaughtException.apply(e,n),o&&o.apply(r,n)};e.belongsToShim=r,a.onerror=e}},captureUnhandledRejections:function(r,t,e){if(r){"function"==typeof r._rollbarURH&&r._rollbarURH.belongsToShim&&r.removeEventListener("unhandledrejection",r._rollbarURH);var o=function(r){var e,o,n;try{e=r.reason}catch(r){e=void 0}try{o=r.promise}catch(r){o="[unhandledrejection] error getting `promise` from event"}try{n=r.detail,!e&&n&&(e=n.reason,o=n.promise)}catch(r){n="[unhandledrejection] error getting `detail` from event"}e||(e="[unhandledrejection] error getting `reason` from event"),t&&t.handleUnhandledRejection&&t.handleUnhandledRejection(e,o)};o.belongsToShim=e,r._rollbarURH=o,r.addEventListener("unhandledrejection",o)}},wrapGlobals:function(r,e,o){if(r){var n,t,a="EventTarget,Window,Node,ApplicationCache,AudioTrackList,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload".split(",");for(n=0;n<a.length;++n)r[t=a[n]]&&r[t].prototype&&l(e,r[t].prototype,o)}}}},function(r,e){function o(r,e){this.impl=r(e,this),this.options=e,function(r){for(var e=function(e){return function(){var r=Array.prototype.slice.call(arguments,0);if(this.impl[e])return this.impl[e].apply(this.impl,r)}},o="log,debug,info,warn,warning,error,critical,global,configure,handleUncaughtException,handleUnhandledRejection,_createItem,wrap,loadFull,shimId,captureEvent,captureDomContentLoaded,captureLoad".split(","),n=0;n<o.length;n++)r[o[n]]=e(o[n])}(o.prototype)}o.prototype._swapAndProcessMessages=function(r,e){this.impl=r(this.options);for(var o,n,t;o=e.shift();)n=o.method,t=o.args,this[n]&&"function"==typeof this[n]&&("captureDomContentLoaded"===n||"captureLoad"===n?this[n].apply(this,[t[0],o.ts]):this[n].apply(this,t));return this},r.exports=o},function(r,e){r.exports=function(i){return function(r){if(!r&&!window._rollbarInitialized){for(var e,o,n=(i=i||{}).globalAlias||"Rollbar",t=window.rollbar,a=function(r){return new t(r)},l=0;e=window._rollbarShims[l++];)o||(o=e.handler),e.handler._swapAndProcessMessages(a,e.messages);window[n]=o,window._rollbarInitialized=!0}}}}])},this.deinit=function(){t=!1},r.$inject=["$window"],this.$get=r})}(angular);