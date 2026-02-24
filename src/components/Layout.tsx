import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import Footer from "@/components/Footer";
import { useRef, useEffect, useState, useCallback } from "react";
import { Play, Pause, RotateCcw, Music2, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ── Animated equalizer bars ───────────────────────────────────
function EqBars({ playing }: { playing: boolean }) {
  return (
    <div className="flex items-end gap-[3px] h-4">
      {[0.6, 1, 0.75, 1, 0.5].map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-amber-400"
          animate={
            playing
              ? { scaleY: [h, 1, h * 0.4, 1, h], transition: { duration: 0.8 + i * 0.12, repeat: Infinity, ease: "easeInOut" } }
              : { scaleY: 0.2 }
          }
          style={{ height: "100%", transformOrigin: "bottom" }}
        />
      ))}
    </div>
  );
}

const Layout = () => {
  const audioRef  = useRef<HTMLAudioElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  const [playing,      setPlaying]      = useState(false);
  const [muted,        setMuted]        = useState(false);
  const [hidePlayer,   setHidePlayer]   = useState(false);
  const [expanded,     setExpanded]     = useState(false);
  const [trackTime,    setTrackTime]    = useState({ current: 0, duration: 0 });

  // ── Restore saved preference ──
  useEffect(() => {
    const saved = localStorage.getItem("bgAudioPlaying");
    if (saved === "true") setPlaying(true);
  }, []);

  // ── Sync playback ──
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = muted;
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
    localStorage.setItem("bgAudioPlaying", String(playing));
  }, [playing, muted]);

  // ── Track progress ──
  useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  const tryPlay = async () => {
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const handleFirstInteraction = () => {
    tryPlay();
    window.removeEventListener("click", handleFirstInteraction);
  };

  window.addEventListener("click", handleFirstInteraction);

  return () => {
    window.removeEventListener("click", handleFirstInteraction);
  };
}, []);

  // ── Hide at footer ──
useEffect(() => {
  const handleScroll = () => {
    const threshold = window.innerHeight * 1.2;

    const footer = footerRef.current;
    let footerVisible = false;

    if (footer) {
      const rect = footer.getBoundingClientRect();
      footerVisible = rect.top < window.innerHeight;
    }

    const beforeThreshold = window.scrollY < threshold;

    setHidePlayer(beforeThreshold || footerVisible);
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const restart = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
    setPlaying(true);
  }, []);
useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  const tick = () => {
    setTrackTime({
      current: audio.currentTime,
      duration: audio.duration || 0,
    });
  };

  audio.addEventListener("timeupdate", tick);
  audio.addEventListener("loadedmetadata", tick);

  return () => {
    audio.removeEventListener("timeupdate", tick);
    audio.removeEventListener("loadedmetadata", tick);
  };
}, []);


  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Number(e.target.value);
  };

  const fmt = (s: number) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const progress = trackTime.duration ? (trackTime.current / trackTime.duration) * 100 : 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <audio ref={audioRef} src="/anlele1.mp3" loop preload="metadata" />

      <main className="flex-1">
        <Outlet />
      </main>

      {/* ── Floating audio player ── */}
      <AnimatePresence>
        {!hidePlayer && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 right-5 z-50"
          >
            <motion.div
              layout
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-2xl bg-[#064e3b] border border-emerald-700/40 shadow-2xl shadow-emerald-950/40"
            >
              {/* Grain texture */}
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  backgroundSize: "160px 160px",
                }}
              />

              {/* Ambient glow behind play button when active */}
              {playing && (
                <motion.div
                  className="absolute -top-8 -left-8 w-24 h-24 bg-amber-400/20 rounded-full blur-2xl pointer-events-none"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              <div className="relative px-4 py-3">
                {/* Collapsed / always-visible row */}
                <div className="flex items-center gap-3">

                  {/* Music icon + eq */}
                  <button
                    onClick={() => setExpanded((v) => !v)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/8 hover:bg-white/14 transition-all shrink-0"
                    aria-label="Expand player"
                  >
                    {expanded
                      ? <EqBars playing={playing} />
                      : <Music2 size={15} className="text-amber-400" />
                    }
                  </button>

                  {/* Track name */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-white truncate leading-none mb-0.5">
                      Anlele
                    </p>
                    <p className="text-[10px] text-emerald-100/40 truncate">
                      Rurban Africa
                    </p>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Restart */}
                    <button
                      onClick={restart}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-emerald-100/40 hover:text-white hover:bg-white/10 transition-all"
                      aria-label="Restart"
                    >
                      <RotateCcw size={13} />
                    </button>

                    {/* Play / Pause */}
                    <button
                      onClick={() => setPlaying((v) => !v)}
                      className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 hover:bg-amber-300 text-black transition-all shadow-md shadow-amber-900/30"
                      aria-label={playing ? "Pause" : "Play"}
                    >
                      {playing && (
                        <motion.span
                          className="absolute inset-0 rounded-xl bg-amber-400"
                          animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
                          transition={{ duration: 1.2, repeat: Infinity }}
                        />
                      )}
                      <motion.span
                        key={String(playing)}
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.15 }}
                      >
                        {playing
                          ? <Pause size={14} className="fill-black" />
                          : <Play size={14} className="fill-black ml-0.5" />
                        }
                      </motion.span>
                    </button>

                    {/* Mute */}
                    <button
                      onClick={() => setMuted((v) => !v)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-emerald-100/40 hover:text-white hover:bg-white/10 transition-all"
                      aria-label={muted ? "Unmute" : "Mute"}
                    >
                      {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                    </button>
                  </div>
                </div>

                {/* Expanded: progress bar + timestamps */}
                <AnimatePresence>
                  {expanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 pb-1">
                        {/* Custom range */}
                        <div className="relative h-1.5 w-full rounded-full bg-white/10 mb-2 group cursor-pointer">
                          <div
                            className="absolute left-0 top-0 h-full rounded-full bg-amber-400 transition-all"
                            style={{ width: `${progress}%` }}
                          />
                          <input
                            type="range"
                            min={0}
                            max={trackTime.duration || 100}
                            value={trackTime.current}
                            onChange={seek}
                            className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
                          />
                          {/* Thumb */}
                          <div
                            className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white shadow border-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ left: `calc(${progress}% - 6px)` }}
                          />
                        </div>

                        <div className="flex justify-between text-[10px] text-emerald-100/35 font-medium">
                          <span>{fmt(trackTime.current)}</span>
                          <span>{fmt(trackTime.duration)}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;