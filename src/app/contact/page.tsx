import type { Metadata } from "next";
import { Suspense } from "react";
import { MessageCircle } from "lucide-react";
import { ContactEnquiry } from "@/components/contact-enquiry";
export const metadata: Metadata = { title: "Get in touch" };
export default function ContactPage() {
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
        <Suspense fallback={<p role="status">Loading your enquiry…</p>}>
          <ContactEnquiry />
        </Suspense>
      </div>
    </>
  );
}
