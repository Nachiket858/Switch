import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroLoader({ onComplete }) {
  const [isFinished, setIsFinished] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem('swich_loader_seen');
    if (seen === 'true') {
      onComplete();
      setHasLoaded(true);
    } else {
      const timer = setTimeout(() => handleComplete(), 2100);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem('swich_loader_seen', 'true');
    setIsFinished(true);
    setTimeout(() => onComplete(), 700);
  };

  if (hasLoaded) return null;

  const word = ['S', "'", 'w', 'i', 'c', 'h'];

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          exit={{ y: '-100%', borderBottomLeftRadius: '50% 12%', borderBottomRightRadius: '50% 12%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-cocoa text-cream overflow-hidden"
        >
          {/* Soft gradient glow */}
          <div className="absolute w-[60vw] h-[60vw] rounded-full bg-flame/15 blur-[120px] pointer-events-none" />

          <button
            onClick={handleComplete}
            className="absolute top-8 right-8 px-5 py-2 rounded-full border border-cream/20 text-[0.65rem] font-display font-medium tracking-[0.2em] text-cream/70 uppercase hover:bg-cream hover:text-cocoa transition-all duration-300 cursor-pointer z-10"
          >
            Skip →
          </button>

          {/* Letters */}
          <div className="flex items-baseline overflow-hidden py-4 select-none">
            {word.map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: 140, opacity: 0, rotate: 8 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.15 + index * 0.07,
                }}
                className={`text-7xl md:text-[9rem] font-display font-semibold tracking-tight inline-block leading-none ${
                  char === "'" ? 'text-flame' : 'text-cream'
                }`}
              >
                {char}
              </motion.span>
            ))}
          </div>

          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="hand-note text-2xl md:text-3xl text-butter rotate-[-2deg]"
          >
            one s'wich, zero regrets
          </motion.span>

          {/* Progress line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            className="absolute bottom-16 w-40 h-[2px] bg-flame origin-left rounded-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
