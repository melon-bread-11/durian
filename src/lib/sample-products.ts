import type { Product } from "@/types/product";

// Illustrative catalogue entries, not verified farm inventory.
// Shared with the seed script; import via relative path there.
export const sampleProducts: Product[] = [
  {
    id: "sample-musang-king",
    slug: "musang-king",
    name: "Musang King",
    description:
      "Golden flesh with a dense, creamy texture. Its bittersweet finish makes it a rich choice for a tasting.",
    tastingNotes: "Draft notes: rich, creamy, bittersweet",
    availability: "SEASONAL",
    pricePerKg: null,
    imageUrl: "/images/varieties/musang-king.webp",
  },
  {
    id: "sample-d24",
    slug: "d24",
    name: "D24",
    description:
      "A smooth, creamy variety with a balance of sweetness and a little bitterness.",
    tastingNotes: "Draft notes: mellow, smooth, nutty",
    availability: "SEASONAL",
    pricePerKg: null,
    imageUrl: "/images/varieties/d24.webp",
  },
  {
    id: "sample-black-thorn",
    slug: "black-thorn",
    name: "Black Thorn",
    description:
      "A full-bodied variety with deep golden flesh and a soft texture that can feel like custard.",
    tastingNotes: "Draft notes: sweet, custardy, full-bodied",
    availability: "SEASONAL",
    pricePerKg: null,
    imageUrl: "/images/varieties/black-thorn.webp",
  },
  {
    id: "sample-red-prawn",
    slug: "red-prawn",
    name: "Red Prawn",
    description:
      "Also called Udang Merah, this variety often has orange-tinted flesh with a soft, creamy texture and a sweet finish.",
    tastingNotes: "Draft notes: sweet, soft, gently bittersweet",
    availability: "SEASONAL",
    pricePerKg: null,
    imageUrl: "/images/varieties/red-prawn.webp",
  },
  {
    id: "sample-tekka",
    slug: "tekka",
    name: "Tekka",
    description:
      "Also called Buluh Bawah, Tekka has thick flesh and a layered sweet-bitter flavour that can develop a fermented note.",
    tastingNotes: "Draft notes: thick, bittersweet, complex",
    availability: "SEASONAL",
    pricePerKg: null,
    imageUrl: "/images/varieties/tekka.webp",
  },
  {
    id: "sample-d101",
    slug: "d101",
    name: "D101",
    description:
      "A creamy variety with a gentle sweetness and a lightly bitter finish. Try it alongside D24 to compare two balanced profiles.",
    tastingNotes: "Draft notes: creamy, sweet, lightly bitter",
    availability: "SEASONAL",
    pricePerKg: null,
    imageUrl: "/images/varieties/d101.webp",
  },
];
