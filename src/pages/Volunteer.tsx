"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight, Heart, Clock, Globe, Users, BookOpen,
  Megaphone, Code, Camera, CheckCircle2, ChevronDown,
} from "lucide-react";
import PageHero from "@/_components/PageHero";

const ROLES = [
  {
    icon: <BookOpen size={18} strokeWidth={1.8} />,
    title: "Education Facilitator",
    commitment: "4–6 hrs/week",
    location: "On-site · Nigeria",
    desc: "Lead interactive sessions using our 10-guide series, mentor students, and support teachers in Dream Hub locations.",
  },
  {
    icon: <Code size={18} strokeWidth={1.8} />,
    title: "Tech & Digital Trainer",
    commitment: "3–5 hrs/week",
    location: "Remote · Hybrid",
    desc: "Teach digital literacy, basic coding, and online tools to rural youth and community teachers via our digital hubs.",
  },
  {
    icon: <Globe size={18} strokeWidth={1.8} />,
    title: "Community Liaison",
    commitment: "5–8 hrs/week",
    location: "On-site · Nigeria",
    desc: "Bridge our programmes with local leaders, families, and schools, coordinating outreach and building trust.",
  },
  {
    icon: <Camera size={18} strokeWidth={1.8} />,
    title: "Creative & Media",
    commitment: "Flexible",
    location: "Remote",
    desc: "Document impact through photography, videography, and storytelling. Help us share Africa's potential with the world.",
  },
  {
    icon: <Megaphone size={18} strokeWidth={1.8} />,
    title: "Advocacy & Campaigns",
    commitment: "Flexible",
    location: "Remote",
    desc: "Amplify our mission through social media, community campaigns, and awareness events in your own city.",
  },
  {
    icon: <Users size={18} strokeWidth={1.8} />,
    title: "Programme Support",
    commitment: "Project-based",
    location: "Remote · On-site",
    desc: "Assist with logistics, data collection, impact reporting, and general programme coordination across initiatives.",
  },
];

const PERKS = [
  { icon: <Heart size={15} />,      label: "Direct community impact"      },
  { icon: <Globe size={15} />,      label: "Pan-African network"          },
  { icon: <BookOpen size={15} />,   label: "Learning & growth"            },
  { icon: <Clock size={15} />,      label: "Flexible scheduling"          },
  { icon: <CheckCircle2 size={15} />, label: "Reference letter provided" },
  { icon: <Users size={15} />,      label: "Vibrant volunteer community"  },
];

const STEPS = [
  { num: "01", title: "Apply",    body: "Fill out the form below with your skills, availability, and preferred role. Takes under 3 minutes." },
  { num: "02", title: "Connect",  body: "Our team will reach out within 48 hours to schedule a short intro call and discuss the fit." },
  { num: "03", title: "Onboard",  body: "Get matched to a role, receive your starter kit, and join your first team session." },
  { num: "04", title: "Impact",   body: "Start showing up. Your time and skills directly shape the lives of children across Africa." },
];

