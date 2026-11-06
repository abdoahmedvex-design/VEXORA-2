/* ===== PRODUCT IMAGES: رفع الصور من لوحة الأدمن ===== */
P.forEach(p=>{IMG[p.id]="img/p"+p.id+".jpg"});
ui();
const _openA=openA;
openA=function(){
  _openA();
  const s=g_("as");
  s.querySelectorAll("[data-off]").forEach(c=>{const h=c.closest("h3");if(h&&!h.querySelector("[data-up]"))h.insertAdjacentHTML("beforeend",' <label class="ghost" style="font-size:12px;padding:4px 10px;cursor:pointer">📷 صورة<input type="file" accept="image/*" data-up="'+c.dataset.off+'" hidden></label>')});
  s.onchange=e=>{const f=e.target;if(f.dataset&&f.dataset.up&&f.files[0])upImg(f.dataset.up,f.files[0])};
};
async function upImg(id,file){
  const m=g_("amsg");m.textContent="جارٍ رفع الصورة…";
  try{
    const url=URL.createObjectURL(file),im=new Image();
    await new Promise((ok,no)=>{im.onload=ok;im.onerror=no;im.src=url});
    const w=im.naturalWidth,h=im.naturalHeight;let sx=0,sy=0,sw=w,sh=h;
    if(w/h>1.5){sw=h*1.5;sx=(w-sw)/2}else{sh=w/1.5;sy=(h-sh)*0.4}
    const cv=document.createElement("canvas");cv.width=600;cv.height=400;
    cv.getContext("2d").drawImage(im,sx,sy,sw,sh,0,0,600,400);
    const b64=cv.toDataURL("image/jpeg",0.8).split(",")[1],path="/contents/img/p"+id+".jpg";
    const ex=await gh(path+"?ref="+GH.br+"&_="+Date.now());
    const body={message:"Product image "+id,content:b64,branch:GH.br};
    if(ex.ok)body.sha=(await ex.json()).sha;
    const r=await gh(path,{method:"PUT",body:JSON.stringify(body)});
    if(!r.ok)throw r.status;
    IMG[id]="img/p"+id+".jpg?v="+Date.now();ui();
    m.textContent="تم رفع الصورة ✓ — هتظهر للعملاء خلال دقيقة تقريباً."
  }catch(e){m.textContent="تعذّر رفع الصورة. تأكد إنك داخل بالتوكن وجرّب تاني."}
}
