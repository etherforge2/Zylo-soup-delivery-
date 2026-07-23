import React, { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";
import {
  Menu, X, Sun, Moon, Phone, Mail, MapPin, ChevronUp, ChevronDown,
  Leaf, ShieldCheck, Flame, Bike, Wallet, PartyPopper, Snowflake,
  Star, Send, ArrowRight, Quote, Clock, MessageCircle
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  THEME TOKENS                                                       */
/* ------------------------------------------------------------------ */
const WHATSAPP_NUMBER = "2349130193202";
const PHONE_DISPLAY = "0913 019 3202";
const PHONE_TEL = "tel:+2349130193202";
const EMAIL = "Zylo.tech.ai@gmail.com";

function waLink(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/* Wikimedia Commons freely-licensed (CC BY-SA) dish photos, credited in the footer. */
function wc(file, width = 700) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;
}

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */
const SOUPS = [
  { id: "egusi", name: "Egusi Soup", initial: "E", price: 6500, from: "#E3A857", to: "#8C5A1E",
    img: wc("Pot of Egusi soup.jpg"),
    desc: "Rich melon-seed stew simmered with smoked fish, assorted meat and leafy greens." },
  { id: "ogbono", name: "Ogbono Soup", initial: "O", price: 6000, from: "#7A5230", to: "#3C2414",
    img: wc("Ogbono soup.jpg"),
    desc: "Silky draw soup thickened with wild mango seed, slow-simmered to a velvet finish." },
  { id: "seafood-okra", name: "Seafood Okra", initial: "S", price: 8500, from: "#4E8F72", to: "#1F4A3B",
    img: "https://picsum.photos/id/1080/800/600",
    desc: "A vibrant, stretchy okra stew loaded with prawns, crab and the day's fresh catch." },
  { id: "afang", name: "Afang Soup", initial: "A", price: 9000, from: "#5C8A3E", to: "#233F16",
    img: wc("Afang soup and pounded yam 01.jpg"),
    desc: "Layers of afang and waterleaf simmered with beef and periwinkle in palm oil." },
  { id: "fisherman", name: "Fisherman Soup", initial: "F", price: 9500, from: "#3E7A8C", to: "#123642",
    img: wc("Nigerian Fisherman Soup.jpg"),
    desc: "A hearty, peppery broth packed with fresh fish, prawns and a medley of seafood." },
  { id: "edikang-ikong", name: "Edikang Ikong", initial: "E", price: 8000, from: "#3E6B33", to: "#16290F",
    img: wc("Afang soup and pounded yam 03.jpg"),
    desc: "Nutrient-rich vegetable medley slow-cooked with assorted meat and dried fish." },
  { id: "oha", name: "Oha Soup", initial: "O", price: 7000, from: "#6E7A3E", to: "#2E3418",
    img: wc("Oha Soup.jpg"),
    desc: "Traditional Igbo delicacy — oha leaves and cocoyam thickening with smoked fish." },
  { id: "ofe-nsala", name: "Ofe Nsala", initial: "N", price: 7500, from: "#E8D3A0", to: "#B08A4A",
    img: wc("Afia Efere.jpg"),
    desc: "Native white soup — a light, peppery catfish broth with no palm oil, pure and soothing." },
  { id: "bitterleaf", name: "Bitterleaf Soup", initial: "B", price: 6800, from: "#4A5A2E", to: "#141A0C",
    img: wc("Ofe Onugbu (Bitter Leaf Soup).jpg"),
    desc: "Ofe Onugbu — bold bitterleaf simmered with assorted meat, deep and savoury." },
];

const SWALLOWS = [
  { id: "eba", name: "Eba", initial: "E", price: 800, from: "#D8B978", to: "#8C6B2E",
    img: wc("Eba with Ewedu soup & Stew with Croaker Fish and Shaki.jpg", 500) },
  { id: "fufu", name: "Fufu", initial: "F", price: 900, from: "#EDE6D6", to: "#9C8E6E",
    img: wc("Freshly cooked fufu (swallow).jpg", 500) },
  { id: "amala", name: "Amala", initial: "A", price: 1000, from: "#5B4638", to: "#241812",
    img: wc("Yam flour swallow and soup (Nigerian cuisine)( Amala).jpg", 500) },
  { id: "semo", name: "Semo", initial: "S", price: 800, from: "#F1E6C6", to: "#B7A264",
    img: wc("Semovita and egusi soup.jpg", 500) },
  { id: "pounded-yam", name: "Pounded Yam", initial: "P", price: 1200, from: "#F5EFDE", to: "#C9B98A",
    img: wc("Pounded Yam and Egusi Soup.jpg", 500) },
  { id: "wheat", name: "Wheat", initial: "W", price: 1000, from: "#C69A5E", to: "#6E4A22",
    img: wc("A woman moulding fufu (swallow).jpg", 500) },
  { id: "oat", name: "Oat Swallow", initial: "O", price: 1100, from: "#E4D9BE", to: "#A6926A",
    img: wc("Cooked Fufu (swallow) scouped out from the pot.jpg", 500) },
];

const FEATURED_IDS = ["egusi", "afang", "fisherman"];

const GALLERY = [
  { name: "Egusi Soup", img: wc("Pot of Egusi soup.jpg", 600), tall: true },
  { name: "Ogbono Soup", img: wc("Ogbono soup.jpg", 600) },
  { name: "Seafood Okra", img: wc("Pounded yam with Okra meat and fish soup.jpg", 600), tall: true },
  { name: "Afang Soup", img: wc("Afang soup and pounded yam 04.jpg", 600) },
  { name: "Fisherman Soup", img: wc("Nigerian Fisherman Soup.jpg", 600) },
  { name: "Edikang Ikong", img: wc("Afang soup and pounded yam 05.jpg", 600), tall: true },
  { name: "Oha Soup", img: wc("Oha Soup.jpg", 600) },
  { name: "Ofe Nsala", img: wc("Afia Efere.jpg", 600) },
  { name: "Bitterleaf Soup", img: wc("Ofe Onugbu (Bitter Leaf Soup).jpg", 600), tall: true },
  { name: "Eba", img: wc("Eba with Ewedu soup & Stew with Croaker Fish and Shaki.jpg", 600) },
  { name: "Fufu", img: wc("Freshly cooked fufu (swallow).jpg", 600), tall: true },
  { name: "Amala", img: wc("Yam flour swallow and soup (Nigerian cuisine)( Amala).jpg", 600) },
  { name: "Semo", img: wc("Semovita and egusi soup.jpg", 600) },
  { name: "Pounded Yam", img: wc("Pounded Yam and Egusi Soup.jpg", 600), tall: true },
];

const WHY_CHOOSE = [
  { icon: Leaf, title: "Fresh Daily Ingredients", desc: "Sourced each morning — nothing sits, nothing is rushed." },
  { icon: ShieldCheck, title: "Hygienically Prepared", desc: "Cooked in a clean, controlled kitchen from start to finish." },
  { icon: Flame, title: "Authentic Nigerian Taste", desc: "Traditional recipes, no shortcuts, no substitutes." },
  { icon: Bike, title: "Fast Delivery", desc: "Hot, careful packaging that arrives exactly as it left the pot." },
  { icon: Wallet, title: "Affordable Prices", desc: "Restaurant-quality soups at a fair, honest price." },
  { icon: PartyPopper, title: "Perfect for Events", desc: "Bulk orders for parties, owambe and gatherings, made easy." },
  { icon: Snowflake, title: "Ideal for Freezing & Storage", desc: "Freezes beautifully — reheats like it was just made." },
];

const TESTIMONIALS = [
  { name: "Ada O.", loc: "Lekki, Lagos", text: "The egusi tastes like my grandmother's — I keep three portions in my freezer at all times now." },
  { name: "Tunde A.", loc: "Ikeja, Lagos", text: "Ordered the fisherman soup for a small gathering. Everyone asked where I 'cooked' it. Didn't tell them the truth." },
  { name: "Ngozi E.", loc: "Abuja", text: "Ofe Nsala arrived hot and perfectly seasoned. Genuinely the most authentic native soup I've had delivered." },
  { name: "Kelechi I.", loc: "Port Harcourt", text: "Bulk-ordered for my sister's owambe. Zylo's handled everything with zero stress and rave reviews from guests." },
  { name: "Bisi F.", loc: "Yaba, Lagos", text: "I froze the afang soup for two weeks and it tasted exactly as fresh as day one. Incredible quality control." },
  { name: "Emeka N.", loc: "Enugu", text: "Fast delivery, generous portions, and the bitterleaf soup has the perfect bitter-savoury balance. My weekly order now." },
];

const FAQS = [
  { q: "Which areas do you deliver to?", a: "We currently deliver across Lagos with select delivery to Abuja and Port Harcourt for bulk orders. Message us your location and we'll confirm availability instantly." },
  { q: "How long can I store the soup in the freezer?", a: "Our soups freeze exceptionally well and stay fresh for up to 4–6 weeks when properly sealed. Simply thaw and reheat gently on the stove." },
  { q: "Can I customize the spice level?", a: "Absolutely. Let us know your preferred spice level when ordering — mild, regular or extra hot — and we'll prepare it just for you." },
  { q: "What payment methods do you accept?", a: "We accept bank transfer and major payment apps. Payment details are shared once your order is confirmed on WhatsApp." },
  { q: "How far ahead should I place my order?", a: "Same-day orders are welcome before 12pm. For events or bulk quantities, we recommend 48 hours' notice to guarantee availability." },
  { q: "Do you cater for parties and events?", a: "Yes — large pot sizes and multi-soup packages are our specialty for birthdays, owambe and office events. Reach out for a custom quote." },
];

/* ------------------------------------------------------------------ */
/*  THEME CONTEXT                                                      */
/* ------------------------------------------------------------------ */
const ThemeCtx = createContext({ dark: true });

/* ------------------------------------------------------------------ */
/*  REVEAL-ON-SCROLL HOOK                                              */
/* ------------------------------------------------------------------ */
function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setShown(true)),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, shown];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, shown] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}ms`,
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(28px)",
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SIMMER DIVIDER — signature steam-line section divider              */
/* ------------------------------------------------------------------ */
function SimmerDivider({ flip = false }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${flip ? "rotate-180" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="w-full h-8 md:h-10">
        <path
          d="M0 20 C 100 4, 200 36, 300 20 S 500 4, 600 20 S 800 36, 900 20 S 1100 4, 1200 20"
          fill="none" stroke="var(--accent-2)" strokeWidth="1.5" strokeOpacity="0.5"
        />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MEDALLION — signature dish badge (pot-lid seal + monogram)         */
/* ------------------------------------------------------------------ */
function Medallion({ initial, from, to, size = "md" }) {
  const dims = { sm: "w-16 h-16 text-xl", md: "w-24 h-24 text-3xl", lg: "w-32 h-32 text-4xl" }[size];
  return (
    <div className="relative flex items-center justify-center shrink-0 group/med">
      <svg className="absolute -top-5 left-1/2 -translate-x-1/2 w-8 h-8 opacity-60 group-hover/med:opacity-100 group-hover/med:-translate-y-1 transition-all duration-500" viewBox="0 0 40 40" aria-hidden="true">
        <path d="M10 38 C 6 30, 16 26, 12 18 C 9 12, 15 8, 13 2" fill="none" stroke="var(--accent-2)" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
        <path d="M22 38 C 18 31, 27 25, 22 17 C 19 11, 24 7, 22 1" fill="none" stroke="var(--accent-2)" strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
      </svg>
      <div
        className={`relative ${dims} rounded-full flex items-center justify-center font-display font-semibold text-[var(--cream-fixed)] shadow-[0_8px_24px_-6px_rgba(0,0,0,0.55)] ring-1 ring-white/15`}
        style={{ background: `radial-gradient(circle at 32% 28%, ${from}, ${to} 78%)` }}
      >
        <span className="drop-shadow-sm">{initial}</span>
        <span className="absolute inset-0 rounded-full ring-2 ring-[var(--accent-2)]/40" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  NAVBAR                                                             */
/* ------------------------------------------------------------------ */
function Navbar({ dark, setDark, onNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = [
    ["Home", "hero"], ["About", "about"], ["Menu", "menu"],
    ["Gallery", "gallery"], ["Reviews", "reviews"], ["FAQ", "faq"], ["Contact", "contact"],
  ];
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}
      style={{
        background: scrolled ? "color-mix(in srgb, var(--bg) 78%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <nav className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
        <button onClick={() => onNav("hero")} className="flex items-center gap-2.5 group">
          <span className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm text-[var(--cream-fixed)]"
            style={{ background: "radial-gradient(circle at 32% 28%, var(--accent-2), var(--accent) 80%)" }}>Z</span>
          <span className="font-display text-lg tracking-tight text-[var(--text)]">Zylo's <span style={{ color: "var(--accent)" }}>Native Pot</span></span>
        </button>

        <div className="hidden lg:flex items-center gap-8">
          {links.map(([label, id]) => (
            <button key={id} onClick={() => onNav(id)}
              className="text-[13px] font-medium tracking-wide uppercase text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle dark mode"
            onClick={() => setDark((d) => !d)}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)] transition-colors"
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            onClick={() => onNav("menu")}
            className="hidden md:inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[13px] font-semibold uppercase tracking-wide text-[var(--cream-fixed)] transition-transform hover:scale-105"
            style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-2))" }}
          >
            Order Today <ArrowRight size={14} />
          </button>
          <button className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-[var(--text)]" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden mt-3 mx-5 rounded-2xl border border-[var(--border)] p-4 flex flex-col gap-1"
          style={{ background: "var(--surface)" }}>
          {links.map(([label, id]) => (
            <button key={id} onClick={() => { onNav(id); setOpen(false); }}
              className="text-left px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors">
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */
function Hero({ onNav }) {
  const wrapRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = useCallback((e) => {
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x, y });
  }, []);

  return (
    <section
      id="hero"
      ref={wrapRef}
      onMouseMove={onMove}
      className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden"
    >
      {/* ambient gradient backdrop */}
      <div className="absolute inset-0 -z-10" style={{
        background: "radial-gradient(ellipse 80% 60% at 80% 0%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 60%), radial-gradient(ellipse 60% 50% at 10% 100%, color-mix(in srgb, var(--leaf) 16%, transparent), transparent 60%)"
      }} />
      <div className="absolute inset-0 -z-10 opacity-[0.04]" style={{
        backgroundImage: "radial-gradient(circle, var(--text) 1px, transparent 1px)", backgroundSize: "22px 22px"
      }} />

      {/* floating garnish elements w/ parallax */}
      <div className="hidden md:block absolute top-32 left-[6%] text-4xl select-none pointer-events-none transition-transform duration-300"
        style={{ transform: `translate(${tilt.x * -24}px, ${tilt.y * -24}px)` }}>🌶️</div>
      <div className="hidden md:block absolute bottom-24 left-[14%] text-3xl select-none pointer-events-none transition-transform duration-300"
        style={{ transform: `translate(${tilt.x * 18}px, ${tilt.y * 18}px)` }}>🥬</div>
      <div className="hidden md:block absolute top-[22%] right-[8%] text-3xl select-none pointer-events-none transition-transform duration-300"
        style={{ transform: `translate(${tilt.x * -16}px, ${tilt.y * -16}px)` }}>🌿</div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <p className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] px-3.5 py-1.5 rounded-full mb-6"
            style={{ color: "var(--accent-2)", background: "color-mix(in srgb, var(--accent-2) 14%, transparent)" }}>
            <Flame size={13} /> Handmade Daily, Fresh From the Pot
          </p>
          <h1 className="font-display font-semibold leading-[1.02] text-[13vw] sm:text-6xl lg:text-6xl xl:text-7xl text-[var(--text)]">
            Native soups,<br />
            <span style={{ color: "var(--accent)" }}>simmered</span> with care.
          </h1>
          <p className="mt-6 font-display italic text-xl md:text-2xl" style={{ color: "var(--accent-2)" }}>
            "Native Soups Made With Care"
          </p>
          <p className="mt-5 text-[15px] md:text-base leading-relaxed max-w-xl text-[var(--text-muted)]">
            We prepare fresh, tasty, hygienic Nigerian native soups made with premium ingredients.
            Every meal is carefully cooked and perfectly paired with your preferred swallow — ideal
            for immediate enjoyment, and just as good frozen for later.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href={waLink("Hello Zylo's Native Pot, I'd like to place an order.")} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold uppercase tracking-wide text-[var(--cream-fixed)] shadow-[0_14px_30px_-10px_rgba(196,67,43,0.55)] hover:scale-105 transition-transform"
              style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-2))" }}>
              Order Today <ArrowRight size={16} />
            </a>
            <button onClick={() => onNav("menu")}
              className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold uppercase tracking-wide border transition-colors hover:border-[var(--accent)]"
              style={{ borderColor: "var(--border)", color: "var(--text)" }}>
              View Menu
            </button>
          </div>
          <div className="mt-10 flex items-center gap-6 text-[var(--text-muted)] text-sm">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="var(--accent-2)" stroke="none" />)}
              <span className="ml-1 font-medium text-[var(--text)]">4.9/5</span>
            </div>
            <span className="w-px h-4 bg-[var(--border)]" />
            <span>800+ pots delivered</span>
          </div>
        </Reveal>

        {/* illustrated steaming bowl */}
        <Reveal delay={150} className="relative">
          <div className="relative mx-auto w-full max-w-md aspect-square transition-transform duration-300"
            style={{ transform: `translate(${tilt.x * -10}px, ${tilt.y * -10}px)` }}>
            <div className="absolute inset-6 rounded-full blur-3xl opacity-40" style={{ background: "var(--accent)" }} />
            <svg viewBox="0 0 400 400" className="relative w-full h-full drop-shadow-2xl">
              {/* steam */}
              <g opacity="0.85">
                <path className="steam-a" d="M150 150 C 130 120, 165 100, 148 70 C 138 50, 158 30, 150 10" fill="none" stroke="var(--accent-2)" strokeWidth="4" strokeLinecap="round" />
                <path className="steam-b" d="M200 150 C 180 118, 218 96, 200 62 C 190 42, 212 22, 202 2" fill="none" stroke="var(--cream-fixed)" strokeWidth="4" strokeLinecap="round" opacity="0.55" />
                <path className="steam-c" d="M250 150 C 232 122, 268 102, 250 72 C 240 52, 262 32, 252 12" fill="none" stroke="var(--accent-2)" strokeWidth="4" strokeLinecap="round" />
              </g>
              {/* bowl */}
              <ellipse cx="200" cy="245" rx="150" ry="26" fill="#000" opacity="0.18" />
              <path d="M55 220 C 55 300, 120 340, 200 340 C 280 340, 345 300, 345 220 Z" fill="url(#bowlGrad)" />
              <ellipse cx="200" cy="220" rx="145" ry="34" fill="url(#soupGrad)" />
              <ellipse cx="200" cy="220" rx="145" ry="34" fill="none" stroke="#3a2210" strokeOpacity="0.25" strokeWidth="2" />
              {/* garnish dots */}
              <circle cx="150" cy="212" r="7" fill="#4E8F3E" />
              <circle cx="235" cy="206" r="6" fill="#C4432B" />
              <circle cx="190" cy="230" r="5.5" fill="#E3A857" />
              <circle cx="255" cy="228" r="6.5" fill="#4E8F3E" />
              <circle cx="165" cy="235" r="5" fill="#8C2E1E" />
              <defs>
                <linearGradient id="bowlGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#3A2412" />
                  <stop offset="1" stopColor="#20140A" />
                </linearGradient>
                <radialGradient id="soupGrad" cx="35%" cy="30%" r="80%">
                  <stop offset="0" stopColor="#E3A857" />
                  <stop offset="1" stopColor="#A85A22" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  ABOUT                                                              */
/* ------------------------------------------------------------------ */
function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-5 gap-14 items-center">
        <Reveal className="lg:col-span-2 relative">
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden ring-1 ring-[var(--border)] flex items-center justify-center"
            style={{ background: "linear-gradient(150deg, var(--surface), var(--surface-2))" }}>
            <Medallion initial="Z" from="#E3A857" to="#8C2E1E" size="lg" />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl p-4 backdrop-blur-md"
              style={{ background: "color-mix(in srgb, var(--bg) 55%, transparent)", border: "1px solid var(--border)" }}>
              <p className="text-xs uppercase tracking-widest text-[var(--accent-2)] font-semibold">Since day one</p>
              <p className="text-sm text-[var(--text)] mt-1">Cooked in small batches, every single day.</p>
            </div>
          </div>
        </Reveal>
        <div className="lg:col-span-3">
          <Reveal>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: "var(--accent)" }}>About Us</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-[var(--text)] leading-tight">
              A pot full of tradition, made for your table.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-6 text-[var(--text-muted)] leading-relaxed">
              Zylo's Native Pot was born out of a simple craving: real Nigerian soup that tastes like
              home, without the hours spent in the kitchen. We source premium ingredients each morning,
              cook in small hygienic batches, and season the way our grandmothers taught us — patiently,
              and with care.
            </p>
            <p className="mt-4 text-[var(--text-muted)] leading-relaxed">
              Whether you want a quick weeknight bowl or a freezer stocked for the month, every pot we
              seal carries the same promise: fresh ingredients, authentic taste, and a texture that holds
              up beautifully from our kitchen to yours.
            </p>
          </Reveal>
          <Reveal delay={200} className="mt-8 grid grid-cols-3 gap-6">
            {[["9+", "Native soups"], ["800+", "Pots delivered"], ["4.9★", "Average rating"]].map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-3xl font-semibold text-[var(--text)]">{n}</p>
                <p className="text-xs uppercase tracking-wide text-[var(--text-muted)] mt-1">{l}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  WHY CHOOSE US                                                      */
/* ------------------------------------------------------------------ */
function WhyChooseUs() {
  return (
    <section className="py-24 md:py-32" style={{ background: "var(--bg-alt)" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal className="max-w-2xl mx-auto text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: "var(--accent)" }}>Why Choose Us</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-[var(--text)]">Every reason to trust the pot</h2>
        </Reveal>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY_CHOOSE.map((w, i) => (
            <Reveal key={w.title} delay={i * 70}>
              <div className="h-full rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "color-mix(in srgb, var(--accent) 14%, transparent)", color: "var(--accent)" }}>
                  <w.icon size={20} />
                </div>
                <h3 className="font-display text-lg font-semibold text-[var(--text)]">{w.title}</h3>
                <p className="text-sm text-[var(--text-muted)] mt-1.5 leading-relaxed">{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  DISH CARD                                                          */
/* ------------------------------------------------------------------ */
function DishCard({ dish, big = false }) {
  return (
    <div className="group relative rounded-[1.75rem] overflow-hidden border flex flex-col text-center transition-all duration-400 hover:-translate-y-2"
      style={{ background: "var(--surface)", borderColor: "var(--border)", boxShadow: "0 1px 0 rgba(255,255,255,0.03) inset" }}>
      <div className="absolute inset-0 rounded-[1.75rem] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none z-10"
        style={{ boxShadow: `0 24px 48px -20px ${dish.from}55` }} />

      <div className={`relative w-full ${big ? "aspect-[4/3]" : "aspect-[16/11]"} overflow-hidden`}>
        <img
          src={dish.img}
          alt={dish.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.35) 100%)" }} />
        <div className="absolute -bottom-7 left-6 scale-[0.62] origin-bottom-left">
          <Medallion initial={dish.initial} from={dish.from} to={dish.to} size="md" />
        </div>
      </div>

      <div className="px-7 pb-7 pt-9 flex flex-col items-center">
        <h3 className={`font-display font-semibold text-[var(--text)] ${big ? "text-2xl" : "text-lg"}`}>{dish.name}</h3>
        <p className="text-sm text-[var(--text-muted)] mt-2 leading-relaxed">{dish.desc}</p>
        <p className="mt-4 font-display text-xl font-semibold" style={{ color: "var(--accent)" }}>
          ₦{dish.price.toLocaleString()}
        </p>
        <a href={waLink(`Hello Zylo's Native Pot, I'd like to order the ${dish.name} (₦${dish.price.toLocaleString()}).`)}
          target="_blank" rel="noreferrer"
          className="mt-5 w-full inline-flex items-center justify-center gap-1.5 rounded-full py-3 text-[13px] font-semibold uppercase tracking-wide text-[var(--cream-fixed)] transition-transform hover:scale-[1.03]"
          style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-2))" }}>
          Order Now <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FEATURED DISHES                                                    */
/* ------------------------------------------------------------------ */
function FeaturedDishes() {
  const featured = SOUPS.filter((s) => FEATURED_IDS.includes(s.id));
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal className="max-w-2xl mx-auto text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: "var(--accent)" }}>Chef's Picks</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-[var(--text)]">Featured dishes</h2>
        </Reveal>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {featured.map((d, i) => (
            <Reveal key={d.id} delay={i * 100}><DishCard dish={d} big /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FULL MENU                                                          */
/* ------------------------------------------------------------------ */
function FullMenu() {
  const [tab, setTab] = useState("soups");
  return (
    <section id="menu" className="py-24 md:py-32" style={{ background: "var(--bg-alt)" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal className="max-w-2xl mx-auto text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: "var(--accent)" }}>Full Menu</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-[var(--text)]">Pick your soup, pick your swallow</h2>
          <p className="mt-4 text-[var(--text-muted)]">Every soup pairs beautifully with any swallow on our menu — mix and match freely.</p>
        </Reveal>

        <div className="mt-10 flex justify-center">
          <div className="inline-flex p-1.5 rounded-full border" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            {[["soups", "Native Soups"], ["swallows", "Swallows"]].map(([k, label]) => (
              <button key={k} onClick={() => setTab(k)}
                className="px-6 py-2.5 rounded-full text-sm font-semibold transition-colors"
                style={tab === k
                  ? { background: "linear-gradient(135deg, var(--accent), var(--accent-2))", color: "var(--cream-fixed)" }
                  : { color: "var(--text-muted)" }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {tab === "soups" ? (
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOUPS.map((d, i) => (
              <Reveal key={d.id} delay={(i % 3) * 80}><DishCard dish={d} /></Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {SWALLOWS.map((s, i) => (
              <Reveal key={s.id} delay={(i % 4) * 80}>
                <div className="rounded-2xl overflow-hidden border flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5"
                  style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                  <div className="relative w-full aspect-square overflow-hidden">
                    <img src={s.img} alt={s.name} loading="lazy" className="w-full h-full object-cover" />
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 scale-[0.55]">
                      <Medallion initial={s.initial} from={s.from} to={s.to} size="sm" />
                    </div>
                  </div>
                  <div className="px-5 pb-6 pt-7 flex flex-col items-center w-full">
                    <h3 className="font-display font-semibold text-[var(--text)]">{s.name}</h3>
                    <p className="mt-1.5 font-display text-lg font-semibold" style={{ color: "var(--accent)" }}>₦{s.price.toLocaleString()}</p>
                    <a href={waLink(`Hello Zylo's Native Pot, I'd like to add ${s.name} to my order.`)} target="_blank" rel="noreferrer"
                      className="mt-4 w-full inline-flex items-center justify-center rounded-full py-2.5 text-xs font-semibold uppercase tracking-wide border transition-colors hover:border-[var(--accent)]"
                      style={{ borderColor: "var(--border)", color: "var(--text)" }}>
                      Add to Order
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  GALLERY + LIGHTBOX                                                 */
/* ------------------------------------------------------------------ */
function Gallery() {
  const [active, setActive] = useState(null);
  return (
    <section id="gallery" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal className="max-w-2xl mx-auto text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: "var(--accent)" }}>Gallery</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-[var(--text)]">A taste of what's cooking</h2>
        </Reveal>

        <div className="mt-14 columns-2 sm:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
          {GALLERY.map((g, i) => (
            <Reveal key={g.name + i} delay={(i % 4) * 60} className="mb-4 break-inside-avoid">
              <button
                onClick={() => setActive(g)}
                className={`group relative w-full rounded-2xl overflow-hidden ring-1 ring-[var(--border)] block ${g.tall ? "aspect-[3/4]" : "aspect-square"}`}
              >
                <img src={g.img} alt={g.name} loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-300 flex items-end p-4 opacity-0 group-hover:opacity-100">
                  <p className="text-white font-display font-medium text-sm">{g.name}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {active && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6" style={{ background: "rgba(10,6,3,0.85)", backdropFilter: "blur(6px)" }}
          onClick={() => setActive(null)}>
          <div className="relative w-full max-w-md aspect-square rounded-[2rem] overflow-hidden ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()}>
            <img src={active.img} alt={active.name} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-white font-display text-2xl font-semibold">{active.name}</p>
            </div>
            <button onClick={() => setActive(null)} aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60">
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  TESTIMONIALS                                                       */
/* ------------------------------------------------------------------ */
function Testimonials() {
  return (
    <section id="reviews" className="py-24 md:py-32" style={{ background: "var(--bg-alt)" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal className="max-w-2xl mx-auto text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: "var(--accent)" }}>Testimonials</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-[var(--text)]">Loved, one pot at a time</h2>
        </Reveal>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 90}>
              <div className="h-full rounded-2xl p-7 border flex flex-col" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                <Quote size={22} style={{ color: "var(--accent-2)" }} />
                <p className="mt-4 text-[var(--text)] text-sm leading-relaxed flex-1">{t.text}</p>
                <div className="mt-5 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, s) => <Star key={s} size={13} fill="var(--accent-2)" stroke="none" />)}
                </div>
                <p className="mt-3 text-sm font-semibold text-[var(--text)]">{t.name} <span className="font-normal text-[var(--text-muted)]">— {t.loc}</span></p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */
function FaqItem({ q, a, open, onClick }) {
  return (
    <div className="border-b" style={{ borderColor: "var(--border)" }}>
      <button onClick={onClick} className="w-full py-5 flex items-center justify-between gap-4 text-left" aria-expanded={open}>
        <span className="font-display text-base md:text-lg font-medium text-[var(--text)]">{q}</span>
        <ChevronDown size={18} className="shrink-0 transition-transform duration-300" style={{ color: "var(--accent)", transform: open ? "rotate(180deg)" : "none" }} />
      </button>
      <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
        <div className="overflow-hidden">
          <p className="pb-5 text-sm text-[var(--text-muted)] leading-relaxed max-w-2xl">{a}</p>
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <Reveal className="text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: "var(--accent)" }}>FAQ</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-[var(--text)]">Good to know</h2>
        </Reveal>
        <Reveal delay={100} className="mt-12">
          {FAQS.map((f, i) => (
            <FaqItem key={f.q} q={f.q} a={f.a} open={openIdx === i} onClick={() => setOpenIdx(openIdx === i ? -1 : i)} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CONTACT                                                            */
/* ------------------------------------------------------------------ */
function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <section id="contact" className="py-24 md:py-32" style={{ background: "var(--bg-alt)" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal className="max-w-2xl mx-auto text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: "var(--accent)" }}>Contact</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-[var(--text)]">Let's fill your pot</h2>
          <p className="mt-4 text-[var(--text-muted)]">Reach out directly, or send a message and we'll get back within the hour.</p>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-5 gap-6">
          <Reveal className="lg:col-span-2 flex flex-col gap-5">
            <a href={waLink("Hello Zylo's Native Pot!")} target="_blank" rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl p-5 border transition-transform hover:-translate-y-1"
              style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
              <span className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "color-mix(in srgb, #25D366 18%, transparent)", color: "#25D366" }}><MessageCircle size={20} /></span>
              <div><p className="text-xs uppercase tracking-wide text-[var(--text-muted)]">WhatsApp</p><p className="font-semibold text-[var(--text)]">Chat with us</p></div>
            </a>
            <a href={PHONE_TEL} className="flex items-center gap-4 rounded-2xl p-5 border transition-transform hover:-translate-y-1"
              style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
              <span className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "color-mix(in srgb, var(--accent) 16%, transparent)", color: "var(--accent)" }}><Phone size={20} /></span>
              <div><p className="text-xs uppercase tracking-wide text-[var(--text-muted)]">Call</p><p className="font-semibold text-[var(--text)]">{PHONE_DISPLAY}</p></div>
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 rounded-2xl p-5 border transition-transform hover:-translate-y-1"
              style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
              <span className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "color-mix(in srgb, var(--accent-2) 20%, transparent)", color: "var(--accent-2)" }}><Mail size={20} /></span>
              <div><p className="text-xs uppercase tracking-wide text-[var(--text-muted)]">Email</p><p className="font-semibold text-[var(--text)] break-all">{EMAIL}</p></div>
            </a>
            <div className="flex items-center gap-4 rounded-2xl p-5 border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
              <span className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "color-mix(in srgb, var(--leaf) 18%, transparent)", color: "var(--leaf)" }}><Clock size={20} /></span>
              <div><p className="text-xs uppercase tracking-wide text-[var(--text-muted)]">Hours</p><p className="font-semibold text-[var(--text)]">Mon – Sat, 8am – 8pm</p></div>
            </div>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-3 rounded-[1.75rem] p-7 md:p-8 border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: "color-mix(in srgb, var(--leaf) 18%, transparent)", color: "var(--leaf)" }}>
                  <ShieldCheck size={26} />
                </div>
                <p className="font-display text-xl font-semibold text-[var(--text)]">Message sent</p>
                <p className="text-sm text-[var(--text-muted)] mt-1">We'll respond within the hour. Thank you!</p>
              </div>
            ) : (
              <form onSubmit={submit} className="grid sm:grid-cols-2 gap-5">
                <div className="sm:col-span-1">
                  <label htmlFor="name" className="text-xs uppercase tracking-wide text-[var(--text-muted)]">Name</label>
                  <input id="name" required placeholder="Your name" className="mt-2 w-full rounded-xl px-4 py-3 text-sm outline-none border focus:border-[var(--accent)] transition-colors"
                    style={{ background: "var(--surface-2)", borderColor: "var(--border)", color: "var(--text)" }} />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="phone" className="text-xs uppercase tracking-wide text-[var(--text-muted)]">Phone</label>
                  <input id="phone" required placeholder="080..." className="mt-2 w-full rounded-xl px-4 py-3 text-sm outline-none border focus:border-[var(--accent)] transition-colors"
                    style={{ background: "var(--surface-2)", borderColor: "var(--border)", color: "var(--text)" }} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="text-xs uppercase tracking-wide text-[var(--text-muted)]">Email</label>
                  <input id="email" type="email" required placeholder="you@email.com" className="mt-2 w-full rounded-xl px-4 py-3 text-sm outline-none border focus:border-[var(--accent)] transition-colors"
                    style={{ background: "var(--surface-2)", borderColor: "var(--border)", color: "var(--text)" }} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="msg" className="text-xs uppercase tracking-wide text-[var(--text-muted)]">Message</label>
                  <textarea id="msg" required rows={4} placeholder="Tell us what you'd like to order..." className="mt-2 w-full rounded-xl px-4 py-3 text-sm outline-none border focus:border-[var(--accent)] transition-colors resize-none"
                    style={{ background: "var(--surface-2)", borderColor: "var(--border)", color: "var(--text)" }} />
                </div>
                <button type="submit" className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold uppercase tracking-wide text-[var(--cream-fixed)] hover:scale-[1.02] transition-transform"
                  style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-2))" }}>
                  Send Message <Send size={15} />
                </button>
              </form>
            )}
          </Reveal>
        </div>

        <Reveal delay={150} className="mt-6">
          <div className="rounded-[1.75rem] border overflow-hidden relative h-56 flex items-center justify-center" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)", backgroundSize: "26px 26px" }} />
            <div className="relative flex flex-col items-center gap-2 text-[var(--text-muted)]">
              <MapPin size={26} style={{ color: "var(--accent)" }} />
              <p className="text-sm font-medium text-[var(--text)]">Lagos, Nigeria — delivery map available on request</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                             */
/* ------------------------------------------------------------------ */
function Footer({ onNav }) {
  return (
    <footer className="pt-16 pb-8 border-t" style={{ borderColor: "var(--border)", background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm text-[var(--cream-fixed)]"
                style={{ background: "radial-gradient(circle at 32% 28%, var(--accent-2), var(--accent) 80%)" }}>Z</span>
              <span className="font-display text-lg text-[var(--text)]">Zylo's Native Pot</span>
            </div>
            <p className="mt-4 text-sm text-[var(--text-muted)] max-w-sm leading-relaxed">
              Fresh, tasty, hygienic Nigerian native soups made with premium ingredients — cooked with care,
              delivered with pride.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide font-semibold text-[var(--text)]">Explore</p>
            <div className="mt-4 flex flex-col gap-2.5 text-sm text-[var(--text-muted)]">
              {[["About", "about"], ["Menu", "menu"], ["Gallery", "gallery"], ["Reviews", "reviews"], ["FAQ", "faq"]].map(([l, id]) => (
                <button key={id} onClick={() => onNav(id)} className="text-left hover:text-[var(--accent)] transition-colors w-fit">{l}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide font-semibold text-[var(--text)]">Contact</p>
            <div className="mt-4 flex flex-col gap-2.5 text-sm text-[var(--text-muted)]">
              <a href={PHONE_TEL} className="hover:text-[var(--accent)] transition-colors w-fit">{PHONE_DISPLAY}</a>
              <a href={`mailto:${EMAIL}`} className="hover:text-[var(--accent)] transition-colors w-fit break-all">{EMAIL}</a>
              <span>Lagos, Nigeria</span>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs text-[var(--text-muted)]">© {new Date().getFullYear()} Zylo's Native Pot. All rights reserved.</p>
          <p className="text-xs text-[var(--text-muted)]">Dish photos via Wikimedia Commons (CC BY-SA) · sample images, replace with your own.</p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  FLOATING BUTTONS                                                   */
/* ------------------------------------------------------------------ */
function FloatingButtons() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col gap-3 items-end">
      {show && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"
          className="w-11 h-11 rounded-full flex items-center justify-center border shadow-lg transition-transform hover:scale-110"
          style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}>
          <ChevronUp size={18} />
        </button>
      )}
      <a href={waLink("Hello Zylo's Native Pot, I'd like to place an order.")} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-[0_14px_28px_-8px_rgba(37,211,102,0.6)] transition-transform hover:scale-110"
        style={{ background: "#25D366" }}>
        <MessageCircle size={24} color="#fff" />
      </a>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  LOADING SCREEN                                                     */
/* ------------------------------------------------------------------ */
function LoadingScreen({ show }) {
  return (
    <div className={`fixed inset-0 z-[200] flex items-center justify-center transition-opacity duration-700 ${show ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      style={{ background: "var(--bg)" }}>
      <div className="flex flex-col items-center">
        <span className="w-16 h-16 rounded-full flex items-center justify-center font-display font-bold text-2xl text-[var(--cream-fixed)] animate-pulse"
          style={{ background: "radial-gradient(circle at 32% 28%, var(--accent-2), var(--accent) 80%)" }}>Z</span>
        <p className="mt-4 font-display text-sm tracking-[0.3em] uppercase text-[var(--text-muted)]">Zylo's Native Pot</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */
export default function App() {
  const [dark, setDark] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(t);
  }, []);

  const onNav = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const theme = {
    "--bg": dark ? "#171512" : "#FAF7F2",
    "--bg-alt": dark ? "#1E1B17" : "#F2ECE1",
    "--surface": dark ? "#242019" : "#FFFFFF",
    "--surface-2": dark ? "#2A251E" : "#FBF8F3",
    "--text": dark ? "#F2EDE4" : "#242019",
    "--text-muted": dark ? "#AFA697" : "#6D6459",
    "--border": dark ? "rgba(242,237,228,0.10)" : "rgba(36,32,25,0.10)",
    "--accent": "#B3502F",
    "--accent-2": "#C0954A",
    "--leaf": "#748267",
    "--cream-fixed": "#FAF7F2",
  };

  return (
    <ThemeCtx.Provider value={{ dark }}>
      <div style={theme} className="min-h-screen font-sans antialiased" >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
          .font-display { font-family: 'Fraunces', serif; }
          .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
          body { background: var(--bg); }
          ::selection { background: var(--accent); color: var(--cream-fixed); }
          @keyframes steamRise { 0%,100% { transform: translateY(0); opacity: .85; } 50% { transform: translateY(-6px); opacity: .4; } }
          .steam-a { animation: steamRise 3.2s ease-in-out infinite; }
          .steam-b { animation: steamRise 3.6s ease-in-out infinite .3s; }
          .steam-c { animation: steamRise 3s ease-in-out infinite .6s; }
          @media (prefers-reduced-motion: reduce) {
            .steam-a, .steam-b, .steam-c { animation: none !important; }
            * { transition-duration: 0.01ms !important; }
          }
          input::placeholder, textarea::placeholder { color: var(--text-muted); opacity: .7; }
          :focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
        `}</style>

        <div className="bg-[var(--bg)] text-[var(--text)]">
          <LoadingScreen show={loading} />
          <Navbar dark={dark} setDark={setDark} onNav={onNav} />
          <main>
            <Hero onNav={onNav} />
            <About />
            <SimmerDivider />
            <WhyChooseUs />
            <FeaturedDishes />
            <FullMenu />
            <Gallery />
            <SimmerDivider />
            <Testimonials />
            <FAQ />
            <Contact />
          </main>
          <Footer onNav={onNav} />
          <FloatingButtons />
        </div>
      </div>
    </ThemeCtx.Provider>
  );
}