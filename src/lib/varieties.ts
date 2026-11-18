import type { Product } from "@/types/product";
import type { TasteProfile } from "@/lib/farm-ui";

export type Variety = Product & {
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
    profile: "bittersweet",
    character: "Bold, rich & beautifully bittersweet.",
    colour: "#edf1df",
    imagePosition: "50% 55%",
    sweetness: 3,
    richness: 5,
    bitterness: 4,
  },
  d24: {
    profile: "balanced",
    character: "A little sweetness. A little depth.",
    colour: "#f3eedf",
    imagePosition: "30% 70%",
    sweetness: 3,
    richness: 4,
    bitterness: 3,
  },
  "black-thorn": {
    profile: "sweet",
    character: "For the sweeter side of your palate.",
    colour: "#ecece5",
    imagePosition: "70% 40%",
    sweetness: 5,
    richness: 5,
    bitterness: 2,
  },
};

export function toVariety(product: Product): Variety {
  return {
    ...product,
    ...(profiles[product.slug] ?? profiles["d24"]),
    notes: product.tastingNotes.replace(/^Draft notes:\s*/i, ""),
  };
}

export const profileLabels = {
  all: "All varieties",
  bittersweet: "Rich & bittersweet",
  balanced: "Smooth & balanced",
  sweet: "Sweet & mellow",
};
