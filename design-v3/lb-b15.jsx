// Lumir landing banners — макеты 1–5 (видео-обложка + шаги 01–04)
// Each: ({t, m}) → t = LB.dark|LB.light, m = mobile (1080×1350)

const arrC = (t) => t.dark ? 'rgba(139,124,246,0.7)' : 'rgba(124,111,232,0.7)';
const panelSt = (t, r = 28) => ({ background:t.panel, border:`1px solid ${t.panelBorder}`, boxShadow:t.panelShadow, borderRadius:r });
function Cap({ t, s = 1, children, style }) {
  return <div style={{ fontFamily:LB.golos, fontWeight:600, fontSize:24*s, color:t.sub, textAlign:'center', ...style }}>{children}</div>;
}

// Fanned stack of 3 photos (входная папка)
function PhotoStack({ t, w = 470 }) {
  const s = w/470, pw = 270*s, ph = 330*s;
  return (
    <div style={{ position:'relative', width:w, height:ph+56*s }}>
      <PImg src="assets/students/01_18.jpg" w={pw} h={ph} r={16*s} pos="52% 14%" style={{ position:'absolute', left:0, top:36*s, transform:'rotate(-8deg)', boxShadow:t.softShadow }} />
      <PImg src="assets/students/01_01.jpg" w={pw} h={ph} r={16*s} pos="50% 16%" style={{ position:'absolute', left:w-pw, top:44*s, transform:'rotate(7deg)', boxShadow:t.softShadow }} />
      <PImg src="assets/students/01_60.jpg" w={pw} h={ph} r={16*s} pos="50% 24%" style={{ position:'absolute', left:(w-pw)/2, top:0, transform:'rotate(-1deg)', boxShadow:t.panelShadow, outline:`${4*s}px solid ${t.dark?'#332C4C':'#fff'}` }} />
    </div>);
}

// Fanned stack of 3 album covers
function CoverFan({ t, cw = 250, srcs }) {
  const [a, b, c] = srcs || [LBIMG.covers[3], LBIMG.covers[1], LBIMG.covers[0]];
  const s = cw/250, w = cw*2.05, h = cw*1.42+50*s;
  return (
    <div style={{ position:'relative', width:w, height:h }}>
      <RCover src={a} w={cw} style={{ position:'absolute', left:0, top:44*s, transform:'rotate(-9deg)', boxShadow:t.softShadow }} />
      <RCover src={b} w={cw} style={{ position:'absolute', right:0, top:44*s, transform:'rotate(9deg)', boxShadow:t.softShadow }} />
      <RCover src={c} w={cw} style={{ position:'absolute', left:(w-cw)/2, top:0, boxShadow:t.panelShadow }} />
    </div>);
}

