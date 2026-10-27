// Lumir landing v3 — статика: П1 обложка, П2 CTA, П3 OG, баннер 1 (иконки)

// Чат класса (обобщённый мессенджер)
function V3ChatCard({ t, w = 600 }) {
  const s = w/600;
  const bub = { fontFamily:LB.golos, fontWeight:500, fontSize:24*s, lineHeight:1.4, padding:`${16*s}px ${22*s}px`, borderRadius:22*s, maxWidth:'84%' };
  return (
    <div style={{ ...panelSt(t, 30*s), width:w, padding:`${26*s}px ${28*s}px ${30*s}px`, display:'flex', flexDirection:'column', gap:18*s }}>
      <div style={{ display:'flex', alignItems:'center', gap:18*s, paddingBottom:18*s, borderBottom:`1px solid ${t.panelBorder}` }}>
        <div style={{ width:64*s, height:64*s, borderRadius:'50%', background:t.cell, display:'flex', alignItems:'center', justifyContent:'center', flex:'none' }}><V3Icon n="users" s={32*s} c={t.accent} sw={1.8} /></div>
        <div>
          <div style={{ fontFamily:LB.mont, fontWeight:800, fontSize:28*s, color:t.text }}>Родители 11 «Б»</div>
          <div style={{ fontFamily:LB.golos, fontWeight:500, fontSize:20*s, color:t.sub, marginTop:4*s }}>28 участников</div>
        </div>
      </div>
      <div style={{ ...bub, alignSelf:'flex-start', background:t.cell, color:t.text }}>Когда будет альбом?</div>
      <div style={{ ...bub, alignSelf:'flex-end', background:LB.grad, color:'#fff', display:'flex', flexDirection:'column', gap:12*s }}>
        <div>Выберите фото для альбома по ссылке</div>
        <div style={{ alignSelf:'flex-start', padding:`${8*s}px ${16*s}px`, borderRadius:12*s, background:'rgba(255,255,255,0.18)', fontWeight:600, fontSize:21*s }}>lumir.photo/anna</div>
      </div>
    </div>);
}

