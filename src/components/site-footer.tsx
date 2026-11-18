import Link from "next/link";
import { ArrowUpRight, Leaf } from "lucide-react";
import { FarmMark } from "@/components/farm-mark";
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-main">
          <div className="footer-brand">
            <Link href="/" className="brand">
              <FarmMark />
              <span>
                Family<span>Durian Farm</span>
              </span>
            </Link>
            <p>
              Good fruit. Familiar faces.
              <br />A little closer to the orchard.
            </p>
            <span className="footer-note">
              <Leaf size={15} /> Grown with the seasons.
            </span>
          </div>
          <div className="footer-links">
            <p>Take a look around</p>
            <Link href="/about">Our farm</Link>
            <Link href="/durians">Our durians</Link>
            <Link href="/contact">Make an enquiry</Link>
          </div>
          <div className="footer-invite">
            <h2>
              Let’s make the next
              <br />
              harvest a good one.
            </h2>
            <Link href="/contact" className="text-link light">
              Talk to the farm <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <small>© {new Date().getFullYear()} Family Durian Farm</small>
          <span>Website preview · Illustrative imagery & sample catalogue</span>
          <Link href="/admin">
            Farm desk preview <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
