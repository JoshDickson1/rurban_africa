"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  Download,
  Users,
  BookOpen,
  MapPin,
  School,
  Handshake,
  Quote,
} from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "@/_components/PageHero.tsx";
import ImpactHeroImage from "@/_components/ImpactHeroImage.tsx";

/* ══════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════ */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
      text-[10px] font-black uppercase tracking-[0.28em]
      text-emerald-600 dark:text-emerald-400
      bg-emerald-50 dark:bg-emerald-900/30
      border border-emerald-200 dark:border-emerald-800/50 mb-5"
    >
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

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
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
  {
    value: "1,950+",
    label: "Children directly reached and inspired",
    icon: Users,
  },
  { value: "6", label: "Communities engaged (Delta & Enugu)", icon: MapPin },
  { value: "3,000+", label: "Pledge Notebooks distributed", icon: BookOpen },
  { value: "6", label: "Schools visited (primary & secondary)", icon: School },
];

/* ══════════════════════════════════════════════════
   SCHOOLS
══════════════════════════════════════════════════ */
const SCHOOLS = [
  {
    letter: "a",
    name: "Direct Beneficiaries",
    // date: "January 2026",
    desc: "Several students and pupils reached through the Africa Day event and related activities.",
  },
  {
    letter: "b",
    name: "Educational Materials",
    // date: "January 2026",
    desc: "200 Pledge Notebooks distributed, expected to support ongoing personal development.",
  },
  {
    letter: "c",
    name: "Behavioral Change",
    // date: "January 2026",
    desc: "Increased awareness of hygiene practices and aspirational goal-setting among young participants.",
  },
  {
    letter: "d",
    name: "Visibility",
    // date: "January 2026",
    desc: "Positive feedback from ESUT school authorities and enhanced local recognition for Rurban Africa’s work.",
  },
];

/* ══════════════════════════════════════════════════
   OUTLOOK
══════════════════════════════════════════════════ */
const OUTLOOK = [
  `Rollout of planned youth skills program in rural communities.`,
  `The Great Mission activities.`,
  `Additional school outreach and WASH projects.`,
  `Resource mobilization for scaled impact.`,
];

