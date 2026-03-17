"use client";
import { useState, useEffect, useRef } from "react";

// ─── DESIGN SYSTEM — UNDERGROUND KING ────────────────────────────────────────
// Aesthetic: "Raw Voltage" — premium grit, indie credibility, no compromise
// Palette: black / steel gray / crimson / muted gold / deep forest
const C = {
  base:     "#080808",
  surface:  "#0e0e0e",
  panel:    "#141414",
  border:   "rgba(255,255,255,0.06)",
  crimson:  "#9B1B1B",
  crimGlow: "rgba(155,27,27,0.2)",
  steel:    "#9BA4AF",
  steelDim: "rgba(155,164,175,0.4)",
  gold:     "#B8962A",
  goldDim:  "rgba(184,150,42,0.2)",
  cream:    "#F0EDE6",
  muted:    "rgba(240,237,230,0.45)",
  dim:      "rgba(240,237,230,0.25)",
};
const F = {
  display: "'Oswald', 'Bebas Neue', Impact, sans-serif",
  body:    "'DM Sans', 'Inter', system-ui, sans-serif",
  mono:    "'DM Mono', 'Courier New', monospace",
};

function useInView(t = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return [ref, v] as const;
}
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [ref, v] = useInView();
  return <div ref={ref} style={{ transform: v ? "translateY(0)" : "translateY(44px)", opacity: v ? 1 : 0, transition: `all 1.0s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>{children}</div>;
}
function Grain() {
  return <div style={{ position: "absolute", inset: 0, opacity: 0.05, pointerEvents: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />;
}

function Nav() {
  const [sc, setSc] = useState(false);
  useEffect(() => { const h = () => setSc(window.scrollY > 60); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, padding: sc ? "12px clamp(20px,4vw,60px)" : "24px clamp(20px,4vw,60px)", display: "flex", justifyContent: "space-between", alignItems: "center", background: sc ? "rgba(8,8,8,0.97)" : "transparent", backdropFilter: sc ? "blur(16px)" : "none", borderBottom: sc ? `1px solid ${C.border}` : "none", transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
      <div>
        <span style={{ fontFamily: F.display, fontSize: "clamp(16px,2vw,20px)", fontWeight: 600, letterSpacing: "0.2em", color: C.cream, display: "block", lineHeight: 1 }}>UNDERGROUND</span>
        <span style={{ fontFamily: F.display, fontSize: "clamp(16px,2vw,20px)", fontWeight: 600, letterSpacing: "0.2em", color: C.crimson, display: "block", lineHeight: 1 }}>KING</span>
      </div>
      <div style={{ display: "flex", gap: "clamp(16px,2vw,32px)", alignItems: "center" }}>
        {["Artists", "Scene", "Submit"].map(n => (
          <a key={n} href={`#${n.toLowerCase()}`} style={{ fontFamily: F.body, fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: C.muted, textDecoration: "none", transition: "color 0.3s" }} onMouseEnter={e => (e.target as HTMLAnchorElement).style.color = C.cream} onMouseLeave={e => (e.target as HTMLAnchorElement).style.color = C.muted}>{n}</a>
        ))}
        <a href="#tickets" style={{ fontFamily: F.body, fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.cream, background: C.crimson, border: "none", padding: "10px 24px", cursor: "pointer", textDecoration: "none", display: "inline-block", transition: "all 0.3s" }}>Get Tickets</a>
      </div>
    </nav>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);
  return (
    <section style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", background: C.base, display: "flex", alignItems: "center" }}>
      {/* Raw industrial texture */}
      <div style={{ position: "absolute", inset: 0 }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(255,255,255,0.015) 79px, rgba(255,255,255,0.015) 80px)", backgroundSize: "80px 80px" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(255,255,255,0.01) 79px, rgba(255,255,255,0.01) 80px)", backgroundSize: "80px 80px" }} />
        {/* Crimson spot from below */}
        <div style={{ position: "absolute", bottom: "-20%", left: "50%", transform: "translateX(-50%)", width: "120%", height: "80%", background: `radial-gradient(ellipse at 50% 100%, ${C.crimGlow} 0%, transparent 60%)` }} />
        {/* Stage light column */}
        <div style={{ position: "absolute", top: 0, left: "30%", width: "2px", height: "100%", background: `linear-gradient(to bottom, transparent, ${C.crimson}30, transparent)`, opacity: 0.6 }} />
        <div style={{ position: "absolute", top: 0, right: "25%", width: "1px", height: "100%", background: `linear-gradient(to bottom, transparent, ${C.gold}20, transparent)` }} />
        <Grain />
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(8,8,8,0.6) 0%, rgba(8,8,8,0.15) 40%, rgba(8,8,8,0.8) 100%)" }} />

      <div style={{ position: "relative", zIndex: 2, width: "100%", padding: "0 clamp(24px,5vw,80px)", maxWidth: "1600px", margin: "0 auto" }}>
        <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease 0.3s", fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.45em", textTransform: "uppercase", color: C.crimson, marginBottom: "28px" }}>
          Indie Concert Platform · Atlanta · Est. 2026
        </div>

        {/* Giant stacked headline */}
        <div style={{ marginBottom: "48px" }}>
          <div style={{ overflow: "hidden" }}>
            <h1 style={{ fontFamily: F.display, fontSize: "clamp(56px,12vw,180px)", fontWeight: 700, lineHeight: 0.82, letterSpacing: "0.04em", color: C.cream, margin: 0, opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(110%)", transition: "all 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s" }}>WHERE THE</h1>
          </div>
          <div style={{ overflow: "hidden" }}>
            <h1 style={{ fontFamily: F.display, fontSize: "clamp(56px,12vw,180px)", fontWeight: 700, lineHeight: 0.82, letterSpacing: "0.04em", color: C.crimson, margin: 0, opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(110%)", transition: "all 1.2s cubic-bezier(0.16,1,0.3,1) 0.5s" }}>NEXT WAVE</h1>
          </div>
          <div style={{ overflow: "hidden" }}>
            <h1 style={{ fontFamily: F.display, fontSize: "clamp(56px,12vw,180px)", fontWeight: 700, lineHeight: 0.82, letterSpacing: "0.04em", color: C.cream, margin: 0, opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(110%)", transition: "all 1.2s cubic-bezier(0.16,1,0.3,1) 0.7s" }}>TAKES THE STAGE</h1>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "32px" }}>
          <p style={{ fontFamily: F.body, fontSize: "clamp(14px,1.2vw,17px)", lineHeight: 1.8, color: C.muted, maxWidth: "420px", opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.1s" }}>
            A live indie concert platform for raw talent, real fans, and breakout moments. No gatekeepers. All presence.
          </p>
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.4s" }}>
            <a href="#tickets" style={{ fontFamily: F.body, fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: C.cream, background: C.crimson, padding: "15px 48px", textDecoration: "none", display: "inline-block" }}>Get Tickets</a>
            <a href="#submit" style={{ fontFamily: F.body, fontSize: "10px", fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase", color: C.cream, background: "transparent", border: `1px solid ${C.border}`, padding: "15px 36px", textDecoration: "none", display: "inline-block" }}>Artist Submission</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── BUILT FOR THE ONES COMING UP ─────────────────────────────────────────────
function BuiltFor() {
  return (
    <section style={{ background: C.surface, padding: "120px clamp(24px,5vw,80px)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", right: "5%", top: "5%", fontFamily: F.display, fontSize: "clamp(120px,18vw,280px)", lineHeight: 1, letterSpacing: "0.05em", color: "rgba(255,255,255,0.015)", pointerEvents: "none" }}>KING</div>
      <Grain />
      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "80px", alignItems: "center" }}>
          <Reveal>
            <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: C.crimson, marginBottom: "20px" }}>The Platform</div>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(36px,5vw,72px)", fontWeight: 600, letterSpacing: "0.04em", lineHeight: 0.9, color: C.cream, marginBottom: "28px" }}>
              BUILT FOR THE<br /><span style={{ color: C.crimson }}>ONES COMING UP</span>
            </h2>
            <p style={{ fontFamily: F.body, fontSize: "clamp(14px,1.2vw,17px)", lineHeight: 1.9, color: C.muted, marginBottom: "36px" }}>
              Underground King is a platform for artists building names without asking permission. No label co-sign required. No industry politics. Just a stage, a crowd, and a moment that belongs to you.
            </p>
            <div style={{ display: "flex", gap: "40px" }}>
              {[["Live", "Performances"], ["Real", "Fans"], ["ATL", "Platform"]].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: F.display, fontSize: "clamp(24px,3.5vw,48px)", fontWeight: 600, letterSpacing: "0.05em", color: C.crimson, lineHeight: 1 }}>{v}</div>
                  <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: C.steelDim, marginTop: "6px" }}>{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            {/* Poster-wall visual */}
            <div style={{ position: "relative", height: "500px", background: C.panel, overflow: "hidden" }}>
              <Grain />
              <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 100%, ${C.crimGlow} 0%, transparent 60%)` }} />
              {/* Stacked poster layers */}
              {[
                { bg: C.crimson, opacity: 0.15, rotate: "-8deg", top: "5%", left: "5%", w: "70%", h: "55%" },
                { bg: C.steel, opacity: 0.08, rotate: "4deg", top: "20%", right: "5%", w: "60%", h: "50%" },
                { bg: C.gold, opacity: 0.1, rotate: "-2deg", top: "35%", left: "10%", w: "75%", h: "55%" },
              ].map((p, i) => (
                <div key={i} style={{ position: "absolute", top: p.top, left: p.left, right: p.right, width: p.w, height: p.h, background: p.bg, opacity: p.opacity, transform: `rotate(${p.rotate})`, border: `1px solid rgba(255,255,255,0.08)` }} />
              ))}
              <div style={{ position: "absolute", bottom: "20px", left: "20px", fontFamily: F.display, fontSize: "18px", letterSpacing: "0.15em", color: C.cream, opacity: 0.6 }}>UNDERGROUND KING</div>
              <div style={{ position: "absolute", top: "20px", right: "20px", fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.3em", color: C.crimson, textTransform: "uppercase" }}>ATL · 2026</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── NO FILTER. ALL PRESENCE ──────────────────────────────────────────────────
function AllPresence() {
  const items = [
    { n: "Intimate But Intense", d: "Artist-to-crowd energy at close range." },
    { n: "Raw Hunger", d: "Artists who have something to prove." },
    { n: "Breakthrough Moments", d: "The set you remember 5 years later." },
    { n: "Loud Crowd Response", d: "Real fans who came to feel it." },
    { n: "Stripped-Down Authenticity", d: "No gimmicks. Just performance." },
    { n: "Underground Credibility", d: "The room that builds legacies." },
  ];
  return (
    <section id="scene" style={{ background: C.base, padding: "120px clamp(24px,5vw,80px)" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: C.crimson, marginBottom: "12px" }}>The Energy</div>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(36px,6vw,80px)", fontWeight: 600, letterSpacing: "0.04em", lineHeight: 0.9, color: C.cream, marginBottom: "64px" }}>NO FILTER.<br />ALL PRESENCE.</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: C.border }}>
          {items.map((item, i) => (
            <Reveal key={item.n} delay={i * 0.06}>
              <div style={{ background: C.surface, padding: "40px 32px", minHeight: "200px", display: "flex", flexDirection: "column", justifyContent: "flex-end", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: "2px", height: "100%", background: `linear-gradient(180deg, ${C.crimson}, transparent)` }} />
                <div style={{ fontFamily: F.mono, fontSize: "10px", color: C.crimson, opacity: 0.5, marginBottom: "12px" }}>0{i + 1}</div>
                <div style={{ fontFamily: F.display, fontSize: "clamp(16px,2vw,22px)", fontWeight: 600, letterSpacing: "0.04em", color: C.cream, marginBottom: "8px" }}>{item.n.toUpperCase()}</div>
                <p style={{ fontFamily: F.body, fontSize: "13px", lineHeight: 1.6, color: C.muted }}>{item.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ARTIST SPOTLIGHT ─────────────────────────────────────────────────────────
function ArtistSpotlight() {
  return (
    <section id="artists" style={{ background: C.surface, padding: "120px clamp(24px,5vw,80px)" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: C.crimson, marginBottom: "12px" }}>Artist Spotlight</div>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(36px,6vw,80px)", fontWeight: 600, letterSpacing: "0.04em", lineHeight: 0.9, color: C.cream, marginBottom: "64px" }}>WHO&apos;S NEXT</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2px" }}>
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} style={{ background: C.panel, height: "300px", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "20px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(8,8,8,0.9) 0%, transparent 50%)` }} />
              <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 30%, ${C.crimGlow}, transparent 60%)`, opacity: 0.4 }} />
              <div style={{ position: "absolute", top: "16px", right: "16px", fontFamily: F.mono, fontSize: "8px", color: C.crimson, letterSpacing: "0.3em", textTransform: "uppercase" }}>TBD</div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontFamily: F.display, fontSize: "18px", fontWeight: 600, letterSpacing: "0.08em", color: C.cream, marginBottom: "4px" }}>ARTIST NAME</div>
                <div style={{ fontFamily: F.mono, fontSize: "9px", color: C.steelDim, letterSpacing: "0.2em" }}>Genre · ATL</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ARTIST SUBMIT + TICKETS ──────────────────────────────────────────────────
// ─── TICKET DATA ─────────────────────────────────────────────────────────────
const HUGLIFE_TICKET_HUB = "https://huglife.vercel.app/#tickets";

function TakeYourPlace() {
  return (
    <section id="submit" style={{ background: C.base, padding: "120px clamp(24px,5vw,80px)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 60%, ${C.crimGlow} 0%, transparent 55%)` }} />
      <Grain />
      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: C.crimson, marginBottom: "16px" }}>
            Tickets & Submissions
          </div>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(40px,7vw,100px)", fontWeight: 700, letterSpacing: "0.04em", color: C.cream, marginBottom: "64px" }}>
            TAKE YOUR PLACE
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px", background: C.border, marginBottom: "3px" }}>
          {/* ── FAN TICKETS ── */}
          <Reveal>
            <div id="tickets" style={{ background: C.panel, padding: "64px 48px", position: "relative", overflow: "hidden", height: "100%" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: C.gold }} />

              {/* Live badge */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                <div style={{
                  width: "8px", height: "8px", borderRadius: "50%",
                  background: "#4ADE80", boxShadow: "0 0 8px #4ADE80",
                  animation: "ticketPulse 2s ease-in-out infinite",
                }} />
                <span style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.3em", color: "#4ADE80", textTransform: "uppercase" }}>
                  Tickets On Sale
                </span>
              </div>

              <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: C.gold, marginBottom: "20px" }}>
                For Fans
              </div>
              <h3 style={{ fontFamily: F.display, fontSize: "clamp(24px,3.5vw,44px)", fontWeight: 600, letterSpacing: "0.04em", color: C.cream, marginBottom: "16px" }}>
                GET YOUR TICKET
              </h3>
              <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.8, color: C.muted, marginBottom: "32px" }}>
                Join the room where the next wave breaks. General Admission is your all-access pass to every performance on the bill. Capacity is limited.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a href={HUGLIFE_TICKET_HUB} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: F.body, fontSize: "11px", fontWeight: 700,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: C.base, background: C.gold, padding: "16px 40px",
                  textDecoration: "none", display: "inline-block", transition: "all 0.3s",
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"}
                >
                  Buy Tickets →
                </a>
                <a href="mailto:thekollectiveworldwide@gmail.com?subject=Underground King Group Ticket Inquiry" style={{
                  fontFamily: F.body, fontSize: "11px", fontWeight: 500,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: C.cream, background: "transparent", border: `1px solid ${C.border}`,
                  padding: "16px 28px", textDecoration: "none", display: "inline-block",
                }}>
                  Group Tickets
                </a>
              </div>
            </div>
          </Reveal>

          {/* ── ARTIST SUBMISSION ── */}
          <Reveal delay={0.1}>
            <div style={{ background: C.surface, padding: "64px 48px", position: "relative", overflow: "hidden", height: "100%" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: C.crimson }} />
              <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: C.crimson, marginBottom: "20px" }}>
                For Artists
              </div>
              <h3 style={{ fontFamily: F.display, fontSize: "clamp(24px,3.5vw,44px)", fontWeight: 600, letterSpacing: "0.04em", color: C.cream, marginBottom: "16px" }}>
                SUBMIT YOUR SET
              </h3>
              <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.8, color: C.muted, marginBottom: "32px" }}>
                Emerging artists can apply for performance slots. We review your music, your presence, your hunger. No label co-sign required. No gatekeeping — just talent.
              </p>
              <a href="mailto:thekollectiveworldwide@gmail.com?subject=Underground King Artist Submission" style={{
                fontFamily: F.body, fontSize: "11px", fontWeight: 700,
                letterSpacing: "0.15em", textTransform: "uppercase",
                color: C.cream, background: C.crimson, padding: "16px 40px",
                textDecoration: "none", display: "inline-block", transition: "all 0.3s",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"}
              >
                Submit Now →
              </a>
            </div>
          </Reveal>
        </div>

        {/* ── ADDITIONAL PATHS ── */}
        <Reveal delay={0.2}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px", background: C.border }}>
            {[
              { icon: "🏢", title: "Corporate", sub: "Private buyouts & team events", href: "mailto:thekollectiveworldwide@gmail.com?subject=Corporate Inquiry - Underground King" },
              { icon: "🤝", title: "Sponsor", sub: "Brand activation at the show", href: "mailto:thekollectiveworldwide@gmail.com?subject=Sponsor Inquiry - Underground King" },
              { icon: "📸", title: "Press / Media", sub: "Coverage & credentials", href: "mailto:thekollectiveworldwide@gmail.com?subject=Press Inquiry - Underground King" },
            ].map(opt => (
              <a key={opt.title} href={opt.href} style={{ textDecoration: "none" }}>
                <div style={{ background: C.base, padding: "24px 20px", display: "flex", flexDirection: "column", gap: "6px", transition: "background 0.3s", cursor: "pointer" }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = `${C.crimson}12`}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = ""}
                >
                  <div style={{ fontSize: "18px" }}>{opt.icon}</div>
                  <div style={{ fontFamily: F.body, fontSize: "13px", fontWeight: 600, color: C.cream }}>{opt.title}</div>
                  <div style={{ fontFamily: F.body, fontSize: "11px", color: C.muted }}>{opt.sub}</div>
                  <div style={{ fontFamily: F.mono, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: C.crimson }}>Inquire →</div>
                </div>
              </a>
            ))}
          </div>
        </Reveal>

        {/* Trust signals */}
        <div style={{ marginTop: "32px", display: "flex", gap: "32px", justifyContent: "center", flexWrap: "wrap" }}>
          {["Powered by Eventbrite", "Secure Checkout", "Instant Confirmation", "18+ Event"].map(s => (
            <div key={s} style={{ fontFamily: F.mono, fontSize: "9px", color: "rgba(255,255,255,0.18)", letterSpacing: "0.2em" }}>{s}</div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticketPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQS = [
  { q: "Who can perform at Underground King?", a: "Emerging indie artists of any genre. Submit your demo and we'll review your application." },
  { q: "What is the performance format?", a: "Live sets, 20–30 minutes each. Equipment provided. Artist brings their own intros/backing tracks." },
  { q: "Age policy for attendees?", a: "18+ for general admission. Some shows may be 21+ — check the individual event listing." },
  { q: "Where is the venue?", a: "Atlanta, GA. Venue varies by show. Announced with each event." },
  { q: "What's the dress code?", a: "No strict code. Come authentic. Underground doesn't mean unkempt." },
  { q: "Is there a submission fee?", a: "No. Artist submissions are free. We take zero from your performance." },
];
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section style={{ background: C.surface, padding: "100px clamp(24px,5vw,80px)" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <Reveal><div style={{ fontFamily: F.display, fontSize: "clamp(36px,5vw,64px)", fontWeight: 600, letterSpacing: "0.04em", color: C.cream, marginBottom: "48px" }}>FAQ</div></Reveal>
        {FAQS.map((f, i) => (
          <div key={f.q} style={{ borderBottom: `1px solid ${C.border}` }}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", background: "none", border: "none", padding: "24px 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", gap: "16px" }}>
              <span style={{ fontFamily: F.display, fontSize: "clamp(14px,1.8vw,20px)", fontWeight: 500, letterSpacing: "0.04em", color: open === i ? C.cream : C.muted, textAlign: "left", transition: "color 0.3s", textTransform: "uppercase" }}>{f.q}</span>
              <span style={{ fontFamily: F.body, fontSize: "20px", color: C.crimson, flexShrink: 0, transform: open === i ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.3s" }}>+</span>
            </button>
            <div style={{ maxHeight: open === i ? "200px" : "0", overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
              <p style={{ fontFamily: F.body, fontSize: "14px", lineHeight: 1.8, color: C.steelDim, paddingBottom: "24px" }}>{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#050505", borderTop: `1px solid ${C.border}`, padding: "56px clamp(24px,5vw,80px) 36px" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "40px" }}>
        <div>
          <div style={{ fontFamily: F.display, fontSize: "24px", fontWeight: 700, letterSpacing: "0.15em", color: C.cream }}>UNDERGROUND</div>
          <div style={{ fontFamily: F.display, fontSize: "24px", fontWeight: 700, letterSpacing: "0.15em", color: C.crimson }}>KING</div>
          <p style={{ fontFamily: F.body, fontSize: "12px", color: C.muted, marginTop: "12px", maxWidth: "260px", lineHeight: 1.7 }}>A KHG HugLife Event. Where the next wave takes the stage.</p>
        </div>
        <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
          {[{ h: "Event", l: ["Artists", "Scene", "Gallery", "FAQ"] }, { h: "Connect", l: ["Get Tickets", "Artist Submit", "@thekollectiveworldwide", "Contact"] }].map(col => (
            <div key={col.h}>
              <div style={{ fontFamily: F.mono, fontSize: "8px", letterSpacing: "0.4em", textTransform: "uppercase", color: C.crimson, marginBottom: "16px" }}>{col.h}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                {col.l.map(item => <li key={item} style={{ fontFamily: F.body, fontSize: "12px", color: C.muted }}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: "1400px", margin: "32px auto 0", paddingTop: "24px", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ fontFamily: F.mono, fontSize: "10px", color: "rgba(255,255,255,0.2)" }}>© 2026 Underground King. A KHG Enterprise.</div>
        <div style={{ fontFamily: F.mono, fontSize: "10px", color: "rgba(255,255,255,0.2)" }}>Privacy · Terms</div>
      </div>
    </footer>
  );
}

export default function UndergroundKing() {
  return (
    <div style={{ background: C.base }}>
      <Nav /><Hero /><BuiltFor /><AllPresence /><ArtistSpotlight /><TakeYourPlace /><FAQ /><Footer />
    </div>
  );
}
