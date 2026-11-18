export type Availability = "AVAILABLE" | "SEASONAL" | "SOLD_OUT";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  tastingNotes: string;
  availability: Availability;
  pricePerKg: string | null;
  imageUrl: string | null;
};

export type Catalogue = { products: Product[]; isSample: boolean };
