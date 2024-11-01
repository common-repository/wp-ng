"use strict";angular.module("jtt_aping_wikipedia",["jtt_wikipedia"]).directive("apingWikipedia",["apingWikipediaHelper","apingUtilityHelper","wikipediaFactory",function(n,s,o){return{require:"?aping",restrict:"A",replace:"false",link:function(t,e,i,a){var r=a.getAppSettings();s.parseJsonFromAttributes(i.apingWikipedia,n.getThisPlatformString(),r).forEach(function(t){var e={model:r.model};angular.isDefined(r.getNativeData)?e.getNativeData=r.getNativeData:e.getNativeData=!1;var i={pithumbsize:700};if(angular.isDefined(t.items)?i.gsrlimit=t.items:i.gsrlimit=r.items,0===i.gsrlimit||"0"===i.gsrlimit)return!1;(i.gsrlimit<0||isNaN(i.gsrlimit))&&(i.gsrlimit=void 0),500<i.gsrlimit&&(i.gsrlimit=500),angular.isDefined(t.language)&&(i.lang=t.language),angular.isDefined(t.title)?(i.term=t.title,o.getArticle(i).then(function(t){t&&a.concatToResults(n.getObjectByJsonData(t,e))})):angular.isDefined(t.search)&&(i.term=t.search,!angular.isDefined(t.textSearch)||"true"!==t.textSearch&&!0!==t.textSearch?o.searchArticlesByTitle(i).then(function(t){t&&a.concatToResults(n.getObjectByJsonData(t,e))}):o.searchArticles(i).then(function(t){t&&a.concatToResults(n.getObjectByJsonData(t,e))}))})}}}]),angular.module("jtt_aping_wikipedia").service("apingWikipediaHelper",["apingModels","apingTimeHelper","apingUtilityHelper",function(i,a,r){this.getThisPlatformString=function(){return"wikipedia"},this.getThisPlatformLink=function(t){return"https://"+t+".wikipedia.org/wiki/"},this.getObjectByJsonData=function(t,a){var r=[];if(t&&t.data&&t.data.query&&t.data.query.pages){var n=this;t.data.query.pages&&angular.forEach(t.data.query.pages,function(t,e){var i;(i=!0===a.getNativeData||"true"===a.getNativeData?t:n.getItemByJsonData(t,a.model))&&r.push(i)})}return r},this.getItemByJsonData=function(t,e){var i={};if(t&&e)switch(e){case"social":i=this.getSocialItemByJsonData(t);break;default:return!1}return i},this.getSocialItemByJsonData=function(t){var e=i.getNew("social",this.getThisPlatformString());return angular.extend(e,{timestamp:a.getTimestampFromDateString(t.touched,1e3,36e5),post_url:t.pagelanguage?this.getThisPlatformLink(t.pagelanguage)+encodeURI(t.title):void 0,intern_id:t.pageid,text:r.getTextFromHtml(t.extract),caption:t.title,img_url:t.thumbnail?t.thumbnail.source:void 0,thumb_url:t.thumbnail?t.thumbnail.source:void 0,native_url:t.thumbnail?t.thumbnail.source:void 0,source:t.extract,position:t.index}),e.date_time=new Date(e.timestamp),e}}]),angular.module("jtt_wikipedia",[]).factory("wikipediaFactory",["$http","wikipediaSearchDataService",function(i,a){var t={searchArticlesByTitle:function(t){var e=a.getNew("searchArticlesByTitle",t);return i.jsonp(e.url,{method:"GET",params:e.object})},searchArticles:function(t){var e=a.getNew("searchArticles",t);return i.jsonp(e.url,{method:"GET",params:e.object})},getArticle:function(t){var e=a.getNew("getArticle",t);return i.jsonp(e.url,{method:"GET",params:e.object})}};return t}]).service("wikipediaSearchDataService",function(){this.getApiBaseUrl=function(t){return"https://"+t+".wikipedia.org/w/api.php"},this.fillDataInObjectByList=function(i,a,t){return angular.forEach(t,function(t,e){angular.isDefined(a[t])&&(i.object[t]=a[t])}),i},this.getNew=function(t,e){var i={object:{callback:"JSON_CALLBACK",action:"query",format:"json",formatversion:2},url:""};switch(angular.isUndefined(e.lang)&&(e.lang="en"),angular.isUndefined(e.pithumbsize)&&(e.pithumbsize="400"),t){case"searchArticlesByTitle":i.object.prop="extracts|pageimages|info",i.object.generator="search",i.object.gsrsearch="intitle:"+e.term,i.object.pilimit="max",i.object.exlimit="max",i.object.exintro="",(i=this.fillDataInObjectByList(i,e,["prop","generator","gsrsearch","pilimit","exlimit","exintro","rvparse","formatversion","prop","pithumbsize","gsrlimit"])).url=this.getApiBaseUrl(e.lang);break;case"searchArticles":i.object.prop="extracts|pageimages|info",i.object.generator="search",i.object.gsrsearch=e.term,i.object.pilimit="max",i.object.exlimit="max",i.object.exintro="",(i=this.fillDataInObjectByList(i,e,["prop","generator","gsrsearch","pilimit","exlimit","exintro","rvparse","formatversion","prop","pithumbsize","gsrlimit"])).url=this.getApiBaseUrl(e.lang);break;case"getArticle":i.object.prop="extracts|pageimages|images|info",i.object.titles=e.term,(i=this.fillDataInObjectByList(i,e,["prop","rvparse","formatversion","prop","pithumbsize"])).url=this.getApiBaseUrl(e.lang)}return i}});