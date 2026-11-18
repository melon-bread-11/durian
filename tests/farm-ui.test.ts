import { describe, expect, it } from "vitest";
import {
  filterVarieties,
  normaliseSelection,
  updateSelection,
} from "../src/lib/farm-ui";

const varieties = [
  {
    id: "a",
    name: "Musang King",
    profile: "bittersweet",
    notes: "Rich and creamy",
  },
  { id: "b", name: "D24", profile: "balanced", notes: "Smooth and nutty" },
  { id: "c", name: "Black Thorn", profile: "sweet", notes: "Sweet custard" },
];

describe("finding a variety", () => {
  it("combines case-insensitive search with the selected taste profile", () => {
    expect(
      filterVarieties(varieties, "  CREAMY ", "bittersweet", "featured").map(
        (item) => item.id,
      ),
    ).toEqual(["a"]);
    expect(filterVarieties(varieties, "creamy", "sweet", "featured")).toEqual(
      [],
    );
  });
  it("sorts a copy without changing the original featured order", () => {
    expect(
      filterVarieties(varieties, "", "all", "name").map((item) => item.name),
    ).toEqual(["Black Thorn", "D24", "Musang King"]);
    expect(varieties.map((item) => item.id)).toEqual(["a", "b", "c"]);
  });
  it("returns an empty list when nothing matches", () => {
    expect(filterVarieties(varieties, "mango", "all", "featured")).toEqual([]);
  });
});

describe("local enquiry selection", () => {
  it("keeps the original list order when a quantity changes", () => {
    expect(
      updateSelection(
        [
          { productId: "a", quantityKg: 1 },
          { productId: "b", quantityKg: 2 },
        ],
        "a",
        3,
      ),
    ).toEqual([
      { productId: "a", quantityKg: 3 },
      { productId: "b", quantityKg: 2 },
    ]);
  });
  it("adds a variety once and updates its quantity instead of duplicating it", () => {
    const first = updateSelection([], "a", 2);
    expect(updateSelection(first, "a", 3)).toEqual([
      { productId: "a", quantityKg: 3 },
    ]);
    expect(first).toEqual([{ productId: "a", quantityKg: 2 }]);
  });
  it("removes a selection at zero and clamps excessive quantities", () => {
    expect(
      updateSelection([{ productId: "a", quantityKg: 2 }], "a", 0),
    ).toEqual([]);
    expect(updateSelection([], "a", 999)).toEqual([
      { productId: "a", quantityKg: 20 },
    ]);
  });
  it("discards malformed saved values and unknown products", () => {
    expect(
      normaliseSelection(
        [
          { productId: "a", quantityKg: 2 },
          { productId: "x", quantityKg: 1 },
          { productId: "b", quantityKg: "4" },
          null,
        ],
        ["a", "b"],
      ),
    ).toEqual([{ productId: "a", quantityKg: 2 }]);
    expect(normaliseSelection({ hacked: true }, ["a"])).toEqual([]);
  });
  it("deduplicates saved varieties and rejects non-finite quantities", () => {
    expect(
      normaliseSelection(
        [
          { productId: "a", quantityKg: 1 },
          { productId: "a", quantityKg: 2 },
          { productId: "b", quantityKg: Infinity },
        ],
        ["a", "b"],
      ),
    ).toEqual([{ productId: "a", quantityKg: 2 }]);
  });
});
