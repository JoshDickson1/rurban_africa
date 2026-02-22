"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Play, X, Volume2, VolumeX } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";

interface HeroProps {
  title?: string;
  tagline?: string;
  description?: string;
  videoSrc?: string;
}

const Hero = ({
  title = "Giving Africa's Youth a Chance",
  tagline = "Rurban Africa",
  description = "Empowering children and young people across rural and peri-urban communities through education, opportunity, and sustainable growth.",
  videoSrc = "/hero-video.mp4",
}: HeroProps) => {
  const [videoOpen, setVideoOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        video.muted = true;
        await video.play();
      } catch (err) {
        const unlock = () => {
          video.play().catch(() => {});
          document.removeEventListener("touchstart", unlock);
          document.removeEventListener("click", unlock);
        };
        document.addEventListener("touchstart", unlock, { once: true });
        document.addEventListener("click", unlock, { once: true });
      }
    };

    if (video.readyState >= 3) {
      playVideo();
    } else {
      video.addEventListener("canplay", playVideo, { once: true });
    }

    return () => {
      video.removeEventListener("canplay", playVideo);
    };
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  /* ── Split title into first line and last word for accent ── */
  const words = title.split(" ");
  const lastWord = words.pop()!;
  const restTitle = words.join(" ");

  return (
    <>
      {/* ══════════════ HERO SECTION ══════════════ */}
      <section
        ref={sectionRef}
        className="relative flex min-h-screen w-full flex-col overflow-hidden bg-zinc-950"
      >
        {/* ── Video background ── */}
        <motion.div
          style={{ scale: videoScale }}
          className="absolute inset-0 origin-center"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            className="h-full w-full object-cover"
          >
            <source src={videoSrc.replace(".mp4", ".webm")} type="video/webm" />
            <source src={videoSrc} type="video/mp4" />
          </video>

          {/* layered overlays for cinematic depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-zinc-950/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/60 via-transparent to-transparent" />
          {/* grain texture */}
          <div
            className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            }}
          />
        </motion.div>

        {/* ── Decorative vertical line ── */}
        <div className="absolute left-6 top-0 z-10 hidden h-full w-px bg-white/5 md:left-10 md:block" />

        {/* ── Main content ── */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-10 mt-auto w-full px-6 pb-16 pt-32 md:px-14 md:pb-20 lg:pb-24"
        >
          <div className="mx-auto w-full max-w-6xl">
            {/* ─ Tagline pill ─ */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="mb-5 flex justify-center md:justify-start"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-300 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                {tagline}
              </span>
            </motion.div>

            {/* ─ Title ─ */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
              className="mb-5 text-center text-[clamp(2.2rem,6vw,4.2rem)] font-black leading-[1.05] tracking-tight text-white md:text-left"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {restTitle}{" "}
              <span className="italic text-amber-400">{lastWord}</span>
            </motion.h1>

            {/* ─ Description + CTAs ─ */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.45, ease: "easeOut" }}
              className="flex flex-col items-center gap-6 md:flex-row md:items-end md:justify-between"
            >
              <p className="max-w-sm text-center text-[15px] leading-relaxed text-zinc-300/80 md:text-left">
                {description}
              </p>

              {/* ─ CTA Buttons ─ */}
              <div className="flex flex-row items-center justify-center gap-3 md:justify-start md:flex-shrink-0">
                {/* Primary CTA */}
                <Link
                  to="/about"
                  className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-amber-400 px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-amber-300"
                >
                  <span className="relative z-10">Learn More</span>
                  <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-green-900 transition-transform group-hover:rotate-45">
                    <ArrowUpRight size={13} />
                  </span>
                </Link>

                {/* Video CTA */}
                <button
                  onClick={() => setVideoOpen(true)}
                  className="group flex items-center gap-3 rounded-full border border-white/20 bg-white/8 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/15 hover:border-white/40"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/30 transition-all group-hover:border-amber-400 group-hover:bg-amber-400/10">
                    <Play size={12} className="fill-white ml-0.5" />
                  </span>
                  Watch Our Story
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest text-white/30">Scroll</span>
          <div className="h-8 w-px overflow-hidden">
            <motion.div
              className="h-full w-full bg-gradient-to-b from-transparent via-amber-400 to-transparent"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* ── Bottom border accent ── */}
        <div className="absolute bottom-0 left-0 right-0 z-10 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
      </section>

      {/* ══════════════ VIDEO DIALOG ══════════════ */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-5xl border-0 bg-transparent p-0 shadow-none [&>button]:hidden">
          <div className="relative overflow-hidden rounded-2xl bg-zinc-950 shadow-2xl shadow-black/80">
            {/* Close button */}
            <DialogClose className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 border border-white/10">
              <X size={16} />
            </DialogClose>

            {/* Header */}
            <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
                  Rurban Africa
                </span>
              </div>
            </div>

            {/* Video */}
            <div className="aspect-video w-full">
              {videoOpen && (
                <video
                  src={videoSrc}
                  controls
                  autoPlay
                  className="h-full w-full rounded-2xl object-cover"
                />
              )}
            </div>

            {/* Bottom bar */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none rounded-b-2xl" />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Hero;