import{f as i,u as _,g as f,r as p,o as k,c as v,a as o,t as c,b as L,w as g,h as l,d as x}from"./app.f3ff6701.js";const B={class:"theme-container"},N={class:"theme-default-content"},T=o("h1",null,"404",-1),V=i({setup(b){var a,s,n;const u=_(),e=f(),t=(a=e.value.notFound)!=null?a:["Not Found"],r=()=>t[Math.floor(Math.random()*t.length)],h=(s=e.value.home)!=null?s:u.value,m=(n=e.value.backToHome)!=null?n:"Back to home";return(C,M)=>{const d=p("RouterLink");return k(),v("div",B,[o("div",N,[T,o("blockquote",null,c(r()),1),L(d,{to:l(h)},{default:g(()=>[x(c(l(m)),1)]),_:1},8,["to"])])])}}});export{V as default};