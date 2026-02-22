"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Users, Sprout, Building2, Baby, ChevronRight, ArrowRight } from "lucide-react";

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */
const audiences = [
  {
    id: "children",
    label: "Children / Youth",
    icon: Baby,
    color: "#f59e0b",
    colorDim: "#f59e0b22",
    image: "/target-1.jpg",
    tag: "Education & Growth",
    description:
      "Rural school children and young adults, targeted for education and career development to foster growth and local leadership.",
    stats: [{ v: "60%", l: "Rural youth" }, { v: "K–12", l: "Focus range" }],
  },
  {
    id: "women",
    label: "Women and Girls",
    icon: Users,
    color: "#ec4899",
    colorDim: "#ec489922",
    image: "/target-2.jpg",
    tag: "Empowerment",
    description:
      "Empowered through gender-specific programs on hygiene, entrepreneurship, and rights, addressing disparities in access to resources.",
    stats: [{ v: "50%+", l: "Participants" }, { v: "3 programs", l: "Active" }],
  },
  {
    id: "farmers",
    label: "Farmers & Communities",
    icon: Sprout,
    color: "#22c55e",
    colorDim: "#22c55e22",
    image: "/target-3.jpg",
    tag: "Sustainable Agriculture",
    description:
      "Supported in sustainable agriculture and market linkages to boost livelihoods and long-term food security.",
    stats: [{ v: "200+", l: "Farmers" }, { v: "5 states", l: "Coverage" }],
  },
  {
    id: "urban",
    label: "Urban Partners",
    icon: Building2,
    color: "#6366f1",
    colorDim: "#6366f122",
    image: "/target-4.jpg",
    tag: "Mentorship & Investment",
    description:
      "City-based professionals, businesses, and institutions engaged as mentors and investors to bridge the rural–urban divide.",
    stats: [{ v: "30+", l: "Partners" }, { v: "NGOs & Biz", l: "Network" }],
  },
];

