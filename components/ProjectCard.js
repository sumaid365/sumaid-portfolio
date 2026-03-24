'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { Oxanium } from 'next/font/google';

const oxanium = Oxanium({ subsets: ['latin'], weight: ['200', '400', '700', '800'] });

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function ProjectCard({ project, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className={oxanium.className}>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        onClick={() => setIsOpen(true)}
        className="h-full rounded-2xl cursor-pointer transition-all group relative overflow-hidden
          bg-black/50 border border-white/10 hover:border-[#FF4D4D]/60
          shadow-lg hover:shadow-[0_0_30px_rgba(255,77,77,0.25)]"
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#FF4D4D]/15 via-transparent to-[#FF4D4D]/10 opacity-0 group-hover:opacity-100"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Top accent line */}
        <motion.div
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#FF4D4D] via-[#FF4D4D] to-transparent opacity-0 group-hover:opacity-100"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
          style={{ originX: 0 }}
        />

        <div className="relative z-10 p-7 h-full flex flex-col">
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-[#FF4D4D] font-extrabold text-lg sm:text-xl leading-tight mb-3 tracking-tight">
              {project.title}
            </h3>
            <motion.div
              className="h-0.5 w-12 bg-gradient-to-r from-[#FF4D4D] to-[#FF4D4D]"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.4 }}
              style={{ originX: 0 }}
            />
          </div>

          {/* Description */}
          <p className="text-gray-100 text-sm sm:text-base leading-relaxed mb-6 flex-grow font-medium">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.slice(0, 3).map((tag, idx) => (
              <motion.span
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="text-xs px-3 py-1.5 rounded-full bg-[#FF4D4D]/15 text-[#FF4D4D] border border-[#FF4D4D]/40
                  hover:bg-[#FF4D4D]/25 hover:border-[#FF4D4D]/60 transition font-semibold uppercase tracking-wider"
              >
                {tag}
              </motion.span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-xs px-3 py-1.5 rounded-full bg-white/10 text-gray-400 border border-white/20 font-semibold">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          {/* CTA Button */}
          <motion.button
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-4 py-3 rounded-lg
              bg-gradient-to-r from-[#FF4D4D]/30 to-[#FF4D4D]/30
              border border-[#FF4D4D]/60 hover:border-[#FF4D4D]/80
              text-[#FF4D4D] hover:text-[#FF4D4D]
              font-bold text-sm uppercase tracking-wide
              transition-all hover:bg-gradient-to-r hover:from-[#FF4D4D]/40 hover:to-[#FF4D4D]/40
              flex items-center justify-center gap-2
              group/btn"
          >
            <span>View Details</span>
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
        </div>
      </motion.div>

      {/* Modal - Rendered via Portal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsOpen(false)}
                  className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9998]"
                />

                {/* Modal Container - Flex centering */}
                <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="w-full max-w-2xl max-h-[85vh]
                      bg-black/95 backdrop-blur-xl
                      border border-[#FF4D4D]/50 rounded-3xl
                      shadow-2xl shadow-[#FF4D4D]/15
                      overflow-hidden flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Modal Header - Fixed at top */}
                    <div className="relative flex-shrink-0">
                      <motion.div
                        className="h-1 w-full bg-gradient-to-r from-[#FF4D4D] via-[#FF4D4D] to-[#FF4D4D]"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        style={{ originX: 0 }}
                      />

                      <div className="p-6 sm:p-8 pb-4">
                        <div className="flex items-start justify-between gap-4">
                          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FF4D4D] leading-tight">
                            {project.title}
                          </h2>
                          <button
                            onClick={() => setIsOpen(false)}
                            className="flex-shrink-0 text-gray-400 hover:text-[#FF4D4D] transition text-2xl leading-none"
                          >
                            ✕
                          </button>
                        </div>
                        <motion.div
                          className="h-0.5 w-16 bg-[#FF4D4D] rounded-full mt-3"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          style={{ originX: 0 }}
                        />
                      </div>
                    </div>

                    {/* Scrollable Content Area */}
                    <div className="overflow-y-auto flex-grow px-6 sm:px-8 pb-6 space-y-5">
                      {/* Description */}
                      <div>
                        <p className="text-gray-200 leading-relaxed text-base">
                          {project.fullDescription}
                        </p>
                      </div>

                      {/* Features */}
                      {project.features && (
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-[#FF4D4D] mb-3 flex items-center gap-2 uppercase tracking-wide">
                            <span className="text-[#FF4D4D] text-2xl">▪</span> Features
                          </h3>
                          <ul className="space-y-2 pl-5">
                            {project.features.map((feature, idx) => (
                              <li key={idx} className="text-gray-300 text-sm sm:text-base flex items-start gap-2">
                                <span className="text-[#FF4D4D] font-bold text-lg leading-none mt-0.5">
                                  ›
                                </span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Tags */}
                      <div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">
                          Technologies
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-3 py-1.5 rounded-full bg-[#FF4D4D]/20 text-[#FF4D4D] border border-[#FF4D4D]/50"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Links */}
                      {project.links && Object.keys(project.links).length > 0 && (
                        <div className="pt-4 border-t border-white/10">
                          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
                            Links
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3">
                            {project.links.github && (
                              <a
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 px-4 py-2.5 rounded-lg
                                  bg-[#FF4D4D]/20 hover:bg-[#FF4D4D]/30
                                  border border-[#FF4D4D]/50 hover:border-[#FF4D4D]/70
                                  text-[#FF4D4D] font-semibold text-sm
                                  transition-all text-center"
                              >
                                → GitHub Repository
                              </a>
                            )}
                            {project.links.live && (
                              <a
                                href={project.links.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 px-4 py-2.5 rounded-lg
                                  bg-[#FF4D4D]/20 hover:bg-[#FF4D4D]/30
                                  border border-[#FF4D4D]/50 hover:border-[#FF4D4D]/70
                                  text-[#FF4D4D] font-semibold text-sm
                                  transition-all text-center"
                              >
                                → Live Demo
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </>
            )}
          </AnimatePresence>
          , document.body
        )}
    </div>
  );
}