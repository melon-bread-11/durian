"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { Product } from "@/types/product";

type Feedback = {
  kind: "error" | "success";
  text: string;
  fields?: Record<string, string[]>;
} | null;

export function EnquiryForm({
  products,
  enabled,
  selectedProduct,
}: {
  products: Product[];
  enabled: boolean;
  selectedProduct?: string;
}) {
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const choices = products.filter(
    (product) => product.availability !== "SOLD_OUT",
  );
  const canSubmit = enabled && choices.length > 0;
  const fieldError = (name: string) => feedback?.fields?.[name]?.[0];

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    setPending(true);
    setFeedback(null);
    try {
      const quantity = fields.get("quantityKg");
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: fields.get("productId"),
          customerName: fields.get("customerName"),
          phone: fields.get("phone"),
          quantityKg: quantity ? Number(quantity) : undefined,
          message: fields.get("message"),
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        setFeedback({
          kind: "error",
          text:
            result.error ?? "We couldn’t send your enquiry. Please try again.",
          fields: result.fields,
        });
        return;
      }
      setFeedback({ kind: "success", text: result.message });
      form.reset();
    } catch {
      setFeedback({
        kind: "error",
        text: "We couldn’t confirm your enquiry. Please check your connection before trying again.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="enquiry-form" onSubmit={submit} aria-busy={pending}>
      {!canSubmit && (
        <p className="form-notice" role="status">
          Enquiries are not open yet. Please check back soon.
        </p>
      )}
      <fieldset disabled={!canSubmit || pending}>
        <legend className="sr-only">Your enquiry details</legend>
        <div className="form-field">
          <label htmlFor="customerName">Your name</label>
          <input
            id="customerName"
            name="customerName"
            autoComplete="name"
            minLength={2}
            maxLength={100}
            required
            aria-invalid={Boolean(fieldError("customerName"))}
            aria-describedby={
              fieldError("customerName") ? "customerName-error" : undefined
            }
          />
          {fieldError("customerName") && (
            <small className="field-error" id="customerName-error">
              {fieldError("customerName")}
            </small>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="phone">Phone or WhatsApp number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={30}
            required
            aria-invalid={Boolean(fieldError("phone"))}
            aria-describedby={fieldError("phone") ? "phone-error" : undefined}
          />
          {fieldError("phone") && (
            <small className="field-error" id="phone-error">
              {fieldError("phone")}
            </small>
          )}
        </div>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="productId">Variety</label>
            <select
              id="productId"
              name="productId"
              required
              defaultValue={
                choices.some((p) => p.id === selectedProduct)
                  ? selectedProduct
                  : ""
              }
            >
              <option value="" disabled>
                Choose a variety
              </option>
              {choices.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="quantityKg">
              Quantity in kg <span>(optional)</span>
            </label>
            <input
              id="quantityKg"
              name="quantityKg"
              type="number"
              min="0.1"
              max="999.99"
              step="0.01"
              inputMode="decimal"
            />
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="message">
            Anything you’d like to ask? <span>(optional)</span>
          </label>
          <textarea id="message" name="message" rows={4} maxLength={2000} />
        </div>
        <p className="small-note">
          We’ll use your details to respond to this enquiry. Sending an enquiry
          does not confirm an order.
        </p>
        <button className="button" type="submit">
          {pending ? "Sending enquiry…" : "Send enquiry"}
        </button>
      </fieldset>
      <div aria-live="polite" aria-atomic="true">
        {feedback && (
          <p
            className={`feedback feedback-${feedback.kind}`}
            role={feedback.kind === "error" ? "alert" : "status"}
          >
            {feedback.text}
          </p>
        )}
      </div>
    </form>
  );
}
