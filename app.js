/* Cloudflare Worker — Bindings: DB(D1) MEDIA(R2) ASSETS ADMIN_PASS(Secret إلزامي)
   يُشغَّل على Cloudflare Pages عبر _worker.js في الجذر — بدون مجلدات جديدة */
const enc=new TextEncoder();let ready=false;
const SEED={settings:{name:"الوادي التراجمة",region:"ريفي رفاعة",motto:"من قلب الوادي.. نلعب باسم الديار",
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
  {id:4,name:"ياسر إبراهيم",role:"إداري الفريق",phone:""}]};
const J=(d,s=200)=>new Response(JSON.stringify(d),{status:s,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}});
const hx=b=>[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("");
const cl=(v,n=400)=>String(v??"").trim().slice(0,n);
const hs=async(p,s)=>{const k=await crypto.subtle.importKey("raw",enc.encode(p),"PBKDF2",false,["deriveBits"]);return hx(await crypto.subtle.deriveBits({name:"PBKDF2",salt:enc.encode(s),iterations:100000,hash:"SHA-256"},k,256))};
const mg=(a,b)=>{if(b==null)return a;if(Array.isArray(a)||Array.isArray(b))return b;if(typeof a==="object"&&typeof b==="object"){const o={...a};for(const k in b)o[k]=k in a?mg(a[k],b[k]):b[k];return o}return b};
/* الرسائل لا تُخزَّن داخل content ولا تظهر في /api/data العام */
const strip=d=>{const o={...d};delete o.messages;return o};
/* حد محاولات بسيط per IP (دخول/رسائل) */
const RL=new Map();
const rl=(k,max,win)=>{const n=Date.now(),e=RL.get(k);if(!e||n-e.t>win){RL.set(k,{t:n,c:1});return true}e.c++;return e.c<=max};
async function init(E){if(ready)return;await E.DB.batch([
 E.DB.prepare("CREATE TABLE IF NOT EXISTS content(id INTEGER PRIMARY KEY,data TEXT NOT NULL,updated_at TEXT DEFAULT (datetime('now')))"),
 E.DB.prepare("CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT,username TEXT UNIQUE NOT NULL,salt TEXT NOT NULL,hash TEXT NOT NULL)"),
 E.DB.prepare("CREATE TABLE IF NOT EXISTS sessions(token TEXT PRIMARY KEY,username TEXT NOT NULL,expires_at TEXT NOT NULL)"),
 E.DB.prepare("CREATE TABLE IF NOT EXISTS messages(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,phone TEXT,topic TEXT,body TEXT NOT NULL,created_at TEXT DEFAULT (datetime('now')),read INTEGER DEFAULT 0)"),
 E.DB.prepare("INSERT OR IGNORE INTO content(id,data) VALUES(1,?)").bind(JSON.stringify(SEED))]);ready=true}
const getC=async E=>{const r=await E.DB.prepare("SELECT data FROM content WHERE id=1").first();return r?mg(structuredClone(SEED),JSON.parse(r.data)):structuredClone(SEED)};
const putC=async(E,d)=>E.DB.prepare("INSERT INTO content(id,data,updated_at) VALUES(1,?,datetime('now')) ON CONFLICT(id) DO UPDATE SET data=excluded.data,updated_at=datetime('now')").bind(JSON.stringify(strip(d))).run();
const au=async(r,E)=>{const t=(r.headers.get("authorization")||"").replace(/^Bearer\s+/i,"");if(!t)return null;const s=await E.DB.prepare("SELECT username,expires_at FROM sessions WHERE token=?").bind(t).first();if(!s)return null;if(new Date(s.expires_at)<new Date()){await E.DB.prepare("DELETE FROM sessions WHERE token=?").bind(t).run();return null}return{token:t,username:s.username}};
export default{async fetch(r,E){const u=new URL(r.url);if(!u.pathname.startsWith("/api/"))return E.ASSETS.fetch(r);
 try{await init(E);const p=u.pathname.slice(5),m=r.method,ip=r.headers.get("cf-connecting-ip")||"0";
  if(p==="data"&&m==="GET")return J(strip(await getC(E)));
  if(p.startsWith("media/")){const o=await E.MEDIA.get(p.slice(6));if(!o)return new Response("404",{status:404});return new Response(o.body,{headers:{"content-type":o.httpMetadata?.contentType||"image/jpeg","cache-control":"public,max-age=31536000,immutable","etag":o.httpEtag}})}
  if(p==="login"&&m==="POST"){
   if(!rl("l:"+ip,8,6e5))return J({error:"محاولات كثيرة — انتظر قليلًا"},429);
   const b=await r.json().catch(()=>({}));const un=cl(b.username,60)||"admin",pw=String(b.password||"");
   const c=await E.DB.prepare("SELECT COUNT(*) c FROM users").first();
   if(!c.c){if(!E.ADMIN_PASS)return J({error:"ADMIN_PASS غير مضبوط في إعدادات الخادم"},503);
    if(pw!==E.ADMIN_PASS)return J({error:"بيانات الدخول خاطئة"},401);
    const s=crypto.randomUUID();await E.DB.prepare("INSERT INTO users(username,salt,hash) VALUES(?,?,?)").bind("admin",s,await hs(pw,s)).run()}
   const usr=await E.DB.prepare("SELECT * FROM users WHERE username=?").bind(un).first();
   if(!usr||usr.hash!==await hs(pw,usr.salt))return J({error:"بيانات الدخول خاطئة"},401);
   await E.DB.prepare("DELETE FROM sessions WHERE expires_at<?").bind(new Date().toISOString()).run();
   const t=crypto.randomUUID().replace(/-/g,"")+crypto.randomUUID().replace(/-/g,"");
   await E.DB.prepare("INSERT INTO sessions(token,username,expires_at) VALUES(?,?,?)").bind(t,usr.username,new Date(Date.now()+30*864e5).toISOString()).run();
   return J({token:t,username:usr.username})}
  if(p==="messages"&&m==="POST"){
   if(!rl("m:"+ip,5,36e5))return J({error:"رسائل كثيرة — حاول لاحقًا"},429);
   const b=await r.json().catch(()=>({}));const n=cl(b.name,120),bd=cl(b.body,1500);
   if(!n||!bd)return J({error:"ناقص"},400);
   await E.DB.prepare("INSERT INTO messages(name,phone,topic,body) VALUES(?,?,?,?)").bind(n,cl(b.phone,40),cl(b.topic,60)||"أخرى",bd).run();return J({ok:1})}
  const s=await au(r,E);if(!s)return J({error:"غير مصرح"},401);
  if(p==="admin"&&m==="GET"){const c=await getC(E);c.messages=(await E.DB.prepare("SELECT * FROM messages ORDER BY id DESC LIMIT 300").all()).results.map(x=>({...x,read:!!x.read}));return J({content:c,username:s.username})}
  if(p==="admin"&&m==="POST"){const d=await r.json().catch(()=>null);if(!d||typeof d!=="object")return J({error:"سيء"},400);if(JSON.stringify(d).length>2e6)return J({error:"كبير"},413);await putC(E,d);return J({ok:1})}
  if(p==="messages"&&m==="PATCH"){const b=await r.json().catch(()=>({}));const id=parseInt(b.id,10);if(!id)return J({error:"ناقص"},400);await E.DB.prepare("UPDATE messages SET read=? WHERE id=?").bind(b.read?1:0,id).run();return J({ok:1})}
  if(p==="messages"&&m==="DELETE"){const b=await r.json().catch(()=>({}));const id=parseInt(b.id,10);if(!id)return J({error:"ناقص"},400);await E.DB.prepare("DELETE FROM messages WHERE id=?").bind(id).run();return J({ok:1})}
  if(p==="logout"&&m==="POST"){await E.DB.prepare("DELETE FROM sessions WHERE token=?").bind(s.token).run();return J({ok:1})}
  if(p==="password"&&m==="POST"){const b=await r.json().catch(()=>({}));const usr=await E.DB.prepare("SELECT * FROM users WHERE username=?").bind(s.username).first();if(!usr||usr.hash!==await hs(String(b.current||""),usr.salt))return J({error:"الحالية خاطئة"},401);if(String(b.next||"").length<6)return J({error:"قصيرة"},400);const sl=crypto.randomUUID();await E.DB.prepare("UPDATE users SET salt=?,hash=? WHERE username=?").bind(sl,await hs(b.next,sl),s.username).run();await E.DB.prepare("DELETE FROM sessions").run();return J({ok:1})}
  if(p==="upload"&&m==="POST"){const f=await r.formData(),file=f.get("file");if(!file||!file.size)return J({error:"لا ملف"},400);if(file.size>5*1024*1024)return J({error:"كبير"},413);if(!String(file.type||"").startsWith("image/"))return J({error:"صور فقط"},400);
   const ok=["jpg","jpeg","png","webp","gif","avif"];let ex=(file.name.split(".").pop()||"jpg").toLowerCase().replace(/[^a-z0-9]/g,"");if(!ok.includes(ex))ex="jpg";
   const k="m/"+Date.now()+"-"+Math.random().toString(36).slice(2,9)+"."+ex;
   await E.MEDIA.put(k,file.stream(),{httpMetadata:{contentType:file.type}});return J({url:"/api/media/"+k,key:k})}
  return J({error:"404"},404)}catch(e){return J({error:e.message||"خطأ"},500)}}};
