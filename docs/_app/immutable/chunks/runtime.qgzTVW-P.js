var Nn=Array.isArray,bn=Array.from,qn=Object.defineProperty,vt=Object.getOwnPropertyDescriptor,Wt=Object.getOwnPropertyDescriptors,Pn=Object.prototype,Fn=Array.prototype,Xt=Object.getPrototypeOf;const Ln=()=>{};function Mn(t){return t()}function yt(t){for(var n=0;n<t.length;n++)t[n]()}const y=2,wt=4,j=8,ut=16,T=32,W=64,nt=128,D=256,G=512,d=1024,k=2048,H=4096,C=8192,b=16384,Jt=32768,Tt=65536,Yn=1<<17,Qt=1<<19,mt=1<<20,pt=Symbol("$state"),jn=Symbol("legacy props"),Hn=Symbol("");function At(t){return t===this.v}function tn(t,n){return t!=t?n==n:t!==n||t!==null&&typeof t=="object"||typeof t=="function"}function gt(t){return!tn(t,this.v)}function nn(t){throw new Error("https://svelte.dev/e/effect_in_teardown")}function rn(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function en(t){throw new Error("https://svelte.dev/e/effect_orphan")}function sn(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function Bn(){throw new Error("https://svelte.dev/e/hydration_failed")}function Un(t){throw new Error("https://svelte.dev/e/props_invalid_value")}function Vn(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function Gn(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function ln(){throw new Error("https://svelte.dev/e/state_unsafe_local_read")}function an(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}let X=!1;function Kn(){X=!0}const $n=1,Zn=2,zn=16,Wn=1,Xn=2,Jn=4,Qn=8,tr=16,nr=1,rr=2,un="[",on="[!",fn="]",kt={},er=Symbol();function ot(t,n){var r={f:0,v:t,reactions:null,equals:At,version:0};return r}function sr(t){return _n(ot(t))}function lr(t,n=!1){var e;const r=ot(t);return n||(r.equals=gt),X&&f!==null&&f.l!==null&&((e=f.l).s??(e.s=[])).push(r),r}function _n(t){return o!==null&&o.f&y&&(w===null?kn([t]):w.push(t)),t}function ar(t,n){return o!==null&&_t()&&o.f&(y|ut)&&(w===null||!w.includes(t))&&an(),cn(t,n)}function cn(t,n){return t.equals(n)||(t.v=n,t.version=Vt(),Rt(t,k),_t()&&u!==null&&u.f&d&&!(u.f&T)&&(h!==null&&h.includes(t)?(m(u,k),tt(u)):g===null?Rn([t]):g.push(t))),n}function Rt(t,n){var r=t.reactions;if(r!==null)for(var e=_t(),s=r.length,l=0;l<s;l++){var a=r[l],i=a.f;i&k||!e&&a===u||(m(a,n),i&(d|D)&&(i&y?Rt(a,H):tt(a)))}}function St(t){console.warn("https://svelte.dev/e/hydration_mismatch")}let N=!1;function ur(t){N=t}let A;function F(t){if(t===null)throw St(),kt;return A=t}function or(){return F(q(A))}function ir(t){if(N){if(q(A)!==null)throw St(),kt;A=t}}function fr(){for(var t=0,n=A;;){if(n.nodeType===8){var r=n.data;if(r===fn){if(t===0)return n;t-=1}else(r===un||r===on)&&(t+=1)}var e=q(n);n.remove(),n=e}}var ht,xt,Dt;function _r(){if(ht===void 0){ht=window;var t=Element.prototype,n=Node.prototype;xt=vt(n,"firstChild").get,Dt=vt(n,"nextSibling").get,t.__click=void 0,t.__className="",t.__attributes=null,t.__styles=null,t.__e=void 0,Text.prototype.__t=void 0}}function rt(t=""){return document.createTextNode(t)}function et(t){return xt.call(t)}function q(t){return Dt.call(t)}function cr(t,n){if(!N)return et(t);var r=et(A);if(r===null)r=A.appendChild(rt());else if(n&&r.nodeType!==3){var e=rt();return r==null||r.before(e),F(e),e}return F(r),r}function vr(t,n){if(!N){var r=et(t);return r instanceof Comment&&r.data===""?q(r):r}return A}function pr(t,n=1,r=!1){let e=N?A:t;for(var s;n--;)s=e,e=q(e);if(!N)return e;var l=e==null?void 0:e.nodeType;if(r&&l!==3){var a=rt();return e===null?s==null||s.after(a):e.before(a),F(a),a}return F(e),e}function hr(t){t.textContent=""}function vn(t){var n=y|k;u===null?n|=D:u.f|=mt;var r=o!==null&&o.f&y?o:null;const e={children:null,ctx:f,deps:null,equals:At,f:n,fn:t,reactions:null,v:null,version:0,parent:r??u};return r!==null&&(r.children??(r.children=[])).push(e),e}function dr(t){const n=vn(t);return n.equals=gt,n}function It(t){var n=t.children;if(n!==null){t.children=null;for(var r=0;r<n.length;r+=1){var e=n[r];e.f&y?it(e):x(e)}}}function pn(t){for(var n=t.parent;n!==null;){if(!(n.f&y))return n;n=n.parent}return null}function Ot(t){var n,r=u;z(pn(t));try{It(t),n=Gt(t)}finally{z(r)}return n}function Ct(t){var n=Ot(t),r=(S||t.f&D)&&t.deps!==null?H:d;m(t,r),t.equals(n)||(t.v=n,t.version=Vt())}function it(t){It(t),Y(t,0),m(t,b),t.v=t.children=t.deps=t.ctx=t.reactions=null}function Nt(t){u===null&&o===null&&en(),o!==null&&o.f&D&&rn(),ft&&nn()}function hn(t,n){var r=n.last;r===null?n.last=n.first=t:(r.next=t,t.prev=r,n.last=t)}function P(t,n,r,e=!0){var s=(t&W)!==0,l=u,a={ctx:f,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:t|k,first:null,fn:n,last:null,next:null,parent:s?null:l,prev:null,teardown:null,transitions:null,version:0};if(r){var i=I;try{dt(!0),Q(a),a.f|=Jt}catch(c){throw x(a),c}finally{dt(i)}}else n!==null&&tt(a);var _=r&&a.deps===null&&a.first===null&&a.nodes_start===null&&a.teardown===null&&(a.f&mt)===0;if(!_&&!s&&e&&(l!==null&&hn(a,l),o!==null&&o.f&y)){var p=o;(p.children??(p.children=[])).push(a)}return a}function Er(t){const n=P(j,null,!1);return m(n,d),n.teardown=t,n}function yr(t){Nt();var n=u!==null&&(u.f&T)!==0&&f!==null&&!f.m;if(n){var r=f;(r.e??(r.e=[])).push({fn:t,effect:u,reaction:o})}else{var e=bt(t);return e}}function wr(t){return Nt(),dn(t)}function Tr(t){const n=P(W,t,!0);return(r={})=>new Promise(e=>{r.outro?wn(n,()=>{x(n),e(void 0)}):(x(n),e(void 0))})}function bt(t){return P(wt,t,!1)}function dn(t){return P(j,t,!0)}function mr(t){return En(t)}function En(t,n=0){return P(j|ut|n,t,!0)}function Ar(t,n=!0){return P(j|T,t,!0,n)}function qt(t){var n=t.teardown;if(n!==null){const r=ft,e=o;Et(!0),Z(null);try{n.call(null)}finally{Et(r),Z(e)}}}function Pt(t){var n=t.deriveds;if(n!==null){t.deriveds=null;for(var r=0;r<n.length;r+=1)it(n[r])}}function Ft(t,n=!1){var r=t.first;for(t.first=t.last=null;r!==null;){var e=r.next;x(r,n),r=e}}function yn(t){for(var n=t.first;n!==null;){var r=n.next;n.f&T||x(n),n=r}}function x(t,n=!0){var r=!1;if((n||t.f&Qt)&&t.nodes_start!==null){for(var e=t.nodes_start,s=t.nodes_end;e!==null;){var l=e===s?null:q(e);e.remove(),e=l}r=!0}Ft(t,n&&!r),Pt(t),Y(t,0),m(t,b);var a=t.transitions;if(a!==null)for(const _ of a)_.stop();qt(t);var i=t.parent;i!==null&&i.first!==null&&Lt(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.fn=t.nodes_start=t.nodes_end=null}function Lt(t){var n=t.parent,r=t.prev,e=t.next;r!==null&&(r.next=e),e!==null&&(e.prev=r),n!==null&&(n.first===t&&(n.first=e),n.last===t&&(n.last=r))}function wn(t,n){var r=[];Mt(t,r,!0),Tn(r,()=>{x(t),n&&n()})}function Tn(t,n){var r=t.length;if(r>0){var e=()=>--r||n();for(var s of t)s.out(e)}else n()}function Mt(t,n,r){if(!(t.f&C)){if(t.f^=C,t.transitions!==null)for(const a of t.transitions)(a.is_global||r)&&n.push(a);for(var e=t.first;e!==null;){var s=e.next,l=(e.f&Tt)!==0||(e.f&T)!==0;Mt(e,n,l?r:!1),e=s}}}function gr(t){Yt(t,!0)}function Yt(t,n){if(t.f&C){B(t)&&Q(t),t.f^=C;for(var r=t.first;r!==null;){var e=r.next,s=(r.f&Tt)!==0||(r.f&T)!==0;Yt(r,s?n:!1),r=e}if(t.transitions!==null)for(const l of t.transitions)(l.is_global||n)&&l.in()}}const mn=typeof requestIdleCallback>"u"?t=>setTimeout(t,1):requestIdleCallback;let K=!1,$=!1,st=[],lt=[];function jt(){K=!1;const t=st.slice();st=[],yt(t)}function Ht(){$=!1;const t=lt.slice();lt=[],yt(t)}function kr(t){K||(K=!0,queueMicrotask(jt)),st.push(t)}function Rr(t){$||($=!0,mn(Ht)),lt.push(t)}function An(){K&&jt(),$&&Ht()}const Bt=0,gn=1;let U=!1,V=Bt,L=!1,M=null,I=!1,ft=!1;function dt(t){I=t}function Et(t){ft=t}let R=[],O=0;let o=null;function Z(t){o=t}let u=null;function z(t){u=t}let w=null;function kn(t){w=t}let h=null,E=0,g=null;function Rn(t){g=t}let Ut=1,S=!1,f=null;function Vt(){return++Ut}function _t(){return!X||f!==null&&f.l===null}function B(t){var p;var n=t.f;if(n&k)return!0;if(n&H){var r=t.deps,e=(n&D)!==0;if(r!==null){var s,l,a=(n&G)!==0,i=e&&u!==null&&!S,_=r.length;if(a||i){for(s=0;s<_;s++)l=r[s],(p=l==null?void 0:l.reactions)!=null&&p.includes(t)||(l.reactions??(l.reactions=[])).push(t);a&&(t.f^=G)}for(s=0;s<_;s++)if(l=r[s],B(l)&&Ct(l),l.version>t.version)return!0}(!e||u!==null&&!S)&&m(t,d)}return!1}function Sn(t,n){for(var r=n;r!==null;){if(r.f&nt)try{r.fn(t);return}catch{r.f^=nt}r=r.parent}throw U=!1,t}function xn(t){return(t.f&b)===0&&(t.parent===null||(t.parent.f&nt)===0)}function J(t,n,r,e){if(U){if(r===null&&(U=!1),xn(n))throw t;return}r!==null&&(U=!0);{Sn(t,n);return}}function Gt(t){var ct;var n=h,r=E,e=g,s=o,l=S,a=w,i=f,_=t.f;h=null,E=0,g=null,o=_&(T|W)?null:t,S=!I&&(_&D)!==0,w=null,f=t.ctx;try{var p=(0,t.fn)(),c=t.deps;if(h!==null){var v;if(Y(t,E),c!==null&&E>0)for(c.length=E+h.length,v=0;v<h.length;v++)c[E+v]=h[v];else t.deps=c=h;if(!S)for(v=E;v<c.length;v++)((ct=c[v]).reactions??(ct.reactions=[])).push(t)}else c!==null&&E<c.length&&(Y(t,E),c.length=E);return p}finally{h=n,E=r,g=e,o=s,S=l,w=a,f=i}}function Dn(t,n){let r=n.reactions;if(r!==null){var e=r.indexOf(t);if(e!==-1){var s=r.length-1;s===0?r=n.reactions=null:(r[e]=r[s],r.pop())}}r===null&&n.f&y&&(h===null||!h.includes(n))&&(m(n,H),n.f&(D|G)||(n.f^=G),Y(n,0))}function Y(t,n){var r=t.deps;if(r!==null)for(var e=n;e<r.length;e++)Dn(t,r[e])}function Q(t){var n=t.f;if(!(n&b)){m(t,d);var r=u,e=f;u=t;try{n&ut?yn(t):Ft(t),Pt(t),qt(t);var s=Gt(t);t.teardown=typeof s=="function"?s:null,t.version=Ut}catch(l){J(l,t,r,e||t.ctx)}finally{u=r}}}function Kt(){if(O>1e3){O=0;try{sn()}catch(t){if(M!==null)J(t,M,null);else throw t}}O++}function $t(t){var n=t.length;if(n!==0){Kt();var r=I;I=!0;try{for(var e=0;e<n;e++){var s=t[e];s.f&d||(s.f^=d);var l=[];Zt(s,l),In(l)}}finally{I=r}}}function In(t){var n=t.length;if(n!==0)for(var r=0;r<n;r++){var e=t[r];if(!(e.f&(b|C)))try{B(e)&&(Q(e),e.deps===null&&e.first===null&&e.nodes_start===null&&(e.teardown===null?Lt(e):e.fn=null))}catch(s){J(s,e,null,e.ctx)}}}function On(){if(L=!1,O>1001)return;const t=R;R=[],$t(t),L||(O=0,M=null)}function tt(t){V===Bt&&(L||(L=!0,queueMicrotask(On))),M=t;for(var n=t;n.parent!==null;){n=n.parent;var r=n.f;if(r&(W|T)){if(!(r&d))return;n.f^=d}}R.push(n)}function Zt(t,n){var r=t.first,e=[];t:for(;r!==null;){var s=r.f,l=(s&T)!==0,a=l&&(s&d)!==0,i=r.next;if(!a&&!(s&C))if(s&j){if(l)r.f^=d;else try{B(r)&&Q(r)}catch(v){J(v,r,null,r.ctx)}var _=r.first;if(_!==null){r=_;continue}}else s&wt&&e.push(r);if(i===null){let v=r.parent;for(;v!==null;){if(t===v)break t;var p=v.next;if(p!==null){r=p;continue t}v=v.parent}}r=i}for(var c=0;c<e.length;c++)_=e[c],n.push(_),Zt(_,n)}function zt(t){var n=V,r=R;try{Kt();const s=[];V=gn,R=s,L=!1,$t(r);var e=t==null?void 0:t();return An(),(R.length>0||s.length>0)&&zt(),O=0,M=null,e}finally{V=n,R=r}}async function Sr(){await Promise.resolve(),zt()}function xr(t){var c;var n=t.f,r=(n&y)!==0;if(r&&n&b){var e=Ot(t);return it(t),e}if(o!==null){w!==null&&w.includes(t)&&ln();var s=o.deps;h===null&&s!==null&&s[E]===t?E++:h===null?h=[t]:h.push(t),g!==null&&u!==null&&u.f&d&&!(u.f&T)&&g.includes(t)&&(m(u,k),tt(u))}else if(r&&t.deps===null)for(var l=t,a=l.parent,i=l;a!==null;)if(a.f&y){var _=a;i=_,a=_.parent}else{var p=a;(c=p.deriveds)!=null&&c.includes(i)||(p.deriveds??(p.deriveds=[])).push(i);break}return r&&(l=t,B(l)&&Ct(l)),t.v}function Dr(t){const n=o;try{return o=null,t()}finally{o=n}}const Cn=~(k|H|d);function m(t,n){t.f=t.f&Cn|n}function Ir(t,n=!1,r){f={p:f,c:null,e:null,m:!1,s:t,x:null,l:null},X&&!n&&(f.l={s:null,u:null,r1:[],r2:ot(!1)})}function Or(t){const n=f;if(n!==null){const a=n.e;if(a!==null){var r=u,e=o;n.e=null;try{for(var s=0;s<a.length;s++){var l=a[s];z(l.effect),Z(l.reaction),bt(l.fn)}}finally{z(r),Z(e)}}f=n.p,n.m=!0}return{}}function Cr(t){if(!(typeof t!="object"||!t||t instanceof EventTarget)){if(pt in t)at(t);else if(!Array.isArray(t))for(let n in t){const r=t[n];typeof r=="object"&&r&&pt in r&&at(r)}}}function at(t,n=new Set){if(typeof t=="object"&&t!==null&&!(t instanceof EventTarget)&&!n.has(t)){n.add(t),t instanceof Date&&t.getTime();for(let e in t)try{at(t[e],n)}catch{}const r=Xt(t);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const e=Wt(r);for(let s in e){const l=e[s].get;if(l)try{l.call(t)}catch{}}}}}export{o as $,fr as A,F as B,ur as C,gr as D,Tt as E,wn as F,Er as G,on as H,lr as I,rt as J,et as K,rr as L,wr as M,yt as N,Mn as O,Cr as P,vn as Q,Kn as R,pt as S,nr as T,er as U,mr as V,cr as W,ir as X,pr as Y,Z,z as _,Dr as a,kr as a0,qn as a1,_r as a2,un as a3,q as a4,kt as a5,fn as a6,St as a7,Bn as a8,hr as a9,dr as aA,tr as aB,zt as aC,Sr as aD,bn as aa,Tr as ab,C as ac,cn as ad,Mt as ae,Tn as af,Zn as ag,$n as ah,zn as ai,Rr as aj,Hn as ak,Wt as al,_t as am,dn as an,sr as ao,bt as ap,Un as aq,Yn as ar,Jn as as,gt as at,T as au,W as av,Wn as aw,Xn as ax,Qn as ay,jn as az,En as b,f as c,Ar as d,x as e,A as f,vr as g,N as h,Or as i,Fn as j,ot as k,X as l,Vn as m,Ln as n,Pn as o,Ir as p,ar as q,vt as r,tn as s,xr as t,yr as u,u as v,Gn as w,Xt as x,Nn as y,or as z};
