import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageSquare, X, ShoppingBag, MapPin, ExternalLink } from 'lucide-react';

export default function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  // Delivery / Order Options
  const orderChannels = [
    {
      name: 'Order via Swiggy',
      desc: 'Superfast delivery (30-40 min)',
      color: 'bg-[#FC8019] text-white',
      link: 'https://swiggy.com',
      icon: <ShoppingBag className="w-5 h-5" />,
    },
    {
      name: 'Order via Zomato',
      desc: 'Top Rated on Zomato (4.8★)',
      color: 'bg-[#CB202D] text-white',
      link: 'https://zomato.com',
      icon: <ShoppingBag className="w-5 h-5" />,
    },
    {
      name: 'Order on WhatsApp',
      desc: 'Quick support & customized catering',
      color: 'bg-[#25D366] text-white',
      link: 'https://wa.me/919999999999?text=Hey%20S\'wich,%20I\'d%20love%20to%20place%20an%20order!',
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      name: 'Call for Direct Pickup',
      desc: 'Zero delivery charges, ready in 15 mins',
      color: 'bg-charcoal text-cream border border-cream/20',
      link: 'tel:+919999999999',
      icon: <Phone className="w-5 h-5" />,
    },
  ];

  return (
    <>
      {/* Floating CTA Group */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
        {/* WhatsApp Quick Link */}
        <motion.a
          href="https://wa.me/919999999999?text=Hey%20S\'wich,%20I\'d%20love%20to%20place%20an%20order!"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="pointer-events-auto w-12 h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer border-2 border-charcoal btn-bounce hover:shadow-[0px_0px_0px_2px_#FFF8EC]"
          title="Chat on WhatsApp"
        >
          <MessageSquare className="w-6 h-6 fill-current" />
        </motion.a>

        {/* Order Now Button */}
        <motion.button
          onClick={toggleDrawer}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="pointer-events-auto px-6 py-3.5 bg-brand-red text-cream font-display text-sm font-black uppercase tracking-wider rounded-full border-2 border-charcoal shadow-[4px_4px_0px_0px_#1A1410] hover:shadow-[2px_2px_0px_0px_#1A1410] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer flex items-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Order Now</span>
        </motion.button>
      </div>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={toggleDrawer}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Bottom Drawer (Mobile) or Modal (Desktop) */}
            <motion.div
              initial={{ y: '100%', opacity: 1 }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 md:left-auto md:right-6 md:bottom-6 z-50 md:w-96 bg-cream border-t-4 md:border-4 border-charcoal rounded-t-3xl md:rounded-3xl p-6 shadow-2xl flex flex-col gap-6"
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b border-charcoal/10 pb-4">
                <div className="flex flex-col">
                  <h3 className="font-display text-xl font-black text-charcoal">
                    Satisfy Cravings
                  </h3>
                  <span className="text-xs font-semibold text-brand-red uppercase tracking-wider">
                    Open until 11:00 PM daily
                  </span>
                </div>
                <button
                  onClick={toggleDrawer}
                  className="p-1.5 rounded-full border-2 border-charcoal hover:bg-brand-lime transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 text-charcoal" />
                </button>
              </div>

              {/* Delivery Channels */}
              <div className="flex flex-col gap-3">
                {orderChannels.map((chan, idx) => (
                  <a
                    key={idx}
                    href={chan.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between p-4 rounded-xl border-2 border-charcoal shadow-[3px_3px_0px_0px_#1A1410] hover:shadow-[1px_1px_0px_0px_#1A1410] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer ${chan.color}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1 bg-white/10 rounded-lg">
                        {chan.icon}
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="font-display font-bold text-sm tracking-wide">
                          {chan.name}
                        </span>
                        <span className="text-xs opacity-80 leading-none mt-1">
                          {chan.desc}
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 opacity-80" />
                  </a>
                ))}
              </div>

              {/* Quick Info / Address */}
              <div className="flex items-start gap-2 bg-brand-lime/30 border border-charcoal/10 rounded-xl p-3 text-xs leading-normal">
                <MapPin className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <p className="text-charcoal/80">
                  <strong>Pickup location:</strong> Paithan Rd, Kanchanwadi, Chhatrapati Sambhajinagar
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
