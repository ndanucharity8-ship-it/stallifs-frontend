import Avatar from "./Avatar";
import StatusBadge from "./StatusBadge";

export default function ProfileCard({
  user = {},
  title = "Profile",
  fields = [],
  status,
  actions,
  className = "",
}) {
  const name =
    user?.fullName ||
    user?.name ||
    "User";

  const email =
    user?.email || "";

  return (
    <section
      className={[
        "profile-card",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="profile-card-header">
        <div className="profile-card-identity">
          <Avatar
            src={
              user?.avatar ||
              user?.profileImage
            }
            name={name}
            size="lg"
          />

          <div className="profile-card-heading">
            <span className="profile-card-eyebrow">
              {title}
            </span>

            <h2 className="profile-card-name">
              {name}
            </h2>

            {email && (
              <p className="profile-card-email">
                {email}
              </p>
            )}

            {status && (
              <StatusBadge
                status={status}
              />
            )}
          </div>
        </div>

        {actions && (
          <div className="profile-card-actions">
            {actions}
          </div>
        )}
      </div>

      {fields.length > 0 && (
        <div className="profile-card-fields">
          {fields.map((field) => (
            <div
              key={
                field.key ||
                field.label
              }
              className="profile-card-field"
            >
              <span className="profile-card-field-label">
                {field.label}
              </span>

              <div className="profile-card-field-value">
                {field.render
                  ? field.render(
                      field.value,
                      user
                    )
                  : field.value ?? "—"}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}