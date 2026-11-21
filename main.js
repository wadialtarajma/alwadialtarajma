/* وادي التراجمة — المنطق الرئيسي */
(function(){
"use strict";

var KEY="wadi_data_v2", TK="wadi_theme";
var POS=["حارس مرمى","مدافع","وسط","مهاجم"];
var NAV=[["home","🏠","الرئيسية"],["matches","⚽","المباريات"],["squad","👥","الفريق"],["news","📰","الأخبار"],["honors","🏅","سجل الشرف"],["board","🧑‍","الإدارة"]];
var TITLES={home:"الرئيسية",matches:"المباريات والنتائج",squad:"الفريق والتشكيلة",news:"أخبار النادي",honors:"سجل الشرف",board:"إدارة النادي"};

var SEED={
  settings:{name:"الوادي التراجمة",region:"ريفي رفاعة",motto:"من قلب الوادي.. نلعب باسم الديار",
    about:"نادي الوادي التراجمة ريفي رفاعة ممثل منطقة التراجمة في منافسات اتحاد رفاعة المحلي لكرة القدم ضمن دوري الدرجة الثانية.",
    defaultXI:[1,2,3,4,5,6,7,8,9,10,11],
    f1:{name:"ميدان الوادي",map:"https://maps.app.goo.gl/5omSxgEUMPaeguno7"},
    f2:{name:"ميدان الهاشماب",map:"https://maps.app.goo.gl/NQ5eu8AeUwTmhckv6?g_st=ac"},
    social:{fb:"",wa:"",yt:"",ig:"",tt:""}},
  players:[
    {id:1,name:"أحمد الطيب",num:1,age:26,pos:"حارس مرمى",apps:5,photo:"",medals:[]},
    {id:2,name:"محمد عثمان",num:2,age:23,pos:"مدافع",apps:5,photo:"",medals:[]},
    {id:3,name:"عمر عبد الله",num:3,age:25,pos:"مدافع",apps:5,photo:"",medals:[]},
    {id:4,name:"خالد إبراهيم",num:6,age:27,pos:"مدافع",apps:4,photo:"",medals:[]},
    {id:5,name:"يوسف حسن",num:15,age:22,pos:"مدافع",apps:5,photo:"",medals:[]},
    {id:6,name:"معاذ آدم",num:17,age:24,pos:"وسط",apps:5,photo:"",medals:[]},
    {id:7,name:"النور محمد",num:12,age:21,pos:"وسط",apps:5,photo:"",medals:[]},
    {id:8,name:"طارق سليمان",num:7,age:23,pos:"وسط",apps:5,photo:"",medals:[]},
    {id:9,name:"صهيب علي",num:10,age:25,pos:"وسط",apps:5,photo:"",medals:[]},
    {id:10,name:"مصعب أحمد",num:9,age:26,pos:"مهاجم",apps:5,photo:"",medals:[{t:"gold",label:"هداف الجولة 3"}]},
    {id:11,name:"أنس يحيى",num:11,age:22,pos:"مهاجم",apps:5,photo:"",medals:[]},
    {id:12,name:"عوض الكريم",num:18,age:24,pos:"مهاجم",apps:4,photo:"",medals:[]}],
  matches:[
    {id:1,opponent:"الهلال رفاعة",date:"2026-11-21T15:30",venue:"ميدان الوادي",comp:"دوري الدرجة الثانية",home:true,status:"upcoming",my:0,op:0,lineup:[1,2,3,4,5,6,7,8,9,10,11],oppLineup:[],goals:[]},
    {id:2,opponent:"المريخ رفاعة",date:"2026-11-28T15:00",venue:"ميدان الهاشماب",comp:"دوري الدرجة الثانية",home:true,status:"upcoming",my:0,op:0,lineup:[],oppLineup:[],goals:[]},
    {id:3,opponent:"الأمل رفاعة",date:"2026-11-07T15:30",venue:"ميدان الوادي",comp:"دوري الدرجة الثانية",home:true,status:"finished",my:2,op:1,lineup:[],oppLineup:[],goals:[{team:"my",pid:10,min:23},{team:"my",pid:6,min:55},{team:"op",name:"لاعب الأمل رفاعة",min:70}]},
    {id:4,opponent:"النيل رفاعة",date:"2026-10-31T15:00",venue:"استاد رفاعة",comp:"دوري الدرجة الثانية",home:false,status:"finished",my:1,op:1,lineup:[],oppLineup:[],goals:[{team:"my",pid:9,min:33},{team:"op",name:"لاعب النيل رفاعة",min:80}]},
    {id:5,opponent:"الشباب رفاعة",date:"2026-10-24T15:30",venue:"ميدان الوادي",comp:"دوري الدرجة الثانية",home:true,status:"finished",my:3,op:0,lineup:[],oppLineup:[],goals:[{team:"my",pid:10,min:12},{team:"my",pid:9,min:40},{team:"my",pid:10,min:67}]}],
  news:[
    {id:1,title:"الفريق يكتسح الشباب رفاعة بثلاثية ويعتلي وصافة الترتيب",date:"2026-10-24",imgs:[],ex:"قدّم نسور التراجمة واحدة من أفضل مبارياتهم الموسم الحالي، فحسموا اللقاء بثلاثة أهداف نظيفة على ميدان الوادي وسط حضور جماهيري كبير."},
    {id:2,title:"تحضيرات متواصلة على ميدان الهاشماب قبل مواجهة الهلال",date:"2026-11-12",imgs:[],ex:"يواصل الجهاز الفني رفع النسق البدني والفني استعدادًا لقمة الجولة القادمة، مع تركيز خاص على الكرات الثابتة والتحولات."},
    {id:3,title:"الإدارة تدعو الجماهير لمؤازرة الفريق في القمة",date:"2026-11-10",imgs:[],ex:"وجّهت إدارة النادي دعوة لجماهير التراجمة للحضور المبكر ومساندة الفريق في مباراته المقبلة على ميدان الوادي."}],
  board:[
    {id:1,name:"عبد الرحمن أحمد",role:"رئيس النادي",phone:""},
    {id:2,name:"الشفيع محمد",role:"نائب الرئيس",phone:""},
    {id:3,name:"محجوب علي",role:"المدرب العام",phone:""},
    {id:4,name:"ياسر إبراهيم",role:"إداري الفريق",phone:""}],
  honors:[],
  messages:[]
};

var C=clone(SEED),cdT=null,cdTarget=null,gCache=null,cur="home",bound=false,mtab="u",posF="all",Q={m:"",p:"",n:""};

function $(s){return document.querySelector(s)}
function $$(s){return Array.prototype.slice.call(document.querySelectorAll(s))}
function clone(o){return JSON.parse(JSON.stringify(o))}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function merge(a,b){if(b==null)return a;if(Array.isArray(a)||Array.isArray(b))return b;if(typeof a==="object"&&typeof b==="object"){var o={};for(var k in a)o[k]=a[k];for(var k2 in b)o[k2]=(k2 in a)?merge(a[k2],b[k2]):b[k2];return o}return b}

/* التواريخ: أوقات المباريات بتوقيت السودان (UTC+2) ثابتًا لكل الزوار،
   والتاريخ المجرد يُعرض بتوقيت الخرطوم حتى لا ينزاح يومًا في مناطق غربية */
var TZ="Africa/Khartoum";
function pD(d){if(d instanceof Date)return d;var s=String(d==null?"":d);
  if(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(s))s+=":00+02:00";
  else if(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(s))s+="+02:00";
  return new Date(s)}

function load(){
  gCache=null;
  try{var r=localStorage.getItem(KEY);C=r?merge(clone(SEED),JSON.parse(r)):clone(SEED)}catch(e){C=clone(SEED)}
  ["players","matches","news","board","honors","messages"].forEach(function(k){if(!Array.isArray(C[k]))C[k]=[]});
  C.settings=merge(clone(SEED.settings),C.settings||{});
  C.matches.forEach(function(m){if(!Array.isArray(m.lineup))m.lineup=[];if(!Array.isArray(m.oppLineup))m.oppLineup=[];if(!Array.isArray(m.goals))m.goals=[]});
  C.news.forEach(function(n){if(!Array.isArray(n.imgs))n.imgs=n.img?[n.img]:[]});
  C.players.forEach(function(p){if(!Array.isArray(p.medals))p.medals=[]});
}
function toast(m){var t=$("#toast");if(!t)return;t.textContent=m;t.classList.add("on");clearTimeout(t._x);t._x=setTimeout(function(){t.classList.remove("on")},3000)}

function crest(w){return '<svg viewBox="0 0 64 74" width="'+w+'" aria-hidden="true"><defs><linearGradient id="g'+w+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#123024"/><stop offset="1" stop-color="#050d0a"/></linearGradient></defs><path d="M32 2 60 12v27c0 16-12 27-28 33C16 66 4 55 4 39V12Z" fill="url(#g'+w+')" stroke="#f2b84b" stroke-width="2.6"/><path d="M4 24h56" stroke="#2e5bff" stroke-width="2.2" opacity=".85"/><circle cx="32" cy="17" r="6.4" fill="#f2b84b"/><path d="M9 40c6-5 12 5 23 0s17 5 23 0" stroke="#f4f1e8" stroke-width="2.6" fill="none"/><path d="M9 49c6-5 12 5 23 0s17 5 23 0" stroke="#7c9bff" stroke-width="1.9" fill="none" opacity=".85"/><text x="32" y="63" text-anchor="middle" font-size="7" font-family="Changa" font-weight="700" fill="#f2b84b">التراجمة</text></svg>'}

var fD=function(d){return pD(d).toLocaleDateString("ar",{weekday:"long",day:"numeric",month:"long",timeZone:TZ})};
var fDs=function(d){return pD(d).toLocaleDateString("ar",{day:"numeric",month:"long",year:"numeric",timeZone:TZ})};
var fT=function(d){return pD(d).toLocaleTimeString("ar",{hour:"2-digit",minute:"2-digit",timeZone:TZ})};
var dN=function(d){return +new Intl.DateTimeFormat("en",{day:"numeric",timeZone:TZ}).format(pD(d))};
var dM=function(d){return pD(d).toLocaleDateString("ar",{month:"short",timeZone:TZ})};
var nextM=function(){return C.matches.filter(function(m){return m.status==="upcoming"&&pD(m.date)>new Date()}).sort(function(a,b){return pD(a.date)-pD(b.date)})[0]};
function setTheme(t){document.documentElement.setAttribute("data-theme",t);try{localStorage.setItem(TK,t)}catch(e){}
  var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="dark"?"#060d0a":"#ffffff")}
function playerName(id){var p=C.players.filter(function(x){return x.id===id})[0];return p?p.name:"لاعب"}

/* الأهداف تُحسب تلقائياً من أهداف المباريات المسجلة — مرة واحدة لكل عرض */
function calcPlayerGoals(){
  if(gCache)return gCache;
  var g={};
  C.players.forEach(function(p){g[p.id]=0});
  C.matches.forEach(function(m){
    if(m.status==="finished"&&(m.goals||[]).length){
      m.goals.forEach(function(x){if(x.team==="my"&&x.pid&&g[x.pid]!==undefined)g[x.pid]++});
    }
  });
  gCache=g;return g;
}

/* الملعب المنظوري */
function jersey(num){
  return '<svg viewBox="0 0 44 38" class="jsy" aria-hidden="true"><path d="M15 3 7 7 2 14l7 4 2-3v16h22V15l2 3 7-4-5-7-8-4c0 4-3 6-6 6s-6-2-6-6z" fill="#f2b84b" stroke="#123024" stroke-width="1.6"/><text x="22" y="28" text-anchor="middle" font-size="12" font-family="Changa" font-weight="800" fill="#123024">'+esc(num)+'</text></svg>';
}
function pitch3d(list){
  if(!list||!list.length)return '<div class="lu-empty">لم تُعلن التشكيلة بعد</div>';
  var rows=[["مهاجم","r1"],["وسط","r2"],["مدافع","r3"],["حارس مرمى","r4"]].map(function(r){
    return {cls:r[1],ps:list.filter(function(p){return p.pos===r[0]})};
  }).filter(function(r){return r.ps.length});
  return '<div class="p3"><div class="p3in">'+rows.map(function(r){
    return '<div class="p3row '+r.cls+'">'+r.ps.map(function(p){
      return '<div class="p3p">'+jersey(p.num)+'<span>'+esc(p.name)+'</span></div>'}).join("")+'</div>';
  }).join("")+'</div></div>';
}
function playersOf(ids){return (ids||[]).map(function(id){return C.players.filter(function(p){return p.id===id})[0]}).filter(Boolean)}
function defaultXI(){var xi=playersOf(C.settings.defaultXI);return xi.length>=7?xi:autoXI()}
function autoXI(){
  var byApps=function(a,b){return (b.apps||0)-(a.apps||0)},xi=[];
  var g=C.players.filter(function(p){return p.pos==="حارس مرمى"}).sort(byApps)[0];
  if(g)xi.push(g);
  xi=xi.concat(C.players.filter(function(p){return p.pos==="مدافع"}).sort(byApps).slice(0,4));
  xi=xi.concat(C.players.filter(function(p){return p.pos==="وسط"}).sort(byApps).slice(0,4));
  xi=xi.concat(C.players.filter(function(p){return p.pos==="مهاجم"}).sort(byApps).slice(0,2));
  return xi;
}
function oppListHTML(names){
  if(!names||!names.length)return '<div class="lu-empty">لم تُعلن تشكيلة الخصم بعد</div>';
  return '<ol class="oplist">'+names.map(function(n,i){return '<li><b>'+(i+1)+'</b>'+esc(n)+'</li>'}).join("")+'</ol>';
}

/* المشاركة */
function shareHTML(title){
  var u=location.origin+location.pathname+"#/news";
  var t=encodeURIComponent(title+" | "+C.settings.name);
  var ue=encodeURIComponent(u);
  return '<div class="share" onclick="event.stopPropagation()">'+
    '<a class="sh wa" target="_blank" rel="noopener" href="https://wa.me/?text='+t+'%20'+ue+'" aria-label="واتساب"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.6 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.1-3.4-8.3zM12 21.8a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 0 1-1.5-5.2c0-5.5 4.4-9.9 9.9-9.9s9.9 4.4 9.9 9.9-4.4 9.9-9.9 9.9zm5.4-7.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1a8.1 8.1 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4z"/></svg></a>'+
    '<a class="sh fb" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u='+ue+'" aria-label="فيسبوك"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/></svg></a>'+
    '<a class="sh x" target="_blank" rel="noopener" href="https://twitter.com/intent/tweet?text='+t+'&url='+ue+'" aria-label="X"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M18.9 2H22l-7 8 8.2 12h-6.4l-5-7.3L6 22H2.8l7.5-8.6L2.4 2h6.6l4.5 6.6L18.9 2z"/></svg></a>'+
    '<button class="sh cp" data-share="'+esc(title)+'" aria-label="مشاركة"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M18 16.1a3 3 0 0 0-2.1.9l-7-4.1a3 3 0 0 0 0-1.8l7-4.1A3 3 0 1 0 15 4a3 3 0 0 0 .1.8l-7 4.1a3 3 0 1 0 0 6.2l7 4.1a3 3 0 1 0 2.9-3.1z"/></svg></button></div>';
}

/* البطاقات */
function goalsHTML(m){
  if(!m.goals||!m.goals.length)return '<p class="dim">لا تفاصيل أهداف لهذه المباراة.</p>';
  return '<ul class="goals">'+m.goals.slice().sort(function(a,b){return (a.min||0)-(b.min||0)}).map(function(g){
    var nm=g.team==="my"?playerName(g.pid):(g.name||"الخصم");
    return '<li><span class="g-min">'+esc(g.min||0)+'′</span> ⚽ <b>'+esc(nm)+'</b>'+(g.team==="op"?' <span class="dim">(الخصم)</span>':"")+'</li>';
  }).join("")+'</ul>';
}
function matchCard(m){
  var fin=m.status==="finished",w=m.my>m.op,d=m.my===m.op;
  var det=(m.goals&&m.goals.length)||(m.lineup&&m.lineup.length)||(m.oppLineup&&m.oppLineup.length);
  return '<article class="match card"><div class="mdate"><b>'+dN(m.date)+'</b><small>'+dM(m.date)+'</small></div>'+
    '<div class="minfo"><b>'+(m.home?(fin?"أمام":"يستضيف"):(fin?"ضد":"يحل ضيفًا على"))+' '+esc(m.opponent)+'</b><em>'+esc(m.comp||"")+'</em><small>📍 '+esc(m.venue)+(fin?"":" • ⏰ "+fT(m.date))+'</small></div>'+
    '<div class="mfoot">'+(fin?'<span class="score">'+(m.home?m.my+" – "+m.op:m.op+" – "+m.my)+'</span><span class="tag '+(w?"w":d?"d":"l")+'">'+(w?"فوز":d?"تعادل":"خسارة")+'</span>':'<span class="tag u">قادمة</span><span class="tag">'+fD(m.date)+'</span>')+
    (det?'<button class="btn sm ghost" data-md="'+m.id+'">📋 التفاصيل</button>':"")+'</div></article>';
}
function newsCard(n){
  var cover=n.imgs&&n.imgs.length?'<img src="'+esc(n.imgs[0])+'" alt="" loading="lazy">':'<span class="n2-ic">📰</span>';
  return '<article class="ncard2 card"><div class="n2-cover">'+cover+'<time>'+fDs(n.date)+'</time>'+((n.imgs&&n.imgs.length>1)?'<span class="n2-count">📷 '+n.imgs.length+'</span>':"")+'</div>'+
    '<div class="n2-bd"><h3>'+esc(n.title)+'</h3><p>'+esc(n.ex)+'</p>'+
    '<div class="n2-ft"><button class="btn sm ghost" data-news="'+n.id+'">قراءة الخبر</button>'+shareHTML(n.title)+'</div></div></article>';
}

/* بطاقة اللاعب العصرية: صورة + خانة + رقم + أوسمة + أهداف تلقائية */
function playerCard(x){
  var goals=calcPlayerGoals();
  var pc=x.pos==="حارس مرمى"?"gk":x.pos==="مدافع"?"df":x.pos==="وسط"?"mf":"fw";
  var myGoals=goals[x.id]||0;
  var meds=(x.medals||[]);
  var medalsHTML=meds.length?meds.map(function(m){
    var ic=m.t==="gold"?"🥇":m.t==="silver"?"🥈":m.t==="bronze"?"🥉":"🏅";
    return '<span class="pc-medal '+esc(m.t||"gold")+'">'+ic+' '+esc(m.label)+'</span>';
  }).join(""):'<span class="dim" style="font-size:.7rem">لا أوسمة بعد</span>';
  return '<article class="player-card">'+
    '<div class="pc-header">'+(x.photo?'<img src="'+esc(x.photo)+'" alt="'+esc(x.name)+'" loading="lazy">':'<span class="pc-ph">'+esc(x.num)+'</span>')+
    '<div class="pc-num">'+esc(x.num)+'</div><div class="pc-pos-badge '+pc+'">'+esc(x.pos)+'</div></div>'+
    '<div class="pc-body"><div class="pc-name">'+esc(x.name)+'</div>'+
    '<div class="pc-info">'+(x.age?'<span>🎂 '+esc(x.age)+' سنة</span>':"")+'<span>👕 رقم '+esc(x.num)+'</span></div>'+
    '<div class="pc-medals">'+medalsHTML+'</div>'+
    '<div class="pc-stats"><div class="pc-stat"><b>'+myGoals+'</b><small>أهداف</small></div>'+
    '<div class="pc-stat"><b>'+(x.apps||0)+'</b><small>مباريات</small></div>'+
    '<div class="pc-stat"><b>'+meds.length+'</b><small>أوسمة</small></div></div></div></article>';
}
function memberCard(b){var ini=(b.name||"؟").trim().charAt(0);
  return '<article class="bcard card"><div class="bph">'+(b.photo?'<img src="'+esc(b.photo)+'" alt="">':esc(ini))+'</div><b>'+esc(b.name)+'</b><span class="role">'+esc(b.role)+'</span>'+(b.phone?'<a class="tel" href="tel:'+esc(b.phone)+'">📞 '+esc(b.phone)+'</a>':"")+'</article>'}

/* سجل الشرف: أوسمة الفريق وتكريمات اللاعبين والإدارة */
function honorName(h){
  if(h.kind==="player")return playerName(h.who);
  if(h.kind==="board"){var b=C.board.filter(function(x){return x.id===h.who})[0];return b?b.name:"عضو إدارة"}
  return C.settings.name;
}
function honorCard(h){
  var ic=h.t==="gold"?"🥇":h.t==="silver"?"🥈":h.t==="bronze"?"🥉":"🏅";
  return '<article class="bcard card"><div class="bph">'+ic+'</div><b>'+esc(h.title)+'</b><span class="role">'+esc(honorName(h))+'</span>'+
    (h.season?'<span class="tag">'+esc(h.season)+'</span>':"")+
    (h.note?'<p class="dim" style="margin-top:6px">'+esc(h.note)+'</p>':"")+'</article>';
}

function phero(t,s){return '<section class="phero"><div class="wrap"><h1>'+t+'</h1><p>'+s+'</p><div class="rule"></div></div></section>'}
function emptyState(i,t,d){return '<div class="empty"><i>'+i+'</i><h3>'+t+'</h3><p>'+d+'</p></div>'}
function searchbar(id,ph){return '<div class="searchbar"><span>🔍</span><input id="sq_'+id+'" placeholder="'+ph+'" autocomplete="off"><span class="s-count" id="sn_'+id+'"></span></div>'}
function bindSearch(id,set,rr){var inp=$("#sq_"+id);if(inp)inp.oninput=function(){set(inp.value);rr()}}

function boardHTML(){
  var m=nextM();
  cdTarget=m?pD(m.date).getTime():null;
  if(!m)return '<div class="nm-head"><b><i></i> '+esc(C.settings.name)+'</b><span>اتحاد رفاعة</span></div><div style="text-align:center;padding:8px 0">'+crest(70)+'<p style="color:rgba(244,241,232,.75);font-size:.85rem;margin-top:8px">لم تُجدول مباراة قادمة بعد.</p></div>';
  return '<div class="nm-head"><b><i></i> المباراة القادمة</b><span>'+esc(m.comp||"")+'</span></div>'+
    '<div class="vs"><div>'+crest(46)+'<span class="nm-t">'+esc(C.settings.name)+'</span><small>'+(m.home?"مستضيف":"")+'</small></div><strong>VS</strong><div><div class="opc">'+esc((m.opponent||"؟").charAt(0))+'</div><span class="nm-t">'+esc(m.opponent)+'</span><small>'+(m.home?"ضيف":"مستضيف")+'</small></div></div>'+
    '<div class="nm-meta"><span>📅 '+fD(m.date)+'</span><span>⏰ '+fT(m.date)+'</span><span>📍 '+esc(m.venue)+'</span></div>'+
    '<div class="cd"><div><b id="cD">--</b><span>يوم</span></div><div><b id="cH">--</b><span>ساعة</span></div><div><b id="cM">--</b><span>دقيقة</span></div><div><b id="cS">--</b><span>ثانية</span></div></div>'+
    '<div class="lu-btns"><button class="btn sm" data-lu="my">👥 تشكيلتنا</button><button class="btn sm" data-lu="op">👥 تشكيلة '+esc(m.opponent)+'</button></div>'+
    '<div class="lu-panel" id="luMy" hidden><div class="lu-col"><h4 style="color:#ffd98a">تشكيلتنا</h4>'+pitch3d(playersOf(m.lineup))+'</div></div>'+
    '<div class="lu-panel" id="luOp" hidden><div class="lu-col"><h4 style="color:#ffd98a">تشكيلة '+esc(m.opponent)+'</h4>'+oppListHTML(m.oppLineup)+'</div></div>';
}
/* العداد مثبّت على المباراة المعروضة — يتوقف عند الصفر ولا يقفز لمباراة أخرى */
function startCD(){clearInterval(cdT);if(cdTarget==null)return;
  var tick=function(){var el=$("#cD");if(!el){clearInterval(cdT);return}
    var s=Math.max(0,Math.floor((cdTarget-Date.now())/1000));
    el.textContent=Math.floor(s/86400);$("#cH").textContent=("0"+Math.floor(s%86400/3600)).slice(-2);
    $("#cM").textContent=("0"+Math.floor(s%3600/60)).slice(-2);$("#cS").textContent=("0"+(s%60)).slice(-2);
    if(s<=0)clearInterval(cdT)};
  tick();cdT=setInterval(tick,1000)}

var VIEWS={
  home:function(){
    var m=nextM();
    var nw=C.news.slice().sort(function(a,b){return pD(b.date)-pD(a.date)}).slice(0,2);
    var pl=C.players.slice(0,6);
    var h='<section class="hero"><div class="wrap hero-in"><div class="hero-t">'+
      '<span class="badge"><i></i> اتحاد رفاعة المحلي • الدرجة الثانية</span>'+
      '<h1>نادي الوادي <em>التراجمة</em><span>'+esc(C.settings.region)+'</span></h1>'+
      '<p class="lead">«'+esc(C.settings.motto)+'»</p>'+
      '<div class="hero-cta"><a class="btn" href="#/matches" data-nav="matches">⚽ المباريات</a><a class="btn on-dark" href="#/news" data-nav="news">📰 الأخبار</a></div>'+
      '</div></div></section>';
    h+='<section class="sec"><div class="wrap"><div class="nm-card">'+boardHTML()+'</div></div></section>';
    h+='<section class="sec alt"><div class="wrap"><div class="sec-head"><div><span class="kick">الخطة الأساسية</span><h2>تشكيلة الفريق</h2></div><a class="btn sm ghost" href="#/squad" data-nav="squad">الفريق كاملًا ⬅</a></div>'+
      '<div class="lu-col">'+pitch3d(defaultXI())+'</div></div></section>';
    h+='<section class="sec"><div class="wrap"><div class="sec-head"><div><span class="kick">المركز الإعلامي</span><h2>آخر الأخبار</h2></div><a class="btn sm ghost" href="#/news" data-nav="news">المزيد ⬅</a></div>'+
      '<div class="news-g">'+(nw.length?nw.map(newsCard).join(""):emptyState("📰","لا أخبار بعد","ترقبوا جديد النادي قريبًا."))+'</div></div></section>';
    h+='<section class="sec alt"><div class="wrap"><div class="sec-head"><div><span class="kick">نسور التراجمة</span><h2>نجوم الفريق</h2></div><a class="btn sm ghost" href="#/squad" data-nav="squad">المزيد ⬅</a></div>'+
      '<div class="hscroll2">'+(pl.length?pl.map(playerCard).join(""):emptyState("👥","لا لاعبين بعد",""))+'</div></div></section>';
    return h;
  },
  matches:function(){return phero("المباريات <em>والنتائج</em>","كل مباريات الفريق بتفاصيلها: النتائج، الهدافون، والتشكيلات.")+
    '<section class="sec" style="padding-top:20px"><div class="wrap">'+searchbar("m","ابحث: خصم، ملعب، بطولة…")+
    '<div class="tabs"><button class="on" data-mt="u">القادمة</button><button data-mt="r">النتائج</button></div><div class="mlist" id="mlist"></div></div></section>'},
  squad:function(){return phero("قائمة <em>الفريق</em>","بطاقات اللاعبين: الصورة والخانة والرقم والأوسمة والأهداف.")+
    '<section class="sec" style="padding-top:20px"><div class="wrap">'+searchbar("p","ابحث: اسم لاعب، خانة، رقم…")+
    '<div class="chips" id="pchips"></div><div class="players" id="plist"></div>'+
    '<div class="sec-head" style="margin-top:30px"><div><span class="kick">الخطة</span><h2>التشكيلة الأساسية</h2></div></div>'+
    '<div class="lu-col">'+pitch3d(defaultXI())+'</div></div></section>'},
  news:function(){return phero("أخبار <em>النادي</em>","أرشيف كامل لكل مستجدات الفريق والإدارة — شاركها بضغطة.")+
    '<section class="sec" style="padding-top:20px"><div class="wrap">'+searchbar("n","ابحث في الأخبار…")+'<div class="news-g" id="nlist"></div></div></section>'},
  honors:function(){
    var team=C.honors.filter(function(h){return h.kind==="team"});
    var pl=C.honors.filter(function(h){return h.kind==="player"});
    var bd=C.honors.filter(function(h){return h.kind==="board"});
    var h=phero("سجل <em>الشرف</em>","أوسمة الفريق وتكريمات اللاعبين والإدارة — فخر الديار.");
    h+='<section class="sec" style="padding-top:20px"><div class="wrap">';
    if(!C.honors.length){h+=emptyState("🏅","لا أوسمة بعد","ستظهر هنا أوسمة الفريق وتكريماته قريبًا.")}
    else{
      if(team.length){h+='<div class="sec-head"><div><span class="kick">فخر الديار</span><h2>أوسمة الفريق</h2></div></div><div class="bgrid">'+team.map(honorCard).join("")+'</div>'}
      if(pl.length){h+='<div class="sec-head" style="margin-top:26px"><div><span class="kick">نسور التراجمة</span><h2>تكريمات اللاعبين</h2></div></div><div class="bgrid">'+pl.map(honorCard).join("")+'</div>'}
      if(bd.length){h+='<div class="sec-head" style="margin-top:26px"><div><span class="kick">العطاء</span><h2>تكريمات الإدارة</h2></div></div><div class="bgrid">'+bd.map(honorCard).join("")+'</div>'}
    }
    h+='</div></section>';
    return h;
  },
  board:function(){return phero("إدارة <em>النادي</em>","الهيئة الإدارية والجهاز الفني المشرف على النادي.")+
    '<section class="sec" style="padding-top:20px"><div class="wrap">'+
    (C.board.length?'<div class="bgrid">'+C.board.map(memberCard).join("")+'</div>':emptyState("🧑‍","إدارة النادي","سيُعلن عن أعضاء الإدارة قريبًا."))+'</div></section>'}
};

var BIND={
  home:function(){
    startCD();
    $$(".lu-btns [data-lu]").forEach(function(b){
      b.onclick=function(){
        var my=b.dataset.lu==="my";
        var panel=my?$("#luMy"):$("#luOp");
        if(!panel)return;
        var show=panel.hidden;
        panel.hidden=!show;
        b.classList.toggle("on",show);
      };
    });
  },
  matches:function(){
    var render=function(){
      var list=C.matches.filter(function(m){return mtab==="u"?m.status==="upcoming":m.status==="finished"});
      if(Q.m){var q=Q.m.toLowerCase();list=list.filter(function(m){return ((m.opponent||"")+" "+(m.venue||"")+" "+(m.comp||"")).toLowerCase().indexOf(q)>-1})}
      list.sort(function(a,b){return mtab==="u"?pD(a.date)-pD(b.date):pD(b.date)-pD(a.date)});
      $("#sn_m").textContent=list.length;
      $("#mlist").innerHTML=list.length?list.map(matchCard).join(""):emptyState("🔍","لا نتائج مطابقة","جرّب كلمة أخرى أو بدّل التبويب.");
    };
    $$("[data-mt]").forEach(function(b){b.onclick=function(){$$("[data-mt]").forEach(function(x){x.classList.remove("on")});b.classList.add("on");mtab=b.dataset.mt;render()}});
    bindSearch("m",function(v){Q.m=v},render);render();
  },
  squad:function(){
    var chips=function(){$("#pchips").innerHTML=['all'].concat(POS).map(function(p){return '<button class="'+(posF===p?"on":"")+'" data-pos="'+p+'">'+(p==="all"?"الكل":p)+'</button>'}).join("");
      $$("#pchips button").forEach(function(b){b.onclick=function(){posF=b.dataset.pos;chips();render()}})};
    var render=function(){
      var list=C.players.filter(function(x){return posF==="all"||x.pos===posF});
      if(Q.p){var q=Q.p.toLowerCase();list=list.filter(function(x){return (x.name+" "+x.pos+" "+x.num).toLowerCase().indexOf(q)>-1})}
      $("#sn_p").textContent=list.length;
      $("#plist").innerHTML=list.length?list.map(playerCard).join(""):emptyState("🔍","لا لاعبين مطابقين","");
    };
    chips();bindSearch("p",function(v){Q.p=v},render);render();
  },
  news:function(){
    var render=function(){
      var list=C.news.slice().sort(function(a,b){return pD(b.date)-pD(a.date)});
      if(Q.n){var q=Q.n.toLowerCase();list=list.filter(function(n){return (n.title+" "+n.ex).toLowerCase().indexOf(q)>-1})}
      $("#sn_n").textContent=list.length;
      $("#nlist").innerHTML=list.length?list.map(newsCard).join(""):emptyState("🔍","لا أخبار مطابقة","");
    };
    bindSearch("n",function(v){Q.n=v},render);render();
  }
};

function openModal(html){$("#modalBody").innerHTML=html;$("#modal").classList.add("on");document.body.classList.add("lock")}
function closeModal(){$("#modal").classList.remove("on");document.body.classList.remove("lock")}
function newsModal(n){
  var imgs=(n.imgs&&n.imgs.length)?'<div class="n2-imgs">'+n.imgs.map(function(s){return '<img src="'+esc(s)+'" alt="" loading="lazy">'}).join("")+'</div>':"";
  openModal('<h3>'+esc(n.title)+'</h3><div class="m-meta">📅 '+fDs(n.date)+'</div>'+imgs+
    '<p style="font-size:.92rem">'+esc(n.ex)+'</p><div style="margin-top:16px;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap"><span class="dim">مشاركة الخبر:</span>'+shareHTML(n.title)+'</div>');
}
function matchModal(m){
  var hasLu=(m.lineup&&m.lineup.length)||(m.oppLineup&&m.oppLineup.length);
  openModal('<h3>'+(m.status==="finished"?"نتيجة مباراة":"مباراة")+' '+esc(m.opponent)+'</h3>'+
    '<div class="m-meta">'+fDs(m.date)+' • '+esc(m.venue)+' • '+esc(m.comp||"")+(m.status==="finished"?' • النتيجة: <b>'+m.my+" – "+m.op+"</b>":"")+'</div>'+
    '<div class="lu-col"><h4>⚽ الأهداف</h4>'+goalsHTML(m)+'</div>'+
    (hasLu?'<div class="lu-grid"><div class="lu-col"><h4>تشكيلتنا</h4>'+pitch3d(playersOf(m.lineup))+'</div><div class="lu-col"><h4>تشكيلة '+esc(m.opponent)+'</h4>'+oppListHTML(m.oppLineup)+'</div></div>':""));
}

function updateMeta(v){
  var d={home:"الموقع الرسمي لنادي الوادي التراجمة ريفي رفاعة — المباراة القادمة والنتائج والأخبار",
    matches:"جدول مباريات ونتائج نادي الوادي التراجمة ريفي رفاعة مع الهدافين والتشكيلات",
    squad:"قائمة لاعبي نادي الوادي التراجمة ريفي رفاعة والتشكيلة الأساسية",
    news:"آخر أخبار نادي الوادي التراجمة ريفي رفاعة",
    honors:"سجل شرف نادي الوادي التراجمة ريفي رفاعة — أوسمة الفريق وتكريمات اللاعبين والإدارة",
    board:"الهيئة الإدارية لنادي الوادي التراجمة ريفي رفاعة"}[v]||"";
  document.title=TITLES[v]+" | الوادي التراجمة ريفي رفاعة";
  var el=document.querySelector('meta[name="description"]');if(el)el.setAttribute("content",d);
}

var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add("on");io.unobserve(en.target)}})},{threshold:.08});
function reveal(){$$(".card,.sec-head,.nm-card,.phero .wrap,.hero-in,.p3,.player-card").forEach(function(el){el.classList.add("rv");io.observe(el)})}
function setActive(v){$$("[data-nav]").forEach(function(a){a.classList.toggle("on",a.dataset.nav===v)})}
function closeDrawer(){$("#drawer").classList.remove("on");$("#scrim").classList.remove("on");$("#burger").classList.remove("on");document.body.classList.remove("lock")}

