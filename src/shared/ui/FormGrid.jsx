export default function FormGrid({
  children,

  columns = 2,

  gap = "md",

  className = "",

  ...props
}) {
  const gapClass =
    {
      sm: "form-grid--gap-sm",
      md: "form-grid--gap-md",
      lg: "form-grid--gap-lg",
    }[gap] || "form-grid--gap-md";

  return (
    <div
      className={[
        "form-grid",
        `form-grid--${columns}`,
        gapClass,
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