export function FarmMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M24 9c0-4 2-6 5-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="m24 9 5 3 6 1 2 5 4 5-2 6-1 6-6 3-8 4-8-4-6-3-1-6-2-6 4-5 2-5 6-1 5-3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M24 12c-6 6-9 12-8 18 1 5 4 8 8 11m0-29c6 6 9 12 8 18-1 5-4 8-8 11m0-27v24M13 20l-2 4m1 5 2 4m21-13 2 4m-1 5-2 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
