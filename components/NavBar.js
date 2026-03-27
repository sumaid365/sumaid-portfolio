'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Oxanium } from 'next/font/google';

const oxanium = Oxanium({ subsets: ['latin'], weight: ['200', '400', '700', '800'] });

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Certs', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/CheeseBallz' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/sumaid-ahmed-ab0386388' },
];

export default function Navbar() {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (e, href) => {
    if (!href?.startsWith('#')) return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    const navOffset = 96;
    const top = target.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top, behavior: 'smooth' });
    setActive(href.replace('#', ''));
    setMobileOpen(false);
  };

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');

    const onScroll = () => {
      let current = 'home';
      sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 140) {
          current = section.id;
        }
      });
      setActive(current);
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`${oxanium.className} fixed top-4 left-0 right-0 z-50 flex justify-center w-full px-4 transition-all duration-300`}
      >
        <div className={`flex items-center justify-between w-[95%] max-w-4xl rounded-full px-5 py-2.5 border border-white/15 transition-all duration-300 bg-gradient-to-r ${scrolled ? 'from-[#46008B]/20 via-black/80 to-black/40 backdrop-blur-2xl' : 'from-[#46008B]/20 via-black/60 to-black/40 backdrop-blur-xl'}`}>

          {/* Logo - LEFT */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-1.5 font-black text-base sm:text-lg text-[#FF4D4D] hover:text-[#46008B] transition uppercase tracking-wider group flex-shrink-0"
          >
            <span className="text-lg sm:text-xl group-hover:animate-pulse">⌘</span>
            <span>SUMAID</span>
          </a>

          {/* Desktop Navigation - CENTER */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            {navItems.map((item) => {
              const isActive = active === item.href.replace('#', '');
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative transition-all duration-300 font-bold text-xs lg:text-sm uppercase tracking-wide
                    ${isActive 
                      ? 'text-[#FF4D4D]' 
                      : 'text-gray-400 hover:text-[#46008B]'
                    }
                  `}
                >
                  <span className="px-2 py-1.5 block">
                    {item.name}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF4D4D] to-[#46008B] rounded-full"
                      transition={{ type: 'spring', damping: 20, stiffness: 150 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Social & CTA Icons - RIGHT */}
          <div className="hidden md:flex gap-2 items-center flex-shrink-0">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-2 py-1.5 rounded-lg font-semibold text-[10px] uppercase tracking-wide transition-all whitespace-nowrap
                  text-[#FF4D4D] hover:text-[#46008B] hover:bg-white/5"
              >
                {social.name}
              </motion.a>
            ))}
            
            {/* Resume Button */}
            <motion.a
              href="/Sumaid Resume.pdf"
              download="Sumaid-Ahmed-Resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#FF4D4D] to-[#46008B] 
                text-white font-bold text-[10px] uppercase tracking-wide whitespace-nowrap
                hover:shadow-[0_0_20px_rgba(70,0,139,0.4)] transition-all"
            >
              Resume
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 group flex-shrink-0"
            aria-label="Toggle mobile menu"
          >
            <span className={`w-5 h-0.5 bg-[#FF4D4D] transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-5 h-0.5 bg-[#FF4D4D] transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-0.5 bg-[#FF4D4D] transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`${oxanium.className} fixed top-16 left-4 right-4 z-40 md:hidden
            rounded-2xl bg-black/95 backdrop-blur-xl border border-[#46008B]/30
            p-6 space-y-4 max-h-[80vh] overflow-y-auto`}
        >
          {navItems.map((item, idx) => {
            const isActive = active === item.href.replace('#', '');
            return (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`block px-4 py-3 rounded-lg transition-all font-bold uppercase text-sm tracking-wide text-center
                  ${isActive
                    ? 'bg-gradient-to-r from-[#FF4D4D]/20 to-[#46008B]/20 border border-[#FF4D4D]/40 text-[#FF4D4D]'
                    : 'text-gray-300 hover:text-[#46008B] hover:bg-white/5'
                  }
                `}
              >
                {item.name}
              </motion.a>
            );
          })}

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-3 py-2 rounded-lg bg-white/5 hover:bg-gradient-to-r hover:from-[#FF4D4D]/20 hover:to-[#46008B]/20 transition text-center font-bold text-xs uppercase text-[#FF4D4D] hover:text-[#46008B]"
              >
                {social.name}
              </a>
            ))}
          </div>

          <motion.a
            href="/Sumaid Resume.pdf"
            download="Sumaid-Ahmed-Resume.pdf"
            onClick={() => setMobileOpen(false)}
            whileTap={{ scale: 0.95 }}
            className="block w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#FF4D4D] to-[#46008B] 
              text-white font-bold text-xs uppercase tracking-wide text-center
              hover:shadow-[0_0_20px_rgba(70,0,139,0.4)] transition-all"
          >
            Resume
          </motion.a>
        </motion.div>
      )}
    </>
  );
}
