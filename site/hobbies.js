/* Personal archive: one active player, with media released on tab/route changes. */
window.Hobbies = (() => {
  const groups = [
    {id:'fan', title:'饭圈美工 / 物料制作', short:'饭圈美工', en:'FAN-MADE STUDIO', path:'FAN_MADE', headline:'把喜欢，做成实物。', desc:'从一张设计到一份小物，把喜欢藏进颜色、像素和每个亲手制作的细节里。', note:'热爱也有\n自己的形状。', tags:'#饭圈美工  #物料制作  #手作', items:[['fan-01','把喜欢打包','小卡、拼豆挂件和应援小物的集合。','PHOTO MOTION'],['fan-02','一颗一颗，拼出热爱','用拼豆的像素语言，留下喜欢的角色。','PHOTO MOTION']]},
    {id:'live', title:'线下演出 / 视频剪辑', short:'演出与剪辑', en:'LIVE, THEN REPLAY', path:'LIVE_EDITS', headline:'让心动，再播放一次。', desc:'在现场收集声音和光，再用镜头与剪辑，把那些不想结束的瞬间留住。', note:'现场的心跳，\n剪辑的节奏。', tags:'#线下演出  #现场记录  #视频剪辑', items:Array.from({length:7},(_,i)=>[`live-0${i+1}`,`现场回放 ${String(i+1).padStart(2,'0')}`,'把现场的光、音乐和情绪，存成可以重播的记忆。','LIVE / EDIT'])},
    {id:'dance', title:'舞蹈', short:'舞蹈', en:'MOVE TO FEEL', path:'DANCE', headline:'跟着节拍，自由一点。', desc:'把音乐变成身体的语言。练习、记录，也享受每一次进入节奏的自己。', note:'不止观看，\n也走进节奏。', tags:'#舞蹈  #日常练习  #节奏', items:Array.from({length:3},(_,i)=>[`dance-0${i+1}`,`舞蹈记录 ${String(i+1).padStart(2,'0')}`,'让身体记住节拍，让热爱保持流动。','DANCE DIARY'])}
  ];
  let root, scroller, observer, active, groupIndex=0, cleanup=[], muted=true, stopped=false;
  const liked=new Set();
  const icon = name => ({play:'▶',pause:'Ⅱ',mute:'♪',sound:'♫',heart:'♡',full:'⛶'})[name];
  const time = s => Number.isFinite(s) ? `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}` : '0:00';
  const on=(el,event,fn,opts)=>{el.addEventListener(event,fn,opts);cleanup.push(()=>el.removeEventListener(event,fn,opts));};
  function stopPlayers(){observer?.disconnect();observer=null;cleanup.forEach(f=>f());cleanup=[];root?.querySelectorAll('video').forEach(v=>{v.pause();v.removeAttribute('src');v.load();});active=null;}
  function destroy(){stopPlayers();root=null;scroller=null;}
  function card(item,i,g){const [key,title,desc,badge]=item;return `<article class="retro-window clip-window" data-key="${key}"><div class="retro-title"><span class="folder-glyph" aria-hidden="true"></span><span>C:\\${g.path}\\${String(i+1).padStart(2,'0')}.mp4</span><span class="window-glyphs" aria-hidden="true">─ □</span></div><div class="retro-browser"><span aria-hidden="true">↶ ↷</span><span>ruixin.archive / ${key}</span><span aria-hidden="true">↻</span></div><div class="short-frame"><video playsinline muted loop preload="none" poster="assets/hobbies/${key}.jpg" aria-label="${title}" data-src="assets/hobbies/${key}.mp4"></video><span class="clip-badge">${badge}</span><button class="clip-hit" data-action="toggle" aria-label="播放${title}"><span class="play-symbol">▶</span></button><div class="short-actions"><span class="clip-avatar" aria-hidden="true">RX</span><button data-action="like" aria-label="收藏${title}" aria-pressed="${liked.has(key)}"><span>${liked.has(key)?'♥':'♡'}</span><small>喜欢</small></button><button data-action="mute" aria-label="开启声音" aria-pressed="false"><span>♪</span><small>静音</small></button><button data-action="full" aria-label="全屏查看${title}"><span>⛶</span><small>全屏</small></button></div><div class="clip-caption"><span>@徐睿鑫</span><h3>${title}</h3><p>${desc}</p><small>${g.tags}</small></div><div class="media-error" hidden>暂时无法播放 <button data-action="retry">重新加载</button></div></div><div class="clip-transport"><button data-action="toggle" aria-label="播放${title}">▶</button><input type="range" min="0" max="1000" value="0" step="1" aria-label="${title}播放进度"><span class="clip-time">0:00</span></div><div class="clip-status"><span class="player-state">READY TO PLAY</span><span>${String(i+1).padStart(2,'0')} / ${String(g.items.length).padStart(2,'0')}</span></div></article>`;}
  function render(index,focus=false){
    stopPlayers();groupIndex=index;stopped=false;const g=groups[index];
    root.querySelectorAll('[role="tab"]').forEach((b,i)=>{b.setAttribute('aria-selected',String(i===index));b.tabIndex=i===index?0:-1;});
    root.querySelector('.hobby-location').textContent=`C:\\INTERESTS\\${g.path}`;
    const panel=root.querySelector('.hobby-canvas');panel.setAttribute('aria-labelledby',`hobby-tab-${g.id}`);
    panel.innerHTML=`<header class="archive-heading"><div class="archive-eyebrow"><span>PERSONAL ARCHIVE / 0${index+1}</span><span>${String(g.items.length).padStart(2,'0')} WINDOWS OPEN</span></div><h2>${g.headline}</h2><p>${g.desc}</p><span class="archive-star" aria-hidden="true">✳</span></header><div class="hobby-grid">${g.items.map((it,i)=>card(it,i,g)).join('')}<aside class="retro-window hobby-note"><div class="retro-title"><span>♥ ABOUT_THIS_FOLDER.txt</span><span aria-hidden="true">×</span></div><div><span class="note-kicker">OUTSIDE THE BRIEF.</span><p>${g.note.replace('\n','<br>')}</p><span>${index===0?'设计、手作、分享。<br>让创意在日常里发生。':index===1?'按下播放，回到那个瞬间。<br>音量由你掌控。':'把热爱变成身体的记忆。<br>一遍，再一遍。'}</span><b aria-hidden="true">✴</b></div></aside></div><footer class="archive-footer"><span>MADE WITH LOVE, SAVED FOR LATER.</span><span>徐睿鑫 / INTERESTS © 2026</span></footer>`;
    panel.scrollTop=0;scroller=panel;
    const clips=[...panel.querySelectorAll('.clip-window')];
    const ensure=v=>{if(!v.getAttribute('src')){v.src=v.dataset.src;v.load();}};
    function update(v){const c=v.closest('.clip-window');c.classList.toggle('is-playing',!v.paused);c.querySelectorAll('[data-action="toggle"]').forEach(b=>b.setAttribute('aria-label',`${v.paused?'播放':'暂停'}${v.getAttribute('aria-label')}`));c.querySelector('.clip-transport button').textContent=v.paused?'▶':'Ⅱ';c.querySelector('.player-state').textContent=v.paused?'PAUSED / CLICK TO PLAY':'NOW PLAYING';}
    function syncSound(){clips.forEach(c=>{const v=c.querySelector('video');v.muted=muted;const b=c.querySelector('[data-action="mute"]');b.setAttribute('aria-label',muted?'开启声音':'关闭声音');b.setAttribute('aria-pressed',String(!muted));b.querySelector('span').textContent=muted?'♪':'♫';b.querySelector('small').textContent=muted?'静音':'声音';});}
    async function play(v){if(!root||!v.isConnected)return;clips.forEach(c=>{const other=c.querySelector('video');if(other!==v)other.pause();});active=v;ensure(v);v.muted=muted;try{await v.play();}catch{update(v);}}
    clips.forEach(c=>{
      const v=c.querySelector('video'),range=c.querySelector('input');
      on(v,'play',()=>update(v));on(v,'pause',()=>update(v));
      on(v,'timeupdate',()=>{if(document.activeElement!==range)range.value=v.duration?v.currentTime/v.duration*1000:0;c.querySelector('.clip-time').textContent=time(v.currentTime);});
      on(v,'error',()=>{if(v.getAttribute('src')){c.querySelector('.media-error').hidden=false;c.querySelector('.player-state').textContent='RETRY AVAILABLE';}});
      on(v,'loadeddata',()=>{c.querySelector('.media-error').hidden=true;});
      on(c,'click',async e=>{const b=e.target.closest('[data-action]');if(!b)return;const action=b.dataset.action;
        if(action==='toggle'){if(v.paused){stopped=false;play(v);}else{stopped=true;v.pause();}}
        if(action==='mute'){muted=!muted;syncSound();if(v.paused){stopped=false;play(v);}}
        if(action==='like'){const key=c.dataset.key;liked.has(key)?liked.delete(key):liked.add(key);b.setAttribute('aria-pressed',String(liked.has(key)));b.querySelector('span').textContent=liked.has(key)?'♥':'♡';}
        if(action==='full'){ensure(v);try{if(v.requestFullscreen)await v.requestFullscreen();else if(v.webkitEnterFullscreen)v.webkitEnterFullscreen();else c.classList.toggle('clip-enlarged');}catch{c.classList.toggle('clip-enlarged');}}
        if(action==='retry'){v.removeAttribute('src');stopped=false;play(v);}
      });
      on(range,'input',()=>{ensure(v);if(Number.isFinite(v.duration))v.currentTime=Number(range.value)/1000*v.duration;});
      on(c,'pointerenter',e=>{if(e.pointerType==='mouse'&&!stopped&&!matchMedia('(prefers-reduced-motion: reduce)').matches)play(v);});
      on(v,'keydown',e=>{if(e.key===' '){e.preventDefault();v.paused?play(v):v.pause();}});
    });
    syncSound();
    const ratios=new Map();
    observer=new IntersectionObserver(entries=>{entries.forEach(e=>ratios.set(e.target,e.intersectionRatio));if(active&&(ratios.get(active.closest('.clip-window'))||0)<.25)active.pause();if(stopped||document.hidden||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const best=[...ratios].sort((a,b)=>b[1]-a[1])[0];if(best&&best[1]>.55&&(!active||active.paused))play(best[0].querySelector('video'));},{root:panel,threshold:[0,.25,.55,.75,1]});
    clips.forEach(c=>observer.observe(c));
    on(document,'visibilitychange',()=>{if(document.hidden)clips.forEach(c=>c.querySelector('video').pause());});
    if(focus)root.querySelector(`#hobby-tab-${g.id}`).focus();
  }
  function open(dialog){
    destroy();dialog.classList.add('hobby-dialog');dialog.setAttribute('aria-label','兴趣爱好：个人影像档案');
    document.querySelector('#project-detail').innerHTML=`<div class="hobby-shell"><div class="hobby-titlebar"><span class="folder-glyph" aria-hidden="true"></span><strong>C:\\RUIXIN\\INTERESTS</strong><span class="hobby-window-caption">PERSONAL ARCHIVE</span></div><div class="hobby-menu"><span>文件(F)</span><span>查看(V)</span><span>喜欢(L)</span><span class="menu-status"><i></i> OFF THE CLOCK</span></div><div class="hobby-layout"><aside class="hobby-sidebar"><div class="archive-brand"><span class="archive-logo">rx<span>✦</span></span><h1>兴趣爱好</h1><p>A little more of me.</p></div><div class="folder-label">MY FOLDERS / 03</div><nav class="hobby-tabs" role="tablist" aria-label="兴趣爱好分类" aria-orientation="vertical">${groups.map((g,i)=>`<button role="tab" id="hobby-tab-${g.id}" aria-controls="hobby-panel" aria-selected="${i===0}" tabindex="${i===0?0:-1}" data-category="${i}"><span class="folder-glyph" aria-hidden="true"></span><span>${g.title}<small>${g.en}</small></span><b>${String(g.items.length).padStart(2,'0')}</b></button>`).join('')}</nav><div class="sidebar-note">生活不是项目，<br>喜欢也不需要 brief。<span>♥  JUST FOR THE LOVE OF IT.</span></div><div class="sidebar-stats"><span>10 VIDEOS</span><span>02 PHOTO STORIES</span></div></aside><div class="hobby-main"><div class="hobby-address"><span>地址(D)</span><div><span class="folder-glyph" aria-hidden="true"></span><span class="hobby-location"></span></div><span aria-hidden="true">↵</span></div><section id="hobby-panel" class="hobby-canvas" role="tabpanel" tabindex="0"></section></div></div><div class="hobby-statusbar"><span>12 个生活片段 / 3 个文件夹</span><span>PLAY. FEEL. REPEAT. ◢</span></div></div>`;
    root=dialog.querySelector('.hobby-shell');
    root.querySelector('.hobby-tabs').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(b)render(Number(b.dataset.category));});
    root.querySelector('.hobby-tabs').addEventListener('keydown',e=>{let n=groupIndex;if(['ArrowDown','ArrowRight'].includes(e.key))n=(n+1)%3;else if(['ArrowUp','ArrowLeft'].includes(e.key))n=(n+2)%3;else if(e.key==='Home')n=0;else if(e.key==='End')n=2;else return;e.preventDefault();render(n,true);});
    render(0);
  }
  return {open,destroy};
})();
