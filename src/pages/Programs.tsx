"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowUpRight, X, BookOpen, Laptop, GraduationCap,
  Heart, Users, Sprout, ExternalLink, CheckCircle2,
} from "lucide-react";
import PageHero from "@/_components/PageHero";
import WhatWeDo from "@/_components/WhatWeDo";

/* ══════════════════════════════════════════════════
   PROGRAM DATA
══════════════════════════════════════════════════ */
const PROGRAMS = [
  {
    id: "pledge-notebooks",
    icon: <BookOpen size={22} strokeWidth={1.6} />,
    tag: "Education",
    title: "Pledge Notebooks",
    subtitle: "50,000+ notebooks distributed free",
    summary: "A purpose-built notebook combining a daily pledge, academic tracker, and cultural affirmation tool for rural students across Nigeria.",
    image: "/programs/pledge-notebooks.jpg",
    highlight: "daily pledge",
    status: "Active",
    reach: "50,000+ students",
    locations: "6+ communities across Nigeria",
    partners: "120+ partner schools",
    details: {
      overview: "The Pledge Notebook is one of Rurban Africa's flagship tools for instilling self-belief, cultural pride, and academic discipline in rural students. Each notebook opens with the Rurban Africa Pledge, a declaration that reminds every child of their worth and potential, regardless of where they were born.",
      howItWorks: [
        "Students receive a free notebook at the start of each term through their school or Dream Hub",
        "Each notebook includes the full Rurban Africa Pledge, daily affirmations, and goal-setting pages",
        "Teachers use the notebooks as a classroom accountability and tracking tool",
        "Students record dreams, reflections, and progress throughout the academic year",
        "Community leaders and parents are included in pledge ceremonies at distribution events",
      ],
      impact: [
        "Over 50,000 notebooks distributed at no cost to recipients",
        "Measurable improvement in student self-confidence reported by teachers",
        "Used across 120+ schools in 6+ communities",
        "Tied directly to scholarship tracking and Dream Hub sessions",
      ],
      goals: "Scale to 200,000 notebooks annually and integrate into government school supply chains across three states.",
    },
  },
  {
    id: "dream-hubs",
    icon: <Laptop size={22} strokeWidth={1.6} />,
    tag: "Infrastructure",
    title: "Dream Hubs",
    subtitle: "Community learning centres built for impact",
    summary: "Vibrant, technology-enabled community centres that transform existing school or community spaces into hubs for learning, mentorship, and empowerment.",
    image: "/programs/dream-hubs.jpg",
    highlight: "technology-enabled",
    status: "Active",
    reach: "6+ communities",
    locations: "Pilot locations across Nigeria",
    partners: "Government bodies, NGOs, corporate sponsors",
    details: {
      overview: "Dream Hubs are the physical expression of Rurban Africa's mission. Each hub converts an underused community or school facility into a dynamic environment equipped with solar-powered devices, learning materials, wellness spaces, and mentorship corners. They are co-designed with local communities, which ensures ownership and longevity.",
      howItWorks: [
        "Rurban Africa partners with a local school or community to identify a suitable space",
        "The space is upgraded with solar power, devices, furniture, and signage",
        "Local facilitators are trained to run daily and weekly sessions",
        "Weekly programmes cover academics, digital literacy, career exploration, and wellness",
        "Community members, parents, and leaders are actively involved in governance of each hub",
      ],
      impact: [
        "6+ active and pilot hub locations across Nigeria",
        "Thousands of children and youth accessing structured learning outside school hours",
        "Teachers trained in professional development workshops at each hub",
        "Used as distribution points for Pledge Notebooks and scholarship applications",
      ],
      goals: "Establish 100 fully operational Dream Hubs across Nigeria by 2027, with expansion into two additional African countries.",
    },
  },
  {
    id: "scholarships",
    icon: <GraduationCap size={22} strokeWidth={1.6} />,
    tag: "Access",
    title: "Scholarship Programme",
    subtitle: "Removing the financial barrier to education",
    summary: "A structured scholarship scheme supporting rural students through secondary and tertiary education, paired with mentorship and career guidance.",
    image: "/programs/scholarships.jpg",
    highlight: "mentorship and career guidance",
    status: "Active",
    reach: "Growing cohort annually",
    locations: "Nigeria-wide",
    partners: "Corporate sponsors, individual donors",
    details: {
      overview: "Financial barriers are one of the leading causes of school dropout in rural Nigeria. The Rurban Africa Scholarship Programme identifies high-potential students from underserved communities and provides not just funding, but a full support system including mentors, career corners, and ongoing tracking through their Pledge Notebooks.",
      howItWorks: [
        "Students are nominated by teachers or community leaders through Dream Hubs",
        "Applications are reviewed by a selection panel including community representatives",
        "Scholarship recipients receive tuition support, school materials, and a Pledge Notebook",
        "Each student is matched with a mentor through our Young Professionals network",
        "Progress is tracked termly through the Dream Hub facilitator and school reports",
      ],
      impact: [
        "Multiple cohorts supported through secondary and into tertiary education",
        "Zero dropout rate among scholarship recipients in current cohorts",
        "Mentorship connections made with professionals in Lagos, Abuja, and the diaspora",
        "Scholarship recipients become ambassadors who return to their communities",
      ],
      goals: "Fund 500 full scholarships annually by 2026 and build an alumni network of rural-origin graduates who give back.",
    },
  },
  {
    id: "teacher-training",
    icon: <Users size={22} strokeWidth={1.6} />,
    tag: "Capacity",
    title: "Teacher Training",
    subtitle: "Equipping those who shape the next generation",
    summary: "Professional development workshops and mentorship support for teachers in rural and peri-urban schools, focused on pedagogy, classroom management, and student wellbeing.",
    image: "/programs/teacher-training.jpg",
    highlight: "Professional development",
    status: "Active",
    reach: "Hundreds of teachers trained",
    locations: "Dream Hub locations and partner schools",
    partners: "SUBEB, education NGOs, volunteer trainers",
    details: {
      overview: "The quality of a child's education is directly tied to the quality of their teacher. In rural Nigeria, teachers often work in under-resourced environments with little professional support. Rurban Africa's Teacher Training Programme brings structured development, peer learning, and mentorship to educators who are transforming lives every day.",
      howItWorks: [
        "Workshops are held at Dream Hubs and partner schools on a termly basis",
        "Facilitators include volunteer professionals, education specialists, and Rurban Africa staff",
        "Topics include child-centred pedagogy, trauma-informed teaching, digital tools, and self-belief strategies",
        "Teachers receive certificates of participation and access to a community of practice",
        "Follow-up visits and peer observation sessions support ongoing improvement",
      ],
      impact: [
        "Hundreds of teachers trained across Dream Hub locations",
        "Improved student engagement scores reported at trained-teacher schools",
        "Teachers report significantly higher confidence in using child-centred methods",
        "Training programme referenced by state education boards as a model",
      ],
      goals: "Train 2,000 teachers across five states by 2027 and integrate the programme into state SUBEB professional development frameworks.",
    },
  },
  {
    id: "wellness-community",
    icon: <Heart size={22} strokeWidth={1.6} />,
    tag: "Wellbeing",
    title: "Community Wellness",
    subtitle: "Healthy communities, thriving children",
    summary: "A series of community-based events and safe spaces addressing physical health, mental wellbeing, nutrition, hygiene, and cultural pride for families in rural areas.",
    image: "/programs/wellness.jpg",
    highlight: "cultural pride",
    status: "Active",
    reach: "Families across all hub locations",
    locations: "Dream Hub communities",
    partners: "Local health workers, NGOs, volunteers",
    details: {
      overview: "A child cannot learn well if they are hungry, unwell, or do not feel safe. The Community Wellness Programme extends Rurban Africa's reach beyond academic support to address the holistic needs of children and their families. Sessions are held at Dream Hubs and in community spaces, bringing together health workers, nutritionists, and cultural educators.",
      howItWorks: [
        "Monthly wellness days are held at Dream Hubs, open to all community members",
        "Topics rotate across nutrition, hygiene, mental health, community pride, and parenting support",
        "Local health workers and NGO partners are invited to lead specialist sessions",
        "Safe play zones for children run during adult sessions to maximise participation",
        "Cultural storytelling, art, and music sessions celebrate African heritage and identity",
      ],
      impact: [
        "Thousands of community members reached through wellness events",
        "Increased school attendance reported in communities with active wellness programming",
        "Positive feedback from parents on nutrition and hygiene awareness",
        "Cultural events credited with improving community cohesion and student pride",
      ],
      goals: "Establish a permanent Wellness Coordinator role at each Dream Hub and launch a community health ambassador programme.",
    },
  },
  {
    id: "rurban-pledge",
    icon: <Sprout size={22} strokeWidth={1.6} />,
    tag: "Identity",
    title: "The Rurban Africa Pledge",
    subtitle: "A declaration of worth, purpose, and possibility",
    summary: "A daily affirmation recited by students, teachers, and community members that anchors every Rurban Africa programme to a shared belief in African potential.",
    image: "/programs/pledge.jpg",
    highlight: "shared belief",
    status: "Core Programme",
    reach: "Every student we touch",
    locations: "All programmes and communities",
    partners: "Embedded in all Rurban Africa initiatives",
    details: {
      overview: "The Rurban Africa Pledge is not a programme in the conventional sense. It is the soul of everything we do. Written as a daily declaration of identity, purpose, and ambition, the Pledge is recited at Dream Hubs, printed in every Pledge Notebook, and spoken at every event. It affirms that rural origin is not a limitation and that Africa's children are worthy of the world's best.",
      howItWorks: [
        "The Pledge is printed on the inside cover of every Pledge Notebook",
        "Students and teachers recite it together at the start of each Dream Hub session",
        "Community pledge ceremonies are held at major events and hub launches",
        "The pledge is available in English and being translated into major Nigerian languages",
        "Pledge recitation is a central ritual of the Rurban Africa culture across all programmes",
      ],
      impact: [
        "Adopted by every student and teacher across all 6+ communities",
        "Cited by students as a source of daily motivation and self-belief",
        "Pledge ceremonies have become community bonding events attended by parents and leaders",
        "The Pledge embodies the mission: One Africa. Two Worlds. One Future.",
      ],
      goals: "Translate the Pledge into 10 African languages and make it freely available for any school or community organisation to adopt.",
    },
  },
];

