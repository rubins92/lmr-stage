// Lumir landing banners — new identity atoms (dark violet / light Mist)
const LB = {
  grad: 'linear-gradient(96deg,#7C6FE8,#9B8FE8)',
  mont: "'Montserrat',sans-serif",
  golos: "'Golos Text',sans-serif",
  serif: "Georgia,'Times New Roman',serif",
  phone: { bg:'#171423', frame:'#2A2438', text:'#F0ECF6', sub:'#9990AE', line:'rgba(139,124,246,0.18)' },
  dark: {
    id:'dark', dark:true,
    bg:'#0F0E15', grid:'rgba(139,124,246,0.08)', glow:'rgba(139,124,246,0.16)',
    panel:'#1C1927', panelBorder:'rgba(139,124,246,0.22)',
    panelShadow:'0 34px 90px rgba(0,0,0,0.55)', softShadow:'0 18px 50px rgba(0,0,0,0.45)',
    text:'#F0ECF6', sub:'#9990AE', label:'#6A6280',
    pillBorder:'rgba(139,124,246,0.5)', pillText:'#B9A9EA',
    wm:'#4A4460', accent:'#9B8FE8',
    chipGlow:'0 0 44px rgba(139,124,246,0.5)',
    ok:'#3DD68C', off:'#6A6280',
    phBase:'#262138', phStripe:'rgba(139,124,246,0.14)', phText:'#9990AE',
    cell:'#241F33',
  },
  light: {
    id:'light', dark:false,
    bg:'#EFEDF8', grid:'rgba(124,111,232,0.12)', glow:null,
    panel:'#FFFFFF', panelBorder:'rgba(124,111,232,0.18)',
    panelShadow:'0 30px 70px rgba(30,37,48,0.2)', softShadow:'0 16px 40px rgba(30,37,48,0.16)',
    text:'#1E2530', sub:'#736D65', label:'#918B83',
    pillBorder:'rgba(124,111,232,0.45)', pillText:'#7C6FE8',
    wm:'#B8B2D0', accent:'#7C6FE8',
    chipGlow:'0 16px 44px rgba(124,111,232,0.4)',
    ok:'#1E9E63', off:'#918B83',
    phBase:'#E4E1F1', phStripe:'rgba(124,111,232,0.14)', phText:'#736D65',
    cell:'#E9E6F4',
  },
};

function LBFrame({ t, w, h, gx = 0.5, gy = 0.42, gs = 64, children }) {
  return (
    <div style={{ position:'relative', width:w, height:h, overflow:'hidden', background:t.bg, fontFamily:LB.mont }}>
      <div style={{ position:'absolute', inset:0, pointerEvents:'none',
        backgroundImage:`repeating-linear-gradient(0deg,${t.grid} 0 1px,transparent 1px ${gs}px),repeating-linear-gradient(90deg,${t.grid} 0 1px,transparent 1px ${gs}px)` }} />
      {t.dark && <div style={{ position:'absolute', left:`${gx*100}%`, top:`${gy*100}%`, width:w*0.82, height:w*0.55, transform:'translate(-50%,-50%)',
        background:`radial-gradient(closest-side,${t.glow},transparent)`, filter:'blur(40px)', pointerEvents:'none' }} />}
      {children}
    </div>);
}

// Rubric pill — bottom-left
function Rubric({ t, s = 1, children }) {
  return (
    <div style={{ position:'absolute', left:56*s, bottom:56*s, display:'inline-flex', alignItems:'center', padding:`${13*s}px ${30*s}px`, borderRadius:999,
      border:`${Math.max(2,2*s)}px solid ${t.pillBorder}`, color:t.pillText, fontFamily:LB.mont, fontWeight:800, fontSize:23*s, letterSpacing:'0.18em', textTransform:'uppercase', whiteSpace:'nowrap' }}>{children}</div>);
}

function Watermark({ t, s = 1 }) {
  return <div style={{ position:'absolute', right:56*s, bottom:66*s, color:t.wm, fontFamily:LB.mont, fontWeight:800, fontSize:21*s, letterSpacing:'0.3em', textIndent:'0.3em' }}>LUMIR</div>;
}

// 4-ray symmetric spark (EBSpark)
function Spark({ s = 40, color = '#8F7BF2', style }) {
  return <svg width={s} height={s} viewBox="0 0 40 40" fill={color} style={style}><path d="M20 0c1.8 13 5.2 16.2 20 20-14.8 3.8-18.2 7-20 20-1.8-13-5.2-16.2-20-20 14.8-3.8 18.2-7 20-20z"></path></svg>;
}

