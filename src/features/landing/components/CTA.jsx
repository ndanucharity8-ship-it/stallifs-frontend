import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { ArrowRight } from "../../../shared/icons";
import { Button } from "../../../shared/ui";

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="landing-container">
        <motion.div
          className="cta-card"
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.4,
          }}
        >
          <h2>
            Protect what matters.
          </h2>

          <p>
            Simple insurance. One powerful
            platform.
          </p>

          <div className="cta-buttons">
            <Link to="/register">
              <Button
                size="lg"
                rightIcon={
                  ArrowRight
                }
              >
                Get Started
              </Button>
            </Link>

            <Link to="/login">
              <Button
                variant="secondary"
                size="lg"
              >
                Login
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}