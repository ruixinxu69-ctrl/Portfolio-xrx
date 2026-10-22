function packageArt(kind,id){const silver=kind==='silver'||kind==='soft';return `<svg class="parcel-art" viewBox="0 0 360 300" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="foil${id}" x1="0" y1="0" x2="1" y2=".7"><stop stop-color="#8c9da4"/><stop offset=".06" stop-color="#f3eefa"/><stop offset=".15" stop-color="#a9c3c6"/><stop offset=".32" stop-color="#fbfffe"/><stop offset=".48" stop-color="#d2d2e0"/><stop offset=".53" stop-color="#fff3fd"/><stop offset=".69" stop-color="#a9c1c3"/><stop offset=".9" stop-color="#e7f5ec"/><stop offset="1" stop-color="#86969e"/></linearGradient><linearGradient id="paper${id}" x2=".7" y2="1"><stop stop-color="#f1e7ef"/><stop offset="1" stop-color="#c7c4d6"/></linearGradient><filter id="grain${id}"><feTurbulence baseFrequency=".8" numOctaves="3" seed="5"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".09"/></feComponentTransfer><feBlend in="SourceGraphic" mode="multiply"/></filter><linearGradient id="clear${id}" x2="1" y2=".5"><stop stop-color="#faffff" stop-opacity=".6"/><stop offset=".4" stop-color="#edf1e8" stop-opacity=".03"/><stop offset=".46" stop-color="#fff" stop-opacity=".5"/><stop offset=".52" stop-color="#e3ebe0" stop-opacity=".07"/><stop offset="1" stop-color="#c3cfc3" stop-opacity=".5"/></linearGradient></defs>${silver?`<path d="M10 4Q180 -2 351 6L357 289Q180 300 5 289Z" fill="url(#foil${id})" stroke="#c3cbc4"/><path d="M15 27Q180 20 345 27M14 34Q180 27 346 34M14 267Q180 276 346 267M14 275Q180 283 346 275" stroke="#929e94" opacity=".6"/><path d="M11 7L26 44 17 120 25 196 12 287M348 8L331 51 345 135 332 215 349 287" fill="none" stroke="#fff" opacity=".65" stroke-width="3"/><path d="M14 44l46 35M15 52l37 19M19 237l56-21M334 52l-42 30M343 236l-43-24M76 280l20-27M290 280l-12-32" stroke="#88968a" opacity=".2" stroke-width="2"/><path d="M14 5Q180 2 347 7L352 288Q180 295 9 287Z" fill="transparent" filter="url(#grain${id})"/>`:kind==='box'?`<path d="M4 12L351 3 359 285 10 299Z" fill="#9ba18e"/><path d="M3 4L349 0 350 283 3 291Z" fill="url(#paper${id})" stroke="#bcc1b1"/><path d="M17 6L18 278 348 271M3 32L348 27M18 278L3 291M348 271L350 283" fill="none" stroke="#a6ad98"/><path d="M19 34L346 29" stroke="#faffee"/><path d="M3 4L349 0 350 283 3 291Z" fill="transparent" filter="url(#grain${id})"/>`:`<path d="M3 9L356 3 358 289 1 298Z" fill="url(#clear${id})" stroke="#aebcaf"/><path d="M5 37L356 31M5 44L356 38M11 47L11 285 349 278 349 45" stroke="#fcfff8" stroke-width="2" fill="none" opacity=".8"/><path d="M3 9L356 3 356 31 3 37Z" fill="#dce5db" fill-opacity=".65"/><path d="M20 19L340 14" stroke="#9bad98" stroke-width="2"/><circle cx="13" cy="23" r="3" fill="#fafcf5"/><path d="M1 298l33-31M358 289l-29-26" stroke="#c4cec0"/>`}</svg>`}

