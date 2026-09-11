import Button from "./Button";

export default function ErrorState({
  title = "Something went wrong",

  description = "An unexpected error occurred. Please try again.",

  action,

  actionLabel = "Try Again",

  icon: Icon,

  className = "",
}) {
  return (
    <div
      className={[
        "error-state",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {Icon && (
        <div className="error-state-icon">
          <Icon size={56} />
        </div>
      )}

      <h3 className="error-state-title">
        {title}
      </h3>

      <p className="error-state-description">
        {description}
      </p>

      {action && (
        <Button
          variant="primary"
          onClick={action}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}