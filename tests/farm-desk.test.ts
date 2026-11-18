import { expect, it } from "vitest";
import { normaliseDesk } from "../src/lib/farm-desk";

it("restores only known varieties, valid statuses, and bounded product text", () => {
  expect(
    normaliseDesk(
      {
        availability: { a: "AVAILABLE", b: "invented", unknown: "SOLD_OUT" },
        names: { a: "  My variety  ", unknown: "Hidden" },
        notes: { a: "x".repeat(500) },
        enquiryStatus: { e1: "CLOSED", e2: "arbitrary" },
      },
      ["a", "b"],
      ["e1", "e2"],
    ),
  ).toEqual({
    availability: { a: "AVAILABLE" },
    names: { a: "My variety" },
    notes: { a: "x".repeat(200) },
    enquiryStatus: { e1: "CLOSED" },
  });
});

it.each([null, [], "invalid", { availability: ["SOLD_OUT"], names: null }])(
  "handles malformed saved desk state: %j",
  (value) => {
    expect(normaliseDesk(value, ["a"], ["e1"])).toEqual({
      availability: {},
      names: {},
      notes: {},
      enquiryStatus: {},
    });
  },
);
