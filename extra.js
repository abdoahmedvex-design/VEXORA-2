const g_=i=>document.getElementById(i);
const esc_=s=>String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");
const GH={r:"",t:"",sha:"",br:"main"};
try{GH.t=sessionStorage.getItem("vx_t")||"";GH.r=localStorage.getItem("vx_r")||""}catch(e){}
if(!GH.r){const m=location.hostname.match(/^([^.]+)\.github\.io$/);if(m)GH.r=m[1]+"/"+(location.pathname.split("/")[1]||m[1]+".github.io")}
const gh=(path,o)=>{o=o||{};return fetch("https://api.github.com/repos/"+GH.r+path,{method:o.method||"GET",headers:{Authorization:"Bearer "+GH.t,Accept:"application/vnd.github+json","Content-Type":"application/json"},body:o.body})};
function modal_(){let a=g_("am");if(!a){a=document.createElement("div");a.className="modal";a.id="am";a.innerHTML='<div class="sheet" id="as"></div>';document.body.appendChild(a)}a.classList.add("on");return g_("as")}
function codeRow(c,v){const o=v&&typeof v==="object"?v:{p:v,c:""};const cats=[...new Set(P.map(p=>p.c))];return '<div class="row" style="flex-wrap:wrap"><input data-cn value="'+esc_(c)+'" placeholder="CODE" style="width:38%;margin:0"><input data-cv type="number" min="1" max="90" value="'+(+o.p||10)+'" style="width:20%;margin:0"><button class="ghost" data-dl="1">✕</button><select data-cc style="width:100%;margin:0"><option value="">كل المنتجات</option>'+cats.map(k=>'<option value="'+k+'"'+(o.c===k?" selected":"")+'>'+T.ar.cat[k]+'</option>').join("")+'</select></div>'}
function kbRow(k,a){return '<div class="row" style="flex-wrap:wrap"><input data-kk value="'+esc_(k)+'" placeholder="كلمات مفتاحية: استرجاع, refund" style="width:80%;margin:0"><button class="ghost" data-dl="1">✕</button><textarea data-kb rows="3" placeholder="الإجابة" style="width:100%;margin:6px 0 0">'+esc_(a)+'</textarea></div>'}
function openLogin(){
  const s=modal_();
  s.innerHTML='<h2>دخول الأدمن</h2><input id="lr" placeholder="owner/repo" value="'+esc_(GH.r)+'" dir="ltr"><input id="lt" type="password" placeholder="GitHub Token" value="'+esc_(GH.t)+'" dir="ltr" autocomplete="off"><div class="note" id="amsg">أدخل اسم المستودع وتوكن GitHub الخاص بك.</div><button class="btn" id="lg">دخول</button> <button class="ghost" data-x="am">إغلاق</button>';
  g_("lg").onclick=async()=>{
    const msg=g_("amsg");GH.r=g_("lr").value.trim();GH.t=g_("lt").value.trim();
    if(!/^[\w.-]+\/[\w.-]+$/.test(GH.r)||!GH.t){msg.textContent="أكمل اسم المستودع والتوكن.";return}
    msg.textContent="جارٍ التحقق…";
    try{
      const r=await gh("");if(!r.ok)throw 1;const j=await r.json();
      if(!j.permissions||!j.permissions.push){msg.textContent="التوكن ليس له صلاحية الكتابة على هذا المستودع.";return}
      GH.br=j.default_branch;
      try{const ur=await fetch("https://api.github.com/user",{headers:{Authorization:"Bearer "+GH.t}});if(ur.ok)GH.user=(await ur.json()).login}catch(e){}
      const f=await gh("/contents/data.json?ref="+GH.br+"&_="+Date.now());
      if(f.ok){const c=await f.json();GH.sha=c.sha;applyData(JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(c.content.replace(/\s/g,"")),ch=>ch.charCodeAt(0)))))}else GH.sha="";
      try{sessionStorage.setItem("vx_t",GH.t);localStorage.setItem("vx_r",GH.r)}catch(e){}
      ui();openA();
    }catch(e){msg.textContent="تعذّر الدخول. راجع اسم المستودع والتوكن."}
  };
}
function openA(){
  const s=modal_();
  const prods=P.map(p=>'<h3 style="margin-top:14px">'+p.n.ar+' <label class="mut"><input type="checkbox" data-off="'+p.id+'" '+(p.off?'':'checked')+' style="width:auto;margin:0 6px">ظاهر</label></h3>'+p.pk.map((k,i)=>'<div class="row"><span>'+(Array.isArray(k[0])?k[0][0]:k[0])+'</span><input type="number" min="0" data-pr="'+p.id+':'+i+'" value="'+k[1]+'" style="width:110px;margin:0"></div>').join("")).join("");
  s.innerHTML='<h2>لوحة التحكم</h2><button class="ghost" id="ordB">📦 إدارة تتبع الطلبات</button><h3>الأسعار (ج.م)</h3>'+prods+'<h3 style="margin-top:18px">أكواد الخصم (%)</h3><p class="mut">لكل كود: النسبة + الفئة اللي ينطبق عليها (أو كل المنتجات).</p><div id="cl">'+Object.entries(CODES).map(c=>codeRow(c[0],c[1])).join("")+'</div><button class="ghost" id="ca">+ كود جديد</button><h3 style="margin-top:18px">مساعد VEXORA AI – قاعدة المعرفة</h3><p class="mut">كلمات مفتاحية (بفاصلة) + إجابة. المساعد بيرد منها بس ولا يخترع.</p><div id="kl">'+(D.kb||[]).map(x=>kbRow(x.k,x.a)).join("")+'</div><button class="ghost" id="ka">+ إجابة جديدة</button><div class="note" id="amsg">التعديلات تظهر للعملاء بعد "حفظ".</div><button class="btn" id="sv">حفظ</button> <button class="ghost" data-x="am">إغلاق</button>';
  g_("ca").onclick=()=>g_("cl").insertAdjacentHTML("beforeend",codeRow("",10));
  g_("ka").onclick=()=>g_("kl").insertAdjacentHTML("beforeend",kbRow("",""));
  g_("ordB").onclick=openOrders;
  s.onclick=e=>{if(e.target.dataset&&e.target.dataset.dl)e.target.closest(".row").remove()};
  g_("sv").onclick=async()=>{
    const msg=g_("amsg"),np={},off=[],nc={};let bad=false;
    P.forEach(p=>np[p.id]=p.pk.map(k=>k[1]));
    document.querySelectorAll("#as [data-pr]").forEach(i=>{const q=i.dataset.pr.split(":"),v=Math.round(+i.value);if(i.value===""||!(v>=0))bad=true;else np[q[0]][q[1]]=v});
    document.querySelectorAll("#as [data-off]").forEach(i=>{if(!i.checked)off.push(+i.dataset.off)});
    document.querySelectorAll("#as #cl .row").forEach(r=>{const n=r.querySelector("[data-cn]").value.trim().toUpperCase().replace(/[^A-Z0-9_-]/g,""),v=Math.round(+r.querySelector("[data-cv]").value);if(!n)return;if(!(v>=1&&v<=90)){bad=true;return}const cc=r.querySelector("[data-cc]").value;nc[n]=cc?{p:v,c:cc}:v});
    if(bad){msg.textContent="تأكد من الأسعار (أرقام) ونسب الخصم (من 1 إلى 90).";return}
    const kb=[];document.querySelectorAll("#as #kl .row").forEach(r=>{const k=r.querySelector("[data-kk]").value.trim().slice(0,200),a=r.querySelector("[data-kb]").value.trim().slice(0,800);if(k&&a)kb.push({k:k,a:a})});
    const txt=JSON.stringify({prices:np,off:off,codes:nc,kb:kb.slice(0,50)},null,1);
    const b64=btoa(Array.from(new TextEncoder().encode(txt),b=>String.fromCharCode(b)).join(""));
    try{
      msg.textContent="جارٍ الحفظ…";
      const body={message:"Update prices/codes",content:b64,branch:GH.br};if(GH.sha)body.sha=GH.sha;
      const r=await gh("/contents/data.json",{method:"PUT",body:JSON.stringify(body)});
      if(!r.ok)throw 1;const j=await r.json();GH.sha=j.content.sha;applyData(JSON.parse(txt));ui();
      msg.textContent="تم الحفظ ✓ — التغيير يظهر للعملاء خلال دقيقة تقريباً."
    }catch(e){msg.textContent="تعذّر الحفظ. أعد الدخول وحاول مرة أخرى."}
  };
}
g_("adminLink").onclick=e=>{e.preventDefault();openLogin()};
fetch("data.json?v="+Date.now()).then(r=>r.ok?r.json():null).then(d=>{if(d){applyData(d);cart=cart.filter(x=>P.some(p=>p.id===x.id&&!p.off&&p.pk[x.k]));ui()}}).catch(()=>{});
document.addEventListener("touchstart",function(){},{passive:true});
document.addEventListener("pointerdown",e=>{const b=e.target.closest(".ghost,.btn,.card,.q button");if(!b)return;const r=b.getBoundingClientRect(),d=Math.max(r.width,r.height)*1.6,s=document.createElement("span");s.className="rip";s.style.cssText="width:"+d+"px;height:"+d+"px;left:"+(e.clientX-r.left-d/2)+"px;top:"+(e.clientY-r.top-d/2)+"px";b.appendChild(s);setTimeout(()=>s.remove(),650)},{passive:true});
/* ===== SMART ORDER TRACKING ===== */
const TR={o:{}};
const SL={received:["تم استلام الطلب","Order received"],paid:["تم تأكيد الدفع","Payment confirmed"],processing:["قيد التنفيذ","Processing"],ready:["جاهز للتسليم","Ready for delivery"],delivered:["تم التسليم","Delivered"],cancelled:["تم إلغاء الطلب","Cancelled"]};
const NEXT={received:["paid","cancelled"],paid:["processing","cancelled"],processing:["ready","cancelled"],ready:["delivered","cancelled"],delivered:[],cancelled:[]};
const FLOW=["received","paid","processing","ready","delivered"],FINAL=["delivered","cancelled"];
const NORM_NO=s=>String(s).trim().toUpperCase().replace(/\s/g,"");
const PH10=s=>String(s).replace(/[٠-٩]/g,d=>"٠١٢٣٤٥٦٧٨٩".indexOf(d)).replace(/\D/g,"").slice(-10);
const fdt=ts=>ts?new Date(ts).toLocaleString(L==="ar"?"ar-EG":"en-GB",{dateStyle:"medium",timeStyle:"short"}):"";
async function shaH(no,ph){const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode("vx:"+no+":"+PH10(ph)));return Array.from(new Uint8Array(b),x=>x.toString(16).padStart(2,"0")).join("")}
async function trFetch(){try{const r=await fetch("tracking.json?v="+Date.now(),{cache:"no-store"});TR.o=r.ok?((await r.json()).o||{}):{}}catch(e){}}
function trHtml(no,rec,loc){
  const ar=L==="ar",X=(a,e)=>ar?a:e,sl=k=>SL[k][ar?0:1];
  const hist=rec?rec.hist:[{t:"received",ts:loc&&loc.t||0}],st=rec?rec.st:"received",last=rec?rec.u:(loc&&loc.t||0),canc=st==="cancelled";
  const stp=(k,cls,e)=>'<div class="s '+cls+'"><i class="dot"></i><div><b>'+sl(k)+'</b>'+(e&&e.ts?'<div class="mut">'+fdt(e.ts)+'</div>':"")+(e&&e.msg?'<div>'+esc_(e.msg)+'</div>':"")+'</div></div>';
  let steps=FLOW.filter(k=>!canc||hist.some(e=>e.t===k)).map(k=>{const e=hist.find(x=>x.t===k);return stp(k,e?(st===k?"cur":"done"):"",e)}).join("");
  if(canc)steps+=stp("cancelled","bad cur",hist.find(x=>x.t==="cancelled"));
  const ups=hist.filter(e=>e.d||(e.f&&e.f===e.t&&e.msg)).reverse().map(e=>'<div class="note">'+(e.d?"⚠ "+X("تنبيه تأخير","Delay notice"):"ℹ "+X("تحديث","Update"))+' · '+fdt(e.ts)+(e.msg?'<br>'+esc_(e.msg):"")+'</div>').join("");
  const paid=hist.some(e=>e.t==="paid");
  const items=loc&&Array.isArray(loc.it)?loc.it:null;
  const prod=items?items.map(i=>'<div class="pimgs">'+(IMG[i.id]?'<img src="'+IMG[i.id]+'" alt="">':"")+'<span>'+esc_(ar?i.n:i.ne)+' — '+esc_(ar?i.l:i.le)+' × '+i.q+'</span></div>').join(""):(rec&&rec.sum?esc_(rec.sum):"");
  const row=(a,b)=>b?'<div><span>'+a+'</span><span>'+b+'</span></div>':"";
  const supp=waUrl(X("مرحباً VEXORA، محتاج مساعدة بخصوص الطلب ","Hello VEXORA, I need help with order ")+no+" ("+sl(st)+")");
  return '<div style="color:var(--iv);font-size:15px"><div class="row" style="border:0"><b>'+no+'</b><span class="tag">'+sl(st)+'</span></div><div class="tl">'+steps+'</div>'+ups+
    '<div class="td">'+row(X("المنتج","Product"),prod)+row(X("الكمية","Quantity"),items?items.reduce((a,i)=>a+i.q,0):"")+row(X("الإجمالي","Total"),loc&&loc.total?egp(loc.total):"")+row(X("حالة الدفع","Payment"),canc?"":(paid?X("تم تأكيد الدفع","Confirmed"):X("غير مؤكد بعد","Not confirmed yet")))+row(X("تاريخ الطلب","Created"),fdt(rec?rec.c:(loc&&loc.t)))+row(X("آخر تحديث","Last update"),fdt(last))+row(X("موعد التسليم المتوقع","Expected delivery"),rec&&rec.eta?esc_(rec.eta):"")+row(X("معلومات التسليم","Delivery info"),rec&&rec.dl?esc_(rec.dl):"")+'</div>'+
    (rec?"":'<div class="note">'+X("لسه مفيش تحديث من الدعم. أول ما الحالة تتحدث هتظهر هنا.","No update from support yet. Status changes will appear here.")+'</div>')+
    '<a class="btn" href="'+supp+'" target="_blank" rel="noopener" style="display:inline-block;text-decoration:none">💬 '+X("تواصل مع الدعم بخصوص الطلب","Contact support about this order")+'</a>'+
    ("Notification" in window&&Notification.permission==="default"?' <button class="ghost" id="ntf">🔔 '+X("فعّل الإشعارات","Enable notifications")+'</button>':"")+'</div>';
}
let TRK=null;
async function trPaint(){
  if(!TRK)return;const no=TRK.no,ph=TRK.ph,rec=TR.o[no],o=orders[no],lok=o&&PH10(o.ph)===PH10(ph),out=$("#tr");
  if(rec&&rec.h===await shaH(no,ph))out.innerHTML=trHtml(no,rec,lok?o:null);
  else if(lok)out.innerHTML=trHtml(no,null,o);
  else out.textContent=t("nf");
  const n=$("#ntf");if(n)n.onclick=()=>{try{Notification.requestPermission().then(trPaint)}catch(e){}};
}
async function trShow(){
  const no=NORM_NO($("#tn").value),ph=$("#tp").value,out=$("#tr");
  if(!/^VX-[A-Z0-9]{6}$/.test(no)||PH10(ph).length<10){out.textContent=t("nf");return}
  out.textContent="…";TRK={no:no,ph:ph};await trFetch();trPaint();
}
$("#tb").onclick=trShow;
let SEEN={};try{SEEN=JSON.parse(localStorage.getItem("vx_seen")||"{}")}catch(e){}
function toast(m){let e=g_("toast");if(!e){e=document.createElement("div");e.id="toast";document.body.appendChild(e)}e.textContent=m;e.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove("on"),7000)}
function trNotify(no,e){const m=(L==="ar"?"طلبك ":"Your order ")+no+": "+SL[e.t][L==="ar"?0:1]+(e.d?(L==="ar"?" — تنبيه تأخير":" — delay notice"):"")+(e.msg?" — "+e.msg:"");
  if(document.hidden&&"Notification" in window&&Notification.permission==="granted"){try{new Notification("VEXORA",{body:m})}catch(x){}}else toast(m)}
