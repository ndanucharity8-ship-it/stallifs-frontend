export default function TableWrapper({
  children,
  className = "",
  ...props
}) {
  return (
    <div
      className={[
        "table-wrapper",
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