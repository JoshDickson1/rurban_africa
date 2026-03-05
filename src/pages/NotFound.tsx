"use client";

import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-6 text-center"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "linear-gradient(160deg, #064e3b 0%, #052e20 55%, #021a0e 100%)",
      }}
    >
      {/* ── Grain ── */}
      <div
        className="absolute inset-0 opacity-[0.055] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
      />

      {/* ── Top glow ── */}
      <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-emerald-400/10 blur-[130px] pointer-events-none" />
      {/* ── Bottom glow ── */}
      <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full bg-[#021a0e]/80 blur-[120px] pointer-events-none" />

      {/* ── Grid pattern ── */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="nf-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#6ee7b7" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#nf-grid)" />
      </svg>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Large 404 */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-6 select-none"
        >
          {/* Ghost number behind */}
          <span
            className="absolute inset-0 flex items-center justify-center text-[180px] md:text-[240px] font-black text-white/[0.04] leading-none tracking-tighter pointer-events-none"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            aria-hidden
          >
            404
          </span>

          {/* Real number */}
          <h1
            className="relative text-[100px] md:text-[140px] font-black text-white leading-none tracking-tighter"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            4
            <span className="text-amber-400">0</span>
            4
          </h1>
        </motion.div>

        {/* Accent rule */}
        <motion.div
          initial={{ scaleX: 0, originX: 0.5 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="h-[2px] w-12 bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full mb-8"
        />

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl md:text-3xl font-black text-white mb-4"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Page not found
        </motion.h2>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-emerald-100/55 text-sm md:text-base leading-relaxed max-w-sm mb-12"
        >
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back on track.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          {/* Go back */}
          <motion.button
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5
              border-2 border-white/20 hover:border-white/40 hover:bg-white/5
              text-white px-7 py-3.5 rounded-full
              font-black text-sm transition-all"
          >
            <ArrowLeft size={14} strokeWidth={2.5} />
            Go Back
          </motion.button>

          {/* Go home */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/"
              className="inline-flex items-center gap-3
                bg-amber-400 hover:bg-amber-300
                text-black px-7 py-3.5 rounded-full
                font-black text-sm group transition-colors
                shadow-xl shadow-black/20"
            >
              Go Home
              <span className="bg-black/10 rounded-full p-1.5 group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight size={13} strokeWidth={3} />
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Soft footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 text-[11px] uppercase tracking-[0.22em] font-bold text-emerald-300/25"
        >
          Rurban Africa · One Africa. Two Worlds. One Future.
        </motion.p>
      </div>
    </div>
  );
}