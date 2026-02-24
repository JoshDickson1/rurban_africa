"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Clock, MapPin, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BLOG_POSTS, type BlogPost } from "@/data/BlogData";

const SWITCH_INTERVAL = 20_000; // 20 seconds

// Progress bar for auto-switch countdown
function ProgressBar({ duration }: { duration: number }) {
  return (
    <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-amber-400 rounded-full"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: duration / 1000, ease: "linear" }}
      />
    </div>
  );
}

function FeaturedCard({ post, onClick }: { post: BlogPost; onClick: () => void }) {
  return (
    <div className="relative h-full min-h-[420px] lg:min-h-[500px] overflow-hidden rounded-3xl cursor-pointer group" onClick={onClick}>
      <AnimatePresence mode="wait">
        <motion.img
          key={post.id}
          src={post.img}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#041d14]/95 via-[#041d14]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#041d14]/30 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-8">
        {/* Top: category + location */}
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-400 text-[10px] font-bold uppercase tracking-[0.2em]">
            {post.category}
          </span>
          {post.location && (
            <span className="flex items-center gap-1 text-white/40 text-[11px]">
              <MapPin size={11} />
              {post.location}
            </span>
          )}
        </div>

        {/* Bottom: text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3
              className="text-2xl lg:text-3xl font-black text-white leading-[1.1] tracking-tight mb-3 group-hover:text-amber-300 transition-colors duration-300"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {post.title}
            </h3>
            <p className="text-white/55 text-sm leading-relaxed mb-5 max-w-md line-clamp-2">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-[11px] text-white/40">
                <span>{post.date}</span>
                <span className="w-px h-3 bg-white/20" />
                <span className="flex items-center gap-1">
                  <Clock size={11} />
                  {post.readTime}
                </span>
              </div>
              <Link
                to={`/blogs/${post.slug}`}
                onClick={(e) => e.stopPropagation()}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 text-black hover:bg-amber-300 transition-all hover:rotate-45 duration-300 shadow-lg"
              >
                <ArrowUpRight size={15} strokeWidth={3} />
              </Link>
            </div>

            {/* Auto-switch progress */}
            <div className="mt-4">
              <ProgressBar key={post.id} duration={SWITCH_INTERVAL} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function SmallCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blogs/${post.slug}`}
      className="group flex gap-4 items-start p-4 rounded-2xl border border-stone-200 dark:border-[#064e3b] bg-white dark:bg-[#064e3b] hover:border-emerald-200 dark:hover:border-emerald-700/40 hover:shadow-md transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className="shrink-0 w-24 h-20 rounded-xl overflow-hidden">
        <img
          src={post.img}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      {/* Text */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-1 block">
            {post.category}
          </span>
          <h4 className="text-sm font-black text-stone-900 dark:text-white leading-snug line-clamp-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
            {post.title}
          </h4>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[11px] text-stone-400 dark:text-stone-500">{post.date}</span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400 group-hover:bg-amber-400 group-hover:text-black group-hover:border-amber-400 group-hover:rotate-45 transition-all duration-300">
            <ArrowUpRight size={11} strokeWidth={3} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogPreview() {
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const advance = useCallback(() => {
    setFeaturedIndex((i) => (i + 1) % BLOG_POSTS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(advance, SWITCH_INTERVAL);
    return () => clearInterval(timer);
  }, [advance]);

  const featured  = BLOG_POSTS[featuredIndex];
  // The 2 sidebar posts: skip the featured one, take next 2
  const sidebarPosts = BLOG_POSTS.filter((_, i) => i !== featuredIndex).slice(0, 2);

  return (
    <section className="relative py-24 md:py-32 bg-[#F9FBFA] dark:bg-[#041d14] transition-colors duration-700 overflow-hidden">

      {/* Ambient glow */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-emerald-300/8 dark:bg-emerald-400/5 blur-3xl rounded-full translate-x-1/3 -translate-y-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-14">

        {/* Header */}
        <div className="flex items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-amber-500 dark:text-amber-400 font-bold uppercase tracking-[0.28em] text-[10px] px-4 py-1.5 rounded-full border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-900/10 mb-4">
              Blog & Activities
            </span>
            <h2
              className="text-4xl md:text-5xl font-black text-stone-900 dark:text-white leading-[1.05] tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Our Latest Stories{" "}
              <br className="hidden sm:block" />
              and{" "}
              <span className="italic text-emerald-700 dark:text-emerald-400">News</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="shrink-0"
          >
            <Link
              to="/blogs"
              className="group inline-flex items-center gap-3 bg-[#064e3b] text-white px-6 py-3 rounded-full font-bold text-sm tracking-wide hover:bg-emerald-800 transition-all duration-300 shadow-lg shadow-emerald-900/20"
            >
              See All
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-black group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight size={13} strokeWidth={3} />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Main grid: big left, 2 small right */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-5">

          {/* Featured */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <FeaturedCard post={featured} onClick={advance} />
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            {/* Dot nav + counter */}
            <div className="flex items-center justify-between mb-1">
              <div className="flex gap-1.5">
                {BLOG_POSTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setFeaturedIndex(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === featuredIndex
                        ? "w-5 h-2 bg-amber-400"
                        : "w-2 h-2 bg-stone-300 dark:bg-white/20 hover:bg-emerald-400"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-stone-400 dark:text-stone-500 font-medium">
                {featuredIndex + 1} / {BLOG_POSTS.length}
              </span>
            </div>

            {/* 2 small cards */}
            <AnimatePresence mode="popLayout">
              {sidebarPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <SmallCard post={post} />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* CTA card */}
            <Link
              to="/blogs"
              className="group flex items-center justify-between p-5 rounded-2xl bg-[#064e3b] border border-emerald-700/30 hover:bg-emerald-800 transition-all duration-300 mt-auto"
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400 mb-1">All Stories</p>
                <p className="text-sm font-black text-white">Browse every blog & activity →</p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400 text-black group-hover:rotate-45 transition-transform duration-300 shrink-0">
                <ChevronRight size={16} strokeWidth={3} />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}