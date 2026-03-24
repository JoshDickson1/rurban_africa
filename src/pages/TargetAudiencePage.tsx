"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight, BookOpen, Users, GraduationCap,
  Heart, Building2, Handshake, Target,
} from "lucide-react";
import PageHero from "@/_components/PageHero";

/* ══════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════ */
const AUDIENCES = [
  {
    icon:  <BookOpen size={22} strokeWidth={1.6} />,
    num:   "01",
    group: "Primary Beneficiaries",
    title: "Children & Youth (Ages 5–24)",
    accent: "emerald",
    traits: ["Rural and peri-urban communities", "Public and community schools", "Out-of-school children", "Girls at risk of early dropout"],
    body: "At the heart of everything we do are the children. From early primary pupils learning to read in overcrowded classrooms, to secondary students navigating the crucial fork between school and work, we meet them where they are and walk with them toward a bigger future. Our Dream Hubs, Pledge Notebooks, and scholarship programmes are built entirely around their needs and potential.",
    highlight: "bigger future",
  },
  {
    icon:  <GraduationCap size={22} strokeWidth={1.6} />,
    num:   "02",
    group: "Enablers",
    title: "Teachers & School Leaders",
    accent: "amber",
    traits: ["Under-resourced public school teachers", "Head teachers and principals", "Community tutors and facilitators", "Teacher-training programme participants"],
    body: "Teachers are the most powerful lever in a child's education, and the most under-supported. We invest in them through mentorship corners, professional development workshops, collaborative lesson planning, and access to teaching resources. When a teacher is equipped and believed in, the impact multiplies across every student in their care.",
    highlight: "most powerful lever",
  },
  {
    icon:  <Users size={22} strokeWidth={1.6} />,
    num:   "03",
    group: "Enablers",
    title: "Parents & Community Members",
    accent: "sky",
    traits: ["Mothers and fathers of enrolled children", "Local community elders and leaders", "Youth groups and local champions", "Women's cooperative organisations"],
    body: "Sustainable change does not happen to communities, it happens with them. We actively involve parents and local leaders in co-designing programmes, hosting wellness events, and sustaining Dream Hubs between our visits. When a community owns an initiative, it survives. When it doesn't, it fades.",
    highlight: "happens with them",
  },
  {
    icon:  <Heart size={22} strokeWidth={1.6} />,
    num:   "04",
    group: "Change Agents",
    title: "Young Professionals & Diaspora",
    accent: "rose",
    traits: ["Nigerian and African diaspora globally", "Urban professionals with rural roots", "Young graduates willing to give back", "Mentors and career role models"],
    body: "Many of Africa's most driven professionals grew up in or near the communities we serve. They carry both the lived experience and the skills to make a real difference. We channel that energy through structured volunteering, mentorship programmes, and partnerships that connect ambition with purpose and city with village.",
    highlight: "lived experience",
  },
  {
    icon:  <Building2 size={22} strokeWidth={1.6} />,
    num:   "05",
    group: "Partners",
    title: "Institutional & Government Bodies",
    accent: "violet",
    traits: ["State and local government education bodies", "SUBEB and UBEC partners", "Development finance institutions", "UN agencies and multilateral organisations"],
    body: "We work alongside government and institutional partners to align our community-level work with national education policy and SDG commitments. These partnerships allow us to scale our pilots into systemic change, and ensure our impact is officially recognised, documented, and replicated.",
    highlight: "systemic change",
  },
  {
    icon:  <Handshake size={22} strokeWidth={1.6} />,
    num:   "06",
    group: "Partners",
    title: "Corporates, NGOs & Funders",
    accent: "teal",
    traits: ["CSR-driven corporations in Nigeria & globally", "International development NGOs", "Philanthropic foundations", "Individual major donors"],
    body: "We partner with organisations and individuals who understand that true impact requires more than a cheque, it requires co-investment of strategy, skills, and long-term commitment. Our funders receive transparent impact reporting, named recognition, and direct visibility into the communities their support transforms.",
    highlight: "long-term commitment",
  },
];

const REACH_STATS = [
  { num: "5–24",  label: "Age range of direct beneficiaries" },
  { num: "6+",   label: "Communities reached" },
  { num: "6",     label: "Distinct audience groups" },
  { num: "100%",  label: "Community co-designed" },
];

/* ── Highlighted body ── */
function HighBody({ text, keyword }: { text: string; keyword: string }) {
  const parts = text.split(keyword);
  return (
    <p className="text-zinc-500 dark:text-emerald-100/50 text-[14px] leading-[1.9]">
      {parts.map((p, i) => (
        <span key={i}>
          {p}
          {i < parts.length - 1 && <span className="text-amber-500 font-semibold">{keyword}</span>}
        </span>
      ))}
    </p>
  );
}

