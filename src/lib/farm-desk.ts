import type { Availability } from "@/types/product";
export type DeskStatus = "NEW" | "CONTACTED" | "CLOSED";
export type DeskState = {
  availability: Record<string, Availability>;
  names: Record<string, string>;
  notes: Record<string, string>;
  enquiryStatus: Record<string, DeskStatus>;
};
export const demoEnquiries = [
  {
    id: "example-01",
    customer: "Example visitor 01",
    variety: "Musang King",
    quantity: "2 kg",
    message: "Asking about the next harvest and collection arrangements.",
    status: "NEW" as DeskStatus,
  },
  {
    id: "example-02",
    customer: "Example visitor 02",
    variety: "D24",
    quantity: "3 kg",
    message: "Interested in a balanced variety for a family gathering.",
    status: "NEW" as DeskStatus,
  },
  {
    id: "example-03",
    customer: "Example visitor 03",
    variety: "Farm visit",
    quantity: "—",
    message: "Would like to know about future visitor dates.",
    status: "CONTACTED" as DeskStatus,
  },
];
function record(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}
export function normaliseDesk(
  value: unknown,
  productIds: string[],
  enquiryIds: string[],
): DeskState {
  const source = record(value);
  const result: DeskState = {
    availability: {},
    names: {},
    notes: {},
    enquiryStatus: {},
  };
  for (const id of productIds) {
    const availability = record(source.availability)[id];
    if (
      availability === "AVAILABLE" ||
      availability === "SEASONAL" ||
      availability === "SOLD_OUT"
    )
      result.availability[id] = availability;
    const name = record(source.names)[id];
    if (typeof name === "string" && name.trim())
      result.names[id] = name.trim().slice(0, 80);
    const notes = record(source.notes)[id];
    if (typeof notes === "string")
      result.notes[id] = notes.trim().slice(0, 200);
  }
  for (const id of enquiryIds) {
    const status = record(source.enquiryStatus)[id];
    if (status === "NEW" || status === "CONTACTED" || status === "CLOSED")
      result.enquiryStatus[id] = status;
  }
  return result;
}
