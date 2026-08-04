"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  MapPin,
  TrendingDown,
  Users,
  AlertTriangle,
  Globe,
  Target,
  Eye,
  CheckCircle2,
  BookOpen,
  School,
  Activity,
} from "lucide-react";
import PageHero from "@/_components/PageHero";
import ImageSlider from "@/_components/ImageSlider.tsx";

const REASONS = [
  {
    icon: <Users size={20} strokeWidth={1.8} />,
    num: "01",
    title: "Reach",
    highlight: "life-changing love",
    body: "We create natural, relational opportunities to share the Gospel of Jesus Christ within our existing programs. Through personal conversations, testimonies, community outreaches, and values-driven events, we introduce people to the life-changing love of God.",
  },
  {
    icon: <TrendingDown size={20} strokeWidth={1.8} />,
    num: "02",
    title: "Disciple",
    highlight: "nurture",
    body: "We nurture new believers and interested participants through:",
    point: [
      {
        letter: "a",
        desc: "Regular teaching and mentorship sessions.",
      },
      {
        letter: "b",
        desc: "Purpose-discovery and leadership development.",
      },
      {
        letter: "c",
        desc: "Character formation based on timeless biblical values.",
      },
      {
        letter: "d",
        desc: "Integration with practical skills training (e.g., linking entrepreneurship with integrity and stewardship)",
      },
    ],
  },
  {
    icon: <AlertTriangle size={20} strokeWidth={1.8} />,
    num: "03",
    title: "Deploy",
    highlight: "empower",
    body: "We empower transformed individuals to serve their communities by:",
    point: [
      {
        letter: "a",
        desc: "Participating in Rurban Africa’s development projects.",
      },
      {
        letter: "b",
        desc: "Leading peer-to-peer initiatives.",
      },
      {
        letter: "c",
        desc: "Becoming role models and change agents in their schools, families, and villages.",
      },
    ],
  },
];

const ABOUT_CONTENT = {
  mission: {
    icon: <Target size={30} className="text-amber-500" />,
    title: "Our Mission",
    description: "To improve the quality of life in rural communities by:",
    items: [
      "Providing access to quality education.",
      "Promoting sustainable livelihoods.",
      "Developing future community leaders.",
      "Supporting health and well-being initiatives.",
      "Driving innovation through partnerships.",
    ],
  },

  vision: {
    icon: <Eye size={30} className="text-amber-500" />,
    title: "Our Vision",
    description:
      "A thriving Africa where every rural community has equal access to opportunities, education, and sustainable development.",
  },
};

const STEPS = [
  {
    num: "01",
    title: "Education",
    body: "Beyond academics, we help students dream big, build character, and discover purpose.",
    icon: BookOpen,
  },
  {
    num: "02",
    title: "WASH and Hygiene",
    body: "We link physical cleanliness with inner transformation (clean hands and pure hearts).",
    icon: Activity,
  },
  {
    num: "03",
    title: "Skills and Livelihood",
    body: "We combine vocational training with teachings on ethical business, hard work, and stewardship of resources.",
    icon: MapPin,
  },
  {
    num: "04",
    title: "Youth & Community Empowerment",
    body: "We run targeted sessions to empower children, youth and communities.",
    icon: School,
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
          {i < parts.length - 1 && (
            <span className="text-amber-500 font-semibold">{keyword}</span>
          )}
        </span>
      ))}
    </p>
  );
}

/* ── Reason card ── */
function ReasonCard({ r, i }: { r: (typeof REASONS)[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
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
          <span
            className="text-white font-black text-sm"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {r.num}
          </span>
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
            <span
              className="shrink-0 mt-0.5 text-zinc-200 dark:text-emerald-900/60
              group-hover:text-[#064e3b] dark:group-hover:text-emerald-500 transition-colors"
            >
              {r.icon}
            </span>
          </div>
          <div className="h-px bg-zinc-100 dark:bg-emerald-900/30 mb-3" />
          <HighBody text={r.body} keyword={r.highlight} />
          <div className="space-y-5 mb-8">
            <ul className="space-y-3 mb-6 pl-1">
              {r.point &&
                r.point.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-zinc-600 dark:text-emerald-100/60 text-[15px] leading-relaxed"
                  >
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    {item.desc}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1] as any,
    },
  }),
};

