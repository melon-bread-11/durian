import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { sampleProducts } from "@/lib/sample-products";
import { EnquiryExperience } from "@/components/enquiry-experience";
export const metadata: Metadata = { title: "Get in touch" };
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string | string[] }>;
}) {
  const query = await searchParams;
  return (
    <>
      <section className="page-intro contact-intro">
        <div className="shell">
          <span className="mini-label">
            <MessageCircle size={16} /> Let’s start a conversation
          </span>
          <h1>Let’s talk durian.</h1>
          <p>
            Some good fruit. A visit to the orchard. A question or two.
            <br />
            Tell us what you have in mind.
          </p>
        </div>
      </section>
      <div className="shell contact-page">
        <EnquiryExperience
          products={sampleProducts}
          selectedProduct={
            typeof query.product === "string" ? query.product : undefined
          }
        />
      </div>
    </>
  );
}
