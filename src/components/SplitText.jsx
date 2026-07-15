import { motion } from 'framer-motion';

// Character-by-character heading reveal — canonical parent/child variant
// orchestration (single viewport observer, transforms only).
const charVariants = {
  hidden: { y: '110%', rotate: 6, opacity: 0 },
  visible: {
    y: '0%',
    rotate: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SplitText({
  text,
  className = '',
  charClassName = '',
  delay = 0,
  stagger = 0.028,
  once = true,
}) {
  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  return (
    <motion.span
      className={`inline ${className}`}
      aria-label={text}
      role="text"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.4 }}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split('').map((char, ci) => (
            <span key={ci} className="inline-block overflow-hidden align-bottom">
              <motion.span variants={charVariants} className={`inline-block ${charClassName}`}>
                {char}
              </motion.span>
            </span>
          ))}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}
