/* وادي التراجمة — المنطق الرئيسي */
(function(){
"use strict";

var KEY="wadi_data_v2", TK="wadi_theme";
var POS=["حارس مرمى","مدافع","وسط","مهاجم"];
var NAV=[["home","🏠","الرئيسية"],["matches","⚽","المباريات"],["squad","👥","الفريق"],["news","📰","الأخبار"],["board","🧑‍","الإدارة"]];
var TITLES={home:"الرئيسية",matches:"المباريات والنتائج",squad:"الفريق والتشكيلة",news:"أخبار النادي",board:"إدارة النادي"};

var SEED={
  settings:{name:"وادي التراجمة",region:"ريفي رفاعة",motto:"من قلب الوادي.. نلعب باسم الديار",
    about:"نادي وادي التراجمة ريفي رفاعة ممثل منطقة التراجمة في منافسات اتحاد رفاعة المحلي لكرة القدم ضمن دوري الدرجة الثانية.",
    f1:{name:"ميدان الوادي",map:"https://maps.app.goo.gl/5omSxgEUMPaeguno7"},
    f2:{name:"ميدان الهاشماب",map:"https://maps.app.goo.gl/NQ5eu8AeUwTmhckv6?g_st=ac"}},
  players:[
    {id:1,name:"أحمد الطيب",num:1,age:26,pos:"حارس مرمى",apps:5,photo:""},
    {id:2,name:"محمد عثمان",num:2,age:23,pos:"مدافع",apps:5,photo:""},
    {id:3,name:"عمر عبد الله",num:3,age:25,pos:"مدافع",apps:5,photo:""},
    {id:4,name:"خالد إبراهيم",num:6,age:27,pos:"مدافع",apps:4,photo:""},
    {id:5,name:"يوسف حسن",num:15,age:22,pos:"مدافع",apps:5,photo:""},
    {id:6,name:"معاذ آدم",num:17,age:24,pos:"وسط",apps:5,photo:""},
    {id:7,name:"النور محمد",num:12,age:21,pos:"وسط",apps:5,photo:""},
    {id:8,name:"طارق سليمان",num:7,age:23,pos:"وسط",apps:5,photo:""},
    {id:9,name:"صهيب علي",num:10,age:25,pos:"وسط",apps:5,photo:""},
    {id:10,name:"مصعب أحمد",num:9,age:26,pos:"مهاجم",apps:5,photo:""},
    {id:11,name:"أنس يحيى",num:11,age:22,pos:"مهاجم",apps:5,photo:""},
    {id:12,name:"عوض الكريم",num:18,age:24,pos:"مهاجم",apps:4,photo:""}],
  matches:[
    {id:1,opponent:"الهلال رفاعة",date:"2026-11-21T15:30",venue:"ميدان الوادي",comp:"دوري الدرجة الثانية",home:true,status:"upcoming",my:0,op:0,lineup:[1,2,3,4,5,6,7,8,9,10,11],oppLineup:[]},
    {id:2,opponent:"المريخ رفاعة",date:"2026-11-28T15:00",venue:"ميدان الهاشماب",comp:"دوري الدرجة الثانية",home:true,status:"upcoming",my:0,op:0,lineup:[],oppLineup:[]},
    {id:3,opponent:"الأمل رفاعة",date:"2026-11-07T15:30",venue:"ميدان الوادي",comp:"دوري الدرجة الثانية",home:true,status:"finished",my:2,op:1,lineup:[],oppLineup:[]},
    {id:4,opponent:"النيل رفاعة",date:"2026-10-31T15:00",venue:"استاد رفاعة",comp:"دوري الدرجة الثانية",home:false,status:"finished",my:1,op:1,lineup:[],oppLineup:[]},
    {id:5,opponent:"الشباب رفاعة",date:"2026-10-24T15:30",venue:"ميدان الوادي",comp:"دوري الدرجة الثانية",home:true,status:"finished",my:3,op:0,lineup:[],oppLineup:[]}],
  news:[
    {id:1,title:"الفريق يكتسح الشباب رفاعة بثلاثية ويعتلي وصافة الترتيب",date:"2026-10-24",ex:"قدّم نسور التراجمة واحدة من أفضل مبارياتهم الموسم الحالي، فحسموا اللقاء بثلاثة أهداف نظيفة على ميدان الوادي وسط حضور جماهيري كبير."},
    {id:2,title:"تحضيرات متواصلة على ميدان الهاشماب قبل مواجهة الهلال",date:"2026-11-12",ex:"يواصل الجهاز الفني رفع النسق البدني والفني استعدادًا لقمة الجولة القادمة، مع تركيز خاص على الكرات الثابتة والتحولات."},
    {id:3,title:"الإدارة تدعو الجماهير لمؤازرة الفريق في القمة",date:"2026-11-10",ex:"وجّهت إدارة النادي دعوة لجماهير التراجمة للحضور المبكر ومساندة الفريق في مباراته المقبلة على ميدان الوادي."}],
  board:[
    {id:1,name:"عبد الرحمن أحمد",role:"رئيس النادي",phone:""},
    {id:2,name:"الشفيع محمد",role:"نائب الرئيس",phone:""},
    {id:3,name:"محجوب علي",role:"المدرب العام",phone:""},
    {id:4,name:"ياسر إبراهيم",role:"إداري الفريق",phone:""}],
  messages:[]
};

var C=clone(SEED),cdT=null,cur="home",bound=false,mtab="u",posF="all",Q={m:"",p:"",n:""};

function $(s){return document.querySelector(s)}
function $$(s){return Array.prototype.slice.call(document.querySelectorAll(s))}
function clone(o){return JSON.parse(JSON.stringify(o))}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function merge(a,b){if(b==null)return a;if(Array.isArray(a)||Array.isArray(b))return b;if(typeof a==="object"&&typeof b==="object"){var o={};for(var k in a)o[k]=a[k];for(var k2 in b)o[k2]=(k2 in a)?merge(a[k2],b[k2]):b[k2];return o}return b}

function load(){
  try{var r=localStorage.getItem(KEY);C=r?merge(clone(SEED),JSON.parse(r)):clone(SEED)}catch(e){C=clone(SEED)}
  ["players","matches","news","board","messages"].forEach(function(k){if(!Array.isArray(C[k]))C[k]=[]});
  C.settings=merge(clone(SEED.settings),C.settings||{});
}
function toast(m){var t=$("#toast");if(!t)return;t.textContent=m;t.classList.add("on");clearTimeout(t._x);t._x=setTimeout(function(){t.classList.remove("on")},3000)}

function crest(w){return '<svg viewBox="0 0 64 74" width="'+w+'" aria-hidden="true"><defs><linearGradient id="g'+w+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#123024"/><stop offset="1" stop-color="#050d0a"/></linearGradient></defs><path d="M32 2 60 12v27c0 16-12 27-28 33C16 66 4 55 4 39V12Z" fill="url(#g'+w+')" stroke="#f2b84b" stroke-width="2.6"/><path d="M4 24h56" stroke="#2e5bff" stroke-width="2.2" opacity=".85"/><circle cx="32" cy="17" r="6.4" fill="#f2b84b"/><path d="M9 40c6-5 12 5 23 0s17 5 23 0" stroke="#f4f1e8" stroke-width="2.6" fill="none"/><path d="M9 49c6-5 12 5 23 0s17 5 23 0" stroke="#7c9bff" stroke-width="1.9" fill="none" opacity=".85"/><text x="32" y="63" text-anchor="middle" font-size="7" font-family="Changa" font-weight="700" fill="#f2b84b">التراجمة</text></svg>'}

var fD=function(d){return new Date(d).toLocaleDateString("ar",{weekday:"long",day:"numeric",month:"long"})};
var fDs=function(d){return new Date(d).toLocaleDateString("ar",{day:"numeric",month:"long",year:"numeric"})};
var fT=function(d){return new Date(d).toLocaleTimeString("ar",{hour:"2-digit",minute:"2-digit"})};
var dN=function(d){return new Date(d).getDate()};
var dM=function(d){return new Date(d).toLocaleDateString("ar",{month:"short"})};
var nextM=function(){return C.matches.filter(function(m){return m.status==="upcoming"&&new Date(m.date)>new Date()}).sort(function(a,b){return new Date(a.date)-new Date(b.date)})[0]};

function setTheme(t){document.documentElement.setAttribute("data-theme",t);try{localStorage.setItem(TK,t)}catch(e){}
  var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="dark"?"#060d0a":"#ffffff")}

/* ===== التشكيلات ===== */
function playersOf(ids){return (ids||[]).map(function(id){return C.players.filter(function(p){return p.id===id})[0]}).filter(Boolean)}
function autoXI(){
  var byApps=function(a,b){return (b.apps||0)-(a.apps||0)};
  var xi=[];
  var g=C.players.filter(function(p){return p.pos==="حارس مرمى"}).sort(byApps)[0];
  if(g)xi.push(g);
  xi=xi.concat(C.players.filter(function(p){return p.pos==="مدافع"}).sort(byApps).slice(0,4));
  xi=xi.concat(C.players.filter(function(p){return p.pos==="وسط"}).sort(byApps).slice(0,4));
  xi=xi.concat(C.players.filter(function(p){return p.pos==="مهاجم"}).sort(byApps).slice(0,2));
  return xi;
}
function pitchHTML(list){
  if(!list||!list.length)return '<div class="lu-empty">لم تُعلن التشكيلة بعد — تُضاف من لوحة التحكم</div>';
  var rows=POS.map(function(pos){return list.filter(function(p){return p.pos===pos})}).filter(function(r){return r.length});
  return '<div class="pitch">'+rows.map(function(r){return '<div class="prow">'+r.map(function(p){
    return '<div class="pdot"><span class="num">'+esc(p.num)+'</span><span class="pn">'+esc(p.name)+'</span></div>'}).join("")+'</div>'}).join("")+'</div>';
}
function oppListHTML(names){
  if(!names||!names.length)return '<div class="lu-empty">لم تُعلن تشكيلة الخصم بعد</div>';
  return '<ol class="oplist">'+names.map(function(n,i){return '<li><b>'+(i+1)+'</b>'+esc(n)+'</li>'}).join("")+'</ol>';
}
function lineupsHTML(m){
  return '<div class="lu-grid"><div class="lu-col"><h4>تشكيلتنا — '+esc(C.settings.name)+'</h4>'+pitchHTML(playersOf(m.lineup))+'</div>'+
    '<div class="lu-col"><h4>تشكيلة '+esc(m.opponent)+'</h4>'+oppListHTML(m.oppLineup)+'</div></div>';
}

/* ===== بطاقات ===== */
function matchCard(m){
  var fin=m.status==="finished",w=m.my>m.op,d=m.my===m.op;
  var hasLu=(m.lineup&&m.lineup.length)||(m.oppLineup&&m.oppLineup.length);
  return '<article class="match card"><div class="mdate"><b>'+dN(m.date)+'</b><small>'+dM(m.date)+'</small></div>'+
    '<div class="minfo"><b>'+(m.home?(fin?"أمام":"يستضيف"):(fin?"ضد":"يحل ضيفًا على"))+' '+esc(m.opponent)+'</b><em>'+esc(m.comp||"")+'</em><small>📍 '+esc(m.venue)+(fin?"":" • ⏰ "+fT(m.date))+'</small></div>'+
    '<div class="mfoot">'+(fin?'<span class="score">'+(m.home?m.my+" – "+m.op:m.op+" – "+m.my)+'</span><span class="tag '+(w?"w":d?"d":"l")+'">'+(w?"فوز":d?"تعادل":"خسارة")+'</span>':'<span class="tag u">قادمة</span><span class="tag">'+fD(m.date)+'</span>')+
    (hasLu?'<button class="btn sm ghost" data-lu="'+m.id+'">🧾 التشكيلة</button>':"")+'</div></article>';
}
function newsCard(n){return '<article class="ncard card"><time>'+fDs(n.date)+'</time><h3>'+esc(n.title)+'</h3><p>'+esc(n.ex)+'</p></article>'}
function playerCard(x){return '<article class="player card"><div class="pph">'+(x.photo?'<img src="'+esc(x.photo)+'" alt="'+esc(x.name)+'" loading="lazy">':'<span>'+esc(x.num)+'</span>')+'</div><div class="pbd"><b>'+esc(x.name)+'</b><div><span class="pos">'+esc(x.pos)+'</span>'+(x.age?'<span>'+esc(x.age)+' سنة</span>':"")+'<span>#'+esc(x.num)+'</span></div></div></article>'}
function memberCard(b){var ini=(b.name||"؟").trim().charAt(0);
  return '<article class="bcard card"><div class="bph">'+(b.photo?'<img src="'+esc(b.photo)+'" alt="">':esc(ini))+'</div><b>'+esc(b.name)+'</b><span class="role">'+esc(b.role)+'</span>'+(b.phone?'<a class="tel" href="tel:'+esc(b.phone)+'">📞 '+esc(b.phone)+'</a>':"")+'</article>'}
function phero(t,s){return '<section class="phero"><div class="wrap"><h1>'+t+'</h1><p>'+s+'</p><div class="rule"></div></div></section>'}
function emptyState(i,t,d){return '<div class="empty"><i>'+i+'</i><h3>'+t+'</h3><p>'+d+'</p></div>'}
function searchbar(id,ph){return '<div class="searchbar"><span>🔍</span><input id="sq_'+id+'" placeholder="'+ph+'" autocomplete="off"><span class="s-count" id="sn_'+id+'"></span></div>'}
function bindSearch(id,set,rr){var inp=$("#sq_"+id);inp.oninput=function(){set(inp.value);rr()}}

function boardHTML(){
  var m=nextM();
  if(!m)return '<div class="nm-head"><b><i></i> '+esc(C.settings.name)+'</b><span>اتحاد رفاعة</span></div><div style="text-align:center;padding:8px 0">'+crest(70)+'<p style="color:rgba(244,241,232,.7);font-size:.85rem;margin-top:8px">لم تُجدول مباراة قادمة بعد.</p></div>';
  return '<div class="nm-head"><b><i></i> المباراة القادمة</b><span>'+esc(m.comp||"")+'</span></div>'+
    '<div class="vs"><div>'+crest(46)+'<span class="nm-t">'+esc(C.settings.name)+'</span><small>'+(m.home?"مستضيف":"")+'</small></div><strong>VS</strong><div><div class="opc">'+esc((m.opponent||"؟").charAt(0))+'</div><span class="nm-t">'+esc(m.opponent)+'</span><small>'+(m.home?"ضيف":"مستضيف")+'</small></div></div>'+
    '<div class="nm-meta"><span>📅 '+fD(m.date)+'</span><span>⏰ '+fT(m.date)+'</span><span>📍 '+esc(m.venue)+'</span></div>'+
    '<div class="cd"><div><b id="cD">--</b><span>يوم</span></div><div><b id="cH">--</b><span>ساعة</span></div><div><b id="cM">--</b><span>دقيقة</span></div><div><b id="cS">--</b><span>ثانية</span></div></div>';
}
function startCD(){clearInterval(cdT);var tick=function(){var n=nextM(),el=$("#cD");if(!n||!el)return;
  var s=Math.max(0,Math.floor((new Date(n.date)-Date.now())/1000));
  el.textContent=Math.floor(s/86400);$("#cH").textContent=("0"+Math.floor(s%86400/3600)).slice(-2);
  $("#cM").textContent=("0"+Math.floor(s%3600/60)).slice(-2);$("#cS").textContent=("0"+(s%60)).slice(-2)};
  tick();cdT=setInterval(tick,1000)}

/* ===== الصفحات ===== */
var VIEWS={
  home:function(){
    var m=nextM();
    var nw=C.news.slice().sort(function(a,b){return new Date(b.date)-new Date(a.date)}).slice(0,3);
    var h='<section class="hero"><div class="wrap hero-in"><div class="hero-t">'+
      '<span class="badge"><i></i> اتحاد رفاعة المحلي • الدرجة الثانية</span>'+
      '<h1>نادي وادي <em>التراجمة</em><span>'+esc(C.settings.region)+'</span></h1>'+
      '<p class="lead">«'+esc(C.settings.motto)+'»</p>'+
      '<div class="hero-cta"><a class="btn" href="#/matches" data-nav="matches">⚽ المباريات</a><a class="btn on-dark" href="#/squad" data-nav="squad">👥 الفريق</a></div>'+
      '</div></div></section>';
    h+='<section class="sec"><div class="wrap"><div class="nm-card">'+boardHTML()+'</div>';
    if(m)h+='<div style="margin-top:18px">'+lineupsHTML(m)+'</div>';
    h+='</div></section>';
    h+='<section class="sec alt"><div class="wrap"><div class="sec-head"><div><span class="kick">المركز الإعلامي</span><h2>آخر الأخبار</h2></div><a class="btn sm ghost" href="#/news" data-nav="news">الكل ⬅</a></div>'+
      '<div class="news-g">'+(nw.length?nw.map(newsCard).join(""):emptyState("📰","لا أخبار بعد","أضف الأخبار من لوحة التحكم."))+'</div></div></section>';
    h+='<section class="sec"><div class="wrap"><div class="sec-head"><div><span class="kick">النادي</span><h2>أقسام سريعة</h2></div></div>'+
      '<div class="news-g">'+
      '<a class="card" href="#/matches" data-nav="matches" style="display:block"><h3>⚽ المباريات</h3><p style="color:var(--muted);font-size:.85rem">'+C.matches.length+' مباراة محفوظة</p></a>'+
      '<a class="card" href="#/squad" data-nav="squad" style="display:block"><h3>👥 الفريق</h3><p style="color:var(--muted);font-size:.85rem">'+C.players.length+' لاعبًا</p></a>'+
      '<a class="card" href="#/board" data-nav="board" style="display:block"><h3>🧑‍💼 الإدارة</h3><p style="color:var(--muted);font-size:.85rem">'+C.board.length+' عضوًا</p></a>'+
      '</div></div></section>';
    return h;
  },
  matches:function(){return phero("المباريات <em>والنتائج</em>","كل مباريات الفريق: القادمة والنتائج النهائية.")+
    '<section class="sec" style="padding-top:20px"><div class="wrap">'+searchbar("m","ابحث: خصم، ملعب، بطولة…")+
    '<div class="tabs"><button class="on" data-mt="u">القادمة</button><button data-mt="r">النتائج</button></div><div class="mlist" id="mlist"></div></div></section>'},
  squad:function(){return phero("قائمة <em>الفريق</em>","اللاعبون والخانات والتشكيلة الأساسية للفريق.")+
    '<section class="sec" style="padding-top:20px"><div class="wrap">'+searchbar("p","ابحث: اسم لاعب، خانة، رقم…")+
    '<div class="chips" id="pchips"></div><div class="players" id="plist"></div>'+
    '<div class="sec-head" style="margin-top:30px"><div><span class="kick">الخطة</span><h2>التشكيلة الأساسية</h2></div></div>'+
    '<div class="lu-grid"><div class="lu-col"><h4>'+esc(C.settings.name)+'</h4>'+pitchHTML(autoXI())+'</div>'+
    '<div class="lu-col"><h4>ملاحظة</h4><div class="card" style="color:var(--muted);font-size:.86rem">تُعرض التشكيلة الأساسية تلقائيًا حسب الأكثر مشاركة في كل خانة. تشكيلة كل مباراة تُحدَّد من لوحة التحكم ← المباريات.</div></div></div>'+
    '</div></section>'},
  news:function(){return phero("أخبار <em>النادي</em>","أرشيف كامل لكل مستجدات الفريق والإدارة.")+
    '<section class="sec" style="padding-top:20px"><div class="wrap">'+searchbar("n","ابحث في الأخبار…")+'<div class="news-g" id="nlist"></div></div></section>'},
  board:function(){return phero("إدارة <em>النادي</em>","الهيئة الإدارية والجهاز الفني المشرف على النادي.")+
    '<section class="sec" style="padding-top:20px"><div class="wrap">'+
    (C.board.length?'<div class="bgrid">'+C.board.map(memberCard).join("")+'</div>':emptyState("🧑‍","لم تُضف الإدارة بعد","أضف الأعضاء من لوحة التحكم ← الإدارة."))+'</div></section>'}
};

var BIND={
  home:function(){startCD()},
  matches:function(){
    var render=function(){
      var list=C.matches.filter(function(m){return mtab==="u"?m.status==="upcoming":m.status==="finished"});
      if(Q.m){var q=Q.m.toLowerCase();list=list.filter(function(m){return ((m.opponent||"")+" "+(m.venue||"")+" "+(m.comp||"")).toLowerCase().indexOf(q)>-1})}
      list.sort(function(a,b){return mtab==="u"?new Date(a.date)-new Date(b.date):new Date(b.date)-new Date(a.date)});
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
      var list=C.news.slice().sort(function(a,b){return new Date(b.date)-new Date(a.date)});
      if(Q.n){var q=Q.n.toLowerCase();list=list.filter(function(n){return (n.title+" "+n.ex).toLowerCase().indexOf(q)>-1})}
      $("#sn_n").textContent=list.length;
      $("#nlist").innerHTML=list.length?list.map(newsCard).join(""):emptyState("🔍","لا أخبار مطابقة","");
    };
    bindSearch("n",function(v){Q.n=v},render);render();
  }
};

/* ===== مودال التشكيلة ===== */
function openLu(id){
  var m=C.matches.filter(function(x){return x.id===id})[0];
  if(!m)return;
  $("#modalBody").innerHTML='<h3 style="margin-bottom:4px">تشكيلة المباراة — '+esc(m.opponent)+'</h3>'+
    '<p style="color:var(--muted);font-size:.82rem;margin-bottom:14px">'+fDs(m.date)+' • '+esc(m.venue)+(m.status==="finished"?" • النتيجة: "+m.my+" – "+m.op:"")+'</p>'+lineupsHTML(m);
  $("#modal").classList.add("on");document.body.classList.add("lock");
}
function closeModal(){$("#modal").classList.remove("on");document.body.classList.remove("lock")}

/* ===== SEO ===== */
function updateMeta(v){
  var d={home:"الموقع الرسمي لنادي وادي التراجمة — المباراة القادمة والنتائج والأخبار",
    matches:"جدول مباريات ونتائج نادي وادي التراجمة في دوري الدرجة الثانية",
    squad:"قائمة لاعبي نادي وادي التراجمة والتشكيلة الأساسية",
    news:"آخر أخبار نادي وادي التراجمة ريفي رفاعة",
    board:"الهيئة الإدارية لنادي وادي التراجمة"}[v]||"";
  document.title=TITLES[v]+" | وادي التراجمة";
  var el=document.querySelector('meta[name="description"]');if(el)el.setAttribute("content",d);
}

var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add("on");io.unobserve(en.target)}})},{threshold:.08});
function reveal(){$$(".card,.sec-head,.nm-card,.phero .wrap,.hero-in").forEach(function(el){el.classList.add("rv");io.observe(el)})}
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
  $("#burger").onclick=function(){var d=$("#drawer");if(d.classList.contains("on"))closeDrawer();else{d.classList.add("on");$("#scrim").classList.add("on");$("#burger").classList.add("on");document.body.classList.add("lock")}};
  $("#dclose").onclick=closeDrawer;$("#scrim").onclick=closeDrawer;
  $("#themeBtn").onclick=function(){setTheme(document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark")};
  $("#modalX").onclick=closeModal;$("#modal").onclick=function(e){if(e.target.id==="modal")closeModal()};
  setTheme((function(){try{return localStorage.getItem(TK)}catch(e){return null}})()||"light");
  if(!bound){bound=true;
    document.addEventListener("keydown",function(e){if(e.key==="Escape"){closeDrawer();closeModal()}});
    document.addEventListener("click",function(e){
      var lu=e.target.closest?e.target.closest("[data-lu]"):null;
      if(lu){openLu(+lu.dataset.lu);return}
      var a=e.target.closest?e.target.closest("[data-nav]"):null;
      if(a){e.preventDefault();go(a.dataset.nav)}
    });
    window.addEventListener("hashchange",route);
    window.addEventListener("storage",function(e){if(e.key===KEY){load();route()}});
  }
}

load();buildChrome();route();
try{fetch("/api/data",{cache:"no-store"}).then(function(r){return r.ok?r.json():null}).then(function(d){
  if(d){C=merge(clone(SEED),d);try{localStorage.setItem(KEY,JSON.stringify(C))}catch(e){}load();buildChrome();route()}
}).catch(function(){})}catch(e){}
})();
