import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import InstagramIcon from '../components/InstagramIcon';
import Reveal from '../components/Reveal';
import SplitText from '../components/SplitText';
import MagneticButton from '../components/MagneticButton';

const galleryItems = [
  {
    id: 0,
    url: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=900&q=80',
    title: "The S'wich Crew",
    tag: '#Vibes',
    size: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80',
    title: 'Supreme Cheese Pull',
    tag: "#S'wiches",
    size: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80',
    title: 'Double Choc Thickshake',
    tag: '#Shakes',
    size: 'md:col-span-1 md:row-span-2',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80',
    title: 'Late Night Chill',
    tag: '#Vibes',
    size: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=900&q=80',
    title: 'Loaded Peri Fries',
    tag: '#Sides',
    size: 'md:col-span-2 md:row-span-1',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=900&q=80',
    title: 'Fresh Daily Prep',
    tag: '#BehindTheKitchen',
    size: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=80',
    title: 'Mint Lime Mojito',
    tag: '#Coolers',
    size: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&w=900&q=80',
    title: 'Brewing Good Times',
    tag: '#BehindTheKitchen',
    size: 'md:col-span-2 md:row-span-1',
  },
];

export default function Gallery() {
  const [activeIdx, setActiveIdx] = useState(null);

  const handleNext = useCallback(() => {
    setActiveIdx((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
  }, []);
  const handlePrev = useCallback(() => {
    setActiveIdx((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    if (activeIdx === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveIdx(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIdx, handleNext, handlePrev]);

  return (
    <div className="flex-1 relative overflow-hidden">
      <div className="glow glow-blush w-[28rem] h-[28rem] -top-20 -left-24" />
      <div className="glow glow-butter w-[26rem] h-[26rem] bottom-10 -right-24" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <Reveal>
            <span className="sticker bg-paper shadow-soft text-flame mb-5">
              <InstagramIcon className="w-3.5 h-3.5" /> Community gallery
            </span>
          </Reveal>
          <h1 className="font-display font-semibold text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.95] tracking-tight text-cocoa">
            <SplitText text="The Feed," stagger={0.03} /><br />
            <span className="text-flame"><SplitText text="But Bigger." stagger={0.03} delay={0.15} /></span>
          </h1>
          <Reveal delay={0.25}>
            <p className="text-cocoa/60 mt-4 font-medium">
              Cheese pulls, shake drips, and pure dopamine.
              <span className="hand-note text-flame text-xl ml-1.5">tag @swich.ixu to get featured!</span>
            </p>
          </Reveal>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 auto-rows-[220px]">
          {galleryItems.map((item, i) => (
            <Reveal key={item.id} delay={(i % 4) * 0.07} className={item.size}>
              <motion.button
                onClick={() => setActiveIdx(item.id)}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="w-full h-full rounded-[1.6rem] overflow-hidden relative group cursor-pointer shadow-soft hover:shadow-lift text-left block"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover img-warm group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cocoa/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute inset-0 p-5 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  <span className="self-end sticker !py-1 !px-3 !text-[0.58rem] glass text-cocoa">
                    {item.tag}
                  </span>
                  <div className="flex items-center justify-between text-cream">
                    <span className="font-display font-semibold text-sm tracking-tight translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                      {item.title}
                    </span>
                    <Heart className="w-4 h-4" />
                  </div>
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>

        {/* Follow CTA */}
        <Reveal className="text-center mt-16">
          <MagneticButton>
            <a
              href="https://www.instagram.com/swich.ixu"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !px-10"
            >
              <InstagramIcon className="w-4 h-4" /> Follow @swich.ixu
            </a>
          </MagneticButton>
        </Reveal>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-cocoa/95 backdrop-blur-md flex flex-col items-center justify-center p-6 select-none"
          >
            <button
              onClick={() => setActiveIdx(null)}
              className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center rounded-full bg-cream/10 text-cream hover:bg-flame transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 w-11 h-11 flex items-center justify-center rounded-full bg-cream/10 text-cream hover:bg-flame transition-colors cursor-pointer z-10"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="max-w-4xl max-h-[75vh] flex flex-col items-center gap-5 px-10">
              <motion.img
                key={activeIdx}
                initial={{ opacity: 0, scale: 0.94, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                src={galleryItems[activeIdx].url}
                alt={galleryItems[activeIdx].title}
                className="max-w-full max-h-[62vh] object-contain rounded-[1.6rem] shadow-lift"
              />
              <div className="text-center flex flex-col items-center gap-1.5">
                <span className="font-display font-semibold text-lg md:text-xl text-cream tracking-tight">
                  {galleryItems[activeIdx].title}
                </span>
                <span className="hand-note text-lg text-butter">{galleryItems[activeIdx].tag}</span>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 w-11 h-11 flex items-center justify-center rounded-full bg-cream/10 text-cream hover:bg-flame transition-colors cursor-pointer z-10"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
