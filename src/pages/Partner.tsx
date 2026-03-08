"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight, Handshake, Building2, Globe, BarChart3,
  Megaphone, Heart, CheckCircle2, ChevronDown, Star,
} from "lucide-react";
import PageHero from "@/_components/PageHero";

/* ══════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════ */
const PARTNERSHIP_TYPES = [
  {
    icon: <Building2 size={20} strokeWidth={1.8} />,
    title: "Corporate Partnerships",
    desc: "Align your brand with measurable social impact. Fund Dream Hubs, sponsor Pledge Notebooks, or underwrite scholarship programmes. We'll co-create a package that reflects your CSR goals.",
    benefits: ["Named sponsorship rights", "Impact reports & metrics", "Brand visibility on ground", "Employee engagement days"],
  },
  {
    icon: <Globe size={20} strokeWidth={1.8} />,
    title: "Institutional & NGO Partners",
    desc: "Join forces with us on shared mandates around education, SDG 4, youth empowerment, and rural development. We welcome co-implementation and joint programme design.",
    benefits: ["Joint programme design", "Shared field presence", "Co-branded campaigns", "Access to our networks"],
  },
  {
    icon: <Megaphone size={20} strokeWidth={1.8} />,
    title: "Media & Advocacy Partners",
    desc: "Help amplify Africa's untold stories of rural potential. Partner with us to produce content, run awareness campaigns, or advocate for policy change at national and continental levels.",
    benefits: ["Exclusive story access", "Co-produced content", "Campaign co-authorship", "Platform cross-promotion"],
  },
  {
    icon: <BarChart3 size={20} strokeWidth={1.8} />,
    title: "Research & Academic Partners",
    desc: "Work with our teams on ground-level research into rural education, community transformation, and youth development. We welcome data partnerships and academic evaluation of our programmes.",
    benefits: ["Field research access", "Programme evaluation roles", "Data-sharing agreements", "Publication co-authorship"],
  },
];

const IMPACT_STATS = [
  { num: "50,000+", label: "Pledge Notebooks distributed" },
  { num: "38+",     label: "Communities reached"          },
  { num: "120+",    label: "Partner schools"              },
  { num: "100%",    label: "Free to recipients"           },
];

const PROCESS = [
  { num: "01", title: "Express Interest",  body: "Tell us about your organisation, goals, and the kind of partnership you're interested in. Use the form below." },
  { num: "02", title: "Discovery Call",    body: "Our partnerships team will schedule a call within 5 working days to explore alignment and co-create a partnership brief." },
  { num: "03", title: "Proposal",          body: "We'll put together a tailored proposal including scope, deliverables, timelines, and impact reporting frameworks." },
  { num: "04", title: "Launch & Report",   body: "Formalise the partnership, kick off programmes, and receive regular impact reports throughout the engagement." },
];

const PARTNER_TYPES_SELECT = PARTNERSHIP_TYPES.map((p) => p.title);

