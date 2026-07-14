import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-6 text-center select-none">
      {/* 404 Bitten Sandwich Animation */}
      <div className="relative mb-8">
        <motion.div
          animate={{
            rotate: [0, -5, 5, -5, 0],
            y: [0, -5, 0, -5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: 'easeInOut',
          }}
          className="w-48 h-48 bg-brand-red rounded-3xl border-4 border-charcoal relative flex items-center justify-center shadow-[8px_8px_0px_0px_#1A1410] overflow-hidden"
        >
          {/* Sandwich Layers */}
          <div className="w-40 h-8 bg-brand-lime border-y-4 border-charcoal absolute top-[25%]" />
          <div className="w-40 h-10 bg-cream border-y-4 border-charcoal absolute top-[40%] flex items-center justify-center font-display font-black text-2xl text-charcoal">
            404
          </div>
          <div className="w-40 h-8 bg-brand-lime border-y-4 border-charcoal absolute bottom-[25%]" />

          {/* Bite Cutouts */}
          <div className="absolute right-[-15px] top-[30%] w-12 h-12 bg-cream rounded-full border-4 border-charcoal" />
          <div className="absolute right-[-5px] top-[40%] w-10 h-10 bg-cream rounded-full border-4 border-charcoal" />
          <div className="absolute right-[-15px] top-[50%] w-12 h-12 bg-cream rounded-full border-4 border-charcoal" />
        </motion.div>
        
        {/* Playful Pop Sticker */}
        <div className="absolute top-[-15px] right-[-30px] bg-brand-lime text-charcoal border-2 border-charcoal font-display text-xs font-bold uppercase tracking-wider py-1 px-3 rotate-12 shadow-[3px_3px_0px_0px_#1A1410]">
          Bitten! 😋
        </div>
      </div>

      <h1 className="font-display text-4xl md:text-6xl font-black tracking-tight text-charcoal mb-4">
        Whoops! Page Missing
      </h1>
      <p className="text-charcoal/70 text-base md:text-lg max-w-md mb-8">
        Did someone eat this page? Or did you make a wrong turn? Either way, there's nothing but crumbs here. Let's get you back to the fresh stuff.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-brand-lime text-charcoal font-display text-sm font-black uppercase tracking-wider rounded-xl border-2 border-charcoal shadow-[4px_4px_0px_0px_#1A1410] hover:shadow-[2px_2px_0px_0px_#1A1410] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 flex items-center gap-2 cursor-pointer"
      >
        <Home className="w-4 h-4" />
        <span>Back to Safety (Home)</span>
      </Link>
    </div>
  );
}
