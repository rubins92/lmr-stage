// Lumir landing v3 — анимации: 2 «Шесть инструментов → один Lumir», 6 «Допродажи». Цикл 8 с, всё — функция от T.

const V3_TOOLS = [
  { k:'pdf', name:'Портфолио.pdf', ic:'file', tint:'#E5484D', tab:'Маркетинг' },
  { k:'ps', name:'Фоторедактор', ic:'image', tint:'#4C8DF0', tab:'Автовёрстка' },
  { k:'xls', name:'Таблица.xlsx', ic:'table', tint:'#2FA36B', tab:'Класс' },
  { k:'msg', name:'Мессенджер', ic:'support', tint:'#3AA0E8', tab:'Утверждение' },
  { k:'cloud', name:'Облако', ic:'cloud', tint:'#8E88A8', tab:'Галереи' },
  { k:'calc', name:'Калькулятор', ic:'calc', tint:'#E8935C', tab:'Допродажи' },
];
const V3_ROSTER = ['Алиса К.', 'Миша Р.', 'Соня В.', 'Тимур Н.', 'Ева Л.', 'Артём П.'];

function V3ToolWin({ t, tool, s = 1, count }) {
  const bar = (w, al) => <div style={{ height:12*s, width:w, borderRadius:6*s, background:t.cell, alignSelf:al }}></div>;
  let body;
  if (tool.k==='pdf') body = <div style={{ display:'flex', gap:10*s }}>{[0,3,6].map((i) => <SPhoto key={i} i={i} w={84*s} h={96*s} r={8*s} />)}</div>;
  else if (tool.k==='ps') body = <div style={{ display:'flex', gap:12*s }}><SPhoto i={1} w={150*s} h={96*s} r={8*s} /><div style={{ flex:1, display:'flex', flexDirection:'column', gap:10*s, paddingTop:6*s }}>{bar('100%')}{bar('80%')}{bar('90%')}{bar('60%')}</div></div>;
  else if (tool.k==='xls') body = <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:3*s }}>{Array.from({ length:20 }).map((_, i) => <div key={i} style={{ height:21*s, borderRadius:3*s, background:i<5?tool.tint+'40':t.cell }}></div>)}</div>;
  else if (tool.k==='msg') body = <div style={{ display:'flex', flexDirection:'column', gap:10*s }}>{bar('70%','flex-start')}<div style={{ height:12*s, width:'52%', borderRadius:6*s, background:tool.tint+'66', alignSelf:'flex-end' }}></div>{bar('62%','flex-start')}{bar('44%','flex-start')}</div>;
  else if (tool.k==='cloud') body = <div style={{ display:'flex', gap:16*s, paddingTop:6*s }}>{[0,1,2].map((i) => <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8*s }}><V3Icon n="image" s={52*s} c={t.sub} sw={1.4} />{bar(56*s)}</div>)}</div>;
  else body = <div style={{ display:'flex', flexDirection:'column', gap:8*s }}><div style={{ fontFamily:LB.mont, fontWeight:900, fontSize:32*s, color:t.text, textAlign:'right' }}>18 400</div><div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:5*s }}>{Array.from({ length:12 }).map((_, i) => <div key={i} style={{ height:20*s, borderRadius:5*s, background:i===11?tool.tint+'66':t.cell }}></div>)}</div></div>;
  return (
    <div style={{ position:'relative', width:340*s, height:224*s, borderRadius:18*s, background:t.panel, border:`1px solid ${t.panelBorder}`, boxShadow:t.panelShadow, overflow:'visible' }}>
      <div style={{ display:'flex', alignItems:'center', gap:12*s, padding:`${14*s}px ${16*s}px`, borderBottom:`1px solid ${t.panelBorder}` }}>
        <div style={{ display:'flex', gap:6*s }}>{[0,1,2].map((i) => <div key={i} style={{ width:10*s, height:10*s, borderRadius:'50%', background:t.cell }}></div>)}</div>
        <div style={{ width:34*s, height:34*s, borderRadius:9*s, background:tool.tint+'26', display:'flex', alignItems:'center', justifyContent:'center', marginLeft:4*s }}><V3Icon n={tool.ic} s={22*s} c={tool.tint} sw={1.8} /></div>
        <div style={{ fontFamily:LB.golos, fontWeight:600, fontSize:21*s, color:t.text, whiteSpace:'nowrap' }}>{tool.name}</div>
      </div>
      <div style={{ padding:`${16*s}px ${18*s}px` }}>{body}</div>
      {count != null && <div style={{ position:'absolute', right:-14*s, top:-14*s, minWidth:46*s, height:46*s, padding:`0 ${12*s}px`, borderRadius:999, background:'#E5484D', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center',
        fontFamily:LB.mont, fontWeight:900, fontSize:20*s, boxShadow:'0 6px 16px rgba(229,72,77,0.45)', fontVariantNumeric:'tabular-nums' }}>{count}</div>}
    </div>);
}