// ── 1 · Видео-обложка демо — 2400×1800 / 1080×1350 ──
function B1({ t, m }) {
  const w = m?1080:2400, h = m?1350:1800, s = m?1:1.7;
  const inGroup = (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:m?14:24 }}>
      <LbLabel t={t} s={m?0.85:1.4}>Входная папка</LbLabel>
      <PhotoStack t={t} w={m?300:470} />
      <Cap t={t} s={m?0.95:1.5}>412 фото · 25 учеников</Cap>
    </div>);
  const outGroup = (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:m?14:24 }}>
      {!m && <LbLabel t={t} s={1.4}>25 альбомов готово</LbLabel>}
      <CoverFan t={t} cw={m?150:235} />
      {m && <LbLabel t={t} s={0.85}>25 альбомов готово</LbLabel>}
      {!m && <Cap t={t} s={1.5}>PDF · готовы к печати</Cap>}
    </div>);
  return (
    <LBFrame t={t} w={w} h={h} gy={0.45} gs={m?56:72}>
      <DotPill t={t} s={s} dot="#E5484D" style={{ position:'absolute', top:m?64:96, left:'50%', transform:'translateX(-50%)' }}>Lumir</DotPill>
      {m ? (
        <div style={{ position:'absolute', inset:'150px 0 140px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:18 }}>
          {inGroup}
          <DashArrow dir="down" len={64} color={arrC(t)} />
          <PlayBtn s={144} />
          <DashArrow dir="down" len={64} color={arrC(t)} />
          {outGroup}
        </div>
      ) : (
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', gap:64, padding:'0 150px 40px' }}>
          {inGroup}
          <DashArrow len={170} color={arrC(t)} />
          <PlayBtn s={250} />
          <DashArrow len={170} color={arrC(t)} />
          {outGroup}
        </div>
      )}
      <DotPill t={t} s={m?0.82:1.25} dot={t.ok} style={{ position:'absolute', bottom:m?58:96, left:'50%', transform:'translateX(-50%)' }}>Демо · 1 минута</DotPill>
      <Watermark t={t} s={m?0.85:1.5} />
    </LBFrame>);
}

// ── 2 · Шаг 01 · Загрузите дизайны — 1200×800 / 1080×1350 ──
function B2({ t, m }) {
  const w = m?1080:1200, h = m?1350:800;
  const cw = m?250:230;
  return (
    <LBFrame t={t} w={w} h={h} gy={0.42} gs={m?56:64}>
      <div style={{ position:'absolute', inset:m?'0 0 120px':'0 0 40px', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ position:'relative' }}>
          <CoverFan t={t} cw={cw} srcs={[LBIMG.covers[3], LBIMG.covers[1], LBIMG.coverAlina]} />
          <WhiteChip t={t} s={m?1.15:1} rot={-8} style={{ position:'absolute', left:m?-46:-60, top:m?-30:-16 }}>+ PSD</WhiteChip>
          <Spark s={m?38:34} color={t.accent} style={{ position:'absolute', right:m?-52:-64, top:m?-8:6 }} />
        </div>
      </div>
      <Rubric t={t} s={m?0.9:0.82}>Шаг 01 · Дизайны</Rubric>
      <Watermark t={t} s={m?0.85:0.8} />
    </LBFrame>);
}

// ── 3 · Шаг 02 · Загрузите съёмку — 1200×900 / 1080×1350 ──
function B3({ t, m }) {
  const w = m?1080:1200, h = m?1350:900;
  const sw = m?920:940;
  return (
    <LBFrame t={t} w={w} h={h} gy={0.44} gs={m?56:64}>
      <div style={{ position:'absolute', inset:m?'0 0 150px':'0 0 60px', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ position:'relative' }}>
          <Shot t={t} src={LBIMG.uiUpload} w={sw} ratio={1.786} />
          <CheckBadge s={m?54:46} style={{ position:'absolute', right:-16, top:-16 }} />
          <Spark s={m?36:32} color={t.accent} style={{ position:'absolute', left:-50, top:30 }} />
          <GradChip t={t} s={m?0.95:0.82} style={{ position:'absolute', left:'50%', bottom:m?-32:-27, transform:'translateX(-50%)' }}>412 фото · 25 учеников</GradChip>
        </div>
      </div>
      <Rubric t={t} s={m?0.9:0.82}>Шаг 02 · Съёмка</Rubric>
      <Watermark t={t} s={m?0.85:0.8} />
    </LBFrame>);
}

// Phone screen: «МОЙ АЛЬБОМ / Анна Каримова, 11А» + cover + approve button
function ApproveScreen({ w = 420, counters }) {
  const s = w/420, P = LB.phone;
  return (
    <div style={{ padding:`${72*s}px ${34*s}px ${36*s}px`, display:'flex', flexDirection:'column', alignItems:'center', gap:22*s }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontFamily:LB.mont, fontWeight:800, fontSize:15*s, letterSpacing:'0.22em', color:P.sub }}>МОЙ АЛЬБОМ</div>
        <div style={{ fontFamily:LB.mont, fontWeight:800, fontSize:25*s, color:P.text, marginTop:10*s }}>Анна Каримова, 11А</div>
      </div>
      <RCover src={LBIMG.covers[3]} w={200*s} />
      {counters && (
        <div style={{ display:'flex', gap:14*s }}>
          {[['Разворотов','12'],['Фото','48']].map(([k,v])=>(
            <div key={k} style={{ padding:`${12*s}px ${22*s}px`, borderRadius:16*s, background:'#221D33', border:`1px solid ${P.line}`, textAlign:'center' }}>
              <div style={{ fontFamily:LB.mont, fontWeight:800, fontSize:12*s, letterSpacing:'0.18em', color:P.sub, textTransform:'uppercase' }}>{k}</div>
              <div style={{ fontFamily:LB.mont, fontWeight:900, fontSize:26*s, color:P.text, marginTop:4*s }}>{v}</div>
            </div>))}
        </div>)}
      <div style={{ alignSelf:'stretch', padding:`${19*s}px 0`, borderRadius:18*s, background:LB.grad, color:'#fff', textAlign:'center',
        fontFamily:LB.mont, fontWeight:800, fontSize:19*s, letterSpacing:'0.1em', boxShadow:'0 0 34px rgba(139,124,246,0.45)' }}>✓ УТВЕРДИТЬ МАКЕТ</div>
    </div>);
}

