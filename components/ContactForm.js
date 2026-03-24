'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Show acknowledgment message
    setIsSubmitted(true);
    // Clear the form
    setFormData({ name: '', email: '', message: '' });
    // Hide acknowledgment after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      className="space-y-5 max-w-2xl mx-auto"
    >
      {/* Acknowledgment Message */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="px-4 py-4 rounded-lg bg-gradient-to-r from-[#FF4D4D]/20 to-[#46008B]/20 border border-[#FF4D4D]/50"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <p className="text-[#FF4D4D] font-semibold text-sm sm:text-base">
                  Acknowledged!
                </p>
                <p className="text-gray-300 text-xs sm:text-sm mt-1">
                  Your response will be entertained soon. For quicker response, please reach out on{' '}
                  <a 
                    href="https://www.linkedin.com/in/sumaid-ahmed-ab0386388" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#FF4D4D] hover:underline font-semibold"
                  >
                    LinkedIn
                  </a>
                  .
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Name Input */}
      <motion.div
        variants={fadeUp}
        className="relative"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          disabled={isSubmitted}
          className="w-full px-4 py-3 rounded-lg
            bg-black/40 border border-white/20
            text-white placeholder-gray-500
            focus:outline-none focus:border-[#FF4D4D]/50 focus:bg-black/60
            transition-all disabled:opacity-50 disabled:cursor-not-allowed
          "
        />
      </motion.div>

      {/* Email Input */}
      <motion.div
        variants={fadeUp}
        className="relative"
      >
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          disabled={isSubmitted}
          className="w-full px-4 py-3 rounded-lg
            bg-black/40 border border-white/20
            text-white placeholder-gray-500
            focus:outline-none focus:border-[#FF4D4D]/50 focus:bg-black/60
            transition-all disabled:opacity-50 disabled:cursor-not-allowed
          "
        />
      </motion.div>

      {/* Message Input */}
      <motion.div
        variants={fadeUp}
        className="relative"
      >
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your message..."
          rows="5"
          disabled={isSubmitted}
          className="w-full px-4 py-3 rounded-lg
            bg-black/40 border border-white/20
            text-white placeholder-gray-500
            focus:outline-none focus:border-[#FF4D4D]/50 focus:bg-black/60
            transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed
          "
        />
      </motion.div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitted}
        variants={fadeUp}
        whileHover={{ scale: isSubmitted ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitted ? 1 : 0.98 }}
        className="w-full px-6 py-3 rounded-lg
          bg-gradient-to-r from-[#FF4D4D] to-[#46008B] text-white font-bold uppercase tracking-wide
          hover:shadow-[0_0_30px_rgba(255,77,77,0.4)] transition-all
          relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitted ? 'Message Sent ✓' : 'Send Message'}
        <motion.div
          className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.5 }}
        />
      </motion.button>
    </motion.form>
  );
}
