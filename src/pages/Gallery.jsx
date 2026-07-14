import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const galleryItems = [
  {
    id: 0,
    url: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80',
    title: 'The S\'wich Crew',
    tag: '#Vibes',
    size: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    title: 'Supreme Cheese Pull',
    tag: '#Sandwiches',
    size: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    title: 'Double Choc Thickshake',
    tag: '#Shakes',
    size: 'md:col-span-1 md:row-span-2',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    title: 'Late Night Chill AC',
    tag: '#Vibes',
    size: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80',
    title: 'Loaded Peri Fries',
    tag: '#Sides',
    size: 'md:col-span-2 md:row-span-1',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80',
    title: 'Fresh Daily Prep',
    tag: '#Kitchen',
    size: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
    title: 'Iced Lemon Mint Tea',
    tag: '#Drinks',
    size: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&w=800&q=80',
    title: 'Brewing Good Times',
    tag: '#Kitchen',
    size: 'md:col-span-2 md:row-span-1',
  },
];

export default function Gallery() {
  const [activeIdx, setActiveIdx] = useState(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activeIdx === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveIdx(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIdx]);

  const handleNext = () => {
    setActiveIdx((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex-1">
      {/* Page Header */}
      <div className="text-center mb-12">
        <span className="px-3 py-1 bg-brand-red text-cream font-display text-xs font-bold uppercase tracking-widest rounded border border-charcoal inline-block mb-3 -rotate-2">
          #SwithUs
        </span>
        <h1 className="font-display text-4xl md:text-6xl font-black tracking-tight text-charcoal">
          The S'wich Feed
        </h1>
        <p className="text-charcoal/70 mt-3 font-medium">
          Dope sandwiches, thick shakes, and pure dopamine. Tag us on socials to get featured!
        </p>
      </div>

      {/* Asymmetric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[220px]">
        {galleryItems.map((item) => (
          <motion.div
            key={item.id}
            onClick={() => setActiveIdx(item.id)}
            whileHover={{ scale: 1.02 }}
            className={`border-2 border-charcoal rounded-2xl overflow-hidden relative group cursor-pointer shadow-[4px_4px_0px_0px_#1A1410] hover:shadow-[1px_1px_0px_0px_#1A1410] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200 ${item.size}`}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-between p-4">
              <span className="self-end px-2.5 py-1 bg-brand-lime text-charcoal border border-charcoal text-[10px] font-display font-black uppercase rounded shadow-[1px_1px_0px_0px_#1a1410]">
                {item.tag}
              </span>
              <div className="flex justify-between items-center text-cream">
                <span className="font-display font-black text-sm uppercase tracking-wide">
                  {item.title}
                </span>
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>

            {/* Image */}
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-full object-cover filter saturate-100 group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/95 flex flex-col items-center justify-center p-6 select-none"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveIdx(null)}
              className="absolute top-6 right-6 p-2 rounded-full border-2 border-cream text-cream hover:bg-brand-red hover:text-charcoal hover:border-charcoal transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-6 p-2 rounded-full border-2 border-cream text-cream hover:bg-brand-lime hover:text-charcoal hover:border-charcoal transition-colors cursor-pointer z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image Box */}
            <div className="max-w-4xl max-h-[70vh] flex flex-col items-center relative gap-4 px-12">
              <motion.img
                key={activeIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                src={galleryItems[activeIdx].url}
                alt={galleryItems[activeIdx].title}
                className="max-w-full max-h-[60vh] object-contain border-4 border-cream rounded-2xl shadow-2xl"
              />

              <div className="text-center text-cream flex flex-col items-center gap-1">
                <span className="font-display font-black text-lg md:text-xl uppercase tracking-wider">
                  {galleryItems[activeIdx].title}
                </span>
                <span className="px-2 py-0.5 bg-brand-red text-cream border border-cream/20 text-xs font-display font-semibold uppercase rounded">
                  {galleryItems[activeIdx].tag}
                </span>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-6 p-2 rounded-full border-2 border-cream text-cream hover:bg-brand-lime hover:text-charcoal hover:border-charcoal transition-colors cursor-pointer z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