export default function GreatMission() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const stepsInView = useInView(stepsRef, { once: true, margin: "-60px" });
  const heroRef = useRef<HTMLDivElement>(null);
  const heroView = useInView(heroRef, { once: true });
  const statsRef = useRef<HTMLDivElement>(null);
  const statsView = useInView(statsRef, { once: true, margin: "-60px" });
  const quoteRef = useRef<HTMLDivElement>(null);
  const quoteView = useInView(quoteRef, { once: true, margin: "-60px" });
  const MissionIcon = ABOUT_CONTENT.mission.icon;
  const VisionIcon = ABOUT_CONTENT.vision.icon;
  const { mission, vision } = ABOUT_CONTENT;

  return (
    <main
      className="bg-[#F9FBFA] dark:bg-[#041d14] min-h-screen transition-colors duration-700"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ══════════ HERO ══════════ */}
      <div className="">
        <PageHero
          tag="The Great Mission"
          title="The Great Mission"
          subtitle="Value and Faith-Based Arm of  Rurban Communities Support Foundation"
          // accentWord="Value and Faith-Based Arm of  Rurban Communities Support Foundation"
          description="At Rurban Africa, we believe true and lasting transformation occurs when we address the whole person - spirit, soul, and body. The Great Mission is the dedicated values and faith-based arm of our foundation. It exists to deepen and sustain the impact of our development programs in education, WASH (Water, Sanitation and Hygiene), skills acquisition, livelihood support, and community empowerment through holistic discipleship."
          crumbs={[{ label: "The Great Mission" }]}
        />
      </div>

      {/* ══════════ Four REASONS ══════════ */}
      <section className="py-24">
        <div ref={sectionRef} className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="mx-auto max-w-6xl grid gap-8 mb-16 lg:grid-cols-2 scroll-mt-32" id='mission'>
            {/* Mission */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-emerald-100 dark:border-emerald-900/30 p-8"
            >
              <motion.span
                custom={0}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em]
                text-emerald-600 dark:text-emerald-200
                bg-emerald-50 dark:bg-white/10
                border border-emerald-200 dark:border-white/20
                px-4 py-1.5 rounded-full mb-7"
              >
                <Globe size={10} strokeWidth={3} />
                Who We Are
              </motion.span>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400/10">
                  {mission.icon}
                </div>

                <div>
                  {/*<p className="text-xs font-black uppercase tracking-[0.25em] text-amber-500">*/}
                  {/*  Who We Are*/}
                  {/*</p>*/}

                  <h2
                    className="mt-2 text-4xl font-bold text-[#064e3b] dark:text-white"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    {mission.title}
                  </h2>
                </div>
              </div>

              <p className="mb-8 text-zinc-600 dark:text-emerald-100/70 leading-8">
                {mission.description}
              </p>

              <ul className="space-y-4">
                {mission.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2
                      size={18}
                      className="mt-1 shrink-0 text-amber-500"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.article>

            {/* Vision */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              // className="rounded-3xl border border-emerald-100 dark:border-emerald-900/30 p-8"
              className="rounded-3xl bg-[#064e3b] p-10 text-white flex flex-col justify-center"
            >
              <div className="mb-10 flex h-24 w-24 items-center justify-center rounded-full bg-white/10">
                {vision.icon}
              </div>

              <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-400">
                Our Future
              </p>

              <h2
                className="mt-4 text-4xl font-bold"
                style={{
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                {vision.title}
              </h2>

              <p className="mt-8 text-lg leading-9 text-emerald-50/80">
                {vision.description}
              </p>
            </motion.article>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="text-center mb-16"
          >
            <h2
              className="text-3xl md:text-4xl font-black text-stone-900 dark:text-white tracking-tight mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Why{" "}
              <span className="italic text-emerald-700 dark:text-emerald-400">
                The Great Mission
              </span>
              ?
            </h2>
            <p className="text-stone-500 dark:text-stone-400 text-base max-w-xl mx-auto leading-relaxed">
              Development programs alone can change circumstances, but lasting
              change requires transformed hearts and renewed minds. Many
              challenges facing rural and peri-urban communities such as
              poverty, migration, family breakdown, corruption, and
              hopelessness, have both practical and moral/spiritual roots. The
              Great Mission addresses these deeper dimensions by integrating
              biblical principles of integrity, excellence, stewardship,
              service, unity, and purpose into everyday life and community
              development.
            </p>
          </motion.div>
          <ImageSlider
            images={[
              {
                src: "/core_value_outer.png",
                alt: "Rurban Africa Core Values — Cover",
              },
              {
                src: "/core_value_inner.png",
                alt: "Rurban Africa Core Values — Inner spread",
              },
            ]}
            className="p-8"
          />
          {/*<ImageSlider/>*/}
          <div className="text-center my-14 scroll-mt-32" id='corepillar'>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Our Core Pillars of The Great Mission
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {REASONS.map((r, i) => (
              <ReasonCard key={r.num} r={r} i={i} />
            ))}
          </div>
        </div>

        <div ref={stepsRef} className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="mx-auto max-w-7xl mt-16">
            <div className="mb-12">
              <motion.span
                custom={0}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em]
                text-emerald-600 dark:text-emerald-200
                bg-emerald-50 dark:bg-white/10
                border border-emerald-200 dark:border-white/20
                px-4 py-1.5 rounded-full mb-7"
              >
                <Globe size={10} strokeWidth={3} />
                Integration
              </motion.span>

              <h2
                className="text-3xl md:text-4xl font-black text-stone-900 dark:text-white tracking-tight mb-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                How The Great Mission{" "}
                <span className="italic text-emerald-700 dark:text-emerald-400">
                  Integrates{" "}
                </span>
                with Rurban Africa's Work
              </h2>

              <p className="text-stone-500 dark:text-stone-400 text-base max-w-xl mx-auto leading-relaxed text-center my-12">
                The Great Mission is not a separate project. It is an enhancing
                force that runs alongside and within all our programs:
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {STEPS.map((stat, i) => {
                const Icon = stat.icon;

                return (
                  <motion.article
                    key={stat.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.45,
                      delay: i * 0.08,
                    }}
                    className="group rounded-3xl border border-zinc-100 dark:border-emerald-900/30 bg-white dark:bg-[#081d12] p-7 transition-all hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="flex items-center justify-between mb-10">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400/10">
                        <Icon className="text-amber-500" size={28} />
                      </div>
                    </div>

                    <p className="mt-4 text-lg font-bold text-zinc-900 dark:text-white">
                      {stat.title}
                    </p>

                    <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-emerald-100/50">
                      {stat.body}
                    </p>
                  </motion.article>
                );
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="text-center my-16"
          >
            <p className="text-stone-500 dark:text-stone-400 text-base max-w-xl mx-auto leading-relaxed">
              Participation in The Great Mission activities is always voluntary,
              respectful of individual choice, and conducted with cultural
              sensitivity while remaining true to our Christian foundation.
            </p>
          </motion.div>
        </div>


      </section>

      {/*<section className="py-20 px-6 lg:px-10">*/}
      {/*  <div className="mx-auto max-w-7xl">*/}
      {/*    <div className="max-w-2xl mb-12">*/}
      {/*      <p className="text-sm font-black uppercase tracking-[0.25em] text-amber-500">*/}
      {/*        Our Impact*/}
      {/*      </p>*/}

      {/*      <h2*/}
      {/*        className="mt-3 text-4xl font-bold text-[#064e3b] dark:text-white"*/}
      {/*        style={{ fontFamily: "'Playfair Display', serif" }}*/}
      {/*      >*/}
      {/*        Numbers That Tell Our Story*/}
      {/*      </h2>*/}
      {/*    </div>*/}

      {/*    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">*/}
      {/*      {IMPACT_STATS.map((stat, i) => {*/}
      {/*        const Icon = stat.icon;*/}

      {/*        return (*/}
      {/*          <motion.article*/}
      {/*            key={stat.label}*/}
      {/*            initial={{ opacity: 0, y: 24 }}*/}
      {/*            whileInView={{ opacity: 1, y: 0 }}*/}
      {/*            viewport={{ once: true, amount: 0.2 }}*/}
      {/*            transition={{*/}
      {/*              duration: 0.45,*/}
      {/*              delay: i * 0.08,*/}
      {/*            }}*/}
      {/*            className="group rounded-3xl border border-zinc-100 dark:border-emerald-900/30 bg-white dark:bg-[#081d12] p-7 transition-all hover:-translate-y-1 hover:shadow-xl"*/}
      {/*          >*/}
      {/*            <div className="flex items-center justify-between mb-10">*/}
      {/*              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400/10">*/}
      {/*                <Icon className="text-amber-500" size={28} />*/}
      {/*              </div>*/}

      {/*              <span className="text-xs uppercase tracking-[0.2em] text-zinc-400">*/}
      {/*                Impact*/}
      {/*              </span>*/}
      {/*            </div>*/}

      {/*            <h3*/}
      {/*              className="text-5xl font-black text-[#064e3b] dark:text-white"*/}
      {/*              style={{ fontFamily: "'Playfair Display', serif" }}*/}
      {/*            >*/}
      {/*              {stat.value}*/}
      {/*            </h3>*/}

      {/*            <p className="mt-4 text-lg font-bold text-zinc-900 dark:text-white">*/}
      {/*              {stat.label}*/}
      {/*            </p>*/}

      {/*            <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-emerald-100/50">*/}
      {/*              {stat.description}*/}
      {/*            </p>*/}
      {/*          </motion.article>*/}
      {/*        );*/}
      {/*      })}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}

      {/* ══════════ PULL QUOTE / MANIFESTO ══════════ */}
      <section
        className="py-24 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #064e3b 0%, #052e20 55%, #021a0e 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-emerald-400/8 blur-[120px] pointer-events-none" />

        <div
          ref={quoteRef}
          className="relative z-10 max-w-3xl mx-auto px-6 lg:px-14 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={quoteView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-[2px] w-16 bg-amber-400/60 rounded-full mx-auto mb-10"
          />
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={quoteView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.75,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-lg md:text-xl font-black italic text-white leading-[1.25] mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Would you like to{' '}
            <span className="text-amber-400">
              volunteer, partner, or participate?
            </span>
            <span className="block mt-2 text-white/80">
              {" "}
              Reach out to us or visit our offices to learn how you can be part of this transformative journey.
            </span>
          </motion.blockquote>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={quoteView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.35 }}
            className="text-[11px] font-bold uppercase tracking-[0.26em] text-emerald-300/50 mb-10"
          >
            Bridging Rural and Urban Divides | Spirit, Soul, and Body
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
