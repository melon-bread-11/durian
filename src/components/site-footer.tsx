import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div>
          <strong>{site.name}</strong>
          <p>A little closer to the orchard.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/about">Our story</Link>
          <Link href="/durians">Explore durians</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <small>
          © {new Date().getFullYear()} {site.name}
        </small>
      </div>
    </footer>
  );
}
