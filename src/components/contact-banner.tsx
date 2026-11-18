import Link from "next/link";
import { ArrowUpRight, Sprout } from "lucide-react";
export function ContactBanner() {
  return (
    <section className="contact-banner shell">
      <div className="contact-banner-copy">
        <span className="mini-label">
          <Sprout size={17} /> Good things are worth the wait.
        </span>
        <h2>
          Your next favourite durian
          <br />
          might be growing here.
        </h2>
        <p>
          Explore the varieties. Ask a question. Get a little closer to the
          farm.
        </p>
        <Link href="/contact" className="button button-gold">
          Let’s talk durian <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="banner-fruit" aria-hidden="true">
        <svg viewBox="0 0 240 240" fill="none">
          <path
            d="M120 40c-1-14 4-22 13-31"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="m120 39 15 11 20-3 8 18 20 5 2 20 15 16-8 19 6 20-17 12-5 21-21 2-15 17-20-6-20 6-15-17-21-2-5-21-17-12 6-20-8-19 15-16 2-20 20-5 8-18 20 3 15-11Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M119 48c-35 33-45 64-33 99 8 24 21 37 34 45 14-8 28-21 35-45 11-35 2-66-36-99Zm1 8v125"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>
    </section>
  );
}
