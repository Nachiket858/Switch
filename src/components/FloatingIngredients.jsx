import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Ambient floating food icons with scroll parallax (Font Awesome, brand-tinted).
const DEFAULT_ITEMS = [
  { icon: 'fa-burger', color: 'text-flame/35', top: '14%', left: '5%', size: 'text-4xl', depth: -60, rot: -12, delay: 0 },
  { icon: 'fa-cheese', color: 'text-butter/50', top: '22%', right: '7%', size: 'text-5xl', depth: -110, rot: 10, delay: 1.2 },
  { icon: 'fa-leaf', color: 'text-pista/50', top: '60%', left: '4%', size: 'text-4xl', depth: -80, rot: 8, delay: 0.6 },
  { icon: 'fa-pepper-hot', color: 'text-flame/40', top: '72%', right: '5%', size: 'text-3xl', depth: -140, rot: -8, delay: 1.8 },
  { icon: 'fa-ice-cream', color: 'text-cocoa/25', top: '38%', right: '22%', size: 'text-3xl', depth: -50, rot: 14, delay: 0.3 },
  { icon: 'fa-bread-slice', color: 'text-butter/40', top: '82%', left: '16%', size: 'text-3xl', depth: -100, rot: -16, delay: 2.2 },
];

function FloatingItem({ item, progress }) {
  const y = useTransform(progress, [0, 1], [0, item.depth]);
  return (
    <motion.span
      style={{
        y,
        top: item.top,
        left: item.left,
        right: item.right,
        '--float-rot': `${item.rot}deg`,
        '--float-delay': `${item.delay}s`,
        '--float-dur': `${5.5 + item.delay}s`,
      }}
      className={`absolute animate-floaty ${item.size} ${item.color} pointer-events-none select-none`}
      aria-hidden="true"
    >
      <i className={`fa-solid ${item.icon}`} />
    </motion.span>
  );
}

export default function FloatingIngredients({ items = DEFAULT_ITEMS, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {items.map((item, i) => (
        <FloatingItem key={i} item={item} progress={scrollYProgress} />
      ))}
    </div>
  );
}
