"use client";

import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="shell section empty-state">
      <h1>We couldn’t load this page.</h1>
      <p>Please try again in a moment.</p>
      <div className="actions">
        <button className="button" onClick={reset}>
          Try again
        </button>
        <Link className="text-link" href="/">
          Back to home
        </Link>
      </div>
    </div>
  );
}
