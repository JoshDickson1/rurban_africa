"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X, MapPin, Briefcase, ArrowUpRight, Quote } from "lucide-react";
import PageHero from "@/_components/PageHero";

/* ══════════════════════════════════════════════════
   SOCIAL ICONS
══════════════════════════════════════════════════ */
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

/* ══════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════ */
interface Social { label: string; href: string; icon: React.ReactNode; }
interface Member {
  id: string;
  name: string;
  role: string;
  img: string;
  location?: string;
  bio: string;
  quote?: string;
  socials?: Social[];
}
interface Section {
  id: string;
  label: string;
  title: string;
  accentWord: string;
  description: string;
  members: Member[];
  cols: 2 | 3 | 4;
}

/* ══════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════ */
const PH = "/placeholder.svg";

const SECTIONS: Section[] = [
  {
    id: "trustees",
    label: "Board of Trustees",
    title: "Board of",
    accentWord: "Trustees",
    description: "Our Board of Trustees provides strategic oversight, accountability, and long-term direction for Rurban Africa. They are the guardians of our mission and values.",
    cols: 2,
    members: [
      {
        id: "alvin",
        name: "Omehoduonye C. Alvin",
        role: "Executive Director / Trustee",
        img: "/alvin_new.jpeg",
        location: "Nigeria",
        bio: "Alvin is a passionate advocate for inclusive African growth and a proud product of one of Nigeria's rural communities. He has spent years visiting villages, engaging with residents, and deepening his understanding of the vital yet often overlooked relationship between rural/peri-urban communities and urban centres. He firmly believes that for Africa to truly rise, rural and peri-urban communities must not be left behind. As a qualified lawyer with expertise in Corporate/Commercial, Entertainment, Clean Energy, and Technology Law, Alvin brings sharp strategic insight and real-world experience to nonprofit leadership. Driven by the conviction of One Africa. Two Worlds. One Future., he founded Rurban Africa to bridge divides through education, youth empowerment, teacher development, scholarships, and community transformation.",
        quote: "No child's dream should be limited by their birthplace.",
        socials: [
          { label: "Facebook", href: "#", icon: <FacebookIcon /> },
          { label: "LinkedIn", href: "#", icon: <LinkedInIcon /> },
          { label: "Email",    href: "#", icon: <MailIcon /> },
        ],
      },
      {
        id: "haggai",
        name: "Ozuman Haggai E.",
        role: "Trustee",
        img: '/haggai.jpeg',
        location: "Abuja, Nigeria",
        bio: "Ozumah Haggai E. is a graduate of History and International Studies from the Federal University of Oye, Ekiti State. He is passionate about education and the rise of Africa. Having spent his early days in the rural communities, he believes proper attention should be given to the rural and peri-urban communities in order to erase the invisible line and have one united Africa. To him, children's destiny should not be determined by their geographical location.",
        quote: "Every community deserves a champion. Rurban Africa is that champion.",
        socials: [
          { label: "LinkedIn", href: "#", icon: <LinkedInIcon /> },
          { label: "Email",    href: "#", icon: <MailIcon /> },
        ],
      },
    ],
  },
  {
    id: "management",
    label: "Management Team",
    title: "Management",
    accentWord: "Team",
    description: "The Management Team drives the day-to-day execution of our programmes, operations, and community work. They are the engine behind everything Rurban Africa does on the ground.",
    cols: 4,
    members: [
      {
        id: "mgmt-1",
        name: "Omehoduonye C. Alvin",
        role: "Executive Director",
        img: "/alvin_new.jpeg",
        location: "Nigeria",
        bio: "Alvin is a passionate advocate for inclusive African growth and a proud product of one of Nigeria's rural communities. He has spent years visiting villages, engaging with residents, and deepening his understanding of the vital yet often overlooked relationship between rural/peri-urban communities and urban centres. He firmly believes that for Africa to truly rise, rural and peri-urban communities must not be left behind. As a qualified lawyer with expertise in Corporate/Commercial, Entertainment, Clean Energy, and Technology Law, Alvin brings sharp strategic insight and real-world experience to nonprofit leadership. Driven by the conviction of One Africa. Two Worlds. One Future., he founded Rurban Africa to bridge divides through education, youth empowerment, teacher development, scholarships, and community transformation.",
        quote: "No child's dream should be limited by their birthplace.",
        socials: [
          { label: "Facebook", href: "#", icon: <FacebookIcon /> },
          { label: "LinkedIn", href: "#", icon: <LinkedInIcon /> },
          { label: "Email",    href: "#", icon: <MailIcon /> },
        ],
      },
      {
        id: "mgmt-2",
        name: "Fatima Al-Hassan",
        role: "Finance Lead",
        img: PH,
        location: "Abuja, Nigeria",
        bio: "Fatima manages Rurban Africa's financial health, donor reporting, and compliance frameworks. A certified accountant with nonprofit sector experience spanning 10 years, she ensures every contribution is stewarded with transparency and precision.",
        socials: [{ label: "LinkedIn", href: "#", icon: <LinkedInIcon /> }],
      },
      {
        id: "mgmt-3",
        name: "Tobi Adeyemi",
        role: "Programs / Operations Lead",
        img: PH,
        location: "Ibadan, Nigeria",
        bio: "Tobi coordinates the planning, delivery, and evaluation of all Rurban Africa's core programmes including Dream Hubs, Pledge Notebooks, and the Scholarship scheme. He is deeply connected to rural communities and has a gift for translating strategy into action on the ground.",
        socials: [{ label: "LinkedIn", href: "#", icon: <LinkedInIcon /> }],
      },
      {
        id: "mgmt-4",
        name: "Ngozi Eze",
        role: "Communications Lead",
        img: PH,
        location: "Lagos, Nigeria",
        bio: "Ngozi leads Rurban Africa's brand voice, media presence, and community storytelling. A journalist-turned-communications strategist, she crafts narratives that bring the realities of rural Africa to global audiences and compel people to act.",
        socials: [
          { label: "Twitter",  href: "#", icon: <TwitterIcon /> },
          { label: "LinkedIn", href: "#", icon: <LinkedInIcon /> },
        ],
      },
      {
        id: "mgmt-5",
        name: "Chukwudi Obi",
        role: "Infrastructure & Technology Lead",
        img: PH,
        location: "Enugu, Nigeria",
        bio: "Chukwudi manages the design, installation, and maintenance of Dream Hub facilities, solar systems, and digital infrastructure. A civil and systems engineer by training, he has overseen the setup of technology-enabled learning spaces in some of Nigeria's most remote communities.",
        socials: [{ label: "LinkedIn", href: "#", icon: <LinkedInIcon /> }],
      },
      {
        id: "mgmt-6",
        name: "Hauwa Musa",
        role: "Volunteers / Outreach Lead",
        img: PH,
        location: "Kano, Nigeria",
        bio: "Hauwa coordinates Rurban Africa's volunteer network, community engagement events, and grassroots outreach campaigns. She has a background in social work and community mobilisation, and is the primary relationship builder between the organisation and the families it serves.",
        socials: [{ label: "LinkedIn", href: "#", icon: <LinkedInIcon /> }],
      },
      {
        id: "mgmt-7",
        name: "Seun Adesanya",
        role: "Partnerships Lead",
        img: PH,
        location: "Lagos, Nigeria",
        bio: "Seun develops and manages Rurban Africa's relationships with corporate partners, institutional donors, and peer organisations. He brings a background in business development and CSR consulting, and has brokered partnerships that have directly expanded our programme reach.",
        socials: [
          { label: "LinkedIn", href: "#", icon: <LinkedInIcon /> },
          { label: "Email",    href: "#", icon: <MailIcon /> },
        ],
      },
      {
        id: "mgmt-8",
        name: "Adaeze Okoro",
        role: "Impact & Reporting Lead",
        img: PH,
        location: "Port Harcourt, Nigeria",
        bio: "Adaeze designs and manages Rurban Africa's monitoring, evaluation, and learning frameworks. She ensures every programme generates credible data that informs decision-making, satisfies donor requirements, and tells an honest story of what is working and why.",
        socials: [{ label: "LinkedIn", href: "#", icon: <LinkedInIcon /> }],
      },
    ],
  },
  {
    id: "advisory",
    label: "Advisory Board",
    title: "Advisory",
    accentWord: "Board",
    description: "Our Advisory Board brings together seasoned leaders from business, policy, academia, and civil society who lend their expertise, networks, and counsel to help Rurban Africa grow with purpose.",
    cols: 3,
    members: [
      {
        id: "adv-1",
        name: "Prof. Bola Tijani",
        role: "Senior Adviser, Education Policy",
        img: PH,
        location: "Abuja, Nigeria",
        bio: "Professor Tijani is a former Director at the Federal Ministry of Education with four decades of experience shaping Nigeria's education policy landscape. He advises Rurban Africa on curriculum alignment, government engagement, and the scaling of community-based learning models.",
        quote: "Education is not a privilege. It is a right we must enforce.",
        socials: [{ label: "LinkedIn", href: "#", icon: <LinkedInIcon /> }],
      },
      {
        id: "adv-2",
        name: "Dr. Amina Garba",
        role: "Senior Adviser, Community Health",
        img: PH,
        location: "Kano, Nigeria",
        bio: "Dr. Garba is a public health physician and advocate for integrated community development. She has designed and led health programmes across northern Nigeria and brings a strong lens on the interconnection between health, education, and economic wellbeing in rural settings.",
        socials: [{ label: "LinkedIn", href: "#", icon: <LinkedInIcon /> }],
      },
      {
        id: "adv-3",
        name: "Olawale Bankole",
        role: "Senior Adviser, Corporate Strategy",
        img: PH,
        location: "Lagos, Nigeria",
        bio: "Olawale is a senior executive with a career spanning investment banking, private equity, and impact investing in Africa. He advises Rurban Africa on financial sustainability, corporate partnership strategy, and board governance.",
        socials: [{ label: "LinkedIn", href: "#", icon: <LinkedInIcon /> }],
      },
      {
        id: "adv-4",
        name: "Dr. Nkechi Okonkwo",
        role: "Senior Adviser, Gender & Youth",
        img: PH,
        location: "Enugu, Nigeria",
        bio: "Dr. Okonkwo is a development economist and gender specialist who has consulted for the World Bank, UNICEF, and several African governments on youth policy and girls' education. She ensures Rurban Africa's programming is deeply intentional about equity and inclusion.",
        socials: [{ label: "LinkedIn", href: "#", icon: <LinkedInIcon /> }],
      },
      {
        id: "adv-5",
        name: "Emeka Eze",
        role: "Senior Adviser, Technology & Innovation",
        img: PH,
        location: "Lagos / London",
        bio: "Emeka is a technology entrepreneur and founder of multiple successful African tech startups. He advises Rurban Africa on digital infrastructure, EdTech integration, and how to leverage technology to extend quality learning into the most disconnected communities.",
        socials: [
          { label: "Twitter",  href: "#", icon: <TwitterIcon /> },
          { label: "LinkedIn", href: "#", icon: <LinkedInIcon /> },
        ],
      },
    ],
  },
];

