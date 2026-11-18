import type { Metadata } from "next";
import Link from "next/link";
import { DurianArt } from "@/components/durian-art";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Our farm" };

export default function AboutPage() {
  return (
    <div className="shell section">
      <div className="page-heading">
        <p className="intro-note">Our farm</p>
        <h1>
          A family story,
          <br />
          rooted in durian.
        </h1>
        <p className="lead">{site.story}</p>
      </div>
      <div className="about-grid">
        <div className="about-art">
          <DurianArt />
        </div>
        <div className="prose">
          <h2>Get to know the orchard.</h2>
          <p>
            We are putting together the story of the farm: how it began, what
            grows here, and what each season brings.
          </p>
          <p>
            Photos from the orchard, the farm’s location, and more about our
            family will follow. For now, take a look around our first catalogue
            preview.
          </p>
          <Link href="/durians" className="button">
            Explore the durians
          </Link>
        </div>
      </div>
    </div>
  );
}
