"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  ArrowUpRight, Heart, Globe, Repeat2, Copy, Check,
  ChevronRight, Sparkles, Building2, Smartphone,
  User, EyeOff, X, PartyPopper, Mail, Phone,
} from "lucide-react";

/* ══════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════ */
type DonationType = "single" | "monthly";
type PaymentTab   = "online" | "transfer";
type OnlineMethod = "flutterwave" | "paystack";
type Currency     = "ngn" | "usd" | "gbp";
type DonorMode    = "named" | "anonymous";

interface DonorForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

/* ══════════════════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════════════════ */
const CURRENCIES: Record<Currency, { symbol: string; flag: string; label: string; presets: number[] }> = {
  ngn: { symbol: "₦", flag: "🇳🇬", label: "NGN",  presets: [5000, 10000, 15000, 20000, 25000, 50000] },
  usd: { symbol: "$", flag: "🇺🇸", label: "USD",  presets: [5, 10, 25, 50, 100, 250] },
  gbp: { symbol: "£", flag: "🇬🇧", label: "GBP",  presets: [5, 10, 20, 50, 100, 200] },
};

const IMPACT_MAP: Record<Currency, Record<number, string>> = {
  ngn: {
    500:   "Provides school supplies for one child for a term",
    1000:  "Funds a week of clean water access for a rural family",
    2500:  "Plants 10 trees in a deforested community",
    5000:  "Sponsors a girl's education for one month",
    10000: "Equips a community health worker with essentials",
    25000: "Funds a micro-enterprise for a rural entrepreneur",
  },
  usd: {
    5:   "Buys exercise books for five rural children",
    10:  "Provides a week of meals for a child in need",
    25:  "Funds a health outreach visit to a remote village",
    50:  "Sponsors a student's school fees for one month",
    100: "Installs a water filter for a rural household",
    250: "Trains a community leader in sustainable agriculture",
  },
  gbp: {
    5:   "Buys reading materials for a classroom",
    10:  "Provides nutritional support for a child for a week",
    20:  "Sponsors a girl's scholarship for one month",
    50:  "Funds a tree-planting initiative in a village",
    100: "Equips a community health post with medicines",
    200: "Builds a micro-library for a rural primary school",
  },
};

const BANK_DETAILS: Record<Currency, { bankName: string; accountName: string; accountNumber: string; sortCode?: string; swiftCode?: string; iban?: string; routingNumber?: string }> = {
  ngn: {
    bankName:      "Guaranty Trust Bank (GTB)",
    accountName:   "Rurban Africa Foundation",
    accountNumber: "0123456789",
    sortCode:      "058152036",
  },
  usd: {
    bankName:      "Zenith Bank Plc",
    accountName:   "Rurban Africa Foundation",
    accountNumber: "1234567890",
    swiftCode:     "ZENITHBANK",
    routingNumber: "021000021",
  },
  gbp: {
    bankName:      "Access Bank UK Ltd",
    accountName:   "Rurban Africa Foundation",
    accountNumber: "12345678",
    sortCode:      "23-14-70",
    iban:          "GB29NWBK60161331926819",
    swiftCode:     "ABUKGB2L",
  },
};

const PAYMENT_LINKS: Record<OnlineMethod, string> = {
  flutterwave: "https://flutterwave.com/pay/YOUR_FW_LINK",
  paystack:    "https://paystack.com/pay/YOUR_PS_LINK",
};

const STATS = [
  { value: "12,400+", label: "Lives Impacted" },
  { value: "38",      label: "Communities Served" },
  { value: "0%",      label: "Admin Overhead" },
  { value: "100%",    label: "Transparency" },
];

/* ══════════════════════════════════════════════════════
   ANIMATION VARIANTS
══════════════════════════════════════════════════════ */
const heroTextVariants: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const heroCardVariants: Variants = {
  hidden:  { opacity: 0, y: 48, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

const statVariants: Variants = {
  hidden:  { opacity: 0, y: 16, scale: 0.94 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.55, delay: 0.4 + i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeUpVariants: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const tabContentVariants: Variants = {
  hidden:  { opacity: 0, y: 10, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.22 } },
};

const currencySlideVariants: Variants = {
  hidden:  (dir: number) => ({ opacity: 0, x: dir * 18 }),
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  exit:    (dir: number) => ({ opacity: 0, x: dir * -18, transition: { duration: 0.2 } }),
};

const impactVariants: Variants = {
  hidden:  { opacity: 0, y: 8, height: 0 },
  visible: { opacity: 1, y: 0, height: "auto", transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -6, height: 0, transition: { duration: 0.2 } },
};

const donorFormVariants: Variants = {
  hidden:  { opacity: 0, height: 0, marginTop: 0 },
  visible: { opacity: 1, height: "auto", marginTop: 16, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, height: 0, marginTop: 0, transition: { duration: 0.3 } },
};

const dialogBackdropVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit:    { opacity: 0, transition: { duration: 0.3, delay: 0.1 } },
};

const dialogPanelVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.88, y: 32 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, scale: 0.92, y: 24, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } },
};

