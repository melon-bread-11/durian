"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { Check, X } from "lucide-react";
import {
  normaliseSelection,
  updateSelection,
  type SelectionItem,
} from "@/lib/farm-ui";

type FarmContext = {
  ready: boolean;
  items: SelectionItem[];
  setQuantity: (id: string, quantity: number) => void;
  add: (id: string, quantity?: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  notify: (message: string) => void;
};
const Context = createContext<FarmContext | null>(null);
const storageKey = "family-durian-enquiry-v1";

export function FarmProvider({
  children,
  productIds,
}: {
  children: React.ReactNode;
  productIds: string[];
}) {
  const [items, setItems] = useState<SelectionItem[]>([]);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    try {
      setItems(
        normaliseSelection(
          JSON.parse(localStorage.getItem(storageKey) ?? "[]"),
          productIds,
        ),
      );
    } catch {
      /* Storage may be unavailable; in-memory selection still works. */
    }
    setReady(true);
  }, [productIds]);
  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(items));
      } catch {
        /* In-memory use is sufficient. */
      }
    }
  }, [items, ready]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 4000);
    return () => clearTimeout(timer);
  }, [notice]);
  const notify = useCallback((message: string) => setNotice(message), []);
  function setQuantity(id: string, quantity: number) {
    if (productIds.includes(id))
      setItems((current) => updateSelection(current, id, quantity));
  }
  function add(id: string, quantity = 1) {
    if (!productIds.includes(id)) return;
    setItems((current) => updateSelection(current, id, quantity));
    notify("Variety added to your enquiry list.");
  }
  return (
    <Context.Provider
      value={{
        ready,
        items,
        setQuantity,
        add,
        remove: (id) => setQuantity(id, 0),
        clear: () => setItems([]),
        notify,
      }}
    >
      {children}
      <div className="toast-region" aria-live="polite" aria-atomic="true">
        {notice && (
          <div className="toast">
            <Check size={18} />
            <span>{notice}</span>
            <button
              aria-label="Dismiss notification"
              onClick={() => setNotice("")}
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>
    </Context.Provider>
  );
}

export function useFarm() {
  const value = useContext(Context);
  if (!value) throw new Error("useFarm must be used within FarmProvider");
  return value;
}
