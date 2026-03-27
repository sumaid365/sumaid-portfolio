'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Oxanium } from 'next/font/google';

const oxanium = Oxanium({ subsets: ['latin'], weight: ['200', '400', '700', '800'] });

const bootLines = [
  'BIOS v2.4.1 - Initializing boot sequence...',
  '[BIOS] POST (Power-On Self Test): PASSED',
  '[BIOS] Memory Test: 16384MB... OK',
  '[BIOS] Secondary storage enumeration: sda, sdb, nvme0n1',
  '',
  '════════════════════════════════════════════',
  'Booting SUMAID-SEC v4.2.1 (Linux Kernel 6.1.8-x64)',
  '════════════════════════════════════════════',
  '',
  '[    0.000000] Linux version 6.1.8-x64 (sumaid@secure)',
  '[    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-secure root=/dev/mapper/sec-root',
  '[    0.001245] Memory: 16384MB available (12288KB kernel code, 2048KB rodata, 4096KB init)',
  '[    0.003421] CPU: Intel Core i9-14900K @ 6.0GHz x16 cores',
  '[    0.005634] Last level iTLB entries: 4KB 0, 2MB 0, 4MB 0',
  '[    0.123456] random: crng init done',
  '',
  '[    1.234567] EXT4-fs: mounted filesystem with ordered data mode',
  '[    1.456789] fsck.ext4: [✓] Filesystem check passed (0 errors)',
  '[    1.567890] systemd-journal: Flushing journal to disk',
  '',
  '[    2.234567] audit: type=1130 audit(1707432890.123:1): pid=1 uid=0 audit initialization complete',
  '[    2.345678] systemd[1]: systemd 255.2 running in system mode',
  '[    2.456789] systemd[1]: Detected architecture x86-64',
  '[    2.567890] systemd[1]: Set hostname to <sumaid-secure>',
  '[    2.678901] systemd[1]: Condition check resulted in getty@tty1.service being skipped',
  '',
  '[    3.012345] systemd[1]: Started Matrix Canvas Engine [✓]',
  '[    3.123456] systemd[1]: Started Portfolio Core Service [✓]',
  '[    3.234567] systemd[1]: Started Security Audit Daemon [✓]',
  '',
  '[    3.345678] SSH: Listening on 0.0.0.0 port 22 [secure-port]',
  '[    3.456789] localhost: Network Interface eth0 UP and READY',
  '[    3.567890] systemd[1]: Reached target Multi-User System',
  '',
  '════════════════════════════════════════════',
  'Boot sequence completed: [    3.678901]',
  '════════════════════════════════════════════',
];

const asciBanner = [
  '╔══════════════════════════════════════════════════════════════╗',
  '║                                                              ║',
  '║       ███████╗██╗   ██╗███╗   ███╗ █████╗ ██╗██████╗         ║',
  '║       ██╔════╝██║   ██║████╗ ████║██╔══██╗██║██╔══██╗        ║',
  '║       ███████╗██║   ██║██╔████╔██║███████║██║██║  ██║        ║',
  '║       ╚════██║██║   ██║██║╚██╔╝██║██╔══██║██║██║  ██║        ║',
  '║       ███████║╚██████╔╝██║ ╚═╝ ██║██║  ██║██║██████╔╝        ║',
  '║      ╚══════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚═════╝          ║',
  '║                                                              ║',
  '║                                                              ║',
  '║                        Ethical Hacker                        ║',
  '║                                                              ║',
  '╚══════════════════════════════════════════════════════════════╝',
];

const portfolioInfo = [
  '$ portfolio --info',
  '',
  '╭─ PROFILE INFO',
  '├─ Name: Sumaid Ahmed',
  '├─ Role: Computer Science Student',
  '├─ Expertise: Security',
  '╰─ Status: Open to opportunities',
  '',
  '╭─ QUICK STATS',
  '├─ Projects: 2',
  '├─ Tech Stack: C++, Python',
  '├─ Certifications: Web-RTA, CCEP, CCSC, Linux+',
  '╰─ GitHub: https://github.com/CheeseBallz',
  '',
];


