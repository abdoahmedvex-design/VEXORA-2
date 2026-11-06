/* ===== ADMIN 2: تبويبات + خانات جديدة + منتجات جديدة + عروض ===== */
(function(){const st=document.createElement("style");st.textContent=`
#as{max-width:920px}
.atabs{display:flex;gap:6px;overflow-x:auto;padding-bottom:10px;margin-bottom:6px}
.atabs button{white-space:nowrap}
.atabs .on{background:rgba(214,180,91,.18);border-color:rgba(214,180,91,.6);color:var(--gold)}
.pane{display:none}.pane.on{display:block}
.apg{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px}
.apc{padding:12px;border-radius:16px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12)}
.aph{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:8px}
.apc select{margin:6px 0}
.asave{position:sticky;bottom:0;margin-top:14px;padding:10px;border-radius:16px;background:rgba(18,18,18,.82);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.12)}
.asave .note{margin:0 0 8px}
.ofs{display:flex;gap:12px;overflow-x:auto;padding-bottom:8px}
.of{flex:0 0 min(280px,80%);padding:16px;border-radius:22px;background:linear-gradient(145deg,rgba(214,180,91,.2),rgba(255,255,255,.04));-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);border:1px solid rgba(214,180,91,.45);box-shadow:0 10px 34px rgba(0,0,0,.35),0 0 24px rgba(214,180,91,.15),inset 0 1px 0 rgba(255,255,255,.2);display:flex;flex-direction:column;gap:8px}
.of b{font-size:17px}
.ofb{align-self:flex-start;background:linear-gradient(135deg,#E8CF8A,#D6B45B);color:#080808;font-weight:700;font-size:12px;border-radius:999px;padding:2px 12px}
.of .btn{align-self:flex-start;margin-top:auto;text-decoration:none;display:inline-block}
.chipx{display:inline-flex;gap:6px;align-items:center;margin:3px}
`;document.head.appendChild(st)})();
const CI={gaming:"🎮",gift:"🎁",subs:"📺"},BASE_CATS=["gaming","gift","subs"];
const catIds=()=>BASE_CATS.concat((D.cats||[]).map(c=>c.id));
const BASE2=new Map(P.map(p=>[p.id,p.pk.map(k=>k[1])]));
P.forEach(p=>{p.c0=p.c});
applyData=function(d){
  D=d||{};CODES=D.codes||{};
  for(let i=P.length-1;i>=0;i--)if(P[i].custom)P.splice(i,1);
  Object.keys(T.ar.cat).forEach(k=>{if(BASE_CATS.indexOf(k)<0){delete T.ar.cat[k];delete T.en.cat[k]}});
  (D.cats||[]).forEach(c=>{T.ar.cat[c.id]=c.ar;T.en.cat[c.id]=c.en||c.ar;CI[c.id]=c.ic||"🛒"});
  (D.prods||[]).forEach(cp=>{P.push({id:cp.id,c:cp.c,c0:cp.c,i:"🛒",n:{ar:cp.n,en:cp.ne||cp.n},pk:cp.pk.map(k=>[k[0],k[1]]),pid:cp.pid?1:0,real:1,eta:{ar:cp.eta||"",en:cp.eta||""},dm:{ar:cp.dm||"",en:cp.dm||""},custom:1});IMG[cp.id]="img/p"+cp.id+".jpg"});
  const offAll=D.off||[],ids=catIds();
  P.forEach(p=>{if(!p.custom){const o=(D.prices||{})[p.id],b=BASE2.get(p.id),pc=(D.pc||{})[p.id];p.pk.forEach((k,i)=>{k[1]=o&&o[i]!=null?+o[i]:b[i]});p.c=pc&&ids.indexOf(pc)>=0?pc:p.c0}
    p.off=offAll.includes(p.id)&&!P.every(q=>offAll.includes(q.id))});
  cart=cart.filter(x=>P.some(p=>p.id===x.id&&!p.off&&p.pk[x.k]));
};
function offRender(){
  let s=document.getElementById("offers");
  const list=(D.offers||[]).filter(o=>o.on!==0&&(!o.e||Date.now()<=new Date(o.e+"T23:59:59").getTime()));
  if(!list.length){if(s)s.remove();return}
  if(!s){s=document.createElement("section");s.id="offers";s.className="rv in";document.getElementById("store").before(s)}
  const ar=L==="ar";
  s.innerHTML="<h2>"+(ar?"🔥 العروض":"🔥 Offers")+'</h2><div class="ofs">'+list.map(o=>{
    const ttl=esc_(!ar&&o.te?o.te:o.t),dsc=esc_(!ar&&o.de?o.de:(o.d||"")),pr=o.p&&P.find(p=>p.id===o.p&&!p.off);
    return '<div class="of">'+(o.b?'<span class="ofb">'+esc_(o.b)+'</span>':"")+"<b>"+ttl+"</b>"+(dsc?'<p class="mut">'+dsc+"</p>":"")+(o.e?'<small class="mut">'+(ar?"ينتهي: ":"Ends: ")+esc_(o.e)+"</small>":"")+
      (pr?'<button class="btn" data-p="'+pr.id+'">'+(ar?"اطلب الآن":"Order now")+"</button>":'<a class="btn" target="_blank" rel="noopener" href="'+waUrl((ar?"مرحباً VEXORA، عايز أستفسر عن العرض: ":"Hello VEXORA, I'd like to ask about the offer: ")+o.t)+'">'+(ar?"استفسر عن العرض":"Ask about this offer")+"</a>")+"</div>"}).join("")+"</div>";
}
ui=function(){
  document.documentElement.lang=L;document.documentElement.dir=L==="ar"?"rtl":"ltr";
  $("#lang").textContent=L==="ar"?"EN":"عربي";
  document.querySelectorAll("[data-i]").forEach(e=>e.textContent=t(e.dataset.i));
  document.querySelectorAll("[data-ph]").forEach(e=>e.placeholder=t(e.dataset.ph));
  const cids=catIds().filter(c=>P.some(p=>!p.off&&p.c===c));
  if(F!=="all"&&cids.indexOf(F)<0)F="all";
  $("#tabs").innerHTML=["all"].concat(cids).map(k=>`<button class="ghost ${F===k?"on":""}" data-f="${k}">${k==="all"?t("all"):t("cat")[k]}</button>`).join("");
  const vs=P.filter(p=>!p.off&&(F==="all"||p.c===F)),cd=(p,i)=>`<div class="card" style="animation-delay:${i*60}ms" data-p="${p.id}"><div class="ico">${IMG[p.id]?`<img src="${IMG[p.id]}" alt="${p.n[L]}" loading="lazy" onerror="this.remove()">`:p.i}</div><b>${p.n[L]}</b><div class="mut">${egp(Math.min(...p.pk.map(k=>k[1])))}+</div></div>`;
  $("#grid").className=F==="all"?"grid grp":"grid";
  $("#grid").innerHTML=F==="all"?cids.map(c=>{const a=vs.filter(p=>p.c===c);return a.length?`<div class="catsec"><div class="cath"><span>${CI[c]||"🛒"} ${t("cat")[c]}</span><small>${a.length}</small></div><div class="grid">${a.map(cd).join("")}</div></div>`:""}).join(""):vs.map(cd).join("");
  $("#cc").textContent=cart.reduce((a,b)=>a+b.q,0);
  offRender();
};
/* --- لوحة التحكم الجديدة --- */
let W=null,ACT="p";
const cl_=o=>JSON.parse(JSON.stringify(o));
const wCats=()=>BASE_CATS.map(id=>({id:id,ar:T.ar.cat[id],ic:CI[id]})).concat(W.cats.map(c=>({id:c.id,ar:c.ar,ic:c.ic||"🛒"})));
const catOpts=sel=>wCats().map(c=>'<option value="'+c.id+'"'+(c.id===sel?" selected":"")+">"+c.ic+" "+esc_(c.ar)+"</option>").join("");
function adminProds(){
  const a=P.filter(p=>!p.custom).map(p=>({id:p.id,n:p.n.ar,pk:W.pr[p.id].map((v,i)=>[Array.isArray(p.pk[i][0])?p.pk[i][0][0]:p.pk[i][0],v]),c:W.pc[p.id]||p.c0,custom:0}));
  return a.concat(W.prods.map(cp=>({id:cp.id,n:cp.n,pk:cp.pk,c:cp.c,custom:1})));
}
function paneP(){
  return '<div class="apg">'+adminProds().map(p=>'<div class="apc"><div class="aph"><b>'+esc_(p.n)+'</b><label class="mut"><input type="checkbox" data-off="'+p.id+'" '+(W.off.indexOf(p.id)<0?"checked":"")+' style="width:auto;margin:0 4px">ظاهر</label></div><select data-pc="'+p.id+'">'+catOpts(p.c)+'</select><label class="ghost" style="font-size:12px;padding:4px 10px;cursor:pointer">📷 صورة<input type="file" accept="image/*" data-up="'+p.id+'" hidden></label>'+
    p.pk.map((k,i)=>'<div class="row"><span>'+esc_(k[0])+'</span><input type="number" min="0" data-pr="'+p.id+":"+i+'" value="'+k[1]+'" style="width:100px;margin:0"></div>').join("")+"</div>").join("")+"</div>";
}
function paneN(){
  return '<h3>خانة (قسم) جديدة</h3><input id="nc_ar" placeholder="اسم الخانة بالعربي (مثال: عروض الشحن)" maxlength="40"><input id="nc_en" placeholder="الاسم بالإنجليزي (اختياري)" maxlength="40" dir="ltr"><input id="nc_ic" placeholder="أيقونة إيموجي (اختياري) مثال: 💎" maxlength="4"><button class="btn" data-act="addcat">إضافة الخانة</button><div style="margin-top:8px">'+
   wCats().map(c=>'<span class="ghost chipx">'+c.ic+" "+esc_(c.ar)+(BASE_CATS.indexOf(c.id)<0?' <button class="ghost" data-act="delcat" data-id="'+c.id+'" style="padding:0 8px">✕</button>':"")+"</span>").join("")+'</div>'+
   '<h3 style="margin-top:18px">منتج جديد</h3><input id="np_ar" placeholder="اسم المنتج بالعربي" maxlength="60"><input id="np_en" placeholder="الاسم بالإنجليزي (اختياري)" maxlength="60" dir="ltr"><select id="np_c">'+catOpts("")+'</select><textarea id="np_pk" rows="4" placeholder="الباقات: سطر لكل باقة بالشكل ده&#10;60 UC | 50&#10;325 UC | 250" style="width:100%"></textarea><input id="np_eta" placeholder="وقت التسليم (مثال: خلال دقائق)" maxlength="60"><input id="np_dm" placeholder="طريقة التسليم (مثال: كود رقمي)" maxlength="60"><label class="mut"><input type="checkbox" id="np_pid" style="width:auto;margin:0 6px">يطلب Player ID</label><br><button class="btn" data-act="addprod">إضافة المنتج</button>'+
   (W.prods.length?'<h3 style="margin-top:18px">منتجاتك الجديدة</h3>'+W.prods.map(p=>'<span class="ghost chipx">'+esc_(p.n)+' <button class="ghost" data-act="delprod" data-id="'+p.id+'" style="padding:0 8px">🗑</button></span>').join(""):"");
}
function paneO(){
  return '<button class="btn" data-act="addoffer">+ عرض جديد</button><div class="apg" style="margin-top:12px">'+W.offers.map((o,i)=>'<div class="apc"><div class="aph"><b>عرض '+(i+1)+'</b><button class="ghost" data-act="deloffer" data-id="'+i+'" style="padding:0 10px">🗑</button></div>'+
   '<input data-of="'+i+':t" value="'+esc_(o.t||"")+'" placeholder="عنوان العرض" maxlength="80"><input data-of="'+i+':te" value="'+esc_(o.te||"")+'" placeholder="العنوان بالإنجليزي (اختياري)" maxlength="80" dir="ltr"><input data-of="'+i+':d" value="'+esc_(o.d||"")+'" placeholder="وصف قصير" maxlength="200"><input data-of="'+i+':b" value="'+esc_(o.b||"")+'" placeholder="شارة (مثال: خصم 20%)" maxlength="30">'+
   '<select data-of="'+i+':p"><option value="">— بدون ربط بمنتج —</option>'+P.filter(p=>!p.off).map(p=>'<option value="'+p.id+'"'+(String(p.id)===String(o.p)?" selected":"")+">"+esc_(p.n.ar)+"</option>").join("")+'</select>'+
   '<label class="mut">ينتهي في (اختياري)<input type="date" data-of="'+i+':e" value="'+esc_(o.e||"")+'"></label><label class="mut"><input type="checkbox" data-of="'+i+':on" '+(o.on===0?"":"checked")+' style="width:auto;margin:0 6px">ظاهر</label></div>').join("")+"</div>";
}
openA=function(tab){
  const s=modal_();
  W={pr:{},off:(D.off||[]).slice(),pc:cl_(D.pc||{}),cats:cl_(D.cats||[]),prods:cl_(D.prods||[]),offers:cl_(D.offers||[])};
  P.filter(p=>!p.custom).forEach(p=>{W.pr[p.id]=p.pk.map(k=>k[1])});
  if(typeof tab==="string")ACT=tab;
  const tabs=[["p","📦 المنتجات"],["n","➕ إضافة"],["d","🏷 الخصومات"],["o","🔥 العروض"],["k","🤖 المساعد"],["r","📋 الطلبات"]];
  s.innerHTML='<h2>لوحة التحكم</h2><div class="atabs">'+tabs.map(x=>'<button class="ghost'+(x[0]===ACT?" on":"")+'" data-tab="'+x[0]+'">'+x[1]+"</button>").join("")+"</div>"+
   '<div class="pane" data-pane="p" id="pp">'+paneP()+"</div>"+
   '<div class="pane" data-pane="n" id="pn">'+paneN()+"</div>"+
   '<div class="pane" data-pane="d"><p class="mut">لكل كود: النسبة + الفئة اللي ينطبق عليها (أو كل المنتجات).</p><div id="cl">'+Object.entries(CODES).map(c=>codeRow(c[0],c[1])).join("")+'</div><button class="ghost" id="ca">+ كود جديد</button></div>'+
   '<div class="pane" data-pane="o" id="po">'+paneO()+"</div>"+
   '<div class="pane" data-pane="k"><p class="mut">كلمات مفتاحية (بفاصلة) + إجابة. المساعد بيرد منها بس ولا يخترع.</p><div id="kl">'+(D.kb||[]).map(x=>kbRow(x.k,x.a)).join("")+'</div><button class="ghost" id="ka">+ إجابة جديدة</button></div>'+
   '<div class="pane" data-pane="r"><p class="mut">تحديث حالة الطلبات والرسائل للعملاء.</p><button class="btn" data-act="orders">📦 فتح إدارة تتبع الطلبات</button></div>'+
   '<div class="asave"><div class="note" id="amsg">التعديلات تظهر للعملاء بعد "حفظ".</div><button class="btn" id="sv">حفظ</button> <button class="ghost" data-x="am">إغلاق</button></div>';
  const show=k=>{ACT=k;s.querySelectorAll(".pane").forEach(p=>p.classList.toggle("on",p.dataset.pane===k));s.querySelectorAll(".atabs button").forEach(b=>b.classList.toggle("on",b.dataset.tab===k))};
  show(ACT);
  const msg=m=>{g_("amsg").textContent=m};
  const rePN=()=>{g_("pn").innerHTML=paneN();g_("pp").innerHTML=paneP()};
  g_("ca").onclick=()=>g_("cl").insertAdjacentHTML("beforeend",codeRow("",10));
  g_("ka").onclick=()=>g_("kl").insertAdjacentHTML("beforeend",kbRow("",""));
  s.onclick=e=>{
    const tb=e.target.closest("[data-tab]");if(tb){show(tb.dataset.tab);return}
    const a=e.target.closest("[data-act]");
    if(a){const k=a.dataset.act,id=a.dataset.id;
      if(k==="orders"){openOrders();return}
      if(k==="addcat"){const ar=g_("nc_ar").value.trim();if(!ar){msg("اكتب اسم الخانة.");return}if(W.cats.length>=20){msg("وصلت للحد الأقصى للخانات.");return}
        W.cats.push({id:"c"+Date.now().toString(36),ar:ar.slice(0,40),en:g_("nc_en").value.trim().slice(0,40),ic:(g_("nc_ic").value.trim()||"🛒").slice(0,4)});rePN();msg("اتضافت الخانة. ضيف فيها منتجات أو انقل منتجات ليها، وبعدين اضغط حفظ.");return}
      if(k==="delcat"){if(W.prods.some(p=>p.c===id)){msg("في منتجات جديدة جوه الخانة دي. امسحها أو انقلها الأول.");return}
        W.cats=W.cats.filter(c=>c.id!==id);Object.keys(W.pc).forEach(p=>{if(W.pc[p]===id)delete W.pc[p]});rePN();return}
      if(k==="addprod"){const n=g_("np_ar").value.trim(),pk=[];
        g_("np_pk").value.split("\n").forEach(l=>{const i=l.lastIndexOf("|");if(i<0)return;const lb_=l.slice(0,i).trim(),pr=Math.round(+l.slice(i+1).replace(/[^\d.]/g,""));if(lb_&&pr>=0)pk.push([lb_.slice(0,60),pr])});
        if(!n){msg("اكتب اسم المنتج.");return}if(!pk.length){msg("اكتب باقة واحدة على الأقل بالشكل: الاسم | السعر");return}if(W.prods.length>=100){msg("وصلت للحد الأقصى.");return}
        W.prods.push({id:Math.max(99,...W.prods.map(p=>p.id))+1,c:g_("np_c").value,n:n.slice(0,60),ne:g_("np_en").value.trim().slice(0,60),pk:pk.slice(0,30),pid:g_("np_pid").checked?1:0,eta:g_("np_eta").value.trim().slice(0,60),dm:g_("np_dm").value.trim().slice(0,60)});
        rePN();msg("اتضاف المنتج. اضغط حفظ عشان يظهر، وبعدها ارفع صورته من تبويب المنتجات.");return}
      if(k==="delprod"){W.prods=W.prods.filter(p=>String(p.id)!==id);rePN();return}
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
      openA(ACT);g_("amsg").textContent="تم الحفظ ✓ — التغيير يظهر للعملاء خلال دقيقة تقريباً."
    }catch(e){msg("تعذّر الحفظ. أعد الدخول وحاول مرة أخرى.")}
  };
};
fetch("data.json?v="+Date.now()).then(r=>r.ok?r.json():null).then(d=>{if(d){applyData(d);ui()}}).catch(()=>{});
ui();
