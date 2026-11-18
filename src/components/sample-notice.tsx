import { Info } from "lucide-react";
export function SampleNotice() {
  return (
    <aside className="sample-notice">
      <Info size={17} aria-hidden="true" />
      <p>
        <strong>Catalogue preview.</strong> Varieties, tasting notes, and
        imagery are illustrative. Farm availability and prices are still to be
        confirmed.
      </p>
    </aside>
  );
}
