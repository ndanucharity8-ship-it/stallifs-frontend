export default function LoadingState({
  message = "Loading...",
  size = "md",
  className = "",
}) {
  return (
    <div
      className={[
        "loading-state",
        `loading-state--${size}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="status"
      aria-live="polite"
    >
      <span
        className="loading-state-spinner"
        aria-hidden="true"
      />

      {message && (
        <span className="loading-state-message">
          {message}
        </span>
      )}
    </div>
  );
}