/* ══════════════════════════════════════════════════
   DIALOG
══════════════════════════════════════════════════ */
function ProgramDialog({
  program,
  onClose,
}: {
  program: typeof PROGRAMS[0];
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full sm:max-w-2xl max-h-[92dvh] sm:max-h-[88vh]
          bg-white dark:bg-[#071f12]
          sm:rounded-3xl rounded-t-3xl
          border border-zinc-100 dark:border-emerald-900/30
          shadow-2xl shadow-black/30
          flex flex-col overflow-hidden"
      >
        {/* Top accent */}
        <div className="h-[2.5px] bg-gradient-to-r from-[#064e3b] via-emerald-400 to-amber-400 shrink-0" />

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1">

          {/* Header image area */}
          <div className="relative h-48 sm:h-56 bg-[#064e3b] overflow-hidden shrink-0">
            {program.image && (
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-full object-cover opacity-40"
              />
            )}
            {/* Grain */}
            <div className="absolute inset-0 opacity-[0.06]"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#064e3b]/80 to-transparent" />

            {/* Header content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <span className="inline-flex items-center text-[9px] font-black uppercase tracking-[0.22em]
                    text-amber-300 bg-amber-400/15 border border-amber-400/25
                    px-2.5 py-1 rounded-full mb-2">
                    {program.tag}
                  </span>
                  <h2
                    className="text-2xl sm:text-3xl font-black text-white leading-tight"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {program.title}
                  </h2>
                </div>
                <span className={`shrink-0 text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full border ${
                  program.status === "Core Programme"
                    ? "text-amber-300 bg-amber-400/15 border-amber-400/25"
                    : "text-emerald-300 bg-emerald-400/15 border-emerald-400/25"
                }`}>
                  {program.status}
                </span>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full
                bg-black/30 hover:bg-black/50
                flex items-center justify-center
                text-white transition-colors"
            >
              <X size={15} strokeWidth={2.5} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8">

            {/* Quick stats row */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: "Reach", val: program.reach },
                { label: "Locations", val: program.locations },
                { label: "Partners", val: program.partners },
              ].map((s) => (
                <div key={s.label}
                  className="bg-zinc-50 dark:bg-emerald-950/40
                    border border-zinc-100 dark:border-emerald-900/30
                    rounded-xl p-3 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em]
                    text-zinc-400 dark:text-emerald-700 mb-1">
                    {s.label}
                  </p>
                  <p className="text-[12px] font-bold text-zinc-800 dark:text-white leading-snug">
                    {s.val}
                  </p>
                </div>
              ))}
            </div>

            {/* Overview */}
            <div className="mb-6">
              <h3
                className="font-black text-zinc-900 dark:text-white text-base mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Overview
              </h3>
              <p className="text-zinc-500 dark:text-emerald-100/55 text-sm leading-[1.85]">
                {program.details.overview}
              </p>
            </div>

            <div className="h-px bg-zinc-100 dark:bg-emerald-900/30 mb-6" />

            {/* How it works */}
            <div className="mb-6">
              <h3
                className="font-black text-zinc-900 dark:text-white text-base mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                How It Works
              </h3>
              <ul className="space-y-2.5">
                {program.details.howItWorks.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#064e3b] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-white font-black text-[9px]">{i + 1}</span>
                    </span>
                    <p className="text-zinc-600 dark:text-emerald-100/60 text-sm leading-relaxed">{step}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-px bg-zinc-100 dark:bg-emerald-900/30 mb-6" />

            {/* Impact */}
            <div className="mb-6">
              <h3
                className="font-black text-zinc-900 dark:text-white text-base mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Impact So Far
              </h3>
              <ul className="space-y-2">
                {program.details.impact.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 size={14} className="text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-zinc-600 dark:text-emerald-100/60 text-sm leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-px bg-zinc-100 dark:bg-emerald-900/30 mb-6" />

            {/* Goals */}
            <div className="bg-emerald-50 dark:bg-emerald-900/20
              border border-emerald-100 dark:border-emerald-800/30
              rounded-2xl p-5 mb-6">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-500 mb-2">
                Goals
              </p>
              <p className="text-zinc-700 dark:text-emerald-100/70 text-sm leading-relaxed">
                {program.details.goals}
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-3">
              <motion.a
                href="/donate"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3
                  bg-[#064e3b] hover:bg-emerald-800
                  text-white px-6 py-3.5 rounded-full
                  font-black text-sm group
                  transition-colors shadow-lg shadow-emerald-900/15"
              >
                Support this programme
                <span className="bg-amber-400 text-black rounded-full p-1.5 group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight size={13} strokeWidth={3} />
                </span>
              </motion.a>
              <motion.a
                href="/partner"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5
                  border-2 border-zinc-200 dark:border-emerald-800/60
                  hover:border-[#064e3b] dark:hover:border-emerald-500
                  text-zinc-700 dark:text-emerald-300
                  px-6 py-3.5 rounded-full font-black text-sm transition-all"
              >
                Partner with us
              </motion.a>
            </div>

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   PROGRAM CARD
══════════════════════════════════════════════════ */
function ProgramCard({
  program,
  onOpen,
}: {
  program: typeof PROGRAMS[0];
  onOpen: () => void;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white dark:bg-[#071f12]
        border border-zinc-100 dark:border-emerald-900/30
        rounded-2xl overflow-hidden
        hover:border-emerald-200 dark:hover:border-emerald-700/40
        hover:shadow-xl hover:shadow-emerald-900/6
        transition-all duration-300 cursor-pointer"
      onClick={onOpen}
    >
      {/* Top accent bar */}
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.45, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="h-[2px] bg-gradient-to-r from-[#064e3b] to-emerald-400"
      />

      <div className="p-6">
        {/* Icon + tag row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-900/30
            flex items-center justify-center text-[#064e3b] dark:text-emerald-400
            group-hover:bg-[#064e3b] group-hover:text-white
            transition-all duration-250 shrink-0">
            {program.icon}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-black uppercase tracking-[0.2em]
              text-zinc-400 dark:text-emerald-700
              bg-zinc-50 dark:bg-emerald-950/40
              border border-zinc-100 dark:border-emerald-900/30
              px-2.5 py-1 rounded-full">
              {program.tag}
            </span>
            <span className={`text-[9px] font-black uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border ${
              program.status === "Core Programme"
                ? "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800/30"
                : "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/30"
            }`}>
              {program.status}
            </span>
          </div>
        </div>

        {/* Title + subtitle */}
        <h3
          className="font-black text-zinc-900 dark:text-white text-lg leading-snug mb-1
            group-hover:text-[#064e3b] dark:group-hover:text-emerald-400 transition-colors"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {program.title}
        </h3>
        <p className="text-[11px] font-bold uppercase tracking-[0.14em]
          text-zinc-400 dark:text-emerald-700 mb-3">
          {program.subtitle}
        </p>

        <div className="h-px bg-zinc-100 dark:bg-emerald-900/30 mb-4" />

        {/* Summary */}
        <p className="text-zinc-500 dark:text-emerald-100/50 text-[13px] leading-relaxed mb-5 line-clamp-3">
          {program.summary}
        </p>

        {/* Read more */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-zinc-400 dark:text-emerald-700">
            {program.reach}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[12px] font-black
            text-[#064e3b] dark:text-emerald-400
            group-hover:gap-2.5 transition-all duration-200">
            View details
            <ExternalLink size={12} strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════ */
export default function Programs() {
  const [selected, setSelected] = useState<typeof PROGRAMS[0] | null>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  return (
    <main
      className="bg-[#F9FBFA] dark:bg-[#041d14] min-h-screen transition-colors duration-700"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <PageHero
        tag="What We Do"
        title="Our"
        accentWord="Programmes"
        description="From Pledge Notebooks to Dream Hubs, every Rurban Africa programme is designed around a single conviction: that where you are born should not determine how far you go."
        crumbs={[{ label: "What We Do", to: "/what-we-do" }, { label: "Programmes" }]}
      />

      {/* ══ STATS STRIP ══ */}
      <div>
        <WhatWeDo />
      </div>

      {/* ══ PROGRAM GRID ══ */}
      {/* <section className="py-24">
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
              All Programmes
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-zinc-500 dark:text-emerald-100/45 text-sm max-w-md mx-auto"
            >
              Click any programme to explore full details, how it works, and the impact it is making.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROGRAMS.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                onOpen={() => setSelected(program)}
              />
            ))}
          </div>
        </div>
      </section> */}

      {/* ══ BOTTOM CTA ══ */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #064e3b 0%, #052e20 55%, #021a0e 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <div className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full bg-amber-400/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-300/50 mb-4">
              Make it possible
            </p>
            <h2
              className="text-3xl md:text-4xl font-black text-white leading-tight mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Every programme runs on
              <span className="block italic text-amber-400">belief and support.</span>
            </h2>
            <p className="text-emerald-100/60 text-sm leading-relaxed max-w-md">
              Our programmes are free to every child and community we serve. They exist because donors, partners, and volunteers choose to invest in Africa's next generation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
            <motion.a
              href="/donate"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-amber-400 hover:bg-amber-300
                text-black px-7 py-4 rounded-full font-black text-sm group
                transition-colors shadow-xl shadow-black/20"
            >
              Donate now
              <span className="bg-black/10 rounded-full p-1.5 group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight size={14} strokeWidth={3} />
              </span>
            </motion.a>
            <motion.a
              href="/partner"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3
                border-2 border-white/20 hover:border-white/40 hover:bg-white/5
                text-white px-7 py-4 rounded-full font-black text-sm transition-all"
            >
              Partner with us
            </motion.a>
          </div>
        </div>
      </section>

      {/* ══ DIALOG ══ */}
      <AnimatePresence>
        {selected && (
          <ProgramDialog
            program={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>

    </main>
  );
}