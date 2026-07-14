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
      const timer = setTimeout(() => {
        handleComplete();
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem('swich_loader_seen', 'true');
    setIsFinished(true);
    setTimeout(() => {
      onComplete();
    }, 600); // Matches exit transition duration
  };

  if (hasLoaded) return null;

  const containerVariants = {
    exit: {
      y: '-100vh',
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1], // Custom snappy slide-up
      }
    }
  };

  const letterVariants = {
    initial: { y: 150, rotate: 15, opacity: 0 },
    animate: (i) => ({
      y: 0,
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.175, 0.885, 0.32, 1.275], // Snappy overshoot bounce
        delay: i * 0.08,
      }
    })
  };

  const word = ['S', "'", 'w', 'i', 'c', 'h'];

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          variants={containerVariants}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-charcoal text-cream overflow-hidden"
        >
          {/* Skip Button */}
          <button
            onClick={handleComplete}
            className="absolute top-8 right-8 px-5 py-2 border-2 border-brand-red rounded-full text-xs font-display tracking-widest text-brand-lime uppercase transition-all duration-300 hover:bg-brand-red hover:text-charcoal active:scale-95 z-50 cursor-pointer"
          >
            Skip Intro →
          </button>

          {/* Letter Cluster */}
          <div className="flex select-none overflow-hidden py-4 items-center justify-center">
            {word.map((char, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={letterVariants}
                initial="initial"
                animate="animate"
                className={`text-6xl md:text-9xl font-display font-black inline-block leading-none ${
                  char === "'" ? 'text-brand-lime' : index % 2 === 0 ? 'text-brand-red' : 'text-cream'
                }`}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Brand Manifesto Sticker */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: -4 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="mt-6 px-4 py-2 bg-brand-lime text-charcoal font-display text-xs font-bold uppercase tracking-wider rounded border-2 border-charcoal shadow-[4px_4px_0px_0px_#FF4D2E]"
          >
            One S'wich, Zero Regrets
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
