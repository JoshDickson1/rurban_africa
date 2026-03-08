"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, MapPin, TrendingDown, Users, Sprout, AlertTriangle, Globe } from "lucide-react";
import PageHero from "@/_components/PageHero";

const STATS = [
  { num: "70%",    label: "of Africa's population lives in rural areas" },
  { num: "60%",    label: "of out-of-school children are in rural regions" },
  { num: "2×",     label: "higher dropout rate in rural vs urban schools" },
  { num: "2050",   label: "Africa's youth population doubles by this year" },
];

const REASONS = [
  {
    icon: <TrendingDown size={20} strokeWidth={1.8} />,
    num: "01",
    title: "The education gap is sharpest at the margins",
    highlight: "rural children",
    body: "Rural children in sub-Saharan Africa are significantly less likely to complete secondary education than their urban peers. Overcrowded classrooms, teacher shortages, and a lack of learning materials compound daily. Without targeted intervention, this gap widens each year.",
  },
  {
    icon: <AlertTriangle size={20} strokeWidth={1.8} />,
    num: "02",
    title: "Poverty cycles begin and end in communities",
    highlight: "generational poverty",
    body: "Generational poverty is not inevitable, but it is self-reinforcing. When children grow up without access to quality education, skilled mentors, or exposure to opportunity, they inherit the same limited horizon as their parents. Breaking that cycle requires presence on the ground.",
  },
  {
    icon: <Users size={20} strokeWidth={1.8} />,
    num: "03",
    title: "Rural communities are Africa's largest untapped resource",
    highlight: "untapped potential",
    body: "Africa's rural youth represent untapped potential on a continental scale. These are not communities to be pitied, they are communities to be invested in. A child in Kogi State or Cross River carries the same capacity for greatness as one in Lagos or London. Geography should not determine destiny.",
  },
  {
    icon: <Globe size={20} strokeWidth={1.8} />,
    num: "04",
    title: "Urban Africa cannot rise while rural Africa is left behind",
    highlight: "One Africa",
    body: "One Africa cannot thrive when half of it is structurally excluded. The cities of Lagos, Nairobi, and Accra depend on the agricultural output, labour, and cultural richness of rural regions. True African development demands that both worlds grow together, not one at the expense of the other.",
  },
  {
    icon: <Sprout size={20} strokeWidth={1.8} />,
    num: "05",
    title: "Peri-urban communities are falling through the cracks",
    highlight: "invisible gap",
    body: "Peri-urban areas occupy an invisible gap, too close to cities to qualify for rural aid, yet too underserved to benefit from urban infrastructure. These communities grow rapidly and chaotically, and without deliberate attention, they become tomorrow's underclass.",
  },
  {
    icon: <MapPin size={20} strokeWidth={1.8} />,
    num: "06",
    title: "Change must be rooted where it matters most",
    highlight: "community-led",
    body: "Top-down development rarely sticks. Community-led transformation, co-created with the people it serves, builds ownership, trust, and longevity. That is why Rurban Africa embeds itself in communities, trains local leaders, and builds systems that outlast our presence.",
  },
];

/* ── Highlighted body text ── */
function HighBody({ text, keyword }: { text: string; keyword: string }) {
  const parts = text.split(keyword);
  return (
    <p className="text-zinc-500 dark:text-emerald-100/50 text-[14px] leading-[1.9]">
      {parts.map((p, i) => (
        <span key={i}>
          {p}
          {i < parts.length - 1 && <span className="text-amber-500 font-semibold">{keyword}</span>}
        </span>
      ))}
    </p>
  );
}

