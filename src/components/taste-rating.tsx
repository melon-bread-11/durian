export function TasteRating({ value }: { value: number }) {
  return (
    <>
      <span className="sr-only">{value} out of 5</span>
      <span className="taste-dots" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <i key={index} className={index < value ? "filled" : ""} />
        ))}
      </span>
    </>
  );
}
