/* ===== UI 2: أكورديون للمتجر والأدمن + تحسينات الموبايل ===== */
(function(){const st=document.createElement("style");st.textContent=`
body{overflow-x:clip}
.acc-body{display:grid;grid-template-rows:0fr;visibility:hidden;transition:grid-template-rows .38s ease,visibility 0s .38s}
.open>.acc-body{grid-template-rows:1fr;visibility:visible;transition:grid-template-rows .38s ease,visibility 0s}
.acc-in{min-height:0;overflow:hidden}
.acc-in>.grid,.acc-in>div{padding-top:12px}
.catsec{margin-bottom:12px}
.cath{margin:0;gap:10px;cursor:pointer;min-height:52px;-webkit-tap-highlight-color:transparent;transition:background .25s,border-color .25s,box-shadow .25s}
.cath small{margin-inline-start:auto}
.cath:hover{border-color:rgba(214,180,91,.5)}
.cath:focus-visible,.ash:focus-visible{outline:2px solid var(--gold);outline-offset:2px}
.chev{display:inline-block;font-style:normal;transition:transform .3s}
.open>.cath .chev,.open>.ash .chev{transform:rotate(180deg)}
.catsec.open>.cath{background:rgba(214,180,91,.12);border-color:rgba(214,180,91,.5)}
.asec{margin-bottom:10px}
.ash{width:100%;display:flex;align-items:center;gap:12px;padding:14px 16px;min-height:54px;border-radius:18px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.15);color:var(--iv);font-weight:700;font-size:16px;cursor:pointer;-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);box-shadow:inset 0 1px 0 rgba(255,255,255,.18);-webkit-tap-highlight-color:transparent;transition:background .25s,border-color .25s,transform .15s}
.ash:active{transform:scale(.98)}
.ash .asi{font-size:20px}.ash .ast{flex:1;text-align:start}
.asec.open>.ash{background:rgba(214,180,91,.12);border-color:rgba(214,180,91,.5);color:var(--gold)}
.grid{grid-template-columns:repeat(auto-fill,minmax(min(100%,130px),1fr))}
.sheet{max-height:min(88vh,88dvh);overscroll-behavior:contain}
.sheet,.card b,.mg,.td>div>span{overflow-wrap:anywhere}
.td>div{flex-wrap:wrap}
@media(max-width:600px){input,select,textarea{font-size:16px}.card{padding:10px}.apg{grid-template-columns:1fr}section{padding-left:12px;padding-right:12px}}
@media(max-width:360px){.logo{letter-spacing:.08em;font-size:13px}header{gap:4px;padding:8px 10px}.ghost{padding:7px 10px;font-size:13px}.hero{padding:44px 12px 36px}}
@media(pointer:coarse){.ghost,.btn{min-height:42px}.q button{width:38px;height:38px}.fb button{min-width:36px;min-height:36px}}
`;document.head.appendChild(st)})();
/* --- المتجر: أكورديون الأقسام --- */
let OPENCAT=null;
function setAcc(sec,open){sec.classList.toggle("open",open);const h=sec.querySelector(":scope>.cath"),b=sec.querySelector(":scope>.acc-body");h.setAttribute("aria-expanded",open?"true":"false");b.inert=!open;b.setAttribute("aria-hidden",open?"false":"true")}
function accWrap(){
  const g=document.getElementById("grid");if(!g||!g.classList.contains("grp"))return;
  const cids=catIds().filter(c=>P.some(p=>!p.off&&p.c===c));
  if(OPENCAT&&cids.indexOf(OPENCAT)<0)OPENCAT=null;
  g.querySelectorAll(":scope>.catsec").forEach((sec,i)=>{
    const id=cids[i],h=sec.querySelector(":scope>.cath"),grid=sec.querySelector(":scope>.grid");if(!h||!grid||!id)return;
    h.setAttribute("role","button");h.tabIndex=0;h.dataset.cat=id;h.insertAdjacentHTML("beforeend",'<i class="chev" aria-hidden="true">▾</i>');
    const body=document.createElement("div"),inn=document.createElement("div");body.className="acc-body";inn.className="acc-in";
    grid.replaceWith(body);body.appendChild(inn);inn.appendChild(grid);setAcc(sec,id===OPENCAT)})
}
function accToggle(h){
  const sec=h.closest(".catsec"),will=!sec.classList.contains("open");
  document.querySelectorAll("#grid>.catsec").forEach(s=>setAcc(s,false));
  if(will){setAcc(sec,true);OPENCAT=h.dataset.cat}else OPENCAT=null;
  setTimeout(()=>{try{h.scrollIntoView({behavior:"smooth",block:"nearest"})}catch(e){}},400)
}
const _uiA=ui;ui=function(){_uiA();accWrap()};
if(!window.__accBound){window.__accBound=1;const g=document.getElementById("grid");
  g.addEventListener("click",e=>{const h=e.target.closest(".cath");if(h)accToggle(h)});
  g.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){const h=e.target.closest(".cath");if(h){e.preventDefault();accToggle(h)}}})}