// Окно Lumir — тёмный продуктовый UI в обеих темах
function V3LumirWin({ g, T, mobile }) {
  const U = V3.ui, s = g.s;
  const fe = (i) => 2.0 + i*0.3 + 0.75;
  const k = (T - 4) / 0.5, i0 = Math.floor(k), f = v3io(v3c((k - i0) / 0.4));
  const actOn = T >= 3.9 && T < 7.6 ? 1 : 0;
  const pos = T < 4 ? 0 : Math.min(5, i0 - 1 + f + (i0 === 0 ? 1 - f : 0));
  const ulOp = v3p(T, 3.9, 4.2);
  const cellW = mobile ? (g.ww - 24) / 3 : (g.ww - 220) / 6;
  const ulX = mobile ? 12 + (Math.round(pos) % 3) * cellW : 200 + pos * cellW;
  const ulY = mobile ? 56 + Math.floor(Math.round(pos) / 3) * 48 + 40 : 60;
  const greens = V3_ROSTER.map((_, r) => v3p(T, 4.3 + r*0.42, 4.6 + r*0.42));
  const done = 13 + greens.reduce((a, b) => a + b, 0);
  const rows = mobile ? V3_ROSTER.slice(0, 5) : V3_ROSTER;
  const activeIdx = Math.round(pos);
  const tabs = V3_TOOLS.map((tl, i) => (
    <div key={tl.k} style={{ display:'flex', alignItems:'center', justifyContent:'center', fontFamily:LB.golos, fontWeight:600, fontSize:(mobile?17:19)*s, whiteSpace:'nowrap',
      color:actOn && activeIdx===i && T>=4 ? U.text : U.sub, opacity:v3p(T, fe(i) - 0.15, fe(i) + 0.15), height:mobile?44:64 }}>{tl.tab}</div>));
  return (
    <div style={{ position:'relative', width:g.ww, height:g.wh, borderRadius:22, background:U.bg, border:'1px solid rgba(155,143,232,0.25)', boxShadow:'0 40px 100px rgba(10,8,20,0.5)', overflow:'hidden' }}>
      <div style={{ position:'relative', background:U.top, borderBottom:`1px solid ${U.line}`, ...(mobile ? { paddingBottom:8 } : { display:'flex', height:64 }) }}>
        <div style={{ width:mobile?'auto':200, height:mobile?56:64, display:'flex', alignItems:'center', gap:10, paddingLeft:mobile?18:28 }}>
          <Spark s={18*s} color="#9B8FE8" />
          <div style={{ fontFamily:LB.mont, fontWeight:900, fontSize:20*s, letterSpacing:'0.3em', color:U.text }}>LUMIR</div>
        </div>
        <div style={mobile ? { display:'grid', gridTemplateColumns:'repeat(3,1fr)', gridTemplateRows:'44px 44px', rowGap:4, padding:'0 12px' } : { display:'grid', gridTemplateColumns:'repeat(6,1fr)', width:g.ww - 220 }}>{tabs}</div>
        <div style={{ position:'absolute', left:ulX + cellW*0.18, top:ulY, width:cellW*0.64, height:3, borderRadius:2, background:LB.grad, opacity:ulOp * actOn, boxShadow:'0 0 10px rgba(155,143,232,0.7)' }}></div>
      </div>
      <div style={{ display:'flex', gap:24*s, padding:`${(mobile?18:26)*s}px ${(mobile?18:28)*s}px` }}>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12*s }}>
            <div style={{ fontFamily:LB.mont, fontWeight:800, fontSize:24*s, color:U.text }}>11 «Б» · Школа 17</div>
            <div style={{ fontFamily:LB.golos, fontWeight:600, fontSize:17*s, color:U.sub }}>25 учеников</div>
          </div>
          {rows.map((n, r) => {
            const gp = greens[r];
            return (
              <div key={n} style={{ display:'flex', alignItems:'center', gap:14*s, height:(mobile?56:60)*s, borderTop:`1px solid ${U.line}` }}>
                <SPhoto i={r+1} w={38*s} circle />
                <div style={{ flex:1, fontFamily:LB.golos, fontWeight:600, fontSize:19*s, color:U.text }}>{n}</div>
                <div style={{ position:'relative', width:150*s, height:32*s }}>
                  {[['Выбирает фото', '#9B8FE8', 1 - gp], ['Утвердил', U.ok, gp]].map(([lb, c, o]) => (
                    <div key={lb} style={{ position:'absolute', right:0, top:0, height:32*s, display:'flex', alignItems:'center', gap:8*s, padding:`0 ${14*s}px`, borderRadius:999, background:c + '1f', color:c,
                      fontFamily:LB.golos, fontWeight:600, fontSize:15*s, whiteSpace:'nowrap', opacity:o, transform:`translateY(${(1 - o) * (lb==='Утвердил' ? 8 : -8)}px)` }}>
                      <span style={{ width:7*s, height:7*s, borderRadius:'50%', background:c }}></span>{lb}</div>))}
                </div>
              </div>);
          })}
          {mobile && <V3Progress done={done} s={s} style={{ marginTop:14*s }} />}
        </div>
        {!mobile && (
          <div style={{ width:380, padding:22, borderRadius:18, background:U.card, border:`1px solid ${U.line}`, display:'flex', flexDirection:'column', gap:18 }}>
            <div style={{ fontFamily:LB.golos, fontWeight:600, fontSize:17, color:U.sub }}>Макеты класса</div>
            <div style={{ display:'flex', gap:12 }}>{LBIMG.covers.slice(0, 3).map((c) => <RCover key={c} src={c} w={102} r={8} />)}</div>
            <V3Progress done={done} s={1} />
          </div>)}
      </div>
    </div>);
}
function V3Progress({ done, s = 1, style }) {
  const U = V3.ui;
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:10*s, ...style }}>
      <div style={{ display:'flex', justifyContent:'space-between', fontFamily:LB.golos, fontWeight:600, fontSize:17*s, color:U.sub }}>
        <span>Утвердили</span><span style={{ color:U.text, fontVariantNumeric:'tabular-nums' }}>{Math.round(done)} из 25</span></div>
      <div style={{ height:10*s, borderRadius:999, background:'rgba(255,255,255,0.08)', overflow:'hidden' }}>
        <div style={{ width:`${done/25*100}%`, height:'100%', borderRadius:999, background:`linear-gradient(90deg,#9B8FE8,${U.ok})` }}></div></div>
    </div>);
}

