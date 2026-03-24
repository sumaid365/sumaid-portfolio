'use client';

import { motion, useScroll } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="
        fixed top-0 left-0 right-0 h-[3px]
        origin-left
        bg-red-400
        shadow-[0_0_12px_rgba(255,0,0,0.8)]
        z-[60]
      "
    />
  );
}