const number = i => String(i + 1).padStart(2, '0');
const label = (p, i) => `<div class="shipping-label"><div class="label-top"><span>Portfolio® / XU RUIXIN</span><span>${number(i)}</span></div><h3>${p.label}</h3><p class="label-subtitle">${p.cn}</p><div class="label-grid"><div><span>TYPE / 项目类型</span><b>${p.type}</b></div><div><span>ROLE / 我的职责</span><b>${p.labelRole}</b></div></div><div class="label-bottom"><div class="barcode"></div><small>${p.year || 'SELECTED WORK'}<br>NO. ${number(i)} / OPEN TO EXPLORE</small></div></div>`;
document.querySelector('#parcels').innerHTML = projects.map((p, i) => `<div class="parcel-carrier" data-parcel-index="${i}"><button class="parcel parcel-${i % 4 + 1}" data-project="${i}" aria-label="拆开 ${p.title}：${p.type}，${p.role}${p.year ? '，' + p.year : ''}">${p.material === 'clear' ? '<span class="clear-insert"></span>' : ''}${packageArt(p.material, i)}<span class="holo-wash"></span>${p.material === 'box' ? '<span class="package-side-type">IDEAS</span>' : ''}<span class="seal">OPEN HERE ↗</span>${label(p, i)}<span class="parcel-sticker sticker-${i % 4}" aria-hidden="true">${['✳', 'with love', '↗', 'made<br>with care'][i % 4]}</span><span class="package-number">${p.format} / NO.${number(i)}</span><span class="open-hint">点击拆开 ↗</span></button></div>`).join('');
document.querySelector('#project-list').innerHTML = projects.map((p, i) => `<button class="list-row" data-project="${i}"><span class="list-id">${number(i)}</span><span class="list-title">${p.label}<small>${p.cn}</small></span><span class="list-type">${p.type}</span><span class="list-role">${p.labelRole}</span><span class="list-year">${p.year || '—'}</span><span>↗</span></button>`).join('');
const projectDialog = document.querySelector('#project-dialog');
const profileDialog = document.querySelector('#profile-dialog');
const imageDialog = document.querySelector('#image-dialog');
const returnFocus = new WeakMap();
function showDialog(dialog) {
  returnFocus.set(dialog, document.activeElement);
  dialog.showModal();
  document.body.style.overflow = 'hidden';
}
function projectImage(key, caption, cover = false) {
  const a = assets[key];
  return `<figure class="${cover ? 'case-cover' : 'case-figure'}"><button class="image-open" data-image="${key}" aria-label="放大：${caption}"><img src="${a.src}" width="${a.width}" height="${a.height}" alt="${caption}" loading="${cover ? 'eager' : 'lazy'}" decoding="async"><span aria-hidden="true">放大查看 ↗</span></button><figcaption>${caption}</figcaption></figure>`;
}
function gallery(p) {
  if (!p.gallery.length) return '';
  const previewKeys = p.key === 'journey' ? ['journey-08', 'journey-11', 'journey-14'] : ['landscape-link', 'landscape-digital', 'landscape-bird', 'garden-01'];
  const preview = p.gallery.filter(g => previewKeys.includes(g.asset));
  const archive = p.gallery.filter(g => !previewKeys.includes(g.asset));
  return `<section class="case-gallery"><div class="section-label"><span>VISUAL ARCHIVE</span><h3>把过程，一起拆开。</h3></div><div class="case-gallery-grid">${preview.map(g => projectImage(g.asset, g.caption)).join('')}</div><details class="archive-fold"><summary>继续查看完整作品图板 <span>${archive.length} 张 ＋</span></summary><div class="case-gallery-grid">${archive.map(g => projectImage(g.asset, g.caption)).join('')}</div></details></section>`;
}
function researchBoard() {
  return `<section class="research-board" aria-label="研究设计：200名10至12岁儿童，四类科普形式对照"><div class="research-top"><span>RESEARCH NOTE / 01</span><span>200 PARTICIPANTS</span></div><h3>体验，如何转化为认知？</h3><p>200 名 10–12 岁儿童 · 植物园自然教育场景</p><div class="research-methods">${[['01', '自然接触', '在真实环境中观察'], ['02', '静态图文', '通过内容阅读理解'], ['03', '互动装置', '通过操作参与体验'], ['04', '沉浸式 AR', '连接真实与数字场景']].map(m => `<div><span>${m[0]}</span><strong>${m[1]}</strong><small>${m[2]}</small></div>`).join('')}</div><div class="research-bottom">问卷 ＋ 行为观察 ＋ 访谈 ＋ 统计分析</div></section>`;
}
function openProject(i) {
  const p = projects[i];
  window.Hobbies?.destroy();
  projectDialog.classList.remove('hobby-dialog');
  projectDialog.setAttribute('aria-label', '项目详情');
  if (p.key === 'hobbies') {
    window.Hobbies.open(projectDialog);
    if (!projectDialog.open) showDialog(projectDialog);
    return;
  }
  document.querySelector('#project-detail').innerHTML = `<div class="detail-heading"><div class="mono">Portfolio ${number(i)} / UNPACKED <span>${p.en}</span></div><h2>${p.title}<small>${p.cn}</small></h2><p class="case-lead">${p.lead}</p><div class="detail-meta"><div><span>TYPE / 类型</span>${p.type}</div><div><span>ROLE / 职责</span>${p.role}</div>${p.year ? `<div><span>TIME / ${p.timeNote || '时间'}</span>${p.year}</div>` : ''}<div><span>OUTPUT / 交付内容</span>${p.deliverables}</div></div><p class="case-context">${p.context}</p></div><div class="case-metrics">${p.metrics.map(m => `<div><strong>${m[0]}</strong><span>${m[1]}</span></div>`).join('')}${p.metricNote ? `<p>${p.metricNote}</p>` : ''}</div>${p.cover ? projectImage(p.cover, p.coverCaption, true) : researchBoard()}<div class="detail-copy">${p.sections.map((s, n) => `<section><h3>${number(n)} / ${s[0]}</h3><p>${s[1]}</p></section>`).join('')}</div>${p.flow.length ? `<div class="case-flow"><span class="mono">${p.key === 'research' ? 'ANALYSIS FRAMEWORK / 分析框架' : 'EXPERIENCE & PROCESS / 体验与过程'}</span><ol>${p.flow.map((f, n) => `<li><small>${number(n)}</small>${f}</li>`).join('')}</ol></div>` : ''}${gallery(p)}${p.link ? `<div class="case-launch"><div><h3>让手势，成为你的输入。</h3><p>打开 Sakura Wish，体验樱花与身体动作的实时互动。</p></div><a class="text-action" href="${p.link}" target="_blank" rel="noopener noreferrer">体验互动网页 ↗</a></div>` : ''}<div class="detail-foot"><span>${p.context}</span><button class="next-project" data-next="${(i + 1) % projects.length}">下一份包裹　↗</button></div>`;
  if (!projectDialog.open) showDialog(projectDialog);
  projectDialog.scrollTop = 0;
}
function openImage(key, caption) {
  const img = document.querySelector('#expanded-image');
  img.src = assets[key].src;
  img.alt = caption;
  img.width = assets[key].width;
  img.height = assets[key].height;
  imageDialog.classList.remove('is-zoomed');
  document.querySelector('#image-caption').textContent = caption;
  const zoom = document.querySelector('#image-zoom');
  zoom.setAttribute('aria-pressed', 'false');
  zoom.textContent = '查看原尺寸 ＋';
  showDialog(imageDialog);
  document.querySelector('.image-stage').scrollTo(0, 0);
}
document.addEventListener('click', e => {
  const parcel = e.target.closest('[data-project]');
  if (parcel && !window.parcelDragSuppressed) openProject(Number(parcel.dataset.project));
  const next = e.target.closest('[data-next]');
  if (next) { openProject(Number(next.dataset.next)); projectDialog.querySelector('.close-dialog').focus(); }
  const picture = e.target.closest('[data-image]');
  if (picture) openImage(picture.dataset.image, picture.querySelector('img').alt);
  if (e.target.closest('.hobby-trigger')) openProject(projects.findIndex(p => p.key === 'hobbies'));
  if (e.target.closest('.profile-trigger')) showDialog(profileDialog);
  if (e.target.closest('.close-dialog')) e.target.closest('dialog').close();
});
document.querySelector('#image-zoom').addEventListener('click', e => {
  const zoomed = imageDialog.classList.toggle('is-zoomed');
  e.currentTarget.setAttribute('aria-pressed', String(zoomed));
  e.currentTarget.textContent = zoomed ? '适应窗口 −' : '查看原尺寸 ＋';
});
for (const d of document.querySelectorAll('dialog')) {
  d.addEventListener('close', () => {
    if (d === projectDialog) window.Hobbies?.destroy();
    document.body.style.overflow = document.querySelector('dialog[open]') ? 'hidden' : '';
    const trigger = returnFocus.get(d);
    if (trigger?.isConnected) trigger.focus({ preventScroll: true });
  });
  d.addEventListener('click', e => {
    if (e.target === d) {
      const r = d.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) d.close();
    }
  });
}
document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
  const list = button.dataset.view === 'list';
  document.querySelector('.desk').hidden = list;
  document.querySelector('#project-list').hidden = !list;
  document.querySelectorAll('[data-view]').forEach(b => {
    b.classList.toggle('selected', b === button);
    b.setAttribute('aria-pressed', String(b === button));
  });
}));

