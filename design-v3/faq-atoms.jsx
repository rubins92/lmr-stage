// Lumir — FAQ series shared atoms (brand palette, matches week1.jsx tokens)
// Sizes: carousel 1080×1350, square cover 1080×1080, story 1080×1920

const FQW = 1080, FQH = 1350, FQSQ = 1080, FQSW = 1080, FQSH = 1920;

const FW = {
  violet: "#7B6CF6",
  violetDeep: "#534AB7",
  ink: "#1A1A2E",
  cream: "#F8F7F4",
  dark: "#0F0F14",
  green: "#34D399",
  white: "#FFFFFF",
  inkSoft: "rgba(26,26,46,0.62)",
  line: "rgba(26,26,46,0.10)",
};

function fbase(w, h, bg) {
  return { position: "relative", width: w, height: h, overflow: "hidden", background: bg, fontFamily: "Inter, sans-serif" };
}

function FDiagGrid({ color, opacity = 1, gap = 46 }) {
  return (
    <div style={{
      position: "absolute", inset: 0, opacity, pointerEvents: "none",
      backgroundImage: `repeating-linear-gradient(45deg, ${color} 0 1px, transparent 1px ${gap}px), repeating-linear-gradient(-45deg, ${color} 0 1px, transparent 1px ${gap}px)`
    }} />);
}

function FGlow({ x, y, size, color }) {
  return <div style={{ position: "absolute", left: x, top: y, width: size, height: size, borderRadius: "50%", background: `radial-gradient(circle, ${color} 0%, transparent 68%)`, filter: "blur(46px)", pointerEvents: "none" }} />;
}

function FLogo({ color = FW.violet, size = 1 }) {
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1, color }}>
      <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 34 * size, letterSpacing: "-0.04em" }}>LUMIR</div>
      <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 10.5 * size, letterSpacing: "0.5em", marginTop: 5 * size, textIndent: "0.5em" }}>PHOTO</div>
    </div>);
}

function FStar({ size = 30, color = FW.violet, style }) {
  return (
    <svg width={size} height={size * 0.82} viewBox="0 0 33 27" fill={color} style={style}>
      <path d="M 16.5 0 L 17.667 12.545 L 33 13.5 L 17.667 14.455 L 16.5 27 L 15.333 14.455 L 0 13.5 L 15.333 12.545 L 16.5 0 Z" />
    </svg>);
}

// FAQ index pill: "FAQ 01/03"
function FIdxPill({ i, n = 3, dark }) {
  return (
    <div style={{ position: "absolute", top: 56, right: 56, fontFamily: "Inter", fontWeight: 700, fontSize: 24, letterSpacing: "0.06em", color: dark ? "rgba(255,255,255,0.6)" : FW.inkSoft }}>
      FAQ {String(i).padStart(2, "0")}<span style={{ opacity: 0.5 }}>/{String(n).padStart(2, "0")}</span>
    </div>);
}

function PulseDot({ size = 16, color = FW.green, style }) {
  return <span style={{ display: "inline-block", width: size, height: size, borderRadius: "50%", background: color, animation: "lumirPulse 2s ease-in-out infinite", ...style }} />;
}

// ---------- Icons ----------
function Ico({ children, s = 48, color = FW.violet, sw = 2.4, fill = "none", style }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={style}>
      {children}
    </svg>);
}
const IcoLock = (p) => <Ico {...p}><rect x="4" y="10.5" width="16" height="10" rx="2.5" /><path d="M7.5 10.5V7.5a4.5 4.5 0 0 1 9 0v3" /><circle cx="12" cy="15" r="1.3" fill={p.color || FW.violet} stroke="none" /></Ico>;
const IcoShield = (p) => <Ico {...p}><path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3z" /><path d="M9 12l2 2 4-4" /></Ico>;
const IcoUpload = (p) => <Ico {...p}><path d="M4 16v3a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 20 19v-3" /><path d="M12 15V4" /><path d="M7.5 8.5L12 4l4.5 4.5" /></Ico>;
const IcoGear = (p) => <Ico {...p}><circle cx="12" cy="12" r="3.3" /><circle cx="12" cy="12" r="6" /><path d="M18 12h2 M6 12H4 M12 18v2 M12 6V4 M16.24 16.24l1.42 1.42 M7.76 7.76L6.34 6.34 M16.24 7.76l1.42-1.42 M7.76 16.24l-1.42 1.42" /></Ico>;
const IcoEyeOff = (p) => <Ico {...p}><path d="M4 12s3-6 8-6c1.4 0 2.7.5 3.8 1.2M20 12s-3 6-8 6c-1.4 0-2.7-.5-3.8-1.2" /><circle cx="12" cy="12" r="2.4" /><path d="M3 3l18 18" /></Ico>;
const IcoCloud = (p) => <Ico {...p}><path d="M7 17h10a3.5 3.5 0 0 0 0-7 5 5 0 0 0-9.6-1.6A4 4 0 0 0 7 17z" /></Ico>;
const IcoChat = (p) => <Ico {...p}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v7A2.5 2.5 0 0 1 17.5 15H10l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 12.5v-7z" /></Ico>;
const IcoStamp = (p) => <Ico {...p}><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M8 8l8 8M16 8l-8 8" /></Ico>;
const IcoCoin = (p) => <Ico {...p}><circle cx="12" cy="12" r="8" /><path d="M12 7.5v9M9.5 9.7c0-1.2 1.1-2.2 2.5-2.2s2.5.9 2.5 2c0 1.2-1.1 1.6-2.5 2s-2.5.8-2.5 2c0 1.1 1.1 2 2.5 2s2.5-1 2.5-2.2" /></Ico>;

