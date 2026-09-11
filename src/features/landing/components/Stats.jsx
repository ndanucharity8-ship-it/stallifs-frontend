import { motion } from "framer-motion";

import {
  Users,
  Shield,
  FileCheck,
  TrendingUp,
} from "../../../shared/icons";

const stats = [
  {
    title: "Customers",
    value: "5,000+",
    icon: Users,
  },
  {
    title: "Policies Issued",
    value: "12,500+",
    icon: Shield,
  },
  {
    title: "Claims Processed",
    value: "8,300+",
    icon: FileCheck,
  },
  {
    title: "Customer Satisfaction",
    value: "98%",
    icon: TrendingUp,
  },
];

export default function Stats() {
  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stats-grid">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                className="stats-card"
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
                <div className="stats-icon">
                  <Icon
                    size={30}
                    strokeWidth={1.8}
                  />
                </div>

                <h2>{item.value}</h2>

                <p>{item.title}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}