// Мини-галерея клиента (светлая)
function V3GalleryMini({ t, w = 440, liked = [1, 4] }) {
  const s = w/440, cw = (w - 28*s*2 - 12*s*2)/3;
  return (
    <div style={{ width:w, padding:28*s, borderRadius:28*s, background:'#FBFAFE', border:'1px solid rgba(124,111,232,0.2)', boxShadow:t.panelShadow }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18*s }}>
        <div style={{ fontFamily:LB.mont, fontWeight:800, fontSize:22*s, color:'#1E2530' }}>Галерея · 11 «Б»</div>
        <div style={{ display:'flex', alignItems:'center', gap:6*s, fontFamily:LB.golos, fontWeight:600, fontSize:19*s, color:'#7C6FE8' }}><V3Icon n="heart" s={20*s} c="#7C6FE8" fill="#7C6FE8" sw={1.6} />{liked.length}</div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:`repeat(3,${cw}px)`, gap:12*s }}>
        {[2,0,5,3,1,7].map((p, i) => (
          <div key={i} style={{ position:'relative' }}>
            <SPhoto i={p} w={cw} h={cw*1.2} r={10*s} />
            {liked.includes(i) && <div style={{ position:'absolute', right:8*s, bottom:8*s, width:34*s, height:34*s, borderRadius:'50%', background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 10px rgba(30,37,48,0.2)' }}><V3Icon n="heart" s={18*s} c="#7C6FE8" fill="#7C6FE8" sw={1.6} /></div>}
          </div>))}
      </div>
    </div>);
}

// Линия 9 этапов: узлы по x, общий y
function V3StageLine({ t, x0, x1, y, d, numFs, sw }) {
  const step = (x1 - x0) / 8;
  return V3_STAGES.map((st, i) => (
    <V3Node key={st.k} t={t} st={st} d={d} numFs={numFs} sw={sw} style={{ position:'absolute', left:x0 + i*step - d/2, top:y - d/2 - (numFs || d*0.19) - d*0.14 }} />));
}

// ── П1 · Обложка промо-видео — 2400×1800 ──
function V3Cover({ t }) {
  const W = 2400, H = 1800, ny = 1330, d = 136, ac = arrC(t);
  return (
    <LBFrame t={t} w={W} h={H} gy={0.5} gs={72}>
      <svg width={W} height={H} style={{ position:'absolute', inset:0 }} fill="none">
        <path d={`M 460 1040 C 460 1230, 300 1170, 300 ${ny} L 2100 ${ny} C 2100 1170, 1960 1230, 1960 1060`} stroke={ac} strokeWidth="4" strokeDasharray="12 14" strokeLinecap="round"></path>
      </svg>
      <DotPill t={t} s={1.5} dot="#E5484D" style={{ position:'absolute', top:96, left:'50%', transform:'translateX(-50%)' }}>Lumir</DotPill>
      <div style={{ position:'absolute', left:160, top:430 }}><V3ChatCard t={t} w={600} /></div>
      <div style={{ position:'absolute', right:150, top:400, width:620, height:660 }}>
        <div style={{ position:'absolute', left:0, top:0 }}><CoverFan t={t} cw={190} /></div>
        <div style={{ position:'absolute', right:0, top:300 }}><V3GalleryMini t={t} w={430} /></div>
      </div>
      <V3StageLine t={t} x0={300} x1={2100} y={ny} d={d} numFs={26} sw={1.5} />
      <Spark s={54} color={t.accent} style={{ position:'absolute', left:820, top:420, opacity:0.8 }} />
      <Spark s={30} color={t.accent} style={{ position:'absolute', right:820, top:1060, opacity:0.55 }} />
      <DotPill t={t} s={1.25} dot={t.ok} style={{ position:'absolute', bottom:96, left:'50%', transform:'translateX(-50%)' }}>Демо · 1 минута</DotPill>
    </LBFrame>);
}

// ── П2 · CTA перед FAQ — 2400×1200 / 1080×1350 ──
function V3Cta({ t, m }) {
  const w = m?1080:2400, h = m?1350:1200;
  return (
    <LBFrame t={t} w={w} h={h} gy={0.5} gs={m?56:72}>
      <Spark s={m?40:52} color={t.accent} style={{ position:'absolute', left:m?90:250, top:m?150:170, opacity:0.85 }} />
      <Spark s={m?24:30} color={t.accent} style={{ position:'absolute', right:m?110:290, top:m?230:250, opacity:0.6 }} />
      <div style={{ position:'absolute', inset:m?'0 0 90px':'0 0 30px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:m?36:40, padding:'0 90px', textAlign:'center' }}>
        <GradChip t={t} s={m?1:1.3}>Дарим 10 000 ₽ на счёт</GradChip>
        <div style={{ fontFamily:LB.mont, fontWeight:900, fontSize:m?92:140, lineHeight:1.04, letterSpacing:'-0.015em', color:t.text, textWrap:'balance' }}>
          Начните сезон в Lumir<br /><span style={v3gt(LB.grad)}>уже сегодня</span>
        </div>
        <div style={{ fontFamily:LB.golos, fontWeight:500, fontSize:m?30:36, lineHeight:1.45, color:t.sub, maxWidth:m?860:1300, textWrap:'balance' }}>
          10 000 ₽ на баланс и 3 дизайн-пака бесплатно для первой 1000 фотографов
        </div>
        <div style={{ marginTop:m?10:8, padding:m?'26px 78px':'30px 92px', borderRadius:26, background:LB.grad, color:'#fff', fontFamily:LB.mont, fontWeight:800,
          fontSize:m?30:34, letterSpacing:'0.12em', boxShadow:'0 0 60px rgba(139,124,246,0.5), 0 20px 50px rgba(20,15,40,0.3)' }}>ПОПРОБОВАТЬ</div>
      </div>
      <Watermark t={t} s={m?0.85:1.3} />
    </LBFrame>);
}

// ── П3 · OG-image — 1200×630, безопасная зона 1000×500 ──
function V3OG({ t, safe }) {
  return (
    <LBFrame t={t} w={1200} h={630} gy={0.36} gs={48}>
      {safe && <div style={{ position:'absolute', left:100, top:65, width:1000, height:500, border:'2px dashed rgba(229,72,77,0.7)', zIndex:5 }}></div>}
      <div style={{ position:'absolute', left:0, right:0, top:92, display:'flex', flexDirection:'column', alignItems:'center', gap:22, textAlign:'center' }}>
        <div style={{ fontFamily:LB.mont, fontWeight:800, fontSize:18, letterSpacing:'0.34em', textIndent:'0.34em', color:t.pillText }}>LUMIR</div>
        <div style={{ fontFamily:LB.mont, fontWeight:900, fontSize:58, lineHeight:1.08, letterSpacing:'-0.015em', color:t.text, maxWidth:960, textWrap:'balance' }}>
          Весь выпускной сезон фотографа — <span style={v3gt(LB.grad)}>в Lumir</span>
        </div>
        <div style={{ fontFamily:LB.golos, fontWeight:500, fontSize:24, color:t.sub }}>Автовёрстка школьных альбомов</div>
      </div>
      <div style={{ position:'absolute', left:150, right:150, top:468, borderTop:`2px dashed ${arrC(t)}` }}></div>
      {V3_STAGES.map((st, i) => {
        const c = v3acc(t, st.a), d = 64;
        return (
          <div key={st.k} style={{ position:'absolute', left:150 + i*112.5 - d/2, top:468 - d/2, width:d, height:d, borderRadius:'50%', background:t.panel, border:`2px solid ${c}66`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 0 24px ${c}33` }}>
            <V3Icon n={st.k} s={30} c={c} sw={1.7} />
          </div>);
      })}
    </LBFrame>);
}

// ── 1 · Иконки этапов и поддержки — лист ──
function v3dl(name, text) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type:'image/svg+xml' })); a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
function V3IconCard({ t, it, num }) {
  const c = v3acc(t, it.a);
  return (
    <div className="v3card" style={{ position:'relative', width:200, height:212, borderRadius:24, background:t.panel, border:`1px solid ${t.panelBorder}`, boxShadow:t.softShadow,
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16, cursor:'default' }}>
      {num && <div style={{ position:'absolute', left:18, top:16, fontFamily:LB.mont, fontWeight:800, fontSize:16, letterSpacing:'0.12em', color:c }}>{num}</div>}
      <div style={{ position:'relative', width:80, height:80, color:c, perspective:200 }}>
        <V3Icon n={it.k} s={80} c="currentColor" sw={1.2} className={`v3ic v3ic-${it.k}`} />
        {it.k==='faces' && <div className="v3scan" style={{ position:'absolute', left:6, right:6, top:'15%', height:2, background:c, boxShadow:`0 0 8px ${c}`, opacity:0 }}></div>}
        {it.k==='retouch' && <Spark s={22} color={c} style={{ position:'absolute', right:-10, top:-10, opacity:0 }} />}
      </div>
      <div style={{ fontFamily:LB.golos, fontWeight:600, fontSize:18, color:t.text, textAlign:'center', padding:'0 10px', lineHeight:1.25 }}>{it.name}</div>
      <button className="v3dl" onClick={() => v3dl(`v3-icon-${it.k}.svg`, v3IconSVG(it.k))} style={{ position:'absolute', right:10, top:10, border:'none', borderRadius:8, padding:'4px 8px', background:t.cell, color:t.sub, font:"600 11px 'Golos Text',sans-serif", cursor:'pointer' }}>SVG</button>
    </div>);
}
function V3IconSheet({ t }) {
  return (
    <LBFrame t={t} w={2000} h={800} gs={64} gy={0.4}>
      <div style={{ position:'absolute', inset:'64px 80px', display:'flex', flexDirection:'column', gap:28 }}>
        <LbLabel t={t} s={0.9}>9 этапов · 40×40 · линия 2 px · currentColor</LbLabel>
        <div style={{ display:'flex', gap:16 }}>{V3_STAGES.map((st) => <V3IconCard key={st.k} t={t} it={st} num={st.n} />)}</div>
        <LbLabel t={t} s={0.9} style={{ marginTop:28 }}>Поддержка</LbLabel>
        <div style={{ display:'flex', gap:16 }}>{V3_SUPPORT.map((st) => <V3IconCard key={st.k} t={t} it={st} />)}</div>
      </div>
      <div style={{ position:'absolute', right:80, bottom:72, fontFamily:V3.cav, fontSize:40, color:t.accent, transform:'rotate(-3deg)' }}>наведите на карточку</div>
    </LBFrame>);
}

Object.assign(window, { V3ChatCard, V3GalleryMini, V3StageLine, V3Cover, V3Cta, V3OG, V3IconCard, V3IconSheet });