// ---------- 3D-ish hero objects (rendered flat with glass/gradient + shadow, "photoreal" stand-ins) ----------

// Coin stack + price tag — for FAQ 01 (money)
function CoinStack({ w = 300 }) {
  const coins = [0, 1, 2, 3, 4];
  return (
    <div style={{ position: "relative", width: w, height: w * 0.95 }}>
      {coins.map((i) => (
        <div key={i} style={{
          position: "absolute", left: w * 0.18, bottom: i * (w * 0.052), width: w * 0.64, height: w * 0.16,
          borderRadius: "50%", background: `linear-gradient(180deg, #9c8ffb, ${FW.violet} 55%, ${FW.violetDeep})`,
          border: "2px solid rgba(255,255,255,0.35)", boxShadow: "0 8px 18px rgba(83,74,183,0.35)",
        }} />
      ))}
      <div style={{ position: "absolute", left: w * 0.18, bottom: coins.length * (w * 0.052) - w * 0.03, width: w * 0.64, height: w * 0.22, borderRadius: "50%",
        background: `radial-gradient(circle at 35% 30%, #c3b9ff, ${FW.violet} 60%)`, border: "3px solid rgba(255,255,255,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 14px 30px rgba(83,74,183,0.4)" }}>
        <span style={{ fontFamily: "Inter", fontWeight: 800, fontSize: w * 0.14, color: "#fff" }}>₽</span>
      </div>
      {/* price tag */}
      <div style={{ position: "absolute", right: -w * 0.08, top: w * 0.02, transform: "rotate(14deg)", padding: `${w * 0.045}px ${w * 0.09}px`, borderRadius: 10,
        background: FW.ink, color: "#fff", fontFamily: "Inter", fontWeight: 700, fontSize: w * 0.1, boxShadow: "0 14px 30px rgba(0,0,0,0.3)" }}>
        980 ₽
        <div style={{ position: "absolute", left: -7, top: "50%", width: 14, height: 14, borderRadius: "50%", background: FW.cream, transform: "translateY(-50%)" }} />
      </div>
    </div>);
}

// Lock + shield combo — for FAQ 02 (safety)
function LockShield({ w = 300 }) {
  return (
    <div style={{ position: "relative", width: w, height: w }}>
      <div style={{ position: "absolute", left: 0, top: w * 0.1, width: w * 0.74, height: w * 0.74, borderRadius: w * 0.16,
        background: `linear-gradient(160deg, ${FW.violet}, ${FW.violetDeep})`, boxShadow: "0 30px 60px rgba(83,74,183,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <IcoLock s={w * 0.34} color="#fff" sw={2} />
      </div>
      <div style={{ position: "absolute", right: -w * 0.06, top: -w * 0.02, width: w * 0.4, height: w * 0.4, borderRadius: w * 0.09,
        background: "#fff", boxShadow: "0 20px 40px rgba(26,26,46,0.25)", border: `1px solid ${FW.line}`,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <IcoShield s={w * 0.2} color={FW.violet} sw={2.2} />
      </div>
    </div>);
}

// Laptop with Lumir editor interface — for FAQ 03 (how it works)
function LaptopMock({ w = 460 }) {
  const rowW = ["70%", "45%", "60%"];
  return (
    <div style={{ position: "relative", width: w }}>
      <div style={{ width: w, borderRadius: 16, overflow: "hidden", background: "#15151f", boxShadow: "0 40px 80px rgba(26,26,46,0.3)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ height: 34, background: "#1e1e2a", display: "flex", alignItems: "center", gap: 6, padding: "0 14px" }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#28c840" }} />
        </div>
        <div style={{ padding: 20, display: "flex", gap: 14, background: "radial-gradient(circle at 60% 30%, #23233166, #15151f)" }}>
          <div style={{ width: "38%", display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ aspectRatio: "3/4", borderRadius: 6, background: i === 2 ? FW.violet : "rgba(255,255,255,0.12)", border: i === 2 ? "2px solid #fff" : "1px solid rgba(255,255,255,0.1)" }} />
            ))}
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, justifyContent: "center" }}>
            {rowW.map((r, i) => <div key={i} style={{ height: 10, width: r, borderRadius: 5, background: "rgba(255,255,255,0.16)" }} />)}
          </div>
        </div>
      </div>
      {/* floating gear */}
      <div style={{ position: "absolute", right: -w * 0.06, bottom: -w * 0.1, width: w * 0.22, height: w * 0.22, borderRadius: "50%",
        background: `linear-gradient(160deg, ${FW.violet}, ${FW.violetDeep})`, boxShadow: "0 20px 40px rgba(83,74,183,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <IcoGear s={w * 0.12} color="#fff" sw={2} />
      </div>
    </div>);
}

// Two-column Q&A card row
function QARow({ q, a, dark }) {
  return (
    <div style={{ padding: "28px 32px", borderRadius: 24, background: dark ? "rgba(255,255,255,0.05)" : "#fff", border: `1.5px solid ${dark ? "rgba(255,255,255,0.09)" : FW.line}` }}>
      <div style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 26, color: dark ? "rgba(255,255,255,0.6)" : FW.inkSoft }}>{q}</div>
      <div style={{ fontFamily: "PT Sans Caption", fontWeight: 700, fontSize: 34, color: dark ? "#fff" : FW.ink, marginTop: 8 }}>{a}</div>
    </div>);
}

function Pill({ children, color = FW.violet, style, outline }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", padding: "12px 22px", borderRadius: 999,
      background: outline ? "transparent" : color, border: outline ? `1.5px solid ${color}` : "none",
      color: outline ? color : "#fff", fontFamily: "Inter", fontWeight: 600, fontSize: 20, ...style }}>{children}</div>);
}

