'use client';

import { motion } from 'framer-motion';
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

const skillsData = [
  {
    category: 'Web-Penetration',
    icon: '👾',
    color: 'from-[#8CC7C4] to-[#2C687B]',
    borderColor: 'border-[#8CC7C4]/50',
    textColor: 'text-[#8CC7C4]',
    items: [
      { name: 'WAF Bypass', proficiency: 50 },
      { name: 'Injection Attacks', proficiency: 75 },
      { name: 'Authentication & Authorization Attacks', proficiency: 50 },
      { name: 'Chained Attacks', proficiency: 40 },
    ],
  },
    {
    category: 'Linux & Security Tools',
    icon: '🛡️',
    color: 'from-[#2C687B] to-[#D97A2B]',
    borderColor: 'border-[#2C687B]/50',
    textColor: 'text-[#2C687B]',
    items: [
      { name: 'Security Tools', proficiency: 80 },
      { name: 'Automation', proficiency: 40 },
      { name: 'System Administration', proficiency: 20 },
    ],
  },
  {
    category: 'Programming',
    icon: '💻',
    color: 'from-[#D97A2B] to-[#8CC7C4]',
    borderColor: 'border-[#D97A2B]/50',
    textColor: 'text-[#D97A2B]',
    items: [
      { name: 'Python', proficiency: 50 },
      { name: 'C++', proficiency: 75 },
    ],
  },
];

export default function Skills() {
  return (
    <section className={`${oxanium.className} py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden`}>
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-400/5 via-transparent to-red-400/5 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-5xl font-black text-red-400 mb-3 sm:mb-4 uppercase tracking-tight">
            Skills & Tools
          </h2>
          <p className="text-gray-400 text-xs sm:text-base max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
            Technical expertise spanning security tools, programming languages, and web penetration testing
          </p>
          <motion.div
            className="h-1 w-32 bg-gradient-to-r from-red-400 via-red-400 to-red-400 mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ originX: 0.5 }}
          />
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {skillsData.map((skillGroup, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              transition={{ delay: idx * 0.15 }}
              className="group h-full"
            >
              {/* Card Container */}
              <div className={`
                relative h-full rounded-2xl overflow-hidden
                bg-gradient-to-br from-black/80 via-black/60 to-black/80
                border ${skillGroup.borderColor} border-1
                shadow-lg hover:shadow-[0_0_40px_rgba(0,0,0,0.3)]
                transition-all duration-500
                backdrop-blur-sm
                p-5 sm:p-8
              `}>
                {/* Hover gradient background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${skillGroup.color} opacity-0 group-hover:opacity-5`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.08 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Top accent bar */}
                <motion.div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${skillGroup.color} opacity-50`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: idx * 0.15 + 0.2, duration: 0.6 }}
                  style={{ originX: 0 }}
                />

                <div className="relative z-10">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6 sm:mb-8">
                    <span className="text-3xl">{skillGroup.icon}</span>
                    <h3 className={`text-lg sm:text-2xl font-bold uppercase tracking-wide ${skillGroup.textColor}`}>
                      {skillGroup.category}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-4 sm:space-y-6">
                    {skillGroup.items.map((skill, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: (idx * 0.15) + (i * 0.08), duration: 0.4 }}
                        className="space-y-2"
                      >
                        {/* Skill Name */}
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-100 font-semibold text-sm sm:text-base group-hover:text-white transition">
                            {skill.name}
                          </span>
                          <span className="text-xs text-gray-400 font-mono group-hover:text-gray-300 transition">
                            {skill.proficiency}%
                          </span>
                        </div>

                        {/* Proficiency Bar */}
                        <div className="relative h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${skillGroup.color} rounded-full`}
                            style={{ boxShadow: `0 0 10px ${skillGroup.color.split(' ')[1] || '#8CC7C4'}` }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            transition={{ delay: (idx * 0.15) + (i * 0.08) + 0.2, duration: 0.8, ease: 'easeOut' }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Corner decoration */}
                <motion.div
                  className={`absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl ${skillGroup.color} opacity-0 group-hover:opacity-10 rounded-tl-2xl`}
                  whileHover={{ scale: 1.2 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}