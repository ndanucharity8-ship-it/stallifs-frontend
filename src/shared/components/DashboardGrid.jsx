export default function DashboardGrid({
  children,
  columns = "auto",
  gap = "md",
  className = "",
  ...props
}) {
  return (
    <div
      className={[
        "dashboard-grid",
        `dashboard-grid--${columns}`,
        `dashboard-grid--gap-${gap}`,
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