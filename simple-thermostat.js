!function(){const t={DEBUG:!1,BUILD_TIME:"2026-06-29, 06:01 p.m."};try{if(process)return process.env=Object.assign({},process.env),void Object.assign(process.env,t)}catch(t){}globalThis.process={env:t}}();var t="simple-thermostat",e="4.0.0";function i(t,e,i,o){var a,r=arguments.length,n=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(a=t[s])&&(n=(r<3?a(n):r>3?a(e,i,n):a(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const o=globalThis,a=o.ShadowRoot&&(void 0===o.ShadyCSS||o.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),n=new WeakMap;let s=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(a&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const c=a?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,r))(e)})(t):t,{is:l,defineProperty:d,getOwnPropertyDescriptor:h,getOwnPropertyNames:m,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,g=globalThis,f=g.trustedTypes,v=f?f.emptyScript:"",y=g.reactiveElementPolyfillSupport,_=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?v:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},w=(t,e)=>!l(t,e),x={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&d(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:a}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const r=o?.call(this);a?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...m(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(c(t))}else void 0!==t&&e.push(c(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(a)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of e){const e=document.createElement("style"),a=o.litNonce;void 0!==a&&e.setAttribute("nonce",a),e.textContent=i.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(o):this.setAttribute(o,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=o;const r=a.fromAttribute(e,t.type);this[o]=r??this._$Ej?.get(o)??r,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const o=this.constructor,a=this[t];if(i??=o.getPropertyOptions(t),!((i.hasChanged??w)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:a},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==a||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[_("elementProperties")]=new Map,$[_("finalized")]=new Map,y?.({ReactiveElement:$}),(g.reactiveElementVersions??=[]).push("2.1.1");const A=globalThis,z=t=>t,k=A.trustedTypes,E=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+C,O=`<${T}>`,N=document,P=()=>N.createComment(""),V=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,R="[ \t\n\f\r]",I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,j=/>/g,H=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,U=/"/g,F=/^(?:script|style|textarea|title)$/i,W=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),B=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),q=new WeakMap,Z=N.createTreeWalker(N,129);function K(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,o=[];let a,r=2===e?"<svg>":3===e?"<math>":"",n=I;for(let e=0;e<i;e++){const i=t[e];let s,c,l=-1,d=0;for(;d<i.length&&(n.lastIndex=d,c=n.exec(i),null!==c);)d=n.lastIndex,n===I?"!--"===c[1]?n=L:void 0!==c[1]?n=j:void 0!==c[2]?(F.test(c[2])&&(a=RegExp("</"+c[2],"g")),n=H):void 0!==c[3]&&(n=H):n===H?">"===c[0]?(n=a??I,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,s=c[1],n=void 0===c[3]?H:'"'===c[3]?U:D):n===U||n===D?n=H:n===L||n===j?n=I:(n=H,a=void 0);const h=n===H&&t[e+1].startsWith("/>")?" ":"";r+=n===I?i+O:l>=0?(o.push(s),i.slice(0,l)+S+i.slice(l)+C+h):i+C+(-2===l?e:h)}return[K(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class J{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let a=0,r=0;const n=t.length-1,s=this.parts,[c,l]=Y(t,e);if(this.el=J.createElement(c,i),Z.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=Z.nextNode())&&s.length<n;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(S)){const e=l[r++],i=o.getAttribute(t).split(C),n=/([.?@])?(.*)/.exec(e);s.push({type:1,index:a,name:n[2],strings:i,ctor:"."===n[1]?it:"?"===n[1]?ot:"@"===n[1]?at:et}),o.removeAttribute(t)}else t.startsWith(C)&&(s.push({type:6,index:a}),o.removeAttribute(t));if(F.test(o.tagName)){const t=o.textContent.split(C),e=t.length-1;if(e>0){o.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],P()),Z.nextNode(),s.push({type:2,index:++a});o.append(t[e],P())}}}else if(8===o.nodeType)if(o.data===T)s.push({type:2,index:a});else{let t=-1;for(;-1!==(t=o.data.indexOf(C,t+1));)s.push({type:7,index:a}),t+=C.length-1}a++}}static createElement(t,e){const i=N.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,o){if(e===B)return e;let a=void 0!==o?i._$Co?.[o]:i._$Cl;const r=V(e)?void 0:e._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),void 0===r?a=void 0:(a=new r(t),a._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=a:i._$Cl=a),void 0!==a&&(e=X(t,a._$AS(t,e.values),a,o)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??N).importNode(e,!0);Z.currentNode=o;let a=Z.nextNode(),r=0,n=0,s=i[0];for(;void 0!==s;){if(r===s.index){let e;2===s.type?e=new tt(a,a.nextSibling,this,t):1===s.type?e=new s.ctor(a,s.name,s.strings,this,t):6===s.type&&(e=new rt(a,this,t)),this._$AV.push(e),s=i[++n]}r!==s?.index&&(a=Z.nextNode(),r++)}return Z.currentNode=N,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),V(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==G&&V(this._$AH)?this._$AA.nextSibling.data=t:this.T(N.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new Q(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new J(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const a of t)o===e.length?e.push(i=new tt(this.O(P()),this.O(P()),this,this.options)):i=e[o],i._$AI(a),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=z(t).nextSibling;z(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,a){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(t,e=this,i,o){const a=this.strings;let r=!1;if(void 0===a)t=X(this,t,e,0),r=!V(t)||t!==this._$AH&&t!==B,r&&(this._$AH=t);else{const o=t;let n,s;for(t=a[0],n=0;n<a.length-1;n++)s=X(this,o[i+n],e,n),s===B&&(s=this._$AH[n]),r||=!V(s)||s!==this._$AH[n],s===G?t=G:t!==G&&(t+=(s??"")+a[n+1]),this._$AH[n]=s}r&&!o&&this.j(t)}j(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===G?void 0:t}}class ot extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==G)}}class at extends et{constructor(t,e,i,o,a){super(t,e,i,o,a),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??G)===B)return;const i=this._$AH,o=t===G&&i!==G||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==G&&(i===G||o);o&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const nt=A.litHtmlPolyfillSupport;nt?.(J,tt),(A.litHtmlVersions??=[]).push("3.3.3");const st=globalThis;class ct extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let a=o._$litPart$;if(void 0===a){const t=i?.renderBefore??null;o._$litPart$=a=new tt(e.insertBefore(P(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}ct._$litElement$=!0,ct.finalized=!0,st.litElementHydrateSupport?.({LitElement:ct});const lt=st.litElementPolyfillSupport;lt?.({LitElement:ct}),(st.litElementVersions??=[]).push("4.2.2");const dt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:w},ht=(t=dt,e,i)=>{const{kind:o,metadata:a}=i;let r=globalThis.litPropertyMetadata.get(a);if(void 0===r&&globalThis.litPropertyMetadata.set(a,r=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===o){const{name:o}=i;return{set(i){const a=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,a,t)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=i;return function(i){const a=this[o];e.call(this,i),this.requestUpdate(o,a,t)}}throw Error("Unsupported decorator location: "+o)};function mt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const o=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}var ut,pt=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new s(i,t,r)})`:host {
  display: block;
  --st-default-spacing: 4px;
  --st-default-mode-radius: var(--ha-card-border-radius, 4px);
  --st-default-mode-transition: 200ms ease;
  --st-motion-ease: cubic-bezier(0.2, 0, 0, 1);
  --st-control-icon-size: var(--st-font-size-xl, 32px);
  --st-preset-icon-size: var(
    --st-font-size-preset-icon,
    var(--ha-font-size-xl, 20px)
  );
  --st-compact-mode-icon-size: var(--st-font-size-compact-mode-icon, 20px);
  --st-compact-mode-font-size: var(
    --st-font-size-compact-mode,
    var(--ha-font-size-m, 14px)
  );
  --st-active-icon-glow-duration: 5s;
  --st-active-icon-glow-min-size: 4px;
  --st-active-icon-glow-mid-size: 9px;
  --st-active-icon-glow-max-size: 14px;
  --st-active-icon-glow-min-strength: 36%;
  --st-active-icon-glow-mid-strength: 52%;
  --st-active-icon-glow-max-strength: 70%;
}
ha-card {
  -webkit-font-smoothing: antialiased;
  -webkit-font-smoothing: var(--ha-font-smoothing, antialiased);
  font-size: 14px;
  font-size: var(--ha-font-size-m, 14px);
  font-weight: 400;
  font-weight: var(--ha-font-weight-normal, 400);
  line-height: 1.5;
  line-height: var(--ha-line-height-normal, 1.5);

  padding-bottom: calc(var(--st-spacing, var(--st-default-spacing)) * 2);

  --auto-color: var(--state-climate-auto-color, var(--primary-color));
  --heat_cool-color: var(--state-climate-heat-cool-color, var(--primary-color));
  --cool-color: var(--state-climate-cool-color, var(--primary-color));
  --heat-color: var(--state-climate-heat-color, var(--primary-color));
  --manual-color: var(--state-icon-color, var(--secondary-text-color));
  --on-color: var(--primary-color);
  --off-color: var(--disabled-text-color, var(--secondary-text-color));
  --fan_only-color: var(
    --state-climate-fan-only-color,
    var(--state-fan-active-color, var(--manual-color))
  );
  --dry-color: var(--state-climate-dry-color, var(--primary-color));
  --st-interactive-tint: color-mix(
    in srgb,
    currentColor 50%,
    var(--st-value-update-color, var(--primary-color)) 50%
  );
  --st-switch-hover-button-color: color-mix(
    in srgb,
    var(--st-toggle-color, var(--primary-color)) 50%,
    var(--primary-text-color) 50%
  );
  --st-switch-hover-track-color: color-mix(
    in srgb,
    var(--st-toggle-color, var(--primary-color)) 30%,
    var(--primary-text-color) 70%
  );
}

ha-card.no-header {
  padding: calc(var(--st-spacing, var(--st-default-spacing)) * 4) 0;
}

ha-card.unavailable,
ha-card.unknown {
  opacity: 0.56;
  pointer-events: none;
  filter: saturate(0.6);
}

ha-card.unavailable .mode-item,
ha-card.unknown .mode-item,
ha-card.unavailable .thermostat-trigger,
ha-card.unknown .thermostat-trigger {
  cursor: default;
}

ha-card.loading {
  min-height: 80px;
  background: linear-gradient(
    90deg,
    var(--card-background-color) 0%,
    var(--secondary-background-color) 50%,
    var(--card-background-color) 100%
  );
  background-size: 200% 100%;
  animation: st-shimmer 1.4s infinite linear;
}

@keyframes st-shimmer {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}

@keyframes st-fan-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes st-active-icon-glow {
  0%,
  100% {
    filter: drop-shadow(
      0 0 var(--st-active-icon-glow-min-size)
        color-mix(
          in srgb,
          var(--st-active-icon-glow-color)
            var(--st-active-icon-glow-min-strength),
          transparent
        )
    );
    opacity: 0.94;
  }

  25%,
  75% {
    filter: drop-shadow(
      0 0 var(--st-active-icon-glow-mid-size)
        color-mix(
          in srgb,
          var(--st-active-icon-glow-color)
            var(--st-active-icon-glow-mid-strength),
          transparent
        )
    );
    opacity: 0.98;
  }

  50% {
    filter: drop-shadow(
      0 0 var(--st-active-icon-glow-max-size)
        color-mix(
          in srgb,
          var(--st-active-icon-glow-color)
            var(--st-active-icon-glow-max-strength),
          transparent
        )
    );
    opacity: 1;
  }
}

@keyframes st-value-pulse {
  0% {
    transform: scale(1);
    text-shadow: none;
  }

  45% {
    transform: scale(1.045);
    text-shadow: 0 0 8px
      color-mix(
        in srgb,
        var(--st-value-update-color, var(--primary-color)) 45%,
        transparent
      );
  }

  100% {
    transform: scale(1);
    text-shadow: none;
  }
}

.body {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(min-content, auto);
  align-items: center;
  justify-items: center;
  place-items: center;
  padding: 0 calc(var(--st-spacing, var(--st-default-spacing)) * 4);
}

.toggle-label {
  color: var(--st-toggle-label-color, var(--primary-text-color));
  --st-toggle-color: var(--primary-color);
  margin-right: var(--st-spacing, var(--st-default-spacing));
  font-size: 16px;
  font-size: var(--st-font-size-toggle-label, var(--ha-font-size-l, 16px));
  transition:
    color 180ms var(--st-motion-ease), filter 180ms var(--st-motion-ease);
}
.toggle-label.on {
  --st-toggle-color: var(--on-color);
}
.toggle-label.off {
  --st-toggle-color: var(--primary-color);
}
.toggle-label.domain-light,
.header__toggle.domain-light,
.entity-heading.domain-light,
.entity-value.domain-light,
.entity-heading.toggle-lightbulb,
.entity-value.toggle-lightbulb,
.entity-heading.toggle-lightbulb-outline,
.entity-value.toggle-lightbulb-outline,
.entity-heading.toggle-ceiling-light,
.entity-value.toggle-ceiling-light,
.entity-heading.toggle-vanity-light,
.entity-value.toggle-vanity-light,
.entity-heading.toggle-string-lights,
.entity-value.toggle-string-lights,
.entity-heading.toggle-wall-sconce,
.entity-value.toggle-wall-sconce {
  --st-toggle-color: var(--state-light-active-color, var(--primary-color));
}
.toggle-label.domain-fan,
.header__toggle.domain-fan,
.entity-heading.domain-fan,
.entity-value.domain-fan {
  --st-toggle-color: var(--cool-color);
}
.header__toggle.toggle-fire,
.toggle-label.toggle-fire,
.header__toggle.toggle-radiator,
.toggle-label.toggle-radiator,
.header__toggle.toggle-heat,
.toggle-label.toggle-heat,
.header__toggle.toggle-heat-wave,
.toggle-label.toggle-heat-wave,
.header__toggle.toggle-heating-coil,
.toggle-label.toggle-heating-coil,
.header__toggle.toggle-water-boiler,
.toggle-label.toggle-water-boiler {
  --st-toggle-color: var(--heat-color);
}
.header__toggle.toggle-snowflake,
.toggle-label.toggle-snowflake,
.header__toggle.toggle-air-conditioner,
.toggle-label.toggle-air-conditioner,
.header__toggle.toggle-cool,
.toggle-label.toggle-cool {
  --st-toggle-color: var(--cool-color);
}
.header__toggle.toggle-fan,
.toggle-label.toggle-fan {
  --st-toggle-color: var(--cool-color);
}
.header__toggle.toggle-lightbulb,
.toggle-label.toggle-lightbulb {
  --st-toggle-color: var(--state-light-active-color, var(--primary-color));
}
.header__toggle.toggle-water-percent,
.toggle-label.toggle-water-percent,
.header__toggle.toggle-dry,
.toggle-label.toggle-dry {
  --st-toggle-color: var(--primary-color);
}

.faults {
  display: flex;
  flex-direction: row;
  margin-left: calc(var(--st-spacing, var(--st-default-spacing)) * 2);
}
.fault-icon {
  padding: 2px;
  cursor: pointer;
  color: var(--st-fault-inactive-color, var(--secondary-background-color));
}
.fault-icon.active {
    color: var(--st-fault-active-color, var(--accent-color));
  }
.fault-icon.hide {
    display: none;
  }

.entities {
  display: grid;
  grid-gap: 0;
  padding-top: calc(var(--st-spacing, var(--st-default-spacing)) * 4);
  padding-bottom: calc(var(--st-spacing, var(--st-default-spacing)) * 4);
  font-size: 16px;
  font-size: var(--st-font-size-entities, var(--ha-font-size-l, 16px));
}
.entities.single-row {
  padding-top: calc(var(--st-spacing, var(--st-default-spacing)) * 2);
  padding-bottom: calc(var(--st-spacing, var(--st-default-spacing)) * 2);
}
.entities.as-list {
  grid-auto-flow: column;
  grid-template-columns: min-content;
}

.entities.as-table.without-labels {
    grid: auto-flow / 100%;
    align-items: start;
    justify-items: start;
    place-items: start;
  }

.entities.as-table.with-labels {
    grid: auto-flow / auto auto;
    align-items: start;
    justify-items: start;
    place-items: start;
  }

.entity-value {
  display: flex;
  align-items: center;
  padding-bottom: 0;
  transition:
    color 180ms var(--st-motion-ease), filter 180ms var(--st-motion-ease);
}
.entity-heading {
  font-weight: 300;
  padding-right: 8px;
  padding-bottom: 0;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  justify-self: end;
  text-align: right;
  transition:
    color 180ms var(--st-motion-ease), filter 180ms var(--st-motion-ease);
}

.entities:empty {
  display: none;
}
header {
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: calc(var(--st-spacing, var(--st-default-spacing)) * 4)
    calc(var(--st-spacing, var(--st-default-spacing)) * 2) 0
    calc(var(--st-spacing, var(--st-default-spacing)) * 4);
}
.header__main {
  display: flex;
  align-items: center;
  transition:
    color 180ms var(--st-motion-ease), filter 180ms var(--st-motion-ease);
}
.header__icon-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--st-control-icon-size);
  height: var(--st-control-icon-size);
  margin-right: calc(var(--st-spacing, var(--st-default-spacing)) * 2);
  color: var(--state-icon-color, var(--secondary-text-color));
}
.header__icon-wrap.on {
    color: var(
      --state-icon-active-color,
      var(--state-icon-color, var(--primary-color))
    );
  }
.header__icon-wrap.off {
    color: var(--state-icon-color, var(--disabled-text-color));
  }
.header__icon-wrap.slash-off::before,
.header__icon-wrap.slash-off::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: calc(var(--st-control-icon-size) * 1.05);
  border-radius: 999px;
  pointer-events: none;
  transform-origin: center;
  z-index: 3;
}
.header__icon-wrap.slash-off::before {
  height: max(4px, calc(var(--st-control-icon-size) * 0.115));
  background: var(--ha-card-background, var(--card-background-color));
  transform: translate(-50%, calc(-50% - (var(--st-control-icon-size) * 0.055)))
    rotate(45deg);
}
.header__icon-wrap.slash-off::after {
  height: max(2px, calc(var(--st-control-icon-size) * 0.08));
  background: currentColor;
  transform: translate(-50%, -50%) rotate(45deg);
}
.header__icon {
  --iron-icon-width: var(--st-control-icon-size);
  --iron-icon-height: var(--st-control-icon-size);
  --mdc-icon-size: var(--st-control-icon-size);
  position: relative;
  z-index: 1;
  width: var(--st-control-icon-size);
  height: var(--st-control-icon-size);
  color: inherit;
  transform-origin: center;
  transition:
    color 180ms var(--st-motion-ease), transform 180ms var(--st-motion-ease), opacity 180ms var(--st-motion-ease);
}
ha-card.domain-fan:not(.state-off) .header__icon {
  animation: st-fan-spin 2.4s linear infinite;
  animation: st-fan-spin var(--st-fan-spin-duration, 2.4s) linear infinite;
}
ha-card.humidifying .header__icon,
ha-card.dehumidifying .header__icon,
ha-card.drying .header__icon {
  --st-active-icon-glow-color: var(--primary-color);
  animation: st-active-icon-glow var(--st-active-icon-glow-duration) ease-in-out
    infinite;
}
ha-card.heating .header__icon {
  --st-active-icon-glow-color: var(--heat-color);
  animation: st-active-icon-glow var(--st-active-icon-glow-duration) ease-in-out
    infinite;
}
ha-card.cooling .header__icon {
  --st-active-icon-glow-color: var(--cool-color);
  --st-active-icon-glow-min-size: 6px;
  --st-active-icon-glow-mid-size: 12px;
  --st-active-icon-glow-max-size: 18px;
  --st-active-icon-glow-min-strength: 52%;
  --st-active-icon-glow-mid-strength: 70%;
  --st-active-icon-glow-max-strength: 86%;
  animation: st-active-icon-glow var(--st-active-icon-glow-duration) ease-in-out
    infinite;
}
.header__title {
  font-size: 24px;
  font-size: var(--st-font-size-title, var(--ha-card-header-font-size, 24px));
  line-height: 24px;
  line-height: var(--st-font-size-title, var(--ha-card-header-font-size, 24px));
  -webkit-font-smoothing: antialiased;
  -webkit-font-smoothing: var(--ha-font-smoothing, antialiased);
  font-weight: normal;
  margin: 0;
  align-self: left;
  transition:
    color 180ms var(--st-motion-ease), filter 180ms var(--st-motion-ease);
}

.header__toggles {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 0;
  margin-left: auto;
  margin-right: calc(var(--st-spacing, var(--st-default-spacing)) * 2);
}

.header__toggle,
.entity-value.toggle-entity {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  white-space: nowrap;
  --st-switch-off-button-color: var(--disabled-text-color);
  --st-switch-off-track-color: color-mix(
    in srgb,
    var(--disabled-text-color) 22%,
    var(--secondary-background-color) 78%
  );
  --st-switch-on-button-color: var(--st-toggle-color, var(--primary-color));
  --st-switch-on-track-color: color-mix(
    in srgb,
    var(--st-toggle-color, var(--primary-color)) 28%,
    var(--secondary-background-color) 72%
  );
  --st-switch-hover-button-color: color-mix(
    in srgb,
    var(--st-switch-off-button-color) 50%,
    var(--st-toggle-color, var(--primary-color)) 50%
  );
  --st-switch-hover-track-color: color-mix(
    in srgb,
    var(--st-switch-off-track-color) 50%,
    var(--st-toggle-color, var(--primary-color)) 50%
  );
  --st-switch-button-color: var(--st-switch-off-button-color);
  --st-switch-track-color: var(--st-switch-off-track-color);
}

.header__toggle.on,
.entity-value.toggle-entity.state-on {
  --st-switch-button-color: var(--st-switch-on-button-color);
  --st-switch-track-color: var(--st-switch-on-track-color);
}

.current-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: hidden;
}

.current-wrapper.row {
    display: grid;
    grid-template-columns:
      var(--st-control-icon-size)
      minmax(0, max-content)
      var(--st-control-icon-size);
    grid-template-areas:
      'decrease value increase'
      '. label .';
    grid-column-gap: calc(var(--st-spacing, var(--st-default-spacing)) * 3);
    -moz-column-gap: calc(var(--st-spacing, var(--st-default-spacing)) * 3);
         column-gap: calc(var(--st-spacing, var(--st-default-spacing)) * 3);
    grid-row-gap: 2px;
    row-gap: 2px;
    align-items: center;
    justify-items: center;
    justify-content: center;
  }
.current-wrapper.row .thermostat-trigger.decrease {
  grid-area: decrease;
}
.current-wrapper.row .thermostat-trigger.increase {
  grid-area: increase;
}
.current-wrapper.row .current--value {
  grid-area: value;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
}
.current--value {
  display: flex;
  align-items: center;
  margin: 0;
  font-weight: 400;
  line-height: 22px;
  line-height: var(--st-font-size-l, 22px);
  font-size: 22px;
  font-size: var(--st-font-size-l, 22px);
  cursor: pointer;
  transition:
    color 200ms var(--st-motion-ease), transform 180ms var(--st-motion-ease), text-shadow 180ms var(--st-motion-ease);
}
@media (min-width: 768px) {
.current--value {
    font-size: 28px;
    font-size: var(--st-font-size-xl, 28px);
    line-height: 28px;
    line-height: var(--st-font-size-xl, 28px);
}
  }
.current--value.updating {
    color: var(--st-value-update-color, var(--primary-color));
    animation: st-value-pulse 520ms var(--st-motion-ease);
  }
.current--value:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
    border-radius: var(--st-mode-border-radius, var(--st-default-mode-radius));
  }
