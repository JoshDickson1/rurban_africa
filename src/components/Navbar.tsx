import { useEffect, useState } from "react"
import {
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Search,
  PanelRight,
  X,
  Mail
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  // 🔥 Adjustable scroll threshold (40% of viewport height)
  const SCROLL_THRESHOLD = window.innerHeight * 0.5

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [SCROLL_THRESHOLD])

  const marqueeStyle = {
    display: "flex",
    whiteSpace: "nowrap",
    animation: "marquee 25s linear infinite",
  }

  return (
    <>
      <style>
        {`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}
      </style>

      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">

        {/* TOP BAR */}
        <div className={`bg-[#064e3b] text-white transition-all duration-500 overflow-hidden hidden lg:block ${
          isScrolled ? "h-0 opacity-0" : "h-14 opacity-100"
        }`}>
          <div className="flex justify-between items-center h-14 px-6 xl:px-16 text-sm">

            {/* Marquee */}
            <div className="relative flex-1 overflow-hidden">
              <div style={marqueeStyle} className="flex items-center gap-24">

                {/* Set */}
                <div className="flex items-center gap-14">

                  <span className="font-semibold tracking-wide uppercase text-white/90">
                    Rurban Africa (@RurbanAfrica)
                  </span>

                  <div className="flex items-center gap-3">
                    <Phone size={18} className="bg-[#F6CE40] text-black rounded-full p-2" />
                    <span>+234 (70) 6360 9080</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail size={18} className="bg-[#F6CE40] text-black rounded-full p-2" />
                    <span>info@rurbanafrica.org</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="bg-[#F6CE40] text-black rounded-full p-2" />
                    <span>Lagos 21 Salvation Road, Opebi, Ikeja</span>
                  </div>

                </div>

                {/* Duplicate for seamless loop */}
                <div className="flex items-center gap-14">
                  <span className="font-semibold tracking-wide uppercase text-white/90">
                    Rurban Africa (@RurbanAfrica)
                  </span>
                </div>

              </div>
            </div>

            {/* Social */}
            <div className="flex gap-4 ml-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md">
              <a href="https://www.facebook.com/profile.php?id=61584015542265&mibextid=rS40aB7S9Ucbxw6v" target="_blank" rel="noreferrer"
                 className="bg-white text-green-700 p-2 rounded-full hover:scale-110 transition">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/rurban_africa" target="_blank" rel="noreferrer"
                 className="bg-white text-green-700 p-2 rounded-full hover:scale-110 transition">
                <Instagram size={18} />
              </a>
              <a href="https://x.com/RurbanAfrica" target="_blank" rel="noreferrer"
                 className="bg-white text-green-700 p-2 rounded-full hover:scale-110 transition">
                <Twitter size={18} />
              </a>
              <a href="https://www.linkedin.com/company/rurban-africa/" target="_blank" rel="noreferrer"
                 className="bg-white text-green-700 p-2 rounded-full hover:scale-110 transition">
                <Linkedin size={18} />
              </a>
            </div>

          </div>
        </div>

        {/* MAIN NAV */}
        <nav className={`transition-all duration-500 ${
          isScrolled 
            ? "bg-white/60 backdrop-blur-xl shadow-sm dark:bg-[#064e3b]/60" 
            : "bg-transparent"
        }`}>

          <div className="flex items-center justify-between px-5 sm:px-8 lg:px-16 py-4">

            {/* LOGO */}
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src="/rurban_logo.svg"
                alt="Rurban Africa Logo"
                loading="eager"
                className="h-12 sm:h-14 lg:h-16 w-auto object-contain"
              />

              <div className="flex flex-col leading-tight gap-0">
                <span className={`text-xl lg:text-2xl font-bold -mb-1 tracking-tight transition-colors duration-500 ${
                  isScrolled ? "text-black dark:text-white" : "text-white"
                }`}>
                  Rurban
                </span>

                <span className={`text-sm lg:text-base font-semibold tracking-widest uppercase transition-colors duration-500 ${
                  isScrolled ? "text-gray-700 dark:text-white/80" : "text-white/80"
                }`}>
                  Africa
                </span>
              </div>
            </Link>

            {/* DESKTOP LINKS */}
            <ul className={`hidden lg:flex gap-10 font-medium transition-colors duration-500 ${
              isScrolled ? "text-slate-700 dark:text-white/80" : "text-white"
            }`}>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/team">Team</Link>
              <Link to="/blogs">Blogs</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/dream_hubs">Dream Hubs</Link>
            </ul>

            {/* DESKTOP ACTIONS */}
            <div className="hidden lg:flex items-center gap-10">

              <Link to="/blogs">
                <Search size={20} className={`${isScrolled ? "text-slate-600" : "text-white"} transition`} />
              </Link>

              <button
                onClick={() => navigate("/donate")}
                className="h-12 px-8 rounded-lg bg-[#064e3b] text-white dark:bg-white dark:text-black font-semibold shadow-lg hover:scale-105 active:scale-95 transition"
              >
                Donate Now
              </button>

            </div>

            {/* MOBILE BUTTON */}
            <button
              className={`lg:hidden ${isScrolled ? "text-black dark:text-white" : "text-white"}`}
              onClick={() => setMenuOpen(true)}
            >
              <PanelRight size={28} />
            </button>

          </div>
        </nav>
      </header>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center text-white text-xl font-medium">

          <button
            className="absolute top-6 right-6 hover:rotate-90 transition"
            onClick={() => setMenuOpen(false)}
          >
            <X size={32} />
          </button>

          <div className="flex flex-col gap-8 items-center">
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
            <Link to="/blogs" onClick={() => setMenuOpen(false)}>Blogs</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

            <button
              onClick={() => navigate("/donate")}
              className="mt-6 h-12 px-8 bg-[#064e3b] dark:bg-white dark:text-black rounded-lg"
            >
              Donate Now
            </button>
          </div>
        </div>
      )}
    </>
  )
}