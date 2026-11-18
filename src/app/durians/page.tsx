import type { Metadata } from "next";
import { Leaf } from "lucide-react";
import { sampleProducts } from "@/lib/sample-products";
import { CatalogueBrowser } from "@/components/catalogue-browser";
import { SampleNotice } from "@/components/sample-notice";
import { ContactBanner } from "@/components/contact-banner";
export const metadata: Metadata = { title: "Our durians" };
export default function DuriansPage() {
  return (
    <>
      <section className="page-intro catalogue-intro">
        <div className="shell">
          <span className="mini-label">
            <Leaf size={16} /> The orchard selection
          </span>
          <h1>Find your flavour.</h1>
          <p>
            Some like it sweet. Some like a little edge.
            <br />
            There’s a durian character for every kind of palate.
          </p>
        </div>
        <span className="intro-decoration" aria-hidden="true">
          ✳
        </span>
      </section>
      <section className="shell catalogue-section">
        <SampleNotice />
        <CatalogueBrowser products={sampleProducts} />
      </section>
      <ContactBanner />
    </>
  );
}
