import { enquirySchema, type EnquiryInput } from "./validation";

type EnquiryProduct = { id: string; archived: boolean; availability: string };
type Dependencies =
  | { enabled: false }
  | {
      enabled: true;
      findProduct: (id: string) => Promise<EnquiryProduct | null>;
      saveEnquiry: (input: EnquiryInput) => Promise<void>;
    };

const maxBodyBytes = 16_384;
const json = (body: unknown, status: number) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export function createEnquiryHandler(dependencies: Dependencies) {
  return async function handleEnquiry(request: Request): Promise<Response> {
    if (
      request.headers
        .get("content-type")
        ?.split(";")[0]
        .trim()
        .toLowerCase() !== "application/json"
    ) {
      return json({ error: "Please send the enquiry as JSON." }, 415);
    }

    // Limit actual bytes read, including chunked requests without Content-Length.
    const reader = request.body?.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    let input: unknown;
    try {
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          size += value.byteLength;
          if (size > maxBodyBytes) {
            await reader.cancel();
            return json({ error: "Your enquiry is too large." }, 413);
          }
          chunks.push(value);
        }
      }
      const bytes = new Uint8Array(size);
      let offset = 0;
      for (const chunk of chunks) {
        bytes.set(chunk, offset);
        offset += chunk.byteLength;
      }
      input = JSON.parse(new TextDecoder().decode(bytes));
    } catch {
      return json({ error: "The enquiry could not be read." }, 400);
    } finally {
      reader?.releaseLock();
    }

    const result = enquirySchema.safeParse(input);
    if (!result.success) {
      return json(
        {
          error: "Please check your enquiry details.",
          fields: result.error.flatten().fieldErrors,
        },
        400,
      );
    }
    if (!dependencies.enabled) {
      return json(
        { error: "Enquiries are not open yet. Please check back soon." },
        503,
      );
    }

    try {
      const product = await dependencies.findProduct(result.data.productId);
      if (!product || product.archived || product.availability === "SOLD_OUT") {
        return json(
          {
            error:
              "This variety is not accepting enquiries. Please choose another.",
          },
          409,
        );
      }
      await dependencies.saveEnquiry(result.data);
      return json(
        { message: "Your enquiry has been received. We will be in touch." },
        201,
      );
    } catch {
      return json(
        { error: "We couldn’t save your enquiry. Please try again later." },
        503,
      );
    }
  };
}