export default function TerminalIntro({ onComplete }) {
  const [phase, setPhase] = useState('booting'); // booting, banner
  const [visibleBootLines, setVisibleBootLines] = useState([]);
  const containerRef = useRef(null);
  const hasCompletedRef = useRef(false);

  const completeIntro = () => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    onComplete();
  };

  // Boot sequence phase
  useEffect(() => {
    if (phase !== 'booting') return;

    let i = 0;
    const interval = setInterval(() => {
      setVisibleBootLines((prev) => [...prev, bootLines[i]]);
      i++;
      if (i === bootLines.length) {
        clearInterval(interval);
        setTimeout(() => {
          setPhase('banner');
        }, 800);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [phase]);

  // Keep boot logs pinned to bottom; reset to top when switching to banner.
  useEffect(() => {
    if (!containerRef.current) return;

    if (phase === 'booting') {
      requestAnimationFrame(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      });
      return;
    }

    containerRef.current.scrollTop = 0;
  }, [visibleBootLines, phase]);

  const handleKeyPress = (e) => {
    if (phase === 'banner') {
      if (e.key === 'Enter' || e.key === 'Escape') {
        completeIntro();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [phase, onComplete]);

  // Auto-proceed after showing banner (6 seconds)
  useEffect(() => {
    if (phase === 'banner') {
      const timer = setTimeout(() => {
        completeIntro();
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const glitchVariants = {
    animate: {
      textShadow: [
        '0 0 0px #FF0000',
        '2px 2px 0px #FF00FF, -2px -2px 0px #00FFFF',
        '0 0 0px #FF0000',
      ],
      transition: { duration: 0.3, repeat: 2 },
    },
  };

  return (
    <div
      ref={containerRef}
      className={`${oxanium.className} bg-black text-red-400 text-xs sm:text-sm p-4 sm:p-8 h-[100dvh] w-full flex flex-col font-mono overflow-y-auto`}
      style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 0, 0, 0.03) 0%, transparent 100%)',
      }}
    >
      <AnimatePresence mode="wait">
        {/* Boot Phase */}
        {phase === 'booting' && (
          <div
            key="boot"
            className="w-full max-w-5xl"
          >
            {visibleBootLines.map((line, index) => (
              <div
                key={index}
                className={`whitespace-pre-wrap break-words font-mono text-xs sm:text-sm ${
                  line === '' ? 'h-2' : ''
                } ${
                  line?.includes('[✓]') ? 'text-red-300 font-bold' : ''
                } ${
                  line?.includes('[') && line?.includes(']') && !line?.includes('[✓]') ? 'text-yellow-400' : ''
                }`}
              >
                {line}
              </div>
            ))}
          </div>
        )}

        {/* Banner Phase */}
        {phase === 'banner' && (
          <motion.div
            key="banner"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            className="w-full flex flex-col items-center justify-center min-h-screen px-2 sm:px-4 md:px-8"
          >
            {/* ASCII Banner */}
            <div
              className="text-red-300 mb-6 sm:mb-8 w-full flex justify-center"
              style={{ fontFamily: 'monospace', letterSpacing: '0.05em', lineHeight: '1.2' }}
            >
              <div style={{ fontFamily: 'Courier New, monospace', letterSpacing: '-0.02em', lineHeight: '1' }}>
                {asciBanner.map((line, i) => (
                  <div 
                    key={i} 
                    className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm lg:text-base whitespace-pre"
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal Prompt */}
            <div
              className="text-center space-y-4 w-full px-2"
            >
              <div className="text-red-400 font-mono text-[10px] xs:text-xs sm:text-sm md:text-base break-words">
                <span className="text-red-300"></span>
                <span>'Welcome to my portfolio'</span>
              </div>

              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                className="text-red-300 text-[10px] xs:text-xs sm:text-sm space-y-2"
              >
                <p>Press <span className="text-yellow-400 font-bold">ENTER</span> to continue</p>
                <p className="text-gray-500 text-[9px] xs:text-xs">or wait 6 seconds...</p>
              </motion.div>

              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-red-400 font-bold text-sm"
              >
                ▋
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