.current--value.current--off {
  color: var(--disabled-text-color);
  font-size: 22px;
  font-size: var(--st-font-size-l, 22px);
  line-height: 22px;
  line-height: var(--st-font-size-l, 22px);
}
.current--unit {
  font-size: 20px;
  font-size: var(--st-font-size-m, var(--ha-font-size-xl, 20px));
}
.current--label {
  grid-area: label;
  margin-top: 2px;
  color: var(--secondary-text-color);
  font-size: 12px;
  font-size: var(--st-font-size-setpoint-label, var(--ha-font-size-s, 12px));
  line-height: 1.1;
  opacity: 0.68;
  pointer-events: none;
  text-align: center;
  white-space: nowrap;
}
.current-wrapper.column .current--label {
  order: 2;
  margin: 0 0 2px;
}
.thermostat-trigger {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  position: relative;
  display: inline-grid;
  align-items: center;
  justify-items: center;
  place-items: center;
  padding: 0px;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: inherit;
  cursor: pointer;
  width: calc(var(--st-control-icon-size) + 12px);
  height: calc(var(--st-control-icon-size) + 12px);
  overflow: hidden;
  transition:
    color 180ms var(--st-motion-ease), transform 120ms var(--st-motion-ease);
}
.thermostat-trigger::before {
  content: '';
  position: absolute;
  top: 2px;
  right: 2px;
  bottom: 2px;
  left: 2px;
  border-radius: inherit;
  background: currentColor;
  opacity: 0;
  transition: opacity 120ms ease;
}
.thermostat-trigger:hover::before {
  opacity: 0.08;
}
.thermostat-trigger:active {
  transform: scale(0.94);
}
.thermostat-trigger:active::before {
  opacity: 0.14;
}
.thermostat-trigger:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}
.thermostat-trigger:disabled {
  cursor: default;
  color: var(--disabled-text-color);
  opacity: 0.38;
  transform: none;
}
.thermostat-trigger:disabled::before {
  display: none;
}
.thermostat-trigger ha-icon {
  --iron-icon-width: var(--st-control-icon-size);
  --iron-icon-height: var(--st-control-icon-size);
  --mdc-icon-size: var(--st-control-icon-size);
  position: relative;
  z-index: 1;
  width: var(--st-control-icon-size);
  height: var(--st-control-icon-size);
  transition: color 180ms var(--st-motion-ease);
}
.thermostat-trigger:hover ha-icon {
  color: var(--st-interactive-tint);
}
.clickable {
  cursor: pointer;
}
.controls {
  display: grid;
  grid-gap: var(--st-spacing, var(--st-default-spacing));
  gap: var(--st-spacing, var(--st-default-spacing));
  margin-top: calc(var(--st-spacing, var(--st-default-spacing)) * 4);
  padding: 0 var(--st-spacing, var(--st-default-spacing));
}

.modes {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin: 0;
  padding: 0;
}

.modes.heading {
    align-items: stretch;
  }
.modes.preset {
  flex-wrap: nowrap;
}
.mode-title {
  padding: 0 16px;
  align-self: center;
  justify-self: center;
  place-self: center;
  font-size: 16px;
  font-size: var(--st-font-size-entities, var(--ha-font-size-l, 16px));
  font-weight: 300;
  white-space: nowrap;
}
.mode-item {
  position: relative;
  display: flex;
  flex: 1 1 72px;
  flex: 1 1 var(--st-mode-min-width, 72px);
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  min-width: min(100%, 72px);
  min-width: min(100%, var(--st-mode-min-width, 72px));
  min-height: 24px;
  padding: var(--st-spacing, var(--st-default-spacing)) 0;
  background: var(--st-mode-background, var(--secondary-background-color));
  color: var(--secondary-text-color);
  cursor: pointer;
  border-radius: var(--st-mode-border-radius, var(--st-default-mode-radius));
  transition:
    background-color
      var(--st-mode-transition, var(--st-default-mode-transition)), color var(--st-mode-transition, var(--st-default-mode-transition)), box-shadow var(--st-mode-transition, var(--st-default-mode-transition)), filter var(--st-mode-transition, var(--st-default-mode-transition)), transform 100ms var(--st-motion-ease);
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
  overflow: hidden;
  --st-mode-tinted-hover-background: color-mix(
    in srgb,
    var(--st-mode-background, var(--secondary-background-color)) 50%,
    var(--st-mode-color, var(--primary-color)) 50%
  );
  --st-mode-accent-color: color-mix(
    in srgb,
    var(--st-mode-color, var(--primary-color)) 68%,
    var(--primary-text-color) 32%
  );
  --st-mode-active-icon-color: color-mix(
    in srgb,
    var(--st-mode-color, var(--primary-color)) 42%,
    var(--st-mode-active-color, var(--text-primary-color)) 58%
  );
  --st-mode-hover-icon-color: color-mix(
    in srgb,
    currentColor 50%,
    var(--st-mode-color, var(--primary-color)) 50%
  );
  --st-mode-active-accent-color: var(--st-mode-accent-color);
  --st-mode-neutral-hover-background: color-mix(
    in srgb,
    var(--st-mode-background, var(--secondary-background-color)) 88%,
    var(--primary-text-color) 12%
  );
}
.mode-item.on {
    --st-mode-color: var(--on-color);
  }
.mode-item.off {
    --st-mode-color: var(--off-color);
  }
.mode-item.heat {
    --st-mode-color: var(--heat-color);
  }
