"use strict";(self.webpackChunksumbar=self.webpackChunksumbar||[]).push([[285],{7179:function(e,t,r){var s=r(4569),n=r.n(s),c=n().create({baseURL:"http://95.85.127.250:3002"});c.interceptors.request.use((function(e){return e.headers.Authorization="Bearer "+localStorage.getItem("accessToken"),e}),(function(e){return Promise.reject(e)})),c.interceptors.response.use((function(e){return e}),(function(e){return 403===(e.response?e.response.status:null)&&(console.log("Refresh Token"),n().get("users/refresh",{headers:{Authorization:"Bearer ".concat(localStorage.getItem("refreshToken"))}}).then((function(e){console.log(e.data),localStorage.setItem("accessToken",e.data)})).catch((function(e){console.log(e)}))),Promise.reject(e)})),t.Z=c},2827:function(e,t,r){var s=r(1413),n=r(4165),c=r(5861),a=r(885),l=r(2791),i=r(8820),o=r(7692),d=r(7945),u=r.n(d),x=(r(4655),r(9434)),m=r(8844),p=r(3504),f=r(3722),h=r(4775),g=(r(5176),r(7179)),b=r(184);t.Z=function(e){var t=e.e,r=e.setHasabymModal,d=(0,l.useState)(!0),j=(0,a.Z)(d,2),y=(j[0],j[1]);(0,l.useEffect)((function(){u().init({duration:500,once:"true"})}),[]);var v=(0,x.v9)((function(e){return e.cart.cartProducts})),N=(0,x.I0)(),k=(0,l.useState)(),w=(0,a.Z)(k,2),Z=w[0],S=w[1],E=(0,l.useState)(!1),C=(0,a.Z)(E,2),U=C[0],M=C[1],T=(0,l.useState)(!1),B=(0,a.Z)(T,2),z=B[0],V=B[1];(0,l.useEffect)((function(){function e(){return(e=(0,c.Z)((0,n.Z)().mark((function e(){var t;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,g.Z.get("/users/favorites");case 3:t=e.sent,S(t.data),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[z]),(0,l.useEffect)((function(){var e=Z&&Z.find((function(e){return e.id===t.id}));M(e)}),[Z]);var A=function(){r(!0),U?g.Z.delete("/product/like/".concat(t.id)).then((function(e){console.log(e.data),V(!z)})).catch((function(e){console.log(e)})):g.Z.post("/product/like/".concat(t.id),{}).then((function(e){console.log(e.data),V(!z)})).catch((function(e){console.log(e)}))},H=(0,l.useState)(!1),L=(0,a.Z)(H,2),q=L[0],I=L[1];(0,l.useEffect)((function(){var e=v.find((function(e){return e.product.id===t.id}));I(e)}),[v]);var P=(0,x.v9)((function(e){return e.equal.equalProducts})),G=(0,l.useState)(!1),R=(0,a.Z)(G,2),D=R[0],O=R[1];(0,l.useEffect)((function(){var e=P.find((function(e){return e.e.id===t.id}));O(e)}),[P]);var F=(0,l.useState)(!1),W=(0,a.Z)(F,2),Y=W[0],_=W[1],J=function(e){var t=e.image,r=e.thumb,s=e.group;return(0,b.jsx)("div",{style:{maxWidth:"250px",width:"200px",padding:"5px"},children:(0,b.jsx)(h.Sj,{group:s,src:t,thumb:r,children:(0,b.jsx)("img",{alt:t,src:t,style:{width:"100%"}})})})},K=function(e){var t=(0,h.tG)().openGallery;return(0,b.jsx)("button",(0,s.Z)((0,s.Z)({},e),{},{onClick:function(){return t("group2")},children:(0,b.jsx)(i.SxL,{className:"text-xl mx-1"})}))};return(0,b.jsxs)("div",{"data-aos":"fade",className:"m-0 border-2 p-1",children:[(0,b.jsxs)("div",{className:"flex items-center justify-end",children:[(0,b.jsxs)("div",{className:"flex items-center md:border-2 rounded-md px-1 cursor-pointer",children:[(0,b.jsx)("input",{className:"md:mr-1 cursor-pointer",id:t.title,name:t.title,onChange:function(){return!D&&P.length<4?N((0,f.MA)({e:t})):N((0,f.ok)({e:t})),void(4===P.length&&O(!1))},checked:D,type:"checkbox"}),(0,b.jsx)("label",{htmlFor:t.title,className:"md:block hidden cursor-pointer",children:"Denesdirmek"})]}),(0,b.jsxs)(h.rR,{children:[(0,b.jsx)("div",{className:"hidden",children:t.imageUrl.map((function(e,t){return(0,b.jsx)(J,{image:e,group:"group2"},t)}))}),(0,b.jsx)(K,{})]}),U?(0,b.jsx)(i.M_L,{onClick:function(){return A()},className:"cursor-pointer text-xl text-red-500"}):(0,b.jsx)(i.lo,{onClick:function(){return A()},className:"cursor-pointer text-xl text-red-500"})]}),(0,b.jsx)("div",{className:"absolute overflow-hidden text-center w-16 h-16",style:{top:"-1px",left:"-1px"},children:(0,b.jsx)("span",{className:"text-sm text-white bg-red-500 absolute block text-center transform -rotate-45",style:{width:"10rem",left:"-3.5rem",top:"1rem"},children:"Taze"})}),(0,b.jsx)("div",{onMouseOver:function(){return _(!0)},onMouseOut:function(){return _(!1)},children:(0,b.jsx)(p.rU,{to:"/product/".concat(t.id),onClick:function(){window.scrollTo({top:0,behavior:"smooth"})},children:t.imageUrl&&(0,b.jsx)("img",{alt:t.imageUrl[0],src:"".concat(Y&&t.imageUrl[1]?t.imageUrl[1]:t.imageUrl[0])})})}),(0,b.jsxs)("div",{className:"flex flex-col items-center",children:[(0,b.jsx)(p.rU,{to:"/product/".concat(t.id),onClick:function(){window.scrollTo({top:0,behavior:"smooth"})},children:(0,b.jsx)("h6",{className:"hover:text-red-500 text-center px-1 h-24 text-sm leading-5",children:t.title})}),(0,b.jsx)("p",{className:"w-12 h-0.5 bg-red-500"}),(0,b.jsxs)("div",{className:"flex justify-center my-1 items-center",children:[(0,b.jsxs)("p",{className:"font-bold mr-1",children:[t.price,".00"]}),(0,b.jsx)("span",{className:"",children:"TMT"})]}),q?(0,b.jsx)("div",{children:(0,b.jsxs)(p.rU,{className:"mb-2 flex items-center font-medium text-xs px-4 py-1.5 hover:border-red-500 border-2 text-red-500 rounded-2xl transition duration-500 hover:bg-red-500 hover:text-white",to:"/card",children:[(0,b.jsx)(o.PHf,{}),"SEBEDE GIT"]})}):(0,b.jsx)("button",{onClick:function(){return function(e){setTimeout((function(){y(!1)}),1500);var t=v.find((function(t){return t.product.id===e.id}));N(t?(0,m.Z5)({quantity:t.quantity,product:e}):(0,m.Z5)({quantity:1,product:e}))}(t)},className:"mb-2 bg-red-600 text-xs px-4 py-2 text-white rounded-2xl transition duration-500 hover:bg-black",children:"SEBEDE GOS"})]})]})}},285:function(e,t,r){r.r(t);var s=r(4165),n=r(5861),c=r(885),a=r(2791),l=r(6355),i=r(6036),o=(r(9791),r(7945)),d=r.n(o),u=(r(4655),r(2827)),x=(r(4569),r(9126)),m=r(7179),p=r(9434),f=r(184);t.default=function(){var e=(0,a.useState)("Elipbiy boyunca"),t=(0,c.Z)(e,2),r=t[0],o=t[1],h=(0,a.useState)(!1),g=(0,c.Z)(h,2),b=g[0],j=g[1],y=(0,a.useState)(!1),v=(0,c.Z)(y,2),N=v[0],k=v[1],w=(0,a.useState)(40),Z=(0,c.Z)(w,2),S=Z[0],E=Z[1],C=function(){j(!b)},U=function(){k(!N)};(0,a.useEffect)((function(){d().init({duration:1e3}),d().refresh()}),[]);var M=(0,a.useState)(null),T=(0,c.Z)(M,2),B=T[0],z=T[1];(0,a.useEffect)((function(){function e(){return(e=(0,n.Z)((0,s.Z)().mark((function e(){var t;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m.Z.get("/users/favorites");case 3:t=e.sent,z(t.data),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]);var V=(0,p.v9)((function(e){return e.profileShow.profileShow}));return(0,a.useEffect)((function(){!V&&window.location.replace("/")}),[]),(0,f.jsxs)("div",{className:"md:w-3/4  w-full md:mt-5 mt-0",children:[(0,f.jsx)("h1",{className:"mb-4 sm:mt-0 mt-5 text-center text-2xl font-bold",children:"HALA\xddANLARYM"}),(0,f.jsxs)("div",{className:"sm:mx-0 mx-3 my-5 flex items-center justify-between",children:[(0,f.jsxs)("p",{className:"",children:["Haryt: ",B&&B.length]}),(0,f.jsxs)("div",{className:"flex",children:[(0,f.jsxs)("div",{className:"relative",children:[(0,f.jsxs)("div",{onClick:function(){return C()},className:"hover:bg-gray-300 transition delay-200 flex items-center px-3 py-1 border-2 text-sm cursor-pointer",children:[(0,f.jsx)("p",{children:r}),(0,f.jsx)(l.iUH,{})]}),b&&(0,f.jsx)("div",{className:"absolute z-10 w-36 right-0 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600",children:(0,f.jsxs)("ul",{className:"text-xs text-gray-700 dark:text-gray-400","aria-labelledby":"dropdownLargeButton",children:[(0,f.jsxs)("li",{onClick:function(){o("Elipbiy boyunca"),C()},className:"cursor-pointer flex items-center hover:bg-gray-100",children:[(0,f.jsx)("p",{className:"Elipbiy boyunca"===r?"text-red-500 block py-1 pl-4 text-md":"text-md block py-1 pl-4",children:"Elipbiy boyunca"}),"Elipbiy boyunca"===r&&(0,f.jsx)(i.jbV,{className:"text-red-500"})]}),(0,f.jsxs)("li",{onClick:function(){o("Basda arzanladyslar"),C()},className:"cursor-pointer flex items-center hover:bg-gray-100",children:[(0,f.jsx)("p",{className:"Basda arzanladyslar"===r?"text-red-500 block py-1 pl-4 text-md":"text-md block py-1 pl-4",children:"Basda arzanladyslar"}),"Basda arzanladyslar"===r&&(0,f.jsx)(i.jbV,{className:"text-red-500"})]}),(0,f.jsxs)("li",{onClick:function(){o("Meshurlar"),C()},className:"cursor-pointer flex items-center hover:bg-gray-100",children:[(0,f.jsx)("p",{className:"Meshurlar"===r?"text-red-500 block py-1 pl-4 text-md":"text-md block py-1 pl-4",children:"Meshurlar"}),"Meshurlar"===r&&(0,f.jsx)(i.jbV,{className:"text-red-500"})]})]})})]}),(0,f.jsxs)("div",{className:"relative ml-1",children:[(0,f.jsxs)("div",{onClick:function(){return U()},className:"hover:bg-gray-300 transition delay-200 flex items-center px-3 py-1 border-2 text-sm cursor-pointer",children:[(0,f.jsx)("p",{children:S}),(0,f.jsx)(l.iUH,{})]}),N&&(0,f.jsx)("div",{className:"absolute z-10 w-16 right-0 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600",children:(0,f.jsxs)("ul",{className:"text-xs text-gray-700 dark:text-gray-400","aria-labelledby":"dropdownLargeButton",children:[(0,f.jsxs)("li",{onClick:function(){E(40),U()},className:"cursor-pointer flex w-full items-center hover:bg-gray-100",children:[(0,f.jsx)("p",{className:40===S?"text-red-500 block py-1 pl-4 text-md":"text-md block py-1 pl-4",children:"40"}),40===S&&(0,f.jsx)(i.jbV,{className:"ml-1 text-red-500"})]}),(0,f.jsxs)("li",{onClick:function(){E(60),U()},className:"cursor-pointer flex w-full items-center hover:bg-gray-100",children:[(0,f.jsx)("p",{className:60===S?"cursor-pointer text-red-500 block py-1 pl-4 text-md":"text-md cursor-pointer block py-1 pl-4",children:"60"}),60===S&&(0,f.jsx)(i.jbV,{className:"ml-1 text-red-500"})]}),(0,f.jsxs)("li",{onClick:function(){E(80),U()},className:"cursor-pointer flex w-full items-center hover:bg-gray-100",children:[(0,f.jsx)("p",{className:80===S?"text-red-500 block py-1 pl-4 text-md":"text-md block py-1 pl-4",children:"80"}),80===S&&(0,f.jsx)(i.jbV,{className:"ml-1 text-red-500"})]}),(0,f.jsxs)("li",{onClick:function(){E(100),U()},className:"cursor-pointer flex w-full items-center hover:bg-gray-100",children:[(0,f.jsx)("p",{className:100===S?"text-red-500 block py-1 pl-4 text-md":"text-md block py-1 pl-4",children:"100"}),100===S&&(0,f.jsx)(i.jbV,{className:"ml-1 text-red-500"})]})]})})]})]})]}),B&&0===B.length&&(0,f.jsxs)("div",{className:"flex justify-center aling-center items-center flex-col w-full my-20",children:[(0,f.jsx)(x.dVI,{className:"text-4xl text-red-500"}),(0,f.jsx)("p",{className:"font-bold text-xl",children:"Haryt tapylmady"})]}),(0,f.jsx)("div",{className:"w-full grid grid-cols-2 grid-gap-2 sm:grid-cols-3 sm:grid-gap-3 md:grid-cols-2 md:grid-gap-2 lg:grid-cols-3 lg:grid-gap-3 xl:grid-cols-4 xl:grid-gap-4",children:B&&B.map((function(e){return(0,f.jsx)(u.Z,{e:e})}))})]})}}}]);
//# sourceMappingURL=285.2d8b4224.chunk.js.map