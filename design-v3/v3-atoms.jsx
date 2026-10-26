// Lumir landing v3 «Весь выпускной сезон» — атомы: часы, иконки этапов, узлы
const V3 = {
  gold:'#E8B45C', goldL:'#C0862E', goldGrad:'linear-gradient(100deg,#F0C878,#D89A3E)', goldInk:'#1A1408',
  green:'#188E58', greenD:'#2AAE72', cav:"'Caveat',cursive",
  ui:{ top:'#26242E', bg:'#1C1A24', card:'#22202B', line:'rgba(255,255,255,0.07)', text:'#F0ECF6', sub:'#9990AE', ok:'#3DD68C' },
};
const v3acc = (t, a) => a==='g' ? (t.dark?V3.gold:V3.goldL) : a==='e' ? (t.dark?V3.greenD:V3.green) : t.accent;
const v3c = (v) => Math.max(0, Math.min(1, v));
const v3p = (T, a, b) => v3c((T - a) / (b - a));
const v3o = (x) => 1 - Math.pow(1 - x, 3);
const v3io = (x) => x < 0.5 ? 4*x*x*x : 1 - Math.pow(-2*x + 2, 3) / 2;
const v3l = (a, b, x) => a + (b - a) * x;
const v3fmt = (n) => Math.round(n).toLocaleString('ru-RU').replace(/\s/g, '\u202F');
const v3gt = (g) => ({ backgroundImage:g, WebkitBackgroundClip:'text', backgroundClip:'text', color:'transparent' });

// Общие часы для всех анимаций канваса (пауза / кадр 0 = постер)
const V3Clock = (() => {
  let t0 = performance.now(), paused = false, pt = 0, last = 0; const subs = new Set();
  const now = () => paused ? pt : (performance.now() - t0) / 1000;
  const emit = () => { const n = now(); subs.forEach((f) => f(n)); };
  const loop = (ts) => { if (!paused && ts - last > 30) { last = ts; emit(); } requestAnimationFrame(loop); };
  requestAnimationFrame(loop);
  return {
    now, isPaused: () => paused,
    sub(f) { subs.add(f); f(now()); return () => subs.delete(f); },
    toggle() { if (paused) { t0 = performance.now() - pt * 1000; paused = false; } else { pt = now(); paused = true; } emit(); },
    seek(s) { pt = s; paused = true; emit(); },
  };
})();
function useV3T(dur) {
  const [t, setT] = React.useState(0);
  React.useEffect(() => V3Clock.sub((x) => setT(((x % dur) + dur) % dur)), [dur]);
  return t;
}
function V3Transport() {
  const [n, setN] = React.useState(0);
  React.useEffect(() => V3Clock.sub(setN), []);
  const p = V3Clock.isPaused();
  const b = { border:'1px solid rgba(155,143,232,0.4)', background:'#1C1927', color:'#F0ECF6', borderRadius:999, padding:'8px 16px', font:"600 13px 'Golos Text',sans-serif", cursor:'pointer' };
  return (
    <div style={{ position:'fixed', left:'50%', bottom:18, transform:'translateX(-50%)', zIndex:9999, display:'flex', alignItems:'center', gap:8, padding:6, borderRadius:999, background:'rgba(15,14,21,0.9)', boxShadow:'0 10px 30px rgba(0,0,0,0.4)' }}>
      <button style={b} onClick={() => V3Clock.toggle()}>{p ? '▶ Играть' : '❚❚ Пауза'}</button>
      <button style={b} onClick={() => V3Clock.seek(0)}>Кадр 0 · постер</button>
      <div style={{ font:"600 13px ui-monospace,monospace", color:'#9990AE', padding:'0 12px', minWidth:110 }}>{(n % 8).toFixed(1)} с / 8 с</div>
    </div>);
}

// Иконки: Lucide-контур, viewBox 24; на 40 px линия 2 px → stroke 1.2
const V3_IC = {
  classes:'<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  designs:'<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
  faces:'<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01"/><path d="M15 9h.01"/>',
  layout:'<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  retouch:'<path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/><path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/>',
  approval:'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  upsell:'<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>',
  print:'<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/>',
  galleries:'<path d="M18 22H4a2 2 0 0 1-2-2V6"/><path d="m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18"/><circle cx="12" cy="8" r="2"/><rect width="16" height="16" x="6" y="2" rx="2"/>',
  lessons:'<circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4z"/>',
  onboarding:'<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
  support:'<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  ideas:'<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  // обобщённые программы для баннера 2
  file:'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',
  image:'<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
  table:'<path d="M12 3v18"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/>',
  cloud:'<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
  calc:'<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M8 6h8"/><path d="M16 14v4"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/>',
  users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  heart:'<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  tick:'<path d="M20 6 9 17l-5-5"/>',
};
function V3Icon({ n, s = 40, c = 'currentColor', sw = 1.2, fill = 'none', className, style }) {
  return <svg className={className} width={s} height={s} viewBox="0 0 24 24" fill={fill} stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ display:'block', flex:'none', overflow:'visible', ...style }} dangerouslySetInnerHTML={{ __html:V3_IC[n] }}></svg>;
}
const v3IconSVG = (n) => `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">${V3_IC[n]}</svg>`;

const V3_STAGES = [
  { k:'classes', n:'01', name:'Новые классы', a:'v' },
  { k:'designs', n:'02', name:'Дизайны', a:'v' },
  { k:'faces', n:'03', name:'Распознавание лиц', a:'v' },
  { k:'layout', n:'04', name:'Автовёрстка', a:'v' },
  { k:'retouch', n:'05', name:'Ретушь', a:'v' },
  { k:'approval', n:'06', name:'Согласование', a:'e' },
  { k:'upsell', n:'07', name:'Допродажи', a:'g' },
  { k:'print', n:'08', name:'Печать', a:'v' },
  { k:'galleries', n:'09', name:'Галереи', a:'v' },
];
const V3_SUPPORT = [
  { k:'lessons', name:'Видеоуроки', a:'v' }, { k:'onboarding', name:'Онбординг-созвон', a:'v' },
  { k:'support', name:'Чат поддержки', a:'v' }, { k:'ideas', name:'Идеи в работу', a:'v' },
];

// Узел этапа: номер над кругом с иконкой
function V3Node({ t, st, d = 128, num = true, numFs, sw = 1.5, style }) {
  const c = v3acc(t, st.a);
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:d*0.14, ...style }}>
      {num && <div style={{ fontFamily:LB.mont, fontWeight:800, fontSize:numFs || d*0.19, letterSpacing:'0.12em', color:c, lineHeight:1 }}>{st.n}</div>}
      <div style={{ width:d, height:d, borderRadius:'50%', background:t.panel, border:`${Math.max(2, d*0.018)}px solid ${c}66`, display:'flex', alignItems:'center', justifyContent:'center',
        boxShadow:t.dark ? `0 0 ${d*0.4}px ${c}33, ${t.softShadow}` : t.softShadow }}>
        <V3Icon n={st.k} s={d*0.46} c={c} sw={sw} />
      </div>
    </div>);
}

// Тема с золотым свечением для «денежных» баннеров
const v3goldT = (t) => t.dark ? { ...t, glow:'rgba(232,180,92,0.13)', grid:'rgba(232,180,92,0.065)' } : { ...t, grid:'rgba(192,134,46,0.1)' };

Object.assign(window, { V3, v3acc, v3c, v3p, v3o, v3io, v3l, v3fmt, v3gt, V3Clock, useV3T, V3Transport, V3_IC, V3Icon, v3IconSVG, V3_STAGES, V3_SUPPORT, V3Node, v3goldT });
