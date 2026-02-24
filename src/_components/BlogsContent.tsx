"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BLOG_POSTS, type BlogPost } from "@/data/BlogData";

const PER_PAGE = 5; // 1 featured + 4 grid

function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blogs/${post.slug}`}
      className="group relative flex flex-col lg:flex-row gap-0 overflow-hidden rounded-3xl border border-stone-200 dark:border-[#0d2e1e] bg-white dark:bg-[#0d2e1e] hover:border-emerald-200 dark:hover:border-emerald-700/40 hover:shadow-xl transition-all duration-500 mb-6"
    >
      {/* Image */}
      <div className="relative lg:w-[55%] h-56 lg:h-80 overflow-hidden shrink-0">
        <img
          src={post.img}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#041d14]/20 dark:to-[#041d14]/40" />
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-400/90 text-black text-[10px] font-bold uppercase tracking-[0.18em]">
          {post.category}
        </span>
      </div>

      {/* Text */}
      <div className="flex flex-col justify-between p-7 lg:p-8 flex-1">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">{post.tag}</span>
            {post.location && (
              <>
                <span className="w-px h-3 bg-stone-200 dark:bg-[#0d2e1e]" />
                <span className="flex items-center gap-1 text-stone-400 text-[11px]">
                  <MapPin size={10} />
                  {post.location}
                </span>
              </>
            )}
          </div>
          <h2
            className="text-2xl lg:text-3xl font-black text-stone-900 dark:text-white leading-[1.1] tracking-tight mb-4 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {post.title}
          </h2>
          <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between mt-6 pt-5 border-t border-stone-100 dark:border-[#0d2e1e]">
          <div className="flex items-center gap-3 text-[11px] text-stone-400">
            <span>{post.date}</span>
            <span className="w-px h-3 bg-stone-200 dark:bg-[#0d2e1e]" />
            <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
          </div>
          <span className="flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-400 group-hover:gap-3 transition-all duration-300">
            Read more
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800/40 group-hover:bg-amber-400 group-hover:text-black group-hover:border-amber-400 group-hover:rotate-45 transition-all duration-300">
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

function GridCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blogs/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 dark:border-[#0d2e1e] bg-white dark:bg-[#0d2e1e] hover:border-emerald-200 dark:hover:border-emerald-700/40 hover:shadow-lg transition-all duration-400"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={post.img}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-106"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-sm text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400 border border-white/30">
          {post.category}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3
          className="text-base font-black text-stone-900 dark:text-white leading-snug mb-2 line-clamp-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {post.title}
        </h3>
        <p className="text-stone-500 dark:text-stone-400 text-[13px] leading-relaxed line-clamp-2 mb-4 flex-1">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-stone-100 dark:border-[#0d2e1e]">
          <span className="text-[11px] text-stone-400">{post.date}</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400 group-hover:bg-amber-400 group-hover:text-black group-hover:border-amber-400 group-hover:rotate-45 transition-all duration-300">
            <ArrowUpRight size={12} strokeWidth={3} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogsContent({ filter = "All" }: { filter?: string }) {
  const [page, setPage] = useState(1);

  const filtered = filter === "All"
    ? BLOG_POSTS
    : BLOG_POSTS.filter((p) => p.category === filter || p.tag === filter);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const start      = (page - 1) * PER_PAGE;
  const pagePosts  = filtered.slice(start, start + PER_PAGE);

  const featured = pagePosts[0];
  const gridPosts = pagePosts.slice(1);

  return (
    <div className="flex flex-col">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${filter}-${page}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45 }}
        >
          {/* Featured */}
          {featured && <FeaturedPost post={featured} />}

          {/* Grid */}
          {gridPosts.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-4">
              {gridPosts.map((post) => (
                <GridCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
              <div className="text-4xl">📭</div>
              <p className="text-stone-500 dark:text-stone-400 text-sm">No posts in this category yet.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 dark:border-white/10 bg-white dark:bg-[#0d2e1e] text-stone-600 dark:text-stone-300 disabled:opacity-30 hover:border-emerald-300 dark:hover:border-emerald-700 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all"
          >
            <ChevronLeft size={15} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all ${
                n === page
                  ? "bg-[#064e3b] text-white shadow-md"
                  : "border border-stone-200 dark:border-white/10 bg-white dark:bg-[#0d2e1e] text-stone-600 dark:text-stone-300 hover:border-emerald-300 hover:text-emerald-700 dark:hover:border-emerald-700 dark:hover:text-emerald-400"
              }`}
            >
              {n}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 dark:border-white/10 bg-white dark:bg-[#0d2e1e] text-stone-600 dark:text-stone-300 disabled:opacity-30 hover:border-emerald-300 dark:hover:border-emerald-700 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
}