/* ── Reason card ── */
function ReasonCard({ r, i }: { r: typeof REASONS[0]; i: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white dark:bg-[#071f12]
        border border-zinc-100 dark:border-emerald-900/30
        rounded-2xl p-6 overflow-hidden
        hover:border-emerald-200 dark:hover:border-emerald-700/40
        hover:shadow-lg hover:shadow-emerald-900/5
        transition-all duration-300"
    >
      {/* Top bar draws in */}
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#064e3b] to-emerald-400"
      />

      <div className="flex items-start gap-4">
        {/* Number badge */}
        <div className="w-11 h-11 rounded-xl bg-[#064e3b] flex items-center justify-center shrink-0 shadow-md shadow-emerald-900/20">
          <span className="text-white font-black text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>{r.num}</span>
        </div>

        <div className="flex-1 min-w-0">
          {/* Title + icon */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3
              className="font-black text-zinc-900 dark:text-white text-[15px] leading-snug
                group-hover:text-[#064e3b] dark:group-hover:text-emerald-400 transition-colors"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {r.title}
            </h3>
            <span className="shrink-0 mt-0.5 text-zinc-200 dark:text-emerald-900/60
              group-hover:text-[#064e3b] dark:group-hover:text-emerald-500 transition-colors">
              {r.icon}
            </span>
          </div>
          <div className="h-px bg-zinc-100 dark:bg-emerald-900/30 mb-3" />
          <HighBody text={r.body} keyword={r.highlight} />
        </div>
      </div>
    </motion.div>
  );
}

const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as any },
  }),
};

export default function WhyRural() {
  const heroRef   = useRef<HTMLDivElement>(null);
  const heroView  = useInView(heroRef, { once: true });
  const statsRef  = useRef<HTMLDivElement>(null);
  const statsView = useInView(statsRef, { once: true, margin: "-60px" });
  const quoteRef  = useRef<HTMLDivElement>(null);
  const quoteView = useInView(quoteRef, { once: true, margin: "-60px" });

  return (
    <main
      className="bg-[#F9FBFA] dark:bg-[#041d14] min-h-screen transition-colors duration-700"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >

      {/* ══════════ HERO ══════════ */}
      <div className="">
        <PageHero
        tag="Our Focus"
        title="Why Rural &amp;"
        accentWord="Peri-Urban?"
        description="The story of Africa's future is being written in its villages, farming communities, and peri-urban fringes not only in its skyline cities. Rurban Africa exists because that story has for too long been written without those communities' voices."
        crumbs={[{ label: "Why Rural" }]}
      />
      </div>

      {/* ══════════ STATS STRIP ══════════ */}
      <section className="py-14 border-y border-zinc-100 dark:border-emerald-900/20 bg-white dark:bg-[#071f12]">
        <div ref={statsRef} className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 14 }}
                animate={statsView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <p className="text-4xl font-black text-zinc-900 dark:text-white mb-1.5"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  {s.num}
                </p>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400 dark:text-emerald-700 leading-snug">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SIX REASONS ══════════ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="text-center mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Six Reasons We Focus Here
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-zinc-500 dark:text-emerald-100/45 text-sm max-w-md mx-auto"
            >
              Not by accident, and not by default by deliberate, evidence-based choice.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {REASONS.map((r, i) => <ReasonCard key={r.num} r={r} i={i} />)}
          </div>
        </div>
      </section>

      {/* ══════════ PULL QUOTE / MANIFESTO ══════════ */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #064e3b 0%, #052e20 55%, #021a0e 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-emerald-400/8 blur-[120px] pointer-events-none" />

        <div ref={quoteRef} className="relative z-10 max-w-3xl mx-auto px-6 lg:px-14 text-center">
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={quoteView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-[2px] w-16 bg-amber-400/60 rounded-full mx-auto mb-10"
          />
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={quoteView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-4xl font-black italic text-white leading-[1.25] mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            "Rural is not a disadvantage.
            <span className="text-amber-400"> It is an address.</span>
            <span className="block mt-2 text-white/80"> And no address should limit a child's future."</span>
          </motion.blockquote>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={quoteView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.35 }}
            className="text-[11px] font-bold uppercase tracking-[0.26em] text-emerald-300/50 mb-10"
          >
            — Rurban Africa —
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 10 }}
            animate={quoteView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.45 }}
            href="/donate"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 bg-amber-400 hover:bg-amber-300
              text-black px-7 py-4 rounded-full font-black text-sm group
              transition-colors shadow-xl shadow-black/20"
          >
            Help us close the gap
            <span className="bg-black/10 rounded-full p-1.5 group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight size={14} strokeWidth={3} />
            </span>
          </motion.a>
        </div>
      </section>

    </main>
  );
}