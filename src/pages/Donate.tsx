"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Heart,
  Globe,
  Repeat2,
  Copy,
  Check,
  ChevronRight,
  Sparkles,
  Building2,
  Smartphone,
} from "lucide-react";

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const PRESET_AMOUNTS = [500, 1000, 2500, 5000, 10000, 25000];

const IMPACT_MAP: Record<number, string> = {
  500: "Provides school supplies for one child for a term",
  1000: "Funds a week of clean water access for a rural family",
  2500: "Plants 10 trees in a deforested community",
  5000: "Sponsors a girl's education for one month",
  10000: "Equips a community health worker with essentials",
  25000: "Funds a micro-enterprise for a rural entrepreneur",
};

const STATS = [
  { value: "12,400+", label: "Lives Impacted" },
  { value: "38", label: "Communities Served" },
  { value: "₦0", label: "Admin Overhead" },
  { value: "100%", label: "Transparency" },
];

const PAYMENT_LINKS = {
  flutterwave: "https://flutterwave.com/pay/YOUR_FW_LINK",
  paystack: "https://paystack.com/pay/YOUR_PS_LINK",
};

const BANK_DETAILS = {
  ngn: {
    bankName: "Guaranty Trust Bank (GTB)",
    accountName: "Rurban Africa Foundation",
    accountNumber: "0123456789",
    sortCode: "058152036",
    swiftCode: null,
  },
  usd: {
    bankName: "Zenith Bank Plc",
    accountName: "Rurban Africa Foundation",
    accountNumber: "1234567890",
    sortCode: null,
    swiftCode: "ZENITHBBANK",
  },
};

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const fade = (delay = 0, y = 20) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

