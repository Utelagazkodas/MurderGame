import{S as T,o as L,j as q,k as y,m as B,q as o,r as E,U as d,t as w,v as C,w as H,x as K,y as M,b as U,h as I,z as Y,E as z,H as G,A as Z,B as J,C as O,D as S,d as j,F as k,f as Q,n as P,a as V,G as W,I as X}from"./runtime.qgzTVW-P.js";function h(r,l=null,b){if(typeof r!="object"||r===null||T in r)return r;const a=K(r);if(a!==L&&a!==q)return r;var s=new Map,c=M(r),_=y(0);c&&s.set("length",y(r.length));var g;return new Proxy(r,{defineProperty(f,e,n){(!("value"in n)||n.configurable===!1||n.enumerable===!1||n.writable===!1)&&B();var i=s.get(e);return i===void 0?(i=y(n.value),s.set(e,i)):o(i,h(n.value,g)),!0},deleteProperty(f,e){var n=s.get(e);if(n===void 0)e in f&&s.set(e,y(d));else{if(c&&typeof e=="string"){var i=s.get("length"),t=Number(e);Number.isInteger(t)&&t<i.v&&o(i,t)}o(n,d),F(_)}return!0},get(f,e,n){var v;if(e===T)return r;var i=s.get(e),t=e in f;if(i===void 0&&(!t||(v=E(f,e))!=null&&v.writable)&&(i=y(h(t?f[e]:d,g)),s.set(e,i)),i!==void 0){var u=w(i);return u===d?void 0:u}return Reflect.get(f,e,n)},getOwnPropertyDescriptor(f,e){var n=Reflect.getOwnPropertyDescriptor(f,e);if(n&&"value"in n){var i=s.get(e);i&&(n.value=w(i))}else if(n===void 0){var t=s.get(e),u=t==null?void 0:t.v;if(t!==void 0&&u!==d)return{enumerable:!0,configurable:!0,value:u,writable:!0}}return n},has(f,e){var u;if(e===T)return!0;var n=s.get(e),i=n!==void 0&&n.v!==d||Reflect.has(f,e);if(n!==void 0||C!==null&&(!i||(u=E(f,e))!=null&&u.writable)){n===void 0&&(n=y(i?h(f[e],g):d),s.set(e,n));var t=w(n);if(t===d)return!1}return i},set(f,e,n,i){var D;var t=s.get(e),u=e in f;if(c&&e==="length")for(var v=n;v<t.v;v+=1){var m=s.get(v+"");m!==void 0?o(m,d):v in f&&(m=y(d),s.set(v+"",m))}t===void 0?(!u||(D=E(f,e))!=null&&D.writable)&&(t=y(void 0),o(t,h(n,g)),s.set(e,t)):(u=t.v!==d,o(t,h(n,g)));var x=Reflect.getOwnPropertyDescriptor(f,e);if(x!=null&&x.set&&x.set.call(i,n),!u){if(c&&typeof e=="string"){var A=s.get("length"),R=Number(e);Number.isInteger(R)&&R>=A.v&&o(A,R+1)}F(_)}return!0},ownKeys(f){w(_);var e=Reflect.ownKeys(f).filter(t=>{var u=s.get(t);return u===void 0||u.v!==d});for(var[n,i]of s)i.v!==d&&!(n in f)&&e.push(n);return e},setPrototypeOf(){H()}})}function F(r,l=1){o(r,r.v+l)}function ee(r,l,b=!1){I&&Y();var a=r,s=null,c=null,_=d,g=b?z:0,f=!1;const e=(i,t=!0)=>{f=!0,n(t,i)},n=(i,t)=>{if(_===(_=i))return;let u=!1;if(I){const v=a.data===G;!!_===v&&(a=Z(),J(a),O(!1),u=!0)}_?(s?S(s):t&&(s=j(()=>t(a))),c&&k(c,()=>{c=null})):(c?S(c):t&&(c=j(()=>t(a))),s&&k(s,()=>{s=null})),u&&O(!0)};U(()=>{f=!1,l(e),f||n(null,null)},g),I&&(a=Q)}function $(r,l,b){if(r==null)return l(void 0),P;const a=V(()=>r.subscribe(l,b));return a.unsubscribe?()=>a.unsubscribe():a}let N=!1;function ne(r,l,b){const a=b[l]??(b[l]={store:null,source:X(void 0),unsubscribe:P});if(a.store!==r)if(a.unsubscribe(),a.store=r??null,r==null)a.source.v=void 0,a.unsubscribe=P;else{var s=!0;a.unsubscribe=$(r,c=>{s?a.source.v=c:o(a.source,c)}),s=!1}return w(a.source)}function te(){const r={};return W(()=>{for(var l in r)r[l].unsubscribe()}),r}function re(r){var l=N;try{return N=!1,[r(),N]}finally{N=l}}export{ne as a,re as c,ee as i,h as p,te as s};