/* ══════════════════════════════════════════════
   PROGRESS BAR
══════════════════════════════════════════════ */
const ProgressBar = ({
  active,
  color,
  duration,
}: {
  active: boolean;
  color: string;
  duration: number;
}) => (
  <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
    <motion.div
      className="h-full rounded-full"
      style={{ background: color }}
      initial={{ width: "0%" }}
      animate={active ? { width: "100%" } : { width: "0%" }}
      transition={active ? { duration, ease: "linear" } : { duration: 0.2 }}
    />
  </div>
);

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
const TargetAudience = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const AUTO_DURATION = 4; // seconds per slide
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: false, margin: "-100px" });

  /* Auto-advance */
  useEffect(() => {
    if (paused || !inView) return;
    timerRef.current = setInterval(() => {
      setActive((a) => (a + 1) % audiences.length);
    }, AUTO_DURATION * 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, inView, active]);

  const go = (i: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActive(i);
  };

  const current = audiences[active];
  const Icon = current.icon;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-zinc-950 py-24 md:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Background atmosphere ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id + "-bg"}
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 60% 50% at 30% 60%, ${current.colorDim}, transparent 70%)`,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />

      {/* Diagonal lines */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.02]">
        <defs>
          <pattern id="diag-ta" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
            <line x1="0" y1="0" x2="0" y2="40" stroke="white" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diag-ta)" />
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-14">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-300">
              Who We Serve
            </span>
          </div>
          <h2
            className="text-[clamp(2rem,5vw,3.4rem)] font-black leading-[1.06] tracking-tight text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Target{" "}
            <span className="italic text-amber-400">Audience</span>
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-zinc-400">
            Our primary beneficiaries are rural and peri-urban populations across Africa,
            with a focus on the most vulnerable groups.
          </p>
        </motion.div>

        {/* ══════ MAIN GRID ══════ */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12 xl:grid-cols-[55%_1fr]">

          {/* ── LEFT: Big image ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Image wrapper */}
            <div className="relative overflow-hidden rounded-3xl" style={{ aspectRatio: "4/3" }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.id + "-img"}
                  src={current.image}
                  alt={current.label}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                />
              </AnimatePresence>

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />

              {/* Active label badge */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id + "-badge"}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                  className="absolute bottom-5 left-5 right-5 flex items-end justify-between"
                >
                  <div>
                    <span
                      className="mb-2 inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider"
                      style={{ background: current.colorDim, color: current.color, border: `1px solid ${current.color}44` }}
                    >
                      {current.tag}
                    </span>
                    <h3
                      className="text-2xl font-black text-white"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {current.label}
                    </h3>
                  </div>

                  {/* Mini stats */}
                  <div className="flex gap-3">
                    {current.stats.map((s, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-center backdrop-blur-sm"
                      >
                        <p className="text-base font-black" style={{ color: current.color }}>{s.v}</p>
                        <p className="text-[10px] text-zinc-400">{s.l}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Animated border glow */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-3xl"
                animate={{ boxShadow: [`inset 0 0 0 1px ${current.color}00`, `inset 0 0 0 1.5px ${current.color}55`, `inset 0 0 0 1px ${current.color}00`] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* Caption */}
            <AnimatePresence mode="wait">
              <motion.p
                key={current.id + "-caption"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="mt-5 text-[14px] leading-relaxed text-zinc-500"
              >
                {current.description}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* ── RIGHT: Audience list ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col justify-center gap-3"
          >
            {audiences.map((a, i) => {
              const AIcon = a.icon;
              const isActive = i === active;
              return (
                <motion.button
                  key={a.id}
                  onClick={() => go(i)}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className={`group relative w-full overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${
                    isActive
                      ? "border-white/10 bg-zinc-900/80 shadow-lg"
                      : "border-transparent bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-white/5"
                  }`}
                >
                  {/* Active glow */}
                  {isActive && (
                    <motion.div
                      layoutId="active-glow"
                      className="pointer-events-none absolute inset-0 rounded-2xl"
                      style={{ background: `radial-gradient(ellipse at 0% 50%, ${a.colorDim}, transparent 70%)` }}
                      transition={{ type: "spring", stiffness: 200, damping: 26 }}
                    />
                  )}

                  <div className="relative flex items-center gap-4">
                    {/* Thumbnail */}
                    <div className="relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-xl">
                      <img
                        src={a.image}
                        alt={a.label}
                        className={`h-full w-full object-cover transition-all duration-500 ${isActive ? "scale-110 brightness-100" : "brightness-60 grayscale-[40%]"}`}
                      />
                      {/* Icon overlay */}
                      <div
                        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isActive ? "opacity-0" : "opacity-100"}`}
                        style={{ background: `${a.colorDim}` }}
                      >
                        <AIcon size={18} style={{ color: a.color }} />
                      </div>
                    </div>

                    {/* Text */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4
                          className={`text-[15px] font-black leading-tight transition-colors duration-300 ${isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"}`}
                          style={isActive ? { fontFamily: "'Playfair Display', Georgia, serif" } : {}}
                        >
                          {a.label}
                        </h4>
                        <motion.div
                          animate={{ x: isActive ? 0 : -4, opacity: isActive ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronRight size={16} style={{ color: a.color }} />
                        </motion.div>
                      </div>

                      {/* Description — only shown when active */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: "auto", marginTop: 6 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="text-[12px] leading-relaxed text-zinc-400 overflow-hidden"
                          >
                            {a.description}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      {/* Progress bar */}
                      <div className="mt-3">
                        <ProgressBar active={isActive && !paused && inView} color={a.color} duration={AUTO_DURATION} />
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}

            {/* Navigation dots + counter */}
            <div className="mt-4 flex items-center justify-between px-1">
              <div className="flex gap-2">
                {audiences.map((a, i) => (
                  <button
                    key={a.id}
                    onClick={() => go(i)}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: i === active ? 24 : 6,
                      background: i === active ? current.color : "#52525b",
                    }}
                  />
                ))}
              </div>
              <span className="text-[12px] font-semibold tabular-nums text-zinc-600">
                {String(active + 1).padStart(2, "0")} / {String(audiences.length).padStart(2, "0")}
              </span>
            </div>

            {/* CTA */}
            <motion.a
              href="/about"
              whileHover={{ x: 4 }}
              className="mt-2 inline-flex items-center gap-2 text-[13px] font-semibold text-amber-400 transition-colors hover:text-amber-300"
            >
              Learn more about our programs
              <ArrowRight size={14} />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;