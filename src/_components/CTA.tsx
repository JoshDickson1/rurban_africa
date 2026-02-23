"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={containerRef}
      className="relative py-16 md:py-24 overflow-hidden bg-[#F9FBFA] dark:bg-[#041d14] transition-colors duration-700"
    >
                  {/* Radial glow top-left */}
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative bg-[#064e3b] rounded-[2.5rem] p-8 md:p-14 lg:p-16 overflow-visible shadow-2xl shadow-emerald-950/30">

          {/* Subtle background texture using africa image */}
          <div
            className="absolute inset-0 rounded-[2.5rem] bg-cover bg-center opacity-[0.07] pointer-events-none"
            style={{ backgroundImage: "url('/africa.jpg')" }}
          />

          {/* Radial glow top-left */}
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-center relative z-10">

            {/* Left: Copy */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">

              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-block text-amber-400 font-bold uppercase tracking-[0.28em] text-[10px] mb-5 bg-white/5 px-4 py-1.5 rounded-full border border-white/10"
              >
                At Rurban Africa
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.7 }}
                className="text-3xl md:text-5xl font-black text-white leading-[1.08] tracking-tight mb-6 max-w-2xl"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Envisioning a continent where every child can{" "}
                <span className="text-amber-400 italic">dream big</span>.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="text-emerald-100/55 text-base md:text-lg leading-relaxed max-w-xl mb-10"
              >
                Our Dream Hubs bridge the gap between rural roots and urban opportunities,
                serving as vibrant ecosystems for learning and empowerment.
              </motion.p>

              <motion.button
                onClick={() => navigate("/donate")}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-3 bg-amber-400 hover:bg-amber-300 text-white px-8 py-4 rounded-full font-bold text-sm tracking-wide transition-all shadow-lg shadow-black/20"
              >
                Contribute to the future
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-900 group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight size={15} strokeWidth={3} />
                </span>
              </motion.button>
            </div>

            {/* Right: Overflow image */}
            <div className="hidden lg:block relative h-full">
              <motion.div
                style={{ y }}
                className="absolute top-[-110px] right-[-64px] w-[430px] drop-shadow-[0_30px_30px_rgba(0,0,0,0.35)]"
              >
                <img
                  src="/children.png"
                  alt="African Children"
                  className="w-full h-auto object-contain"
                />
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}