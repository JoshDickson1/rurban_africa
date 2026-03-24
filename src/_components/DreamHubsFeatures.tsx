"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, easeInOut } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

/* ══════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════ */
const FEATURES = [
  {
    num:   "01",
    title: "Interactive Learning Zones",
    highlight: "hands-on activities",
    body:  "Equipped with child-friendly spaces for hands-on activities, these zones host sessions from our 10-guide series on rural-urban connections. Kids engage in fun quizzes, group discussions, and creative projects that make learning exciting and relevant, turning abstract concepts like building bridges into tangible experiences.",
  },
  {
    num:   "02",
    title: "Digital and Tech Integration",
    highlight: "solar-powered devices",
    body:  "We provide solar-powered devices, tablets, and basic digital hubs for online resources, virtual mentorship, and skill-building. This feature ensures rural youth are not left behind in the digital age, while blending it with traditional knowledge.",
  },
  {
    num:   "03",
    title: "Teacher Training & Mentorship Corners",
    highlight: "professional development",
    body:  "We have dedicated areas for professional development workshops to equip educators with pedagogical skills, classroom management tools, and strategies to instil self-belief in students. Teachers can access resources, collaborate on lesson plans, and receive mentorship.",
  },
  {
    num:   "04",
    title: "Scholarship & Career Guidance Support",
    highlight: "dream-mapping exercises",
    body:  "The Hubs facilitate our educational scholarships by offering application assistance and tracking for recipients. Career corners include displays of African success stories, dream-mapping exercises tied to our Pledge Notebooks, and guest sessions from urban professionals.",
  },
  {
    num:   "05",
    title: "Community Engagement & Wellness Spaces",
    highlight: "cultural corners",
    body:  "Open to families and locals, the areas host events on personal hygiene, nutrition, and community pride. Safe play zones promote physical and mental well-being, while cultural corners celebrate African heritage through storytelling, art, and music.",
  },
  {
    num:   "06",
    title: "Sustainable Infrastructure Upgrades",
    highlight: "eco-friendly designs",
    body:  "We prioritise eco-friendly designs: solar energy, rainwater harvesting, and low-cost materials sourced locally. Hubs include upgraded facilities like libraries, sanitation blocks, and green spaces ensuring safety, accessibility, and long-term viability.",
  },
  {
    num:   "07",
    title: "Monitoring and Impact Tools",
    highlight: "real-time reports",
    body:  "Our hubs have built-in feedback systems to track progress through metrics like student engagement, pledge recitations, and dream-sharing sessions. Partners can access real-time reports, ensuring transparency and continuous improvement.",
  },
];

/* ══════════════════════════════════════════════════
   HELPERS — highlight keyword in amber
══════════════════════════════════════════════════ */
function HighlightedBody({ text, keyword }: { text: string; keyword: string }) {
  const parts = text.split(keyword);
  return (
    <p className="text-zinc-500 dark:text-emerald-100/50 text-sm leading-[1.9]">
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <span className="text-amber-400 font-semibold">{keyword}</span>
          )}
        </span>
      ))}
    </p>
  );
}

/* ══════════════════════════════════════════════════
   HUB IMAGES — replace with your actual file paths
══════════════════════════════════════════════════ */
const HUB_IMAGES = [
  "/dream-feat1.jpg",
  "/dream-feat2.jpg",
  "/dream-feat3.jpg",
  "/dream-feat4.jpg",
  "/dream-feat5.jpg",
  "/dream-feat6.jpg",
];

