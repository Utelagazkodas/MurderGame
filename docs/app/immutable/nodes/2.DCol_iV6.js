import{a as h,t as S,d as ne,n as me,e as Ye}from"../chunks/D3vHq90q.js";import{q as G,O as ve,ae as Je,ao as Qe,J as Ze,I as We,H as $e,am as He,M as ea,N as Te,P as de,V as $,ai as aa,as as ie,Q as Ne,R as ze,T as ta,F as Pe,at as Se,au as ra,al as la,av as na,ap as ia,aa as sa,X as oa,B as Ee,aw as he,ax as _e,ay as va,ag as da,az as Be,ab as ca,aA as ua,aB as fa,b as ga,aC as ma,p as xe,t as B,i as be,s as y,j as m,k as g,y as O,g as se,aD as ee,D as Ie,aE as ha}from"../chunks/CJR8sh4W.js";import{l as _a,d as pe,s as R,e as xa}from"../chunks/CSGb1rl8.js";import{s as ye,a as j,i as K}from"../chunks/c6B5rUVk.js";import{s as ge,a as ba,r as pa,b as ya}from"../chunks/BSQpqh5R.js";import{k as ka,f as ce,i as te,g as oe,a as ae,u as Ke,v as wa,b as Ma,l as Ta,c as Pa,d as Sa}from"../chunks/BSN4LD2Y.js";import{d as Ce,w as De}from"../chunks/BM41IADg.js";import{P as Ea}from"../chunks/CYgVwsel.js";function Le(a,e){return e}function Ia(a,e,r,t){for(var i=[],v=e.length,c=0;c<v;c++)ra(e[c].e,i,!0);var u=v>0&&i.length===0&&r!==null;if(u){var b=r.parentNode;la(b),b.append(r),t.clear(),X(a,e[0].prev,e[v-1].next)}na(i,()=>{for(var P=0;P<v;P++){var _=e[P];u||(t.delete(_.k),X(a,_.prev,_.next)),ia(_.e,!u)}})}function Ue(a,e,r,t,i,v=null){var c=a,u={flags:e,items:new Map,first:null},b=(e&Be)!==0;if(b){var P=a;c=G?ve(Je(P)):P.appendChild(Qe())}G&&Ze();var _=null,p=!1;We(()=>{var k=r(),l=$e(k)?k:k==null?[]:He(k),s=l.length;if(p&&s===0)return;p=s===0;let x=!1;if(G){var V=c.data===ea;V!==(s===0)&&(c=Te(),ve(c),de(!1),x=!0)}if(G){for(var E=null,D,A=0;A<s;A++){if($.nodeType===8&&$.data===aa){c=$,x=!0,de(!1);break}var z=l[A],d=t(z,A);D=Re($,u,E,null,z,d,A,i,e),u.items.set(d,D),E=D}s>0&&ve(Te())}if(!G){var n=sa;Ca(l,u,c,i,e,(n.f&ie)!==0,t)}v!==null&&(s===0?_?Ne(_):_=ze(()=>v(c)):_!==null&&ta(_,()=>{_=null})),x&&de(!0),r()}),G&&(c=$)}function Ca(a,e,r,t,i,v,c,u){var U,F,q,Y;var b=(i&ua)!==0,P=(i&(_e|he))!==0,_=a.length,p=e.items,k=e.first,l=k,s,x=null,V,E=[],D=[],A,z,d,n;if(b)for(n=0;n<_;n+=1)A=a[n],z=c(A,n),d=p.get(z),d!==void 0&&((U=d.a)==null||U.measure(),(V??(V=new Set)).add(d));for(n=0;n<_;n+=1){if(A=a[n],z=c(A,n),d=p.get(z),d===void 0){var w=l?l.e.nodes_start:r;x=Re(w,e,x,x===null?e.first:x.next,A,z,n,t,i),p.set(z,x),E=[],D=[],l=x.next;continue}if(P&&Da(d,A,n,i),d.e.f&ie&&(Ne(d.e),b&&((F=d.a)==null||F.unfix(),(V??(V=new Set)).delete(d))),d!==l){if(s!==void 0&&s.has(d)){if(E.length<D.length){var C=D[0],o;x=C.prev;var f=E[0],H=E[E.length-1];for(o=0;o<E.length;o+=1)Ae(E[o],C,r);for(o=0;o<D.length;o+=1)s.delete(D[o]);X(e,f.prev,H.next),X(e,x,f),X(e,H,C),l=C,x=H,n-=1,E=[],D=[]}else s.delete(d),Ae(d,l,r),X(e,d.prev,d.next),X(e,d,x===null?e.first:x.next),X(e,x,d),x=d;continue}for(E=[],D=[];l!==null&&l.k!==z;)(v||!(l.e.f&ie))&&(s??(s=new Set)).add(l),D.push(l),l=l.next;if(l===null)continue;d=l}E.push(d),x=d,l=d.next}if(l!==null||s!==void 0){for(var M=s===void 0?[]:He(s);l!==null;)(v||!(l.e.f&ie))&&M.push(l),l=l.next;var L=M.length;if(L>0){var I=i&Be&&_===0?r:null;if(b){for(n=0;n<L;n+=1)(q=M[n].a)==null||q.measure();for(n=0;n<L;n+=1)(Y=M[n].a)==null||Y.fix()}Ia(e,M,I,p)}}b&&ca(()=>{var Z;if(V!==void 0)for(d of V)(Z=d.a)==null||Z.apply()}),Pe.first=e.first&&e.first.e,Pe.last=x&&x.e}function Da(a,e,r,t){t&_e&&Se(a.v,e),t&he?Se(a.i,r):a.i=r}function Re(a,e,r,t,i,v,c,u,b,P){var _=(b&_e)!==0,p=(b&va)===0,k=_?p?oa(i):Ee(i):i,l=b&he?Ee(c):c,s={i:l,v:k,k:v,a:null,e:null,prev:r,next:t};try{return s.e=ze(()=>u(a,k,l),G),s.e.prev=r&&r.e,s.e.next=t&&t.e,r===null?e.first=s:(r.next=s,r.e.next=s.e),t!==null&&(t.prev=s,t.e.prev=s.e),s}finally{}}function Ae(a,e,r){for(var t=a.next?a.next.e.nodes_start:r,i=e?e.e.nodes_start:r,v=a.e.nodes_start;v!==t;){var c=da(v);i.before(v),v=c}}function X(a,e,r){e===null?a.first=r:(e.next=r,e.e.next=r&&r.e),r!==null&&(r.prev=e,r.e.prev=e&&e.e)}function Aa(a,e,r=e){var t=fa();_a(a,"input",i=>{var v=i?a.defaultValue:a.value;if(v=ue(a)?fe(v):v,r(v),t&&v!==(v=e())){var c=a.selectionStart,u=a.selectionEnd;a.value=v??"",u!==null&&(a.selectionStart=c,a.selectionEnd=Math.min(u,a.value.length))}}),(G&&a.defaultValue!==a.value||ga(e)==null&&a.value)&&r(ue(a)?fe(a.value):a.value),ma(()=>{var i=e();ue(a)&&i===fe(a.value)||a.type==="date"&&!i&&!a.value||i!==a.value&&(a.value=i??"")})}function ue(a){var e=a.type;return e==="number"||e==="range"}function fe(a){return a===""?null:+a}var Ha=S('<div class="text-gray-200 bg-gray-700 p-3 rounded-lg border-2 border-gray-200 h-max absolute top-[50%] -translate-y-[50%] text-center m-3">Biztos meg akarod ölni? <br> <div class="*:rounded *:border-2 *:p-1 *:m-1"><button class="bg-red-500 text-black">IGEN</button> <button class="bg-green-500 text-black"> </button></div></div>');function Na(a,e){var i;xe(e,!0);const r=ye(),t=()=>j(e.playerToKill,"$playerToKill",r);((i=t())==null?void 0:i.revealDeath)!=null&&e.open.set(!1),Ea(a,{get open(){return e.open},onClose:()=>{e.playerToKill.set(void 0)},children:(v,c)=>{var u=Ha(),b=y(m(u),2),P=y(b),_=m(P);_.__click=l=>{t()&&t().revealDeath==null&&(ka(t(),l),e.open.set(!1),e.playerToKill.set(void 0))};var p=y(_,2);p.__click=()=>{e.open.set(!1),e.playerToKill.set(void 0)};var k=m(p);g(p),g(P),g(u),B(()=>{var l,s;R(b,` Szerintem ${((l=t())==null?void 0:l.name)??""} nagyon szomorú
        lenne `),R(k,`Nem, mert egy jó ember vagyok és meg akarom kímélni ${((s=t())==null?void 0:s.name)??""}
            életét`)}),h(v,u)},$$slots:{default:!0}}),be()}pe(["click"]);var za=S('<button aria-label="kill" class=" flex items-center mx-5"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x text-red-500 rounded-full border-2 border-red-500"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg></button>'),Ba=(a,e)=>{wa(e.thisPlayer,a)},Ka=S('<button aria-label="vote" class=" flex items-center mx-5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 12 2 2 4-4"></path><path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z"></path><path d="M22 19H2"></path></svg></button>'),La=S('<div class="text-red-500"> </div>'),Ua=me('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-megaphone -rotate-12"><path d="m3 11 18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg><!>',1),Ra=me(' <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-megaphone -rotate-12"><path d="m3 11 18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg>',1),Va=me('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-megaphone-off -rotate-12"><path d="M9.26 9.26 3 11v3l14.14 3.14"></path><path d="M21 15.34V6l-7.31 2.03"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path><line x1="2" x2="22" y1="2" y2="22"></line></svg>'),qa=S('<div class="flex justify-center"><span class="mr-2"> </span> <!> <!></div> <div class="text-gray-700 text-center w-full flex justify-center text-base"><!></div>',1),Oa=S('<div class="line-through"> </div>'),ja=S("<div><!></div>");function Fa(a,e){xe(e,!0);const r=ye(),t=()=>j(oe,"$gameState",r),i=()=>j(e.killUser,"$killUser",r),v=()=>j(Ma,"$votedForId",r),c=()=>j(Ke,"$unixTime",r);var u=ja(),b=m(u);{var P=p=>{var k=qa(),l=O(k),s=m(l),x=m(s,!0);B(()=>R(x,ce(e.thisPlayer.name,e.thisPlayer.nickname))),g(s);var V=y(s,2);{var E=o=>{var f=za();f.__click=H=>{i()==null&&(e.killUser.set(e.thisPlayer),e.killPopUp.set(!0))},h(o,f)},D=o=>{var f=ne(),H=O(f);{var M=L=>{var I=Ka();I.__click=[Ba,e];var U=m(I);g(I),B(()=>ba(U,`lucide lucide-vote text-${(e.thisPlayer.publicID==v()?"green-800":"green-300")??""}`)),h(L,I)};K(H,L=>{t()&&t().player&&te(t().gamedata)&&L(M)},!0)}h(o,f)};K(V,o=>{t().player&&t().player.isKiller&&!te(t().gamedata)&&e.thisPlayer.revealDeath==null?o(E):o(D,!1)})}var A=y(V,2);{var z=o=>{var f=La(),H=m(f,!0);B(()=>R(H,ae(e.thisPlayer.revealDeath-c()).altSmallString)),g(f),h(o,f)};K(A,o=>{var f;e.thisPlayer.revealDeath&&((f=t().player)!=null&&f.isKiller)&&o(z)})}g(l);var d=y(l,2),n=m(d);{var w=o=>{var f=ne(),H=O(f);Ue(H,1,()=>t().players,Le,(M,L)=>{var I=Ua(),U=y(O(I));{var F=q=>{var Y=Ye();B(()=>R(Y,ce(e.thisPlayer.name,e.thisPlayer.nickname))),h(q,Y)};K(U,q=>{se(L).voteID==e.thisPlayer.voteID&&q(F)})}h(M,I)}),h(o,f)},C=o=>{var f=ne(),H=O(f);{var M=I=>{var U=Ra(),F=O(U,!0);ee(),B(()=>R(F,e.thisPlayer.canCallMeeting)),h(I,U)},L=I=>{var U=Va();h(I,U)};K(H,I=>{e.thisPlayer.canCallMeeting>0?I(M):I(L,!1)})}h(o,f)};K(n,o=>{te(t().gamedata)?o(w):o(C,!1)})}g(d),h(p,k)},_=p=>{var k=Oa(),l=m(k,!0);B(()=>R(l,ce(e.thisPlayer.name,e.thisPlayer.nickname))),g(k),h(p,k)};K(b,p=>{e.thisPlayer.alive?p(P):p(_,!1)})}g(u),B(()=>ge(u,`w-full m-2 rounded-full border-2 max-w-[700px] p-0.5 text-center bg-${(e.thisPlayer.alive?"green-500":"red-500")??""}`)),h(a,u),be()}pe(["click"]);var Ga=S('<div class="min-h-full aspect-4/5 rounded-xl bg-gray-400 flex flex-col mx-1"><div class="flex-1 bg-gray-600 rounded-2xl mx-3 mt-2 flex place-content-center items-center text-5xl *:bg-gray-900 *:m-1 *:p-1 *:py-3 *:rounded"><div> </div> <div> </div></div> <div class=" text-center p-1"> </div></div>');function le(a,e){var r=Ga(),t=m(r),i=m(t),v=m(i,!0);B(()=>R(v,Math.abs(Math.floor(e.number%100/10)))),g(i);var c=y(i,2),u=m(c,!0);B(()=>R(u,Math.abs(e.number%10))),g(c),g(t);var b=y(t,2),P=m(b,!0);g(b),g(r),B(()=>R(P,e.text)),h(a,r)}var Xa=S('<div class="flex place-content-evenly items-center flex-wrap *:my-2"><form class="text-gray-700 flex place-content-center h-10"><input type="text" placeholder="írd ide a kódot" class="rounded-xl w-60"> <button type="submit" class="bg-gray-200 ml-4 p-1 rounded-md">Belépés</button></form> <div class="h-full border-gray-800 border-2 rounded-lg bg-gray-700 py-3 px-6 text-lg text-white">Hátralévő idő: <br> </div></div>'),Ya=S('<div title="Te vagy a gyilkos!">Gyilkos</div>'),Ja=S('<div title="Ártatlan vagy">Ártatlan</div>'),Qa=a=>{Ta()},Za=S('<div class="flex-1 text-white flex place-content-evenly"><!> <!></div>'),Wa=S('<div class="flex-1 text-white flex place-content-evenly relative"><!> <!> <div class="absolute w-full backdrop-blur-sm h-[calc(100%+16px)] rounded-2xl -top-2 bg-gray-600/50 flex items-center place-content-center text-3xl tracking-tighter text-center">Nincs Meeting</div></div>'),$a=S('<div class="aspect-square min-h-full bg-red-500 rounded-full flex items-center place-content-center text-xl z-10 border-l-8 border-b-8 border-red-900">Meeting</div> <div class="absolute w-full backdrop-blur-sm h-[calc(100%+16px)] rounded-2xl -top-2 bg-gray-600/50 flex items-center place-content-center text-xl lg:text-3xl tracking-tighter z-10 text-white">Nem tudsz meetinget hívni</div>',1),et=S('<div class="aspect-square min-h-full bg-red-500 rounded-full flex items-center place-content-center text-xl z-10 border-l-8 border-b-8 border-red-900">Meeting</div> <div class="absolute w-full backdrop-blur-sm h-[calc(100%+16px)] rounded-2xl -top-2 bg-gray-600/50 flex items-center place-content-center text-3xl tracking-tighter z-10 text-white">Meeting van</div>',1),at=S('<button class="aspect-square min-h-full bg-red-500 rounded-full flex items-center place-content-center text-xl z-10 border-l-8 border-b-8 border-red-900">Meeting</button>'),tt=S('<div class="w-full flex justify-between text-white items-center mt-2"><div class="bg-gray-700 py-3 px-6 border-gray-800 border-2 rounded-lg relative"><div> </div> <div><!></div> <button class="p-2 border border-gray-800 bg-gray-800 rounded-full aspect-square h-max absolute -right-4 top-3" aria-label="logout"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg></button></div> <div class="h-full border-gray-800 border-2 rounded-lg bg-gray-700 py-3 px-6 text-lg">Hátralévő idő: <br> </div></div> <br> <div class="w-full flex place-content-center h-40 bg-gray-700 rounded-xl border-gray-950 p-4 *:mx-1 lg:py-6 lg:px-4 lg:h-52"><!> <div class="flex-1 flex place-content-center items-center relative text-center"><!></div></div>',1),rt=S('<div class="flex flex-col items-center text-lg text-center"></div>'),lt=S('<div class="max-w-screen p-3 lg:px-96 lg:py-10"><!> <!> <hr class="my-3 mx-10"> <!></div> <!>',1);function ft(a,e){xe(e,!0);const r=ye(),t=()=>j(oe,"$gameState",r),i=()=>j(Ke,"$unixTime",r),v=()=>j(k,"$deadStrikeThrough",r),c=()=>j(p,"$color",r);let u=ha("");function b(){Ie(u,"")}let P=De(!1),_=De(),p=Ce(oe,n=>{var w;return(w=n.player)!=null&&w.isKiller?"red-500":"green-500"}),k=Ce(oe,n=>{var w;return((w=n.player)==null?void 0:w.revealDeath)==null?"":"line-through"});var l=lt(),s=O(l),x=m(s);{var V=n=>{var w=Xa(),C=m(w),o=m(C);pa(o),ya(o,"maxlength",16),ee(2),g(C);var f=y(C,2),H=y(m(f),2,!0);B(()=>R(H,ae(t().gamedata.gameStart+t().gamedata.gameLength-i()).smallString)),g(f),g(w),xa("submit",C,async M=>{await Pa(se(u),M)||b()}),Aa(o,()=>se(u),M=>Ie(u,M)),h(n,w)};K(x,n=>{t().player||n(V)})}var E=y(x,2);{var D=n=>{var w=tt(),C=O(w),o=m(C),f=m(o),H=m(f,!0);g(f);var M=y(f,2),L=m(M);{var I=T=>{var N=Ya();h(T,N)},U=T=>{var N=Ja();h(T,N)};K(L,T=>{t().player.isKiller?T(I):T(U,!1)})}g(M);var F=y(M,2);F.__click=[Qa],g(o);var q=y(o,2),Y=y(m(q),2,!0);B(()=>R(Y,ae(t().gamedata.gameStart+t().gamedata.gameLength-i()).smallString)),g(q),g(C);var Z=y(C,4),ke=m(Z);{var Ve=T=>{var N=Za(),J=m(N);le(J,{get number(){return ae(t().gamedata.meetingStart+t().gamedata.meetingLength-i()).mins},text:"Perc"});var W=y(J,2);le(W,{get number(){return ae(t().gamedata.meetingStart+t().gamedata.meetingLength-i()).secs},text:"Másodperc"}),g(N),h(T,N)},qe=T=>{var N=Wa(),J=m(N);le(J,{number:0,text:"Perc"});var W=y(J,2);le(W,{number:0,text:"Másodperc"}),ee(2),g(N),h(T,N)};K(ke,T=>{te(t().gamedata)?T(Ve):T(qe,!1)})}var we=y(ke,2),Oe=m(we);{var je=T=>{var N=$a();ee(2),h(T,N)},Fe=T=>{var N=ne(),J=O(N);{var W=Q=>{var re=et();ee(2),h(Q,re)},Ge=Q=>{var re=at();re.__click=function(...Xe){var Me;(Me=Sa)==null||Me.apply(this,Xe)},h(Q,re)};K(J,Q=>{te(t().gamedata)?Q(W):Q(Ge,!1)},!0)}h(T,N)};K(Oe,T=>{t().player.canCallMeeting<=0||t().player.revealDeath!=null?T(je):T(Fe,!1)})}g(we),g(Z),B(()=>{ge(f,`${v()??""} text-4xl tracking-wider`),R(H,t().player.name),ge(M,`text-lg tracking-normal text-${c()??""} ${v()??""} pl-14 -mt-1`)}),h(n,w)};K(E,n=>{t().player&&n(D)})}var A=y(E,4);{var z=n=>{var w=rt();Ue(w,5,()=>t().players,Le,(C,o)=>{Fa(C,{killUser:_,killPopUp:P,get thisPlayer(){return se(o)}})}),g(w),h(n,w)};K(A,n=>{t().players&&n(z)})}g(s);var d=y(s,2);return Na(d,{open:P,playerToKill:_}),h(a,l),be({resetIdTextInput:b})}pe(["click"]);export{ft as component};
