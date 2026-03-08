"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, Variants, useInView } from "framer-motion";
import { ArrowUpRight, BookOpen, Star, Users, Heart, Lightbulb, Globe, CheckCircle2 } from "lucide-react";

/* ══════════════════════════════════════════════════
   ANIMATION VARIANTS
══════════════════════════════════════════════════ */
const fadeUpVariants: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] },
  }),
};

const bookVariants: Variants = {
  hidden:  { opacity: 0, y: 40, rotate: -4, scale: 0.94 },
  visible: (i: number) => ({
    opacity: 1, y: 0, rotate: i === 0 ? -3 : 2, scale: 1,
    transition: { duration: 0.85, delay: 0.15 + i * 0.18, ease: [0.22, 1, 0.36, 1] },
  }),
};

const featureCardVariants: Variants = {
  hidden:  { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.55, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

const tabVariants: Variants = {
  hidden:  { opacity: 0, y: 8, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.2 } },
};

/* ══════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════ */
const PLEDGE_LINES = [
  "I am proud of who I am and where I come from.",
  "Today, I will study hard and give my best.",
  "I will respect my teachers, help my classmates, and honour my school.",
  "My future is in my hands.",
  "With discipline today, I build a brighter tomorrow, for my family, my community, and for Africa.",
  "Africa is rising and I am rising with it.",
  "This is my pledge. I will make it happen.",
];

const EDUCATION_REASONS = [
  "Education builds confidence",
  "Education empowers dreams",
  "Education fosters innovation",
  "Education reduces poverty",
  "Education promotes peace",
  "Education transforms communities",
  "Education preserves culture",
  "Education drives Economic Growth",
  "Education improves healthcare",
  "Education unleashes talent and inspires hope",
  "Education connects the World",
  "Education shapes the future",
];

const BONUS_REASON = "Education matters because someone is waiting for YOU to become the answer to their prayer.";

const KEY_FEATURES = [
  {
    icon: <BookOpen size={16} />,
    title: "The Rurban Africa Pledge",
    desc: "A central and powerful daily declaration that children and youth recite — emphasising self-belief, discipline, love for their roots, and pride in African identity.",
  },
  {
    icon: <Star size={16} />,
    title: "13 Powerful Reasons Why Education Matters",
    desc: "Includes a bonus reason highlighting the transformative role of learning in opening opportunities, building futures, and breaking cycles of limitation.",
  },
  {
    icon: <Users size={16} />,
    title: "Personalisation Spaces",
    desc: "Dedicated sections for children to write their names, school, village/town, dream job or aspiration, and what they love most about their community.",
  },
  {
    icon: <Globe size={16} />,
    title: "Colourful, Engaging Design",
    desc: "Front and back pages filled with motivational and educational content, African-themed illustrations, and imagery that connects children to a continent-wide vision.",
  },
  {
    icon: <Heart size={16} />,
    title: "Group Pledge Recitations",
    desc: "During school visits, our teams lead pupils in energetic, collective recitations, creating powerful moments of shared motivation and identity.",
  },
  {
    icon: <Lightbulb size={16} />,
    title: "Future-Focused Affirmations",
    desc: "\"This notebook belongs to a future doctor, engineer, lawyer, president, governor, senator, teacher, ambassador, pilot, astronaut, CEO, professor…\"",
  },
];

type Tab = "features" | "pledge" | "reasons";

/* ══════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════ */
export default function OurBook() {
  const [activeTab, setActiveTab] = useState<Tab>("features");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-28 bg-[#F9FBFA] dark:bg-[#041d14] overflow-hidden transition-colors duration-700"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Subtle decorative background shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-amber-100/40 dark:bg-amber-900/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-emerald-100/50 dark:bg-emerald-900/15 blur-[140px]" />
        {/* African-inspired dotted pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.025] dark:opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#064e3b"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14">

        {/* ── SECTION HEADER ── */}
        <div className="text-center mb-20">
          <motion.span
            custom={0} variants={fadeUpVariants}
            initial="hidden" animate={isInView ? "visible" : "hidden"}
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800/50 px-4 py-1.5 rounded-full mb-6"
          >
            <BookOpen size={10} strokeWidth={3} />
            Our Key Initiative
          </motion.span>

          <motion.h2
            custom={1} variants={fadeUpVariants}
            initial="hidden" animate={isInView ? "visible" : "hidden"}
            className="text-5xl md:text-6xl lg:text-[68px] font-black text-zinc-900 dark:text-white leading-[1.02] tracking-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Rurban Africa
            <span className="block italic text-emerald-700 dark:text-emerald-400"> Pledge Notebooks</span>
          </motion.h2>

          <motion.p
            custom={2} variants={fadeUpVariants}
            initial="hidden" animate={isInView ? "visible" : "hidden"}
            className="text-zinc-600 dark:text-emerald-100/60 text-lg leading-relaxed max-w-3xl mx-auto"
          >The Rurban Africa Pledge Notebooks is our key initiative, designed as more than ordinary school supplies. They serve as empowering tools to instill pride, purpose, and possibility in children and youth from rural and peri-urban communities across Africa. These notebooks are distributed during school outreach visits to inspire pupils, young students, reinforce self-belief, and connect their personal growth to a broader vision of African development and unity.
          </motion.p>
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid lg:grid-cols-[1fr_520px] gap-16 xl:gap-24 items-start">

          {/* ── LEFT: Notebook Visual ── */}
          <div className="relative flex items-center justify-center pb-10">

            {/* Dashed border wraps tightly around the image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full p-4 rounded-md border-2 border-dashed border-emerald-300/70 dark:border-emerald-700/50 overflow-hidden bg-gradient-to-br from-amber-50/40 via-emerald-50/20 to-transparent dark:from-emerald-900/10 dark:via-transparent"
            >
              {/* Corner accent dots */}
              <span className="absolute top-3 left-3 w-2 h-2 rounded-full bg-emerald-300/70 dark:bg-emerald-600/50 z-20" />
              <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-amber-300/70 dark:bg-amber-600/50 z-20" />
              <span className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-amber-300/70 dark:bg-amber-600/50 z-20" />
              <span className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-emerald-300/70 dark:bg-emerald-600/50 z-20" />

              {/* Book image — fills the dashed frame edge to edge */}
              <motion.img
                src="/book_back.jpeg"
                alt="Rurban Africa Pledge Notebook"
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.85, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.02, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
                className="relative z-10 w-full h-[450px] rounded-sm object-contain block"
              />
            </motion.div>

            {/* Floating badge — sits below the frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 10 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 z-20 bg-white dark:bg-[#0b2a1a] border border-emerald-100 dark:border-emerald-800/40 rounded-2xl px-5 py-3 shadow-xl shadow-emerald-900/10 flex items-center gap-3 whitespace-nowrap"
            >
              <span className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center shrink-0">
                <Star size={14} className="text-black fill-black" strokeWidth={2} />
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-emerald-600 dark:text-emerald-400">Distributed Free</p>
                <p className="text-sm font-black text-zinc-900 dark:text-white">During School Outreach Visits</p>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Content Tabs ── */}
          <div>
            {/* Tab switcher */}
            <motion.div
              custom={0} variants={fadeUpVariants}
              initial="hidden" animate={isInView ? "visible" : "hidden"}
              className="flex gap-1 p-1 bg-zinc-100 dark:bg-emerald-950/50 rounded-2xl mb-8"
            >
              {([
                { id: "features", label: "Key Features" },
                { id: "pledge",   label: "The Pledge" },
                { id: "reasons",  label: "Why Education" },
              ] as { id: Tab; label: string }[]).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-[#064e3b] text-white shadow-md"
                      : "text-zinc-500 dark:text-emerald-400/60 hover:text-zinc-700 dark:hover:text-emerald-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </motion.div>

            {/* Tab content */}
            <AnimatePresence mode="wait">

              {/* ── KEY FEATURES ── */}
              {activeTab === "features" && (
                <motion.div key="features" variants={tabVariants} initial="hidden" animate="visible" exit="exit">
                  <div className="space-y-4 h-[28rem] overflow-auto">
                    {KEY_FEATURES.map((f, i) => (
                      <motion.div
                        key={i}
                        custom={i} variants={featureCardVariants}
                        initial="hidden" animate="visible"
                        className="flex items-start gap-4 p-5 rounded-2xl border border-zinc-100 dark:border-emerald-900/30 bg-white dark:bg-white/[0.02] hover:border-emerald-200 dark:hover:border-emerald-800/60 hover:shadow-sm transition-all duration-300 group"
                      >
                        <span className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center shrink-0 mt-0.5 text-[#064e3b] dark:text-emerald-400 group-hover:bg-[#064e3b] group-hover:text-white dark:group-hover:bg-emerald-700 transition-all duration-300">
                          {f.icon}
                        </span>
                        <div>
                          <p className="font-black text-zinc-800 dark:text-white text-sm mb-1 group-hover:text-[#064e3b] dark:group-hover:text-emerald-400 transition-colors">
                            {f.title}
                          </p>
                          <p className="text-zinc-500 dark:text-emerald-100/40 text-[13px] leading-relaxed">{f.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── THE PLEDGE ── */}
              {activeTab === "pledge" && (
                <motion.div key="pledge" variants={tabVariants} initial="hidden" animate="visible" exit="exit">
                  {/* Pledge card */}
                  <div className="relative rounded-3xl overflow-hidden mb-6"
                    style={{ background: "linear-gradient(145deg, #064e3b 0%, #052e20 60%, #021a0e 100%)" }}>
                    {/* Grain */}
                    <div className="absolute inset-0 opacity-[0.06]"
                      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
                    />
                    <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

                    <div className="relative z-10 p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center">
                          <BookOpen size={14} className="text-black" strokeWidth={2.5} />
                        </span>
                        <div>
                          <p className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.22em]">Daily Declaration</p>
                          <p className="text-white text-sm font-black" style={{ fontFamily: "'Playfair Display', serif" }}>
                            The Rurban Africa Pledge
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {PLEDGE_LINES.map((line, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.45, delay: 0.05 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                            className="flex items-start gap-3"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                            <p className="text-emerald-100/80 text-sm leading-relaxed">{line}</p>
                          </motion.div>
                        ))}
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.65 }}
                        className="mt-6 pt-5 border-t border-white/10"
                      >
                        <p className="text-amber-400 text-xs font-black uppercase tracking-widest mb-1">Recited together</p>
                        <p className="text-emerald-100/50 text-xs leading-relaxed">
                          During school outreach visits, our teams lead students in group recitations, creating energetic, collective moments of motivation and shared African identity.
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── WHY EDUCATION ── */}
              {activeTab === "reasons" && (
                <motion.div key="reasons" variants={tabVariants} initial="hidden" animate="visible" exit="exit">
                  <div className="mb-5">
                    <p className="text-sm font-black text-zinc-800 dark:text-white mb-1"
                      style={{ fontFamily: "'Playfair Display', serif" }}>
                      12 Reasons Why Education Matters
                    </p>
                    <p className="text-xs text-zinc-400 dark:text-emerald-600">
                      Printed in every notebook and recited with students
                    </p>
                  </div>

                  <div className="grid grid-cols-1 h-72 overflow-auto gap-2 mb-5">
                    {EDUCATION_REASONS.map((reason, i) => (
                      <motion.div
                        key={i}
                        custom={i} variants={featureCardVariants}
                        initial="hidden" animate="visible"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl border border-zinc-100 dark:border-emerald-900/30 bg-white dark:bg-white/[0.02] hover:border-emerald-200 dark:hover:border-emerald-800/50 transition-all group"
                      >
                        <span className="w-6 h-6 rounded-full bg-[#064e3b]/10 dark:bg-emerald-900/40 text-[#064e3b] dark:text-emerald-400 text-[10px] font-black flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <p className="text-sm text-zinc-700 dark:text-emerald-100/70 font-medium group-hover:text-[#064e3b] dark:group-hover:text-emerald-400 transition-colors">
                          {reason}
                        </p>
                        <CheckCircle2 size={14} className="ml-auto text-zinc-200 dark:text-emerald-900/60 group-hover:text-emerald-500 transition-colors shrink-0" strokeWidth={2} />
                      </motion.div>
                    ))}
                  </div>

                  {/* Bonus reason */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    className="relative rounded-2xl overflow-hidden p-5"
                    style={{ background: "linear-gradient(135deg, #064e3b, #052e20)" }}
                  >
                    <div className="absolute inset-0 opacity-[0.05]"
                      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
                    />
                    <div className="relative z-10 flex items-start gap-3">
                      <span className="px-2 py-1 rounded-lg bg-amber-400 text-black text-[9px] font-black uppercase tracking-wide shrink-0">
                        BONUS
                      </span>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-1">Reason 13</p>
                        <p className="text-white text-sm font-bold leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                          {BONUS_REASON}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

            </AnimatePresence>

            {/* CTA */}
            <motion.div
              custom={4} variants={fadeUpVariants}
              initial="hidden" animate={isInView ? "visible" : "hidden"}
              className="mt-10 pt-8 border-t border-zinc-100 dark:border-emerald-900/30 flex flex-col sm:flex-row gap-3"
            >
              <motion.a
                href="/donate"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 flex items-center justify-between bg-[#064e3b] hover:bg-emerald-800 text-white px-6 py-4 rounded-2xl font-black text-sm shadow-lg shadow-emerald-900/20 group transition-colors"
              >
                <span>Sponsor a Notebook</span>
                <span className="bg-amber-400 text-black rounded-full p-1.5 group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight size={14} strokeWidth={3} />
                </span>
              </motion.a>
              <motion.a
                href="/partner"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 flex items-center justify-between border-2 border-zinc-200 dark:border-emerald-800/50 hover:border-[#064e3b] dark:hover:border-emerald-500 text-zinc-700 dark:text-emerald-300 px-6 py-4 rounded-2xl font-black text-sm group transition-all"
              >
                <span>Partner With Us</span>
                <ChevronRightIcon />
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* ── BOTTOM STATS STRIP ── */}
        <motion.div
          custom={5} variants={fadeUpVariants}
          initial="hidden" animate={isInView ? "visible" : "hidden"}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { num: "50,000+", label: "Notebooks Distributed", icon: "📓" },
            { num: "120+",    label: "Schools Reached",       icon: "🏫" },
            { num: "38",      label: "Communities Served",    icon: "🌍" },
            { num: "100%",    label: "Free to Students",      icon: "🎁" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              custom={i} variants={fadeUpVariants}
              initial="hidden" animate={isInView ? "visible" : "hidden"}
              className="relative p-6 rounded-2xl border border-zinc-100 dark:border-emerald-900/30 bg-white dark:bg-white/[0.02] text-center group hover:border-emerald-200 dark:hover:border-emerald-800/60 hover:shadow-sm transition-all"
            >
              <span className="text-2xl mb-3 block">{stat.icon}</span>
              <p
                className="text-3xl font-black text-zinc-900 dark:text-white mb-1 group-hover:text-[#064e3b] dark:group-hover:text-emerald-400 transition-colors"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {stat.num}
              </p>
              <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-emerald-600">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

/* tiny inline icon to avoid import clutter */
function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform duration-200">
      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}