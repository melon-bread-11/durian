"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ChevronDown, Columns2, X } from "lucide-react";
import { SiteImage } from "@/components/site-image";
import { TasteRating } from "@/components/taste-rating";
import { tasteMetrics, varietyImage, type Variety } from "@/lib/varieties";
import styles from "./variety-comparison.module.css";

export function VarietyComparison({
  varieties,
  limit,
  onRemove,
  onClear,
}: {
  varieties: Variety[];
  limit: number;
  onRemove: (id: string) => void;
  onClear: () => void;
}) {
  const id = useId();
  const [expanded, setExpanded] = useState(false);
  const canCompare = varieties.length >= 2;
  const showComparison = canCompare && expanded;

  return (
    <section className={styles.panel} aria-labelledby={id + "-title"}>
      <div className={styles.toolbar}>
        <Columns2 className={styles.icon} size={22} aria-hidden="true" />
        <div className={styles.heading}>
          <h2 id={id + "-title"}>Compare varieties</h2>
          <p role="status">
            {varieties.length === 0
              ? `Choose 2 or 3 varieties from the catalogue.`
              : `${varieties.length} of ${limit} selected`}
          </p>
        </div>
        {varieties.length > 0 && (
          <button
            type="button"
            className="text-link"
            onClick={() => {
              setExpanded(false);
              onClear();
            }}
          >
            Clear comparison
          </button>
        )}
        <button
          type="button"
          className="button button-small"
          disabled={!canCompare}
          aria-expanded={showComparison}
          aria-controls={id}
          onClick={() => setExpanded(!expanded)}
        >
          {showComparison
            ? "Hide comparison"
            : canCompare
              ? `Compare ${varieties.length} varieties`
              : "Compare"}
          <ChevronDown size={16} aria-hidden="true" />
        </button>
      </div>
      {varieties.length > 0 && (
        <ul className={styles.selection} aria-label="Selected varieties">
          {varieties.map(({ id, name }) => (
            <li key={id}>
              <button
                type="button"
                aria-label={`Remove ${name} from comparison`}
                onClick={() => onRemove(id)}
              >
                {name} <X size={14} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div id={id} hidden={!showComparison}>
        {showComparison && (
          <div className={styles.results}>
            <p id={id + "-note"} className={styles.note}>
              Tasting scores are approximate. Flavour can vary from fruit to
              fruit.
            </p>
            <div
              className={styles.scroller}
              role="region"
              aria-label="Variety comparison"
              tabIndex={0}
            >
              <table className={styles.table} aria-describedby={id + "-note"}>
                <caption className="sr-only">Durian tasting comparison</caption>
                <thead>
                  <tr>
                    <th scope="col">Taste</th>
                    {varieties.map((variety) => (
                      <th scope="col" key={variety.id}>
                        <Link href={"/durians/" + variety.slug}>
                          <SiteImage
                            src={varietyImage(variety)}
                            alt=""
                            width={176}
                            height={117}
                          />
                          {variety.name}
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Tasting notes</th>
                    {varieties.map(({ id, notes }) => (
                      <td key={id}>{notes}</td>
                    ))}
                  </tr>
                  {tasteMetrics.map(({ key, label }) => (
                    <tr key={key}>
                      <th scope="row">{label}</th>
                      {varieties.map((variety) => (
                        <td key={variety.id}>
                          <TasteRating value={variety[key]} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
