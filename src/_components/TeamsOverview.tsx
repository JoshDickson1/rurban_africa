"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const team = [
  {
    name: "Omehoduonye C. Alvin",
    role: "Executive Director / Trustee",
    img: "/alvin.jpg",
    socials: {
      facebook:  "https://facebook.com",
      whatsapp:  "https://wa.me/234",
      linkedin:  "https://linkedin.com",
      instagram: "https://instagram.com",
    },
  },
  {
    name: "Ozumah Haggai Echefuna",
    role: "Trustee",
    img: "/eee.jpg",
    socials: {
      facebook:  "https://facebook.com",
      linkedin:  "https://linkedin.com",
      instagram: "https://instagram.com",
    },
  },
];

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const socialIcons: Record<string, React.ReactNode> = {
  facebook:  <Facebook size={16} />,
  whatsapp:  <WhatsAppIcon />,
  linkedin:  <Linkedin size={16} />,
  instagram: <Instagram size={16} />,
};

export default function TeamsOverview() {
  return (
    <section className="relative py-24 md:py-32 bg-[#064e3b] dark:bg-[#032d20] overflow-hidden transition-colors duration-700">

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-300/10 blur-3xl rounded-full translate-x-1/3 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-300/8 blur-3xl rounded-full -translate-x-1/3 translate-y-1/4 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-14">

        {/* Header */}
        <div className="flex items-start justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-amber-400 font-bold uppercase tracking-[0.28em] text-[10px] mb-4 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
              The Team
            </span>
            <h2
              className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Our People
            </h2>
            <p className="text-emerald-100/40 text-sm mt-2 font-medium tracking-wide">
              Board of Trustees
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="shrink-0"
          >
            <Link
              to="/team"
              className="group inline-flex items-center gap-3 bg-white text-[#064e3b] px-6 py-3 rounded-full font-bold text-sm tracking-wide hover:bg-amber-400 hover:text-black transition-all duration-300 shadow-lg"
            >
              View all
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#064e3b]/10 group-hover:bg-black/10 group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight size={13} strokeWidth={3} />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* 2-col large cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-3xl bg-emerald-900/30 border border-white/8 cursor-pointer"
            >
              {/* Portrait image — tall */}
              <div className="relative overflow-hidden h-[480px] md:h-[560px]">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Persistent bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#032d20] via-[#032d20]/20 to-transparent" />

                {/* Role pill top-left */}
                <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-[11px] font-bold text-white/80 tracking-wide">
                  {member.role.split("/")[0].trim()}
                </div>

                {/* Social icons — bottom of image, slide up on hover */}
                <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  <div className="flex items-center gap-2">
                    {Object.entries(member.socials).map(([platform, href]) => (
                      <a
                        key={platform}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={platform}
                        onClick={(e) => e.stopPropagation()}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#064e3b] hover:bg-amber-400 hover:text-black transition-all duration-200 shadow-lg backdrop-blur-sm"
                      >
                        {socialIcons[platform]}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Name block — below image, inside card */}
              <div className="px-6 py-5 flex items-center justify-between">
                <div>
                  <h3
                    className="text-xl font-black text-white leading-snug mb-0.5 group-hover:text-amber-400 transition-colors duration-300"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-[13px] text-emerald-100/45 font-medium">{member.role}</p>
                </div>

                {/* Arrow indicator */}
                <div className="shrink-0 w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:border-amber-400 group-hover:text-amber-400 group-hover:rotate-45 transition-all duration-300">
                  <ArrowUpRight size={15} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}