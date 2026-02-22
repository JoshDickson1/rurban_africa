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
    answer: "While we have a strong focus on K-12 education for Children and Youth, our Farmers and Women’s Empowerment programs are designed for adults to foster immediate economic growth and household stability."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="relative py-24 bg-white dark:bg-zinc-950 transition-colors duration-500 overflow-hidden">
      {/* Decorative background blur to match your brand style */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-emerald-50/50 dark:bg-emerald-900/5 blur-3xl rounded-full translate-x-1/3" />

      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 mb-6"
          >
            <HelpCircle size={14} className="text-emerald-600 dark:text-emerald-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
              Support Center
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tighter"
          >
            Common <span className="text-emerald-600 italic">Questions</span>
          </motion.h2>
        </div>

        <div className="space-y-4">
          {FAQs.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group rounded-[2rem] border transition-all duration-500 ${
                  isActive 
                  ? "bg-emerald-900 text-white border-emerald-800 shadow-xl shadow-emerald-900/20" 
                  : "bg-zinc-50 dark:bg-white/5 border-zinc-100 dark:border-white/10 hover:border-emerald-200 dark:hover:border-emerald-800"
                }`}
              >
                <button
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  className="w-full flex items-center justify-between p-8 text-left"
                >
                  <span className={`text-lg font-bold transition-colors duration-300 ${
                    isActive ? "text-amber-400" : "text-zinc-900 dark:text-zinc-100"
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-full transition-all duration-500 ${
                    isActive ? "bg-amber-400 text-black rotate-180" : "bg-white dark:bg-white/10 text-emerald-600"
                  }`}>
                    {isActive ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 text-emerald-50/70 leading-relaxed text-base md:text-lg border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Optional: Final CTA linked to your donation page */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">
            Still have questions about our mission?
          </p>
          <button className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline underline-offset-4">
            Contact our team →
          </button>
        </motion.div>
      </div>
    </section>
  );
}