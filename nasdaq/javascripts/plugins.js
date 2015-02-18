/*
JS HELPER-PLUGINS (Consolidated in one file for fast loading)
- jQuery Transit - 0.9.9
- foundation.min
- Foundation 4 Interchange
- flexslider - v2.2.0
- hoverIntent - r7
- cookies
- jQuery Cookie Plugin v1.4.0
- Geolocator v.1.1
- Magnific Popup v0.9.9
*/




/*!
 * jQuery Transit - CSS3 transitions and transformations
 * (c) 2011-2012 Rico Sta. Cruz <rico@ricostacruz.com>
 * MIT Licensed.
 *
 * http://ricostacruz.com/jquery.transit
 * http://github.com/rstacruz/jquery.transit
 */
(function(k){k.transit={version:"0.9.9",propertyMap:{marginLeft:"margin",marginRight:"margin",marginBottom:"margin",marginTop:"margin",paddingLeft:"padding",paddingRight:"padding",paddingBottom:"padding",paddingTop:"padding"},enabled:true,useTransitionEnd:false};var d=document.createElement("div");var q={};function b(v){if(v in d.style){return v}var u=["Moz","Webkit","O","ms"];var r=v.charAt(0).toUpperCase()+v.substr(1);if(v in d.style){return v}for(var t=0;t<u.length;++t){var s=u[t]+r;if(s in d.style){return s}}}function e(){d.style[q.transform]="";d.style[q.transform]="rotateY(90deg)";return d.style[q.transform]!==""}var a=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;q.transition=b("transition");q.transitionDelay=b("transitionDelay");q.transform=b("transform");q.transformOrigin=b("transformOrigin");q.transform3d=e();var i={transition:"transitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd"};var f=q.transitionEnd=i[q.transition]||null;for(var p in q){if(q.hasOwnProperty(p)&&typeof k.support[p]==="undefined"){k.support[p]=q[p]}}d=null;k.cssEase={_default:"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"};k.cssHooks["transit:transform"]={get:function(r){return k(r).data("transform")||new j()},set:function(s,r){var t=r;if(!(t instanceof j)){t=new j(t)}if(q.transform==="WebkitTransform"&&!a){s.style[q.transform]=t.toString(true)}else{s.style[q.transform]=t.toString()}k(s).data("transform",t)}};k.cssHooks.transform={set:k.cssHooks["transit:transform"].set};if(k.fn.jquery<"1.8"){k.cssHooks.transformOrigin={get:function(r){return r.style[q.transformOrigin]},set:function(r,s){r.style[q.transformOrigin]=s}};k.cssHooks.transition={get:function(r){return r.style[q.transition]},set:function(r,s){r.style[q.transition]=s}}}n("scale");n("translate");n("rotate");n("rotateX");n("rotateY");n("rotate3d");n("perspective");n("skewX");n("skewY");n("x",true);n("y",true);function j(r){if(typeof r==="string"){this.parse(r)}return this}j.prototype={setFromString:function(t,s){var r=(typeof s==="string")?s.split(","):(s.constructor===Array)?s:[s];r.unshift(t);j.prototype.set.apply(this,r)},set:function(s){var r=Array.prototype.slice.apply(arguments,[1]);if(this.setter[s]){this.setter[s].apply(this,r)}else{this[s]=r.join(",")}},get:function(r){if(this.getter[r]){return this.getter[r].apply(this)}else{return this[r]||0}},setter:{rotate:function(r){this.rotate=o(r,"deg")},rotateX:function(r){this.rotateX=o(r,"deg")},rotateY:function(r){this.rotateY=o(r,"deg")},scale:function(r,s){if(s===undefined){s=r}this.scale=r+","+s},skewX:function(r){this.skewX=o(r,"deg")},skewY:function(r){this.skewY=o(r,"deg")},perspective:function(r){this.perspective=o(r,"px")},x:function(r){this.set("translate",r,null)},y:function(r){this.set("translate",null,r)},translate:function(r,s){if(this._translateX===undefined){this._translateX=0}if(this._translateY===undefined){this._translateY=0}if(r!==null&&r!==undefined){this._translateX=o(r,"px")}if(s!==null&&s!==undefined){this._translateY=o(s,"px")}this.translate=this._translateX+","+this._translateY}},getter:{x:function(){return this._translateX||0},y:function(){return this._translateY||0},scale:function(){var r=(this.scale||"1,1").split(",");if(r[0]){r[0]=parseFloat(r[0])}if(r[1]){r[1]=parseFloat(r[1])}return(r[0]===r[1])?r[0]:r},rotate3d:function(){var t=(this.rotate3d||"0,0,0,0deg").split(",");for(var r=0;r<=3;++r){if(t[r]){t[r]=parseFloat(t[r])}}if(t[3]){t[3]=o(t[3],"deg")}return t}},parse:function(s){var r=this;s.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,function(t,v,u){r.setFromString(v,u)})},toString:function(t){var s=[];for(var r in this){if(this.hasOwnProperty(r)){if((!q.transform3d)&&((r==="rotateX")||(r==="rotateY")||(r==="perspective")||(r==="transformOrigin"))){continue}if(r[0]!=="_"){if(t&&(r==="scale")){s.push(r+"3d("+this[r]+",1)")}else{if(t&&(r==="translate")){s.push(r+"3d("+this[r]+",0)")}else{s.push(r+"("+this[r]+")")}}}}}return s.join(" ")}};function m(s,r,t){if(r===true){s.queue(t)}else{if(r){s.queue(r,t)}else{t()}}}function h(s){var r=[];k.each(s,function(t){t=k.camelCase(t);t=k.transit.propertyMap[t]||k.cssProps[t]||t;t=c(t);if(k.inArray(t,r)===-1){r.push(t)}});return r}function g(s,v,x,r){var t=h(s);if(k.cssEase[x]){x=k.cssEase[x]}var w=""+l(v)+" "+x;if(parseInt(r,10)>0){w+=" "+l(r)}var u=[];k.each(t,function(z,y){u.push(y+" "+w)});return u.join(", ")}k.fn.transition=k.fn.transit=function(z,s,y,C){var D=this;var u=0;var w=true;if(typeof s==="function"){C=s;s=undefined}if(typeof y==="function"){C=y;y=undefined}if(typeof z.easing!=="undefined"){y=z.easing;delete z.easing}if(typeof z.duration!=="undefined"){s=z.duration;delete z.duration}if(typeof z.complete!=="undefined"){C=z.complete;delete z.complete}if(typeof z.queue!=="undefined"){w=z.queue;delete z.queue}if(typeof z.delay!=="undefined"){u=z.delay;delete z.delay}if(typeof s==="undefined"){s=k.fx.speeds._default}if(typeof y==="undefined"){y=k.cssEase._default}s=l(s);var E=g(z,s,y,u);var B=k.transit.enabled&&q.transition;var t=B?(parseInt(s,10)+parseInt(u,10)):0;if(t===0){var A=function(F){D.css(z);if(C){C.apply(D)}if(F){F()}};m(D,w,A);return D}var x={};var r=function(H){var G=false;var F=function(){if(G){D.unbind(f,F)}if(t>0){D.each(function(){this.style[q.transition]=(x[this]||null)})}if(typeof C==="function"){C.apply(D)}if(typeof H==="function"){H()}};if((t>0)&&(f)&&(k.transit.useTransitionEnd)){G=true;D.bind(f,F)}else{window.setTimeout(F,t)}D.each(function(){if(t>0){this.style[q.transition]=E}k(this).css(z)})};var v=function(F){this.offsetWidth;r(F)};m(D,w,v);return this};function n(s,r){if(!r){k.cssNumber[s]=true}k.transit.propertyMap[s]=q.transform;k.cssHooks[s]={get:function(v){var u=k(v).css("transit:transform");return u.get(s)},set:function(v,w){var u=k(v).css("transit:transform");u.setFromString(s,w);k(v).css({"transit:transform":u})}}}function c(r){return r.replace(/([A-Z])/g,function(s){return"-"+s.toLowerCase()})}function o(s,r){if((typeof s==="string")&&(!s.match(/^[\-0-9\.]+$/))){return s}else{return""+s+r}}function l(s){var r=s;if(k.fx.speeds[r]){r=k.fx.speeds[r]}return o(r,"ms")}k.transit.getTransitionValue=g})(jQuery);


