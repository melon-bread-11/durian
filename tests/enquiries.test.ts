import { describe, expect, it } from "vitest";
import { enquirySchema } from "../src/lib/validation";
import { createEnquiryHandler } from "../src/lib/enquiries";

const valid = {
  productId: "musang-king",
  customerName: "  Farm visitor  ",
  phone: "+60 12-345 6789",
  quantityKg: 2.5,
  message: "Is this variety available next week?",
};
const product = {
  id: "musang-king",
  archived: false,
  availability: "SEASONAL",
};

function request(body: unknown) {
  return new Request("http://localhost/api/enquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("enquiry validation", () => {
  it("trims names and accepts a fractional quantity", () => {
    const result = enquirySchema.parse(valid);
    expect(result.customerName).toBe("Farm visitor");
    expect(result.quantityKg).toBe(2.5);
  });
  it.each([
    { customerName: " " },
    { phone: "hello" },
    { quantityKg: 0 },
    { quantityKg: -1 },
    { quantityKg: 1000 },
    { quantityKg: "2" },
    { message: "x".repeat(2001) },
    { productId: "" },
  ])("rejects invalid fields: %j", (change) => {
    expect(enquirySchema.safeParse({ ...valid, ...change }).success).toBe(
      false,
    );
  });
  it("accepts an enquiry without a quantity", () => {
    expect(
      enquirySchema.safeParse({ ...valid, quantityKg: undefined }).success,
    ).toBe(true);
  });
});

describe("enquiry request handler", () => {
  it("rejects invalid data before looking up a product or saving", async () => {
    const handler = createEnquiryHandler({
      enabled: true,
      findProduct: async () => {
        throw new Error("must not query");
      },
      saveEnquiry: async () => {
        throw new Error("must not save");
      },
    });
    expect((await handler(request({ ...valid, phone: "bad" }))).status).toBe(
      400,
    );
  });
  it("rejects malformed JSON", async () => {
    const handler = createEnquiryHandler({ enabled: false });
    const response = await handler(
      new Request("http://localhost/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{",
      }),
    );
    expect(response.status).toBe(400);
  });
  it("rejects non-JSON and oversized requests", async () => {
    const handler = createEnquiryHandler({ enabled: false });
    const wrongType = new Request("http://localhost/api/enquiries", {
      method: "POST",
      body: "text",
    });
    expect((await handler(wrongType)).status).toBe(415);
    expect(
      (await handler(request({ ...valid, message: "x".repeat(17000) }))).status,
    ).toBe(413);
  });
  it("never reports success when no database is connected", async () => {
    const response = await createEnquiryHandler({ enabled: false })(
      request(valid),
    );
    expect(response.status).toBe(503);
    expect((await response.json()).error).toBeTruthy();
  });
  it.each([
    null,
    { ...product, archived: true },
    { ...product, availability: "SOLD_OUT" },
  ])("rejects a missing or unavailable product: %j", async (found) => {
    const handler = createEnquiryHandler({
      enabled: true,
      findProduct: async () => found,
      saveEnquiry: async () => {
        throw new Error("must not save");
      },
    });
    expect((await handler(request(valid))).status).toBe(409);
  });
  it("saves validated data and returns no customer details", async () => {
    const saved: unknown[] = [];
    const handler = createEnquiryHandler({
      enabled: true,
      findProduct: async () => product,
      saveEnquiry: async (data) => {
        saved.push(data);
      },
    });
    const response = await handler(request(valid));
    expect(response.status).toBe(201);
    expect(saved).toEqual([{ ...valid, customerName: "Farm visitor" }]);
    expect(await response.json()).toEqual({
      message: "Your enquiry has been received. We will be in touch.",
    });
  });
  it("does not expose database failures to visitors", async () => {
    const handler = createEnquiryHandler({
      enabled: true,
      findProduct: async () => {
        throw new Error("private database credentials");
      },
      saveEnquiry: async () => {},
    });
    const response = await handler(request(valid));
    expect(response.status).toBe(503);
    expect(JSON.stringify(await response.json())).not.toContain("credentials");
  });
});
