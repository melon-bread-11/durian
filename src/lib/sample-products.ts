import type { Product } from "@/types/product";

// Illustrative catalogue entries, not verified farm inventory.
// Shared with the seed script; import via relative path there.
export const sampleProducts: Product[] = [
  {
    id: "sample-musang-king",
    slug: "musang-king",
    name: "Musang King",
    description:
      "A place for our harvest notes, photos, and the story behind this variety. Ask us about the coming season.",
    tastingNotes: "Draft notes: rich, creamy, bittersweet",
    availability: "SEASONAL",
    pricePerKg: null,
    imageUrl: null,
  },
  {
    id: "sample-d24",
    slug: "d24",
    name: "D24",
    description:
      "Every variety has its own character. We will share the details of the fruit grown on our farm here.",
    tastingNotes: "Draft notes: mellow, smooth, nutty",
    availability: "SEASONAL",
    pricePerKg: null,
    imageUrl: null,
  },
  {
    id: "sample-black-thorn",
    slug: "black-thorn",
    name: "Black Thorn",
    description:
      "Follow along as we get ready to introduce the orchard's seasonal selection. Harvest information will be added here.",
    tastingNotes: "Draft notes: sweet, custardy, full-bodied",
    availability: "SEASONAL",
    pricePerKg: null,
    imageUrl: null,
  },
];