/*
 * Foundation Responsive Library
 * http://foundation.zurb.com
 * Copyright 2013, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/
/*jslint unparam: true, browser: true, indent: 4 */
// Accommodate running jQuery or Zepto in noConflict() mode by
// using an anonymous function to redefine the $ shorthand name.
// See http://docs.jquery.com/Using_jQuery_with_Other_Libraries
// and http://zeptojs.com/
var libFuncName=null;if(typeof jQuery=="undefined"&&typeof Zepto=="undefined"&&typeof $=="function")libFuncName=$;else if(typeof jQuery=="function")libFuncName=jQuery;else{if(typeof Zepto!="function")throw new TypeError;libFuncName=Zepto}(function(e,t,n,r){"use strict";e("head").append('<meta class="foundation-mq-small">'),e("head").append('<meta class="foundation-mq-medium">'),e("head").append('<meta class="foundation-mq-large">'),t.matchMedia=t.matchMedia||function(e,t){var n,r=e.documentElement,i=r.firstElementChild||r.firstChild,s=e.createElement("body"),o=e.createElement("div");return o.id="mq-test-1",o.style.cssText="position:absolute;top:-100em",s.style.background="none",s.appendChild(o),function(e){return o.innerHTML='&shy;<style media="'+e+'"> #mq-test-1 { width: 42px; }</style>',r.insertBefore(s,i),n=o.offsetWidth===42,r.removeChild(s),{matches:n,media:e}}}(n),Array.prototype.filter||(Array.prototype.filter=function(e){if(this==null)throw new TypeError;var t=Object(this),n=t.length>>>0;if(typeof e!="function")return;var r=[],i=arguments[1];for(var s=0;s<n;s++)if(s in t){var o=t[s];e&&e.call(i,o,s,t)&&r.push(o)}return r}),Function.prototype.bind||(Function.prototype.bind=function(e){if(typeof this!="function")throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var t=Array.prototype.slice.call(arguments,1),n=this,r=function(){},i=function(){return n.apply(this instanceof r&&e?this:e,t.concat(Array.prototype.slice.call(arguments)))};return r.prototype=this.prototype,i.prototype=new r,i}),Array.prototype.indexOf||(Array.prototype.indexOf=function(e){if(this==null)throw new TypeError;var t=Object(this),n=t.length>>>0;if(n===0)return-1;var r=0;arguments.length>1&&(r=Number(arguments[1]),r!=r?r=0:r!=0&&r!=Infinity&&r!=-Infinity&&(r=(r>0||-1)*Math.floor(Math.abs(r))));if(r>=n)return-1;var i=r>=0?r:Math.max(n-Math.abs(r),0);for(;i<n;i++)if(i in t&&t[i]===e)return i;return-1}),e.fn.stop=e.fn.stop||function(){return this},t.Foundation={name:"Foundation",version:"4.3.2",cache:{},media_queries:{small:e(".foundation-mq-small").css("font-family").replace(/\'/g,""),medium:e(".foundation-mq-medium").css("font-family").replace(/\'/g,""),large:e(".foundation-mq-large").css("font-family").replace(/\'/g,"")},stylesheet:e("<style></style>").appendTo("head")[0].sheet,init:function(t,n,r,i,s,o){var u,a=[t,r,i,s],f=[],o=o||!1;o&&(this.nc=o),this.rtl=/rtl/i.test(e("html").attr("dir")),this.scope=t||this.scope;if(n&&typeof n=="string"&&!/reflow/i.test(n)){if(/off/i.test(n))return this.off();u=n.split(" ");if(u.length>0)for(var l=u.length-1;l>=0;l--)f.push(this.init_lib(u[l],a))}else{/reflow/i.test(n)&&(a[1]="reflow");for(var c in this.libs)f.push(this.init_lib(c,a))}return typeof n=="function"&&a.unshift(n),this.response_obj(f,a)},response_obj:function(e,t){for(var n=0,r=t.length;n<r;n++)if(typeof t[n]=="function")return t[n]({errors:e.filter(function(e){if(typeof e=="string")return e})});return e},init_lib:function(e,t){return this.trap(function(){return this.libs.hasOwnProperty(e)?(this.patch(this.libs[e]),this.libs[e].init.apply(this.libs[e],t)):function(){}}.bind(this),e)},trap:function(e,t){if(!this.nc)try{return e()}catch(n){return this.error({name:t,message:"could not be initialized",more:n.name+" "+n.message})}return e()},patch:function(e){this.fix_outer(e),e.scope=this.scope,e.rtl=this.rtl},inherit:function(e,t){var n=t.split(" ");for(var r=n.length-1;r>=0;r--)this.lib_methods.hasOwnProperty(n[r])&&(this.libs[e.name][n[r]]=this.lib_methods[n[r]])},random_str:function(e){var t="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");e||(e=Math.floor(Math.random()*t.length));var n="";for(var r=0;r<e;r++)n+=t[Math.floor(Math.random()*t.length)];return n},libs:{},lib_methods:{set_data:function(e,t){var n=[this.name,+(new Date),Foundation.random_str(5)].join("-");return Foundation.cache[n]=t,e.attr("data-"+this.name+"-id",n),t},get_data:function(e){return Foundation.cache[e.attr("data-"+this.name+"-id")]},remove_data:function(t){t?(delete Foundation.cache[t.attr("data-"+this.name+"-id")],t.attr("data-"+this.name+"-id","")):e("[data-"+this.name+"-id]").each(function(){delete Foundation.cache[e(this).attr("data-"+this.name+"-id")],e(this).attr("data-"+this.name+"-id","")})},throttle:function(e,t){var n=null;return function(){var r=this,i=arguments;clearTimeout(n),n=setTimeout(function(){e.apply(r,i)},t)}},data_options:function(t){function u(e){return!isNaN(e-0)&&e!==null&&e!==""&&e!==!1&&e!==!0}function a(t){return typeof t=="string"?e.trim(t):t}var n={},r,i,s=(t.attr("data-options")||":").split(";"),o=s.length;for(r=o-1;r>=0;r--)i=s[r].split(":"),/true/i.test(i[1])&&(i[1]=!0),/false/i.test(i[1])&&(i[1]=!1),u(i[1])&&(i[1]=parseInt(i[1],10)),i.length===2&&i[0].length>0&&(n[a(i[0])]=a(i[1]));return n},delay:function(e,t){return setTimeout(e,t)},scrollTo:function(n,r,i){if(i<0)return;var s=r-e(t).scrollTop(),o=s/i*10;this.scrollToTimerCache=setTimeout(function(){isNaN(parseInt(o,10))||(t.scrollTo(0,e(t).scrollTop()+o),this.scrollTo(n,r,i-10))}.bind(this),10)},scrollLeft:function(e){if(!e.length)return;return"scrollLeft"in e[0]?e[0].scrollLeft:e[0].pageXOffset},empty:function(e){if(e.length&&e.length>0)return!1;if(e.length&&e.length===0)return!0;for(var t in e)if(hasOwnProperty.call(e,t))return!1;return!0},addCustomRule:function(e,t){if(t===r)Foundation.stylesheet.insertRule(e,Foundation.stylesheet.cssRules.length);else{var n=Foundation.media_queries[t];n!==r&&Foundation.stylesheet.insertRule("@media "+Foundation.media_queries[t]+"{ "+e+" }")}}},fix_outer:function(e){e.outerHeight=function(e,t){return typeof Zepto=="function"?e.height():typeof t!="undefined"?e.outerHeight(t):e.outerHeight()},e.outerWidth=function(e,t){return typeof Zepto=="function"?e.width():typeof t!="undefined"?e.outerWidth(t):e.outerWidth()}},error:function(e){return e.name+" "+e.message+"; "+e.more},off:function(){return e(this.scope).off(".fndtn"),e(t).off(".fndtn"),!0},zj:e},e.fn.foundation=function(){var e=Array.prototype.slice.call(arguments,0);return this.each(function(){return Foundation.init.apply(Foundation,[this].concat(e)),this})}})(libFuncName,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.interchange={name:"interchange",version:"4.2.4",cache:{},images_loaded:!1,settings:{load_attr:"interchange",named_queries:{"default":"only screen and (min-width: 1px)",small:"only screen and (min-width: 768px)",medium:"only screen and (min-width: 1280px)",large:"only screen and (min-width: 1440px)",landscape:"only screen and (orientation: landscape)",portrait:"only screen and (orientation: portrait)",retina:"only screen and (-webkit-min-device-pixel-ratio: 2),only screen and (min--moz-device-pixel-ratio: 2),only screen and (-o-min-device-pixel-ratio: 2/1),only screen and (min-device-pixel-ratio: 2),only screen and (min-resolution: 192dpi),only screen and (min-resolution: 2dppx)"},directives:{replace:function(e,t){if(/IMG/.test(e[0].nodeName)){var n=e[0].src;if((new RegExp(t,"i")).test(n))return;return e[0].src=t,e.trigger("replace",[e[0].src,n])}}}},init:function(t,n,r){return Foundation.inherit(this,"throttle"),typeof n=="object"&&e.extend(!0,this.settings,n),this.events(),this.images(),typeof n!="string"?this.settings.init:this[n].call(this,r)},events:function(){var n=this;e(t).on("resize.fndtn.interchange",n.throttle(function(){n.resize.call(n)},50))},resize:function(){var t=this.cache;if(!this.images_loaded){setTimeout(e.proxy(this.resize,this),50);return}for(var n in t)if(t.hasOwnProperty(n)){var r=this.results(n,t[n]);r&&this.settings.directives[r.scenario[1]](r.el,r.scenario[0])}},results:function(t,n){var r=n.length;if(r>0){var i=e('[data-uuid="'+t+'"]');for(var s=r-1;s>=0;s--){var o,u=n[s][2];this.settings.named_queries.hasOwnProperty(u)?o=matchMedia(this.settings.named_queries[u]):o=matchMedia(u);if(o.matches)return{el:i,scenario:n[s]}}}return!1},images:function(e){return typeof this.cached_images=="undefined"||e?this.update_images():this.cached_images},update_images:function(){var t=n.getElementsByTagName("img"),r=t.length,i=0,s="data-"+this.settings.load_attr;this.cached_images=[],this.images_loaded=!1;for(var o=r-1;o>=0;o--)this.loaded(e(t[o]),function(e){i++;if(e){var t=e.getAttribute(s)||"";t.length>0&&this.cached_images.push(e)}i===r&&(this.images_loaded=!0,this.enhance())}.bind(this));return"deferred"},loaded:function(e,t){function n(){t(e[0])}function r(){this.one("load",n);if(/MSIE (\d+\.\d+);/.test(navigator.userAgent)){var e=this.attr("src"),t=e.match(/\?/)?"&":"?";t+="random="+(new Date).getTime(),this.attr("src",e+t)}}if(!e.attr("src")){n();return}e[0].complete||e[0].readyState===4?n():r.call(e)},enhance:function(){var n=this.images().length;for(var r=n-1;r>=0;r--)this._object(e(this.images()[r]));return e(t).trigger("resize")},parse_params:function(e,t,n){return[this.trim(e),this.convert_directive(t),this.trim(n)]},convert_directive:function(e){var t=this.trim(e);return t.length>0?t:"replace"},_object:function(e){var t=this.parse_data_attr(e),n=[],r=t.length;if(r>0)for(var i=r-1;i>=0;i--){var s=t[i].split(/\((.*?)(\))$/);if(s.length>1){var o=s[0].split(","),u=this.parse_params(o[0],o[1],s[1]);n.push(u)}}return this.store(e,n)},uuid:function(e){function n(){return((1+Math.random())*65536|0).toString(16).substring(1)}var t=e||"-";return n()+n()+t+n()+t+n()+t+n()+t+n()+n()+n()},store:function(e,t){var n=this.uuid(),r=e.data("uuid");return r?this.cache[r]:(e.attr("data-uuid",n),this.cache[n]=t)},trim:function(t){return typeof t=="string"?e.trim(t):t},parse_data_attr:function(e){var t=e.data(this.settings.load_attr).split(/\[(.*?)\]/),n=t.length,r=[];for(var i=n-1;i>=0;i--)t[i].replace(/[\W\d]+/,"").length>4&&r.push(t[i]);return r},reflow:function(){this.images(!0)}}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.abide={name:"abide",version:"4.3.2",settings:{live_validate:!0,focus_on_invalid:!0,timeout:1e3,patterns:{alpha:/[a-zA-Z]+/,alpha_numeric:/[a-zA-Z0-9]+/,integer:/-?\d+/,number:/-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?/,password:/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,card:/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,cvv:/^([0-9]){3,4}$/,email:/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,url:/(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?/,domain:/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/,datetime:/([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))/,date:/(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))/,time:/(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}/,dateISO:/\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/,month_day_year:/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/,color:/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/}},timer:null,init:function(t,n,r){typeof n=="object"&&e.extend(!0,this.settings,n);if(typeof n=="string")return this[n].call(this,r);this.settings.init||this.events()},events:function(){var t=this,n=e("form[data-abide]",this.scope).attr("novalidate","novalidate");n.on("submit validate",function(n){return t.validate(e(this).find("input, textarea, select").get(),n)}),this.settings.init=!0;if(!this.settings.live_validate)return;n.find("input, textarea, select").on("blur change",function(e){t.validate([this],e)}).on("keydown",function(e){clearTimeout(t.timer),t.timer=setTimeout(function(){t.validate([this],e)}.bind(this),t.settings.timeout)})},validate:function(t,n){var r=this.parse_patterns(t),i=r.length,s=e(t[0]).closest("form");for(var o=0;o<i;o++)if(!r[o]&&/submit/.test(n.type))return this.settings.focus_on_invalid&&t[o].focus(),s.trigger("invalid"),e(t[o]).closest("form").attr("data-invalid",""),!1;return/submit/.test(n.type)&&s.trigger("valid"),s.removeAttr("data-invalid"),!0},parse_patterns:function(e){var t=e.length,n=[];for(var r=t-1;r>=0;r--)n.push(this.pattern(e[r]));return this.check_validation_and_apply_styles(n)},pattern:function(e){var t=e.getAttribute("type"),n=typeof e.getAttribute("required")=="string";if(this.settings.patterns.hasOwnProperty(t))return[e,this.settings.patterns[t],n];var r=e.getAttribute("pattern")||"";return this.settings.patterns.hasOwnProperty(r)&&r.length>0?[e,this.settings.patterns[r],n]:r.length>0?[e,new RegExp(r),n]:(r=/.*/,[e,r,n])},check_validation_and_apply_styles:function(t){var n=t.length,r=[];for(var i=n-1;i>=0;i--){var s=t[i][0],o=t[i][2],u=s.value,a=s.type==="radio",f=o?s.value.length>0:!0;a&&o?r.push(this.valid_radio(s,o)):t[i][1].test(u)&&f||!o&&s.value.length<1?(e(s).removeAttr("data-invalid").parent().removeClass("error"),r.push(!0)):(e(s).attr("data-invalid","").parent().addClass("error"),r.push(!1))}return r},valid_radio:function(t,r){var i=t.getAttribute("name"),s=n.getElementsByName(i),o=s.length,u=!1;for(var a=0;a<o;a++)s[a].checked&&(u=!0);for(var a=0;a<o;a++)u?e(s[a]).removeAttr("data-invalid").parent().removeClass("error"):e(s[a]).attr("data-invalid","").parent().addClass("error");return u}}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.dropdown={name:"dropdown",version:"4.3.2",settings:{activeClass:"open",is_hover:!1,opened:function(){},closed:function(){}},init:function(t,n,r){return this.scope=t||this.scope,Foundation.inherit(this,"throttle scrollLeft data_options"),typeof n=="object"&&e.extend(!0,this.settings,n),typeof n!="string"?(this.settings.init||this.events(),this.settings.init):this[n].call(this,r)},events:function(){var r=this;e(this.scope).on("click.fndtn.dropdown","[data-dropdown]",function(t){var n=e.extend({},r.settings,r.data_options(e(this)));t.preventDefault(),n.is_hover||r.toggle(e(this))}).on("mouseenter","[data-dropdown]",function(t){var n=e.extend({},r.settings,r.data_options(e(this)));n.is_hover&&r.toggle(e(this))}).on("mouseleave","[data-dropdown-content]",function(t){var n=e('[data-dropdown="'+e(this).attr("id")+'"]'),i=e.extend({},r.settings,r.data_options(n));i.is_hover&&r.close.call(r,e(this))}).on("opened.fndtn.dropdown","[data-dropdown-content]",this.settings.opened).on("closed.fndtn.dropdown","[data-dropdown-content]",this.settings.closed),e(n).on("click.fndtn.dropdown",function(t){var n=e(t.target).closest("[data-dropdown-content]");if(e(t.target).data("dropdown")||e(t.target).parent().data("dropdown"))return;if(!e(t.target).data("revealId")&&n.length>0&&(e(t.target).is("[data-dropdown-content]")||e.contains(n.first()[0],t.target))){t.stopPropagation();return}r.close.call(r,e("[data-dropdown-content]"))}),e(t).on("resize.fndtn.dropdown",r.throttle(function(){r.resize.call(r)},50)).trigger("resize"),this.settings.init=!0},close:function(t){var n=this;t.each(function(){e(this).hasClass(n.settings.activeClass)&&(e(this).css(Foundation.rtl?"right":"left","-99999px").removeClass(n.settings.activeClass),e(this).trigger("closed"))})},open:function(e,t){this.css(e.addClass(this.settings.activeClass),t),e.trigger("opened")},toggle:function(t){var n=e("#"+t.data("dropdown"));if(n.length===0)return;this.close.call(this,e("[data-dropdown-content]").not(n)),n.hasClass(this.settings.activeClass)?this.close.call(this,n):(this.close.call(this,e("[data-dropdown-content]")),this.open.call(this,n,t))},resize:function(){var t=e("[data-dropdown-content].open"),n=e("[data-dropdown='"+t.attr("id")+"']");t.length&&n.length&&this.css(t,n)},css:function(n,r){var i=n.offsetParent(),s=r.offset();s.top-=i.offset().top,s.left-=i.offset().left;if(this.small())n.css({position:"absolute",width:"95%","max-width":"none",top:s.top+this.outerHeight(r)}),n.css(Foundation.rtl?"right":"left","2.5%");else{if(!Foundation.rtl&&e(t).width()>this.outerWidth(n)+r.offset().left&&!this.data_options(r).align_right){var o=s.left;n.hasClass("right")&&n.removeClass("right")}else{n.hasClass("right")||n.addClass("right");var o=s.left-(this.outerWidth(n)-this.outerWidth(r))}n.attr("style","").css({position:"absolute",top:s.top+this.outerHeight(r),left:o})}return n},small:function(){return e(t).width()<768||e("html").hasClass("lt-ie9")},off:function(){e(this.scope).off(".fndtn.dropdown"),e("html, body").off(".fndtn.dropdown"),e(t).off(".fndtn.dropdown"),e("[data-dropdown-content]").off(".fndtn.dropdown"),this.settings.init=!1},reflow:function(){}}}(Foundation.zj,this,this.document),function(e){"use strict";function t(e,t,n){if(e.addEventListener)return e.addEventListener(t,n,!1);if(e.attachEvent)return e.attachEvent("on"+t,n)}function n(e,t){var n,r;for(n=0,r=e.length;n<r;n++)if(e[n]===t)return!0;return!1}function r(e,t){var n;e.createTextRange?(n=e.createTextRange(),n.move("character",t),n.select()):e.selectionStart&&(e.focus(),e.setSelectionRange(t,t))}function i(e,t){try{return e.type=t,!0}catch(n){return!1}}e.Placeholders={Utils:{addEventListener:t,inArray:n,moveCaret:r,changeType:i}}}(this),function(e){"use strict";function M(){}function _(e){var t;return e.value===e.getAttribute(a)&&e.getAttribute(f)==="true"?(e.setAttribute(f,"false"),e.value="",e.className=e.className.replace(s,""),t=e.getAttribute(l),t&&(e.type=t),!0):!1}function D(e){var t,n=e.getAttribute(a);return e.value===""&&n?(e.setAttribute(f,"true"),e.value=n,e.className+=" "+i,t=e.getAttribute(l),t?e.type="text":e.type==="password"&&b.changeType(e,"text")&&e.setAttribute(l,"password"),!0):!1}function P(e,t){var n,r,i,s,f;if(e&&e.getAttribute(a))t(e);else{n=e?e.getElementsByTagName("input"):o,r=e?e.getElementsByTagName("textarea"):u;for(f=0,s=n.length+r.length;f<s;f++)i=f<n.length?n[f]:r[f-n.length],t(i)}}function H(e){P(e,_)}function B(e){P(e,D)}function j(e){return function(){w&&e.value===e.getAttribute(a)&&e.getAttribute(f)==="true"?b.moveCaret(e,0):_(e)}}function F(e){return function(){D(e)}}function I(e){return function(t){S=e.value;if(e.getAttribute(f)==="true"&&S===e.getAttribute(a)&&b.inArray(n,t.keyCode))return t.preventDefault&&t.preventDefault(),!1}}function q(e){return function(){var t;e.getAttribute(f)==="true"&&e.value!==S&&(e.className=e.className.replace(s,""),e.value=e.value.replace(e.getAttribute(a),""),e.setAttribute(f,!1),t=e.getAttribute(l),t&&(e.type=t)),e.value===""&&(e.blur(),b.moveCaret(e,0))}}function R(e){return function(){e===document.activeElement&&e.value===e.getAttribute(a)&&e.getAttribute(f)==="true"&&b.moveCaret(e,0)}}function U(e){return function(){H(e)}}function z(e){e.form&&(k=e.form,k.getAttribute(c)||(b.addEventListener(k,"submit",U(k)),k.setAttribute(c,"true"))),b.addEventListener(e,"focus",j(e)),b.addEventListener(e,"blur",F(e)),w&&(b.addEventListener(e,"keydown",I(e)),b.addEventListener(e,"keyup",q(e)),b.addEventListener(e,"click",R(e))),e.setAttribute(h,"true"),e.setAttribute(a,N),D(e)}var t=["text","search","url","tel","email","password","number","textarea"],n=[27,33,34,35,36,37,38,39,40,8,46],r="#ccc",i="placeholdersjs",s=new RegExp("(?:^|\\s)"+i+"(?!\\S)"),o,u,a="data-placeholder-value",f="data-placeholder-active",l="data-placeholder-type",c="data-placeholder-submit",h="data-placeholder-bound",p="data-placeholder-focus",d="data-placeholder-live",v=document.createElement("input"),m=document.getElementsByTagName("head")[0],g=document.documentElement,y=e.Placeholders,b=y.Utils,w,E,S,x,T,N,C,k,L,A,O;y.nativeSupport=v.placeholder!==void 0;if(!y.nativeSupport){o=document.getElementsByTagName("input"),u=document.getElementsByTagName("textarea"),w=g.getAttribute(p)==="false",E=g.getAttribute(d)!=="false",x=document.createElement("style"),x.type="text/css",T=document.createTextNode("."+i+" { color:"+r+"; }"),x.styleSheet?x.styleSheet.cssText=T.nodeValue:x.appendChild(T),m.insertBefore(x,m.firstChild);for(O=0,A=o.length+u.length;O<A;O++)L=O<o.length?o[O]:u[O-o.length],N=L.attributes.placeholder,N&&(N=N.nodeValue,N&&b.inArray(t,L.type)&&z(L));C=setInterval(function(){for(O=0,A=o.length+u.length;O<A;O++){L=O<o.length?o[O]:u[O-o.length],N=L.attributes.placeholder;if(N){N=N.nodeValue;if(N&&b.inArray(t,L.type)){L.getAttribute(h)||z(L);if(N!==L.getAttribute(a)||L.type==="password"&&!L.getAttribute(l))L.type==="password"&&!L.getAttribute(l)&&b.changeType(L,"text")&&L.setAttribute(l,"password"),L.value===L.getAttribute(a)&&(L.value=N),L.setAttribute(a,N)}}}E||clearInterval(C)},100)}y.disable=y.nativeSupport?M:H,y.enable=y.nativeSupport?M:B}(this),function(e,t,n,r){"use strict";Foundation.libs.forms={name:"forms",version:"4.3.2",cache:{},settings:{disable_class:"no-custom",last_combo:null},init:function(t,n,r){return typeof n=="object"&&e.extend(!0,this.settings,n),typeof n!="string"?(this.settings.init||this.events(),this.assemble(),this.settings.init):this[n].call(this,r)},assemble:function(){var t=this;e('form.custom input[type="radio"],[type="checkbox"]',e(this.scope)).not('[data-customforms="disabled"]').not("."+this.settings.disable_class).each(function(e,n){t.set_custom_markup(n)}).change(function(){t.set_custom_markup(this)}),e("form.custom select",e(this.scope)).not('[data-customforms="disabled"]').not("."+this.settings.disable_class).not("[multiple=multiple]").each(this.append_custom_select)},events:function(){var r=this;e(this.scope).on("click.fndtn.forms","form.custom span.custom.checkbox",function(t){t.preventDefault(),t.stopPropagation(),r.toggle_checkbox(e(this))}).on("click.fndtn.forms","form.custom span.custom.radio",function(t){t.preventDefault(),t.stopPropagation(),r.toggle_radio(e(this))}).on("change.fndtn.forms","form.custom select",function(t,n){if(e(this).is('[data-customforms="disabled"]'))return;r.refresh_custom_select(e(this),n)}).on("click.fndtn.forms","form.custom label",function(t){if(e(t.target).is("label")){var n=e("#"+r.escape(e(this).attr("for"))).not('[data-customforms="disabled"]'),i,s;n.length!==0&&(n.attr("type")==="checkbox"?(t.preventDefault(),i=e(this).find("span.custom.checkbox"),i.length===0&&(i=n.add(this).siblings("span.custom.checkbox").first()),r.toggle_checkbox(i)):n.attr("type")==="radio"&&(t.preventDefault(),s=e(this).find("span.custom.radio"),s.length===0&&(s=n.add(this).siblings("span.custom.radio").first()),r.toggle_radio(s)))}}).on("mousedown.fndtn.forms","form.custom div.custom.dropdown",function(){return!1}).on("click.fndtn.forms","form.custom div.custom.dropdown a.current, form.custom div.custom.dropdown a.selector",function(t){var n=e(this),s=n.closest("div.custom.dropdown"),o=i(s,"select");s.hasClass("open")||e(r.scope).trigger("click"),t.preventDefault();if(!1===o.is(":disabled"))return s.toggleClass("open"),s.hasClass("open")?e(r.scope).on("click.fndtn.forms.customdropdown",function(){s.removeClass("open"),e(r.scope).off(".fndtn.forms.customdropdown")}):e(r.scope).on(".fndtn.forms.customdropdown"),!1}).on("click.fndtn.forms touchend.fndtn.forms","form.custom div.custom.dropdown li",function(t){var r=e(this),s=r.closest("div.custom.dropdown"),o=i(s,"select"),u=0;t.preventDefault(),t.stopPropagation();if(!e(this).hasClass("disabled")){e("div.dropdown").not(s).removeClass("open");var a=r.closest("ul").find("li.selected");a.removeClass("selected"),r.addClass("selected"),s.removeClass("open").find("a.current").text(r.text()),r.closest("ul").find("li").each(function(e){r[0]===this&&(u=e)}),o[0].selectedIndex=u,o.data("prevalue",a.html());if(typeof n.createEvent!="undefined"){var f=n.createEvent("HTMLEvents");f.initEvent("change",!0,!0),o[0].dispatchEvent(f)}else o[0].fireEvent("onchange")}}),e(t).on("keydown",function(t){var r=n.activeElement,s=Foundation.libs.forms,o=e(".custom.dropdown"),u=i(o,"select"),a=e("input,select,textarea,button");if(o.length>0&&o.hasClass("open")){t.preventDefault(),t.which===9&&(e(a[e(a).index(u)+1]).focus(),o.removeClass("open")),t.which===13&&o.find("li.selected").trigger("click"),t.which===27&&o.removeClass("open");if(t.which>=65&&t.which<=90){var f=s.go_to(o,t.which),l=o.find("li.selected");f&&(l.removeClass("selected"),s.scrollTo(f.addClass("selected"),300))}if(t.which===38){var l=o.find("li.selected"),c=l.prev(":not(.disabled)");c.length>0&&(c.parent()[0].scrollTop=c.parent().scrollTop()-s.outerHeight(c),l.removeClass("selected"),c.addClass("selected"))}else if(t.which===40){var l=o.find("li.selected"),f=l.next(":not(.disabled)");f.length>0&&(f.parent()[0].scrollTop=f.parent().scrollTop()+s.outerHeight(f),l.removeClass("selected"),f.addClass("selected"))}}}),e(t).on("keyup",function(t){var r=n.activeElement,i=e(".custom.dropdown");r===i.find(".current")[0]&&i.find(".selector").focus().click()}),this.settings.init=!0},go_to:function(e,t){var n=e.find("li"),r=n.length;if(r>0)for(var i=0;i<r;i++){var s=n.eq(i).text().charAt(0).toLowerCase();if(s===String.fromCharCode(t).toLowerCase())return n.eq(i)}},scrollTo:function(e,t){if(t<0)return;var n=e.parent(),r=this.outerHeight(e),i=r*e.index()-n.scrollTop(),s=i/t*10;this.scrollToTimerCache=setTimeout(function(){isNaN(parseInt(s,10))||(n[0].scrollTop=n.scrollTop()+s,this.scrollTo(e,t-10))}.bind(this),10)},set_custom_markup:function(t){var n=e(t),r=n.attr("type"),i=n.next("span.custom."+r);n.parent().hasClass("switch")||n.addClass("hidden-field"),i.length===0&&(i=e('<span class="custom '+r+'"></span>').insertAfter(n)),i.toggleClass("checked",n.is(":checked")),i.toggleClass("disabled",n.is(":disabled"))},append_custom_select:function(t,n){var r=Foundation.libs.forms,i=e(n),s=i.next("div.custom.dropdown"),o=s.find("ul"),u=s.find(".current"),a=s.find(".selector"),f=i.find("option"),l=f.filter(":selected"),c=i.attr("class")?i.attr("class").split(" "):[],h=0,p="",d,v=!1;if(s.length===0){var m=i.hasClass("small")?"small":i.hasClass("medium")?"medium":i.hasClass("large")?"large":i.hasClass("expand")?"expand":"";s=e('<div class="'+["custom","dropdown",m].concat(c).filter(function(e,t,n){return e===""?!1:n.indexOf(e)===t}).join(" ")+'"><a href="#" class="selector"></a><ul /></div>'),a=s.find(".selector"),o=s.find("ul"),p=f.map(function(){var t=e(this).attr("class")?e(this).attr("class"):"";return"<li class='"+t+"'>"+e(this).html()+"</li>"}).get().join(""),o.append(p),v=s.prepend('<a href="#" class="current">'+(l.html()||"")+"</a>").find(".current"),i.after(s).addClass("hidden-field")}else p=f.map(function(){return"<li>"+e(this).html()+"</li>"}).get().join(""),o.html("").append(p);r.assign_id(i,s),s.toggleClass("disabled",i.is(":disabled")),d=o.find("li"),r.cache[s.data("id")]=d.length,f.each(function(t){this.selected&&(d.eq(t).addClass("selected"),v&&v.html(e(this).html())),e(this).is(":disabled")&&d.eq(t).addClass("disabled")});if(!s.is(".small, .medium, .large, .expand")){s.addClass("open");var r=Foundation.libs.forms;r.hidden_fix.adjust(o),h=r.outerWidth(d)>h?r.outerWidth(d):h,Foundation.libs.forms.hidden_fix.reset(),s.removeClass("open")}},assign_id:function(e,t){var n=[+(new Date),Foundation.random_str(5)].join("-");e.attr("data-id",n),t.attr("data-id",n)},refresh_custom_select:function(t,n){var r=this,i=0,s=t.next(),o=t.find("option"),u=s.find("ul"),a=s.find("li");if(o.length!==this.cache[s.data("id")]||n){u.html("");var f="";o.each(function(){var t=e(this),n=t.html(),r=this.selected;f+='<li class="'+(r?" selected ":"")+(t.is(":disabled")?" disabled ":"")+'">'+n+"</li>",r&&s.find(".current").html(n)}),u.html(f),s.removeAttr("style"),u.removeAttr("style"),s.find("li").each(function(){s.addClass("open"),r.outerWidth(e(this))>i&&(i=r.outerWidth(e(this))),s.removeClass("open")}),a=s.find("li"),this.cache[s.data("id")]=a.length}},refresh_custom_selection:function(t){var n=e("option:selected",t).text();e("a.current",t.next()).text(n)},toggle_checkbox:function(e){var t=e.prev(),n=t[0];!1===t.is(":disabled")&&(n.checked=n.checked?!1:!0,e.toggleClass("checked"),t.trigger("change"))},toggle_radio:function(e){var t=e.prev(),n=t.closest("form.custom"),r=t[0];!1===t.is(":disabled")&&(n.find('input[type="radio"][name="'+this.escape(t.attr("name"))+'"]').next().not(e).removeClass("checked"),e.hasClass("checked")||e.toggleClass("checked"),r.checked=e.hasClass("checked"),t.trigger("change"))},escape:function(e){return e?e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"):""},hidden_fix:{tmp:[],hidden:null,adjust:function(t){var n=this;n.hidden=t.parents(),n.hidden=n.hidden.add(t).filter(":hidden"),n.hidden.each(function(){var t=e(this);n.tmp.push(t.attr("style")),t.css({visibility:"hidden",display:"block"})})},reset:function(){var t=this;t.hidden.each(function(n){var i=e(this),s=t.tmp[n];s===r?i.removeAttr("style"):i.attr("style",s)}),t.tmp=[],t.hidden=null}},off:function(){e(this.scope).off(".fndtn.forms")},reflow:function(){}};var i=function(t,n){var t=t.prev();while(t.length){if(t.is(n))return t;t=t.prev()}return e()}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.alerts={name:"alerts",version:"4.3.2",settings:{animation:"fadeOut",speed:300,callback:function(){}},init:function(t,n,r){return this.scope=t||this.scope,Foundation.inherit(this,"data_options"),typeof n=="object"&&e.extend(!0,this.settings,n),typeof n!="string"?(this.settings.init||this.events(),this.settings.init):this[n].call(this,r)},events:function(){var t=this;e(this.scope).on("click.fndtn.alerts","[data-alert] a.close",function(n){var r=e(this).closest("[data-alert]"),i=e.extend({},t.settings,t.data_options(r));n.preventDefault(),r[i.animation](i.speed,function(){e(this).remove(),i.callback()})}),this.settings.init=!0},off:function(){e(this.scope).off(".fndtn.alerts")},reflow:function(){}}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.magellan={name:"magellan",version:"4.3.2",settings:{activeClass:"active",threshold:0},init:function(t,n,r){return this.scope=t||this.scope,Foundation.inherit(this,"data_options"),typeof n=="object"&&e.extend(!0,this.settings,n),typeof n!="string"?(this.settings.init||(this.fixed_magellan=e("[data-magellan-expedition]"),this.set_threshold(),this.last_destination=e("[data-magellan-destination]").last(),this.events()),this.settings.init):this[n].call(this,r)},events:function(){var n=this;e(this.scope).on("arrival.fndtn.magellan","[data-magellan-arrival]",function(t){var r=e(this),i=r.closest("[data-magellan-expedition]"),s=i.attr("data-magellan-active-class")||n.settings.activeClass;r.closest("[data-magellan-expedition]").find("[data-magellan-arrival]").not(r).removeClass(s),r.addClass(s)}),this.fixed_magellan.on("update-position.fndtn.magellan",function(){var t=e(this)}).trigger("update-position"),e(t).on("resize.fndtn.magellan",function(){this.fixed_magellan.trigger("update-position")}.bind(this)).on("scroll.fndtn.magellan",function(){var r=e(t).scrollTop();n.fixed_magellan.each(function(){var t=e(this);typeof t.data("magellan-top-offset")=="undefined"&&t.data("magellan-top-offset",t.offset().top),typeof t.data("magellan-fixed-position")=="undefined"&&t.data("magellan-fixed-position",!1);var i=r+n.settings.threshold>t.data("magellan-top-offset"),s=t.attr("data-magellan-top-offset");t.data("magellan-fixed-position")!=i&&(t.data("magellan-fixed-position",i),i?(t.addClass("fixed"),t.css({position:"fixed",top:0})):(t.removeClass("fixed"),t.css({position:"",top:""})),i&&typeof s!="undefined"&&s!=0&&t.css({position:"fixed",top:s+"px"}))})}),this.last_destination.length>0&&e(t).on("scroll.fndtn.magellan",function(r){var i=e(t).scrollTop(),s=i+e(t).height(),o=Math.ceil(n.last_destination.offset().top);e("[data-magellan-destination]").each(function(){var t=e(this),r=t.attr("data-magellan-destination"),u=t.offset().top-i;u<=n.settings.threshold&&e("[data-magellan-arrival='"+r+"']").trigger("arrival"),s>=e(n.scope).height()&&o>i&&o<s&&e("[data-magellan-arrival]").last().trigger("arrival")})}),this.settings.init=!0},set_threshold:function(){typeof this.settings.threshold!="number"&&(this.settings.threshold=this.fixed_magellan.length>0?this.outerHeight(this.fixed_magellan,!0):0)},off:function(){e(this.scope).off(".fndtn.magellan"),e(t).off(".fndtn.magellan")},reflow:function(){}}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.reveal={name:"reveal",version:"4.3.2",locked:!1,settings:{animation:"fadeAndPop",animationSpeed:250,closeOnBackgroundClick:!0,closeOnEsc:!0,dismissModalClass:"close-reveal-modal",bgClass:"reveal-modal-bg",open:function(){},opened:function(){},close:function(){},closed:function(){},bg:e(".reveal-modal-bg"),css:{open:{opacity:0,visibility:"visible",display:"block"},close:{opacity:1,visibility:"hidden",display:"none"}}},init:function(t,n,r){return Foundation.inherit(this,"data_options delay"),typeof n=="object"?e.extend(!0,this.settings,n):typeof r!="undefined"&&e.extend(!0,this.settings,r),typeof n!="string"?(this.events(),this.settings.init):this[n].call(this,r)},events:function(){var t=this;return e(this.scope).off(".fndtn.reveal").on("click.fndtn.reveal","[data-reveal-id]",function(n){n.preventDefault();if(!t.locked){var r=e(this),i=r.data("reveal-ajax");t.locked=!0;if(typeof i=="undefined")t.open.call(t,r);else{var s=i===!0?r.attr("href"):i;t.open.call(t,r,{url:s})}}}).on("click.fndtn.reveal touchend",this.close_targets(),function(n){n.preventDefault();if(!t.locked){var r=e.extend({},t.settings,t.data_options(e(".reveal-modal.open"))),i=e(n.target)[0]===e("."+r.bgClass)[0];if(i&&!r.closeOnBackgroundClick)return;t.locked=!0,t.close.call(t,i?e(".reveal-modal.open"):e(this).closest(".reveal-modal"))}}),e(this.scope).hasClass("reveal-modal")?e(this.scope).on("open.fndtn.reveal",this.settings.open).on("opened.fndtn.reveal",this.settings.opened).on("opened.fndtn.reveal",this.open_video).on("close.fndtn.reveal",this.settings.close).on("closed.fndtn.reveal",this.settings.closed).on("closed.fndtn.reveal",this.close_video):e(this.scope).on("open.fndtn.reveal",".reveal-modal",this.settings.open).on("opened.fndtn.reveal",".reveal-modal",this.settings.opened).on("opened.fndtn.reveal",".reveal-modal",this.open_video).on("close.fndtn.reveal",".reveal-modal",this.settings.close).on("closed.fndtn.reveal",".reveal-modal",this.settings.closed).on("closed.fndtn.reveal",".reveal-modal",this.close_video),e("body").bind("keyup.reveal",function(n){var r=e(".reveal-modal.open"),i=e.extend({},t.settings,t.data_options(r));n.which===27&&i.closeOnEsc&&r.foundation("reveal","close")}),!0},open:function(t,n){if(t)if(typeof t.selector!="undefined")var r=e("#"+t.data("reveal-id"));else{var r=e(this.scope);n=t}else var r=e(this.scope);if(!r.hasClass("open")){var i=e(".reveal-modal.open");typeof r.data("css-top")=="undefined"&&r.data("css-top",parseInt(r.css("top"),10)).data("offset",this.cache_offset(r)),r.trigger("open"),i.length<1&&this.toggle_bg();if(typeof n=="undefined"||!n.url)this.hide(i,this.settings.css.close),this.show(r,this.settings.css.open);else{var s=this,o=typeof n.success!="undefined"?n.success:null;e.extend(n,{success:function(t,n,u){e.isFunction(o)&&o(t,n,u),r.html(t),e(r).foundation("section","reflow"),s.hide(i,s.settings.css.close),s.show(r,s.settings.css.open)}}),e.ajax(n)}}},close:function(t){var t=t&&t.length?t:e(this.scope),n=e(".reveal-modal.open");n.length>0&&(this.locked=!0,t.trigger("close"),this.toggle_bg(),this.hide(n,this.settings.css.close))},close_targets:function(){var e="."+this.settings.dismissModalClass;return this.settings.closeOnBackgroundClick?e+", ."+this.settings.bgClass:e},toggle_bg:function(){e("."+this.settings.bgClass).length===0&&(this.settings.bg=e("<div />",{"class":this.settings.bgClass}).appendTo("body")),this.settings.bg.filter(":visible").length>0?this.hide(this.settings.bg):this.show(this.settings.bg)},show:function(n,r){if(r){if(n.parent("body").length===0){var i=n.wrap('<div style="display: none;" />').parent();n.on("closed.fndtn.reveal.wrapped",function(){n.detach().appendTo(i),n.unwrap().unbind("closed.fndtn.reveal.wrapped")}),n.detach().appendTo("body")}if(/pop/i.test(this.settings.animation)){r.top=e(t).scrollTop()-n.data("offset")+"px";var s={top:e(t).scrollTop()+n.data("css-top")+"px",opacity:1};return this.delay(function(){return n.css(r).animate(s,this.settings.animationSpeed,"linear",function(){this.locked=!1,n.trigger("opened")}.bind(this)).addClass("open")}.bind(this),this.settings.animationSpeed/2)}if(/fade/i.test(this.settings.animation)){var s={opacity:1};return this.delay(function(){return n.css(r).animate(s,this.settings.animationSpeed,"linear",function(){this.locked=!1,n.trigger("opened")}.bind(this)).addClass("open")}.bind(this),this.settings.animationSpeed/2)}return n.css(r).show().css({opacity:1}).addClass("open").trigger("opened")}return/fade/i.test(this.settings.animation)?n.fadeIn(this.settings.animationSpeed/2):n.show()},hide:function(n,r){if(r){if(/pop/i.test(this.settings.animation)){var i={top:-e(t).scrollTop()-n.data("offset")+"px",opacity:0};return this.delay(function(){return n.animate(i,this.settings.animationSpeed,"linear",function(){this.locked=!1,n.css(r).trigger("closed")}.bind(this)).removeClass("open")}.bind(this),this.settings.animationSpeed/2)}if(/fade/i.test(this.settings.animation)){var i={opacity:0};return this.delay(function(){return n.animate(i,this.settings.animationSpeed,"linear",function(){this.locked=!1,n.css(r).trigger("closed")}.bind(this)).removeClass("open")}.bind(this),this.settings.animationSpeed/2)}return n.hide().css(r).removeClass("open").trigger("closed")}return/fade/i.test(this.settings.animation)?n.fadeOut(this.settings.animationSpeed/2):n.hide()},close_video:function(t){var n=e(this).find(".flex-video"),r=n.find("iframe");r.length>0&&(r.attr("data-src",r[0].src),r.attr("src","about:blank"),n.hide())},open_video:function(t){var n=e(this).find(".flex-video"),i=n.find("iframe");if(i.length>0){var s=i.attr("data-src");if(typeof s=="string")i[0].src=i.attr("data-src");else{var o=i[0].src;i[0].src=r,i[0].src=o}n.show()}},cache_offset:function(e){var t=e.show().height()+parseInt(e.css("top"),10);return e.hide(),t},off:function(){e(this.scope).off(".fndtn.reveal")},reflow:function(){}}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.tooltips={name:"tooltips",version:"4.3.2",settings:{selector:".has-tip",additionalInheritableClasses:[],tooltipClass:".tooltip",touchCloseText:"tap to close",appendTo:"body","disable-for-touch":!1,tipTemplate:function(e,t){return'<span data-selector="'+e+'" class="'+Foundation.libs.tooltips.settings.tooltipClass.substring(1)+'">'+t+'<span class="nub"></span></span>'}},cache:{},init:function(t,n,r){Foundation.inherit(this,"data_options");var i=this;typeof n=="object"?e.extend(!0,this.settings,n):typeof r!="undefined"&&e.extend(!0,this.settings,r);if(typeof n=="string")return this[n].call(this,r);Modernizr.touch?e(this.scope).on("click.fndtn.tooltip touchstart.fndtn.tooltip touchend.fndtn.tooltip","[data-tooltip]",function(t){var n=e.extend({},i.settings,i.data_options(e(this)));n["disable-for-touch"]||(t.preventDefault(),e(n.tooltipClass).hide(),i.showOrCreateTip(e(this)))}).on("click.fndtn.tooltip touchstart.fndtn.tooltip touchend.fndtn.tooltip",this.settings.tooltipClass,function(t){t.preventDefault(),e(this).fadeOut(150)}):e(this.scope).on("mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip","[data-tooltip]",function(t){var n=e(this);/enter|over/i.test(t.type)?i.showOrCreateTip(n):(t.type==="mouseout"||t.type==="mouseleave")&&i.hide(n)})},showOrCreateTip:function(e){var t=this.getTip(e);return t&&t.length>0?this.show(e):this.create(e)},getTip:function(t){var n=this.selector(t),r=null;return n&&(r=e('span[data-selector="'+n+'"]'+this.settings.tooltipClass)),typeof r=="object"?r:!1},selector:function(e){var t=e.attr("id"),n=e.attr("data-tooltip")||e.attr("data-selector");return(t&&t.length<1||!t)&&typeof n!="string"&&(n="tooltip"+Math.random().toString(36).substring(7),e.attr("data-selector",n)),t&&t.length>0?t:n},create:function(t){var n=e(this.settings.tipTemplate(this.selector(t),e("<div></div>").html(t.attr("title")).html())),r=this.inheritable_classes(t);n.addClass(r).appendTo(this.settings.appendTo),Modernizr.touch&&n.append('<span class="tap-to-close">'+this.settings.touchCloseText+"</span>"),t.removeAttr("title").attr("title",""),this.show(t)},reposition:function(n,r,i){var s,o,u,a,f,l;r.css("visibility","hidden").show(),s=n.data("width"),o=r.children(".nub"),u=this.outerHeight(o),a=this.outerHeight(o),l=function(e,t,n,r,i,s){return e.css({top:t?t:"auto",bottom:r?r:"auto",left:i?i:"auto",right:n?n:"auto",width:s?s:"auto"}).end()},l(r,n.offset().top+this.outerHeight(n)+10,"auto","auto",n.offset().left,s);if(e(t).width()<767)l(r,n.offset().top+this.outerHeight(n)+10,"auto","auto",12.5,e(this.scope).width()),r.addClass("tip-override"),l(o,-u,"auto","auto",n.offset().left);else{var c=n.offset().left;Foundation.rtl&&(c=n.offset().left+n.offset().width-this.outerWidth(r)),l(r,n.offset().top+this.outerHeight(n)+10,"auto","auto",c,s),r.removeClass("tip-override"),i&&i.indexOf("tip-top")>-1?l(r,n.offset().top-this.outerHeight(r),"auto","auto",c,s).removeClass("tip-override"):i&&i.indexOf("tip-left")>-1?l(r,n.offset().top+this.outerHeight(n)/2-u*2.5,"auto","auto",n.offset().left-this.outerWidth(r)-u,s).removeClass("tip-override"):i&&i.indexOf("tip-right")>-1&&l(r,n.offset().top+this.outerHeight(n)/2-u*2.5,"auto","auto",n.offset().left+this.outerWidth(n)+u,s).removeClass("tip-override")}r.css("visibility","visible").hide()},inheritable_classes:function(t){var n=["tip-top","tip-left","tip-bottom","tip-right","noradius"].concat(this.settings.additionalInheritableClasses),r=t.attr("class"),i=r?e.map(r.split(" "),function(t,r){if(e.inArray(t,n)!==-1)return t}).join(" "):"";return e.trim(i)},show:function(e){var t=this.getTip(e);this.reposition(e,t,e.attr("class")),t.fadeIn(150)},hide:function(e){var t=this.getTip(e);t.fadeOut(150)},reload:function(){var t=e(this);return t.data("fndtn-tooltips")?t.foundationTooltips("destroy").foundationTooltips("init"):t.foundationTooltips("init")},off:function(){e(this.scope).off(".fndtn.tooltip"),e(this.settings.tooltipClass).each(function(t){e("[data-tooltip]").get(t).attr("title",e(this).text())}).remove()},reflow:function(){}}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.clearing={name:"clearing",version:"4.3.2",settings:{templates:{viewing:'<a href="#" class="clearing-close">&times;</a><div class="visible-img" style="display: none"><img src="//:0"><p class="clearing-caption"></p><a href="#" class="clearing-main-prev"><span></span></a><a href="#" class="clearing-main-next"><span></span></a></div>'},close_selectors:".clearing-close",init:!1,locked:!1},init:function(t,n,r){var i=this;return Foundation.inherit(this,"set_data get_data remove_data throttle data_options"),typeof n=="object"&&(r=e.extend(!0,this.settings,n)),typeof n!="string"?(e(this.scope).find("ul[data-clearing]").each(function(){var t=e(this),n=n||{},r=t.find("li"),s=i.get_data(t);!s&&r.length>0&&(n.$parent=t.parent(),i.set_data(t,e.extend({},i.settings,n,i.data_options(t))),i.assemble(t.find("li")),i.settings.init||i.events().swipe_events())}),this.settings.init):this[n].call(this,r)},events:function(){var n=this;return e(this.scope).on("click.fndtn.clearing","ul[data-clearing] li",function(t,r,i){var r=r||e(this),i=i||r,s=r.next("li"),o=n.get_data(r.parent()),u=e(t.target);t.preventDefault(),o||n.init(),i.hasClass("visible")&&r[0]===i[0]&&s.length>0&&n.is_open(r)&&(i=s,u=i.find("img")),n.open(u,r,i),n.update_paddles(i)}).on("click.fndtn.clearing",".clearing-main-next",function(e){this.nav(e,"next")}.bind(this)).on("click.fndtn.clearing",".clearing-main-prev",function(e){this.nav(e,"prev")}.bind(this)).on("click.fndtn.clearing",this.settings.close_selectors,function(e){Foundation.libs.clearing.close(e,this)}).on("keydown.fndtn.clearing",function(e){this.keydown(e)}.bind(this)),e(t).on("resize.fndtn.clearing",function(){this.resize()}.bind(this)),this.settings.init=!0,this},swipe_events:function(){var t=this;e(this.scope).on("touchstart.fndtn.clearing",".visible-img",function(t){t.touches||(t=t.originalEvent);var n={start_page_x:t.touches[0].pageX,start_page_y:t.touches[0].pageY,start_time:(new Date).getTime(),delta_x:0,is_scrolling:r};e(this).data("swipe-transition",n),t.stopPropagation()}).on("touchmove.fndtn.clearing",".visible-img",function(n){n.touches||(n=n.originalEvent);if(n.touches.length>1||n.scale&&n.scale!==1)return;var r=e(this).data("swipe-transition");typeof r=="undefined"&&(r={}),r.delta_x=n.touches[0].pageX-r.start_page_x,typeof r.is_scrolling=="undefined"&&(r.is_scrolling=!!(r.is_scrolling||Math.abs(r.delta_x)<Math.abs(n.touches[0].pageY-r.start_page_y)));if(!r.is_scrolling&&!r.active){n.preventDefault();var i=r.delta_x<0?"next":"prev";r.active=!0,t.nav(n,i)}}).on("touchend.fndtn.clearing",".visible-img",function(t){e(this).data("swipe-transition",{}),t.stopPropagation()})},assemble:function(t){var n=t.parent();n.after('<div id="foundationClearingHolder"></div>');var r=e("#foundationClearingHolder"),i=this.get_data(n),s=n.detach(),o={grid:'<div class="carousel">'+this.outerHTML(s[0])+"</div>",viewing:i.templates.viewing},u='<div class="clearing-assembled"><div>'+o.viewing+o.grid+"</div></div>";return r.after(u).remove()},open:function(e,t,n){var r=n.closest(".clearing-assembled"),i=r.find("div").first(),s=i.find(".visible-img"),o=s.find("img").not(e);this.locked()||(o.attr("src",this.load(e)).css("visibility","hidden"),this.loaded(o,function(){o.css("visibility","visible"),r.addClass("clearing-blackout"),i.addClass("clearing-container"),s.show(),this.fix_height(n).caption(s.find(".clearing-caption"),e).center(o).shift(t,n,function(){n.siblings().removeClass("visible"),n.addClass("visible")})}.bind(this)))},close:function(t,n){t.preventDefault();var r=function(e){return/blackout/.test(e.selector)?e:e.closest(".clearing-blackout")}(e(n)),i,s;return n===t.target&&r&&(i=r.find("div").first(),s=i.find(".visible-img"),this.settings.prev_index=0,r.find("ul[data-clearing]").attr("style","").closest(".clearing-blackout").removeClass("clearing-blackout"),i.removeClass("clearing-container"),s.hide()),!1},is_open:function(e){return e.parent().prop("style").length>0},keydown:function(t){var n=e(".clearing-blackout").find("ul[data-clearing]");t.which===39&&this.go(n,"next"),t.which===37&&this.go(n,"prev"),t.which===27&&e("a.clearing-close").trigger("click")},nav:function(t,n){var r=e(".clearing-blackout").find("ul[data-clearing]");t.preventDefault(),this.go(r,n)},resize:function(){var t=e(".clearing-blackout .visible-img").find("img");t.length&&this.center(t)},fix_height:function(t){var n=t.parent().children(),r=this;return n.each(function(){var t=e(this),n=t.find("img");t.height()>r.outerHeight(n)&&t.addClass("fix-height")}).closest("ul").width(n.length*100+"%"),this},update_paddles:function(e){var t=e.closest(".carousel").siblings(".visible-img");e.next().length>0?t.find(".clearing-main-next").removeClass("disabled"):t.find(".clearing-main-next").addClass("disabled"),e.prev().length>0?t.find(".clearing-main-prev").removeClass("disabled"):t.find(".clearing-main-prev").addClass("disabled")},center:function(e){return this.rtl?e.css({marginRight:-(this.outerWidth(e)/2),marginTop:-(this.outerHeight(e)/2)}):e.css({marginLeft:-(this.outerWidth(e)/2),marginTop:-(this.outerHeight(e)/2)}),this},load:function(e){if(e[0].nodeName==="A")var t=e.attr("href");else var t=e.parent().attr("href");return this.preload(e),t?t:e.attr("src")},preload:function(e){this.img(e.closest("li").next()).img(e.closest("li").prev())},loaded:function(e,t){function n(){t()}function r(){this.one("load",n);if(/MSIE (\d+\.\d+);/.test(navigator.userAgent)){var e=this.attr("src"),t=e.match(/\?/)?"&":"?";t+="random="+(new Date).getTime(),this.attr("src",e+t)}}if(!e.attr("src")){n();return}e[0].complete||e[0].readyState===4?n():r.call(e)},img:function(e){if(e.length){var t=new Image,n=e.find("a");n.length?t.src=n.attr("href"):t.src=e.find("img").attr("src")}return this},caption:function(e,t){var n=t.data("caption");return n?e.html(n).show():e.text("").hide(),this},go:function(e,t){var n=e.find(".visible"),r=n[t]();r.length&&r.find("img").trigger("click",[n,r])},shift:function(e,t,n){var r=t.parent(),i=this.settings.prev_index||t.index(),s=this.direction(r,e,t),o=parseInt(r.css("left"),10),u=this.outerWidth(t),a;t.index()!==i&&!/skip/.test(s)?/left/.test(s)?(this.lock(),r.animate({left:o+u},300,this.unlock())):/right/.test(s)&&(this.lock(),r.animate({left:o-u},300,this.unlock())):/skip/.test(s)&&(a=t.index()-this.settings.up_count,this.lock(),a>0?r.animate({left:-(a*u)},300,this.unlock()):r.animate({left:0},300,this.unlock())),n()},direction:function(t,n,r){var i=t.find("li"),s=this.outerWidth(i)+this.outerWidth(i)/4,o=Math.floor(this.outerWidth(e(".clearing-container"))/s)-1,u=i.index(r),a;return this.settings.up_count=o,this.adjacent(this.settings.prev_index,u)?u>o&&u>this.settings.prev_index?a="right":u>o-1&&u<=this.settings.prev_index?a="left":a=!1:a="skip",this.settings.prev_index=u,a},adjacent:function(e,t){for(var n=t+1;n>=t-1;n--)if(n===e)return!0;return!1},lock:function(){this.settings.locked=!0},unlock:function(){this.settings.locked=!1},locked:function(){return this.settings.locked},outerHTML:function(e){return e.outerHTML||(new XMLSerializer).serializeToString(e)},off:function(){e(this.scope).off(".fndtn.clearing"),e(t).off(".fndtn.clearing"),this.remove_data(),this.settings.init=!1},reflow:function(){this.init()}}}(Foundation.zj,this,this.document),function(e,t,n){function i(e){return e}function s(e){return decodeURIComponent(e.replace(r," "))}var r=/\+/g,o=e.cookie=function(r,u,a){if(u!==n){a=e.extend({},o.defaults,a),u===null&&(a.expires=-1);if(typeof a.expires=="number"){var f=a.expires,l=a.expires=new Date;l.setDate(l.getDate()+f)}return u=o.json?JSON.stringify(u):String(u),t.cookie=[encodeURIComponent(r),"=",o.raw?u:encodeURIComponent(u),a.expires?"; expires="+a.expires.toUTCString():"",a.path?"; path="+a.path:"",a.domain?"; domain="+a.domain:"",a.secure?"; secure":""].join("")}var c=o.raw?i:s,h=t.cookie.split("; ");for(var p=0,d=h.length;p<d;p++){var v=h[p].split("=");if(c(v.shift())===r){var m=c(v.join("="));return o.json?JSON.parse(m):m}}return null};o.defaults={},e.removeCookie=function(t,n){return e.cookie(t)!==null?(e.cookie(t,null,n),!0):!1}}(Foundation.zj,document),function(e,t,n,r){"use strict";var i=i||!1;Foundation.libs.joyride={name:"joyride",version:"4.3.2",defaults:{expose:!1,modal:!1,tipLocation:"bottom",nubPosition:"auto",scrollSpeed:300,timer:0,startTimerOnClick:!0,startOffset:0,nextButton:!0,tipAnimation:"fade",pauseAfter:[],exposed:[],tipAnimationFadeSpeed:300,cookieMonster:!1,cookieName:"joyride",cookieDomain:!1,cookieExpires:365,tipContainer:"body",postRideCallback:function(){},postStepCallback:function(){},preStepCallback:function(){},preRideCallback:function(){},postExposeCallback:function(){},template:{link:'<a href="#close" class="joyride-close-tip">&times;</a>',timer:'<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',tip:'<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',wrapper:'<div class="joyride-content-wrapper"></div>',button:'<a href="#" class="small button joyride-next-tip"></a>',modal:'<div class="joyride-modal-bg"></div>',expose:'<div class="joyride-expose-wrapper"></div>',exposeCover:'<div class="joyride-expose-cover"></div>'},exposeAddClass:""},settings:{},init:function(t,n,r){return this.scope=t||this.scope,Foundation.inherit(this,"throttle data_options scrollTo scrollLeft delay"),typeof n=="object"?e.extend(!0,this.settings,this.defaults,n):e.extend(!0,this.settings,this.defaults,r),typeof n!="string"?(this.settings.init||this.events(),this.settings.init):this[n].call(this,r)},events:function(){var n=this;e(this.scope).on("click.joyride",".joyride-next-tip, .joyride-modal-bg",function(e){e.preventDefault(),this.settings.$li.next().length<1?this.end():this.settings.timer>0?(clearTimeout(this.settings.automate),this.hide(),this.show(),this.startTimer()):(this.hide(),this.show())}.bind(this)).on("click.joyride",".joyride-close-tip",function(e){e.preventDefault(),this.end()}.bind(this)),e(t).on("resize.fndtn.joyride",n.throttle(function(){if(e("[data-joyride]").length>0&&n.settings.$next_tip){if(n.settings.exposed.length>0){var t=e(n.settings.exposed);t.each(function(){var t=e(this);n.un_expose(t),n.expose(t)})}n.is_phone()?n.pos_phone():n.pos_default(!1,!0)}},100)),this.settings.init=!0},start:function(){var t=this,n=e(this.scope).find("[data-joyride]"),r=["timer","scrollSpeed","startOffset","tipAnimationFadeSpeed","cookieExpires"],i=r.length;this.settings.init||this.events(),this.settings.$content_el=n,this.settings.$body=e(this.settings.tipContainer),this.settings.body_offset=e(this.settings.tipContainer).position(),this.settings.$tip_content=this.settings.$content_el.find("> li"),this.settings.paused=!1,this.settings.attempts=0,this.settings.tipLocationPatterns={top:["bottom"],bottom:[],left:["right","top","bottom"],right:["left","top","bottom"]},typeof e.cookie!="function"&&(this.settings.cookieMonster=!1);if(!this.settings.cookieMonster||this.settings.cookieMonster&&e.cookie(this.settings.cookieName)===null)this.settings.$tip_content.each(function(n){var s=e(this);e.extend(!0,t.settings,t.data_options(s));for(var o=i-1;o>=0;o--)t.settings[r[o]]=parseInt(t.settings[r[o]],10);t.create({$li:s,index:n})}),!this.settings.startTimerOnClick&&this.settings.timer>0?(this.show("init"),this.startTimer()):this.show("init")},resume:function(){this.set_li(),this.show()},tip_template:function(t){var n,r;return t.tip_class=t.tip_class||"",n=e(this.settings.template.tip).addClass(t.tip_class),r=e.trim(e(t.li).html())+this.button_text(t.button_text)+this.settings.template.link+this.timer_instance(t.index),n.append(e(this.settings.template.wrapper)),n.first().attr("data-index",t.index),e(".joyride-content-wrapper",n).append(r),n[0]},timer_instance:function(t){var n;return t===0&&this.settings.startTimerOnClick&&this.settings.timer>0||this.settings.timer===0?n="":n=this.outerHTML(e(this.settings.template.timer)[0]),n},button_text:function(t){return this.settings.nextButton?(t=e.trim(t)||"Next",t=this.outerHTML(e(this.settings.template.button).append(t)[0])):t="",t},create:function(t){var n=t.$li.attr("data-button")||t.$li.attr("data-text"),r=t.$li.attr("class"),i=e(this.tip_template({tip_class:r,index:t.index,button_text:n,li:t.$li}));e(this.settings.tipContainer).append(i)},show:function(t){var n=null;this.settings.$li===r||e.inArray(this.settings.$li.index(),this.settings.pauseAfter)===-1?(this.settings.paused?this.settings.paused=!1:this.set_li(t),this.settings.attempts=0,this.settings.$li.length&&this.settings.$target.length>0?(t&&(this.settings.preRideCallback(this.settings.$li.index(),this.settings.$next_tip),this.settings.modal&&this.show_modal()),this.settings.preStepCallback(this.settings.$li.index(),this.settings.$next_tip),this.settings.modal&&this.settings.expose&&this.expose(),this.settings.tipSettings=e.extend(this.settings,this.data_options(this.settings.$li)),this.settings.timer=parseInt(this.settings.timer,10),this.settings.tipSettings.tipLocationPattern=this.settings.tipLocationPatterns[this.settings.tipSettings.tipLocation],/body/i.test(this.settings.$target.selector)||this.scroll_to(),this.is_phone()?this.pos_phone(!0):this.pos_default(!0),n=this.settings.$next_tip.find(".joyride-timer-indicator"),/pop/i.test(this.settings.tipAnimation)?(n.width(0),this.settings.timer>0?(this.settings.$next_tip.show(),this.delay(function(){n.animate({width:n.parent().width()},this.settings.timer,"linear")}.bind(this),this.settings.tipAnimationFadeSpeed)):this.settings.$next_tip.show()):/fade/i.test(this.settings.tipAnimation)&&(n.width(0),this.settings.timer>0?(this.settings.$next_tip.fadeIn(this.settings.tipAnimationFadeSpeed).show(),this.delay(function(){n.animate({width:n.parent().width()},this.settings.timer,"linear")}.bind(this),this.settings.tipAnimationFadeSpeed)):this.settings.$next_tip.fadeIn(this.settings.tipAnimationFadeSpeed)),this.settings.$current_tip=this.settings.$next_tip):this.settings.$li&&this.settings.$target.length<1?this.show():this.end()):this.settings.paused=!0},is_phone:function(){return i?i.mq("only screen and (max-width: 767px)")||e(".lt-ie9").length>0:e(t).width()<767},hide:function(){this.settings.modal&&this.settings.expose&&this.un_expose(),this.settings.modal||e(".joyride-modal-bg").hide(),this.settings.$current_tip.css("visibility","hidden"),setTimeout(e.proxy(function(){this.hide(),this.css("visibility","visible")},this.settings.$current_tip),0),this.settings.postStepCallback(this.settings.$li.index(),this.settings.$current_tip)},set_li:function(e){e?(this.settings.$li=this.settings.$tip_content.eq(this.settings.startOffset),this.set_next_tip(),this.settings.$current_tip=this.settings.$next_tip):(this.settings.$li=this.settings.$li.next(),this.set_next_tip()),this.set_target()},set_next_tip:function(){this.settings.$next_tip=e(".joyride-tip-guide[data-index='"+this.settings.$li.index()+"']"),this.settings.$next_tip.data("closed","")},set_target:function(){var t=this.settings.$li.attr("data-class"),r=this.settings.$li.attr("data-id"),i=function(){return r?e(n.getElementById(r)):t?e("."+t).first():e("body")};this.settings.$target=i()},scroll_to:function(){var n,r;n=e(t).height()/2,r=Math.ceil(this.settings.$target.offset().top-n+this.outerHeight(this.settings.$next_tip)),r>0&&this.scrollTo(e("html, body"),r,this.settings.scrollSpeed)},paused:function(){return e.inArray(this.settings.$li.index()+1,this.settings.pauseAfter)===-1},restart:function(){this.hide(),this.settings.$li=r,this.show("init")},pos_default:function(n,r){var i=Math.ceil(e(t).height()/2),s=this.settings.$next_tip.offset(),o=this.settings.$next_tip.find(".joyride-nub"),u=Math.ceil(this.outerWidth(o)/2),a=Math.ceil(this.outerHeight(o)/2),f=n||!1;f&&(this.settings.$next_tip.css("visibility","hidden"),this.settings.$next_tip.show()),typeof r=="undefined"&&(r=!1);if(!/body/i.test(this.settings.$target.selector)){if(this.bottom()){var l=this.settings.$target.offset().left;Foundation.rtl&&(l=this.settings.$target.offset().width-this.settings.$next_tip.width()+l),this.settings.$next_tip.css({top:this.settings.$target.offset().top+a+this.outerHeight(this.settings.$target),left:l}),this.nub_position(o,this.settings.tipSettings.nubPosition,"top")}else if(this.top()){var l=this.settings.$target.offset().left;Foundation.rtl&&(l=this.settings.$target.offset().width-this.settings.$next_tip.width()+l),this.settings.$next_tip.css({top:this.settings.$target.offset().top-this.outerHeight(this.settings.$next_tip)-a,left:l}),this.nub_position(o,this.settings.tipSettings.nubPosition,"bottom")}else this.right()?(this.settings.$next_tip.css({top:this.settings.$target.offset().top,left:this.outerWidth(this.settings.$target)+this.settings.$target.offset().left+u}),this.nub_position(o,this.settings.tipSettings.nubPosition,"left")):this.left()&&(this.settings.$next_tip.css({top:this.settings.$target.offset().top,left:this.settings.$target.offset().left-this.outerWidth(this.settings.$next_tip)-u}),this.nub_position(o,this.settings.tipSettings.nubPosition,"right"));!this.visible(this.corners(this.settings.$next_tip))&&this.settings.attempts<this.settings.tipSettings.tipLocationPattern.length&&(o.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"),this.settings.tipSettings.tipLocation=this.settings.tipSettings.tipLocationPattern[this.settings.attempts],this.settings.attempts++,this.pos_default())}else this.settings.$li.length&&this.pos_modal(o);f&&(this.settings.$next_tip.hide(),this.settings.$next_tip.css("visibility","visible"))},pos_phone:function(t){var n=this.outerHeight(this.settings.$next_tip),r=this.settings.$next_tip.offset(),i=this.outerHeight(this.settings.$target),s=e(".joyride-nub",this.settings.$next_tip),o=Math.ceil(this.outerHeight(s)/2),u=t||!1;s.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"),u&&(this.settings.$next_tip.css("visibility","hidden"),this.settings.$next_tip.show()),/body/i.test(this.settings.$target.selector)?this.settings.$li.length&&this.pos_modal(s):this.top()?(this.settings.$next_tip.offset({top:this.settings.$target.offset().top-n-o}),s.addClass("bottom")):(this.settings.$next_tip.offset({top:this.settings.$target.offset().top+i+o}),s.addClass("top")),u&&(this.settings.$next_tip.hide(),this.settings.$next_tip.css("visibility","visible"))},pos_modal:function(e){this.center(),e.hide(),this.show_modal()},show_modal:function(){if(!this.settings.$next_tip.data("closed")){var t=e(".joyride-modal-bg");t.length<1&&e("body").append(this.settings.template.modal).show(),/pop/i.test(this.settings.tipAnimation)?t.show():t.fadeIn(this.settings.tipAnimationFadeSpeed)}},expose:function(){var n,r,i,s,o,u="expose-"+Math.floor(Math.random()*1e4);if(arguments.length>0&&arguments[0]instanceof e)i=arguments[0];else{if(!this.settings.$target||!!/body/i.test(this.settings.$target.selector))return!1;i=this.settings.$target}if(i.length<1)return t.console&&console.error("element not valid",i),!1;n=e(this.settings.template.expose),this.settings.$body.append(n),n.css({top:i.offset().top,left:i.offset().left,width:this.outerWidth(i,!0),height:this.outerHeight(i,!0)}),r=e(this.settings.template.exposeCover),s={zIndex:i.css("z-index"),position:i.css("position")},o=i.attr("class")==null?"":i.attr("class"),i.css("z-index",parseInt(n.css("z-index"))+1),s.position=="static"&&i.css("position","relative"),i.data("expose-css",s),i.data("orig-class",o),i.attr("class",o+" "+this.settings.exposeAddClass),r.css({top:i.offset().top,left:i.offset().left,width:this.outerWidth(i,!0),height:this.outerHeight(i,!0)}),this.settings.$body.append(r),n.addClass(u),r.addClass(u),i.data("expose",u),this.settings.postExposeCallback(this.settings.$li.index(),this.settings.$next_tip,i),this.add_exposed(i)},un_expose:function(){var n,r,i,s,o,u=!1;if(arguments.length>0&&arguments[0]instanceof e)r=arguments[0];else{if(!this.settings.$target||!!/body/i.test(this.settings.$target.selector))return!1;r=this.settings.$target}if(r.length<1)return t.console&&console.error("element not valid",r),!1;n=r.data("expose"),i=e("."+n),arguments.length>1&&(u=arguments[1]),u===!0?e(".joyride-expose-wrapper,.joyride-expose-cover").remove():i.remove(),s=r.data("expose-css"),s.zIndex=="auto"?r.css("z-index",""):r.css("z-index",s.zIndex),s.position!=r.css("position")&&(s.position=="static"?r.css("position",""):r.css("position",s.position)),o=r.data("orig-class"),r.attr("class",o),r.removeData("orig-classes"),r.removeData("expose"),r.removeData("expose-z-index"),this.remove_exposed(r)},add_exposed:function(t){this.settings.exposed=this.settings.exposed||[],t instanceof e||typeof t=="object"?this.settings.exposed.push(t[0]):typeof t=="string"&&this.settings.exposed.push(t)},remove_exposed:function(t){var n,r;t instanceof e?n=t[0]:typeof t=="string"&&(n=t),this.settings.exposed=this.settings.exposed||[],r=this.settings.exposed.length;for(var i=0;i<r;i++)if(this.settings.exposed[i]==n){this.settings.exposed.splice(i,1);return}},center:function(){var n=e(t);return this.settings.$next_tip.css({top:(n.height()-this.outerHeight(this.settings.$next_tip))/2+n.scrollTop(),left:(n.width()-this.outerWidth(this.settings.$next_tip))/2+this.scrollLeft(n)}),!0},bottom:function(){return/bottom/i.test(this.settings.tipSettings.tipLocation)},top:function(){return/top/i.test(this.settings.tipSettings.tipLocation)},right:function(){return/right/i.test(this.settings.tipSettings.tipLocation)},left:function(){return/left/i.test(this.settings.tipSettings.tipLocation)},corners:function(n){var r=e(t),i=r.height()/2,s=Math.ceil(this.settings.$target.offset().top-i+this.settings.$next_tip.outerHeight()),o=r.width()+this.scrollLeft(r),u=r.height()+s,a=r.height()+r.scrollTop(),f=r.scrollTop();return s<f&&(s<0?f=0:f=
s),u>a&&(a=u),[n.offset().top<f,o<n.offset().left+n.outerWidth(),a<n.offset().top+n.outerHeight(),this.scrollLeft(r)>n.offset().left]},visible:function(e){var t=e.length;while(t--)if(e[t])return!1;return!0},nub_position:function(e,t,n){t==="auto"?e.addClass(n):e.addClass(t)},startTimer:function(){this.settings.$li.length?this.settings.automate=setTimeout(function(){this.hide(),this.show(),this.startTimer()}.bind(this),this.settings.timer):clearTimeout(this.settings.automate)},end:function(){this.settings.cookieMonster&&e.cookie(this.settings.cookieName,"ridden",{expires:this.settings.cookieExpires,domain:this.settings.cookieDomain}),this.settings.timer>0&&clearTimeout(this.settings.automate),this.settings.modal&&this.settings.expose&&this.un_expose(),this.settings.$next_tip.data("closed",!0),e(".joyride-modal-bg").hide(),this.settings.$current_tip.hide(),this.settings.postStepCallback(this.settings.$li.index(),this.settings.$current_tip),this.settings.postRideCallback(this.settings.$li.index(),this.settings.$current_tip),e(".joyride-tip-guide").remove()},outerHTML:function(e){return e.outerHTML||(new XMLSerializer).serializeToString(e)},off:function(){e(this.scope).off(".joyride"),e(t).off(".joyride"),e(".joyride-close-tip, .joyride-next-tip, .joyride-modal-bg").off(".joyride"),e(".joyride-tip-guide, .joyride-modal-bg").remove(),clearTimeout(this.settings.automate),this.settings={}},reflow:function(){}}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";var i=function(){},s=function(i,s){if(i.hasClass(s.slides_container_class))return this;var f=this,l,c=i,h,p,d,v=0,m,g,y=!1,b=!1;c.children().first().addClass(s.active_slide_class),f.update_slide_number=function(t){s.slide_number&&(h.find("span:first").text(parseInt(t)+1),h.find("span:last").text(c.children().length)),s.bullets&&(p.children().removeClass(s.bullets_active_class),e(p.children().get(t)).addClass(s.bullets_active_class))},f.update_active_link=function(t){var n=e('a[data-orbit-link="'+c.children().eq(t).attr("data-orbit-slide")+'"]');n.parents("ul").find("[data-orbit-link]").removeClass(s.bullets_active_class),n.addClass(s.bullets_active_class)},f.build_markup=function(){c.wrap('<div class="'+s.container_class+'"></div>'),l=c.parent(),c.addClass(s.slides_container_class),s.navigation_arrows&&(l.append(e('<a href="#"><span></span></a>').addClass(s.prev_class)),l.append(e('<a href="#"><span></span></a>').addClass(s.next_class))),s.timer&&(d=e("<div>").addClass(s.timer_container_class),d.append("<span>"),d.append(e("<div>").addClass(s.timer_progress_class)),d.addClass(s.timer_paused_class),l.append(d)),s.slide_number&&(h=e("<div>").addClass(s.slide_number_class),h.append("<span></span> "+s.slide_number_text+" <span></span>"),l.append(h)),s.bullets&&(p=e("<ol>").addClass(s.bullets_container_class),l.append(p),c.children().each(function(t,n){var r=e("<li>").attr("data-orbit-slide",t);p.append(r)})),s.stack_on_small&&l.addClass(s.stack_on_small_class),f.update_slide_number(0),f.update_active_link(0)},f._goto=function(t,n){if(t===v)return!1;typeof g=="object"&&g.restart();var r=c.children(),i="next";y=!0,t<v&&(i="prev"),t>=r.length?t=0:t<0&&(t=r.length-1);var o=e(r.get(v)),u=e(r.get(t));o.css("zIndex",2),o.removeClass(s.active_slide_class),u.css("zIndex",4).addClass(s.active_slide_class),c.trigger("orbit:before-slide-change"),s.before_slide_change(),f.update_active_link(t);var a=function(){var e=function(){v=t,y=!1,n===!0&&(g=f.create_timer(),g.start()),f.update_slide_number(v),c.trigger("orbit:after-slide-change",[{slide_number:v,total_slides:r.length}]),s.after_slide_change(v,r.length)};c.height()!=u.height()&&s.variable_height?c.animate({height:u.height()},250,"linear",e):e()};if(r.length===1)return a(),!1;var l=function(){i==="next"&&m.next(o,u,a),i==="prev"&&m.prev(o,u,a)};u.height()>c.height()&&s.variable_height?c.animate({height:u.height()},250,"linear",l):l()},f.next=function(e){e.stopImmediatePropagation(),e.preventDefault(),f._goto(v+1)},f.prev=function(e){e.stopImmediatePropagation(),e.preventDefault(),f._goto(v-1)},f.link_custom=function(t){t.preventDefault();var n=e(this).attr("data-orbit-link");if(typeof n=="string"&&(n=e.trim(n))!=""){var r=l.find("[data-orbit-slide="+n+"]");r.index()!=-1&&f._goto(r.index())}},f.link_bullet=function(t){var n=e(this).attr("data-orbit-slide");typeof n=="string"&&(n=e.trim(n))!=""&&f._goto(parseInt(n))},f.timer_callback=function(){f._goto(v+1,!0)},f.compute_dimensions=function(){var t=e(c.children().get(v)),n=t.height();s.variable_height||c.children().each(function(){e(this).height()>n&&(n=e(this).height())}),c.height(n)},f.create_timer=function(){var e=new o(l.find("."+s.timer_container_class),s,f.timer_callback);return e},f.stop_timer=function(){typeof g=="object"&&g.stop()},f.toggle_timer=function(){var e=l.find("."+s.timer_container_class);e.hasClass(s.timer_paused_class)?(typeof g=="undefined"&&(g=f.create_timer()),g.start()):typeof g=="object"&&g.stop()},f.init=function(){f.build_markup(),s.timer&&(g=f.create_timer(),g.start()),m=new a(s,c),s.animation==="slide"&&(m=new u(s,c)),l.on("click","."+s.next_class,f.next),l.on("click","."+s.prev_class,f.prev),l.on("click","[data-orbit-slide]",f.link_bullet),l.on("click",f.toggle_timer),s.swipe&&l.on("touchstart.fndtn.orbit",function(e){e.touches||(e=e.originalEvent);var t={start_page_x:e.touches[0].pageX,start_page_y:e.touches[0].pageY,start_time:(new Date).getTime(),delta_x:0,is_scrolling:r};l.data("swipe-transition",t),e.stopPropagation()}).on("touchmove.fndtn.orbit",function(e){e.touches||(e=e.originalEvent);if(e.touches.length>1||e.scale&&e.scale!==1)return;var t=l.data("swipe-transition");typeof t=="undefined"&&(t={}),t.delta_x=e.touches[0].pageX-t.start_page_x,typeof t.is_scrolling=="undefined"&&(t.is_scrolling=!!(t.is_scrolling||Math.abs(t.delta_x)<Math.abs(e.touches[0].pageY-t.start_page_y)));if(!t.is_scrolling&&!t.active){e.preventDefault();var n=t.delta_x<0?v+1:v-1;t.active=!0,f._goto(n)}}).on("touchend.fndtn.orbit",function(e){l.data("swipe-transition",{}),e.stopPropagation()}),l.on("mouseenter.fndtn.orbit",function(e){s.timer&&s.pause_on_hover&&f.stop_timer()}).on("mouseleave.fndtn.orbit",function(e){s.timer&&s.resume_on_mouseout&&g.start()}),e(n).on("click","[data-orbit-link]",f.link_custom),e(t).on("resize",f.compute_dimensions),e(t).on("load",f.compute_dimensions),e(t).on("load",function(){l.prev(".preloader").css("display","none")}),c.trigger("orbit:ready")},f.init()},o=function(e,t,n){var r=this,i=t.timer_speed,s=e.find("."+t.timer_progress_class),o,u,a=-1;this.update_progress=function(e){var t=s.clone();t.attr("style",""),t.css("width",e+"%"),s.replaceWith(t),s=t},this.restart=function(){clearTimeout(u),e.addClass(t.timer_paused_class),a=-1,r.update_progress(0)},this.start=function(){if(!e.hasClass(t.timer_paused_class))return!0;a=a===-1?i:a,e.removeClass(t.timer_paused_class),o=(new Date).getTime(),s.animate({width:"100%"},a,"linear"),u=setTimeout(function(){r.restart(),n()},a),e.trigger("orbit:timer-started")},this.stop=function(){if(e.hasClass(t.timer_paused_class))return!0;clearTimeout(u),e.addClass(t.timer_paused_class);var n=(new Date).getTime();a-=n-o;var s=100-a/i*100;r.update_progress(s),e.trigger("orbit:timer-stopped")}},u=function(t,n){var r=t.animation_speed,i=e("html[dir=rtl]").length===1,s=i?"marginRight":"marginLeft",o={};o[s]="0%",this.next=function(e,t,n){t.animate(o,r,"linear",function(){e.css(s,"100%"),n()})},this.prev=function(e,t,n){t.css(s,"-100%"),t.animate(o,r,"linear",function(){e.css(s,"100%"),n()})}},a=function(t,n){var r=t.animation_speed,i=e("html[dir=rtl]").length===1,s=i?"marginRight":"marginLeft";this.next=function(e,t,n){t.css({margin:"0%",opacity:"0.01"}),t.animate({opacity:"1"},r,"linear",function(){e.css("margin","100%"),n()})},this.prev=function(e,t,n){t.css({margin:"0%",opacity:"0.01"}),t.animate({opacity:"1"},r,"linear",function(){e.css("margin","100%"),n()})}};Foundation.libs=Foundation.libs||{},Foundation.libs.orbit={name:"orbit",version:"4.3.2",settings:{animation:"slide",timer_speed:1e4,pause_on_hover:!0,resume_on_mouseout:!1,animation_speed:500,stack_on_small:!1,navigation_arrows:!0,slide_number:!0,slide_number_text:"of",container_class:"orbit-container",stack_on_small_class:"orbit-stack-on-small",next_class:"orbit-next",prev_class:"orbit-prev",timer_container_class:"orbit-timer",timer_paused_class:"paused",timer_progress_class:"orbit-progress",slides_container_class:"orbit-slides-container",bullets_container_class:"orbit-bullets",bullets_active_class:"active",slide_number_class:"orbit-slide-number",caption_class:"orbit-caption",active_slide_class:"active",orbit_transition_class:"orbit-transitioning",bullets:!0,timer:!0,variable_height:!1,swipe:!0,before_slide_change:i,after_slide_change:i},init:function(t,n,r){var i=this;Foundation.inherit(i,"data_options"),typeof n=="object"&&e.extend(!0,i.settings,n);if(e(t).is("[data-orbit]")){var o=e(t),u=i.data_options(o);new s(o,e.extend({},i.settings,u))}e("[data-orbit]",t).each(function(t,n){var r=e(n),o=i.data_options(r);new s(r,e.extend({},i.settings,o))})}}}(Foundation.zj,this,this.document),function(e,t,n){"use strict";Foundation.libs.section={name:"section",version:"4.3.2",settings:{deep_linking:!1,small_breakpoint:768,one_up:!0,multi_expand:!1,section_selector:"[data-section]",region_selector:"section, .section, [data-section-region]",title_selector:".title, [data-section-title]",resized_data_attr:"data-section-resized",small_style_data_attr:"data-section-small-style",content_selector:".content, [data-section-content]",nav_selector:'[data-section="vertical-nav"], [data-section="horizontal-nav"]',active_class:"active",callback:function(){}},init:function(t,n,r){var i=this;return Foundation.inherit(this,"throttle data_options position_right offset_right"),typeof n=="object"&&e.extend(!0,i.settings,n),typeof n!="string"?(this.events(),!0):this[n].call(this,r)},events:function(){var r=this,i=[],s=r.settings.section_selector,o=r.settings.region_selector.split(","),u=r.settings.title_selector.split(",");for(var a=0,f=o.length;a<f;a++){var l=o[a];for(var c=0,h=u.length;c<h;c++){var p=s+">"+l+">"+u[c];i.push(p+" a"),i.push(p)}}e(r.scope).on("click.fndtn.section",i.join(","),function(t){var n=e(this).closest(r.settings.title_selector);r.close_navs(n),n.siblings(r.settings.content_selector).length>0&&r.toggle_active.call(n[0],t)}),e(t).on("resize.fndtn.section",r.throttle(function(){r.resize()},30)).on("hashchange.fndtn.section",r.set_active_from_hash),e(n).on("click.fndtn.section",function(t){if(t.isPropagationStopped&&t.isPropagationStopped())return;if(t.target===n)return;r.close_navs(e(t.target).closest(r.settings.title_selector))}),e(t).triggerHandler("resize.fndtn.section"),e(t).triggerHandler("hashchange.fndtn.section")},close_navs:function(t){var n=Foundation.libs.section,r=e(n.settings.nav_selector).filter(function(){return!e.extend({},n.settings,n.data_options(e(this))).one_up});if(t.length>0){var i=t.parent().parent();if(n.is_horizontal_nav(i)||n.is_vertical_nav(i))r=r.filter(function(){return this!==i[0]})}r.children(n.settings.region_selector).removeClass(n.settings.active_class)},toggle_active:function(t){var n=e(this),r=Foundation.libs.section,i=n.parent(),s=n.siblings(r.settings.content_selector),o=i.parent(),u=e.extend({},r.settings,r.data_options(o)),a=o.children(r.settings.region_selector).filter("."+r.settings.active_class);!u.deep_linking&&s.length>0&&t.preventDefault(),t.stopPropagation();if(!i.hasClass(r.settings.active_class)){if(!r.is_accordion(o)||r.is_accordion(o)&&!r.settings.multi_expand)a.removeClass(r.settings.active_class),a.trigger("closed.fndtn.section");i.addClass(r.settings.active_class),r.resize(i.find(r.settings.section_selector).not("["+r.settings.resized_data_attr+"]"),!0),i.trigger("opened.fndtn.section")}else if(i.hasClass(r.settings.active_class)&&r.is_accordion(o)||!u.one_up&&(r.small(o)||r.is_vertical_nav(o)||r.is_horizontal_nav(o)||r.is_accordion(o)))i.removeClass(r.settings.active_class),i.trigger("closed.fndtn.section");u.callback(o)},check_resize_timer:null,resize:function(t,n){var r=Foundation.libs.section,i=e(r.settings.section_selector),s=r.small(i),o=function(e,t){return!r.is_accordion(e)&&!e.is("["+r.settings.resized_data_attr+"]")&&(!s||r.is_horizontal_tabs(e))&&t===(e.css("display")==="none"||!e.parent().is(":visible"))};t=t||e(r.settings.section_selector),clearTimeout(r.check_resize_timer),s||t.removeAttr(r.settings.small_style_data_attr),t.filter(function(){return o(e(this),!1)}).each(function(){var t=e(this),i=t.children(r.settings.region_selector),s=i.children(r.settings.title_selector),o=i.children(r.settings.content_selector),u=0;if(n&&t.children(r.settings.region_selector).filter("."+r.settings.active_class).length==0){var a=e.extend({},r.settings,r.data_options(t));!a.deep_linking&&(a.one_up||!r.is_horizontal_nav(t)&&!r.is_vertical_nav(t)&&!r.is_accordion(t))&&i.filter(":visible").first().addClass(r.settings.active_class)}if(r.is_horizontal_tabs(t)||r.is_auto(t)){var f=0;s.each(function(){var t=e(this);if(t.is(":visible")){t.css(r.rtl?"right":"left",f);var n=parseInt(t.css("border-"+(r.rtl?"left":"right")+"-width"),10);n.toString()==="Nan"&&(n=0),f+=r.outerWidth(t)-n,u=Math.max(u,r.outerHeight(t))}}),s.css("height",u),i.each(function(){var t=e(this),n=t.children(r.settings.content_selector),i=parseInt(n.css("border-top-width"),10);i.toString()==="Nan"&&(i=0),t.css("padding-top",u-i)}),t.css("min-height",u)}else if(r.is_horizontal_nav(t)){var l=!0;s.each(function(){u=Math.max(u,r.outerHeight(e(this)))}),i.each(function(){var n=e(this);n.css("margin-left","-"+(l?t:n.children(r.settings.title_selector)).css("border-left-width")),l=!1}),i.css("margin-top","-"+t.css("border-top-width")),s.css("height",u),o.css("top",u),t.css("min-height",u)}else if(r.is_vertical_tabs(t)){var c=0;s.each(function(){var t=e(this);if(t.is(":visible")){t.css("top",c);var n=parseInt(t.css("border-top-width"),10);n.toString()==="Nan"&&(n=0),c+=r.outerHeight(t)-n}}),o.css("min-height",c+1)}else if(r.is_vertical_nav(t)){var h=0,p=!0;s.each(function(){h=Math.max(h,r.outerWidth(e(this)))}),i.each(function(){var n=e(this);n.css("margin-top","-"+(p?t:n.children(r.settings.title_selector)).css("border-top-width")),p=!1}),s.css("width",h),o.css(r.rtl?"right":"left",h),t.css("width",h)}t.attr(r.settings.resized_data_attr,!0)}),e(r.settings.section_selector).filter(function(){return o(e(this),!0)}).length>0&&(r.check_resize_timer=setTimeout(function(){r.resize(t.filter(function(){return o(e(this),!1)}),!0)},700)),s&&t.attr(r.settings.small_style_data_attr,!0)},is_vertical_nav:function(e){return/vertical-nav/i.test(e.data("section"))},is_horizontal_nav:function(e){return/horizontal-nav/i.test(e.data("section"))},is_accordion:function(e){return/accordion/i.test(e.data("section"))},is_horizontal_tabs:function(e){return/^tabs$/i.test(e.data("section"))},is_vertical_tabs:function(e){return/vertical-tabs/i.test(e.data("section"))},is_auto:function(e){var t=e.data("section");return t===""||/auto/i.test(t)},set_active_from_hash:function(){var n=Foundation.libs.section,r=t.location.hash.substring(1),i=e(n.settings.section_selector),s;i.each(function(){var t=e(this),i=t.children(n.settings.region_selector);i.each(function(){var i=e(this),o=i.children(n.settings.content_selector).data("slug");if((new RegExp(o,"i")).test(r))return s=t,!1});if(s!=null)return!1}),s!=null&&i.each(function(){if(s==e(this)){var t=e(this),i=e.extend({},n.settings,n.data_options(t)),o=t.children(n.settings.region_selector),u=i.deep_linking&&r.length>0,a=!1;o.each(function(){var t=e(this);if(a)t.removeClass(n.settings.active_class);else if(u){var i=t.children(n.settings.content_selector).data("slug");i&&(new RegExp(i,"i")).test(r)?(t.hasClass(n.settings.active_class)||t.addClass(n.settings.active_class),a=!0):t.removeClass(n.settings.active_class)}else t.hasClass(n.settings.active_class)&&(a=!0)}),!a&&(i.one_up||!n.is_horizontal_nav(t)&&!n.is_vertical_nav(t)&&!n.is_accordion(t))&&o.filter(":visible").first().addClass(n.settings.active_class)}})},reflow:function(){var t=Foundation.libs.section;e(t.settings.section_selector).removeAttr(t.settings.resized_data_attr),t.throttle(function(){t.resize()},30)()},small:function(t){var n=e.extend({},this.settings,this.data_options(t));return this.is_horizontal_tabs(t)?!1:t&&this.is_accordion(t)?!0:e("html").hasClass("lt-ie9")?!0:e("html").hasClass("ie8compat")?!0:e(this.scope).width()<n.small_breakpoint},off:function(){e(this.scope).off(".fndtn.section"),e(t).off(".fndtn.section"),e(n).off(".fndtn.section")}},e.fn.reflow_section=function(e){var t=this,n=Foundation.libs.section;return t.removeAttr(n.settings.resized_data_attr),n.throttle(function(){n.resize(t,e)},30)(),this}}(Foundation.zj,window,document),function(e,t,n,r){"use strict";Foundation.libs.topbar={name:"topbar",version:"4.3.2",settings:{index:0,stickyClass:"sticky",custom_back_text:!0,back_text:"Back",is_hover:!0,mobile_show_parent_link:!1,scrolltop:!0,init:!1},init:function(n,r,i){Foundation.inherit(this,"data_options addCustomRule");var s=this;return typeof r=="object"?e.extend(!0,this.settings,r):typeof i!="undefined"&&e.extend(!0,this.settings,i),typeof r!="string"?(e(".top-bar, [data-topbar]").each(function(){e.extend(!0,s.settings,s.data_options(e(this))),s.settings.$w=e(t),s.settings.$topbar=e(this),s.settings.$section=s.settings.$topbar.find("section"),s.settings.$titlebar=s.settings.$topbar.children("ul").first(),s.settings.$topbar.data("index",0);var n=s.settings.$topbar.parent();n.hasClass("fixed")||n.hasClass(s.settings.stickyClass)?(s.settings.$topbar.data("height",s.outerHeight(n)),s.settings.$topbar.data("stickyoffset",n.offset().top)):s.settings.$topbar.data("height",s.outerHeight(s.settings.$topbar));var r=e("<div class='top-bar-js-breakpoint'/>").insertAfter(s.settings.$topbar);s.settings.breakPoint=r.width(),r.remove(),s.assemble(),s.settings.is_hover&&s.settings.$topbar.find(".has-dropdown").addClass("not-click"),s.addCustomRule(".f-topbar-fixed { padding-top: "+s.settings.$topbar.data("height")+"px }"),s.settings.$topbar.parent().hasClass("fixed")&&e("body").addClass("f-topbar-fixed")}),s.settings.init||this.events(),this.settings.init):this[r].call(this,i)},toggle:function(){var n=this,r=e(".top-bar, [data-topbar]"),i=r.find("section, .section");n.breakpoint()&&(n.rtl?(i.css({right:"0%"}),i.find(">.name").css({right:"100%"})):(i.css({left:"0%"}),i.find(">.name").css({left:"100%"})),i.find("li.moved").removeClass("moved"),r.data("index",0),r.toggleClass("expanded").css("height","")),n.settings.scrolltop?r.hasClass("expanded")?r.parent().hasClass("fixed")&&(n.settings.scrolltop?(r.parent().removeClass("fixed"),r.addClass("fixed"),e("body").removeClass("f-topbar-fixed"),t.scrollTo(0,0)):r.parent().removeClass("expanded")):r.hasClass("fixed")&&(r.parent().addClass("fixed"),r.removeClass("fixed"),e("body").addClass("f-topbar-fixed")):(r.parent().hasClass(n.settings.stickyClass)&&r.parent().addClass("fixed"),r.parent().hasClass("fixed")&&(r.hasClass("expanded")?(r.addClass("fixed"),r.parent().addClass("expanded")):(r.removeClass("fixed"),r.parent().removeClass("expanded"),n.updateStickyPositioning())))},timer:null,events:function(){var r=this;e(this.scope).off(".fndtn.topbar").on("click.fndtn.topbar",".top-bar .toggle-topbar, [data-topbar] .toggle-topbar",function(e){e.preventDefault(),r.toggle()}).on("click.fndtn.topbar",".top-bar li.has-dropdown",function(t){var n=e(this),i=e(t.target),s=n.closest("[data-topbar], .top-bar"),o=s.data("topbar");if(i.data("revealId")){r.toggle();return}if(r.breakpoint())return;if(r.settings.is_hover&&!Modernizr.touch)return;t.stopImmediatePropagation(),i[0].nodeName==="A"&&i.parent().hasClass("has-dropdown")&&t.preventDefault(),n.hasClass("hover")?(n.removeClass("hover").find("li").removeClass("hover"),n.parents("li.hover").removeClass("hover")):n.addClass("hover")}).on("click.fndtn.topbar",".top-bar .has-dropdown>a, [data-topbar] .has-dropdown>a",function(n){if(r.breakpoint()&&e(t).width()!=r.settings.breakPoint){n.preventDefault();var i=e(this),s=i.closest(".top-bar, [data-topbar]"),o=s.find("section, .section"),u=i.next(".dropdown").outerHeight(),a=i.closest("li");s.data("index",s.data("index")+1),a.addClass("moved"),r.rtl?(o.css({right:-(100*s.data("index"))+"%"}),o.find(">.name").css({right:100*s.data("index")+"%"})):(o.css({left:-(100*s.data("index"))+"%"}),o.find(">.name").css({left:100*s.data("index")+"%"})),s.css("height",r.outerHeight(i.siblings("ul"),!0)+r.settings.$topbar.data("height"))}}),e(t).on("resize.fndtn.topbar",function(){if(typeof r.settings.$topbar=="undefined")return;var t=r.settings.$topbar.parent("."+this.settings.stickyClass),i;if(!r.breakpoint()){var s=r.settings.$topbar.hasClass("expanded");e(".top-bar, [data-topbar]").css("height","").removeClass("expanded").find("li").removeClass("hover"),s&&r.toggle()}t.length>0&&(t.hasClass("fixed")?(t.removeClass("fixed"),i=t.offset().top,e(n.body).hasClass("f-topbar-fixed")&&(i-=r.settings.$topbar.data("height")),r.settings.$topbar.data("stickyoffset",i),t.addClass("fixed")):(i=t.offset().top,r.settings.$topbar.data("stickyoffset",i)))}.bind(this)),e("body").on("click.fndtn.topbar",function(t){var n=e(t.target).closest("li").closest("li.hover");if(n.length>0)return;e(".top-bar li, [data-topbar] li").removeClass("hover")}),e(this.scope).on("click.fndtn",".top-bar .has-dropdown .back, [data-topbar] .has-dropdown .back",function(t){t.preventDefault();var n=e(this),i=n.closest(".top-bar, [data-topbar]"),s=i.find("section, .section"),o=n.closest("li.moved"),u=o.parent();i.data("index",i.data("index")-1),r.rtl?(s.css({right:-(100*i.data("index"))+"%"}),s.find(">.name").css({right:100*i.data("index")+"%"})):(s.css({left:-(100*i.data("index"))+"%"}),s.find(">.name").css({left:100*i.data("index")+"%"})),i.data("index")===0?i.css("height",""):i.css("height",r.outerHeight(u,!0)+r.settings.$topbar.data("height")),setTimeout(function(){o.removeClass("moved")},300)})},breakpoint:function(){return e(n).width()<=this.settings.breakPoint||e("html").hasClass("lt-ie9")},assemble:function(){var t=this;this.settings.$section.detach(),this.settings.$section.find(".has-dropdown>a").each(function(){var n=e(this),r=n.siblings(".dropdown"),i=n.attr("href");if(t.settings.mobile_show_parent_link&&i&&i.length>1)var s=e('<li class="title back js-generated"><h5><a href="#"></a></h5></li><li><a class="parent-link js-generated" href="'+i+'">'+n.text()+"</a></li>");else var s=e('<li class="title back js-generated"><h5><a href="#"></a></h5></li>');t.settings.custom_back_text==1?s.find("h5>a").html(t.settings.back_text):s.find("h5>a").html("&laquo; "+n.html()),r.prepend(s)}),this.settings.$section.appendTo(this.settings.$topbar),this.sticky()},height:function(t){var n=0,r=this;return t.find("> li").each(function(){n+=r.outerHeight(e(this),!0)}),n},sticky:function(){var n=e(t),r=this;n.scroll(function(){r.updateStickyPositioning()})},updateStickyPositioning:function(){var n="."+this.settings.stickyClass,r=e(t);if(e(n).length>0){var i=this.settings.$topbar.data("stickyoffset");e(n).hasClass("expanded")||(r.scrollTop()>i?e(n).hasClass("fixed")||(e(n).addClass("fixed"),e("body").addClass("f-topbar-fixed")):r.scrollTop()<=i&&e(n).hasClass("fixed")&&(e(n).removeClass("fixed"),e("body").removeClass("f-topbar-fixed")))}},off:function(){e(this.scope).off(".fndtn.topbar"),e(t).off(".fndtn.topbar")},reflow:function(){}}}(Foundation.zj,this,this.document);

/* Foundation 4 Interchange */
/*jslint unparam: true, browser: true, indent: 4 */

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.interchange = {
    name : 'interchange',

    version : '4.2.4',

    cache : {},

    images_loaded : false,

    settings : {
      load_attr : 'interchange',

      named_queries : {
        'default' : 'only screen and (min-width: 1px)',
        small : 'only screen and (min-width: 768px)',
        medium : 'only screen and (min-width: 1280px)',
        large : 'only screen and (min-width: 1440px)',
        landscape : 'only screen and (orientation: landscape)',
        portrait : 'only screen and (orientation: portrait)',
        retina : 'only screen and (-webkit-min-device-pixel-ratio: 2),' +
          'only screen and (min--moz-device-pixel-ratio: 2),' +
          'only screen and (-o-min-device-pixel-ratio: 2/1),' +
          'only screen and (min-device-pixel-ratio: 2),' +
          'only screen and (min-resolution: 192dpi),' +
          'only screen and (min-resolution: 2dppx)'
      },

      directives : {
        replace: function (el, path) {
          if (/IMG/.test(el[0].nodeName)) {
            var orig_path = el[0].src;

            if (new RegExp(path, 'i').test(orig_path)) return;

            el[0].src = path;

            return el.trigger('replace', [el[0].src, orig_path]);
          }
        }
      }
    },

    init : function (scope, method, options) {
      Foundation.inherit(this, 'throttle');

      if (typeof method === 'object') {
        $.extend(true, this.settings, method);
      }

      this.events();
      this.images();

      if (typeof method !== 'string') {
        return this.settings.init;
      } else {
        return this[method].call(this, options);
      }
    },

    events : function () {
      var self = this;

      $(window).on('resize.fndtn.interchange', self.throttle(function () {
        self.resize.call(self);
      }, 50));
    },

    resize : function () {
      var cache = this.cache;

      if(!this.images_loaded) {
        setTimeout($.proxy(this.resize, this), 50);
        return;
      }

      for (var uuid in cache) {
        if (cache.hasOwnProperty(uuid)) {
          var passed = this.results(uuid, cache[uuid]);

          if (passed) {
            this.settings.directives[passed
              .scenario[1]](passed.el, passed.scenario[0]);
          }
        }
      }

    },

    results : function (uuid, scenarios) {
      var count = scenarios.length;

      if (count > 0) {
        var el = $('[data-uuid="' + uuid + '"]');

        for (var i = count - 1; i >= 0; i--) {
          var mq, rule = scenarios[i][2];
          if (this.settings.named_queries.hasOwnProperty(rule)) {
            mq = matchMedia(this.settings.named_queries[rule]);
          } else {
            mq = matchMedia(rule);
          }
          if (mq.matches) {
            return {el: el, scenario: scenarios[i]};
          }
        }
      }

      return false;
    },

    images : function (force_update) {
      if (typeof this.cached_images === 'undefined' || force_update) {
        return this.update_images();
      }

      return this.cached_images;
    },

    update_images : function () {
      var images = document.getElementsByTagName('img'),
          count = images.length,
          loaded_count = 0,
          data_attr = 'data-' + this.settings.load_attr;

      this.cached_images = [];
      this.images_loaded = false;

      for (var i = count - 1; i >= 0; i--) {
        this.loaded($(images[i]), function (image) {
          loaded_count++;
          if (image) {
            var str = image.getAttribute(data_attr) || '';

            if (str.length > 0) {
              this.cached_images.push(image);
            }
          }

          if(loaded_count === count) {
            this.images_loaded = true;
            this.enhance();
          }
        }.bind(this));
      }

      return 'deferred';
    },

    // based on jquery.imageready.js
    // @weblinc, @jsantell, (c) 2012

    loaded : function (image, callback) {
      function loaded () {
        callback(image[0]);
      }

      function bindLoad () {
        this.one('load', loaded);

        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
          var src = this.attr( 'src' ),
              param = src.match( /\?/ ) ? '&' : '?';

          param += 'random=' + (new Date()).getTime();
          this.attr('src', src + param);
        }
      }

      if (!image.attr('src')) {
        loaded();
        return;
      }

      if (image[0].complete || image[0].readyState === 4) {
        loaded();
      } else {
        bindLoad.call(image);
      }
    },

    enhance : function () {
      var count = this.images().length;

      for (var i = count - 1; i >= 0; i--) {
        this._object($(this.images()[i]));
      }

      return $(window).trigger('resize');
    },

    parse_params : function (path, directive, mq) {
      return [this.trim(path), this.convert_directive(directive), this.trim(mq)];
    },

    convert_directive : function (directive) {
      var trimmed = this.trim(directive);

      if (trimmed.length > 0) {
        return trimmed;
      }

      return 'replace';
    },

    _object : function(el) {
      var raw_arr = this.parse_data_attr(el),
          scenarios = [], count = raw_arr.length;

      if (count > 0) {
        for (var i = count - 1; i >= 0; i--) {
          var split = raw_arr[i].split(/\((.*?)(\))$/);

          if (split.length > 1) {
            var cached_split = split[0].split(','),
                params = this.parse_params(cached_split[0],
                  cached_split[1], split[1]);

            scenarios.push(params);
          }
        }
      }

      return this.store(el, scenarios);
    },

    uuid : function (separator) {
      var delim = separator || "-";

      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }

      return (S4() + S4() + delim + S4() + delim + S4()
        + delim + S4() + delim + S4() + S4() + S4());
    },

    store : function (el, scenarios) {
      var uuid = this.uuid(),
          current_uuid = el.data('uuid');

      if (current_uuid) return this.cache[current_uuid];

      el.attr('data-uuid', uuid);

      return this.cache[uuid] = scenarios;
    },

    trim : function(str) {
      if (typeof str === 'string') {
        return $.trim(str);
      }

      return str;
    },

    parse_data_attr : function (el) {
      var raw = el.data(this.settings.load_attr).split(/\[(.*?)\]/),
          count = raw.length, output = [];

      for (var i = count - 1; i >= 0; i--) {
        if (raw[i].replace(/[\W\d]+/, '').length > 4) {
          output.push(raw[i]);
        }
      }

      return output;
    },

    reflow : function () {
      this.images(true);
    }

  };

}(Foundation.zj, this, this.document));

