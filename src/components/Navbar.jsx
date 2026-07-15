import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
  { name: 'Our Story', path: '/story' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Visit Us', path: '/visit' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 pt-4"
      >
        <div
          className={`max-w-6xl mx-auto flex justify-between items-center rounded-full px-5 md:px-7 transition-all duration-500 ${
            isScrolled
              ? 'glass py-2.5 shadow-[0_8px_32px_-12px_rgba(34,21,11,0.25)] border border-cocoa/5'
              : 'py-3.5 bg-transparent'
          }`}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 select-none"
          >
            <img 
              src="/assets/logo.png" 
              alt="S'WICH" 
              className={`h-7 md:h-8 w-auto object-contain transition-all duration-300 ${
                location.pathname === '/' && !isScrolled ? '' : 'invert'
              }`}
              draggable="false"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 font-display text-[0.8rem] font-medium uppercase tracking-[0.12em] rounded-full transition-colors duration-300 ${
                    isActive
                      ? 'text-paper'
                      : location.pathname === '/' && !isScrolled
                      ? 'text-cream/70 hover:text-cream'
                      : 'text-cocoa/70 hover:text-cocoa'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      className={`absolute inset-0 rounded-full ${
                        location.pathname === '/' && !isScrolled ? 'bg-flame' : 'bg-cocoa'
                      }`}
                      transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <MagneticButton className="hidden md:inline-block" strength={0.25}>
            <Link
              to="/menu"
              className="btn-primary !py-2.5 !px-6 !text-[0.72rem]"
            >
              Order Now
            </Link>
          </MagneticButton>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden relative z-50 w-11 h-11 flex flex-col items-center justify-center gap-[5px] rounded-full cursor-pointer transition-colors duration-300 ${
              location.pathname === '/' && !isScrolled && !isOpen
                ? 'bg-cream/20 backdrop-blur-md text-cream'
                : 'bg-cocoa text-paper'
            }`}
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="w-5 h-[2px] bg-current rounded-full"
            />
            <motion.span
              animate={isOpen ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
              className="w-5 h-[2px] bg-current rounded-full"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
              className="w-5 h-[2px] bg-current rounded-full"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 52px) 44px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 52px) 44px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 52px) 44px)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-cocoa text-cream flex flex-col justify-between px-8 pt-28 pb-10 md:hidden"
          >
            {/* Giant ghost word */}
            <div
              aria-hidden="true"
              className="absolute -right-8 bottom-24 font-display font-bold text-[10rem] leading-none text-paper/[0.04] select-none pointer-events-none -rotate-90 origin-bottom-right"
            >
              S'WICH
            </div>

            <div className="flex flex-col gap-2">
              {navLinks.map((link, idx) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25 + idx * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={link.path}
                      className={`font-display text-[2.6rem] font-semibold tracking-tight leading-[1.15] flex items-baseline gap-3 ${
                        isActive ? 'text-flame' : 'text-cream'
                      }`}
                    >
                      <span className="hand-note text-lg text-butter/70">0{idx + 1}</span>
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="border-t border-cream/10 pt-6 flex flex-col gap-4"
            >
              <a
                href="https://www.instagram.com/swich.ixu"
                target="_blank"
                rel="noopener noreferrer"
                className="hand-note text-2xl text-butter"
              >
                @swich.ixu ↗
              </a>
              <p className="text-xs uppercase tracking-[0.2em] text-cream/40 font-medium">
                Paithan Road · Chhatrapati Sambhajinagar
              </p>
              <div className="flex gap-3">
                <a
                  href="https://wa.me/919999999999?text=Hey%20S'wich!%20I'd%20love%20to%20place%20an%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex-1 !py-3.5"
                >
                  WhatsApp Order
                </a>
                <Link to="/menu" className="btn-ghost flex-1 !py-3.5 !text-cream !border-cream/30">
                  View Menu
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