const inView = (delay = 0, y = 20) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="flex items-center justify-between py-3 border-b border-zinc-100 dark:border-emerald-900/30 last:border-0 group">
      <div>
        <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 dark:text-emerald-600 mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-zinc-800 dark:text-emerald-100">{value}</p>
      </div>
      <button
        onClick={copy}
        className="ml-4 flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full border transition-all duration-200 border-zinc-200 dark:border-emerald-800/50 text-zinc-500 dark:text-emerald-400 hover:border-[#064e3b] hover:text-[#064e3b] dark:hover:border-emerald-400 dark:hover:text-emerald-300"
      >
        {copied ? <Check size={12} strokeWidth={3} /> : <Copy size={12} strokeWidth={2.5} />}
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function DonatePage() {
  const [donationType, setDonationType] = useState<"single" | "monthly">("single");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(5000);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentTab, setPaymentTab] = useState<"online" | "transfer">("online");
  const [onlineMethod, setOnlineMethod] = useState<"flutterwave" | "paystack">("flutterwave");
  const [transferCurrency, setTransferCurrency] = useState<"ngn" | "usd">("ngn");
  const [heroCount, setHeroCount] = useState(0);
  const countRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeAmount = customAmount ? parseInt(customAmount) || 0 : selectedAmount || 0;
  const impactText = IMPACT_MAP[selectedAmount || 0];

  useEffect(() => {
    let start = 0;
    const end = 12400;
    const step = (end / 2000) * 16;
    countRef.current = setInterval(() => {
      start += step;
      if (start >= end) { setHeroCount(end); clearInterval(countRef.current!); }
      else setHeroCount(Math.floor(start));
    }, 16);
    return () => { if (countRef.current) clearInterval(countRef.current); };
  }, []);

  const handleDonate = () => {
    const link = PAYMENT_LINKS[onlineMethod];
    window.open(`${link}?amount=${activeAmount}`, "_blank");
  };

  const bank = BANK_DETAILS[transferCurrency];

  return (
    <div className="min-h-screen bg-[#F9FBFA] dark:bg-[#041d14] transition-colors duration-700">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
      `}</style>

      {/* ══════════════════════════════════════════
          PAGE HERO
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden min-h-[95vh] flex items-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/pledge.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#010f08]/97 via-[#021a0e]/90 to-[#064e3b]/55" />
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
        />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-emerald-600/8 blur-[140px] pointer-events-none" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="herogrid" width="72" height="72" patternUnits="userSpaceOnUse"><path d="M 72 0 L 0 0 0 72" fill="none" stroke="#6ee7b7" strokeWidth="0.6"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#herogrid)" />
        </svg>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 py-24 w-full">
          <div className="grid lg:grid-cols-[1fr_460px] gap-12 lg:gap-16 items-center">

            {/* LEFT */}
            <div>
              <motion.div >
                <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-amber-400 bg-amber-400/10 border border-amber-400/20 px-4 py-1.5 rounded-full mb-8">
                  <Heart size={10} strokeWidth={3} className="fill-amber-400" />
                  Give Today
                </span>
              </motion.div>

              <motion.h1
                // {...fade(0.1, 30)}
                className="text-5xl md:text-6xl lg:text-[80px] font-black text-white leading-[1.0] tracking-tight mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Your gift
                <span className="block text-emerald-400 italic">changes</span>
                everything.
              </motion.h1>

              <motion.p  className="text-emerald-100/55 text-base leading-relaxed mb-10 max-w-[460px]">
                In a continent of breathtaking potential, poverty is not destiny — it is a condition we can together dismantle. Every naira, every dollar moves us closer to an Africa where no child's dream is limited by geography.
              </motion.p>

              <div className="grid grid-cols-2 gap-3 max-w-sm">
                {STATS.map((s, i) => (
                  <motion.div
                    key={i}
                    // {...fade(0.3 + i * 0.07, 14)}
                    className="p-4 rounded-2xl bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm"
                  >
                    <p className="text-2xl font-black text-white mb-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {s.value === "12,400+" ? `${heroCount.toLocaleString()}+` : s.value}
                    </p>
                    <p className="text-[11px] text-emerald-100/45 font-medium leading-snug">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* RIGHT: Hero quick-give card */}
            <motion.div
              initial={{ opacity: 0, y: 36, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#F9FBFA] dark:bg-[#0b2a1a] rounded-3xl p-8 shadow-2xl shadow-black/50 border border-white/10"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400 mb-1.5">Start Giving</p>
              <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                How much would you like to give?
              </h2>

              {/* Type toggle */}
              <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-emerald-950/50 rounded-2xl mb-5">
                {(["single", "monthly"] as const).map((t) => (
                  <button key={t} onClick={() => setDonationType(t)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                      donationType === t ? "bg-[#064e3b] text-white shadow-md" : "text-zinc-500 dark:text-emerald-400/60 hover:text-zinc-700 dark:hover:text-emerald-300"
                    }`}>
                    {t === "single" ? <Globe size={14} /> : <Repeat2 size={14} />}
                    {t === "single" ? "One-time" : "Monthly"}
                  </button>
                ))}
              </div>

              {/* Amount grid */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {PRESET_AMOUNTS.map((amt) => (
                  <button key={amt} onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                    className={`py-3 rounded-xl text-sm font-bold border transition-all duration-200 ${
                      selectedAmount === amt && !customAmount
                        ? "bg-[#064e3b] text-white border-[#064e3b] shadow-md shadow-emerald-900/20"
                        : "border-zinc-200 dark:border-emerald-900/40 text-zinc-600 dark:text-emerald-300 hover:border-emerald-400"
                    }`}>
                    ₦{amt.toLocaleString()}
                  </button>
                ))}
              </div>

              <div className="relative mb-2">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-emerald-600 font-bold text-sm">₦</span>
                <input type="number" placeholder="Custom amount"
                  value={customAmount} onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                  className="w-full pl-8 pr-4 py-3.5 rounded-xl border border-zinc-200 dark:border-emerald-900/40 bg-transparent text-zinc-800 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-emerald-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/40 transition"
                />
              </div>

              <AnimatePresence mode="wait">
                {impactText && !customAmount && (
                  <motion.div key={selectedAmount} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.28 }}
                    className="flex items-start gap-2 my-3 px-3 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30">
                    <Sparkles size={13} className="text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-300 leading-snug">{impactText}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <a href="#donate-form">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="mt-3 w-full flex items-center justify-between bg-amber-400 hover:bg-amber-300 text-black py-4 px-6 rounded-2xl font-black text-sm shadow-lg shadow-amber-900/10 group transition-colors">
                  <span>Proceed · {activeAmount > 0 ? `₦${activeAmount.toLocaleString()}` : "choose amount"}</span>
                  <span className="bg-black/10 rounded-full p-1.5 group-hover:rotate-45 transition-transform duration-300">
                    <ArrowUpRight size={15} strokeWidth={3} />
                  </span>
                </motion.button>
              </a>
            </motion.div>

          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F9FBFA] dark:from-[#041d14] to-transparent pointer-events-none" />
      </section>


      {/* ══════════════════════════════════════════
          TRUST STRIP
      ══════════════════════════════════════════ */}
      <div className="py-6 border-y border-zinc-200/60 dark:border-emerald-900/30 bg-emerald-900/[0.03]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-14 flex flex-wrap gap-x-8 gap-y-3 items-center justify-center">
          {["🌱 100% funds direct programmes", "🔒 SSL-encrypted payments", "🧾 Tax receipts on request", "🌍 Donate from anywhere"].map((item, i) => (
            <motion.span key={i}  className="text-sm font-semibold text-zinc-500 dark:text-emerald-200/60">
              {item}
            </motion.span>
          ))}
        </div>
      </div>


      {/* ══════════════════════════════════════════
          MAIN DONATE SECTION
      ══════════════════════════════════════════ */}
      <section id="donate-form" className="py-24 scroll-mt-16" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="grid lg:grid-cols-[1fr_500px] gap-16 xl:gap-24 items-start">

            {/* LEFT: Why give */}
            <div>
              <motion.span  className="inline-block text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800/50 px-4 py-1.5 rounded-full mb-6">
                Why Give?
              </motion.span>

              <motion.h2 
                className="text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white leading-[1.06] tracking-tight mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Every gift is a<span className="block italic text-emerald-700 dark:text-emerald-400"> seed of change.</span>
              </motion.h2>

              <motion.p  className="text-zinc-600 dark:text-emerald-100/60 leading-relaxed text-base mb-4 max-w-lg">
                Rurban Africa bridges the gap between rural and urban communities — building schools, training leaders, installing clean water systems, and creating economic opportunity where none existed.
              </motion.p>
              <motion.p  className="text-zinc-400 dark:text-emerald-100/35 leading-relaxed text-sm max-w-lg mb-10">
                Unlike many organisations, we maintain zero percent administrative overhead. Every kobo you give is deployed directly to the communities you're lifting.
              </motion.p>

              {/* Programme cards */}
              <div className="space-y-3 mb-12">
                {[
                  { icon: "🏫", title: "Education", desc: "Scholarships, school supplies & rural learning hubs" },
                  { icon: "💧", title: "Clean Water", desc: "Borehole installations and water purification systems" },
                  { icon: "🌾", title: "Food Security", desc: "Smallholder farming support & agricultural cooperatives" },
                  { icon: "💡", title: "Tech & Innovation", desc: "Digital literacy centres for underserved communities" },
                ].map((item, i) => (
                  <motion.div key={i}  className="flex items-start gap-4 p-5 rounded-2xl border border-zinc-100 dark:border-emerald-900/30 bg-white dark:bg-white/[0.02] hover:border-emerald-200 dark:hover:border-emerald-800/60 hover:shadow-sm transition-all duration-300 group">
                    <span className="text-2xl mt-0.5">{item.icon}</span>
                    <div>
                      <p className="font-black text-zinc-800 dark:text-white text-sm mb-0.5 group-hover:text-[#064e3b] dark:group-hover:text-emerald-400 transition-colors">{item.title}</p>
                      <p className="text-zinc-500 dark:text-emerald-100/40 text-[13px] leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quote */}
              <motion.blockquote  className="border-l-4 border-[#064e3b] dark:border-emerald-500 pl-6 py-1">
                <p className="text-zinc-700 dark:text-emerald-100/65 text-base italic leading-relaxed mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  "Because of Rurban Africa, my daughter can dream of becoming a doctor. Three years ago, she had no school to attend."
                </p>
                <cite className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-500 not-italic">
                  — Amina B., Sokoto State
                </cite>
              </motion.blockquote>
            </div>


            {/* RIGHT: Payment panel */}
            <motion.div  className="lg:sticky lg:top-28">
              <div className="bg-white dark:bg-[#0a2318] rounded-3xl shadow-2xl shadow-zinc-200/90 dark:shadow-black/50 border border-zinc-100 dark:border-emerald-900/30 overflow-hidden">

                {/* Panel header */}
                <div className="relative overflow-hidden bg-[#064e3b] px-8 py-7">
                  <div className="absolute inset-0 opacity-[0.07]"
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
                  />
                  <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-emerald-400/10 blur-2xl" />
                  <p className="text-emerald-300/60 text-[10px] font-bold uppercase tracking-[0.25em] mb-1 relative z-10">Complete Your Gift</p>
                  <h3 className="text-white text-xl font-black relative z-10" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Choose a payment method
                  </h3>
                </div>

                <div className="p-7">

                  {/* Amount recap */}
                  <div className="flex items-center justify-between mb-5 pb-5 border-b border-zinc-100 dark:border-emerald-900/30">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 dark:text-emerald-600 mb-1">Donation Amount</p>
                      <p className="text-3xl font-black text-zinc-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {activeAmount > 0 ? `₦${activeAmount.toLocaleString()}` : "₦—"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 dark:text-emerald-600 mb-1">Frequency</p>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${donationType === "monthly" ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300" : "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400"}`}>
                        {donationType === "monthly" ? <Repeat2 size={11} /> : <Globe size={11} />}
                        {donationType === "monthly" ? "Monthly" : "One-time"}
                      </span>
                    </div>
                  </div>

                  {/* Quick amount re-select */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {PRESET_AMOUNTS.map((amt) => (
                      <button key={amt} onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                        className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${selectedAmount === amt && !customAmount ? "bg-[#064e3b] text-white border-[#064e3b]" : "border-zinc-200 dark:border-emerald-900/40 text-zinc-500 dark:text-emerald-400 hover:border-emerald-400"}`}>
                        ₦{amt >= 1000 ? `${amt / 1000}k` : amt}
                      </button>
                    ))}
                  </div>

                  <div className="relative mb-5">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-emerald-600 font-bold text-sm">₦</span>
                    <input type="number" placeholder="Or type a custom amount"
                      value={customAmount} onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                      className="w-full pl-8 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-emerald-900/40 bg-zinc-50 dark:bg-emerald-950/30 text-zinc-800 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-emerald-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/40 transition"
                    />
                  </div>

                  {/* PAYMENT TABS */}
                  <div className="flex gap-1 p-1 bg-zinc-100 dark:bg-emerald-950/50 rounded-2xl mb-6">
                    {([
                      { id: "online", label: "Pay Online", icon: <Smartphone size={14} /> },
                      { id: "transfer", label: "Bank Transfer", icon: <Building2 size={14} /> },
                    ] as const).map((tab) => (
                      <button key={tab.id} onClick={() => setPaymentTab(tab.id as "online" | "transfer")}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${paymentTab === tab.id ? "bg-[#064e3b] text-white shadow-md" : "text-zinc-500 dark:text-emerald-400/60 hover:text-zinc-800 dark:hover:text-emerald-300"}`}>
                        {tab.icon}{tab.label}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">

                    {/* ── ONLINE ── */}
                    {paymentTab === "online" && (
                      <motion.div key="online" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 dark:text-emerald-600 mb-3">Select processor</p>
                        <div className="grid grid-cols-2 gap-3 mb-5">
                          {([
                            { id: "flutterwave", name: "Flutterwave", sub: "Cards, Bank, USSD", color: "bg-orange-500", abbr: "FW" },
                            { id: "paystack", name: "Paystack", sub: "Cards, Transfer, USSD", color: "bg-[#00C3F7]", abbr: "PS" },
                          ] as const).map((m) => (
                            <button key={m.id} onClick={() => setOnlineMethod(m.id)}
                              className={`relative p-4 rounded-2xl border-2 text-left transition-all duration-200 ${onlineMethod === m.id ? "border-[#064e3b] bg-emerald-50 dark:bg-emerald-900/20" : "border-zinc-200 dark:border-emerald-900/30 hover:border-zinc-300"}`}>
                              {onlineMethod === m.id && (
                                <span className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-[#064e3b] flex items-center justify-center">
                                  <Check size={9} className="text-white" strokeWidth={3} />
                                </span>
                              )}
                              <div className={`w-8 h-8 rounded-lg ${m.color} flex items-center justify-center mb-2.5`}>
                                <span className="text-white font-black text-xs">{m.abbr}</span>
                              </div>
                              <p className="text-xs font-black text-zinc-800 dark:text-white">{m.name}</p>
                              <p className="text-[10px] text-zinc-400 dark:text-emerald-600 mt-0.5">{m.sub}</p>
                            </button>
                          ))}
                        </div>

                        <div className="flex items-start gap-2.5 mb-5 px-3.5 py-3 rounded-xl bg-zinc-50 dark:bg-emerald-950/30 border border-zinc-200 dark:border-emerald-900/30">
                          <span className="text-sm mt-0.5">🔒</span>
                          <p className="text-[11px] text-zinc-500 dark:text-emerald-300/55 leading-snug">
                            You'll be securely redirected to {onlineMethod === "flutterwave" ? "Flutterwave" : "Paystack"} to complete your payment. Rurban Africa never stores your card details.
                          </p>
                        </div>

                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                          onClick={handleDonate} disabled={activeAmount <= 0}
                          className="w-full flex items-center justify-between bg-[#064e3b] hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed text-white py-4 px-6 rounded-2xl font-black text-sm shadow-lg shadow-emerald-900/20 group transition-colors">
                          <span>Donate {activeAmount > 0 && `₦${activeAmount.toLocaleString()}`} via {onlineMethod === "flutterwave" ? "Flutterwave" : "Paystack"}</span>
                          <span className="bg-amber-400 text-black rounded-full p-1.5 group-hover:rotate-45 transition-transform duration-300">
                            <ArrowUpRight size={14} strokeWidth={3} />
                          </span>
                        </motion.button>
                      </motion.div>
                    )}

                    {/* ── TRANSFER ── */}
                    {paymentTab === "transfer" && (
                      <motion.div key="transfer" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>

                        {/* Currency toggle */}
                        <div className="flex gap-2 mb-5">
                          {(["ngn", "usd"] as const).map((c) => (
                            <button key={c} onClick={() => setTransferCurrency(c)}
                              className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all ${transferCurrency === c ? "bg-[#064e3b] text-white border-[#064e3b]" : "border-zinc-200 dark:border-emerald-900/30 text-zinc-500 dark:text-emerald-400 hover:border-emerald-400"}`}>
                              {c === "ngn" ? "🇳🇬 Nigerian Naira (NGN)" : "🇺🇸 US Dollars (USD)"}
                            </button>
                          ))}
                        </div>

                        {/* Bank details */}
                        <AnimatePresence mode="wait">
                          <motion.div key={transferCurrency} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.28 }}
                            className="bg-zinc-50 dark:bg-emerald-950/30 rounded-2xl border border-zinc-200 dark:border-emerald-900/30 px-5 py-1 mb-5">
                            <CopyField label="Bank Name" value={bank.bankName} />
                            <CopyField label="Account Name" value={bank.accountName} />
                            <CopyField label="Account Number" value={bank.accountNumber} />
                            {bank.sortCode && <CopyField label="Sort Code" value={bank.sortCode} />}
                            {bank.swiftCode && <CopyField label="SWIFT / BIC Code" value={bank.swiftCode} />}
                          </motion.div>
                        </AnimatePresence>

                        {/* Steps */}
                        <div className="space-y-3 mb-6">
                          {[
                            "Transfer your desired amount to the account above.",
                            "Use your full name as the transfer narration/reference.",
                            "Email proof of payment to donations@rurbanafrica.org for your receipt.",
                          ].map((step, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <span className="w-5 h-5 rounded-full bg-[#064e3b] text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                              <p className="text-[12px] text-zinc-500 dark:text-emerald-300/55 leading-relaxed">{step}</p>
                            </div>
                          ))}
                        </div>

                        <a href="mailto:donations@rurbanafrica.org?subject=Donation%20Confirmation"
                          className="w-full flex items-center justify-between bg-zinc-800 dark:bg-emerald-900/40 hover:bg-zinc-700 dark:hover:bg-emerald-900/60 text-white py-4 px-6 rounded-2xl font-black text-sm group transition-colors">
                          <span>Confirm transfer via email</span>
                          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </div>

              {/* Trust micro-badges */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
                {["SSL Encrypted", "No hidden fees", "Tax-deductible"].map((b) => (
                  <span key={b} className="inline-flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 dark:text-emerald-700">
                    <Check size={10} strokeWidth={3} className="text-emerald-500" />{b}
                  </span>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          BOTTOM CTA BAND
      ══════════════════════════════════════════ */}
      <section className="py-20 bg-[#064e3b] relative overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-emerald-400/5 blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-14 text-center">
          <motion.p  className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.28em] mb-4">Together We Rise</motion.p>
          <motion.h2 
            className="text-4xl md:text-5xl font-black text-white leading-tight mb-5"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            The Africa we dream of
            <span className="block italic text-amber-400"> starts with you.</span>
          </motion.h2>
          <motion.p className="text-emerald-100/50 text-base leading-relaxed max-w-lg mx-auto mb-10">
            Whether it's ₦500 or ₦500,000 — your gift is proof that human beings still care for one another. Thank you for being part of this.
          </motion.p>
          <motion.a  href="#donate-form"
            className="inline-flex items-center gap-3 bg-amber-400 hover:bg-amber-300 text-black px-8 py-4 rounded-full font-black text-sm group transition-colors shadow-xl shadow-black/20">
            Give Now
            <span className="bg-black/10 rounded-full p-1.5 group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight size={16} strokeWidth={3} />
            </span>
          </motion.a>
        </div>
      </section>

    </div>
  );
}