import { Card } from "../ui";

export default function AnimatedCard({
  children,
  animation = "fade-in",
  delay = 0,
  className = "",
  ...props
}) {
  return (
    <Card
      className={[
        "animated-card",
        `animated-card--${animation}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        "--animation-delay": `${delay}ms`,
      }}
      {...props}
    >
      {children}
    </Card>
  );
}