.mode-item.cool {
    --st-mode-color: var(--cool-color);
  }
.mode-item.heat_cool {
    --st-mode-color: var(--heat_cool-color);
  }
.mode-item.auto {
    --st-mode-color: var(--auto-color);
  }
.mode-item.dry {
    --st-mode-color: var(--dry-color);
  }
.mode-item.fan_only {
    --st-mode-color: var(--fan_only-color);
  }
.mode-item.low {
    --st-mode-color: color-mix(
      in srgb,
      var(--fan_only-color) 65%,
      var(--primary-text-color) 35%
    );
  }
.mode-item.mid,.mode-item.medium {
    --st-mode-color: var(--fan_only-color);
  }
.mode-item.high {
    --st-mode-color: color-mix(
      in srgb,
      var(--fan_only-color) 65%,
      var(--secondary-text-color) 35%
    );
  }
.mode-item:not(.active):active {
    transform: scale(0.97);
  }
.mode-item:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
.mode-item.active,.mode-item.active:hover {
    background: var(
      --st-mode-active-background,
      var(--st-mode-color, var(--primary-color))
    );
    color: var(--st-mode-active-color, var(--text-primary-color));
    box-shadow: inset 0 -2px 0
      var(
        --st-mode-active-accent-color,
        color-mix(in srgb, var(--text-primary-color) 72%, transparent)
      );
    filter: none;
    transform: none;
    transition: none;
  }
.mode-item::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  border-radius: 999px 999px 0 0;
  background: var(--st-mode-accent-color);
  opacity: 0;
  transform: scaleX(0.45);
  transform-origin: center;
  transition:
    opacity 180ms var(--st-motion-ease), transform 180ms var(--st-motion-ease);
}
.mode-item.active::after {
  background: var(--st-mode-active-accent-color);
  opacity: 0.64;
  transform: scaleX(1);
  transition: none;
}
ha-card:not(.standard-visuals) .mode-item.active .mode-icon {
  color: var(--st-mode-active-icon-color);
}
.mode-item .mode-icon {
  transition:
    color 180ms var(--st-motion-ease), transform 180ms var(--st-motion-ease), opacity 180ms var(--st-motion-ease);
}
.mode-label {
  display: block;
  line-height: 1;
}

ha-card:not(.standard-visuals) .header__toggle.on .toggle-label.clickable,
ha-card:not(.standard-visuals) .entity-heading.toggle-entity.state-on ha-icon {
  color: var(--st-toggle-color, var(--primary-color));
}

ha-card:not(.standard-visuals) .header__toggle.on ha-switch,
ha-card:not(.standard-visuals) .header__toggle:hover ha-switch,
ha-card:not(.standard-visuals)
  .entities
  .entity-value.toggle-entity.state-on
  ha-switch,
ha-card:not(.standard-visuals)
  .entities
  .entity-value.toggle-entity:hover
  ha-switch {
  --ha-switch-background-color: var(--st-switch-track-color);
  --ha-switch-background-color-hover: var(--st-switch-hover-track-color);
  --ha-switch-thumb-background-color: var(--st-switch-button-color);
  --ha-switch-thumb-background-color-hover: var(--st-switch-hover-button-color);
  --ha-switch-thumb-border-color: var(--st-switch-button-color);
  --ha-switch-thumb-border-color-hover: var(--st-switch-hover-button-color);
  --ha-switch-checked-background-color: var(--st-switch-track-color);
  --ha-switch-checked-background-color-hover: var(
    --st-switch-hover-track-color
  );
  --ha-switch-checked-thumb-background-color: var(--st-switch-button-color);
  --ha-switch-checked-thumb-background-color-hover: var(
    --st-switch-hover-button-color
  );
  --ha-switch-checked-thumb-border-color: var(--st-switch-button-color);
  --ha-switch-checked-thumb-border-color-hover: var(
    --st-switch-hover-button-color
  );
  --switch-checked-button-color: var(--st-switch-button-color);
  --switch-checked-track-color: var(--st-switch-track-color);
  --switch-checked-hover-button-color: var(--st-switch-hover-button-color);
  --switch-checked-hover-track-color: var(--st-switch-hover-track-color);
  --switch-checked-focus-button-color: var(--st-switch-button-color);
  --switch-checked-focus-track-color: var(--st-switch-track-color);
  --switch-checked-pressed-button-color: var(--st-switch-button-color);
  --switch-checked-pressed-track-color: var(--st-switch-track-color);
  --mdc-theme-secondary: var(--st-switch-button-color);
  --mdc-switch-selected-handle-color: var(--st-switch-button-color);
  --mdc-switch-selected-hover-handle-color: var(--st-switch-hover-button-color);
  --mdc-switch-selected-focus-handle-color: var(--st-switch-button-color);
  --mdc-switch-selected-pressed-handle-color: var(--st-switch-button-color);
  --mdc-switch-selected-track-color: var(--st-switch-track-color);
  --mdc-switch-selected-hover-track-color: var(--st-switch-hover-track-color);
  --mdc-switch-selected-focus-track-color: var(--st-switch-track-color);
  --mdc-switch-selected-pressed-track-color: var(--st-switch-track-color);
}

@media (hover: hover) {
  ha-card:not(.standard-visuals) .toggle-label.clickable:hover,
  ha-card:not(.standard-visuals) .header__toggle:hover .toggle-label.clickable {
    color: color-mix(
      in srgb,
      var(--st-toggle-label-color, var(--primary-text-color)) 50%,
      var(--st-toggle-color, var(--primary-color)) 50%
    );
    filter: brightness(1.04);
  }

  ha-card:not(.standard-visuals)
    .entity-heading.toggle-entity.clickable:hover
    ha-icon {
    color: color-mix(
      in srgb,
      var(--st-toggle-label-color, var(--primary-text-color)) 50%,
      var(--st-toggle-color, var(--primary-color)) 50%
    );
    filter: brightness(1.04);
  }

  ha-card:not(.standard-visuals) .header__toggle:hover ha-switch,
  ha-card:not(.standard-visuals)
    .entities
    .entity-value.toggle-entity:hover
    ha-switch {
    --st-switch-button-color: var(--st-switch-hover-button-color);
    --st-switch-track-color: var(--st-switch-hover-track-color);
  }

  ha-card:not(.standard-visuals) .entity-heading.clickable:hover,
  ha-card:not(.standard-visuals) .entity-value.clickable:hover,
  ha-card:not(.standard-visuals) .current--value:hover {
    color: var(--st-interactive-tint);
    filter: brightness(1.04);
  }

  ha-card:not(.standard-visuals) .header__main.clickable:hover .header__title {
    color: var(--st-interactive-tint);
    filter: brightness(1.04);
  }

  .mode-item:not(.active):hover {
    background: var(
      --st-mode-hover-background,
      var(--st-mode-neutral-hover-background)
    );
    color: var(--st-mode-hover-color, var(--primary-text-color));
    filter: brightness(1.04);
    transform: translateY(-1px);
  }

  .mode-item.on:not(.active):hover,
  .mode-item.off:not(.active):hover,
  .mode-item.heat:not(.active):hover,
  .mode-item.cool:not(.active):hover,
  .mode-item.heat_cool:not(.active):hover,
  .mode-item.auto:not(.active):hover,
  .mode-item.dry:not(.active):hover,
  .mode-item.fan_only:not(.active):hover,
  .modes.preset .mode-item:not(.active):hover,
  .modes.fan .mode-item:not(.active):hover,
  .modes.fan-preset .mode-item:not(.active):hover,
  .modes.swing .mode-item:not(.active):hover,
  .modes.swing_horizontal .mode-item:not(.active):hover,
  .modes.swing_vertical .mode-item:not(.active):hover,
  .modes.vane_horizontal .mode-item:not(.active):hover,
  .modes.vane_vertical .mode-item:not(.active):hover {
    background: var(--st-mode-tinted-hover-background);
  }

  .mode-item:not(.active):hover .mode-icon {
    color: var(--st-mode-hover-icon-color);
    transform: translateY(-1px);
  }

  .mode-item:not(.active):hover::after {
    opacity: 0.64;
    transform: scaleX(1);
  }

  .mode-item.active:hover {
    color: var(--st-mode-active-color, var(--text-primary-color));
  }

  ha-card.standard-visuals .mode-item:hover {
    background: var(--st-mode-background, var(--secondary-background-color));
    color: var(--secondary-text-color);
    filter: none;
    transform: none;
  }

  ha-card.standard-visuals .mode-item.active:hover {
    background: var(
      --st-mode-active-background,
      var(--st-mode-color, var(--primary-color))
    );
    color: var(--st-mode-active-color, var(--text-primary-color));
  }

  ha-card.standard-visuals .mode-item:hover .mode-icon {
    transform: none;
  }
}

ha-card.heating {
  --st-value-update-color: var(--heat-color);
}
ha-card.cooling {
  --st-value-update-color: var(--cool-color);
}
ha-card.domain-fan {
  --st-value-update-color: var(--on-color);
}
ha-card.humidifying,
ha-card.dehumidifying,
ha-card.drying {
  --st-value-update-color: var(--primary-color);
}

@media (prefers-reduced-motion: reduce) {
  ha-card.loading {
    animation: none;
  }

  .header__icon,
  .current--value,
  .mode-item,
  .mode-item::after,
  .mode-icon,
  .thermostat-trigger,
  .thermostat-trigger::before {
    animation: none !important;
    transition: none;
  }

  .mode-item:active {
    transform: none;
  }

  .thermostat-trigger:active {
    transform: none;
  }
}
.modes.hvac .mode-item,
.modes.state .mode-item {
  flex-direction: row;
  flex-basis: 0;
  gap: 8px;
  min-width: min(100%, 120px);
  min-width: min(100%, var(--st-hvac-mode-min-width, 120px));
  min-height: calc(var(--st-control-icon-size) + 8px);
  padding-top: var(--st-spacing, var(--st-default-spacing));
  padding-bottom: var(--st-spacing, var(--st-default-spacing));
}

.modes.hvac.sparse .mode-item,
.modes.state.sparse .mode-item {
  min-height: calc(var(--st-control-icon-size) + 8px);
  padding-top: var(--st-spacing, var(--st-default-spacing));
  padding-bottom: var(--st-spacing, var(--st-default-spacing));
}

@media (max-width: 560px) {
  .modes.hvac .mode-item,
  .modes.state .mode-item {
    flex-direction: column;
    gap: 4px;
    min-width: min(100%, 72px);
    min-width: min(100%, var(--st-mode-min-width, 72px));
  }

  ha-card:not(.standard-visuals) .modes.hvac.sparse .mode-item,
  ha-card:not(.standard-visuals) .modes.state.sparse .mode-item {
    flex-direction: row;
    gap: 6px;
    min-width: min(100%, 120px);
    min-width: min(100%, var(--st-hvac-mode-min-width, 120px));
  }
}
.modes.dense {
  display: grid;
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
}

.modes.dense .mode-item {
  min-width: 0;
  min-height: calc(var(--st-preset-icon-size) + 8px);
}

.modes.fan.dense .mode-item {
  flex-direction: column;
  gap: 0;
}

.modes.hvac.dense .mode-item {
  flex-direction: column;
  gap: 0;
  min-width: 0;
}

.modes.dense .mode-icon {
  --iron-icon-width: var(--st-preset-icon-size);
  --iron-icon-height: var(--st-preset-icon-size);
  --mdc-icon-size: var(--st-preset-icon-size);
  position: static;
  top: auto;
  width: var(--st-preset-icon-size);
  height: var(--st-preset-icon-size);
}

.modes.dense .mode-label {
  display: block;
  min-height: 0;
}
.mode-icon {
  --iron-icon-width: var(--st-control-icon-size);
  --iron-icon-height: var(--st-control-icon-size);
  --mdc-icon-size: var(--st-control-icon-size);
  width: var(--st-control-icon-size);
  height: var(--st-control-icon-size);
  display: block;
}
.modes.preset .mode-icon {
  --iron-icon-width: var(--st-preset-icon-size);
  --iron-icon-height: var(--st-preset-icon-size);
  --mdc-icon-size: var(--st-preset-icon-size);
  width: var(--st-preset-icon-size);
  height: var(--st-preset-icon-size);
}
.custom-mode-icon {
  display: block;
  color: currentColor;
}
.modes.preset .mode-item {
  --st-mode-min-width: 58px;
  flex: 1 1 0;
  min-width: 0;
  font-size: 12px;
  font-size: var(--st-font-size-preset, var(--ha-font-size-s, 12px));
}
.modes.preset.compact .mode-item {
  --st-mode-min-width: 88px;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-size: var(--st-compact-mode-font-size, var(--ha-font-size-m, 14px));
}
.modes.preset.compact .mode-icon {
  --iron-icon-width: var(--st-compact-mode-icon-size, 20px);
  --iron-icon-height: var(--st-compact-mode-icon-size, 20px);
  --mdc-icon-size: var(--st-compact-mode-icon-size, 20px);
  position: relative;
  top: -2px;
  width: 20px;
  width: var(--st-compact-mode-icon-size, 20px);
  height: 20px;
  height: var(--st-compact-mode-icon-size, 20px);
  flex: 0 0 auto;
}
.modes.preset.compact .mode-label {
  display: flex;
  align-items: center;
  min-height: 20px;
  min-height: var(--st-compact-mode-icon-size, 20px);
}
.modes.swing .mode-item,
.modes.swing_horizontal .mode-item,
.modes.swing_vertical .mode-item,
.modes.vane_horizontal .mode-item,
.modes.vane_vertical .mode-item {
  --st-mode-min-width: 58px;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  min-height: 20px;
  padding-top: 3px;
  padding-bottom: 3px;
  font-size: 12px;
  font-size: var(--st-font-size-preset, var(--ha-font-size-s, 12px));
}
.modes.fan .mode-icon,
.modes.fan-preset .mode-icon {
  --iron-icon-width: var(--st-compact-mode-icon-size, 20px);
  --iron-icon-height: var(--st-compact-mode-icon-size, 20px);
  --mdc-icon-size: var(--st-compact-mode-icon-size, 20px);
  position: relative;
  top: -2px;
  width: 20px;
  width: var(--st-compact-mode-icon-size, 20px);
  height: 20px;
  height: var(--st-compact-mode-icon-size, 20px);
}
.modes.fan .mode-item,
.modes.fan-preset .mode-item {
  --st-mode-min-width: 88px;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-size: var(--st-compact-mode-font-size, var(--ha-font-size-m, 14px));
}
.modes.fan .mode-icon,
.modes.fan-preset .mode-icon {
  flex: 0 0 auto;
}
.modes.fan .mode-label,
.modes.fan-preset .mode-label {
  display: flex;
  align-items: center;
  min-height: 20px;
  min-height: var(--st-compact-mode-icon-size, 20px);
}

