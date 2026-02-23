"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Play, X, VolumeX, Volume2 } from "lucide-react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Link } from "react-router-dom";

interface HeroProps {
  title?: string;
  tagline?: string;
  description?: string;
  videoSrc?: string;
}

const Hero = ({
  title       = "Giving Africa's Youth a Chance",
  tagline     = "Rurban Africa",
  description = "Empowering children and young people across rural and peri-urban communities through education, opportunity, and sustainable growth.",
  videoSrc    = "/hero-video.mp4",
}: HeroProps) => {
  const [videoOpen, setVideoOpen] = useState(false);
  const [muted, setMuted]         = useState(true);
  const [loaded, setLoaded]       = useState(false);

  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const videoScale     = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentY       = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  // ── Autoplay: single clean effect, works on all browsers/devices ──
  // Key rules:
  //   1. muted attribute on JSX element + video.muted = true programmatically
  //   2. playsInline prevents iOS Safari fullscreen hijack
  //   3. Call play() as soon as HAVE_CURRENT_DATA (readyState >= 2)
  //   4. On failure, register { once: true } listeners — no memory leaks
  useEffect(() => {
    const video = bgVideoRef.current;
    if (!video) return;

    video.muted = true; // set programmatically in addition to the JSX attribute

    const tryPlay = () => {
      video.play().catch(() => {
        // Autoplay blocked — will retry on first user gesture
        const unlock = () => {
          video.muted = true;
          video.play().catch(() => {});
        };
        document.addEventListener("click",      unlock, { once: true });
        document.addEventListener("touchstart", unlock, { once: true });
        document.addEventListener("keydown",    unlock, { once: true });
      });
    };

    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener("canplay", tryPlay, { once: true });
    }

    return () => video.removeEventListener("canplay", tryPlay);
  }, []);

  const toggleMute = () => {
    const video = bgVideoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const words     = title.split(" ");
  const lastWord  = words.pop()!;
  const restTitle = words.join(" ");

  return (
    <>
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section
        ref={sectionRef}
        className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#041d14]"
      >

        {/* ── Background video ── */}
        <motion.div
          style={{ scale: videoScale }}
          className="absolute inset-0 origin-center will-change-transform"
        >
          <video
            ref={bgVideoRef}
            autoPlay       // declarative hint — browsers may honour without JS
            muted          // required attribute for Safari autoplay policy
            loop
            playsInline    // prevents iOS Safari from going fullscreen
            preload="auto"
            disablePictureInPicture
            className="h-full w-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>

          {/* Cinematic overlay stack */}
          <div className="absolute inset-0 bg-gradient-to-t  from-[#041d14] via-[#041d14]/58 to-[#041d14]/12" />
          <div className="absolute inset-0 bg-gradient-to-r  from-[#041d14]/68 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b  from-[#041d14]/28 via-transparent to-transparent" />

          {/* Film grain */}
          <div
            className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "180px 180px",
            }}
          />
        </motion.div>

        {/* Decorative vertical rule */}
        <div className="absolute left-10 top-0 z-10 hidden h-full w-px bg-gradient-to-b from-transparent via-white/6 to-transparent md:block" />

        {/* Mute toggle */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 2, duration: 0.7 }}
          onClick={toggleMute}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="absolute bottom-10 right-6 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white/50 backdrop-blur-sm hover:bg-white/14 hover:text-white transition-all md:right-12"
        >
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </motion.button>

        {/* ── Main content ── */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-10 mt-auto w-full px-6 pb-20 pt-32 md:px-14 md:pb-24 lg:pb-28"
        >
          <div className="mx-auto w-full max-w-6xl">

            {/* Tagline pill */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-5 flex justify-center md:justify-start"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/8 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-amber-300 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                {tagline}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.2 }}
              className="mb-6 text-center text-[clamp(2.4rem,6.5vw,4.6rem)] font-black leading-[1.04] tracking-tight text-white md:text-left"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {restTitle}{" "}
              <span className="italic text-amber-400">{lastWord}</span>
            </motion.h1>

            {/* Description + CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.38 }}
              className="flex flex-col items-center gap-7 md:flex-row md:items-end md:justify-between"
            >
              <p className="max-w-sm text-center text-[15px] leading-relaxed text-white/55 md:text-left">
                {description}
              </p>

              <div className="flex flex-row items-center gap-3 shrink-0">
                {/* Primary CTA */}
                <Link
                  to="/about"
                  className="group flex items-center gap-3 rounded-full bg-amber-400 hover:bg-amber-300 px-6 py-3.5 text-sm font-bold text-black transition-all shadow-lg shadow-amber-900/20"
                >
                  Learn More
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/10 group-hover:rotate-45 transition-transform duration-300">
                    <ArrowUpRight size={13} strokeWidth={3} />
                  </span>
                </Link>

                {/* Watch video */}
                <button
                  onClick={() => setVideoOpen(true)}
                  className="group flex items-center gap-3 rounded-full border border-white/18 bg-white/7 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/12 hover:border-white/30"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/22 group-hover:border-amber-400 group-hover:bg-amber-400/10 transition-all duration-200">
                    <Play size={11} className="fill-white ml-0.5" />
                  </span>
                  Watch Our Story
                </button>
              </div>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.56 }}
              className="mt-12 flex items-center justify-center md:justify-start"
            >
              {[
                { n: "5+",   l: "States Reached" },
                { n: "500+", l: "Lives Touched"  },
                { n: "2025", l: "Est."            },
              ].map((s, i) => (
                <div key={i} className="flex items-center">
                  <div className="px-6 first:pl-0 text-center md:text-left">
                    <p className="text-lg font-black text-white leading-none">{s.n}</p>
                    <p className="text-[11px] text-white/35 font-medium mt-0.5 tracking-wide">{s.l}</p>
                  </div>
                  {i < 2 && <div className="w-px h-7 bg-white/10" />}
                </div>
              ))}
            </motion.div>

          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <span className="text-[9px] uppercase tracking-[0.28em] text-white/22">Scroll</span>
          <div className="h-8 w-px overflow-hidden">
            <motion.div
              className="h-full w-full bg-gradient-to-b from-transparent via-amber-400/60 to-transparent"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* Bottom amber accent line */}
        <div className="absolute bottom-0 left-0 right-0 z-10 h-px bg-gradient-to-r from-transparent via-amber-400/25 to-transparent" />

      </section>

      {/* ═══════════════════ VIDEO DIALOG ═══════════════════ */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-5xl border-0 bg-transparent p-0 shadow-none [&>button]:hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl bg-[#041d14] shadow-2xl shadow-black/80 border border-white/8"
          >
            <DialogClose className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20">
              <X size={15} />
            </DialogClose>

            {/* Brand strip */}
            <div className="absolute left-0 right-0 top-0 z-10 px-6 py-4 flex items-center gap-2 pointer-events-none">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-300">
                Rurban Africa
              </span>
            </div>

            <div className="aspect-video w-full">
              {videoOpen && (
                <video
                  src={videoSrc}
                  controls
                  autoPlay
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#041d14] to-transparent pointer-events-none" />
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Hero;