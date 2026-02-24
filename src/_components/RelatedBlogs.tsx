"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { BLOG_POSTS, type BlogPost } from "@/data/BlogData";

interface RelatedBlogsProps {
  currentSlug: string;
  currentCategory: string;
}

export default function RelatedBlogs({ currentSlug, currentCategory }: RelatedBlogsProps) {
  // Same category first, then fallback to others — exclude current
  const related = [
    ...BLOG_POSTS.filter((p) => p.slug !== currentSlug && p.category === currentCategory),
    ...BLOG_POSTS.filter((p) => p.slug !== currentSlug && p.category !== currentCategory),
  ].slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-20 pt-14 border-t border-stone-200 dark:border-emerald-900">
      {/* Header */}
      <div className="flex items-end justify-between mb-10 gap-4">
        <div>
          <span className="inline-block text-amber-500 dark:text-amber-400 font-bold uppercase tracking-[0.28em] text-[10px] mb-3">
            Keep Reading
          </span>
          <h2
            className="text-2xl md:text-3xl font-black text-stone-900 dark:text-white tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Related <span className="italic text-emerald-700 dark:text-emerald-400">Stories</span>
          </h2>
        </div>
        <Link
          to="/blogs"
          className="group hidden sm:inline-flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:gap-3 transition-all duration-300"
        >
          All posts
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800/40 group-hover:bg-amber-400 group-hover:text-black group-hover:border-amber-400 group-hover:rotate-45 transition-all duration-300">
            <ArrowUpRight size={13} strokeWidth={2.5} />
          </span>
        </Link>
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {related.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to={`/blogs/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 dark:border-emerald-900 bg-white dark:bg-emerald-900 hover:border-emerald-200 dark:hover:border-emerald-700/40 hover:shadow-lg transition-all duration-400 h-full"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden shrink-0">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-sm text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400 border border-white/20">
                  {post.category}
                </span>
              </div>

              {/* Body */}
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

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-stone-100 dark:border-white/8">
                  <div className="flex items-center gap-2 text-[11px] text-stone-400">
                    <Clock size={11} />
                    {post.readTime}
                    {post.location && (
                      <>
                        <span className="w-px h-3 bg-stone-200 dark:bg-white/10" />
                        <MapPin size={10} />
                        <span className="truncate max-w-[80px]">{post.location.split(",")[0]}</span>
                      </>
                    )}
                  </div>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400 group-hover:bg-amber-400 group-hover:text-black group-hover:border-amber-400 group-hover:rotate-45 transition-all duration-300 shrink-0">
                    <ArrowUpRight size={12} strokeWidth={3} />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}