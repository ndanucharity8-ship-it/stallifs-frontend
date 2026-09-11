import { Link } from "react-router-dom";

import { ChevronRight } from "../icons";

export default function Breadcrumbs({
  items = [],

  separator,

  className = "",
}) {
  if (!items.length) return null;

  return (
    <nav
      className={[
        "breadcrumbs",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Breadcrumb"
    >
      <ol className="breadcrumbs-list">
        {items.map((item, index) => {
          const last =
            index === items.length - 1;

          return (
            <li
              key={item.path || item.label}
              className="breadcrumbs-item"
            >
              {last ? (
                <span
                  className="breadcrumbs-current"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="breadcrumbs-link"
                >
                  {item.label}
                </Link>
              )}

              {!last && (
                <span className="breadcrumbs-separator">
                  {separator || (
                    <ChevronRight size={16} />
                  )}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}