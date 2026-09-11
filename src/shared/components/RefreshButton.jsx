import { RefreshCw } from "../icons";

export default function RefreshButton({
  onClick,
  loading = false,
  label = "Refresh",
  className = "",
  ...props
}) {
  return (
    <button
      type="button"
      className={[
        "refresh-button",
        loading && "refresh-button--loading",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
      disabled={loading}
      aria-label={label}
      {...props}
    >
      <RefreshCw
        size={17}
        className={
          loading
            ? "refresh-button-icon--spinning"
            : ""
        }
      />

      <span>{loading ? "Refreshing..." : label}</span>
    </button>
  );
}