import { BookOpen, LucideIcon, MapPin, School, Users } from "lucide-react";
import Q12026 from "@/_components/Q12026.tsx";
import Q22026 from "@/_components/Q22026.tsx";
import { ComponentType } from "react";

export interface Stat {
  value: string;
  label: string;
  sub: string;
  icon: LucideIcon;
}

export interface QuarterMilestone {
  id: "q1" | "q2" | "q3" | "q4"; // e.g. "q1"
  slug: string; // e.g. "q1milestone" -> route path
  quarterLabel: string; // "Q1 2026"
  shortLabel: string; // e.g. "Q1"
  dateRange: string; // e.g. "Jan – Mar 2026"
  tagline: string; // "Empowering Rural Futures"
  component: ComponentType;
  stats: Stat[];
}

export type MilestonesDataMap = Record<
  number,
  Partial<Record<QuarterMilestone["id"], QuarterMilestone>>
>;

export const MILESTONES_DATA: MilestonesDataMap = {
  2026: {
    q1: {
      id: "q1",
      slug: "q1milestone",
      quarterLabel: "Q1 2026",
      shortLabel: "Q1",
      dateRange: "Jan – Mar 2026",
      tagline: "Empowering Rural Futures",
      component: Q12026,
      stats: [
        {
          value: "1,950+",
          label: "Bright Minds Reached",
          sub: "Children directly inspired",
          icon: Users,
        },
        {
          value: "3,000+",
          label: "Pledge Notebooks",
          sub: "Distributed across communities",
          icon: BookOpen,
        },
        {
          value: "6",
          label: "Communities Engaged",
          sub: "Delta & Enugu States",
          icon: MapPin,
        },
        {
          value: "6",
          label: "Schools Visited",
          sub: "Primary & secondary levels",
          icon: School,
        },
      ],
    },
    q2: {
      id: "q2",
      slug: "q2milestone",
      quarterLabel: "Q2 2026",
      shortLabel: "Q2",
      dateRange: "Apr – Jun 2026",
      tagline: "Empowering Rural Futures",
      component: Q22026,
      stats: [],
    },
  },
};

/** Sorted list of years that have at least one quarter of data. */
export const AVAILABLE_YEARS = Object.keys(MILESTONES_DATA)
  .map(Number)
  .sort((a, b) => a - b);

/** Default year + quarter shown on first render. */
export const LATEST_IMPACT = {
  year: 2026,
  quarter: "q2",
} as const;


export function getLatestImpact() {
  return MILESTONES_DATA[LATEST_IMPACT.year][LATEST_IMPACT.quarter];
}

export function getImpactBySlug(slug: string) {
  for (const year of Object.values(MILESTONES_DATA)) {
    const match = Object.values(year).find(
      (quarter) => quarter.slug === slug
    );

    if (match) return match;
  }

  return null;
}
