import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell section empty-state">
      <p className="intro-note">Page not found</p>
      <h1>Nothing growing here.</h1>
      <p>This page may have moved, or the variety is no longer listed.</p>
      <Link className="button" href="/durians">
        Explore the durians
      </Link>
    </div>
  );
}
