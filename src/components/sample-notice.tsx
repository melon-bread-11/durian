import { Info } from "lucide-react";
export function SampleNotice() {
  return (
    <aside className="sample-notice">
      <Info size={17} aria-hidden="true" />
      <p>
        <strong>Variety guide.</strong> Images are AI-generated and tasting
        scores are approximate. Check with the farm for availability and prices.
      </p>
    </aside>
  );
}
