"use client";

import { motion } from "framer-motion";
import { Music2, Play, Pause, RotateCcw, RotateCw } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const fade = (delay = 0, y = 16) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay },
});

/* ══════════════════════════════════════════════════
   MUSIC PLAYER
══════════════════════════════════════════════════ */
function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      if (!isDragging) setCurrentTime(audio.currentTime);
    };
    const onLoaded = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, [isDragging]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skip = (secs: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(Math.max(audio.currentTime + secs, 0), duration);
  };

  const formatTime = (t: number) => {
    if (!isFinite(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const seekFromEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = progressRef.current;
    const audio = audioRef.current;
    if (!bar || !audio) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    audio.currentTime = ratio * duration;
    setCurrentTime(ratio * duration);
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(6,78,59,0.18) 0%, rgba(6,78,59,0.06) 100%)",
        border: "1px solid rgba(6,78,59,0.18)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Hidden audio element — replace /amina-lele.mp3 with your actual file path */}
      <audio ref={audioRef} src="/anlele1.mp3" preload="metadata" />

      <div className="p-5">
        {/* Track info row */}
        <div className="flex md:flex-row flex-col items-start md:items-center gap-4 mb-6">
          {/* Album art placeholder */}
          <div className="flex flex-row items-center gap-3 mb-5">
            <div className="relative shrink-0 w-11 h-11 rounded-xl overflow-hidden"
            style={{ background: "linear-gradient(135deg, #064e3b, #0d9488)" }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Music2 size={18} className="text-amber-400" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-white font-black text-[13px] truncate tracking-wide"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Amina Lele
            </p>
            <p className="text-emerald-300/50 text-[11px] font-semibold uppercase tracking-[0.18em] truncate">
              Foundation Song · Congolese Praise
            </p>
          </div>
          </div>

          
        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          {/* Rewind 5s */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => skip(-5)}
            className="group relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            aria-label="Rewind 5 seconds"
          >
            <RotateCcw size={14} className="text-emerald-200/60 group-hover:text-white transition-colors" />
            <span className="absolute -bottom-0.5 text-[8px] font-black text-emerald-300/40 group-hover:text-amber-400/70 transition-colors leading-none">5</span>
          </motion.button>

          {/* Play / Pause */}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={togglePlay}
            className="relative w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
            style={{
              background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
              boxShadow: isPlaying
                ? "0 0 20px rgba(251,191,36,0.5), 0 4px 16px rgba(0,0,0,0.3)"
                : "0 4px 16px rgba(0,0,0,0.3)",
            }}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying
              ? <Pause size={18} className="text-white" strokeWidth={3} />
              : <Play size={18} className="text-white ml-0.5" strokeWidth={3} />
            }
          </motion.button>

          {/* Forward 5s */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => skip(5)}
            className="group relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            aria-label="Forward 5 seconds"
          >
            <RotateCw size={14} className="text-emerald-200/60 group-hover:text-white transition-colors" />
            <span className="absolute -bottom-0.5 text-[8px] font-black text-emerald-300/40 group-hover:text-amber-400/70 transition-colors leading-none">5</span>
          </motion.button>
        </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div
            ref={progressRef}
            className="relative h-1.5 rounded-full cursor-pointer group"
            style={{ background: "rgba(255,255,255,0.08)" }}
            onClick={seekFromEvent}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={(e) => { if (isDragging) seekFromEvent(e); }}
          >
            {/* Filled track */}
            <div
              className="absolute left-0 top-0 h-full rounded-full transition-all duration-100"
              style={{
                width: `${progressPercent}%`,
                background: "linear-gradient(90deg, #dfa406, #fbbf24)",
              }}
            />
            {/* Thumb */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-400 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `calc(${progressPercent}% - 6px)`, boxShadow: "0 0 8px rgba(251,191,36,0.6)" }}
            />
          </div>

          {/* Time labels */}
          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] font-bold text-emerald-300/50 tabular-nums">
              {formatTime(currentTime)}
            </span>
            <span className="text-[10px] font-bold text-emerald-300/50 tabular-nums">
              {formatTime(duration)}
            </span>
          </div>
        </div>

      </div>

      {/* Keyframes injected inline for spin + pulse */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.8); } }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   PAGE SECTION
══════════════════════════════════════════════════ */
export default function DreamHubs() {
  return (
    <section className="relative py-24 md:py-32 bg-[#F9FBFA] dark:bg-[#041d14] transition-colors duration-700 overflow-hidden">

      {/* Ambient glow */}
      <div className="absolute top-1/2 right-0 -z-10 w-96 h-96 bg-emerald-300/10 dark:bg-emerald-400/5 blur-3xl rounded-full translate-x-1/3 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-14">

        {/* Section label */}
        <motion.div {...fade(0, 10)} className="flex flex-col items-center mb-16">
          <span className="text-amber-500 dark:text-amber-400 font-bold uppercase tracking-[0.28em] text-[10px] px-4 py-1.5 rounded-full border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-900/10 mb-4">
            Our Programs
          </span>
          <h2
            className="text-4xl md:text-5xl font-black text-stone-900 dark:text-white tracking-tight text-center"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Dream Hubs &{" "}
            <span className="text-emerald-700 dark:text-emerald-400 italic">Foundation</span>
          </h2>
        </motion.div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-[340px_1fr] gap-6 items-stretch">

          {/* LEFT: Foundation Song card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-[#064e3b] rounded-3xl p-8 flex flex-col gap-6 shadow-xl shadow-emerald-950/20 overflow-hidden"
          >
            {/* Decorative rings */}
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full border border-white/5" />
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border border-white/8" />

            {/* Icon badge */}
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center">
              <Music2 size={18} className="text-amber-400" />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-400 mb-2">
                Foundation Song
              </p>
              <h3
                className="text-xl font-black text-white leading-tight mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                "Amina Lele"
              </h3>
              <p className="text-emerald-100/65 text-[14px] leading-relaxed">
                We have adopted the song <span className="text-amber-400 font-semibold italic">"Amina Lele"</span>, a Congolese praise and thanksgiving song, as our official Foundation song. It is a song of praise and thanksgiving to God, celebrating His goodness, power, protection, and blessings in everyday life.
              </p>
            </div>

            <div className="mt-auto pt-4 border-t border-white/8">
              <p className="text-emerald-100/40 text-[12px] italic leading-relaxed">
                "We are grateful to God Almighty for the journey and impacts ahead."
              </p>
            </div>
          </motion.div>

          {/* RIGHT: Dream Hubs panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="bg-emerald-950 border border-stone-200 dark:border-emerald-800 rounded-3xl p-8 lg:p-10 flex flex-col justify-between gap-8 shadow-sm"
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-400 mb-4">
                Dream Hubs Initiative
              </p>
              <p
                className="text-emerald-50/70 text-lg lg:text-xl leading-relaxed font-medium mb-8"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Our Dream Hubs are innovative, community-driven centers designed to bridge the gap between rural roots and urban opportunities. These hubs serve as vibrant centers for learning, creativity, and empowerment in underserved rural and peri-urban areas across Africa.
              </p>

              {/* Music Player */}
              <MusicPlayer />
            </div>

            {/* Decorative bottom row */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/8">
              {["Digital Literacy", "Vocational Training", "Mentorship", "Entrepreneurship"].map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-semibold px-3 py-1 rounded-lg bg-emerald-900/20 border border-emerald-800/40 text-emerald-800 dark:text-emerald-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}