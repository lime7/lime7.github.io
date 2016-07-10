!function(t,e){var n=0,i=Array.prototype.slice,r=t.cleanData;t.cleanData=function(e){for(var n,i=0;null!=(n=e[i]);i++)try{t(n).triggerHandler("remove")}catch(o){}r(e)},t.widget=function(n,i,r){var o,s,a,u,c={},l=n.split(".")[0];n=n.split(".")[1],o=l+"-"+n,r||(r=i,i=t.Widget),t.expr[":"][o.toLowerCase()]=function(e){return!!t.data(e,o)},t[l]=t[l]||{},s=t[l][n],a=t[l][n]=function(t,n){return this._createWidget?(arguments.length&&this._createWidget(t,n),e):new a(t,n)},t.extend(a,s,{version:r.version,_proto:t.extend({},r),_childConstructors:[]}),u=new i,u.options=t.widget.extend({},u.options),t.each(r,function(n,r){return t.isFunction(r)?(c[n]=function(){var t=function(){return i.prototype[n].apply(this,arguments)},e=function(t){return i.prototype[n].apply(this,t)};return function(){var n,i=this._super,o=this._superApply;return this._super=t,this._superApply=e,n=r.apply(this,arguments),this._super=i,this._superApply=o,n}}(),e):(c[n]=r,e)}),a.prototype=t.widget.extend(u,{widgetEventPrefix:s?u.widgetEventPrefix:n},c,{constructor:a,namespace:l,widgetName:n,widgetFullName:o}),s?(t.each(s._childConstructors,function(e,n){var i=n.prototype;t.widget(i.namespace+"."+i.widgetName,a,n._proto)}),delete s._childConstructors):i._childConstructors.push(a),t.widget.bridge(n,a)},t.widget.extend=function(n){for(var r,o,s=i.call(arguments,1),a=0,u=s.length;u>a;a++)for(r in s[a])o=s[a][r],s[a].hasOwnProperty(r)&&o!==e&&(n[r]=t.isPlainObject(o)?t.isPlainObject(n[r])?t.widget.extend({},n[r],o):t.widget.extend({},o):o);return n},t.widget.bridge=function(n,r){var o=r.prototype.widgetFullName||n;t.fn[n]=function(s){var a="string"==typeof s,u=i.call(arguments,1),c=this;return s=!a&&u.length?t.widget.extend.apply(null,[s].concat(u)):s,a?this.each(function(){var i,r=t.data(this,o);return r?t.isFunction(r[s])&&"_"!==s.charAt(0)?(i=r[s].apply(r,u),i!==r&&i!==e?(c=i&&i.jquery?c.pushStack(i.get()):i,!1):e):t.error("no such method '"+s+"' for "+n+" widget instance"):t.error("cannot call methods on "+n+" prior to initialization; attempted to call method '"+s+"'")}):this.each(function(){var e=t.data(this,o);e?e.option(s||{})._init():t.data(this,o,new r(s,this))}),c}},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(e,i){i=t(i||this.defaultElement||this)[0],this.element=t(i),this.uuid=n++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=t.widget.extend({},this.options,this._getCreateOptions(),e),this.bindings=t(),this.hoverable=t(),this.focusable=t(),i!==this&&(t.data(i,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===i&&this.destroy()}}),this.document=t(i.style?i.ownerDocument:i.document||i),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:t.noop,_getCreateEventData:t.noop,_create:t.noop,_init:t.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:t.noop,widget:function(){return this.element},option:function(n,i){var r,o,s,a=n;if(0===arguments.length)return t.widget.extend({},this.options);if("string"==typeof n)if(a={},r=n.split("."),n=r.shift(),r.length){for(o=a[n]=t.widget.extend({},this.options[n]),s=0;r.length-1>s;s++)o[r[s]]=o[r[s]]||{},o=o[r[s]];if(n=r.pop(),i===e)return o[n]===e?null:o[n];o[n]=i}else{if(i===e)return this.options[n]===e?null:this.options[n];a[n]=i}return this._setOptions(a),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return this.options[t]=e,"disabled"===t&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!e).attr("aria-disabled",e),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(n,i,r){var o,s=this;"boolean"!=typeof n&&(r=i,i=n,n=!1),r?(i=o=t(i),this.bindings=this.bindings.add(i)):(r=i,i=this.element,o=this.widget()),t.each(r,function(r,a){function u(){return n||s.options.disabled!==!0&&!t(this).hasClass("ui-state-disabled")?("string"==typeof a?s[a]:a).apply(s,arguments):e}"string"!=typeof a&&(u.guid=a.guid=a.guid||u.guid||t.guid++);var c=r.match(/^(\w+)\s*(.*)$/),l=c[1]+s.eventNamespace,f=c[2];f?o.delegate(f,l,u):i.bind(l,u)})},_off:function(t,e){e=(e||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.unbind(e).undelegate(e)},_delay:function(t,e){function n(){return("string"==typeof t?i[t]:t).apply(i,arguments)}var i=this;return setTimeout(n,e||0)},_hoverable:function(e){this.hoverable=this.hoverable.add(e),this._on(e,{mouseenter:function(e){t(e.currentTarget).addClass("ui-state-hover")},mouseleave:function(e){t(e.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e),this._on(e,{focusin:function(e){t(e.currentTarget).addClass("ui-state-focus")},focusout:function(e){t(e.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(e,n,i){var r,o,s=this.options[e];if(i=i||{},n=t.Event(n),n.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),n.target=this.element[0],o=n.originalEvent)for(r in o)r in n||(n[r]=o[r]);return this.element.trigger(n,i),!(t.isFunction(s)&&s.apply(this.element[0],[n].concat(i))===!1||n.isDefaultPrevented())}},t.each({show:"fadeIn",hide:"fadeOut"},function(e,n){t.Widget.prototype["_"+e]=function(i,r,o){"string"==typeof r&&(r={effect:r});var s,a=r?r===!0||"number"==typeof r?n:r.effect||n:e;r=r||{},"number"==typeof r&&(r={duration:r}),s=!t.isEmptyObject(r),r.complete=o,r.delay&&i.delay(r.delay),s&&t.effects&&t.effects.effect[a]?i[e](r):a!==e&&i[a]?i[a](r.duration,r.easing,o):i.queue(function(n){t(this)[e](),o&&o.call(i[0]),n()})}})}(jQuery),function(t,e){var n="ui-effects-";t.effects={effect:{}},function(t,e){function n(t,e,n){var i=f[e.type]||{};return null==t?n||!e.def?null:e.def:(t=i.floor?~~t:parseFloat(t),isNaN(t)?e.def:i.mod?(t+i.mod)%i.mod:0>t?0:t>i.max?i.max:t)}function i(n){var i=c(),r=i._rgba=[];return n=n.toLowerCase(),p(u,function(t,o){var s,a=o.re.exec(n),u=a&&o.parse(a),c=o.space||"rgba";return u?(s=i[c](u),i[l[c].cache]=s[l[c].cache],r=i._rgba=s._rgba,!1):e}),r.length?("0,0,0,0"===r.join()&&t.extend(r,o.transparent),i):o[n]}function r(t,e,n){return n=(n+1)%1,1>6*n?t+6*(e-t)*n:1>2*n?e:2>3*n?t+6*(e-t)*(2/3-n):t}var o,s="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",a=/^([\-+])=\s*(\d+\.?\d*)/,u=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[t[1],t[2],t[3],t[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[2.55*t[1],2.55*t[2],2.55*t[3],t[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(t){return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(t){return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(t){return[t[1],t[2]/100,t[3]/100,t[4]]}}],c=t.Color=function(e,n,i,r){return new t.Color.fn.parse(e,n,i,r)},l={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},f={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},d=c.support={},h=t("<p>")[0],p=t.each;h.style.cssText="background-color:rgba(1,1,1,.5)",d.rgba=h.style.backgroundColor.indexOf("rgba")>-1,p(l,function(t,e){e.cache="_"+t,e.props.alpha={idx:3,type:"percent",def:1}}),c.fn=t.extend(c.prototype,{parse:function(r,s,a,u){if(r===e)return this._rgba=[null,null,null,null],this;(r.jquery||r.nodeType)&&(r=t(r).css(s),s=e);var f=this,d=t.type(r),h=this._rgba=[];return s!==e&&(r=[r,s,a,u],d="array"),"string"===d?this.parse(i(r)||o._default):"array"===d?(p(l.rgba.props,function(t,e){h[e.idx]=n(r[e.idx],e)}),this):"object"===d?(r instanceof c?p(l,function(t,e){r[e.cache]&&(f[e.cache]=r[e.cache].slice())}):p(l,function(e,i){var o=i.cache;p(i.props,function(t,e){if(!f[o]&&i.to){if("alpha"===t||null==r[t])return;f[o]=i.to(f._rgba)}f[o][e.idx]=n(r[t],e,!0)}),f[o]&&0>t.inArray(null,f[o].slice(0,3))&&(f[o][3]=1,i.from&&(f._rgba=i.from(f[o])))}),this):e},is:function(t){var n=c(t),i=!0,r=this;return p(l,function(t,o){var s,a=n[o.cache];return a&&(s=r[o.cache]||o.to&&o.to(r._rgba)||[],p(o.props,function(t,n){return null!=a[n.idx]?i=a[n.idx]===s[n.idx]:e})),i}),i},_space:function(){var t=[],e=this;return p(l,function(n,i){e[i.cache]&&t.push(n)}),t.pop()},transition:function(t,e){var i=c(t),r=i._space(),o=l[r],s=0===this.alpha()?c("transparent"):this,a=s[o.cache]||o.to(s._rgba),u=a.slice();return i=i[o.cache],p(o.props,function(t,r){var o=r.idx,s=a[o],c=i[o],l=f[r.type]||{};null!==c&&(null===s?u[o]=c:(l.mod&&(c-s>l.mod/2?s+=l.mod:s-c>l.mod/2&&(s-=l.mod)),u[o]=n((c-s)*e+s,r)))}),this[r](u)},blend:function(e){if(1===this._rgba[3])return this;var n=this._rgba.slice(),i=n.pop(),r=c(e)._rgba;return c(t.map(n,function(t,e){return(1-i)*r[e]+i*t}))},toRgbaString:function(){var e="rgba(",n=t.map(this._rgba,function(t,e){return null==t?e>2?1:0:t});return 1===n[3]&&(n.pop(),e="rgb("),e+n.join()+")"},toHslaString:function(){var e="hsla(",n=t.map(this.hsla(),function(t,e){return null==t&&(t=e>2?1:0),e&&3>e&&(t=Math.round(100*t)+"%"),t});return 1===n[3]&&(n.pop(),e="hsl("),e+n.join()+")"},toHexString:function(e){var n=this._rgba.slice(),i=n.pop();return e&&n.push(~~(255*i)),"#"+t.map(n,function(t){return t=(t||0).toString(16),1===t.length?"0"+t:t}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),c.fn.parse.prototype=c.fn,l.hsla.to=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e,n,i=t[0]/255,r=t[1]/255,o=t[2]/255,s=t[3],a=Math.max(i,r,o),u=Math.min(i,r,o),c=a-u,l=a+u,f=.5*l;return e=u===a?0:i===a?60*(r-o)/c+360:r===a?60*(o-i)/c+120:60*(i-r)/c+240,n=0===c?0:.5>=f?c/l:c/(2-l),[Math.round(e)%360,n,f,null==s?1:s]},l.hsla.from=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e=t[0]/360,n=t[1],i=t[2],o=t[3],s=.5>=i?i*(1+n):i+n-i*n,a=2*i-s;return[Math.round(255*r(a,s,e+1/3)),Math.round(255*r(a,s,e)),Math.round(255*r(a,s,e-1/3)),o]},p(l,function(i,r){var o=r.props,s=r.cache,u=r.to,l=r.from;c.fn[i]=function(i){if(u&&!this[s]&&(this[s]=u(this._rgba)),i===e)return this[s].slice();var r,a=t.type(i),f="array"===a||"object"===a?i:arguments,d=this[s].slice();return p(o,function(t,e){var i=f["object"===a?t:e.idx];null==i&&(i=d[e.idx]),d[e.idx]=n(i,e)}),l?(r=c(l(d)),r[s]=d,r):c(d)},p(o,function(e,n){c.fn[e]||(c.fn[e]=function(r){var o,s=t.type(r),u="alpha"===e?this._hsla?"hsla":"rgba":i,c=this[u](),l=c[n.idx];return"undefined"===s?l:("function"===s&&(r=r.call(this,l),s=t.type(r)),null==r&&n.empty?this:("string"===s&&(o=a.exec(r),o&&(r=l+parseFloat(o[2])*("+"===o[1]?1:-1))),c[n.idx]=r,this[u](c)))})})}),c.hook=function(e){var n=e.split(" ");p(n,function(e,n){t.cssHooks[n]={set:function(e,r){var o,s,a="";if("transparent"!==r&&("string"!==t.type(r)||(o=i(r)))){if(r=c(o||r),!d.rgba&&1!==r._rgba[3]){for(s="backgroundColor"===n?e.parentNode:e;(""===a||"transparent"===a)&&s&&s.style;)try{a=t.css(s,"backgroundColor"),s=s.parentNode}catch(u){}r=r.blend(a&&"transparent"!==a?a:"_default")}r=r.toRgbaString()}try{e.style[n]=r}catch(u){}}},t.fx.step[n]=function(e){e.colorInit||(e.start=c(e.elem,n),e.end=c(e.end),e.colorInit=!0),t.cssHooks[n].set(e.elem,e.start.transition(e.end,e.pos))}})},c.hook(s),t.cssHooks.borderColor={expand:function(t){var e={};return p(["Top","Right","Bottom","Left"],function(n,i){e["border"+i+"Color"]=t}),e}},o=t.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(jQuery),function(){function n(e){var n,i,r=e.ownerDocument.defaultView?e.ownerDocument.defaultView.getComputedStyle(e,null):e.currentStyle,o={};if(r&&r.length&&r[0]&&r[r[0]])for(i=r.length;i--;)n=r[i],"string"==typeof r[n]&&(o[t.camelCase(n)]=r[n]);else for(n in r)"string"==typeof r[n]&&(o[n]=r[n]);return o}function i(e,n){var i,r,s={};for(i in n)r=n[i],e[i]!==r&&(o[i]||(t.fx.step[i]||!isNaN(parseFloat(r)))&&(s[i]=r));return s}var r=["add","remove","toggle"],o={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};t.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(e,n){t.fx.step[n]=function(t){("none"!==t.end&&!t.setAttr||1===t.pos&&!t.setAttr)&&(jQuery.style(t.elem,n,t.end),t.setAttr=!0)}}),t.fn.addBack||(t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),t.effects.animateClass=function(e,o,s,a){var u=t.speed(o,s,a);return this.queue(function(){var o,s=t(this),a=s.attr("class")||"",c=u.children?s.find("*").addBack():s;c=c.map(function(){var e=t(this);return{el:e,start:n(this)}}),o=function(){t.each(r,function(t,n){e[n]&&s[n+"Class"](e[n])})},o(),c=c.map(function(){return this.end=n(this.el[0]),this.diff=i(this.start,this.end),this}),s.attr("class",a),c=c.map(function(){var e=this,n=t.Deferred(),i=t.extend({},u,{queue:!1,complete:function(){n.resolve(e)}});return this.el.animate(this.diff,i),n.promise()}),t.when.apply(t,c.get()).done(function(){o(),t.each(arguments,function(){var e=this.el;t.each(this.diff,function(t){e.css(t,"")})}),u.complete.call(s[0])})})},t.fn.extend({addClass:function(e){return function(n,i,r,o){return i?t.effects.animateClass.call(this,{add:n},i,r,o):e.apply(this,arguments)}}(t.fn.addClass),removeClass:function(e){return function(n,i,r,o){return arguments.length>1?t.effects.animateClass.call(this,{remove:n},i,r,o):e.apply(this,arguments)}}(t.fn.removeClass),toggleClass:function(n){return function(i,r,o,s,a){return"boolean"==typeof r||r===e?o?t.effects.animateClass.call(this,r?{add:i}:{remove:i},o,s,a):n.apply(this,arguments):t.effects.animateClass.call(this,{toggle:i},r,o,s)}}(t.fn.toggleClass),switchClass:function(e,n,i,r,o){return t.effects.animateClass.call(this,{add:n,remove:e},i,r,o)}})}(),function(){function i(e,n,i,r){return t.isPlainObject(e)&&(n=e,e=e.effect),e={effect:e},null==n&&(n={}),t.isFunction(n)&&(r=n,i=null,n={}),("number"==typeof n||t.fx.speeds[n])&&(r=i,i=n,n={}),t.isFunction(i)&&(r=i,i=null),n&&t.extend(e,n),i=i||n.duration,e.duration=t.fx.off?0:"number"==typeof i?i:i in t.fx.speeds?t.fx.speeds[i]:t.fx.speeds._default,e.complete=r||n.complete,e}function r(e){return!(e&&"number"!=typeof e&&!t.fx.speeds[e])||("string"==typeof e&&!t.effects.effect[e]||(!!t.isFunction(e)||"object"==typeof e&&!e.effect))}t.extend(t.effects,{version:"1.10.3",save:function(t,e){for(var i=0;e.length>i;i++)null!==e[i]&&t.data(n+e[i],t[0].style[e[i]])},restore:function(t,i){var r,o;for(o=0;i.length>o;o++)null!==i[o]&&(r=t.data(n+i[o]),r===e&&(r=""),t.css(i[o],r))},setMode:function(t,e){return"toggle"===e&&(e=t.is(":hidden")?"show":"hide"),e},getBaseline:function(t,e){var n,i;switch(t[0]){case"top":n=0;break;case"middle":n=.5;break;case"bottom":n=1;break;default:n=t[0]/e.height}switch(t[1]){case"left":i=0;break;case"center":i=.5;break;case"right":i=1;break;default:i=t[1]/e.width}return{x:i,y:n}},createWrapper:function(e){if(e.parent().is(".ui-effects-wrapper"))return e.parent();var n={width:e.outerWidth(!0),height:e.outerHeight(!0),"float":e.css("float")},i=t("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),r={width:e.width(),height:e.height()},o=document.activeElement;try{o.id}catch(s){o=document.body}return e.wrap(i),(e[0]===o||t.contains(e[0],o))&&t(o).focus(),i=e.parent(),"static"===e.css("position")?(i.css({position:"relative"}),e.css({position:"relative"})):(t.extend(n,{position:e.css("position"),zIndex:e.css("z-index")}),t.each(["top","left","bottom","right"],function(t,i){n[i]=e.css(i),isNaN(parseInt(n[i],10))&&(n[i]="auto")}),e.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),e.css(r),i.css(n).show()},removeWrapper:function(e){var n=document.activeElement;return e.parent().is(".ui-effects-wrapper")&&(e.parent().replaceWith(e),(e[0]===n||t.contains(e[0],n))&&t(n).focus()),e},setTransition:function(e,n,i,r){return r=r||{},t.each(n,function(t,n){var o=e.cssUnit(n);o[0]>0&&(r[n]=o[0]*i+o[1])}),r}}),t.fn.extend({effect:function(){function e(e){function i(){t.isFunction(o)&&o.call(r[0]),t.isFunction(e)&&e()}var r=t(this),o=n.complete,a=n.mode;(r.is(":hidden")?"hide"===a:"show"===a)?(r[a](),i()):s.call(r[0],n,i)}var n=i.apply(this,arguments),r=n.mode,o=n.queue,s=t.effects.effect[n.effect];return t.fx.off||!s?r?this[r](n.duration,n.complete):this.each(function(){n.complete&&n.complete.call(this)}):o===!1?this.each(e):this.queue(o||"fx",e)},show:function(t){return function(e){if(r(e))return t.apply(this,arguments);var n=i.apply(this,arguments);return n.mode="show",this.effect.call(this,n)}}(t.fn.show),hide:function(t){return function(e){if(r(e))return t.apply(this,arguments);var n=i.apply(this,arguments);return n.mode="hide",this.effect.call(this,n)}}(t.fn.hide),toggle:function(t){return function(e){if(r(e)||"boolean"==typeof e)return t.apply(this,arguments);var n=i.apply(this,arguments);return n.mode="toggle",this.effect.call(this,n)}}(t.fn.toggle),cssUnit:function(e){var n=this.css(e),i=[];return t.each(["em","px","%","pt"],function(t,e){n.indexOf(e)>0&&(i=[parseFloat(n),e])}),i}})}(),function(){var e={};t.each(["Quad","Cubic","Quart","Quint","Expo"],function(t,n){e[n]=function(e){return Math.pow(e,t+2)}}),t.extend(e,{Sine:function(t){return 1-Math.cos(t*Math.PI/2)},Circ:function(t){return 1-Math.sqrt(1-t*t)},Elastic:function(t){return 0===t||1===t?t:-Math.pow(2,8*(t-1))*Math.sin((80*(t-1)-7.5)*Math.PI/15)},Back:function(t){return t*t*(3*t-2)},Bounce:function(t){for(var e,n=4;((e=Math.pow(2,--n))-1)/11>t;);return 1/Math.pow(4,3-n)-7.5625*Math.pow((3*e-2)/22-t,2)}}),t.each(e,function(e,n){t.easing["easeIn"+e]=n,t.easing["easeOut"+e]=function(t){return 1-n(1-t)},t.easing["easeInOut"+e]=function(t){return.5>t?n(2*t)/2:1-n(-2*t+2)/2}})}()}(jQuery);