import { motion } from "framer-motion";

import {
  Phone,
  Mail,
  MapPin,
  Clock3,
  ArrowRight,
} from "../../../shared/icons";

const contactDetails = [
  {
    label: "Phone",
    value: "0718 250 239",
    icon: Phone,
    href: "tel:+254718250239",
  },
  {
    label: "Email",
    value: "stallyagency@gmail.com",
    icon: Mail,
    href: "mailto:stallyagency@gmail.com",
  },
  {
    label: "Location",
    value: "Meru, Kenya",
    icon: MapPin,
  },
  {
    label: "Availability",
    value: "Open 24/7",
    icon: Clock3,
  },
];

export default function Contact() {
  return (
    <section className="contact-section">
      <div className="contact-container">

        <motion.div
          className="contact-header"
          initial={{
            opacity: 0,
            y: 20,
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
          }}
        >
          <span className="contact-eyebrow">
            CONTACT STALLIFS
          </span>

          <h2>
            We're here when you need us.
          </h2>

          <p>
            Have a question about your cover, a claim,
            or your policy? We're ready to help.
          </p>
        </motion.div>

        <div className="contact-grid">
          {contactDetails.map((contact, index) => {
            const Icon = contact.icon;

            const content = (
              <>
                <div className="contact-icon">
                  <Icon
                    size={26}
                    strokeWidth={1.8}
                  />
                </div>

                <h3>{contact.label}</h3>

                <p>{contact.value}</p>
              </>
            );

            return (
              <motion.div
                key={contact.label}
                className="contact-card"
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
                  delay: index * 0.1,
                }}
              >
                {contact.href ? (
                  <a
                    href={contact.href}
                    className="contact-link"
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.a
          href="mailto:stallyagency@gmail.com?subject=Talk%20to%20a%20STALLIFS%20Advisor"
          className="contact-advisor"
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.45,
            delay: 0.25,
          }}
        >
          <span>Talk to an Advisor</span>

          <ArrowRight
            size={18}
            strokeWidth={2}
          />
        </motion.a>

      </div>
    </section>
  );
}