import { Spinner } from "../ui";

export default function LoadingOverlay({
  visible = true,
  message = "Loading...",
  fullscreen = false,
  className = "",
}) {
  if (!visible) return null;

  return (
    <div
      className={[
        "loading-overlay",
        fullscreen
          ? "loading-overlay--fullscreen"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="status"
      aria-live="polite"
    >
      <Spinner size="md" />

      {message && (
        <span className="loading-overlay-message">
          {message}
        </span>
      )}
    </div>
  );
}