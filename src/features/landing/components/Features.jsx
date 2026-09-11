import { motion } from "framer-motion";

import {
  Shield,
  Clock3,
  BrainCircuit,
  CircleCheck,
} from "../../../shared/icons";

const features = [
  {
    title: "Trusted Protection",
    description: "Cover you can count on.",
    icon: Shield,
  },
  {
    title: "Fast Claims",
    description: "Clear updates, faster decisions.",
    icon: Clock3,
  },
  {
    title: "Smart Technology",
    description: "Insurance made simpler with technology.",
    icon: BrainCircuit,
  },
  {
    title: "Reliable Support",
    description: "Real help when you need it.",
    icon: CircleCheck,
  },
];

export default function Features() {
  return (
    <section className="features-section">
      <div className="features-container">

        <div className="features-header">
          <h2>Insurance, made better.</h2>

          <p>
            Simple tools. Smarter protection.
            Support you can rely on.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                className="feature-card"
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-80px",
                }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.12,
                  ease: "easeOut",
                }}
              >
                <div className="feature-icon">
                  <Icon
                    size={30}
                    strokeWidth={1.8}
                  />
                </div>

                <h3>{feature.title}</h3>

                <p>{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}