import { Link } from 'react-router-dom';
import { ArrowUpRight, Heart, Navigation, Phone } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-charcoal text-cream border-t-4 border-charcoal relative overflow-hidden mt-auto">
      {/* Ticker Ribbon */}
      <div className="w-full bg-brand-lime text-charcoal py-4 overflow-hidden border-b-2 border-charcoal select-none font-display font-black text-lg md:text-2xl uppercase tracking-wider -rotate-1 relative z-10 scale-[1.02]">
        <div className="animate-marquee flex whitespace-nowrap">
          <span className="mx-4">⚡ MAKE THE S'WICH •</span>
          <span className="mx-4">ONE S'WICH, ZERO REGRETS •</span>
          <span className="mx-4">🍔 4.8★ RATED (385+ REVIEWS) •</span>
          <span className="mx-4">🥤 SHAKES & SANDWICHES •</span>
          <span className="mx-4">⏰ OPEN DAILY UNTIL 11 PM •</span>
          <span className="mx-4">⚡ MAKE THE S'WICH •</span>
          <span className="mx-4">ONE S'WICH, ZERO REGRETS •</span>
          <span className="mx-4">🍔 4.8★ RATED (385+ REVIEWS) •</span>
          <span className="mx-4">🥤 SHAKES & SANDWICHES •</span>
          <span className="mx-4">⏰ OPEN DAILY UNTIL 11 PM •</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-12 gap-12 items-start relative z-10">
        {/* Brand/Bio */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <Link
            to="/"
            onClick={scrollToTop}
            className="font-display text-4xl md:text-5xl font-black tracking-tighter text-cream flex items-center gap-2"
          >
            S'wich<span className="w-3 h-3 rounded-full bg-brand-red"></span>
          </Link>
          <p className="text-cream/80 max-w-sm text-base leading-relaxed">
            We're here to save you from boring sandwiches and sad shakes. High energy, massive flavors, zero regrets. Built for the late-night cravings and mid-day munchies.
          </p>
          <div className="flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-cream/5 border border-cream/10 rounded-full hover:bg-brand-red hover:text-charcoal hover:border-charcoal transition-all duration-300 hover-wiggle cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-cream/5 border border-cream/10 rounded-full hover:bg-brand-red hover:text-charcoal hover:border-charcoal transition-all duration-300 hover-wiggle cursor-pointer"
            >
              <Navigation className="w-5 h-5" />
            </a>
            <a
              href="tel:+919999999999"
              className="p-3 bg-cream/5 border border-cream/10 rounded-full hover:bg-brand-red hover:text-charcoal hover:border-charcoal transition-all duration-300 hover-wiggle cursor-pointer"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h4 className="font-display text-sm font-bold uppercase tracking-widest text-brand-red">
            Hungry?
          </h4>
          <ul className="flex flex-col gap-3 font-display text-base font-semibold">
            <li>
              <Link to="/menu" onClick={scrollToTop} className="hover:text-brand-lime transition-colors duration-200">
                Full Menu
              </Link>
            </li>
            <li>
              <Link to="/story" onClick={scrollToTop} className="hover:text-brand-lime transition-colors duration-200">
                Our Story
              </Link>
            </li>
            <li>
              <Link to="/gallery" onClick={scrollToTop} className="hover:text-brand-lime transition-colors duration-200">
                Vibe Gallery
              </Link>
            </li>
            <li>
              <Link to="/visit" onClick={scrollToTop} className="hover:text-brand-lime transition-colors duration-200">
                Find Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Location & Info */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <h4 className="font-display text-sm font-bold uppercase tracking-widest text-brand-red">
            Drop By
          </h4>
          <p className="text-cream/80 text-sm leading-relaxed max-w-xs">
            Gut No 20, Plot No 5, Paithan Road,<br />
            Opposite Dhillon Residency, Kanchanwadi,<br />
            Chhatrapati Sambhajinagar, Maharashtra 431011
          </p>
          <div className="flex flex-col gap-1.5 font-display text-sm font-semibold mt-2">
            <span className="text-brand-lime">⏰ Open daily: 11:00 AM - 11:00 PM</span>
            <span>📞 Call us: +91 99999 99999</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full border-t border-cream/10 py-8 px-6 md:px-12 text-center text-xs text-cream/50 relative z-10 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-4">
        <span>© {new Date().getFullYear()} S'wich. All rights reserved.</span>
        <button
          onClick={scrollToTop}
          className="font-display uppercase tracking-widest text-brand-lime font-black hover:text-brand-red flex items-center gap-1 group cursor-pointer"
        >
          Back To Top <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>
        <span className="flex items-center gap-1">
          Made with <Heart className="w-3.5 h-3.5 fill-brand-red stroke-brand-red animate-pulse" /> in India
        </span>
      </div>
    </footer>
  );
}
