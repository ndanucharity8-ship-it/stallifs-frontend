export default function Spinner({
  size = "md",

  color = "primary",

  label = "Loading...",

  className = "",
}) {
  return (
    <span
      className={[
        "spinner",
        `spinner--${size}`,
        `spinner--${color}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <span className="spinner-circle" />

      <span className="sr-only">
        {label}
      </span>
    </span>
  );
}