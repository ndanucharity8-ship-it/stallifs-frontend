export default function StatsGrid({
  children,
  columns = 4,
  gap = "md",
  className = "",
  ...props
}) {
  return (
    <div
      className={[
        "stats-grid",
        `stats-grid--${columns}`,
        `stats-grid--gap-${gap}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}