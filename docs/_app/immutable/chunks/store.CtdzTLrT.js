import{S as P,A as M,B as j,C as y,D as k,F as v,G as x,U as d,t as w,H as B,I as C,J as H,K as U,d as Y,h as E,L as q,E as G,M as J,N as Q,O as V,P as D,Q as S,f as L,R as F,i as Z,n as I,b as z,T as W,V as X}from"./runtime.CBkhX0eM.js";function h(n,l=null,b){if(typeof n!="object"||n===null||P in n)return n;const a=H(n);if(a!==M&&a!==j)return n;var s=new Map,c=U(n),_=y(0);c&&s.set("length",y(n.length));var g;return new Proxy(n,{defineProperty(f,e,t){(!("value"in t)||t.configurable===!1||t.enumerable===!1||t.writable===!1)&&k();var i=s.get(e);return i===void 0?(i=y(t.value),s.set(e,i)):v(i,h(t.value,g)),!0},deleteProperty(f,e){var t=s.get(e);if(t===void 0)e in f&&s.set(e,y(d));else{if(c&&typeof e=="string"){var i=s.get("length"),r=Number(e);Number.isInteger(r)&&r<i.v&&v(i,r)}v(t,d),K(_)}return!0},get(f,e,t){var o;if(e===P)return n;var i=s.get(e),r=e in f;if(i===void 0&&(!r||(o=x(f,e))!=null&&o.writable)&&(i=y(h(r?f[e]:d,g)),s.set(e,i)),i!==void 0){var u=w(i);return u===d?void 0:u}return Reflect.get(f,e,t)},getOwnPropertyDescriptor(f,e){var t=Reflect.getOwnPropertyDescriptor(f,e);if(t&&"value"in t){var i=s.get(e);i&&(t.value=w(i))}else if(t===void 0){var r=s.get(e),u=r==null?void 0:r.v;if(r!==void 0&&u!==d)return{enumerable:!0,configurable:!0,value:u,writable:!0}}return t},has(f,e){var u;if(e===P)return!0;var t=s.get(e),i=t!==void 0&&t.v!==d||Reflect.has(f,e);if(t!==void 0||B!==null&&(!i||(u=x(f,e))!=null&&u.writable)){t===void 0&&(t=y(i?h(f[e],g):d),s.set(e,t));var r=w(t);if(r===d)return!1}return i},set(f,e,t,i){var O;var r=s.get(e),u=e in f;if(c&&e==="length")for(var o=t;o<r.v;o+=1){var m=s.get(o+"");m!==void 0?v(m,d):o in f&&(m=y(d),s.set(o+"",m))}r===void 0?(!u||(O=x(f,e))!=null&&O.writable)&&(r=y(void 0),v(r,h(t,g)),s.set(e,r)):(u=r.v!==d,v(r,h(t,g)));var N=Reflect.getOwnPropertyDescriptor(f,e);if(N!=null&&N.set&&N.set.call(i,t),!u){if(c&&typeof e=="string"){var A=s.get("length"),T=Number(e);Number.isInteger(T)&&T>=A.v&&v(A,T+1)}K(_)}return!0},ownKeys(f){w(_);var e=Reflect.ownKeys(f).filter(r=>{var u=s.get(r);return u===void 0||u.v!==d});for(var[t,i]of s)i.v!==d&&!(t in f)&&e.push(t);return e},setPrototypeOf(){C()}})}function K(n,l=1){v(n,n.v+l)}function ee(n,l,b=!1){E&&q();var a=n,s=null,c=null,_=d,g=b?G:0,f=!1;const e=(i,r=!0)=>{f=!0,t(r,i)},t=(i,r)=>{if(_===(_=i))return;let u=!1;if(E){const o=a.data===J;!!_===o&&(a=Q(),V(a),D(!1),u=!0)}_?(s?S(s):r&&(s=L(()=>r(a))),c&&F(c,()=>{c=null})):(c?S(c):r&&(c=L(()=>r(a))),s&&F(s,()=>{s=null})),u&&D(!0)};Y(()=>{f=!1,l(e),f||t(null,null)},g),E&&(a=Z)}function $(n,l,b){if(n==null)return l(void 0),I;const a=z(()=>n.subscribe(l,b));return a.unsubscribe?()=>a.unsubscribe():a}let R=!1;function te(n,l,b){const a=b[l]??(b[l]={store:null,source:X(void 0),unsubscribe:I});if(a.store!==n)if(a.unsubscribe(),a.store=n??null,n==null)a.source.v=void 0,a.unsubscribe=I;else{var s=!0;a.unsubscribe=$(n,c=>{s?a.source.v=c:v(a.source,c)}),s=!1}return w(a.source)}function ne(){const n={};return W(()=>{for(var l in n)n[l].unsubscribe()}),n}function re(n,l,b){return n.set(b),l}function se(n){var l=R;try{return R=!1,[n(),R]}finally{R=l}}export{re as a,te as b,se as c,ee as i,h as p,ne as s};
