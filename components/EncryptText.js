'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CHARACTERS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

export default function EncryptText({ text, className = '', duration = 4, staggerDelay = 0.15 }) {
  const [displayText, setDisplayText] = useState(text);
  const [isEncrypted, setIsEncrypted] = useState(true);

  useEffect(() => {
    let interval;
    let currentFrame = 0;
    const totalFrames = Math.ceil(duration * 30); // 30fps for smoother animation

    const getRandomChar = () => CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];

    const animate = () => {
      currentFrame++;
      const progress = currentFrame / totalFrames;

      if (isEncrypted) {
        // Decrypt animation - slowly reveal letters
        if (progress < 1) {
          const newText = text
            .split('')
            .map((char, i) => {
              const charProgress = Math.max(0, progress - i * staggerDelay);
              
              if (charProgress <= 0) {
                // Not started yet - show random char occasionally
                return Math.random() > 0.7 ? char : getRandomChar();
              } else if (charProgress >= 1) {
                // Fully revealed
                return char;
              } else {
                // In transition - gradually show more of real char
                // charProgress goes from 0 to 1, so we show real char more as it increases
                return Math.random() > charProgress ? getRandomChar() : char;
              }
            })
            .join('');
          setDisplayText(newText);
        } else {
          setDisplayText(text);
          setIsEncrypted(false);
        }
      } else {
        // Encrypt animation - slowly hide letters
        if (progress < 1) {
          const newText = text
            .split('')
            .map((char, i) => {
              const charProgress = 1 - Math.max(0, progress - i * staggerDelay);
              
              if (charProgress <= 0) {
                // Fully encrypted
                return getRandomChar();
              } else if (charProgress >= 1) {
                // Still visible
                return char;
              } else {
                // In transition - gradually show less of real char
                return Math.random() > charProgress ? getRandomChar() : char;
              }
            })
            .join('');
          setDisplayText(newText);
        } else {
          setDisplayText(
            text
              .split('')
              .map(() => getRandomChar())
              .join('')
          );
          setIsEncrypted(true);
        }
      }

      if (currentFrame < totalFrames) {
        interval = requestAnimationFrame(animate);
      }
    };

    // Start animation on mount
    interval = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(interval);
  }, [text, isEncrypted, duration, staggerDelay]);

  return (
    <motion.span
      className={className}
      onHoverStart={() => setIsEncrypted(!isEncrypted)}
      style={{ 
        cursor: 'pointer', 
        fontFamily: 'inherit', 
        display: 'inline-block',
        textShadow: '0 0 5px rgba(255, 0, 0, 0.5)',
      }}
      whileHover={{
        textShadow: '0 0 15px rgba(255, 0, 0, 0.8)',
        transition: { duration: 0.3 }
      }}
      title="Hover to encrypt/decrypt"
    >
      {displayText}
    </motion.span>
  );
}