"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SiteImage as Image } from "@/components/site-image";
import { TasteRating } from "@/components/taste-rating";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Leaf,
  Minus,
  Plus,
  ShoppingBag,
  Sprout,
} from "lucide-react";
import { useFarm } from "@/components/farm-provider";
import {
  toVariety,
  profileLabels,
  tasteMetrics,
  varietyImage,
} from "@/lib/varieties";
import type { Product } from "@/types/product";

export function VarietyDetail({ product }: { product: Product }) {
  const variety = toVariety(product);
  const fruitImage = varietyImage(product);
  const { items, add } = useFarm();
  const [quantity, setQuantity] = useState(1);
  const savedQuantity = items.find(
    (item) => item.productId === product.id,
  )?.quantityKg;
  useEffect(() => {
    setQuantity(savedQuantity ?? 1);
  }, [savedQuantity]);
  const added = items.some((item) => item.productId === product.id);
  const [view, setView] = useState<"fruit" | "orchard">("fruit");
  return (
    <div className="shell detail-page">
      <Link href="/durians" className="back-link">
        <ArrowLeft size={15} /> All varieties
      </Link>
      <div className="detail-grid">
        <div className="detail-gallery">
          <div className="detail-photo">
            <Image
              src={view === "fruit" ? fruitImage : "/images/orchard-hero.webp"}
              alt={
                view === "fruit"
                  ? "Generated illustration of an opened " +
                    product.name +
                    " durian"
                  : "Illustrative tropical orchard"
              }
              fill
              priority
              sizes="(max-width: 760px) 100vw, 50vw"
              style={{
                objectFit: "cover",
                objectPosition: variety.imagePosition,
              }}
            />
            <span className="product-badge">
              <Leaf size={13} /> Catalogue preview
            </span>
          </div>
          <div className="gallery-thumbnails">
            <button
              aria-label="View illustrative fruit photograph"
              aria-pressed={view === "fruit"}
              onClick={() => setView("fruit")}
            >
              <Image src={fruitImage} alt="" fill sizes="90px" />
            </button>
            <button
              aria-label="View illustrative orchard photograph"
              aria-pressed={view === "orchard"}
              onClick={() => setView("orchard")}
            >
              <Image src="/images/orchard-hero.webp" alt="" fill sizes="90px" />
            </button>
            <span>Generated illustrations.</span>
          </div>
        </div>
        <div className="detail-copy">
          <span className="mini-label">
            <Sprout size={16} /> {profileLabels[variety.profile]}
          </span>
          <h1>{product.name}</h1>
          {(variety.aliases.length > 0 ||
            (variety.code && variety.code !== product.name)) && (
            <p className="detail-variety-names">
              {[
                variety.code !== product.name ? variety.code : undefined,
                ...variety.aliases,
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
          )}
          <p className="detail-character">{variety.character}</p>
          <p className="detail-description">{product.description}</p>
          <div className="taste-profile">
            <h2>A little taste of its character</h2>
            {tasteMetrics.map(({ key, label }) => (
              <div className="taste-row" key={label}>
                <span>{label}</span>
                <TasteRating value={variety[key]} />
              </div>
            ))}
            <small>
              Illustrative tasting guide, to be confirmed by the farm.
            </small>
          </div>
          <div className="detail-price">
            <span>Harvest pricing</span>
            <strong>
              {product.pricePerKg
                ? "RM " + product.pricePerKg + " / kg"
                : "Confirmed in season"}
            </strong>
          </div>
          <div className="detail-actions">
            <div
              className="quantity-control"
              aria-label="Quantity in kilograms"
            >
              <button
                aria-label="Decrease quantity"
                disabled={quantity <= 0.5}
                onClick={() => setQuantity((value) => value - 0.5)}
              >
                <Minus size={16} />
              </button>
              <output aria-live="polite">{quantity} kg</output>
              <button
                aria-label="Increase quantity"
                disabled={quantity >= 20}
                onClick={() => setQuantity((value) => value + 0.5)}
              >
                <Plus size={16} />
              </button>
            </div>
            <button
              className="button"
              disabled={product.availability === "SOLD_OUT"}
              onClick={() => add(product.id, quantity)}
            >
              {added ? <Check size={18} /> : <ShoppingBag size={18} />}
              {product.availability === "SOLD_OUT"
                ? "Currently sold out"
                : added
                  ? "Update enquiry list"
                  : "Add to enquiry"}
            </button>
          </div>
          <Link
            className="text-link detail-contact"
            href={"/contact?product=" + encodeURIComponent(product.id)}
          >
            Continue to your enquiry <ArrowUpRight size={17} />
          </Link>
          <p className="small-note">
            No payment or reservation. This preview lets you plan an enquiry;
            nothing is sent to the farm.
          </p>
        </div>
      </div>
    </div>
  );
}
