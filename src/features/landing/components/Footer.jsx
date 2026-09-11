import { Link } from "react-router-dom";

import stallifsLogo from "../../../assets/logos/stallifs_logo.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="landing-container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link
              to="/"
              className="footer-logo"
              aria-label="STALLIFS home"
            >
              <img
                src={stallifsLogo}
                alt="STALLIFS Insurance"
                className="footer-logo-image"
              />
            </Link>

            <p className="footer-text">
              Simple protection for what
              matters most.
            </p>
          </div>

          {/* Company */}
          <div className="footer-column">
            <h4>Company</h4>

            <ul>
              <li>
                <Link to="/about">
                  About STALLIFS
                </Link>
              </li>

              <li>
                <Link to="/products">
                  Products
                </Link>
              </li>

              <li>
                <Link to="/contact">
                  Contact
                </Link>
              </li>

              <li>
                <Link to="/become-an-agent">
                  Become an Agent
                </Link>
              </li>
            </ul>
          </div>

          {/* Insurance */}
          <div className="footer-column">
            <h4>Insurance</h4>

            <ul>
              <li>
                <Link to="/products">
                  All Products
                </Link>
              </li>

              <li>
                <Link to="/quote">
                  Get a Quote
                </Link>
              </li>

              <li>
                <Link to="/claims">
                  Claims
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div className="footer-column">
            <h4>Account</h4>

            <ul>
              <li>
                <Link to="/login">
                  Login
                </Link>
              </li>

              <li>
                <Link to="/register">
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} STALLIFS
          Insurance. All rights reserved.
        </div>
      </div>
    </footer>
  );
}