/* --- الأدمن: أكورديون --- */
let ACTS=null;
function paneC(){
  return '<input id="nc_ar" placeholder="اسم الخانة بالعربي (مثال: عروض الشحن)" maxlength="40"><input id="nc_en" placeholder="الاسم بالإنجليزي (اختياري)" maxlength="40" dir="ltr"><input id="nc_ic" placeholder="أيقونة إيموجي (اختياري) مثال: 💎" maxlength="4"><button class="btn" data-act="addcat">إضافة الخانة</button><div style="margin-top:8px">'+
   wCats().map(c=>'<span class="ghost chipx">'+c.ic+" "+esc_(c.ar)+(BASE_CATS.indexOf(c.id)<0?' <button class="ghost" data-act="delcat" data-id="'+c.id+'" style="padding:0 8px">✕</button>':"")+"</span>").join("")+"</div>";
}
function paneNP(){
  return '<input id="np_ar" placeholder="اسم المنتج بالعربي" maxlength="60"><input id="np_en" placeholder="الاسم بالإنجليزي (اختياري)" maxlength="60" dir="ltr"><select id="np_c">'+catOpts("")+'</select><textarea id="np_pk" rows="4" placeholder="الباقات: سطر لكل باقة بالشكل ده&#10;60 UC | 50&#10;325 UC | 250" style="width:100%"></textarea><input id="np_eta" placeholder="وقت التسليم (مثال: خلال دقائق)" maxlength="60"><input id="np_dm" placeholder="طريقة التسليم (مثال: كود رقمي)" maxlength="60"><label class="mut"><input type="checkbox" id="np_pid" style="width:auto;margin:0 6px">يطلب Player ID</label><br><button class="btn" data-act="addprod">إضافة المنتج</button>'+
   (W.prods.length?'<h3 style="margin-top:18px">منتجاتك الجديدة</h3>'+W.prods.map(p=>'<span class="ghost chipx">'+esc_(p.n)+' <button class="ghost" data-act="delprod" data-id="'+p.id+'" style="padding:0 8px">🗑</button></span>').join(""):"");
}
openA=function(tab){
  const s=modal_();
  ACTS=typeof tab==="string"?tab:null;
  W={pr:{},off:(D.off||[]).slice(),pc:cl_(D.pc||{}),cats:cl_(D.cats||[]),prods:cl_(D.prods||[]),offers:cl_(D.offers||[])};
  P.filter(p=>!p.custom).forEach(p=>{W.pr[p.id]=p.pk.map(k=>k[1])});
  const secs=[
    ["p","📦","المنتجات",'<div id="pp">'+paneP()+"</div>"],
    ["c","🗂","الخانات (الأقسام)",'<div id="pc">'+paneC()+"</div>"],
    ["n","➕","إضافة منتج جديد",'<div id="pn">'+paneNP()+"</div>"],
    ["o","🔥","العروض",'<div id="po">'+paneO()+"</div>"],
    ["d","🏷","الخصومات",'<div><p class="mut">لكل كود: النسبة + الفئة اللي ينطبق عليها (أو كل المنتجات).</p><div id="cl">'+Object.entries(CODES).map(c=>codeRow(c[0],c[1])).join("")+'</div><button class="ghost" id="ca">+ كود جديد</button></div>'],
    ["k","🤖","AI CORE – المساعد",'<div><p class="mut">كلمات مفتاحية (بفاصلة) + إجابة. المساعد بيرد منها بس ولا يخترع.</p><div id="kl">'+(D.kb||[]).map(x=>kbRow(x.k,x.a)).join("")+'</div><button class="ghost" id="ka">+ إجابة جديدة</button></div>'],
    ["r","📋","الطلبات",'<div><p class="mut">تحديث حالة الطلبات والرسائل للعملاء.</p><button class="btn" data-act="orders">📦 فتح إدارة تتبع الطلبات</button></div>']];
  s.innerHTML='<h2>لوحة التحكم</h2>'+secs.map(x=>'<div class="asec" data-sec="'+x[0]+'"><button type="button" class="ash" aria-expanded="false" aria-controls="ab_'+x[0]+'"><span class="asi">'+x[1]+'</span><span class="ast">'+x[2]+'</span><i class="chev" aria-hidden="true">▾</i></button><div class="acc-body" id="ab_'+x[0]+'" inert aria-hidden="true"><div class="acc-in">'+x[3]+"</div></div></div>").join("")+
   '<div class="asave"><div class="note" id="amsg">التعديلات تظهر للعملاء بعد "حفظ".</div><button class="btn" id="sv">حفظ</button> <button class="ghost" data-x="am">إغلاق</button></div>';
  const openSec=k=>{ACTS=k;s.querySelectorAll(".asec").forEach(x=>{const o=x.dataset.sec===k,b=x.querySelector(":scope>.acc-body");x.classList.toggle("open",o);b.inert=!o;b.setAttribute("aria-hidden",o?"false":"true");x.querySelector(":scope>.ash").setAttribute("aria-expanded",o?"true":"false")})};
  openSec(ACTS);
  const msg=m=>{g_("amsg").textContent=m};
  const reAll=()=>{g_("pc").innerHTML=paneC();g_("pn").innerHTML=paneNP();g_("pp").innerHTML=paneP()};
  g_("ca").onclick=()=>g_("cl").insertAdjacentHTML("beforeend",codeRow("",10));
  g_("ka").onclick=()=>g_("kl").insertAdjacentHTML("beforeend",kbRow("",""));
  s.onclick=e=>{
    const h=e.target.closest(".ash");if(h){const k=h.parentElement.dataset.sec;openSec(ACTS===k?null:k);setTimeout(()=>{try{h.scrollIntoView({behavior:"smooth",block:"nearest"})}catch(x){}},400);return}
    const a=e.target.closest("[data-act]");
    if(a){const k=a.dataset.act,id=a.dataset.id;
      if(k==="orders"){openOrders();return}
      if(k==="addcat"){const ar=g_("nc_ar").value.trim();if(!ar){msg("اكتب اسم الخانة.");return}if(W.cats.length>=20){msg("وصلت للحد الأقصى للخانات.");return}
        W.cats.push({id:"c"+Date.now().toString(36),ar:ar.slice(0,40),en:g_("nc_en").value.trim().slice(0,40),ic:(g_("nc_ic").value.trim()||"🛒").slice(0,4)});reAll();msg("اتضافت الخانة. ضيف فيها منتجات أو انقل منتجات ليها، وبعدين اضغط حفظ.");return}
      if(k==="delcat"){if(W.prods.some(p=>p.c===id)){msg("في منتجات جديدة جوه الخانة دي. امسحها أو انقلها الأول.");return}
        W.cats=W.cats.filter(c=>c.id!==id);Object.keys(W.pc).forEach(p=>{if(W.pc[p]===id)delete W.pc[p]});reAll();return}
      if(k==="addprod"){const n=g_("np_ar").value.trim(),pk=[];
        g_("np_pk").value.split("\n").forEach(l=>{const i=l.lastIndexOf("|");if(i<0)return;const lb_=l.slice(0,i).trim(),pr=Math.round(+l.slice(i+1).replace(/[^\d.]/g,""));if(lb_&&pr>=0)pk.push([lb_.slice(0,60),pr])});
        if(!n){msg("اكتب اسم المنتج.");return}if(!pk.length){msg("اكتب باقة واحدة على الأقل بالشكل: الاسم | السعر");return}if(W.prods.length>=100){msg("وصلت للحد الأقصى.");return}
        W.prods.push({id:Math.max(99,...W.prods.map(p=>p.id))+1,c:g_("np_c").value,n:n.slice(0,60),ne:g_("np_en").value.trim().slice(0,60),pk:pk.slice(0,30),pid:g_("np_pid").checked?1:0,eta:g_("np_eta").value.trim().slice(0,60),dm:g_("np_dm").value.trim().slice(0,60)});
        reAll();msg("اتضاف المنتج. اضغط حفظ عشان يظهر، وبعدها ارفع صورته من قسم المنتجات.");return}
      if(k==="delprod"){W.prods=W.prods.filter(p=>String(p.id)!==id);reAll();return}
      if(k==="addoffer"){W.offers.push({id:Date.now(),t:"",d:"",b:"",p:"",e:"",on:1});g_("po").innerHTML=paneO();return}
      if(k==="deloffer"){W.offers.splice(+id,1);g_("po").innerHTML=paneO();return}
      return}
    if(e.target.dataset&&e.target.dataset.dl)e.target.closest(".row").remove();
  };
  const hIn=e=>{const t_=e.target,d=t_.dataset;if(!d)return;
    if(d.pr){const q=d.pr.split(":"),id=+q[0],i=+q[1],v=t_.value===""?NaN:Math.round(+t_.value),cp=W.prods.find(x=>x.id===id);if(cp)cp.pk[i][1]=v;else W.pr[id][i]=v}
    else if(d.off){const id=+d.off;W.off=W.off.filter(x=>x!==id);if(!t_.checked)W.off.push(id)}
    else if(d.pc){const id=+d.pc,cp=W.prods.find(x=>x.id===id);if(cp)cp.c=t_.value;else W.pc[id]=t_.value}
    else if(d.of){const q=d.of.split(":"),o=W.offers[+q[0]];if(o)o[q[1]]=t_.type==="checkbox"?(t_.checked?1:0):(q[1]==="p"?(t_.value?+t_.value:""):t_.value)}
    else if(d.up&&e.type==="change"&&t_.files&&t_.files[0])upImg(d.up,t_.files[0])};
  s.oninput=hIn;s.onchange=hIn;
  g_("sv").onclick=async()=>{
    let bad="";const nc={},kb=[],prices={};
    P.filter(p=>!p.custom).forEach(p=>{const a=W.pr[p.id];if(a.some(v=>!(v>=0)))bad="تأكد إن كل الأسعار أرقام.";prices[p.id]=a});
    W.prods.forEach(cp=>cp.pk.forEach(k=>{if(!(k[1]>=0))bad="تأكد إن كل الأسعار أرقام."}));
    document.querySelectorAll("#as #cl .row").forEach(r=>{const n=r.querySelector("[data-cn]").value.trim().toUpperCase().replace(/[^A-Z0-9_-]/g,""),v=Math.round(+r.querySelector("[data-cv]").value);if(!n)return;if(!(v>=1&&v<=90)){bad="نسبة الخصم لازم من 1 إلى 90.";return}const cc=r.querySelector("[data-cc]").value;nc[n]=cc?{p:v,c:cc}:v});
    document.querySelectorAll("#as #kl .row").forEach(r=>{const k=r.querySelector("[data-kk]").value.trim().slice(0,200),a=r.querySelector("[data-kb]").value.trim().slice(0,800);if(k&&a)kb.push({k:k,a:a})});
    const offers=W.offers.map(o=>{if(!String(o.t||"").trim())bad="كل عرض لازم له عنوان.";if(o.e&&!/^\d{4}-\d{2}-\d{2}$/.test(o.e))bad="تاريخ العرض غير صحيح.";return{id:o.id,t:String(o.t||"").trim().slice(0,80),te:String(o.te||"").trim().slice(0,80),d:String(o.d||"").trim().slice(0,200),b:String(o.b||"").trim().slice(0,30),p:o.p?+o.p:0,e:o.e||"",on:o.on===0?0:1}}).slice(0,30);
    if(bad){msg(bad);return}
    const pc={};Object.keys(W.pc).forEach(id=>{const p=P.find(x=>x.id===+id);if(p&&!p.custom&&W.pc[id]!==p.c0)pc[id]=W.pc[id]});
    const txt=JSON.stringify({prices:prices,off:W.off,codes:nc,kb:kb.slice(0,50),pc:pc,cats:W.cats,prods:W.prods,offers:offers},null,1);
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
ui();
