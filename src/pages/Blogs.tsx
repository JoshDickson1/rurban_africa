"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight, MapPin, Clock, Tag, ChevronLeft, X } from "lucide-react";
import PageHero from "@/_components/PageHero";
import { BLOG_POSTS, CATEGORIES, type BlogPost, type ProseSection } from "@/data/BlogData";

/* ══════════════════════════════════════════════════
   PROSE RENDERER — renders structured content blocks
══════════════════════════════════════════════════ */
function ProseRenderer({ blocks }: { blocks: ProseSection[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        if (block.type === "heading") {
          return (
            <h3
              key={i}
              id={block.id}
              className="text-xl font-black text-zinc-900 dark:text-white pt-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {block.text}
            </h3>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p key={i} className="text-zinc-600 dark:text-emerald-100/60 text-[15px] leading-[1.9]">
              {block.text}
            </p>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote
              key={i}
              className="relative pl-6 border-l-[3px] border-amber-400 py-1"
            >
              <p
                className="text-zinc-800 dark:text-white/80 text-[16px] italic leading-relaxed"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                "{block.text}"
              </p>
            </blockquote>
          );
        }

        if (block.type === "images") {
          return (
            <div
              key={i}
              className={`grid gap-3 my-2 ${block.srcs.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}
            >
              {block.srcs.map((src, j) => (
                <div
                  key={j}
                  className="rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-100 dark:bg-emerald-900/20"
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              ))}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   BLOG DETAIL DRAWER / MODAL
══════════════════════════════════════════════════ */
function BlogDetail({ post, onClose }: { post: BlogPost; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full md:max-w-2xl lg:max-w-3xl
          max-h-[94dvh] md:max-h-[88vh]
          bg-white dark:bg-[#071f12]
          md:rounded-3xl rounded-t-3xl
          border border-zinc-100 dark:border-emerald-900/30
          shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Gradient top bar */}
        <div className="h-[3px] bg-gradient-to-r from-[#064e3b] via-emerald-400 to-amber-400 shrink-0" />

        <div className="overflow-y-auto flex-1">
          {/* Hero image */}
          <div className="relative h-56 md:h-72 overflow-hidden shrink-0 bg-zinc-100 dark:bg-emerald-900/30">
            <img
              src={post.img}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.opacity = "0";
              }}
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, #071f12 0%, transparent 60%)" }}
            />
            {/* Category + tag pills over image */}
            <div className="absolute bottom-4 left-6 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-400 text-black text-[10px] font-black uppercase tracking-[0.2em]">
                {post.tag}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.16em]">
                {post.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 md:px-10 py-8">
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-[12px] text-zinc-400 dark:text-emerald-400/40 mb-5">
              {post.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin size={11} />
                  {post.location}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock size={11} />
                {post.readTime}
              </span>
              <span>{post.date}</span>
            </div>

            {/* Title */}
            <h2
              className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white leading-tight mb-8"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {post.title}
            </h2>

            {/* Divider */}
            <div className="h-px bg-zinc-100 dark:bg-emerald-900/30 mb-8" />

            {/* Prose body */}
            <ProseRenderer blocks={post.content} />
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full
            bg-black/30 hover:bg-black/60 backdrop-blur-sm border border-white/15
            flex items-center justify-center text-white transition-colors"
        >
          <X size={15} strokeWidth={2.5} />
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   BLOG CARD
══════════════════════════════════════════════════ */
function BlogCard({ post, onOpen, index }: { post: BlogPost; onOpen: () => void; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onClick={onOpen}
      className="group cursor-pointer flex flex-col
        bg-white dark:bg-[#071f12]
        border border-zinc-100 dark:border-emerald-900/25
        rounded-2xl overflow-hidden
        hover:shadow-xl hover:shadow-emerald-900/10
        hover:-translate-y-1
        transition-all duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/10] bg-zinc-100 dark:bg-emerald-900/20 shrink-0">
        <img
          src={post.img}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).style.opacity = "0.2";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Tag pill */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full bg-amber-400 text-black text-[9px] font-black uppercase tracking-[0.2em]">
            {post.tag}
          </span>
        </div>

        {/* Hover arrow */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm border border-white/20
            flex items-center justify-center">
            <ArrowUpRight size={14} strokeWidth={2.5} className="text-white" />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Meta */}
        <div className="flex items-center gap-3 text-[11px] text-zinc-400 dark:text-emerald-400/40 mb-3">
          {post.location && (
            <span className="flex items-center gap-1 truncate">
              <MapPin size={10} />
              <span className="truncate">{post.location}</span>
            </span>
          )}
          <span className="flex items-center gap-1 shrink-0">
            <Clock size={10} />
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-black text-zinc-900 dark:text-white text-[16px] leading-snug mb-3
            group-hover:text-[#064e3b] dark:group-hover:text-emerald-400 transition-colors"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-zinc-500 dark:text-emerald-100/50 text-[13px] leading-relaxed flex-1 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Read more */}
        <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-emerald-900/20
          flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em]
            text-emerald-600 dark:text-emerald-400/60">
            {post.category}
          </span>
          <span className="text-[11px] font-black text-[#064e3b] dark:text-emerald-400
            flex items-center gap-1 group-hover:gap-2 transition-all">
            Read more
            <ArrowUpRight size={12} strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* ══════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════ */
export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPost,   setSelectedPost]   = useState<BlogPost | null>(null);

  const filtered = activeCategory === "All"
    ? BLOG_POSTS
    : BLOG_POSTS.filter((p) => p.category === activeCategory);

  return (
    <div
      className="bg-[#F9FBFA] dark:bg-[#041d14] min-h-screen transition-colors duration-700"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <PageHero
        tag="Field Notes"
        title="Stories from the"
        accentWord="Ground"
        description="Every visit, every school, every child — these are the stories that remind us why Rurban Africa exists. First-hand accounts from our outreach work across rural and peri-urban Nigeria."
        crumbs={[{ label: "Blog" }]}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-14 py-16">

        {/* Category filter */}
        <div className="flex items-center gap-2 flex-wrap mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.16em]
                border transition-all duration-200
                ${activeCategory === cat
                  ? "bg-[#064e3b] border-[#064e3b] text-white shadow-md shadow-emerald-900/20"
                  : "bg-transparent border-zinc-200 dark:border-emerald-900/40 text-zinc-500 dark:text-emerald-300/60 hover:border-[#064e3b] hover:text-zinc-800 dark:hover:text-white"
                }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-[11px] text-zinc-400 dark:text-emerald-400/40">
            {filtered.length} {filtered.length === 1 ? "story" : "stories"}
          </span>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((post, i) => (
              <BlogCard
                key={post.id}
                post={post}
                index={i}
                onOpen={() => setSelectedPost(post)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="text-zinc-400 dark:text-emerald-400/40 text-sm">
              No stories in this category yet.
            </p>
          </div>
        )}
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selectedPost && (
          <BlogDetail post={selectedPost} onClose={() => setSelectedPost(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}