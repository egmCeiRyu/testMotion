(()=>{

"use strict";

var t={

91(t,e,n){

n.d(e,{A:()=>c});

var o=n(645),
    r=n.n(o),
    a=n(278),
    i=n.n(a)()(r());

i.push([
t.id,

`/* Style for "Tap To Place Model" text overlay */

.over {
  z-index: 10;
  pointer-events: none;
  position:absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  text-align: center;
  color: white;
  font-family: 'Nunito', monospace;
  text-shadow: 0px 0px 5px black;
}

#promptText {
  font-size: 2em;
  bottom: 12vh;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}

`,
""
]);

const c=i;

},

278(t){

t.exports=function(t){

var e=[];

return e.toString=function(){

return this.map(function(e){

var n="",
o=void 0!==e[5];

return e[4] &&
(n+="@supports (".concat(e[4],") {")),

e[2] &&
(n+="@media ".concat(e[2]," {")),

o &&
(n+="@layer".concat(
e[5].length>0?" ".concat(e[5]):"",
" {"
)),

n+=t(e),

o && (n+="}"),
e[2] && (n+="}"),
e[4] && (n+="}"),

n;

}).join("");

},

e.i=function(t,n,o,r,a){

"string"==typeof t &&
(t=[[null,t,void 0]]);

var i={};

if(o){

for(var c=0;c<this.length;c++){

var s=this[c][0];

null!=s &&
(i[s]=!0);

}

}

for(var d=0;d<t.length;d++){

var l=[].concat(t[d]);

o && i[l[0]] ||

(

void 0!==a &&
(
void 0===l[5] ||

(
l[1]="@layer".concat(
l[5].length>0?" ".concat(l[5]):"",
" {"
).concat(l[1],"}")
),

l[5]=a
),

n &&
(
l[2] ?

(
l[1]="@media ".concat(
l[2],
" {"
).concat(l[1],"}"),

l[2]=n

)

:

l[2]=n
),

r &&
(
l[4] ?

(
l[1]="@supports (".concat(
l[4],
") {"
).concat(l[1],"}"),

l[4]=r
)

:

l[4]="".concat(r)
),

e.push(l)

);

}

},

e

}

},

645(t){

t.exports=function(t){
return t[1]
}

}

},

e={};

function n(o){

var r=e[o];

if(void 0!==r)
return r.exports;

var a=e[o]={
id:o,
exports:{}
};

return t[o](
a,
a.exports,
n
),

a.exports;

}

n.n=t=>{

var e=t&&t.__esModule?

()=>t.default

:

()=>t;

return n.d(e,{a:e}),
e;

};

n.d=(t,e)=>{

for(var o in e)

n.o(e,o) &&
!n.o(t,o) &&

Object.defineProperty(
t,
o,
{
enumerable:!0,
get:e[o]
}
);

};

n.o=(t,e)=>
Object.prototype.hasOwnProperty.call(t,e);

n.nc=void 0;

var h={

init:function(){

var t=document.getElementById("ground"),
e=document.getElementById("model"),
n=document.getElementById("promptText"),

o=document.createElement("div");

o.innerHTML=`

<div style="
  position:fixed;
  bottom:24px;
  left:50%;
  transform:translateX(-50%);
  z-index:999;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:10px;
  pointer-events:auto;
">

  <div id="scaleLabel" style="
    color:white;
    font-size:20px;
    font-family:Arial;
    font-weight:bold;
    text-shadow:0 0 6px black;
  ">
    Size: 100%
  </div>

  <div id="colorMenu" style="
    display:flex;
    gap:10px;
    padding:10px 14px;
    background:rgba(0,0,0,0.35);
    border-radius:36px;
    backdrop-filter:blur(8px);
  ">

    <button data-color="#d9d2c3"
    style="width:46px;height:46px;border-radius:50%;border:3px solid white;background:#d9d2c3;"></button>

    <button data-color="#bfa58a"
    style="width:46px;height:46px;border-radius:50%;border:3px solid white;background:#bfa58a;"></button>

    <button data-color="#8b6f5a"
    style="width:46px;height:46px;border-radius:50%;border:3px solid white;background:#8b6f5a;"></button>

    <button data-color="#5c4435"
    style="width:46px;height:46px;border-radius:50%;border:3px solid white;background:#5c4435;"></button>

    <button data-color="#2f241d"
    style="width:46px;height:46px;border-radius:50%;border:3px solid white;background:#2f241d;"></button>

  </div>

</div>

`;

document.body.appendChild(o);

var r=
document.getElementById(
"scaleLabel"
);

t.addEventListener(
"click",

function(t){

n.style.display="none";

var o=
t.detail.intersection.point;

e.setAttribute(
"visible",
"true"
);

e.setAttribute(
"position",
"".concat(
o.x,
" ",
o.y,
" ",
o.z
)
);

}

);

document
.querySelectorAll(
"#colorMenu button"
)

.forEach(function(t){

t.addEventListener(
"click",

function(){

var n=
t.dataset.color;

e.object3D.traverse(
function(t){

t.isMesh &&
t.material &&
t.material.name==="wall_mat" &&
(
  t.material=t.material.clone(),
  t.material.color.set(n)
);

}

);

}

);

});

setInterval(function(){

if(e.object3D){

var t=
e.object3D.scale.x,

n=Math.round(t*1000);

r.innerText=
"Size: ".concat(
n,
"%"
);

}

},120);

}

};

AFRAME.registerComponent(
"tap-place",
h
);

})();