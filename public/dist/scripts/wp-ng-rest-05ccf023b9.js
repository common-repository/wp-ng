!function(o){"use strict";var e=o.module("wpNgRest",["ngResource"]);e.config(["$resourceProvider","$httpProvider",function(e,t){e.defaults.cancellable=!0,t.interceptors.push("wpNgRestHttpInterceptor")}]),e.provider("wpNgRest",[function(){this.nonce={key:"X-WP-NG-Nonce",val:""},this.rest={url:"localhost/",path:""},this.lang={key:"X-WP-NG-Lang",val:""},this.$get=["$http",function(e){var t=this.nonce,s=this.rest,n=this.lang;return e.defaults.useXDomain=!0,{getNonce:function(){return t},getRest:function(){return s},getLang:function(){return n}}}],this.setNonce=function(e){this.nonce=e},this.setRest=function(e){this.rest=e},this.setLang=function(e){this.lang=e}}]),e.factory("wpNgRestStatus",["$rootScope","wpNgRest",function(s,e){var t=e.getNonce(),n={reset:function(){return{success:!1,statusCode:null,code:null,message:null}},setNonce:function(e){t=e},getNonce:function(){return t},setSuccess:function(e){var t=n.reset();return t.success=!0,t.statusCode=e.status,o.isDefined(e.messages)&&o.isArray(e.messages)?(t.code=e.messages[0].code,t.message=e.messages[0].message):o.isDefined(e.message)&&o.isObject(e.message)?(t.code=e.message.code,t.message=e.message.message):o.isDefined(e.message)&&o.isString(e.message)&&(t.message=e.message),t},setError:function(e){var t=n.reset();return t.statusCode=e.status,o.isDefined(e.data)&&o.isObject(e.data)?(t.code=e.data.code,t.message=e.data.message,o.isDefined(e.data.data)&&o.isObject(e.data.data)&&o.isDefined(e.data.data.errors)&&(t.errors=e.data.data.errors)):(t.code=e.status,t.message="An error occured on the request."),t},sendEvent:function(e,t){s.$broadcast(e,t)}};return n}]),e.factory("wpNgRestHttpInterceptor",["$injector",function(a){var r=[];function i(e){var t=a.get("wpNgRestStatus"),s=t.getNonce(),n=e.headers(s.key);n&&n!==s.val&&(s.val=n,t.setNonce(s))}return{request:function(e){if(!o.isString(e.url))return e;var t=a.get("wpNgRest"),s=t.getRest().url+t.getRest().path;if(0<=e.url.indexOf(s)){var n=a.get("wpNgRestStatus").getNonce(),r=t.getLang();o.isDefined(n.key)&&o.isString(n.key)&&o.isDefined(n.val)&&o.isString(n.val)&&0<n.key.length&&0<n.val.length&&(e.headers[n.key]=n.val),o.isDefined(r.key)&&o.isString(r.key)&&o.isDefined(r.val)&&o.isString(r.val)&&0<r.key.length&&0<r.val.length&&(e.headers[r.key]=r.val),e.headers["If-Modified-Since"]="0",e.headers["cache-control"]="private, max-age=0, no-cache"}return e},response:function(e){return i(e),e},responseError:function(e){var t=a.get("$q"),s=e.config?r.indexOf(e.config.url):-1;if(406!==e.status||-1!==s)return t.reject(e);var n=t.defer();return i(e),r.push(e.config.url),a.get("$http")(e.config).then(function(e){i(e),delete r[s],n.resolve(e)},function(e){406===e.status&&a.get("$window").location.reload();delete r[s],n.reject(e)}),n.promise}}}])}(angular);