import { motion } from 'framer-motion';

// Fade + slide reveal on scroll (transform/opacity only — filters are too costly to animate).
// Direction: 'up' | 'down' | 'left' | 'right' | 'scale'
const offsets = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 48 },
  right: { x: -48 },
  scale: { scale: 0.92 },
};

export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.75,
  className = '',
  once = true,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, margin: '-8% 0px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
