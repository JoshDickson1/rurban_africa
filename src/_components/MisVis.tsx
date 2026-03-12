"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const content = {
  mission: {
    tag: "Our Mission",
    title: "Passionate\nFor Humanity",
    img: "/africa.jpg",
    description:
      "We exists to erase the invisible line between rural and urban communities by building bridges of opportunity through community-led programs, education, skills development, and investment in underserved villages and peri-urban areas.",
    extra:
      "We empower communities to become self-reliant, digitally connected, and economically vibrant ensuring that every African regardless of location can realize their full potential and shape their own futures.",  
  },
  vision: {
    tag: "Our Vision",
    title: "Building\nthe Future",
    description:
      "We envision an Africa where village and city children share the same opportunities; where no dream is limited by geography, and rural and urban communities grow together as equal partners in sustainable development and innovation.",
    extra:
      "In a united Africa, once-forgotten rural communities become birthplaces of presidents, CEOs, professors, prophets, and innovators — building a continent where rural and urban worlds rise together.",
    img: "/Afircan.png",
  },
};

export default function MisVis() {
  const [activeTab, setActiveTab] = useState<"mission" | "vision">("mission");
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const DURATION = 30000;

  const startTimer = () => {
    setProgress(0);
    const start = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      if (elapsed >= DURATION) {
        setActiveTab((prev) => (prev === "mission" ? "vision" : "mission"));
        clearInterval(intervalRef.current!);
      }
    }, 50);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(intervalRef.current!);
  }, [activeTab]);

  const handleTabClick = (tab: "mission" | "vision") => {
    clearInterval(intervalRef.current!);
    setActiveTab(tab);
  };

  const current = content[activeTab];

  return (
    <section className="py-28 bg-[#F9FBFA] dark:bg-[#041d14] transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT: Text */}
          <div className="order-2 lg:order-1 flex flex-col">

            {/* Tab Pills */}
            <div className="flex gap-3 mb-12">
              {(["mission", "vision"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className="relative overflow-hidden group"
                >
                  <span
                    className={`
                      relative z-10 inline-flex items-center gap-2 px-6 py-2 rounded-sm text-sm font-semibold tracking-wide transition-all duration-300
                      ${activeTab === tab
                        ? "text-white"
                        : "text-zinc-400 dark:text-emerald-400/50 hover:text-zinc-700 dark:hover:text-emerald-300"
                      }
                    `}
                  >
                    {/* Active pill bg */}
                    {activeTab === tab && (
                      <motion.span
                        layoutId="pill-bg"
                        className="absolute inset-0 bg-[#064e3b] rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      />
                    )}
                    {/* Progress arc for active tab */}
                    {activeTab === tab && (
                      <svg className="w-3 h-3 shrink-0" viewBox="0 0 12 12">
                        <circle
                          cx="6" cy="6" r="4.5"
                          fill="none"
                          stroke="rgba(255,255,255,0.25)"
                          strokeWidth="1.5"
                        />
                        <circle
                          cx="6" cy="6" r="4.5"
                          fill="none"
                          stroke="#fcc022"
                          strokeWidth="1.5"
                          strokeDasharray={`${2 * Math.PI * 4.5}`}
                          strokeDashoffset={`${2 * Math.PI * 4.5 * (1 - progress / 100)}`}
                          strokeLinecap="round"
                          transform="rotate(-90 6 6)"
                          style={{ transition: "stroke-dashoffset 0.05s linear" }}
                        />
                      </svg>
                    )}
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </span>
                </button>
              ))}
            </div>

            {/* Main Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Eyebrow tag */}
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-4">
                  {current.tag}
                </p>

                {/* Headline */}
                <h2
                  className="text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white mb-10 leading-[1.05] tracking-tight whitespace-pre-line"
                  style={{ fontVariantLigatures: "none" }}
                >
                  {current.title}
                </h2>

                {/* Body */}
                <div className="space-y-5 max-w-lg">
                  <p className="text-zinc-600 dark:text-emerald-100/70 leading-relaxed text-base">
                    {current.description}
                  </p>
                  <p className="text-zinc-400 dark:text-emerald-100/40 text-sm leading-relaxed">
                    {current.extra}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Divider */}
            <div className="mt-12 mb-10 h-px bg-zinc-900/8 dark:bg-white/8" />

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="self-start flex items-center gap-3 bg-[#064e3b] text-white px-7 py-3.5 rounded-full font-bold text-sm tracking-wide shadow-xl shadow-emerald-900/20 group"
            >
              Donate Now
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
                  key={activeTab}
                  src={current.img}
                  alt={activeTab}
                  className="absolute inset-0 w-auto h-full object-cover rounded-3xl"
                  initial={{ opacity: 0, scale: 1.06, filter: "blur(8px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
                  transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
                />
              </AnimatePresence>

              {/* Subtle bottom fade into page bg */}
              <div className="absolute bottom-0 left-0 right-0 h-24 rounded-b-3xl bg-gradient-to-t from-[#F9FBFA] dark:from-[#041d14] to-transparent pointer-events-none" />

              {/* Floating stat badge */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab + "-badge"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="absolute bottom-8 left-6 bg-white/90 dark:bg-[#041d14]/90 backdrop-blur-md border border-emerald-100 dark:border-emerald-800/40 rounded-2xl px-5 py-3.5 shadow-lg"
                >
                  <p className="text-[10px] uppercase tracking-widest font-bold text-emerald-600 dark:text-emerald-400 mb-0.5">
                    {activeTab === "mission" ? "Communities Reached" : "Target by 2030"}
                  </p>
                  <p className="text-2xl font-black text-zinc-900 dark:text-white">
                    {activeTab === "mission" ? "12,400+" : "500 Hubs"}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}