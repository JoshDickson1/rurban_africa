"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft, Clock, MapPin, Calendar,
  Twitter, Facebook, Link2, CheckCheck, ArrowUpRight,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { BLOG_POSTS, type ProseSection, type ProseHeading } from "@/data/BlogData";
import PageHero from "@/_components/PageHero";
import RelatedBlogs from "@/_components/RelatedBlogs";

// ── Reading progress bar ──────────────────────────────────────
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

// ── Share buttons ─────────────────────────────────────────────
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

// ── Table of Contents ─────────────────────────────────────────
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
              : "text-stone-500 dark:text-white hover:text-stone-900 dark:hover:text-white"
          }`}
        >
          {h.text}
        </a>
      ))}
    </nav>
  );
}

// ── Single prose block renderer ───────────────────────────────
function ProseBlock({ block }: { block: ProseSection }) {
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
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`grid gap-3 my-8 ${block.srcs.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}
      >
        {block.srcs.map((src, j) => (
          <div key={j} className="overflow-hidden rounded-2xl aspect-[4/3] bg-stone-200 dark:bg-stone-800">
            <img
              src={src}
              alt={`Photo ${j + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        ))}
      </motion.div>
    );
  }

  return null;
}

// ── Page ──────────────────────────────────────────────────────
export default function SingleBlog() {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug) ?? BLOG_POSTS[0];

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

              {/* ✅ Reads post.content directly — each post now has its own unique content */}
              <div className="space-y-6">
                {post.content.map((block, i) => (
                  <ProseBlock key={i} block={block} />
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
              <div className="mt-10 flex items-center gap-4 p-6 rounded-2xl border border-stone-200 dark:border-emerald-950 bg-white dark:bg-emerald-900">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-700/30">
                  <span className="text-2xl">🌍</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-0.5">Written by</p>
                  <p className="text-base font-black text-stone-900 dark:text-amber-400 leading-none mb-1">Rurban Africa Team</p>
                  <p className="text-[13px] text-stone-500 dark:text-stone-100 leading-relaxed">
                    Field updates, program stories, and community voices from across Nigeria and Africa.
                  </p>
                </div>
              </div>

              <RelatedBlogs currentSlug={post.slug} currentCategory={post.category} />
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col gap-7 sticky top-24">

              {/* TOC — built from this post's headings */}
              <div className="bg-white dark:bg-[#064e3b] border border-stone-200 dark:border-[#064e3b] rounded-2xl p-5">
                <TOC sections={post.content} />
              </div>

              {/* Meta */}
              <div className="bg-white dark:bg-[#064e3b] border border-stone-200 dark:border-[#064e3b] rounded-2xl p-5 space-y-3">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-400 mb-1">Details</p>
                {[
                  { icon: <Calendar size={13} />, label: "Published", value: post.date },
                  { icon: <Clock size={13} />,    label: "Read time",  value: post.readTime },
                  ...(post.location ? [{ icon: <MapPin size={13} />, label: "Location", value: post.location }] : []),
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[12px] text-stone-400 dark:text-white">{icon} {label}</span>
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
    </>
  );
}