const V3_TOOLS_G = {
  d: { w:2320, h:720, s:1, ts:1, wx:540, wy:60, ww:1240, wh:600,
    pos:[[90,70,-4],[500,410,3],[930,56,-2],[1450,420,4],[1870,64,-3],[1940,450,2]], note:{ x:1830, y:120 } },
  m: { w:670, h:1040, s:0.8, ts:0.6, wx:30, wy:430, ww:610, wh:580,
    pos:[[22,40,-4],[236,78,3],[452,26,-3],[34,236,3],[248,262,-2],[452,226,4]], note:{ x:160, y:150 } },
};
function V3Tools({ t, m, T: Tp }) {
  const Tc = useV3T(8), T = Tp ?? Tc, g = m ? V3_TOOLS_G.m : V3_TOOLS_G.d;
  const tw = 340*g.ts, th = 224*g.ts;
  const winOp = v3o(v3p(T, 1.9, 2.6)) * (1 - v3io(v3p(T, 7.0, 7.7)));
  const winSc = T < 5 ? v3l(0.96, 1, v3o(v3p(T, 1.9, 2.6))) : v3l(1, 0.98, v3p(T, 7.0, 7.7));
  const tabC = (i) => m
    ? [g.wx + 12 + ((g.ww - 24)/3) * (i % 3 + 0.5), g.wy + 56 + Math.floor(i/3)*48 + 22]
    : [g.wx + 200 + ((g.ww - 220)/6) * (i + 0.5), g.wy + 32];
  const noteOp = v3o(v3p(T, 4.6, 5.2)) * (1 - v3p(T, 6.9, 7.4));
  return (
    <LBFrame t={t} w={g.w} h={g.h} gy={m?0.6:0.5} gs={m?56:64}>
      <div style={{ position:'absolute', left:g.wx, top:g.wy, opacity:winOp, transform:`translateY(${(1 - winOp)*12}px) scale(${winSc})`, transformOrigin:'50% 50%' }}>
        <V3LumirWin g={g} T={T} mobile={m} />
      </div>
      {V3_TOOLS.map((tool, i) => {
        const [x, y, rot] = g.pos[i];
        const ph = i*1.1, fx = Math.sin(2*Math.PI*T/8 + ph) * 10, fy = Math.cos(2*Math.PI*T/8*2 + ph) * 6;
        const cx = x + tw/2, cy = y + th/2;
        const fs = 2.0 + i*0.3, fe = fs + 0.75;
        let X = cx + fx, Y = cy + fy, sc = 1, op = 1, r = rot;
        if (T >= fs && T < 7.2) {
          const p = v3io(v3p(T, fs, fe)), [tx, ty] = tabC(i);
          X = v3l(cx + fx, tx, p); Y = v3l(cy + fy, ty, p); sc = v3l(1, 0.12, p); r = v3l(rot, 0, p);
          op = 1 - v3p(p, 0.55, 1);
        } else if (T >= 7.2) { const q = v3o(v3p(T, 7.2, 8)); op = q; sc = v3l(0.94, 1, q); }
        if (op <= 0.001) return null;
        const cnt = tool.k==='msg' ? (T >= 7 ? 37 : Math.round(v3l(37, 128, v3io(v3p(T, 0.2, 1.8))))) : null;
        return (
          <div key={tool.k} style={{ position:'absolute', left:X - tw/2, top:Y - th/2, opacity:op, transform:`rotate(${r}deg) scale(${sc})`, transformOrigin:'50% 50%', zIndex:3 }}>
            <V3ToolWin t={t} tool={tool} s={g.ts} count={cnt} />
          </div>);
      })}
      <div style={{ position:'absolute', left:g.note.x, top:g.note.y, opacity:noteOp, transform:`translateY(${(1 - noteOp)*12}px) rotate(-4deg)`, display:'flex', flexDirection:m?'column':'row', alignItems:'center', gap:12 }}>
        <Spark s={m?30:34} color={t.accent} />
        <div style={{ fontFamily:V3.cav, fontWeight:600, fontSize:m?64:56, color:t.accent, whiteSpace:'nowrap', lineHeight:1 }}>всё в одном окне</div>
        {m && <DashArrow dir="down" len={120} color={arrC(t)} style={{ marginTop:14 }} />}
      </div>
    </LBFrame>);
}

