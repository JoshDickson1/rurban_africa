"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft, Clock, MapPin, Calendar,
  Twitter, Facebook, Link2, CheckCheck, ArrowUpRight,
  X, ChevronLeft, ChevronRight, ZoomIn,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { BLOG_POSTS, type ProseSection, type ProseHeading } from "@/data/BlogData";
import PageHero from "@/_components/PageHero";
import RelatedBlogs from "@/_components/RelatedBlogs";

/* ══════════════════════════════════════════════════
   READING PROGRESS BAR
══════════════════════════════════════════════════ */
function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-amber-400 origin-left z-[100] shadow-[0_0_8px_rgba(251,191,36,0.5)]"
    />
  );
}

/* ══════════════════════════════════════════════════
   SHARE BUTTONS
══════════════════════════════════════════════════ */
function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 mr-1">
        Share
      </span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank" rel="noopener noreferrer"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 dark:border-white/10 bg-white dark:bg-white/5 text-stone-500 dark:text-stone-400 hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-all"
      >
        <Twitter size={13} />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank" rel="noopener noreferrer"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 dark:border-white/10 bg-white dark:bg-white/5 text-stone-500 dark:text-stone-400 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all"
      >
        <Facebook size={13} />
      </a>
      <button
        onClick={copyLink}
        className="flex items-center gap-1.5 h-8 px-3 rounded-full border border-stone-200 dark:border-white/10 bg-white dark:bg-white/5 text-stone-500 dark:text-stone-400 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400 transition-all text-[11px] font-semibold"
      >
        {copied ? <CheckCheck size={12} className="text-emerald-600" /> : <Link2 size={12} />}
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   TABLE OF CONTENTS
══════════════════════════════════════════════════ */
function TOC({ sections }: { sections: ProseSection[] }) {
  const headings = sections.filter((s): s is ProseHeading => s.type === "heading");
  const [active, setActive] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-1">
      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-400 mb-3">
        In this article
      </p>
      {headings.map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          className={`flex items-center gap-2.5 py-1.5 px-3 rounded-lg text-sm transition-all duration-200 ${
            active === h.id
              ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-semibold border-l-2 border-emerald-600 dark:border-emerald-400"
              : "text-stone-500 dark:text-white/60 hover:text-stone-900 dark:hover:text-white"
          }`}
        >
          {h.text}
        </a>
      ))}
    </nav>
  );
}

