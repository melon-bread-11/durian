import type { Metadata } from "next";
import { getCatalogue } from "@/lib/catalogue";
import { ProductCard } from "@/components/product-card";
import { SampleNotice } from "@/components/sample-notice";

export const metadata: Metadata = { title: "The durians" };
export const dynamic = "force-dynamic";

export default async function DuriansPage() {
  const { products, isSample } = await getCatalogue();
  return (
    <div className="shell section">
      <div className="page-heading">
        <p className="intro-note">The durians</p>
        <h1>
          Every variety
          <br />
          has a character.
        </h1>
        <p className="lead">
          Explore the selection. Availability and prices are confirmed with each
          harvest.
        </p>
      </div>
      {isSample && <SampleNotice />}
      {products.length ? (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>The next harvest is taking shape.</h2>
          <p>There are no varieties listed yet. Please check back soon.</p>
        </div>
      )}
    </div>
  );
}
