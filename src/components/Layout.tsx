import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import Footer from "@/components/Footer";
import { useRef, useEffect, useState } from "react";

const Layout = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const savedPreference = localStorage.getItem("bgAudioPlaying");
    if (savedPreference === "true") {
      setIsPlaying(true);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {
        console.log("Autoplay blocked.");
      });
    } else {
      audio.pause();
    }

    localStorage.setItem("bgAudioPlaying", String(isPlaying));
  }, [isPlaying]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <audio
        ref={audioRef}
        src="/background.mp3"
        loop
      />

      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setIsPlaying((prev) => !prev)}
          className="rounded-full bg-primary px-4 py-2 text-white shadow-lg"
        >
          {isPlaying ? "Pause Music" : "Play Music"}
        </button>
      </div>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;