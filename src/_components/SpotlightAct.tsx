"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const content = {
  tag: "SPOTLIGHT ACTIVITY",
  title:
    "Rurban Africa Celebrates Africa Day 2026 with ESUT Primary and Secondary School, Agbani",
  img: "/africaday-11.jpg",
  description:
  `Rising Clean, Rising Strong: Education & Pride for Africa’s Future.`,
  extra: "See how Rurban Africa transformed Africa Day into a powerful movement of education, leadership, hygiene, and hope"
};

export default function SpotlightAct() {
  const navigate = useNavigate();

  return (
    <section className="pt-28 bg-[#F9FBFA] dark:bg-[#041d14] transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-18 items-center">
          {/* LEFT: Text */}
          <div className="order-2 lg:order-1 flex flex-col">
            {/* Main Content */}
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Eyebrow tag */}
                <span className="inline-block text-amber-500 dark:text-amber-400 font-bold uppercase tracking-[0.28em] text-[10px] px-4 py-1.5 rounded-full border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-900/10 mb-4">
                  {content.tag}
                </span>

                {/* Headline */}
                <h2
                  className="text-3xl md:text-4xl font-black text-stone-900 dark:text-white leading-[1.05] tracking-tight mb-5"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {content.title}
                </h2>

                {/* Body */}
                <div className="space-y-5 max-w-lg">
                  <p className="text-emerald-600 dark:text-emerald-100/70 leading-relaxed text-base">
                    {content.description}
                  </p><p className="text-zinc-400 dark:text-emerald-100/40 text-sm leading-relaxed">
                  {content.extra}
                </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Divider */}
            <div className="my-5 md:my-10 h-px bg-zinc-900/8 dark:bg-white/8" />

            {/* CTA */}
            <motion.button
              onClick={() =>
                navigate("/blogs/africa-day-2026-esut-agbani-enugu")
              }
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="self-start flex items-center gap-3 bg-[#064e3b] text-white px-7 py-3.5 rounded-full font-bold text-sm tracking-wide shadow-xl shadow-emerald-900/20 group"
            >
              Explore More
              <span className="bg-amber-400 text-black rounded-full p-1 group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight size={16} strokeWidth={3} />
              </span>
            </motion.button>
          </div>

          {/* RIGHT: Image */}
          <div className="order-1 lg:order-2">
            <div className="relative h-[400px] lg:h-[620px]">
              {/* Decorative offset ring */}
              <div className="absolute -top-4 -right-4 w-full h-full rounded-3xl pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.img
                  src={content.img}
                  alt={content.title}
                  className="absolute inset-0 w-auto h-full object-cover rounded-3xl"
                  initial={{ opacity: 0, scale: 1.06, filter: "blur(8px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
                  transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
