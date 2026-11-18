import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { sampleProducts } from "../src/lib/sample-products";

const connectionString = process.env.DATABASE_URL?.trim();
if (!connectionString)
  throw new Error("Set DATABASE_URL in .env before seeding.");
const db = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

try {
  for (const product of sampleProducts) {
    await db.product.upsert({
      where: { slug: product.slug },
      update: {}, // Re-running the seed never overwrites edited farm content.
      create: { ...product, pricePerKg: null, isSample: true },
    });
  }
  console.info("Sample catalogue added. Replace draft content before launch.");
} finally {
  await db.$disconnect();
}
