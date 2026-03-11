"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight, Star, Building2, Users, HandHeart,
  BarChart3, Globe, CheckCircle2, ChevronDown,
} from "lucide-react";

/* ══════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════ */
const BENEFITS = [
  {
    icon: <BarChart3 size={17} strokeWidth={1.8} />,
    title: "Weekly Progress Reports",
    body: "Receive detailed milestone updates, activity summaries, and impact metrics every week so you always know exactly what your sponsorship is building.",
  },
  {
    icon: <Globe size={17} strokeWidth={1.8} />,
    title: "Public Recognition",
    body: "If desired, receive prominent recognition on our website, social media channels, reports, and live events as the sponsor behind a life-changing Hub.",
  },
  {
    icon: <Users size={17} strokeWidth={1.8} />,
    title: "Community Partnership",
    body: "Become a named partner in the community you sponsor. Your contribution is woven into the identity and story of that Dream Hub for years to come.",
  },
  {
    icon: <HandHeart size={17} strokeWidth={1.8} />,
    title: "Village Selection",
    body: "Choose a village you care about, suggest one jointly with our team, or let us identify the highest-need location. The choice is yours.",
  },
];

const TIERS = [
  {
    label: "Full Sponsor",
    amount: "$50,000",
    amountSub: "Single contributor",
    icon: <Star size={18} strokeWidth={1.8} />,
    featured: true,
    perks: [
      "Full naming rights for the Dream Hub",
      "All four sponsor benefits included",
      "Dedicated impact report monthly",
      "Invitation to the official Hub launch event",
      "Village selection — your choice or ours",
    ],
  },
  {
    label: "Co-Sponsor",
    amount: "From $10,000",
    amountSub: "Multiple contributors",
    icon: <Users size={18} strokeWidth={1.8} />,
    featured: false,
    perks: [
      "Shared recognition as a co-founding sponsor",
      "Weekly progress reports",
      "Public recognition if desired",
      "Contribute any amount toward the $50,000 goal",
      "Combine with other partners to fully fund a Hub",
    ],
  },
  {
    label: "Corporate Partner",
    amount: "Custom",
    amountSub: "CSR-aligned package",
    icon: <Building2 size={18} strokeWidth={1.8} />,
    featured: false,
    perks: [
      "Bespoke partnership agreement",
      "Employee engagement opportunities",
      "Co-branded materials and events",
      "Detailed ESG and CSR impact reporting",
      "Long-term community visibility",
    ],
  },
];

