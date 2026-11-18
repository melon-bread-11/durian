import Link from "next/link";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="site-header shell">
      <Link href="/" className="brand" aria-label={`${site.name} home`}>
        <span className="brand-mark" aria-hidden="true">
          ✳
        </span>
        <span>
          Family
          <br />
          Durian Farm
        </span>
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/about">Our farm</Link>
        <Link href="/durians">The durians</Link>
        <Link href="/contact" className="nav-contact">
          Get in touch
        </Link>
      </nav>
    </header>
  );
}
