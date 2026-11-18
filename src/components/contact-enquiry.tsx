"use client";

import { useSearchParams } from "next/navigation";
import { EnquiryExperience } from "@/components/enquiry-experience";
import { sampleProducts } from "@/lib/sample-products";

export function ContactEnquiry() {
  const selections = useSearchParams().getAll("product");
  return (
    <EnquiryExperience
      products={sampleProducts}
      selectedProduct={selections.length === 1 ? selections[0] : undefined}
    />
  );
}
