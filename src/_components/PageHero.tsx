"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface Crumb {
  label: string;
  to?: string;
}

interface PageHeroProps {
  /** Small eyebrow label above the title */
  tag?: string;
  /** Main headline — supports a highlighted last word automatically */
  title: string;
  /** Optional italic accent word/phrase — replaces auto-detected last word */
  accentWord?: string;
  /** Short description under the title */
  description?: string;
  /** Breadcrumb items — last one is current page (no link) */
  crumbs?: Crumb[];
  /** Optional background image path */
  bgImage?: string;
  /** Extra content slot — e.g. stat badges, CTA buttons */
  children?: React.ReactNode;
}

const grain = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export default function PageHero({
  tag,
  title,
  accentWord,
  description,
  crumbs = [],
  bgImage,
  children,
}: PageHeroProps) {
  // Split title: accent the last word unless accentWord is supplied
  const words    = title.trim().split(" ");
  const accent   = accentWord ?? words.pop()!;
  const restTitle = accentWord ? title : words.join(" ");

  const fade = (delay = 0, y = 14) => ({
    initial:    { opacity: 0, y },
    animate:    { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <section className="relative pt-20 overflow-hidden bg-[#064e3b]">

      {/* Optional background image */}
      {bgImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${bgImage}')` }}
          />
          <div className="absolute inset-0 bg-[#064e3b]/82" />
        </>
      )}

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: grain, backgroundSize: "180px 180px" }}
      />

      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-300/10 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400/5 blur-3xl rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      {/* Decorative vertical rule */}
      <div className="absolute left-10 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-white/6 to-transparent md:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 py-20 lg:py-28">

        {/* Tag pill */}
        {tag && (
          <motion.div {...fade(0)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/8 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-amber-300 backdrop-blur-sm mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              {tag}
            </span>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          {...fade(0.08, 20)}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-5"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {restTitle}{" "}
          <span className="italic text-amber-400">{accent}</span>
        </motion.h1>

        {/* Description */}
        {description && (
          <motion.p
            {...fade(0.16)}
            className="text-emerald-100/55 text-base leading-relaxed max-w-xl mb-8"
          >
            {description}
          </motion.p>
        )}

        {/* Extra slot */}
        {children && (
          <motion.div {...fade(0.22)}>
            {children}
          </motion.div>
        )}

        {/* Breadcrumb */}
        {crumbs.length > 0 && (
          <motion.nav
            {...fade(0.28)}
            aria-label="Breadcrumb"
            className="flex items-center flex-wrap gap-1 text-[12px] text-emerald-100/40 mt-8"
          >
            <Link to="/" className="hover:text-white transition-colors font-medium">
              Home
            </Link>
            {crumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1">
                <ChevronRight size={12} className="opacity-40" />
                {crumb.to ? (
                  <Link to={crumb.to} className="hover:text-white transition-colors font-medium">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-emerald-100/70 font-semibold">{crumb.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
    </section>
  );
}