.header__toggle ha-switch {
  padding: 0;
}

.entities .entity-value ha-switch {
  padding: 0 6px;
}
.side-by-side {
  display: flex;
  align-items: center;
}
.side-by-side > * {
  flex: 1;
  padding-right: 4px;
}

ha-card.standard-visuals {
  display: block;
  --cool-color: var(--state-climate-cool-color, var(--primary-color));
  --fan_only-color: var(
    --state-climate-fan-only-color,
    var(--state-fan-active-color, var(--state-icon-color))
  );
}

ha-card.loading.standard-visuals {
  background: var(--card-background-color);
  animation: none;
}

ha-card.standard-visuals .header__icon,
ha-card.standard-visuals .current--value,
ha-card.standard-visuals .mode-item,
ha-card.standard-visuals .mode-icon,
ha-card.standard-visuals .thermostat-trigger {
  animation: none;
  filter: none;
  text-shadow: none;
  transition: none;
}

ha-card.standard-visuals .toggle-label,
ha-card.standard-visuals .entity-heading,
ha-card.standard-visuals .entity-value,
ha-card.standard-visuals .header__main {
  transition: none;
}

ha-card.standard-visuals header {
  padding: calc(var(--st-spacing, var(--st-default-spacing)) * 6)
    calc(var(--st-spacing, var(--st-default-spacing)) * 2)
    calc(var(--st-spacing, var(--st-default-spacing)) * 4)
    calc(var(--st-spacing, var(--st-default-spacing)) * 4);
}

ha-card.standard-visuals .header__toggles {
  margin-right: 0;
}

ha-card.standard-visuals .header__icon-wrap {
  width: auto;
  height: auto;
  margin-right: 0;
}

ha-card.standard-visuals .header__icon {
  --iron-icon-width: 24px;
  --iron-icon-height: 24px;
  --mdc-icon-size: 24px;
  width: 24px;
  height: 24px;
  margin-right: calc(var(--st-spacing, var(--st-default-spacing)) * 2);
}

ha-card.standard-visuals .entities {
  padding-top: 0;
  padding-bottom: 0;
}

ha-card.standard-visuals .entity-heading {
  justify-self: auto;
}

ha-card.standard-visuals .body {
  padding-bottom: calc(var(--st-spacing, var(--st-default-spacing)) * 2);
}

ha-card.standard-visuals .body + .controls {
  margin-top: calc(var(--st-spacing, var(--st-default-spacing)) * 4);
}

ha-card.standard-visuals .current-wrapper {
  flex-wrap: wrap;
}

ha-card.standard-visuals .current-wrapper.row {
  -moz-column-gap: 0;
       column-gap: 0;
}

ha-card.standard-visuals .current-wrapper.row .current--value {
  overflow: visible;
}

ha-card.standard-visuals .current--value.updating {
  color: var(--error-color);
}

ha-card.standard-visuals .thermostat-trigger {
  display: inline-block;
  width: auto;
  height: auto;
  border-radius: 0;
  overflow: visible;
}

ha-card.standard-visuals .thermostat-trigger ha-icon {
  --iron-icon-width: 24px;
  --iron-icon-height: 24px;
  --mdc-icon-size: 24px;
  width: 24px;
  height: 24px;
}

ha-card.standard-visuals .controls {
  display: block;
  gap: 0;
  padding: 0;
  margin-top: calc(var(--st-spacing, var(--st-default-spacing)) * 4);
}

ha-card.standard-visuals .modes,
ha-card.standard-visuals .modes.hvac,
ha-card.standard-visuals .modes.state,
ha-card.standard-visuals .modes.preset,
ha-card.standard-visuals .modes.preset.compact,
ha-card.standard-visuals .modes.fan,
ha-card.standard-visuals .modes.fan-preset,
ha-card.standard-visuals .modes.swing,
ha-card.standard-visuals .modes.swing_horizontal,
ha-card.standard-visuals .modes.swing_vertical,
ha-card.standard-visuals .modes.vane_horizontal,
ha-card.standard-visuals .modes.vane_vertical {
  display: grid;
  grid-template-columns: auto;
  grid-auto-flow: column;
  grid-gap: 2px;
  margin-top: 0;
  padding: var(--st-spacing, var(--st-default-spacing));
}

ha-card.standard-visuals .mode-item,
ha-card.standard-visuals .modes.hvac .mode-item,
ha-card.standard-visuals .modes.state .mode-item,
ha-card.standard-visuals .modes.preset .mode-item,
ha-card.standard-visuals .modes.preset.compact .mode-item,
ha-card.standard-visuals .modes.fan .mode-item,
ha-card.standard-visuals .modes.fan-preset .mode-item,
ha-card.standard-visuals .modes.swing .mode-item,
ha-card.standard-visuals .modes.swing_horizontal .mode-item,
ha-card.standard-visuals .modes.swing_vertical .mode-item,
ha-card.standard-visuals .modes.vane_horizontal .mode-item,
ha-card.standard-visuals .modes.vane_vertical .mode-item {
  display: flex;
  flex: initial;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  min-width: 0;
  min-height: 24px;
  padding: var(--st-spacing, var(--st-default-spacing)) 0;
  font-size: inherit;
  line-height: 1.5;
  line-height: var(--ha-line-height-normal, 1.5);
}

ha-card.standard-visuals .mode-icon,
ha-card.standard-visuals .modes.preset .mode-icon,
ha-card.standard-visuals .modes.preset.compact .mode-icon,
ha-card.standard-visuals .modes.fan .mode-icon,
ha-card.standard-visuals .modes.fan-preset .mode-icon {
  --iron-icon-width: 24px;
  --iron-icon-height: 24px;
  --mdc-icon-size: 24px;
  position: static;
  top: auto;
  width: 24px;
  height: 24px;
  flex: initial;
}

ha-card.standard-visuals .mode-label,
ha-card.standard-visuals .modes.preset.compact .mode-label,
ha-card.standard-visuals .modes.fan .mode-label,
ha-card.standard-visuals .modes.fan-preset .mode-label {
  display: block;
  min-height: 0;
  line-height: inherit;
}

ha-card.standard-visuals .modes.heading {
  grid-template-columns: min-content;
}

ha-card.standard-visuals .header__icon-wrap.slash-off::before,
ha-card.standard-visuals .header__icon-wrap.slash-off::after,
ha-card.standard-visuals .mode-item::after,
ha-card.standard-visuals .thermostat-trigger::before {
  display: none;
}

ha-card.standard-visuals .mode-item.active {
  box-shadow: none;
}

ha-card.standard-visuals .mode-item.active.off {
  background: var(--st-mode-active-background, var(--off-color));
}

ha-card.standard-visuals .mode-item.active.heat {
  background: var(--st-mode-active-background, var(--heat-color));
}

ha-card.standard-visuals .mode-item.active.cool {
  background: var(--st-mode-active-background, var(--cool-color));
}

ha-card.standard-visuals .mode-item.active.heat_cool {
  background: var(--st-mode-active-background, var(--heat_cool-color));
}

ha-card.standard-visuals .mode-item.active.auto {
  background: var(--st-mode-active-background, var(--auto-color));
}

ha-card.standard-visuals .mode-item.active.dry {
  background: var(--st-mode-active-background, var(--dry-color));
}

ha-card.standard-visuals .mode-item.active.fan_only {
  background: var(--st-mode-active-background, var(--fan_only-color));
}

ha-card.standard-visuals .mode-item:active,
ha-card.standard-visuals .thermostat-trigger:active {
  transform: none;
}

.card-config {
  display: block;
}

.editor-extra-entities {
  margin-top: calc(var(--st-spacing, var(--st-default-spacing)) * 2);
  padding-top: calc(var(--st-spacing, var(--st-default-spacing)) * 2);
  border-top: 1px solid var(--divider-color);
}

.editor-extra-entities__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: calc(var(--st-spacing, var(--st-default-spacing)) * 2);
  margin-bottom: calc(var(--st-spacing, var(--st-default-spacing)) * 2);
}

.editor-extra-entities h3 {
  margin: 0;
  color: var(--primary-text-color);
  font-size: 16px;
  font-size: var(--ha-font-size-l, 16px);
  font-weight: 500;
  font-weight: var(--ha-font-weight-medium, 500);
}

.editor-extra-entities p {
  margin: calc(var(--st-spacing, var(--st-default-spacing)) / 2) 0 0;
  color: var(--secondary-text-color);
}

.editor-extra-entities__empty {
  padding: calc(var(--st-spacing, var(--st-default-spacing)) * 2);
  border: 1px dashed var(--divider-color);
  border-radius: 8px;
  border-radius: var(--st-mode-radius, 8px);
}

.editor-entity-row {
  display: grid;
  grid-template-columns: minmax(180px, 1fr) minmax(120px, 0.7fr) auto auto;
  align-items: center;
  grid-gap: calc(var(--st-spacing, var(--st-default-spacing)) * 2);
  gap: calc(var(--st-spacing, var(--st-default-spacing)) * 2);
  margin-top: calc(var(--st-spacing, var(--st-default-spacing)) * 2);
}

@media (max-width: 720px) {
  .editor-extra-entities__header,
  .editor-entity-row {
    display: flex;
    align-items: stretch;
    flex-direction: column;
  }
}

.editor-footer {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: calc(var(--st-spacing, var(--st-default-spacing)) * 2);
  margin-top: calc(var(--st-spacing, var(--st-default-spacing)) * 3);
}

.editor-footer__hint {
  color: var(--secondary-text-color);
}

