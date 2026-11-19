"use client";
import Link from "next/link";
import { SiteImage as Image } from "@/components/site-image";
import { ArrowUpRight, Check, Columns2, Plus } from "lucide-react";
import type { Product } from "@/types/product";
import { toVariety, varietyImage } from "@/lib/varieties";
import { useFarm } from "@/components/farm-provider";
export function ProductCard({
  product,
  compare,
}: {
  product: Product;
  compare?: { selected: boolean; disabled: boolean; toggle: () => void };
}) {
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
            src={varietyImage(product)}
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
          {variety.code && variety.code !== product.name && (
            <span className="variety-code">{variety.code}</span>
          )}
        </div>
        <p>{variety.notes}</p>
        <div className="product-bottom">
          <span>
            {product.pricePerKg
              ? "RM " + product.pricePerKg + " / kg"
              : "Harvest pricing to be confirmed"}
          </span>
          {compare ? (
            <button
              type="button"
              className="compare-toggle"
              aria-label={"Compare " + product.name}
              aria-pressed={compare.selected}
              disabled={compare.disabled}
              onClick={compare.toggle}
            >
              {compare.selected ? <Check size={15} /> : <Columns2 size={15} />}
              {compare.selected ? "Added" : "Compare"}
            </button>
          ) : (
            <Link
              href={"/durians/" + product.slug}
              aria-label={"View " + product.name}
            >
              <ArrowUpRight size={21} />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
