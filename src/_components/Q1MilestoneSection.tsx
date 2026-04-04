"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Users, BookOpen, MapPin, School } from "lucide-react";
import { Link } from "react-router-dom";

const STATS = [
  {
    value: "1,950+",
    label: "Bright Minds Reached",
    sub: "Children directly inspired",
    icon: Users,
  },
  {
    value: "3,000+",
    label: "Pledge Notebooks",
    sub: "Distributed across communities",
    icon: BookOpen,
  },
  {
    value: "6",
    label: "Communities Engaged",
    sub: "Delta & Enugu States",
    icon: MapPin,
  },
  {
    value: "6",
    label: "Schools Visited",
    sub: "Primary & secondary levels",
    icon: School,
  },
];

export default function Q1MilestoneSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-0"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #064e3b 0%, #052e20 55%, #021a0e 100%)" }}
      >
        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.045] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
        />
        {/* Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="q1-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#6ee7b7" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#q1-grid)" />
        </svg>
        {/* Glows */}
        <div className="absolute -top-32 left-1/4 w-[500px] h-[400px] rounded-full bg-emerald-400/10 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-20 right-0 w-[400px] h-[300px] rounded-full bg-amber-400/5 blur-[100px] pointer-events-none" />

        {/* ── FLEX LAYOUT: content left | image right ── */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-stretch min-h-[520px]">

          {/* LEFT — headline + stats + CTAs */}
          <div className="flex-1 flex flex-col justify-center px-6 lg:pl-14 lg:pr-10 py-16 lg:py-20">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-7"
            >
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full
                border border-amber-400/30 bg-amber-400/10 text-amber-400
                text-[11px] font-black uppercase tracking-[0.3em]">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Q1 2026 Impact Update
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl lg:text-[54px] font-black text-white leading-[1.05] tracking-tight mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Q1 2026{" "}
              <span className="italic text-amber-400">Milestone</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.13 }}
              className="text-emerald-100/55 text-sm font-bold uppercase tracking-[0.22em] mb-10"
            >
              Empowering Rural Futures — Jan to Mar 2026
            </motion.p>

            {/* Stats — 2-col grid */}
            <div className="grid grid-cols-2 gap-3 mb-10 max-w-md">
              {STATS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.17 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    className="relative rounded-2xl border border-emerald-800 bg-white/5 backdrop-blur-sm px-5 py-5 overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.03] transition-colors duration-300 rounded-2xl" />
                    <div className="relative z-10">
                      <div className="w-8 h-8 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center mb-3">
                        <Icon size={14} className="text-emerald-400" />
                      </div>
                      <div
                        className="text-2xl md:text-3xl font-black text-white mb-0.5 leading-none"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        {s.value}
                      </div>
                      <div className="text-[11px] font-black text-amber-400 uppercase tracking-[0.14em] mb-0.5">
                        {s.label}
                      </div>
                      <div className="text-[10px] text-emerald-100/35 leading-snug">
                        {s.sub}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.46 }}
              className="flex flex-col sm:flex-row items-start gap-3"
            >
              <Link
                to="/impact"
                className="group inline-flex items-center gap-3
                  bg-amber-400 hover:bg-amber-300 text-black
                  px-7 py-3.5 rounded-full font-black text-sm
                  transition-colors shadow-xl shadow-black/20"
              >
                Read our latest update
                <span className="bg-emerald-900 rounded-full p-1.5 group-hover:rotate-45 transition-transform text-white duration-300">
                  <ArrowUpRight size={13} strokeWidth={3} />
                </span>
              </Link>
              <a
                href="/Rurban_Africa_pdf_Q1_.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2
                  border border-white/20 hover:border-white/40 hover:bg-white/5
                  text-white/80 hover:text-white
                  px-7 py-3.5 rounded-full font-black text-sm transition-all"
              >
                Download PDF
              </a>
            </motion.div>
          </div>

          {/* RIGHT — milestone image */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full lg:w-[48%] shrink-0 overflow-hidden
              min-h-[280px] lg:min-h-0"
          >
            <img
              src="/Q1 milestone 2026.png"
              alt="Q1 2026 Milestone — Empowering Rural Futures"
              className="w-full h-full object-cover object-center block"
            />

            {/* Left fade — blends into content on desktop */}
            <div className="hidden lg:block absolute inset-y-0 left-0 w-24
              bg-gradient-to-r from-[#052e20] to-transparent pointer-events-none" />

            {/* Top fade — blends on mobile (stacked) */}
            <div className="lg:hidden absolute top-0 inset-x-0 h-16
              bg-gradient-to-b from-[#052e20] to-transparent pointer-events-none" />

            {/* Bottom fade on mobile */}
            <div className="lg:hidden absolute bottom-0 inset-x-0 h-16
              bg-gradient-to-t from-[#021a0e] to-transparent pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}