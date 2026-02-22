"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
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
      className="relative py-16 md:py-24 overflow-hidden bg-white dark:bg-zinc-950 transition-colors duration-500"
    >
        {/* Subtle noise texture */}
          <div className="absolute inset-0 bg-[url('public/africa.jpg')] opacity-10 pointer-events-none" 
                />
      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Smaller, more compact card */}
        <div className="relative bg-[#064e3b] rounded-[2.5rem] p-8 md:p-14 lg:p-16 overflow-visible shadow-2xl shadow-emerald-950/20">
          
          

          <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-center relative z-10">
            
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Centered Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="w-full flex justify-center lg:justify-start"
              >
                <span className="inline-block text-amber-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 bg-white/5 px-4 py-1 rounded-full border border-white/10">
                  At Rurban Africa
                </span>
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tighter mb-6 max-w-2xl"
              >
                Envisioning a continent where every child can <span className="text-amber-400 italic">dream big</span>.
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-emerald-50/60 text-base md:text-lg leading-relaxed max-w-xl mb-10"
              >
                Our Dream Hubs bridge the gap between rural roots and urban opportunities, 
                serving as vibrant ecosystems for learning and empowerment.
              </motion.p>

              <motion.button
                onClick={() => navigate("/donate")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-3 bg-amber-400 hover:bg-amber-300 text-white px-8 py-4 rounded-full font-bold text-base transition-all shadow-lg shadow-amber-900/20"
              >
                Contribute to the future
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>

            {/* Scaled-down Overflow Image */}
            <div className="hidden lg:block relative h-full">
              <motion.div 
                style={{ y }}
                className="absolute top-[-100px] right-[-64px] w-[450px] drop-shadow-[0_25px_25px_rgba(0,0,0,0.3)]"
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