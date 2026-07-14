import { BookOpen, LucideIcon, MapPin, School, Users } from "lucide-react";

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
      stats: [
        // {
        //   value: "1,950+",
        //   label: "Bright Minds Reached",
        //   sub: "Children directly inspired",
        //   icon: Users,
        // },
        // {
        //   value: "3,000+",
        //   label: "Pledge Notebooks",
        //   sub: "Distributed across communities",
        //   icon: BookOpen,
        // },
        // {
        //   value: "6",
        //   label: "Communities Engaged",
        //   sub: "Delta & Enugu States",
        //   icon: MapPin,
        // },
        // {
        //   value: "6",
        //   label: "Schools Visited",
        //   sub: "Primary & secondary levels",
        //   icon: School,
        // },
      ],
    },
  },
};

/** Sorted list of years that have at least one quarter of data. */
export const AVAILABLE_YEARS = Object.keys(MILESTONES_DATA)
  .map(Number)
  .sort((a, b) => a - b);

/** Default year + quarter shown on first render. */
export const DEFAULT_YEAR = 2026;
export const DEFAULT_QUARTER: QuarterMilestone["id"] = "q2";