// ── 6 · Допродажи — 680×1080 / 670×1080 ──
const V3_UPS = [
  { name:'Дополнительный разворот', price:700, c:1.4 },
  { name:'Второй портрет на виньетке', price:350, c:2.6 },
  { name:'Все фото в цифре', price:1500, c:3.8 },
];
function V3UpsellScreen({ T, w }) {
  const s = w/430, U = V3.ui, rs = v3p(T, 7.2, 7.8), live = 1 - rs;
  const vals = [0, 700, 1050, 2550];
  let total = 0;
  V3_UPS.forEach((u, i) => { if (T >= u.c) total = v3l(vals[i], vals[i+1], v3io(v3p(T, u.c, u.c + 0.6))); });
  if (T >= 7.2) total = v3l(2550, 0, v3io(rs));
  const pressed = T >= 4.9 && T < 7.2, press = 1 - 0.05 * Math.sin(Math.PI * v3p(T, 4.9, 5.15));
  const doneOp = v3p(T, 5.05, 5.3) * live;
  const plusOp = v3o(v3p(T, 0.3, 0.8)) * live;
  const flash = Math.max(0, ...V3_UPS.map((u) => 1 - v3p(T, u.c, u.c + 0.7))) * (T >= 1.4 && T < 7.2 ? 1 : 0);
  return (
    <div style={{ height:900*s, padding:`${66*s}px ${24*s}px ${26*s}px`, display:'flex', flexDirection:'column', gap:16*s, background:U.bg }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontFamily:LB.mont, fontWeight:800, fontSize:13*s, letterSpacing:'0.22em', color:U.sub }}>МОЙ АЛЬБОМ</div>
        <div style={{ fontFamily:LB.mont, fontWeight:800, fontSize:22*s, color:U.text, marginTop:8*s }}>Выпуск 2026 · 11 «Б»</div>
      </div>
      <div style={{ position:'relative', display:'flex', gap:4*s, padding:8*s, borderRadius:14*s, background:'#fff' }}>
        <SPhoto i={0} w={186*s} h={220*s} r={6*s} />
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:4*s, flex:1 }}>{[2,4,5,7].map((p) => <SPhoto key={p} i={p} w={91*s} h={108*s} r={6*s} />)}</div>
        <div style={{ position:'absolute', right:-8*s, bottom:-16*s, padding:`${9*s}px ${16*s}px`, borderRadius:999, background:'#1C1927', border:`${1.5*s}px solid ${V3.gold}`, color:V3.gold,
          fontFamily:LB.mont, fontWeight:800, fontSize:15*s, opacity:plusOp, transform:`translateY(${(1 - plusOp)*10}px) scale(${1 + 0.06*(T>=1.4&&T<2.1?Math.sin(Math.PI*v3p(T,1.4,2.1)):0)})`, boxShadow:'0 8px 20px rgba(0,0,0,0.4), 0 0 20px rgba(232,180,92,0.3)' }}>+ разворот</div>
      </div>
      <div style={{ fontFamily:LB.mont, fontWeight:800, fontSize:13*s, letterSpacing:'0.2em', color:U.sub, marginTop:10*s }}>ДОКУПИТЬ К АЛЬБОМУ</div>
      <div style={{ display:'flex', flexDirection:'column', gap:10*s }}>
        {V3_UPS.map((u) => {
          const on = T >= u.c ? live : 0, pop = T >= u.c && T < 7.2 ? v3o(v3p(T, u.c, u.c + 0.25)) : on;
          const tap = v3p(T, u.c - 0.12, u.c + 0.35);
          return (
            <div key={u.name} style={{ display:'flex', alignItems:'center', gap:14*s, padding:`${15*s}px ${16*s}px`, borderRadius:16*s, background:U.card, border:`${1.5*s}px solid rgba(232,180,92,${0.08 + 0.5*on})` }}>
              <div style={{ position:'relative', width:30*s, height:30*s, flex:'none' }}>
                <div style={{ position:'absolute', inset:0, borderRadius:9*s, border:`${2*s}px solid #3A3648` }}></div>
                <div style={{ position:'absolute', inset:0, borderRadius:9*s, background:V3.goldGrad, opacity:on, transform:`scale(${v3l(0.6, 1, pop)})`, display:'flex', alignItems:'center', justifyContent:'center' }}><V3Icon n="tick" s={20*s} c={V3.goldInk} sw={3} /></div>
                {tap > 0 && tap < 1 && <div style={{ position:'absolute', left:'50%', top:'50%', width:60*s, height:60*s, margin:-30*s, borderRadius:'50%', border:`${2*s}px solid ${V3.gold}`, opacity:1 - tap, transform:`scale(${v3l(0.4, 1.2, v3o(tap))})` }}></div>}
              </div>
              <div style={{ flex:1, fontFamily:LB.golos, fontWeight:600, fontSize:17*s, lineHeight:1.25, color:U.text }}>{u.name}</div>
              <div style={{ fontFamily:LB.mont, fontWeight:800, fontSize:17*s, whiteSpace:'nowrap', color:on > 0.5 ? V3.gold : U.sub }}>{v3fmt(u.price)} ₽</div>
            </div>);
        })}
      </div>
      <div style={{ flex:1 }}></div>
      <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', padding:`${16*s}px ${20*s}px`, borderRadius:18*s, background:U.card,
        border:`${1.5*s}px solid rgba(232,180,92,${0.25 + 0.5*flash})`, boxShadow:`0 0 ${30*flash*s}px rgba(232,180,92,${0.35*flash})` }}>
        <div style={{ fontFamily:LB.golos, fontWeight:600, fontSize:16*s, color:U.sub, paddingBottom:6*s }}>Итого к альбому</div>
        <div style={{ fontFamily:LB.mont, fontWeight:900, fontSize:40*s, lineHeight:1, fontVariantNumeric:'tabular-nums', ...v3gt(V3.goldGrad) }}>{v3fmt(total)} ₽</div>
      </div>
      <div style={{ position:'relative', height:62*s, borderRadius:18*s, background:V3.goldGrad, transform:`scale(${pressed ? press : 1})`, boxShadow:'0 0 40px rgba(232,180,92,0.4), inset 0 1px 0 rgba(255,255,255,0.4)',
        display:'flex', alignItems:'center', justifyContent:'center', fontFamily:LB.mont, fontWeight:800, fontSize:19*s, letterSpacing:'0.08em', color:V3.goldInk }}>
        <span style={{ opacity:1 - doneOp }}>ДОБАВИТЬ</span>
        <span style={{ position:'absolute', display:'flex', alignItems:'center', gap:10*s, opacity:doneOp }}><V3Icon n="tick" s={22*s} c={V3.goldInk} sw={3} />ДОБАВЛЕНО</span>
      </div>
    </div>);
}
function V3Upsell({ t, m, T: Tp }) {
  const Tc = useV3T(8), T = Tp ?? Tc, w = m ? 670 : 680, h = 1080, pw = 460, gt = v3goldT(t);
  const nOp = v3o(v3p(T, 5.5, 6.0)) * (1 - v3p(T, 7.2, 7.7));
  const badge = v3o(v3p(T, 5.1, 5.45)) * (1 - v3p(T, 7.2, 7.7));
  return (
    <LBFrame t={gt} w={w} h={h} gy={0.55} gs={56}>
      <div style={{ position:'absolute', left:(w - pw)/2, top:92 }}>
        <PhoneMock w={pw}><V3UpsellScreen T={T} w={pw - 2*14*pw/420} /></PhoneMock>
        <div style={{ position:'absolute', right:-22, bottom:96, width:64, height:64, borderRadius:'50%', background:V3.goldGrad, display:'flex', alignItems:'center', justifyContent:'center',
          opacity:badge, transform:`scale(${v3l(0.5, 1, badge)})`, boxShadow:'0 0 34px rgba(232,180,92,0.6)' }}><V3Icon n="tick" s={34} c={V3.goldInk} sw={3} /></div>
      </div>
      <div style={{ position:'absolute', right:(w - 420)/2 - 40, top:30, width:420, opacity:nOp, transform:`translateY(${(nOp - 1)*16}px)`, display:'flex', alignItems:'center', gap:16, padding:'18px 22px', borderRadius:22,
        background:t.dark ? 'rgba(28,25,39,0.97)' : '#fff', border:`1.5px solid rgba(232,180,92,0.6)`, boxShadow:`${t.panelShadow}, 0 0 40px rgba(232,180,92,0.2)` }}>
        <div style={{ width:52, height:52, borderRadius:'50%', background:V3.goldGrad, display:'flex', alignItems:'center', justifyContent:'center', flex:'none' }}><V3Icon n="upsell" s={28} c={V3.goldInk} sw={2} /></div>
        <div>
          <div style={{ fontFamily:LB.mont, fontWeight:900, fontSize:24, color:t.text, whiteSpace:'nowrap' }}>+2 550 ₽ · 11 «Б»</div>
          <div style={{ fontFamily:LB.golos, fontWeight:500, fontSize:16, color:t.sub, marginTop:4 }}>Допродажа · только что</div>
        </div>
      </div>
      <Spark s={30} color={t.dark ? V3.gold : V3.goldL} style={{ position:'absolute', left:40, top:220, opacity:0.75 }} />
      <Spark s={20} color={t.dark ? V3.gold : V3.goldL} style={{ position:'absolute', right:44, top:640, opacity:0.55 }} />
    </LBFrame>);
}

Object.assign(window, { V3_TOOLS, V3ToolWin, V3LumirWin, V3Progress, V3Tools, V3UpsellScreen, V3Upsell });