async function trPoll(){
  await trFetch();if(TRK)trPaint();let ch=false;
  for(const no of Object.keys(orders)){const rec=TR.o[no],o=orders[no];if(!rec||!o||rec.h!==await shaH(no,o.ph))continue;
    const n=rec.hist.length,s=SEEN[no];
    if(s==null){trNotify(no,rec.hist[n-1]);SEEN[no]=n;ch=true}
    else if(n>s){for(let i=s;i<n;i++)trNotify(no,rec.hist[i]);SEEN[no]=n;ch=true}}
  if(ch){try{localStorage.setItem("vx_seen",JSON.stringify(SEEN))}catch(e){}}
}
setInterval(trPoll,30000);setTimeout(trPoll,2500);document.addEventListener("visibilitychange",()=>{if(!document.hidden)trPoll()});
/* --- admin: order tracking management --- */
let TGD={o:{},sha:""};
async function tgGet(){const f=await gh("/contents/tracking.json?ref="+GH.br+"&_="+Date.now());if(f.status===404)return{o:{},sha:""};if(!f.ok)throw 1;const c=await f.json();return{o:JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(c.content.replace(/\s/g,"")),ch=>ch.charCodeAt(0)))).o||{},sha:c.sha}}
async function tgPut(o,sha,msg){const txt=JSON.stringify({o:o},null,1),b64=btoa(Array.from(new TextEncoder().encode(txt),b=>String.fromCharCode(b)).join("")),body={message:msg,content:b64,branch:GH.br};if(sha)body.sha=sha;const r=await gh("/contents/tracking.json",{method:"PUT",body:JSON.stringify(body)});if(!r.ok)throw r.status;return (await r.json()).content.sha}
async function openOrders(){
  const s=modal_();s.innerHTML='<h2>إدارة تتبع الطلبات</h2><div class="note">جارٍ التحميل…</div>';
  try{TGD=await tgGet()}catch(e){s.innerHTML='<h2>إدارة تتبع الطلبات</h2><div class="note">تعذّر تحميل ملف التتبع. أعد الدخول وحاول تاني.</div><button class="ghost" data-x="am">إغلاق</button>';return}
  ordDraw();
}
function ordOpts(){
  const no=NORM_NO(g_("on").value),r=TGD.o[no];
  g_("os").innerHTML=r?'<option value="'+r.st+'">'+SL[r.st][0]+' (تحديث بدون تغيير الحالة)</option>'+(NEXT[r.st]||[]).map(k=>'<option value="'+k+'">'+SL[k][0]+'</option>').join(""):'<option value="received">'+SL.received[0]+'</option>';
  if(r){g_("oe").value=r.eta||"";g_("ol").value=r.dl||"";g_("osu").value=r.sum||""}
  g_("oh").innerHTML=r?r.hist.map(e=>'<div class="mut">'+esc_(fdt(e.ts))+' · '+(e.f?SL[e.f][0]+' › ':'')+SL[e.t][0]+' · '+esc_(e.by||"")+(e.d?' · ⚠ تأخير':'')+(e.msg?' · '+esc_(e.msg):'')+'</div>').join(""):"";
}
function ordDraw(){
  const s=g_("as"),keys=Object.keys(TGD.o).sort((a,b)=>TGD.o[b].u-TGD.o[a].u).slice(0,40),late=keys.filter(k=>FINAL.indexOf(TGD.o[k].st)<0&&Date.now()-TGD.o[k].u>864e5);
  s.innerHTML='<h2>إدارة تتبع الطلبات</h2>'+(late.length?'<div class="note">⏰ طلبات متأخرة (بدون تحديث +24 ساعة): '+late.map(esc_).join("، ")+'</div>':'')+
   '<h3>تحديث طلب</h3><input id="on" placeholder="رقم الطلب VX-ABC123" dir="ltr"><input id="op" placeholder="هاتف العميل (للطلب الجديد)" dir="ltr" inputmode="tel"><select id="os"><option value="received">'+SL.received[0]+'</option></select><input id="om" maxlength="200" placeholder="رسالة للعميل (تظهر في التتبع)"><label class="mut"><input type="checkbox" id="od" style="width:auto;margin:0 6px">تنبيه تأخير</label><input id="oe" maxlength="100" placeholder="موعد التسليم المتوقع (اختياري)"><input id="ol" maxlength="150" placeholder="معلومات التسليم (اختياري)"><input id="osu" maxlength="200" placeholder="ملخص الطلب (اختياري)"><div id="oh"></div><div class="note" id="omsg">كل تحديث بيتسجل في السجل باسمك ومبيتمسحش.</div><button class="btn" id="osv">حفظ التحديث</button> <button class="ghost" id="obk">رجوع</button> <button class="ghost" data-x="am">إغلاق</button>'+
   '<h3 style="margin-top:18px">آخر الطلبات</h3>'+(keys.length?keys.map(k=>'<div class="row" data-o="'+esc_(k)+'" style="cursor:pointer"><span>'+esc_(k)+' · '+SL[TGD.o[k].st][0]+(FINAL.indexOf(TGD.o[k].st)<0&&late.indexOf(k)>=0?' ⏰':'')+'</span><span class="mut">'+esc_(fdt(TGD.o[k].u))+'</span></div>').join(""):'<p class="mut">لسه مفيش طلبات متتبعة.</p>');
  g_("on").oninput=ordOpts;g_("obk").onclick=openA;
  s.onclick=e=>{const r=e.target.closest("[data-o]");if(r){g_("on").value=r.dataset.o;ordOpts();g_("on").scrollIntoView()}};
  g_("osv").onclick=async()=>{
    const m=g_("omsg"),no=NORM_NO(g_("on").value);
    if(!/^VX-[A-Z0-9]{6}$/.test(no)){m.textContent="رقم الطلب غير صحيح (مثال: VX-ABC123).";return}
    const st=g_("os").value,msg=g_("om").value.trim().slice(0,200),dy=g_("od").checked,eta=g_("oe").value.trim().slice(0,100),dli=g_("ol").value.trim().slice(0,150),sum=g_("osu").value.trim().slice(0,200),ph=g_("op").value,ts=Date.now(),by=GH.user||"admin",isNew=!TGD.o[no];
    let rec=isNew?null:JSON.parse(JSON.stringify(TGD.o[no]));
    try{
      if(isNew){if(PH10(ph).length<10){m.textContent="اكتب هاتف العميل (10 أرقام على الأقل) للطلب الجديد.";return}
        rec={h:await shaH(no,ph),c:ts,u:ts,st:"received",hist:[{f:null,t:"received",ts:ts,by:by,src:"admin",msg:msg||undefined}]}}
      else{
        if(PH10(ph).length>=10&&rec.h!==await shaH(no,ph)){m.textContent="رقم الهاتف لا يطابق بيانات الطلب.";return}
        if(st!==rec.st){if(NEXT[rec.st].indexOf(st)<0){m.textContent="انتقال غير مسموح من "+SL[rec.st][0]+" إلى "+SL[st][0]+".";return}}
        else if(!msg&&!dy){m.textContent="اكتب رسالة للعميل أو فعّل تنبيه تأخير.";return}
        rec.hist.push({f:rec.st,t:st,ts:ts,by:by,src:"admin",msg:msg||undefined,d:dy?1:undefined});rec.st=st;rec.u=ts}
      eta?rec.eta=eta:delete rec.eta;dli?rec.dl=dli:delete rec.dl;sum?rec.sum=sum:delete rec.sum;
      const o2=JSON.parse(JSON.stringify(TGD.o));o2[no]=rec;
      TGD.sha=await tgPut(o2,TGD.sha,"Tracking update "+no);TGD.o=o2;ordDraw();g_("omsg").textContent="تم الحفظ ✓ — العميل هيشوف التحديث خلال دقيقة تقريباً."
    }catch(e){m.textContent=(e===409||e===422)?"التحديث اتعمل من مكان تاني. اضغط رجوع وافتح الإدارة تاني.":"تعذّر الحفظ. أعد الدخول وحاول تاني."}
  };
}
async function aiTrack(no,ph,ar,hp){
  const X=(a,e)=>ar?a:e,sl=k=>SL[k][ar?0:1];
  await trFetch();const rec=TR.o[no],o=orders[no],lok=o&&PH10(o.ph)===PH10(ph);
  const supp={l:X("💬 كلّم الدعم بخصوص الطلب","💬 Contact support about this order"),a:"w:"+X("مرحباً VEXORA، محتاج مساعدة بخصوص الطلب ","Hello VEXORA, I need help with order ")+no};
  if(rec&&rec.h===await shaH(no,ph)){
    const last=rec.hist[rec.hist.length-1],fin=FINAL.indexOf(rec.st)>=0;
    let t=X("حالة الطلب "+no+": "+sl(rec.st)+"\nآخر تحديث: "+fdt(rec.u),"Order "+no+": "+sl(rec.st)+"\nLast update: "+fdt(rec.u));
    t+="\n\n"+X("سجل التتبع:\n","Tracking history:\n")+rec.hist.map(e=>"• "+sl(e.t)+" — "+fdt(e.ts)+(e.d?" ⚠":"")+(e.msg?" — "+e.msg:"")).join("\n");
    if(rec.eta)t+="\n\n"+X("موعد التسليم المتوقع (من الدعم): ","Expected delivery (from support): ")+rec.eta;
    if(rec.dl)t+="\n"+X("معلومات التسليم: ","Delivery info: ")+rec.dl;
    if(last.d)t+="\n\n"+X("فيه تنبيه تأخير مسجل على الطلب.","A delay notice is recorded on this order.");
    else if(!fin&&Date.now()-rec.u>864e5)t+="\n\n"+X("آخر تحديث من أكتر من 24 ساعة. مقدرش أحدد السبب، بس تقدر تبعت للدعم رقم الطلب.","The last update was over 24 hours ago. I can't tell the reason, but you can send the order number to support.");
    return{t:t,c:[supp]}}
  if(lok)return{t:X("طلبك "+no+" مسجل على جهازك. لسه مفيش تحديث من الدعم، والحالة المسجلة: "+sl("received")+(o.t?" ("+fdt(o.t)+")":"")+"\nلو عدّى وقت، ابعت رقم الطلب للدعم.","Your order "+no+" is saved on this device. There's no update from support yet; recorded status: "+sl("received")+(o.t?" ("+fdt(o.t)+")":"")+"\nIf it's been a while, send the order number to support."),c:[supp]};
  return{t:X("مش لاقي طلب بالبيانات دي. اتأكد من رقم الطلب والهاتف، أو كلّم الدعم.","I couldn't find an order with these details. Check the order number and phone, or contact support."),c:[hp]}
}
/* load AI module */
{const sc=document.createElement("script");sc.src="ai.js";document.body.appendChild(sc)}
