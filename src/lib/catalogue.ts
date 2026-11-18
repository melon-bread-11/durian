import "server-only";
import { cache } from "react";
import { getDb } from "@/lib/db";
import { sampleProducts } from "@/lib/sample-products";
import type { Catalogue } from "@/types/product";

export const getCatalogue = cache(async (): Promise<Catalogue> => {
  const db = getDb();
  if (!db) return { products: sampleProducts, isSample: true };

  // A configured database failure must surface as an error, not sample stock.
  const rows = await db.product.findMany({
    where: { archived: false },
    orderBy: { createdAt: "asc" },
  });
  return {
    products: rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      name: row.name,
      description: row.description,
      tastingNotes: row.tastingNotes,
      imageUrl: row.imageUrl,
      availability: row.availability,
      pricePerKg: row.pricePerKg?.toFixed(2) ?? null,
    })),
    isSample: rows.some((row) => row.isSample),
  };
});