/*
 * jQuery FlexSlider v2.2.0
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */(function(e){e.flexslider=function(t,n){var r=e(t);r.vars=e.extend({},e.flexslider.defaults,n);var i=r.vars.namespace,s=window.navigator&&window.navigator.msPointerEnabled&&window.MSGesture,o=("ontouchstart"in window||s||window.DocumentTouch&&document instanceof DocumentTouch)&&r.vars.touch,u="click touchend MSPointerUp",a="",f,l=r.vars.direction==="vertical",c=r.vars.reverse,h=r.vars.itemWidth>0,p=r.vars.animation==="fade",d=r.vars.asNavFor!=="",v={},m=!0;e.data(t,"flexslider",r);v={init:function(){r.animating=!1;r.currentSlide=parseInt(r.vars.startAt?r.vars.startAt:0);isNaN(r.currentSlide)&&(r.currentSlide=0);r.animatingTo=r.currentSlide;r.atEnd=r.currentSlide===0||r.currentSlide===r.last;r.containerSelector=r.vars.selector.substr(0,r.vars.selector.search(" "));r.slides=e(r.vars.selector,r);r.container=e(r.containerSelector,r);r.count=r.slides.length;r.syncExists=e(r.vars.sync).length>0;r.vars.animation==="slide"&&(r.vars.animation="swing");r.prop=l?"top":"marginLeft";r.args={};r.manualPause=!1;r.stopped=!1;r.started=!1;r.startTimeout=null;r.transitions=!r.vars.video&&!p&&r.vars.useCSS&&function(){var e=document.createElement("div"),t=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var n in t)if(e.style[t[n]]!==undefined){r.pfx=t[n].replace("Perspective","").toLowerCase();r.prop="-"+r.pfx+"-transform";return!0}return!1}();r.vars.controlsContainer!==""&&(r.controlsContainer=e(r.vars.controlsContainer).length>0&&e(r.vars.controlsContainer));r.vars.manualControls!==""&&(r.manualControls=e(r.vars.manualControls).length>0&&e(r.vars.manualControls));if(r.vars.randomize){r.slides.sort(function(){return Math.round(Math.random())-.5});r.container.empty().append(r.slides)}r.doMath();r.setup("init");r.vars.controlNav&&v.controlNav.setup();r.vars.directionNav&&v.directionNav.setup();r.vars.keyboard&&(e(r.containerSelector).length===1||r.vars.multipleKeyboard)&&e(document).bind("keyup",function(e){var t=e.keyCode;if(!r.animating&&(t===39||t===37)){var n=t===39?r.getTarget("next"):t===37?r.getTarget("prev"):!1;r.flexAnimate(n,r.vars.pauseOnAction)}});r.vars.mousewheel&&r.bind("mousewheel",function(e,t,n,i){e.preventDefault();var s=t<0?r.getTarget("next"):r.getTarget("prev");r.flexAnimate(s,r.vars.pauseOnAction)});r.vars.pausePlay&&v.pausePlay.setup();r.vars.slideshow&&r.vars.pauseInvisible&&v.pauseInvisible.init();if(r.vars.slideshow){r.vars.pauseOnHover&&r.hover(function(){!r.manualPlay&&!r.manualPause&&r.pause()},function(){!r.manualPause&&!r.manualPlay&&!r.stopped&&r.play()});if(!r.vars.pauseInvisible||!v.pauseInvisible.isHidden())r.vars.initDelay>0?r.startTimeout=setTimeout(r.play,r.vars.initDelay):r.play()}d&&v.asNav.setup();o&&r.vars.touch&&v.touch();(!p||p&&r.vars.smoothHeight)&&e(window).bind("resize orientationchange focus",v.resize);r.find("img").attr("draggable","false");setTimeout(function(){r.vars.start(r)},200)},asNav:{setup:function(){r.asNav=!0;r.animatingTo=Math.floor(r.currentSlide/r.move);r.currentItem=r.currentSlide;r.slides.removeClass(i+"active-slide").eq(r.currentItem).addClass(i+"active-slide");if(!s)r.slides.click(function(t){t.preventDefault();var n=e(this),s=n.index(),o=n.offset().left-e(r).scrollLeft();if(o<=0&&n.hasClass(i+"active-slide"))r.flexAnimate(r.getTarget("prev"),!0);else if(!e(r.vars.asNavFor).data("flexslider").animating&&!n.hasClass(i+"active-slide")){r.direction=r.currentItem<s?"next":"prev";r.flexAnimate(s,r.vars.pauseOnAction,!1,!0,!0)}});else{t._slider=r;r.slides.each(function(){var t=this;t._gesture=new MSGesture;t._gesture.target=t;t.addEventListener("MSPointerDown",function(e){e.preventDefault();e.currentTarget._gesture&&e.currentTarget._gesture.addPointer(e.pointerId)},!1);t.addEventListener("MSGestureTap",function(t){t.preventDefault();var n=e(this),i=n.index();if(!e(r.vars.asNavFor).data("flexslider").animating&&!n.hasClass("active")){r.direction=r.currentItem<i?"next":"prev";r.flexAnimate(i,r.vars.pauseOnAction,!1,!0,!0)}})})}}},controlNav:{setup:function(){r.manualControls?v.controlNav.setupManual():v.controlNav.setupPaging()},setupPaging:function(){var t=r.vars.controlNav==="thumbnails"?"control-thumbs":"control-paging",n=1,s,o;r.controlNavScaffold=e('<ol class="'+i+"control-nav "+i+t+'"></ol>');if(r.pagingCount>1)for(var f=0;f<r.pagingCount;f++){o=r.slides.eq(f);s=r.vars.controlNav==="thumbnails"?'<img src="'+o.attr("data-thumb")+'"/>':"<a>"+n+"</a>";if("thumbnails"===r.vars.controlNav&&!0===r.vars.thumbCaptions){var l=o.attr("data-thumbcaption");""!=l&&undefined!=l&&(s+='<span class="'+i+'caption">'+l+"</span>")}r.controlNavScaffold.append("<li>"+s+"</li>");n++}r.controlsContainer?e(r.controlsContainer).append(r.controlNavScaffold):r.append(r.controlNavScaffold);v.controlNav.set();v.controlNav.active();r.controlNavScaffold.delegate("a, img",u,function(t){t.preventDefault();if(a===""||a===t.type){var n=e(this),s=r.controlNav.index(n);if(!n.hasClass(i+"active")){r.direction=s>r.currentSlide?"next":"prev";r.flexAnimate(s,r.vars.pauseOnAction)}}a===""&&(a=t.type);v.setToClearWatchedEvent()})},setupManual:function(){r.controlNav=r.manualControls;v.controlNav.active();r.controlNav.bind(u,function(t){t.preventDefault();if(a===""||a===t.type){var n=e(this),s=r.controlNav.index(n);if(!n.hasClass(i+"active")){s>r.currentSlide?r.direction="next":r.direction="prev";r.flexAnimate(s,r.vars.pauseOnAction)}}a===""&&(a=t.type);v.setToClearWatchedEvent()})},set:function(){var t=r.vars.controlNav==="thumbnails"?"img":"a";r.controlNav=e("."+i+"control-nav li "+t,r.controlsContainer?r.controlsContainer:r)},active:function(){r.controlNav.removeClass(i+"active").eq(r.animatingTo).addClass(i+"active")},update:function(t,n){r.pagingCount>1&&t==="add"?r.controlNavScaffold.append(e("<li><a>"+r.count+"</a></li>")):r.pagingCount===1?r.controlNavScaffold.find("li").remove():r.controlNav.eq(n).closest("li").remove();v.controlNav.set();r.pagingCount>1&&r.pagingCount!==r.controlNav.length?r.update(n,t):v.controlNav.active()}},directionNav:{setup:function(){var t=e('<ul class="'+i+'direction-nav"><li><a class="'+i+'prev" href="#">'+r.vars.prevText+'</a></li><li><a class="'+i+'next" href="#">'+r.vars.nextText+"</a></li></ul>");if(r.controlsContainer){e(r.controlsContainer).append(t);r.directionNav=e("."+i+"direction-nav li a",r.controlsContainer)}else{r.append(t);r.directionNav=e("."+i+"direction-nav li a",r)}v.directionNav.update();r.directionNav.bind(u,function(t){t.preventDefault();var n;if(a===""||a===t.type){n=e(this).hasClass(i+"next")?r.getTarget("next"):r.getTarget("prev");r.flexAnimate(n,r.vars.pauseOnAction)}a===""&&(a=t.type);v.setToClearWatchedEvent()})},update:function(){var e=i+"disabled";r.pagingCount===1?r.directionNav.addClass(e).attr("tabindex","-1"):r.vars.animationLoop?r.directionNav.removeClass(e).removeAttr("tabindex"):r.animatingTo===0?r.directionNav.removeClass(e).filter("."+i+"prev").addClass(e).attr("tabindex","-1"):r.animatingTo===r.last?r.directionNav.removeClass(e).filter("."+i+"next").addClass(e).attr("tabindex","-1"):r.directionNav.removeClass(e).removeAttr("tabindex")}},pausePlay:{setup:function(){var t=e('<div class="'+i+'pauseplay"><a></a></div>');if(r.controlsContainer){r.controlsContainer.append(t);r.pausePlay=e("."+i+"pauseplay a",r.controlsContainer)}else{r.append(t);r.pausePlay=e("."+i+"pauseplay a",r)}v.pausePlay.update(r.vars.slideshow?i+"pause":i+"play");r.pausePlay.bind(u,function(t){t.preventDefault();if(a===""||a===t.type)if(e(this).hasClass(i+"pause")){r.manualPause=!0;r.manualPlay=!1;r.pause()}else{r.manualPause=!1;r.manualPlay=!0;r.play()}a===""&&(a=t.type);v.setToClearWatchedEvent()})},update:function(e){e==="play"?r.pausePlay.removeClass(i+"pause").addClass(i+"play").html(r.vars.playText):r.pausePlay.removeClass(i+"play").addClass(i+"pause").html(r.vars.pauseText)}},touch:function(){var e,n,i,o,u,a,f=!1,d=0,v=0,m=0;if(!s){t.addEventListener("touchstart",g,!1);function g(s){if(r.animating)s.preventDefault();else if(window.navigator.msPointerEnabled||s.touches.length===1){r.pause();o=l?r.h:r.w;a=Number(new Date);d=s.touches[0].pageX;v=s.touches[0].pageY;i=h&&c&&r.animatingTo===r.last?0:h&&c?r.limit-(r.itemW+r.vars.itemMargin)*r.move*r.animatingTo:h&&r.currentSlide===r.last?r.limit:h?(r.itemW+r.vars.itemMargin)*r.move*r.currentSlide:c?(r.last-r.currentSlide+r.cloneOffset)*o:(r.currentSlide+r.cloneOffset)*o;e=l?v:d;n=l?d:v;t.addEventListener("touchmove",y,!1);t.addEventListener("touchend",b,!1)}}function y(t){d=t.touches[0].pageX;v=t.touches[0].pageY;u=l?e-v:e-d;f=l?Math.abs(u)<Math.abs(d-n):Math.abs(u)<Math.abs(v-n);var s=500;if(!f||Number(new Date)-a>s){t.preventDefault();if(!p&&r.transitions){r.vars.animationLoop||(u/=r.currentSlide===0&&u<0||r.currentSlide===r.last&&u>0?Math.abs(u)/o+2:1);r.setProps(i+u,"setTouch")}}}function b(s){t.removeEventListener("touchmove",y,!1);if(r.animatingTo===r.currentSlide&&!f&&u!==null){var l=c?-u:u,h=l>0?r.getTarget("next"):r.getTarget("prev");r.canAdvance(h)&&(Number(new Date)-a<550&&Math.abs(l)>50||Math.abs(l)>o/2)?r.flexAnimate(h,r.vars.pauseOnAction):p||r.flexAnimate(r.currentSlide,r.vars.pauseOnAction,!0)}t.removeEventListener("touchend",b,!1);e=null;n=null;u=null;i=null}}else{t.style.msTouchAction="none";t._gesture=new MSGesture;t._gesture.target=t;t.addEventListener("MSPointerDown",w,!1);t._slider=r;t.addEventListener("MSGestureChange",E,!1);t.addEventListener("MSGestureEnd",S,!1);function w(e){e.stopPropagation();if(r.animating)e.preventDefault();else{r.pause();t._gesture.addPointer(e.pointerId);m=0;o=l?r.h:r.w;a=Number(new Date);i=h&&c&&r.animatingTo===r.last?0:h&&c?r.limit-(r.itemW+r.vars.itemMargin)*r.move*r.animatingTo:h&&r.currentSlide===r.last?r.limit:h?(r.itemW+r.vars.itemMargin)*r.move*r.currentSlide:c?(r.last-r.currentSlide+r.cloneOffset)*o:(r.currentSlide+r.cloneOffset)*o}}function E(e){e.stopPropagation();var n=e.target._slider;if(!n)return;var r=-e.translationX,s=-e.translationY;m+=l?s:r;u=m;f=l?Math.abs(m)<Math.abs(-r):Math.abs(m)<Math.abs(-s);if(e.detail===e.MSGESTURE_FLAG_INERTIA){setImmediate(function(){t._gesture.stop()});return}if(!f||Number(new Date)-a>500){e.preventDefault();if(!p&&n.transitions){n.vars.animationLoop||(u=m/(n.currentSlide===0&&m<0||n.currentSlide===n.last&&m>0?Math.abs(m)/o+2:1));n.setProps(i+u,"setTouch")}}}function S(t){t.stopPropagation();var r=t.target._slider;if(!r)return;if(r.animatingTo===r.currentSlide&&!f&&u!==null){var s=c?-u:u,l=s>0?r.getTarget("next"):r.getTarget("prev");r.canAdvance(l)&&(Number(new Date)-a<550&&Math.abs(s)>50||Math.abs(s)>o/2)?r.flexAnimate(l,r.vars.pauseOnAction):p||r.flexAnimate(r.currentSlide,r.vars.pauseOnAction,!0)}e=null;n=null;u=null;i=null;m=0}}},resize:function(){if(!r.animating&&r.is(":visible")){h||r.doMath();if(p)v.smoothHeight();else if(h){r.slides.width(r.computedW);r.update(r.pagingCount);r.setProps()}else if(l){r.viewport.height(r.h);r.setProps(r.h,"setTotal")}else{r.vars.smoothHeight&&v.smoothHeight();r.newSlides.width(r.computedW);r.setProps(r.computedW,"setTotal")}}},smoothHeight:function(e){if(!l||p){var t=p?r:r.viewport;e?t.animate({height:r.slides.eq(r.animatingTo).height()},e):t.height(r.slides.eq(r.animatingTo).height())}},sync:function(t){var n=e(r.vars.sync).data("flexslider"),i=r.animatingTo;switch(t){case"animate":n.flexAnimate(i,r.vars.pauseOnAction,!1,!0);break;case"play":!n.playing&&!n.asNav&&n.play();break;case"pause":n.pause()}},pauseInvisible:{visProp:null,init:function(){var e=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var t=0;t<e.length;t++)e[t]+"Hidden"in document&&(v.pauseInvisible.visProp=e[t]+"Hidden");if(v.pauseInvisible.visProp){var n=v.pauseInvisible.visProp.replace(/[H|h]idden/,"")+"visibilitychange";document.addEventListener(n,function(){v.pauseInvisible.isHidden()?r.startTimeout?clearTimeout(r.startTimeout):r.pause():r.started?r.play():r.vars.initDelay>0?setTimeout(r.play,r.vars.initDelay):r.play()})}},isHidden:function(){return document[v.pauseInvisible.visProp]||!1}},setToClearWatchedEvent:function(){clearTimeout(f);f=setTimeout(function(){a=""},3e3)}};r.flexAnimate=function(t,n,s,u,a){!r.vars.animationLoop&&t!==r.currentSlide&&(r.direction=t>r.currentSlide?"next":"prev");d&&r.pagingCount===1&&(r.direction=r.currentItem<t?"next":"prev");if(!r.animating&&(r.canAdvance(t,a)||s)&&r.is(":visible")){if(d&&u){var f=e(r.vars.asNavFor).data("flexslider");r.atEnd=t===0||t===r.count-1;f.flexAnimate(t,!0,!1,!0,a);r.direction=r.currentItem<t?"next":"prev";f.direction=r.direction;if(Math.ceil((t+1)/r.visible)-1===r.currentSlide||t===0){r.currentItem=t;r.slides.removeClass(i+"active-slide").eq(t).addClass(i+"active-slide");return!1}r.currentItem=t;r.slides.removeClass(i+"active-slide").eq(t).addClass(i+"active-slide");t=Math.floor(t/r.visible)}r.animating=!0;r.animatingTo=t;n&&r.pause();r.vars.before(r);r.syncExists&&!a&&v.sync("animate");r.vars.controlNav&&v.controlNav.active();h||r.slides.removeClass(i+"active-slide").eq(t).addClass(i+"active-slide");r.atEnd=t===0||t===r.last;r.vars.directionNav&&v.directionNav.update();if(t===r.last){r.vars.end(r);r.vars.animationLoop||r.pause()}if(!p){var m=l?r.slides.filter(":first").height():r.computedW,g,y,b;if(h){g=r.vars.itemMargin;b=(r.itemW+g)*r.move*r.animatingTo;y=b>r.limit&&r.visible!==1?r.limit:b}else r.currentSlide===0&&t===r.count-1&&r.vars.animationLoop&&r.direction!=="next"?y=c?(r.count+r.cloneOffset)*m:0:r.currentSlide===r.last&&t===0&&r.vars.animationLoop&&r.direction!=="prev"?y=c?0:(r.count+1)*m:y=c?(r.count-1-t+r.cloneOffset)*m:(t+r.cloneOffset)*m;r.setProps(y,"",r.vars.animationSpeed);if(r.transitions){if(!r.vars.animationLoop||!r.atEnd){r.animating=!1;r.currentSlide=r.animatingTo}r.container.unbind("webkitTransitionEnd transitionend");r.container.bind("webkitTransitionEnd transitionend",function(){r.wrapup(m)})}else r.container.animate(r.args,r.vars.animationSpeed,r.vars.easing,function(){r.wrapup(m)})}else if(!o){r.slides.eq(r.currentSlide).css({zIndex:1}).animate({opacity:0},r.vars.animationSpeed,r.vars.easing);r.slides.eq(t).css({zIndex:2}).animate({opacity:1},r.vars.animationSpeed,r.vars.easing,r.wrapup)}else{r.slides.eq(r.currentSlide).css({opacity:0,zIndex:1});r.slides.eq(t).css({opacity:1,zIndex:2});r.wrapup(m)}r.vars.smoothHeight&&v.smoothHeight(r.vars.animationSpeed)}};r.wrapup=function(e){!p&&!h&&(r.currentSlide===0&&r.animatingTo===r.last&&r.vars.animationLoop?r.setProps(e,"jumpEnd"):r.currentSlide===r.last&&r.animatingTo===0&&r.vars.animationLoop&&r.setProps(e,"jumpStart"));r.animating=!1;r.currentSlide=r.animatingTo;r.vars.after(r)};r.animateSlides=function(){!r.animating&&m&&r.flexAnimate(r.getTarget("next"))};r.pause=function(){clearInterval(r.animatedSlides);r.animatedSlides=null;r.playing=!1;r.vars.pausePlay&&v.pausePlay.update("play");r.syncExists&&v.sync("pause")};r.play=function(){r.playing&&clearInterval(r.animatedSlides);r.animatedSlides=r.animatedSlides||setInterval(r.animateSlides,r.vars.slideshowSpeed);r.started=r.playing=!0;r.vars.pausePlay&&v.pausePlay.update("pause");r.syncExists&&v.sync("play")};r.stop=function(){r.pause();r.stopped=!0};r.canAdvance=function(e,t){var n=d?r.pagingCount-1:r.last;return t?!0:d&&r.currentItem===r.count-1&&e===0&&r.direction==="prev"?!0:d&&r.currentItem===0&&e===r.pagingCount-1&&r.direction!=="next"?!1:e===r.currentSlide&&!d?!1:r.vars.animationLoop?!0:r.atEnd&&r.currentSlide===0&&e===n&&r.direction!=="next"?!1:r.atEnd&&r.currentSlide===n&&e===0&&r.direction==="next"?!1:!0};r.getTarget=function(e){r.direction=e;return e==="next"?r.currentSlide===r.last?0:r.currentSlide+1:r.currentSlide===0?r.last:r.currentSlide-1};r.setProps=function(e,t,n){var i=function(){var n=e?e:(r.itemW+r.vars.itemMargin)*r.move*r.animatingTo,i=function(){if(h)return t==="setTouch"?e:c&&r.animatingTo===r.last?0:c?r.limit-(r.itemW+r.vars.itemMargin)*r.move*r.animatingTo:r.animatingTo===r.last?r.limit:n;switch(t){case"setTotal":return c?(r.count-1-r.currentSlide+r.cloneOffset)*e:(r.currentSlide+r.cloneOffset)*e;case"setTouch":return c?e:e;case"jumpEnd":return c?e:r.count*e;case"jumpStart":return c?r.count*e:e;default:return e}}();return i*-1+"px"}();if(r.transitions){i=l?"translate3d(0,"+i+",0)":"translate3d("+i+",0,0)";n=n!==undefined?n/1e3+"s":"0s";r.container.css("-"+r.pfx+"-transition-duration",n)}r.args[r.prop]=i;(r.transitions||n===undefined)&&r.container.css(r.args)};r.setup=function(t){if(!p){var n,s;if(t==="init"){r.viewport=e('<div class="'+i+'viewport"></div>').css({overflow:"hidden",position:"relative"}).appendTo(r).append(r.container);r.cloneCount=0;r.cloneOffset=0;if(c){s=e.makeArray(r.slides).reverse();r.slides=e(s);r.container.empty().append(r.slides)}}if(r.vars.animationLoop&&!h){r.cloneCount=2;r.cloneOffset=1;t!=="init"&&r.container.find(".clone").remove();r.container.append(r.slides.first().clone().addClass("clone").attr("aria-hidden","true")).prepend(r.slides.last().clone().addClass("clone").attr("aria-hidden","true"))}r.newSlides=e(r.vars.selector,r);n=c?r.count-1-r.currentSlide+r.cloneOffset:r.currentSlide+r.cloneOffset;if(l&&!h){r.container.height((r.count+r.cloneCount)*200+"%").css("position","absolute").width("100%");setTimeout(function(){r.newSlides.css({display:"block"});r.doMath();r.viewport.height(r.h);r.setProps(n*r.h,"init")},t==="init"?100:0)}else{r.container.width((r.count+r.cloneCount)*200+"%");r.setProps(n*r.computedW,"init");setTimeout(function(){r.doMath();r.newSlides.css({width:r.computedW,"float":"left",display:"block"});r.vars.smoothHeight&&v.smoothHeight()},t==="init"?100:0)}}else{r.slides.css({width:"100%","float":"left",marginRight:"-100%",position:"relative"});t==="init"&&(o?r.slides.css({opacity:0,display:"block",webkitTransition:"opacity "+r.vars.animationSpeed/1e3+"s ease",zIndex:1}).eq(r.currentSlide).css({opacity:1,zIndex:2}):r.slides.css({opacity:0,display:"block",zIndex:1}).eq(r.currentSlide).css({zIndex:2}).animate({opacity:1},r.vars.animationSpeed,r.vars.easing));r.vars.smoothHeight&&v.smoothHeight()}h||r.slides.removeClass(i+"active-slide").eq(r.currentSlide).addClass(i+"active-slide")};r.doMath=function(){var e=r.slides.first(),t=r.vars.itemMargin,n=r.vars.minItems,i=r.vars.maxItems;r.w=r.viewport===undefined?r.width():r.viewport.width();r.h=e.height();r.boxPadding=e.outerWidth()-e.width();if(h){r.itemT=r.vars.itemWidth+t;r.minW=n?n*r.itemT:r.w;r.maxW=i?i*r.itemT-t:r.w;r.itemW=r.minW>r.w?(r.w-t*(n-1))/n:r.maxW<r.w?(r.w-t*(i-1))/i:r.vars.itemWidth>r.w?r.w:r.vars.itemWidth;r.visible=Math.floor(r.w/r.itemW);r.move=r.vars.move>0&&r.vars.move<r.visible?r.vars.move:r.visible;r.pagingCount=Math.ceil((r.count-r.visible)/r.move+1);r.last=r.pagingCount-1;r.limit=r.pagingCount===1?0:r.vars.itemWidth>r.w?r.itemW*(r.count-1)+t*(r.count-1):(r.itemW+t)*r.count-r.w-t}else{r.itemW=r.w;r.pagingCount=r.count;r.last=r.count-1}r.computedW=r.itemW-r.boxPadding};r.update=function(e,t){r.doMath();if(!h){e<r.currentSlide?r.currentSlide+=1:e<=r.currentSlide&&e!==0&&(r.currentSlide-=1);r.animatingTo=r.currentSlide}if(r.vars.controlNav&&!r.manualControls)if(t==="add"&&!h||r.pagingCount>r.controlNav.length)v.controlNav.update("add");else if(t==="remove"&&!h||r.pagingCount<r.controlNav.length){if(h&&r.currentSlide>r.last){r.currentSlide-=1;r.animatingTo-=1}v.controlNav.update("remove",r.last)}r.vars.directionNav&&v.directionNav.update()};r.addSlide=function(t,n){var i=e(t);r.count+=1;r.last=r.count-1;l&&c?n!==undefined?r.slides.eq(r.count-n).after(i):r.container.prepend(i):n!==undefined?r.slides.eq(n).before(i):r.container.append(i);r.update(n,"add");r.slides=e(r.vars.selector+":not(.clone)",r);r.setup();r.vars.added(r)};r.removeSlide=function(t){var n=isNaN(t)?r.slides.index(e(t)):t;r.count-=1;r.last=r.count-1;isNaN(t)?e(t,r.slides).remove():l&&c?r.slides.eq(r.last).remove():r.slides.eq(t).remove();r.doMath();r.update(n,"remove");r.slides=e(r.vars.selector+":not(.clone)",r);r.setup();r.vars.removed(r)};v.init()};e(window).blur(function(e){focused=!1}).focus(function(e){focused=!0});e.flexslider.defaults={namespace:"flex-",selector:".slides > li",animation:"fade",easing:"swing",direction:"horizontal",reverse:!1,animationLoop:!0,smoothHeight:!1,startAt:0,slideshow:!0,slideshowSpeed:7e3,animationSpeed:600,initDelay:0,randomize:!1,thumbCaptions:!1,pauseOnAction:!0,pauseOnHover:!1,pauseInvisible:!0,useCSS:!0,touch:!0,video:!1,controlNav:!0,directionNav:!0,prevText:"Previous",nextText:"Next",keyboard:!0,multipleKeyboard:!1,mousewheel:!1,pausePlay:!1,pauseText:"Pause",playText:"Play",controlsContainer:"",manualControls:"",sync:"",asNavFor:"",itemWidth:0,itemMargin:0,minItems:1,maxItems:0,move:0,allowOneSlide:!0,start:function(){},before:function(){},after:function(){},end:function(){},added:function(){},removed:function(){}};e.fn.flexslider=function(t){t===undefined&&(t={});if(typeof t=="object")return this.each(function(){var n=e(this),r=t.selector?t.selector:".slides > li",i=n.find(r);if(i.length===1&&t.allowOneSlide===!0||i.length===0){i.fadeIn(400);t.start&&t.start(n)}else n.data("flexslider")===undefined&&new e.flexslider(this,t)});var n=e(this).data("flexslider");switch(t){case"play":n.play();break;case"pause":n.pause();break;case"stop":n.stop();break;case"next":n.flexAnimate(n.getTarget("next"),!0);break;case"prev":case"previous":n.flexAnimate(n.getTarget("prev"),!0);break;default:typeof t=="number"&&n.flexAnimate(t,!0)}}})(jQuery);

 /*!
 * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license.
 * Copyright 2007, 2013 Brian Cherne
 */