// Accent chip: same gradient in both themes
function GradChip({ t, s = 1, children, style }) {
  return (
    <div style={{ display:'inline-flex', alignItems:'center', gap:12*s, padding:`${15*s}px ${34*s}px`, borderRadius:999, background:LB.grad, color:'#fff',
      fontFamily:LB.mont, fontWeight:800, fontSize:24*s, letterSpacing:'0.08em', textTransform:'uppercase', whiteSpace:'nowrap', boxShadow:t.chipGlow, ...style }}>{children}</div>);
}

function WhiteChip({ t, s = 1, rot = 0, children, style }) {
  return (
    <div style={{ display:'inline-flex', alignItems:'center', padding:`${16*s}px ${34*s}px`, borderRadius:18*s, background:'#fff', color:'#1E2530',
      fontFamily:LB.mont, fontWeight:900, fontSize:27*s, transform:`rotate(${rot}deg)`, boxShadow:t.dark?'0 18px 44px rgba(0,0,0,0.5)':'0 16px 40px rgba(30,37,48,0.22)',
      border:t.dark?'none':`1px solid ${t.panelBorder}`, whiteSpace:'nowrap', ...style }}>{children}</div>);
}

// Striped photo placeholder
function Ph({ t, w, h, r = 12, label, fs = 15, circle, style }) {
  return (
    <div style={{ width:w, height:h, borderRadius:circle?'50%':r, flex:'none', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', overflow:'hidden',
      background:`repeating-linear-gradient(45deg,${t.phStripe} 0 10px,transparent 10px 20px) ${t.phBase}`, color:t.phText,
      fontFamily:'ui-monospace,monospace', fontSize:fs, lineHeight:1.3, ...style }}>{label||''}</div>);
}

function LbLabel({ t, s = 1, children, style }) {
  return <div style={{ fontFamily:LB.mont, fontWeight:800, fontSize:20*s, letterSpacing:'0.18em', textTransform:'uppercase', color:t.label, whiteSpace:'nowrap', ...style }}>{children}</div>;
}

