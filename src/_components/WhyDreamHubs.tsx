"use client";

import { useRef } from "react";
import { motion, Variants, useInView } from "framer-motion";
import {
  ArrowUpRight, Globe, BookOpen, Heart, Layers,
  Zap, Users, Sprout,
} from "lucide-react";

/* ══════════════════════════════════════════════════
   ANIMATION VARIANTS
══════════════════════════════════════════════════ */
const headerVariants: Variants = {
  hidden:  { opacity: 0, y: 36 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.75, delay: i * 0.11, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* Cards slide in from alternating sides on scroll */
const cardVariants: Variants = {
  hidden:  (side: "left" | "right") => ({
    opacity: 0,
    x: side === "left" ? -48 : 48,
    y: 24,
    scale: 0.96,
  }),
  visible: {
    opacity: 1, x: 0, y: 0, scale: 1,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

/* Number badge pops in with spring */
const badgeVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.4, rotate: -12 },
  visible: {
    opacity: 1, scale: 1, rotate: 0,
    transition: { type: "spring", stiffness: 280, damping: 20, delay: 0.15 },
  },
};

/* Icon slides up from below the badge */
const iconVariants: Variants = {
  hidden:  { opacity: 0, y: 10 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

/* Text lines cascade */
const textVariants: Variants = {
  hidden:  { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* Accent line draws in */
const lineVariants: Variants = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
  },
};

const donateVariants: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const donateItemVariants: Variants = {
  hidden:  { opacity: 0, x: -18 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.5, delay: 0.25 + i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ══════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════ */
const REASONS = [
  {
    num: "01",
    icon: <BookOpen size={20} strokeWidth={1.8} />,
    accent: "from-emerald-400 to-emerald-600",
    tag: "Education",
    title: "Addressing the Education Gap",
    body: "Rural children often endure overcrowded classrooms, outdated materials, and teacher shortages, leading to high dropout rates (up to 50% in some sub-Saharan regions). Peri-urban areas, caught in rapid urbanisation, grapple with similar issues amid rising costs and displacement. Dream Hubs provide targeted interventions, boosting access to quality education and reducing inequalities that perpetuate poverty cycles.",
  },
  {
    num: "02",
    icon: <Heart size={20} strokeWidth={1.8} />,
    accent: "from-amber-400 to-amber-600",
    tag: "Identity",
    title: "Fostering Self-Belief and Cultural Pride",
    body: "In a world dominated by urban narratives, rural children and youth can feel disconnected or undervalued. Our hubs reinforce self-belief through daily pledges, affirmations, and stories of African excellence countering low confidence and inspiring kids to value their roots while aspiring to global heights. This is crucial for mental health and long-term success, as empowered individuals drive community upliftment.",
  },
  {
    num: "03",
    icon: <Layers size={20} strokeWidth={1.8} />,
    accent: "from-sky-400 to-sky-600",
    tag: "Connectivity",
    title: "Bridging Rural-Urban Divides",
    body: "Africa's growth depends on interconnected ecosystems: rural areas supply food and resources, while cities offer markets and innovation. Yet, weak links lead to inefficiencies, migration pressures, and lost opportunities. Dream Hubs create bridges by teaching real-world connections preparing children and youth for hybrid careers and sustainable development aligning with SDG 4 (Quality Education) and SDG 10 (Reduced Inequalities).",
  },
  {
    num: "04",
    icon: <Zap size={20} strokeWidth={1.8} />,
    accent: "from-rose-400 to-rose-600",
    tag: "Resilience",
    title: "Responding to Urgent Challenges",
    body: "Climate change, economic instability, and digital divides hit rural and peri-urban areas hardest. Hubs build resilience through nature-focused innovation, skill training, and community networks equipping the next generation to tackle these issues head-on. With Africa's youth population set to double by 2050, investing now prevents crises and unlocks demographic dividends.",
  },
  {
    num: "05",
    icon: <Sprout size={20} strokeWidth={1.8} />,
    accent: "from-emerald-400 to-teal-600",
    tag: "Scale",
    title: "Scalable Community-Led Impact",
    body: "Unlike top-down approaches, our hubs are co-created with locals, ensuring relevance and ownership. Early results from our outreaches show transformed mindsets: children reciting pledges with enthusiasm, dreaming of roles as inventors or leaders. Scaling this through partnerships amplifies reach, making Dream Hubs a catalyst for broader African unity and progress.",
  },
];

const DONATE_ITEMS = [
  "Make a single donation — $, £ and ₦",
  "Make a weekly donation — $, £ and ₦",
  "Make a monthly donation — $, £ and ₦",
];

/* ══════════════════════════════════════════════════
   REASON CARD — each card has its own useInView
══════════════════════════════════════════════════ */
function ReasonCard({
  reason,
  side,
}: {
  reason: (typeof REASONS)[number];
  side: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      custom={side}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="group relative bg-white dark:bg-[#071f12] rounded-3xl border border-zinc-100 dark:border-emerald-900/30 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 dark:hover:shadow-black/40 transition-all duration-500 cursor-default"
    >
      {/* Gradient top-accent bar */}
      <motion.div
        variants={lineVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${reason.accent}`}
      />

      {/* Subtle inner glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 20% 20%, rgba(6,78,59,0.04) 0%, transparent 70%)" }} />

      <div className="p-8">
        {/* Top row: number + tag + icon */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Number badge */}
            <motion.div
              variants={badgeVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="relative"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${reason.accent} flex items-center justify-center shadow-lg`}>
                <span
                  className="text-white font-black text-lg tracking-tighter leading-none"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {reason.num}
                </span>
              </div>
            </motion.div>

            {/* Tag pill */}
            <motion.span
              variants={iconVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="text-[10px] font-black uppercase tracking-[0.22em] text-zinc-400 dark:text-emerald-600 bg-zinc-50 dark:bg-emerald-950/50 border border-zinc-200 dark:border-emerald-900/40 px-3 py-1.5 rounded-full"
            >
              {reason.tag}
            </motion.span>
          </div>

          {/* Icon — top right, faint until hover */}
          <motion.div
            variants={iconVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-zinc-300 dark:text-emerald-900/60 group-hover:text-[#064e3b] dark:group-hover:text-emerald-500 transition-colors duration-300 mt-1"
          >
            {reason.icon}
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          variants={lineVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="h-px bg-zinc-100 dark:bg-emerald-900/30 mb-5"
        />

        {/* Title */}
        <motion.h3
          custom={0}
          variants={textVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="font-black text-zinc-900 dark:text-white text-lg mb-3 leading-tight group-hover:text-[#064e3b] dark:group-hover:text-emerald-400 transition-colors duration-300"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {reason.title}
        </motion.h3>

        {/* Body */}
        <motion.p
          custom={1}
          variants={textVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-zinc-500 dark:text-emerald-100/45 text-sm leading-relaxed"
        >
          {reason.body}
        </motion.p>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════ */
export default function WhyDreamHubs() {
  const headerRef = useRef<HTMLDivElement>(null);
  const donateRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const donateInView = useInView(donateRef, { once: true, margin: "-60px" });

  const rows = [REASONS.slice(0, 2), REASONS.slice(2, 4), REASONS.slice(4)];

  return (
    <section
      className="relative py-28 bg-[#F9FBFA] dark:bg-[#041d14] overflow-hidden transition-colors duration-700"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* BG decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-emerald-50/80 dark:bg-emerald-900/10 blur-[130px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full bg-amber-50/50 dark:bg-amber-900/5 blur-[120px]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.018] dark:opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="whygrid" width="52" height="52" patternUnits="userSpaceOnUse">
              <path d="M 52 0 L 0 0 0 52" fill="none" stroke="#064e3b" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#whygrid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10">

        {/* ── HEADER ── */}
        <div ref={headerRef} className="text-center mb-20">
          <motion.span
            custom={0} variants={headerVariants}
            initial="hidden" animate={headerInView ? "visible" : "hidden"}
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800/50 px-4 py-1.5 rounded-full mb-6"
          >
            <Globe size={10} strokeWidth={3} />
            The Need
          </motion.span>

          <motion.h2
            custom={1} variants={headerVariants}
            initial="hidden" animate={headerInView ? "visible" : "hidden"}
            className="text-4xl md:text-5xl lg:text-[56px] font-black text-zinc-900 dark:text-white leading-[1.06] tracking-tight mb-5"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Why Rurban Africa
            <span className="block italic text-emerald-700 dark:text-emerald-400"> Dream Hubs Are Needed</span>
          </motion.h2>

          <motion.p
            custom={2} variants={headerVariants}
            initial="hidden" animate={headerInView ? "visible" : "hidden"}
            className="text-zinc-500 dark:text-emerald-100/50 text-base leading-relaxed max-w-2xl mx-auto"
          >
            Africa's future hinges on empowering its youth, yet rural and peri-urban communities —
            home to over 60% of the continent's population — face systemic barriers that stifle potential.
          </motion.p>
        </div>

        {/* ── REASON CARDS ── */}
        <div className="space-y-5 mb-20">
          {rows.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className={`grid gap-5 ${
                row.length === 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1 max-w-[520px] mx-auto"
              }`}
            >
              {row.map((reason, colIdx) => (
                <ReasonCard
                  key={reason.num}
                  reason={reason}
                  side={colIdx % 2 === 0 ? "left" : "right"}
                />
              ))}
            </div>
          ))}
        </div>

        {/* ── DONATE STRIP ── */}
        <div ref={donateRef}>
          <motion.div
            variants={donateVariants}
            initial="hidden"
            animate={donateInView ? "visible" : "hidden"}
            className="grid md:grid-cols-[300px_1fr] rounded-3xl overflow-hidden border border-zinc-100 dark:border-emerald-900/30 shadow-2xl shadow-zinc-200/70 dark:shadow-black/40"
          >
            {/* Left — white donate panel */}
            <div className="bg-white dark:bg-[#0a2318] p-8 border-r border-zinc-100 dark:border-emerald-900/30 flex flex-col">
              <motion.h3
                initial={{ opacity: 0, y: 12 }}
                animate={donateInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl font-black text-zinc-900 dark:text-white mb-2"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Donate
              </motion.h3>
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                animate={donateInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="h-[3px] w-12 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full mb-7"
              />

              <div className="space-y-4 flex-1">
                {DONATE_ITEMS.map((item, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={donateItemVariants}
                    initial="hidden"
                    animate={donateInView ? "visible" : "hidden"}
                    className="flex items-center gap-3 group"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#064e3b]/10 dark:bg-emerald-900/40 flex items-center justify-center shrink-0 group-hover:bg-[#064e3b] transition-colors duration-300">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4l2.5 2.5L9 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[#064e3b] group-hover:text-white transition-colors duration-300"/>
                      </svg>
                    </span>
                    <p className="text-sm text-zinc-600 dark:text-emerald-100/60 font-medium">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.a
                href="/donate"
                initial={{ opacity: 0, y: 10 }}
                animate={donateInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="mt-8 w-full flex items-center justify-between bg-[#064e3b] hover:bg-emerald-800 text-white px-5 py-4 rounded-2xl font-black text-sm shadow-lg shadow-emerald-900/20 group transition-colors"
              >
                <span>Give Now</span>
                <span className="bg-amber-400 text-black rounded-full p-1.5 group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight size={13} strokeWidth={3} />
                </span>
              </motion.a>
            </div>

            {/* Right — deep green CTA */}
            <div
              className="relative overflow-hidden p-8 md:p-10 flex flex-col justify-center"
              style={{ background: "linear-gradient(145deg, #064e3b 0%, #052e20 55%, #021a0e 100%)" }}
            >
              {/* Grain texture */}
              <div className="absolute inset-0 opacity-[0.06]"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
              {/* Glow orbs */}
              <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-amber-400/8 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={donateInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="text-emerald-100/70 text-base md:text-lg leading-relaxed mb-5"
                >
                  By nurturing confident, connected young minds, we are not just educating individuals —
                  we are building a resilient, innovative Africa where every village and city thrives together.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={donateInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="text-white font-black text-base md:text-xl leading-snug"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Join us: Partner, donate, or volunteer to help establish more Dream Hubs. Together, let's make{" "}
                  <span className="italic text-amber-400">One Africa. Two Worlds. One Future.</span>{" "}
                  a reality.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={donateInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-8 flex flex-wrap gap-3"
                >
                  <a href="/donate"
                    className="inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-black px-6 py-3 rounded-full font-black text-sm group transition-colors shadow-lg shadow-black/20">
                    Donate
                    <span className="bg-black/10 rounded-full p-1 group-hover:rotate-45 transition-transform duration-300">
                      <ArrowUpRight size={13} strokeWidth={3} />
                    </span>
                  </a>
                  <a href="/volunteer"
                    className="inline-flex items-center gap-2.5 border-2 border-white/20 hover:border-white/50 hover:bg-white/5 text-white px-6 py-3 rounded-full font-black text-sm transition-all">
                    Volunteer
                  </a>
                  <a href="/partner"
                    className="inline-flex items-center gap-2.5 border-2 border-white/20 hover:border-white/50 hover:bg-white/5 text-white px-6 py-3 rounded-full font-black text-sm transition-all">
                    Partner With Us
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}