(function(e){e.fn.hoverIntent=function(t,n,r){var i={interval:100,sensitivity:7,timeout:0};if(typeof t==="object"){i=e.extend(i,t)}else if(e.isFunction(n)){i=e.extend(i,{over:t,out:n,selector:r})}else{i=e.extend(i,{over:t,out:t,selector:n})}var s,o,u,a;var f=function(e){s=e.pageX;o=e.pageY};var l=function(t,n){n.hoverIntent_t=clearTimeout(n.hoverIntent_t);if(Math.abs(u-s)+Math.abs(a-o)<i.sensitivity){e(n).off("mousemove.hoverIntent",f);n.hoverIntent_s=1;return i.over.apply(n,[t])}else{u=s;a=o;n.hoverIntent_t=setTimeout(function(){l(t,n)},i.interval)}};var c=function(e,t){t.hoverIntent_t=clearTimeout(t.hoverIntent_t);t.hoverIntent_s=0;return i.out.apply(t,[e])};var h=function(t){var n=jQuery.extend({},t);var r=this;if(r.hoverIntent_t){r.hoverIntent_t=clearTimeout(r.hoverIntent_t)}if(t.type=="mouseenter"){u=n.pageX;a=n.pageY;e(r).on("mousemove.hoverIntent",f);if(r.hoverIntent_s!=1){r.hoverIntent_t=setTimeout(function(){l(n,r)},i.interval)}}else{e(r).off("mousemove.hoverIntent",f);if(r.hoverIntent_s==1){r.hoverIntent_t=setTimeout(function(){c(n,r)},i.timeout)}}};return this.on({"mouseenter.hoverIntent":h,"mouseleave.hoverIntent":h},i.selector)}})(jQuery);