/* ══════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════ */
export default function DreamHubsFeatures() {
  const [active, setActive]     = useState(0);
  const [dir, setDir]           = useState(1);
  const [imgIndex, setImgIndex] = useState(0);
  const [imgDir,   setImgDir]   = useState(1);
  const headerRef               = useRef<HTMLDivElement>(null);
  const headerInView            = useInView(headerRef, { once: true, margin: "-60px" });

  // Auto-advance every 3.5 s
  useEffect(() => {
    const t = setInterval(() => {
      setImgDir(1);
      setImgIndex((i) => (i + 1) % HUB_IMAGES.length);
    }, 10000);
    return () => clearInterval(t);
  }, []);

  const goImg = (next: number) => {
    const n = (next + HUB_IMAGES.length) % HUB_IMAGES.length;
    setImgDir(n > imgIndex ? 1 : -1);
    setImgIndex(n);
  };

  const imgVariants = {
    enter:  (d: number) => ({ opacity: 0, x: d > 0 ? 30 : -30 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.55, ease: easeInOut } },
    exit:   (d: number) => ({ opacity: 0, x: d > 0 ? -30 : 30, transition: { duration: 0.35, ease: easeInOut } }),
  };

  const go = (next: number) => {
    setDir(next > active ? 1 : -1);
    setActive(next);
  };
  const prev = () => go(active === 0 ? FEATURES.length - 1 : active - 1);
  const next = () => go(active === FEATURES.length - 1 ? 0 : active + 1);

  const slideVariants = {
    enter: (d: number) => ({
      opacity: 0,
      x: d > 0 ? 40 : -40,
    }),
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (d: number) => ({
      opacity: 0,
      x: d > 0 ? -40 : 40,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section
      className="relative py-28 bg-[#F9FBFA] dark:bg-[#041d14] overflow-hidden transition-colors duration-700"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* BG atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-emerald-50/80 dark:bg-emerald-900/10 blur-[130px]" />
        <div className="absolute -bottom-48 right-1/4 w-[600px] h-[500px] rounded-full bg-zinc-100/60 dark:bg-emerald-950/30 blur-[120px]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.016] dark:opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-dhf" width="52" height="52" patternUnits="userSpaceOnUse">
              <path d="M 52 0 L 0 0 0 52" fill="none" stroke="#064e3b" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-dhf)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14">

        {/* ── HEADER ── */}
        <div ref={headerRef} className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em]
              text-emerald-600 dark:text-emerald-400
              bg-emerald-50 dark:bg-emerald-900/30
              border border-emerald-200 dark:border-emerald-800/50
              px-4 py-1.5 rounded-full mb-6"
          >
            What's Inside
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-[58px] font-black text-zinc-900 dark:text-white leading-[1.05] tracking-tight mb-5"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Key Features
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-zinc-500 dark:text-emerald-100/50 text-base leading-relaxed max-w-xl mx-auto"
          >
            Our Dream Hubs are thoughtfully designed to be inclusive, accessible, and impactful,
            incorporating feedback from communities, educators, and partners.
          </motion.p>
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid lg:grid-cols-[1fr_520px] gap-12 xl:gap-20 items-center">

          {/* LEFT: Slideshow */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:sticky lg:top-28"
          >
            {/* Image frame */}
            <div className="relative overflow-hidden rounded-2xl shadow-xl shadow-zinc-200/60 dark:shadow-black/40 h-[450px] bg-zinc-100 dark:bg-emerald-950">
              <AnimatePresence custom={imgDir} mode="wait">
                <motion.img
                  key={imgIndex}
                  src={HUB_IMAGES[imgIndex]}
                  alt={`Dream Hub ${imgIndex + 1}`}
                  custom={imgDir}
                  variants={imgVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#064e3b]/40 via-transparent to-transparent pointer-events-none" />

              {/* Prev / Next hit areas */}
              <button
                onClick={() => goImg(imgIndex - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full
                  bg-black/25 hover:bg-black/45 backdrop-blur-sm border border-white/15
                  flex items-center justify-center text-white transition-colors z-10"
              >
                <ChevronLeft size={16} strokeWidth={2.5} />
              </button>
              <button
                onClick={() => goImg(imgIndex + 1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full
                  bg-black/25 hover:bg-black/45 backdrop-blur-sm border border-white/15
                  flex items-center justify-center text-white transition-colors z-10"
              >
                <ChevronRight size={16} strokeWidth={2.5} />
              </button>

              {/* Counter */}
              <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full
                bg-black/30 backdrop-blur-sm border border-white/15
                text-white text-[11px] font-bold tabular-nums z-10">
                {imgIndex + 1} / {HUB_IMAGES.length}
              </div>

              {/* Dot indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                {HUB_IMAGES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goImg(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === imgIndex
                        ? "w-5 h-1.5 bg-amber-400"
                        : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Decorative ring */}
            <div className="absolute -top-4 -right-4 w-11 h-11 rounded-full border-[3px] border-amber-400/40 dark:border-amber-400/25 pointer-events-none" />
          </motion.div>

          {/* RIGHT: Slider */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >

            {/* Progress indicator */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[11px] font-black text-zinc-400 dark:text-emerald-700 tabular-nums">
                {String(active + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 h-px bg-zinc-200 dark:bg-emerald-900/40 relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-[#064e3b] dark:bg-emerald-500 rounded-full"
                  animate={{ width: `${((active + 1) / FEATURES.length) * 100}%` }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <span className="text-[11px] font-black text-zinc-300 dark:text-emerald-900 tabular-nums">
                {String(FEATURES.length).padStart(2, "0")}
              </span>
            </div>

            {/* Slide card */}
            <div className="relative overflow-hidden min-h-[280px]">
              <AnimatePresence custom={dir} mode="wait">
                <motion.div
                  key={active}
                  custom={dir}
                  // variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="bg-white dark:bg-[#071f12] rounded-2xl border border-zinc-100 dark:border-emerald-900/30 p-8"
                >
                  {/* Number + title */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#064e3b] flex items-center justify-center shrink-0 shadow-md shadow-emerald-900/20">
                      <span className="text-white font-black text-base"
                        style={{ fontFamily: "'Playfair Display', serif" }}>
                        {FEATURES[active].num}
                      </span>
                    </div>
                    <h3
                      className="font-black text-zinc-900 dark:text-white text-xl leading-snug pt-1"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {FEATURES[active].title}
                    </h3>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-zinc-100 dark:bg-emerald-900/30 mb-5" />

                  {/* Body with highlighted keyword */}
                  <HighlightedBody
                    text={FEATURES[active].body}
                    keyword={FEATURES[active].highlight}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">

              {/* Dot indicators */}
              <div className="flex items-center gap-1.5">
                {FEATURES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === active
                        ? "w-6 h-2 bg-[#064e3b] dark:bg-emerald-400"
                        : "w-2 h-2 bg-zinc-200 dark:bg-emerald-900/50 hover:bg-zinc-300 dark:hover:bg-emerald-800"
                    }`}
                  />
                ))}
              </div>

              {/* Prev / Next */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-zinc-200 dark:border-emerald-900/40
                    bg-white dark:bg-[#071f12]
                    hover:border-[#064e3b] dark:hover:border-emerald-600
                    hover:bg-zinc-50 dark:hover:bg-emerald-900/20
                    flex items-center justify-center
                    text-zinc-500 dark:text-emerald-400
                    hover:text-[#064e3b] dark:hover:text-emerald-300
                    transition-all duration-200 shadow-sm"
                >
                  <ChevronLeft size={16} strokeWidth={2.5} />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full
                    bg-[#064e3b] hover:bg-emerald-800
                    flex items-center justify-center
                    text-white
                    transition-colors duration-200 shadow-md shadow-emerald-900/20"
                >
                  <ChevronRight size={16} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-emerald-900/30">
              <motion.a
                href="/donate"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-[#064e3b] hover:bg-emerald-800
                  text-white px-7 py-4 rounded-full font-black text-sm group
                  transition-colors shadow-xl shadow-emerald-900/20"
              >
                Support a Dream Hub
                <span className="bg-amber-400 text-black rounded-full p-1.5 group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight size={14} strokeWidth={3} />
                </span>
              </motion.a>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}