const dialogItemVariants: Variants = {
  hidden:  { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: 0.25 + i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const confettiVariants: Variants = {
  hidden:  { opacity: 0, scale: 0, rotate: -20 },
  visible: (i: number) => ({
    opacity: [0, 1, 1, 0],
    scale:   [0, 1.2, 1, 0.8],
    y:       [0, -28, -42, -60],
    rotate:  [-20, 10, -5, 15],
    transition: { duration: 1.2, delay: 0.3 + i * 0.06, ease: "easeOut" },
  }),
};

/* ══════════════════════════════════════════════════════
   SUB-COMPONENTS
══════════════════════════════════════════════════════ */
function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center justify-between py-3 border-b border-zinc-100 dark:border-emerald-900/30 last:border-0">
      <div>
        <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 dark:text-emerald-600 mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-zinc-800 dark:text-emerald-100 break-all">{value}</p>
      </div>
      <button
        onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
        className="ml-4 shrink-0 flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full border transition-all duration-200 border-zinc-200 dark:border-emerald-800/50 text-zinc-500 dark:text-emerald-400 hover:border-[#064e3b] hover:text-[#064e3b] dark:hover:border-emerald-400 dark:hover:text-emerald-300"
      >
        {copied ? <Check size={12} strokeWidth={3} /> : <Copy size={12} strokeWidth={2.5} />}
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

/* ── SUCCESS DIALOG ── */
function SuccessDialog({
  open, onClose, donorMode, form, currency, amount,
}: {
  open: boolean; onClose: () => void;
  donorMode: DonorMode; form: DonorForm;
  currency: Currency; amount: number;
}) {
  const sym = CURRENCIES[currency].symbol;
  const confettiItems = ["🌱", "🌍", "💛", "✨", "🎉", "💚", "🌟", "🫶"];

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          variants={dialogBackdropVariants}
          initial="hidden" animate="visible" exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-[#010f08]/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            variants={dialogPanelVariants}
            initial="hidden" animate="visible" exit="exit"
            className="relative z-10 w-full max-w-md bg-[#F9FBFA] dark:bg-[#0a2318] rounded-3xl shadow-2xl shadow-black/50 border border-zinc-100 dark:border-emerald-900/30 overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-zinc-100 dark:bg-emerald-900/40 flex items-center justify-center text-zinc-500 dark:text-emerald-400 hover:bg-zinc-200 dark:hover:bg-emerald-900/60 transition-colors"
            >
              <X size={14} strokeWidth={2.5} />
            </button>

            {/* Green header with confetti */}
            <div className="relative bg-[#064e3b] px-8 pt-10 pb-8 text-center overflow-hidden">
              <div className="absolute inset-0 opacity-[0.06]"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
              />
              {/* Confetti burst */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {confettiItems.map((emoji, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={confettiVariants}
                    initial="hidden" animate="visible"
                    className="absolute text-xl"
                    style={{ left: `${15 + i * 10}%`, top: "60%" }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </div>

              {/* Icon */}
              <motion.div
                custom={0} variants={dialogItemVariants} initial="hidden" animate="visible"
                className="w-16 h-16 rounded-full bg-amber-400 flex items-center justify-center mx-auto mb-4 relative z-10"
              >
                <PartyPopper size={28} className="text-black" strokeWidth={2} />
              </motion.div>

              <motion.p
                custom={1} variants={dialogItemVariants} initial="hidden" animate="visible"
                className="text-emerald-300/70 text-[10px] font-bold uppercase tracking-[0.28em] mb-1 relative z-10"
              >
                Thank You
              </motion.p>
              <motion.h2
                custom={2} variants={dialogItemVariants} initial="hidden" animate="visible"
                className="text-2xl font-black text-white relative z-10"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {donorMode === "anonymous"
                  ? "Your gift is on its way."
                  : `Thank you, ${form.name.split(" ")[0] || "friend"}!`}
              </motion.h2>
            </div>

            {/* Body */}
            <div className="px-8 py-7">
              <motion.div
                custom={3} variants={dialogItemVariants} initial="hidden" animate="visible"
                className="text-center mb-6"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800/40 mb-4">
                  <span className="text-lg">{CURRENCIES[currency].flag}</span>
                  <span className="text-xl font-black text-zinc-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {sym}{amount > 0 ? amount.toLocaleString() : "—"}
                  </span>
                  <span className="text-xs font-bold text-zinc-400 dark:text-emerald-600 uppercase">{CURRENCIES[currency].label}</span>
                </div>
                <p className="text-zinc-600 dark:text-emerald-100/60 text-sm leading-relaxed">
                  {donorMode === "anonymous"
                    ? "Your anonymous donation has been received. Though your name won't appear on our wall, your impact is absolutely real, and deeply felt."
                    : `Your donation is making a real difference in rural communities across Africa. ${form.email ? `A confirmation will be sent to ${form.email}.` : ""}`}
                </p>
              </motion.div>

              {/* Named donor card */}
              {donorMode === "named" && (form.name || form.message) && (
                <motion.div
                  custom={4} variants={dialogItemVariants} initial="hidden" animate="visible"
                  className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30"
                >
                  <p className="text-[10px] uppercase tracking-widest font-bold text-emerald-600 dark:text-emerald-400 mb-2">Your Donor Record</p>
                  {form.name && (
                    <p className="text-sm font-black text-zinc-800 dark:text-white mb-0.5">{form.name}</p>
                  )}
                  {form.email && (
                    <p className="text-[12px] text-zinc-500 dark:text-emerald-300/60">{form.email}</p>
                  )}
                  {form.message && (
                    <p className="mt-2 text-[12px] italic text-zinc-600 dark:text-emerald-200/50 border-t border-emerald-100 dark:border-emerald-800/30 pt-2">
                      "{form.message}"
                    </p>
                  )}
                </motion.div>
              )}

              {/* Impact note */}
              <motion.div
                custom={5} variants={dialogItemVariants} initial="hidden" animate="visible"
                className="flex items-start gap-3 mb-7 px-4 py-3 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-emerald-900/20"
              >
                <Sparkles size={14} className="text-amber-500 mt-0.5 shrink-0" />
                <p className="text-[12px] text-zinc-500 dark:text-emerald-200/55 leading-relaxed">
                  {IMPACT_MAP[currency][amount] || "Your gift directly funds life-changing programmes for rural communities across Africa."}
                </p>
              </motion.div>

              <motion.button
                custom={6} variants={dialogItemVariants} initial="hidden" animate="visible"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={onClose}
                className="w-full flex items-center justify-between bg-[#064e3b] hover:bg-emerald-800 text-white py-4 px-6 rounded-2xl font-black text-sm shadow-lg shadow-emerald-900/20 group transition-colors"
              >
                <span>Continue</span>
                <span className="bg-amber-400 text-black rounded-full p-1.5 group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight size={14} strokeWidth={3} />
                </span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════ */
export default function DonatePage() {
  const [donationType,    setDonationType]    = useState<DonationType>("single");
  const [currency,        setCurrency]        = useState<Currency>("ngn");
  const [selectedAmount,  setSelectedAmount]  = useState<number | null>(CURRENCIES.ngn.presets[3]);
  const [customAmount,    setCustomAmount]    = useState("");
  const [paymentTab,      setPaymentTab]      = useState<PaymentTab>("online");
  const [onlineMethod,    setOnlineMethod]    = useState<OnlineMethod>("flutterwave");
  const [donorMode,       setDonorMode]       = useState<DonorMode>("named");
  const [form,            setForm]            = useState<DonorForm>({ name: "", email: "", phone: "", message: "" });
  const [showDialog,      setShowDialog]      = useState(false);
  const [prevCurrency,    setPrevCurrency]    = useState<Currency>("ngn");
  const [currencyDir,     setCurrencyDir]     = useState(1);
  const [heroCount,       setHeroCount]       = useState(0);
  const countRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const sym         = CURRENCIES[currency].symbol;
  const presets     = CURRENCIES[currency].presets;
  const activeAmount = customAmount ? parseInt(customAmount) || 0 : selectedAmount || 0;
  const impactText   = IMPACT_MAP[currency][selectedAmount || 0];
  const bank         = BANK_DETAILS[currency];

  // Hero counter
  useEffect(() => {
    let start = 0;
    const step = (12400 / 2000) * 16;
    countRef.current = setInterval(() => {
      start += step;
      if (start >= 12400) { setHeroCount(12400); clearInterval(countRef.current!); }
      else setHeroCount(Math.floor(start));
    }, 16);
    return () => { if (countRef.current) clearInterval(countRef.current); };
  }, []);

  // Reset amount when currency changes
  const handleCurrencyChange = (c: Currency) => {
    const currencies: Currency[] = ["ngn", "usd", "gbp"];
    const oldIdx = currencies.indexOf(currency);
    const newIdx = currencies.indexOf(c);
    setCurrencyDir(newIdx > oldIdx ? 1 : -1);
    setPrevCurrency(currency);
    setCurrency(c);
    setSelectedAmount(CURRENCIES[c].presets[3]);
    setCustomAmount("");
  };

  const handleDonate = () => {
    if (paymentTab === "online") {
      const link = PAYMENT_LINKS[onlineMethod];
      window.open(`${link}?amount=${activeAmount}&currency=${currency.toUpperCase()}`, "_blank");
    }
    setShowDialog(true);
  };

  const updateForm = (field: keyof DonorForm, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div
      className="min-h-screen bg-[#F9FBFA] dark:bg-[#041d14] transition-colors duration-700"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
      `}</style>

      {/* ════════════════════════════════════════
          SUCCESS DIALOG
      ════════════════════════════════════════ */}
      <SuccessDialog
        open={showDialog} onClose={() => setShowDialog(false)}
        donorMode={donorMode} form={form} currency={currency} amount={activeAmount}
      />

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="relative overflow-hidden min-h-[95vh] bg-emerald-900 flex py-10 md:py-28 items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#010f08]/97 via-[#021a0e]/90 to-[#064e3b]/50" />
        <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
        />
        <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-emerald-600/8 blur-[140px] pointer-events-none" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="herogrid" width="72" height="72" patternUnits="userSpaceOnUse"><path d="M 72 0 L 0 0 0 72" fill="none" stroke="#6ee7b7" strokeWidth="0.5"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#herogrid)" />
        </svg>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 py-24 w-full">
          <div className="grid lg:grid-cols-[1fr_460px] gap-12 lg:gap-16 items-center">

            {/* ── Hero Left ── */}
            <motion.div initial="hidden" animate="visible">
              <motion.div custom={0} variants={heroTextVariants}>
                <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-amber-400 bg-amber-400/10 border border-amber-400/20 px-4 py-1.5 rounded-full mb-8">
                  <Heart size={10} strokeWidth={3} className="fill-amber-400" />
                  Give Today
                </span>
              </motion.div>

              <motion.h1
                custom={1} variants={heroTextVariants}
                className="text-5xl md:text-6xl lg:text-[76px] font-black text-white leading-[1.0] tracking-tight mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Your gift
                <span className="block text-emerald-400 italic">changes</span>
                everything.
              </motion.h1>

              <motion.p custom={2} variants={heroTextVariants} className="text-emerald-100/55 text-base leading-relaxed mb-10 max-w-[460px]">
                In a continent of breathtaking potential, poverty is not destiny, it's a condition we can together dismantle. Every naira, every dollar, every pound moves us closer to an Africa where no child's dream is geography-limited.
              </motion.p>

              {/* Stats grid */}
              <motion.div initial="hidden" animate="visible" className="grid grid-cols-2 gap-3 max-w-sm">
                {STATS.map((s, i) => (
                  <motion.div key={i} custom={i} variants={statVariants}
                    className="p-4 rounded-2xl bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm">
                    <p className="text-2xl font-black text-white mb-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {s.value === "12,400+" ? `${heroCount.toLocaleString()}+` : s.value}
                    </p>
                    <p className="text-[11px] text-emerald-100/45 font-medium leading-snug">{s.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── Hero Quick-Give Card ── */}
            <motion.div variants={heroCardVariants} initial="hidden" animate="visible"
              className="bg-[#F9FBFA] dark:bg-emerald-950 rounded-3xl p-8 shadow-2xl shadow-black/50 border border-white/10">

              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400 mb-1.5">Start Giving</p>
              <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                How much would you like to give?
              </h2>

              {/* Donation type */}
              <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-emerald-950/50 rounded-2xl mb-4">
                {(["single", "monthly"] as DonationType[]).map((t) => (
                  <button key={t} onClick={() => setDonationType(t)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${donationType === t ? "bg-[#064e3b] text-white shadow-md" : "text-zinc-500 dark:text-emerald-400/60 hover:text-zinc-700 dark:hover:text-emerald-300"}`}>
                    {t === "single" ? <Globe size={14} /> : <Repeat2 size={14} />}
                    {t === "single" ? "One-time" : "Monthly"}
                  </button>
                ))}
              </div>

              {/* Currency selector */}
              <div className="flex gap-2 mb-4">
                {(Object.keys(CURRENCIES) as Currency[]).map((c) => (
                  <button key={c} onClick={() => handleCurrencyChange(c)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold border transition-all duration-200 ${currency === c ? "bg-[#064e3b] text-white border-[#064e3b] shadow-sm" : "border-zinc-200 dark:border-emerald-900/40 text-zinc-500 dark:text-emerald-400 hover:border-emerald-400"}`}>
                    <span>{CURRENCIES[c].flag}</span>
                    {CURRENCIES[c].label}
                  </button>
                ))}
              </div>

              {/* Preset amounts with slide animation */}
              <AnimatePresence mode="wait" custom={currencyDir}>
                <motion.div key={currency} custom={currencyDir} variants={currencySlideVariants}
                  initial="hidden" animate="visible" exit="exit"
                  className="grid grid-cols-3 gap-2 mb-4">
                  {presets.map((amt) => (
                    <button key={amt} onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                      className={`py-3 rounded-xl text-sm font-bold border transition-all duration-200 ${selectedAmount === amt && !customAmount ? "bg-[#064e3b] text-white border-[#064e3b] shadow-sm" : "border-zinc-200 dark:border-emerald-900/40 text-zinc-600 dark:text-emerald-300 hover:border-emerald-400"}`}>
                      {sym}{amt.toLocaleString()}
                    </button>
                  ))}
                </motion.div>
              </AnimatePresence>

              <div className="relative mb-2">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-emerald-600 font-bold text-sm">{sym}</span>
                <input type="number" placeholder="Custom amount"
                  value={customAmount} onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                  className="w-full pl-8 pr-4 py-3.5 rounded-xl border border-zinc-200 dark:border-emerald-900/40 bg-transparent text-zinc-800 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-emerald-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/40 transition"
                />
              </div>

              <AnimatePresence>
                {impactText && !customAmount && (
                  <motion.div key={`${currency}-${selectedAmount}`} variants={impactVariants} initial="hidden" animate="visible" exit="exit"
                    className="flex items-start gap-2 mt-2 px-3 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30 overflow-hidden">
                    <Sparkles size={13} className="text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-300 leading-snug">{impactText}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <a href="#donate-form">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="mt-4 w-full flex items-center justify-between bg-amber-400 hover:bg-amber-300 text-white py-4 px-6 rounded-2xl font-black text-sm shadow-lg group transition-colors">
                  <span>Proceed · {activeAmount > 0 ? `${sym}${activeAmount.toLocaleString()}` : "choose amount"}</span>
                  <span className="bg-emerald-900 rounded-full p-1.5 group-hover:rotate-45 transition-transform duration-300">
                    <ArrowUpRight size={15} strokeWidth={3} />
                  </span>
                </motion.button>
              </a>
            </motion.div>

          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F9FBFA] dark:from-[#041d14] to-transparent pointer-events-none" />
      </section>


      {/* ════════════════════════════════════════
          TRUST STRIP
      ════════════════════════════════════════ */}
      <div className="py-5 border-y border-zinc-200/60 dark:border-emerald-900/30 bg-emerald-900/[0.03]">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 flex flex-wrap gap-x-8 gap-y-3 items-center justify-center">
          {["🌱 100% funds direct programmes", "🔒 SSL-encrypted payments", "🧾 Tax receipts on request", "🌍 NGN · USD · GBP accepted"].map((item, i) => (
            <motion.span key={i} custom={i} variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-sm font-semibold text-zinc-500 dark:text-emerald-200/60">
              {item}
            </motion.span>
          ))}
        </div>
      </div>


      {/* ════════════════════════════════════════
          MAIN DONATE SECTION
      ════════════════════════════════════════ */}
      <section id="donate-form" className="py-24 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="grid lg:grid-cols-[1fr_520px] gap-16 xl:gap-24 items-start">

            {/* ── Left: Why Give ── */}
            <div>
              <motion.span custom={0} variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="inline-block text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800/50 px-4 py-1.5 rounded-full mb-6">
                Why Give?
              </motion.span>

              <motion.h2 custom={1} variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white leading-[1.06] tracking-tight mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Every gift is a<span className="block italic text-emerald-700 dark:text-emerald-400"> seed of change.</span>
              </motion.h2>

              <motion.p custom={2} variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="text-zinc-600 dark:text-emerald-100/60 leading-relaxed text-base mb-3 max-w-lg">
                Rurban Africa bridges the gap between rural and urban communities, building schools, training leaders, installing clean water systems, and creating economic opportunity where none existed.
              </motion.p>
              <motion.p custom={3} variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="text-zinc-400 dark:text-emerald-100/35 leading-relaxed text-sm max-w-lg mb-10">
                We maintain zero percent administrative overhead. Every kobo, cent, and penny you give is deployed directly to the communities you're lifting.
              </motion.p>

              {/* Programme cards */}
              <div className="space-y-3 mb-12">
                {[
                  { icon: "🏫", title: "Education",      desc: "Scholarships, school supplies & rural learning hubs" },
                  { icon: "💧", title: "Clean Water",    desc: "Borehole installations and water purification systems" },
                  { icon: "🌾", title: "Food Security",  desc: "Smallholder farming support & agricultural cooperatives" },
                  { icon: "💡", title: "Tech & Innovation", desc: "Digital literacy centres for underserved communities" },
                ].map((item, i) => (
                  <motion.div key={i} custom={i} variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    className="flex items-start gap-4 p-5 rounded-2xl border border-zinc-100 dark:border-emerald-900/30 bg-white dark:bg-white/[0.02] hover:border-emerald-200 dark:hover:border-emerald-800/60 hover:shadow-sm transition-all duration-300 group">
                    <span className="text-2xl mt-0.5">{item.icon}</span>
                    <div>
                      <p className="font-black text-zinc-800 dark:text-white text-sm mb-0.5 group-hover:text-[#064e3b] dark:group-hover:text-emerald-400 transition-colors">{item.title}</p>
                      <p className="text-zinc-500 dark:text-emerald-100/40 text-[13px] leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Testimonial */}
              <motion.blockquote custom={5} variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="border-l-4 border-[#064e3b] dark:border-emerald-500 pl-6 py-1">
                <p className="text-zinc-700 dark:text-emerald-100/65 text-base italic leading-relaxed mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  "Because of Rurban Africa, my daughter can dream of becoming a doctor. Three years ago, she had no school to attend."
                </p>
                <cite className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-500 not-italic">
                 , Amina B., Sokoto State
                </cite>
              </motion.blockquote>
            </div>


            {/* ── Right: Payment Panel ── */}
            <motion.div custom={0} variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="lg:sticky lg:top-28">

              <div className="bg-white dark:bg-[#0a2318] rounded-3xl shadow-2xl shadow-zinc-200/90 dark:shadow-black/50 border border-zinc-100 dark:border-emerald-900/30 overflow-hidden">

                {/* Panel header */}
                <div className="relative overflow-hidden bg-[#064e3b] px-8 py-7">
                  <div className="absolute inset-0 opacity-[0.07]"
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
                  />
                  <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />
                  <p className="text-emerald-300/60 text-[10px] font-bold uppercase tracking-[0.25em] mb-1 relative z-10">Complete Your Gift</p>
                  <h3 className="text-white text-xl font-black relative z-10" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Choose a payment method
                  </h3>
                </div>

                <div className="p-7 space-y-5 dark:bg-emerald-950">

                  {/* Currency + Amount recap */}
                  <div className="flex items-center justify-between pb-5 border-b border-zinc-100 dark:border-emerald-900/30">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 dark:text-emerald-600 mb-1">Amount</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-black text-zinc-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                          {activeAmount > 0 ? `${sym}${activeAmount.toLocaleString()}` : `${sym}—`}
                        </p>
                        <span className="text-xs font-bold text-zinc-400 dark:text-emerald-700 uppercase">{CURRENCIES[currency].label}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 dark:text-emerald-600 mb-1">Frequency</p>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${donationType === "monthly" ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300" : "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400"}`}>
                        {donationType === "monthly" ? <Repeat2 size={11} /> : <Globe size={11} />}
                        {donationType === "monthly" ? "Monthly" : "One-time"}
                      </span>
                    </div>
                  </div>

                  {/* Currency selector */}
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 dark:text-emerald-600 mb-2">Currency</p>
                    <div className="flex gap-2">
                      {(Object.keys(CURRENCIES) as Currency[]).map((c) => (
                        <button key={c} onClick={() => handleCurrencyChange(c)}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold border transition-all ${currency === c ? "bg-[#064e3b] text-white border-[#064e3b]" : "border-zinc-200 dark:border-emerald-900/40 text-zinc-500 dark:text-emerald-400 hover:border-emerald-400"}`}>
                          <span>{CURRENCIES[c].flag}</span>{CURRENCIES[c].label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick amounts */}
                  <div>
                    <AnimatePresence mode="wait" custom={currencyDir}>
                      <motion.div key={currency} custom={currencyDir} variants={currencySlideVariants}
                        initial="hidden" animate="visible" exit="exit"
                        className="grid grid-cols-3 gap-2">
                        {presets.map((amt) => (
                          <button key={amt} onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                            className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${selectedAmount === amt && !customAmount ? "bg-[#064e3b] text-white border-[#064e3b]" : "border-zinc-200 dark:border-emerald-900/40 text-zinc-500 dark:text-emerald-400 hover:border-emerald-400"}`}>
                            {sym}{amt >= 1000 ? `${amt / 1000}k` : amt}
                          </button>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Custom input */}
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-emerald-600 font-bold text-sm">{sym}</span>
                    <input type="number" placeholder="Or type a custom amount"
                      value={customAmount} onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                      className="w-full pl-8 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-emerald-900/40 bg-zinc-50 dark:bg-emerald-950/30 text-zinc-800 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-emerald-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/40 transition"
                    />
                  </div>

                  {/* ── PAYMENT TABS ── */}
                  <div className="flex gap-1 p-1 bg-zinc-100 dark:bg-emerald-950/50 rounded-2xl">
                    {([
                      { id: "online",   label: "Pay Online",    icon: <Smartphone size={14} /> },
                      { id: "transfer", label: "Bank Transfer",  icon: <Building2 size={14} /> },
                    ] as const).map((tab) => (
                      <button key={tab.id} onClick={() => setPaymentTab(tab.id)}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${paymentTab === tab.id ? "bg-[#064e3b] text-white shadow-md" : "text-zinc-500 dark:text-emerald-400/60 hover:text-zinc-800 dark:hover:text-emerald-300"}`}>
                        {tab.icon}{tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab content */}
                  <AnimatePresence mode="wait">

                    {/* ── ONLINE ── */}
                    {paymentTab === "online" && (
                      <motion.div key="online" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit">
                        <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 dark:text-emerald-600 mb-3">Select processor</p>
                        <div className="grid grid-cols-2 gap-3 mb-5">
                          {([
                            { id: "flutterwave", name: "Flutterwave", sub: "Cards, Bank, USSD", color: "bg-orange-500", abbr: "FW" },
                            { id: "paystack",    name: "Paystack",    sub: "Cards, Transfer, USSD", color: "bg-[#00C3F7]", abbr: "PS" },
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
                            You'll be securely redirected to {onlineMethod === "flutterwave" ? "Flutterwave" : "Paystack"}. Rurban Africa never stores your card details.
                          </p>
                        </div>

                        {/* ── DONOR MODE ── */}
                        <DonorModeSection donorMode={donorMode} setDonorMode={setDonorMode} form={form} updateForm={updateForm} />

                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                          onClick={handleDonate} disabled={activeAmount <= 0}
                          className="mt-4 w-full flex items-center justify-between bg-[#064e3b] hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed text-white py-4 px-6 rounded-2xl font-black text-sm shadow-lg shadow-emerald-900/20 group transition-colors">
                          <span>Donate {activeAmount > 0 && `${sym}${activeAmount.toLocaleString()}`} via {onlineMethod === "flutterwave" ? "Flutterwave" : "Paystack"}</span>
                          <span className="bg-amber-400 text-white rounded-full p-1.5 group-hover:rotate-45 transition-transform duration-300">
                            <ArrowUpRight size={14} strokeWidth={3} />
                          </span>
                        </motion.button>
                      </motion.div>
                    )}

                    {/* ── TRANSFER ── */}
                    {paymentTab === "transfer" && (
                      <motion.div key="transfer" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit">
                        <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 dark:text-emerald-600 mb-3">
                          Transfer details for <span className="text-zinc-600 dark:text-emerald-400">{CURRENCIES[currency].flag} {CURRENCIES[currency].label}</span>
                        </p>

                        <AnimatePresence mode="wait" custom={currencyDir}>
                          <motion.div key={`bank-${currency}`} custom={currencyDir} variants={currencySlideVariants}
                            initial="hidden" animate="visible" exit="exit"
                            className="bg-zinc-50 dark:bg-emerald-950/30 rounded-2xl border border-zinc-200 dark:border-emerald-900/30 px-5 py-1 mb-5">
                            <CopyField label="Bank Name"      value={bank.bankName} />
                            <CopyField label="Account Name"   value={bank.accountName} />
                            <CopyField label="Account Number" value={bank.accountNumber} />
                            {bank.sortCode      && <CopyField label="Sort Code"       value={bank.sortCode} />}
                            {bank.swiftCode     && <CopyField label="SWIFT / BIC"     value={bank.swiftCode} />}
                            {bank.iban          && <CopyField label="IBAN"            value={bank.iban} />}
                            {bank.routingNumber && <CopyField label="Routing Number"  value={bank.routingNumber} />}
                          </motion.div>
                        </AnimatePresence>

                        {/* Steps */}
                        <div className="space-y-3 mb-5">
                          {[
                            "Transfer your desired amount to the account above.",
                            "Use your full name as the transfer narration/reference.",
                            "Send proof of payment to info@rurbanafrica.org for your receipt.",
                          ].map((step, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <span className="w-5 h-5 rounded-full bg-[#064e3b] text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                              <p className="text-[12px] text-zinc-500 dark:text-emerald-300/55 leading-relaxed">{step}</p>
                            </div>
                          ))}
                        </div>

                        {/* ── DONOR MODE ── */}
                        <DonorModeSection donorMode={donorMode} setDonorMode={setDonorMode} form={form} updateForm={updateForm} />

                        <div className="mt-4 flex gap-3">
                          <a href="mailto:info@rurbanafrica.org?subject=Donation%20Confirmation"
                            className="flex-1 flex items-center justify-between bg-zinc-800 dark:bg-emerald-900/40 hover:bg-zinc-700 text-white py-4 px-5 rounded-2xl font-black text-sm group transition-colors">
                            <span className="text-xs">Send proof via email</span>
                            <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
                          </a>
                          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                            onClick={() => setShowDialog(true)} disabled={activeAmount <= 0}
                            className="flex items-center justify-center gap-2 bg-[#064e3b] hover:bg-emerald-800 disabled:opacity-40 text-white py-4 px-5 rounded-2xl font-black text-xs shadow-lg group transition-colors">
                            <span>Done</span>
                            <span className="bg-amber-400 text-black rounded-full p-1 group-hover:rotate-45 transition-transform duration-300">
                              <ArrowUpRight size={12} strokeWidth={3} />
                            </span>
                          </motion.button>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>
              </div>

              {/* Trust badges */}
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


      {/* ════════════════════════════════════════
          BOTTOM CTA
      ════════════════════════════════════════ */}
      <section className="py-20 bg-[#064e3b] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full bg-emerald-400/5 blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-14 text-center">
          <motion.p custom={0} variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.28em] mb-4">
            Together We Rise
          </motion.p>
          <motion.h2 custom={1} variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white leading-tight mb-5"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            The Africa we dream of
            <span className="block italic text-amber-400"> starts with you.</span>
          </motion.h2>
          <motion.p custom={2} variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-emerald-100/50 text-base leading-relaxed max-w-lg mx-auto mb-10">
            Whether it's ₦500, $5, or £5, your gift is proof that human beings still care for one another. Thank you for being part of this.
          </motion.p>
          <motion.a custom={3} variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            href="#donate-form"
            className="inline-flex items-center gap-3 bg-amber-400 hover:bg-amber-300 text-white px-8 py-4 rounded-full font-black text-sm group transition-colors shadow-xl shadow-black/20">
            Give Now
            <span className="bg-emerald-900 rounded-full p-1.5 group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight size={16} strokeWidth={3} />
            </span>
          </motion.a>
        </div>
      </section>

    </div>
  );
}

/* ══════════════════════════════════════════════════════
   DONOR MODE SECTION (extracted for reuse in both tabs)
══════════════════════════════════════════════════════ */
function DonorModeSection({
  donorMode, setDonorMode, form, updateForm,
}: {
  donorMode: DonorMode;
  setDonorMode: (m: DonorMode) => void;
  form: DonorForm;
  updateForm: (f: keyof DonorForm, v: string) => void;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 dark:text-emerald-600 mb-3">
        How would you like to give?
      </p>

      <div className="flex gap-2 mb-0">
        {([
          { id: "named",     label: "Share my name",  icon: <User size={14} />,    desc: "Your name appears on our donor wall" },
          { id: "anonymous", label: "Stay anonymous", icon: <EyeOff size={14} />,  desc: "Your gift is private, no records kept" },
        ] as const).map((m) => (
          <button key={m.id} onClick={() => setDonorMode(m.id)}
            className={`flex-1 relative flex flex-col items-start p-3.5 rounded-xl border-2 text-left transition-all duration-200 ${
              donorMode === m.id
                ? "border-[#064e3b] bg-emerald-50 dark:bg-emerald-900/20"
                : "border-zinc-200 dark:border-emerald-900/30 hover:border-zinc-300"
            }`}>
            {donorMode === m.id && (
              <span className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full bg-[#064e3b] flex items-center justify-center">
                <Check size={8} className="text-white" strokeWidth={3} />
              </span>
            )}
            <span className={`mb-1.5 ${donorMode === m.id ? "text-[#064e3b] dark:text-emerald-400" : "text-zinc-400 dark:text-emerald-700"}`}>
              {m.icon}
            </span>
            <p className="text-xs font-black text-zinc-800 dark:text-white leading-tight">{m.label}</p>
            <p className="text-[10px] text-zinc-400 dark:text-emerald-700 mt-0.5 leading-snug">{m.desc}</p>
          </button>
        ))}
      </div>

      {/* Named donor form */}
      <AnimatePresence>
        {donorMode === "named" && (
          <motion.div
            variants={donorFormVariants}
            initial="hidden" animate="visible" exit="exit"
            className="overflow-hidden"
          >
            <div className="space-y-3 pt-1">
              <div className="relative">
                <User size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-emerald-700" />
                <input type="text" placeholder="Full name *"
                  value={form.name} onChange={(e) => updateForm("name", e.target.value)}
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-emerald-900/40 bg-zinc-50 dark:bg-emerald-950/30 text-zinc-800 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-emerald-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/40 transition"
                />
              </div>
              <div className="relative">
                <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-emerald-700" />
                <input type="email" placeholder="Email address"
                  value={form.email} onChange={(e) => updateForm("email", e.target.value)}
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-emerald-900/40 bg-zinc-50 dark:bg-emerald-950/30 text-zinc-800 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-emerald-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/40 transition"
                />
              </div>
              <div className="relative">
                <Phone size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-emerald-700" />
                <input type="tel" placeholder="Phone number (optional)"
                  value={form.phone} onChange={(e) => updateForm("phone", e.target.value)}
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-emerald-900/40 bg-zinc-50 dark:bg-emerald-950/30 text-zinc-800 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-emerald-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/40 transition"
                />
              </div>
              <textarea rows={2} placeholder="Leave a message of support (optional)"
                value={form.message} onChange={(e) => updateForm("message", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-emerald-900/40 bg-zinc-50 dark:bg-emerald-950/30 text-zinc-800 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-emerald-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/40 transition resize-none"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}