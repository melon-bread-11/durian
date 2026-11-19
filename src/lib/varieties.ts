import type { Product } from "@/types/product";
import type { TasteProfile } from "@/lib/farm-ui";

export type Variety = Product & {
  code?: string;
  aliases: string[];
  profile: Exclude<TasteProfile, "all">;
  notes: string;
  character: string;
  colour: string;
  imagePosition: string;
  sweetness: number;
  richness: number;
  bitterness: number;
};

const profiles: Record<
  string,
  Pick<
    Variety,
    | "code"
    | "aliases"
    | "profile"
    | "character"
    | "colour"
    | "imagePosition"
    | "sweetness"
    | "richness"
    | "bitterness"
  >
> = {
  "musang-king": {
    code: "D197",
    aliases: ["Raja Kunyit"],
    profile: "bittersweet",
    character: "Bold, rich & beautifully bittersweet.",
    colour: "#edf1df",
    imagePosition: "50% 55%",
    sweetness: 3,
    richness: 5,
    bitterness: 4,
  },
  d24: {
    code: "D24",
    aliases: ["Sultan"],
    profile: "balanced",
    character: "A little sweetness. A little depth.",
    colour: "#f3eedf",
    imagePosition: "30% 70%",
    sweetness: 3,
    richness: 4,
    bitterness: 3,
  },
  "black-thorn": {
    code: "D200",
    aliases: ["Duri Hitam", "Ochee"],
    profile: "sweet",
    character: "For the sweeter side of your palate.",
    colour: "#ecece5",
    imagePosition: "70% 40%",
    sweetness: 5,
    richness: 5,
    bitterness: 2,
  },
  "red-prawn": {
    code: "D175",
    aliases: ["Udang Merah", "Ang Hae"],
    profile: "sweet",
    character: "Soft, creamy, and gently bittersweet.",
    colour: "#f4e9dd",
    imagePosition: "50% 55%",
    sweetness: 4,
    richness: 3,
    bitterness: 2,
  },
  tekka: {
    code: "D160",
    aliases: ["Buluh Bawah", "Musang Queen"],
    profile: "bittersweet",
    character: "Thick flesh with a layered sweet-bitter finish.",
    colour: "#e8eddf",
    imagePosition: "50% 55%",
    sweetness: 3,
    richness: 4,
    bitterness: 4,
  },
  d101: {
    code: "D101",
    aliases: [],
    profile: "balanced",
    character: "Creamy sweetness with a light bitter finish.",
    colour: "#f7efdb",
    imagePosition: "50% 55%",
    sweetness: 4,
    richness: 3,
    bitterness: 2,
  },
};

export const tasteMetrics = [
  { key: "sweetness", label: "Sweetness" },
  { key: "richness", label: "Richness" },
  { key: "bitterness", label: "Bitterness" },
] as const;

export function varietyImage(product: Product) {
  return product.imageUrl || "/images/durian-harvest.webp";
}

export function toVariety(product: Product): Variety {
  const profile = profiles[product.slug] ?? {
    ...profiles.d24,
    code: undefined,
    aliases: [],
  };
  return {
    ...product,
    ...profile,
    notes: product.tastingNotes.replace(/^Draft notes:\s*/i, ""),
  };
}

export const profileLabels = {
  all: "All varieties",
  bittersweet: "Rich & bittersweet",
  balanced: "Smooth & balanced",
  sweet: "Sweet & mellow",
};
