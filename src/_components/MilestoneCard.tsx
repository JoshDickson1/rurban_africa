import { motion } from "framer-motion";
import type { QuarterMilestone } from "@/data/MileStoneData.ts";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

interface MilestoneCardProps {
  quarter: QuarterMilestone;
  isActive: boolean;
  index: number;
  onClick: () => void;
}

/**
 * Compact clickable card representing a single quarter (Q1–Q4).
 * Shows short label, date range, and tagline.
 * Active state is visually distinguished with amber accent + border.
 */
export default function MilestoneCard({
  quarter,
  isActive,
  index,
  onClick,
}: MilestoneCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.45,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={[
        "relative w-full text-left rounded-2xl border px-5 py-5 overflow-hidden",
        "transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
        isActive
          ? "border-amber-400 bg-amber-400/5"
          : "border-emerald-800 bg-white/5 hover:border-emerald-600 hover:bg-white/[0.07]",
      ].join(" ")}
    >
      {/* Active indicator bar */}
      {isActive && (
        <motion.div
          layoutId="activeBar"
          className="absolute left-0 top-0 bottom-0 w-[3px] bg-amber-400 rounded-l-2xl"
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      <div className="pl-1">
        {/* Short label e.g. "Q1" */}
        <p
          className={[
            "text-xs font-black uppercase tracking-[0.2em] mb-1 transition-colors duration-200",
            isActive ? "text-amber-400" : "text-emerald-400",
          ].join(" ")}
        >
          {quarter.shortLabel} Impact Update
        </p>

        {/* Date range */}
        <p className="text-[11px] text-emerald-100/40 font-medium mb-2 leading-none">
          {quarter.dateRange}
        </p>

        {/* Tagline */}
        <p
          className="text-sm font-bold text-white leading-snug"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {quarter.tagline}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        // animate={inView ? { opacity: 1, y: 0 } : {}}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, delay: 0.46 }}
        className="flex flex-col sm:flex-row items-start gap-3 pb-5"
      >
        <Link
          to={`/impact/${quarter.slug}`}
          className="group inline-flex items-center gap-3
                  bg-amber-400 hover:bg-amber-300 text-black
                  px-7 py-3.5 rounded-full font-black text-sm
                  transition-colors shadow-xl shadow-black/20"
        >
          Read the {quarter.quarterLabel} report
          <span className="bg-emerald-900 rounded-full p-1.5 group-hover:rotate-45 transition-transform text-white duration-300">
            <ArrowUpRight size={13} strokeWidth={3} />
          </span>
        </Link>
        <a
          href={quarter.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2
                  border border-white/20 hover:border-white/40 hover:bg-white/5
                  text-white/80 hover:text-white
                  px-7 py-3.5 rounded-full font-black text-sm transition-all"
        >
          Download PDF
        </a>
      </motion.div>
    </motion.button>
  );
}
