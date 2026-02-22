"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const FAQs = [
  {
    question: "What is a 'Dream Hub' exactly?",
    answer: "Dream Hubs are community-driven innovation centers located in underserved rural and peri-urban areas. They provide the infrastructure for digital literacy, vocational training, and entrepreneurial mentorship, serving as the bridge between local talent and global opportunities."
  },
  {
    question: "How can city-based professionals get involved?",
    answer: "Urban Partners can engage through our mentorship program, providing remote or in-person guidance to rural entrepreneurs, or by investing directly in community-led projects through our transparent funding platform."
  },
  {
    question: "Where do my donations go?",
    answer: "100% of public donations are channeled directly into project infrastructure and community programs. We utilize a transparent reporting system so donors can see exactly how their contributions are turning dreams into reality in pilot locations like Nigeria."
  },
  {
    question: "Are your programs specific to certain ages?",
    answer: "While we have a strong focus on K-12 education for children and youth, our Farmers and Women's Empowerment programs are designed for adults to foster immediate economic growth and household stability."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="relative py-24 md:py-32 bg-[#F9FBFA] dark:bg-[#041d14] transition-colors duration-700 overflow-hidden">

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-emerald-300/10 dark:bg-emerald-400/5 blur-3xl rounded-full -translate-x-1/3 translate-y-1/4 pointer-events-none" />

      <div className="mx-auto px-6 max-w-7xl lg:px-14">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 mb-4">
            <HelpCircle size={13} className="text-emerald-600 dark:text-emerald-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-400">
              Support Center
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-black text-stone-900 dark:text-white tracking-tight text-center"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Common{" "}
            <span className="text-emerald-700 dark:text-emerald-400 italic">Questions</span>
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* LEFT: FAQ accordion */}
          <div className="space-y-3">
            {FAQs.map((faq, index) => {
              const isActive = activeIndex === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.6 }}
                  className={`rounded-2xl border transition-all duration-500 ${
                    isActive
                      ? "bg-[#064e3b] border-emerald-800 shadow-xl shadow-emerald-950/20"
                      : "bg-white dark:bg-white/4 border-stone-200 dark:bg-emerald-800 dark:border-emerald-800 dark:border-white/8 hover:border-emerald-200 dark:hover:border-emerald-800/50"
                  }`}
                >
                  <button
                    onClick={() => setActiveIndex(isActive ? null : index)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                  >
                    <span className={`text-base font-bold leading-snug transition-colors duration-300 ${
                      isActive ? "text-amber-400" : "text-stone-900 dark:text-zinc-100"
                    }`}>
                      {faq.question}
                    </span>
                    <div className={`shrink-0 p-1.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-amber-400 text-black"
                        : "bg-emerald-50 dark:bg-emerald-900/70 text-emerald-700 dark:text-emerald-400"
                    }`}>
                      {isActive ? <Minus size={15} /> : <Plus size={15} />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 pt-2 text-emerald-100/70 leading-relaxed text-[15px] border-t border-white/8">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}

            {/* Footer CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="pt-4"
            >
              <p className="text-stone-400 dark:text-stone-500 text-sm mb-2">
                Still have questions about our mission?
              </p>
              <button className="text-emerald-700 dark:text-emerald-400 font-bold text-sm hover:underline underline-offset-4 transition-colors">
                Contact our team →
              </button>
            </motion.div>
          </div>

          {/* RIGHT: Images — hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex flex-col sticky top-28"
          >

            {/* Image 2 — inset right, overlapping */}
            <div className="relative  -mt-10 ml-10 border-4 border-[#F9FBFA] dark:border-[#041d14]">
              <img
                src="/README.png"
                alt="Youth education"
                className="w-full h-[500px] object-contain"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-[#064e3b]/50 to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md bg-white/80 dark:bg-black/50 border border-white/30 text-[11px] font-semibold text-stone-700 dark:text-stone-200">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Youth Education
              </div> */}
            </div>

            {/* Stat pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="-mt-[4.6rem] z-10 self-start flex items-center gap-4 bg-white dark:bg-white/5 border border-stone-200 dark:border-white/8 rounded-2xl px-5 py-4 shadow-md"
            >
              <div className="h-9 w-9 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
                <span className="text-base">🌍</span>
              </div>
              <div>
                <p className="text-[11px] text-stone-400 dark:text-stone-500 font-medium mb-0.5">Our reach</p>
                <p className="text-lg font-black text-stone-900 dark:text-white leading-none">5+ States · 500+ Lives</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}