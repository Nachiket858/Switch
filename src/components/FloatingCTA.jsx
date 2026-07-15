import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageSquare, X, ShoppingBag, MapPin, ExternalLink } from 'lucide-react';

export default function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen(!isOpen);

  const orderChannels = [
    {
      name: 'Order via Swiggy',
      desc: 'Superfast delivery (30–40 min)',
      color: 'bg-[#FC8019] text-white',
      link: 'https://swiggy.com',
      icon: <ShoppingBag className="w-5 h-5" />,
    },
    {
      name: 'Order via Zomato',
      desc: 'Top rated for delivery (4.5★)',
      color: 'bg-[#CB202D] text-white',
      link: 'https://zomato.com',
      icon: <ShoppingBag className="w-5 h-5" />,
    },
    {
      name: 'Order on WhatsApp',
      desc: 'Quick support & custom orders',
      color: 'bg-[#25D366] text-white',
      link: "https://wa.me/919999999999?text=Hey%20S'wich,%20I'd%20love%20to%20place%20an%20order!",
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      name: 'Call for Pickup',
      desc: 'Zero delivery fees · ready in 15 min',
      color: 'bg-cocoa text-cream',
      link: 'tel:+919999999999',
      icon: <Phone className="w-5 h-5" />,
    },
  ];

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
        <motion.button
          onClick={toggleDrawer}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.94 }}
          className="pointer-events-auto btn-primary !text-[0.75rem] shadow-glow"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Order Now</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleDrawer}
              className="fixed inset-0 z-50 bg-cocoa/50 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '110%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 240 }}
              className="fixed bottom-0 left-0 right-0 md:left-auto md:right-6 md:bottom-6 z-50 md:w-[400px] bg-paper rounded-t-[2rem] md:rounded-[2rem] p-7 shadow-lift flex flex-col gap-6"
            >
              <div className="flex justify-between items-center border-b border-cocoa/8 pb-5">
                <div className="flex flex-col">
                  <h3 className="font-display text-xl font-semibold text-cocoa">
                    Satisfy the craving
                  </h3>
                  <span className="text-[0.7rem] font-semibold text-flame uppercase tracking-[0.14em] mt-0.5">
                    Open until 11:00 PM daily
                  </span>
                </div>
                <button
                  onClick={toggleDrawer}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-cream hover:bg-cocoa hover:text-cream transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {orderChannels.map((chan, idx) => (
                  <motion.a
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + idx * 0.06 }}
                    href={chan.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between p-4 rounded-2xl shadow-soft hover:-translate-y-0.5 hover:shadow-lift transition-all cursor-pointer ${chan.color}`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="p-2 bg-white/15 rounded-xl">{chan.icon}</div>
                      <div className="flex flex-col text-left">
                        <span className="font-display font-semibold text-sm tracking-wide">
                          {chan.name}
                        </span>
                        <span className="text-xs opacity-80 leading-none mt-1">{chan.desc}</span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 opacity-70" />
                  </motion.a>
                ))}
              </div>

              <div className="flex items-start gap-2.5 bg-blush/60 rounded-2xl p-4 text-xs leading-relaxed">
                <MapPin className="w-4 h-4 text-flame shrink-0 mt-0.5" />
                <p className="text-cocoa/75">
                  <strong>Pickup:</strong> Paithan Rd, Kanchanwadi, Chhatrapati Sambhajinagar
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