/* ── Audience card ── */
function AudienceCard({ a }: { a: typeof AUDIENCES[0] }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white dark:bg-[#071f12]
        border border-zinc-100 dark:border-emerald-900/30
        rounded-2xl overflow-hidden
        hover:border-emerald-200 dark:hover:border-emerald-700/40
        hover:shadow-xl hover:shadow-emerald-900/6
        transition-all duration-300"
    >
      {/* Top accent bar */}
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.45, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="h-[2px] bg-gradient-to-r from-[#064e3b] to-emerald-400"
      />

      <div className="p-6">
        {/* Header row */}
        <div className="flex items-start gap-4 mb-4">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: "spring", stiffness: 250, damping: 20, delay: 0.2 }}
            className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/30
              flex items-center justify-center text-[#064e3b] dark:text-emerald-400
              group-hover:bg-[#064e3b] group-hover:text-white
              transition-all duration-250 shrink-0"
          >
            {a.icon}
          </motion.div>

          <div className="flex-1 min-w-0 pt-0.5">
            <span className="inline-block text-[9px] font-black uppercase tracking-[0.22em]
              text-zinc-400 dark:text-emerald-700
              bg-zinc-50 dark:bg-emerald-950/40
              border border-zinc-100 dark:border-emerald-900/30
              px-2.5 py-1 rounded-full mb-1.5">
              {a.group}
            </span>
            <h3
              className="font-black text-zinc-900 dark:text-white text-[16px] leading-snug
                group-hover:text-[#064e3b] dark:group-hover:text-emerald-400 transition-colors"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {a.title}
            </h3>
          </div>

          <span className="text-[10px] font-black text-zinc-300 dark:text-emerald-900/60 pt-1 shrink-0"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            {a.num}
          </span>
        </div>

        {/* Traits */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {a.traits.map((t) => (
            <span key={t} className="text-[11px] font-medium
              text-zinc-600 dark:text-emerald-200/60
              bg-zinc-50 dark:bg-emerald-900/20
              border border-zinc-100 dark:border-emerald-900/30
              px-2.5 py-1 rounded-full">
              {t}
            </span>
          ))}
        </div>

        <div className="h-px bg-zinc-100 dark:bg-emerald-900/30 mb-4" />
        <HighBody text={a.body} keyword={a.highlight} />
      </div>
    </motion.div>
  );
}

const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as any },
  }),
};

export default function TargetAudience() {
  const heroRef   = useRef<HTMLDivElement>(null);
  const heroView  = useInView(heroRef, { once: true });
  const statsRef  = useRef<HTMLDivElement>(null);
  const statsView = useInView(statsRef, { once: true, margin: "-60px" });

  return (
    <main
      className="bg-[#F9FBFA] dark:bg-[#041d14] min-h-screen transition-colors duration-700"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >

      {/* ══════════ HERO ══════════ */}
      <section className="">
        <PageHero
        tag="Who We Serve"
        title="Our Target"
        accentWord="Audience"
        description="Our work touches six interconnected groups, from children in rural classrooms to global funders. Each plays a distinct role in the ecosystem of change we are building across Africa."
        crumbs={[{ label: "Target Audience" }]}
      />
      </section>

      {/* ══════════ STATS ══════════ */}
      <section className="py-14 border-y border-zinc-100 dark:border-emerald-900/20 bg-white dark:bg-[#071f12]">
        <div ref={statsRef} className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {REACH_STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 14 }}
                animate={statsView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <p className="text-4xl font-black text-zinc-900 dark:text-white mb-1.5"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  {s.num}
                </p>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400 dark:text-emerald-700 leading-snug">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ GROUP CARDS ══════════ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="text-center mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Six Groups. One Ecosystem.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-zinc-500 dark:text-emerald-100/45 text-sm max-w-md mx-auto"
            >
              Each group is essential. Change happens where children, educators, communities, professionals, institutions, and funders act together.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {AUDIENCES.map((a) => <AudienceCard key={a.num} a={a} />)}
          </div>
        </div>
      </section>

      {/* ══════════ CTA STRIP ══════════ */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #064e3b 0%, #052e20 55%, #021a0e 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[400px] rounded-full bg-emerald-400/8 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-300/50 mb-4">
              Where do you fit?
            </p>
            <h2
              className="text-3xl md:text-4xl font-black text-white leading-tight mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Whoever you are,
              <span className="block italic text-amber-400">there's a role for you.</span>
            </h2>
            <p className="text-emerald-100/60 text-sm leading-relaxed max-w-md">
              Whether you're a teacher looking for support, a young professional wanting to give back,
              a company seeking purposeful CSR, or a funder ready to invest in Africa's next generation —
              we want to hear from you.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
            <motion.a
              href="/volunteer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-amber-400 hover:bg-amber-300
                text-black px-7 py-4 rounded-full font-black text-sm group
                transition-colors shadow-xl shadow-black/20"
            >
              Volunteer with us
              <span className="bg-black/10 rounded-full p-1.5 group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight size={14} strokeWidth={3} />
              </span>
            </motion.a>
            <motion.a
              href="/partner"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3
                border-2 border-white/20 hover:border-white/40 hover:bg-white/5
                text-white px-7 py-4 rounded-full font-black text-sm transition-all"
            >
              Partner with us
            </motion.a>
          </div>
        </div>
      </section>

    </main>
  );
}