"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const content = {
  mission: {
    title: "Passionate For Humanity",
    description: "We envision an Africa where village and city children share the same opportunities; where no dream is limited by geography, and rural and urban communities grow together as equal partners in sustainable development and innovation.",
    extra: "In a united Africa, once-forgotten rural communities become birthplaces of presidents, CEOs, professors, prophets, and innovators — building a continent where rural and urban worlds rise together.",    
    img: "/africa.jpg", // Replace with your image path
  },
  vision: {
    title: "Building the Future",
    description: "Our vision is to create scalable systems that empower local leaders to transform their own communities through education, technology, and sustainable resource management.",
    extra: "By 2030, we aim to have established 500 self-sustaining hubs across the continent, bridging the digital and economic divide permanently.",
    img: "/Afircan.png", // Replace with your image path
  }
};

export default function MisVis() {
  const [activeTab, setActiveTab] = useState<"mission" | "vision">("mission");

  // Auto-switch every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev === "mission" ? "vision" : "mission"));
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const current = content[activeTab];

  return (
    <section className="py-20 bg-[#F9FBFA] dark:bg-[#041d14] transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="bg-white/50 dark:bg-white/5 rounded-[2.5rem] p-8 lg:p-16 shadow-sm border border-emerald-100/20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side: Content */}
            <div className="order-2 lg:order-1">
              {/* Tab Switcher */}
              <div className="flex gap-4 mb-10">
                {(["mission", "vision"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-8 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                      activeTab === tab
                        ? "bg-[#064e3b] text-white shadow-lg shadow-emerald-900/20"
                        : "bg-white dark:bg-emerald-900/10 text-zinc-500 dark:text-emerald-400/60 hover:bg-emerald-50"
                    }`}
                  >
                    Our {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Text Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white mb-8 tracking-tight">
                    {current.title}
                  </h2>
                  <div className="space-y-6 text-zinc-600 dark:text-emerald-100/70 leading-relaxed text-lg">
                    <p>{current.description}</p>
                    <p className="text-base opacity-80">{current.extra}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-12 flex items-center gap-3 bg-[#064e3b] text-white px-8 py-4 rounded-full font-bold transition-all shadow-xl shadow-emerald-900/20 group"
              >
                Donate now
                <div className="bg-amber-400 text-black rounded-full p-1 group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight size={18} strokeWidth={3} />
                </div>
              </motion.button>
            </div>

            {/* Right Side: Single Image */}
            <div className="order-1 lg:order-2">
              <div className="relative h-[550px]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeTab}
                    src={current.img}
                    alt={activeTab}
                    className="absolute rounded-2xl inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                  />
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}