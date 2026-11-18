import type { Metadata } from "next";
import { FarmDesk } from "@/components/farm-desk";
export const metadata: Metadata = {
  title: "Farm desk preview",
  robots: { index: false, follow: false },
};
export default function AdminPreviewPage() {
  return <FarmDesk />;
}
