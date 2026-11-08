/* ===== V3: إدارة المنتجات بتبويبات + AI CORE (Gemini عبر Worker) ===== */
(function(){const st=document.createElement("style");st.textContent=`
.ptabs,.itabs{display:flex;gap:6px;overflow-x:auto;padding-bottom:8px;margin-bottom:6px}
.ptabs button,.itabs button{white-space:nowrap}
.ptabs .on,.itabs .on{background:rgba(214,180,91,.18);border-color:rgba(214,180,91,.6);color:var(--gold)}
.ptool{display:grid;grid-template-columns:1fr;gap:6px;margin-bottom:10px}
@media(min-width:600px){.ptool{grid-template-columns:2fr 1fr 1fr}}
.ptool input,.ptool select{margin:0}
.pkh{margin:10px 0 4px;color:var(--gold);font-weight:700;font-size:14px}
.pkr{gap:6px}
.apc textarea{margin:6px 0;width:100%}
.aiout{white-space:pre-wrap;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:10px;margin:8px 0;font-size:14px;overflow-wrap:anywhere}
.ipane{display:none}.ipane.on{display:block}
.chk{display:flex;align-items:center;gap:8px;margin:8px 0}.chk input{width:auto;margin:0}
`;document.head.appendChild(st)})();
/* --- بيانات الأساس + applyData --- */
const BASE3=new Map(P.filter(p=>!p.custom).map(p=>[p.id,{n:{ar:p.n.ar,en:p.n.en},lab:p.pk.map(k=>k[0]),pr:BASE2.get(p.id).slice(),eta:{ar:p.eta.ar,en:p.eta.en},dm:{ar:p.dm.ar,en:p.dm.en},pid:p.pid?1:0}]));
const lab0=l=>Array.isArray(l)?l[0]:l;
applyData=function(d){
  D=d||{};CODES=D.codes||{};
  for(let i=P.length-1;i>=0;i--)if(P[i].custom)P.splice(i,1);
  Object.keys(T.ar.cat).forEach(k=>{if(BASE_CATS.indexOf(k)<0){delete T.ar.cat[k];delete T.en.cat[k]}});
  (D.cats||[]).forEach(c=>{T.ar.cat[c.id]=c.ar;T.en.cat[c.id]=c.en||c.ar;CI[c.id]=c.ic||"🛒"});
  const ids=catIds();
  P.forEach(p=>{
    const b=BASE3.get(p.id),o=(D.prices||{})[p.id],pov=(D.pov||{})[p.id],pc=(D.pc||{})[p.id];
    p.n={ar:b.n.ar,en:b.n.en};p.desc="";p.eta={ar:b.eta.ar,en:b.eta.en};p.dm={ar:b.dm.ar,en:b.dm.en};p.pid=b.pid;
    p.pk=b.lab.map((l,i)=>[l,o&&o[i]!=null?+o[i]:b.pr[i]]);
    if(pov){p.n={ar:pov.n||b.n.ar,en:pov.ne||pov.n||b.n.en};p.desc=pov.desc||"";if(pov.eta!=null)p.eta={ar:pov.eta,en:pov.eta};if(pov.dm!=null)p.dm={ar:pov.dm,en:pov.dm};p.pid=pov.pid?1:0;p.pk=(pov.pk||[]).map(k=>[k[0],+k[1]])}
    p.c=pc&&ids.indexOf(pc)>=0?pc:p.c0});
  (D.prods||[]).forEach(cp=>{P.push({id:cp.id,c:cp.c,c0:cp.c,i:"🛒",n:{ar:cp.n,en:cp.ne||cp.n},desc:cp.desc||"",pk:cp.pk.map(k=>[k[0],k[1]]),pid:cp.pid?1:0,real:1,eta:{ar:cp.eta||"",en:cp.eta||""},dm:{ar:cp.dm||"",en:cp.dm||""},custom:1});IMG[cp.id]="img/p"+cp.id+".jpg"});
  const offAll=D.off||[];
  P.forEach(p=>{p.off=offAll.includes(p.id)&&!P.every(q=>offAll.includes(q.id))});
  cart=cart.filter(x=>P.some(p=>p.id===x.id&&!p.off&&p.pk[x.k]));
};
openP=function(id){
  const p=P.find(x=>x.id==id);sel=0;
  const draw=()=>{$("#ps").innerHTML=(IMG[p.id]?`<img class="pimg" src="${IMG[p.id]}" alt="${esc_(p.n[L])}" onerror="this.remove()">`:"")+`<h2>${esc_(p.n[L])}</h2><p class="mut">${esc_(p.dm[L])} · ${t("eta")}: ${esc_(p.eta[L])} · ${t("avail")}</p>${p.desc?`<p style="margin:8px 0">${esc_(p.desc)}</p>`:""}<p style="margin-top:10px">${t("pkg")}</p><div class="pk">${p.pk.map((k,j)=>`<button class="ghost ${j===sel?"on":""}" data-k="${j}">${esc_(lb(k))} — ${egp(k[1])}</button>`).join("")}</div>${p.pid?`<input id="pidIn" placeholder="${t("pid")}" inputmode="numeric">`:""}<h2>${egp(p.pk[sel][1])}</h2><button class="btn" id="addB">${t("add")}</button> <button class="ghost" data-x="pm">${t("close")}</button>`;
    $("#ps").querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>{sel=+b.dataset.k;draw()});
    $("#addB").onclick=()=>{let pid="";if(p.pid){pid=$("#pidIn").value.trim();if(!/^\d{5,14}$/.test(pid)){$("#pidIn").style.borderColor="#c55";return}}
      const key=p.id+"-"+sel+"-"+pid,ex=cart.find(x=>x.key===key);ex?ex.q++:cart.push({key,id:p.id,k:sel,pid,q:1});save();ui();$("#pm").classList.remove("on");const cb=$("#cartBtn");cb.classList.remove("bump");void cb.offsetWidth;cb.classList.add("bump")};
  };draw();$("#pm").classList.add("on");
};
const _uiV=ui;ui=function(){_uiV();const b=document.getElementById("aiBtn");if(b)b.style.display=(D.ai&&D.ai.show===0)?"none":""};
/* --- Gemini عبر الـ Worker (من جهة العميل) --- */
const AIW=()=>((D.ai||{}).url||"").replace(/\/+$/,"");
const GEN_FB=/^(معنديش إجابة مؤكدة|I don't have a confirmed answer)/;
const LOCAL_WORDS=["تتبع","track","فين طلبي","حاله الطلب","حاله طلبي","فين الاوردر","order status","where is my order","موظف","خدمه العملاء","اكلم","كلم","مسؤول","واتس","دعم","شخص","human","agent","support","whatsapp","complaint","شكوي"];
const fbk=a=>{if(a&&GEN_FB.test(a.t)&&(D.ai||{}).fb)a.t=D.ai.fb;return a};
(function wait(){
  if(typeof aiAnswer!=="function"||typeof aiOpen!=="function"||!document.getElementById("aiBtn")){setTimeout(wait,50);return}
  const old=aiAnswer,oldOpen=aiOpen;
  aiAnswer=async function(raw){
    const n=nz(raw),ai=D.ai||{},local=AI.pend||/VX[-\s]?[A-Za-z0-9]{6}/i.test(raw)||any(n,LOCAL_WORDS)||(raw.toUpperCase().match(/[A-Z0-9_-]{3,}/g)||[]).some(x=>CODES[x]);
    if(local||!AIW()||ai.on===0)return fbk(await old(raw));
    try{
      const ac=new AbortController(),tm=setTimeout(()=>ac.abort(),15000);
      const hist=AI.h.slice(0,-1).slice(-6).map(m=>({r:m.r==="u"?"u":"a",t:String(m.t).slice(0,600)}));
      let r;try{r=await fetch(AIW()+"/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({m:raw.slice(0,400),h:hist,l:L}),signal:ac.signal})}finally{clearTimeout(tm)}
      const j=await r.json();if(!r.ok||!j.t)throw 1;
      const ar=/[\u0600-\u06FF]/.test(raw),ch=findP(nz(j.t)).slice(0,3).map(p=>chipP(p,ar));
      if(/واتساب|whatsapp/i.test(j.t))ch.push({l:ar?"💬 كلّم الدعم على واتساب":"💬 Chat with support on WhatsApp",a:"w:"+(ar?"مرحباً VEXORA، محتاج مساعدة: ":"Hello VEXORA, I need help: ")+raw.slice(0,200)});
      return{t:j.t,c:ch};
    }catch(e){return fbk(await old(raw))}
  };
  aiOpen=function(){oldOpen();const h=document.querySelector("#aim h2");if(h)h.textContent=((D.ai||{}).name||"VEXORA AI")+" ✦"};
  document.getElementById("aiBtn").onclick=()=>aiOpen();
  ui();
})();
/* --- الأدمن: إدارة المنتجات + AI CORE --- */
const toItem=p=>({id:p.id,custom:!!p.custom,n:p.n.ar,ne:p.n.en===p.n.ar?"":p.n.en,desc:p.desc||"",c:p.c,on:(D.off||[]).indexOf(p.id)<0,eta:p.eta.ar,dm:p.dm.ar,pid:!!p.pid,pk:p.pk.map(k=>({l:lab0(k[0]),p:k[1]}))});
const nm_=s=>String(s||"").trim().toLowerCase().replace(/\s+/g," ");
function ptabsHtml(){
  const cs=wCats();
  return '<div class="ptabs">'+[{id:"all",ar:"الكل",ic:"📋"}].concat(cs).map(c=>'<button class="ghost'+(W.ptab===c.id?" on":"")+'" data-act="ptab" data-id="'+c.id+'">'+c.ic+" "+esc_(c.ar)+" ("+(c.id==="all"?W.items.length:W.items.filter(i=>i.c===c.id).length)+")</button>").join("")+"</div>";
}
function cardHtml(it){
  const f=k=>'data-it="'+it.id+":"+k+'"';
  return '<div class="apc"><div class="aph"><b>'+esc_(it.n||"—")+'</b><label class="mut"><input type="checkbox" '+f("on")+(it.on?" checked":"")+' style="width:auto;margin:0 4px">ظاهر</label></div>'+
   '<input '+f("n")+' value="'+esc_(it.n)+'" placeholder="اسم المنتج (عربي)" maxlength="60"><input '+f("ne")+' value="'+esc_(it.ne)+'" placeholder="الاسم بالإنجليزي (اختياري)" maxlength="60" dir="ltr"><textarea '+f("desc")+' rows="2" placeholder="وصف المنتج (اختياري)" maxlength="300">'+esc_(it.desc)+'</textarea>'+
   '<select '+f("c")+'>'+catOpts(it.c)+'</select><input '+f("eta")+' value="'+esc_(it.eta)+'" placeholder="وقت التسليم" maxlength="60"><input '+f("dm")+' value="'+esc_(it.dm)+'" placeholder="طريقة التسليم" maxlength="60">'+
   '<label class="mut chk"><input type="checkbox" '+f("pid")+(it.pid?" checked":"")+'>يطلب Player ID</label>'+
   '<label class="ghost" style="font-size:12px;padding:4px 10px;cursor:pointer;display:inline-block">📷 صورة<input type="file" accept="image/*" data-up="'+it.id+'" hidden></label>'+(it.custom?' <button class="ghost" data-act="delitem" data-id="'+it.id+'">🗑 حذف المنتج</button>':"")+
   '<div class="pkh">الباقات</div>'+it.pk.map((k,i)=>'<div class="row pkr"><input data-pk="'+it.id+":"+i+':l" value="'+esc_(k.l)+'" placeholder="اسم الباقة" maxlength="60" style="flex:1;margin:0;min-width:0"><input type="number" min="0" data-pk="'+it.id+":"+i+':p" value="'+k.p+'" style="width:90px;margin:0"><button class="ghost" data-act="delpk" data-id="'+it.id+":"+i+'" aria-label="حذف الباقة">✕</button></div>').join("")+'<button class="ghost" data-act="addpk" data-id="'+it.id+'" style="margin-top:6px">+ باقة</button></div>';
}
function listHtml(){
  let a=W.items.filter(i=>W.ptab==="all"||i.c===W.ptab);
  const q=nm_(W.q);if(q)a=a.filter(i=>nm_(i.n).indexOf(q)>=0||nm_(i.ne).indexOf(q)>=0);
  if(W.flt==="on")a=a.filter(i=>i.on);if(W.flt==="off")a=a.filter(i=>!i.on);
  const mp=i=>Math.min(...i.pk.map(k=>+k.p||0));
  if(W.sort==="name")a=a.slice().sort((x,y)=>x.n.localeCompare(y.n,"ar"));
  if(W.sort==="pa")a=a.slice().sort((x,y)=>mp(x)-mp(y));
  if(W.sort==="pd")a=a.slice().sort((x,y)=>mp(y)-mp(x));
  return a.length?a.map(cardHtml).join(""):'<p class="mut">مفيش منتجات مطابقة.</p>';
}
const paneP3=()=>'<div id="ptabs">'+ptabsHtml()+'</div><div class="ptool"><input id="pq" placeholder="🔍 بحث باسم المنتج" value="'+esc_(W.q)+'"><select id="psort"><option value="def">الترتيب الافتراضي</option><option value="name"'+(W.sort==="name"?" selected":"")+'>الاسم</option><option value="pa"'+(W.sort==="pa"?" selected":"")+'>السعر: الأقل أولاً</option><option value="pd"'+(W.sort==="pd"?" selected":"")+'>السعر: الأعلى أولاً</option></select><select id="pf"><option value="all">كل الحالات</option><option value="on"'+(W.flt==="on"?" selected":"")+'>المعروضة</option><option value="off"'+(W.flt==="off"?" selected":"")+'>المخفية</option></select></div><div id="pl" class="apg">'+listHtml()+"</div>";
const paneNP3=()=>'<input id="np_ar" placeholder="اسم المنتج بالعربي" maxlength="60"><input id="np_en" placeholder="الاسم بالإنجليزي (اختياري)" maxlength="60" dir="ltr"><textarea id="np_desc" rows="2" placeholder="وصف المنتج (اختياري)" maxlength="300" style="width:100%"></textarea><select id="np_c">'+catOpts("")+'</select><textarea id="np_pk" rows="4" placeholder="الباقات: سطر لكل باقة بالشكل ده&#10;60 UC | 50&#10;325 UC | 250" style="width:100%"></textarea><input id="np_eta" placeholder="وقت التسليم (مثال: خلال دقائق)" maxlength="60"><input id="np_dm" placeholder="طريقة التسليم (مثال: كود رقمي)" maxlength="60"><label class="mut chk"><input type="checkbox" id="np_pid">يطلب Player ID</label><button class="btn" data-act="addprod">إضافة المنتج</button>'+(W.items.some(i=>i.custom)?'<h3 style="margin-top:18px">منتجاتك الجديدة</h3>'+W.items.filter(i=>i.custom).map(p=>'<span class="ghost chipx">'+esc_(p.n)+' <button class="ghost" data-act="delitem" data-id="'+p.id+'" style="padding:0 8px">🗑</button></span>').join(""):"");
function paneAI(){
  const a=D.ai||{},v=(k,d)=>esc_(a[k]!=null?a[k]:d);
  const tabs=[["g","عام"],["a","إعداد الـ API"],["i","التعليمات"],["k","قاعدة المعرفة"],["u","الاستخدام"],["t","محادثة تجريبية"],["d","فحص الاتصال"]];
  return '<div class="itabs">'+tabs.map((x,i)=>'<button class="ghost'+(i?"":" on")+'" data-act="itab" data-id="'+x[0]+'">'+x[1]+"</button>").join("")+"</div>"+
   '<div class="ipane on" data-ip="g"><label class="chk"><input type="checkbox" id="ai_on" '+(a.on===0?"":"checked")+'>تفعيل Gemini (لو مقفول المساعد بيشتغل بالنظام المحلي)</label><label class="chk"><input type="checkbox" id="ai_show" '+(a.show===0?"":"checked")+'>إظهار زر المساعد في الموقع</label><input id="ai_name" maxlength="40" value="'+v("name","VEXORA AI")+'" placeholder="اسم المساعد"><textarea id="ai_fb" rows="2" maxlength="300" placeholder="رد احتياطي لما المساعد مايعرفش إجابة" style="width:100%">'+v("fb","")+'</textarea></div>'+
   '<div class="ipane" data-ip="a"><p class="mut">مفتاح Gemini بيتحط كسر (Secret) في إعدادات الـ Worker بس، ومبيتعرضش هنا ولا بيتحفظ في الموقع.</p><input id="ai_url" dir="ltr" maxlength="200" value="'+v("url","")+'" placeholder="رابط الـ Worker (https://...workers.dev)"><input id="ai_model" dir="ltr" list="ai_models" maxlength="80" value="'+v("model","")+'" placeholder="النموذج (اتركه فاضي للاختيار التلقائي)"><datalist id="ai_models"></datalist><button class="ghost" data-act="aimodels">تحميل النماذج المتاحة</button><label class="mut">أقصى طول للرد (200–1000)<input type="number" id="ai_max" min="200" max="1000" value="'+v("max",600)+'"></label><label class="mut">أقصى طلبات للزائر في الدقيقة<input type="number" id="ai_rpm" min="1" max="60" value="'+v("rpm",8)+'"></label><label class="mut">أقصى طلبات في اليوم<input type="number" id="ai_cap" min="10" max="5000" value="'+v("cap",400)+'"></label><div class="aiout" id="ai_key">حالة المفتاح: اضغط "فحص الاتصال".</div></div>'+
   '<div class="ipane" data-ip="i"><textarea id="ai_persona" rows="3" maxlength="600" placeholder="شخصية المساعد (مثال: ودود ومختصر)" style="width:100%">'+v("persona","")+'</textarea><textarea id="ai_instr" rows="6" maxlength="1500" placeholder="تعليمات إضافية (مثال: ما تتكلمش في السياسة). القواعد الأمنية الأساسية ثابتة ومش بتتغير." style="width:100%">'+v("instr","")+'</textarea></div>'+
   '<div class="ipane" data-ip="k"><p class="mut">كلمات مفتاحية (بفاصلة) + إجابة. بتتبعت لـ Gemini كمعلومات موثقة، وبيستخدمها المساعد المحلي كمان.</p><div id="kl">'+(D.kb||[]).map(x=>kbRow(x.k,x.a)).join("")+'</div><button class="ghost" id="ka">+ إجابة جديدة</button></div>'+
   '<div class="ipane" data-ip="u"><button class="ghost" data-act="aistats">تحديث الإحصائيات</button><div class="aiout" id="ai_stats">اضغط تحديث.</div><p class="mut">الأرقام جاية من الـ Worker (عدد الطلبات والتوكنز اللي Gemini بيبلّغ عنها). مفيش بيانات فواتير حقيقية هنا.</p></div>'+
   '<div class="ipane" data-ip="t"><input id="ai_tq" maxlength="400" placeholder="اكتب سؤال للتجربة"><button class="btn" data-act="aitest">إرسال</button><div class="aiout" id="ai_tout"></div></div>'+
   '<div class="ipane" data-ip="d"><button class="btn" data-act="aidiag">تشغيل الفحص</button><div class="aiout" id="ai_diag">اضغط تشغيل الفحص.</div></div>';
}
const RS={invalid_key:"المفتاح غير صالح",permission:"المفتاح مالوش صلاحية",model:"النموذج غير متاح",rate:"وصلت للحد الأقصى للطلبات",down:"خدمة Gemini مش متاحة حالياً",timeout:"انتهت المهلة",no_key:"المفتاح مش مضاف في إعدادات الـ Worker",error:"خطأ غير معروف",empty:"رد فاضي",config:"إعدادات الـ Worker ناقصة",data:"الـ Worker مش قادر يقرا بيانات الموقع"};
async function wk(path,opt){
  const u=(g_("ai_url")?g_("ai_url").value.trim():AIW()).replace(/\/+$/,"");if(!/^https:\/\//.test(u))throw "no_url";
  const o=opt||{},ac=new AbortController(),tm=setTimeout(()=>ac.abort(),20000);
  try{const r=await fetch(u+path,{method:o.method||"GET",headers:Object.assign({"Content-Type":"application/json"},o.auth===false?{}:{Authorization:"Bearer "+GH.t}),body:o.body,signal:ac.signal});let j=null;try{j=await r.json()}catch(e){}return{status:r.status,j:j}}finally{clearTimeout(tm)}
}
openA=function(tab){
  const s=modal_();
  ACTS=typeof tab==="string"?tab:null;
  W={items:P.map(toItem),cats:cl_(D.cats||[]),offers:cl_(D.offers||[]),ptab:"all",q:"",sort:"def",flt:"all"};
  const secs=[
    ["p","📦","المنتجات",'<div id="pp">'+paneP3()+"</div>"],
    ["c","🗂","الخانات (الأقسام)",'<div id="pc">'+paneC()+"</div>"],
    ["n","➕","إضافة منتج جديد",'<div id="pn">'+paneNP3()+"</div>"],
    ["o","🔥","العروض",'<div id="po">'+paneO()+"</div>"],
    ["d","🏷","الخصومات",'<div><p class="mut">لكل كود: النسبة + الفئة اللي ينطبق عليها (أو كل المنتجات).</p><div id="cl">'+Object.entries(CODES).map(c=>codeRow(c[0],c[1])).join("")+'</div><button class="ghost" id="ca">+ كود جديد</button></div>'],
    ["k","🤖","AI CORE",'<div>'+paneAI()+"</div>"],
    ["r","📋","الطلبات",'<div><p class="mut">تحديث حالة الطلبات والرسائل للعملاء.</p><button class="btn" data-act="orders">📦 فتح إدارة تتبع الطلبات</button></div>']];
  s.innerHTML='<h2>لوحة التحكم</h2>'+secs.map(x=>'<div class="asec" data-sec="'+x[0]+'"><button type="button" class="ash" aria-expanded="false" aria-controls="ab_'+x[0]+'"><span class="asi">'+x[1]+'</span><span class="ast">'+x[2]+'</span><i class="chev" aria-hidden="true">▾</i></button><div class="acc-body" id="ab_'+x[0]+'" inert aria-hidden="true"><div class="acc-in">'+x[3]+"</div></div></div>").join("")+
   '<div class="asave"><div class="note" id="amsg">التعديلات تظهر للعملاء بعد "حفظ".</div><button class="btn" id="sv">حفظ</button> <button class="ghost" data-x="am">إغلاق</button></div>';
  const openSec=k=>{ACTS=k;s.querySelectorAll(".asec").forEach(x=>{const o=x.dataset.sec===k,b=x.querySelector(":scope>.acc-body");x.classList.toggle("open",o);b.inert=!o;b.setAttribute("aria-hidden",o?"false":"true");x.querySelector(":scope>.ash").setAttribute("aria-expanded",o?"true":"false")})};
  openSec(ACTS);
  const msg=m=>{g_("amsg").textContent=m},it_=id=>W.items.find(x=>x.id===+id);
  const rePL=()=>{g_("ptabs").innerHTML=ptabsHtml();g_("pl").innerHTML=listHtml()};
  const reAll=()=>{g_("pc").innerHTML=paneC();g_("pn").innerHTML=paneNP3();g_("pp").innerHTML=paneP3()};
  const out=(id,t_)=>{g_(id).textContent=t_};
  g_("ca").onclick=()=>g_("cl").insertAdjacentHTML("beforeend",codeRow("",10));
  g_("ka").onclick=()=>g_("kl").insertAdjacentHTML("beforeend",kbRow("",""));
  s.onclick=async e=>{
    const h=e.target.closest(".ash");if(h){const k=h.parentElement.dataset.sec;openSec(ACTS===k?null:k);setTimeout(()=>{try{h.scrollIntoView({behavior:"smooth",block:"nearest"})}catch(x){}},400);return}
    const a=e.target.closest("[data-act]");
    if(a){const k=a.dataset.act,id=a.dataset.id;
      if(k==="orders"){openOrders();return}
      if(k==="ptab"){W.ptab=id;rePL();return}
      if(k==="itab"){s.querySelectorAll(".itabs button").forEach(b=>b.classList.toggle("on",b===a));s.querySelectorAll(".ipane").forEach(p=>p.classList.toggle("on",p.dataset.ip===id));return}
      if(k==="addpk"){const it=it_(id);if(it.pk.length>=30){msg("وصلت للحد الأقصى للباقات.");return}it.pk.push({l:"",p:0});rePL();return}
      if(k==="delpk"){const q=id.split(":"),it=it_(q[0]);if(it.pk.length<=1){msg("لازم يفضل في المنتج باقة واحدة على الأقل.");return}it.pk.splice(+q[1],1);rePL();return}
      if(k==="delitem"){W.items=W.items.filter(x=>String(x.id)!==id);reAll();return}
      if(k==="addcat"){const ar=g_("nc_ar").value.trim();if(!ar){msg("اكتب اسم الخانة.");return}
        if(wCats().some(c=>nm_(c.ar)===nm_(ar))){msg("فيه خانة بنفس الاسم.");return}
        if(W.cats.length>=20){msg("وصلت للحد الأقصى للخانات.");return}
        W.cats.push({id:"c"+Date.now().toString(36),ar:ar.slice(0,40),en:g_("nc_en").value.trim().slice(0,40),ic:(g_("nc_ic").value.trim()||"🛒").slice(0,4)});reAll();msg("اتضافت الخانة. ضيف فيها منتجات أو انقل منتجات ليها، وبعدين اضغط حفظ.");return}
      if(k==="delcat"){if(W.items.some(p=>p.c===id)){msg("في منتجات جوه الخانة دي. انقلها الأول.");return}W.cats=W.cats.filter(c=>c.id!==id);reAll();return}
      if(k==="addprod"){const n=g_("np_ar").value.trim(),pk=[];
        g_("np_pk").value.split("\n").forEach(l=>{const i=l.lastIndexOf("|");if(i<0)return;const lb_=l.slice(0,i).trim(),pr=Math.round(+l.slice(i+1).replace(/[^\d.]/g,""));if(lb_&&pr>=0)pk.push({l:lb_.slice(0,60),p:pr})});
        if(!n){msg("اكتب اسم المنتج.");return}if(W.items.some(x=>nm_(x.n)===nm_(n))){msg("فيه منتج بنفس الاسم.");return}
        if(!pk.length){msg("اكتب باقة واحدة على الأقل بالشكل: الاسم | السعر");return}if(W.items.filter(x=>x.custom).length>=100){msg("وصلت للحد الأقصى.");return}
        W.items.push({id:Math.max(99,...W.items.map(x=>x.id))+1,custom:true,n:n.slice(0,60),ne:g_("np_en").value.trim().slice(0,60),desc:g_("np_desc").value.trim().slice(0,300),c:g_("np_c").value,on:true,eta:g_("np_eta").value.trim().slice(0,60),dm:g_("np_dm").value.trim().slice(0,60),pid:g_("np_pid").checked,pk:pk.slice(0,30)});
        reAll();msg("اتضاف المنتج. اضغط حفظ عشان يظهر، وبعدها ارفع صورته من قسم المنتجات.");return}
      if(k==="addoffer"){W.offers.push({id:Date.now(),t:"",d:"",b:"",p:"",e:"",on:1});g_("po").innerHTML=paneO();return}
      if(k==="deloffer"){W.offers.splice(+id,1);g_("po").innerHTML=paneO();return}
      if(k==="aimodels"){out("ai_key","جارٍ التحميل…");try{const r=await wk("/models");if(r.j&&r.j.ok){g_("ai_models").innerHTML=r.j.models.map(m=>'<option value="'+esc_(m)+'">').join("");out("ai_key","النماذج المتاحة ("+r.j.models.length+"): "+r.j.models.join("، ")+"\nالاختيار التلقائي: "+r.j.default)}else out("ai_key",r.status===403?"غير مصرّح: تأكد من التوكن ومن ALLOWED_ORIGIN وREPO في الـ Worker.":"تعذّر: "+(RS[r.j&&r.j.reason]||"خطأ"))}catch(x){out("ai_key","تعذّر الوصول للـ Worker. راجع الرابط.")}return}
      if(k==="aistats"){out("ai_stats","جارٍ التحميل…");try{const r=await wk("/status");if(r.status!==200){out("ai_stats","غير مصرّح أو الـ Worker مش متاح.");return}const t_=r.j.stats||{},avg=t_.ok?Math.round(t_.ms/t_.ok):0;out("ai_stats","الطلبات: "+(t_.req||0)+"\nنجح: "+(t_.ok||0)+"\nأخطاء: "+(t_.err||0)+"\nمرفوض (حد الطلبات): "+(t_.rate||0)+"\nتوكنز الإدخال: "+(t_.tin||0)+"\nتوكنز الإخراج: "+(t_.tout||0)+"\nمتوسط الاستجابة: "+avg+" مللي ثانية\nالتخزين الدائم: "+(r.j.kv?"مفعّل":"غير مفعّل (الأرقام بتتصفّر لما الـ Worker يتعمله إعادة تشغيل)"))}catch(x){out("ai_stats","تعذّر الوصول للـ Worker.")}return}
      if(k==="aitest"){const q=g_("ai_tq").value.trim();if(!q){return}out("ai_tout","جارٍ الإرسال…");const t0=Date.now();try{const r=await wk("/chat",{method:"POST",auth:false,body:JSON.stringify({m:q.slice(0,400),h:[],l:"ar"})});out("ai_tout",r.j&&r.j.t?r.j.t+"\n\n("+(Date.now()-t0)+" مللي ثانية · "+(r.j.model||"")+")":"فشل: "+(RS[r.j&&r.j.reason]||(r.j&&r.j.error)||r.status))}catch(x){out("ai_tout","تعذّر الوصول للـ Worker.")}return}
      if(k==="aidiag"){const L_=[];const P_=()=>out("ai_diag",L_.join("\n"));out("ai_diag","جارٍ الفحص…");
        try{const h=await wk("/health",{auth:false});L_.push(h.j&&h.j.ok?"✅ الـ Worker شغّال":"❌ الـ Worker مش بيرد صح");P_()}catch(x){L_.push("❌ مش قادر أوصل للـ Worker (راجع الرابط)");P_();return}
        let st_;try{st_=await wk("/status")}catch(x){L_.push("❌ فشل فحص الحالة");P_();return}
        if(st_.status!==200){L_.push("❌ التوكن مش معتمد كأدمن، أو ALLOWED_ORIGIN/REPO غلط في الـ Worker");P_();return}
        L_.push("✅ صلاحية الأدمن سليمة");L_.push(st_.j.keyConfigured?"✅ مفتاح Gemini مضاف في الـ Worker":"❌ مفتاح Gemini مش مضاف (GEMINI_API_KEY)");L_.push(st_.j.siteConfigured?"✅ SITE مضبوط":"❌ SITE مش مضبوط");P_();
        if(!st_.j.keyConfigured)return;
        try{const m=await wk("/models");L_.push(m.j&&m.j.ok?"✅ النماذج المتاحة: "+m.j.models.length+" (تلقائي: "+m.j.default+")":"❌ تحميل النماذج: "+(RS[m.j&&m.j.reason]||"فشل"))}catch(x){L_.push("❌ تحميل النماذج فشل")}P_();
        try{const t_=await wk("/test",{method:"POST"});L_.push(t_.j&&t_.j.ok?"✅ اتصال Gemini شغّال ("+t_.j.ms+" مللي ثانية · "+t_.j.model+")":"❌ اتصال Gemini: "+(RS[t_.j&&t_.j.reason]||"فشل"))}catch(x){L_.push("❌ اختبار Gemini فشل")}P_();return}
      return}
    if(e.target.dataset&&e.target.dataset.dl)e.target.closest(".row").remove();
  };
  const hIn=e=>{const t_=e.target,d=t_.dataset;if(!d)return;
    if(t_.id==="pq"){W.q=t_.value;g_("pl").innerHTML=listHtml();return}
    if(t_.id==="psort"){W.sort=t_.value;g_("pl").innerHTML=listHtml();return}
    if(t_.id==="pf"){W.flt=t_.value;g_("pl").innerHTML=listHtml();return}
    if(d.it){const q=d.it.split(":"),it=it_(q[0]);if(!it)return;const f=q[1];if(f==="on"||f==="pid")it[f]=t_.checked;else it[f]=t_.value;if(f==="c"){g_("ptabs").innerHTML=ptabsHtml()}}
    else if(d.pk){const q=d.pk.split(":"),it=it_(q[0]);if(!it||!it.pk[+q[1]])return;if(q[2]==="p")it.pk[+q[1]].p=t_.value===""?NaN:Math.round(+t_.value);else it.pk[+q[1]].l=t_.value}
    else if(d.of){const q=d.of.split(":"),o=W.offers[+q[0]];if(o)o[q[1]]=t_.type==="checkbox"?(t_.checked?1:0):(q[1]==="p"?(t_.value?+t_.value:""):t_.value)}
    else if(d.up&&e.type==="change"&&t_.files&&t_.files[0])upImg(d.up,t_.files[0])};
  s.oninput=hIn;s.onchange=hIn;
  g_("sv").onclick=async()=>{
    let bad="";const nc={},kb=[],prices={},off=[],pc={},pov={},prods=[],seen={};
    W.items.forEach(it=>{
      const nk=nm_(it.n);if(!nk)bad="كل منتج لازم له اسم.";else if(seen[nk])bad="فيه منتجين بنفس الاسم: "+it.n;seen[nk]=1;
      if(!it.pk.length)bad="كل منتج لازم له باقة واحدة على الأقل.";
      it.pk.forEach(k=>{if(!String(k.l).trim())bad="اسم الباقة مطلوب (في "+it.n+").";if(!(k.p>=0))bad="تأكد إن كل الأسعار أرقام (في "+it.n+").";});
      if(!it.on)off.push(it.id);
      const pk=it.pk.map(k=>[String(k.l).trim().slice(0,60),Math.max(0,Math.round(+k.p))]);
      if(it.custom)prods.push({id:it.id,c:it.c,n:it.n.trim().slice(0,60),ne:it.ne.trim().slice(0,60),desc:it.desc.trim().slice(0,300),pk:pk.slice(0,30),pid:it.pid?1:0,eta:it.eta.trim().slice(0,60),dm:it.dm.trim().slice(0,60)});
      else{const b=BASE3.get(it.id),same=it.n.trim()===b.n.ar&&(it.ne.trim()===(b.n.en===b.n.ar?"":b.n.en))&&!it.desc.trim()&&it.eta===b.eta.ar&&it.dm===b.dm.ar&&!!it.pid===!!b.pid&&it.pk.length===b.lab.length&&it.pk.every((k,i)=>String(k.l).trim()===lab0(b.lab[i]));
        if(same)prices[it.id]=pk.map(k=>k[1]);else pov[it.id]={n:it.n.trim().slice(0,60),ne:it.ne.trim().slice(0,60),desc:it.desc.trim().slice(0,300),eta:it.eta.trim().slice(0,60),dm:it.dm.trim().slice(0,60),pid:it.pid?1:0,pk:pk.slice(0,30)};
        if(it.c!==b.c0&&it.c)pc[it.id]=it.c}});
    document.querySelectorAll("#as #cl .row").forEach(r=>{const n=r.querySelector("[data-cn]").value.trim().toUpperCase().replace(/[^A-Z0-9_-]/g,""),v=Math.round(+r.querySelector("[data-cv]").value);if(!n)return;if(!(v>=1&&v<=90)){bad="نسبة الخصم لازم من 1 إلى 90.";return}const cc=r.querySelector("[data-cc]").value;nc[n]=cc?{p:v,c:cc}:v});
    document.querySelectorAll("#as #kl .row").forEach(r=>{const k=r.querySelector("[data-kk]").value.trim().slice(0,200),a=r.querySelector("[data-kb]").value.trim().slice(0,800);if(k&&a)kb.push({k:k,a:a})});
    const offers=W.offers.map(o=>{if(!String(o.t||"").trim())bad="كل عرض لازم له عنوان.";if(o.e&&!/^\d{4}-\d{2}-\d{2}$/.test(o.e))bad="تاريخ العرض غير صحيح.";return{id:o.id,t:String(o.t||"").trim().slice(0,80),te:String(o.te||"").trim().slice(0,80),d:String(o.d||"").trim().slice(0,200),b:String(o.b||"").trim().slice(0,30),p:o.p?+o.p:0,e:o.e||"",on:o.on===0?0:1}}).slice(0,30);
    const cl2=(v,a,b,d)=>{v=Math.round(+v);return v>=a&&v<=b?v:d},url=g_("ai_url").value.trim().replace(/\/+$/,"");
    if(url&&!/^https:\/\/[^\s]+$/.test(url))bad="رابط الـ Worker لازم يبدأ بـ https://";
    const ai={url:url,on:g_("ai_on").checked?1:0,show:g_("ai_show").checked?1:0,name:g_("ai_name").value.trim().slice(0,40),model:g_("ai_model").value.trim().slice(0,80),max:cl2(g_("ai_max").value,200,1000,600),rpm:cl2(g_("ai_rpm").value,1,60,8),cap:cl2(g_("ai_cap").value,10,5000,400),persona:g_("ai_persona").value.trim().slice(0,600),instr:g_("ai_instr").value.trim().slice(0,1500),fb:g_("ai_fb").value.trim().slice(0,300)};
    if(bad){msg(bad);return}
    const txt=JSON.stringify({prices:prices,off:off,codes:nc,kb:kb.slice(0,50),pc:pc,pov:pov,cats:W.cats,prods:prods,offers:offers,ai:ai},null,1);
    const b64=btoa(Array.from(new TextEncoder().encode(txt),b=>String.fromCharCode(b)).join(""));
    try{
      msg("جارٍ الحفظ…");
      const body={message:"Update store data",content:b64,branch:GH.br};if(GH.sha)body.sha=GH.sha;
      const r=await gh("/contents/data.json",{method:"PUT",body:JSON.stringify(body)});
      if(!r.ok)throw 1;const j=await r.json();GH.sha=j.content.sha;applyData(JSON.parse(txt));ui();
      openA(ACTS||undefined);g_("amsg").textContent="تم الحفظ ✓ — التغيير يظهر للعملاء خلال دقيقة تقريباً."
    }catch(e){msg("تعذّر الحفظ. أعد الدخول وحاول مرة أخرى.")}
  };
};
fetch("data.json?v="+Date.now()).then(r=>r.ok?r.json():null).then(d=>{if(d){applyData(d);ui()}}).catch(()=>{});
ui();
