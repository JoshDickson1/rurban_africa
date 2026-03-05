"use client";

import { motion, cubicBezier } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const programs = [
  {
    id: "01",
    title: "Communities & School Outreach",
    description:
      "Our outreach programs bring inspiration, tools, and opportunity directly to villages and classrooms across Nigeria and Africa.",
  },
  {
    id: "02",
    title: "Rurban Connect & Dream Series For Children",
    description:
      "This is a fun 10-guide series teaching children (ages 6-14) on how villages and cities connect and depend on each other and it empower Africa's next generation by showing them the bridges between rural roots and urban opportunities and helping them to dream big and value their heritage.",
  },
  {
    id: "03",
    title: "Community Empowerment & Skills",
    description:
      "Workshops on sustainable farming, digital tools, and leadership to build self-reliance and economic resilience.",
  },
  {
    id: "04",
    title: "Learning Facilities Development",
    description:
      "We partner with schools to upgrade classrooms, libraries, science labs, sanitation blocks, and safe play areas.",
  },
  {
    id: "05",
    title: "Advocacy & Partnerships",
    description:
      "We collaborate with NGOs, governments, and international partners to scale impact and attract investment for rural-urban equity.",
  },
  {
    id: "06",
    title: "Educational Scholarships",
    description:
      "No child's dream should be limited by economics. We provide financial support and mentorship to talented students from rural communities.",
  },
  {
    id: "07",
    title: "Teachers Training & Development",
    description:
      "Our teacher training equips educators with modern pedagogy, classroom management, and tools that inspire self-belief in students.",
  },
];

// Split into left (first 3-4) and right (remaining), center gets image
const left  = programs.slice(0, 4);
const right = programs.slice(4);

const fade = (delay = 0, x = 0, y = 16) => ({
  initial: { opacity: 0, x, y },
  whileInView: { opacity: 1, x: 0, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: cubicBezier(0.22, 1, 0.36, 1) },
});

export default function WhatWeDo() {
  return (
    <section className="relative py-24 md:py-32 bg-[#F9FBFA] dark:bg-[#032d20] transition-colors duration-700 overflow-hidden">


      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-300/10 blur-3xl rounded-full translate-x-1/3 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-300/8 blur-3xl rounded-full -translate-x-1/3 translate-y-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-14">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            {...fade(0, 0, 10)}
            className="inline-block text-amber-500 dark:text-amber-400 font-bold uppercase tracking-[0.28em] text-[10px] px-4 py-1.5 rounded-full border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-900/10 mb-5"
          >
            What We Do
          </motion.span>
          <motion.h2
            {...fade(0.1, 0, 20)}
            className="text-3xl md:text-4xl lg:text-5xl font-black text-stone-900 dark:text-white leading-[1.1] tracking-tight max-w-3xl mx-auto"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Targeted, high-impact programs that{" "}
            <span className="italic text-emerald-700 dark:text-emerald-400">
              bridge the rural-urban gap
            </span>
          </motion.h2>
        </div>

        {/* Three-column grid: programs | image | programs */}
        <div className="grid lg:grid-cols-[1fr_320px_1fr] gap-6 lg:gap-10 items-start">

          {/* LEFT programs */}
          <div className="flex flex-col gap-5">
            {left.map((p, i) => (
              <motion.div
                key={p.id}
                {...fade(i * 0.07, -20)}
                className="group flex gap-4 items-start p-5 rounded-2xl border border-stone-200 dark:border-emerald-800/40 bg-white dark:bg-emerald-950/10 hover:border-emerald-300 dark:hover:border-emerald-700/50 hover:shadow-md transition-all duration-300"
              >
                {/* Number badge */}
                <div className="shrink-0 w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800/40 flex items-center justify-center">
                  <span className="text-[11px] font-black text-emerald-700 dark:text-emerald-400 tracking-wide">
                    {p.id}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-black text-stone-900 dark:text-white mb-1.5 leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-[13px] text-stone-500 dark:text-stone-400 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CENTER: image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block sticky top-28"
          >
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-3 rounded-[2rem] border border-emerald-200/40 dark:border-emerald-700/20 pointer-events-none" />

              <div className="relative overflow-hidden rounded-[1.75rem] shadow-2xl shadow-emerald-950/20">
                <img
                  src="/africa.jpg"
                  alt="Rurban Africa school outreach"
                  className="w-full h-[600px] object-cover object-center"
                />
                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#064e3b]/70 via-transparent to-transparent" />

                {/* Floating caption */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
                      In the Field
                    </span>
                  </div>
                  <p className="text-white font-bold text-sm leading-snug">
                    Distributing books & resources at a community school outreach, Nigeria.
                  </p>
                </div>
              </div>

              {/* Floating stat badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="absolute -right-4 top-8 bg-white dark:bg-emerald-950 border border-stone-200 dark:border-emerald-800/40 rounded-2xl px-4 py-3 shadow-xl"
              >
                <p className="text-[10px] text-stone-400 dark:text-emerald-400/60 font-medium mb-0.5">Programs Running</p>
                <p className="text-2xl font-black text-stone-900 dark:text-white leading-none">7+</p>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT programs */}
          <div className="flex flex-col gap-5">
            {right.map((p, i) => (
              <motion.div
                key={p.id}
                {...fade(i * 0.07 + 0.1, 20)}
                className="group flex gap-4 items-start p-5 rounded-2xl border border-stone-200 dark:border-emerald-800/40 bg-white dark:bg-emerald-950/10 hover:border-emerald-300 dark:hover:border-emerald-700/50 hover:shadow-md transition-all duration-300"
              >
                <div className="shrink-0 w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800/40 flex items-center justify-center">
                  <span className="text-[11px] font-black text-emerald-700 dark:text-emerald-400 tracking-wide">
                    {p.id}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-black text-stone-900 dark:text-white mb-1.5 leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-[13px] text-stone-500 dark:text-stone-400 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Extra: mobile image (shows only on mobile) */}
            <motion.div
              {...fade(0.2)}
              className="lg:hidden overflow-hidden rounded-2xl shadow-xl mt-2"
            >
              <img
                src="/africa.jpg"
                alt="Rurban Africa school outreach"
                className="w-full h-64 object-cover object-center"
              />
            </motion.div>
          </div>
<div className="-mt-20">
        {/* CTA to join / sponsor outreaches */}
        <div className="max-w-3xl mt-20 text-left">
          <motion.h3
            {...fade(0.3)}
            className="text-sm text-stone-500 mb-6 leading-snug tracking-tight"
          >
            Join us in empowering rural communities and bridging the gap to opportunity.
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="shrink-0"
          >
            <Link
              to="/donate"
              className="group inline-flex items-center gap-3 bg-white text-[#064e3b] hover:text-white px-6 py-3 rounded-full font-bold text-sm tracking-wide hover:bg-amber-400 hover:text-black transition-all duration-300 shadow-lg"
            >
              Get Involved
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 group-hover:bg-emerald-900 text-white group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight size={13} strokeWidth={3} />
              </span>
            </Link>
          </motion.div>
        </div>  
      </div>
        </div>
      </div>

      
    </section>
  );
}