.editor-footer__version {
  margin-left: auto;
  color: var(--secondary-text-color);
  font-size: 12px;
  font-size: var(--ha-font-size-s, 12px);
}
`;function gt(t,e,i,o={}){o=o||{},i=null==i?{}:i;const a=new Event(e,{bubbles:void 0===o.bubbles||o.bubbles,cancelable:Boolean(o.cancelable),composed:void 0===o.composed||o.composed});return a.detail=i,t.dispatchEvent(a),a}function ft(t){const e={...t,layout:t.layout?{...t.layout}:void 0};return!e.current_value_entity&&e.current_temperature_entity&&(e.current_value_entity=e.current_temperature_entity),void 0===e.entities&&void 0!==e.sensors&&(e.entities=e.sensors),e.layout&&void 0===e.layout.entities&&void 0!==e.layout.sensors&&(e.layout.entities=e.layout.sensors),delete e.current_temperature_entity,delete e.sensors,delete e.layout?.sensors,delete e.version,e}!function(t,e){void 0===e&&(e={});var i=e.insertAt;if(t&&"undefined"!=typeof document){var o=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css","top"===i&&o.firstChild?o.insertBefore(a,o.firstChild):o.appendChild(a),a.styleSheet?a.styleSheet.cssText=t:a.appendChild(document.createTextNode(t))}}(pt),function(t){t.HVAC="hvac",t.FAN="fan",t.STATE="state",t.PRESET="preset",t.SWING="swing",t.SWING_HORIZONTAL="swing_horizontal",t.SWING_VERTICAL="swing_vertical",t.VANE_HORIZONTAL="vane_horizontal",t.VANE_VERTICAL="vane_vertical",t.DIRECTION="direction",t.OSCILLATING="oscillating",t.MODE="mode"}(ut||(ut={}));const vt="dual";const yt={getSetpoints:t=>function(t){const e=t?.hvac_mode;return"heat_cool"===e||"auto"===e?vt:"single"}(t)===vt?{target_temp_low:t.target_temp_low,target_temp_high:t.target_temp_high}:{temperature:t.temperature},getRange:t=>({min:t?.min_temp??null,max:t?.max_temp??null,step:t?.target_temp_step??null}),getCurrentValue:t=>t?.current_temperature??null,getCurrentValueTemplate:()=>"{{current_temperature|formatNumber}}",getSetpointService:()=>({domain:"climate",service:"set_temperature"}),getModeService:t=>"vane_horizontal"===t||"vane_vertical"===t?`set_${t}`:`set_${t}_mode`,getModePayloadKey:t=>"vane_horizontal"===t||"vane_vertical"===t?t:`${t}_mode`,getModeAttribute:t=>"vane_horizontal"===t||"vane_vertical"===t?`${t}_positions`:`${t}_modes`,getDefaultControl:()=>["hvac","preset"],getLocalizationDomain:()=>"climate"},_t={climate:yt,fan:{getSetpoints:t=>"number"!=typeof t?.percentage?{}:{percentage:t.percentage},getRange:t=>({min:0,max:100,step:1}),getCurrentValue:t=>null,getCurrentValueTemplate:()=>"{{percentage|formatNumber}}",getSetpointService:()=>({domain:"fan",service:"set_percentage"}),getModeService:t=>"state"===t?"turn_on":"direction"===t?"set_direction":"oscillating"===t?"oscillate":`set_${t}_mode`,getModePayloadKey:t=>"state"===t?"state":"direction"===t?"direction":"oscillating"===t?"oscillating":`${t}_mode`,getModeAttribute:t=>"state"===t?"state":"direction"===t?"direction":"oscillating"===t?"oscillating":`${t}_modes`,getDefaultControl:()=>["preset","direction","oscillating","state"],transformModePayloadValue:(t,e)=>"oscillating"===t?"true"===e:e,getLocalizationDomain:()=>"fan"},humidifier:{getSetpoints:t=>({humidity:t?.humidity}),getRange:t=>({min:t?.min_humidity??0,max:t?.max_humidity??100,step:1}),getCurrentValue:t=>t?.current_humidity??null,getCurrentValueTemplate:()=>"{{current_humidity|formatNumber}}",getSetpointService:()=>({domain:"humidifier",service:"set_humidity"}),getModeService:t=>"state"===t?"turn_on":"mode"===t?"set_mode":`set_${t}`,getModePayloadKey:t=>"state"===t?"state":"mode"===t?"mode":t,getModeAttribute:t=>"state"===t?"state":"mode"===t?"available_modes":`${t}_modes`,getDefaultControl:()=>["mode","state"],getLocalizationDomain:()=>"humidifier"}};function bt(t){if(!t)return yt;const e=t.split(".")[0];return _t[e]??yt}const wt=process.env.BUILD_TIME,xt=["climate","fan","humidifier"],$t=[ut.HVAC,ut.FAN,ut.STATE,ut.PRESET,ut.SWING,ut.SWING_HORIZONTAL,ut.SWING_VERTICAL,ut.VANE_HORIZONTAL,ut.VANE_VERTICAL,ut.DIRECTION,ut.OSCILLATING,ut.MODE],At=Object.values(ut),zt={[ut.HVAC]:"HVAC modes",[ut.FAN]:"Fan modes",[ut.STATE]:"On/off state",[ut.PRESET]:"Preset modes",[ut.SWING]:"Swing modes",[ut.SWING_HORIZONTAL]:"Horizontal swing",[ut.SWING_VERTICAL]:"Vertical swing",[ut.VANE_HORIZONTAL]:"Horizontal vane",[ut.VANE_VERTICAL]:"Vertical vane",[ut.DIRECTION]:"Direction",[ut.OSCILLATING]:"Oscillating",[ut.MODE]:"Modes"},kt={header:{},layout:{mode:{}}},Et={entity:"Entity (required)",current_value_entity:"Current value source",show_header:"Show header",name:"Name",icon:"Icon","toggle.entity":"Toggle entity","toggle.name":"Toggle label","toggle.icon":"Toggle icon","layout.mode.names":"Mode names","layout.mode.icons":"Mode icons","layout.mode.headings":"Mode headings",decimals:"Decimals",unit:"Unit","layout.step":"Step layout",step_size:"Step size",fallback:"Fallback text","hide.temperature":"Hide current value","hide.state":"Hide state","hide.setpoint_label":"Hide target label",hide_setpoint:"Hide target controls","label.temperature":"Current value label","label.state":"State label","label.setpoint":"Target label","layout.entities.type":"Entity row layout","layout.entities.labels":"Show entity row labels",enhanced_visuals:"Enhanced visuals","tap_action.action":"Tap action","hold_action.action":"Hold action","double_tap_action.action":"Double-tap action"};for(const t of $t)Et[`control.${t}`]=zt[t];const St=t=>"function"==typeof structuredClone?structuredClone(t):JSON.parse(JSON.stringify(t)),Ct=t=>!Array.isArray(t.schema)||0!==t.schema.length,Tt=[{value:"more-info",label:"More info"},{value:"toggle",label:"Toggle"},{value:"none",label:"None"}],Ot=[{value:"row",label:"Row"},{value:"column",label:"Column"}],Nt=[{value:"auto",label:"Auto (from entity)"},{value:"0.1",label:"0.1"},{value:"0.5",label:"0.5"},{value:"1",label:"1"}],Pt=[{value:"table",label:"Table"},{value:"list",label:"List"}],Vt=["entity","current_value_entity","decimals","unit","fallback","layout.step","layout.mode.names","layout.mode.icons","layout.mode.headings","layout.entities.type","layout.entities.labels","hide.temperature","hide.state","hide.setpoint_label","hide_setpoint","label.temperature","label.state","label.setpoint","tap_action.action","hold_action.action","double_tap_action.action"],Mt=["show_header","name","icon","toggle.entity","toggle.name","toggle.icon"];function Rt(t,e,i){const o=e.split(".");let a=t;for(;o.length>1;){const t=o.shift();Object.prototype.hasOwnProperty.call(a,t)||(a[t]={}),a=a[t]}a[o[0]]=i}function It(t,e){const i=e.split(".");let o=t;for(;i.length>1;){const t=i.shift();if(!o[t])return;o=o[t]}delete o[i[0]]}function Lt(t){const e=bt(t.entity);return $t.reduce((i,o)=>(i[`control.${o}`]=function(t,e,i){const o=t.control;return!1!==o&&(Array.isArray(o)?o.includes(e):o&&"object"==typeof o?void 0!==o[e]&&!1!==o[e]:i.getDefaultControl().includes(e))}(t,o,e),i),{})}function jt(t,e){if(!t.entity||!e?.states?.[t.entity])return[];const i=e.states[t.entity].attributes??{},[o]=t.entity.split("."),a=bt(t.entity);return $t.filter(t=>At.includes(t)&&(t===ut.STATE?"fan"===o||"humidifier"===o:void 0!==i[a.getModeAttribute(t)]))}class Ht extends ct{constructor(){super(...arguments),this._valueChanged=t=>{const e=this._applyFormChange(t.detail.value);this.config=e,gt(this,"config-changed",{config:e})},this._computeLabel=t=>Et[String(t.name)]??String(t.name)}static get styles(){return pt}static getStubConfig(){return{...kt}}setConfig(t){this.config=ft(t||{...kt})}_openLink(){window.open("https://github.com/Wheemer/simple-thermostat/blob/master/README.md","_blank","noopener")}_buildFormData(){const t=this.config.header&&"object"==typeof this.config.header?this.config.header:{};return{entity:this.config.entity??"",current_value_entity:this.config.current_value_entity??"",show_header:!1!==this.config.header,"layout.mode.names":!1!==this.config.layout?.mode?.names,"layout.mode.icons":!1!==this.config.layout?.mode?.icons,"layout.mode.headings":!0===this.config.layout?.mode?.headings,decimals:this.config.decimals??"",unit:"string"==typeof this.config.unit?this.config.unit:"","layout.step":!1===this.config.enhanced_visuals?this.config.layout?.step??"column":this.config.layout?.step??"row",step_size:null!=this.config.step_size?String(this.config.step_size):"auto",fallback:this.config.fallback??"","hide.temperature":!0===this.config.hide?.temperature,"hide.state":!0===this.config.hide?.state,hide_setpoint:!0===this.config.hide_setpoint,"hide.setpoint_label":!0===this.config.hide?.setpoint_label,"label.temperature":this.config.label?.temperature??"","label.state":this.config.label?.state??"","label.setpoint":this.config.label?.setpoint??"","layout.entities.type":this.config.layout?.entities?.type??"table","layout.entities.labels":!1!==this.config.layout?.entities?.labels,enhanced_visuals:!1!==this.config.enhanced_visuals,name:t.name??"",icon:"string"==typeof t.icon?t.icon:"","toggle.entity":t.toggle?.entity??"","toggle.name":t.toggle?.name??"","toggle.icon":"string"==typeof t.toggle?.icon?t.toggle.icon:"","tap_action.action":this.config.tap_action?.action??"more-info","hold_action.action":this.config.hold_action?.action??"none","double_tap_action.action":this.config.double_tap_action?.action??"none",...Lt(this.config)}}_applyFormChange(t){const e=this._buildFormData(),i=function(t,e){return new Set(Object.keys(e).filter(i=>t[i]!==e[i]))}(e,t);!function(t,e){t.has("enhanced_visuals")&&(e.layout?.step||t.delete("layout.step"))}(i,this.config);const o={...e,...t},a=St(this.config);if(this._applyDirectFormPaths(a,o,i),!1===o.enhanced_visuals?a.enhanced_visuals=!1:delete a.enhanced_visuals,Mt.some(t=>i.has(t))&&(!1===o.show_header?a.header=!1:this._applyHeaderFormChange(a,o)),i.has("step_size")&&this._applyStepSize(a,o.step_size),i.has("entity")||$t.some(t=>i.has(`control.${t}`))){const t=function(t,e,i){const o=String(t.entity??e.entity??""),a=bt(o),r=jt({...e,entity:o},i).filter(e=>t[`control.${e}`]),n=a.getDefaultControl();return 0!==r.length&&(e.control&&!Array.isArray(e.control)&&"object"==typeof e.control?r.reduce((t,i)=>(t[i]=e.control[i]||{},t),{}):r.length===n.length&&r.every((t,e)=>t===n[e])?void 0:r)}(o,this.config,this.hass);void 0===t?delete a.control:a.control=t}return a}_applyDirectFormPaths(t,e,i){for(const o of Vt){if(!i.has(o))continue;const a=e[o];null==a||""===a?It(t,o):Rt(t,o,a)}}_applyHeaderFormChange(t,e){!1!==t.header&&null!=t.header||(t.header={});const i=t.header,o=e.name,a=e.icon,r=e["toggle.entity"],n=e["toggle.name"],s=e["toggle.icon"];"string"==typeof o&&o?i.name=o:delete i.name,"string"==typeof a&&a?i.icon=a:delete i.icon,"string"==typeof r&&r?(i.toggle=i.toggle||{entity:r},i.toggle.entity=r,"string"==typeof n&&n?i.toggle.name=n:delete i.toggle.name,"string"==typeof s&&s?i.toggle.icon=s:delete i.toggle.icon):delete i.toggle}_applyStepSize(t,e){if("auto"===e||""===e||null==e)return void delete t.step_size;const i=Number(e);t.step_size=Number.isNaN(i)?e:i}_getExtraEntities(){return Array.isArray(this.config.entities)?this.config.entities:[]}_commitEntityRows(t){const e=St(this.config);t.length>0?e.entities=t:delete e.entities,this.config=e,gt(this,"config-changed",{config:e})}_addEntityRow(){this._commitEntityRows([...this._getExtraEntities(),{entity:""}])}_removeEntityRow(t){this._commitEntityRows(this._getExtraEntities().filter((e,i)=>i!==t))}_updateEntityRow(t,e,i){const o=this._getExtraEntities().map((o,a)=>{if(a!==t)return o;const r={...o};return"string"==typeof i&&i?r[e]=i:delete r[e],r});this._commitEntityRows(o)}_renderExtraEntityRows(){const t=this._getExtraEntities();return W`
      <section class="editor-extra-entities">
        <div class="editor-extra-entities__header">
          <div>
            <h3>Extra entity rows</h3>
            <p>Add the sensors or helpers shown under the main state.</p>
          </div>
          <ha-button @click=${this._addEntityRow}>Add row</ha-button>
        </div>

        ${0===t.length?W`<p class="editor-extra-entities__empty">
              No extra rows configured.
            </p>`:t.map((t,e)=>W`
                <div class="editor-entity-row">
                  <ha-entity-picker
                    .hass=${this.hass}
                    .value=${t.entity??""}
                    allow-custom-entity
                    @value-changed=${t=>this._updateEntityRow(e,"entity",t.detail.value)}
                  ></ha-entity-picker>
                  <ha-textfield
                    label="Name"
                    .value=${t.name??""}
                    @input=${t=>this._updateEntityRow(e,"name",t.target.value)}
                  ></ha-textfield>
                  <ha-icon-picker
                    .hass=${this.hass}
                    .value=${t.icon??""}
                    @value-changed=${t=>this._updateEntityRow(e,"icon",t.detail.value)}
                  ></ha-icon-picker>
                  <ha-button @click=${()=>this._removeEntityRow(e)}>
                    Remove
                  </ha-button>
                </div>
              `)}
      </section>
    `}render(){return this.hass&&this.config?W`
      <div class="card-config">
        <ha-form
          .hass=${this.hass}
          .data=${this._buildFormData()}
          .schema=${function(t,e){const i=jt(t,e),o=t.entity?.split(".")[0],a=bt(t.entity),r=t.entity?e?.states?.[t.entity]:void 0,n=!0===t.hide_setpoint||!r||Object.keys(a.getSetpoints(r.attributes??{})).length>0,s="fan"!==o&&("climate"===o||"humidifier"===o),c="fan"===o?[]:[{name:"current_value_entity",selector:{entity:{domain:["sensor","input_number"]}}}],l=[...s?[{name:"hide.temperature",selector:{boolean:{}}}]:[],{name:"hide.state",selector:{boolean:{}}}],d=[...s?[{name:"label.temperature",selector:{text:{}}}]:[],{name:"label.state",selector:{text:{}}},...n?[{name:"label.setpoint",selector:{text:{}}}]:[]],h=!1===t.header?[]:[{type:"grid",schema:[{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}}]},{name:"toggle.entity",selector:{entity:{}}},{name:"toggle.name",selector:{text:{}}},...t.header&&"object"==typeof t.header&&t.header.toggle?.entity?[{name:"toggle.icon",selector:{icon:{}}}]:[]];return[{name:"entity",required:!0,selector:{entity:{domain:xt}}},{type:"expandable",title:"Card header",schema:[{name:"show_header",selector:{boolean:{}}},...h]},...i.length>0?[{type:"expandable",title:"Controls",schema:[{type:"grid",column_min_width:"150px",schema:i.map(t=>({name:`control.${t}`,selector:{boolean:{}}}))}]}]:[],...n?[{type:"expandable",title:"Target",schema:[{type:"grid",schema:[{name:"layout.step",selector:{select:{mode:"dropdown",options:Ot}}},{name:"step_size",selector:{select:{mode:"dropdown",options:Nt}}}]},{type:"grid",column_min_width:"160px",schema:[{name:"hide_setpoint",selector:{boolean:{}}},{name:"hide.setpoint_label",selector:{boolean:{}}}]}]}]:[],{type:"expandable",title:"Extra entity rows",schema:[{type:"grid",column_min_width:"160px",schema:[{name:"layout.entities.type",selector:{select:{mode:"dropdown",options:Pt}}},{name:"layout.entities.labels",selector:{boolean:{}}}]}]},{type:"expandable",title:"Appearance",schema:[{name:"enhanced_visuals",selector:{boolean:{}}},{type:"grid",column_min_width:"160px",schema:l}].filter(Ct)},{type:"expandable",title:"Advanced",schema:[...c,...s?[{type:"grid",schema:[{name:"decimals",selector:{number:{min:0,max:5,step:1,mode:"box"}}},{name:"unit",selector:{text:{}}}]}]:[],{name:"fallback",selector:{text:{}}},{type:"grid",column_min_width:"160px",schema:d},{type:"grid",column_min_width:"150px",schema:[{name:"layout.mode.names",selector:{boolean:{}}},{name:"layout.mode.icons",selector:{boolean:{}}},{name:"layout.mode.headings",selector:{boolean:{}}}]},{type:"grid",column_min_width:"150px",schema:[{name:"tap_action.action",selector:{select:{mode:"dropdown",options:Tt}}},{name:"hold_action.action",selector:{select:{mode:"dropdown",options:Tt}}},{name:"double_tap_action.action",selector:{select:{mode:"dropdown",options:Tt}}}]}].filter(Ct)}]}(this.config,this.hass)}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        ${this._renderExtraEntityRows()}

        <div class="editor-footer">
          <ha-button @click=${this._openLink}>
            <ha-svg-icon .path=${"M12 21.5C10.65 20.65 8.2 20 6.5 20C4.85 20 3.15 20.3 1.75 21.05C1.65 21.1 1.6 21.1 1.5 21.1C1.25 21.1 1 20.85 1 20.6V6C1.6 5.55 2.25 5.25 3 5C4.11 4.65 5.33 4.5 6.5 4.5C8.45 4.5 10.55 4.9 12 6C13.45 4.9 15.55 4.5 17.5 4.5C18.67 4.5 19.89 4.65 21 5C21.75 5.25 22.4 5.55 23 6V20.6C23 20.85 22.75 21.1 22.5 21.1C22.4 21.1 22.35 21.1 22.25 21.05C20.85 20.3 19.15 20 17.5 20C15.8 20 13.35 20.65 12 21.5M12 8V19.5C13.35 18.65 15.8 18 17.5 18C18.7 18 19.9 18.15 21 18.5V7C19.9 6.65 18.7 6.5 17.5 6.5C15.8 6.5 13.35 7.15 12 8M13 11.5C14.11 10.82 15.6 10.5 17.5 10.5C18.41 10.5 19.26 10.59 20 10.78V9.23C19.13 9.08 18.29 9 17.5 9C15.73 9 14.23 9.28 13 9.84V11.5M17.5 11.67C15.79 11.67 14.29 11.93 13 12.46V14.15C14.11 13.5 15.6 13.16 17.5 13.16C18.54 13.16 19.38 13.24 20 13.4V11.9C19.13 11.74 18.29 11.67 17.5 11.67M20 14.57C19.13 14.41 18.29 14.33 17.5 14.33C15.67 14.33 14.17 14.6 13 15.13V16.82C14.11 16.16 15.6 15.83 17.5 15.83C18.54 15.83 19.38 15.91 20 16.07V14.57Z"} slot="icon"></ha-svg-icon>
            All configuration options
          </ha-button>
          <span class="editor-footer__hint">
            YAML remains available for specialized setups
          </span>
          <span class="editor-footer__version"
            >v${e} - ${wt}</span
          >
        </div>
      </div>
    `:W``}}i([function(t){return mt({...t,state:!0,attribute:!1})}()],Ht.prototype,"config",void 0),i([mt({attribute:!1})],Ht.prototype,"hass",void 0);const Dt=(t,e,i,o)=>{if("length"===i||"prototype"===i)return;if("arguments"===i||"caller"===i)return;const a=Object.getOwnPropertyDescriptor(t,i),r=Object.getOwnPropertyDescriptor(e,i);!Ut(a,r)&&o||Object.defineProperty(t,i,r)},Ut=function(t,e){return void 0===t||t.configurable||t.writable===e.writable&&t.enumerable===e.enumerable&&t.configurable===e.configurable&&(t.writable||t.value===e.value)},Ft=(t,e)=>`/* Wrapped ${t}*/\n${e}`,Wt=Object.getOwnPropertyDescriptor(Function.prototype,"toString"),Bt=Object.getOwnPropertyDescriptor(Function.prototype.toString,"name");function Gt(t,e,{ignoreNonConfigurable:i=!1}={}){const{name:o}=t;for(const o of Reflect.ownKeys(e))Dt(t,e,o,i);return((t,e)=>{const i=Object.getPrototypeOf(e);i!==Object.getPrototypeOf(t)&&Object.setPrototypeOf(t,i)})(t,e),((t,e,i)=>{const o=""===i?"":`with ${i.trim()}() `,a=Ft.bind(null,o,e.toString());Object.defineProperty(a,"name",Bt);const{writable:r,enumerable:n,configurable:s}=Wt;Object.defineProperty(t,"toString",{value:a,writable:r,enumerable:n,configurable:s})})(t,e,o),t}const qt=(t,e={})=>{if("function"!=typeof t)throw new TypeError(`Expected the first argument to be a function, got \`${typeof t}\``);const{wait:i=0,maxWait:o=Number.POSITIVE_INFINITY,before:a=!1,after:r=!0}=e;if(i<0||o<0)throw new RangeError("`wait` and `maxWait` must not be negative.");if(!a&&!r)throw new Error("Both `before` and `after` are false, function wouldn't be called.");let n,s,c;const l=function(...e){const l=this,d=()=>{s=void 0,n&&(clearTimeout(n),n=void 0),r&&(c=t.apply(l,e))},h=a&&!n;return clearTimeout(n),n=setTimeout(()=>{n=void 0,s&&(clearTimeout(s),s=void 0),r&&(c=t.apply(l,e))},i),o>0&&o!==Number.POSITIVE_INFINITY&&!s&&(s=setTimeout(d,o)),h&&(c=t.apply(l,e)),c};return Gt(l,t),l.cancel=()=>{n&&(clearTimeout(n),n=void 0),s&&(clearTimeout(s),s=void 0)},l};var Zt;!function(t){t.OFF="off",t.HEAT="heat",t.COOL="cool",t.HEAT_COOL="heat_cool",t.AUTO="auto",t.DRY="dry",t.FAN_ONLY="fan_only"}(Zt||(Zt={}));const Kt=["auto","silent","quiet","low","mid","medium","high","max","turbo","full"];const Yt=[["silent","quiet"],["low"],["mid","medium"],["high"],["max","turbo","full"]],Jt=["mdi:fan-speed-1","mdi:fan-speed-2","mdi:fan-speed-3","st:fan-speed-4","st:fan-speed-5"],Xt=t=>String(t).toLowerCase().replace(/\s+/g,"_");function Qt(t,e){const i=Xt(t),o=new Set(e.map(Xt)),a=Yt.filter(t=>t.some(t=>o.has(t))).findIndex(t=>t.includes(i));return a>=0?Jt[a]:void 0}function te(t,{decimals:e=1,fallback:i="N/A",locale:o}={}){if(null===t||""===t||["boolean","undefined"].includes(typeof t))return i;const a=Number(t);return Number.isNaN(a)?i:o?"decimal_comma"===o.number_format||"space_comma"===o.number_format?a.toFixed(e).replace(".",","):"comma_decimal"===o.number_format||"none"===o.number_format?a.toFixed(e):new Intl.NumberFormat("system"===o.number_format?void 0:o.language,{minimumFractionDigits:e,maximumFractionDigits:e}).format(a):a.toFixed(e)}function ee(t){if("string"!=typeof t.entity_id)return;const[e]=t.entity_id.split(".");return"climate"===e?"hvac_action":"humidifier"===e?"action":void 0}function ie(t){const e=ee(t),i=e?t.attributes?.[e]:void 0;return"string"==typeof i&&i?i:void 0}function oe(t,e,i){if("string"!=typeof t.entity_id)return void 0===t.state?"":String(t.state);const[o]=t.entity_id.split("."),a=ie(t),r=ee(t);if(a)return"function"==typeof e.formatEntityAttributeValue&&r?e.formatEntityAttributeValue(t,r):i(a,function(t){if("string"!=typeof t.entity_id)return"";const[e]=t.entity_id.split("."),i=ee(t);return e&&i?`state_attributes.${e}.${i}.`:""}(t));if("fan"===o&&"on"===t.state){if(t.attributes?.preset_mode)return"function"==typeof e.formatEntityAttributeValue?e.formatEntityAttributeValue(t,"preset_mode"):i(t.attributes.preset_mode,"state_attributes.fan.preset_mode.");if("number"==typeof t.attributes?.percentage)return`${t.attributes.percentage}%`;if(t.attributes?.speed)return String(t.attributes.speed)}return"function"==typeof e.formatEntityState?e.formatEntityState(t):i(String(t.state),`component.${o}.state._.`)}const ae=[["heat",/\b(heat|heater|furnace|radiator|boiler|water[_ -]?heater)\b/],["cool",/\b(cool|cooling|ac|a\/c|air[_ -]?conditioner|snowflake)\b/],["dry",/\b(dry|drying|dehumidifier|dehumidify)\b/],["water-percent",/\b(humidifier|humidify|humidity)\b/],["fan",/\b(fan|blower)\b/],["lightbulb",/\b(light|lamp|bulb)\b/]],re={heat:["component.climate.state._.heat","state_attributes.climate.hvac_action.heating"],cool:["component.climate.state._.cool","state_attributes.climate.hvac_action.cooling"],dry:["component.climate.state._.dry","state_attributes.humidifier.action.drying"],fan:["component.fan.entity_component._.name"],lightbulb:["component.light.entity_component._.name"],"water-percent":["component.humidifier.entity_component._.name","state_attributes.humidifier.action.humidifying"]};function ne(t,e){const i=t.toLowerCase().replace(/[.:]/g," "),o=function(t){return"function"!=typeof t?.localize?[]:Object.entries(re).flatMap(([e,i])=>i.map(e=>t.localize(e)).filter(t=>t&&!i.includes(t)).map(t=>{return[e,(i=String(t),i.toLowerCase().replace(/[.:]/g," "))];var i}))}(e).find(([,t])=>!!t&&(i===t||i.includes(t)));if(o)return o[0];const a=ae.find(([,t])=>t.test(i));return a?.[0]??""}function se(t){if("string"!=typeof t||!t)return"";const e=(i=t.replace(/^[a-z]+:/,""),String(i??"").replace(/[^a-z0-9_-]/gi,""));var i;const o=ne(e.replace(/-/g," "));return o||(["fire","radiator","heat-wave","heating-coil","water-boiler","water-boiler-auto","water-boiler-off"].includes(e)?"heat":["snowflake","air-conditioner"].includes(e)?"cool":"fan"===e?"fan":e.includes("light")?"lightbulb":["water-percent","air-humidifier"].includes(e)||["air-humidifier-off"].includes(e)?"water-percent":e)}function ce({icon:t,label:e,entity:i,hass:o}){const a=se(t);if(a)return a;const r=function(t){const e=t?.entity_id,i="string"==typeof e?e.split(".")[0]:"",o=t?.attributes?.device_class;return"light"===i?"lightbulb":"fan"===i?"fan":"humidifier"===i?"dehumidifier"===o?"dry":"water-percent":"heat"===o||"heater"===o?"heat":"cold"===o||"cooling"===o?"cool":"moisture"===o||"humidity"===o?"water-percent":""}(i);if(r)return r;return ne([e,i?.entity_id,i?.attributes?.friendly_name].filter(Boolean).join(" "),o)}function le(t){return t?`toggle-${t}`:""}function de({header:t,toggleEntityChanged:e,entity:i,hass:o,openEntityPopover:a}){if(!1===t)return G;const r=ie(i)||i.state;let n=t.icon;"object"==typeof t.icon&&(n=n?.[r]??!1);const s=Boolean(t.slashOffIcon),c=t?.name??!1;return W`
    <header>
      <div class="header__main clickable" @click=${()=>a()}>
        ${function(t,e,i,o=!1){const a=i&&i!==e?` ${i}`:"";return t?W`
        <span
          class="header__icon-wrap ${e}${a} ${o?"slash-off":""}"
        >
          <ha-icon
            class="header__icon ${e}${a}"
            .icon=${t}
          ></ha-icon>
        </span>
      `:G}(n,i.state,r,s)}
        ${function(t){return t?W`<h2 class="header__title">${t}</h2>`:G}(c)}
      </div>
      ${function(t,e){if(!t?.length)return G;const i=t.map(({icon:t,hide_inactive:i,state:o})=>o?W` <ha-icon
      class="fault-icon ${"on"===o.state?"active":i?" hide":""}"
      .icon=${t||o.attributes?.icon}
      @click="${()=>e(o.entity_id)}"
    ></ha-icon>`:G);return W` <div class="faults">${i}</div>`}(t.faults,a)}
      ${function(t,e,i,o){return t?.length?W`
    <div class="header__toggles">
      ${t.map(t=>{const a=t.entity?.entity_id,r=t.entity?.state,n="string"==typeof a?a.split(".")[0]:"",s=le(ce({icon:"string"==typeof t.icon?t.icon:t.entity?.attributes?.icon,label:t.label,entity:t.entity,hass:o}));return W`
          <div
            class="header__toggle ${r||""} ${n?`domain-${n}`:""} ${s}"
          >
            <span
              class="clickable toggle-label ${r||""} ${n?`domain-${n}`:""} ${s}"
              title=${t.label||t.entity?.attributes?.friendly_name}
              @click=${()=>e(a)}
              >${!1!==t.icon?W`<ha-icon .icon=${t.icon}></ha-icon>`:t.label}
            </span>
            <ha-switch
              .checked=${"on"===t.entity?.state}
              @change=${t=>i(t,a)}
            ></ha-switch>
          </div>
        `})}
    </div>
  `:G}(t.toggles,a,e,o)}
    </header>
  `}function he(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function me(t,e,i){if(!e||"string"!=typeof e)return String(t);const o=String(t);return new RegExp(`${he(e)}$`).test(o)?o:`${o}${function(t,e){if(e){const i=e.match(new RegExp(`(\\s*)${he(t)}$`));if(i)return i[1]??""}return"%"===t?"":" "}(e,i)}${e}`}const ue=["automation","fan","humidifier","input_boolean","light","switch"];function pe(t){return String(t??"").replace(/[^a-z0-9_-]/gi,"")}function ge({hide:t=!1,hass:e,state:i,details:o,localize:a,openEntityPopover:r}){if(t||void 0===i)return;const{type:n,heading:s,icon:c,unit:l,decimals:d,tooltip:h,entity:m}=o,u="string"==typeof l&&l.length>0,p="object"==typeof i?i.entity_id:m,g=p&&"function"==typeof r,f=h||("object"==typeof i?i?.attributes?.friendly_name||i?.entity_id:m?e.states?.[m]?.attributes?.friendly_name||m:void 0);let v,y="",_="",b=!1;if("relativetime"===n)v=W`
      <div class="entity-value">
        <ha-relative-time .datetime=${i} .hass=${e}></ha-relative-time>
      </div>
    `;else if("object"==typeof i){const[t]=i.entity_id.split(".");y=t,_=i.state,b=ue.includes(t);const o=[b&&"toggle-entity",y&&`domain-${pe(y)}`,_&&`state-${pe(_)}`,b&&le(ce({icon:c||i.attributes?.icon,label:s||i.attributes?.friendly_name,entity:i,hass:e}))].filter(Boolean).join(" ");if(b)v=W`
        <div class="entity-value ${o}">
          <ha-switch
            .checked=${"on"===i.state}
            @change=${t=>function(t,e,i){const o="turn_"+(i?"on":"off");"function"==typeof t.performAction?t.performAction({action:`homeassistant.${o}`,data:{entity_id:e}}):t.callService("homeassistant",o,{entity_id:e})}(e,i.entity_id,t.target.checked)}
          ></ha-switch>
        </div>
      `;else{const o=["component",t,"state",i.attributes?.device_class??"_",""].join(".");let n="function"==typeof e.formatEntityState?e.formatEntityState(i):a(i.state,o);"number"==typeof d&&(n=te(i.state,{decimals:d,locale:e.locale}));const s=i.attributes.unit_of_measurement??"",h="humidity"===i.attributes?.device_class||i.entity_id?.includes("humidity")||"mdi:water-percent"===c?"%":"";v=W`
        <div
          class="entity-value ${g?"clickable":""}"
          title=${f}
          @click="${g?()=>r(i.entity_id):null}"
        >
          ${me(n,u?l:s||h,n)}
        </div>
      `}}else{let t="number"==typeof d?te(i,{decimals:d,locale:e.locale}):i;v=W`<div
      class="entity-value ${g?"clickable":""}"
      title=${f||G}
      @click=${g?()=>r(p):null}
    >
      ${me(t,!!u&&l)}
    </div>`}if(!1===s)return v;const w=s||f,x=["entity-heading",g&&"clickable",b&&"toggle-entity",y&&`domain-${pe(y)}`,_&&`state-${pe(_)}`,b&&le(ce({icon:c||i?.attributes?.icon,label:"string"==typeof s?s:i?.attributes?.friendly_name,entity:i,hass:e}))].filter(Boolean).join(" "),$=c?W`
        <ha-icon
          icon="${c}"
          title=${w}
          @click=${g?()=>r(p):null}
        ></ha-icon>
      `:` ${s}: `;return W`<div
      class=${x}
      title=${c?w:G}
      @click=${g?()=>r(p):null}
    >
      ${$}
    </div>
    ${v} `}function fe({_hide:t,entity:e,unit:i,hass:o,entities:a,config:r,localize:n,openEntityPopover:s,adapter:c}){const l=r.current_value_entity,d=l?o.states[l]:e,h=l?d?.state:c.getCurrentValue(e.attributes),m=r?.layout?.entities?.labels??!0,u=oe(e,o,n),p=[ge({hide:t.temperature||null==h,state:me(te(h,{...r,locale:o.locale}),i),hass:o,openEntityPopover:s,details:{heading:!!m&&(r?.label?.temperature??n("ui.card.climate.currently")),tooltip:d?.attributes?.friendly_name??l,entity:l??r.entity}}),ge({hide:t.state,state:u,hass:o,openEntityPopover:s,details:{heading:!!m&&(r?.label?.state??n("ui.panel.lovelace.editor.card.generic.state")),entity:r.entity}}),...a.map(({name:t,state:e,...i})=>ge({state:e,hass:o,localize:n,openEntityPopover:s,details:{...i,heading:m&&t,tooltip:t}}))||null].filter(t=>null!==t);return function(t,e){const{type:i,labels:o}=t?.layout?.entities??{type:"table",labels:!0},a=[o?"with-labels":"without-labels","list"===i?"as-list":"as-table",1===e.filter(t=>null!=t).length?"single-row":""];return W` <div class="entities ${a.join(" ")}">${e}</div> `}(r,p)}const ve={"st:fan-speed-4":{path:"M16 15V21H19V23H21V15H19V19H18V15H16Z"},"st:fan-speed-5":{path:"M16 15H21V17H18V18H19C20.11 18 21 18.89 21 20V21C21 22.11 20.11 23 19 23H16V21H19V20H16V15Z"}};function ye({state:t,entity:e,hass:i,mode:o,adapter:a,modeOptions:r,localize:n,setMode:s}){const{type:c,hide_when_off:l,mode:d="none",list:h,name:m,heading:u,icons:p}=o;if(0===h.length||l&&t===Zt.OFF)return null;const g="hvac"===c?null:a.getModePayloadKey(c);let f=g?`state_attributes.${a.getLocalizationDomain()}.${g}.`:"";"hvac"===c?f="component.climate.state._.":"vane_horizontal"===c||"vane_vertical"===c?f="":"direction"!==c&&"oscillating"!==c&&"mode"!==c||(f="");const v=t=>t?!1===r?.icons||!1===p||["swing","swing_horizontal","swing_vertical","vane_horizontal","vane_vertical"].includes(c)&&!0!==p?null:function(t){return t?W` <ha-icon class="mode-icon" .icon=${t}></ha-icon> `:null}(t):null,y=(t,e)=>{const i=n(t);return i&&i!==t?i:e},_="hvac"==c?"operation":`${c}_mode`;let b;b="vane_horizontal"===c?"Vane Horizontal":"vane_vertical"===c?"Vane Vertical":"swing_horizontal"===c?y("ui.card.climate.swing_horizontal_mode","Swing Horizontal"):"swing_vertical"===c?y("ui.card.climate.swing_vertical_mode","Swing Vertical"):"direction"===c?"Direction":"oscillating"===c?"Oscillating":"mode"===c?"Mode":"preset"===c?!0===u&&y(`ui.card.${a.getLocalizationDomain()}.${_}`,"Preset"):"state"===c?!0===u&&"State":y(`ui.card.${a.getLocalizationDomain()}.${_}`,"hvac"===c?"Operation":"Mode");const w=!1!==m&&(m||b),x="fan"===c||"preset"===c&&"fan"===a.getLocalizationDomain()?"Fan speed":"swing"===c?"Swing mode":"swing_horizontal"===c?y("ui.card.climate.swing_horizontal_mode","Horizontal swing"):"swing_vertical"===c?y("ui.card.climate.swing_vertical_mode","Vertical swing"):"vane_horizontal"===c?"Horizontal vane":"vane_vertical"===c?"Vertical vane":"",$=(!0===r?.headings||!0===u)&&!1!==w,A="preset"===c&&"fan"===a.getLocalizationDomain(),z=("hvac"===c||"state"===c)&&h.length<=3,k="preset"===c&&h.length<=4||["swing","swing_horizontal","swing_vertical","vane_horizontal","vane_vertical"].includes(c),E=h.length>4||"hvac"===c&&h.length>3||"fan"===c&&h.length>3;return W`
    <div
      class="modes ${c} ${A?"fan-preset":""} ${$?"heading":""} ${k?"compact":""} ${E?"dense":""} ${z?"sparse":""}"
      role="group"
      aria-label=${w||c}
    >
      ${$?W` <div class="mode-title">${w}</div> `:""}
      ${h.map(({value:t,icon:o,name:a})=>{const l=(t=>String(t).replace(/[^a-z0-9_-]/gi,""))(t),h=((t,o)=>!1===t||!1===r?.names?null:t!==o?f?n(t,f):t:"hvac"!==c&&"state"!==c||"function"!=typeof i?.formatEntityState?g&&e&&"function"==typeof i?.formatEntityAttributeValue?i.formatEntityAttributeValue(e,g,o):f?n(t,f):t:i.formatEntityState({...e,state:o}))(a,t);return W`
          <div
            class="mode-item ${l} ${t===d?"active":""}"
            role="button"
            tabindex="0"
            aria-pressed=${t===d?"true":"false"}
            aria-label=${a||t}
            title=${h?G:x||G}
            @click=${()=>s(c,t)}
            @keydown=${e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),s(c,t))}}
          >
            ${v(o)}
            ${h?W`<span class="mode-label">${h}</span>`:null}
          </div>
        `})}
    </div>
  `}window.customIconsets=window.customIconsets||{},window.customIconsets.st||(window.customIconsets.st=async t=>{const e=ve[`st:${t}`];return e?{path:`M13 19C13 17.59 13.5 16.3 14.3 15.28C14.17 14.97 14.03 14.65 13.86 14.34C14.26 14 14.57 13.59 14.77 13.11C15.26 13.21 15.78 13.39 16.25 13.67C17.07 13.25 18 13 19 13C20.05 13 21.03 13.27 21.89 13.74C21.95 13.37 22 12.96 22 12.5C22 8.92 18.03 8.13 14.33 10.13C14 9.73 13.59 9.42 13.11 9.22C13.3 8.29 13.74 7.24 14.73 6.75C17.09 5.57 17 2 12.5 2C8.93 2 8.14 5.96 10.13 9.65C9.72 9.97 9.4 10.39 9.21 10.87C8.28 10.68 7.23 10.25 6.73 9.26C5.56 6.89 2 7 2 11.5C2 15.07 5.95 15.85 9.64 13.87C9.96 14.27 10.39 14.59 10.88 14.79C10.68 15.71 10.24 16.75 9.26 17.24C6.9 18.42 7 22 11.5 22C12.31 22 13 21.78 13.5 21.41C13.19 20.67 13 19.86 13 19M12 13C11.43 13 11 12.55 11 12S11.43 11 12 11C12.54 11 13 11.45 13 12S12.54 13 12 13${e.path}`}:{path:""}});const _e={auto:"mdi:radiator",cooling:"mdi:snowflake",fan:"mdi:fan",heating:"mdi:radiator",idle:"mdi:radiator-disabled",on:"mdi:power",off:"mdi:radiator-off"},be={fan:{on:"mdi:fan",off:"mdi:fan-off"},humidifier:{on:"mdi:air-humidifier",off:"mdi:air-humidifier-off"}},we={auto:"hass:autorenew",cool:"hass:snowflake",dry:"hass:water-percent",fan_only:"hass:fan",heat_cool:"hass:autorenew",heat:"hass:fire",on:"hass:power",off:"hass:power",forward:"mdi:arrow-right",reverse:"mdi:arrow-left",true:"mdi:fan",false:"mdi:fan-off",low:"mdi:fan-speed-1",mid:"mdi:fan-speed-2",medium:"mdi:fan-speed-2",high:"mdi:fan-speed-3",max:"st:fan-speed-4",turbo:"st:fan-speed-5",1:"mdi:fan-speed-1",2:"mdi:fan-speed-2",3:"mdi:fan-speed-3",4:"st:fan-speed-4",5:"st:fan-speed-5",automatic:"mdi:fan-auto",powerful:"mdi:fan-plus",quiet:"mdi:fan-minus",silent:"mdi:fan-minus",normal:"mdi:water-percent",vertical:"mdi:arrow-up-down",top:"mdi:arrow-up","top-middle":"mdi:arrow-top-right",middle:"mdi:arrow-collapse-vertical","middle-bottom":"mdi:arrow-bottom-right",bottom:"mdi:arrow-down",upper:"mdi:arrow-up",lower:"mdi:arrow-down",horizontal:"mdi:arrow-left-right",left:"mdi:arrow-left","center-left":"mdi:arrow-top-left",center:"mdi:arrow-collapse-horizontal","center-right":"mdi:arrow-top-right",right:"mdi:arrow-right",both:"mdi:arrow-all",swing:"mdi:arrow-oscillating",wide:"mdi:arrow-expand-horizontal",narrow:"mdi:arrow-collapse-horizontal",split:"mdi:arrow-split-vertical",none:"mdi:circle-off-outline",away:"mdi:home-export-outline",eco:"mdi:leaf",boost:"mdi:weather-windy",comfort:"mdi:sofa",auto_comfort:"mdi:sofa","auto-comfort":"mdi:sofa","auto comfort":"mdi:sofa",home:"mdi:home",sleep:"mdi:sleep",activity:"mdi:run"};function xe(t){const e=String(t),i=e.toLowerCase().replace(/\s+/g,"_");return we[e]??we[i]}function $e(t){const e=String(t);return{low:"Low",mid:"Mid",medium:"Medium",high:"High",max:"Max",turbo:"Turbo",auto:"Auto"}[e.toLowerCase().replace(/\s+/g,"_")]??e}function Ae(t,e,i,o=!0){if(!1===t)return!1;let a;a="string"==typeof t?.name?t.name:!1!==t?.name&&("function"==typeof i.formatEntityName?i.formatEntityName(e):e.attributes.friendly_name);let r=o?function(t){const[e]=t.entity_id.split(".");return t.attributes.icon??be[e]?.[t.state]??(ie(t)?_e:we)}(e):function(t){return ie(t)?_e:we}(e);return void 0!==t?.icon&&(r=t.icon),{name:a,icon:r,slashOffIcon:o&&Ee(e,r),toggle:t?.toggle?ze(t.toggle,i):null,toggles:ke(t,i),faults:Se(t?.faults,i)}}function ze(t,e){const i=e.states[t.entity];if(!i)return null;let o="";return o=!0===t?.name?i.attributes.friendly_name:t?.name??"",{entity:i,label:o,icon:t?.icon??!1}}function ke(t,e){return[...t?.toggle?[t.toggle]:[],...Array.isArray(t?.toggles)?t.toggles:[]].map(t=>ze(t,e)).filter(t=>!!t)}function Ee(t,e){if("off"!==t.state||"string"!=typeof e)return!1;const[i]=t.entity_id.split("."),o="climate"===i?_e.off:be[i]?.off;return Boolean(o)&&e!==o&&!e.endsWith("-off")}function Se(t,e){return Array.isArray(t)?t.filter(({entity:t})=>Boolean(e.states?.[t])).map(({entity:t,...i})=>({...i,state:e.states[t],entity:t})):[]}const Ce=Object.values(ut),Te="hass:chevron-up",Oe="hass:chevron-down",Ne="mdi:plus",Pe="mdi:minus",Ve={temperature:!1,state:!1},Me=[ut.PRESET,ut.FAN,ut.HVAC,ut.SWING,ut.SWING_HORIZONTAL,ut.SWING_VERTICAL,ut.VANE_HORIZONTAL,ut.VANE_VERTICAL,ut.DIRECTION,ut.OSCILLATING,ut.STATE];function Re(t,e,i,o={}){let a=e[i.getModeAttribute(t)];return t===ut.STATE?a=["off","on"]:t===ut.DIRECTION&&e.direction?a=["forward","reverse"]:t===ut.OSCILLATING&&"boolean"==typeof e.oscillating&&(a=[!1,!0]),Array.isArray(a)?a.filter(e=>function(t,e,i){const o=String(e);if("object"==typeof i[o])return!1!==i[o].include;const a=Object.keys(i).some(t=>!t.startsWith("_")),r=t===ut.PRESET;return i?.[o]??!(r&&a)}(t,e,o)).map(e=>{const i=String(e),r=i.toLowerCase().replace(/\s+/g,"_"),n="object"==typeof o[i]?o[i]:"object"==typeof o[r]?o[r]:{};return{...n,icon:n.icon??(t===ut.FAN?Qt(i,a):void 0)??xe(i),value:i,name:!1===n.name?i:n.name??$e(i)}}):[]}function Ie(t,e,i,o){return Ce.includes(t)&&(t===ut.STATE?"fan"===e||"humidifier"===e:void 0!==i[o.getModeAttribute(t)])}function Le(t,e,i,o){return t.filter(t=>Ie(t,e,i,o)).map(t=>({type:t,hide_when_off:!1,list:Re(t,i,o)}))}class je extends ct{constructor(){super(...arguments),this.modes=[],this._hass={},this.entities=[],this.showEntities=!0,this.name="",this.stepSize=.5,this._values={},this._updatingValues=!1,this._hide=Ve,this._updatingValuesTimeout=null,this._holdTimer=null,this._holdFired=!1,this._clickCount=0,this._clickTimer=null,this._debouncedSetTemperature=qt(t=>{const{domain:e,service:i,data:o={}}=this.service;this._callAction(`${e}.${i}`,{entity_id:this.config.entity,...o,...t})},{wait:500}),this.localize=(t,e="")=>{const i=`${e}${t}`;return this._hass.localize?.(i)||t},this.toggleEntityChanged=(t,e)=>{if(!this.header||!e)return;const i=t.target;this._callAction("homeassistant.turn_"+(i.checked?"on":"off"),{entity_id:e})},this.setMode=(t,e)=>{if(t&&e){const i=bt(this.config.entity);if(t===ut.STATE)return this._callAction(`${i.getLocalizationDomain()}.turn_${e}`,{entity_id:this.config.entity}),void gt(this,"haptic","light");const o=i.transformModePayloadValue?.(t,e)??e;this._callAction(`${i.getLocalizationDomain()}.${i.getModeService(t)}`,{entity_id:this.config.entity,[i.getModePayloadKey(t)]:o}),gt(this,"haptic","light")}else gt(this,"haptic","failure")},this.openEntityPopover=(t=null)=>{gt(this,"hass-more-info",{entityId:t||this.config.entity})},this._onActionPointerDown=t=>{0!==t.button&&"mouse"===t.pointerType||(this._holdFired=!1,this._holdTimer&&clearTimeout(this._holdTimer),this._holdTimer=setTimeout(()=>{this._holdFired=!0,this._holdTimer=null,this._dispatchAction("hold")},je.HOLD_MS))},this._onActionPointerUp=()=>{this._holdTimer&&(clearTimeout(this._holdTimer),this._holdTimer=null)},this._onActionClick=t=>{t.preventDefault(),this._holdFired?this._holdFired=!1:(this._clickCount+=1,1===this._clickCount?(this._clickTimer&&clearTimeout(this._clickTimer),this._clickTimer=setTimeout(()=>{this._clickCount=0,this._clickTimer=null,this._dispatchSetpointTap()},je.DOUBLE_TAP_MS)):(this._clickTimer&&clearTimeout(this._clickTimer),this._clickTimer=null,this._clickCount=0,this._dispatchAction("double_tap")))},this._onSetpointKeyDown=t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._dispatchSetpointTap())}}static get styles(){return pt}_callAction(t,e){if("function"==typeof this._hass.performAction)this._hass.performAction({action:t,data:e});else{const[i,o]=t.split(".");this._hass.callService(i,o,e)}}static getConfigElement(){return window.document.createElement(`${t}-editor`)}static getStubConfig(t){return{entity:Object.keys(t.states??{}).find(t=>t.startsWith("climate.")||t.startsWith("fan.")||t.startsWith("humidifier."))??""}}setConfig(t){this.config=ft({decimals:1,...t}),this._hass?.states?.[this.config.entity]&&this.updateFromHass(this._hass)}updated(){const t=Array.from(this.renderRoot.querySelectorAll("[with-hass]"));for(const e of Array.from(t))Array.from(e.attributes).forEach(t=>{t.name.startsWith("fwd-")&&(e[t.name.replace("fwd-","")]=t.value)}),e.hass=this._hass}set hass(t){if(this._hass=t,!this.config?.entity)return;if(!t?.states)return;t.states[this.config.entity]&&this.updateFromHass(t)}updateFromHass(t){const e=t.states[this.config.entity];this.entity!==e&&(this.entity=e);const i=bt(this.config.entity);this.header=Ae(this.config.header,e,t,!1!==this.config.enhanced_visuals),this.service=function(t,e=yt){return t||e.getSetpointService()}(this.config?.service??!1,i);const o=e.attributes;let a=function(t,e,i=yt){return!1===t?{}:t?Object.entries(t).reduce((t,[i,o])=>(o?.hide||(t[i]=e?.[i]),t),{}):i.getSetpoints(e)}(this.config?.setpoints??null,o,i);this._updatingValues&&function(t,e){const i=Object.keys(t);return i.length===Object.keys(e).length&&!i.some(i=>t?.[i]!==e?.[i])}(a,this._values)?(this._updatingValues=!1,this._updatingValuesTimeout&&(clearTimeout(this._updatingValuesTimeout),this._updatingValuesTimeout=null)):this._updatingValues||(this._values=a);const r=this.config.entity.split(".")[0],n=function(t,e){if("fan"!==e&&"climate"!==e)return t;const i=t=>{const e=Me.indexOf(t);return-1===e?Me.length:e};return[...t].sort((t,e)=>i(t.type)-i(e.type))}(function(t){return t.some(({type:t})=>t===ut.STATE)?t.map(t=>t.type&&t.type!==ut.STATE?{...t,list:t.list?.filter(({value:t})=>"off"!==t)??[]}:t):t}(function(t,e,i,o){if(!1===t.control)return[];if(Array.isArray(t.control))return Le(t.control,e,i,o);if(t.control&&"object"==typeof t.control){const a=Object.entries(t.control);if(a.length>0)return a.filter(([t])=>Ie(t,e,i,o)).map(([t,e])=>{const{_name:a,_hide_when_off:r,_icons:n,_heading:s,...c}=e;return{type:t,hide_when_off:r,icons:n,heading:s,name:a,list:Re(t,i,o,c)}})}return Le(o.getDefaultControl(),e,i,o)}(this.config,r,o,i)),r);this.modes=n.map(t=>{const a=t.type===ut.HVAC?function(t){const e=Object.values(Zt),i=[],o=[];return t.forEach(t=>{const a=e.indexOf(t.value);a>=0?i[a]=t:o.push(t)}),[...i.filter(Boolean),...o]}(t.list):t.type===ut.FAN?function(t){const e=[],i=[];return t.forEach(t=>{const o=Kt.indexOf(t.value.toLowerCase());o>=0?e[o]=t:i.push(t)}),[...e.filter(Boolean),...i]}(t.list):t.list,r=t.type===ut.HVAC||t.type===ut.STATE?e.state:o[i.getModePayloadKey(t.type)];return{...t,list:a,mode:r}});const{step:s}=i.getRange(o);this.stepSize=Number(this.config.step_size??s??.5),this._hide={...Ve,...this.config.hide??{}};const c=this.config.entities??[];!1===c?this.showEntities=!1:c&&(this.entities=c.map(({name:e,entity:i,attribute:o,unit:a="",...r})=>{let n;const s=[e];return i?(n=t.states[i],s.push(n?.attributes?.friendly_name),o&&(n=n?.attributes?.[o])):o&&o in(this.entity.attributes??{})&&(n=this.entity.attributes[o],s.push(o)),s.push(i),{...r,name:s.find(t=>!!t),state:n,entity:i,unit:a}}))}render({_hide:t,_values:e,_updatingValues:i,config:o,entity:a}=this){if(!o)return G;const r=[];if(this.stepSize<1&&0===this.config.decimals&&r.push(W`
        <ha-alert alert-type="warning">
          Decimals is set to 0 and step_size is lower than 1. Decrementing a
          setpoint will likely not work. Change one of the settings to clear
          this warning.
        </ha-alert>
      `),!a)return W`
        <hui-warning> Entity not available: ${o.entity} </hui-warning>
      `;const n=bt(o.entity),s=ie(a),{min:c,max:l}=n.getRange(a.attributes),d=this.getUnit(),h=!1===this.config.enhanced_visuals?this.config?.layout?.step??"column":this.config?.layout?.step??"row",m="row"===h,u=o.entity.split(".")[0],p=["unavailable","unknown"].includes(a.state),g=t=>"string"==typeof t?t.replace(/[^a-z0-9_-]/gi,""):"",f=[!this.header&&"no-header",`domain-${g(u)}`,`state-${g(a.state)}`,!1===this.config.enhanced_visuals&&"standard-visuals",g(s),p&&g(a.state)].filter(t=>!!t),v=function(t,e){if("fan"!==t)return"";const i=Number(e?.percentage);if(Number.isNaN(i))return"";const o=Math.min(Math.max(i,0),100);return`--st-fan-spin-duration: ${Math.max(.9,3.2-o/100*2.1).toFixed(2)}s;`}(u,a.attributes),y=this.showEntities?fe({_hide:t,unit:d,hass:this._hass,entity:this.entity,entities:this.entities,config:this.config,adapter:n,localize:this.localize,openEntityPopover:this.openEntityPopover}):"";return W`
      <ha-card class="${f.join(" ")}" style=${v}>
        ${o.styles?W`<style>
              ${o.styles}
            </style>`:G}
        ${r}
        ${de({header:this.header,hass:this._hass,toggleEntityChanged:this.toggleEntityChanged,entity:this.entity,openEntityPopover:this.openEntityPopover})}
        <section class="body">
          ${y}
          ${this.renderSetpoints({values:e,minValue:c,maxValue:l,unit:d,row:m,stepLayout:h,isOff:a.state===Zt.OFF})}
        </section>

        ${this.modes.length?W`
              <section class="controls">
                ${this.modes.map(t=>ye({state:a.state,entity:a,hass:this._hass,mode:t,adapter:n,localize:this.localize,modeOptions:this.config?.layout?.mode??{},setMode:this.setMode}))}
              </section>
            `:G}
      </ha-card>
    `}renderSetpoints({values:t,minValue:e,maxValue:i,unit:o,row:a,stepLayout:r,isOff:n}){return!0===this.config.hide_setpoint?G:Object.entries(t).map(([t,s])=>this.renderSetpointControl({field:t,value:s,minValue:e,maxValue:i,unit:o,row:a,stepLayout:r,isOff:n}))}renderSetpointControl(t){const{row:e,stepLayout:i}=t,o=this.renderSetpointStepper(t,"decrease"),a=this.renderSetpointValue(t),r=this.renderSetpointStepper(t,"increase"),n=this.renderSetpointLabel(t);return W`
      <div class="current-wrapper ${i}">
        ${e?W`${o}${a}${r}`:W`${r}${a}${o}`}
        ${n}
      </div>
    `}renderSetpointLabel({field:t}){if(!0===this.config.hide?.setpoint_label)return G;const e=this.config.label?.setpoint,i=e??this._hass.localize?.(`ui.card.${bt(this.config.entity).getLocalizationDomain()}.target`)??this._hass.localize?.("ui.card.climate.target_temperature")??this.localize(t,"state_attributes.climate.");return W`<div class="current--label">${i}</div>`}renderSetpointStepper({field:t,value:e,minValue:i,maxValue:o,row:a},r){const n=Number(e),s=!Number.isNaN(n),c="decrease"===r;return W`
      <button
        type="button"
        ?disabled=${c?null===e||null!==i&&s&&n<=i:null===e&&null===i||null!==e&&null!==o&&s&&n>=o}
        class="thermostat-trigger ${r}"
        aria-label=${`${c?"Decrease":"Increase"} ${t}`}
        @click="${()=>c?this.setTemperature(-this.stepSize,t):null===e&&null!==i?this.setTemperature(0,t,i):this.setTemperature(this.stepSize,t)}"
      >
        <ha-icon .icon=${c?a?Pe:Oe:a?Ne:Te}></ha-icon>
      </button>
    `}renderSetpointValue({field:t,value:e,unit:i,isOff:o}){const a=["string","number"].includes(typeof e)&&""!==e&&null!==e,r=!1!==i&&a,n=o&&!a,s=n?"OFF":te(e,{...this.config,locale:this._hass.locale});return W`
      <h3
        @pointerdown=${this._onActionPointerDown}
        @pointerup=${this._onActionPointerUp}
        @pointercancel=${this._onActionPointerUp}
        @click=${this._onActionClick}
        @keydown=${this._onSetpointKeyDown}
        role="button"
        tabindex="0"
        aria-label=${`${t}: ${s}${r?` ${i}`:""}`}
        class=${["current--value",n&&"current--off",this._updatingValues&&"updating"].filter(Boolean).join(" ")}
      >
        ${me(s,!!r&&i)}
      </h3>
    `}setTemperature(t,e,i){this._updatingValues=!0,this._updatingValuesTimeout&&clearTimeout(this._updatingValuesTimeout),this._updatingValuesTimeout=setTimeout(()=>{this._updatingValues=!1,this._updatingValuesTimeout=null},1e4);const o=i??this._values[e],a=Number(o)+t,{decimals:r}=this.config;this._values={...this._values,[e]:+te(a,{decimals:r})},this._debouncedSetTemperature(this._values)}_dispatchSetpointTap(){this.config?.tap_action?this._dispatchAction("tap"):this.openEntityPopover(this.config.entity)}_dispatchAction(t){const e="tap"===t?"tap_action":"hold"===t?"hold_action":"double_tap_action",i=this.config?.[e]??("tap"===t?{action:"more-info"}:{action:"none"});gt(this,"hass-action",{config:this.config,action:i})}getCardSize(){return 3}getUnit(){if(["boolean","string"].includes(typeof this.config.unit))return this.config?.unit;const t=this.config.entity.split(".")[0];return"fan"===t||"humidifier"===t?"%":this._hass.config?.unit_system?.temperature??!1}}je.HOLD_MS=500,je.DOUBLE_TAP_MS=250,i([mt()],je.prototype,"config",void 0),i([mt()],je.prototype,"header",void 0),i([mt()],je.prototype,"service",void 0),i([mt()],je.prototype,"modes",void 0),i([mt()],je.prototype,"entity",void 0),i([mt()],je.prototype,"entities",void 0),i([mt()],je.prototype,"showEntities",void 0),i([mt()],je.prototype,"name",void 0),i([mt({type:Object})],je.prototype,"_values",void 0),i([mt()],je.prototype,"_updatingValues",void 0),i([mt()],je.prototype,"_hide",void 0),customElements.get(t)||customElements.define(t,je),customElements.get(`${t}-editor`)||customElements.define(`${t}-editor`,Ht),console.info(`%c SIMPLE-THERMOSTAT %c v${e} `,"color: var(--text-primary-color); background: var(--primary-color); font-weight: 700; padding: 2px 6px; border-radius: 3px 0 0 3px;","color: var(--primary-color); background: var(--card-background-color); font-weight: 700; padding: 2px 6px; border-radius: 0 3px 3px 0;");const He=window;He.customCards=He.customCards||[],He.customCards.find(e=>e.type===t)||He.customCards.push({type:t,name:"Simple Thermostat",preview:!0,description:"A different take on the thermostat card",documentationURL:"https://github.com/Wheemer/simple-thermostat"});