/* ══════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════ */
export default function Q22026() {
  return (
    <div
      className="bg-[#F9FBFA] dark:bg-[#041d14] min-h-screen transition-colors duration-700"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <PageHero
        tag="Impact Report"
        title="Q2 2026"
        accentWord="Impact Update"
        description="Bridging the Rural-Urban Divide: Inspiring Minds and Building Futures: April to June 2026."
        crumbs={[{ label: "Impact" }]}
      >
        {/*<div className="">*/}
        {/*  <ImpactHeroImage  />*/}
        {/*</div>*/}
        {/* PDF download inside hero */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href="/Q2_2026_IMPACT_UPDATE.pdf"
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
            June 2026
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
              <SectionLabel>Summary</SectionLabel>
              <SectionHeading>
                Second Quarter 2026 (APRIL – JUNE)
              </SectionHeading>
              <Prose>
                The second quarter of 2026 was marked by significant educational
                outreach, and strategic alignment with our mission to bridge the
                rural-urban divide. A highlight was our impactful commemoration
                of Africa Day, which reinforced themes of education, hygiene,
                unity, and pride in Africa’s future. We reached hundreds of
                young learners directly while advancing our programs in WASH
                (Water, Sanitation, and Hygiene), and community
                transformation.{" "}
              </Prose>
              <Prose>
                Progress was also recorded in other areas, including preparatory
                work for rural livelihood initiatives and the soft launch of The
                Great Mission - our values-based component focused on personal
                development, leadership, and ethical transformation. These
                efforts continue to position Rurban Africa as a catalyst for
                inclusive growth in Nigeria and beyond.{" "}
              </Prose>
            </FadeIn>
            <Divider />
            {/* PROGRAMME FOCUS */}
            {/*<FadeIn>*/}
            {/*  <SectionLabel>Programme Focus</SectionLabel>*/}
            {/*  <SectionHeading>Communities &amp; School Outreach</SectionHeading>*/}
            {/*  <Prose>*/}
            {/*    Our flagship initiative, the Communities &amp; School Outreach, combines school visits, interactive motivational sessions, group recitations of the Rurban Africa Pledge, and the distribution of empowerment tools. These sessions emphasize:*/}
            {/*  </Prose>*/}
            {/*  <ul className="space-y-3 mb-6 pl-1">*/}
            {/*    <BulletItem>Building self-confidence and the courage to pursue ambitious dreams</BulletItem>*/}
            {/*    <BulletItem>Developing leadership qualities and a vision for a greater Africa</BulletItem>*/}
            {/*    <BulletItem>Promoting personal development, including hygiene practices and career exploration</BulletItem>*/}
            {/*    <BulletItem>Reinforcing African pride and unity through the daily affirmation of the Rurban Africa Pledge</BulletItem>*/}
            {/*  </ul>*/}
            {/*</FadeIn>*/}
            {/*<Divider />*/}
            {/* PLEDGE NOTEBOOKS */}
            <FadeIn>
              <SectionLabel>Spotlight</SectionLabel>
              <SectionHeading>
                Africa Day Celebration: Rising Clean, Rising Strong
              </SectionHeading>
              <Prose>
                On May 25, 2026, Rurban Africa celebrated Africa Day with pupils
                and students of ESUT Primary and Secondary School in Agbani,
                Enugu State. The event, themed “Rising Clean, Rising Strong:
                Education and Pride for Africa’s Future”, aligned with the
                African Union’s 2026 emphasis on sustainable water availability
                and safe sanitation.{" "}
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
                    title: "Interactive Session",
                    body: `An interactive session titled “Rising with Africa: Dreams, Hygiene and Unity”.`,
                  },
                  {
                    title: "Address to Students",
                    body: `Motivational address to students on dreaming big, embracing education as a tool for personal and continental advancement, and “Rising with Africa” through collective responsibility`,
                  },
                  {
                    title: "Rurban African Pledge Notebooks Distribution",
                    body: `Distribution of 200 copies of Rurban Africa Pledge Notebooks to pupils and students. These notebooks feature inspirational messages, daily pledge for personal excellence, and community service`,
                  },
                  {
                    title: "Rurban Africa Pledge Recitation",
                    body: `Recitation of the Rurban Africa Pledge by all participants, fostering a sense of ownership and commitment to Africa’s future.`,
                  },
                  {
                    title: "Practical Demonstration",
                    body: `Practical hand-washing demonstration session to promote good hygiene practices, in line with WASH objectives and the event theme.`,
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="pl-5 border-l-2 border-emerald-200 dark:border-emerald-800"
                  >
                    <p className="text-[14px] font-black text-zinc-800 dark:text-white mb-1">
                      {item.title}
                    </p>
                    <p className="text-zinc-600 dark:text-emerald-100/55 text-[14px] leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>

              <Prose>
                The program successfully engaged pupils, students, teachers, and
                school administrators in a lively, educational atmosphere that
                blended fun with learning.
              </Prose>

              {/* Pull quote */}
              <div className="my-8 relative bg-[#064e3b] rounded-2xl px-8 py-7 overflow-hidden">
                <span className="absolute -top-2 left-5 text-7xl text-amber-400/25 font-serif leading-none select-none">
                  "
                </span>
                <div className="flex gap-3 relative z-10">
                  <Quote
                    size={18}
                    className="text-amber-400/60 shrink-0 mt-1"
                  />
                  <blockquote
                    className="text-emerald-50 text-[15px] italic leading-relaxed"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    This book tells me I am important and that I can achieve
                    anything.
                    <span className="block mt-2 text-emerald-300/60 text-[12px] not-italic font-bold uppercase tracking-widest">
                      A child, during a recent school visit
                    </span>
                  </blockquote>
                </div>
              </div>
            </FadeIn>
            <Divider />
            <FadeIn>
              <SectionHeading>Other Notable Activities</SectionHeading>
              <div className="space-y-5 mb-8">
                {[
                  {
                    title: "WASH and Hygiene Advocacy",
                    body: `Building on the Africa Day event, the team conducted follow-up hygiene sensitization visits in select peri-urban communities around Enugu, reaching additional families with education on sanitation and clean water practices.`,
                  },
                  {
                    title: "Preparatory Work for Rural Empowerment Programs",
                    body: `Advanced planning for skills acquisition workshops targeting rural youth (digital literacy) scheduled for Q3.`,
                  },
                  {
                    title: "The Great Mission Soft Launch:",
                    body: `As part of our holistic approach, we initiated community values sessions under The Great Mission. These sessions integrate personal development, ethical leadership, and inspiration alongside our core development activities, helping participants discover purpose and contribute meaningfully to their communities.`,
                  },
                  {
                    title: "Partnership Development",
                    body: `Strengthened collaborations with local schools, and potential donors for expanded outreach in education and livelihood support.`,
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="pl-5 border-l-2 border-emerald-200 dark:border-emerald-800"
                  >
                    <p className="text-[14px] font-black text-zinc-800 dark:text-white mb-1">
                      {item.title}
                    </p>
                    <p className="text-zinc-600 dark:text-emerald-100/55 text-[14px] leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
            <Divider />
            {/* KEY ACTIVITIES */}
            <FadeIn>
              <SectionLabel>Key Activities</SectionLabel>
              <SectionHeading>Impacts and Reach</SectionHeading>

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
                      <span className="text-white font-black text-sm uppercase">
                        {school.letter}
                      </span>
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <p className="text-[14px] font-black text-zinc-900 dark:text-white leading-snug">
                          {school.name}
                        </p>
                      </div>
                      <p className="text-zinc-500 dark:text-emerald-100/50 text-[13px] leading-relaxed">
                        {school.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Prose>
                These interventions contribute directly to our goals of reducing
                rural-urban migration through empowered, educated, and healthy
                communities.
              </Prose>
            </FadeIn>
            <Divider />
            {/* IMPACT METRICS */}
            <FadeIn>
              <SectionLabel>Impediments</SectionLabel>
              <SectionHeading>Challenges Encountered</SectionHeading>
              <div className="space-y-5 mb-8">
                {[
                  {
                    title: "Logistic",
                    body: `Logistical coordination for larger-scale events in peri-urban areas`,
                  },
                  {
                    title: "Financial Constraints",
                    body: `Limited funding for material distribution, which constrained the number of notebooks that could be provided`,
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="pl-5 border-l-2 border-emerald-200 dark:border-emerald-800"
                  >
                    <p className="text-[14px] font-black text-zinc-800 dark:text-white mb-1">
                      {item.title}
                    </p>
                    <p className="text-zinc-600 dark:text-emerald-100/55 text-[14px] leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
            <Divider />
            {/* STORIES OF TRANSFORMATION */}
            <FadeIn>
              <SectionLabel>Financial Summary</SectionLabel>
              <SectionHeading>Financial Summary</SectionHeading>
              <Prose>
                Detailed financials are available upon request. Q2 spending
                focused primarily on educational materials, event logistics, and
                program planning, with strong cost-efficiency through local
                partnerships.
              </Prose>
            </FadeIn>
            <Divider />
            {/* OUTLOOK */}
            <FadeIn>
              <SectionLabel>Outlook for Q3 2026</SectionLabel>
              <SectionHeading>Laying the Foundation</SectionHeading>
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
                style={{
                  background:
                    "linear-gradient(160deg, #064e3b 0%, #052e20 55%, #021a0e 100%)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  }}
                />
                <div className="absolute -top-20 right-0 w-64 h-64 rounded-full bg-amber-400/5 blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  <span
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                    border border-amber-400/30 bg-amber-400/10 text-amber-400
                    text-[10px] font-black uppercase tracking-[0.28em] mb-5"
                  >
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
                    Q2 2026 reinforced Rurban Africa’s commitment to building bridges
                    between rural and urban Nigeria while investing in the next
                    generation. The Africa Day celebration at ESUT exemplified our
                    vision: nurturing dreams, promoting cleanliness and strength, and
                    fostering unity for a prosperous Africa. We are grateful to our
                    partners, volunteers, and the ESUT community for their
                    collaboration. With sustained support, we look forward to even
                    greater transformation in the coming quarters.
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

            {/* Download PDF */}
            <div className="bg-white dark:bg-[#064e3b]/30 border border-zinc-100 dark:border-[#064e3b] rounded-2xl p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-500 dark:text-amber-400 mb-3">
                Full Report
              </p>
              <p className="text-[12px] text-zinc-500 dark:text-emerald-100/50 leading-relaxed mb-4">
                Download the complete Q2 2026 Impact Update as a PDF for sharing
                or offline reading.
              </p>
              <a
                href="/Q2_2026_IMPACT_UPDATE.pdf"
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
                <ArrowUpRight
                  size={13}
                  className="group-hover:rotate-45 transition-transform duration-300"
                />
              </a>
            </div>

            {/* Period */}
            <div className="bg-white dark:bg-[#064e3b]/30 border border-zinc-100 dark:border-[#064e3b] rounded-2xl p-5 space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-500 dark:text-amber-400">
                Report Details
              </p>
              {[
                { label: "Period", value: "APRIL – JUNE 2026" },
                { label: "Published", value: "JUNE 2026" },
                { label: "Coverage", value: "Delta & Enugu States" },
                { label: "Published by", value: "Rurban Africa Team" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-start justify-between gap-3"
                >
                  <span className="text-[11px] text-zinc-400 dark:text-emerald-100/40">
                    {label}
                  </span>
                  <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 text-right">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Donate CTA */}
            <div className="relative overflow-hidden rounded-2xl bg-[#064e3b] p-6">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/5 blur-2xl rounded-full pointer-events-none" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400 mb-2">
                Support the mission
              </p>
              <h4
                className="text-base font-black text-white mb-4 leading-snug"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Help us reach more communities in Q3
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
