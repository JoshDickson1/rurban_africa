"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  X, ChevronLeft, ChevronRight, MapPin, Calendar,
  Tag, ZoomIn, Filter,
} from "lucide-react";
import PageHero from "@/_components/PageHero";

/* ══════════════════════════════════════════════════
   TYPES & DATA
══════════════════════════════════════════════════ */
type Category = "All" | "Dream Hubs" | "Community" | "Education" | "Events" | "Wellness";

interface GalleryItem {
  id: number;
  src: string;
  thumb: string;
  alt: string;
  title: string;
  location: string;
  date: string;
  category: Category;
  description: string;
  span: "normal" | "wide" | "tall" | "large";
}

const ITEMS: GalleryItem[] = [
  {
    id: 1,
    src: "/gallery/hub-launch-1.jpg",
    thumb: "/gallery/hub-launch-1.jpg",
    alt: "Dream Hub launch ceremony",
    title: "Dream Hub Launch — Kogi State",
    location: "Lokoja, Kogi State",
    date: "March 2024",
    category: "Dream Hubs",
    description: "The official launch of our third Dream Hub in Kogi State, attended by over 200 community members, school leaders, and local government officials. Students recited the Rurban Africa Pledge for the first time in this community.",
    span: "large",
  },
  {
    id: 2,
    src: "/gallery/pledge-dist-1.jpg",
    thumb: "/gallery/pledge-dist-1.jpg",
    alt: "Pledge notebook distribution",
    title: "Pledge Notebook Distribution",
    location: "Edo State",
    date: "January 2024",
    category: "Education",
    description: "Over 3,000 Pledge Notebooks distributed to students across five schools in a single day. Each student received their notebook at a ceremony where they stood and recited the Rurban Africa Pledge together.",
    span: "tall",
  },
  {
    id: 3,
    src: "/gallery/teacher-train-1.jpg",
    thumb: "/gallery/teacher-train-1.jpg",
    alt: "Teacher training workshop",
    title: "Teacher Development Workshop",
    location: "Abuja, FCT",
    date: "February 2024",
    category: "Education",
    description: "A two-day professional development workshop for 45 teachers from rural schools in the FCT. Sessions covered child-centred pedagogy, trauma-informed teaching methods, and how to integrate the Pledge Notebook into daily classroom practice.",
    span: "normal",
  },
  {
    id: 4,
    src: "/gallery/community-1.jpg",
    thumb: "/gallery/community-1.jpg",
    alt: "Community gathering at Dream Hub",
    title: "Community Day at Ogun Hub",
    location: "Abeokuta, Ogun State",
    date: "April 2024",
    category: "Community",
    description: "Hundreds of parents, elders, and youth gathered for the quarterly community day at the Ogun Dream Hub. The event featured cultural performances, health screenings, and a showcase of student work from the term.",
    span: "wide",
  },
  {
    id: 5,
    src: "/gallery/wellness-1.jpg",
    thumb: "/gallery/wellness-1.jpg",
    alt: "Wellness day activities",
    title: "Monthly Wellness Day",
    location: "Cross River State",
    date: "March 2024",
    category: "Wellness",
    description: "Our monthly wellness day in Cross River brought together local health workers, nutritionists, and community volunteers to deliver sessions on hygiene, nutrition, and mental health to over 150 families.",
    span: "normal",
  },
  {
    id: 6,
    src: "/gallery/hub-interior-1.jpg",
    thumb: "/gallery/hub-interior-1.jpg",
    alt: "Inside a Dream Hub",
    title: "Inside the Kogi Dream Hub",
    location: "Lokoja, Kogi State",
    date: "March 2024",
    category: "Dream Hubs",
    description: "A look inside one of our fully operational Dream Hubs. Solar-powered devices, vibrant learning corners, and a fully stocked resource library serve dozens of students every day after school hours.",
    span: "normal",
  },
  {
    id: 7,
    src: "/gallery/pledge-ceremony-1.jpg",
    thumb: "/gallery/pledge-ceremony-1.jpg",
    alt: "Pledge ceremony with students",
    title: "The Pledge Ceremony",
    location: "Delta State",
    date: "September 2023",
    category: "Events",
    description: "Students, teachers, and parents coming together for a sunrise pledge ceremony at the start of the new school year. Moments like this remind us why the work matters.",
    span: "tall",
  },
  {
    id: 8,
    src: "/gallery/volunteer-1.jpg",
    thumb: "/gallery/volunteer-1.jpg",
    alt: "Volunteers at community outreach",
    title: "Volunteer Outreach Weekend",
    location: "Lagos State",
    date: "November 2023",
    category: "Community",
    description: "Over 30 volunteers from Lagos spent a weekend at a peri-urban community near Ikorodu, running sessions for children, parents, and teachers. A high-energy, high-impact weekend that the community still talks about.",
    span: "wide",
  },
  {
    id: 9,
    src: "/gallery/scholarship-1.jpg",
    thumb: "/gallery/scholarship-1.jpg",
    alt: "Scholarship recipients",
    title: "Scholarship Ceremony 2023",
    location: "Abuja, FCT",
    date: "October 2023",
    category: "Events",
    description: "Our annual scholarship ceremony recognised a new cohort of recipients, each one a standout student from a rural or peri-urban community. Their journeys represent the future Rurban Africa is building.",
    span: "normal",
  },
  {
    id: 10,
    src: "/gallery/hub-build-1.jpg",
    thumb: "/gallery/hub-build-1.jpg",
    alt: "Dream Hub setup in progress",
    title: "Building a Dream Hub",
    location: "Kano State",
    date: "July 2023",
    category: "Dream Hubs",
    description: "A behind-the-scenes look at the process of setting up a new Dream Hub from scratch. Community volunteers, Rurban Africa staff, and local contractors worked together over four days to transform an empty room into a vibrant learning centre.",
    span: "normal",
  },
  {
    id: 11,
    src: "/gallery/girls-edu-1.jpg",
    thumb: "/gallery/girls-edu-1.jpg",
    alt: "Girls education programme",
    title: "Girls in Focus",
    location: "Enugu State",
    date: "May 2024",
    category: "Education",
    description: "A dedicated session for teenage girls in our Enugu Dream Hub, facilitated by female professionals from Lagos. Topics included goal setting, career exploration, confidence building, and staying in school.",
    span: "large",
  },
  {
    id: 12,
    src: "/gallery/cultural-event-1.jpg",
    thumb: "/gallery/cultural-event-1.jpg",
    alt: "Cultural celebration event",
    title: "Africa Day Celebration",
    location: "Nationwide",
    date: "May 2024",
    category: "Events",
    description: "Our Africa Day celebration spanned six Dream Hub locations simultaneously. Students showcased traditional attire, performed songs, and presented art projects celebrating their heritage and the richness of African culture.",
    span: "wide",
  },
];

