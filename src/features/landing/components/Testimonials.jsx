import { motion } from "framer-motion";

const testimonials = [
  {
    name: "John Mwangi",
    role: "Business Owner",
    message:
      "STALLIFS made insuring my business fast and transparent.",
  },
  {
    name: "Mary Wanjiku",
    role: "Motor Insurance Customer",
    message:
      "I could submit my claim online and track every update.",
  },
  {
    name: "David Otieno",
    role: "Family Health Cover",
    message:
      "Managing my policy and payments from one dashboard is so convenient.",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="testimonials-container">

        <div className="testimonials-header">
          <span className="testimonials-eyebrow">
            CUSTOMER STORIES
          </span>

          <h2>
            Real people. Real peace of mind.
          </h2>

          <p>
            See why our customers choose STALLIFS.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              className="testimonial-card"
              initial={{
                opacity: 0,
                y: 25,
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
              <p className="testimonial-message">
                "{testimonial.message}"
              </p>

              <div className="testimonial-author">
                <h4>{testimonial.name}</h4>

                <span>{testimonial.role}</span>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}