import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sampleProducts } from "@/lib/sample-products";
import { VarietyDetail } from "@/components/variety-detail";
import { ProductCard } from "@/components/product-card";
import { ContactBanner } from "@/components/contact-banner";
export function generateStaticParams() {
  return sampleProducts.map((product) => ({ slug: product.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title:
      sampleProducts.find((product) => product.slug === slug)?.name ??
      "Variety not found",
  };
}
export default async function DurianPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = sampleProducts.find((item) => item.slug === slug);
  if (!product) notFound();
  return (
    <>
      <VarietyDetail product={product} />
      <section className="shell related-section">
        <div className="section-heading">
          <div>
            <span className="mini-label">Keep exploring</span>
            <h2>There’s more to love.</h2>
          </div>
          <p className="section-description">
            A different character.
            <br />
            Another reason to look forward to the season.
          </p>
        </div>
        <div className="product-grid related-grid">
          {sampleProducts
            .filter((item) => item.id !== product.id)
            .map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
        </div>
      </section>
      <ContactBanner />
    </>
  );
}
