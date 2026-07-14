import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MILESTONES_DATA,
  AVAILABLE_YEARS,
  DEFAULT_YEAR,
  DEFAULT_QUARTER,
  type QuarterMilestone,
} from "@/data/MileStoneData.ts";
import MilestoneCard from "@/_components/MilestoneCard.tsx";

const QUARTER_ORDER = ["q1", "q2", "q3", "q4"] as const;

/**
 * Main milestones section.
 *
 * Structure:
 *   [Year tabs]          — derived from MILESTONES_DATA keys (only years with data show)
 *   [Q1] [Q2] [Q3] [Q4] — only quarters present for the selected year
 *   ───────────────────
 *   [Quarter summary]    — full stats panel, swaps on quarter change
 *
 * Default: 2026 / Q2 (current quarter as of Jun 2026).
 * To add a future year, just add entries to MILESTONES_DATA — no UI changes needed.
 */
export default function MilestonesAccordion() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selection, setSelection] = useState<{
    year: number;
    quarter: QuarterMilestone["id"];
  }>({
    year: DEFAULT_YEAR,
    quarter: DEFAULT_QUARTER,
  });

  const yearData = MILESTONES_DATA[selection.year] ?? {};

  const availableQuarters = QUARTER_ORDER
    .map((id) => yearData[id])
    .filter((q): q is QuarterMilestone => q !== undefined);


  //Design change .... might still use
  const activeQuarterData =
    yearData[selection.quarter] ?? availableQuarters[0] ?? null;
  const handleYearChange = (year: number) => {
    const firstQ = QUARTER_ORDER.find((id) => MILESTONES_DATA[year]?.[id]);
    if (firstQ) {
      setSelection({ year, quarter: firstQ });
    }
  };

  const handleQuarterChange = (quarter: QuarterMilestone["id"]) => {
    setSelection((prev) => ({ ...prev, quarter }));
  };

  return (
    <section
      ref={ref}
      className="px-6 md:px-10 py-14"
      style={{
        background:
          "linear-gradient(160deg, #064e3b 0%, #052e20 55%, #021a0e 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto">

        {/* ── Year tabs ── */}
        <div className="flex items-center gap-2 mb-10 flex-wrap">
          {AVAILABLE_YEARS.map((year, i) => (
            <motion.button
              key={year}
              type="button"
              onClick={() => handleYearChange(year)}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={[
                "relative px-5 py-2 rounded-full text-sm font-black uppercase tracking-[0.18em]",
                "border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
                selection.year === year
                  ? "border-amber-400 text-amber-400 bg-amber-400/10"
                  : "border-emerald-800 text-emerald-100/50 hover:border-emerald-600 hover:text-emerald-100/80",
              ].join(" ")}
            >
              {year}
              {selection.year === year && (
                <motion.span
                  layoutId="yearPill"
                  className="absolute inset-0 rounded-full border border-amber-400/30 pointer-events-none"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* ── Milestone cards ── */}
        <div
          className={[
            "grid gap-3",
            availableQuarters.length === 4
              ? "grid-cols-2 md:grid-cols-4"
              : availableQuarters.length === 3
                ? "grid-cols-2 md:grid-cols-3"
                : availableQuarters.length === 2
                  ? "grid-cols-2"
                  : "grid-cols-1",

           // ' grid grid-cols-2 gap-3 mb-10 max-w-md',
          ].join(" ")}
        >
          {availableQuarters.map((quarter, i) => (
            <MilestoneCard
              key={quarter.id}
              quarter={quarter}
              isActive={selection.quarter === quarter.id}
              index={i}
              onClick={() => handleQuarterChange(quarter.id)}
            />
          ))}
        </div>

        {/* ── Quarter summary — pushes down below the cards ── */}
        {/*<QuarterMilestoneSection quarter={activeQuarterData} />*/}

      </div>
    </section>
  );
}

