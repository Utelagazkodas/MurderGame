import{a as l,t as d}from"./disclose-version.D9qM-ZVJ.js";import{p as m,t as k,i as _,s as w,j as i,k as n}from"./utils.BHoosnMm.js";import{d as x}from"./render.B3VTL0sw.js";import{s as j,p as c,i as y,a as B}from"./props.hptT8Dg9.js";import{s as P}from"./api.D3pvvA3j.js";var z=d('<button aria-label="close" class="absolute top-2 right-2 z-20 p-0.5 rounded-2xl bg-slate-900/70 backdrop-blur"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x text-gray-200"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg></button>'),C=d('<dialog class="overflow-hidden top-0 h-screen w-screen bg-gray-900/65 backdrop-blur text-right"><div class="relative h-screen w-auto mx-auto flex justify-center"><!> <!></div></dialog>');function E(p,e){m(e,!0);const u=j(),f=()=>B(e.open,"$open",u);let v=c(e,"closeButton",3,!0),g=c(e,"outclickable",3,!1);var t=C();t.__click=o=>{g()&&e.open.set(!1)};var a=i(t),s=i(a);P(s,()=>e.children);var h=w(s,2);{var b=o=>{var r=z();r.__click=()=>{e.open.set(!1)},l(o,r)};y(h,o=>{v()&&o(b)})}n(a),n(t),k(()=>t.open=f()),l(p,t),_()}x(["click"]);export{E as P};