function CheckBadge({ s = 44, style }) {
  return (
    <div style={{ width:s, height:s, borderRadius:'50%', background:LB.grad, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 0 24px rgba(139,124,246,0.55)', flex:'none', ...style }}>
      <svg width={s*0.52} height={s*0.52} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5 9-10"></path></svg>
    </div>);
}

// ---------- Album covers ----------
function CoverDark({ w, style }) {
  const s = w/300;
  return (
    <div style={{ width:w, height:w*1.32, borderRadius:14*s, background:'linear-gradient(170deg,#221D36,#14111F)', border:'1px solid rgba(139,124,246,0.3)', overflow:'hidden',
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between', padding:`${26*s}px ${20*s}px`, ...style }}>
      <div style={{ fontFamily:LB.serif, fontStyle:'italic', fontSize:19*s, color:'#B9A9EA' }}>Lumir</div>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontFamily:LB.serif, fontSize:44*s, letterSpacing:'0.04em', color:'#F0ECF6', lineHeight:1.05 }}>ВЫПУСК</div>
        <div style={{ fontFamily:LB.serif, fontSize:30*s, color:'#9B8FE8', marginTop:8*s }}>2026</div>
      </div>
      <div style={{ width:44*s, borderTop:'1px solid rgba(139,124,246,0.5)' }}></div>
    </div>);
}

function CoverMag({ w, style }) {
  const s = w/300;
  return (
    <div style={{ width:w, height:w*1.32, borderRadius:14*s, background:'#F7F5FB', border:'1px solid rgba(124,111,232,0.25)', overflow:'hidden',
      display:'flex', flexDirection:'column', alignItems:'center', padding:`${24*s}px ${18*s}px`, gap:12*s, ...style }}>
      <div style={{ fontFamily:LB.serif, fontStyle:'italic', fontSize:20*s, color:'#5A4FBF' }}>Lumir</div>
      <div style={{ width:'100%', borderTop:'1px solid rgba(30,37,48,0.14)' }}></div>
      <div style={{ fontFamily:LB.serif, fontStyle:'italic', fontSize:17*s, color:'#736D65' }}>Выпускной альбом</div>
      <Ph t={LB.light} w={w-64*s} h={106*s} r={8*s} />
      <div style={{ fontFamily:LB.mont, fontWeight:900, fontSize:30*s, letterSpacing:'0.02em', color:'#1E2530', marginTop:4*s }}>11А КЛАСС</div>
      <div style={{ fontFamily:LB.mont, fontWeight:800, fontSize:12.5*s, letterSpacing:'0.2em', color:'#7C6FE8' }}>ШКОЛА 17 · МОСКВА</div>
    </div>);
}

function CoverViolet({ w, lines = ['ВЫПУСК 2026'], style }) {
  const s = w/300;
  return (
    <div style={{ width:w, height:w*1.32, borderRadius:14*s, background:'linear-gradient(165deg,#8C7FEA,#5F51CE)', overflow:'hidden',
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16*s, padding:20*s, ...style }}>
      <Ph t={LB.dark} w={124*s} h={124*s} circle style={{ boxShadow:'0 0 0 5px rgba(255,255,255,0.55)', background:'#4A3FA8', color:'#DCD4FF' }} />
      {lines.map((l,i)=>(
        <div key={i} style={{ fontFamily:i===0?LB.serif:LB.mont, fontWeight:i===0?400:800, fontSize:(i===0?26:13)*s, letterSpacing:i===0?'0.05em':'0.2em',
          color:'#fff', textAlign:'center', marginTop:i===1?4*s:0 }}>{l}</div>))}
    </div>);
}

// Mini cover for result grids
function MiniCover({ w, i = 0 }) {
  const kind = i%3, s = w/72;
  const bg = kind===0?'linear-gradient(170deg,#221D36,#14111F)':kind===1?'#F7F5FB':'linear-gradient(165deg,#8C7FEA,#5F51CE)';
  const fg = kind===1?'#5A4FBF':'#EDE8FA';
  return (
    <div style={{ width:w, height:w*1.3, borderRadius:8*s, background:bg, border:kind===1?'1px solid rgba(124,111,232,0.3)':'1px solid rgba(139,124,246,0.28)',
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:6*s }}>
      <div style={{ fontFamily:LB.serif, fontStyle:'italic', fontSize:16*s, color:fg }}>L</div>
      <div style={{ width:'52%', borderTop:`1px solid ${kind===1?'rgba(90,79,191,0.5)':'rgba(237,232,250,0.55)'}` }}></div>
    </div>);
}

// Phone mockup — dark product UI in BOTH themes
function PhoneMock({ w, rot = 0, style, children }) {
  const s = w/420;
  return (
    <div style={{ width:w, borderRadius:62*s, background:LB.phone.frame, padding:14*s, transform:rot?`rotate(${rot}deg)`:'none',
      boxShadow:'0 44px 100px rgba(12,10,20,0.5)', ...style }}>
      <div style={{ position:'relative', borderRadius:50*s, background:LB.phone.bg, overflow:'hidden' }}>
        <div style={{ position:'absolute', top:16*s, left:'50%', transform:'translateX(-50%)', width:96*s, height:26*s, borderRadius:999, background:LB.phone.frame, zIndex:2 }}></div>
        {children}
      </div>
    </div>);
}

// Dashed arrow (svg), dir: right | down
function DashArrow({ len = 150, color = 'rgba(139,124,246,0.7)', dir = 'right', sw = 3, style }) {
  const a = 12;
  if (dir === 'down') return (
    <svg width={a*2+8} height={len} viewBox={`0 0 ${a*2+8} ${len}`} fill="none" style={style}>
      <path d={`M${a+4} 2v${len-16}`} stroke={color} strokeWidth={sw} strokeDasharray="9 9" strokeLinecap="round"></path>
      <path d={`M${4} ${len-a-4}l${a} ${a} ${a} -${a}`} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>);
  return (
    <svg width={len} height={a*2+8} viewBox={`0 0 ${len} ${a*2+8}`} fill="none" style={style}>
      <path d={`M2 ${a+4}h${len-16}`} stroke={color} strokeWidth={sw} strokeDasharray="9 9" strokeLinecap="round"></path>
      <path d={`M${len-a-4} 4l${a} ${a} -${a} ${a}`} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>);
}

function PlayBtn({ s = 190 }) {
  return (
    <div style={{ width:s, height:s, borderRadius:'50%', background:LB.grad, display:'flex', alignItems:'center', justifyContent:'center', flex:'none',
      boxShadow:'0 0 90px rgba(139,124,246,0.55), 0 24px 60px rgba(20,15,40,0.35)' }}>
      <svg width={s*0.4} height={s*0.4} viewBox="0 0 24 24" fill="#fff" style={{ marginLeft:s*0.05 }}><path d="M7 4.8c0-1.2 1.3-1.9 2.3-1.3l11 6.9c1 .6 1 2 0 2.6l-11 6.9c-1 .6-2.3-.1-2.3-1.3V4.8z"></path></svg>
    </div>);
}

// Panel-styled pill with status dot («● LUMIR», «● Демо · 1 минута»)
function DotPill({ t, s = 1, dot = '#E5484D', children, style }) {
  return (
    <div style={{ display:'inline-flex', alignItems:'center', gap:14*s, padding:`${14*s}px ${30*s}px`, borderRadius:999, background:t.panel,
      border:`1px solid ${t.panelBorder}`, boxShadow:t.softShadow, color:t.text, fontFamily:LB.mont, fontWeight:800, fontSize:23*s,
      letterSpacing:'0.12em', textTransform:'uppercase', whiteSpace:'nowrap', ...style }}>
      <span style={{ width:15*s, height:15*s, borderRadius:'50%', background:dot, boxShadow:`0 0 ${12*s}px ${dot}`, flex:'none' }}></span>{children}
    </div>);
}

// Real assets (covers, photos, UI screenshots, print mockups)
const LBIMG = {
  covers: ['assets/sm/cover8-r-520.jpg','assets/sm/cover20-r-520.jpg','assets/sm/cover22-r-520.jpg','assets/sm/cover27-r-520.jpg'],
  photos: ['assets/portrait.jpg','assets/portrait2.png','assets/student.png'],
  uiPortraits: 'assets/app-portraits.png',
  uiEditor: 'assets/app-editor.png',
  uiAlbums: 'assets/app-albums.png',
  mockBook: 'assets/mockup-book.jpg',
  mockSpread: 'assets/mockup-spread.jpg',
  uiPersons: 'assets/ui/persons.jpg',            // Проверка персон, 1.82
  uiUpload: 'assets/ui/upload-portraits.jpg',    // Портреты учеников, 1.786
  uiCoverSelect: 'assets/ui/cover-select.jpg',   // Выбор обложки, 1.761
  uiSpreadEditor: 'assets/ui/spread-editor.jpg', // Редактор разворота, 1.212
  phonePicker: 'assets/ui/phone-picker.jpg',     // Мобайл «Кто ты?», 0.527
  coverAlina: 'assets/ui/cover-alina.jpg',       // Готовая обложка, 0.671
};
const LBSMALL = {
  'assets/sm/cover8-r-520.jpg':'assets/sm/cover8-r-140.jpg', 'assets/sm/cover20-r-520.jpg':'assets/sm/cover20-r-140.jpg',
  'assets/sm/cover22-r-520.jpg':'assets/sm/cover22-r-140.jpg', 'assets/sm/cover27-r-520.jpg':'assets/sm/cover27-r-140.jpg',
  'assets/ui/cover-alina.jpg':'assets/sm/cover-alina-140.jpg',
};
const STUD = [
  ['assets/students/01_01.jpg','50% 16%'], ['assets/students/01_07.jpg','50% 20%'], ['assets/students/01_18.jpg','52% 14%'],
  ['assets/students/01_44.jpg','50% 16%'], ['assets/students/01_27.jpg','50% 10%'], ['assets/students/01_56.jpg','55% 18%'],
  ['assets/students/01_17.jpg','50% 26%'], ['assets/students/01_32.jpg','62% 28%'], ['assets/students/01_68.jpg','58% 26%'],
];
function SPhoto({ i = 0, w, h, r = 12, circle, style }) {
  const [src, pos] = STUD[i % STUD.length];
  if (circle) {
    const av = 'assets/sm/av-' + src.split('/').pop();
    return <PImg src={av} w={w} h={h} r={r} pos="50% 50%" circle style={style} />;
  }
  return <PImg src={src} w={w} h={h} r={r} pos={pos} circle={circle} style={style} />;
}
function RCover({ src, w, r, style }) {
  const real = (w <= 90 && LBSMALL[src]) ? LBSMALL[src] : src;
  return <img src={real} alt="" decoding="async" style={{ width:w, height:w*1.42, objectFit:'cover', borderRadius:r??Math.max(6,w*0.04), display:'block', flex:'none', border:'1px solid rgba(139,124,246,0.28)', background:'#fff', ...style }} />;
}
function PImg({ src, w, h, r = 12, pos = '50% 22%', circle, style }) {
  return <img src={src} alt="" decoding="async" style={{ width:w, height:h??w, objectFit:'cover', objectPosition:pos, borderRadius:circle?'50%':r, display:'block', flex:'none', ...style }} />;
}
function Shot({ t, src, w, ratio = 1.8, r = 22, style }) {
  return <img src={src} alt="" decoding="async" style={{ width:w, height:Math.round(w/ratio), objectFit:'cover', borderRadius:r, display:'block', border:`1px solid ${t.panelBorder}`, boxShadow:t.panelShadow, background:'#171423', ...style }} />;
}

Object.assign(window, { LBIMG, STUD, SPhoto, RCover, PImg, Shot, LB, LBFrame, Rubric, Watermark, Spark, GradChip, WhiteChip, Ph, LbLabel, CheckBadge, CoverDark, CoverMag, CoverViolet, MiniCover, PhoneMock, DashArrow, PlayBtn, DotPill });
