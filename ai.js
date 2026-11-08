/* ===== VEXORA AI CORE (محلي - بدون API) ===== */
const AI={h:[],pend:null};
try{AI.h=JSON.parse(localStorage.getItem("vx_chat")||"[]").slice(-40)}catch(e){}
const aiSave=()=>{try{localStorage.setItem("vx_chat",JSON.stringify(AI.h.slice(-40)))}catch(e){}};
const nz=s=>String(s).toLowerCase().replace(/(\d),(\d)/g,"$1$2").replace(/[\u064B-\u0652\u0640]/g,"").replace(/[أإآ]/g,"ا").replace(/ى/g,"ي").replace(/ة/g,"ه").replace(/[٠-٩]/g,d=>"٠١٢٣٤٥٦٧٨٩".indexOf(d)).replace(/[^\u0621-\u064Aa-z0-9 ]/g," ").replace(/\s+/g," ").trim();
const ALIAS={1:"pubg|ببجي|بوبجي|شدات|شده|uc|يو سي|bgmi",2:"steam|ستيم",7:"playstation|بلايستيشن|بلاي ستيشن|ps|psn|ps4|ps5|سوني",8:"xbox|اكس بوكس|اكسبوكس|game pass|جيم باس|جيمباس|ultimate",9:"osn|اوسن",10:"netflix|نتفليكس|نتفلكس",11:"new state|نيو ستيت|نيو ستايت|nc|ان سي",12:"anghami|انغامي|انغامى"};
const has=(n,w)=>{w=nz(w);if(!w)return false;return w.length<=3?(" "+n+" ").includes(" "+w+" "):n.includes(w)};
const any=(n,l)=>l.some(w=>has(n,w));
const findP=n=>{let r=P.filter(p=>any(n,(ALIAS[p.id]||"").split("|").concat([p.n.ar,p.n.en])));if(r.some(p=>p.id===11)&&!any(n,["uc","يو سي","شدات","شده","قارن","مقارنه","compare","vs","ولا","الفرق"]))r=r.filter(p=>p.id!==1);return r};
const lbl=(k,ar)=>Array.isArray(k[0])?k[0][ar?0:1]:k[0];
const mny=(v,ar)=>v.toLocaleString(ar?"ar-EG":"en-US")+(ar?" ج.م":" EGP");
const pnm=(p,ar)=>p.n[ar?"ar":"en"];
const pmin=p=>Math.min(...p.pk.map(k=>k[1])),pmax=p=>Math.max(...p.pk.map(k=>k[1]));
const plist=(p,ar,max)=>{max=max||8;const a=p.pk.map(k=>"• "+lbl(k,ar)+" — "+mny(k[1],ar));return(a.length>max?a.slice(0,max).concat([ar?"… وباقي الباقات في صفحة المنتج":"… more packages on the product page"]):a).join("\n")};
const chipP=(p,ar)=>({l:(ar?"افتح ":"Open ")+pnm(p,ar),a:"p:"+p.id});
const kbBest=n=>{let b=null,bs=0;(D.kb||[]).forEach(e=>{const s=String(e.k||"").split(/[,،]/).map(x=>x.trim()).filter(Boolean).filter(w=>has(n,w)).length;if(s>bs){bs=s;b=e}});return b};
const catOf=n=>any(n,["اشتراك","اشتراكات","مسلسل","مسلسلات","فيلم","افلام","مشاهده","subscription","streaming","watch","series","movies"])?"subs":any(n,["بطاقه","بطاقات","كارت","كروت","gift","card","cards"])?"gift":any(n,["العاب","لعبه","gaming","game","games"])?"gaming":"";
function aiAnswer(raw){
  const rl=raw.replace(/VX[-\s]?[A-Za-z0-9]{6}/gi,""),ar=/[\u0600-\u06FF]/.test(rl)||(!/[a-z]/i.test(rl)&&L==="ar"),n=nz(raw),X=(a,e)=>ar?a:e;
  const nd=raw.replace(/[٠-٩]/g,d=>"٠١٢٣٤٥٦٧٨٩".indexOf(d));
  const hp={l:X("💬 كلّم الدعم على واتساب","💬 Chat with support on WhatsApp"),a:"w:"+X("مرحباً VEXORA، محتاج مساعدة: ","Hello VEXORA, I need help: ")+raw.slice(0,200)};
  const vis=P.filter(p=>!p.off),prods=findP(n);
  if(AI.pend){const ph=nd.match(/\+?\d{10,14}/);if(ph){const no=AI.pend;AI.pend=null;return aiTrack(no,ph[0],ar,hp)}}
  const oc=raw.match(/VX[-\s]?([A-Za-z0-9]{6})/i);
  if(oc){const no="VX-"+oc[1].toUpperCase(),ph=nd.replace(oc[0],"").match(/\+?\d{10,14}/);if(ph)return aiTrack(no,ph[0],ar,hp);AI.pend=no;return{t:X("تمام، رقم طلبك "+no+". ابعتلي رقم الهاتف اللي استخدمته في الطلب عشان أتأكد.","Got it, order "+no+". Send me the phone number used on the order to verify."),c:[]}}
  const nums=(nd.replace(/VX[-\s]?[A-Za-z0-9]{6}/gi,"").match(/\d+(?:\.\d+)?/g)||[]).map(Number);
  if(any(n,["تتبع","track","فين طلبي","حاله الطلب","حاله طلبي","فين الاوردر","order status","where is my order"]))return{t:X("ابعتلي رقم طلبك (بيبدأ بـ VX-) ورقم الهاتف، وأقولك حالته.","Send me your order number (starts with VX-) and your phone number and I'll check it."),c:[]};
  if(any(n,["موظف","خدمه العملاء","اكلم","كلم","مسؤول","واتس","دعم","شخص","human","agent","support","whatsapp","complaint","شكوي"]))return{t:X("تمام، هحوّلك لفريق الدعم على واتساب وهيساعدوك.","Sure, I'll connect you to our support team on WhatsApp."),c:[hp]};
  const kb=kbBest(n);if(kb)return{t:kb.a,c:[]};
  if(!prods.length&&n.split(" ").length<=3&&any(n,["اهلا","اهلين","مرحبا","هلا","السلام","سلام","هاي","ازيك","صباح","مساء","hello","hi","hey"]))return{t:X("أهلاً بيك في VEXORA 👋 اسألني عن أسعار المنتجات والباقات أو قارن بينها، وأي حاجة مش متأكد منها هحوّلك للدعم.","Welcome to VEXORA 👋 Ask me about product prices and packages or compare them. Anything I'm unsure about, I'll hand to support."),c:[]};
  const tok=(raw.toUpperCase().match(/[A-Z0-9_-]{3,}/g)||[]).find(t=>CODES[t]);
  if(tok){const v=CODES[tok],pc=typeof v==="object"?+v.p:+v,c=typeof v==="object"?v.c:"";return{t:X("كود "+tok+" صالح: خصم "+pc+"%"+(c?" على فئة "+T.ar.cat[c]+" فقط":" على كل المنتجات")+". اكتبه في خانة كود الخصم داخل السلة.","Code "+tok+" is valid: "+pc+"% off"+(c?" on "+T.en.cat[c]+" only":" on all products")+". Enter it in the discount field in your cart."),c:[]}}
  if(any(n,["خصم","كوبون","discount","coupon","promo","كود"]))return{t:X("اكتب كود الخصم في خانة الكود داخل السلة. لو معاك كود ابعتهولي وأتأكد منه. مقدرش أعرض أكواد مش معلنة.","Enter your discount code in the cart. If you have a code, send it and I'll verify it. I can't list codes that haven't been announced."),c:[]};
  if(prods.length>=2){return{t:prods.slice(0,4).map(p=>"▪ "+pnm(p,ar)+"\n  "+X("السعر: من ","Price: from ")+mny(pmin(p),ar)+X(" إلى "," to ")+mny(pmax(p),ar)+"\n  "+X("عدد الباقات: ","Packages: ")+p.pk.length+"\n  "+X("التسليم: ","Delivery: ")+p.eta[ar?"ar":"en"]+" · "+p.dm[ar?"ar":"en"]).join("\n\n"),c:prods.slice(0,4).map(p=>chipP(p,ar))}}
  const B=nums.find(x=>x>=20);
  if(B&&!prods.length&&any(n,["ميزانيت","معايا","معي","budget","under","اقل من","حدود","جنيه","egp","لحد","اشتري","اطلب","رشح","اقترح","recommend"])){
    const cat=catOf(n),pool=vis.filter(p=>!cat||p.c===cat),res=pool.map(p=>{const k=p.pk.filter(k=>k[1]<=B).sort((a,b)=>b[1]-a[1])[0];return k?{p,k}:null}).filter(Boolean);
    if(res.length)return{t:X("بميزانية "+mny(B,1)+" تقدر تاخد:\n","With "+mny(B,0)+" you can get:\n")+res.map(x=>"• "+pnm(x.p,ar)+" — "+lbl(x.k,ar)+" ("+mny(x.k[1],ar)+")").join("\n"),c:res.slice(0,4).map(x=>chipP(x.p,ar))};
    return{t:X("الميزانية دي أقل من أقل باقة عندنا. أقل سعر متاح: "+mny(Math.min(...pool.map(pmin)),1),"That's below our lowest package. Lowest available price: "+mny(Math.min(...pool.map(pmin)),0)),c:[]}}
  if(prods.length===1){
    const p=prods[0],c=[chipP(p,ar)];
    if(p.off)return{t:X(pnm(p,1)+" مش معروض حالياً. كلّم الدعم لو محتاجه.",pnm(p,0)+" isn't listed right now. Contact support if you need it."),c:[hp]};
    if(any(n,["متاح","متوفر","موجود","available","in stock","stock"]))return{t:X(pnm(p,1)+" معروض حالياً في المتجر. تأكيد الكمية بيتم وقت الطلب على واتساب.",pnm(p,0)+" is currently listed in the store. Quantity is confirmed with support when you order."),c};
    if(any(n,["امتي","وقت","توصيل","تسليم","يوصل","delivery","how long","eta"]))return{t:X("تسليم "+pnm(p,1)+": "+p.eta.ar+"\nالطريقة: "+p.dm.ar,"Delivery for "+pnm(p,0)+": "+p.eta.en+"\nMethod: "+p.dm.en),c};
    if(nums.length){const m=[];p.pk.forEach(k=>{if(nums.some(x=>x===k[1]||[lbl(k,1),lbl(k,0)].some(l=>nz(l).split(" ").includes(String(x)))))m.push(k)});
      if(m.length)return{t:X("أسعار "+pnm(p,1)+":\n","Prices for "+pnm(p,0)+":\n")+m.map(k=>"• "+lbl(k,ar)+" — "+mny(k[1],ar)).join("\n")+(p.pid?X("\nلازم تكتب Player ID وقت الطلب.","\nA Player ID is required when ordering."):""),c};
      return{t:X("مفيش باقة بالرقم ده في "+pnm(p,1)+". الباقات المعروضة:\n","No package with that number for "+pnm(p,0)+". Available packages:\n")+plist(p,ar),c}}
    return{t:pnm(p,ar)+"\n"+plist(p,ar)+"\n"+X("التسليم: ","Delivery: ")+p.eta[ar?"ar":"en"]+" · "+p.dm[ar?"ar":"en"]+(p.pid?X("\nلازم تكتب Player ID وقت الطلب.","\nA Player ID is required when ordering."):""),c}}
  if(any(n,["دفع","ادفع","فودافون","انستا","instapay","تحويل","vodafone","payment","pay","كاش"]))return{t:X("وسائل الدفع: فودافون كاش، إنستاباي، أو تحويل بنكي. بعد ما تبعت الطلب على واتساب الدعم بيكمّل معاك الدفع، والطلب مش بيتحسب مدفوع إلا بعد تأكيد الدفع.","Payment methods: Vodafone Cash, InstaPay, or bank transfer. After you send your order on WhatsApp, support completes the payment with you. An order isn't counted as paid until payment is confirmed."),c:[hp]};
  if(any(n,["اشتري","اطلب","شراء","buy","purchase","how to order","اشحن","طريقه الطلب"]))return{t:X("1) اختار المنتج والباقة (وPlayer ID لو ببجي)\n2) أضف للسلة\n3) من السلة اكتب بياناتك واختار طريقة الدفع واضغط إرسال الطلب\n4) هيفتحلك واتساب برسالة جاهزة فيها طلبك، ابعتها وكمّل الدفع مع الدعم.","1) Pick a product and package (and your Player ID for PUBG)\n2) Add to cart\n3) In the cart enter your details, choose a payment method and submit\n4) WhatsApp opens with your order ready to send. Send it and finish payment with support."),c:[]};
  if(any(n,["امتي","وقت","توصيل","تسليم","يوصل","delivery","how long","eta"]))return{t:X("وقت التسليم:\n","Delivery times:\n")+vis.map(p=>"• "+pnm(p,ar)+": "+p.eta[ar?"ar":"en"]).join("\n"),c:[]};
  const cat=catOf(n);
  if(cat||any(n,["ايه عندكم","عندكم","منتجات","المنتجات","اسعار","الاسعار","products","catalog","prices","what do you"])||any(n,["رشح","اقترح","انصح","recommend","suggest","محتار"])){
    const pool=vis.filter(p=>!cat||p.c===cat);
    if(pool.length)return{t:(cat?X("المتاح في "+T.ar.cat[cat]+":\n","Available in "+T.en.cat[cat]+":\n"):X("المنتجات المتاحة:\n","Available products:\n"))+pool.map(p=>"• "+pnm(p,ar)+" — "+X("من ","from ")+mny(pmin(p),ar)).join("\n")+X("\n\nقولي ميزانيتك أو المنتج اللي عايزه وأرشحلك.","\n\nTell me your budget or the product you want and I'll suggest options."),c:pool.slice(0,4).map(p=>chipP(p,ar))}}
  return{t:X("معنديش إجابة مؤكدة على ده. أقدر أساعدك في الأسعار والباقات والمقارنات وتتبع الطلب، وأي حاجة تانية الدعم هيرد عليها على واتساب.","I don't have a confirmed answer for that. I can help with prices, packages, comparisons and order tracking. For anything else, support will reply on WhatsApp."),c:[hp]}
}
function aiRender(){
  const log=g_("ailog");if(!log)return;
  log.innerHTML=AI.h.map((m,i)=>'<div class="mg '+m.r+'">'+esc_(m.t).replace(/\n/g,"<br>")+(m.r==="a"?'<div class="fb"><button data-fb="'+i+':1" class="'+(m.f===1?"on":"")+'">👍</button><button data-fb="'+i+':-1" class="'+(m.f===-1?"on":"")+'">👎</button></div>':"")+((m.c&&m.c.length)?'<div class="chips">'+m.c.map(c=>'<button class="ghost" data-a="'+esc_(c.a)+'">'+esc_(c.l)+'</button>').join("")+'</div>':"")+'</div>').join("");
  log.scrollTop=log.scrollHeight;
}
function aiWelcome(){const ar=L==="ar";AI.h.push({r:"a",t:ar?"أهلاً بيك في VEXORA 👋 أنا مساعد المتجر. بجاوب على الأسعار والباقات والمقارنات من بيانات المتجر الحالية بس، وأي حاجة مش متأكد منها بحوّلك للدعم على واتساب.":"Welcome to VEXORA 👋 I'm the store assistant. I answer about prices, packages and comparisons from the store's current data only, and hand anything I'm unsure about to WhatsApp support.",c:ar?[{l:"سعر شدات ببجي",a:"q:سعر شدات ببجي"},{l:"قارن Xbox وPlayStation",a:"q:قارن بين Xbox وPlayStation"},{l:"ميزانيتي 500 جنيه",a:"q:ميزانيتي 500 جنيه أشتري إيه؟"},{l:"تتبع طلبي",a:"q:عايز أتتبع طلبي"}]:[{l:"PUBG UC prices",a:"q:PUBG UC prices"},{l:"Compare Xbox & PlayStation",a:"q:compare Xbox and PlayStation"},{l:"Budget 500 EGP",a:"q:I have a budget of 500 EGP"},{l:"Track my order",a:"q:track my order"}]})}
const AIW=()=>String((D.ai||{}).url||"").replace(/\/+$/,"");

