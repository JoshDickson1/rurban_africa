"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Tag, LayoutGrid, List, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import BlogsContent from "@/_components/BlogsContent";
import { CATEGORIES, TAGS } from "@/data/BlogData";
import PageHero from "@/_components/PageHero";
import DonateHero from "@/_components/DonateHero";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery]         = useState("");
  const [view, setView]                       = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen bg-[#F9FBFA] dark:bg-[#041d14] transition-colors duration-700">

      <div className="">
        <PageHero
  tag="Blog & Activities"
  title="Stories of Impact"
  accentWord="Impact"
  description="Field reports, program updates, and community stories from across Nigeria and Africa."
  crumbs={[{ label: "Blog" }]}
/>
      </div>

      {/* ── Main content + sidebar ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-14 py-14 lg:py-20">
        <div className="grid lg:grid-cols-[1fr_300px] gap-10 lg:gap-14 items-start">

          {/* LEFT: Content */}
          <div>
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-8 gap-4">
              <p className="text-sm text-stone-500 dark:text-stone-400">
                Showing posts in{" "}
                <span className="font-bold text-stone-900 dark:text-white">{activeCategory}</span>
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setView("list")}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all ${
                    view === "list"
                      ? "bg-[#064e3b] border-[#064e3b] text-white"
                      : "border-stone-200 dark:border-white/10 bg-white dark:bg-[#0d2e1e] text-stone-400 hover:border-emerald-300"
                  }`}
                >
                  <List size={15} />
                </button>
                <button
                  onClick={() => setView("grid")}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all ${
                    view === "grid"
                      ? "bg-[#064e3b] border-[#064e3b] text-white"
                      : "border-stone-200 dark:border-white/10 bg-white dark:bg-[#0d2e1e] text-stone-400 hover:border-emerald-300"
                  }`}
                >
                  <LayoutGrid size={15} />
                </button>
              </div>
            </div>

            <BlogsContent filter={activeCategory} />
          </div>

          {/* RIGHT: Sidebar */}
          <aside className="space-y-8 sticky top-24">

            {/* Search */}
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.22em] text-stone-900 dark:text-white mb-3">Search</h4>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search posts…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 rounded-xl bg-white dark:bg-[#0d2e1e] border border-stone-200 dark:border-[#0d2e1e] text-stone-800 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-700 transition"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-lg bg-[#064e3b] text-white">
                  <Search size={13} />
                </button>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.22em] text-stone-900 dark:text-white mb-3">Category</h4>
              <div className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-semibold text-left transition-all ${
                      activeCategory === cat
                        ? "bg-[#064e3b] border-[#064e3b] text-white"
                        : "bg-white dark:bg-[#0d2e1e] border-stone-200 dark:border-[#0d2e1e] text-stone-600 dark:text-stone-300 hover:border-emerald-200 dark:hover:border-emerald-700/40"
                    }`}
                  >
                    <span className={`flex h-7 w-7 items-center justify-center rounded-lg shrink-0 ${
                      activeCategory === cat ? "bg-white/10" : "bg-emerald-50 dark:bg-emerald-900/30"
                    }`}>
                      <ArrowUpRight size={13} className={activeCategory === cat ? "text-amber-400" : "text-emerald-600 dark:text-emerald-400"} />
                    </span>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.22em] text-stone-900 dark:text-white mb-3">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveCategory(tag)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wide border transition-all ${
                      activeCategory === tag
                        ? "bg-[#064e3b] border-[#064e3b] text-white"
                        : "bg-white dark:bg-[#0d2e1e] border-stone-200 dark:border-[#064e3b] text-stone-600 dark:text-stone-300 hover:border-emerald-200 dark:hover:border-emerald-700/40"
                    }`}
                  >
                    <Tag size={10} />
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA promo */}
            <div className="relative overflow-hidden rounded-2xl bg-[#064e3b] p-6">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-300/10 blur-2xl rounded-full pointer-events-none" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400 mb-2">Support Us</p>
              <h4 className="text-lg font-black text-white mb-3 leading-snug" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Help us write more stories of change
              </h4>
              <Link
                to="/donate"
                className="group inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-black px-5 py-2.5 rounded-full font-bold text-sm transition-all"
              >
                Donate
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/10 group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight size={11} strokeWidth={3} />
                </span>
              </Link>
            </div>

          </aside>
        </div>
      </div>
      <div className="">
        <DonateHero />
      </div>
    </div>
  );
}