const CATEGORIES: Category[] = ["All", "Dream Hubs", "Education", "Community", "Events", "Wellness"];

/* ── Masonry span classes ── */
const SPAN_MAP: Record<GalleryItem["span"], string> = {
  normal: "",
  wide:   "sm:col-span-2",
  tall:   "sm:row-span-2",
  large:  "sm:col-span-2 sm:row-span-2",
};

const HEIGHT_MAP: Record<GalleryItem["span"], string> = {
  normal: "h-56 sm:h-64",
  wide:   "h-52 sm:h-64",
  tall:   "h-56 sm:h-[34rem]",
  large:  "h-72 sm:h-[34rem]",
};

/* ══════════════════════════════════════════════════
   LIGHTBOX DIALOG
══════════════════════════════════════════════════ */
function Lightbox({
  item,
  items,
  onClose,
  onNav,
}: {
  item: GalleryItem;
  items: GalleryItem[];
  onClose: () => void;
  onNav: (direction: 1 | -1) => void;
}) {
  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft")  onNav(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onNav]);

  const idx   = items.findIndex((i) => i.id === item.id);
  const total = items.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

      {/* Panel */}
      <motion.div
        key={item.id}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-5xl max-h-[92dvh]
          bg-[#071f12] rounded-2xl sm:rounded-3xl overflow-hidden
          border border-emerald-900/30 shadow-2xl
          flex flex-col lg:flex-row"
      >
        {/* ── Image side ── */}
        <div className="relative lg:flex-1 bg-black overflow-hidden min-h-[240px] sm:min-h-[320px] lg:min-h-0">
          <motion.img
            key={item.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            src={item.src}
            alt={item.alt}
            className="w-full h-full object-cover"
            style={{ minHeight: "240px" }}
          />
          {/* Gradient overlay at bottom for mobile info peek */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent lg:hidden" />

          {/* Counter badge */}
          <div className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-[0.22em]
            text-white bg-black/40 backdrop-blur-sm border border-white/10
            px-3 py-1.5 rounded-full">
            {idx + 1} / {total}
          </div>

          {/* Category badge */}
          <div className="absolute top-4 right-12 sm:right-4 text-[9px] font-black uppercase tracking-[0.2em]
            text-amber-300 bg-amber-400/15 border border-amber-400/20
            px-2.5 py-1.5 rounded-full backdrop-blur-sm">
            {item.category}
          </div>

          {/* Nav arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); onNav(-1); }}
            className="absolute left-3 top-1/2 -translate-y-1/2
              w-9 h-9 rounded-full bg-black/40 hover:bg-black/70
              backdrop-blur-sm border border-white/10
              flex items-center justify-center text-white
              transition-colors"
          >
            <ChevronLeft size={17} strokeWidth={2.5} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNav(1); }}
            className="absolute right-3 top-1/2 -translate-y-1/2
              w-9 h-9 rounded-full bg-black/40 hover:bg-black/70
              backdrop-blur-sm border border-white/10
              flex items-center justify-center text-white
              transition-colors"
          >
            <ChevronRight size={17} strokeWidth={2.5} />
          </button>
        </div>

        {/* ── Info side ── */}
        <div className="lg:w-80 xl:w-96 flex flex-col bg-[#071f12] overflow-y-auto">
          {/* Top bar */}
          <div className="h-[2px] bg-gradient-to-r from-[#064e3b] via-emerald-400 to-amber-400 shrink-0" />

          <div className="p-6 flex-1">
            <h2
              className="text-xl font-black text-white leading-snug mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {item.title}
            </h2>

            {/* Meta pills */}
            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2 text-[12px] text-emerald-100/55">
                <MapPin size={12} className="text-emerald-500 shrink-0" />
                {item.location}
              </div>
              <div className="flex items-center gap-2 text-[12px] text-emerald-100/55">
                <Calendar size={12} className="text-emerald-500 shrink-0" />
                {item.date}
              </div>
              <div className="flex items-center gap-2 text-[12px] text-emerald-100/55">
                <Tag size={12} className="text-emerald-500 shrink-0" />
                {item.category}
              </div>
            </div>

            <div className="h-px bg-emerald-900/30 mb-5" />

            <p className="text-emerald-100/60 text-[13px] leading-[1.85]">
              {item.description}
            </p>
          </div>

          {/* Thumbnail strip */}
          <div className="p-4 border-t border-emerald-900/30 shrink-0">
            <p className="text-[9px] font-black uppercase tracking-[0.22em] text-emerald-700 mb-2.5">
              More photos
            </p>
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {items.map((it) => (
                <button
                  key={it.id}
                  onClick={(e) => { e.stopPropagation(); onNav(items.indexOf(it) - idx as 1 | -1); }}
                  className={`shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    it.id === item.id
                      ? "border-amber-400 opacity-100"
                      : "border-transparent opacity-40 hover:opacity-70"
                  }`}
                >
                  <img src={it.thumb} alt={it.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full
            bg-black/50 hover:bg-black/80 backdrop-blur-sm border border-white/10
            flex items-center justify-center text-white transition-colors lg:hidden"
        >
          <X size={14} strokeWidth={2.5} />
        </button>
        <button
          onClick={onClose}
          className="hidden lg:flex absolute top-4 right-4 z-20 w-8 h-8 rounded-full
            bg-emerald-900/60 hover:bg-emerald-800/80
            border border-emerald-700/30
            items-center justify-center text-white/70 hover:text-white transition-colors"
        >
          <X size={14} strokeWidth={2.5} />
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   MASONRY ITEM
══════════════════════════════════════════════════ */
function MasonryItem({
  item,
  onOpen,
  index,
}: {
  item: GalleryItem;
  onOpen: () => void;
  index: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 6) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer
        ${SPAN_MAP[item.span]} ${HEIGHT_MAP[item.span]}`}
      onClick={onOpen}
    >
      {/* Image */}
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700
          group-hover:scale-105"
      />

      {/* Persistent gradient at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-28
        bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Hover overlay */}
      <motion.div
        initial={false}
        className="absolute inset-0 bg-[#064e3b]/60 opacity-0 group-hover:opacity-100
          transition-opacity duration-300 flex items-center justify-center"
      >
        <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm
          border border-white/20 flex items-center justify-center
          scale-75 group-hover:scale-100 transition-transform duration-300">
          <ZoomIn size={18} strokeWidth={2} className="text-white" />
        </div>
      </motion.div>

      {/* Category badge */}
      <div className="absolute top-3 left-3
        text-[9px] font-black uppercase tracking-[0.18em]
        text-amber-300 bg-black/40 backdrop-blur-sm border border-white/10
        px-2 py-1 rounded-full opacity-0 group-hover:opacity-100
        transition-opacity duration-200">
        {item.category}
      </div>

      {/* Bottom info */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p
          className="text-white font-black text-sm leading-snug line-clamp-1 mb-1
            translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {item.title}
        </p>
        <div className="flex items-center gap-1.5 text-white/60 text-[11px]
          opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0
          transition-all duration-300 delay-75">
          <MapPin size={10} className="shrink-0" />
          {item.location}
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════ */
export default function Gallery() {
  const [active, setActive]     = useState<Category>("All");
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const filtered = active === "All" ? ITEMS : ITEMS.filter((i) => i.category === active);

  const navigate = useCallback(
    (direction: 1 | -1) => {
      if (!selected) return;
      const idx  = filtered.findIndex((i) => i.id === selected.id);
      const next = (idx + direction + filtered.length) % filtered.length;
      setSelected(filtered[next]);
    },
    [selected, filtered]
  );

  const statsRef   = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  return (
    <main
      className="bg-[#F9FBFA] dark:bg-[#041d14] min-h-screen transition-colors duration-700"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <PageHero
        tag="Our Work in Pictures"
        title="Photo"
        accentWord="Gallery"
        description="Moments from our communities, schools, Dream Hubs, and events across Nigeria. Every photo is a story of change in progress."
        crumbs={[{ label: "Gallery" }]}
      />

      {/* ══ STATS STRIP ══ */}
      <section className="py-12 border-b border-zinc-100 dark:border-emerald-900/20 bg-white dark:bg-[#071f12]">
        <div ref={statsRef} className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: `${ITEMS.length}+`, label: "Photos in this gallery" },
              { num: "6+",             label: "Communities captured" },
              { num: "6",               label: "Programme categories" },
              { num: "2023-24",         label: "Coverage period" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 14 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <p className="text-4xl font-black text-zinc-900 dark:text-white mb-1.5"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  {s.num}
                </p>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em]
                  text-zinc-400 dark:text-emerald-700 leading-snug">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FILTER BAR ══ */}
      <section className="py-8 sticky top-0 z-50
        bg-[#F9FBFA]/90 dark:bg-[#041d14]/90 backdrop-blur-lg
        border-b border-zinc-100/60 dark:border-emerald-900/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <Filter size={13} className="text-zinc-400 dark:text-emerald-700 shrink-0 mr-1" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`shrink-0 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.18em]
                  transition-all duration-200 border
                  ${active === cat
                    ? "bg-[#064e3b] text-white border-[#064e3b] shadow-lg shadow-emerald-900/20"
                    : "bg-transparent text-zinc-500 dark:text-emerald-300/60 border-zinc-200 dark:border-emerald-900/30 hover:border-[#064e3b]/40 hover:text-zinc-700 dark:hover:text-white"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MASONRY GRID ══ */}
      <section className="py-12 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                gap-4 sm:grid-rows-[repeat(auto,260px)]"
              style={{ gridAutoRows: "260px" }}
            >
              {filtered.map((item, index) => (
                <MasonryItem
                  key={item.id}
                  item={item}
                  index={index}
                  onOpen={() => setSelected(item)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="text-zinc-400 dark:text-emerald-700 font-semibold text-sm">
                No photos in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ══ LIGHTBOX ══ */}
      <AnimatePresence>
        {selected && (
          <Lightbox
            item={selected}
            items={filtered}
            onClose={() => setSelected(null)}
            onNav={navigate}
          />
        )}
      </AnimatePresence>
    </main>
  );
}