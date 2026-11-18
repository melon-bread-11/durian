import type { Metadata } from "next";
import { getCatalogue } from "@/lib/catalogue";
import { EnquiryForm } from "@/components/enquiry-form";
import { SampleNotice } from "@/components/sample-notice";

export const metadata: Metadata = { title: "Get in touch" };
export const dynamic = "force-dynamic";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string | string[] }>;
}) {
  const [catalogue, query] = await Promise.all([getCatalogue(), searchParams]);
  const selectedProduct =
    typeof query.product === "string" ? query.product : undefined;
  return (
    <div className="shell section">
      <div className="page-heading">
        <p className="intro-note">Get in touch</p>
        <h1>Let’s talk durian.</h1>
        <p className="lead">
          Have a variety in mind, or a question about the next harvest? Start
          here.
        </p>
      </div>
      {catalogue.isSample && <SampleNotice />}
      <div className="contact-grid">
        <div className="contact-aside">
          <h2>
            A conversation
            <br />
            with the farm.
          </h2>
          <p>
            Tell us what you’re looking for. We’ll confirm harvest timing,
            availability, pricing, and arrangements with you.
          </p>
          <div className="contact-note">
            <strong>Planning a farm visit?</strong>
            <p>
              Visitor information and the farm’s location will be added here
              once confirmed.
            </p>
          </div>
        </div>
        <EnquiryForm
          products={catalogue.products}
          enabled={Boolean(process.env.DATABASE_URL?.trim())}
          selectedProduct={selectedProduct}
        />
      </div>
    </div>
  );
}
