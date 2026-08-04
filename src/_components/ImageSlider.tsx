import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

export interface SliderImage {
  src: string;
  alt: string;
}

interface ImageSliderProps {
  images: SliderImage[];
  intervalMs?: number;
  aspectClassName?: string;
  className?: string;
}

/** Prev/next button, shared by the inline slider and the lightbox (sm vs lg only). */
function ArrowButton({
  direction,
  onClick,
  size = "sm",
}: {
  direction: "prev" | "next";
  onClick: () => void;
  size?: "sm" | "lg";
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  const isSm = size === "sm";

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={direction === "prev" ? "Previous image" : "Next image"}
      className={[
        "absolute top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-colors",
        direction === "prev"
          ? isSm
            ? "left-3"
            : "left-4 md:left-8"
          : isSm
            ? "right-3"
            : "right-4 md:right-8",
        isSm
          ? "h-9 w-9 bg-black/40 hover:bg-black/60 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          : "h-11 w-11 bg-white/10 hover:bg-white/20 text-white",
      ].join(" ")}
    >
      <Icon size={isSm ? 18 : 20} strokeWidth={2.5} />
    </button>
  );
}

export default function ImageSlider({
  images,
  intervalMs = 8000,
  aspectClassName = "aspect-[4/3]",
  className = "",
}: ImageSliderProps) {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!images.length) return null;

  const count = images.length;
  const multiple = count > 1;
  const image = images[index];

  const next = () => setIndex((i) => (i + 1) % count);
  const prev = () => setIndex((i) => (i - 1 + count) % count);

  useEffect(() => {
    if (!intervalMs || !multiple || lightboxOpen) return;
    const id = setInterval(next, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, multiple, lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen]);

  return (
    <>
      <div className={`relative w-full ${className}`}>
        <div
          className={`relative w-full ${aspectClassName} overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50 dark:border-emerald-900/25 dark:bg-[#071f12]`}
        >
          <AnimatePresence mode="wait">
            <motion.button
              key={index}
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label={`View ${image.alt} full size`}
              className="group absolute inset-0 h-full w-full cursor-zoom-in"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
                <ZoomIn
                  size={22}
                  className="text-white opacity-0 transition-opacity group-hover:opacity-100"
                />
              </div>
            </motion.button>
          </AnimatePresence>

          {multiple && (
            <>
              <ArrowButton direction="prev" onClick={prev} />
              <ArrowButton direction="next" onClick={next} />
            </>
          )}
        </div>

        {multiple && (
          <div className="mt-4 flex justify-center gap-2">
            {images.map((img, i) => (
              <button
                key={img.src}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-amber-400" : "w-2 bg-white/60"}`}
              />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X size={20} />
            </button>

            {multiple && (
              <>
                <ArrowButton direction="prev" size="lg" onClick={prev} />
                <ArrowButton direction="next" size="lg" onClick={next} />
              </>
            )}

            <motion.img
              key={index}
              src={image.src}
              alt={image.alt}
              className="max-h-full max-w-full rounded-lg object-contain"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
