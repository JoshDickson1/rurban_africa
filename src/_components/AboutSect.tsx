"use client";

import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Dot } from "lucide-react";

const AboutSect = () => {

  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  
  const leftInView = useInView(leftRef, { once: true, margin: "0px 0px -100px 0px" });
  const rightInView = useInView(rightRef, { once: true, margin: "0px 0px -100px 0px" });
  
  // Parallax and animation values
  const img1Y = useMotionValue(0);
  const img2Y = useMotionValue(0);
  const ballRotate = useMotionValue(0);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden bg-background py-24 md:py-32 lg:py-40`}
    >

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-14">

        {/* ── Section label ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col items-center gap-3"
        >
          <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] backdrop-blur-sm border-stone-200 bg-stone-100/50 text-stone-700 dark:text-white`}>
            <span className={`h-1.5 w-1.5 rounded-full bg-green-600 dark:text-white animate-pulse`} />
            Why Choose Us
          </span>
          {/* Decorative dividers */}
          <div className="flex items-center gap-2 opacity-60">
            <div className={`h-px w-10 bg-yellow-300`} />
            <div className={`h-1 w-1 rounded-full bg-green-400`} />
            <div className={`h-px w-10 bg-yellow-300`} />
          </div>
        </motion.div>

        {/* ── Heading ── */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className={`mb-16 text-center text-[clamp(2rem,5vw,3.6rem)] font-black leading-[1.05] tracking-tight text-stone-900 dark:text-white`}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Driven by Vision,{" "}
          <br className="hidden sm:block" />
          <span className={"italic text-green-700"}>
            Guided by Humanity.
          </span>
        </motion.h2>

        {/* ══════════ TWO-COLUMN GRID ══════════ */}
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">

          {/* ── LEFT: Images + Ball ── */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -40 }}
            animate={leftInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative"
          >
            {/* Accent vertical line */}
            <div className={`absolute -left-5 top-4 h-4/5 w-px bg-gradient-to-b to-transparent opacity-30 hidden lg:block`} />

            {/* Image stack */}
            <div className="relative justify-start">
              {/* Image 1 — top */}
              <motion.div
                style={{ y: img1Y }}
                className={`relative z-10 mr-10 overflow-hidden rounded-2xl border  shadow-2xl `}
              >
                <div className="absolute inset-0 z-10 bg-gradient-to-br from-green-900/10 to-transparent mix-blend-multiply" />
                <img
                  src={"/pledge.jpg"}
                  alt="Rurban Africa community"
                  className="h-64 w-full object-cover transition-transform duration-700 hover:scale-105 md:h-72"
                />
                {/* Caption badge */}
                <div className={`absolute bottom-3 left-3 z-20 flex items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur-md text-[11px] font-semibold border-stone-200 bg-stone-100/50 text-stone-700`}>
                  <span className={`h-1.5 w-1.5 rounded-full bg-green-600`} />
                  Community Outreach
                </div>
              </motion.div>

              {/* Image 2 — offset bottom */}
              <motion.div
                style={{ y: img2Y }}
                className={`relative z-10 -mt-8 ml-0 mr-0 overflow-hidden -ml-10 mr-10 mt-3 rounded-2xl border shadow-2xl  `}
              >
                <div className="absolute inset-0 z-10 bg-gradient-to-tl from-green-900/10 to-transparent mix-blend-multiply" />
                <img
                  src={"foot2.jpeg"}
                  alt="Rurban Africa youth program"
                  className="h-64 w-full object-cover transition-transform duration-700 hover:scale-105 md:h-80"
                />
                <div className={`absolute bottom-3 left-3 z-20 flex items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur-md text-[11px] font-semibold border-stone-200 bg-stone-100/50 text-stone-700`}>
                  <span className={`h-1.5 w-1.5 rounded-full bg-green-600`} />
                  Youth Education
                </div>
              </motion.div>

              {/* ── Stat badge floating top-right ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring", stiffness: 160 }}
                className={`absolute -right-4 top-6 z-30 rounded-2xl border p-4 backdrop-blur-md shadow-xl border-green-300 bg-green-100/80 text-green-900 flex flex-col items-center gap-1`}
              >
                <p className={`text-2xl font-black leading-none `}>2025</p>
                <p className={`text-[11px] font-medium `}>Founded</p>
              </motion.div>
            </div>

            {/* ── Stats row ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className={`mt-10 grid grid-cols-3 divide-x rounded-2xl border p-5  divide-zinc-800 divide-stone-200 backdrop-blur-sm`}
            >
              {[
                { n: "5+",    l: "States Reached" },
                { n: "500+",  l: "Lives Touched" },
                { n: "Pan‑African", l: "Non‑profit" },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-1 px-2 text-center">
                  <span className={`text-lg font-black leading-none `}>{s.n}</span>
                  <span className={`text-[11px] leading-tight `}>{s.l}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Copy ── */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, x: 40 }}
            animate={rightInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            {/* Big quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className={`mb-8 text-[clamp(1.2rem,2.5vw,1.6rem)] font-black leading-[1.25] tracking-tight text-green-700`}
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              "Our journey involves creating opportunities and turning{" "}
              <span className={`italic text-yellow-400`}>
                red-dust roads
              </span>{" "}
              into highways of progress for all."
            </motion.blockquote>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className={`mb-8 h-px w-16 origin-left bg-gradient-to-r from-green-600 to-transparent`}
            />

            {/* Body paragraphs */}
            {[
              "Rurban Africa, incorporated as Rurban Communities Support Foundation was born from a deep conviction that Africa's future depends on the unity between its rural communities and urban centers.",
              "Founded in 2025 as a Pan-African non-profit, we are dedicated to transforming rural and peri-urban communities into thriving, connected, and sustainable communities of opportunity. Too often, an invisible line separates villages from cities, limiting access to education, opportunity, and resources.",
              "We exist to replace that invisible line with a golden bridge of shared destiny and mutual prosperity.",
            ].map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.7 }}
                className={`mb-5 text-[15px] leading-[1.8] text-stone-700 dark:text-stone-300 `}
              >
                {p}
              </motion.p>
            ))}

            {/* Pillars row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="mb-10 flex flex-wrap gap-2"
            >
              {["Education", "Opportunity", "Sustainability", "Community", "Inclusion"].map((tag) => (
                <span
                  key={tag}
                  className={`rounded-lg border px-3 py-1 text-[12px] font-semibold tracking-wide border-green-300 bg-green-100 text-green-900`}
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.65, duration: 0.7 }}
            >
              <Link
                to="/about"
                className={`group inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-bold bg-[#015219] text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5`}
              >
                Learn More
                <span className={`flex h-7 w-7 items-center justify-center rounded-full transition-transform bg-yellow-500 group-hover:rotate-45 font-black`}>
                  <ArrowUpRight size={14} />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSect;