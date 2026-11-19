// @vitest-environment jsdom
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { CatalogueBrowser } from "@/components/catalogue-browser";
import { FarmProvider } from "@/components/farm-provider";
import { sampleProducts } from "@/lib/sample-products";

afterEach(() => {
  cleanup();
  localStorage.clear();
});

function renderCatalogue() {
  render(
    <FarmProvider productIds={sampleProducts.map(({ id }) => id)}>
      <CatalogueBrowser products={sampleProducts} />
    </FarmProvider>,
  );
}

it.each(["D175", "udang merah"])("finds Red Prawn by %s", (query) => {
  renderCatalogue();
  fireEvent.change(screen.getByRole("textbox", { name: /search durian/i }), {
    target: { value: query },
  });
  expect(screen.getAllByRole("article")).toHaveLength(1);
  expect(screen.getByRole("heading", { name: "Red Prawn" })).toBeTruthy();
});

it("compares up to three varieties and keeps the selection across searches", () => {
  renderCatalogue();
  fireEvent.click(screen.getByRole("button", { name: "Compare Musang King" }));
  fireEvent.click(screen.getByRole("button", { name: "Compare D24" }));
  fireEvent.click(screen.getByRole("button", { name: "Compare Black Thorn" }));
  const fourth = screen.getByRole<HTMLButtonElement>("button", {
    name: "Compare Red Prawn",
  });
  expect(fourth.disabled).toBe(true);

  fireEvent.change(screen.getByRole("textbox", { name: /search durian/i }), {
    target: { value: "Tekka" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Compare 3 varieties" }));
  const table = screen.getByRole("table", { name: /tasting comparison/i });
  expect(
    within(table).getByRole("columnheader", { name: /Musang King/ }),
  ).toBeTruthy();
  expect(within(table).getByRole("columnheader", { name: /D24/ })).toBeTruthy();
  expect(
    within(table).getByRole("columnheader", { name: /Black Thorn/ }),
  ).toBeTruthy();

  fireEvent.click(
    screen.getByRole("button", { name: "Remove D24 from comparison" }),
  );
  const tekka = screen.getByRole<HTMLButtonElement>("button", {
    name: "Compare Tekka",
  });
  expect(tekka.disabled).toBe(false);
  fireEvent.click(tekka);
  expect(
    within(table).getByRole("columnheader", { name: /Tekka/ }),
  ).toBeTruthy();
  fireEvent.click(screen.getByRole("button", { name: "Clear comparison" }));
  expect(
    screen.queryByRole("table", { name: /tasting comparison/i }),
  ).toBeNull();
});
