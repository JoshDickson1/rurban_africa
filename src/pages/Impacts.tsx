import { getLatestImpact } from "@/data/MileStoneData.ts";

export default function Impacts() {
  const { component: Component } = getLatestImpact();

  return <Component />;
}
