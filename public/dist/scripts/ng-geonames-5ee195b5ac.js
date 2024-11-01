!function(u){"use strict";u.module("ngGeonames",[]).service("geonamesHelpers",["$q","$log","$timeout",function(o,a,e){var s="[ng-geonames] ",n=function(e){return u.isDefined(e)&&null!==e};function i(e,n){var t,r;if(u.isDefined(n))t=n;else if(0===Object.keys(e).length)t="mainGeonames";else if(1<=Object.keys(e).length)for(r in e)e.hasOwnProperty(r)&&(t=r);else a.error(s+"- You have more than 1 geonames on the DOM, you must provide the geonames ID to the geonamesData.getXXX call");return t}return{isTruthy:function(e){return"true"===e||!0===e},isEmpty:function(e){return 0===Object.keys(e).length},isUndefinedOrEmpty:function(e){return u.isUndefined(e)||null===e||0===Object.keys(e).length},isDefined:n,isUndefined:function(e){return!n(e)},isNumber:u.isNumber,isString:function(e){return u.isString(e)&&""!==e},isArray:u.isArray,isObject:u.isObject,isFunction:u.isFunction,equals:u.equals,getUnresolvedDefer:function(e,n){var t,r=i(e,n);return u.isDefined(e[r])&&!0!==e[r].resolvedDefer?t=e[r].defer:(t=o.defer(),e[r]={defer:t,resolvedDefer:!1}),t},setResolvedDefer:function(e,n){e[i(e,n)].resolvedDefer=!0},obtainEffectiveGeonamesId:i}}])}(window.angular),function(e){"use strict";window.angular.module("ngGeonames").factory("geonamesDefaults",["$q","geonamesHelpers",function(e,n){var o=n.isDefined,a=(n.isObject,n.obtainEffectiveGeonamesId),s={};return{reset:function(e){var n=a(s,e);"mainGeonames"!==n&&delete s[n]},getDefaults:function(e){var n=a(s,e);return s[n]},getGeonamesCreationDefaults:function(e){var n=a(s,e),t=s[n];return{server:t.server,maxRows:t.maxRows,postalCode:t.postalCode,country:t.country,username:t.username}},setDefaults:function(e,n){var t={server:"http://api.geonames.org",maxRows:50,postalCode:!1,country:[],username:"demo"};o(e)&&(t.server=o(e.server)?e.server:t.server,t.maxRows=o(e.maxRows)?e.maxRows:t.maxRows,t.postalCode=o(e.postalCode)?e.postalCode:t.postalCode,t.country=o(e.country)?e.country:t.country,t.username=o(e.username)?e.username:t.username);var r=a(s,n);return s[r]=t}}}])}(),function(e){"use strict";window.angular.module("ngGeonames").service("geonamesData",["$q","$log","geonamesHelpers",function(e,n,t){var r=t.getDefer,o=t.getUnresolvedDefer,a=t.setResolvedDefer,s={},i=this,u=["geonames"];u.forEach(function(e){s[e]={}}),this.unresolveGeonames=function(e){var n=t.obtainEffectiveGeonamesId(s.geonames,e);u.forEach(function(e){s[e][n]=void 0})},u.forEach(function(t){var e,n=(e=t).charAt(0).toUpperCase()+e.slice(1);i["set"+n]=function(e,n){o(s[t],n).resolve(e),a(s[t],n)},i["get"+n]=function(e){return r(s[t],e).promise}})}])}(),function(w){"use strict";w.module("ngGeonames").factory("geonamesService",["$log","$sce","$q","$http","geonamesHelpers","geonamesDefaults",function(f,d,g,v,e,p){var h=e.isDefined,y=w.isString,D=e.equals;return{query:function(e,n){var t=p.getDefaults(n),r=t.server,o=t.maxRows,a=t.postalCode,s=t.country,i=t.username,u=g.defer(),c=[],l=null,m={method:"JSONP",url:r,params:{},cancellable:!0};return h(e.q)&&y(e.q)&&""!==e.q&&(l=!0===a?(m.url+="/postalCodeLookupJSON",m.params.postalcode=e.q,"postalcodes"):(m.url+="/searchJSON",m.params.q=e.q,"geonames"),h(e.country)&&y(e.country)&&""!==e.country&&(s=e.country)),h(m.params)&&!D({},m.params)?(w.extend(m.params,{maxRows:o,country:s,username:i,jsonpCallbackParam:"callback"}),m.url=d.trustAsResourceUrl(m.url),v(m).then(function(e){h(e.data[l])?(w.forEach(e.data[l],function(e,n){switch(l){case"postalcodes":h(e.title)||(e.title="["+e.postalcode+"] "),h(e.locationName)||(e.locationName=e.countryCode+" "+e.placeName);break;case"geonames":h(e.title)||(e.title=e.name),h(e.locationName)||(e.locationName=e.countryName)}this.push(e)},c),u.resolve(c)):(u.reject("[Geonames] Invalid query: "+e.data.status+" "+e.data.statusText),f.warn(e))},function(e){u.reject("[Geonames] Request: "+(e.data.status+" "+e.data.statusText||"failed")),f.warn(e)})):(u.reject("[Geonames] Invalid query params"),f.warn(m)),u.promise}}}])}(window.angular),function(e){"use strict";window.angular.module("ngGeonames").directive("geonames",["$q","geonamesData","geonamesDefaults","geonamesHelpers",function(n,a,s,e){return{restrict:"AE",replace:!1,scope:{defaults:"=",search:"=",id:"@"},transclude:!0,template:'<div class="angular-geonames"><div ng-transclude></div></div>',controller:["$scope",function(e){this._geonames=n.defer(),this.getGeonames=function(){return this._geonames.promise},this.getScope=function(){return e}}],link:function(e,n,t,r){a.isDefined,s.setDefaults(e.defaults,t.id);e.geonamesId=t.id;var o=s.getGeonamesCreationDefaults(t.id);r._geonames.resolve(o),a.setGeonames(o,t.id),e.$on("$destroy",function(){s.reset(t.id),a.unresolveGeonames(t.id)})}}}])}(),function(e){"use strict";window.angular.module("ngGeonames").directive("search",["$log","$timeout","$http","geonamesHelpers","geonamesService",function(u,c,e,l,m){return{restrict:"A",scope:!1,replace:!1,require:["geonames"],link:function(r,e,o,n){var a=l.isDefined,s=l.isString,i=n[0].getScope(),t=n[0];t.getGeonames().then(function(e){var t;i.$watch("search",function(n){if(!r.settingSearchFromGeonames)return a(n.q)&&s(n.q)&&""!==n.q&&n.q!==t?(r.settingSearchFromScope=!0,r.$broadcast("geonamesDirectiveSearch.find_start"),m.query(n,o.id).then(function(e){n.find=e,r.$broadcast("geonamesDirectiveSearch.find_end",e)},function(e){n.find=[],r.$broadcast("geonamesDirectiveSearch.find_end",[]),u.error("[ng-geonames]  [Search]  "+e+".")}),t=n.q,void c(function(){r.settingSearchFromScope=!1})):void 0},!0)})}}}])}();