"use client";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { SiteImage as Image } from "@/components/site-image";
import {
  ArrowUpRight,
  Check,
  Info,
  LayoutDashboard,
  Leaf,
  MessageSquare,
  Pencil,
  RotateCcw,
  Sprout,
  X,
} from "lucide-react";
import {
  demoEnquiries,
  normaliseDesk,
  type DeskState,
  type DeskStatus,
} from "@/lib/farm-desk";
import { useFarm } from "@/components/farm-provider";
import { sampleProducts } from "@/lib/sample-products";
import type { Availability } from "@/types/product";

const storageKey = "family-durian-desk-demo-v1";
const empty = (): DeskState => ({
  availability: {},
  names: {},
  notes: {},
  enquiryStatus: {},
});
const statusLabels = { NEW: "New", CONTACTED: "Contacted", CLOSED: "Closed" };
export function FarmDesk() {
  const [tab, setTab] = useState("Overview");
  const [state, setState] = useState<DeskState>(empty);
  const [ready, setReady] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [filter, setFilter] = useState<"ALL" | DeskStatus>("ALL");
  const dialog = useRef<HTMLDialogElement>(null);
  const { notify } = useFarm();
  useEffect(() => {
    try {
      setState(
        normaliseDesk(
          JSON.parse(localStorage.getItem(storageKey) ?? "null"),
          sampleProducts.map((product) => product.id),
          demoEnquiries.map((enquiry) => enquiry.id),
        ),
      );
    } catch {
      /* The demo also works without browser storage. */
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready)
      try {
        localStorage.setItem(storageKey, JSON.stringify(state));
      } catch {
        /* No server persistence is required for this preview. */
      }
  }, [state, ready]);
  useEffect(() => {
    if (editing && dialog.current && !dialog.current.open)
      dialog.current.showModal();
  }, [editing]);
  const enquiries = demoEnquiries.map((enquiry) => ({
    ...enquiry,
    status: state.enquiryStatus[enquiry.id] ?? enquiry.status,
  }));
  const openCount = enquiries.filter(
    (enquiry) => enquiry.status !== "CLOSED",
  ).length;
  const editProduct = sampleProducts.find((product) => product.id === editing);
  function saveProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing) return;
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const notes = String(data.get("notes") ?? "").trim();
    if (!name) return;
    setState((current) => ({
      ...current,
      names: { ...current.names, [editing]: name.slice(0, 80) },
      notes: { ...current.notes, [editing]: notes.slice(0, 200) },
    }));
    dialog.current?.close();
    setEditing(null);
    notify("Sample variety updated in this browser.");
  }
  function setAvailability(id: string, value: Availability) {
    setState((current) => ({
      ...current,
      availability: { ...current.availability, [id]: value },
    }));
    notify("Preview availability updated. Live stock is unchanged.");
  }
  function setStatus(id: string, value: DeskStatus) {
    setState((current) => ({
      ...current,
      enquiryStatus: { ...current.enquiryStatus, [id]: value },
    }));
    notify("Sample enquiry status updated.");
  }
  const productTable = (
    <div className="admin-card">
      <div className="admin-card-heading">
        <div>
          <h2>Your orchard selection</h2>
          <p>Edit the example catalogue and explore availability states.</p>
        </div>
        <span className="status-chip">Sample catalogue</span>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Variety</th>
              <th>Harvest pricing</th>
              <th>Availability</th>
              <th>
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sampleProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="table-product">
                    <Image
                      src="/images/durian-harvest.webp"
                      alt=""
                      width={48}
                      height={48}
                    />
                    <div>
                      <strong>{state.names[product.id] ?? product.name}</strong>
                      <span>
                        {state.notes[product.id] ??
                          product.tastingNotes.replace("Draft notes: ", "")}
                      </span>
                    </div>
                  </div>
                </td>
                <td>To be confirmed</td>
                <td>
                  <select
                    aria-label={"Availability for " + product.name}
                    value={
                      state.availability[product.id] ?? product.availability
                    }
                    onChange={(event) =>
                      setAvailability(
                        product.id,
                        event.target.value as Availability,
                      )
                    }
                  >
                    <option value="SEASONAL">Seasonal</option>
                    <option value="AVAILABLE">Enquiries open</option>
                    <option value="SOLD_OUT">Sold out</option>
                  </select>
                </td>
                <td>
                  <button
                    className="table-action"
                    onClick={() => setEditing(product.id)}
                  >
                    <Pencil size={12} /> Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  const enquiryTable = (
    <div className="admin-card">
      <div className="admin-card-heading">
        <div>
          <h2>A few conversations to follow up</h2>
          <p>
            Fictional enquiries for trying the workflow. No real customer
            details.
          </p>
        </div>
      </div>
      <div className="filter-pills" style={{ padding: "18px 24px" }}>
        {(["ALL", "NEW", "CONTACTED", "CLOSED"] as const).map((status) => (
          <button
            key={status}
            aria-pressed={filter === status}
            className={filter === status ? "active" : ""}
            onClick={() => setFilter(status)}
          >
            {status === "ALL" ? "All enquiries" : statusLabels[status]}
          </button>
        ))}
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Visitor</th>
              <th>Interested in</th>
              <th>Conversation</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {enquiries
              .filter(
                (enquiry) => filter === "ALL" || enquiry.status === filter,
              )
              .map((enquiry) => (
                <tr key={enquiry.id}>
                  <td>
                    {enquiry.customer}
                    <span className="small-note" style={{ display: "block" }}>
                      Example enquiry
                    </span>
                  </td>
                  <td>
                    {enquiry.variety}
                    <span className="small-note" style={{ display: "block" }}>
                      {enquiry.quantity}
                    </span>
                  </td>
                  <td
                    style={{
                      maxWidth: 300,
                      fontSize: 11,
                      color: "var(--muted)",
                    }}
                  >
                    {enquiry.message}
                  </td>
                  <td>
                    <select
                      aria-label={"Status for " + enquiry.customer}
                      value={enquiry.status}
                      onChange={(event) =>
                        setStatus(enquiry.id, event.target.value as DeskStatus)
                      }
                    >
                      {(["NEW", "CONTACTED", "CLOSED"] as const).map(
                        (status) => (
                          <option value={status} key={status}>
                            {statusLabels[status]}
                          </option>
                        ),
                      )}
                    </select>
                  </td>
                </tr>
              ))}
            {!enquiries.some(
              (enquiry) => filter === "ALL" || enquiry.status === filter,
            ) && (
              <tr>
                <td colSpan={4}>
                  <p className="small-note">
                    No sample enquiries in this stage.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
  return (
    <div className="shell admin-page">
      <div className="admin-heading">
        <div>
          <span className="mini-label">
            <Sprout size={16} /> Behind the orchard
          </span>
          <h1>The farm desk.</h1>
          <p>
            A simple space to care for the catalogue and keep conversations
            moving.
          </p>
        </div>
        <button
          className="button button-outline button-small"
          onClick={() => {
            setState(empty());
            setFilter("ALL");
            notify("The sample farm desk has been reset.");
          }}
        >
          <RotateCcw size={15} /> Reset demo
        </button>
      </div>
      <div className="admin-preview">
        <Info size={17} />
        <p>
          <strong>Interactive demo.</strong> Changes stay in this browser and
          only affect this management preview. There is no sign-in, live stock,
          or real customer data here.
        </p>
      </div>
      <nav className="admin-tabs" aria-label="Farm desk sections">
        {[
          { label: "Overview", icon: LayoutDashboard },
          { label: "Varieties", icon: Leaf },
          { label: "Enquiries", icon: MessageSquare },
        ].map(({ label, icon: Icon }) => (
          <button
            key={label}
            aria-pressed={tab === label}
            onClick={() => setTab(label)}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>
      {tab === "Overview" && (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <span>
                <Leaf size={21} />
              </span>
              <div>
                <p>Varieties in the preview</p>
                <strong>{sampleProducts.length}</strong>
                <small>Illustrative selection</small>
              </div>
            </div>
            <div className="stat-card">
              <span>
                <MessageSquare size={21} />
              </span>
              <div>
                <p>Open sample enquiries</p>
                <strong>{openCount}</strong>
                <small>Ready to explore</small>
              </div>
            </div>
            <div className="stat-card">
              <span>
                <Check size={21} />
              </span>
              <div>
                <p>Closed conversations</p>
                <strong>
                  {
                    enquiries.filter((enquiry) => enquiry.status === "CLOSED")
                      .length
                  }
                </strong>
                <small>Demo workflow</small>
              </div>
            </div>
          </div>
          {productTable}
          <div className="admin-overview-note">
            <Sprout size={29} strokeWidth={1.4} />
            <div>
              <h3>A good start for the next season.</h3>
              <p>
                This is a working interface preview. Authentication, real
                harvest data, and actual enquiries can be connected when the
                farm is ready.
              </p>
              <Link href="/" className="text-link">
                View the farm website <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </>
      )}
      {tab === "Varieties" && productTable}
      {tab === "Enquiries" && enquiryTable}
      <dialog
        ref={dialog}
        className="edit-dialog"
        onClose={() => setEditing(null)}
        onCancel={() => setEditing(null)}
        aria-labelledby="edit-title"
      >
        <button
          className="icon-button edit-dialog-close"
          aria-label="Close variety editor"
          onClick={() => {
            dialog.current?.close();
            setEditing(null);
          }}
        >
          <X size={19} />
        </button>
        {editProduct && (
          <form onSubmit={saveProduct} key={editProduct.id}>
            <span className="mini-label">Sample catalogue</span>
            <h2 id="edit-title">A little more character.</h2>
            <div className="form-field">
              <label htmlFor="edit-name">Variety name</label>
              <input
                id="edit-name"
                name="name"
                required
                maxLength={80}
                defaultValue={state.names[editProduct.id] ?? editProduct.name}
              />
            </div>
            <div className="form-field">
              <label htmlFor="edit-notes">Tasting notes</label>
              <textarea
                id="edit-notes"
                name="notes"
                rows={3}
                maxLength={200}
                defaultValue={
                  state.notes[editProduct.id] ??
                  editProduct.tastingNotes.replace("Draft notes: ", "")
                }
              />
            </div>
            <p className="small-note">
              Changes apply only to this management preview.
            </p>
            <button type="submit" className="button" style={{ marginTop: 20 }}>
              Save preview changes <Check size={16} />
            </button>
          </form>
        )}
      </dialog>
    </div>
  );
}
