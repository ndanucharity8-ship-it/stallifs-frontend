import { motion } from "framer-motion";

import {
  FileText,
  Shield,
  CreditCard,
  CircleCheck,
} from "../../../shared/icons";

const steps = [
  {
    title: "Get a Quote",
    description: "Find the cover that fits.",
    icon: FileText,
  },
  {
    title: "Apply Online",
    description: "Complete your application easily.",
    icon: Shield,
  },
  {
    title: "Make Payment",
    description: "Pay securely and conveniently.",
    icon: CreditCard,
  },
  {
    title: "You're Covered",
    description: "Access your policy instantly.",
    icon: CircleCheck,
  },
];

export default function HowItWorks() {
  return (
    <section className="steps-section">
      <div className="steps-container">

        <div className="steps-header">
          <span className="steps-eyebrow">
            HOW IT WORKS
          </span>

          <h2>
            Get covered in four steps.
          </h2>

          <p>
            From quote to cover, it is simple.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                className="step-card"
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
                <div className="step-number">
                  {index + 1}
                </div>

                <div className="step-icon">
                  <Icon
                    size={28}
                    strokeWidth={1.8}
                  />
                </div>

                <h3>{step.title}</h3>

                <p>{step.description}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}