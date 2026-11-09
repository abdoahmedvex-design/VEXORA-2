let D={};
const IMG={1:"108863.jpg",2:"108864.jpg",7:"108868.jpg",8:"108865.jpg",9:"108866.jpg",10:"108867.jpg",11:"109229.jpg",12:"109263.jpg"};
const T={
ar:{tag:"عالمك الرقمي بمستوى أرقى",sub:"شحن ألعاب وبطاقات هدايا ومنتجات رقمية أصلية في مصر.",explore:"تصفّح المتجر",products:"المنتجات",all:"الكل",demo:"أسعار PUBG Mobile UC وبطاقات Steam فعلية، أما باقي المنتجات فتجريبية (Demo) حتى تأكيد أسعارها.",why:"لماذا VEXORA؟",w1:"منتجات أصلية",w1d:"من موردين معتمدين فقط.",w2:"تسليم سريع",w2d:"الوقت المتوقع موضّح لكل منتج.",w3:"دفع محلي",w3d:"فودافون كاش وإنستاباي وتحويل بنكي.",track:"تتبّع طلبك",orderNo:"رقم الطلب",phone:"رقم الهاتف",trackBtn:"تتبّع",nf:"لم يتم العثور على الطلب.",add:"أضف للسلة",pkg:"اختر الباقة",pid:"معرّف اللاعب (Player ID)",cart:"السلة",empty:"السلة فارغة.",sub2:"المجموع الفرعي",disc:"كود الخصم",apply:"تطبيق",total:"الإجمالي",name:"الاسم الكامل",email:"البريد (اختياري)",pay:"طريقة الدفع",place:"إرسال طلب الشراء",bad:"أكمل البيانات المطلوبة.",done:"تم استلام طلبك رقم",payn:"لم يتم تأكيد أي دفعة بعد. أرسل الطلب عبر واتساب لإتمام الدفع، والحالة: في انتظار الدفع.",status:"الحالة",unpaid:"غير مدفوع",eta:"التسليم",avail:"متوفر",bank:"تحويل بنكي",wa:"أرسل الطلب عبر واتساب",dsc:"الخصم",badc:"كود الخصم غير صحيح",onlyc:"هذا الكود يخص فئة:",close:"إغلاق",cat:{gaming:"ألعاب",gift:"بطاقات هدايا",subs:"اشتراكات"}},
en:{tag:"Your Digital World Elevated",sub:"Authentic game top-ups, gift cards and digital products in Egypt.",explore:"Explore Store",products:"Products",all:"All",demo:"PUBG Mobile UC and Steam prices are live; other products are demo (Demo) until their prices are confirmed.",why:"Why VEXORA?",w1:"Authentic products",w1d:"Authorized suppliers only.",w2:"Fast delivery",w2d:"Estimated time shown per product.",w3:"Local payment",w3d:"Vodafone Cash, InstaPay, bank transfer.",track:"Track your order",orderNo:"Order number",phone:"Phone number",trackBtn:"Track",nf:"Order not found.",add:"Add to cart",pkg:"Choose a package",pid:"Player ID",cart:"Cart",empty:"Your cart is empty.",sub2:"Subtotal",disc:"Discount code",apply:"Apply",total:"Total",name:"Full name",email:"Email (optional)",pay:"Payment method",place:"Submit order request",bad:"Please fill in the required fields.",done:"Order received:",payn:"No payment confirmed yet. Send the order via WhatsApp to complete payment. Status: Awaiting Payment.",status:"Status",unpaid:"Unpaid",eta:"Delivery",avail:"In stock",bank:"Bank transfer",wa:"Send order via WhatsApp",dsc:"Discount",badc:"Invalid discount code",onlyc:"This code applies only to:",close:"Close",cat:{gaming:"Gaming",gift:"Gift Cards",subs:"Subscriptions"}}
};
const P=[
{id:1,c:"gaming",i:"🎯",n:{ar:"شحن PUBG Mobile UC",en:"PUBG Mobile UC"},pk:[["30 UC",25],["60 UC",50],["325 UC",250],["660 UC",500],["1,800 UC",1250],["3,850 UC",2500],["8,100 UC",5000],["16,200 UC",10000],["24,300 UC",15000],["32,400 UC",20000],["40,500 UC",25000],["48,600 UC",30000]],real:1,pid:1,eta:{ar:"5–15 دقيقة",en:"5–15 min"},dm:{ar:"شحن مباشر بالـ Player ID",en:"Direct top-up via Player ID"}},
{id:11,c:"gaming",i:"🎯",n:{ar:"ببجي نيو ستيت (NC)",en:"PUBG New State (NC)"},pk:[["300 NC",75],[["1,500 NC + 80 NC مجاناً","1,500 NC + 80 NC free"],325],[["3,600 NC + 250 NC مجاناً","3,600 NC + 250 NC free"],780],[["9,300 NC + 930 NC مجاناً","9,300 NC + 930 NC free"],2000],[["15,000 NC + 1,800 NC مجاناً","15,000 NC + 1,800 NC free"],3200],[["30,000 NC + 5,000 NC مجاناً","30,000 NC + 5,000 NC free"],6370]],real:1,pid:1,eta:{ar:"5–15 دقيقة",en:"5–15 min"},dm:{ar:"شحن مباشر بالـ Player ID",en:"Direct top-up via Player ID"}},
{id:2,c:"gift",i:"♨",n:{ar:"بطاقة Steam (ريال سعودي 🇸🇦)",en:"Steam Wallet (SAR 🇸🇦)"},pk:[["20 SAR",360],["50 SAR",890],["100 SAR",1780],["200 SAR",3550]],real:1,eta:{ar:"خلال دقائق",en:"Within minutes"},dm:{ar:"كود رقمي بالبريد/واتساب",en:"Digital code"}},
{id:7,c:"gift",i:"🎮",n:{ar:"بطاقة PlayStation",en:"PlayStation"},pk:[["$5",330],["$10",735],["$20",1445],["$50",3645],[["$10 (السعر الثاني)","$10 (2nd price)"],675],[["$20 (السعر الثاني)","$20 (2nd price)"],1330],["$100",7235]],real:1,eta:{ar:"خلال دقائق",en:"Within minutes"},dm:{ar:"كود رقمي",en:"Digital code"}},
{id:8,c:"gift",i:"❎",n:{ar:"Xbox – بطاقات و Game Pass",en:"Xbox Cards & Game Pass"},pk:[[["50 ريال سعودي","SAR 50"],825],[["100 ريال سعودي","SAR 100"],1645],[["200 ريال سعودي","SAR 200"],3295],[["300 ريال سعودي","SAR 300"],4945],[["Game Pass 3 شهور","Game Pass 3 months"],1875],[["Game Pass 6 شهور","Game Pass 6 months"],3750],[["Ultimate شهر","Ultimate 1 month"],880]],real:1,eta:{ar:"خلال دقائق",en:"Within minutes"},dm:{ar:"كود رقمي",en:"Digital code"}},
{id:9,c:"subs",i:"🎬",n:{ar:"OSN Plus",en:"OSN Plus"},pk:[[["شهر بإعلانات","1 month with ads"],90],[["سنة بإعلانات","1 year with ads"],880],[["Standard شهر","Standard 1 month"],145],[["Standard سنة","Standard 1 year"],1465],[["Premium شهر","Premium 1 month"],175],[["Premium سنة","Premium 1 year"],1955]],real:1,eta:{ar:"خلال دقائق",en:"Within minutes"},dm:{ar:"كود رقمي",en:"Digital code"}},
{id:10,c:"subs",i:"🍿",n:{ar:"Netflix",en:"Netflix"},pk:[[["الأساسية 720p – شهر (جهاز 1)","Basic 720p – 1 month (1 device)"],110],[["القياسية 1080p – شهر (جهازان)","Standard 1080p – 1 month (2 devices)"],190],[["غالي 4K+HDR – شهر (4 أجهزة)","Premium 4K+HDR – 1 month (4 devices)"],270]],real:1,eta:{ar:"خلال دقائق",en:"Within minutes"},dm:{ar:"اشتراك شهري",en:"Monthly subscription"}},
{id:12,c:"subs",i:"🎵",n:{ar:"انغامي بلس",en:"Anghami Plus"},pk:[[["شهر","1 month"],80],[["3 شهور","3 months"],225],[["6 شهور","6 months"],440],[["سنة","1 year"],870],[["الاشتراك العائلي – شهر","Family – 1 month"],125],[["الاشتراك العائلي – 3 شهور","Family – 3 months"],360],[["الاشتراك العائلي – 6 شهور","Family – 6 months"],700]],real:1,eta:{ar:"خلال دقائق",en:"Within minutes"},dm:{ar:"اشتراك رقمي",en:"Digital subscription"}}
];
let CODES={};const BASE=P.map(p=>p.pk.map(k=>k[1]));function applyData(d){D=d||{};CODES=D.codes||{};P.forEach((p,pi)=>{const o=(D.prices||{})[p.id];p.pk.forEach((k,i)=>{k[1]=o&&o[i]!=null?+o[i]:BASE[pi][i]});p.off=(D.off||[]).includes(p.id)&&!P.every(q=>(D.off||[]).includes(q.id))})}applyData(D);const WA_NUM="201004063941";const waUrl=x=>WA_NUM?"https://wa.me/"+WA_NUM+"?text="+encodeURIComponent(x):"https://wa.me/message/HSWZ5YOLQCLCE1";
let L="ar",F="all",cart=[],disc=0,sel=null,orders={};
try{cart=JSON.parse(localStorage.getItem("vx_cart")||"[]");orders=JSON.parse(localStorage.getItem("vx_orders")||"{}")}catch(e){}
cart=cart.filter(x=>P.some(p=>p.id===x.id&&!p.off&&p.pk[x.k]));const $=s=>document.querySelector(s),t=k=>T[L][k];
const save=()=>{try{localStorage.setItem("vx_cart",JSON.stringify(cart));localStorage.setItem("vx_orders",JSON.stringify(orders))}catch(e){}};
const egp=n=>n.toLocaleString(L==="ar"?"ar-EG":"en-US")+(L==="ar"?" ج.م":" EGP");
function ui(){
  document.documentElement.lang=L;document.documentElement.dir=L==="ar"?"rtl":"ltr";
  $("#lang").textContent=L==="ar"?"EN":"عربي";
  document.querySelectorAll("[data-i]").forEach(e=>e.textContent=t(e.dataset.i));
  document.querySelectorAll("[data-ph]").forEach(e=>e.placeholder=t(e.dataset.ph));
  $("#tabs").innerHTML=["all",...new Set(P.filter(p=>!p.off).map(p=>p.c))].map(k=>`<button class="ghost ${F===k?"on":""}" data-f="${k}">${k==="all"?t("all"):t("cat")[k]}</button>`).join("");
  const vs=P.filter(p=>!p.off&&(F==="all"||p.c===F)),cd=(p,i)=>`<div class="card" style="animation-delay:${i*60}ms" data-p="${p.id}"><div class="ico">${IMG[p.id]?`<img src="${IMG[p.id]}" alt="${p.n[L]}" loading="lazy" onerror="this.remove()">`:p.i}</div><b>${p.n[L]}</b><div class="mut">${egp(Math.min(...p.pk.map(k=>k[1])))}+</div></div>`;
  $("#grid").className=F==="all"?"grid grp":"grid";
  $("#grid").innerHTML=F==="all"?["gaming","gift","subs"].map(c=>{const a=vs.filter(p=>p.c===c);return a.length?`<div class="catsec"><div class="cath"><span>${{gaming:"🎮",gift:"🎁",subs:"📺"}[c]} ${t("cat")[c]}</span><small>${a.length}</small></div><div class="grid">${a.map(cd).join("")}</div></div>`:""}).join(""):vs.map(cd).join("");
  $("#cc").textContent=cart.reduce((a,b)=>a+b.q,0);
}
function openP(id){
  const p=P.find(x=>x.id==id);sel=0;
  const draw=()=>{$("#ps").innerHTML=(IMG[p.id]?`<img class="pimg" src="${IMG[p.id]}" alt="${p.n[L]}" onerror="this.remove()">`:"")+`<h2>${p.n[L]}</h2><p class="mut">${p.dm[L]} · ${t("eta")}: ${p.eta[L]} · ${t("avail")}</p><p style="margin-top:10px">${t("pkg")}</p><div class="pk">${p.pk.map((k,j)=>`<button class="ghost ${j===sel?"on":""}" data-k="${j}">${lb(k)} — ${egp(k[1])}</button>`).join("")}</div>${p.pid?`<input id="pidIn" placeholder="${t("pid")}" inputmode="numeric">`:""}<h2>${egp(p.pk[sel][1])}</h2><button class="btn" id="addB">${t("add")}</button> <button class="ghost" data-x="pm">${t("close")}</button>`;
    $("#ps").querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>{sel=+b.dataset.k;draw()});
    $("#addB").onclick=()=>{let pid="";if(p.pid){pid=$("#pidIn").value.trim();if(!/^\d{5,14}$/.test(pid)){$("#pidIn").style.borderColor="#c55";return}}
      const key=p.id+"-"+sel+"-"+pid,ex=cart.find(x=>x.key===key);ex?ex.q++:cart.push({key,id:p.id,k:sel,pid,q:1});save();ui();$("#pm").classList.remove("on");const cb=$("#cartBtn");cb.classList.remove("bump");void cb.offsetWidth;cb.classList.add("bump")};
  };draw();$("#pm").classList.add("on");
}
const lb=k=>Array.isArray(k[0])?k[0][L==="ar"?0:1]:k[0];const line=x=>{const p=P.find(a=>a.id===x.id);return{p,pk:p.pk[x.k]}};
const sub=()=>cart.reduce((a,x)=>a+line(x).pk[1]*x.q,0);
const dsc=()=>disc?Math.round(cart.reduce((a,x)=>{const l=line(x);return a+(!disc.c||l.p.c===disc.c?l.pk[1]*x.q:0)},0)*disc.p/100):0;
function openC(msg,wa,txt){
  const s=sub(),dd=dsc(),tot=s-dd,needPid=cart.some(x=>x.pid);
  $("#cs").innerHTML=`<h2>${t("cart")}</h2>`+(cart.length?cart.map((x,i)=>{const l=line(x);return`<div class="row"><div>${l.p.n[L]} · ${lb(l.pk)}<div class="mut">${x.pid?"ID: "+x.pid+" · ":""}${egp(l.pk[1])}</div></div><div class="q"><button data-m="${i}">−</button> ${x.q} <button data-a="${i}">+</button></div></div>`}).join("")+
  `<div class="row"><span>${t("sub2")}</span><span>${egp(s)}</span></div>${dd?`<div class="row"><span>${t("dsc")} (${disc.p}%${disc.c?" – "+t("cat")[disc.c]:""})</span><span>−${egp(dd)}</span></div>`:""}<div style="display:flex;gap:8px"><input id="dc" placeholder="${t("disc")}"><button class="ghost" id="da">${t("apply")}</button></div><div class="row"><b>${t("total")}</b><b style="color:var(--gold)">${egp(tot)}</b></div>
  <input id="cn" placeholder="${t("name")}"><input id="cp" placeholder="${t("phone")}" inputmode="tel"><input id="ce" placeholder="${t("email")}" type="email">
  <select id="cy"><option>Vodafone Cash</option><option>InstaPay</option><option>${t("bank")}</option></select>
  <div class="note">${t("payn")}</div><button class="btn" id="pl">${t("place")}</button>`:`<p class="mut">${t("empty")}</p>`)+(msg?`<div class="note">${msg}</div>`:"")+(wa?`<a class="btn" id="wab" href="${wa}" target="_blank" rel="noopener" style="display:inline-block;text-decoration:none;margin-top:10px">💬 ${t("wa")}</a> `:"")+(txt?`<textarea id="wat" readonly style="width:100%;height:130px;background:var(--ch);border:1px solid var(--line);border-radius:10px;padding:10px;margin-top:10px">${txt.replace(/</g,"&lt;")}</textarea><button class="ghost" id="wac">${L==="ar"?"نسخ الرسالة":"Copy message"}</button>`:"")+` <button class="ghost" data-x="cm" style="margin-top:10px">${t("close")}</button>`;
  $("#cm").classList.add("on");
  const cp=()=>{const a=$("#wat");if(!a)return;a.select();try{navigator.clipboard.writeText(a.value)}catch(e){}try{document.execCommand("copy")}catch(e){}};const w=$("#wab");if(w)w.onclick=cp;const wc=$("#wac");if(wc)wc.onclick=cp;
  $("#cs").querySelectorAll("[data-m]").forEach(b=>b.onclick=()=>{const x=cart[b.dataset.m];if(--x.q<1)cart.splice(b.dataset.m,1);save();ui();openC()});
  $("#cs").querySelectorAll("[data-a]").forEach(b=>b.onclick=()=>{cart[b.dataset.a].q++;save();ui();openC()});
  if(cart.length){
    $("#da").onclick=()=>{const k=$("#dc").value.trim().toUpperCase(),v=CODES[k];if(!v){disc=0;openC(t("badc"));return}disc={p:+(typeof v==="object"?v.p:v),c:typeof v==="object"?(v.c||""):"",code:k};if(!dsc()){const c=disc.c;disc=0;openC(t("onlyc")+" "+t("cat")[c]);return}openC()};
    $("#pl").onclick=()=>{const n=$("#cn").value.trim(),ph=$("#cp").value.trim();
      if(n.length<2||!/^\+?\d{10,14}$/.test(ph)){openC(t("bad"));return}
      const no="VX-"+Math.random().toString(36).slice(2,8).toUpperCase();
      orders[no]={ph,total:tot,status:"Awaiting Payment",pay:"Unpaid",method:$("#cy").value,items:cart.length,t:Date.now(),it:cart.map(x=>{const l=line(x);return{id:x.id,n:l.p.n.ar,ne:l.p.n.en,l:lbl(l.pk,1),le:lbl(l.pk,0),q:x.q,pr:l.pk[1]}})};
      const txt=(L==="ar"?"مرحباً VEXORA، أريد تأكيد طلبي رقم ":"Hello VEXORA, I'd like to confirm my order ")+no+":\n"+cart.map(x=>{const l=line(x);return "• "+l.p.n[L]+" – "+lb(l.pk)+(x.pid?" (ID: "+x.pid+")":"")+" × "+x.q}).join("\n")+(dd?"\n"+t("dsc")+": −"+egp(dd)+" ("+disc.code+")":"")+"\n"+t("total")+": "+egp(tot)+"\n"+t("name")+": "+n+"\n"+t("phone")+": "+ph+"\n"+t("pay")+": "+$("#cy").value;
      $("#tn").value=no;$("#tp").value=ph;cart=[];disc=0;save();ui();openC(t("done")+" "+no+" — "+t("payn"),waUrl(txt),txt)};
  }
}
document.addEventListener("click",e=>{
  const f=e.target.closest("[data-f]");if(f){F=f.dataset.f;ui()}
  const c=e.target.closest("[data-p]");if(c)openP(c.dataset.p);
  const x=e.target.closest("[data-x]");if(x)$("#"+x.dataset.x).classList.remove("on");
  if(e.target.classList.contains("modal"))e.target.classList.remove("on");
});
$("#lang").onclick=()=>{L=L==="ar"?"en":"ar";ui()};
$("#cartBtn").onclick=()=>openC();
