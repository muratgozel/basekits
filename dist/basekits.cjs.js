"use strict";function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(){}Object.defineProperty(exports,"__esModule",{value:!0}),r.prototype.regexes={uuid:/[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}/g,email:/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i},r.prototype.isString=function(t){return"string"==typeof t},r.prototype.isBoolean=function(t){return!0===t||!1===t},r.prototype.isNull=function(t){return null===t},r.prototype.isUndefined=function(t){return void 0===t},r.prototype.isNumber=function(t){return"number"==typeof t&&!0===Number.isFinite(t)},r.prototype.isInteger=function(t){return Number.isInteger(t)},r.prototype.isNan=function(t){return"number"==typeof t&&t!=+t},r.prototype.isObject=function(t){return"[object Object]"===Object.prototype.toString.call(t)},r.prototype.isArray=function(t){return Array.isArray(t)},r.prototype.isPromise=function(t){return Boolean(t&&"function"==typeof t.then)},r.prototype.isError=function(t){return t instanceof Error},r.prototype.isDate=function(t){return t instanceof Date},r.prototype.isFunction=function(t){return"function"==typeof t},r.prototype.isRegExp=function(t){return t instanceof RegExp},r.prototype.isBigInt=function(t){return"bigint"==typeof t},r.prototype.isSymbol=function(t){return"symbol"===e(t)},r.prototype.isDOMElement=function(t){return!(!t||!(t.nodeName||t.prop&&t.attr&&t.find))},r.prototype.getType=function(t){return this.isObject(t)?"object":this.isArray(t)?"array":this.isPromise(t)?"promise":this.isError(t)?"error":this.isDate(t)?"date":this.isNull(t)?"null":this.isUndefined(t)?"undefined":this.isFunction(t)?"function":this.isNumber(t)?"number":this.isNan(t)?"nan":this.isRegExp(t)?"regexp":this.isString(t)?"string":this.isBoolean(t)?"boolean":this.isBigInt(t)?"bigint":this.isSymbol(t)?"symbol":this.isDOMElement(t)?"domelement":"none"},r.prototype.objectifyError=function(t){var e=JSON.stringify(t,Object.getOwnPropertyNames(t)),r=JSON.parse(e);return r.stack=r.stack.split(/[\n]/g),r},r.prototype.stringifyError=function(t){return JSON.stringify(this.objectifyError(t))},r.prototype.hashcode=function(t){var e=0;if("string"!=typeof t)return e;for(var r=0;r<t.length;r++){e=(e<<5)-e+t.charCodeAt(r),e&=e}return e};var n=r;r.prototype=Object.assign({},r.prototype,r.prototype),r.prototype.sprintf=function(t,e){if("number"==typeof e&&(e=e.toString()),"string"==typeof e&&e.length>0&&(e=[e]),!Array.isArray(e))return t;var r=/(%s)/;if(!r.test(t))return t;return function t(n){if(0!==e.length&&r.test(n)){var i=n.replace(r,e[0]);return e.shift(),t(i)}return n}(t)},r.prototype.template=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(this.isString(t)){var r=/({{)[^{}]+(}})/gm,n=t.match(r);return n&&0!==n.length&&this.isObject(e)?n.reduce((function(t,r){var n=r.slice(2,-2);return e.hasOwnProperty(n)&&(t=t.replace(r,e[n])),t}),t):t}},r.prototype.uppercase=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;if(this.isString(t)){var r="string"==typeof e?e.replace("_","-"):e;return t.toLocaleUpperCase(r)}},r.prototype.lowercase=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;if(this.isString(t)){var r="string"==typeof e?e.replace("_","-"):e;return t.toLocaleLowerCase(r)}},r.prototype.sentencecase=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];if(this.isString(t)){for(var n="",i=t.split(" "),o=i.length,s=0;s<o;s++){var a=i[s],u=s+1!==o?" ":"";-1!==r.indexOf(a)?n+=a+u:n+=0===s?this.uppercase(a.slice(0,1),e)+this.lowercase(a.slice(1))+u:a+u}return n}},r.prototype.titlecase=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];if(this.isString(t)){for(var n="",i=t.split(" "),o=i.length,s=0;s<o;s++){var a=i[s],u=s+1!==o?" ":"";-1!==r.indexOf(a)?n+=a+u:n+=this.uppercase(a.slice(0,1),e)+this.lowercase(a.slice(1),e)+u}return n}},r.prototype=Object.assign({},r.prototype,r.prototype),r.prototype.flatten=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:".",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],n=this;if(n.isObject(t))return Object.keys(t).reduce((function(i,o){return n.isObject(t[o])?i=Object.assign({},i,n.flatten(t[o],e,r.concat([o]))):i[r.concat([o]).join(e)]=t[o],i}),{})},r.prototype.getProp=function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;if(!this.isObject(t))return r;if(this.isString(e))e=[e];else if(!this.isArray(e))return r;if(e.length<1)return r;for(var n=0,i=e.length;this.isObject(t)&&n<i;)t=t[e[n]],n+=1;return this.isUndefined(t)?r:t},r.prototype.removeProp=function(t,e){if(this.isObject(t)){var r=Object.keys(t);return-1===r.indexOf(e)?t:r.reduce((function(r,n){return n!=e&&(r[n]=t[n]),r}),{})}},r.prototype=Object.assign({},r.prototype,r.prototype,r.prototype),r.prototype.removeDuplicates=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=this;return e?t.filter((function(e,n){var i=t.map((function(t,n){return!!(r.hasOwnProperty("isEqual")?r.isEqual(t,e):t===e)&&n})).filter((function(t){return!1!==t}));return!!r.isArray(i)&&i[0]===n})):t.filter((function(e,r){return t.indexOf(e)===r}))},r.prototype.sortItemsBy=function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"asc",n=null;if(this.isArray(e))n="__"+e.join("_"),t=t.map(function(t){return t[n]=this.getProp(t,e),t}.bind(this));else{if(!this.isString(e))return t;n=e}return t.sort((function(t,e){var i=t[n],o=e[n];return"desc"==r?i>o?-1:o>i?1:0:(r="asc",i>o?1:o>i?-1:0)}))},r.prototype=Object.assign({},r.prototype,r.prototype,r.prototype),r.prototype.stringifyURLObject=function(t){return t.protocol+"//"+(t.username&&t.password?t.username+":"+t.password+"@":"")+t.hostname+(80!=t.port?":"+t.port:"")+("string"==typeof t.pathname?t.pathname:"")},r.prototype.waitForIt=function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:300,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1e4,i=setInterval((function(){!0===t.call()&&(clearInterval(i),e.call())}),r);setTimeout((function(){i&&(clearInterval(i),e.call(null,!1))}),n)},r.prototype.throttle=function(t,e,r){var n=!0,i=!0;if("function"!=typeof t)throw new TypeError("Invalid debounce function.");return"[object Object]"===Object.prototype.toString.call(r)&&(n="leading"in r?!!r.leading:n,i="trailing"in r?!!r.trailing:i),this.debounce(t,e,{leading:n,maxWait:e,trailing:i})},r.prototype.debounce=function(t,e,r){var n,i,o,s,a,u,c=0,p=!1,l=!1,f=!0;if("function"!=typeof t)throw new TypeError("Invalid debounce function.");function h(e){var r=n,o=i;return n=i=void 0,c=e,s=t.apply(o,r)}function d(t){return c=t,a=setTimeout(g,e),p?h(t):s}function y(t){var r=t-u;return void 0===u||r>=e||r<0||l&&t-c>=o}function g(){var t=Date.now();if(y(t))return m(t);a=setTimeout(g,function(t){var r=t-c,n=e-(t-u);return l?Math.min(n,o-r):n}(t))}function m(t){return a=void 0,f&&n?h(t):(n=i=void 0,s)}function v(){var t=Date.now(),r=y(t);if(n=arguments,i=this,u=t,r){if(void 0===a)return d(u);if(l)return a=setTimeout(g,e),h(u)}return void 0===a&&(a=setTimeout(g,e)),s}return e=parseFloat(e)||0,"[object Object]"===Object.prototype.toString.call(r)&&(p=!!r.leading,o=(l="maxWait"in r)?Math.max(parseFloat(r.maxWait)||0,e):o,f="trailing"in r?!!r.trailing:f),v.cancel=function(){void 0!==a&&clearTimeout(a),c=0,n=u=i=a=void 0},v.flush=function(){return void 0===a?s:m(Date.now())},v},r.prototype.stringify=function(t){return this.isObject(t)||this.isArray(t)?JSON.stringify(t):this.isString(t)?t:this.isNumber(t)||this.isInteger(t)||this.isBoolean(t)?t.toString():this.isNull(t)?"null":this.isUndefined(t)?"undefined":this.isDate(t)?t.toISOString():this.isError(t)?this.stringifyError(t):this.isNan(t)?"NaN":this.isDOMElement(t)&&t.innerText?t.innerText:this.isFunction(t)||this.isRegExp(t)||this.isBigInt(t)||this.isSymbol(t)?t.toString():""},r.prototype.destringify=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(!this.isString(e))return t;if("object"!=e&&"array"!=e)return"string"==e?t:"number"==e?parseFloat(t):"boolean"==e?"true"==t:"null"==e?null:"undefined"==e?void 0:"data"==e?new Date(t):"error"==e?this.objectifyError(t):"nan"==e?NaN:"regexp"==e?new RegExp(t):"bigint"==e?BigInt(t):"symbol"==e?Symbol(t):t;try{return JSON.parse(t)}catch(t){return"object"==e?{}:"array"==e?[]:{}}},r.prototype=Object.assign({},r.prototype,r.prototype,r.prototype,r.prototype),r.prototype.isEmpty=function(t){return this.isObject(t)?this.isEqual({},t):this.isArray(t)?0===t.length:!!this.isNull(t)||(!!this.isUndefined(t)||(this.isNumber(t)?this.isEqual(0,t):!!this.isNan(t)||(this.isString(t)?this.isEqual("",t):!!this.isBoolean(t)&&this.isEqual(!1,t))))},r.prototype.isNotEmpty=function(t){return!0!==this.isEmpty(t)},r.prototype.isEqual=function(t,e){if(t===e)return!0;if(null===t||null===e)return!1;var r=this.getType(t);if(r!=this.getType(e))return!1;switch(r){case"object":var n=Object.keys(t),i=Object.keys(e),o=n.length;if(o!==i.length)return!1;for(var s=0;s<o;s++){var a=n[s];if(-1===i.indexOf(a))return!1;if(!this.isEqual(t[a],e[a]))return!1}return!0;case"array":var u=t.length;if(u!==e.length)return!1;for(var c=0;c<u;c++)if(!this.isEqual(t[c],e[c]))return!1;return!0;case"error":var p=this.objectifyError(t),l=this.objectifyError(e);return this.isEqual(p,l);case"date":return t.getTime()===e.getTime();case"undefined":return!0;case"number":case"nan":case"string":case"boolean":case"domelement":return t===e;case"regexp":return t.toString()===e.toString();default:return!1}},r.prototype.isUUID=function(t){return this.regexes.uuid.test(t)},r.prototype.isEmail=function(t){return this.regexes.email.test(t)},r.prototype.isPhoneNum=function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=this.isObject(r)&&r.hasOwnProperty("parsePhoneNumber")?r:this.isObject(window.libphonenumber)&&window.libphonenumber.hasOwnProperty("parsePhoneNumber")?window.libphonenumber:null;if(this.isNull(n))throw new Error("PHONE_NUM_LIB_NOT_FOUND");try{return n.parsePhoneNumber(t,e),!0}catch(t){return!1}},r.prototype.isURL=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("string"!=typeof t)return!1;var r={allowLocal:!1,allowDataUrl:!1,schemes:["http","https"]},n=e=Object.assign({},r,e),i=n.allowLocal,o=n.allowDataUrl,s=n.schemes,a="^(?:(?:"+s.join("|")+")://)(?:\\S+(?::\\S*)?@)?(?:",u="(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))";if(i?u+="?":a+="(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})",a+="(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*"+u+")(?::\\d{2,5})?(?:[/?#]\\S*)?$",o){var c="\\w+\\/[-+.\\w]+(?:;[\\w=]+)*",p="[A-Za-z0-9-_.!~\\*'();\\/?:@&=+$,%]*",l="data:(?:"+c+")?(?:;base64)?,"+p;a="(?:"+a+")|(?:^"+l+"$)"}var f=new RegExp(a,"i");return!!f.test(t)},r.prototype=Object.assign({},r.prototype,r.prototype,r.prototype,r.prototype),r.prototype.setDOMGlobal=function(t,e){if(-1!==["window","document"].indexOf(t)){return this["DOMGlobal"+(t.slice(0,1).toUpperCase()+t.slice(1))]=e,!0}},r.prototype.checkDOMGlobals=function(){for(var t=["window","document"],e="DOMGlobal",r=0;r<t.length;r++){var n=t[r],i=n.slice(0,1).toUpperCase()+n.slice(1);void 0===this[e+i]&&(this[e+i]="window"==n?window:"document"==n?document:void 0)}return!0},r.prototype.getDOMGlobals=function(){this.checkDOMGlobals();return{win:this.DOMGlobalWindow,doc:this.DOMGlobalDocument}},r.prototype.getViewportDimensions=function(){var t=this.getDOMGlobals(),e=t.win,r=t.doc,n=!("innerWidth"in e),i=n?e:r.documentElement||r.body,o=n?"inner":"client";return{width:i[o+"Width"],height:i[o+"Height"]}},r.prototype.getAbsoluteDistanceFromTop=function(e){return(((t=document.documentElement)||(t=document.body.parentNode))&&"number"==typeof t.scrollTop?t:document.body).scrollTop+e.getBoundingClientRect().top},r.prototype.getViewportRelativeDistanceFromTop=function(t){return t.getBoundingClientRect().top},r.prototype.getViewportRelativeDistanceFromBottom=function(t){var e=this.getViewportRelativeDistanceFromTop(t);return this.getViewportDimensions().height-e},r.prototype.getCaretPos=function(t){var e,r,n,i,o,s=0,a=0;return"number"==typeof t.selectionStart&&"number"==typeof t.selectionEnd?(s=t.selectionStart,a=t.selectionEnd):(r=document.selection.createRange())&&r.parentElement()==t&&(i=t.value.length,e=t.value.replace(/\r\n/g,"\n"),(n=t.createTextRange()).moveToBookmark(r.getBookmark()),(o=t.createTextRange()).collapse(!1),n.compareEndPoints("StartToEnd",o)>-1?s=a=i:(s=-n.moveStart("character",-i),s+=e.slice(0,s).split("\n").length-1,n.compareEndPoints("EndToEnd",o)>-1?a=i:(a=-n.moveEnd("character",-i),a+=e.slice(0,a).split("\n").length-1))),{start:s,end:a}},r.prototype.setCaretPos=function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(this.isNull(r)&&(r=e),t.setSelectionRange)t.focus(),t.setSelectionRange(e,r);else if(t.createTextRange){var n=t.createTextRange();n.collapse(!0),n.moveEnd("character",r),n.moveStart("character",e),n.select()}},r.prototype.onDocumentClick=function(t){for(var e=this,r=e.getDOMGlobals(),n=(r.win,r.doc),i=[],o=0;o<e.documentClickListenerRecipes.length;o++){var s=e.documentClickListenerRecipes[o];"outsideClick"==s.type&&function(){!0===e.getProp(s,["opts","once"])&&i.push(o),e.isFunction(s.elements)&&(s.elements=s.elements());var r=[];if(e.isArray(s.elements))s.elements.map((function(t){if(e.isString(t)){var i=n.querySelector(t);e.isDOMElement(i)&&r.push(i)}else e.isDOMElement(t)&&r.push(t)}));else if(e.isString(s.elements)){var a=n.querySelector(s.elements);e.isDOMElement(a)&&r.push(a)}else e.isDOMElement(s.elements)&&r.push(s.elements);var u=r.filter((function(e){return t.target==e||e.contains(t.target)}));(!u||u.length<1)&&s.fn()}()}i.length>0&&(e.documentClickListenerRecipes=e.documentClickListenerRecipes.filter((function(t,e){return-1===i.indexOf(e)})))},r.prototype.onOutsideClick=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1?arguments[1]:void 0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{once:!0},n=this;n.hasOwnProperty("documentClickListenerRegistered")||(n.documentClickListenerRegistered=!1),n.hasOwnProperty("documentClickListenerRecipes")||(n.documentClickListenerRecipes=[]);var i=n.getDOMGlobals(),o=(i.win,i.doc);return n.documentClickListenerRecipes.push({type:"outsideClick",active:!0,elements:t,fn:e,opts:r,id:n.getProp(r,"id","global")}),!1===n.documentClickListenerRegistered&&(n.documentClickListenerRegistered=!0,o.addEventListener("click",n.debounce(n.onDocumentClick,300,{trailing:!0}),!1)),{remove:function(){n.removeOutsideClickListener(n.getProp(r,"id","global"))}}},r.prototype.removeOutsideClickListener=function(t){self.documentClickListenerRecipes=self.documentClickListenerRecipes.filter((function(e){return e.id!=t}))};var i=new r,o=new r,s=new n,a=new r,u=new r,c=new r,p=new r,l=new r,f=new r;exports.arraykit=c,exports.domkit=f,exports.errorkit=o,exports.functionkit=p,exports.hashkit=s,exports.objectkit=u,exports.stringkit=a,exports.typekit=i,exports.validationkit=l;