// Da/Net poll segmented control
function FPoll({ left = "Да", right = "Нет", dark, highlight = "left" }) {
  return (
    <div style={{ display: "flex", borderRadius: 22, overflow: "hidden", boxShadow: "0 18px 50px rgba(83,74,183,0.22)", border: `1.5px solid ${dark ? "rgba(255,255,255,0.14)" : FW.line}` }}>
      {[left, right].map((t, i) => {
        const isHi = (i === 0 && highlight === "left") || (i === 1 && highlight === "right");
        return (
          <div key={i} style={{ flex: 1, padding: "34px 0", textAlign: "center", fontFamily: "Inter", fontWeight: 700, fontSize: 52, letterSpacing: "-0.02em",
            background: isHi ? FW.violet : (dark ? "rgba(255,255,255,0.05)" : "#fff"),
            color: isHi ? "#fff" : (dark ? "#fff" : FW.ink), borderRight: i === 0 ? `1.5px solid ${dark ? "rgba(255,255,255,0.14)" : FW.line}` : "none" }}>{t}</div>);
      })}
    </div>);
}

// Export-on-hover wrapper (PNG download button, top-right of frame)
function ExportFrame({ children, filename = "lumir-slide", width, height }) {
  const ref = React.useRef(null);
  const [busy, setBusy] = React.useState(false);
  const onDownload = async (e) => {
    e.stopPropagation();
    if (!ref.current || busy || !window.htmlToImage) return;
    setBusy(true);
    try {
      const dataUrl = await window.htmlToImage.toPng(ref.current, { width, height, pixelRatio: 2, cacheBust: true });
      const a = document.createElement("a");
      a.href = dataUrl; a.download = `${filename}.png`;
      document.body.appendChild(a); a.click(); a.remove();
    } catch (err) { console.error("Export failed", err); }
    finally { setBusy(false); }
  };
  return (
    <div style={{ position: "relative", width, height }}
      onMouseEnter={(e) => { const b = e.currentTarget.querySelector("[data-export-btn]"); if (b) b.style.opacity = 1; }}
      onMouseLeave={(e) => { const b = e.currentTarget.querySelector("[data-export-btn]"); if (b) b.style.opacity = 0; }}>
      <div ref={ref} style={{ width, height }}>{children}</div>
      <button data-export-btn onClick={onDownload} onPointerDown={(e) => e.stopPropagation()} title="Скачать PNG"
        style={{ position: "absolute", top: 18, right: 18, zIndex: 5, opacity: 0, transition: "opacity .15s",
          display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 999,
          background: "rgba(15,15,20,0.75)", border: "1px solid rgba(255,255,255,0.22)", backdropFilter: "blur(6px)",
          color: "#fff", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 14, cursor: busy ? "wait" : "pointer",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v12" /><path d="M7 10l5 5 5-5" /><path d="M4 20h16" />
        </svg>
        {busy ? "..." : "PNG"}
      </button>
    </div>);
}

Object.assign(window, {
  FQW, FQH, FQSQ, FQSW, FQSH, FW, fbase, FDiagGrid, FGlow, FLogo, FStar, FIdxPill, PulseDot,
  IcoLock, IcoShield, IcoUpload, IcoGear, IcoEyeOff, IcoCloud, IcoChat, IcoStamp, IcoCoin,
  CoinStack, LockShield, LaptopMock, QARow, Pill, FPoll, ExportFrame,
});
