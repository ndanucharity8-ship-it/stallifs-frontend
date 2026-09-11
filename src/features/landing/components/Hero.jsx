import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import heroImage from "../../../assets/images/hero.png";

export default function Hero() {
  return (
    <section className="landing-hero">
      <div className="landing-hero-background">
        <img
          src={heroImage}
          alt="Family protected by STALLIFS insurance"
          className="landing-hero-image"
        />

        <div className="landing-hero-gradient" />
      </div>

      <div className="landing-container landing-hero-inner">

        {/* ==================================================
            HERO CONTENT
        ================================================== */}

        <div className="landing-hero-content">

          <div className="landing-hero-eyebrow">
            <span>TRUSTED. RELIABLE. ALWAYS HERE.</span>
            <span className="landing-hero-eyebrow-line" />
          </div>

          <h1 className="landing-hero-title">
            Protect what
            <span> matters most.</span>
          </h1>

          <p className="landing-hero-description">
            Insurance solutions for individuals, families,
            businesses and organizations across Kenya.
          </p>

          <div className="landing-hero-actions">

            <Link
              to="/quote"
              className="landing-hero-primary"
            >
              <span>Get a Quote</span>
              <ArrowRight size={20} />
            </Link>

            <Link
              to="/products"
              className="landing-hero-secondary"
            >
              <span>Explore Products</span>
              <ArrowRight size={20} />
            </Link>

          </div>

          {/* ==================================================
              TRUST STATS
          ================================================== */}

          <div className="landing-hero-trust">

            <div className="landing-hero-customers">

              <div className="landing-hero-avatars">
                <span>J</span>
                <span>M</span>
                <span>A</span>
                <span>P</span>
              </div>

              <div className="landing-hero-stat">

                <strong>5,000+</strong>

                <span>
                  Happy Customers
                </span>

              </div>

            </div>

            <div className="landing-hero-divider" />

            <div className="landing-hero-claims">

              <div className="landing-hero-trust-icon">
                <ShieldCheck size={27} />
              </div>

              <div className="landing-hero-stat">

                <strong>98%</strong>

                <span>
                  Claims Paid
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}