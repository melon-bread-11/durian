export type TasteProfile = "all" | "bittersweet" | "balanced" | "sweet";
export type SelectionItem = { productId: string; quantityKg: number };

export function filterVarieties<
  T extends { name: string; profile: string; notes: string },
>(
  items: T[],
  search: string,
  profile: TasteProfile,
  sort: "featured" | "name",
): T[] {
  const query = search.trim().toLowerCase();
  const results = items.filter(
    (item) =>
      (profile === "all" || item.profile === profile) &&
      `${item.name} ${item.notes}`.toLowerCase().includes(query),
  );
  return sort === "name"
    ? results.sort((a, b) => a.name.localeCompare(b.name))
    : results;
}

export function updateSelection(
  items: SelectionItem[],
  productId: string,
  quantityKg: number,
): SelectionItem[] {
  const remaining = items.filter((item) => item.productId !== productId);
  if (!Number.isFinite(quantityKg) || quantityKg <= 0) return remaining;
  const updated = {
    productId,
    quantityKg: Math.max(0.5, Math.min(20, Math.round(quantityKg * 2) / 2)),
  };
  return items.some((item) => item.productId === productId)
    ? items.map((item) => (item.productId === productId ? updated : item))
    : [...items, updated];
}

export function normaliseSelection(
  value: unknown,
  knownIds: string[],
): SelectionItem[] {
  if (!Array.isArray(value)) return [];
  return value.reduce<SelectionItem[]>((items, item) => {
    if (
      !item ||
      typeof item !== "object" ||
      typeof item.productId !== "string" ||
      !knownIds.includes(item.productId) ||
      typeof item.quantityKg !== "number" ||
      !Number.isFinite(item.quantityKg) ||
      item.quantityKg <= 0
    )
      return items;
    return updateSelection(items, item.productId, item.quantityKg);
  }, []);
}