/* MediaMatch v.2.0.2 - Testing css media queries in Javascript. Authors & copyright (c) 2013: WebLinc, David Knight. */
// if ($('html').hasClass('lt-ie9')) { // only load for old IE
(window.matchMedia=function(c){var a=c.document,w=a.documentElement,l=[],t=0,x="",h={},G=/\s*(only|not)?\s*(screen|print|[a-z\-]+)\s*(and)?\s*/i,H=/^\s*\(\s*(-[a-z]+-)?(min-|max-)?([a-z\-]+)\s*(:?\s*([0-9]+(\.[0-9]+)?|portrait|landscape)(px|em|dppx|dpcm|rem|%|in|cm|mm|ex|pt|pc|\/([0-9]+(\.[0-9]+)?))?)?\s*\)\s*$/,y=0,A=function(b){var z=-1!==b.indexOf(",")&&b.split(",")||[b],e=z.length-1,j=e,g=null,d=null,c="",a=0,l=!1,m="",f="",g=null,d=0,f=null,k="",p="",q="",n="",r="",k=!1;if(""===
b)return!0;do{g=z[j-e];l=!1;if(d=g.match(G))c=d[0],a=d.index;if(!d||-1===g.substring(0,a).indexOf("(")&&(a||!d[3]&&c!==d.input))k=!1;else{f=g;l="not"===d[1];a||(m=d[2],f=g.substring(c.length));k=m===x||"all"===m||""===m;g=-1!==f.indexOf(" and ")&&f.split(" and ")||[f];d=g.length-1;if(k&&0<=d&&""!==f){do{f=g[d].match(H);if(!f||!h[f[3]]){k=!1;break}k=f[2];n=p=f[5];q=f[7];r=h[f[3]];q&&(n="px"===q?Number(p):"em"===q||"rem"===q?16*p:f[8]?(p/f[8]).toFixed(2):"dppx"===q?96*p:"dpcm"===q?0.3937*p:Number(p));
k="min-"===k&&n?r>=n:"max-"===k&&n?r<=n:n?r===n:!!r;if(!k)break}while(d--)}if(k)break}}while(e--);return l?!k:k},B=function(){var b=c.innerWidth||w.clientWidth,a=c.innerHeight||w.clientHeight,e=c.screen.width,j=c.screen.height,g=c.screen.colorDepth,d=c.devicePixelRatio;h.width=b;h.height=a;h["aspect-ratio"]=(b/a).toFixed(2);h["device-width"]=e;h["device-height"]=j;h["device-aspect-ratio"]=(e/j).toFixed(2);h.color=g;h["color-index"]=Math.pow(2,g);h.orientation=a>=b?"portrait":"landscape";h.resolution=
d&&96*d||c.screen.deviceXDPI||96;h["device-pixel-ratio"]=d||1},C=function(){clearTimeout(y);y=setTimeout(function(){var b=null,a=t-1,e=a,j=!1;if(0<=a){B();do if(b=l[e-a])if((j=A(b.mql.media))&&!b.mql.matches||!j&&b.mql.matches)if(b.mql.matches=j,b.listeners)for(var j=0,g=b.listeners.length;j<g;j++)b.listeners[j]&&b.listeners[j].call(c,b.mql);while(a--)}},10)},D=a.getElementsByTagName("head")[0],a=a.createElement("style"),E=null,u="screen print speech projection handheld tv braille embossed tty".split(" "),
m=0,I=u.length,s="#mediamatchjs { position: relative; z-index: 0; }",v="",F=c.addEventListener||(v="on")&&c.attachEvent;a.type="text/css";a.id="mediamatchjs";D.appendChild(a);for(E=c.getComputedStyle&&c.getComputedStyle(a)||a.currentStyle;m<I;m++)s+="@media "+u[m]+" { #mediamatchjs { position: relative; z-index: "+m+" } }";a.styleSheet?a.styleSheet.cssText=s:a.textContent=s;x=u[1*E.zIndex||0];D.removeChild(a);B();F(v+"resize",C);F(v+"orientationchange",C);return function(a){var c=t,e={matches:!1,
media:a,addListener:function(a){l[c].listeners||(l[c].listeners=[]);a&&l[c].listeners.push(a)},removeListener:function(a){var b=l[c],d=0,e=0;if(b)for(e=b.listeners.length;d<e;d++)b.listeners[d]===a&&b.listeners.splice(d,1)}};if(""===a)return e.matches=!0,e;e.matches=A(a);t=l.push({mql:e,listeners:null});return e}}(window));
// }

