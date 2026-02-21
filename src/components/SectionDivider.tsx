import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function SectionDivider() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="py-4 flex justify-center">
      <motion.div
        style={{ scaleX, opacity }}
        className="h-px w-full max-w-xs bg-gradient-to-r from-transparent via-gold to-transparent origin-center"
      />
    </div>
  );
}