function route(){
  clearInterval(cdT);
  var h=(location.hash||"#/home").replace(/^#\/?/,"");
  cur=VIEWS[h]?h:"home";
  closeDrawer();updateMeta(cur);
  var w=document.createElement("div");w.className="view";w.innerHTML=VIEWS[cur]();
  var main=$("#main");main.innerHTML="";main.appendChild(w);
  setActive(cur);if(BIND[cur])BIND[cur]();reveal();window.scrollTo(0,0);
}
function go(v){if(location.hash==="#/"+v)route();else location.hash="#/"+v}

function buildChrome(){
  var links=NAV.map(function(n){return '<a href="#/'+n[0]+'" data-nav="'+n[0]+'">'+n[2]+'</a>'}).join("");
  $("#qnav").innerHTML=links;
  $("#dnav").innerHTML=NAV.map(function(n){return '<a href="#/'+n[0]+'" data-nav="'+n[0]+'"><i>'+n[1]+'</i>'+n[2]+'</a>'}).join("");
  $("#dock").innerHTML=NAV.slice(0,4).map(function(n){return '<a href="#/'+n[0]+'" data-nav="'+n[0]+'" aria-label="'+n[2]+'">'+n[1]+'</a>'}).join("");
  $("#footLinks").innerHTML=links;
  $$(".js-name").forEach(function(e){e.textContent=C.settings.name});
  $$(".js-region").forEach(function(e){e.textContent=C.settings.region});
  $("#yr").textContent=new Date().getFullYear();
  $$("[data-crest]").forEach(function(e){e.innerHTML=crest(+e.dataset.crest||40)});

  var fw=document.querySelector(".foot .wrap");
  if(fw&&!$("#footFields"))fw.insertAdjacentHTML("afterbegin",'<div class="foot-fields" id="footFields" style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:18px"></div>');
  var ff=$("#footFields");
  if(ff){
    var btns=[];
    if(C.settings.f1&&C.settings.f1.map)btns.push('<a class="btn ghost sm" href="'+esc(C.settings.f1.map)+'" target="_blank" rel="noopener">🏟️ '+esc(C.settings.f1.name)+' ↗</a>');
    if(C.settings.f2&&C.settings.f2.map)btns.push('<a class="btn ghost sm" href="'+esc(C.settings.f2.map)+'" target="_blank" rel="noopener">🥅 '+esc(C.settings.f2.name)+' ↗</a>');
    ff.innerHTML=btns.join("");
    ff.style.display=btns.length?"flex":"none";
  }

  $("#burger").onclick=function(){var d=$("#drawer");if(d.classList.contains("on"))closeDrawer();else{d.classList.add("on");$("#scrim").classList.add("on");$("#burger").classList.add("on");document.body.classList.add("lock")}};
  $("#dclose").onclick=closeDrawer;$("#scrim").onclick=closeDrawer;
  $("#themeBtn").onclick=function(){setTheme(document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark")};
  $("#modalX").onclick=closeModal;$("#modal").onclick=function(e){if(e.target.id==="modal")closeModal()};
  setTheme((function(){try{return localStorage.getItem(TK)}catch(e){return null}})()||"light");
  if(!bound){bound=true;
    document.addEventListener("keydown",function(e){if(e.key==="Escape"){closeDrawer();closeModal()}});
    document.addEventListener("click",function(e){
      var sh=e.target.closest?e.target.closest("[data-share]"):null;
      if(sh){e.preventDefault();
        var ttl=sh.dataset.share||"";
        var url=location.origin+location.pathname+"#/news";
        if(navigator.share){navigator.share({title:ttl,text:ttl+" | "+C.settings.name,url:url}).catch(function(){})}
        else if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(url).then(function(){toast("🔗 تم نسخ الرابط للمشاركة")})}
        else toast(url);
        return}
      var nd=e.target.closest?e.target.closest("[data-news]"):null;
      if(nd){var n=C.news.filter(function(x){return x.id===+nd.dataset.news})[0];if(n)newsModal(n);return}
      var md=e.target.closest?e.target.closest("[data-md]"):null;
      if(md){var mm=C.matches.filter(function(x){return x.id===+md.dataset.md})[0];if(mm)matchModal(mm);return}
      var a=e.target.closest?e.target.closest("[data-nav]"):null;
      if(a){e.preventDefault();go(a.dataset.nav)}
    });
    window.addEventListener("hashchange",route);
    window.addEventListener("storage",function(e){if(e.key===KEY){load();route()}});
  }
}

load();buildChrome();route();
try{fetch("/api/data",{cache:"no-store"}).then(function(r){var ct=r.headers.get("content-type")||"";return r.ok&&ct.indexOf("application/json")>-1?r.json():null}).then(function(d){
  if(d){C=merge(clone(SEED),d);try{localStorage.setItem(KEY,JSON.stringify(C))}catch(e){}load();buildChrome();route()}
}).catch(function(){})}catch(e){}
})();
