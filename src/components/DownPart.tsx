"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Building2, MapPin, Hash } from "lucide-react";

export default function DownPart() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const videoRef              = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted,   setMuted]   = useState(false);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play();  setPlaying(true);  }
    else          { v.pause(); setPlaying(false); }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #064e3b 0%, #052e20 55%, #021a0e 100%)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.045] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
      />
      {/* Ambient glows */}
      <div className="absolute -top-40 left-1/4 w-[500px] h-[400px] rounded-full bg-emerald-400/10 blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-40 right-1/4 w-[400px] h-[400px] rounded-full bg-amber-400/5 blur-[110px] pointer-events-none" />
      {/* Grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.025] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dp-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#6ee7b7" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dp-grid)" />
      </svg>

      {/* ── VIDEO + COPY ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                border border-amber-400/30 bg-amber-400/10 text-amber-400
                text-[10px] font-bold uppercase tracking-[0.28em] mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              The Rurban Africa Pledge
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              One voice.{" "}
              <span className="italic text-amber-400">One Africa.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.13 }}
              className="text-emerald-100/65 text-[15px] leading-relaxed mb-8 max-w-md"
            >
              Every school visit ends the same way, every child on their feet, voices raised together, reciting the Rurban Africa Pledge. This is what belief sounds like when it is shared.
            </motion.p>

            <motion.blockquote
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="border-l-2 border-amber-400 pl-5 text-emerald-50/80 text-[15px] italic leading-relaxed"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              "Africa is rising, and I am rising with it."
            </motion.blockquote>
          </motion.div>

          {/* Right — video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Decorative rings */}
            <div className="absolute -inset-4 rounded-[2.4rem] border border-white/5 pointer-events-none" />
            <div className="absolute -inset-8 rounded-[3rem] border border-white/[0.03] pointer-events-none" />

            {/* Video card */}
            <div
              className="relative rounded-[2rem] overflow-hidden
                border border-white/10 shadow-2xl shadow-black/50
                bg-black/30 cursor-pointer group"
              style={{ aspectRatio: "16/9" }}
              onClick={togglePlay}
            >
              <video
                ref={videoRef}
                src="/reciting.mp4"
                className="w-full h-full object-cover"
                playsInline
                loop
                muted={muted}
                onEnded={() => setPlaying(false)}
              />

              {/* Paused overlay */}
              {!playing && (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                  style={{ background: "linear-gradient(160deg, rgba(6,78,59,0.55) 0%, rgba(2,26,14,0.72) 100%)" }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 rounded-full bg-amber-400 shadow-2xl shadow-amber-400/40
                      flex items-center justify-center"
                  >
                    <Play size={28} className="text-black ml-1" fill="black" />
                  </motion.div>
                  <p className="text-white/60 text-[11px] font-bold uppercase tracking-[0.22em]">
                    Watch: Children reciting the Pledge
                  </p>
                </div>
              )}

              {/* Playing controls — hover reveal */}
              <div className={`absolute bottom-0 inset-x-0 px-4 py-3
                bg-gradient-to-t from-black/70 to-transparent
                flex items-center justify-between
                transition-opacity duration-200
                ${playing ? "opacity-0 group-hover:opacity-100" : "opacity-0"}`}
              >
                <button
                  onClick={togglePlay}
                  className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25
                    border border-white/20 flex items-center justify-center text-white transition-colors"
                >
                  <Pause size={13} fill="white" />
                </button>
                <button
                  onClick={toggleMute}
                  className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25
                    border border-white/20 flex items-center justify-center text-white transition-colors"
                >
                  {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                </button>
              </div>
            </div>

            {/* Amber dot */}
            <span className="absolute -bottom-3 -right-3 w-6 h-6 rounded-full bg-amber-400 shadow-lg shadow-amber-400/30" />
          </motion.div>
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      

    </section>
  );
}