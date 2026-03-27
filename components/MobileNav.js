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
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/CheeseBallz', color: 'red' },
  { name: 'LinkedIn', href: 'www.linkedin.com/in/sumaid-ahmed-ab0386388', color: 'red' },
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
        className={`${oxanium.className}
          fixed top-4 left-1/2 -translate-x-1/2 z-50
          w-[95%] max-w-6xl
          rounded-full px-6 sm:px-12 py-4 sm:py-5
          transition-all duration-300
          ${scrolled 
            ? 'bg-black/60 backdrop-blur-2xl border border-white/30 shadow-[0_0_50px_rgba(255,0,0,0.2)]' 
            : 'bg-gradient-to-br from-white/10 via-white/5 to-white/0 backdrop-blur-xl border border-white/20 shadow-[0_0_40px_rgba(255,0,0,0.15)]'
          }
        `}
      >
        <div className="flex items-center justify-between w-full">
          {/* Logo - LEFT */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 font-black text-lg sm:text-xl text-red-400 hover:text-red-300 transition uppercase tracking-wider group"
          >
            <span className="text-xl group-hover:animate-pulse">⌘</span>
            SUMAID
          </a>

          {/* Desktop Navigation - CENTER */}
          <div className="hidden md:flex gap-6 sm:gap-8 items-center">
            {navItems.map((item) => {
              const isActive = active === item.href.replace('#', '');
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative group transition-all duration-300 font-bold text-xs sm:text-sm uppercase tracking-wide
                    ${isActive 
                      ? 'text-red-400' 
                      : 'text-gray-300 hover:text-red-300'
                    }
                  `}
                >
                  {/* Pill Background */}
                  {isActive && (
                    <motion.span
                      layoutId="activePill"
                      className="absolute inset-0 rounded-full bg-red-400/20 border border-red-400/40 -z-10"
                      transition={{ type: 'spring', damping: 20, stiffness: 150 }}
                    />
                  )}
                  
                  <span className="relative px-3 py-2 block">
                    {item.name}
                    {isActive && (
                      <motion.span
                        className="absolute inset-0 rounded-full bg-red-400/10 blur-lg -z-20"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Social & CTA Icons - RIGHT */}
          <div className="hidden md:flex gap-3 items-center">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-2 rounded-lg font-semibold text-xs uppercase tracking-wide transition-all
                  bg-red-400/25 hover:bg-red-400/35 border border-red-400/60 hover:border-red-400/80 text-red-200 hover:text-red-100
                "
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
              className="ml-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-400 to-red-500 
                text-black font-bold text-xs uppercase tracking-wide
                hover:shadow-[0_0_20px_rgba(255,0,0,0.4)] transition-all"
            >
              Resume
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 group"
            aria-label="Toggle mobile menu"
          >
            <span className={`w-6 h-0.5 bg-red-400 transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-red-400 transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-red-400 transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`${oxanium.className} fixed top-20 left-4 right-4 z-40 md:hidden
            rounded-2xl bg-black/80 backdrop-blur-xl border border-red-400/30
            p-6 space-y-4`}
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
                className={`block px-4 py-3 rounded-lg transition-all font-bold uppercase text-sm tracking-wide
                  ${isActive
                    ? 'bg-red-400/20 border border-red-400/40 text-red-400'
                    : 'text-gray-300 hover:text-red-400 hover:bg-white/5'
                  }
                `}
              >
                {item.name}
              </motion.a>
            );
          })}

          <div className="pt-4 border-t border-white/10 flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-3 py-2 rounded-lg bg-white/5 hover:bg-red-400/20 text-red-400 
                  hover:text-red-300 transition text-center font-bold text-xs uppercase"
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
            className="block w-full px-4 py-3 rounded-lg bg-gradient-to-r from-red-400 to-red-500 
              text-black font-bold text-xs uppercase tracking-wide text-center
              hover:shadow-[0_0_20px_rgba(255,0,0,0.4)] transition-all"
          >
            Resume
          </motion.a>
        </motion.div>
      )}
    </>
  );
}
