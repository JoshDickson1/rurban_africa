"use client";

import { useRef } from "react";
import { motion, Variants, useInView } from "framer-motion";
import { ArrowUpRight, Globe } from "lucide-react";

/* ══════════════════════════════════════════════════
   VARIANTS
══════════════════════════════════════════════════ */
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.75, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const imageVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.96, y: 20 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
  },
};

const lineVariants: Variants = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] } },
};

/* ══════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════ */
export default function DreamHubsIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-28 bg-[#F9FBFA] dark:bg-[#0d503d] overflow-hidden transition-colors duration-700"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Background atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* TOP: light bright orb (light mode) / soft mint glow (dark mode) */}
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[760px] h-[480px] rounded-full
          bg-white/80 dark:bg-emerald-200/10 blur-[120px]" />
        {/* BOTTOM: warm amber tint (light) / deep forest shadow (dark) */}
        <div className="absolute -bottom-52 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full
          bg-amber-100/60 dark:bg-[#052e20]/80 blur-[130px]" />
        {/* Dot matrix */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.018] dark:opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots-dh" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.2" fill="#064e3b" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-dh)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14">
        <div className="grid lg:grid-cols-[1fr_480px] gap-16 xl:gap-24 items-center">

          {/* ══ LEFT: Text ══ */}
          <div>
            {/* Eyebrow */}
            <motion.span
              custom={0} variants={fadeUp}
              initial="hidden" animate={isInView ? "visible" : "hidden"}
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em]
                text-emerald-600 dark:text-emerald-200
                bg-emerald-50 dark:bg-white/10
                border border-emerald-200 dark:border-white/20
                px-4 py-1.5 rounded-full mb-7"
            >
              <Globe size={10} strokeWidth={3} />
              Our Flagship Programme
            </motion.span>

            {/* Heading */}
            <motion.h2
              custom={1} variants={fadeUp}
              initial="hidden" animate={isInView ? "visible" : "hidden"}
              className="text-5xl md:text-6xl lg:text-[68px] font-black text-zinc-900 dark:text-white leading-[1.0] tracking-tight mb-2"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Rurban Africa
            </motion.h2>
            <motion.h2
              custom={2} variants={fadeUp}
              initial="hidden" animate={isInView ? "visible" : "hidden"}
              className="text-5xl md:text-6xl lg:text-[68px] font-black italic text-emerald-700 dark:text-emerald-200 leading-[1.0] tracking-tight mb-8"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Dream Hubs
            </motion.h2>

            {/* Body copy */}
            <motion.p
              custom={3} variants={fadeUp}
              initial="hidden" animate={isInView ? "visible" : "hidden"}
              className="text-zinc-600 dark:text-emerald-50/80 text-base leading-[1.85] mb-5 max-w-[540px]"
            >
              At Rurban Africa, we envision a continent where every child, regardless of their location,
              can dream big and turn those dreams into reality. Our Dream Hubs are innovative,
              community-driven hubs designed to bridge the gap between rural roots and urban
              opportunities — vibrant centres for learning, creativity, and empowerment in underserved
              rural and peri-urban areas across Africa.
            </motion.p>
            <motion.p
              custom={4} variants={fadeUp}
              initial="hidden" animate={isInView ? "visible" : "hidden"}
              className="text-zinc-500 dark:text-emerald-100/60 text-base leading-[1.85] mb-10 max-w-[540px]"
            >
              Inspired by our core mission of{" "}
              <span className="font-bold text-zinc-700 dark:text-white">
                One Africa. Two Worlds. One Future.
              </span>
              , the Dream Hubs transform ordinary community or school-based facilities into dynamic
              environments where children, youth, teachers, and local leaders come together — blending
              hands-on education with cultural pride, innovation, and practical skills-building.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={5} variants={fadeUp}
              initial="hidden" animate={isInView ? "visible" : "hidden"}
              className="flex flex-wrap gap-3"
            >
              <motion.a
                href="/dream-hubs"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-[#064e3b] dark:bg-white dark:hover:bg-white/90 hover:bg-emerald-800 text-white dark:text-emerald-950 px-7 py-4 rounded-full font-black text-sm group transition-colors shadow-xl shadow-emerald-900/20 dark:shadow-black/20 backdrop-blur-sm"
              >
                Explore Dream Hubs
                <span className="bg-amber-400 text-black rounded-full p-1.5 group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight size={14} strokeWidth={3} />
                </span>
              </motion.a>
              <motion.a
                href="/donate"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3
                  border-2 border-zinc-200 dark:border-white/25
                  hover:border-[#064e3b] dark:hover:border-white/50
                  text-zinc-700 dark:text-white/90
                  px-7 py-4 rounded-full font-black text-sm transition-all"
              >
                Support a Hub
              </motion.a>
            </motion.div>
          </div>

          {/* ══ RIGHT: Image ══ */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            {/* Image — top-right and bottom-right corners rounded-2xl, left corners rounded-2xl too for clean look */}
            <div className="relative overflow-hidden rounded-l-2xl rounded-tr-2xl rounded-br-2xl shadow-2xl shadow-zinc-300/30 dark:shadow-black/40">
              <img
                src="/about101.png"
                alt="Children learning and engaging at Rurban Africa Dream Hubs"
                loading="lazy"
                className="w-full h-auto object-cover block"
              />
              {/* Subtle bottom gradient overlay so image bleeds nicely into section */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating stat badge — bottom-left of image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.75, y: 10 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-5 left-5 z-20
                bg-white dark:bg-[#0a3d2e]
                border border-emerald-100 dark:border-emerald-700/50
                rounded-2xl px-5 py-3
                shadow-xl shadow-emerald-900/15 dark:shadow-black/40
                flex items-center gap-3 whitespace-nowrap"
            >
              <span className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center shrink-0 text-base">
                🌍
              </span>
              <div>
                <p
                  className="text-xl font-black text-zinc-900 dark:text-white leading-none mb-0.5"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  38+
                </p>
                <p className="text-[10px] uppercase tracking-widest font-bold text-emerald-600 dark:text-emerald-300">
                  Communities Reached
                </p>
              </div>
            </motion.div>

            {/* Decorative amber ring — top-right corner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -top-4 -right-4 w-12 h-12 rounded-full border-4 border-amber-400/50 dark:border-amber-400/30 z-10 pointer-events-none"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}