import{d as $,a as u,t as T,e as Ae,n as Ne}from"../chunks/C8VbkOX1.js";import{q as Y,O as de,ae as Je,ao as Qe,J as We,I as Ze,H as $e,am as He,M as ea,N as Me,P as ce,V as le,ai as aa,as as oe,Q as Be,R as Ue,T as ta,F as De,at as Pe,au as ra,al as la,av as na,ap as ia,aa as sa,X as va,B as Ie,aw as _e,ax as xe,ay as oa,ag as da,az as Le,ab as ca,aA as ua,aB as fa,b as ga,aC as ma,p as he,y as q,i as pe,s as b,j as m,k as c,t as H,g as ae,aD as ne,D as Ce,aE as _a}from"../chunks/CJR8sh4W.js";import{l as xa,d as be,s as U,e as ha}from"../chunks/DR52M7lB.js";import{s as ye,i as N,a as O}from"../chunks/c6B5rUVk.js";import{s as me,a as pa,r as ba,b as ya}from"../chunks/BJwEh_PS.js";import{g as ie,u as ke,k as ka,a as Q,f as ue,i as se,v as wa,b as Sa,l as Ta,c as Ma,d as Da}from"../chunks/CqrJ9ST_.js";import{d as Ee,w as Ke}from"../chunks/BM41IADg.js";import{P as Pa}from"../chunks/D4INXg-w.js";function Re(t,e){return e}function Ia(t,e,l,a){for(var r=[],o=e.length,f=0;f<o;f++)ra(e[f].e,r,!0);var h=o>0&&r.length===0&&l!==null;if(h){var w=l.parentNode;la(w),w.append(l),a.clear(),J(t,e[0].prev,e[o-1].next)}na(r,()=>{for(var K=0;K<o;K++){var k=e[K];h||(a.delete(k.k),J(t,k.prev,k.next)),ia(k.e,!h)}})}function Ve(t,e,l,a,r,o=null){var f=t,h={flags:e,items:new Map,first:null},w=(e&Le)!==0;if(w){var K=t;f=Y?de(Je(K)):K.appendChild(Qe())}Y&&We();var k=null,M=!1;Ze(()=>{var D=l(),i=$e(D)?D:D==null?[]:He(D),s=i.length;if(M&&s===0)return;M=s===0;let _=!1;if(Y){var L=f.data===ea;L!==(s===0)&&(f=Me(),de(f),ce(!1),_=!0)}if(Y){for(var S=null,p,y=0;y<s;y++){if(le.nodeType===8&&le.data===aa){f=le,_=!0,ce(!1);break}var P=i[y],d=a(P,y);p=qe(le,h,S,null,P,d,y,r,e),h.items.set(d,p),S=p}s>0&&de(Me())}if(!Y){var n=sa;Ca(i,h,f,r,e,(n.f&oe)!==0,a)}o!==null&&(s===0?k?Be(k):k=Ue(()=>o(f)):k!==null&&ta(k,()=>{k=null})),_&&ce(!0),l()}),Y&&(f=le)}function Ca(t,e,l,a,r,o,f,h){var V,X,j,W;var w=(r&ua)!==0,K=(r&(xe|_e))!==0,k=t.length,M=e.items,D=e.first,i=D,s,_=null,L,S=[],p=[],y,P,d,n;if(w)for(n=0;n<k;n+=1)y=t[n],P=f(y,n),d=M.get(P),d!==void 0&&((V=d.a)==null||V.measure(),(L??(L=new Set)).add(d));for(n=0;n<k;n+=1){if(y=t[n],P=f(y,n),d=M.get(P),d===void 0){var x=i?i.e.nodes_start:l;_=qe(x,e,_,_===null?e.first:_.next,y,P,n,a,r),M.set(P,_),S=[],p=[],i=_.next;continue}if(K&&Ea(d,y,n,r),d.e.f&oe&&(Be(d.e),w&&((X=d.a)==null||X.unfix(),(L??(L=new Set)).delete(d))),d!==i){if(s!==void 0&&s.has(d)){if(S.length<p.length){var I=p[0],v;_=I.prev;var g=S[0],z=S[S.length-1];for(v=0;v<S.length;v+=1)ze(S[v],I,l);for(v=0;v<p.length;v+=1)s.delete(p[v]);J(e,g.prev,z.next),J(e,_,g),J(e,z,I),i=I,_=z,n-=1,S=[],p=[]}else s.delete(d),ze(d,i,l),J(e,d.prev,d.next),J(e,d,_===null?e.first:_.next),J(e,_,d),_=d;continue}for(S=[],p=[];i!==null&&i.k!==P;)(o||!(i.e.f&oe))&&(s??(s=new Set)).add(i),p.push(i),i=i.next;if(i===null)continue;d=i}S.push(d),_=d,i=d.next}if(i!==null||s!==void 0){for(var C=s===void 0?[]:He(s);i!==null;)(o||!(i.e.f&oe))&&C.push(i),i=i.next;var R=C.length;if(R>0){var A=r&Le&&k===0?l:null;if(w){for(n=0;n<R;n+=1)(j=C[n].a)==null||j.measure();for(n=0;n<R;n+=1)(W=C[n].a)==null||W.fix()}Ia(e,C,A,M)}}w&&ca(()=>{var te;if(L!==void 0)for(d of L)(te=d.a)==null||te.apply()}),De.first=e.first&&e.first.e,De.last=_&&_.e}function Ea(t,e,l,a){a&xe&&Pe(t.v,e),a&_e?Pe(t.i,l):t.i=l}function qe(t,e,l,a,r,o,f,h,w,K){var k=(w&xe)!==0,M=(w&oa)===0,D=k?M?va(r):Ie(r):r,i=w&_e?Ie(f):f,s={i,v:D,k:o,a:null,e:null,prev:l,next:a};try{return s.e=Ue(()=>h(t,D,i),Y),s.e.prev=l&&l.e,s.e.next=a&&a.e,l===null?e.first=s:(l.next=s,l.e.next=s.e),a!==null&&(a.prev=s,a.e.prev=s.e),s}finally{}}function ze(t,e,l){for(var a=t.next?t.next.e.nodes_start:l,r=e?e.e.nodes_start:l,o=t.e.nodes_start;o!==a;){var f=da(o);r.before(o),o=f}}function J(t,e,l){e===null?t.first=l:(e.next=l,e.e.next=l&&l.e),l!==null&&(l.prev=e,l.e.prev=e&&e.e)}function Ka(t,e,l=e){var a=fa();xa(t,"input",r=>{var o=r?t.defaultValue:t.value;if(o=fe(t)?ge(o):o,l(o),a&&o!==(o=e())){var f=t.selectionStart,h=t.selectionEnd;t.value=o??"",h!==null&&(t.selectionStart=f,t.selectionEnd=Math.min(h,t.value.length))}}),(Y&&t.defaultValue!==t.value||ga(e)==null&&t.value)&&l(fe(t)?ge(t.value):t.value),ma(()=>{var r=e();fe(t)&&r===ge(t.value)||t.type==="date"&&!r&&!t.value||r!==t.value&&(t.value=r??"")})}function fe(t){var e=t.type;return e==="number"||e==="range"}function ge(t){return t===""?null:+t}var za=T(' <span>Idő következő ölésig: <span class="text-red-500"> </span></span>',1),Aa=T('<div class="text-gray-200 bg-gray-700 p-3 rounded-lg border-2 border-gray-200 h-max absolute top-[50%] -translate-y-[50%] text-center m-3">Biztos meg akarod ölni? <br> <!> <div class="*:rounded *:border-2 *:p-1 *:m-1"><button class="bg-red-500 text-black">IGEN</button> <button class="bg-green-500 text-black"> </button></div></div>'),Na=T('<div class="text-gray-200 bg-gray-700 p-3 rounded-lg border-2 border-gray-200 h-max absolute top-[50%] -translate-y-[50%] text-center m-3">Nem tudsz ölni még kell egy kicsit várnod <br> </div>');function Ha(t,e){var f;he(e,!0);const l=ye(),a=()=>O(e.playerToKill,"$playerToKill",l),r=()=>O(ie,"$gameState",l),o=()=>O(ke,"$unixTime",l);((f=a())==null?void 0:f.revealDeath)!=null&&e.open.set(!1),setInterval(()=>{console.log(r().gamedata.lastKill)},1e3),Pa(t,{get open(){return e.open},onClose:()=>{e.playerToKill.set(void 0)},children:(h,w)=>{var K=$(),k=q(K);{var M=i=>{var s=Aa(),_=b(m(s),2),L=b(_);{var S=n=>{var x=za(),I=q(x),v=b(I),g=b(m(v)),z=m(g,!0);H(()=>U(z,Q(r().gamedata.lastKill+r().gamedata.killCoolDown-o()).altSmallString)),c(g),c(v),H(()=>U(I,`Extra öléset fog felhasználni (${r().player.extraKills??""} van még) `)),u(n,x)};N(L,n=>{var x;((x=r().player)==null?void 0:x.extraKills)>0&&r().gamedata.lastKill+r().gamedata.killCoolDown>o()&&n(S)})}var p=b(L,2),y=m(p);y.__click=n=>{a()&&a().revealDeath==null&&(ka(a(),n),e.open.set(!1),e.playerToKill.set(void 0))};var P=b(y,2);P.__click=()=>{e.open.set(!1),e.playerToKill.set(void 0)};var d=m(P);c(P),c(p),c(s),H(()=>{var n,x;U(_,` Szerintem ${((n=a())==null?void 0:n.name)??""} nagyon szomorú
      lenne `),U(d,`Nem, mert egy jó ember vagyok és meg akarom kímélni ${((x=a())==null?void 0:x.name)??""}
          életét`)}),u(i,s)},D=i=>{var s=$(),_=q(s);{var L=p=>{var y=Na(),P=b(m(y),2);H(()=>U(P,` ${Q(r().gamedata.lastKill+r().gamedata.killCoolDown-o()).altSmallString??""}`)),c(y),u(p,y)},S=p=>{var y=Ae("Error");u(p,y)};N(_,p=>{r()&&r().player&&r().player.isKiller&&r().gamedata.lastKill+r().gamedata.killCoolDown>o()&&r().player.extraKills<=0?p(L):p(S,!1)},!0)}u(i,s)};N(k,i=>{r()&&r().player&&r().player.isKiller&&(r().gamedata.lastKill+r().gamedata.killCoolDown<o()||r().player.extraKills>0)?i(M):i(D,!1)})}u(h,K)},$$slots:{default:!0}}),pe()}be(["click"]);var Ba=T('<button aria-label="kill" class=" flex items-center mx-5"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x text-red-500 rounded-full border-2 border-red-500"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg></button>'),Ua=(t,e)=>{wa(e.thisPlayer,t)},La=T('<button aria-label="vote" class=" flex items-center mx-5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 12 2 2 4-4"></path><path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z"></path><path d="M22 19H2"></path></svg></button>'),Ra=T('<div class="text-red-500"> </div>'),Va=Ne(' <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-megaphone -rotate-12"><path d="m3 11 18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg>',1),qa=Ne('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-megaphone-off -rotate-12"><path d="M9.26 9.26 3 11v3l14.14 3.14"></path><path d="M21 15.34V6l-7.31 2.03"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path><line x1="2" x2="22" y1="2" y2="22"></line></svg>'),Oa=T('<div class="flex justify-center"><span class="mr-2"> </span> <!> <!></div> <div class="text-gray-700 text-center w-full flex justify-center text-base"><!></div>',1),Fa=T('<div class="line-through"> </div>'),ja=T("<div><!></div>");function Ga(t,e){he(e,!0);const l=ye(),a=()=>O(ie,"$gameState",l),r=()=>O(e.killUser,"$killUser",l),o=()=>O(Sa,"$votedForId",l),f=()=>O(ke,"$unixTime",l);var h=ja(),w=m(h);{var K=M=>{var D=Oa(),i=q(D),s=m(i),_=m(s,!0);H(()=>U(_,ue(e.thisPlayer.name,e.thisPlayer.nickname))),c(s);var L=b(s,2);{var S=v=>{var g=Ba();g.__click=z=>{r()==null&&(e.killUser.set(e.thisPlayer),e.killPopUp.set(!0))},u(v,g)},p=v=>{var g=$(),z=q(g);{var C=R=>{var A=La();A.__click=[Ua,e];var V=m(A);c(A),H(()=>pa(V,`lucide lucide-vote text-${(e.thisPlayer.publicID==o()?"green-800":"green-300")??""}`)),u(R,A)};N(z,R=>{a()&&a().player&&se(a().gamedata)&&a().player.revealDeath==null&&R(C)},!0)}u(v,g)};N(L,v=>{a().player&&a().player.isKiller&&!se(a().gamedata)&&e.thisPlayer.revealDeath==null?v(S):v(p,!1)})}var y=b(L,2);{var P=v=>{var g=Ra(),z=m(g,!0);H(()=>U(z,Q(e.thisPlayer.revealDeath-f()).altSmallString)),c(g),u(v,g)};N(y,v=>{var g;e.thisPlayer.revealDeath&&((g=a().player)!=null&&g.isKiller)&&v(P)})}c(i);var d=b(i,2),n=m(d);{var x=v=>{var g=$(),z=q(g);Ve(z,1,()=>a().players,Re,(C,R)=>{var A=$(),V=q(A);{var X=j=>{var W=Ae();H(()=>U(W,`Rá szavazott: ${ue(ae(R).name,ae(R).nickname)??""}`)),u(j,W)};N(V,j=>{ae(R).publicID==e.thisPlayer.voteID&&e.thisPlayer.voteID!=null&&j(X)})}u(C,A)}),u(v,g)},I=v=>{var g=$(),z=q(g);{var C=A=>{var V=Va(),X=q(V,!0);ne(),H(()=>U(X,e.thisPlayer.canCallMeeting)),u(A,V)},R=A=>{var V=qa();u(A,V)};N(z,A=>{e.thisPlayer.canCallMeeting>0?A(C):A(R,!1)})}u(v,g)};N(n,v=>{se(a().gamedata)?v(x):v(I,!1)})}c(d),u(M,D)},k=M=>{var D=Fa(),i=m(D,!0);H(()=>U(i,ue(e.thisPlayer.name,e.thisPlayer.nickname))),c(D),u(M,D)};N(w,M=>{e.thisPlayer.alive?M(K):M(k,!1)})}c(h),H(()=>me(h,`w-full m-2 rounded-full border-2 max-w-[700px] p-0.5 text-center bg-${(e.thisPlayer.alive?"green-500":"red-500")??""}`)),u(t,h),pe()}be(["click"]);var Xa=T('<div class="min-h-full aspect-4/5 rounded-xl bg-gray-400 flex flex-col mx-1"><div class="flex-1 bg-gray-600 rounded-2xl mx-3 mt-2 flex place-content-center items-center text-5xl *:bg-gray-900 *:m-1 *:p-1 *:py-3 *:rounded"><div> </div> <div> </div></div> <div class=" text-center p-1"> </div></div>');function ve(t,e){var l=Xa(),a=m(l),r=m(a),o=m(r,!0);H(()=>U(o,Math.abs(Math.floor(e.number%100/10)))),c(r);var f=b(r,2),h=m(f,!0);H(()=>U(h,Math.abs(e.number%10))),c(f),c(a);var w=b(a,2),K=m(w,!0);c(w),c(l),H(()=>U(K,e.text)),u(t,l)}var Ya=T('<div class="flex place-content-evenly items-center flex-wrap *:my-2"><form class="text-gray-700 flex place-content-center h-10"><input type="text" placeholder="írd ide a kódot" class="rounded-xl w-60"> <button type="submit" class="bg-gray-200 ml-4 p-1 rounded-md">Belépés</button></form> <div class="h-full border-gray-800 border-2 rounded-lg bg-gray-700 py-3 px-6 text-lg text-white">Hátralévő idő: <br> </div></div>'),Ja=T('<div title="Te vagy a gyilkos!">Gyilkos</div>'),Qa=T('<div class="text-red-500 no-underline"> </div>'),Wa=T('<div title="Ártatlan vagy">Ártatlan</div> <!>',1),Za=t=>{Ta()},$a=T('<div class="flex-1 text-white flex place-content-evenly"><!> <!></div>'),et=T('<div class="flex-1 text-white flex place-content-evenly relative"><!> <!> <div class="absolute w-full backdrop-blur-sm h-[calc(100%+16px)] rounded-2xl -top-2 bg-gray-600/50 flex items-center place-content-center text-3xl tracking-tighter text-center">Nincs Meeting</div></div>'),at=T('<div class="aspect-square min-h-full bg-red-500 rounded-full flex items-center place-content-center text-xl z-10 border-l-8 border-b-8 border-red-900">Meeting</div> <div class="absolute w-full backdrop-blur-sm h-[calc(100%+16px)] rounded-2xl -top-2 bg-gray-600/50 flex items-center place-content-center text-xl lg:text-3xl tracking-tighter z-10 text-white">Nem tudsz meetinget hívni</div>',1),tt=T('<div class="aspect-square min-h-full bg-red-500 rounded-full flex items-center place-content-center text-xl z-10 border-l-8 border-b-8 border-red-900">Meeting</div> <div class="absolute w-full backdrop-blur-sm h-[calc(100%+16px)] rounded-2xl -top-2 bg-gray-600/50 flex items-center place-content-center text-3xl tracking-tighter z-10 text-white">Meeting van</div>',1),rt=T('<button class="aspect-square min-h-full bg-red-500 rounded-full flex items-center place-content-center text-xl z-10 border-l-8 border-b-8 border-red-900">Meeting</button>'),lt=T('<div class="w-full flex justify-between text-white items-center mt-2"><div class="bg-gray-700 py-3 px-6 border-gray-800 border-2 rounded-lg relative"><div> </div> <div><!></div> <button class="p-2 border border-gray-800 bg-gray-800 rounded-full aspect-square h-max absolute -right-4 top-3" aria-label="logout"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg></button></div> <div class="h-full border-gray-800 border-2 rounded-lg bg-gray-700 py-3 px-6 text-lg">Hátralévő idő: <br> </div></div> <br> <div class="w-full flex place-content-center h-40 bg-gray-700 rounded-xl border-gray-950 p-4 *:mx-1 lg:py-6 lg:px-4 lg:h-52"><!> <div class="flex-1 flex place-content-center items-center relative text-center"><!></div></div>',1),nt=T('<div class="flex flex-col items-center text-lg text-center"></div>'),it=T('<div class="max-w-screen p-3 lg:px-96 lg:py-10"><!> <!> <hr class="my-3 mx-10"> <!></div> <!>',1);function mt(t,e){he(e,!0);const l=ye(),a=()=>O(ie,"$gameState",l),r=()=>O(ke,"$unixTime",l),o=()=>O(D,"$deadStrikeThrough",l),f=()=>O(M,"$color",l);let h=_a("");function w(){Ce(h,"")}let K=Ke(!1),k=Ke(),M=Ee(ie,n=>{var x;return(x=n.player)!=null&&x.isKiller?"red-500":"green-500"}),D=Ee(ie,n=>{var x;return((x=n.player)==null?void 0:x.revealDeath)==null?"":"line-through"});var i=it(),s=q(i),_=m(s);{var L=n=>{var x=Ya(),I=m(x),v=m(I);ba(v),ya(v,"maxlength",16),ne(2),c(I);var g=b(I,2),z=b(m(g),2,!0);H(()=>U(z,Q(a().gamedata.gameStart+a().gamedata.gameLength-r()).smallString)),c(g),c(x),ha("submit",I,async C=>{await Ma(ae(h),C)||w()}),Ka(v,()=>ae(h),C=>Ce(h,C)),u(n,x)};N(_,n=>{a().player||n(L)})}var S=b(_,2);{var p=n=>{var x=lt(),I=q(x),v=m(I),g=m(v),z=m(g,!0);c(g);var C=b(g,2),R=m(C);{var A=E=>{var B=Ja();u(E,B)},V=E=>{var B=Wa(),G=b(q(B),2);{var Z=re=>{var F=Qa(),ee=m(F,!0);H(()=>U(ee,Q(a().player.revealDeath-r()).altSmallString)),c(F),u(re,F)};N(G,re=>{a().player.revealDeath!=null&&a().player.revealDeath-r()>0&&re(Z)})}u(E,B)};N(R,E=>{a().player.isKiller?E(A):E(V,!1)})}c(C);var X=b(C,2);X.__click=[Za],c(v);var j=b(v,2),W=b(m(j),2,!0);H(()=>U(W,Q(a().gamedata.gameStart+a().gamedata.gameLength-r()).smallString)),c(j),c(I);var te=b(I,4),we=m(te);{var Oe=E=>{var B=$a(),G=m(B);ve(G,{get number(){return Q(a().gamedata.meetingStart+a().gamedata.meetingLength-r()).mins},text:"Perc"});var Z=b(G,2);ve(Z,{get number(){return Q(a().gamedata.meetingStart+a().gamedata.meetingLength-r()).secs},text:"Másodperc"}),c(B),u(E,B)},Fe=E=>{var B=et(),G=m(B);ve(G,{number:0,text:"Perc"});var Z=b(G,2);ve(Z,{number:0,text:"Másodperc"}),ne(2),c(B),u(E,B)};N(we,E=>{se(a().gamedata)?E(Oe):E(Fe,!1)})}var Se=b(we,2),je=m(Se);{var Ge=E=>{var B=at();ne(2),u(E,B)},Xe=E=>{var B=$(),G=q(B);{var Z=F=>{var ee=tt();ne(2),u(F,ee)},re=F=>{var ee=rt();ee.__click=function(...Ye){var Te;(Te=Da)==null||Te.apply(this,Ye)},u(F,ee)};N(G,F=>{se(a().gamedata)?F(Z):F(re,!1)},!0)}u(E,B)};N(je,E=>{a().player.canCallMeeting<=0||a().player.revealDeath!=null||a().gamedata.gameWon!=0?E(Ge):E(Xe,!1)})}c(Se),c(te),H(()=>{me(g,`${o()??""} text-4xl tracking-wider`),U(z,a().player.name),me(C,`text-lg tracking-normal text-${f()??""} ${o()??""} pl-14 -mt-1`)}),u(n,x)};N(S,n=>{a().player&&n(p)})}var y=b(S,4);{var P=n=>{var x=nt();Ve(x,5,()=>a().players,Re,(I,v)=>{Ga(I,{killUser:k,killPopUp:K,get thisPlayer(){return ae(v)}})}),c(x),u(n,x)};N(y,n=>{a().players&&n(P)})}c(s);var d=b(s,2);return Ha(d,{open:K,playerToKill:k}),u(t,i),pe({resetIdTextInput:w})}be(["click"]);export{mt as component};
