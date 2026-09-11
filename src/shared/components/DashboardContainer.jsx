export default function DashboardContainer({
  children,
  className = "",
}) {
  return (
    <main
      className={`dashboard-container ${className}`.trim()}
    >
      {children}
    </main>
  );
}