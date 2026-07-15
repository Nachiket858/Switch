import { Link } from 'react-router-dom';
import { ArrowUpRight, Heart, Navigation, Phone } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import Marquee from './Marquee';
import MagneticButton from './MagneticButton';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="w-full relative mt-auto">
      {/* Curved packaging-style transition into the footer */}
      <div className="bg-cream">
        <svg viewBox="0 0 1440 80" className="w-full block" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 80 C 360 0 1080 0 1440 80 L 1440 80 L 0 80 Z" fill="#22150B" />
        </svg>
      </div>

      <div className="bg-cocoa text-cream relative overflow-hidden">
        {/* Marquee ribbon */}
        <Marquee
          items={['Make the S\'wich', 'Thick Gelato Shakes', 'Loaded Sandwiches', 'Open Daily 11–11', 'Chhatrapati Sambhajinagar']}
          className="py-5 border-b border-cream/10"
          itemClassName="font-display text-xl md:text-3xl font-semibold uppercase tracking-tight text-cream/90"
        />

        {/* Giant CTA */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 pt-20 pb-14 flex flex-col items-center text-center gap-8">
          <span className="hand-note text-2xl text-butter rotate-[-2deg]">craving something?</span>
          <h2 className="font-display font-semibold text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.95] tracking-tight">
            Let's Make<br />
            <span className="text-flame">The S'wich.</span>
          </h2>
          <MagneticButton>
            <a
              href="https://wa.me/919999999999?text=Hey%20S'wich!%20I'd%20love%20to%20place%20an%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !text-sm !px-10 !py-5"
            >
              Order on WhatsApp <ArrowUpRight className="w-4 h-4" />
            </a>
          </MagneticButton>
        </div>

        {/* Info grid */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-14 grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-cream/10">
          <div className="md:col-span-5 flex flex-col gap-5">
            <Link to="/" onClick={scrollToTop} className="font-display text-3xl font-semibold tracking-tight">
              S<span className="text-flame">'</span>wich
              <span className="inline-block w-2 h-2 rounded-full bg-flame ml-1.5" />
            </Link>
            <p className="text-cream/60 max-w-sm text-sm leading-relaxed">
              Loaded sandwiches, gelato-thick shakes, and a spot that feels like your
              favorite playlist. Built for late-night cravings and mid-day munchies.
            </p>
            <div className="flex gap-3">
              {[
                { href: 'https://www.instagram.com/swich.ixu', icon: <InstagramIcon className="w-4.5 h-4.5" />, label: 'Instagram' },
                { href: 'https://google.com/maps', icon: <Navigation className="w-4.5 h-4.5" />, label: 'Directions' },
                { href: 'tel:+919999999999', icon: <Phone className="w-4.5 h-4.5" />, label: 'Call' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-11 h-11 flex items-center justify-center rounded-full border border-cream/15 text-cream/70 hover:bg-flame hover:border-flame hover:text-paper hover:-translate-y-1 transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-butter">
              Explore
            </h4>
            <ul className="flex flex-col gap-2.5 font-display text-base font-medium">
              {[
                { name: 'Full Menu', path: '/menu' },
                { name: 'Our Story', path: '/story' },
                { name: 'The Feed', path: '/gallery' },
                { name: 'Find Us', path: '/visit' },
                { name: 'Contact', path: '/contact' },
              ].map((l) => (
                <li key={l.path}>
                  <Link
                    to={l.path}
                    onClick={scrollToTop}
                    className="text-cream/70 hover:text-flame hover:pl-2 transition-all duration-300"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-butter">
              Drop By
            </h4>
            <p className="text-cream/60 text-sm leading-relaxed max-w-xs">
              Gut No 20, Plot No 5, Paithan Road,<br />
              Opposite Dhillon Residency, Kanchanwadi,<br />
              Chhatrapati Sambhajinagar, Maharashtra 431011
            </p>
            <div className="flex flex-col gap-1.5 text-sm font-medium">
              <span className="text-pista flex items-center gap-2">
                <i className="fa-regular fa-clock text-xs" /> Open daily · 11:00 AM – 11:00 PM
              </span>
              <span className="text-cream/70 flex items-center gap-2">
                <i className="fa-solid fa-phone text-xs" /> +91 99999 99999
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cream/10">
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-[0.7rem] uppercase tracking-[0.16em] text-cream/40">
            <span>© {new Date().getFullYear()} S'wich · All rights reserved</span>
            <button
              onClick={scrollToTop}
              className="font-display font-semibold text-butter hover:text-flame flex items-center gap-1 group cursor-pointer tracking-[0.16em]"
            >
              Back to top
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <span className="flex items-center gap-1.5 normal-case tracking-normal">
              Made with <Heart className="w-3 h-3 fill-flame stroke-flame" /> in Sambhajinagar
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
