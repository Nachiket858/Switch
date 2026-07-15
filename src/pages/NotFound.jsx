import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-6 text-center select-none relative overflow-hidden">
      <div className="glow glow-butter w-[26rem] h-[26rem] -top-20 -right-24" />
      <div className="glow glow-flame w-[22rem] h-[22rem] bottom-0 -left-24" />

      {/* Bitten sandwich 404 */}
      <motion.div
        animate={{ rotate: [0, -3, 3, 0], y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="relative mb-10"
      >
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-56 h-14 rounded-t-full rounded-b-xl bg-gradient-to-b from-[#E8A54B] to-[#C97F2E] shadow-soft relative">
            {[20, 45, 70].map((l, i) => (
              <span key={i} className="absolute w-2 h-1 rounded-full bg-[#FFF3DC]/80 rotate-12" style={{ left: `${l}%`, top: `${30 + i * 12}%` }} />
            ))}
          </div>
          <div className="w-60 h-5 bg-pista" style={{ borderRadius: '50% 45% 55% 40% / 90% 80% 85% 95%' }} />
          <div className="w-52 h-12 rounded-xl bg-paper shadow-soft flex items-center justify-center font-display font-semibold text-3xl text-cocoa tracking-tight">
            404
          </div>
          <div className="w-56 h-4 bg-butter rounded-sm rotate-[-1deg]" />
          <div className="w-56 h-9 rounded-b-[1.6rem] rounded-t-lg bg-gradient-to-b from-[#D99441] to-[#B87428]" />
        </div>

        {/* Bite marks */}
        <div className="absolute -right-4 top-6 w-14 h-14 bg-cream rounded-full" />
        <div className="absolute -right-1 top-16 w-10 h-10 bg-cream rounded-full" />

        <span className="absolute -top-4 -right-14 sticker bg-butter text-cocoa shadow-soft rotate-6">
          <i className="fa-solid fa-cookie-bite" /> bitten!
        </span>
      </motion.div>

      <h1 className="font-display font-semibold text-[clamp(2.4rem,6vw,4.5rem)] tracking-tight text-cocoa mb-4 leading-none">
        Someone Ate<br />This Page.
      </h1>
      <p className="text-cocoa/55 text-base max-w-md mb-9 leading-relaxed">
        Nothing but crumbs here. Let's get you back to the fresh stuff —
        <span className="hand-note text-flame text-xl ml-1">the shakes miss you.</span>
      </p>

      <MagneticButton>
        <Link to="/" className="btn-primary">
          <Home className="w-4 h-4" /> Back to Home
        </Link>
      </MagneticButton>
    </div>
  );
}
