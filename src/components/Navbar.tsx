import { useEffect, useState, useRef } from "react"
import {
  Phone, MapPin, Facebook, Instagram, Twitter, Linkedin,
  Search, X, Mail, ChevronDown, ArrowUpRight,
  BookOpen, Users, Heart, Globe, Handshake, MessageSquare,
  Building2, Target, Star, MapPinned, UserCheck, Newspaper,
  InfoIcon,
} from "lucide-react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

/* ══════════════════════════════════════════════════
   NAV STRUCTURE
══════════════════════════════════════════════════ */
const NAV_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    dropdown: [
      {
        group: "Who We Are",
        items: [
          { label: "Vision Statement",  href: "/about/#vision",   icon: <Star size={14} />,      desc: "Where we're heading" },
          { label: "Mission Statement", href: "/about#",  icon: <Target size={14} />,    desc: "Why we exist" },
          { label: "Our Team", href: "/team",  icon: <Users size={14} />,    desc: "Our Vision Bearers" },
        ],
      },
      {
        group: "Our People",
        items: [
          { label: "Board of Trustees", href: "/team/trustees",  icon: <Building2 size={14} />, desc: "Governance & leadership" },
          { label: "Management Team",   href: "/team/management",icon: <Users size={14} />,     desc: "Operational leaders" },
          { label: "Advisory Board",    href: "/team/advisory",  icon: <UserCheck size={14} />, desc: "Strategic advisors" },
        ],
      },
    ],
  },
  {
    label: "What We Do",
    dropdown: [
      {
        group: "Programmes",
        items: [
          { label: "Our Programs",        href: "/programs",          icon: <BookOpen size={14} />,  desc: "All active initiatives" },
          { label: "Target Audience",     href: "/target-audience",   icon: <MapPinned size={14} />, desc: "Who we serve" },
          { label: "Rurban Africa Pledge", href: "/pledge",            icon: <Heart size={14} />,     desc: "Our daily declaration" },
          { label: "Why Rural", href: "/why-rural",            icon: <InfoIcon size={14} />,     desc: "Why we focus on rural areas" },
        ],
      },
    ],
  },
  { label: "Dream Hubs", href: "/dream_hubs" },
  // {
  //   label: "Why Rural",
  //   href: "/why-rural",
  // },
  {
    label: "Get Involved",
    href: "/get-involved",
    dropdown: [
      {
        group: "Join Us",
        items: [
          { label: "Partner With Us",   href: "/partner",   icon: <Handshake size={14} />, desc: "Corporate & institutional" },
          { label: "Volunteer With Us", href: "/volunteer", icon: <Globe size={14} />,     desc: "Give your time" },
        ],
      },
    ],
  },
  {
    label: "More",
    href: "/contact",
    dropdown: [
      {
        group: "Connect",
        items: [
          { label: "Contact Us", href: "/contact", icon: <MessageSquare size={14} />, desc: "Get in touch" },
          { label: "Blog",       href: "/blogs",   icon: <Newspaper size={14} />,     desc: "Stories & updates" },
        ],
      },
    ],
  },
]

