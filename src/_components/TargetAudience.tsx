"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Baby, Users, Sprout, Building2 } from "lucide-react";

const audiences = [
  { id: 1, title: "Children/Youth", icon: Baby, desc: "Rural school children and young adults, targeted for education and career development to foster growth and local leadership.", img: "/youth.png" },
  { id: 2, title: "Women and Girls", icon: Users, desc: "Empowered through gender-specific programs on hygiene, entrepreneurship, and rights, addressing disparities in access.", img: "/foot2.jpeg" },
  { id: 3, title: "Farmers & Communities", icon: Sprout, desc: "Supported in sustainable agriculture and market linkages to boost livelihoods and long-term food security.", img: "/foot3.jpeg" },
  { id: 4, title: "Urban Partners", icon: Building2, desc: "City-based professionals, businesses, and institutions engaged as mentors and investors to bridge the rural-urban divide.", img: "/foot4.jpeg" },
];

export default function TargetAudience() {
  const [index, setIndex] = useState(0);
  const duration = 5; // 10 seconds

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % audiences.length), duration * 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-[#062c1f] transition-colors duration-700">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-zinc-900 dark:text-white">Target Audience</h2>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Dynamic Image Stack */}
          <div className="space-y-6">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-xl bg-zinc-100 dark:bg-emerald-900/20">
              <AnimatePresence mode="wait">
                <motion.img
                  key={index}
                  src={audiences[index].img}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.6 }}
                />
              </AnimatePresence>
            </div>
            <p className="text-zinc-500 dark:text-emerald-200/60 text-sm leading-relaxed max-w-sm">
              Our primary beneficiaries are rural and peri-urban populations across Africa, with a focus on vulnerable groups.
            </p>
          </div>

          {/* Right: Interactive List */}
          <div className="space-y-4">
            {audiences.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setIndex(i)}
                className={`group relative overflow-x-hidden w-full flex gap-5 p-5 text-left rounded-2xl transition-all duration-300 ${
                  i === index ? "bg-emerald-50 dark:bg-emerald-900/30 ring-1 ring-emerald-200 dark:ring-emerald-700" : "hover:bg-zinc-50 dark:hover:bg-white/5"
                }`}
              >
                <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-zinc-200">
                  <img src={item.img} className={`h-full w-full object-cover transition-opacity ${i === index ? "opacity-100" : "opacity-40 grayscale"}`} />
                </div>

                <div className="flex flex-col">
                  <h4 className={`font-bold text-lg mb-1 transition-colors ${i === index ? "text-emerald-700 dark:text-emerald-400" : "text-zinc-900 dark:text-zinc-300"}`}>
                    {item.title}
                  </h4>
                  <p className={`text-sm leading-snug transition-opacity ${i === index ? "text-zinc-600 dark:text-emerald-100/80" : "text-zinc-400 dark:text-emerald-100/30 line-clamp-1"}`}>
                    {item.desc}
                  </p>
                </div>
                {i === index && (
                    <motion.div 
                      className="absolute rounded-b-full bottom-0 left-0 h-1 bg-emerald-500"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration, ease: "linear" }}
                      key={`progress-${i}`}
                    />
                  )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}