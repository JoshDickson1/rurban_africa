"use client";

import { motion } from "framer-motion";
import { Music2, Users } from "lucide-react";

const fade = (delay = 0, y = 16) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay },
});

const stats = [
  { label: "Children", value: "1,450" },
  { label: "Youths",   value: "500" },
];

export default function DreamHubs() {
  return (
    <section className="relative py-24 md:py-32 bg-[#F9FBFA] dark:bg-[#041d14] transition-colors duration-700 overflow-hidden">

      {/* Ambient glow */}
      <div className="absolute top-1/2 right-0 -z-10 w-96 h-96 bg-emerald-300/10 dark:bg-emerald-400/5 blur-3xl rounded-full translate-x-1/3 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-14">

        {/* Section label */}
        <motion.div {...fade(0, 10)} className="flex flex-col items-center mb-16">
          <span className="text-amber-500 dark:text-amber-400 font-bold uppercase tracking-[0.28em] text-[10px] px-4 py-1.5 rounded-full border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-900/10 mb-4">
            Our Programs
          </span>
          <h2
            className="text-4xl md:text-5xl font-black text-stone-900 dark:text-white tracking-tight text-center"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Dream Hubs &{" "}
            <span className="text-emerald-700 dark:text-emerald-400 italic">Foundation</span>
          </h2>
        </motion.div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-[340px_1fr] gap-6 items-stretch">

          {/* LEFT: Foundation Song card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-[#064e3b] rounded-3xl p-8 flex flex-col gap-6 shadow-xl shadow-emerald-950/20 overflow-hidden"
          >
            {/* Decorative rings */}
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full border border-white/5" />
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border border-white/8" />

            {/* Icon badge */}
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center">
              <Music2 size={18} className="text-amber-400" />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-400 mb-2">
                Foundation Song
              </p>
              <h3
                className="text-xl font-black text-white leading-tight mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                "Amina Lele"
              </h3>
              <p className="text-emerald-100/65 text-[14px] leading-relaxed">
                We have adopted the song <span className="text-amber-400 font-semibold italic">"Amina Lele"</span>, a Congolese praise and thanksgiving song, as our official Foundation song. It is a song of praise and thanksgiving to God, celebrating His goodness, power, protection, and blessings in everyday life.
              </p>
            </div>

            <div className="mt-auto pt-4 border-t border-white/8">
              <p className="text-emerald-100/40 text-[12px] italic leading-relaxed">
                "We are grateful to God Almighty for the journey and impacts ahead."
              </p>
            </div>
          </motion.div>

          {/* RIGHT: Dream Hubs panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="bg-white dark:bg-emerald-950 border border-stone-200 dark:border-emerald-800 rounded-3xl p-8 lg:p-10 flex flex-col justify-between gap-8 shadow-sm"
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-400 mb-4">
                Dream Hubs Initiative
              </p>
              <p
                className="text-stone-700 dark:text-stone-200 text-lg lg:text-xl leading-relaxed font-medium mb-8"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Our Dream Hubs are innovative, community-driven centers designed to bridge the gap between rural roots and urban opportunities. These hubs serve as vibrant centers for learning, creativity, and empowerment in underserved rural and peri-urban areas across Africa.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-4">
                {stats.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40 rounded-2xl px-5 py-3.5"
                  >
                    <Users size={16} className="text-emerald-700 dark:text-emerald-400 shrink-0" />
                    <div>
                      <p className="text-xl font-black text-stone-900 dark:text-white leading-none">{value}</p>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 font-medium mt-0.5">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative bottom row */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-stone-100 dark:border-white/8">
              {["Digital Literacy", "Vocational Training", "Mentorship", "Entrepreneurship"].map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-semibold px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}