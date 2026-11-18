import { getDb } from "@/lib/db";
import { createEnquiryHandler } from "@/lib/enquiries";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const db = getDb();
  const handler = db
    ? createEnquiryHandler({
        enabled: true,
        findProduct: (id) =>
          db.product.findUnique({
            where: { id },
            select: { id: true, archived: true, availability: true },
          }),
        saveEnquiry: async (input) => {
          await db.enquiry.create({ data: input });
        },
      })
    : createEnquiryHandler({ enabled: false });
  return handler(request);
}
