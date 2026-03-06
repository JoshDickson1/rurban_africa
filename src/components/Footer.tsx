import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  ArrowUpRight,
  MapPin
} from "lucide-react";
import { ModeToggle } from "./ModeToggle.tsx";
import { Link } from "react-router-dom";

const SOCIAL_LINKS = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/goldengosheneducationalconsultancy",
    label: "Facebook",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/goldengosheneducation",
    label: "Instagram",
  },
  {
    icon: Twitter,
    href: "https://www.x.com/goldengoshenedu",
    label: "X (Twitter)",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/goldengosheneducationalconsultancy",
    label: "LinkedIn",
  }
];


const FOOTER_LINKS = {
  "Quick Links": [
    { name: "Home", to: "/" },
    { name: "About us", to: "/about" },
    { name: "Donate", to: "/donate" },
  ],
  "Support": [
    { name: "Contact", to: "/contact" },
    { name: "Career", to: "/career" },
    { name: "Blogs", to: "/blogs" },
  ],
  "Community": [
    { name: "FAQs", to: "/faqs" },
    { name: "Privacy Policy", to: "/privacy" },
    { name: "Testimonials", to: "/testimonials" },
  ]
};

const INSTAGRAM_POSTS = [
  "/foot1.jpeg", "/rurban_logo.svg", "/foot3.jpeg",
  "/foot4.jpeg", "/foot5.jpeg", "/foot6.jpeg"
];

const Footer = () => {
  return (
    <footer className="relative bg-[url('/footer.png')] dark:bg-[url('/bg-footer.svg')] dark:bg-green-950 pt-20 pb-10 overflow-hidden transition-colors duration-300">

      {/* Background Glow - Matches Hero Ball */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 dark:bg-green-400/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">

          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2 group">
              <img
                src="/rurban_logo.svg"
                alt="Rurban Africa Logo"
                className="h-12 sm:h-14 lg:h-16 w-auto object-contain"
              />

              <div className="flex flex-col leading-tight gap-0">
                <span className={`text-xl lg:text-2xl font-bold -mb-1 tracking-tight transition-colors duration-500`}>
                  Rurban
                </span>

                <span className={`text-sm lg:text-base font-semibold tracking-widest uppercase transition-colors duration-500`}>
                  Africa
                </span>
              </div>
            </Link>
            </div>

            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
Empowering Africa's future through education. A child at a time. Join us in transforming lives and building brighter communities across the continent.
            </p>

            <div className="flex gap-4">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  whileHover={{ y: -5, scale: 1.1 }}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-[#00521A] hover:text-white dark:hover:bg-green-700 dark:hover:text-white transition-all shadow-sm"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>

          </div>

          {/* Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title} className="space-y-6">
                <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">
                  {title}
                </h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link to={link.to} className="group flex items-center text-slate-500 dark:text-slate-400 hover:text-[#1e3a5f] dark:hover:text-green-400 transition-colors font-semibold text-sm">
                        <ArrowUpRight size={14} className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Location & Instagram Column */}
          <div className="lg:col-span-3 space-y-8">
            <div className="space-y-4">
              <div className="space-y-4">
                <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Location</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 flex items-start gap-2">
                <MapPin size={18} className="shrink-0 text-green-500" />
                Lagos 21 Salvation Road, Opebi, Ikeja
              </p>
              </div>

              <div className="">
              <p className="text-sm text-slate-500 dark:text-slate-400 flex items-start gap-2">
                <MapPin size={18} className="shrink-0 text-green-500" />
                Delta: 46 Ogwashi-Uku Road, Umunede
              </p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Instagram Post</h4>
              <div className="grid grid-cols-3 gap-2">
                {INSTAGRAM_POSTS.map((src, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800"
                  >
                    <img
                      src={src}
                      alt={`Instagram post ${i + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </motion.div>
                ))}

              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            © 2026 Rurban Africa All Rights Reserved by <a href="tel:+2349130993464" className="text-[#1e3a5f] dark:text-green-400">BiTech</a>
          </p>

          <div className="flex items-center gap-8">
            <div className="flex gap-4 text-[10px] font-black uppercase tracking-tighter text-slate-400">
              <Link to="/privacy-policy" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
            </div>
            <div className="p-1 bg-green-100 dark:bg-green-900 rounded-full border border-slate-200 dark:border-slate-800 shadow-inner scale-90">
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;