/* ══════════════════════════════════════════════════
   ROLE CARD
══════════════════════════════════════════════════ */
function RoleCard({ role }: { role: typeof ROLES[0] }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white dark:bg-[#071f12]
        border border-zinc-100 dark:border-emerald-900/30
        rounded-2xl p-5
        hover:border-emerald-200 dark:hover:border-emerald-700/40
        hover:shadow-lg hover:shadow-emerald-900/5
        transition-all duration-300"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/30
          flex items-center justify-center text-[#064e3b] dark:text-emerald-400
          group-hover:bg-[#064e3b] group-hover:text-white
          transition-all duration-250 shrink-0">
          {role.icon}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.18em]
          text-emerald-600 dark:text-emerald-600
          bg-emerald-50 dark:bg-emerald-900/20
          border border-emerald-100 dark:border-emerald-900/40
          px-2.5 py-1 rounded-full">
          {role.commitment}
        </span>
      </div>

      <h3
        className="font-black text-zinc-900 dark:text-white text-[15px] leading-snug mb-1
          group-hover:text-[#064e3b] dark:group-hover:text-emerald-400 transition-colors"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        {role.title}
      </h3>
      <p className="text-[11px] font-bold uppercase tracking-[0.16em]
        text-zinc-400 dark:text-emerald-700 mb-3">
        {role.location}
      </p>
      <div className="h-px bg-zinc-100 dark:bg-emerald-900/30 mb-3" />
      <p className="text-zinc-500 dark:text-emerald-100/50 text-[13px] leading-relaxed">
        {role.desc}
      </p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   FORM
══════════════════════════════════════════════════ */
const ROLE_OPTIONS = ROLES.map((r) => r.title);

function VolunteerForm() {
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen]           = useState(false);
  const [selected, setSelected]   = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("role", selected);
    await fetch("https://formspree.io/f/xjgaveov", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data,
    }).catch(() => {});
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center justify-center text-center py-16 px-8"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-900/30
          flex items-center justify-center mb-5">
          <CheckCircle2 size={28} className="text-[#064e3b] dark:text-emerald-400" />
        </div>
        <h3
          className="text-2xl font-black text-zinc-900 dark:text-white mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          You're in!
        </h3>
        <p className="text-zinc-500 dark:text-emerald-100/50 text-sm leading-relaxed max-w-sm">
          Thank you for signing up. We'll be in touch within 48 hours. Get ready to make a difference.
        </p>
      </motion.div>
    );
  }

  const inputCls = `w-full px-4 py-3 rounded-xl text-sm
    bg-zinc-50 dark:bg-emerald-950/40
    border border-zinc-200 dark:border-emerald-900/40
    text-zinc-800 dark:text-white
    placeholder-zinc-400 dark:placeholder-emerald-700
    focus:outline-none focus:border-[#064e3b] dark:focus:border-emerald-500
    transition-colors`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-emerald-700 mb-1.5">
            First Name
          </label>
          <input name="firstName" required placeholder="Adaeze" className={inputCls} />
        </div>
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-emerald-700 mb-1.5">
            Last Name
          </label>
          <input name="lastName" required placeholder="Okonkwo" className={inputCls} />
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-emerald-700 mb-1.5">
          Email
        </label>
        <input name="email" type="email" required placeholder="you@example.com" className={inputCls} />
      </div>

      {/* Role selector */}
      <div className="relative">
        <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-emerald-700 mb-1.5">
          Preferred Role
        </label>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`${inputCls} flex items-center justify-between text-left cursor-pointer`}
        >
          <span className={selected ? "text-zinc-800 dark:text-white" : "text-zinc-400 dark:text-emerald-700"}>
            {selected || "Select a role…"}
          </span>
          <ChevronDown size={14} className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="absolute z-20 top-full mt-1 w-full
            bg-white dark:bg-[#071f12]
            border border-zinc-100 dark:border-emerald-900/40
            rounded-xl shadow-xl overflow-hidden">
            {ROLE_OPTIONS.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => { setSelected(r); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm
                  hover:bg-emerald-50 dark:hover:bg-emerald-900/20
                  transition-colors
                  ${selected === r ? "text-[#064e3b] dark:text-emerald-400 font-bold" : "text-zinc-700 dark:text-white"}`}
              >
                {r}
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-emerald-700 mb-1.5">
          Tell us about yourself
        </label>
        <textarea
          name="message"
          rows={4}
          required
          placeholder="Your background, skills, and why you want to volunteer with Rurban Africa…"
          className={`${inputCls} resize-none`}
        />
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="w-full flex items-center justify-between
          bg-[#064e3b] hover:bg-emerald-800
          text-white px-6 py-4 rounded-xl
          font-black text-sm group
          transition-colors shadow-lg shadow-emerald-900/15"
      >
        Submit Application
        <span className="bg-amber-400 text-black rounded-full p-1.5 group-hover:rotate-45 transition-transform duration-300">
          <ArrowUpRight size={14} strokeWidth={3} />
        </span>
      </motion.button>
    </form>
  );
}

/* ══════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════ */
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function Volunteer() {
  const heroRef    = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const stepsRef   = useRef<HTMLDivElement>(null);
  const stepsInView = useInView(stepsRef, { once: true, margin: "-60px" });
  const formRef    = useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef, { once: true, margin: "-60px" });

  return (
    <main
      className="bg-[#F9FBFA] dark:bg-[#041d14] min-h-screen transition-colors duration-700"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="">
        <PageHero
                  tag="Volunteer at Rurban Africa"
                  title="Join Our Volunteer "
                  accentWord="Team"
                  description="Make a real impact by sharing your skills and time with rural communities across Africa. Whether you have 3 hours a week or can commit full-time, there's a role for you."
                  crumbs={[{ label: "Volunteer" }]}
                />
      </section>

      {/* ════════════════════ PERKS ════════════════════ */}
      <section className="py-10 border-y border-zinc-100 dark:border-emerald-900/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="flex flex-wrap gap-x-10 gap-y-4 justify-center">
            {PERKS.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-2.5 text-zinc-600 dark:text-emerald-100/60"
              >
                <span className="text-[#064e3b] dark:text-emerald-500">{p.icon}</span>
                <span className="text-sm font-semibold">{p.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ ROLES ════════════════════ */}
      <section id="roles" className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="text-center mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Open Volunteer Roles
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-zinc-500 dark:text-emerald-100/45 text-sm max-w-md mx-auto"
            >
              Find a role that fits your skills, schedule, and passion.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ROLES.map((role) => (
              <RoleCard key={role.title} role={role} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ PROCESS ════════════════════ */}
      <section className="py-20 bg-white dark:bg-[#071f12]">
        <div ref={stepsRef} className="max-w-7xl mx-auto px-6 lg:px-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={stepsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white mb-14 text-center"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            How It Works
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-zinc-100 dark:bg-emerald-900/30 -translate-x-8 z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-[#064e3b] flex items-center justify-center mb-4 shadow-md shadow-emerald-900/20">
                    <span className="text-white font-black text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {step.num}
                    </span>
                  </div>
                  <h3
                    className="font-black text-zinc-900 dark:text-white text-lg mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-zinc-500 dark:text-emerald-100/45 text-sm leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ FORM ════════════════════ */}
      <section id="apply" className="py-24">
        <div ref={formRef} className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="grid lg:grid-cols-[1fr_480px] gap-16 xl:gap-24 items-start">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="lg:sticky lg:top-32"
            >
              <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em]
                text-emerald-600 dark:text-emerald-400
                bg-emerald-50 dark:bg-emerald-900/30
                border border-emerald-200 dark:border-emerald-800/50
                px-4 py-1.5 rounded-full mb-6">
                Apply
              </span>
              <h2
                className="text-4xl md:text-[50px] font-black text-zinc-900 dark:text-white leading-tight mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Ready to make
                <span className="block italic text-emerald-700 dark:text-emerald-400">a difference?</span>
              </h2>
              <div className="h-[3px] w-12 bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full mb-6" />
              <p className="text-zinc-500 dark:text-emerald-100/50 text-sm leading-[1.9] max-w-sm mb-8">
                Fill out this short form and we'll match you to the right opportunity. Every volunteer matters — from one hour a week to full-time dedication.
              </p>
              <blockquote
                className="border-l-2 border-amber-400/50 pl-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                <p className="text-zinc-700 dark:text-white/80 text-lg italic leading-relaxed">
                  "No child's dream should be limited by their birthplace."
                </p>
              </blockquote>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white dark:bg-[#071f12]
                border border-zinc-100 dark:border-emerald-900/30
                rounded-3xl p-8 shadow-sm"
            >
              <VolunteerForm />
            </motion.div>

          </div>
        </div>
      </section>

    </main>
  );
}