import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";
import { FarmProvider } from "@/components/farm-provider";
import { sampleProducts } from "@/lib/sample-products";
import "@fontsource-variable/manrope";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <FarmProvider productIds={sampleProducts.map((product) => product.id)}>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </FarmProvider>
      </body>
    </html>
  );
}