/* ══════════════════════════════════════════════════
   IMAGE LIGHTBOX DIALOG
══════════════════════════════════════════════════ */
function ImageLightbox({
  images,
  startIndex,
  onClose,
}: {
  images: string[];
  startIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);

  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowLeft")   prev();
      if (e.key === "ArrowRight")  next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-10"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      {/* Main image */}
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 max-w-5xl w-full"
      >
        {/* Counter */}
        <div className="absolute -top-10 left-0 right-0 flex items-center justify-between px-1">
          <span className="text-[11px] font-bold text-white/40 tracking-widest uppercase">
            {index + 1} / {images.length}
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors"
          >
            <X size={14} strokeWidth={2.5} />
          </button>
        </div>

        {/* Image */}
        <div className="rounded-2xl overflow-hidden shadow-2xl bg-black/20">
          <img
            src={images[index]}
            alt={`Photo ${index + 1}`}
            className="w-full max-h-[75vh] object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.opacity = "0.15";
            }}
          />
        </div>

        {/* Thumbnail strip */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setIndex(i); }}
              className={`rounded-lg overflow-hidden transition-all duration-200 ${
                i === index
                  ? "ring-2 ring-amber-400 ring-offset-2 ring-offset-black/80 opacity-100"
                  : "opacity-40 hover:opacity-70"
              }`}
            >
              <div className="w-14 h-10">
                <img src={src} alt="" className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0.1"; }}
                />
              </div>
            </button>
          ))}
        </div>

        {/* Prev / Next arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14
                w-10 h-10 rounded-full bg-white/10 hover:bg-white/20
                border border-white/15 flex items-center justify-center
                text-white transition-colors"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14
                w-10 h-10 rounded-full bg-white/10 hover:bg-white/20
                border border-white/15 flex items-center justify-center
                text-white transition-colors"
            >
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   4-IMAGE GRID
══════════════════════════════════════════════════ */
function ImageGrid({
  srcs,
  onOpen,
}: {
  srcs: string[];
  onOpen: (index: number) => void;
}) {
  // Always show exactly 4 slots; repeat images cyclically if fewer provided
  const slots = Array.from({ length: 4 }, (_, i) => srcs[i % srcs.length]);

  return (
    <div className="my-8 grid grid-cols-2 gap-2.5">
      {slots.map((src, i) => (
        <motion.button
          key={i}
          onClick={() => onOpen(i % srcs.length)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative overflow-hidden rounded-xl aspect-[4/3] bg-stone-200 dark:bg-stone-800 block w-full"
        >
          <img
            src={src}
            alt={`Photo ${i + 1}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).style.opacity = "0.1";
            }}
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[#064e3b]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center">
              <ZoomIn size={16} className="text-white" strokeWidth={2} />
            </div>
          </div>
          {/* Index badge */}
          <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold">
            {i + 1}
          </span>
        </motion.button>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   PROSE BLOCK RENDERER
══════════════════════════════════════════════════ */
function ProseBlock({
  block,
  postImages,
  onOpenLightbox,
}: {
  block: ProseSection;
  postImages: string[];
  onOpenLightbox: (index: number) => void;
}) {
  if (block.type === "heading") {
    return (
      <motion.h2
        id={block.id}
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-black text-stone-900 dark:text-white tracking-tight pt-8 pb-1 scroll-mt-24"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        {block.text}
      </motion.h2>
    );
  }

  if (block.type === "paragraph") {
    return (
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.04 }}
        className="text-stone-600 dark:text-stone-300 text-[16px] leading-[1.85]"
      >
        {block.text}
      </motion.p>
    );
  }

  if (block.type === "quote") {
    return (
      <motion.blockquote
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative my-8 bg-[#064e3b] rounded-2xl px-8 py-7 overflow-hidden"
      >
        <span className="absolute -top-2 left-5 text-6xl text-amber-400/30 font-serif leading-none select-none">"</span>
        <span className="absolute -bottom-4 right-6 text-6xl text-amber-400/20 font-serif leading-none select-none">"</span>
        <p
          className="relative z-10 text-emerald-50 text-[15px] leading-relaxed font-medium italic"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {block.text}
        </p>
      </motion.blockquote>
    );
  }

  if (block.type === "images") {
    // Always render the post's 4 canonical images (ignore block.srcs for display)
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <ImageGrid srcs={postImages} onOpen={onOpenLightbox} />
      </motion.div>
    );
  }

  return null;
}

/* ══════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════ */
export default function SingleBlog() {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug) ?? BLOG_POSTS[0];

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox  = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);

  return (
    <>
      <ReadingProgress />

      <PageHero
        tag={post.category}
        title={post.title}
        crumbs={[
          { label: "Blog", to: "/blogs" },
          { label: post.title },
        ]}
      >
        <div className="flex items-center flex-wrap gap-3 mt-2 text-[12px] text-emerald-100/50">
          <span className="flex items-center gap-1.5"><Calendar size={12} />{post.date}</span>
          <span className="w-px h-3 bg-white/15" />
          <span className="flex items-center gap-1.5"><Clock size={12} />{post.readTime}</span>
          {post.location && (
            <>
              <span className="w-px h-3 bg-white/15" />
              <span className="flex items-center gap-1.5"><MapPin size={12} />{post.location}</span>
            </>
          )}
        </div>
      </PageHero>

      <div className="bg-[#F9FBFA] dark:bg-[#041d14] transition-colors duration-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 py-14 lg:py-20">
          <div className="grid lg:grid-cols-[1fr_280px] gap-14 items-start">

            {/* Article */}
            <article className="min-w-0">
              <Link
                to="/blogs"
                className="group inline-flex items-center gap-2 text-sm text-stone-400 dark:text-stone-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors mb-10 font-medium"
              >
                <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
                Back to all posts
              </Link>

              {/* Prose body — passes post.images down for the ImageGrid */}
              <div className="space-y-6">
                {post.content.map((block, i) => (
                  <ProseBlock
                    key={i}
                    block={block}
                    postImages={post.images}
                    onOpenLightbox={openLightbox}
                  />
                ))}
              </div>

              {/* Tags + share */}
              <div className="mt-14 pt-8 border-t border-stone-200 dark:border-emerald-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div className="flex flex-wrap gap-2">
                  {[post.tag, post.category].filter(Boolean).map((t) => (
                    <Link
                      key={t}
                      to={`/blogs?tag=${t}`}
                      className="px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-900/20 text-[11px] font-semibold tracking-wide text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-800/30 transition-colors"
                    >
                      #{t}
                    </Link>
                  ))}
                </div>
                <ShareButtons title={post.title} />
              </div>

              {/* Author card */}
              <div className="mt-10 flex items-center gap-4 p-6 rounded-2xl border border-stone-200 dark:border-emerald-950 bg-white dark:bg-emerald-900/30">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-700/30">
                  <span className="text-2xl">🌍</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-0.5">Written by</p>
                  <p className="text-base font-black text-stone-900 dark:text-amber-400 leading-none mb-1">Rurban Africa Team</p>
                  <p className="text-[13px] text-stone-500 dark:text-stone-300 leading-relaxed">
                    Field updates, program stories, and community voices from across Nigeria and Africa.
                  </p>
                </div>
              </div>

              <RelatedBlogs currentSlug={post.slug} currentCategory={post.category} />
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col gap-7 sticky top-24">

              {/* TOC */}
              <div className="bg-white dark:bg-[#064e3b]/30 border border-stone-200 dark:border-[#064e3b] rounded-2xl p-5">
                <TOC sections={post.content} />
              </div>

              {/* Photo gallery strip in sidebar */}
              <div className="bg-white dark:bg-[#064e3b]/30 border border-stone-200 dark:border-[#064e3b] rounded-2xl p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-400 mb-3">Photos</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {post.images.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => openLightbox(i)}
                      className="group relative overflow-hidden rounded-lg aspect-square bg-stone-100 dark:bg-emerald-900/20"
                    >
                      <img
                        src={src}
                        alt={`Photo ${i + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                        onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0.1"; }}
                      />
                      <div className="absolute inset-0 bg-[#064e3b]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ZoomIn size={14} className="text-white" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Meta */}
              <div className="bg-white dark:bg-[#064e3b]/30 border border-stone-200 dark:border-[#064e3b] rounded-2xl p-5 space-y-3">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-400 mb-1">Details</p>
                {[
                  { icon: <Calendar size={13} />, label: "Published", value: post.date },
                  { icon: <Clock size={13} />,    label: "Read time",  value: post.readTime },
                  ...(post.location ? [{ icon: <MapPin size={13} />, label: "Location", value: post.location }] : []),
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[12px] text-stone-400 dark:text-white/60">{icon} {label}</span>
                    <span className="text-[12px] font-semibold text-stone-700 dark:text-stone-300">{value}</span>
                  </div>
                ))}
              </div>

              {/* Donate CTA */}
              <div className="relative overflow-hidden rounded-2xl bg-[#064e3b] p-6">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-300/10 blur-2xl rounded-full pointer-events-none" />
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400 mb-2">Support the mission</p>
                <h4
                  className="text-base font-black text-white mb-4 leading-snug"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Help us reach more communities across Africa
                </h4>
                <Link
                  to="/donate"
                  className="group inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-black px-5 py-2.5 rounded-full font-bold text-sm transition-all"
                >
                  Donate now
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/10 group-hover:rotate-45 transition-transform duration-300">
                    <ArrowUpRight size={11} strokeWidth={3} />
                  </span>
                </Link>
              </div>

              {/* Share */}
              <div className="bg-white dark:bg-white/4 border border-stone-200 dark:border-white/8 rounded-2xl p-5">
                <ShareButtons title={post.title} />
              </div>

            </aside>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <ImageLightbox
            images={post.images}
            startIndex={lightboxIndex}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </>
  );
}