/* ══════════════════════════════════════════════════
   DROPDOWN PANEL
   — positioned flush under the trigger (left-aligned)
   — glassmorphism: frosted white/dark backdrop
   — wider (grid) when 2+ groups
══════════════════════════════════════════════════ */
function DropdownPanel({
  groups,
  onClose,
}: {
  groups: { group: string; items: { label: string; href: string; icon: React.ReactNode; desc: string }[] }[]
  onClose: () => void
}) {
  const wide = groups.length > 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      /* left-0 = aligns left edge with the trigger's left edge */
      className={`absolute top-[calc(100%+8px)] left-0 z-50
        ${wide ? "w-[420px]" : "w-[240px]"}
        rounded-2xl overflow-hidden
        border border-white/20 dark:border-white/10
        shadow-2xl shadow-black/20
        backdrop-blur-xl
        bg-white/80 dark:bg-[#071f12]/85`}
      style={{ WebkitBackdropFilter: "blur(20px)" }}
    >
      {/* Hairline top accent */}
      <div className="h-[2px] bg-gradient-to-r from-emerald-500 via-emerald-400 to-amber-400" />

      <div className={`p-2.5 ${wide ? "grid grid-cols-2 gap-x-2" : ""}`}>
        {groups.map((g) => (
          <div key={g.group}>
            <p className="text-[9px] font-black uppercase tracking-[0.22em] text-zinc-400 dark:text-emerald-700/80 px-2 pt-2 pb-1.5">
              {g.group}
            </p>
            {g.items.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className="group flex items-center gap-3 px-2 py-2 rounded-xl
                  hover:bg-black/[0.05] dark:hover:bg-white/[0.06]
                  transition-colors duration-150"
              >
                <span className="w-7 h-7 rounded-lg
                  bg-emerald-50 dark:bg-emerald-900/40
                  backdrop-blur-2xl
                  flex items-center justify-center shrink-0
                  text-[#064e3b] dark:text-emerald-400
                  group-hover:bg-[#064e3b] group-hover:text-white
                  transition-all duration-200">
                  {item.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] font-bold text-zinc-800 dark:text-white
                    group-hover:text-[#064e3b] dark:group-hover:text-emerald-300
                    transition-colors leading-tight truncate">
                    {item.label}
                  </p>
                  <p className="text-[11px] text-zinc-400 dark:text-emerald-700 leading-tight truncate">
                    {item.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════ */
export function Navbar() {
  const [isScrolled,   setIsScrolled]   = useState(false)
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const closeTimer                       = useRef<ReturnType<typeof setTimeout>>()
  const navigate                         = useNavigate()
  const location                         = useLocation()

  const SCROLL_THRESHOLD = typeof window !== "undefined" ? window.innerHeight * 0.08 : 60

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [SCROLL_THRESHOLD])

  // Close dropdown on route change
  useEffect(() => {
    setOpenDropdown(null)
    setMenuOpen(false)
  }, [location.pathname])

  const onMouseEnter = (label: string) => {
    clearTimeout(closeTimer.current)
    setOpenDropdown(label)
  }

  const onMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120)
  }

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href)

  const marqueeStyle = {
    display: "flex",
    whiteSpace: "nowrap" as const,
    animation: "marquee 25s linear infinite",
  }

  return (
    <>
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{ fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── TOP INFO BAR ── */}
        <div className={`bg-[#064e3b] text-white transition-all duration-500 overflow-hidden hidden lg:block ${
          isScrolled ? "h-0 opacity-0" : "h-12 opacity-100"
        }`}>
          <div className="flex justify-between items-center h-12 px-6 xl:px-16 text-[12px]">
            <div className="relative flex-1 overflow-hidden">
              <div style={marqueeStyle} className="flex items-center gap-24">
                {[0, 1].map((k) => (
                  <div key={k} className="flex items-center gap-10">
                    <span className="font-bold tracking-wider uppercase text-white/70">Rurban Africa (@RurbanAfrica)</span>
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="bg-amber-400 text-black rounded-full p-[3px]" />
                      <span className="text-white/70">+234 (70) 6360 9080</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="bg-amber-400 text-black rounded-full p-[3px]" />
                      <span className="text-white/70">info@rurbanafrica.org</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="bg-amber-400 text-black rounded-full p-[3px]" />
                      <span className="text-white/70">Lagos — 21 Salvation Road, Opebi, Ikeja</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2.5 ml-6 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md">
              {[
                { href: "https://www.facebook.com/profile.php?id=61584015542265", Icon: Facebook },
                { href: "https://www.instagram.com/rurban_africa",                 Icon: Instagram },
                { href: "https://x.com/RurbanAfrica",                              Icon: Twitter },
                { href: "https://www.linkedin.com/company/rurban-africa/",         Icon: Linkedin },
              ].map(({ href, Icon }) => (
                <a key={href} href={href} target="_blank" rel="noreferrer"
                  className="bg-white/15 hover:bg-amber-400 text-white hover:text-black p-1.5 rounded-full transition-all duration-200">
                  <Icon size={12} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── MAIN NAV ── */}
        <nav className={`transition-all duration-400 ${
          isScrolled
            ? "bg-white/75 dark:bg-[#041d14]/80 backdrop-blur-xl shadow-sm border-b border-zinc-100/60 dark:border-emerald-900/20"
            : "bg-transparent"
        }`}>
          <div className="flex items-center justify-between px-5 sm:px-8 lg:px-14 py-3">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <img src="/rurban_logo.svg" alt="Rurban Africa" loading="eager"
                className="h-10 sm:h-12 lg:h-14 w-auto object-contain" />
              <div className="flex flex-col leading-tight">
                <span className={`text-lg lg:text-xl font-black -mb-0.5 tracking-tight transition-colors duration-400 ${
                  isScrolled ? "text-zinc-900 dark:text-white" : "text-white"}`}>
                  Rurban
                </span>
                <span className={`text-[10px] font-bold tracking-[0.22em] uppercase transition-colors duration-400 ${
                  isScrolled ? "text-zinc-500 dark:text-emerald-400" : "text-white/70"}`}>
                  Africa
                </span>
              </div>
            </Link>

            {/* Desktop links */}
            <ul className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href)
                const hasDropdown = !!item.dropdown
                const isOpen = openDropdown === item.label

                return (
                  <li key={item.label} className="relative"
                    onMouseEnter={() => hasDropdown && onMouseEnter(item.label)}
                    onMouseLeave={() => hasDropdown && onMouseLeave()}
                  >
                    <Link
                      to={item.href}
                      onClick={() => !hasDropdown && setOpenDropdown(null)}
                      className={`relative flex items-center gap-1 px-3 py-2 text-[13px] font-bold
                        transition-colors duration-200
                        ${active
                          ? isScrolled
                            ? "text-[#064e3b] dark:text-emerald-400"
                            : "text-white"
                          : isScrolled
                            ? "text-zinc-500 dark:text-white/60 hover:text-zinc-900 dark:hover:text-white"
                            : "text-white/75 hover:text-white"
                        }`}
                    >
                      {item.label}
                      {hasDropdown && (
                        <ChevronDown size={12} strokeWidth={2.5}
                          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                      )}
                      {/* Active: sliding underline only — no bg */}
                      {active && (
                        <motion.span
                          layoutId="nav-underline"
                          className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full ${
                            isScrolled ? "bg-[#064e3b] dark:bg-emerald-400" : "bg-amber-400"
                          }`}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>

                    {/* Dropdown */}
                    <AnimatePresence>
                      {isOpen && item.dropdown && (
                        <DropdownPanel
                          groups={item.dropdown}
                          onClose={() => setOpenDropdown(null)}
                        />
                      )}
                    </AnimatePresence>
                  </li>
                )
              })}
            </ul>

            {/* Desktop actions */}
            <div className="hidden lg:flex items-center gap-4">
              <Link to="/blogs">
                <Search size={17} className={`${isScrolled ? "text-zinc-500 dark:text-white/60" : "text-white/70"} hover:text-amber-400 transition`} />
              </Link>
              <motion.button
                onClick={() => navigate("/donate")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 h-10 px-6 rounded-full
                  bg-[#064e3b] dark:bg-emerald-600
                  text-white font-black text-[13px]
                  shadow-lg shadow-emerald-900/20
                  hover:bg-emerald-800 transition-colors group"
              >
                Donate Now
                <span className="bg-amber-400 text-black rounded-full p-1 group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight size={11} strokeWidth={3} />
                </span>
              </motion.button>
            </div>

            {/* Mobile toggle */}
            <button
              className={`lg:hidden p-2 rounded-xl transition-colors ${
                isScrolled ? "text-zinc-700 dark:text-white hover:bg-zinc-100 dark:hover:bg-white/10" : "text-white hover:bg-white/10"
              }`}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                <rect width="22" height="2" rx="1" fill="currentColor"/>
                <rect y="7" width="15" height="2" rx="1" fill="currentColor"/>
                <rect y="14" width="22" height="2" rx="1" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />

            {/* Slide-in panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative ml-auto w-[85vw] max-w-[360px] h-full
                bg-white dark:bg-[#071f12]
                flex flex-col overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 dark:border-emerald-900/30">
                <div className="flex items-center gap-2">
                  <img src="/rurban_logo.svg" alt="Rurban Africa" className="h-9 w-auto" />
                  <span className="font-black text-zinc-900 dark:text-white text-base">Rurban Africa</span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-emerald-900/30 flex items-center justify-center text-zinc-500 dark:text-emerald-400 hover:bg-zinc-200 transition"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 px-4 py-6 space-y-1">
                {NAV_ITEMS.map((item, i) => (
                  <div key={item.label}>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 + i * 0.05 }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center justify-between px-3 py-3 rounded-xl font-bold text-sm transition-colors ${
                          isActive(item.href)
                            ? "bg-emerald-50 dark:bg-emerald-900/20 text-[#064e3b] dark:text-emerald-400"
                            : "text-zinc-700 dark:text-white/80 hover:bg-zinc-50 dark:hover:bg-white/5"
                        }`}
                      >
                        {item.label}
                        {isActive(item.href) && (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        )}
                      </Link>

                      {/* Mobile sub-items */}
                      {item.dropdown && (
                        <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-zinc-100 dark:border-emerald-900/30 pl-3">
                          {item.dropdown.flatMap((g) =>
                            g.items.map((sub) => (
                              <Link
                                key={sub.href}
                                to={sub.href}
                                onClick={() => setMenuOpen(false)}
                                className={`flex items-center gap-2.5 px-2 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                                  isActive(sub.href)
                                    ? "text-[#064e3b] dark:text-emerald-400"
                                    : "text-zinc-500 dark:text-emerald-700 hover:text-zinc-800 dark:hover:text-emerald-300"
                                }`}
                              >
                                <span className="text-zinc-400 dark:text-emerald-800">{sub.icon}</span>
                                {sub.label}
                              </Link>
                            ))
                          )}
                        </div>
                      )}
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="px-4 py-5 border-t border-zinc-100 dark:border-emerald-900/30">
                <button
                  onClick={() => { navigate("/donate"); setMenuOpen(false) }}
                  className="w-full flex items-center justify-between bg-[#064e3b] hover:bg-emerald-800 text-white px-5 py-4 rounded-2xl font-black text-sm group transition-colors shadow-xl shadow-emerald-900/20"
                >
                  <span>Donate Now</span>
                  <span className="bg-amber-400 text-black rounded-full p-1.5 group-hover:rotate-45 transition-transform duration-300">
                    <ArrowUpRight size={13} strokeWidth={3} />
                  </span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}