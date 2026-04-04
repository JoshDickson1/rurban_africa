"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight, Download, Users, BookOpen, MapPin, School, Handshake, Quote,
} from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "@/_components/PageHero";
import ImpactHeroImage from "@/_components/ImpactHeroImage";

/* ══════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════ */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
      text-[10px] font-black uppercase tracking-[0.28em]
      text-emerald-600 dark:text-emerald-400
      bg-emerald-50 dark:bg-emerald-900/30
      border border-emerald-200 dark:border-emerald-800/50 mb-5">
      {children}
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white leading-tight mb-6"
      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
    >
      {children}
    </h2>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-zinc-600 dark:text-emerald-100/60 text-[15px] leading-[1.9] mb-4">
      {children}
    </p>
  );
}

function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-zinc-600 dark:text-emerald-100/60 text-[15px] leading-relaxed">
      <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
      {children}
    </li>
  );
}

function Divider() {
  return <div className="h-px bg-zinc-100 dark:bg-emerald-900/25 my-12" />;
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   STATS
══════════════════════════════════════════════════ */
const METRICS = [
  { value: "1,950+", label: "Children directly reached and inspired",  icon: Users    },
  { value: "6",      label: "Communities engaged (Delta & Enugu)",      icon: MapPin   },
  { value: "3,000+", label: "Pledge Notebooks distributed",             icon: BookOpen },
  { value: "6",      label: "Schools visited (primary & secondary)",    icon: School   },
];

/* ══════════════════════════════════════════════════
   SCHOOLS
══════════════════════════════════════════════════ */
const SCHOOLS = [
  {
    letter: "a",
    name: "Awunfa Primary School, Ekwuoma Kingdom, Delta State",
    date: "January 2026",
    desc: "We delivered messages on leadership and nation-building, concluding with a unified Pledge recitation.",
  },
  {
    letter: "b",
    name: "Ijehon Primary School, Umunede Kingdom, Delta State",
    date: "January 2026",
    desc: "We facilitated an energetic Pledge session that generated visible enthusiasm and pride.",
  },
  {
    letter: "c",
    name: "Ilabor Primary School, Igbodo Kingdom, Delta State",
    date: "January 2026",
    desc: "We provided inspiration alongside practical items to support learning journeys.",
  },
  {
    letter: "d",
    name: "Community Secondary School, Umueze Awkunanaw, Enugu State",
    date: "January 2026",
    desc: "We created meaningful connections that underscored the value of sustained outreach.",
  },
  {
    letter: "e",
    name: "Ngbile Primary School, Kiagbodo, Burutu LGA, Delta State",
    date: "February 2026",
    desc: "We engaged young learners in discussions on self-belief and dreaming without limits.",
  },
  {
    letter: "f",
    name: "Station Primary School, Agbani Community, Enugu State",
    date: "February 2026",
    desc: "We focused on hygiene, future aspirations, and African representation, with notebook distribution and group affirmations.",
  },
];

/* ══════════════════════════════════════════════════
   OUTLOOK
══════════════════════════════════════════════════ */
const OUTLOOK = [
  "Reach a cumulative total of 5,000+ children empowered",
  "Expand engagement to 10+ communities across additional regions",
  "Distribute 7,500+ Pledge Notebooks",
  "Strengthen outcome measurement through follow-up surveys, teacher partnerships, and baseline comparisons",
  "Forge strategic alliances to ensure program sustainability and scale",
];

/* ══════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════ */
export default function Impacts() {
  return (
    <div
      className="bg-[#F9FBFA] dark:bg-[#041d14] min-h-screen transition-colors duration-700"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <PageHero
        tag="Impact Report"
        title="Q1 2026"
        accentWord="Impact Update"
        description="Bridging the Rural-Urban Divide: Inspiring Minds and Building Futures: January to March 2026."
        crumbs={[{ label: "Impact" }]}
      >
        <div className="">
          <ImpactHeroImage  />
        </div>
        {/* PDF download inside hero */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href="/Rurban_Africa_pdf_Q1_.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5
              bg-amber-400 hover:bg-amber-300 text-black
              px-6 py-3 rounded-full font-black text-sm
              transition-colors shadow-lg shadow-black/20 text-white"
          >
            <Download size={14} strokeWidth={3} />
            Download full PDF
            <span className="bg-emerald-900 text-white rounded-full p-1 group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight size={12} strokeWidth={3} />
            </span>
          </a>
          <span className="text-emerald-100/40 text-[11px] uppercase tracking-widest font-bold">
            March 2026
          </span>
        </div>
      </PageHero>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-14 py-16 lg:py-24">
        <div className="grid lg:grid-cols-[1fr_300px] gap-14 items-start">

          {/* ── LEFT: Article body ── */}
          <article className="min-w-0 space-y-0">

            {/* INTRO */}
            <FadeIn>
              <SectionLabel>Introduction</SectionLabel>
              <SectionHeading>One Africa. Two Worlds. One Future.</SectionHeading>
              <Prose>
                Founded in 2025 as a Pan-African non-profit organization, Rurban Africa is dedicated to erasing the invisible lines that separate rural and peri-urban communities from urban opportunities. Our mission is rooted in the belief that every child, regardless of geographic location, deserves equal access to inspiration, education, and the tools to dream boldly and rise with Africa.
              </Prose>
              <Prose>
                Through community-led programs focused on education, youth/community empowerment, and pride in African identity, we deliver targeted interventions that foster self-belief, purpose, and collective progress. In the first quarter of 2026, we continued to advance this vision with measurable, on-the-ground impact in Nigeria's rural and peri-urban landscapes.
              </Prose>
            </FadeIn>

            <Divider />

            {/* PROGRAMME FOCUS */}
            <FadeIn>
              <SectionLabel>Programme Focus</SectionLabel>
              <SectionHeading>Communities &amp; School Outreach</SectionHeading>
              <Prose>
                Our flagship initiative, the Communities &amp; School Outreach, combines school visits, interactive motivational sessions, group recitations of the Rurban Africa Pledge, and the distribution of empowerment tools. These sessions emphasize:
              </Prose>
              <ul className="space-y-3 mb-6 pl-1">
                <BulletItem>Building self-confidence and the courage to pursue ambitious dreams</BulletItem>
                <BulletItem>Developing leadership qualities and a vision for a greater Africa</BulletItem>
                <BulletItem>Promoting personal development, including hygiene practices and career exploration</BulletItem>
                <BulletItem>Reinforcing African pride and unity through the daily affirmation of the Rurban Africa Pledge</BulletItem>
              </ul>
            </FadeIn>

            <Divider />

            {/* PLEDGE NOTEBOOKS */}
            <FadeIn>
              <SectionLabel>Spotlight</SectionLabel>
              <SectionHeading>The Rurban Africa Pledge Notebooks</SectionHeading>
              <Prose>
                At the heart of our outreach efforts are the Rurban Africa Pledge Notebooks, a signature, purpose-designed empowerment tool that transforms a simple school supply into a lasting source of motivation and self-affirmation.
              </Prose>
              <Prose>
                These notebooks are intentionally crafted to go beyond blank pages for notes or homework. Each one serves as a portable, daily companion that embeds empowering content to help children internalize positive self-talk, discipline, and a sense of shared African destiny.
              </Prose>

              <h3
                className="text-lg font-black text-zinc-900 dark:text-white mb-4 mt-8"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Key elements include:
              </h3>

              <div className="space-y-5 mb-8">
                {[
                  {
                    title: "Embedded Affirmations and Themes",
                    body: `Pages feature powerful messages centered on pride in African roots and identity, with the central daily pledge: "Africa is rising, and I am rising with it." Additional content promotes purpose, personal growth, leadership, self-belief, and the pursuit of ambitious futures.`,
                  },
                  {
                    title: "Daily Use and Reflection",
                    body: "Children use the notebooks not only for schoolwork but also for writing personal affirmations, journaling dreams and goals, and reinforcing lessons from our sessions such as hygiene reminders, career aspirations, or motivation on challenging days.",
                  },
                  {
                    title: "Symbolic and Emotional Impact",
                    body: "Distribution during visits becomes a meaningful ritual. Children line up with visible excitement, receive their notebooks with pride, hold them close, and often wave them enthusiastically as teams depart. In Igbodo Kingdom, pupils ran alongside our vehicle waving their new Pledge Notebooks, capturing the deep emotional connection these tools create.",
                  },
                ].map((item) => (
                  <div key={item.title} className="pl-5 border-l-2 border-emerald-200 dark:border-emerald-800">
                    <p className="text-[14px] font-black text-zinc-800 dark:text-white mb-1">{item.title}</p>
                    <p className="text-zinc-600 dark:text-emerald-100/55 text-[14px] leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>

              <Prose>
                The notebooks extend our reach far beyond the immediate session. With over 3,000 distributed (exceeding the 1,950+ children directly reached), extras reach siblings, family members, and peers, creating ripple effects of inspiration within households and communities.
              </Prose>

              {/* Pull quote */}
              <div className="my-8 relative bg-[#064e3b] rounded-2xl px-8 py-7 overflow-hidden">
                <span className="absolute -top-2 left-5 text-7xl text-amber-400/25 font-serif leading-none select-none">"</span>
                <div className="flex gap-3 relative z-10">
                  <Quote size={18} className="text-amber-400/60 shrink-0 mt-1" />
                  <blockquote
                    className="text-emerald-50 text-[15px] italic leading-relaxed"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    This book tells me I am important and that I can achieve anything.
                    <span className="block mt-2 text-emerald-300/60 text-[12px] not-italic font-bold uppercase tracking-widest">
                      A child, during a recent school visit
                    </span>
                  </blockquote>
                </div>
              </div>

              <Prose>
                Every child deserves a notebook that speaks to their greatness. Through the Pledge Notebooks, we are not merely distributing stationery, we are equipping young minds with daily reminders of their potential and their place in a rising Africa.
              </Prose>
            </FadeIn>

            <Divider />

            {/* KEY ACTIVITIES */}
            <FadeIn>
              <SectionLabel>Key Activities</SectionLabel>
              <SectionHeading>Schools Visited: Q1 2026</SectionHeading>
              <Prose>
                Our team conducted multiple school engagements across Delta State and Enugu State, delivering inspirational programming directly to primary and secondary students:
              </Prose>

              <div className="space-y-4 mt-6">
                {SCHOOLS.map((school) => (
                  <div
                    key={school.letter}
                    className="flex gap-4 p-5 rounded-2xl
                      bg-white dark:bg-[#071f12]
                      border border-zinc-100 dark:border-emerald-900/25
                      shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    {/* Letter badge */}
                    <div className="w-9 h-9 rounded-xl bg-[#064e3b] flex items-center justify-center shrink-0 shadow-md shadow-emerald-900/20">
                      <span className="text-white font-black text-sm uppercase">{school.letter}</span>
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <p className="text-[14px] font-black text-zinc-900 dark:text-white leading-snug">
                          {school.name}
                        </p>
                        <span className="px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wide shrink-0">
                          {school.date}
                        </span>
                      </div>
                      <p className="text-zinc-500 dark:text-emerald-100/50 text-[13px] leading-relaxed">
                        {school.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-zinc-500 dark:text-emerald-100/40 text-[13px] italic">
                These activities spanned six communities and involved direct interaction with children in resource-constrained settings.
              </p>
            </FadeIn>

            <Divider />

            {/* IMPACT METRICS */}
            <FadeIn>
              <SectionLabel>Impact Metrics</SectionLabel>
              <SectionHeading>Results as of March 2026</SectionHeading>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {METRICS.map((m) => {
                  const Icon = m.icon;
                  return (
                    <div
                      key={m.label}
                      className="p-6 rounded-2xl bg-white dark:bg-[#071f12]
                        border border-zinc-100 dark:border-emerald-900/25 shadow-sm"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                        <Icon size={15} className="text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div
                        className="text-3xl font-black text-zinc-900 dark:text-white mb-1"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        {m.value}
                      </div>
                      <p className="text-[12px] text-zinc-500 dark:text-emerald-100/50 leading-snug">{m.label}</p>
                    </div>
                  );
                })}
              </div>

              <Prose>
                These outputs reflect efficient delivery. An average of approximately 325 children per community, with notebooks distributed at a ratio exceeding 1.5 per child reached, enabling broader family and peer influence.
              </Prose>
              <Prose>
                Qualitative indicators include high levels of participation (over 90% enthusiastic involvement in Pledge recitations), reports of increased confidence and aspiration among children, and positive feedback from educators noting greater engagement and pride in African identity.
              </Prose>
            </FadeIn>

            <Divider />

            {/* STORIES OF TRANSFORMATION */}
            <FadeIn>
              <SectionLabel>Stories of Transformation</SectionLabel>
              <SectionHeading>The Moments That Matter</SectionHeading>
              <Prose>
                The true measure of our work lies in the moments of connection. Children reciting the Pledge with conviction; bright eyes lighting up as they articulate dreams of becoming doctors, engineers, or changemakers; teachers observing renewed motivation in the classroom. The Pledge Notebooks amplify these moments, providing a tangible reminder that sustains inspiration long after our visits conclude.
              </Prose>
            </FadeIn>

            <Divider />

            {/* CHALLENGES */}
            <FadeIn>
              <SectionLabel>Challenges &amp; Strategic Insights</SectionLabel>
              <SectionHeading>What We Are Learning</SectionHeading>
              <Prose>
                Operating as an emerging organization, we navigate resource constraints while prioritizing authentic, community-embedded delivery. Follow-up mechanisms and longitudinal outcome tracking remain key priorities for refinement in subsequent quarters.
              </Prose>
              <Prose>
                Early lessons highlight the power of low-cost, high-engagement models such as the Pledge Notebooks in rural contexts, where presence, affirmation, and simple tools yield disproportionate returns.
              </Prose>
            </FadeIn>

            <Divider />

            {/* OUTLOOK */}
            <FadeIn>
              <SectionLabel>Outlook for 2026</SectionLabel>
              <SectionHeading>Building on the Foundation</SectionHeading>
              <Prose>Building on this foundation, Rurban Africa aims to:</Prose>
              <ul className="space-y-3 mb-6 pl-1">
                {OUTLOOK.map((item, i) => (
                  <BulletItem key={i}>{item}</BulletItem>
                ))}
              </ul>
            </FadeIn>

            <Divider />

            {/* CALL TO PARTNERSHIP */}
            <FadeIn>
              <div
                className="relative rounded-3xl overflow-hidden p-8 md:p-10"
                style={{ background: "linear-gradient(160deg, #064e3b 0%, #052e20 55%, #021a0e 100%)" }}
              >
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
                <div className="absolute -top-20 right-0 w-64 h-64 rounded-full bg-amber-400/5 blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                    border border-amber-400/30 bg-amber-400/10 text-amber-400
                    text-[10px] font-black uppercase tracking-[0.28em] mb-5">
                    <Handshake size={11} />
                    Call to Partnership
                  </span>

                  <h2
                    className="text-2xl md:text-3xl font-black text-white leading-tight mb-4"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Join us in writing the next chapter
                  </h2>

                  <p className="text-emerald-100/65 text-[14px] leading-relaxed mb-2">
                    The progress achieved in Q1 2026 demonstrates the potential of focused, heartfelt action to bridge divides and unlock potential. We invite individuals, corporations, foundations, and fellow organizations to join us through donations (including support for Pledge Notebook production and distribution), volunteer participation, collaborative programming, or amplification of our story.
                  </p>
                  <p className="text-emerald-100/65 text-[14px] leading-relaxed mb-8">
                    Together, we can ensure that no rural or peri-urban child is denied the opportunity to dream and rise.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to="/donate"
                      className="group inline-flex items-center gap-3
                        bg-amber-400 hover:bg-amber-300 text-black
                        px-7 py-4 rounded-full font-black text-sm
                        transition-colors shadow-xl shadow-black/20"
                    >
                      Donate now
                      <span className="bg-emerald-900 text-white rounded-full p-1.5 group-hover:rotate-45 transition-transform duration-300">
                        <ArrowUpRight size={14} strokeWidth={3} />
                      </span>
                    </Link>
                    <Link
                      to="/partner"
                      className="inline-flex items-center gap-3
                        border border-white/20 hover:border-white/40 hover:bg-white/5
                        text-white px-7 py-4 rounded-full font-black text-sm transition-all"
                    >
                      Partner with us
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>

          </article>

          {/* ── RIGHT: Sticky sidebar ── */}
          <aside className="hidden lg:flex flex-col gap-6 sticky top-24">

            {/* Quick stats */}
            <div className="bg-white dark:bg-[#064e3b]/30 border border-zinc-100 dark:border-[#064e3b] rounded-2xl p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-500 dark:text-amber-400 mb-4">
                Q1 at a Glance
              </p>
              <div className="space-y-4">
                {METRICS.map((m) => {
                  const Icon = m.icon;
                  return (
                    <div key={m.label} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                        <Icon size={13} className="text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-[15px] font-black text-zinc-900 dark:text-white leading-none mb-0.5"
                          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                          {m.value}
                        </div>
                        <div className="text-[11px] text-zinc-400 dark:text-emerald-100/40 leading-snug">{m.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Download PDF */}
            <div className="bg-white dark:bg-[#064e3b]/30 border border-zinc-100 dark:border-[#064e3b] rounded-2xl p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-500 dark:text-amber-400 mb-3">
                Full Report
              </p>
              <p className="text-[12px] text-zinc-500 dark:text-emerald-100/50 leading-relaxed mb-4">
                Download the complete Q1 2026 Impact Update as a PDF for sharing or offline reading.
              </p>
              <a
                href="/Rurban_Africa_pdf_Q1_.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-2
                  bg-[#064e3b] hover:bg-emerald-800
                  text-white px-4 py-3 rounded-xl
                  font-bold text-[13px] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Download size={13} />
                  Download PDF
                </span>
                <ArrowUpRight size={13} className="group-hover:rotate-45 transition-transform duration-300" />
              </a>
            </div>

            {/* Period */}
            <div className="bg-white dark:bg-[#064e3b]/30 border border-zinc-100 dark:border-[#064e3b] rounded-2xl p-5 space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-500 dark:text-amber-400">
                Report Details
              </p>
              {[
                { label: "Period",     value: "January – March 2026" },
                { label: "Published",  value: "March 2026" },
                { label: "Coverage",   value: "Delta & Enugu States" },
                { label: "Published by", value: "Rurban Africa Team" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start justify-between gap-3">
                  <span className="text-[11px] text-zinc-400 dark:text-emerald-100/40">{label}</span>
                  <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 text-right">{value}</span>
                </div>
              ))}
            </div>

            {/* Donate CTA */}
            <div className="relative overflow-hidden rounded-2xl bg-[#064e3b] p-6">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/5 blur-2xl rounded-full pointer-events-none" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400 mb-2">Support the mission</p>
              <h4
                className="text-base font-black text-white mb-4 leading-snug"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Help us reach more communities in Q2
              </h4>
              <Link
                to="/donate"
                className="group inline-flex items-center gap-2
                  bg-amber-400 hover:bg-amber-300 text-black
                  px-5 py-2.5 rounded-full font-bold text-sm transition-all"
              >
                Donate now
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-900 text-white group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight size={11} strokeWidth={3} />
                </span>
              </Link>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}