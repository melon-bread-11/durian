import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  HandHeart,
  Leaf,
  Sprout,
  TreeDeciduous,
} from "lucide-react";
import { FarmImage } from "@/components/farm-image";
import { SiteImage } from "@/components/site-image";
import { ContactBanner } from "@/components/contact-banner";
export const metadata: Metadata = { title: "Our farm" };
export default function AboutPage() {
  return (
    <>
      <section className="shell about-intro">
        <div>
          <span className="mini-label">
            <Sprout size={16} /> A little about us
          </span>
          <h1>
            Behind every fruit,
            <br />a family story.
          </h1>
        </div>
        <p>
          We’re making a home for our family’s durian farm online. A place for
          the fruit, the orchard, and the people who care for it.
        </p>
      </section>
      <div className="shell">
        <FarmImage
          src="/images/orchard-hero.webp"
          alt="Illustrative view of a sunlit tropical orchard"
          className="about-cover"
          priority
          position="center 60%"
        />
        <p className="image-caption">
          A glimpse of the feeling we’re bringing online. Imagery is
          illustrative while we gather photographs from our own farm.
        </p>
      </div>
      <section className="shell about-story section">
        <figure>
          <SiteImage
            src="/images/orchard-care.webp"
            alt="A grower holds an opened durian with golden flesh in a shaded orchard"
            className="about-story-image"
            width={1200}
            height={960}
            sizes="(max-width: 600px) calc(100vw - 36px), (max-width: 1280px) 42vw, 510px"
          />
          <figcaption className="image-caption">
            AI-generated orchard scene.
          </figcaption>
        </figure>
        <div>
          <span className="mini-label">What this place means to us</span>
          <h2>
            A slower pace.
            <br />A little more care.
          </h2>
          <p>
            There’s something special about knowing where your food comes from.
            The path through the trees. The anticipation of a new season. The
            conversation that starts when a durian is opened.
          </p>
          <p>
            That is the feeling we want to share. We’re beginning with a simple
            invitation: get to know our family’s farm, explore the varieties,
            and look forward to what grows next.
          </p>
          <Link href="/durians" className="text-link">
            Meet the durians <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section className="values-section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <span className="mini-label">What we’re building around</span>
              <h2>
                Simple things.
                <br />
                Worth caring about.
              </h2>
            </div>
          </div>
          <div className="value-grid">
            <article>
              <TreeDeciduous size={31} strokeWidth={1.4} />
              <h3>A connection to the orchard</h3>
              <p>
                Share the setting, the seasons, and the work behind the fruit.
                Bring people a little closer to where it begins.
              </p>
            </article>
            <article>
              <HandHeart size={31} strokeWidth={1.4} />
              <h3>A personal conversation</h3>
              <p>
                Make it easy to ask questions, find your favourite variety, and
                plan directly with the family.
              </p>
            </article>
            <article>
              <Leaf size={31} strokeWidth={1.4} />
              <h3>Honest, seasonal information</h3>
              <p>
                Confirm harvest timing, availability, and pricing when the farm
                is ready. Good things happen in their own time.
              </p>
            </article>
          </div>
        </div>
      </section>
      <ContactBanner />
    </>
  );
}
