'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Oxanium } from 'next/font/google';
import localFont from 'next/font/local';

import Navbar from '../components/NavBar';
import MatrixBackground from '../components/MatrixBox';
import TerminalIntro from '../components/Terminal/TerminalIntro';
import ScrollProgress from '../components/ScrollProgress';
import ProjectCard from '../components/ProjectCard';
import Skills from '../components/Skills';
import Certifications from '../components/Certifications';
import ContactForm from '../components/ContactForm';

// Fonts
const oxanium = Oxanium({ subsets: ['latin'], variable: '--font-oxanium', weight: ['200', '400', '700', '800'] });

const pixelFont = localFont({
  src: '../fonts/PressStart2P-Regular.ttf',
  variable: '--font-pixel',
});

// Animations
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

// Enhanced stagger animation
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const projects = [
  {
    title: 'Anti-Sleeping Alarm',
    description: 'Anti Sleeping Alarm using Arduino (electronics project)',
    fullDescription:
      'A smart Arduino-based anti-sleep alert system designed to enhance driver safety by monitoring eye activity in real time. The system detects prolonged eye closure and instantly triggers alerts to prevent drowsiness-related accidents.',
    features: [
      'Real-time eye blink detection',
      'Drowsiness alert using buzzer',
      'Automatic motor control for visual indication',
      'Time-based detection to avoid false triggers',
    ],
    tags: ['Arduino Nano', 'Embedded', 'IR Sensor (HW-201)', 'Relay Module'],
    links: {
      github: 'https://github.com/CheeseBallz/anti-aleeping-alarm',
    },
  },
];

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [checkedVisit, setCheckedVisit] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    setCheckedVisit(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 200) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!checkedVisit) return null;

  if (showIntro) {
    return <TerminalIntro onComplete={() => setShowIntro(false)} />;
  }

  return (
    <>
      <MatrixBackground />
      <ScrollProgress />
      <Navbar />
      
      <div className={`${oxanium.className} ${pixelFont.className} relative z-10`}>
        {/* =================== HERO =================== */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center px-6 pt-24"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            className="
              w-full max-w-5xl
              bg-white/5 backdrop-blur-xl
              border border-white/10
              rounded-3xl
              shadow-[0_0_40px_rgba(255,77,77,0.15)]
              p-6 sm:p-10 lg:p-14
              text-center
            "
          >
            <p className="text-xs tracking-[0.3em] text-white/60 mb-4 uppercase">
              Ethical Hacker
            </p>

            <h1 className="text-3xl sm:text-6xl font-bold text-[#FF4D4D] mb-4">
              Sumaid Ahmed
            </h1>

            <p className="text-white/80 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed px-2">
              The Best Defense is a Relentless Offense
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <a
                href="#projects"
                className="
                  px-6 py-3 rounded-xl
                  border border-white/30 text-white
                  hover:bg-white/10 transition
                "
              >
                View Projects
              </a>

              <a
                href="#contact"
                className="
                  px-6 py-3 rounded-xl
                  border border-white/30 text-white
                  hover:bg-white/10 transition
                "
              >
                Contact Me
              </a>
            </div>
          </motion.div>
        </section>

        {/* =================== ABOUT =================== */}
        <section
          id="about"
          className="min-h-screen flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            className="w-full max-w-5xl"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 uppercase tracking-tight">
                About Me
              </h2>
              <motion.div
                className="h-1 w-20 bg-[#FF4D4D] mx-auto rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ originX: 0.5 }}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Bio Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-2 bg-gradient-to-br from-black/50 to-black/30 border border-white/20 hover:border-[#FF4D4D]/50 rounded-2xl p-8 transition-all duration-300 hover:bg-black/60 hover:shadow-lg hover:shadow-[#FF4D4D]/10"
              >
                <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide">Who I Am</h3>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    Hey, I'm <span className="text-[#FF4D4D] font-bold text-lg">Sumaid</span>,
                    a cybersecurity enthusiast and Computer Science Student.
                    I'm currently studying BSCS at SZABIST and will graduate by 2029.
                  </p>

                  <p>
                    I have a strong interest in cybersecurity, driven by my curiosity for technology and how digital systems work. My journey began with a general interest in computer science, which gradually evolved into a focused interest in protecting systems, networks, and data.
                  </p>
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-black/50 to-black/30 border border-white/20 hover:border-[#FF4D4D]/50 rounded-2xl p-8 transition-all duration-300 hover:bg-black/60 hover:shadow-lg hover:shadow-[#FF4D4D]/10"
              >
                <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wide">Quick Facts</h3>
                <div className="space-y-4 text-sm">
                  <div className="pb-4 border-b border-white/10">
                    <p className="text-gray-400 text-xs mb-1">GRADUATION</p>
                    <p className="text-gray-200 font-semibold">2029</p>
                  </div>
                  <div className="pb-4 border-b border-white/10">
                    <p className="text-gray-400 text-xs mb-1">UNIVERSITY</p>
                    <p className="text-gray-200 font-semibold">SZABIST</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">FOCUS AREA</p>
                    <p className="text-gray-200 font-semibold">Cybersecurity</p>
                  </div>
                </div>
              </motion.div>

              {/* Education Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-black/50 to-black/30 border border-white/20 hover:border-[#FF4D4D]/50 rounded-2xl p-6 transition-all duration-300 hover:bg-black/60 hover:shadow-lg hover:shadow-[#FF4D4D]/10"
              >
                <h3 className="text-white font-bold text-lg mb-3 uppercase tracking-wide">🎓 Education</h3>
                <p className="text-gray-200 text-base font-medium">BS Computer Science</p>
                <p className="text-gray-400 text-sm mt-2">@ SZABIST</p>
              </motion.div>

              {/* Specialty Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-black/50 to-black/30 border border-white/20 hover:border-[#FF4D4D]/50 rounded-2xl p-6 transition-all duration-300 hover:bg-black/60 hover:shadow-lg hover:shadow-[#FF4D4D]/10"
              >
                <h3 className="text-white font-bold text-lg mb-3 uppercase tracking-wide">🔒 Specialty</h3>
                <p className="text-gray-200 text-base font-medium">Web Penetration</p>
                <p className="text-gray-400 text-sm mt-2">Creative Problem Solving</p>
              </motion.div>

              {/* Interests Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-black/50 to-black/30 border border-white/20 hover:border-[#FF4D4D]/50 rounded-2xl p-6 transition-all duration-300 hover:bg-black/60 hover:shadow-lg hover:shadow-[#FF4D4D]/10"
              >
                <h3 className="text-white font-bold text-lg mb-4 uppercase tracking-wide">💡 Interests</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-[#FF4D4D]">▪</span> Coding
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#FF4D4D]">▪</span> Cybersecurity
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#FF4D4D]">▪</span> Building Cyber Tools
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#FF4D4D]">▪</span> Playing CTFs
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* =================== PROJECTS =================== */}
        <section
          id="projects"
          className="min-h-screen flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            className="
              w-full max-w-5xl
              bg-white/5 backdrop-blur-xl
              border border-white/10
              rounded-3xl
              shadow-[0_0_40px_rgba(255,77,77,0.12)]
              p-6 sm:p-10 lg:p-14
            "
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8">
              Projects
            </h2>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {projects.map((project, idx) => (
                <ProjectCard key={idx} project={project} index={idx} />
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-gray-400 text-sm mt-8"
            >
              💡 Click any project to learn more
            </motion.p>
          </motion.div>
        </section>

        {/* =================== SKILLS =================== */}
        <section id="skills">
          <Skills />
        </section>

        {/* =================== CERTIFICATIONS & COURSES =================== */}
        <section id="certifications">
          <Certifications />
        </section>

        {/* =================== CONTACT =================== */}
        <section
          id="contact"
          className="min-h-screen flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            className="
              w-full max-w-5xl
              bg-white/5 backdrop-blur-xl
              border border-white/10
              rounded-3xl
              shadow-[0_0_40px_rgba(255,77,77,0.12)]
              p-6 sm:p-10 lg:p-14
            "
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Get In Touch
              </h2>
              <p className="text-gray-300 text-sm sm:text-base">
                Have a question or want to collaborate? Send me a message!
              </p>
            </div>

            <ContactForm />

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 pt-8 border-t border-white/10 text-center"
            >
              <p className="text-gray-400 text-sm mb-6">Or connect with me on:</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="https://github.com/CheeseBallz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl border border-white/20 bg-black/40 hover:border-[#FF4D4D]/50 hover:text-[#FF4D4D] transition text-white"
                >
                  GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/sumaid-ahmed-ab0386388"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl border border-white/20 bg-black/40 hover:border-[#FF4D4D]/50 hover:text-[#FF4D4D] transition text-white"
                >
                  LinkedIn
                </a>

                <a
                  href="mailto:huntermob183@gmail.com"
                  className="px-6 py-3 rounded-xl border border-white/20 bg-black/40 hover:border-[#FF4D4D]/50 hover:text-[#FF4D4D] transition text-white"
                >
                  Email
                </a>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* =================== FOOTER =================== */}
        <footer className="border-t border-white/10 py-8 sm:py-12 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs sm:text-sm text-gray-400 flex-wrap">
                <span>Built with</span>
                <span className="text-white font-semibold">Next.js</span>
                <span className="text-gray-500 hidden sm:inline">•</span>
                <span className="text-white font-semibold">Tailwind CSS</span>
                <span className="text-gray-500 hidden sm:inline">•</span>
                <span className="text-white font-semibold">Framer Motion</span>
              </div>
              
              <p className="text-xs text-gray-500">
                © {new Date().getFullYear()} Sumaid Ahmed. All rights reserved.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-2 sm:pt-4">
                <a 
                  href="https://github.com/CheeseBallz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#FF4D4D] transition text-xs sm:text-sm"
                >
                  GitHub
                </a>
                <span className="text-gray-600 hidden sm:inline">•</span>
                <a 
                  href="https://www.linkedin.com/in/sumaid-ahmed-ab0386388" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#FF4D4D] transition text-xs sm:text-sm"
                >
                  LinkedIn
                </a>
                <span className="text-gray-600 hidden sm:inline">•</span>
                <a 
                  href="mailto:huntermob183@gmail.com"
                  className="text-gray-400 hover:text-[#FF4D4D] transition text-xs sm:text-sm"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}