export default function Loading() {
  return (
    <div className="shell section loading-state" role="status">
      <span className="loading-leaf" aria-hidden="true">
        ✳
      </span>
      <p>A moment, we’re gathering the details.</p>
    </div>
  );
}
