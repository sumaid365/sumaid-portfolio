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
  const projectColor = project.color || '#FF4D4D';

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
          bg-black/50 border border-white/10
          shadow-lg"
        style={{
          borderColor: `${projectColor}40`,
          boxShadow: `0 0 30px ${projectColor}40`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${projectColor}a0`;
          e.currentTarget.style.boxShadow = `0 0 30px ${projectColor}40`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = `${projectColor}40`;
          e.currentTarget.style.boxShadow = `0 0 30px ${projectColor}40`;
        }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          style={{
            background: `linear-gradient(to bottom right, ${projectColor}26, transparent, ${projectColor}1a)`,
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Top accent line */}
        <motion.div
          className="absolute top-0 left-0 h-1 opacity-0 group-hover:opacity-100"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            background: `linear-gradient(to right, ${projectColor}, ${projectColor}, transparent)`,
            originX: 0,
          }}
        />

        <div className="relative z-10 p-7 h-full flex flex-col">
          {/* Header */}
          <div className="mb-4 text-center">
            <h3 className="font-extrabold text-lg sm:text-xl leading-tight mb-3 tracking-tight" style={{ color: projectColor }}>
              {project.title}
            </h3>
            <motion.div
              className="h-0.5 w-12 mx-auto"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.4 }}
              style={{
                background: `linear-gradient(to right, ${projectColor}, ${projectColor})`,
                originX: 0.5,
              }}
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
                className="text-xs px-3 py-1.5 rounded-full border transition font-semibold uppercase tracking-wider"
                style={{
                  backgroundColor: `${projectColor}26`,
                  color: projectColor,
                  borderColor: `${projectColor}66`,
                }}
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
            className="w-full px-4 py-3 rounded-lg border font-bold text-sm uppercase tracking-wide
              transition-all flex items-center justify-center gap-2 group/btn"
            style={{
              backgroundColor: `${projectColor}4d`,
              borderColor: `${projectColor}99`,
              color: projectColor,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${projectColor}66`;
              e.currentTarget.style.borderColor = `${projectColor}cc`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = `${projectColor}4d`;
              e.currentTarget.style.borderColor = `${projectColor}99`;
            }}
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
                      bg-black/95 backdrop-blur-xl rounded-3xl
                      overflow-hidden flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      border: `1px solid ${projectColor}80`,
                      boxShadow: `0 25px 50px -12px ${projectColor}26`,
                    }}
                  >
                    {/* Modal Header - Fixed at top */}
                    <div className="relative flex-shrink-0">
                      <motion.div
                        className="h-1 w-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        style={{
                          background: `linear-gradient(to right, ${projectColor}, ${projectColor}, ${projectColor})`,
                          originX: 0,
                        }}
                      />

                      <div className="p-6 sm:p-8 pb-4">
                        <div className="flex items-start justify-between gap-4">
                          <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight" style={{ color: projectColor }}>
                            {project.title}
                          </h2>
                          <button
                            onClick={() => setIsOpen(false)}
                            className="flex-shrink-0 text-gray-400 transition text-2xl leading-none"
                            style={{ color: projectColor }}
                          >
                            ✕
                          </button>
                        </div>
                        <motion.div
                          className="h-0.5 w-16 rounded-full mt-3"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          style={{
                            background: projectColor,
                            originX: 0,
                          }}
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
                          <h3 className="text-lg sm:text-xl font-bold mb-3 flex items-center gap-2 uppercase tracking-wide" style={{ color: projectColor }}>
                            <span className="text-2xl">▪</span> Features
                          </h3>
                          <ul className="space-y-2 pl-5">
                            {project.features.map((feature, idx) => (
                              <li key={idx} className="text-gray-300 text-sm sm:text-base flex items-start gap-2">
                                <span className="font-bold text-lg leading-none mt-0.5" style={{ color: projectColor }}>
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
                              className="text-xs px-3 py-1.5 rounded-full border"
                              style={{
                                backgroundColor: `${projectColor}33`,
                                color: projectColor,
                                borderColor: `${projectColor}80`,
                              }}
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
                                className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all text-center border"
                                style={{
                                  backgroundColor: `${projectColor}33`,
                                  borderColor: `${projectColor}80`,
                                  color: projectColor,
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = `${projectColor}4d`;
                                  e.currentTarget.style.borderColor = `${projectColor}b3`;
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = `${projectColor}33`;
                                  e.currentTarget.style.borderColor = `${projectColor}80`;
                                }}
                              >
                                → GitHub Repository
                              </a>
                            )}
                            {project.links.live && (
                              <a
                                href={project.links.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all text-center border"
                                style={{
                                  backgroundColor: `${projectColor}33`,
                                  borderColor: `${projectColor}80`,
                                  color: projectColor,
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = `${projectColor}4d`;
                                  e.currentTarget.style.borderColor = `${projectColor}b3`;
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = `${projectColor}33`;
                                  e.currentTarget.style.borderColor = `${projectColor}80`;
                                }}
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
