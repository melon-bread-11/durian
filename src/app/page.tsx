import Link from "next/link";
import { DurianArt } from "@/components/durian-art";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section className="hero shell">
        <div className="hero-copy">
          <p className="intro-note">From our family’s orchard</p>
          <h1>Good durian starts at the roots.</h1>
          <p className="lead">
            Get to know the farm, explore the fruit, and follow along as we
            prepare to share our next harvest.
          </p>
          <div className="actions">
            <Link className="button" href="/durians">
              Explore the durians
            </Link>
            <Link className="text-link" href="/about">
              Meet the farm
            </Link>
          </div>
          <p className="hero-footnote">Grown with care. Shared in season.</p>
        </div>
        <div className="hero-art">
          <span className="art-orbit" />
          <DurianArt />
          <span className="art-caption">A taste of the orchard</span>
        </div>
      </section>
      <section className="story-band">
        <div className="shell story-grid">
          <div>
            <p className="intro-note">A family story</p>
            <h2>
              More than the fruit.
              <br />
              The place it comes from.
            </h2>
          </div>
          <div>
            <p>{site.story}</p>
            <Link className="text-link" href="/about">
              Read our story
            </Link>
          </div>
        </div>
      </section>
      <section className="shell section">
        <div className="section-heading">
          <h2>
            From tree to table,
            <br />
            one season at a time.
          </h2>
          <p>
            Durian is seasonal. Get to know the varieties, then ask us about
            harvest timing and availability.
          </p>
        </div>
        <div className="steps">
          <div>
            <span>Explore</span>
            <h3>Find your kind of durian.</h3>
            <p>Browse the catalogue and get to know each variety.</p>
          </div>
          <div>
            <span>Ask</span>
            <h3>Talk to the farm.</h3>
            <p>
              Send an enquiry about a variety and the quantity you have in mind.
            </p>
          </div>
          <div>
            <span>Plan</span>
            <h3>Wait for the right season.</h3>
            <p>Confirm availability and arrangements directly with us.</p>
          </div>
        </div>
      </section>
      <section className="shell">
        <div className="contact-banner">
          <div>
            <h2>Something you’d like to know?</h2>
            <p>Start a conversation about the farm or the next harvest.</p>
          </div>
          <Link className="button button-light" href="/contact">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
