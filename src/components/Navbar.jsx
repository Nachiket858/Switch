import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
  { name: 'Our Story', path: '/story' },
  { name: 'Visit Us', path: '/visit' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Hamburger Custom SVG Path helper
  const Path = (props) => (
    <motion.path
      fill="transparent"
      strokeWidth="3"
      stroke="currentColor"
      strokeLinecap="round"
      {...props}
    />
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-cream/80 backdrop-blur-xl border-b border-charcoal/15 shadow-sm'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-1.5 font-display text-3xl font-black tracking-tighter text-charcoal select-none cursor-pointer"
          >
            <span className="group-hover:text-brand-red transition-colors duration-200">S'wich</span>
            <span className="w-2.5 h-2.5 rounded-full bg-brand-red group-hover:bg-brand-lime transition-colors duration-200"></span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative group font-display text-sm font-semibold uppercase tracking-wider text-charcoal py-1 cursor-pointer"
                >
                  <span className="relative z-10 group-hover:text-brand-red transition-colors duration-200">
                    {link.name}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-red"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-lime group-hover:w-full transition-all duration-300" />
                </Link>
              );
            })}

            {/* Desktop Order Now Header CTA */}
            <Link
              to="/menu"
              className="px-5 py-2 bg-brand-red text-cream font-display text-xs font-bold uppercase tracking-widest rounded-full border-2 border-charcoal shadow-[3px_3px_0px_0px_#1A1410] hover:shadow-[0px_0px_0px_0px_#1A1410] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-150 cursor-pointer"
            >
              Order Now
            </Link>
          </div>

          {/* Mobile Hamburguer Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center p-2 rounded-full border-2 border-charcoal bg-cream text-charcoal hover:bg-brand-lime transition-all duration-200 focus:outline-none z-50 cursor-pointer"
            aria-label="Toggle Menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" className="w-5 h-5">
              <Path
                variants={{
                  closed: { d: 'M 2 4.5 L 18 4.5' },
                  open: { d: 'M 4 16 L 16 4' },
                }}
                animate={isOpen ? 'open' : 'closed'}
              />
              <Path
                d="M 2 9.5 L 18 9.5"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                transition={{ duration: 0.15 }}
                animate={isOpen ? 'open' : 'closed'}
              />
              <Path
                variants={{
                  closed: { d: 'M 2 14.5 L 18 14.5' },
                  open: { d: 'M 4 4 L 16 16' },
                }}
                animate={isOpen ? 'open' : 'closed'}
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Full-screen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-charcoal text-cream flex flex-col justify-between p-8 pt-28 overflow-hidden md:hidden"
          >
            {/* Background design elements / stickers */}
            <div className="absolute right-[-40px] bottom-[15%] text-[14rem] font-display font-black text-brand-red/10 leading-none select-none pointer-events-none -rotate-12">
              S'WICH
            </div>
            
            <div className="flex flex-col gap-6 font-display">
              {navLinks.map((link, idx) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.08 + 0.1, duration: 0.4 }}
                  >
                    <Link
                      to={link.path}
                      className={`text-4xl font-extrabold uppercase tracking-tight flex items-center gap-4 group cursor-pointer ${
                        isActive ? 'text-brand-lime' : 'text-cream hover:text-brand-red'
                      }`}
                    >
                      <span className="text-sm font-sans font-medium text-brand-red/60">0{idx + 1}.</span>
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="border-t border-cream/15 pt-6 flex flex-col gap-4"
            >
              <p className="text-xs uppercase tracking-widest text-cream/60 font-sans">
                Gut No 20, Paithan Road, Chhatrapati Sambhajinagar
              </p>
              <div className="flex gap-4">
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-brand-lime text-charcoal font-display text-xs font-bold uppercase tracking-wider rounded-lg text-center"
                >
                  WhatsApp Order
                </a>
                <Link
                  to="/menu"
                  className="px-4 py-2 bg-brand-red text-cream font-display text-xs font-bold uppercase tracking-wider rounded-lg text-center border border-cream/20"
                >
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
