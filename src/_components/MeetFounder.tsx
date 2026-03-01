"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/* ══════════════════════════════════════════════════
   SOCIAL ICONS (inline SVGs — no extra deps)
══════════════════════════════════════════════════ */
const SOCIALS = [
  {
    label: "Facebook",
    href:  "https://facebook.com/rurbanafrica",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href:  "https://wa.me/234000000000",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href:  "https://linkedin.com/in/alvin-rurban",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href:  "https://instagram.com/rurban_africa",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
  },
];

/* ══════════════════════════════════════════════════
   BIO TEXT — highlights "One Africa. Two Worlds. One Future."
══════════════════════════════════════════════════ */
const BIO_BEFORE = `Alvin is a passionate advocate for inclusive African growth and a proud product of one of Nigeria's rural communities. He has spent years visiting villages, engaging with residents, and deepening his understanding of the vital yet often overlooked relationship between rural/peri-urban communities and urban centres. He firmly believes that for Africa to truly rise, rural and peri-urban communities must not be left behind — they must grow hand-in-hand with cities, sharing opportunities, resources, and pride. As a qualified lawyer with expertise in Corporate/Commercial, Entertainment, Clean Energy, and Technology Law practice, Alvin brings sharp strategic insight and real-world experience to nonprofit leadership. Having grown up in a rural setting, he intimately understands the barriers many children face and the immense potential waiting to be unlocked when those barriers are removed. Driven by the conviction of `;
const BIO_HIGHLIGHT = "One Africa. Two Worlds. One Future.";
const BIO_AFTER = `, Alvin founded Rurban Africa to bridge divides through education, youth empowerment, teacher development, scholarships, and community transformation. His mission is clear: to instil unbreakable pride, purpose, and possibility in Africa's next generation — ensuring no child's dream is limited by their birthplace.`;

/* ══════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════ */
export default function MeetFounder() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden transition-colors duration-700"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "linear-gradient(160deg, #064e3b 0%, #052e20 50%, #021a0e 100%)",
      }}
    >
      {/* ── Grain texture ── */}
      <div
        className="absolute inset-0 opacity-[0.055] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
      />
      {/* ── Glow orbs ── */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-emerald-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-40 right-0 w-[500px] h-[400px] rounded-full bg-amber-400/5 blur-[120px] pointer-events-none" />
      {/* ── Grid pattern ── */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs><pattern id="founder-grid" width="64" height="64" patternUnits="userSpaceOnUse">
          <path d="M 64 0 L 0 0 0 64" fill="none" stroke="#6ee7b7" strokeWidth="0.5"/>
        </pattern></defs>
        <rect width="100%" height="100%" fill="url(#founder-grid)" />
      </svg>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-14">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em]
            text-emerald-300/70 bg-white/[0.07] border border-white/10 px-4 py-1.5 rounded-full mb-6">
            Leadership
          </span>
          <h2
            className="text-4xl md:text-5xl font-black text-white leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Meet the <span className="italic text-amber-400">Founder</span>
          </h2>
        </motion.div>

        {/* ── TWO-COLUMN LAYOUT ── */}
        <div className="grid lg:grid-cols-[340px_1fr] gap-12 xl:gap-20 items-start">

          {/* LEFT: Photo + identity */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center lg:items-start lg:sticky lg:top-28"
          >
            {/* Photo */}
            <div className="relative mb-7">
              {/* Decorative amber ring behind photo */}
              <div className="absolute -inset-2 rounded-[2.2rem] border border-amber-400/20 pointer-events-none" />
              <div className="absolute -inset-5 rounded-[2.8rem] border border-white/[0.06] pointer-events-none" />

              <div className="relative w-64 h-72 rounded-[2rem] overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
                <img
                  src="/alvin.jpg"
                  alt="Omehoduonye C. Alvin"
                  className="w-full h-full object-cover object-top"
                />
                {/* Subtle green tint at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#064e3b]/40 via-transparent to-transparent" />
              </div>

              {/* Small amber dot accent */}
              <span className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-amber-400 shadow-lg shadow-amber-400/30" />
            </div>

            {/* Name + role */}
            <h3
              className="text-2xl font-black text-white mb-1 text-center lg:text-left"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Omehoduonye C. Alvin
            </h3>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-300/60 mb-7 text-center lg:text-left">
              Executive Director / Trustee
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2.5">
              {SOCIALS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-400 hover:text-white border border-white/10 hover:border-amber-400
                    flex items-center justify-center
                    text-white/70 hover:text-black
                    transition-all duration-250 shadow-sm"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Bio + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            {/* Thin top accent */}
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="h-px w-full bg-gradient-to-r from-emerald-500/40 via-white/10 to-transparent mb-8"
            />

            <div className="h-52 overflow-auto rounded-2xl mb-8">
                {/* Bio */}
            <p className="text-emerald-100/70 text-base leading-[1.95] mb-8">
              {BIO_BEFORE}
              <span className="text-amber-400 font-semibold not-italic">{BIO_HIGHLIGHT}</span>
              {BIO_AFTER}
            </p>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-white/[0.07] mb-8" />

            {/* Quote pull */}
            <motion.blockquote
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="border-l-2 border-amber-400/50 pl-5 mb-10"
            >
              <p
                className="text-white/85 text-lg italic leading-relaxed"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                "No child's dream should be limited by their birthplace."
              </p>
            </motion.blockquote>

            {/* CTA */}
            <div className="flex flex-wrap gap-3">
              <motion.a
                href="/team"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3
                  bg-amber-400 hover:bg-amber-300
                  text-black px-7 py-4 rounded-full
                  font-black text-sm group
                  transition-colors shadow-xl text-white shadow-black/20"
              >
                View other trustees
                <span className="bg-emerald-900 rounded-full p-1.5 group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight size={14} strokeWidth={3} />
                </span>
              </motion.a>
              <motion.a
                href="/donate"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3
                  border-2 border-white/20 hover:border-white/40 hover:bg-white/5
                  text-white px-7 py-4 rounded-full
                  font-black text-sm
                  transition-all"
              >
                Support the mission
              </motion.a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}