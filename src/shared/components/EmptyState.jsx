import Button from "../ui/Button";

export default function EmptyState({
  icon: Icon,
  title = "No Data Found",
  description = "There's nothing to display yet.",
  action,
  actionLabel,
  className = "",
}) {
  const hasAction =
    typeof action === "function" &&
    Boolean(actionLabel);

  return (
    <div
      className={[
        "empty-state",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {Icon && (
        <div
          className="empty-state-icon"
          aria-hidden="true"
        >
          <Icon size={48} strokeWidth={1.7} />
        </div>
      )}

      <h3 className="empty-state-title">
        {title}
      </h3>

      {description && (
        <p className="empty-state-description">
          {description}
        </p>
      )}

      {hasAction && (
        <div className="empty-state-action">
          <Button
            type="button"
            onClick={action}
          >
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}