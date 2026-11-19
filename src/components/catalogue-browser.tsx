"use client";
import { useMemo, useState } from "react";
import { ArrowUpRight, Leaf, Search, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { VarietyComparison } from "@/components/variety-comparison";
import { filterVarieties, type TasteProfile } from "@/lib/farm-ui";
import { profileLabels, toVariety } from "@/lib/varieties";
import type { Product } from "@/types/product";

const comparisonLimit = 3;

export function CatalogueBrowser({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("");
  const [profile, setProfile] = useState<TasteProfile>("all");
  const [sort, setSort] = useState<"featured" | "name">("featured");
  const [comparisonIds, setComparisonIds] = useState<string[]>([]);
  const varieties = useMemo(() => products.map(toVariety), [products]);
  const results = filterVarieties(varieties, search, profile, sort);
  const compared = comparisonIds.flatMap((id) =>
    varieties.filter((variety) => variety.id === id),
  );

  function toggleComparison(id: string) {
    setComparisonIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length >= comparisonLimit) return current;
      return [...current, id];
    });
  }

  function reset() {
    setSearch("");
    setProfile("all");
    setSort("featured");
  }
  return (
    <>
      <div className="catalogue-toolbar">
        <div className="search-field">
          <Search size={19} />
          <input
            aria-label="Search durian varieties"
            placeholder="Search by name, code, or tasting note"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          {search && (
            <button aria-label="Clear search" onClick={() => setSearch("")}>
              <X size={16} />
            </button>
          )}
        </div>
        <label className="sort-control">
          <SlidersHorizontal size={16} />
          <span className="sr-only">Sort varieties</span>
          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value as "featured" | "name")
            }
          >
            <option value="featured">Featured first</option>
            <option value="name">Name: A–Z</option>
          </select>
        </label>
      </div>
      <div className="catalogue-filter-row">
        <div className="filter-pills" aria-label="Filter by flavour">
          {(Object.keys(profileLabels) as TasteProfile[]).map((key) => (
            <button
              key={key}
              className={profile === key ? "active" : ""}
              aria-pressed={profile === key}
              onClick={() => setProfile(key)}
            >
              {profileLabels[key]}
            </button>
          ))}
        </div>
        <span className="result-count" aria-live="polite">
          {results.length} {results.length === 1 ? "variety" : "varieties"}
        </span>
      </div>
      <VarietyComparison
        varieties={compared}
        limit={comparisonLimit}
        onRemove={toggleComparison}
        onClear={() => setComparisonIds([])}
      />
      {results.length ? (
        <div className="product-grid">
          {results.map((product) => {
            const selected = comparisonIds.includes(product.id);
            return (
              <ProductCard
                key={product.id}
                product={product}
                compare={{
                  selected,
                  disabled:
                    !selected && comparisonIds.length >= comparisonLimit,
                  toggle: () => toggleComparison(product.id),
                }}
              />
            );
          })}
        </div>
      ) : (
        <div className="empty-state catalogue-empty">
          <Leaf size={36} strokeWidth={1.3} />
          <h2>No varieties in this patch.</h2>
          <p>Try another name or flavour profile. There’s more to explore.</p>
          <button className="button" onClick={reset}>
            Clear the filters
          </button>
        </div>
      )}
      <div className="catalogue-help">
        <div>
          <h3>Not sure where to start?</h3>
          <p>
            Everyone’s palate is a little different. Start a conversation and
            find your flavour.
          </p>
        </div>
        <Link className="text-link" href="/contact">
          Ask the farm <ArrowUpRight size={18} />
        </Link>
      </div>
    </>
  );
}