const COLS_CLASS: Record<2 | 3 | 4, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

/* ══════════════════════════════════════════════════
   MEMBER DIALOG
══════════════════════════════════════════════════ */
function MemberDialog({ member, onClose }: { member: Member; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 32 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full sm:max-w-2xl max-h-[92dvh] sm:max-h-[88vh]
          bg-white dark:bg-[#071f12]
          sm:rounded-3xl rounded-t-3xl
          border border-zinc-100 dark:border-emerald-900/30
          shadow-2xl shadow-black/30 flex flex-col overflow-hidden"
      >
        <div className="h-[2.5px] bg-gradient-to-r from-[#064e3b] via-emerald-400 to-amber-400 shrink-0" />

        <div className="overflow-y-auto flex-1">
          {/* Dark green header */}
          <div
            className="relative px-8 pt-10 pb-8 overflow-hidden"
            style={{ background: "linear-gradient(160deg, #064e3b 0%, #052e20 55%, #021a0e 100%)" }}
          >
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
            <div className="absolute -top-20 right-0 w-64 h-64 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex items-end gap-6 flex-wrap">
              <div className="relative shrink-0">
                <div className="absolute -inset-2 rounded-[1.6rem] border border-white/10 pointer-events-none" />
                <div className="absolute -inset-[18px] rounded-[2.2rem] border border-white/5 pointer-events-none" />
                <div className="w-28 h-32 sm:w-32 sm:h-36 rounded-[1.4rem] overflow-hidden border border-white/10 shadow-xl">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover object-top" />
                </div>
                <span className="absolute -bottom-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-400 shadow-md shadow-amber-400/40" />
              </div>

              <div className="flex-1 min-w-0 pb-1">
                <h2
                  className="text-2xl sm:text-3xl font-black text-white leading-tight mb-1.5"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {member.name}
                </h2>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-300/60 mb-4">
                  {member.role}
                </p>
                {member.location && (
                  <div className="flex items-center gap-1.5 text-emerald-100/40 text-[12px]">
                    <MapPin size={11} />
                    {member.location}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8">
            {member.bio && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase size={13} className="text-[#064e3b] dark:text-emerald-500" />
                  <span className="text-[10px] font-black uppercase tracking-[0.22em] text-zinc-400 dark:text-emerald-700">
                    About
                  </span>
                </div>
                <p className="text-zinc-600 dark:text-emerald-100/60 text-[14px] leading-[1.9]">
                  {member.bio}
                </p>
              </div>
            )}

            {member.quote && (
              <>
                <div className="h-px bg-zinc-100 dark:bg-emerald-900/30 mb-6" />
                <div className="flex gap-3 mb-6">
                  <Quote size={18} className="text-amber-400/60 shrink-0 mt-0.5" />
                  <blockquote
                    className="text-zinc-700 dark:text-white/80 text-[15px] italic leading-relaxed"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    "{member.quote}"
                  </blockquote>
                </div>
              </>
            )}

            {member.socials && member.socials.length > 0 && (
              <>
                <div className="h-px bg-zinc-100 dark:bg-emerald-900/30 mb-5" />
                <div className="flex items-center gap-2.5">
                  {member.socials.map((s) => (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      whileHover={{ scale: 1.12, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-full
                        bg-zinc-100 dark:bg-emerald-900/30
                        hover:bg-amber-400
                        border border-zinc-200 dark:border-emerald-800/40
                        flex items-center justify-center
                        text-zinc-500 dark:text-emerald-400 hover:text-white
                        transition-all duration-200"
                      aria-label={s.label}
                    >
                      {s.icon}
                    </motion.a>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full
            bg-black/30 hover:bg-black/60 backdrop-blur-sm border border-white/10
            flex items-center justify-center text-white transition-colors"
        >
          <X size={14} strokeWidth={2.5} />
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   MEMBER CARD
══════════════════════════════════════════════════ */
function MemberCard({
  member,
  onOpen,
  compact,
}: {
  member: Member;
  onOpen: () => void;
  compact: boolean;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onClick={onOpen}
      className="group flex flex-col items-center text-center cursor-pointer"
    >
      {/* Photo */}
      <div className="relative mb-5">
        {/* Hover ring */}
        <div className="absolute -inset-2 rounded-[2rem]
          border border-amber-400/0 group-hover:border-amber-400/35
          transition-all duration-300 pointer-events-none" />

        <div className={`relative overflow-hidden shadow-md
          border border-black/5 dark:border-white/8
          group-hover:shadow-2xl group-hover:shadow-emerald-900/20
          transition-all duration-400
          ${compact
            ? "w-40 h-48 sm:w-44 sm:h-52 rounded-[1.6rem]"
            : "w-56 h-68 sm:w-60 sm:h-72 rounded-[2rem]"
          }`}
        >
          <img
            src={member.img}
            alt={member.name}
            className="w-full h-full object-cover object-top
              group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#064e3b]/55 via-transparent to-transparent
            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute inset-0 flex items-center justify-center
            opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm
              border border-white/25 flex items-center justify-center">
              <ArrowUpRight size={17} strokeWidth={2.5} className="text-white" />
            </div>
          </div>
        </div>

        <span className={`absolute -bottom-1 -right-1 rounded-full bg-amber-400
          shadow-md shadow-amber-400/30
          ${compact ? "w-3.5 h-3.5" : "w-4 h-4"}`} />
      </div>

      {/* Name */}
      <h4
        className={`font-black text-zinc-900 dark:text-white leading-snug mb-1.5
          group-hover:text-[#064e3b] dark:group-hover:text-emerald-400 transition-colors duration-200
          ${compact ? "text-[15px]" : "text-[19px]"}`}
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        {member.name}
      </h4>

      <p className={`font-bold uppercase tracking-[0.15em] leading-snug
        text-emerald-600 dark:text-emerald-400/60
        ${compact ? "text-[9px]" : "text-[10px]"}`}>
        {member.role}
      </p>

      {/* Socials — trustee cards only */}
      {!compact && member.socials && member.socials.length > 0 && (
        <div className="flex items-center gap-2 mt-5">
          {member.socials.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-full
                bg-zinc-100 dark:bg-emerald-900/30
                hover:bg-amber-400
                border border-zinc-200 dark:border-emerald-800/40
                flex items-center justify-center
                text-zinc-500 dark:text-emerald-400 hover:text-white
                transition-all duration-200"
              aria-label={s.label}
            >
              {s.icon}
            </motion.a>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   SECTION HEADER
══════════════════════════════════════════════════ */
function SectionHeader({ section, inView }: { section: Section; inView: boolean }) {
  return (
    <div className="mb-14">
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="h-px bg-gradient-to-r from-amber-400/60 via-amber-400/20 to-transparent mb-10"
      />

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em]
              text-emerald-600 dark:text-emerald-400
              bg-emerald-50 dark:bg-emerald-900/30
              border border-emerald-200 dark:border-emerald-800/50
              px-4 py-1.5 rounded-full mb-4"
          >
            {section.label}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {section.title}{" "}
            <span className="italic text-emerald-700 dark:text-emerald-400">{section.accentWord}</span>
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="text-zinc-500 dark:text-emerald-100/50 text-sm leading-relaxed max-w-sm"
        >
          {section.description}
        </motion.p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   TEAM SECTION
══════════════════════════════════════════════════ */
function TeamSection({ section }: { section: Section }) {
  const [selected, setSelected] = useState<Member | null>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const headerView = useInView(headerRef, { once: true, margin: "-60px" });
  const compact    = section.cols >= 3;

  return (
    <section id={section.id} className="py-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-14">
        <div ref={headerRef}>
          <SectionHeader section={section} inView={headerView} />
        </div>

        <div className={`grid ${COLS_CLASS[section.cols]}
          gap-x-6 gap-y-12
          ${section.cols === 2 ? "max-w-2xl mx-auto" : ""}`}
        >
          {section.members.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              compact={compact}
              onOpen={() => setSelected(member)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <MemberDialog member={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════ */
export default function Team() {
  return (
    <div
      className="bg-[#F9FBFA] dark:bg-[#041d14] min-h-screen transition-colors duration-700"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <PageHero
        tag="Our Vision Bearers"
        title="Meet The"
        accentWord="Team"
        description="Rurban Africa is led by a diverse group of trustees, professionals, and advisers united by a single conviction: that Africa's rural and peri-urban communities deserve investment, recognition, and an equal shot at the future."
        crumbs={[{ label: "Team" }]}
      />

      {/* Sticky section nav */}
      <div className="sticky top-0 min-h-[70px] z-50 bg-[#F9FBFA]/90 dark:bg-[#041d14]/90 backdrop-blur-lg
        border-b border-zinc-100/60 dark:border-emerald-900/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 py-3.5 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="shrink-0 px-4 py-1.5 rounded-full
                text-[11px] font-black uppercase tracking-[0.16em]
                border border-zinc-200 dark:border-emerald-900/40
                text-zinc-500 dark:text-emerald-300/60
                hover:border-[#064e3b] hover:text-zinc-800 dark:hover:text-white
                hover:bg-white dark:hover:bg-emerald-900/20
                transition-all duration-200"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {SECTIONS.map((section, i) => (
        <div key={section.id} className={i % 2 === 1 ? "bg-white dark:bg-[#071f12]" : ""}>
          <TeamSection section={section} />
        </div>
      ))}

      {/* Bottom CTA */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #064e3b 0%, #052e20 55%, #021a0e 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <div className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full bg-amber-400/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-300/50 mb-4">
              Join the mission
            </p>
            <h2
              className="text-3xl md:text-4xl font-black text-white leading-tight mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Want to be part of
              <span className="block italic text-amber-400">this team?</span>
            </h2>
            <p className="text-emerald-100/60 text-sm leading-relaxed max-w-md">
              We are always looking for passionate people to join us as volunteers, partners, or team members. If you believe in the mission, we want to hear from you.
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
    </div>
  );
}