// A single, finite ring of packages; no duplicate interactive elements.
(()=>{
 const scene=document.querySelector('#conveyor'),carriers=[...document.querySelectorAll('.parcel-carrier')],status=document.querySelector('#motion-status'),pause=document.querySelector('#pause-belt');
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 let position=0,velocity=0,target=0,paused=false,hoverParcel=false,drag=null,lastTime=0,stepAnimation=null,mouseInside=false;
 const geometry=()=>{let w=scene.clientWidth;return {w,spacing:w<=760?300:Math.max(350,Math.min(410,w*.32)),top:w<=760?110:100,anchor:w<=760?50:Math.max(55,(w-Math.min(w,1200))/2+45)};};
 function render(){const {w,spacing,top,anchor}=geometry();const period=spacing*carriers.length;carriers.forEach((el,i)=>{let x=((i*spacing+position+spacing*.75)%period+period)%period-spacing*.75+anchor;let y=top+([0,18,28,14][i%4]);el.style.transform=`translate3d(${x}px,${y}px,0)`;let visible=x+300>0&&x<w;el.inert=!visible;});}
 function moveStep(n){target=0;velocity=0;stepAnimation={start:position,end:position-n*geometry().spacing,started:performance.now()};}
 function frame(t){let dt=Math.min((t-(lastTime||t))/1000,.04);lastTime=t;if(stepAnimation){let f=Math.min((t-stepAnimation.started)/420,1),ease=1-Math.pow(1-f,3);position=stepAnimation.start+(stepAnimation.end-stepAnimation.start)*ease;if(f===1)stepAnimation=null;}else{let desired=(paused||hoverParcel||reduced.matches||!mouseInside)?0:target;velocity+=(desired-velocity)*Math.min(dt*6,1);if(Math.abs(velocity)<.4&&desired===0)velocity=0;position+=velocity*dt;}render();scene.classList.toggle('is-moving',Math.abs(velocity)>2||!!stepAnimation);status.textContent=paused?'已暂停':hoverParcel?'等待拆包':(Math.abs(velocity)>2||stepAnimation)?'传送中':'等待传送';requestAnimationFrame(frame)}
 scene.addEventListener('pointermove',e=>{if(e.pointerType==='touch'){if(!drag)return;let delta=e.clientX-drag.x;if(Math.abs(delta)>7)drag.moved=true;if(drag.moved){position=drag.position+delta;render();}return;}if(e.pointerType!=='mouse')return;mouseInside=true;hoverParcel=!!e.target.closest('.parcel');let box=scene.getBoundingClientRect(),ratio=(e.clientX-box.left)/box.width;let edge=Math.max(0,(Math.abs(ratio-.5)-.16)/.34);target=Math.sign(ratio-.5)*edge*190;});
 scene.addEventListener('pointerleave',()=>{mouseInside=false;target=0;hoverParcel=false;});
 scene.addEventListener('pointerdown',e=>{if(e.pointerType!=='touch'||e.target.closest('.conveyor-controls'))return;drag={x:e.clientX,position,moved:false};velocity=0;stepAnimation=null;});
 scene.addEventListener('pointerup',()=>{if(drag?.moved){window.parcelDragSuppressed=true;setTimeout(()=>window.parcelDragSuppressed=false,350)}drag=null;});
 scene.addEventListener('pointercancel',()=>{drag=null});
 scene.addEventListener('focusin',e=>{if(e.target.closest('.parcel')){hoverParcel=true;velocity=0;}});
 scene.addEventListener('focusout',e=>{if(!e.relatedTarget?.closest('.parcel'))hoverParcel=false;});
 scene.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();moveStep(e.key==='ArrowRight'?1:-1)}});
 document.querySelectorAll('[data-step]').forEach(b=>b.addEventListener('click',()=>moveStep(Number(b.dataset.step))));
 pause.addEventListener('click',()=>{paused=!paused;target=0;pause.setAttribute('aria-pressed',String(paused));pause.setAttribute('aria-label',paused?'恢复鼠标传送':'暂停鼠标传送');pause.innerHTML=paused?'<span aria-hidden="true">▶</span>':'<span aria-hidden="true">Ⅱ</span>';});
 window.addEventListener('resize',render);render();requestAnimationFrame(frame);
})();
