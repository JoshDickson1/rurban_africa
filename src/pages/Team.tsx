import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import PageHero from '@/_components/PageHero';

const TEAM_MEMBERS = [
  { id: "exec", segment: "Founder & Executive Direction", name: "Omehoduonye C. Alvin", role: "Executive Director / Trustee", img: "/alvin_new.jpeg" },
  { id: "finance", segment: "Financial Management", name: "Sarah Jenkins", role: "Finance Lead", img: "/placeholder.svg" },
  { id: "ops", segment: "Operations & Strategy", name: "Marcus Thorne", role: "Programs/Operations Lead", img: "/placeholder.svg" },
  { id: "comm", segment: "Media & Brand", name: "Communications Outreach", role: "Communication Lead", img: "/placeholder.svg" },
  { id: "tech", segment: "Infrastructure & Systems", name: "David Chen", role: "Infrastructure and Technology Lead", img: "/placeholder.svg" },
  { id: "outreach", segment: "Community Engagement", name: "Aisha Bello", role: "Volunteers/Outreach Lead", img: "/placeholder.svg" }
];

const SOCIALS = [
  { label: "LinkedIn", href: "#", icon: <Linkedin size={18} /> },
  { label: "Twitter", href: "#", icon: <Twitter size={18} /> },
  { label: "Email", href: "#", icon: <Mail size={18} /> },
];

const TeamCard = ({ member, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="flex flex-col items-center w-full">
      {/* Segment Demarcation */}
      <div className="w-full flex items-center gap-4 mb-10">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
        <h3 className="text-[10px] tracking-[0.3em] uppercase font-bold text-amber-500 dark:text-amber-400 whitespace-nowrap">
          {member.segment}
        </h3>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="flex flex-col items-center"
      >
        {/* Photo Container */}
        <div className="relative mb-7">
          <div className="absolute -inset-2 rounded-[2.2rem] border border-amber-400/20 pointer-events-none" />
          <div className="absolute -inset-5 rounded-[2.8rem] border border-black/[0.03] dark:border-white/[0.06] pointer-events-none" />

          <div className="relative w-64 h-72 rounded-[2rem] overflow-hidden shadow-2xl border border-black/5 dark:border-white/10">
            <img
              src={member.img}
              alt={member.name}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 via-transparent to-transparent" />
          </div>
          <span className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-amber-400 shadow-lg shadow-amber-400/30" />
        </div>

        {/* Identity */}
        <h4
          className="text-2xl font-black text-slate-900 dark:text-white mb-1 text-center"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {member.name}
        </h4>
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-300/60 mb-7 text-center">
          {member.role}
        </p>

        {/* Socials */}
        <div className="flex items-center gap-2.5">
          {SOCIALS.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-amber-400 border border-black/5 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-white/70 hover:text-white transition-all duration-250"
            >
              {s.icon}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default function Team() {
  return (
    <div className="bg-white dark:bg-emerald-950 transition-colors duration-700">
      <div className="relative">
        <PageHero
            tag="Our Vision Bearers"
            title="Meet The"
            accentWord="Team"
            description=""
            crumbs={[{ label: "Team" }]}
        />
      </div>

      <div className="relative min-h-screen w-full overflow-hidden">
        {/* Animated Blurred Lights */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 -left-[10%] w-[50%] h-[50%] rounded-full bg-emerald-400/10 dark:bg-emerald-500/10 blur-[120px]" 
          />
          <motion.div 
            animate={{ x: [0, -80, 0], y: [0, 100, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 -right-[10%] w-[40%] h-[40%] rounded-full bg-amber-200/10 dark:bg-amber-400/5 blur-[100px]" 
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4">Our Leadership</h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full" />
          </div>

          {/* 6 Segments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {TEAM_MEMBERS.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}