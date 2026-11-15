/* ============================================
   وادي التراجمة - ملف المنطق الرئيسي
   ============================================ */
(function(){
"use strict";

/* ===== الثوابت ===== */
var KEY = "wadi_data_v2";
var TK = "wadi_theme";
var POS = ["حارس مرمى","مدافع","وسط","مهاجم"];

var TITLES = {
  home:"الرئيسية",matches:"المباريات",squad:"الفريق",news:"الأخبار",
  honors:"سجل الشرف",board:"الإدارة",about:"عن النادي",contact:"تواصل",
  standings:"جدول الترتيب",gallery:"معرض الصور"
};

var NAV = [
  ["home","🏠","الرئيسية"],
  ["matches","⚽","المباريات"],
  ["squad","👥","الفريق"],
  ["standings","📊","جدول الترتيب"],
  ["news","📰","الأخبار"],
  ["gallery","📸","معرض الصور"],
  ["honors","🏅","سجل الشرف"],
  ["board","🧑‍💼","الإدارة"],
  ["about","📖","عن النادي"],
  ["contact","✉","تواصل معنا"]
];

var SOC = {
  fb:{n:"Facebook",icon:'<svg viewBox="0 0 24 24"><path fill="currentColor" d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.5-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.47H15.2c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12z"/></svg>'},
  wa:{n:"WhatsApp",icon:'<svg viewBox="0 0 24 24"><path fill="currentColor" d="M20.52 3.48A11.93 11.93 0 0 0 12.06 0C5.5 0 .2 5.3.2 11.86c0 2.09.55 4.13 1.6 5.93L0 24l6.38-1.67a11.87 11.87 0 0 0 5.67 1.44h.01c6.56 0 11.86-5.3 11.86-11.86 0-3.16-1.23-6.14-3.47-8.38zM12.06 21.3h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.79.99 1.01-3.7-.23-.38a9.86 9.86 0 0 1-1.52-5.24c0-5.45 4.44-9.88 9.9-9.88a9.86 9.86 0 0 1 9.88 9.89c0 5.45-4.44 9.89-9.88 9.89zm5.43-7.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07a8.13 8.13 0 0 1-2.39-1.47 8.96 8.96 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.07 4.48.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"/></svg>'},
  yt:{n:"YouTube",icon:'<svg viewBox="0 0 24 24"><path fill="currentColor" d="M23.5 6.2a3 3 0 0 0-2.12-2.12C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.58A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.12 2.12C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.58a3 3 0 0 0 2.12-2.12A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.6 15.6V8.4l6.24 3.6-6.24 3.6z"/></svg>'},
  ig:{n:"Instagram",icon:'<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.4 2.22.07 1.28.08 1.65.08 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.22.4-1.28.07-1.65.08-4.85.08s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.73 3.73 0 0 1-1.38-.9 3.73 3.73 0 0 1-.9-1.38c-.16-.42-.36-1.06-.4-2.22-.07-1.28-.08-1.65-.08-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.22-.4 1.28-.07 1.65-.08 4.85-.08M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.34 4.14.63a5.88 5.88 0 0 0-2.13 1.38A5.88 5.88 0 0 0 .63 4.14c-.3.76-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.27 2.15.56 2.91.3.79.7 1.46 1.38 2.13.67.68 1.34 1.08 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.27 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.27-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>'},
  tt:{n:"TikTok",icon:'<svg viewBox="0 0 24 24"><path fill="currentColor" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.42a8.16 8.16 0 0 0 4.77 1.52V6.5a4.85 4.85 0 0 1-1.84-.81z"/></svg>'}
};

/* ===== البيانات الأولية ===== */
var SEED = {
  settings:{
    name:"وادي التراجمة",region:"ريفي رفاعة",motto:"من قلب الوادي.. نلعب باسم الديار",
    address:"منطقة التراجمة — ريفي رفاعة، السودان",
    phone:"+249 912 000 000",email:"info@wadi-tarajma.sd",
    about:"نادي وادي التراجمة ريفي رفاعة ممثل منطقة التراجمة في منافسات اتحاد رفاعة المحلي لكرة القدم ضمن دوري الدرجة الثانية. يخوض الفريق مبارياته الرسمية على ميدان الوادي، ويحتضن ميدان الهاشماب تدريباته اليومية وإعدادَه البدني والفني.",
    f1:{name:"ميدان الوادي",map:"https://maps.app.goo.gl/5omSxgEUMPaeguno7"},
    f2:{name:"ميدان الهاشماب",map:"https://maps.app.goo.gl/NQ5eu8AeUwTmhckv6?g_st=ac"},
    social:{fb:"",wa:"",yt:"",ig:"",tt:""}
  },
  players:[
    {id:1,name:"أحمد الطيب",num:1,age:26,pos:"حارس مرمى",goals:0,assists:0,clean:3,apps:5,photo:""},
    {id:2,name:"محمد عثمان",num:2,age:23,pos:"مدافع",goals:0,assists:1,clean:0,apps:5,photo:""},
    {id:3,name:"عمر عبد الله",num:3,age:25,pos:"مدافع",goals:1,assists:0,clean:0,apps:5,photo:""},
    {id:4,name:"خالد إبراهيم",num:6,age:27,pos:"مدافع",goals:0,assists:2,clean:0,apps:4,photo:""},
    {id:5,name:"يوسف حسن",num:15,age:22,pos:"مدافع",goals:0,assists:0,clean:0,apps:5,photo:""},
    {id:6,name:"معاذ آدم",num:17,age:24,pos:"وسط",goals:2,assists:3,clean:0,apps:5,photo:""},
    {id:7,name:"النور محمد",num:12,age:21,pos:"وسط",goals:1,assists:2,clean:0,apps:5,photo:""},
    {id:8,name:"طارق سليمان",num:7,age:23,pos:"وسط",goals:0,assists:4,clean:0,apps:5,photo:""},
    {id:9,name:"صهيب علي",num:10,age:25,pos:"وسط",goals:3,assists:2,clean:0,apps:5,photo:""},
    {id:10,name:"مصعب أحمد",num:9,age:26,pos:"مهاجم",goals:4,assists:1,clean:0,apps:5,photo:""},
    {id:11,name:"أنس يحيى",num:11,age:22,pos:"مهاجم",goals:2,assists:2,clean:0,apps:5,photo:""},
    {id:12,name:"عوض الكريم",num:18,age:24,pos:"مهاجم",goals:1,assists:0,clean:0,apps:4,photo:""}
  ],
  matches:[
    {id:1,opponent:"الهلال رفاعة",date:"2026-11-21T15:30",venue:"ميدان الوادي",comp:"دوري الدرجة الثانية",home:true,status:"upcoming",my:0,op:0,img:""},
    {id:2,opponent:"المريخ رفاعة",date:"2026-11-28T15:00",venue:"ميدان الهاشماب",comp:"دوري الدرجة الثانية",home:true,status:"upcoming",my:0,op:0,img:""},
    {id:3,opponent:"الأمل رفاعة",date:"2026-11-07T15:30",venue:"ميدان الوادي",comp:"دوري الدرجة الثانية",home:true,status:"finished",my:2,op:1,img:""},
    {id:4,opponent:"النيل رفاعة",date:"2026-10-31T15:00",venue:"استاد رفاعة",comp:"دوري الدرجة الثانية",home:false,status:"finished",my:1,op:1,img:""},
    {id:5,opponent:"الشباب رفاعة",date:"2026-10-24T15:30",venue:"ميدان الوادي",comp:"دوري الدرجة الثانية",home:true,status:"finished",my:3,op:0,img:""}
  ],
  news:[
    {id:1,title:"الفريق يكتسح الشباب رفاعة بثلاثية ويعتلي وصافة الترتيب",date:"2026-10-24",img:"",ex:"قدّم نسور التراجمة واحدة من أفضل مبارياتهم الموسم الحالي، فحسموا اللقاء بثلاثة أهداف نظيفة على ميدان الوادي وسط حضور جماهيري كبير."},
    {id:2,title:"تحضيرات متواصلة على ميدان الهاشماب قبل مواجهة الهلال",date:"2026-11-12",img:"",ex:"يواصل الجهاز الفني رفع النسق البدني والفني استعدادًا لقمة الجولة القادمة، مع تركيز خاص على الكرات الثابتة والتحولات."},
    {id:3,title:"الإدارة تدعو الجماهير لمؤازرة الفريق في القمة",date:"2026-11-10",img:"",ex:"وجّهت إدارة النادي دعوة لجماهير التراجمة للحضور المبكر ومساندة الفريق في مباراته المقبلة على ميدان الوادي."}
  ],
  honors:[],
  board:[],
  standings:[
    {team:"الهلال رفاعة",p:5,w:4,d:1,l:0,gf:12,ga:3,pts:13},
    {team:"وادي التراجمة",p:5,w:3,d:1,l:1,gf:8,ga:4,pts:10},
    {team:"المريخ رفاعة",p:5,w:3,d:1,l:1,gf:7,ga:5,pts:10},
    {team:"الأمل رفاعة",p:5,w:2,d:2,l:1,gf:6,ga:5,pts:8},
    {team:"النيل رفاعة",p:5,w:2,d:1,l:2,gf:5,ga:6,pts:7},
    {team:"الشباب رفاعة",p:5,w:0,d:1,l:4,gf:2,ga:10,pts:1}
  ],
  gallery:[
    {id:1,src:"",cap:"تدريب على ميدان الهاشماب"},
    {id:2,src:"",cap:"لحظات من مباراة الشباب"}
  ],
  timeline:[
    {yr:"2019",t:"التأسيس",d:"انطلق النادي من منطقة التراجمة بمبادرة من شباب المنطقة ليجمعهم تحت راية واحدة."},
    {yr:"2022",t:"الانضمام لاتحاد رفاعة",d:"سُجّل النادي رسميًا ضمن أندية الاتحاد المحلي وبدأ مشواره في الدرجات التمهيدية."},
    {yr:"2025",t:"الصعود للدرجة الثانية",d:"توّج الفريق مشواره التمهيدي بالصعود إلى دوري الدرجة الثانية عن جدارة."},
    {yr:"2026",t:"موسم المنافسة",d:"ينافس الفريق هذا الموسم على بطاقات الصعود بين ميدان الوادي وميدان الهاشماب."}
  ],
  messages:[]
};

/* ===== المتغيرات العامة ===== */
var C = clone(SEED);
var cdT = null;
var cur = "home";
var chromeBound = false;
var mtab = "u";
var posF = "all";
var Q = {m:"",p:"",n:"",st:"",gal:""};

/* ===== دوال مساعدة ===== */
function $(s){return document.querySelector(s)}
function $$(s){return Array.prototype.slice.call(document.querySelectorAll(s))}
function clone(o){return JSON.parse(JSON.stringify(o))}
function esc(s){return String(s||"").replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}

function merge(a,b){
  if(b==null)return a;
  if(Array.isArray(a)||Array.isArray(b))return b;
  if(typeof a==="object"&&typeof b==="object"){
    var o={};
    for(var k in a)o[k]=a[k];
    for(var k2 in b)o[k2]=(k2 in a)?merge(a[k2],b[k2]):b[k2];
    return o;
  }
  return b;
}

function load(){
  try{
    var r = localStorage.getItem(KEY);
    C = r ? merge(clone(SEED),JSON.parse(r)) : clone(SEED);
  }catch(e){C=clone(SEED)}
  ["players","matches","news","honors","board","timeline","messages","standings","gallery"].forEach(function(k){
    if(!Array.isArray(C[k]))C[k]=[];
  });
  C.settings = merge(clone(SEED.settings),C.settings||{});
  if(!C.settings.social)C.settings.social={fb:"",wa:"",yt:"",ig:"",tt:""};
}

function save(){try{localStorage.setItem(KEY,JSON.stringify(C))}catch(e){}}

function toast(m){
  var t = $("#toast");
  if(!t)return;
  t.textContent = m;
  t.classList.add("on");
  clearTimeout(t._x);
  t._x = setTimeout(function(){t.classList.remove("on")},3000);
}

/* ===== شعار النادي ===== */
function crest(w){
  return '<svg viewBox="0 0 64 74" width="'+w+'" aria-hidden="true"><defs><linearGradient id="g'+w+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#123024"/><stop offset="1" stop-color="#050d0a"/></linearGradient></defs><path d="M32 2 60 12v27c0 16-12 27-28 33C16 66 4 55 4 39V12Z" fill="url(#g'+w+')" stroke="#f2b84b" stroke-width="2.6"/><path d="M4 24h56" stroke="#2e5bff" stroke-width="2.2" opacity=".85"/><circle cx="32" cy="17" r="6.4" fill="#f2b84b"/><path d="M9 40c6-5 12 5 23 0s17 5 23 0" stroke="#f4f1e8" stroke-width="2.6" fill="none"/><path d="M9 49c6-5 12 5 23 0s17 5 23 0" stroke="#7c9bff" stroke-width="1.9" fill="none" opacity=".85"/><text x="32" y="63" text-anchor="middle" font-size="7" font-family="Changa" font-weight="700" fill="#f2b84b">التراجمة</text></svg>';
}

/* ===== دوال التاريخ ===== */
var fD = function(d){return new Date(d).toLocaleDateString("ar",{weekday:"long",day:"numeric",month:"long"})};
var fDs = function(d){return new Date(d).toLocaleDateString("ar",{day:"numeric",month:"long",year:"numeric"})};
var fT = function(d){return new Date(d).toLocaleTimeString("ar",{hour:"2-digit",minute:"2-digit"})};
var dN = function(d){return new Date(d).getDate()};
var dM = function(d){return new Date(d).toLocaleDateString("ar",{month:"short"})};

var nextM = function(){
  return C.matches.filter(function(m){return m.status==="upcoming"&&new Date(m.date)>new Date()})
    .sort(function(a,b){return new Date(a.date)-new Date(b.date)})[0];
};

/* ===== الثيم ===== */
function setTheme(t){
  document.documentElement.setAttribute("data-theme",t);
  try{localStorage.setItem(TK,t)}catch(e){}
  var m = document.querySelector('meta[name="theme-color"]');
  if(m)m.setAttribute("content",t==="dark"?"#050d0a":"#ffffff");
}

/* ===== وسائل التواصل ===== */
function socialHTML(){
  var s = C.settings.social||{}, out=[];
  ["fb","wa","yt","ig","tt"].forEach(function(k){
    if(s[k])out.push('<a class="soc-a" href="'+esc(s[k])+'" target="_blank" rel="noopener" aria-label="'+SOC[k].n+'">'+SOC[k].icon+'<span>'+SOC[k].n+'</span></a>');
  });
  return out.length?'<div class="soc">'+out.join("")+'</div>':"";
}

/* ===== دوال البناء ===== */
function phero(wm,t,s){
  return '<section class="phero" data-wm="'+wm+'"><div class="wrap"><span class="kick">'+wm+'</span><h1>'+t+'</h1><p>'+s+'</p><div class="rule"></div></div></section>';
}

function emptyState(i,t,d){
  return '<div class="empty"><i>'+i+'</i><h3>'+t+'</h3><p>'+d+'</p></div>';
}

function searchbar(id,ph){
  return '<div class="searchbar" id="sb_'+id+'"><span class="s-ico">🔍</span><input id="sq_'+id+'" placeholder="'+ph+'" autocomplete="off"><button class="s-clear" id="sc_'+id+'" type="button" aria-label="مسح">✕</button><span class="s-count" id="sn_'+id+'"></span></div>';
}

function bindSearch(id,set,rerender){
  var inp = $("#sq_"+id), clr = $("#sc_"+id), bar = $("#sb_"+id);
  inp.oninput = function(){set(inp.value);bar.classList.toggle("has",!!inp.value);rerender()};
  clr.onclick = function(){inp.value="";set("");bar.classList.remove("has");rerender();inp.focus()};
}

/* ===== لوحة المباراة القادمة ===== */
function boardHTML(){
  var m = nextM();
  if(!m)return '<div class="bhead"><b><i></i> '+esc(C.settings.name)+'</b><span>اتحاد رفاعة</span></div><div style="text-align:center;padding:10px 0">'+crest(80)+'<p style="color:rgba(244,241,232,.7);font-size:.88rem;margin-top:8px">لم تُجدول مباراة قادمة بعد.</p></div>';
  return '<div class="bhead"><b><i></i> المباراة القادمة</b><span>'+esc(m.comp||"")+'</span></div>'+
    '<div class="vs"><div>'+crest(50)+'<span class="nm">'+esc(C.settings.name)+'</span><small>'+(m.home?"مستضيف":"")+'</small></div><strong>VS</strong><div><div class="opc">'+esc((m.opponent||"؟").charAt(0))+'</div><span class="nm">'+esc(m.opponent)+'</span><small>'+(m.home?"ضيف":"مستضيف")+'</small></div></div>'+
    '<div class="bmeta"><span>📅 '+fD(m.date)+'</span><span>⏰ '+fT(m.date)+'</span><span>📍 '+esc(m.venue)+'</span></div>'+
    '<div class="cd"><div><b id="cD">--</b><span>يوم</span></div><div><b id="cH">--</b><span>ساعة</span></div><div><b id="cM">--</b><span>دقيقة</span></div><div><b id="cS">--</b><span>ثانية</span></div></div>'+
    '<a class="btn full" href="#/matches" data-nav="matches">جميع المباريات</a>';
}

function startCD(){
  clearInterval(cdT);
  var tick = function(){
    var n = nextM();
    var el = $("#cD");
    if(!n||!el)return;
    var s = Math.max(0,Math.floor((new Date(n.date)-Date.now())/1000));
    el.textContent = Math.floor(s/86400);
    $("#cH").textContent = ("0"+Math.floor(s%86400/3600)).slice(-2);
    $("#cM").textContent = ("0"+Math.floor(s%3600/60)).slice(-2);
    $("#cS").textContent = ("0"+(s%60)).slice(-2);
  };
  tick();
  cdT = setInterval(tick,1000);
}

/* ===== دوال بناء البطاقات ===== */
function matchCard(m){
  var fin = m.status==="finished", w = m.my>m.op, d = m.my===m.op;
  return '<article class="match card"><div class="mdate"><b>'+dN(m.date)+'</b><small>'+dM(m.date)+'</small></div>'+
    '<div class="minfo"><b>'+(m.home?(fin?"أمام":"يستضيف"):(fin?"ضد":"يحل ضيفًا على"))+' '+esc(m.opponent)+'</b><em>'+esc(m.comp||"")+'</em><small>📍 '+esc(m.venue)+(fin?"":" • ⏰ "+fT(m.date))+'</small></div>'+
    (m.img?'<div class="mphoto" data-img="'+esc(m.img)+'" data-t="'+esc(m.opponent)+'"><img src="'+esc(m.img)+'" loading="lazy" alt=""></div>':"")+
    (fin?'<div class="score">'+(m.home?m.my+" – "+m.op:m.op+" – "+m.my)+'</div><div class="mtags">'+(w?'<span class="tag w">فوز</span>':d?'<span class="tag d">تعادل</span>':'<span class="tag l">خسارة</span>')+'</div>'
    :'<div class="mtags"><span class="tag g">'+fD(m.date)+'</span><span class="tag u">قادمة</span></div>')+'</article>';
}

function newsCard(n){
  return '<article class="ncard card">'+(n.img?'<div class="nph" data-img="'+esc(n.img)+'" data-t="'+esc(n.title)+'"><img src="'+esc(n.img)+'" loading="lazy" alt=""></div>':"")+'<div class="nbd"><time>'+fDs(n.date)+'</time><h3>'+esc(n.title)+'</h3><p>'+esc(n.ex)+'</p></div></article>';
}

function playerCard(x){
  return '<article class="player card"><div class="pph"'+(x.photo?' data-img="'+esc(x.photo)+'" data-t="'+esc(x.name)+'"':"")+'>'+(x.photo?'<img src="'+esc(x.photo)+'" alt="'+esc(x.name)+'" loading="lazy">':'<span>'+esc(x.num)+'</span>')+'</div><div class="pbd"><b>'+esc(x.name)+'</b><div><span class="pos">'+esc(x.pos)+'</span>'+(x.age?'<span>'+esc(x.age)+' سنة</span>':"")+'<span>#'+esc(x.num)+'</span></div></div></article>';
}

function honorCard(h){
  return '<article class="hcard card"><span class="hi">'+(h.kind==="club"?"🏆":"🏅")+'</span>'+(h.season?'<span class="hs">'+esc(h.season)+'</span>':"")+'<b>'+esc(h.title)+'</b>'+
    (h.holder?'<span class="hh">'+esc(h.holder)+(h.role?" — "+esc(h.role):"")+'</span>':"")+(h.note?'<p>'+esc(h.note)+'</p>':"")+'</article>';
}

function memberCard(b){
  var ini = (b.name||"؟").trim().charAt(0);
  return '<article class="bcard card"><div class="bph">'+(b.photo?'<img src="'+esc(b.photo)+'" alt="'+esc(b.name)+'" loading="lazy">':esc(ini))+'</div><b>'+esc(b.name)+'</b><span class="role">'+esc(b.role)+'</span>'+
    (b.phone?'<a class="tel" href="tel:'+esc(b.phone)+'">📞 '+esc(b.phone)+'</a>':"")+'</article>';
}

function galItem(g){
  if(!g.src)return '<div class="gal-item gal-empty">📷</div>';
  return '<div class="gal-item" data-img="'+esc(g.src)+'" data-t="'+esc(g.cap||"")+'"><img src="'+esc(g.src)+'" loading="lazy" alt="'+esc(g.cap||"")+'">'+(g.cap?'<span class="gal-cap">'+esc(g.cap)+'</span>':"")+'</div>';
}

function fieldsHTML(){
  return '<div class="fields-mini"><span class="mini-lbl">📍 مواقع الميدانين على الخريطة</span><div class="fbtns"><a class="fbtn" href="'+esc(C.settings.f1.map)+'" target="_blank" rel="noopener">🏟️ '+esc(C.settings.f1.name)+' <em>↗</em></a><a class="fbtn" href="'+esc(C.settings.f2.map)+'" target="_blank" rel="noopener">🥅 '+esc(C.settings.f2.name)+' <em>↗</em></a></div></div>';
}

/* ===== إحصائيات الفريق ===== */
function teamStats(){
  var w=0,d=0,l=0,gf=0,ga=0;
  C.matches.filter(function(m){return m.status==="finished"}).forEach(function(m){
    gf+=m.my;ga+=m.op;
    if(m.my>m.op)w++;else if(m.my===m.op)d++;else l++;
  });
  var topScorer = clone(C.players).sort(function(a,b){return (b.goals||0)-(a.goals||0)})[0];
  var topAssist = clone(C.players).sort(function(a,b){return (b.assists||0)-(a.assists||0)})[0];
  return {w:w,d:d,l:l,gf:gf,ga:ga,p:w+d+l,topScorer:topScorer,topAssist:topAssist};
}

function getMyPosition(){
  var sorted = clone(C.standings).sort(function(a,b){
    if(b.pts!==a.pts)return b.pts-a.pts;
    return (b.gf-b.ga)-(a.gf-a.ga);
  });
  for(var i=0;i<sorted.length;i++){
    if(sorted[i].team===C.settings.name)return i+1;
  }
  return 0;
}

function statsHTML(){
  var s = teamStats();
  var pos = getMyPosition();
  var html = '<div class="stats-grid">'+
    '<div class="stat-card"><div class="stat-val">'+(pos||"—")+'</div><div class="stat-lbl">الترتيب الحالي</div></div>'+
    '<div class="stat-card"><div class="stat-val">'+s.p+'</div><div class="stat-lbl">مباريات</div></div>'+
    '<div class="stat-card"><div class="stat-val">'+s.w+'</div><div class="stat-lbl">فوز</div></div>'+
    '<div class="stat-card"><div class="stat-val">'+s.d+'</div><div class="stat-lbl">تعادل</div></div>'+
    '<div class="stat-card"><div class="stat-val">'+s.l+'</div><div class="stat-lbl">خسارة</div></div>'+
    '<div class="stat-card"><div class="stat-val">'+s.gf+'</div><div class="stat-lbl">أهداف مسجلة</div></div>'+
    '<div class="stat-card"><div class="stat-val">'+s.ga+'</div><div class="stat-lbl">أهداف مستقبلة</div></div>';
  if(s.topScorer&&s.topScorer.goals>0){
    html += '<div class="stat-card"><div class="stat-val">'+s.topScorer.goals+'</div><div class="stat-lbl">الهداف — '+esc(s.topScorer.name)+'</div></div>';
  }
  if(s.topAssist&&s.topAssist.assists>0){
    html += '<div class="stat-card"><div class="stat-val">'+s.topAssist.assists+'</div><div class="stat-lbl">صانع الألعاب — '+esc(s.topAssist.name)+'</div></div>';
  }
  html += '</div>';
  return html;
}

/* ===== الصفحات ===== */
var VIEWS = {
  home:function(){
    var up = C.matches.filter(function(m){return m.status==="upcoming"}).sort(function(a,b){return new Date(a.date)-new Date(b.date)});
    var nw = C.news.slice().sort(function(a,b){return new Date(b.date)-new Date(a.date)}).slice(0,3);
    return '<section class="hero"><div class="hero-mark">التراجمة</div>'+
      '<div class="wrap hero-grid"><div><span class="badge"><i></i> اتحاد رفاعة المحلي • دوري الدرجة الثانية</span>'+
      '<h1>نادي وادي <em>التراجمة</em><span>'+esc(C.settings.region)+'</span></h1>'+
      '<p class="lead">«'+esc(C.settings.motto)+'» — هنا نحفظ مباريات الفريق ولحظاته ونتائجه وأخباره للذكريات.</p>'+
      '<div class="hero-cta"><a class="btn" href="#/matches" data-nav="matches">⚽ المباريات</a><a class="btn on-dark" href="#/standings" data-nav="standings">📊 الترتيب</a></div>'+
      '</div><div class="board">'+boardHTML()+'</div></div></section>'+
      '<section class="sec"><div class="wrap">'+statsHTML()+'</div></section>'+
      '<section class="sec alt"><div class="wrap"><div class="qcards">'+
      '<a class="qcard" href="#/matches" data-nav="matches"><span class="q-ico">⚽</span><div><b>المباريات</b><small>القادمة والنتائج واللحظات</small></div><span class="q-num">'+C.matches.length+'</span></a>'+
      '<a class="qcard" href="#/squad" data-nav="squad"><span class="q-ico">👥</span><div><b>الفريق</b><small>اللاعبون والخانات</small></div><span class="q-num">'+C.players.length+'</span></a>'+
      '<a class="qcard" href="#/standings" data-nav="standings"><span class="q-ico">📊</span><div><b>جدول الترتيب</b><small>موقع الفريق في الدوري</small></div><span class="q-num">'+(getMyPosition()||"—")+'</span></a>'+
      '<a class="qcard" href="#/news" data-nav="news"><span class="q-ico">📰</span><div><b>الأخبار</b><small>أرشيف المستجدات</small></div><span class="q-num">'+C.news.length+'</span></a>'+
      '<a class="qcard" href="#/gallery" data-nav="gallery"><span class="q-ico">📸</span><div><b>معرض الصور</b><small>لحظات من الوادي</small></div><span class="q-num">'+C.gallery.length+'</span></a>'+
      '<a class="qcard" href="#/honors" data-nav="honors"><span class="q-ico">🏅</span><div><b>سجل الشرف</b><small>ألقاب وجوائز</small></div><span class="q-num">'+C.honors.length+'</span></a>'+
      '<a class="qcard" href="#/board" data-nav="board"><span class="q-ico">🧑‍💼</span><div><b>الإدارة</b><small>أعضاء النادي</small></div><span class="q-num">'+C.board.length+'</span></a>'+
      '</div></div></section>'+
      '<section class="sec"><div class="wrap"><div class="sec-head"><div><span class="kick">روزنامة</span><h2>المباريات القادمة</h2></div><a class="btn sm ghost" href="#/matches" data-nav="matches">الكل ⬅</a></div>'+
      '<div class="hscroll">'+(up.length?up.slice(0,4).map(matchCard).join(""):'<div class="empty" style="flex:1"><i>📅</i><h3>لا مباريات قادمة</h3></div>')+'</div></div></section>'+
      '<section class="sec alt"><div class="wrap"><div class="sec-head"><div><span class="kick">الذكريات</span><h2>آخر الأخبار</h2></div><a class="btn sm ghost" href="#/news" data-nav="news">الأرشيف ⬅</a></div>'+
      '<div class="news-g">'+(nw.length?nw.map(newsCard).join(""):'<div class="empty"><i>📰</i><h3>لا أخبار بعد</h3></div>')+'</div></div></section>'+
      '<section class="sec"><div class="wrap about-g"><div class="about-c"><span class="kick">الحكاية</span><h2>من قلب الوادي..<br>نلعب باسم التراجمة</h2><p>'+esc(C.settings.about)+'</p><a class="btn" href="#/about" data-nav="about">القصة كاملة</a></div>'+
      '<div class="tline">'+C.timeline.slice(0,3).map(function(t){return '<div class="titem card"><b>'+esc(t.yr)+'</b><h3>'+esc(t.t)+'</h3><p>'+esc(t.d)+'</p></div>'}).join("")+'</div></div></section>'+
      '<section class="sec alt"><div class="wrap">'+fieldsHTML()+
      '<div class="cta-band"><h3>كن جزءًا من القصة</h3><p>سجّل لاعبًا، ادعم النادي، أو تواصل مع الإدارة.</p><a class="btn" href="#/contact" data-nav="contact">تواصل معنا</a></div></div></section>';
  },
  matches:function(){
    return phero("روزنامة الموسم","المباريات <em>والنتائج</em>","كل مباريات الفريق: القادمة، النتائج، ولحظات موثّقة بالصور.")+
      '<section class="sec" style="padding-top:26px"><div class="wrap">'+searchbar("m","ابحث: خصم، ملعب، بطولة…")+
      '<div class="tabs"><button class="on" data-mt="u">القادمة</button><button data-mt="r">النتائج</button></div><div id="mlist"></div></div></section>';
  },
  squad:function(){
    return phero("نسور التراجمة","قائمة <em>الفريق</em>","الاسم • العمر • الخانة • رقم القميص • الصورة.")+
      '<section class="sec" style="padding-top:26px"><div class="wrap">'+searchbar("p","ابحث: اسم لاعب، خانة، رقم…")+
      '<div class="chips" id="pchips"></div><div class="players" id="plist"></div></div></section>';
  },
  news:function(){
    return phero("المركز الإعلامي","أخبار <em>النادي</em>","أرشيف كامل لكل مستجدات الفريق والإدارة — للذكريات.")+
      '<section class="sec" style="padding-top:26px"><div class="wrap">'+searchbar("n","ابحث في الأخبار…")+'<div class="news-g" id="nlist"></div></div></section>';
  },
  honors:function(){
    var club=C.honors.filter(function(h){return h.kind==="club"});
    var ind=C.honors.filter(function(h){return h.kind!=="club"});
    return phero("سجل الشرف","الألقاب <em>والجوائز</em>","بطولات النادي وجوائز لاعبيه وأطقمه حسب الخانة والمنصب.")+
      '<section class="sec" style="padding-top:26px"><div class="wrap">'+
      '<div class="sec-head"><div><span class="kick">🏆 بطولات النادي</span><h2 style="font-size:1.35rem">الألقاب الجماعية</h2></div></div>'+
      (club.length?'<div class="hgrid">'+club.map(honorCard).join("")+'</div>':emptyState("🏆","لا ألقاب جماعية بعد","أضف بطولات وكؤوس النادي من لوحة التحكم ← سجل الشرف."))+
      '<div class="sec-head" style="margin-top:36px"><div><span class="kick">🏅 الجوائز الفردية</span><h2 style="font-size:1.35rem">حسب الخانة والمنصب</h2></div></div>'+
      (ind.length?'<div class="hgrid">'+ind.map(honorCard).join("")+'</div>':emptyState("🏅","لا جوائز فردية بعد","أضف جوائز أفضل حارس / مدافع / وسط / مهاجم / مدرب من لوحة التحكم."))+
      '</div></section>';
  },
  board:function(){
    return phero("القيادة","إدارة النادي <em>وأعضاؤه</em>","الهيئة الإدارية والجهاز الفني والمشرفون على النادي.")+
      '<section class="sec" style="padding-top:26px"><div class="wrap">'+
      (C.board.length?'<div class="bgrid">'+C.board.map(memberCard).join("")+'</div>':emptyState("🧑‍💼","لم تُضف الإدارة بعد","أضف رئيس النادي والأعضاء والمناصب من لوحة التحكم ← الإدارة."))+
      '</div></section>';
  },
  about:function(){
    return phero("الحكاية","عن <em>النادي</em>","من مبادرة شبابية إلى منافس في الدرجة الثانية.")+
      '<section class="sec"><div class="wrap about-g"><div class="about-c"><h2>من قلب الوادي..<br>نلعب باسم التراجمة</h2><p>'+esc(C.settings.about)+'</p>'+
      '<div class="facts card"><h3>بطاقة النادي</h3><div class="frow"><b>الاسم</b><span>نادي '+esc(C.settings.name)+' '+esc(C.settings.region)+'</span></div><div class="frow"><b>الاتحاد</b><span>اتحاد رفاعة المحلي</span></div><div class="frow"><b>الدرجة</b><span>الدرجة الثانية</span></div><div class="frow"><b>الميدانان</b><span>'+esc(C.settings.f1.name)+' • '+esc(C.settings.f2.name)+'</span></div><div class="frow"><b>المقر</b><span>'+esc(C.settings.address)+'</span></div></div>'+socialHTML()+'</div>'+
      '<div class="tline">'+C.timeline.map(function(t){return '<div class="titem card"><b>'+esc(t.yr)+'</b><h3>'+esc(t.t)+'</h3><p>'+esc(t.d)+'</p></div>'}).join("")+'</div></div></section>';
  },
  contact:function(){
    return phero("تواصل","راسل <em>الإدارة</em>","رسالتك تصل مباشرة إلى لوحة التحكم.")+
      '<section class="sec"><div class="wrap contact-g">'+
      '<form class="card form" id="cform"><label>الاسم الكامل<input id="cName" required></label><label>الهاتف / واتساب<input id="cPhone"></label>'+
      '<label>الموضوع<select id="cTopic"><option>تسجيل لاعب</option><option>شأن إداري</option><option>إعلام وتغطية</option><option>دعم ورعاية</option><option>أخرى</option></select></label>'+
      '<label>الرسالة<textarea id="cBody" rows="4" required></textarea></label><button class="btn full" id="cSend">إرسال الرسالة</button></form>'+
      '<div class="card info"><h3>بيانات النادي</h3><ul><li><b>المقر</b><span>'+esc(C.settings.address)+'</span></li><li><b>الهاتف</b><span>'+esc(C.settings.phone||"—")+'</span></li><li><b>البريد</b><span>'+esc(C.settings.email||"—")+'</span></li><li><b>الميدانان</b><span>'+esc(C.settings.f1.name)+' — '+esc(C.settings.f2.name)+'</span></li></ul>'+socialHTML()+'</div></div></section>';
  },
  standings:function(){
    var sorted = clone(C.standings).sort(function(a,b){
      if(b.pts!==a.pts)return b.pts-a.pts;
      return (b.gf-b.ga)-(a.gf-a.ga);
    });
    var rows = sorted.map(function(t,i){
      var my = t.team===C.settings.name;
      return '<tr class="'+(my?"my-team":"")+'"><td class="pos">'+(i+1)+'</td><td class="team-cell">'+esc(t.team)+(my?" ★":"")+'</td><td>'+t.p+'</td><td>'+t.w+'</td><td>'+t.d+'</td><td>'+t.l+'</td><td>'+t.gf+'</td><td>'+t.ga+'</td><td>'+(t.gf-t.ga)+'</td><td><b>'+t.pts+'</b></td></tr>';
    }).join("");
    var myTeam = C.standings.find(function(t){return t.team===C.settings.name})||{};
    var myPos = getMyPosition();
    var gd = myTeam.gf!==undefined ? ((myTeam.gf-myTeam.ga>0?"+":"")+(myTeam.gf-myTeam.ga)) : "—";
    return phero("جدول الترتيب","ترتيب <em>الدرجة الثانية</em>","ترتيب الفرق في دوري الدرجة الثانية لاتحاد رفاعة المحلي.")+
      '<section class="sec" style="padding-top:26px"><div class="wrap">'+
      '<div class="card" style="margin-bottom:18px;padding:16px;background:linear-gradient(135deg,rgba(242,184,75,.08),rgba(46,91,255,.06))">'+
      '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">'+
      '<div><small style="color:var(--muted);font-size:.78rem">موقع الفريق</small><div style="font-family:var(--df);font-size:1.8rem;font-weight:800;color:var(--gold-ink)">'+(myPos||"—")+' <span style="font-size:.6em;color:var(--muted)">/ '+C.standings.length+'</span></div></div>'+
      '<div style="text-align:center"><small style="color:var(--muted);font-size:.78rem">النقاط</small><div style="font-family:var(--df);font-size:1.4rem;font-weight:700">'+(myTeam.pts||0)+'</div></div>'+
      '<div style="text-align:center"><small style="color:var(--muted);font-size:.78rem">فارق الأهداف</small><div style="font-family:var(--df);font-size:1.4rem;font-weight:700;color:var(--green)">'+gd+'</div></div>'+
      '</div></div>'+
      '<div style="overflow-x:auto"><table class="standings-tbl"><thead><tr><th>#</th><th style="text-align:start">الفريق</th><th>لعب</th><th>فوز</th><th>تعادل</th><th>خسارة</th><th>له</th><th>عليه</th><th>+/-</th><th>نقاط</th></tr></thead><tbody>'+rows+'</tbody></table></div>'+
      '<p style="text-align:center;color:var(--muted);font-size:.78rem;margin-top:16px">★ الفريق الحالي — يتم تحديث الترتيب من لوحة التحكم</p>'+
      '</div></section>';
  },
  gallery:function(){
    var items = C.gallery.map(galItem).join("");
    return phero("معرض الصور","لحظات <em>موثّقة</em>","صور من المباريات والتدريبات والمناسبات.")+
      '<section class="sec" style="padding-top:26px"><div class="wrap">'+
      (items?('<div class="gallery-grid">'+items+'</div>'):'<div class="empty"><i>📸</i><h3>لا صور بعد</h3><p>أضف الصور من لوحة التحكم ← معرض الصور.</p></div>')+
      '</div></section>';
  }
};

/* ===== ربط الأحداث ===== */
var BIND = {
  home:function(){startCD()},
  matches:function(){
    var render = function(){
      var list = C.matches.filter(function(m){return mtab==="u"?m.status==="upcoming":m.status==="finished"});
      if(Q.m){var q=Q.m.toLowerCase();list=list.filter(function(m){return ((m.opponent||"")+" "+(m.venue||"")+" "+(m.comp||"")).toLowerCase().indexOf(q)>-1})}
      list.sort(function(a,b){return mtab==="u"?new Date(a.date)-new Date(b.date):new Date(b.date)-new Date(a.date)});
      $("#sn_m").textContent = list.length+" نتيجة";
      $("#mlist").innerHTML = list.length?list.map(matchCard).join(""):'<div class="empty"><i>🔍</i><h3>لا نتائج مطابقة</h3><p>جرّب كلمة بحث أخرى أو بدّل التبويب.</p></div>';
    };
    $$("[data-mt]").forEach(function(b){b.onclick=function(){$$("[data-mt]").forEach(function(x){x.classList.remove("on")});b.classList.add("on");mtab=b.dataset.mt;render()}});
    bindSearch("m",function(v){Q.m=v},render);render();
  },
  squad:function(){
    var chips = function(){
      $("#pchips").innerHTML = ['all'].concat(POS).map(function(p){return '<button class="'+(posF===p?"on":"")+'" data-pos="'+p+'">'+(p==="all"?"الكل":p)+'</button>'}).join("");
      $$("#pchips button").forEach(function(b){b.onclick=function(){posF=b.dataset.pos;chips();render()}});
    };
    var render = function(){
      var list = C.players.filter(function(x){return posF==="all"||x.pos===posF});
      if(Q.p){var q=Q.p.toLowerCase();list=list.filter(function(x){return (x.name+" "+x.pos+" "+x.num).toLowerCase().indexOf(q)>-1})}
      $("#sn_p").textContent = list.length+" لاعب";
      $("#plist").innerHTML = list.length?list.map(playerCard).join(""):'<div class="empty" style="grid-column:1/-1"><i>🔍</i><h3>لا لاعبين مطابقين</h3></div>';
    };
    chips();bindSearch("p",function(v){Q.p=v},render);render();
  },
  news:function(){
    var render = function(){
      var list = C.news.slice().sort(function(a,b){return new Date(b.date)-new Date(a.date)});
      if(Q.n){var q=Q.n.toLowerCase();list=list.filter(function(n){return (n.title+" "+n.ex).toLowerCase().indexOf(q)>-1})}
      $("#sn_n").textContent = list.length+" خبر";
      $("#nlist").innerHTML = list.length?list.map(newsCard).join(""):'<div class="empty"><i>🔍</i><h3>لا أخبار مطابقة</h3></div>';
    };
    bindSearch("n",function(v){Q.n=v},render);render();
  },
  contact:function(){
    var f = $("#cform");
    if(!f)return;
    f.onsubmit = function(e){
      e.preventDefault();
      var b = $("#cSend");
      b.disabled = true;
      b.textContent = "جارٍ الإرسال…";
      var msg = {id:Date.now(),name:$("#cName").value.trim(),phone:$("#cPhone").value.trim(),topic:$("#cTopic").value,body:$("#cBody").value.trim(),created_at:new Date().toISOString(),read:false};
      try{fetch("/api/messages",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(msg)}).catch(function(){})}catch(err){}
      load();C.messages.unshift(msg);try{localStorage.setItem(KEY,JSON.stringify(C))}catch(err){}
      f.reset();toast("✓ وصلت رسالتك للإدارة");b.disabled=false;b.textContent="إرسال الرسالة";
    };
  },
  standings:function(){},
  gallery:function(){}
};

/* ===== عارض الصور ===== */
function openImg(src,t){
  $("#lbImg").src = src;
  $("#lbMeta").innerHTML = '<b>'+esc(t||"")+'</b>';
  $("#lb").classList.add("on");
  document.body.classList.add("lock");
}

function closeLB(){
  $("#lb").classList.remove("on");
  document.body.classList.remove("lock");
}

/* ===== تأثيرات الظهور ===== */
var io = new IntersectionObserver(function(es){
  es.forEach(function(en){
    if(en.isIntersecting){en.target.classList.add("on");io.unobserve(en.target)}
  });
},{threshold:.08});

function reveal(){
  $$(".card,.sec-head,.cta-band,.empty,.phero .wrap,.hero-grid,.qcard,.searchbar,.stat-card").forEach(function(el){
    el.classList.add("rv");io.observe(el);
  });
}

function setActive(v){$$("[data-nav]").forEach(function(a){a.classList.toggle("on",a.dataset.nav===v)})}

function closeDrawer(){
  $("#drawer").classList.remove("on");
  $("#scrim").classList.remove("on");
  $("#burger").classList.remove("on");
  document.body.classList.remove("lock");
}

/* ===== SEO ديناميكي ===== */
function updateMeta(view){
  var map = {
    home:{t:"وادي التراجمة ريفي رفاعة | الموقع الرسمي",d:"الموقع الرسمي لنادي وادي التراجمة - أخبار الفريق ومبارياته ونتائجه"},
    matches:{t:"المباريات والنتائج | وادي التراجمة",d:"جدول مباريات ونتائج نادي وادي التراجمة في دوري الدرجة الثانية لاتحاد رفاعة"},
    squad:{t:"قائمة الفريق | وادي التراجمة",d:"قائمة لاعبي نادي وادي التراجمة - الأسماء والأرقام والخانات"},
    news:{t:"أخبار النادي | وادي التراجمة",d:"آخر أخبار وتحديثات نادي وادي التراجمة ريفي رفاعة"},
    standings:{t:"جدول ترتيب دوري الدرجة الثانية | وادي التراجمة",d:"ترتيب الفرق في دوري الدرجة الثانية لاتحاد رفاعة المحلي لكرة القدم"},
    gallery:{t:"معرض الصور | وادي التراجمة",d:"صور من مباريات وتدريبات نادي وادي التراجمة"},
    honors:{t:"سجل الشرف | وادي التراجمة",d:"بطولات وجوائز نادي وادي التراجمة واللاعبين"},
    board:{t:"إدارة النادي | وادي التراجمة",d:"الهيئة الإدارية والجهاز الفني لنادي وادي التراجمة"},
    about:{t:"عن النادي | وادي التراجمة",d:"قصة تأسيس نادي وادي التراجمة ورحلته في دوري الدرجة الثانية"},
    contact:{t:"تواصل معنا | وادي التراجمة",d:"تواصل مع إدارة نادي وادي التراجمة ريفي رفاعة"}
  };
  var m = map[view]||map.home;
  document.title = m.t;
  var descEl = document.querySelector('meta[name="description"]');
  if(descEl)descEl.setAttribute("content",m.d);
  var ogT = document.querySelector('meta[property="og:title"]');
  if(ogT)ogT.setAttribute("content",m.t);
  var ogD = document.querySelector('meta[property="og:description"]');
  if(ogD)ogD.setAttribute("content",m.d);
}

/* ===== التوجيه ===== */
function route(){
  clearInterval(cdT);
  var h = (location.hash||"#/home").replace(/^#\/?/,"");
  cur = VIEWS[h]?h:"home";
  closeDrawer();
  updateMeta(cur);
  var wrap = document.createElement("div");
  wrap.className = "view";
  wrap.innerHTML = VIEWS[cur]();
  var main = $("#main");
  main.innerHTML = "";
  main.appendChild(wrap);
  setActive(cur);
  if(BIND[cur])BIND[cur]();
  reveal();
  window.scrollTo(0,0);
}

function go(v){
  if(location.hash==="#/"+v)route();
  else location.hash="#/"+v;
}

/* ===== البحث الشامل ===== */
function openGSearch(){
  $("#gsearch").classList.add("on");
  $("#gsInput").value = "";
  $("#gsInput").focus();
  renderGSearch("");
}

function closeGSearch(){
  $("#gsearch").classList.remove("on");
}

function renderGSearch(q){
  var list = [];
  q = (q||"").toLowerCase().trim();
  
  C.matches.forEach(function(m){
    var t = m.opponent+" "+m.venue+" "+m.comp;
    if(!q||t.toLowerCase().indexOf(q)>-1){
      list.push({type:"match",icon:"⚽",title:(m.home?"مباراة ضد ":"مباراة خارج ") + m.opponent,sub:(m.status==="finished"?"نتيجة: "+m.my+"-"+m.op:"قادمة — "+fD(m.date)),nav:"matches"});
    }
  });
  
  C.players.forEach(function(p){
    var t = p.name+" "+p.pos+" #"+p.num;
    if(!q||t.toLowerCase().indexOf(q)>-1){
      list.push({type:"player",icon:"👤",title:p.name,sub:p.pos+" • #"+p.num,nav:"squad"});
    }
  });
  
  C.news.forEach(function(n){
    var t = n.title+" "+n.ex;
    if(!q||t.toLowerCase().indexOf(q)>-1){
      list.push({type:"news",icon:"📰",title:n.title,sub:fDs(n.date),nav:"news"});
    }
  });
  
  if(!q){
    list.push({type:"page",icon:"🏠",title:"الرئيسية",sub:"الصفحة الرئيسية للموقع",nav:"home"});
    list.push({type:"page",icon:"📊",title:"جدول الترتيب",sub:"ترتيب دوري الدرجة الثانية",nav:"standings"});
    list.push({type:"page",icon:"📸",title:"معرض الصور",sub:"صور من المباريات والتدريبات",nav:"gallery"});
  }
  
  $("#gsResults").innerHTML = list.length?list.slice(0,15).map(function(x){
    return '<div class="gs-item" data-nav="'+x.nav+'"><div class="gs-ico">'+x.icon+'</div><div class="gs-bd"><b>'+esc(x.title)+'</b><small>'+esc(x.sub)+'</small></div></div>';
  }).join(""):'<div class="empty"><i>🔍</i><h3>لا نتائج</h3></div>';
  
  $$("#gsResults [data-nav]").forEach(function(el){
    el.onclick = function(){go(el.dataset.nav);closeGSearch()};
  });
}

/* ===== بناء الواجهة ===== */
function buildChrome(){
  $("#dnav").innerHTML = NAV.map(function(n){return '<a href="#/'+n[0]+'" data-nav="'+n[0]+'"><i>'+n[1]+'</i>'+n[2]+'</a>'}).join("");
  $("#dock").innerHTML = [["home","🏠","الرئيسية"],["matches","⚽","المباريات"],["standings","📊","الترتيب"],["news","📰","الأخبار"]].map(function(n){return '<a href="#/'+n[0]+'" data-nav="'+n[0]+'"><i>'+n[1]+'</i><span>'+n[2]+'</span></a>'}).join("");
  $$(".js-name").forEach(function(e){e.textContent=C.settings.name});
  $$(".js-region").forEach(function(e){e.textContent=C.settings.region});
  $("#df1").textContent=C.settings.f1.name;$("#df2").textContent=C.settings.f2.name;
  $("#yr").textContent=new Date().getFullYear();
  var soc = socialHTML();
  $("#footSoc").innerHTML = soc?('<div class="foot-soc">'+soc.replace('<div class="soc">',"").replace("</div>","")+'</div>'):"";
  $$("[data-crest]").forEach(function(e){e.innerHTML=crest(+e.dataset.crest||44)});
  
  $("#burger").onclick = function(){
    var d=$("#drawer");
    if(d.classList.contains("on"))closeDrawer();
    else{d.classList.add("on");$("#scrim").classList.add("on");$("#burger").classList.add("on");document.body.classList.add("lock")}
  };
  
  $("#dclose").onclick=closeDrawer;
  $("#scrim").onclick=closeDrawer;
  $("#themeBtn").onclick=function(){setTheme(document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark")};
  $("#searchBtn").onclick=openGSearch;
  $("#gsClose").onclick=closeGSearch;
  $("#gsInput").oninput=function(){renderGSearch($("#gsInput").value)};
  $("#gsearch").onclick=function(e){if(e.target.id==="gsearch")closeGSearch()};
  
  setTheme((function(){try{return localStorage.getItem(TK)}catch(e){return null}})()||"light");
  
  $("#lbX").onclick=closeLB;
  $("#lb").onclick=function(e){if(e.target.id==="lb")closeLB()};
  
  if(!chromeBound){
    chromeBound=true;
    document.addEventListener("keydown",function(e){
      if(e.key==="Escape"){closeDrawer();closeLB();closeGSearch()}
      if((e.ctrlKey||e.metaKey)&&e.key==="k"){e.preventDefault();openGSearch()}
    });
    document.addEventListener("click",function(e){
      var img = e.target.closest?e.target.closest("[data-img]"):null;
      if(img){openImg(img.dataset.img,img.dataset.t||"");return}
      var a = (e.target.closest)?e.target.closest("[data-nav]"):null;
      if(a){e.preventDefault();go(a.dataset.nav)}
    });
    window.addEventListener("hashchange",route);
    window.addEventListener("storage",function(e){if(e.key===KEY){load();route()}});
  }
}

/* ===== التشغيل ===== */
load();
buildChrome();
route();

try{
  fetch("/api/data",{cache:"no-store"}).then(function(r){return r.ok?r.json():null}).then(function(d){
    if(d){C=merge(clone(SEED),d);try{localStorage.setItem(KEY,JSON.stringify(C))}catch(e){}load();buildChrome();route()}
  }).catch(function(){});
}catch(e){}

})();
