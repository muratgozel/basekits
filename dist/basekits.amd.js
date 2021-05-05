define(["exports"],(function(e){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(){}r.prototype.regexes={uuid:/[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}/g,email:/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i},r.prototype.isString=function(t){return"string"==typeof t},r.prototype.isBoolean=function(t){return!0===t||!1===t},r.prototype.isNull=function(t){return null===t},r.prototype.isUndefined=function(t){return void 0===t},r.prototype.isNumber=function(t){return"number"==typeof t&&!0===Number.isFinite(t)},r.prototype.isInteger=function(t){return Number.isInteger(t)},r.prototype.isNan=function(t){return"number"==typeof t&&t!=+t},r.prototype.isObject=function(t){return"[object Object]"===Object.prototype.toString.call(t)},r.prototype.isArray=function(t){return Array.isArray(t)},r.prototype.isPromise=function(t){return Boolean(t&&"function"==typeof t.then)},r.prototype.isError=function(t){return t instanceof Error},r.prototype.isDate=function(t){return t instanceof Date},r.prototype.isFunction=function(t){return"function"==typeof t},r.prototype.isRegExp=function(t){return t instanceof RegExp},r.prototype.isBigInt=function(t){return"bigint"==typeof t},r.prototype.isSymbol=function(t){return"symbol"===n(t)},r.prototype.isDOMElement=function(t){return!(!t||!(t.nodeName||t.prop&&t.attr&&t.find))},r.prototype.getType=function(t){return this.isObject(t)?"object":this.isArray(t)?"array":this.isPromise(t)?"promise":this.isError(t)?"error":this.isDate(t)?"date":this.isNull(t)?"null":this.isUndefined(t)?"undefined":this.isFunction(t)?"function":this.isNumber(t)?"number":this.isNan(t)?"nan":this.isRegExp(t)?"regexp":this.isString(t)?"string":this.isBoolean(t)?"boolean":this.isBigInt(t)?"bigint":this.isSymbol(t)?"symbol":this.isDOMElement(t)?"domelement":"none"},r.prototype.objectifyError=function(t){var e=JSON.stringify(t,Object.getOwnPropertyNames(t)),n=JSON.parse(e);return n.stack=n.stack.split(/[\n]/g),n},r.prototype.stringifyError=function(t){return JSON.stringify(this.objectifyError(t))},r.prototype.hashcode=function(t){var e=0;if("string"!=typeof t)return e;for(var n=0;n<t.length;n++){e=(e<<5)-e+t.charCodeAt(n),e&=e}return e},r.prototype=Object.assign({},r.prototype,r.prototype),r.prototype.sprintf=function(t,e){if("number"==typeof e&&(e=e.toString()),"string"==typeof e&&e.length>0&&(e=[e]),!Array.isArray(e))return t;var n=/(%s)/;if(!n.test(t))return t;return function t(r){if(0!==e.length&&n.test(r)){var i=r.replace(n,e[0]);return e.shift(),t(i)}return r}(t)},r.prototype.template=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(this.isString(t)){var n=/({{)[^{}]+(}})/gm,r=t.match(n);return r&&0!==r.length&&this.isObject(e)?r.reduce((function(t,n){var r=n.slice(2,-2);return e.hasOwnProperty(r)&&(t=t.replace(n,e[r])),t}),t):t}},r.prototype.uppercase=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;if(this.isString(t)){var n="string"==typeof e?e.replace("_","-"):e;return t.toLocaleUpperCase(n)}},r.prototype.lowercase=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;if(this.isString(t)){var n="string"==typeof e?e.replace("_","-"):e;return t.toLocaleLowerCase(n)}},r.prototype.sentencecase=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];if(this.isString(t)){for(var r="",i=t.split(" "),o=i.length,s=0;s<o;s++){var a=i[s],c=s+1!==o?" ":"";-1!==n.indexOf(a)?r+=a+c:r+=0===s?this.uppercase(a.slice(0,1),e)+this.lowercase(a.slice(1))+c:a+c}return r}},r.prototype.titlecase=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];if(this.isString(t)){for(var r="",i=t.split(" "),o=i.length,s=0;s<o;s++){var a=i[s],c=s+1!==o?" ":"";-1!==n.indexOf(a)?r+=a+c:r+=this.uppercase(a.slice(0,1),e)+this.lowercase(a.slice(1),e)+c}return r}},r.prototype=Object.assign({},r.prototype,r.prototype),r.prototype.assignDeep=function(){for(var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=Object.assign({},{concatArrays:!1,discardNonObjectReplacements:!1,ignoreKeys:[]},n||{}),i={},o=0;o<e.length;o++)for(var s=Object.keys(e[o]).filter((function(t){return-1===r.ignoreKeys.indexOf(t)})),a=function(n){var a=s[n];if(t.isObject(e[o][a])){var c=e.filter((function(e){return e.hasOwnProperty(a)&&(!r.discardNonObjectReplacements||t.isObject(e[a]))})).map((function(t){return t[a]}));!0===r.discardNonObjectReplacements&&r.ignoreKeys.push(a),i[a]=t.assignDeep(c,r)}else t.isArray(e[o][a])&&!0===r.concatArrays?(i[a]=e.filter((function(e){return e.hasOwnProperty(a)&&t.isArray(e[a])})).reduce((function(t,e){return t.concat(e[a])}),[]),r.ignoreKeys.push(a)):i[a]=e[o][a]},c=0;c<s.length;c++)a(c);return i},r.prototype.unflatten=function(t){for(var e=this,n=/\[[0-9]+\]$/,r=[],i=Object.keys(t),o=0;o<i.length;o++){for(var s=i[o],a=t[s],c=s.split("."),u=c.pop(),p={},l=p,f=void 0;void 0!==(f=c.shift());)p[f]={},p=p[f];p[u]=a,r.push(l)}return function t(r){return e.isObject(r)?Object.keys(r).reduce((function(e,i){if(n.test(i)){parseInt(i.slice(i.indexOf("[")+1,i.indexOf("]")));var o=i.replace(n,"");e.hasOwnProperty(o)||(e[o]=[]),e[o].push(t(r[i]))}else e[i]=t(r[i]);return e}),{}):r}(e.assignDeep(r))},r.prototype.flatten=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:".",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],r=this;if(r.isObject(t))return Object.keys(t).reduce((function(i,o){return r.isObject(t[o])||r.isArray(t[o])&&r.isObject(t[o][0])?i=Object.assign({},i,r.flatten(t[o],e,n.concat([o]))):i[n.concat([o]).join(e)]=t[o],i}),{});if(r.isArray(t)&&r.isObject(t[0])){var i=n[n.length-1];return n.pop(),t.reduce((function(t,o,s){var a=i+"["+s+"]";return t=Object.keys(o).reduce((function(t,i,s){return r.isObject(o[i])||r.isArray(o[i])&&r.isObject(o[i][0])?t=Object.assign({},t,r.flatten(o[i],e,n.concat([a,i]))):t[n.concat([a,i]).join(e)]=o[i],t}),t)}),{})}},r.prototype.getProp=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;if(!this.isObject(t))return n;if(this.isString(e))e=e.split(".");else if(this.isNumber(e))e=[e];else if(!this.isArray(e))return n;if(e.length<1)return n;for(var r=0,i=e.length;this.isObject(t)&&r<i;)if(t=t[e[r]],(r+=1)<i&&!this.isObject(t))return n;return this.isUndefined(t)?n:t},r.prototype.removeProp=function(t,e){if(this.isObject(t)){var n=Object.keys(t);return-1===n.indexOf(e)?t:n.reduce((function(n,r){return r!=e&&(n[r]=t[r]),n}),{})}},r.prototype=Object.assign({},r.prototype,r.prototype,r.prototype),r.prototype.removeDuplicates=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=this;return e?t.filter((function(e,r){var i=t.map((function(t,r){return!!(n.hasOwnProperty("isEqual")?n.isEqual(t,e):t===e)&&r})).filter((function(t){return!1!==t}));return!!n.isArray(i)&&i[0]===r})):t.filter((function(e,n){return t.indexOf(e)===n}))},r.prototype.sortItemsBy=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"asc",r=null;if(this.isArray(e))r="__"+e.join("_"),t=t.map(function(t){return t[r]=this.getProp(t,e),t}.bind(this));else{if(!this.isString(e))return t;r=e}return t.sort((function(t,e){var i=t[r],o=e[r];return"desc"==n?i>o?-1:o>i?1:0:(n="asc",i>o?1:o>i?-1:0)}))},r.prototype=Object.assign({},r.prototype,r.prototype,r.prototype),r.prototype.stringifyURLObject=function(t){return t.protocol+"//"+(t.username&&t.password?t.username+":"+t.password+"@":"")+t.hostname+(80!=t.port?":"+t.port:"")+("string"==typeof t.pathname?t.pathname:"")},r.prototype.waitForIt=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:300,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1e4,i=setInterval((function(){!0===t.call()&&(clearInterval(i),i=null,e.call())}),n);setTimeout((function(){i&&(clearInterval(i),e.call(null,!1))}),r)},r.prototype.throttle=function(t,e,n){var r=!0,i=!0;if("function"!=typeof t)throw new TypeError("Invalid debounce function.");return"[object Object]"===Object.prototype.toString.call(n)&&(r="leading"in n?!!n.leading:r,i="trailing"in n?!!n.trailing:i),this.debounce(t,e,{leading:r,maxWait:e,trailing:i})},r.prototype.debounce=function(t,e,n){var r,i,o,s,a,c,u=0,p=!1,l=!1,f=!0;if("function"!=typeof t)throw new TypeError("Invalid debounce function.");function h(e){var n=r,o=i;return r=i=void 0,u=e,s=t.apply(o,n)}function d(t){return u=t,a=setTimeout(g,e),p?h(t):s}function y(t){var n=t-c;return void 0===c||n>=e||n<0||l&&t-u>=o}function g(){var t=Date.now();if(y(t))return m(t);a=setTimeout(g,function(t){var n=t-u,r=e-(t-c);return l?Math.min(r,o-n):r}(t))}function m(t){return a=void 0,f&&r?h(t):(r=i=void 0,s)}function v(){var t=Date.now(),n=y(t);if(r=arguments,i=this,c=t,n){if(void 0===a)return d(c);if(l)return a=setTimeout(g,e),h(c)}return void 0===a&&(a=setTimeout(g,e)),s}return e=parseFloat(e)||0,"[object Object]"===Object.prototype.toString.call(n)&&(p=!!n.leading,o=(l="maxWait"in n)?Math.max(parseFloat(n.maxWait)||0,e):o,f="trailing"in n?!!n.trailing:f),v.cancel=function(){void 0!==a&&clearTimeout(a),u=0,r=c=i=a=void 0},v.flush=function(){return void 0===a?s:m(Date.now())},v},r.prototype.stringify=function(t){return this.isObject(t)||this.isArray(t)?JSON.stringify(t):this.isString(t)?t:this.isNumber(t)||this.isInteger(t)||this.isBoolean(t)?t.toString():this.isNull(t)?"null":this.isUndefined(t)?"undefined":this.isDate(t)?t.toISOString():this.isError(t)?this.stringifyError(t):this.isNan(t)?"NaN":this.isDOMElement(t)&&t.innerText?t.innerText:this.isFunction(t)||this.isRegExp(t)||this.isBigInt(t)||this.isSymbol(t)?t.toString():""},r.prototype.destringify=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(!this.isString(e))return t;if("object"!=e&&"array"!=e)return"string"==e?t:"number"==e?parseFloat(t):"boolean"==e?"true"==t:"null"==e?null:"undefined"==e?void 0:"data"==e?new Date(t):"error"==e?this.objectifyError(t):"nan"==e?NaN:"regexp"==e?new RegExp(t):"bigint"==e?BigInt(t):"symbol"==e?Symbol(t):t;try{return JSON.parse(t)}catch(t){return"object"==e?{}:"array"==e?[]:{}}},r.prototype=Object.assign({},r.prototype,r.prototype,r.prototype,r.prototype),r.prototype.isEmpty=function(t){return this.isObject(t)?this.isEqual({},t):this.isArray(t)?0===t.length:!!this.isNull(t)||(!!this.isUndefined(t)||(this.isNumber(t)?this.isEqual(0,t):!!this.isNan(t)||(this.isString(t)?this.isEqual("",t):!!this.isBoolean(t)&&this.isEqual(!1,t))))},r.prototype.isNotEmpty=function(t){return!0!==this.isEmpty(t)},r.prototype.isEqual=function(t,e){if(t===e)return!0;if(null===t||null===e)return!1;var n=this.getType(t);if(n!=this.getType(e))return!1;switch(n){case"object":var r=Object.keys(t),i=Object.keys(e),o=r.length;if(o!==i.length)return!1;for(var s=0;s<o;s++){var a=r[s];if(-1===i.indexOf(a))return!1;if(!this.isEqual(t[a],e[a]))return!1}return!0;case"array":var c=t.length;if(c!==e.length)return!1;for(var u=0;u<c;u++)if(!this.isEqual(t[u],e[u]))return!1;return!0;case"error":var p=this.objectifyError(t),l=this.objectifyError(e);return this.isEqual(p,l);case"date":return t.getTime()===e.getTime();case"undefined":return!0;case"number":case"nan":case"string":case"boolean":case"domelement":return t===e;case"regexp":return t.toString()===e.toString();default:return!1}},r.prototype.isUUID=function(t){return this.regexes.uuid.test(t)},r.prototype.isEmail=function(t){return this.regexes.email.test(t)},r.prototype.isPhoneNum=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=this.isObject(n)&&n.hasOwnProperty("parsePhoneNumber")?n:this.isObject(window.libphonenumber)&&window.libphonenumber.hasOwnProperty("parsePhoneNumber")?window.libphonenumber:null;if(this.isNull(r))throw new Error("PHONE_NUM_LIB_NOT_FOUND");try{return r.parsePhoneNumber(t,e),!0}catch(t){return!1}},r.prototype.isURL=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("string"!=typeof t)return!1;var n={allowLocal:!1,allowDataUrl:!1,schemes:["http","https"]},r=e=Object.assign({},n,e),i=r.allowLocal,o=r.allowDataUrl,s=r.schemes,a="^(?:(?:"+s.join("|")+")://)(?:\\S+(?::\\S*)?@)?(?:",c="(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))";if(i?c+="?":a+="(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})",a+="(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*"+c+")(?::\\d{2,5})?(?:[/?#]\\S*)?$",o){var u="\\w+\\/[-+.\\w]+(?:;[\\w=]+)*",p="[A-Za-z0-9-_.!~\\*'();\\/?:@&=+$,%]*",l="data:(?:"+u+")?(?:;base64)?,"+p;a="(?:"+a+")|(?:^"+l+"$)"}var f=new RegExp(a,"i");return!!f.test(t)},r.prototype=Object.assign({},r.prototype,r.prototype,r.prototype,r.prototype),r.prototype.setDOMGlobal=function(t,e){if(-1!==["window","document"].indexOf(t)){return this["DOMGlobal"+(t.slice(0,1).toUpperCase()+t.slice(1))]=e,!0}},r.prototype.checkDOMGlobals=function(){for(var t=["window","document"],e="DOMGlobal",n=0;n<t.length;n++){var r=t[n],i=r.slice(0,1).toUpperCase()+r.slice(1);void 0===this[e+i]&&(this[e+i]="window"==r?window:"document"==r?document:void 0)}return!0},r.prototype.getDOMGlobals=function(){this.checkDOMGlobals();return{win:this.DOMGlobalWindow,doc:this.DOMGlobalDocument}},r.prototype.getViewportDimensions=function(){var t=this.getDOMGlobals(),e=t.win,n=t.doc,r=!("innerWidth"in e),i=r?e:n.documentElement||n.body,o=r?"inner":"client";return{width:i[o+"Width"],height:i[o+"Height"]}},r.prototype.getAbsoluteDistanceFromTop=function(e){return(((t=document.documentElement)||(t=document.body.parentNode))&&"number"==typeof t.scrollTop?t:document.body).scrollTop+e.getBoundingClientRect().top},r.prototype.getViewportRelativeDistanceFromTop=function(t){return t.getBoundingClientRect().top},r.prototype.getViewportRelativeDistanceFromBottom=function(t){var e=this.getViewportRelativeDistanceFromTop(t);return this.getViewportDimensions().height-e},r.prototype.getCaretPos=function(t){var e,n,r,i,o,s=0,a=0;return"number"==typeof t.selectionStart&&"number"==typeof t.selectionEnd?(s=t.selectionStart,a=t.selectionEnd):(n=document.selection.createRange())&&n.parentElement()==t&&(i=t.value.length,e=t.value.replace(/\r\n/g,"\n"),(r=t.createTextRange()).moveToBookmark(n.getBookmark()),(o=t.createTextRange()).collapse(!1),r.compareEndPoints("StartToEnd",o)>-1?s=a=i:(s=-r.moveStart("character",-i),s+=e.slice(0,s).split("\n").length-1,r.compareEndPoints("EndToEnd",o)>-1?a=i:(a=-r.moveEnd("character",-i),a+=e.slice(0,a).split("\n").length-1))),{start:s,end:a}},r.prototype.setCaretPos=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(this.isNull(n)&&(n=e),t.setSelectionRange)t.focus(),t.setSelectionRange(e,n);else if(t.createTextRange){var r=t.createTextRange();r.collapse(!0),r.moveEnd("character",n),r.moveStart("character",e),r.select()}},r.prototype.onDocumentClick=function(t){var e=this,n=e.getDOMGlobals();n.win;for(var r=n.doc,i=[],o=0;o<e.documentClickListenerRecipes.length;o++){var s=e.documentClickListenerRecipes[o];"SKIP_THIS_TIME"!=s.status?"outsideClick"==s.type&&function(){!0===e.getProp(s,["opts","once"])&&i.push(o),e.isFunction(s.elements)&&(s.elements=s.elements());var n=[];if(e.isArray(s.elements))s.elements.map((function(t){if(e.isString(t)){var i=r.querySelector(t);e.isDOMElement(i)&&n.push(i)}else e.isDOMElement(t)&&n.push(t)}));else if(e.isString(s.elements)){var a=r.querySelector(s.elements);e.isDOMElement(a)&&n.push(a)}else e.isDOMElement(s.elements)&&n.push(s.elements);var c=n.filter((function(e){return t.target==e||e.contains(t.target)}));(!c||c.length<1)&&s.fn()}():e.documentClickListenerRecipes[o].status="READY"}i.length>0&&(e.documentClickListenerRecipes=e.documentClickListenerRecipes.filter((function(t,e){return-1===i.indexOf(e)})))},r.prototype.onOutsideClick=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1?arguments[1]:void 0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{once:!0},r=this;r.hasOwnProperty("documentClickListenerRegistered")||(r.documentClickListenerRegistered=!1),r.hasOwnProperty("documentClickListenerRecipes")||(r.documentClickListenerRecipes=[]);var i=r.getDOMGlobals();i.win;var o=i.doc;return r.documentClickListenerRecipes.push({type:"outsideClick",status:!1===r.documentClickListenerRegistered?"READY":"SKIP_THIS_TIME",elements:t,fn:e,opts:n,id:r.getProp(n,"id","global")}),!1===r.documentClickListenerRegistered&&(r.documentClickListenerRegistered=!0,o.addEventListener("click",r.debounce(r.onDocumentClick.bind(r),300,{trailing:!0}),!1)),{remove:function(){r.removeOutsideClickListener(r.getProp(n,"id","global"))}}},r.prototype.removeOutsideClickListener=function(t){this.documentClickListenerRecipes=this.documentClickListenerRecipes.filter((function(e){return e.id!=t}))},r.prototype.onOutsideClick2=function(){};var i=new r,o=new r,s=new r,a=new r,c=new r,u=new r,p=new r,l=new r,f=new r;e.arraykit=u,e.domkit=f,e.errorkit=o,e.functionkit=p,e.hashkit=s,e.objectkit=c,e.stringkit=a,e.typekit=i,e.validationkit=l,Object.defineProperty(e,"__esModule",{value:!0})}));