// Cookies
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}


/*!
 * jQuery Cookie Plugin v1.4.0
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals.
        factory(jQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch(e) {}
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }

    var config = $.cookie = function (key, value, options) {

        // Write

        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }

            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // Read

        var result = key ? undefined : {};

        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling $.cookie().
        var cookies = document.cookie ? document.cookie.split('; ') : [];

        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');

            if (key && key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }

            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }

        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };

}));

/*jslint browser:true, nomen:true */
//for jsLint implied variable warnings:
/*global google:false */

/*
 *  Geolocator Javascript Lib
 *  version:        1.1
 *  author:         Onur YILDIRIM
 *  contact:        onur@cutepilot.com
 *  project page:   https://github.com/onury/geolocator
 *  copyright:      © 2012. MIT License.
 */
var geolocator = (function () {

    'use strict';

    /*-------- PRIVATE PROPERTIES & FIELDS --------*/

        /* Storage for the callback function to be executed when the location is successfully fetched. */
    var onSuccess,
        /* Storage for the callback function to be executed when the location could not be fetched due to an error. */
        onError,
        /* HTML element ID for the Google Maps. */
        mCanvasId,
        /* Google Maps URL. */
        googleLoaderURL = 'https://www.google.com/jsapi',
        /* Array of source services that provide location-by-IP information. */
        ipGeoSources = [
            {url: 'http://freegeoip.net/json/', cbParam: 'callback'}, // 0
            {url: 'http://www.geoplugin.net/json.gp', cbParam: 'jsoncallback'}, // 1
            {url: 'http://geoiplookup.wikimedia.org/', cbParam: ''} // 2
            //,{url: 'http://j.maxmind.com/app/geoip.js', cbParam: ''} // Not implemented. Requires attribution. See http://dev.maxmind.com/geoip/javascript
        ],
        /* The index of the current IP source service. */
        ipGeoSourceIndex = 0; // default (freegeoip)

    /*-------- PRIVATE METHODS --------*/

    /*  Non-blocking method for loading scripts dynamically.
     */
    function loadScript(url, callback, type) {
        var script = document.createElement('script');
        script.type = (type === undefined) ? 'text/javascript' : type;

        if (typeof callback === 'function') {
            if (script.readyState) {
                script.onreadystatechange = function () {
                    if (script.readyState === 'loaded' || script.readyState === 'complete') {
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            } else {
                script.onload = function () { callback(); };
            }
        }

        script.src = url;
        //document.body.appendChild(script);
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    /*  Loads Google Maps API and executes the callback function when done.
     */
    function loadGoogleMaps(callback) {
        function loadMaps() {
            if (geolocator.__glcb) { delete geolocator.__glcb; }
            google.load('maps', '3', {other_params: 'sensor=false', callback: callback});
        }
        if (window.google !== undefined && google.maps !== undefined) {
            if (callback) { callback(); }
        } else {
            if (window.google !== undefined && google.loader !== undefined) {
                loadMaps();
            } else {
                geolocator.__glcb = loadMaps;
                loadScript(googleLoaderURL + '?callback=geolocator.__glcb');
            }
        }
    }

    /*  Draws the map from the fetched geo information.
     */
    function drawMap(elemId, mapOptions, infoContent) {
        var map, marker, infowindow,
            elem = document.getElementById(elemId);
        if (elem) {
            map = new google.maps.Map(elem, mapOptions);
            marker = new google.maps.Marker({
                position: mapOptions.center,
                map: map
            });
            infowindow = new google.maps.InfoWindow();
            infowindow.setContent(infoContent);
            //infowindow.open(map, marker);
            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map, marker);
            });
            geolocator.location.map = {
                canvas: elem,
                map: map,
                options: mapOptions,
                marker: marker,
                infoWindow: infowindow
            };
        } else {
            geolocator.location.map = null;
        }
    }

    /*  Runs a reverse-geo lookup for the specified lat-lon coords.
     */
    function reverseGeoLookup(latlng, callback) {
        var geocoder = new google.maps.Geocoder();
        function onReverseGeo(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (callback) { callback(results); }
            }
        }
        geocoder.geocode({'latLng': latlng}, onReverseGeo);
    }

    /*  Fetches additional details (from the reverse-geo result) for the address property of the location object.
     */
    function fetchDetailsFromLookup(data) {
        if (data.length > 0) {
            var i, comp, comps = data[0].address_components;
            geolocator.location.formattedAddress = data[0].formatted_address;

            for (i = 0; i < comps.length; i += 1) {
                comp = comps[i];
                if (comp.types.indexOf('route') >= 0) {
                    geolocator.location.address.street = comp.long_name;
                } else if (comp.types.indexOf('neighborhood') >= 0) {
                    geolocator.location.address.neighborhood = comp.long_name;
                } else if (comp.types.indexOf('sublocality') >= 0) {
                    geolocator.location.address.town = comp.long_name;
                } else if (comp.types.indexOf('locality') >= 0) {
                    geolocator.location.address.city = comp.long_name;
                } else if (comp.types.indexOf('administrative_area_level_1') >= 0) {
                    geolocator.location.address.region = comp.long_name;
                } else if (comp.types.indexOf('country') >= 0) {
                    geolocator.location.address.country = comp.long_name;
                    geolocator.location.address.countryCode = comp.short_name;
                } else if (comp.types.indexOf('postal_code') >= 0) {
                    geolocator.location.address.postalCode = comp.long_name;
                } else if (comp.types.indexOf('street_number') >= 0) {
                    geolocator.location.address.streetNumber = comp.long_name;
                }
            }
        }
    }

    /*  Finalizes the location object via reverse-geocoding and draws the map (if required).
     */
    function finalize(coords) {
        var latlng = new google.maps.LatLng(coords.latitude, coords.longitude);
        function onGeoLookup(data) {
            if (data.length > 0) {
                fetchDetailsFromLookup(data);
            }

            var zoom = geolocator.location.ipGeoSource === null ? 14 : 7, //zoom out if we got the lcoation from IP.
                mapOptions = {
                    zoom: zoom,
                    center: latlng,
                    mapTypeId: 'roadmap'
                };
            drawMap(mCanvasId, mapOptions, data[0].formatted_address);
            if (onSuccess) { onSuccess.call(null, geolocator.location); }
        }
        reverseGeoLookup(latlng, onGeoLookup);
    }

    /*  Gets the geo-position via HTML5 geolocation (if supported).
     */
    function getPosition(fallbackToIP, html5Options) {
        geolocator.location = null;

        function fallback(errMsg) {
            var ipsIndex = fallbackToIP === true ? 0 : (typeof fallbackToIP === 'number' ? fallbackToIP : -1);
            if (ipsIndex >= 0) {
                geolocator.locateByIP(onSuccess, onError, ipsIndex, mCanvasId);
            } else {
                if (onError) { onError.call(null, errMsg); }
            }
        }

        function geoSuccess(position) {
            geolocator.location = {
                ipGeoSource: null,
                coords: position.coords,
                timestamp: (new Date()).getTime(), //overwrite timestamp (Safari-Mac and iOS devices use different epoch; so better use this).
                address: {}
            };
            finalize(geolocator.location.coords);
        }

        function geoError(error) {
            // switch (error.code) {
            // case error.PERMISSION_DENIED:
            //     break;
            // case error.POSITION_UNAVAILABLE:
            //     break;
            // case error.TIMEOUT:
            //     break;
            // case error.UNKNOWN_ERROR:
            //     break;
            // }
            fallback(error.message);
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(geoSuccess, geoError, html5Options);
        } else { // not supported
            fallback('geolocation is not supported.');
        }
    }

    /*  Builds the location object from the source data.
     */
    function buildLocation(sourceIndex, data) {
        switch (sourceIndex) {
        case 0: // freegeoip
            geolocator.location = {
                coords: {
                    latitude: data.latitude,
                    longitude: data.longitude
                },
                address: {
                    city: data.city,
                    country: data.country_name,
                    countryCode: data.country_code,
                    region: data.region_name
                }
            };
            break;
        case 1: // geoplugin
            geolocator.location = {
                coords: {
                    latitude: data.geoplugin_latitude,
                    longitude: data.geoplugin_longitude
                },
                address: {
                    city: data.geoplugin_city,
                    country: data.geoplugin_countryName,
                    countryCode: data.geoplugin_countryCode,
                    region: data.geoplugin_regionName
                }
            };
            break;
        case 2: // Wikimedia
            geolocator.location = {
                coords: {
                    latitude: data.lat,
                    longitude: data.lon
                },
                address: {
                    city: data.city,
                    country: '',
                    countryCode: data.country,
                    region: ''
                }
            };
            break;
        }
        if (geolocator.location) {
            geolocator.location.coords.accuracy = null;
            geolocator.location.coords.altitude = null;
            geolocator.location.coords.altitudeAccuracy = null;
            geolocator.location.coords.heading = null;
            geolocator.location.coords.speed = null;
            geolocator.location.timestamp = new Date().getTime();
            geolocator.location.ipGeoSource = ipGeoSources[sourceIndex];
            geolocator.location.ipGeoSource.data = data;
        }
    }

    /*  The callback that is executed when the location data is fetched from the source.
     */
    function onGeoSourceCallback(data) {
        var initialized = false;
        geolocator.location = null;
        delete geolocator.__ipscb;

        function gLoadCallback() {
            if (ipGeoSourceIndex === 2) { // Wikimedia
                if (window.Geo !== undefined) {
                    buildLocation(ipGeoSourceIndex, window.Geo);
                    try { // causes error in IE8
                    	delete window.Geo;
                    } catch (err) {}
                    initialized = true;
                }
            } else {
                if (data !== undefined) {
                    buildLocation(ipGeoSourceIndex, data);
                    initialized = true;
                }
            }

            if (initialized === true) {
                finalize(geolocator.location.coords);
            } else {
                if (onError) { onError('Could not get location.'); }
            }
        }

        loadGoogleMaps(gLoadCallback);
    }

    /*  Loads the (jsonp) source. If the source does not support json-callbacks;
     *  the callback is executed dynamically when the source is loaded completely.
     */
    function loadIpGeoSource(source) {
        if (source.cbParam === undefined || source.cbParam === null || source.cbParam === '') {
            loadScript(source.url, onGeoSourceCallback);
        } else {
            loadScript(source.url + '?' + source.cbParam + '=geolocator.__ipscb'); //ip source callback
        }
    }

    return {

        /*-------- PUBLIC PROPERTIES --------*/

        /* The recent location information fetched as an object.
         */
        location: null,

        /*-------- PUBLIC METHODS --------*/

        /* Gets the geo-location by requesting user's permission.
         */
        locate: function (successCallback, errorCallback, fallbackToIP, html5Options, mapCanvasId) {
            onSuccess = successCallback;
            onError = errorCallback;
            mCanvasId = mapCanvasId;
            function gLoadCallback() { getPosition(fallbackToIP, html5Options); }
            loadGoogleMaps(gLoadCallback);
        },
        /* Gets the geo-location from the user's IP.
         */
        locateByIP: function (successCallback, errorCallback, sourceIndex, mapCanvasId) {
            ipGeoSourceIndex = (sourceIndex === undefined ||
                (sourceIndex < 0 || sourceIndex >= ipGeoSources.length)) ? 0 : sourceIndex;
            onSuccess = successCallback;
            onError = errorCallback;
            mCanvasId = mapCanvasId;
            geolocator.__ipscb = onGeoSourceCallback;
            loadIpGeoSource(ipGeoSources[ipGeoSourceIndex]);
        }
    };
}());