/* ══════════════════════════════════════════════════
   PARTNERSHIP TYPE CARD
══════════════════════════════════════════════════ */
function TypeCard({ type }: { type: typeof PARTNERSHIP_TYPES[0] }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white dark:bg-[#071f12]
        border border-zinc-100 dark:border-emerald-900/30
        rounded-2xl p-6
        hover:border-emerald-200 dark:hover:border-emerald-700/40
        hover:shadow-xl hover:shadow-emerald-900/6
        transition-all duration-300"
    >
      <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-900/30
        flex items-center justify-center text-[#064e3b] dark:text-emerald-400
        group-hover:bg-[#064e3b] group-hover:text-white
        transition-all duration-250 mb-4 shrink-0">
        {type.icon}
      </div>

      <h3
        className="font-black text-zinc-900 dark:text-white text-[17px] leading-snug mb-2
          group-hover:text-[#064e3b] dark:group-hover:text-emerald-400 transition-colors"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        {type.title}
      </h3>
      <p className="text-zinc-500 dark:text-emerald-100/50 text-[13px] leading-relaxed mb-4">
        {type.desc}
      </p>

      <div className="h-px bg-zinc-100 dark:bg-emerald-900/30 mb-4" />

      <ul className="space-y-2">
        {type.benefits.map((b) => (
          <li key={b} className="flex items-center gap-2.5 text-[13px] text-zinc-600 dark:text-emerald-100/55">
            <CheckCircle2 size={13} className="text-emerald-500 dark:text-emerald-600 shrink-0" />
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   PARTNER FORM
══════════════════════════════════════════════════ */
function PartnerForm() {
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen]           = useState(false);
  const [selected, setSelected]   = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("partnershipType", selected);
    await fetch("https://formspree.io/f/xbdzjayn", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data,
    }).catch(() => {});
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center justify-center text-center py-16 px-8"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-900/30
          flex items-center justify-center mb-5">
          <CheckCircle2 size={28} className="text-[#064e3b] dark:text-emerald-400" />
        </div>
        <h3
          className="text-2xl font-black text-zinc-900 dark:text-white mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Partnership Request Received
        </h3>
        <p className="text-zinc-500 dark:text-emerald-100/50 text-sm leading-relaxed max-w-sm">
          Thank you for reaching out. Our partnerships team will respond within 5 working days.
        </p>
      </motion.div>
    );
  }

  const inputCls = `w-full px-4 py-3 rounded-xl text-sm
    bg-zinc-50 dark:bg-emerald-950/40
    border border-zinc-200 dark:border-emerald-900/40
    text-zinc-800 dark:text-white
    placeholder-zinc-400 dark:placeholder-emerald-700
    focus:outline-none focus:border-[#064e3b] dark:focus:border-emerald-500
    transition-colors`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-emerald-700 mb-1.5">
            Full Name
          </label>
          <input name="name" required placeholder="Your full name" className={inputCls} />
        </div>
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-emerald-700 mb-1.5">
            Organisation
          </label>
          <input name="organisation" required placeholder="Organisation name" className={inputCls} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-emerald-700 mb-1.5">
            Email
          </label>
          <input name="email" type="email" required placeholder="you@org.com" className={inputCls} />
        </div>
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-emerald-700 mb-1.5">
            Role / Title
          </label>
          <input name="role" placeholder="e.g. Head of CSR" className={inputCls} />
        </div>
      </div>

      {/* Type selector */}
      <div className="relative">
        <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-emerald-700 mb-1.5">
          Partnership Type
        </label>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`${inputCls} flex items-center justify-between text-left cursor-pointer`}
        >
          <span className={selected ? "text-zinc-800 dark:text-white" : "text-zinc-400 dark:text-emerald-700"}>
            {selected || "Select partnership type…"}
          </span>
          <ChevronDown size={14} className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="absolute z-20 top-full mt-1 w-full
            bg-white dark:bg-[#071f12]
            border border-zinc-100 dark:border-emerald-900/40
            rounded-xl shadow-xl overflow-hidden">
            {PARTNER_TYPES_SELECT.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => { setSelected(t); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm
                  hover:bg-emerald-50 dark:hover:bg-emerald-900/20
                  transition-colors
                  ${selected === t ? "text-[#064e3b] dark:text-emerald-400 font-bold" : "text-zinc-700 dark:text-white"}`}
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-emerald-700 mb-1.5">
          Tell us about the opportunity
        </label>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Share your organisation's goals, the scope of collaboration you have in mind, and any relevant context…"
          className={`${inputCls} resize-none`}
        />
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="w-full flex items-center justify-between
          bg-[#064e3b] hover:bg-emerald-800
          text-white px-6 py-4 rounded-xl
          font-black text-sm group
          transition-colors shadow-lg shadow-emerald-900/15"
      >
        Send Partnership Enquiry
        <span className="bg-amber-400 text-black rounded-full p-1.5 group-hover:rotate-45 transition-transform duration-300">
          <ArrowUpRight size={14} strokeWidth={3} />
        </span>
      </motion.button>
    </form>
  );
}

/* ══════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════ */
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function Partner() {
  const heroRef    = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const statsRef   = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });
  const processRef  = useRef<HTMLDivElement>(null);
  const processInView = useInView(processRef, { once: true, margin: "-60px" });
  const formRef    = useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef, { once: true, margin: "-60px" });

  return (
    <main
      className="bg-[#F9FBFA] dark:bg-[#041d14] min-h-screen transition-colors duration-700"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="">
        <PageHero
                          tag="Partner with Rurban Africa"
                          title="Partner With in Making"
                          accentWord="Impact"
                          description="Make a real impact by sharing your skills and time with rural communities across Africa. Whether you have 3 hours a week or can commit full-time, there's a role for you."
                          crumbs={[{ label: "Partner" }]}
                        />
      </section>

      {/* ════════════════════ STATS ════════════════════ */}
      <section className="py-16 border-y border-zinc-100 dark:border-emerald-900/20 bg-white dark:bg-[#071f12]">
        <div ref={statsRef} className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {IMPACT_STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <p
                  className="text-4xl font-black text-zinc-900 dark:text-white mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {s.num}
                </p>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400 dark:text-emerald-700">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ PARTNERSHIP TYPES ════════════════════ */}
      <section id="types" className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="text-center mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Ways to Partner
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-zinc-500 dark:text-emerald-100/45 text-sm max-w-md mx-auto"
            >
              We work with a wide range of partners, corporate, institutional, media, and academic, to multiply our impact.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {PARTNERSHIP_TYPES.map((type) => (
              <TypeCard key={type.title} type={type} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ DARK CTA STRIP ════════════════════ */}
      <section
        className="py-20 overflow-hidden relative"
        style={{ background: "linear-gradient(135deg, #064e3b 0%, #052e20 60%, #021a0e 100%)" }}
      >
        {/* Grain */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <div className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full bg-amber-400/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <Star size={14} className="text-amber-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-300/60">Why Rurban Africa</span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-black text-white leading-tight mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Your brand. Our mission.
              <span className="block italic text-amber-400">Shared impact.</span>
            </h2>
            <p className="text-emerald-100/60 text-sm leading-relaxed">
              Every partnership with Rurban Africa comes with transparent reporting, measurable outcomes, and a direct line to the communities your support transforms. We don't just take funding, we build relationships.
            </p>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-4">
            <motion.a
              href="#enquire"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3
                bg-amber-400 hover:bg-amber-300
                text-black px-7 py-4 rounded-full
                font-black text-sm group
                transition-colors shadow-xl shadow-black/20"
            >
              Let's partner
              <span className="bg-black/10 rounded-full p-1.5 group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight size={14} strokeWidth={3} />
              </span>
            </motion.a>
            <motion.a
              href="/donate"
              whileHover={{ scale: 1.02 }}
              className="text-sm font-bold text-white/50 hover:text-white/80 transition-colors"
            >
              Or make a direct donation →
            </motion.a>
          </div>
        </div>
      </section>

      {/* ════════════════════ PROCESS ════════════════════ */}
      <section className="py-24 bg-white dark:bg-[#071f12]">
        <div ref={processRef} className="max-w-7xl mx-auto px-6 lg:px-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white mb-14 text-center"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            How It Works
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                animate={processInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {i < PROCESS.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-zinc-100 dark:bg-emerald-900/30 -translate-x-8 z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-[#064e3b] flex items-center justify-center mb-4 shadow-md shadow-emerald-900/20">
                    <span className="text-white font-black text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {step.num}
                    </span>
                  </div>
                  <h3
                    className="font-black text-zinc-900 dark:text-white text-lg mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-zinc-500 dark:text-emerald-100/45 text-sm leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ FORM ════════════════════ */}
      <section id="enquire" className="py-24">
        <div ref={formRef} className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="grid lg:grid-cols-[1fr_520px] gap-16 xl:gap-24 items-start">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="lg:sticky lg:top-32"
            >
              <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em]
                text-emerald-600 dark:text-emerald-400
                bg-emerald-50 dark:bg-emerald-900/30
                border border-emerald-200 dark:border-emerald-800/50
                px-4 py-1.5 rounded-full mb-6">
                Partner Enquiry
              </span>
              <h2
                className="text-4xl md:text-[50px] font-black text-zinc-900 dark:text-white leading-tight mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Start a
                <span className="block italic text-emerald-700 dark:text-emerald-400">conversation.</span>
              </h2>
              <div className="h-[3px] w-12 bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full mb-6" />
              <p className="text-zinc-500 dark:text-emerald-100/50 text-sm leading-[1.9] max-w-sm mb-8">
                Tell us about your organisation and what kind of impact you'd like to create. We'll follow up within 5 working days with a tailored partnership proposal.
              </p>

              {/* Contact direct */}
              <div className="space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-emerald-700">
                  Direct enquiries
                </p>
                <a
                  href="mailto:info@rurbanafrica.org"
                  className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-emerald-300 hover:text-[#064e3b] dark:hover:text-emerald-400 transition-colors"
                >
                  <Heart size={14} className="text-[#064e3b] dark:text-emerald-500" />
                  info@rurbanafrica.org
                </a>
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white dark:bg-[#071f12]
                border border-zinc-100 dark:border-emerald-900/30
                rounded-3xl p-8 shadow-sm"
            >
              <PartnerForm />
            </motion.div>

          </div>
        </div>
      </section>

    </main>
  );
}