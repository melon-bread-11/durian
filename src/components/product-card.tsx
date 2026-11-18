import Link from "next/link";
import { DurianArt } from "@/components/durian-art";
import type { Product } from "@/types/product";

const labels = {
  AVAILABLE: "Enquiries open",
  SEASONAL: "Seasonal",
  SOLD_OUT: "Sold out",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link
        href={`/durians/${product.slug}`}
        className="product-art-link"
        aria-label={`Explore ${product.name}`}
      >
        <DurianArt className="product-art" />
      </Link>
      <div className="product-copy">
        <span className="status-label">{labels[product.availability]}</span>
        <h2>
          <Link href={`/durians/${product.slug}`}>{product.name}</Link>
        </h2>
        <p>{product.tastingNotes}</p>
        <div className="product-bottom">
          <span>
            {product.pricePerKg
              ? `RM ${product.pricePerKg} / kg`
              : "Price confirmed with the harvest"}
          </span>
          <Link href={`/durians/${product.slug}`}>View variety</Link>
        </div>
      </div>
    </article>
  );
}
