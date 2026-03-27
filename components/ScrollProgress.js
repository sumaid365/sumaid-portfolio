'use client';

import { useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollY, scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setProgress(Math.round(latest * 100));
  });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setShowButton(latest > 220);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
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

      <motion.button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        initial={{ opacity: 0, y: 16, scale: 0.9 }}
        animate={{
          opacity: showButton ? 1 : 0,
          y: showButton ? 0 : 16,
          scale: showButton ? 1 : 0.9,
          pointerEvents: showButton ? 'auto' : 'none',
        }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        className="
          fixed bottom-6 right-6
          h-12 w-12 rounded-full
          border border-white/30
          text-white text-xs font-bold
          grid place-items-center
          shadow-[0_0_20px_rgba(255,77,77,0.35)]
          backdrop-blur-md
          z-[60]
        "
        style={{
          background: `conic-gradient(#ff4d4d ${progress}%, rgba(255,255,255,0.14) ${progress}%)`,
        }}
      >
        <span className="h-9 w-9 rounded-full bg-black/80 grid place-items-center">↑</span>
      </motion.button>
    </>
  );
}
