import { Link } from "react-router-dom";

import stallifsLogo from "../../assets/logos/stallifs_logo.png";

export default function Logo({
  to = "/",
  collapsed = false,
}) {
  return (
    <Link
      to={to}
      className={`logo${collapsed ? " logo--collapsed" : ""}`}
      aria-label="STALLIFS Insurance"
    >
      <img
        src={stallifsLogo}
        alt="STALLIFS Insurance Logo"
        className="logo-image"
        loading="eager"
        draggable={false}
      />
    </Link>
  );
}