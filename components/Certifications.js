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

const certifications = [
  {
    title: 'CCEP Certified Cybersecurity Educator Professional',
    issuer: 'Red Team Leaders',
    date: '2026',
    link: 'https://courses.redteamleaders.com/exam-completion/5d2c879ef237a422',
    type: 'certification',
    icon: '🎓',
    color: '#8CC7C4',
    borderColor: '#8CC7C4',
  },
  {
    title: 'Web Red Team Analyst',
    issuer: 'CyberWarFare Labs',
    date: '2025',
    link: 'https://labs.cyberwarfare.live/credential/achievement/698de1bb5f7c23c92b92f8ce',
    type: 'certification',
    icon: '🛡️',
    color: '#F2D479',
    borderColor: '#F2D479',
  },
];

const courses = [];

export default function Certifications() {
  return (
    <section className={`${oxanium.className} py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden`}>
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#8CC7C4]/5 via-transparent to-[#F2D479]/5 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-[#8CC7C4] to-[#F2D479] bg-clip-text text-transparent mb-3 sm:mb-4 uppercase tracking-tight">
            Certifications & Courses
          </h2>
          <p className="text-gray-400 text-xs sm:text-base max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
            Professional credentials and ongoing learning in cybersecurity and networking
          </p>
          <motion.div
            className="h-1 w-32 bg-gradient-to-r from-[#8CC7C4] via-[#F2D479] to-[#8CC7C4] mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ originX: 0.5 }}
          />
        </motion.div>

        {/* Certifications */}
        <div className="mb-16">
          <motion.h3
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="text-2xl font-bold bg-gradient-to-r from-[#8CC7C4] to-[#F2D479] bg-clip-text text-transparent mb-8 uppercase tracking-wide"
          >
            Certifications
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {certifications.map((cert, idx) => (
              <motion.a
                key={idx}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                transition={{ delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-2xl
                  bg-gradient-to-br from-black/80 via-black/60 to-black/80
                  border border-[${cert.borderColor}]/50 hover:border-[${cert.borderColor}]/80
                  shadow-lg hover:shadow-[0_0_30px_rgba(${idx === 0 ? '140,199,196' : '242,212,121'},0.2)]
                  transition-all duration-300 p-8 cursor-pointer"
                style={{
                  borderColor: `${cert.borderColor}80`,
                  boxShadow: `0 0 20px ${cert.borderColor}20`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = cert.borderColor;
                  e.currentTarget.style.boxShadow = `0 0 30px ${cert.borderColor}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${cert.borderColor}80`;
                  e.currentTarget.style.boxShadow = `0 0 20px ${cert.borderColor}20`;
                }}
              >
                {/* Hover background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[${cert.borderColor}]/10 via-transparent to-[${cert.borderColor}]/5 opacity-0 group-hover:opacity-100"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{cert.icon}</span>
                    <motion.div
                      className="px-3 py-1 rounded-full border"
                      style={{
                        backgroundColor: `${cert.borderColor}20`,
                        borderColor: `${cert.borderColor}80`,
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <span 
                        className="text-xs font-bold uppercase"
                        style={{ color: cert.borderColor }}
                      >
                        Verified
                      </span>
                    </motion.div>
                  </div>

                  <h4 
                    className="text-lg font-bold mb-2 leading-tight"
                    style={{ color: cert.borderColor }}
                  >
                    {cert.title}
                  </h4>

                  <p className="text-gray-400 text-sm mb-4">{cert.issuer}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-xs text-gray-500">{cert.date}</span>
                    <motion.span
                      className="transition"
                      style={{ color: cert.borderColor }}
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      → View
                    </motion.span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}