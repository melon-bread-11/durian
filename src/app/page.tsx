import Link from "next/link";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  Leaf,
  Sprout,
  Sun,
  TreeDeciduous,
  HandHeart,
  MessageCircle,
} from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { FarmImage } from "@/components/farm-image";
import { ContactBanner } from "@/components/contact-banner";
import { Faq } from "@/components/faq";
import { sampleProducts } from "@/lib/sample-products";
export default function HomePage() {
  return (
    <>
      <section className="hero">
        <Image
          src="/images/orchard-hero.webp"
          alt="Illustrative tropical durian orchard in the morning light"
          fill
          priority
          sizes="100vw"
          className="hero-photo"
        />
        <div className="hero-shade" />
        <div className="shell hero-inner">
          <div className="hero-copy">
            <span className="hero-kicker">
              <Leaf size={16} /> A family’s love for good durian.
            </span>
            <h1>
              Rooted in family.
              <br />
              Rich in flavour.
            </h1>
            <p>
              A little sunshine, a little patience, and a whole lot of care.
              Discover the fruit and the family behind the farm.
            </p>
            <div className="actions">
              <Link href="/durians" className="button button-gold">
                Explore our durians <ArrowUpRight size={19} />
              </Link>
              <Link href="/about" className="button button-glass">
                Meet the farm
              </Link>
            </div>
          </div>
          <a href="#our-harvest" className="hero-scroll">
            <span>Take a look around</span>
            <ArrowDown size={18} />
          </a>
        </div>
        <div className="hero-bottom">
          <div className="shell">
            <span>
              <TreeDeciduous size={19} /> From the orchard
            </span>
            <span>
              <Sun size={19} /> Seasonal by nature
            </span>
            <span>
              <HandHeart size={19} /> Shared with care
            </span>
          </div>
        </div>
      </section>
      <section className="shell section" id="our-harvest">
        <div className="section-heading">
          <div>
            <span className="mini-label">
              <Sprout size={16} /> Get to know the fruit
            </span>
            <h2>
              A character for
              <br />
              every kind of durian lover.
            </h2>
          </div>
          <div className="section-heading-aside">
            <p>
              Sweet and mellow, rich and bittersweet.
              <br />
              Find the flavours that feel like you.
            </p>
            <Link className="text-link" href="/durians">
              Meet all the varieties <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
        <div className="product-grid">
          {sampleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <p className="catalogue-caption">
          An introduction to our sample selection. Harvest details will be
          confirmed by the farm.
        </p>
      </section>
      <section className="story-section">
        <div className="shell story-grid">
          <div className="story-images">
            <FarmImage
              src="/images/orchard-hero.webp"
              alt="Illustrative sunlit orchard path under a green canopy"
              className="story-main-image"
              position="45% center"
            />
            <div className="story-photo-note">
              <Leaf size={23} />
              <span>
                Some things
                <br />
                can’t be rushed.
              </span>
            </div>
          </div>
          <div className="story-copy">
            <span className="mini-label">The people behind the fruit</span>
            <h2>
              A family farm.
              <br />A story still growing.
            </h2>
            <p>
              For us, the farm is more than a place to grow durian. It’s a place
              to slow down, care for what’s growing, and share something good.
            </p>
            <p>
              We’re bringing our family’s orchard a little closer to you—one
              story, one season, and one durian at a time.
            </p>
            <Link href="/about" className="text-link">
              Get to know our farm <ArrowUpRight size={17} />
            </Link>
            <div className="story-signature">
              <Sprout size={26} strokeWidth={1.5} />
              <span>From our family, with care.</span>
            </div>
          </div>
        </div>
      </section>
      <section className="shell section" id="harvest">
        <div className="section-heading">
          <div>
            <span className="mini-label">From the farm to your plans</span>
            <h2>
              Good things happen
              <br />
              in their own season.
            </h2>
          </div>
          <p className="section-description">
            Start with a variety you love.
            <br />
            We’ll take it from there, together.
          </p>
        </div>
        <div className="harvest-steps">
          <div>
            <span className="step-icon">
              <Leaf size={26} />
            </span>
            <span className="step-number">01</span>
            <h3>Find your flavour</h3>
            <p>
              Explore the varieties and add a few favourites to your enquiry
              list.
            </p>
          </div>
          <div>
            <span className="step-icon">
              <MessageCircle size={26} />
            </span>
            <span className="step-number">02</span>
            <h3>Have a conversation</h3>
            <p>
              Tell the farm what you have in mind. Ask about the next harvest or
              a visit.
            </p>
          </div>
          <div>
            <span className="step-icon">
              <HandHeart size={26} />
            </span>
            <span className="step-number">03</span>
            <h3>Plan something good</h3>
            <p>
              Confirm availability, pricing, and arrangements directly with the
              family.
            </p>
          </div>
        </div>
      </section>
      <section className="faq-section">
        <div className="shell faq-grid">
          <div>
            <span className="mini-label">A few things to know</span>
            <h2>
              Curious?
              <br />
              You’re in good company.
            </h2>
            <p>Some answers before you get in touch.</p>
            <Link href="/contact" className="text-link">
              Ask us something else <ArrowUpRight size={17} />
            </Link>
          </div>
          <Faq />
        </div>
      </section>
      <ContactBanner />
    </>
  );
}