/* Foundation 4 Forms */
(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.forms = {
    name : 'forms',

    version: '4.3.2',

    cache: {},

    settings: {
      disable_class: 'no-custom',
      last_combo : null
    },

    init: function (scope, method, options) {

      if (typeof method === 'object') {
        $.extend(true, this.settings, method);
      }

      if (typeof method !== 'string') {
        if (!this.settings.init) {
          this.events();
        }

        this.assemble();

        return this.settings.init;
      } else {
        return this[method].call(this, options);
      }
    },

    assemble: function () {

      var forms = this;

      $('form.custom input[type="radio"],[type="checkbox"]', $(this.scope))
        .not('[data-customforms="disabled"]')
        .not('.' + this.settings.disable_class)
        .each(function(idx, sel){
          forms.set_custom_markup(sel);
        })
        .change(function(){
          forms.set_custom_markup(this);
        });

      $('form.custom select', $(this.scope))
        .not('[data-customforms="disabled"]')
        .not('.' + this.settings.disable_class)
        .not('[multiple=multiple]')
        .each(this.append_custom_select);
    },

    events: function () {
      var self = this;

      $(this.scope)
        .on('click.fndtn.forms', 'form.custom span.custom.checkbox', function (e) {
          e.preventDefault();
          e.stopPropagation();
          self.toggle_checkbox($(this));
        })
        .on('click.fndtn.forms', 'form.custom span.custom.radio', function (e) {
          e.preventDefault();
          e.stopPropagation();
          self.toggle_radio($(this));
        })
        .on('change.fndtn.forms', 'form.custom select', function (e, force_refresh) {
          if ($(this).is('[data-customforms="disabled"]')) return;
          self.refresh_custom_select($(this), force_refresh);
        })
        .on('click.fndtn.forms', 'form.custom label', function (e) {
          if ($(e.target).is('label')) {
            var $associatedElement = $('#' + self.escape($(this).attr('for'))).not('[data-customforms="disabled"]'),
              $customCheckbox,
              $customRadio;

            if ($associatedElement.length !== 0) {
              if ($associatedElement.attr('type') === 'checkbox') {
                e.preventDefault();
                $customCheckbox = $(this).find('span.custom.checkbox');
                //the checkbox might be outside after the label or inside of another element
                if ($customCheckbox.length === 0) {
                  $customCheckbox = $associatedElement.add(this).siblings('span.custom.checkbox').first();
                }
                self.toggle_checkbox($customCheckbox);
              } else if ($associatedElement.attr('type') === 'radio') {
                e.preventDefault();
                $customRadio = $(this).find('span.custom.radio');
                //the radio might be outside after the label or inside of another element
                if ($customRadio.length === 0) {
                  $customRadio = $associatedElement.add(this).siblings('span.custom.radio').first();
                }
                self.toggle_radio($customRadio);
              }
            }
          }
        })
        .on('mousedown.fndtn.forms', 'form.custom div.custom.dropdown', function () {
          return false;
        })
        .on('click.fndtn.forms', 'form.custom div.custom.dropdown a.current, form.custom div.custom.dropdown a.selector', function (e) {
          var $this = $(this),
              $dropdown = $this.closest('div.custom.dropdown'),
              $select = getFirstPrevSibling($dropdown, 'select');

          // make sure other dropdowns close
          if (!$dropdown.hasClass('open')) $(self.scope).trigger('click');

          e.preventDefault();
          if (false === $select.is(':disabled')) {
            $dropdown.toggleClass('open');

            if ($dropdown.hasClass('open')) {
              $(self.scope).on('click.fndtn.forms.customdropdown', function () {
                $dropdown.removeClass('open');
                $(self.scope).off('.fndtn.forms.customdropdown');
              });
            } else {
              $(self.scope).on('.fndtn.forms.customdropdown');
            }
            return false;
          }
        })
        .on('click.fndtn.forms touchend.fndtn.forms', 'form.custom div.custom.dropdown li', function (e) {
          var $this = $(this),
              $customDropdown = $this.closest('div.custom.dropdown'),
              $select = getFirstPrevSibling($customDropdown, 'select'),
              selectedIndex = 0;

          e.preventDefault();
          e.stopPropagation();

          if (!$(this).hasClass('disabled')) {
            $('div.dropdown').not($customDropdown).removeClass('open');

            var $oldThis = $this.closest('ul')
              .find('li.selected');
            $oldThis.removeClass('selected');

            $this.addClass('selected');

            $customDropdown.removeClass('open')
              .find('a.current')
              .text($this.text());

            $this.closest('ul').find('li').each(function (index) {
              if ($this[0] === this) {
                selectedIndex = index;
              }
            });
            $select[0].selectedIndex = selectedIndex;

            //store the old value in data
            $select.data('prevalue', $oldThis.html());

            // Kick off full DOM change event
            if (typeof (document.createEvent) != 'undefined') {
              var event = document.createEvent('HTMLEvents');
              event.initEvent('change', true, true);
              $select[0].dispatchEvent(event);
            } else {
              $select[0].fireEvent('onchange'); // for IE
            }
          }
      });

      $(window).on('keydown', function (e) {
        var focus = document.activeElement,
            self = Foundation.libs.forms,
            dropdown = $('.custom.dropdown'),
      select = getFirstPrevSibling(dropdown, 'select'),
      inputs = $('input,select,textarea,button'); // Zepto-compatible jQuery(":input")

        if (dropdown.length > 0 && dropdown.hasClass('open')) {
          e.preventDefault();

      if (e.which === 9) {
          $(inputs[$(inputs).index(select) + 1]).focus();
        dropdown.removeClass('open');
      }

          if (e.which === 13) {
            dropdown.find('li.selected').trigger('click');
          }

          if (e.which === 27) {
            dropdown.removeClass('open');
          }

          if (e.which >= 65 && e.which <= 90) {
            var next = self.go_to(dropdown, e.which),
                current = dropdown.find('li.selected');

            if (next) {
              current.removeClass('selected');
              self.scrollTo(next.addClass('selected'), 300);
            }
          }

          if (e.which === 38) {
            var current = dropdown.find('li.selected'),
                prev = current.prev(':not(.disabled)');

            if (prev.length > 0) {
              prev.parent()[0].scrollTop = prev.parent().scrollTop() - self.outerHeight(prev);
              current.removeClass('selected');
              prev.addClass('selected');
            }
          } else if (e.which === 40) {
            var current = dropdown.find('li.selected'),
                next = current.next(':not(.disabled)');

            if (next.length > 0) {
              next.parent()[0].scrollTop = next.parent().scrollTop() + self.outerHeight(next);
              current.removeClass('selected');
              next.addClass('selected');
            }
          }
        }
      });

    $(window).on('keyup', function (e) {
          var focus = document.activeElement,
              dropdown = $('.custom.dropdown');

      if (focus === dropdown.find('.current')[0]) {
        dropdown.find('.selector').focus().click();
      }
    });

      this.settings.init = true;
    },

    go_to: function (dropdown, character) {
      var lis = dropdown.find('li'),
          count = lis.length;

      if (count > 0) {
        for (var i = 0; i < count; i++) {
          var first_letter = lis.eq(i).text().charAt(0).toLowerCase();
          if (first_letter === String.fromCharCode(character).toLowerCase()) return lis.eq(i);
        }
      }
    },

    scrollTo: function (el, duration) {
      if (duration < 0) return;
      var parent = el.parent();
      var li_height = this.outerHeight(el);
      var difference = (li_height * (el.index())) - parent.scrollTop();
      var perTick = difference / duration * 10;

      this.scrollToTimerCache = setTimeout(function () {
        if (!isNaN(parseInt(perTick, 10))) {
          parent[0].scrollTop = parent.scrollTop() + perTick;
          this.scrollTo(el, duration - 10);
        }
      }.bind(this), 10);
    },

    set_custom_markup: function (sel) {
      var $this = $(sel),
          type = $this.attr('type'),
          $span = $this.next('span.custom.' + type);

      if (!$this.parent().hasClass('switch')) {
        $this.addClass('hidden-field');
      }

      if ($span.length === 0) {
        $span = $('<span class="custom ' + type + '"></span>').insertAfter($this);
      }

      $span.toggleClass('checked', $this.is(':checked'));
      $span.toggleClass('disabled', $this.is(':disabled'));
    },

    append_custom_select: function (idx, sel) {
        var self = Foundation.libs.forms,
            $this = $(sel),
            $customSelect = $this.next('div.custom.dropdown'),
            $customList = $customSelect.find('ul'),
            $selectCurrent = $customSelect.find(".current"),
            $selector = $customSelect.find(".selector"),
            $options = $this.find('option'),
            $selectedOption = $options.filter(':selected'),
            copyClasses = $this.attr('class') ? $this.attr('class').split(' ') : [],
            maxWidth = 0,
            liHtml = '',
            $listItems,
            $currentSelect = false;

        if ($customSelect.length === 0) {
          var customSelectSize = $this.hasClass('small') ? 'small' : $this.hasClass('medium') ? 'medium' : $this.hasClass('large') ? 'large' : $this.hasClass('expand') ? 'expand' : '';

          $customSelect = $('<div class="' + ['custom', 'dropdown', customSelectSize].concat(copyClasses).filter(function (item, idx, arr) {
            if (item === '') return false;
            return arr.indexOf(item) === idx;
          }).join(' ') + '"><a href="#" class="selector"></a><ul /></div>');

          $selector = $customSelect.find(".selector");
          $customList = $customSelect.find("ul");

          liHtml = $options.map(function () {
            var copyClasses = $(this).attr('class') ? $(this).attr('class') : '';
            return "<li class='" + copyClasses + "'>" + $(this).html() + "</li>";
          }).get().join('');

          $customList.append(liHtml);

          $currentSelect = $customSelect
            .prepend('<a href="#" class="current">' + ($selectedOption.html() || '') + '</a>')
            .find(".current");

          $this.after($customSelect)
            .addClass('hidden-field');
        } else {
          liHtml = $options.map(function () {
              return "<li>" + $(this).html() + "</li>";
            })
            .get().join('');

          $customList.html('')
            .append(liHtml);

        } // endif $customSelect.length === 0

        self.assign_id($this, $customSelect);
        $customSelect.toggleClass('disabled', $this.is(':disabled'));
        $listItems = $customList.find('li');

        // cache list length
        self.cache[$customSelect.data('id')] = $listItems.length;

        $options.each(function (index) {
          if (this.selected) {
            $listItems.eq(index).addClass('selected');

            if ($currentSelect) {
              $currentSelect.html($(this).html());
            }
          }
          if ($(this).is(':disabled')) {
            $listItems.eq(index).addClass('disabled');
          }
        });

        //
        // If we're not specifying a predetermined form size.
        //
        if (!$customSelect.is('.small, .medium, .large, .expand')) {

          // ------------------------------------------------------------------------------------
          // This is a work-around for when elements are contained within hidden parents.
          // For example, when custom-form elements are inside of a hidden reveal modal.
          //
          // We need to display the current custom list element as well as hidden parent elements
          // in order to properly calculate the list item element's width property.
          // -------------------------------------------------------------------------------------

          $customSelect.addClass('open');
          //
          // Quickly, display all parent elements.
          // This should help us calcualate the width of the list item's within the drop down.
          //
          var self = Foundation.libs.forms;
          self.hidden_fix.adjust($customList);

          maxWidth = (self.outerWidth($listItems) > maxWidth) ? self.outerWidth($listItems) : maxWidth;

          Foundation.libs.forms.hidden_fix.reset();

          $customSelect.removeClass('open');

        } // endif

    },

    assign_id: function ($select, $customSelect) {
      var id = [+new Date(), Foundation.random_str(5)].join('-');
      $select.attr('data-id', id);
      $customSelect.attr('data-id', id);
    },

    refresh_custom_select: function ($select, force_refresh) {
      var self = this;
      var maxWidth = 0,
          $customSelect = $select.next(),
          $options = $select.find('option'),
          $customList = $customSelect.find('ul'),
          $listItems = $customSelect.find('li');

      if ($options.length !== this.cache[$customSelect.data('id')] || force_refresh) {
        $customList.html('');

        // rebuild and re-populate all at once
        var customSelectHtml = '';
        $options.each(function () {
          var $this = $(this), thisHtml = $this.html(), thisSelected = this.selected;
          customSelectHtml += '<li class="' + (thisSelected ? ' selected ' : '') + ($this.is(':disabled') ? ' disabled ' : '') + '">' + thisHtml + '</li>';
          if (thisSelected) {
            $customSelect.find('.current').html(thisHtml);
          }
        });

        $customList.html(customSelectHtml);

        // fix width
        $customSelect.removeAttr('style');
        $customList.removeAttr('style');
        $customSelect.find('li').each(function () {
          $customSelect.addClass('open');
          if (self.outerWidth($(this)) > maxWidth) {
            maxWidth = self.outerWidth($(this));
          }
          $customSelect.removeClass('open');
        });

        $listItems = $customSelect.find('li');
        // cache list length
        this.cache[$customSelect.data('id')] = $listItems.length;
      }
    },

    refresh_custom_selection: function ($select) {
      var selectedValue = $('option:selected', $select).text();
      $('a.current', $select.next()).text(selectedValue);
    },

    toggle_checkbox: function ($element) {
      var $input = $element.prev(),
          input = $input[0];

      if (false === $input.is(':disabled')) {
        input.checked = ((input.checked) ? false : true);
        $element.toggleClass('checked');

        $input.trigger('change');
      }
    },

    toggle_radio: function ($element) {
        var $input = $element.prev(),
            $form = $input.closest('form.custom'),
            input = $input[0];

        if (false === $input.is(':disabled')) {
          $form.find('input[type="radio"][name="' + this.escape($input.attr('name')) + '"]')
            .next().not($element).removeClass('checked');

          if (!$element.hasClass('checked')) {
            $element.toggleClass('checked');
          }

          input.checked = $element.hasClass('checked');

          $input.trigger('change');
        }
    },

    escape: function (text) {
      if (!text) return '';
      return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    },

    hidden_fix: {
        /**
         * Sets all hidden parent elements and self to visibile.
         *
         * @method adjust
         * @param {jQuery Object} $child
         */

        // We'll use this to temporarily store style properties.
        tmp: [],

        // We'll use this to set hidden parent elements.
        hidden: null,

        adjust: function ($child) {
          // Internal reference.
          var _self = this;

          // Set all hidden parent elements, including this element.
          _self.hidden = $child.parents();
          _self.hidden = _self.hidden.add($child).filter(":hidden");

          // Loop through all hidden elements.
          _self.hidden.each(function () {

            // Cache the element.
            var $elem = $(this);

            // Store the style attribute.
            // Undefined if element doesn't have a style attribute.
            _self.tmp.push($elem.attr('style'));

            // Set the element's display property to block,
            // but ensure it's visibility is hidden.
            $elem.css({
                'visibility': 'hidden',
                'display': 'block'
            });
          });

        }, // end adjust

        /**
         * Resets the elements previous state.
         *
         * @method reset
         */
        reset: function () {
          // Internal reference.
          var _self = this;
          // Loop through our hidden element collection.
          _self.hidden.each(function (i) {
            // Cache this element.
            var $elem = $(this),
                _tmp = _self.tmp[i]; // Get the stored 'style' value for this element.

            // If the stored value is undefined.
            if (_tmp === undefined)
            // Remove the style attribute.
            $elem.removeAttr('style');
            else
            // Otherwise, reset the element style attribute.
            $elem.attr('style', _tmp);
          });
          // Reset the tmp array.
          _self.tmp = [];
          // Reset the hidden elements variable.
          _self.hidden = null;

        } // end reset
    },

    off: function () {
      $(this.scope).off('.fndtn.forms');
    },

    reflow : function () {}
  };

  var getFirstPrevSibling = function($el, selector) {
    var $el = $el.prev();
    while ($el.length) {
      if ($el.is(selector)) return $el;
      $el = $el.prev();
    }
    return $();
  };
}(Foundation.zj, this, this.document));


/* Foundation 4 Tooltips */
/*jslint unparam: true, browser: true, indent: 4 */

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.tooltips = {
    name : 'tooltips',

    version : '4.3.2',

    settings : {
      selector : '.has-tip',
      additionalInheritableClasses : [],
      tooltipClass : '.tooltip',
      touchCloseText: 'tap to close',
      appendTo: 'body',
      'disable-for-touch': false,
      tipTemplate : function (selector, content) {
        return '<span data-selector="' + selector + '" class="'
          + Foundation.libs.tooltips.settings.tooltipClass.substring(1)
          + '">' + content + '<span class="nub"></span></span>';
      }
    },

    cache : {},

    init : function (scope, method, options) {
      Foundation.inherit(this, 'data_options');
      var self = this;

      if (typeof method === 'object') {
        $.extend(true, this.settings, method);
      } else if (typeof options !== 'undefined') {
        $.extend(true, this.settings, options);
      }

      if (typeof method !== 'string') {
        if (Modernizr.touch) {
          $(this.scope)
            .on('click.fndtn.tooltip touchstart.fndtn.tooltip touchend.fndtn.tooltip',
              '[data-tooltip]', function (e) {
              var settings = $.extend({}, self.settings, self.data_options($(this)));
              if (!settings['disable-for-touch']) {
                e.preventDefault();
                $(settings.tooltipClass).hide();
                self.showOrCreateTip($(this));
              }
            })
            .on('click.fndtn.tooltip touchstart.fndtn.tooltip touchend.fndtn.tooltip',
              this.settings.tooltipClass, function (e) {
              e.preventDefault();
              $(this).fadeOut(150);
            });
        } else {
          $(this.scope)
            .on('mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip',
              '[data-tooltip]', function (e) {
              var $this = $(this);

              if (/enter|over/i.test(e.type)) {
                self.showOrCreateTip($this);
              } else if (e.type === 'mouseout' || e.type === 'mouseleave') {
                self.hide($this);
              }
            });
        }

        // $(this.scope).data('fndtn-tooltips', true);
      } else {
        return this[method].call(this, options);
      }

    },

    showOrCreateTip : function ($target) {
      var $tip = this.getTip($target);

      if ($tip && $tip.length > 0) {
        return this.show($target);
      }

      return this.create($target);
    },

    getTip : function ($target) {
      var selector = this.selector($target),
          tip = null;

      if (selector) {
        tip = $('span[data-selector="' + selector + '"]' + this.settings.tooltipClass);
      }

      return (typeof tip === 'object') ? tip : false;
    },

    selector : function ($target) {
      var id = $target.attr('id'),
          dataSelector = $target.attr('data-tooltip') || $target.attr('data-selector');

      if ((id && id.length < 1 || !id) && typeof dataSelector != 'string') {
        dataSelector = 'tooltip' + Math.random().toString(36).substring(7);
        $target.attr('data-selector', dataSelector);
      }

      return (id && id.length > 0) ? id : dataSelector;
    },

    create : function ($target) {
      var $tip = $(this.settings.tipTemplate(this.selector($target), $('<div></div>').html($target.attr('title')).html())),
          classes = this.inheritable_classes($target);

      $tip.addClass(classes).appendTo(this.settings.appendTo);
      if (Modernizr.touch) {
        $tip.append('<span class="tap-to-close">'+this.settings.touchCloseText+'</span>');
      }
      $target.removeAttr('title').attr('title','');
      this.show($target);
    },

    reposition : function (target, tip, classes) {
      var width, nub, nubHeight, nubWidth, column, objPos;

      tip.css('visibility', 'hidden').show();

      width = target.data('width');
      nub = tip.children('.nub');
      nubHeight = this.outerHeight(nub);
      nubWidth = this.outerHeight(nub);

      objPos = function (obj, top, right, bottom, left, width) {
        return obj.css({
          'top' : (top) ? top : 'auto',
          'bottom' : (bottom) ? bottom : 'auto',
          'left' : (left) ? left : 'auto',
          'right' : (right) ? right : 'auto',
          'width' : (width) ? width : 'auto'
        }).end();
      };

      objPos(tip, (target.offset().top + this.outerHeight(target) + 10), 'auto', 'auto', target.offset().left, width);

      if ($(window).width() < 767) {
        objPos(tip, (target.offset().top + this.outerHeight(target) + 10), 'auto', 'auto', 12.5, $(this.scope).width());
        tip.addClass('tip-override');
        objPos(nub, -nubHeight, 'auto', 'auto', target.offset().left);
      } else {
        var left = target.offset().left;
        if (Foundation.rtl) {
          left = target.offset().left + target.offset().width - this.outerWidth(tip);
        }
        objPos(tip, (target.offset().top + this.outerHeight(target) + 10), 'auto', 'auto', left, width);
        tip.removeClass('tip-override');
        if (classes && classes.indexOf('tip-top') > -1) {
          objPos(tip, (target.offset().top - this.outerHeight(tip)), 'auto', 'auto', left, width)
            .removeClass('tip-override');
        } else if (classes && classes.indexOf('tip-left') > -1) {
          objPos(tip, (target.offset().top + (this.outerHeight(target) / 2) - nubHeight*2.5), 'auto', 'auto', (target.offset().left - this.outerWidth(tip) - nubHeight), width)
            .removeClass('tip-override');
        } else if (classes && classes.indexOf('tip-right') > -1) {
          objPos(tip, (target.offset().top + (this.outerHeight(target) / 2) - nubHeight*2.5), 'auto', 'auto', (target.offset().left + this.outerWidth(target) + nubHeight), width)
            .removeClass('tip-override');
        }
      }

      tip.css('visibility', 'visible').hide();
    },

    inheritable_classes : function (target) {
      var inheritables = ['tip-top', 'tip-left', 'tip-bottom', 'tip-right', 'noradius'].concat(this.settings.additionalInheritableClasses),
          classes = target.attr('class'),
          filtered = classes ? $.map(classes.split(' '), function (el, i) {
            if ($.inArray(el, inheritables) !== -1) {
              return el;
            }
          }).join(' ') : '';

      return $.trim(filtered);
    },

    show : function ($target) {
      var $tip = this.getTip($target);

      this.reposition($target, $tip, $target.attr('class'));
      $tip.fadeIn(150);
    },

    hide : function ($target) {
      var $tip = this.getTip($target);

      $tip.fadeOut(150);
    },

    // deprecate reload
    reload : function () {
      var $self = $(this);

      return ($self.data('fndtn-tooltips')) ? $self.foundationTooltips('destroy').foundationTooltips('init') : $self.foundationTooltips('init');
    },

    off : function () {
      $(this.scope).off('.fndtn.tooltip');
      $(this.settings.tooltipClass).each(function (i) {
        $('[data-tooltip]').get(i).attr('title', $(this).text());
      }).remove();
    },

    reflow : function () {}
  };
}(Foundation.zj, this, this.document));