// ── 4 · Шаг 03 · Отправьте ссылку — 1200×900 / 1080×1350 ──
function B4({ t, m }) {
  const w = m?1080:1200, h = m?1350:900, pw = m?450:390;
  return (
    <LBFrame t={t} w={w} h={h} gy={0.46} gs={m?56:64}>
      <div style={{ position:'absolute', inset:m?'0 0 130px':'0 0 30px', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ position:'relative' }}>
          <PhoneMock w={pw} rot={-3}><img src={LBIMG.phonePicker} alt="" decoding="async" style={{ width:'100%', display:'block' }} /></PhoneMock>
          <WhiteChip t={t} s={m?1.1:0.95} rot={8} style={{ position:'absolute', right:m?-130:-150, top:m?250:80 }}>lumir.photo</WhiteChip>
          <Spark s={m?36:32} color={t.accent} style={{ position:'absolute', left:-54, bottom:60 }} />
        </div>
      </div>
      <Rubric t={t} s={m?0.9:0.82}>Шаг 03 · Ссылка</Rubric>
      <Watermark t={t} s={m?0.85:0.8} />
    </LBFrame>);
}

// ── 5 · Шаг 04 · Скачайте макеты — 1200×900 / 1080×1350 ──
function Spread({ t, w = 340, rot = 0, style }) {
  const s = w/340, h = w*0.62;
  return (
    <div style={{ width:w, height:h, borderRadius:12*s, background:'#F7F5FB', border:'1px solid rgba(124,111,232,0.25)', transform:`rotate(${rot}deg)`,
      display:'flex', boxShadow:t.softShadow, overflow:'hidden', ...style }}>
      {[0,1].map(i=>(
        <div key={i} style={{ flex:1, padding:14*s, display:'flex', flexDirection:'column', gap:8*s, borderLeft:i?'1px solid rgba(30,37,48,0.14)':'none' }}>
          <Ph t={LB.light} w="100%" h={i?76*s:110*s} r={6*s} />
          {i===0 && <div style={{ height:7*s, width:'70%', borderRadius:4, background:'rgba(30,37,48,0.16)' }}></div>}
          {i===1 && <Ph t={LB.light} w="100%" h={44*s} r={6*s} />}
        </div>))}
    </div>);
}
function B5({ t, m }) {
  const w = m?1080:1200, h = m?1350:900;
  const spw = m?620:640, bw = m?450:420; // spread ratio 1.175, book ratio 0.829
  return (
    <LBFrame t={t} w={w} h={h} gy={0.45} gs={m?56:64}>
      <div style={{ position:'absolute', inset:m?'0 0 150px':'0 0 50px', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ position:'relative', width:m?840:1000, height:m?910:620 }}>
          <img src={LBIMG.mockSpread} alt="" style={{ position:'absolute', left:0, top:m?0:20, width:spw, height:spw/1.175, objectFit:'cover', borderRadius:22, transform:'rotate(-5deg)', border:`1px solid ${t.panelBorder}`, boxShadow:t.softShadow }} />
          <div style={{ position:'absolute', right:m?10:40, top:m?330:0 }}>
            <img src={LBIMG.mockBook} alt="" style={{ width:bw, height:bw/0.829, objectFit:'cover', borderRadius:22, transform:'rotate(3deg)', border:`1px solid ${t.panelBorder}`, boxShadow:t.panelShadow, display:'block' }} />
            <div style={{ position:'absolute', right:-20, top:-20, padding:'14px 22px', borderRadius:16, background:LB.grad, color:'#fff',
              fontFamily:LB.mont, fontWeight:900, fontSize:24, boxShadow:'0 0 34px rgba(139,124,246,0.5)' }}>PDF</div>
            <GradChip t={t} s={m?0.95:0.85} style={{ position:'absolute', left:'50%', bottom:-26, transform:'translateX(-50%)' }}>Готов к печати</GradChip>
          </div>
        </div>
      </div>
      <Rubric t={t} s={m?0.9:0.82}>Шаг 04 · Макеты</Rubric>
      <Watermark t={t} s={m?0.85:0.8} />
    </LBFrame>);
}

Object.assign(window, { arrC, panelSt, Cap, PhotoStack, CoverFan, B1, B2, B3, B4, B5, ApproveScreen, Spread });
