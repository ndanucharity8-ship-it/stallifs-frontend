import { Link, NavLink } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

import stallifsLogo from "../../../assets/logos/stallifs_logo.png";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => {
    setMobileOpen(false);
  };

  return (
    <header className="landing-navbar">
      <div className="landing-navbar-inner">
        {/* Logo */}
        <Link
          to="/"
          className="landing-logo"
          onClick={closeMobile}
          aria-label="STALLIFS home"
        >
          <img
            src={stallifsLogo}
            alt="STALLIFS"
            className="landing-logo-image"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="landing-nav"
          aria-label="Main navigation"
        >
          <NavLink
            to="/products"
            className="landing-nav-link"
          >
            Products
            <ChevronDown size={14} />
          </NavLink>

          <NavLink
            to="/claims"
            className="landing-nav-link"
          >
            Claims
          </NavLink>

          <NavLink
            to="/about"
            className="landing-nav-link"
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className="landing-nav-link"
          >
            Contact
          </NavLink>

          <NavLink
            to="/become-an-agent"
            className="landing-agent-link"
          >
            Become an Agent
          </NavLink>

          <NavLink
            to="/login"
            className="landing-login-link"
          >
            Login
          </NavLink>

          <Link
            to="/quote"
            className="landing-quote-button"
          >
            Get a Quote
            <span aria-hidden="true">→</span>
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="landing-mobile-toggle"
          onClick={() =>
            setMobileOpen((previous) => !previous)
          }
          aria-label={
            mobileOpen
              ? "Close navigation"
              : "Open navigation"
          }
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="landing-mobile-menu">
          <nav
            className="landing-mobile-nav"
            aria-label="Mobile navigation"
          >
            <NavLink
              to="/products"
              onClick={closeMobile}
              className="landing-mobile-link"
            >
              Products
            </NavLink>

            <NavLink
              to="/claims"
              onClick={closeMobile}
              className="landing-mobile-link"
            >
              Claims
            </NavLink>

            <NavLink
              to="/about"
              onClick={closeMobile}
              className="landing-mobile-link"
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              onClick={closeMobile}
              className="landing-mobile-link"
            >
              Contact
            </NavLink>

            <NavLink
              to="/become-an-agent"
              onClick={closeMobile}
              className="landing-mobile-link landing-mobile-agent"
            >
              Become an Agent
            </NavLink>

            <NavLink
              to="/login"
              onClick={closeMobile}
              className="landing-mobile-link"
            >
              Login
            </NavLink>

            <Link
              to="/quote"
              onClick={closeMobile}
              className="landing-mobile-quote"
            >
              Get a Quote
              <span aria-hidden="true">→</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}