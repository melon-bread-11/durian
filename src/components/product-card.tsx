"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Check, Plus } from "lucide-react";
import type { Product } from "@/types/product";
import { toVariety } from "@/lib/varieties";
import { useFarm } from "@/components/farm-provider";
export function ProductCard({ product }: { product: Product }) {
  const variety = toVariety(product);
  const { items, add, remove } = useFarm();
  const selected = items.some((item) => item.productId === product.id);
  return (
    <article className="product-card">
      <div
        className="product-image-wrap"
        style={{ backgroundColor: variety.colour }}
      >
        <Link
          href={"/durians/" + product.slug}
          aria-label={"Explore " + product.name}
        >
          <Image
            src={product.imageUrl || "/images/durian-harvest.webp"}
            alt={"Illustrative opened durian for " + product.name}
            fill
            sizes="(max-width: 700px) 100vw, 33vw"
            style={{
              objectFit: "cover",
              objectPosition: variety.imagePosition,
            }}
          />
        </Link>
        <span className="product-badge">
          {product.availability === "SOLD_OUT"
            ? "Sold out"
            : "Seasonal selection"}
        </span>
        <button
          className={"product-save " + (selected ? "selected" : "")}
          aria-label={
            (selected ? "Remove " : "Add ") +
            product.name +
            (selected ? " from enquiry" : " to enquiry")
          }
          aria-pressed={selected}
          disabled={product.availability === "SOLD_OUT"}
          onClick={() => (selected ? remove(product.id) : add(product.id))}
        >
          {selected ? <Check size={19} /> : <Plus size={19} />}
        </button>
      </div>
      <div className="product-copy">
        <div className="product-name-row">
          <h3>
            <Link href={"/durians/" + product.slug}>{product.name}</Link>
          </h3>
          <span className="profile-dot" />
        </div>
        <p>{variety.notes}</p>
        <div className="product-bottom">
          <span>
            {product.pricePerKg
              ? "RM " + product.pricePerKg + " / kg"
              : "Harvest pricing to be confirmed"}
          </span>
          <Link
            href={"/durians/" + product.slug}
            aria-label={"View " + product.name}
          >
            <ArrowUpRight size={21} />
          </Link>
        </div>
      </div>
    </article>
  );
}
