"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { Link } from "react-router-dom";

export default function ImpactHeroImage() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-2xl bg-[#021a0e]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Full-bleed image ── */}
      <motion.div
        initial={{ opacity: 0, scale: 1.03 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl"
      >
        <img
          src="/Q1 milestone 2026.png"
          alt="Q1 2026 Milestone: Empowering Rural Futures"
          className="w-full block object-cover object-center"
          style={{ maxHeight: "400px" }}
        />

        {/* Top fade: blends with PageHero above */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/70 via-black/20 to-transparent pointer-events-none" />

        {/* Dark overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

        {/* ── Overlaid content ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 inset-x-0 z-10 px-6 lg:px-14 pb-3 md:pb-10 max-w-7xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">

            {/* Left: label + quote */}
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                border border-amber-400/40 bg-amber-400/15 text-amber-400
                text-[10px] font-black uppercase tracking-[0.28em] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Q1 2026 Milestone
              </span>
              <p
                className="text-white text-xl md:text-2xl font-black leading-snug max-w-md"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Empowering Rural Futures:
                <span className="italic text-amber-400"> one child at a time.</span>
              </p>
            </div>

            {/* Right: CTAs */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="/Rurban_Africa_pdf_Q1!.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2
                  bg-white/10 hover:bg-white/20 backdrop-blur-sm
                  border border-white/20 hover:border-white/40
                  text-white px-5 py-2.5 rounded-full
                  font-bold text-sm transition-all"
              >
                <Download size={13} strokeWidth={2.5} />
                Download PDF
              </a>
              <Link
                to="/donate"
                className="group inline-flex items-center gap-2
                  bg-amber-400 hover:bg-amber-300 text-black
                  px-5 py-2.5 rounded-full font-black text-sm
                  transition-colors shadow-lg shadow-black/30"
              >
                Support the mission
                <span className="bg-black/10 rounded-full p-1 group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight size={12} strokeWidth={3} />
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Stats strip below image ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/8 border-t -mb-8 border-white/8"
      >
        {[
          { value: "1,950+", label: "Bright Minds Reached",       sub: "Children directly inspired"        },
          { value: "3,000+", label: "Pledge Notebooks",           sub: "Distributed across communities"    },
          { value: "6",      label: "Communities Engaged",        sub: "Delta & Enugu States"              },
          { value: "6",      label: "Schools Visited",            sub: "Primary & secondary levels"        },
        ].map((s, i) => (
          <div
            key={i}
            className="px-6 py-6 flex flex-col gap-1 bg-[#021a0e] hover:bg-[#042a1a] transition-colors duration-200"
          >
            <span
              className="text-2xl md:text-3xl font-black text-white leading-none"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {s.value}
            </span>
            <span className="text-[11px] font-black text-amber-400 uppercase tracking-[0.15em]">
              {s.label}
            </span>
            <span className="text-[11px] text-emerald-100/35 leading-snug">
              {s.sub}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Bottom fade into page bg */}
      <div className="h-8 bg-gradient-to-b from-[#021a0e] to-[#041d14]" />
    </div>
  );
}