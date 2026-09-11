import { AnimatePresence, motion } from "framer-motion";

export default function PageTransition({
  children,

  className = "",
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={[
          "page-transition",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        initial={{
          opacity: 0,
          y: 12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: -12,
        }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}