// @vitest-environment jsdom
import React from "react";
import { afterEach, expect, it } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { FarmProvider } from "../src/components/farm-provider";
import { EnquiryExperience } from "../src/components/enquiry-experience";
import { sampleProducts } from "../src/lib/sample-products";
import { VarietyDetail } from "../src/components/variety-detail";

const productIds = sampleProducts.map((product) => product.id);
afterEach(() => {
  cleanup();
  localStorage.clear();
});
function renderEnquiry(selectedProduct?: string) {
  return render(
    <FarmProvider productIds={productIds}>
      <EnquiryExperience
        products={sampleProducts}
        selectedProduct={selectedProduct}
      />
    </FarmProvider>,
  );
}

function fillDetails() {
  fireEvent.change(screen.getByLabelText("Your name"), {
    target: { value: "Test Visitor" },
  });
  fireEvent.change(screen.getByLabelText("Phone / WhatsApp"), {
    target: { value: "+60123456789" },
  });
}

it("requires a fresh preview when the selected quantity changes", async () => {
  localStorage.setItem(
    "family-durian-enquiry-v1",
    JSON.stringify([{ productId: "sample-musang-king", quantityKg: 2 }]),
  );
  renderEnquiry();
  await screen.findByRole("button", { name: "Remove Musang King" });
  fillDetails();
  fireEvent.click(screen.getByRole("button", { name: "Preview enquiry" }));
  await screen.findByRole("button", { name: "Copy enquiry" });
  fireEvent.click(
    screen.getByRole("button", { name: "Increase Musang King quantity" }),
  );
  await waitFor(() =>
    expect(screen.queryByRole("button", { name: "Copy enquiry" })).toBeNull(),
  );
  fireEvent.click(screen.getByRole("button", { name: "Preview enquiry" }));
  expect(await screen.findByText(/Musang King.*2.5 kg/)).toBeTruthy();
});

it("focuses invalid fields and the completed preview", async () => {
  localStorage.setItem(
    "family-durian-enquiry-v1",
    JSON.stringify([{ productId: "sample-musang-king", quantityKg: 2 }]),
  );
  renderEnquiry();
  await screen.findByRole("button", { name: "Remove Musang King" });
  fillDetails();
  fireEvent.change(screen.getByLabelText("Phone / WhatsApp"), {
    target: { value: "invalid" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Preview enquiry" }));
  await waitFor(() =>
    expect(document.activeElement).toBe(
      screen.getByLabelText("Phone / WhatsApp"),
    ),
  );
  expect(screen.getByRole("alert")).toBeTruthy();
  fireEvent.change(screen.getByLabelText("Phone / WhatsApp"), {
    target: { value: "+60123456789" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Preview enquiry" }));
  const heading = await screen.findByRole("heading", {
    name: /Your enquiry preview/,
  });
  await waitFor(() => expect(document.activeElement).toBe(heading));
  fireEvent.click(screen.getByRole("button", { name: "Edit your details" }));
  await waitFor(() =>
    expect(document.activeElement).toBe(screen.getByLabelText("Your name")),
  );
});

it("restores the saved quantity when revisiting a variety", async () => {
  localStorage.setItem(
    "family-durian-enquiry-v1",
    JSON.stringify([{ productId: "sample-musang-king", quantityKg: 3 }]),
  );
  render(
    <FarmProvider productIds={productIds}>
      <VarietyDetail product={sampleProducts[0]} />
    </FarmProvider>,
  );
  await waitFor(() =>
    expect(screen.getByRole("status").textContent).toBe("3 kg"),
  );
});

it("keeps saved quantities and adds the variety from the incoming link", async () => {
  localStorage.setItem(
    "family-durian-enquiry-v1",
    JSON.stringify([{ productId: "sample-d24", quantityKg: 3 }]),
  );
  renderEnquiry("sample-musang-king");
  await waitFor(() => {
    expect(screen.queryByRole("button", { name: "Remove D24" })).not.toBeNull();
    expect(
      screen.queryByRole("button", { name: "Remove Musang King" }),
    ).not.toBeNull();
  });
  expect(screen.getByText("3 kg")).toBeTruthy();
  fireEvent.click(screen.getByRole("button", { name: "Remove Musang King" }));
  await waitFor(() =>
    expect(
      screen.queryByRole("button", { name: "Remove Musang King" }),
    ).toBeNull(),
  );
});

it("shows an honest preview and restores the details when editing", async () => {
  localStorage.setItem(
    "family-durian-enquiry-v1",
    JSON.stringify([{ productId: "sample-musang-king", quantityKg: 2 }]),
  );
  renderEnquiry();
  await screen.findByRole("button", { name: "Remove Musang King" });
  fireEvent.change(screen.getByLabelText("Your name"), {
    target: { value: "Test Visitor" },
  });
  fireEvent.change(screen.getByLabelText("Phone / WhatsApp"), {
    target: { value: "+60123456789" },
  });
  fireEvent.change(screen.getByLabelText(/A little more about your plans/), {
    target: { value: "A sample family gathering" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Preview enquiry" }));
  expect(
    await screen.findByText(/Nothing has been sent to the farm/),
  ).toBeTruthy();
  expect(localStorage.getItem("family-durian-enquiry-v1")).not.toContain(
    "Test Visitor",
  );
  fireEvent.click(screen.getByRole("button", { name: "Edit your details" }));
  expect((screen.getByLabelText("Your name") as HTMLInputElement).value).toBe(
    "Test Visitor",
  );
  expect(
    (screen.getByLabelText("Phone / WhatsApp") as HTMLInputElement).value,
  ).toBe("+60123456789");
  expect(
    (
      screen.getByLabelText(
        /A little more about your plans/,
      ) as HTMLTextAreaElement
    ).value,
  ).toBe("A sample family gathering");
});