/* ══════════════════════════════════════════════════
   TIER CARD
══════════════════════════════════════════════════ */
function TierCard({ tier, index, inView }: {
  tier: typeof TIERS[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative rounded-2xl overflow-hidden flex flex-col
        transition-all duration-300
        ${tier.featured
          ? "bg-[#064e3b] border border-emerald-700/40 shadow-2xl shadow-emerald-900/30"
          : "bg-white dark:bg-[#071f12] border border-zinc-100 dark:border-emerald-900/30 hover:border-emerald-200 dark:hover:border-emerald-700/40 hover:shadow-lg hover:shadow-emerald-900/5"
        }`}
    >
      {/* Top accent */}
      {tier.featured && (
        <>
          <div className="h-[2.5px] bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400" />
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        </>
      )}
      {!tier.featured && (
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.45, delay: index * 0.1 + 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-[2px] bg-gradient-to-r from-[#064e3b] to-emerald-400"
        />
      )}

      <div className="p-6 flex-1 flex flex-col relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0
            ${tier.featured
              ? "bg-amber-400/15 text-amber-300"
              : "bg-emerald-50 dark:bg-emerald-900/30 text-[#064e3b] dark:text-emerald-400"
            }`}>
            {tier.icon}
          </div>
          {tier.featured && (
            <span className="text-[9px] font-black uppercase tracking-[0.22em]
              text-amber-300 bg-amber-400/15 border border-amber-400/25
              px-2.5 py-1 rounded-full">
              Most Popular
            </span>
          )}
        </div>

        <p className={`text-[11px] font-black uppercase tracking-[0.2em] mb-1
          ${tier.featured ? "text-emerald-300/60" : "text-zinc-400 dark:text-emerald-700"}`}>
          {tier.label}
        </p>

        <p
          className={`text-3xl font-black mb-0.5
            ${tier.featured ? "text-white" : "text-zinc-900 dark:text-white"}`}
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {tier.amount}
        </p>
        <p className={`text-[11px] mb-5
          ${tier.featured ? "text-emerald-200/50" : "text-zinc-400 dark:text-emerald-700"}`}>
          {tier.amountSub}
        </p>

        <div className={`h-px mb-5 ${tier.featured ? "bg-white/10" : "bg-zinc-100 dark:bg-emerald-900/30"}`} />

        {/* Perks */}
        <ul className="space-y-2.5 flex-1">
          {tier.perks.map((p) => (
            <li key={p} className="flex items-start gap-2.5">
              <CheckCircle2 size={13} className={`shrink-0 mt-0.5
                ${tier.featured ? "text-emerald-400" : "text-emerald-500 dark:text-emerald-500"}`} />
              <span className={`text-[13px] leading-snug
                ${tier.featured ? "text-emerald-100/75" : "text-zinc-600 dark:text-emerald-100/55"}`}>
                {p}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <motion.a
          href="/partner"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className={`mt-6 flex items-center justify-between
            px-5 py-3.5 rounded-xl font-black text-sm group
            transition-all duration-200
            ${tier.featured
              ? "bg-amber-400 hover:bg-amber-300 text-black shadow-lg shadow-amber-900/20"
              : "bg-[#064e3b] hover:bg-emerald-800 text-white shadow-md shadow-emerald-900/10"
            }`}
        >
          Get in touch
          <span className={`rounded-full p-1.5 group-hover:rotate-45 transition-transform duration-300
            ${tier.featured ? "bg-black/10" : "bg-amber-400 text-black"}`}>
            <ArrowUpRight size={13} strokeWidth={3} />
          </span>
        </motion.a>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   BENEFIT CARD
══════════════════════════════════════════════════ */
function BenefitCard({ b, index, inView }: {
  b: typeof BENEFITS[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className="group flex items-start gap-4
        bg-white dark:bg-[#071f12]
        border border-zinc-100 dark:border-emerald-900/30
        hover:border-emerald-200 dark:hover:border-emerald-700/40
        rounded-2xl p-5
        hover:shadow-md hover:shadow-emerald-900/5
        transition-all duration-300"
    >
      <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/30
        flex items-center justify-center text-[#064e3b] dark:text-emerald-400
        group-hover:bg-[#064e3b] group-hover:text-white
        transition-all duration-250 shrink-0 mt-0.5">
        {b.icon}
      </div>
      <div>
        <h4
          className="font-black text-zinc-900 dark:text-white text-[14px] mb-1
            group-hover:text-[#064e3b] dark:group-hover:text-emerald-400 transition-colors"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {b.title}
        </h4>
        <p className="text-zinc-500 dark:text-emerald-100/50 text-[13px] leading-relaxed">
          {b.body}
        </p>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   FAQ ACCORDION
══════════════════════════════════════════════════ */
const FAQS = [
  {
    q: "Can I choose which village receives my Dream Hub?",
    a: "Yes. You may propose a village, select one from our shortlist of high-need communities, or agree on a location jointly with our team. We are flexible and will work with your preferences while ensuring the community is truly ready and willing to host a Hub.",
  },
  {
    q: "What does the $50,000 cover?",
    a: "The full contribution funds the physical setup of a Dream Hub: space renovation, solar power installation, devices and furniture, learning materials, signage, facilitator training, and the first year of operational running costs.",
  },
  {
    q: "How does co-sponsorship work?",
    a: "Multiple contributors can pool resources to reach the $50,000 target. Each co-sponsor is recognised publicly if desired, receives progress reports, and is credited in all Hub materials. There is no minimum contribution required to participate as a co-sponsor.",
  },
  {
    q: "How will I know my contribution is making impact?",
    a: "You will receive detailed weekly progress reports from the moment your contribution is confirmed: covering construction milestones, facilitator training, student enrolment, and early programme outcomes. You are also welcome to visit the community.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-xl overflow-hidden transition-colors duration-200
      ${open
        ? "border-emerald-200 dark:border-emerald-700/40 bg-white dark:bg-[#071f12]"
        : "border-zinc-100 dark:border-emerald-900/30 bg-white dark:bg-[#071f12]"
      }`}>
      <button
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className="font-black text-zinc-800 dark:text-white text-[14px] leading-snug"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {q}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-zinc-400 dark:text-emerald-600 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-5 text-zinc-500 dark:text-emerald-100/55 text-[13px] leading-[1.85]">
          {a}
        </p>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════ */
export default function DreamHubsSponsorship() {
  const introRef   = useRef<HTMLDivElement>(null);
  const introView  = useInView(introRef, { once: true, margin: "-60px" });
  const tierRef    = useRef<HTMLDivElement>(null);
  const tierView   = useInView(tierRef, { once: true, margin: "-60px" });
  const benefitRef = useRef<HTMLDivElement>(null);
  const benefitView = useInView(benefitRef, { once: true, margin: "-60px" });
  const faqRef     = useRef<HTMLDivElement>(null);
  const faqView    = useInView(faqRef, { once: true, margin: "-60px" });

  return (
    <section className="bg-[#F9FBFA] dark:bg-[#041d14] transition-colors duration-700">

      {/* ══ INTRO BLOCK ══ */}
      <div className="py-24 border-b border-zinc-100 dark:border-emerald-900/20">
        <div ref={introRef} className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="grid lg:grid-cols-[1fr_420px] gap-16 xl:gap-24 items-center">

            {/* Left text */}
            <div>
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={introView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em]
                  text-emerald-600 dark:text-emerald-400
                  bg-emerald-50 dark:bg-emerald-900/30
                  border border-emerald-200 dark:border-emerald-800/50
                  px-4 py-1.5 rounded-full mb-6"
              >
                <Star size={10} strokeWidth={3} />
                Sponsorship Opportunities
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                animate={introView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl md:text-[50px] font-black text-zinc-900 dark:text-white
                  leading-[1.0] tracking-tight mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Fund a Dream Hub.
                <span className="block italic text-emerald-700 dark:text-emerald-400">
                  Change a village.
                </span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, scaleX: 0, originX: 0 }}
                animate={introView ? { opacity: 1, scaleX: 1 } : {}}
                transition={{ duration: 0.45, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="h-[3px] w-14 bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full mb-6"
              />

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={introView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-zinc-600 dark:text-emerald-100/60 text-base leading-[1.85] mb-5 max-w-lg"
              >
                We invite individuals, corporations, and partners to make a transformative impact by sponsoring a Rurban Africa Dream Hub. For a contribution of{" "}
                <span className="font-black text-zinc-900 dark:text-white">$50,000</span>, a sponsor can fully fund the establishment of a Dream Hub in a selected village.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={introView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="text-zinc-500 dark:text-emerald-100/50 text-sm leading-[1.85] mb-8 max-w-lg"
              >
                The village may be chosen by us, proposed by the sponsor, or determined jointly through mutual agreement.{" "}
                <span className="text-amber-500 font-semibold">Co-sponsorship is also warmly welcomed</span> — multiple partners can combine contributions to bring a Hub to life.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={introView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap gap-3"
              >
                <a
                  href="/partner"
                  className="inline-flex items-center gap-3
                    bg-[#064e3b] hover:bg-emerald-800
                    text-white px-7 py-4 rounded-full
                    font-black text-sm group
                    transition-colors shadow-xl shadow-emerald-900/20"
                >
                  Become a Sponsor
                  <span className="bg-amber-400 text-black rounded-full p-1.5 group-hover:rotate-45 transition-transform duration-300">
                    <ArrowUpRight size={14} strokeWidth={3} />
                  </span>
                </a>
                <a
                  href="/donate"
                  className="inline-flex items-center gap-3
                    border-2 border-zinc-200 dark:border-emerald-800/60
                    hover:border-[#064e3b] dark:hover:border-emerald-500
                    text-zinc-700 dark:text-emerald-300
                    px-7 py-4 rounded-full font-black text-sm transition-all"
                >
                  Make a donation
                </a>
              </motion.div>
            </div>

            {/* Right: visual callout card */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={introView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="rounded-3xl overflow-hidden relative"
                style={{ background: "linear-gradient(160deg, #064e3b 0%, #052e20 55%, #021a0e 100%)" }}
              >
                {/* Grain */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-emerald-400/8 blur-3xl pointer-events-none" />

                <div className="relative z-10 p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center">
                      <Star size={14} className="text-amber-400" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-300/60">
                      Every sponsor receives
                    </span>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {[
                      { letter: "a", text: "Regular weekly progress reports detailing milestones, activities, and impact" },
                      { letter: "b", text: "Special public recognition on our website, social media, reports, and events — if desired" },
                    ].map((item) => (
                      <li key={item.letter} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-amber-400/15 border border-amber-400/25
                          flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-amber-400 font-black text-[10px]">{item.letter}</span>
                        </span>
                        <p className="text-emerald-100/70 text-[13px] leading-relaxed">{item.text}</p>
                      </li>
                    ))}
                  </ul>

                  <div className="h-px bg-white/8 mb-6" />

                  <blockquote
                    className="text-white/80 text-sm italic leading-relaxed"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    "By sponsoring a Dream Hub, you become a key partner in empowering rural communities, fostering innovation, and turning dreams into sustainable reality."
                  </blockquote>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ══ SPONSORSHIP TIERS ══ */}
      <div className="py-24 bg-white dark:bg-[#071f12] border-b border-zinc-100 dark:border-emerald-900/20">
        <div ref={tierRef} className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="text-center mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={tierView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Sponsorship Tiers
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={tierView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-zinc-500 dark:text-emerald-100/45 text-sm max-w-md mx-auto"
            >
              Whether you fund a Hub alone or join a group of co-sponsors, every contribution builds something permanent.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 items-start">
            {TIERS.map((tier, i) => (
              <TierCard key={tier.label} tier={tier} index={i} inView={tierView} />
            ))}
          </div>
        </div>
      </div>

      {/* ══ SPONSOR BENEFITS ══ */}
      <div className="py-24">
        <div ref={benefitRef} className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="grid lg:grid-cols-[360px_1fr] gap-16 xl:gap-24 items-start">

            {/* Sticky left header */}
            <div className="lg:sticky lg:top-32">
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={benefitView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em]
                  text-emerald-600 dark:text-emerald-400
                  bg-emerald-50 dark:bg-emerald-900/30
                  border border-emerald-200 dark:border-emerald-800/50
                  px-4 py-1.5 rounded-full mb-6"
              >
                What you get
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                animate={benefitView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white leading-tight mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Sponsor benefits, built on
                <span className="italic text-emerald-700 dark:text-emerald-400"> transparency.</span>
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, scaleX: 0, originX: 0 }}
                animate={benefitView ? { opacity: 1, scaleX: 1 } : {}}
                transition={{ duration: 0.45, delay: 0.18 }}
                className="h-[3px] w-12 bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full mb-5"
              />
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={benefitView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="text-zinc-500 dark:text-emerald-100/50 text-sm leading-[1.85]"
              >
                We don't just take funding. We build relationships. Every sponsor is kept fully informed, celebrated if they wish, and treated as a genuine partner in the work.
              </motion.p>
            </div>

            {/* Benefit cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {BENEFITS.map((b, i) => (
                <BenefitCard key={b.title} b={b} index={i} inView={benefitView} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══ FAQ ══ */}
      <div className="py-20 bg-white dark:bg-[#071f12] border-t border-zinc-100 dark:border-emerald-900/20">
        <div ref={faqRef} className="max-w-3xl mx-auto px-6 lg:px-14">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={faqView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white text-center mb-10"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Common Questions
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={faqView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-3"
          >
            {FAQS.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
}