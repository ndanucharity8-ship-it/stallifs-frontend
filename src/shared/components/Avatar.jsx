import { User } from "../icons";

export default function Avatar({
  src,
  alt = "",
  name = "",
  size = "md",
  className = "",
  ...props
}) {
  const initials = name
    ? name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("")
    : "";

  return (
    <div
      className={[
        "avatar",
        `avatar--${size}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={name || "User"}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt || name || "User"}
          className="avatar-image"
        />
      ) : initials ? (
        <span className="avatar-initials">
          {initials}
        </span>
      ) : (
        <User
          className="avatar-icon"
          aria-hidden="true"
        />
      )}
    </div>
  );
}