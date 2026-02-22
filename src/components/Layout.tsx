import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import Footer from "@/components/Footer";
import { useRef, useEffect, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

const Layout = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hideControls, setHideControls] = useState(false);

  // Load saved preference
  useEffect(() => {
    const savedPreference = localStorage.getItem("bgAudioPlaying");
    if (savedPreference === "true") {
      setIsPlaying(true);
    }
  }, []);

  // Playback control
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }

    localStorage.setItem("bgAudioPlaying", String(isPlaying));
  }, [isPlaying]);

  const restartAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    setIsPlaying(true);
  };

  // Observe footer visibility
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideControls(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <audio ref={audioRef} src="/background.mp3" loop />

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Floating Controls */}
      {!hideControls && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="flex items-center gap-4 rounded-full border bg-card px-6 py-3 shadow-lg">
            <button
              onClick={() => setIsPlaying((prev) => !prev)}
              className="text-primary hover:scale-110 transition-transform"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <button
              onClick={restartAudio}
              className="text-primary hover:scale-110 transition-transform"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </div>
      )}

      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;