import { useParams, Navigate } from "react-router-dom";
import { getImpactBySlug } from "@/data/MileStoneData.ts";

export default function QuarterImpactPage() {
  const { slug = "" } = useParams();

  const report = getImpactBySlug(slug);
  if (!report) {
    return <Navigate to="/404" replace />;
  }

  const ReportComponent = report.component;

  return <ReportComponent />;
}
