"use client";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { SiteImage as Image } from "@/components/site-image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  CheckCheck,
  Copy,
  Leaf,
  Minus,
  Plus,
  ShoppingBag,
  TreeDeciduous,
  X,
} from "lucide-react";
import { useFarm } from "@/components/farm-provider";
import { varietyImage } from "@/lib/varieties";
import { enquirySchema } from "@/lib/validation";
import type { Product } from "@/types/product";

export function EnquiryExperience({
  products,
  selectedProduct,
}: {
  products: Product[];
  selectedProduct?: string;
}) {
  const { ready, items, add, remove, setQuantity, notify } = useFarm();
  const [type, setType] = useState("Durian enquiry");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [receipt, setReceipt] = useState<{
    name: string;
    text: string;
    selectionKey: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [chosen, setChosen] = useState("");
  const [draft, setDraft] = useState({
    customerName: "",
    phone: "",
    message: "",
  });
  const appliedSelection = useRef<string | undefined>(undefined);
  const receiptHeading = useRef<HTMLHeadingElement>(null);
  const restoreFormFocus = useRef(false);
  const selectionKey = JSON.stringify(items);
  useEffect(() => {
    if (receipt && receipt.selectionKey !== selectionKey) {
      setReceipt(null);
      notify("Your list changed. Please preview the enquiry again.");
    }
  }, [selectionKey, receipt, notify]);
  useEffect(() => {
    const firstError = Object.keys(errors)[0];
    if (firstError)
      document
        .getElementById(firstError === "product" ? "add-variety" : firstError)
        ?.focus();
  }, [errors]);
  useEffect(() => {
    if (receipt) receiptHeading.current?.focus();
    else if (restoreFormFocus.current) {
      restoreFormFocus.current = false;
      document.getElementById("customerName")?.focus();
    }
  }, [receipt]);
  useEffect(() => {
    if (
      !ready ||
      !selectedProduct ||
      appliedSelection.current === selectedProduct
    )
      return;
    if (products.some((product) => product.id === selectedProduct)) {
      appliedSelection.current = selectedProduct;
      if (!items.some((item) => item.productId === selectedProduct))
        add(selectedProduct);
    }
  }, [ready, selectedProduct, products, items, add]);
  const selected = items
    .map((item) => ({
      ...item,
      product: products.find((product) => product.id === item.productId),
    }))
    .filter((item) => item.product);
  const quantity = selected.reduce((sum, item) => sum + item.quantityKg, 0);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const parsed = enquirySchema
      .pick({ customerName: true, phone: true, message: true })
      .safeParse({
        customerName: data.get("customerName"),
        phone: data.get("phone"),
        message: data.get("message"),
      });
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      return;
    }
    if (type === "Durian enquiry" && !selected.length) {
      setErrors({
        product: ["Add a variety to your list before previewing your enquiry."],
      });
      return;
    }
    setErrors({});
    setDraft(parsed.data);
    const list = selected
      .map((item) => item.product!.name + " — " + item.quantityKg + " kg")
      .join("\n");
    const text =
      type +
      "\nFrom: " +
      parsed.data.customerName +
      "\nPhone: " +
      parsed.data.phone +
      (list ? "\n\nVarieties:\n" + list : "") +
      "\n\n" +
      parsed.data.message;
    setReceipt({ name: parsed.data.customerName, text, selectionKey });
    setCopied(false);
  }
  async function copy() {
    if (!receipt) return;
    try {
      await navigator.clipboard.writeText(receipt.text);
      setCopied(true);
      notify("Enquiry copied. Nothing has been sent.");
    } catch {
      notify(
        "Copy is unavailable in this browser. You can select the preview text instead.",
      );
    }
  }
  return (
    <div className="contact-grid" id="enquiry">
      <aside className="enquiry-summary">
        <div className="summary-heading">
          <span className="mini-label">
            <ShoppingBag size={16} /> Your harvest list
          </span>
          <span className="count-bubble">{selected.length}</span>
        </div>
        <h2>A few good choices.</h2>
        <p className="summary-description">
          Keep your favourites together.
          <br />
          The next step is a conversation.
        </p>
        {selected.length ? (
          <div className="selection-items">
            {selected.map((item) => (
              <div className="selection-item" key={item.productId}>
                <div className="selection-thumb">
                  <Image
                    src={varietyImage(item.product!)}
                    alt=""
                    fill
                    sizes="72px"
                  />
                </div>
                <div className="selection-item-copy">
                  <strong>{item.product!.name}</strong>
                  <span>Seasonal pricing</span>
                  <div className="mini-quantity">
                    <button
                      aria-label={
                        "Decrease " + item.product!.name + " quantity"
                      }
                      disabled={item.quantityKg <= 0.5}
                      onClick={() =>
                        setQuantity(item.productId, item.quantityKg - 0.5)
                      }
                    >
                      <Minus size={12} />
                    </button>
                    <span>{item.quantityKg} kg</span>
                    <button
                      aria-label={
                        "Increase " + item.product!.name + " quantity"
                      }
                      disabled={item.quantityKg >= 20}
                      onClick={() =>
                        setQuantity(item.productId, item.quantityKg + 0.5)
                      }
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                <button
                  className="remove-selection"
                  aria-label={"Remove " + item.product!.name}
                  onClick={() => remove(item.productId)}
                >
                  <X size={15} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="selection-empty">
            <Leaf size={26} strokeWidth={1.4} />
            <p>
              Your list is a fresh start.
              <br />
              Add a variety that catches your eye.
            </p>
          </div>
        )}
        <div className="add-variety">
          <label className="sr-only" htmlFor="add-variety">
            Add another variety
          </label>
          <select
            id="add-variety"
            value={chosen}
            onChange={(event) => setChosen(event.target.value)}
          >
            <option value="">Add a variety...</option>
            {products
              .filter(
                (product) =>
                  !items.some((item) => item.productId === product.id) &&
                  product.availability !== "SOLD_OUT",
              )
              .map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
          </select>
          <button
            className="icon-button"
            aria-label="Add selected variety"
            disabled={!chosen}
            onClick={() => {
              add(chosen);
              setChosen("");
            }}
          >
            <Plus size={18} />
          </button>
        </div>
        <div className="summary-total">
          <span>Planned quantity</span>
          <strong>{quantity} kg</strong>
        </div>
        <p className="small-note">
          <Check size={14} /> No payment. No reservation. Just a plan.
        </p>
        <Link href="/durians" className="text-link">
          Explore more varieties <ArrowUpRight size={15} />
        </Link>
      </aside>
      <section className="enquiry-panel">
        {receipt ? (
          <div className="preview-receipt">
            <span className="receipt-icon">
              <CheckCheck size={30} />
            </span>
            <span className="mini-label">Ready to review</span>
            <h2 ref={receiptHeading} tabIndex={-1}>
              Your enquiry preview
              <br />
              is ready, {receipt.name}.
            </h2>
            <p>
              Nothing has been sent to the farm. You can review or copy your
              enquiry below.
            </p>
            <pre>{receipt.text}</pre>
            <div className="actions">
              <button className="button" onClick={copy}>
                <Copy size={17} />
                {copied ? "Copied" : "Copy enquiry"}
              </button>
              <button
                className="text-link"
                onClick={() => {
                  restoreFormFocus.current = true;
                  setReceipt(null);
                }}
              >
                <ArrowLeft size={15} /> Edit your details
              </button>
            </div>
          </div>
        ) : (
          <>
            <span className="preview-label">
              <span /> Interactive preview · Nothing will be sent
            </span>
            <h2>What do you have in mind?</h2>
            <p className="panel-intro">
              A favourite variety, a farm visit, or just a question. We’re all
              ears.
            </p>
            <div className="enquiry-types">
              {["Durian enquiry", "Farm visit", "General question"].map(
                (label) => (
                  <button
                    type="button"
                    key={label}
                    className={type === label ? "active" : ""}
                    aria-pressed={type === label}
                    onClick={() => setType(label)}
                  >
                    {label === "Farm visit" ? (
                      <TreeDeciduous size={16} />
                    ) : label === "Durian enquiry" ? (
                      <Leaf size={16} />
                    ) : null}
                    {label}
                  </button>
                ),
              )}
            </div>
            <form onSubmit={submit} className="enquiry-form">
              <div className="sr-only" role="alert">
                {Object.values(errors).flat().join(" ")}
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="customerName">Your name</label>
                  <input
                    id="customerName"
                    name="customerName"
                    placeholder="How should we call you?"
                    autoComplete="name"
                    defaultValue={draft.customerName}
                    required
                    minLength={2}
                    maxLength={100}
                    aria-invalid={Boolean(errors.customerName)}
                    aria-describedby={
                      errors.customerName ? "name-error" : undefined
                    }
                  />
                  {errors.customerName && (
                    <small id="name-error" className="field-error">
                      {errors.customerName[0]}
                    </small>
                  )}
                </div>
                <div className="form-field">
                  <label htmlFor="phone">Phone / WhatsApp</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+60"
                    autoComplete="tel"
                    defaultValue={draft.phone}
                    required
                    maxLength={30}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                  {errors.phone && (
                    <small id="phone-error" className="field-error">
                      {errors.phone[0]}
                    </small>
                  )}
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="message">
                  {type === "Farm visit"
                    ? "Tell us about your visit"
                    : "A little more about your plans"}{" "}
                  <span>(optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder={
                    type === "Farm visit"
                      ? "When would you like to visit, and how many people?"
                      : "Any questions, preferred dates, or special arrangements?"
                  }
                  defaultValue={draft.message}
                  maxLength={2000}
                />
              </div>
              {errors.product && (
                <p className="field-error" role="alert">
                  {errors.product[0]}
                </p>
              )}
              <div className="form-bottom">
                <p>
                  <Leaf size={15} /> Your details stay on this page.
                  <br />
                  This is a preview, not a real submission.
                </p>
                <button className="button" type="submit">
                  Preview enquiry <ArrowUpRight size={18} />
                </button>
              </div>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
