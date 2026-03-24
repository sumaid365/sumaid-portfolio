'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Just show an alert that it's a demo
    alert('This is a demo contact form. For now, please reach out via email or social links!');
    // Optionally clear the form
    setFormData({ name: '', email: '', message: '' });
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
          className="w-full px-4 py-3 rounded-lg
            bg-black/40 border border-white/20
            text-white placeholder-gray-500
            focus:outline-none focus:border-red-400/50 focus:bg-black/60
            transition-all
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
          className="w-full px-4 py-3 rounded-lg
            bg-black/40 border border-white/20
            text-white placeholder-gray-500
            focus:outline-none focus:border-red-400/50 focus:bg-black/60
            transition-all
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
          className="w-full px-4 py-3 rounded-lg
            bg-black/40 border border-white/20
            text-white placeholder-gray-500
            focus:outline-none focus:border-red-400/50 focus:bg-black/60
            transition-all resize-none
          "
        />
      </motion.div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        variants={fadeUp}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full px-6 py-3 rounded-lg
          bg-gradient-to-r from-red-400 to-red-500 text-black font-bold uppercase tracking-wide
          hover:shadow-[0_0_30px_rgba(255,0,0,0.4)] transition-all
          relative overflow-hidden group"
      >
        Send Message
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