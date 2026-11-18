import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCatalogue } from "@/lib/catalogue";
import { DurianArt } from "@/components/durian-art";
import { SampleNotice } from "@/components/sample-notice";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { products } = await getCatalogue();
  return {
    title:
      products.find((product) => product.slug === slug)?.name ??
      "Variety not found",
  };
}

export default async function DurianPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { products, isSample } = await getCatalogue();
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  return (
    <div className="shell section">
      <Link className="text-link" href="/durians">
        Back to all durians
      </Link>
      {isSample && <SampleNotice />}
      <div className="detail-grid">
        <div className="detail-art">
          <DurianArt />
        </div>
        <div className="detail-copy">
          <p className="intro-note">
            {product.availability === "SOLD_OUT"
              ? "Sold out"
              : product.availability === "AVAILABLE"
                ? "Enquiries open"
                : "A seasonal variety"}
          </p>
          <h1>{product.name}</h1>
          <p className="lead">{product.tastingNotes}</p>
          <p>{product.description}</p>
          <p className="detail-price">
            {product.pricePerKg
              ? `RM ${product.pricePerKg} / kg`
              : "Price confirmed with the harvest"}
          </p>
          {product.availability !== "SOLD_OUT" && (
            <Link
              className="button"
              href={`/contact?product=${encodeURIComponent(product.id)}`}
            >
              Ask about this variety
            </Link>
          )}
          <p className="small-note">
            An enquiry is a conversation, not a confirmed order. We will confirm
            availability and arrangements with you.
          </p>
        </div>
      </div>
    </div>
  );
}