async function aiRemote(q){
  const url=AIW();
  if(!url)return null;

  const history=AI.h.slice(0,-1).slice(-6)
    .map(x=>({r:x.r,t:x.t}));

  try{
    const res=await fetch(url+"/chat",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({m:q,h:history})
    });

    if(!res.ok)return null;
    const data=await res.json();
    return data.t?{t:data.t,c:[]}:null;
  }catch(e){
    return null;
  }
}
function aiSend(q){
  q=String(q).trim().slice(0,300);
  if(!q)return;

  AI.h.push({r:"u",t:q});
  aiRender();

  const log=g_("ailog");
  log.insertAdjacentHTML("beforeend",'<div class="mg a"><span class="dots"><i></i><i></i><i></i></span></div>');
  log.scrollTop=log.scrollHeight;

  setTimeout(async()=>{
    let a;
    try{
      a=await aiAnswer(q);

      if(a&&a.ai){
        const remote=await aiRemote(q);
        if(remote)a=remote;
        else a={t:L==="ar"?"مش قادر أوصل للمساعد الذكي دلوقتي. حاول تاني بعد شوية.":"AI is temporarily unavailable. Please try again.",c:[]};
      }
    }catch(e){
      a={
        t:L==="ar"?"حصلت مشكلة عندي. كلّم الدعم على واتساب.":"Something went wrong. Please contact support on WhatsApp.",
        c:[{l:"💬 WhatsApp",a:"w:"+q}]
      };
    }

    AI.h.push({r:"a",t:a.t,c:a.c||[]});
    aiSave();
    aiRender();
  },450);
}