// Magnific Popup v0.9.9 by Dmitry Semenov
// http://bit.ly/magnific-popup#build=inline+image+ajax+iframe+gallery+fastclick
(function(a){var b="Close",c="BeforeClose",d="AfterClose",e="BeforeAppend",f="MarkupParse",g="Open",h="Change",i="mfp",j="."+i,k="mfp-ready",l="mfp-removing",m="mfp-prevent-close",n,o=function(){},p=!!window.jQuery,q,r=a(window),s,t,u,v,w,x=function(a,b){n.ev.on(i+a+j,b)},y=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},z=function(b,c){n.ev.triggerHandler(i+b,c),n.st.callbacks&&(b=b.charAt(0).toLowerCase()+b.slice(1),n.st.callbacks[b]&&n.st.callbacks[b].apply(n,a.isArray(c)?c:[c]))},A=function(b){if(b!==w||!n.currTemplate.closeBtn)n.currTemplate.closeBtn=a(n.st.closeMarkup.replace("%title%",n.st.tClose)),w=b;return n.currTemplate.closeBtn},B=function(){a.magnificPopup.instance||(n=new o,n.init(),a.magnificPopup.instance=n)},C=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(a.transition!==undefined)return!0;while(b.length)if(b.pop()+"Transition"in a)return!0;return!1};o.prototype={constructor:o,init:function(){var b=navigator.appVersion;n.isIE7=b.indexOf("MSIE 7.")!==-1,n.isIE8=b.indexOf("MSIE 8.")!==-1,n.isLowIE=n.isIE7||n.isIE8,n.isAndroid=/android/gi.test(b),n.isIOS=/iphone|ipad|ipod/gi.test(b),n.supportsTransition=C(),n.probablyMobile=n.isAndroid||n.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),t=a(document),n.popupsCache={}},open:function(b){s||(s=a(document.body));var c;if(b.isObj===!1){n.items=b.items.toArray(),n.index=0;var d=b.items,e;for(c=0;c<d.length;c++){e=d[c],e.parsed&&(e=e.el[0]);if(e===b.el[0]){n.index=c;break}}}else n.items=a.isArray(b.items)?b.items:[b.items],n.index=b.index||0;if(n.isOpen){n.updateItemHTML();return}n.types=[],v="",b.mainEl&&b.mainEl.length?n.ev=b.mainEl.eq(0):n.ev=t,b.key?(n.popupsCache[b.key]||(n.popupsCache[b.key]={}),n.currTemplate=n.popupsCache[b.key]):n.currTemplate={},n.st=a.extend(!0,{},a.magnificPopup.defaults,b),n.fixedContentPos=n.st.fixedContentPos==="auto"?!n.probablyMobile:n.st.fixedContentPos,n.st.modal&&(n.st.closeOnContentClick=!1,n.st.closeOnBgClick=!1,n.st.showCloseBtn=!1,n.st.enableEscapeKey=!1),n.bgOverlay||(n.bgOverlay=y("bg").on("click"+j,function(){n.close()}),n.wrap=y("wrap").attr("tabindex",-1).on("click"+j,function(a){n._checkIfClose(a.target)&&n.close()}),n.container=y("container",n.wrap)),n.contentContainer=y("content"),n.st.preloader&&(n.preloader=y("preloader",n.container,n.st.tLoading));var h=a.magnificPopup.modules;for(c=0;c<h.length;c++){var i=h[c];i=i.charAt(0).toUpperCase()+i.slice(1),n["init"+i].call(n)}z("BeforeOpen"),n.st.showCloseBtn&&(n.st.closeBtnInside?(x(f,function(a,b,c,d){c.close_replaceWith=A(d.type)}),v+=" mfp-close-btn-in"):n.wrap.append(A())),n.st.alignTop&&(v+=" mfp-align-top"),n.fixedContentPos?n.wrap.css({overflow:n.st.overflowY,overflowX:"hidden",overflowY:n.st.overflowY}):n.wrap.css({top:r.scrollTop(),position:"absolute"}),(n.st.fixedBgPos===!1||n.st.fixedBgPos==="auto"&&!n.fixedContentPos)&&n.bgOverlay.css({height:t.height(),position:"absolute"}),n.st.enableEscapeKey&&t.on("keyup"+j,function(a){a.keyCode===27&&n.close()}),r.on("resize"+j,function(){n.updateSize()}),n.st.closeOnContentClick||(v+=" mfp-auto-cursor"),v&&n.wrap.addClass(v);var l=n.wH=r.height(),m={};if(n.fixedContentPos&&n._hasScrollBar(l)){var o=n._getScrollbarSize();o&&(m.marginRight=o)}n.fixedContentPos&&(n.isIE7?a("body, html").css("overflow","hidden"):m.overflow="hidden");var p=n.st.mainClass;return n.isIE7&&(p+=" mfp-ie7"),p&&n._addClassToMFP(p),n.updateItemHTML(),z("BuildControls"),a("html").css(m),n.bgOverlay.add(n.wrap).prependTo(n.st.prependTo||s),n._lastFocusedEl=document.activeElement,setTimeout(function(){n.content?(n._addClassToMFP(k),n._setFocus()):n.bgOverlay.addClass(k),t.on("focusin"+j,n._onFocusIn)},16),n.isOpen=!0,n.updateSize(l),z(g),b},close:function(){if(!n.isOpen)return;z(c),n.isOpen=!1,n.st.removalDelay&&!n.isLowIE&&n.supportsTransition?(n._addClassToMFP(l),setTimeout(function(){n._close()},n.st.removalDelay)):n._close()},_close:function(){z(b);var c=l+" "+k+" ";n.bgOverlay.detach(),n.wrap.detach(),n.container.empty(),n.st.mainClass&&(c+=n.st.mainClass+" "),n._removeClassFromMFP(c);if(n.fixedContentPos){var e={marginRight:""};n.isIE7?a("body, html").css("overflow",""):e.overflow="",a("html").css(e)}t.off("keyup"+j+" focusin"+j),n.ev.off(j),n.wrap.attr("class","mfp-wrap").removeAttr("style"),n.bgOverlay.attr("class","mfp-bg"),n.container.attr("class","mfp-container"),n.st.showCloseBtn&&(!n.st.closeBtnInside||n.currTemplate[n.currItem.type]===!0)&&n.currTemplate.closeBtn&&n.currTemplate.closeBtn.detach(),n._lastFocusedEl&&a(n._lastFocusedEl).focus(),n.currItem=null,n.content=null,n.currTemplate=null,n.prevHeight=0,z(d)},updateSize:function(a){if(n.isIOS){var b=document.documentElement.clientWidth/window.innerWidth,c=window.innerHeight*b;n.wrap.css("height",c),n.wH=c}else n.wH=a||r.height();n.fixedContentPos||n.wrap.css("height",n.wH),z("Resize")},updateItemHTML:function(){var b=n.items[n.index];n.contentContainer.detach(),n.content&&n.content.detach(),b.parsed||(b=n.parseEl(n.index));var c=b.type;z("BeforeChange",[n.currItem?n.currItem.type:"",c]),n.currItem=b;if(!n.currTemplate[c]){var d=n.st[c]?n.st[c].markup:!1;z("FirstMarkupParse",d),d?n.currTemplate[c]=a(d):n.currTemplate[c]=!0}u&&u!==b.type&&n.container.removeClass("mfp-"+u+"-holder");var e=n["get"+c.charAt(0).toUpperCase()+c.slice(1)](b,n.currTemplate[c]);n.appendContent(e,c),b.preloaded=!0,z(h,b),u=b.type,n.container.prepend(n.contentContainer),z("AfterChange")},appendContent:function(a,b){n.content=a,a?n.st.showCloseBtn&&n.st.closeBtnInside&&n.currTemplate[b]===!0?n.content.find(".mfp-close").length||n.content.append(A()):n.content=a:n.content="",z(e),n.container.addClass("mfp-"+b+"-holder"),n.contentContainer.append(n.content)},parseEl:function(b){var c=n.items[b],d;c.tagName?c={el:a(c)}:(d=c.type,c={data:c,src:c.src});if(c.el){var e=n.types;for(var f=0;f<e.length;f++)if(c.el.hasClass("mfp-"+e[f])){d=e[f];break}c.src=c.el.attr("data-mfp-src"),c.src||(c.src=c.el.attr("href"))}return c.type=d||n.st.type||"inline",c.index=b,c.parsed=!0,n.items[b]=c,z("ElementParse",c),n.items[b]},addGroup:function(a,b){var c=function(c){c.mfpEl=this,n._openClick(c,a,b)};b||(b={});var d="click.magnificPopup";b.mainEl=a,b.items?(b.isObj=!0,a.off(d).on(d,c)):(b.isObj=!1,b.delegate?a.off(d).on(d,b.delegate,c):(b.items=a,a.off(d).on(d,c)))},_openClick:function(b,c,d){var e=d.midClick!==undefined?d.midClick:a.magnificPopup.defaults.midClick;if(!e&&(b.which===2||b.ctrlKey||b.metaKey))return;var f=d.disableOn!==undefined?d.disableOn:a.magnificPopup.defaults.disableOn;if(f)if(a.isFunction(f)){if(!f.call(n))return!0}else if(r.width()<f)return!0;b.type&&(b.preventDefault(),n.isOpen&&b.stopPropagation()),d.el=a(b.mfpEl),d.delegate&&(d.items=c.find(d.delegate)),n.open(d)},updateStatus:function(a,b){if(n.preloader){q!==a&&n.container.removeClass("mfp-s-"+q),!b&&a==="loading"&&(b=n.st.tLoading);var c={status:a,text:b};z("UpdateStatus",c),a=c.status,b=c.text,n.preloader.html(b),n.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),n.container.addClass("mfp-s-"+a),q=a}},_checkIfClose:function(b){if(a(b).hasClass(m))return;var c=n.st.closeOnContentClick,d=n.st.closeOnBgClick;if(c&&d)return!0;if(!n.content||a(b).hasClass("mfp-close")||n.preloader&&b===n.preloader[0])return!0;if(b!==n.content[0]&&!a.contains(n.content[0],b)){if(d&&a.contains(document,b))return!0}else if(c)return!0;return!1},_addClassToMFP:function(a){n.bgOverlay.addClass(a),n.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),n.wrap.removeClass(a)},_hasScrollBar:function(a){return(n.isIE7?t.height():document.body.scrollHeight)>(a||r.height())},_setFocus:function(){(n.st.focus?n.content.find(n.st.focus).eq(0):n.wrap).focus()},_onFocusIn:function(b){if(b.target!==n.wrap[0]&&!a.contains(n.wrap[0],b.target))return n._setFocus(),!1},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),z(f,[b,c,d]),a.each(c,function(a,c){if(c===undefined||c===!1)return!0;e=a.split("_");if(e.length>1){var d=b.find(j+"-"+e[0]);if(d.length>0){var f=e[1];f==="replaceWith"?d[0]!==c[0]&&d.replaceWith(c):f==="img"?d.is("img")?d.attr("src",c):d.replaceWith('<img src="'+c+'" class="'+d.attr("class")+'" />'):d.attr(e[1],c)}}else b.find(j+"-"+a).html(c)})},_getScrollbarSize:function(){if(n.scrollbarSize===undefined){var a=document.createElement("div");a.id="mfp-sbm",a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),n.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return n.scrollbarSize}},a.magnificPopup={instance:null,proto:o.prototype,modules:[],open:function(b,c){return B(),b?b=a.extend(!0,{},b):b={},b.isObj=!0,b.index=c||0,this.instance.open(b)},close:function(){return a.magnificPopup.instance&&a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&times;</button>',tClose:"Close (Esc)",tLoading:"Loading..."}},a.fn.magnificPopup=function(b){B();var c=a(this);if(typeof b=="string")if(b==="open"){var d,e=p?c.data("magnificPopup"):c[0].magnificPopup,f=parseInt(arguments[1],10)||0;e.items?d=e.items[f]:(d=c,e.delegate&&(d=d.find(e.delegate)),d=d.eq(f)),n._openClick({mfpEl:d},c,e)}else n.isOpen&&n[b].apply(n,Array.prototype.slice.call(arguments,1));else b=a.extend(!0,{},b),p?c.data("magnificPopup",b):c[0].magnificPopup=b,n.addGroup(c,b);return c};var D="inline",E,F,G,H=function(){G&&(F.after(G.addClass(E)).detach(),G=null)};a.magnificPopup.registerModule(D,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){n.types.push(D),x(b+"."+D,function(){H()})},getInline:function(b,c){H();if(b.src){var d=n.st.inline,e=a(b.src);if(e.length){var f=e[0].parentNode;f&&f.tagName&&(F||(E=d.hiddenClass,F=y(E),E="mfp-"+E),G=e.after(F).detach().removeClass(E)),n.updateStatus("ready")}else n.updateStatus("error",d.tNotFound),e=a("<div>");return b.inlineElement=e,e}return n.updateStatus("ready"),n._parseMarkup(c,{},b),c}}});var I="ajax",J,K=function(){J&&s.removeClass(J)},L=function(){K(),n.req&&n.req.abort()};a.magnificPopup.registerModule(I,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){n.types.push(I),J=n.st.ajax.cursor,x(b+"."+I,L),x("BeforeChange."+I,L)},getAjax:function(b){J&&s.addClass(J),n.updateStatus("loading");var c=a.extend({url:b.src,success:function(c,d,e){var f={data:c,xhr:e};z("ParseAjax",f),n.appendContent(a(f.data),I),b.finished=!0,K(),n._setFocus(),setTimeout(function(){n.wrap.addClass(k)},16),n.updateStatus("ready"),z("AjaxContentAdded")},error:function(){K(),b.finished=b.loadError=!0,n.updateStatus("error",n.st.ajax.tError.replace("%url%",b.src))}},n.st.ajax.settings);return n.req=a.ajax(c),""}}});var M,N=function(b){if(b.data&&b.data.title!==undefined)return b.data.title;var c=n.st.image.titleSrc;if(c){if(a.isFunction(c))return c.call(n,b);if(b.el)return b.el.attr(c)||""}return""};a.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var a=n.st.image,c=".image";n.types.push("image"),x(g+c,function(){n.currItem.type==="image"&&a.cursor&&s.addClass(a.cursor)}),x(b+c,function(){a.cursor&&s.removeClass(a.cursor),r.off("resize"+j)}),x("Resize"+c,n.resizeImage),n.isLowIE&&x("AfterChange",n.resizeImage)},resizeImage:function(){var a=n.currItem;if(!a||!a.img)return;if(n.st.image.verticalFit){var b=0;n.isLowIE&&(b=parseInt(a.img.css("padding-top"),10)+parseInt(a.img.css("padding-bottom"),10)),a.img.css("max-height",n.wH-b)}},_onImageHasSize:function(a){a.img&&(a.hasSize=!0,M&&clearInterval(M),a.isCheckingImgSize=!1,z("ImageHasSize",a),a.imgHidden&&(n.content&&n.content.removeClass("mfp-loading"),a.imgHidden=!1))},findImageSize:function(a){var b=0,c=a.img[0],d=function(e){M&&clearInterval(M),M=setInterval(function(){if(c.naturalWidth>0){n._onImageHasSize(a);return}b>200&&clearInterval(M),b++,b===3?d(10):b===40?d(50):b===100&&d(500)},e)};d(1)},getImage:function(b,c){var d=0,e=function(){b&&(b.img[0].complete?(b.img.off(".mfploader"),b===n.currItem&&(n._onImageHasSize(b),n.updateStatus("ready")),b.hasSize=!0,b.loaded=!0,z("ImageLoadComplete")):(d++,d<200?setTimeout(e,100):f()))},f=function(){b&&(b.img.off(".mfploader"),b===n.currItem&&(n._onImageHasSize(b),n.updateStatus("error",g.tError.replace("%url%",b.src))),b.hasSize=!0,b.loaded=!0,b.loadError=!0)},g=n.st.image,h=c.find(".mfp-img");if(h.length){var i=document.createElement("img");i.className="mfp-img",b.img=a(i).on("load.mfploader",e).on("error.mfploader",f),i.src=b.src,h.is("img")&&(b.img=b.img.clone()),i=b.img[0],i.naturalWidth>0?b.hasSize=!0:i.width||(b.hasSize=!1)}return n._parseMarkup(c,{title:N(b),img_replaceWith:b.img},b),n.resizeImage(),b.hasSize?(M&&clearInterval(M),b.loadError?(c.addClass("mfp-loading"),n.updateStatus("error",g.tError.replace("%url%",b.src))):(c.removeClass("mfp-loading"),n.updateStatus("ready")),c):(n.updateStatus("loading"),b.loading=!0,b.hasSize||(b.imgHidden=!0,c.addClass("mfp-loading"),n.findImageSize(b)),c)}}});var O,P=function(){return O===undefined&&(O=document.createElement("p").style.MozTransform!==undefined),O};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a=n.st.zoom,d=".zoom",e;if(!a.enabled||!n.supportsTransition)return;var f=a.duration,g=function(b){var c=b.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+a.duration/1e3+"s "+a.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,c.css(e),c},h=function(){n.content.css("visibility","visible")},i,j;x("BuildControls"+d,function(){if(n._allowZoom()){clearTimeout(i),n.content.css("visibility","hidden"),e=n._getItemToZoom();if(!e){h();return}j=g(e),j.css(n._getOffset()),n.wrap.append(j),i=setTimeout(function(){j.css(n._getOffset(!0)),i=setTimeout(function(){h(),setTimeout(function(){j.remove(),e=j=null,z("ZoomAnimationEnded")},16)},f)},16)}}),x(c+d,function(){if(n._allowZoom()){clearTimeout(i),n.st.removalDelay=f;if(!e){e=n._getItemToZoom();if(!e)return;j=g(e)}j.css(n._getOffset(!0)),n.wrap.append(j),n.content.css("visibility","hidden"),setTimeout(function(){j.css(n._getOffset())},16)}}),x(b+d,function(){n._allowZoom()&&(h(),j&&j.remove(),e=null)})},_allowZoom:function(){return n.currItem.type==="image"},_getItemToZoom:function(){return n.currItem.hasSize?n.currItem.img:!1},_getOffset:function(b){var c;b?c=n.currItem.img:c=n.st.zoom.opener(n.currItem.el||n.currItem);var d=c.offset(),e=parseInt(c.css("padding-top"),10),f=parseInt(c.css("padding-bottom"),10);d.top-=a(window).scrollTop()-e;var g={width:c.width(),height:(p?c.innerHeight():c[0].offsetHeight)-f-e};return P()?g["-moz-transform"]=g.transform="translate("+d.left+"px,"+d.top+"px)":(g.left=d.left,g.top=d.top),g}}});var Q="iframe",R="//about:blank",S=function(a){if(n.currTemplate[Q]){var b=n.currTemplate[Q].find("iframe");b.length&&(a||(b[0].src=R),n.isIE8&&b.css("display",a?"block":"none"))}};a.magnificPopup.registerModule(Q,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){n.types.push(Q),x("BeforeChange",function(a,b,c){b!==c&&(b===Q?S():c===Q&&S(!0))}),x(b+"."+Q,function(){S()})},getIframe:function(b,c){var d=b.src,e=n.st.iframe;a.each(e.patterns,function(){if(d.indexOf(this.index)>-1)return this.id&&(typeof this.id=="string"?d=d.substr(d.lastIndexOf(this.id)+this.id.length,d.length):d=this.id.call(this,d)),d=this.src.replace("%id%",d),!1});var f={};return e.srcAction&&(f[e.srcAction]=d),n._parseMarkup(c,f,b),n.updateStatus("ready"),c}}});var T=function(a){var b=n.items.length;return a>b-1?a-b:a<0?b+a:a},U=function(a,b,c){return a.replace(/%curr%/gi,b+1).replace(/%total%/gi,c)};a.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var c=n.st.gallery,d=".mfp-gallery",e=Boolean(a.fn.mfpFastClick);n.direction=!0;if(!c||!c.enabled)return!1;v+=" mfp-gallery",x(g+d,function(){c.navigateByImgClick&&n.wrap.on("click"+d,".mfp-img",function(){if(n.items.length>1)return n.next(),!1}),t.on("keydown"+d,function(a){a.keyCode===37?n.prev():a.keyCode===39&&n.next()})}),x("UpdateStatus"+d,function(a,b){b.text&&(b.text=U(b.text,n.currItem.index,n.items.length))}),x(f+d,function(a,b,d,e){var f=n.items.length;d.counter=f>1?U(c.tCounter,e.index,f):""}),x("BuildControls"+d,function(){if(n.items.length>1&&c.arrows&&!n.arrowLeft){var b=c.arrowMarkup,d=n.arrowLeft=a(b.replace(/%title%/gi,c.tPrev).replace(/%dir%/gi,"left")).addClass(m),f=n.arrowRight=a(b.replace(/%title%/gi,c.tNext).replace(/%dir%/gi,"right")).addClass(m),g=e?"mfpFastClick":"click";d[g](function(){n.prev()}),f[g](function(){n.next()}),n.isIE7&&(y("b",d[0],!1,!0),y("a",d[0],!1,!0),y("b",f[0],!1,!0),y("a",f[0],!1,!0)),n.container.append(d.add(f))}}),x(h+d,function(){n._preloadTimeout&&clearTimeout(n._preloadTimeout),n._preloadTimeout=setTimeout(function(){n.preloadNearbyImages(),n._preloadTimeout=null},16)}),x(b+d,function(){t.off(d),n.wrap.off("click"+d),n.arrowLeft&&e&&n.arrowLeft.add(n.arrowRight).destroyMfpFastClick(),n.arrowRight=n.arrowLeft=null})},next:function(){n.direction=!0,n.index=T(n.index+1),n.updateItemHTML()},prev:function(){n.direction=!1,n.index=T(n.index-1),n.updateItemHTML()},goTo:function(a){n.direction=a>=n.index,n.index=a,n.updateItemHTML()},preloadNearbyImages:function(){var a=n.st.gallery.preload,b=Math.min(a[0],n.items.length),c=Math.min(a[1],n.items.length),d;for(d=1;d<=(n.direction?c:b);d++)n._preloadItem(n.index+d);for(d=1;d<=(n.direction?b:c);d++)n._preloadItem(n.index-d)},_preloadItem:function(b){b=T(b);if(n.items[b].preloaded)return;var c=n.items[b];c.parsed||(c=n.parseEl(b)),z("LazyLoad",c),c.type==="image"&&(c.img=a('<img class="mfp-img" />').on("load.mfploader",function(){c.hasSize=!0}).on("error.mfploader",function(){c.hasSize=!0,c.loadError=!0,z("LazyLoadError",c)}).attr("src",c.src)),c.preloaded=!0}}}),function(){var b=1e3,c="ontouchstart"in window,d=function(){r.off("touchmove"+f+" touchend"+f)},e="mfpFastClick",f="."+e;a.fn.mfpFastClick=function(e){return a(this).each(function(){var g=a(this),h;if(c){var i,j,k,l,m,n;g.on("touchstart"+f,function(a){l=!1,n=1,m=a.originalEvent?a.originalEvent.touches[0]:a.touches[0],j=m.clientX,k=m.clientY,r.on("touchmove"+f,function(a){m=a.originalEvent?a.originalEvent.touches:a.touches,n=m.length,m=m[0];if(Math.abs(m.clientX-j)>10||Math.abs(m.clientY-k)>10)l=!0,d()}).on("touchend"+f,function(a){d();if(l||n>1)return;h=!0,a.preventDefault(),clearTimeout(i),i=setTimeout(function(){h=!1},b),e()})})}g.on("click"+f,function(){h||e()})})},a.fn.destroyMfpFastClick=function(){a(this).off("touchstart"+f+" click"+f),c&&r.off("touchmove"+f+" touchend"+f)}}(),B()})(window.jQuery||window.Zepto);

/* jQuery Tiny Pub/Sub - v0.7 - 10/27/2011
 * http://benalman.com/
 * Copyright (c) 2011 "Cowboy" Ben Alman; Licensed MIT, GPL */
(function(a){var b=a({});a.subscribe=function(){b.on.apply(b,arguments)},a.unsubscribe=function(){b.off.apply(b,arguments)},a.publish=function(){b.trigger.apply(b,arguments)}})(jQuery)