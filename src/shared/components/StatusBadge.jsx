export default function StatusBadge({
  status,
  variant,
  children,
  className = "",
}) {
  const normalizedStatus = String(
    status || ""
  )
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/_/g, "-");

  const badgeVariant =
    variant || normalizedStatus || "default";

  const label =
    children ||
    status ||
    "Unknown";

  return (
    <span
      className={[
        "status-badge",
        `status-badge--${badgeVariant}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label}
    </span>
  );
}