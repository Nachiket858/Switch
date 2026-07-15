import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Flame, Leaf, Drumstick } from 'lucide-react';
import CardTilt from '../components/CardTilt';
import Reveal from '../components/Reveal';
import SplitText from '../components/SplitText';

const categories = [
  { id: 'sandwiches', label: "S'wiches", icon: 'fa-burger' },
  { id: 'shakes', label: 'Thickshakes', icon: 'fa-ice-cream' },
  { id: 'sides', label: 'Sides', icon: 'fa-utensils' },
  { id: 'beverages', label: 'Coolers', icon: 'fa-martini-glass-citrus' },
];

const menuItems = [
  {
    id: 0, category: 'sandwiches', name: "Peri-Peri Paneer S'wich",
    desc: 'Spicy paneer chunks, fire-roasted bell peppers, shredded iceberg, and house peri-peri sauce.',
    price: 249, type: 'veg', spicy: true, badge: 'Best Seller',
    img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=640&q=80',
  },
  {
    id: 1, category: 'sandwiches', name: "Peri-Peri Chicken S'wich",
    desc: 'Grilled tender chicken breast, spicy house rub, purple slaw, cheddar slice, and peri-peri drizzle.',
    price: 289, type: 'non-veg', spicy: true, badge: 'Best Seller',
    img: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=640&q=80',
  },
  {
    id: 2, category: 'sandwiches', name: 'Classic Grilled Cheese',
    desc: 'Artisanal sourdough, sharp cheddar, mozzarella blend, toasted in whipped herb butter.',
    price: 189, type: 'veg', spicy: false,
    img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=640&q=80',
  },
  {
    id: 3, category: 'sandwiches', name: 'Pesto Tomato Mozzarella',
    desc: 'Buffalo mozzarella, vine tomatoes, basil pesto spread, and wild rocket greens.',
    price: 229, type: 'veg', spicy: false,
    img: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=640&q=80',
  },
  {
    id: 4, category: 'sandwiches', name: 'Smoked Chicken & Bacon',
    desc: 'Hickory-smoked pulled chicken, crispy bacon bits, cheddar, and honey mustard sauce.',
    price: 319, type: 'non-veg', spicy: false, badge: 'New',
    img: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=640&q=80',
  },
  {
    id: 5, category: 'shakes', name: 'Nutella Banana Shake',
    desc: 'Creamy banana base blended with real vanilla gelato, heavily swirled with raw Nutella.',
    price: 199, type: 'veg', spicy: false, badge: 'Cult Fav',
    img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=640&q=80',
  },
  {
    id: 6, category: 'shakes', name: 'Cold Coffee Thickshake',
    desc: 'Double-shot espresso blend, premium vanilla gelato, topped with dark chocolate shavings.',
    price: 179, type: 'veg', spicy: false,
    img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=640&q=80',
  },
  {
    id: 7, category: 'shakes', name: 'Strawberry Oreo Crush',
    desc: 'Sweet Mahabaleshwar strawberries blended with crushed Oreos and fresh whipped cream.',
    price: 189, type: 'veg', spicy: false,
    img: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=640&q=80',
  },
  {
    id: 8, category: 'shakes', name: 'Salted Caramel Crunch',
    desc: 'House-burnt butter caramel, butterscotch bits, vanilla bean cream, and a pinch of rock salt.',
    price: 199, type: 'veg', spicy: false, badge: 'New',
    img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=640&q=80',
  },
  {
    id: 9, category: 'sides', name: 'Loaded Peri Fries',
    desc: 'Double-fried hand-cut potatoes dusted in peri spice, drowned in warm cheddar sauce.',
    price: 149, type: 'veg', spicy: true, badge: 'Best Seller',
    img: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=640&q=80',
  },
  {
    id: 10, category: 'sides', name: 'Dynamite Onion Rings',
    desc: 'Thick-cut panko onion rings served with spicy house dynamite sauce.',
    price: 129, type: 'veg', spicy: true,
    img: 'https://images.unsplash.com/photo-1518013006304-41470801f247?auto=format&fit=crop&w=640&q=80',
  },
  {
    id: 11, category: 'sides', name: 'Hot Chicken Popcorn',
    desc: 'Crunchy bite-sized chicken tossed in hot paprika, served with garlic dip.',
    price: 179, type: 'non-veg', spicy: true,
    img: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=640&q=80',
  },
  {
    id: 12, category: 'beverages', name: 'Mint Lime Mojito',
    desc: 'Freshly muddled mint, lime juice, sparkling soda, and organic brown sugar syrup.',
    price: 119, type: 'veg', spicy: false,
    img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=640&q=80',
  },
  {
    id: 13, category: 'beverages', name: 'Iced Peach Tea',
    desc: 'Cold-brewed black tea blended with fresh peach nectar, lemon, and mint.',
    price: 99, type: 'veg', spicy: false,
    img: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&w=640&q=80',
  },
];

const badgeStyles = {
  'Best Seller': 'bg-flame text-paper',
  'New': 'bg-pista text-cocoa',
  'Cult Fav': 'bg-butter text-cocoa',
};

export default function Menu() {
  const [activeCat, setActiveCat] = useState('sandwiches');
  const [dietFilter, setDietFilter] = useState('all');
  const [customizingItem, setCustomizingItem] = useState(null);
  const [addons, setAddons] = useState({ cheese: false, extraSpicy: false, combo: false });

  const handleCustomizationOpen = (item) => {
    setCustomizingItem(item);
    setAddons({ cheese: false, extraSpicy: false, combo: false });
  };

  const calculateCustomPrice = () => {
    if (!customizingItem) return 0;
    let base = customizingItem.price;
    if (addons.cheese) base += 49;
    if (addons.extraSpicy) base += 19;
    if (addons.combo) base += 129;
    return base;
  };

  const filteredItems = menuItems.filter(
    (item) => item.category === activeCat && (dietFilter === 'all' || item.type === dietFilter)
  );

  return (
    <div className="flex-1 relative overflow-hidden">
      {/* ambient glows */}
      <div className="glow glow-butter w-[30rem] h-[30rem] -top-24 -right-24" />
      <div className="glow glow-flame w-[26rem] h-[26rem] top-[40%] -left-32" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Reveal>
            <span className="sticker bg-paper shadow-soft text-flame mb-5">Fresh out the kitchen</span>
          </Reveal>
          <h1 className="font-display font-semibold text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.95] tracking-tight text-cocoa">
            <SplitText text="The Lineup." stagger={0.03} />
          </h1>
          <Reveal delay={0.2}>
            <p className="text-cocoa/60 mt-4 font-medium max-w-md mx-auto">
              Fresh buns, heavy shakes, massive flavours.
              <span className="hand-note text-flame text-xl ml-1.5">pick your fighter ↓</span>
            </p>
          </Reveal>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
          {categories.map((cat) => {
            const isActive = activeCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`relative px-6 py-3 font-display text-sm font-semibold tracking-wide rounded-full cursor-pointer transition-colors duration-300 ${
                  isActive ? 'text-paper' : 'text-cocoa/70 bg-paper shadow-soft hover:text-cocoa hover:-translate-y-0.5'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeMenuCat"
                    className="absolute inset-0 bg-cocoa rounded-full shadow-lift"
                    transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <i className={`fa-solid ${cat.icon} text-xs opacity-70`} /> {cat.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Diet toggle */}
        <div className="flex justify-center mb-14">
          <div className="flex bg-paper rounded-full p-1.5 shadow-soft">
            {[
              { id: 'all', label: 'All' },
              { id: 'veg', label: 'Veg', icon: <Leaf className="w-3.5 h-3.5" /> },
              { id: 'non-veg', label: 'Non-Veg', icon: <Drumstick className="w-3.5 h-3.5" /> },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setDietFilter(f.id)}
                className={`flex items-center gap-1.5 px-5 py-2 font-display text-xs font-semibold uppercase tracking-[0.1em] rounded-full transition-all cursor-pointer ${
                  dietFilter === f.id
                    ? f.id === 'veg'
                      ? 'bg-pista text-cocoa'
                      : f.id === 'non-veg'
                        ? 'bg-flame text-paper'
                        : 'bg-cocoa text-paper'
                    : 'text-cocoa/50 hover:text-cocoa'
                }`}
              >
                {f.icon}{f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex"
              >
                <CardTilt className="w-full flex">
                  <div className="card-soft group overflow-hidden flex flex-col w-full">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover img-warm group-hover:scale-[1.07] transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span
                          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center bg-paper ${
                            item.type === 'veg' ? 'border-pista' : 'border-flame'
                          }`}
                          title={item.type}
                        >
                          <span className={`w-2 h-2 rounded-full ${item.type === 'veg' ? 'bg-pista' : 'bg-flame'}`} />
                        </span>
                        {item.spicy && (
                          <span className="sticker !py-1 !px-2.5 bg-flame/90 text-paper !text-[0.58rem]">
                            <Flame className="w-3 h-3" /> Spicy
                          </span>
                        )}
                      </div>
                      {item.badge && (
                        <span className={`absolute top-4 right-4 sticker !py-1 !px-3 !text-[0.58rem] shadow-soft rotate-2 ${badgeStyles[item.badge]}`}>
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1 gap-2">
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="font-display text-lg font-semibold text-cocoa tracking-tight leading-tight group-hover:text-flame transition-colors duration-300">
                          {item.name}
                        </h3>
                        <motion.span
                          layout
                          className="font-display font-semibold text-lg text-flame shrink-0"
                        >
                          ₹{item.price}
                        </motion.span>
                      </div>
                      <p className="text-cocoa/55 text-[0.82rem] leading-relaxed">{item.desc}</p>

                      <div className="mt-auto pt-5">
                        <button
                          onClick={() => handleCustomizationOpen(item)}
                          className="w-full py-3 bg-cream group-hover:bg-cocoa group-hover:text-paper font-display text-xs font-semibold uppercase tracking-[0.14em] rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          Customize & Order
                        </button>
                      </div>
                    </div>
                  </div>
                </CardTilt>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 card-soft mt-4">
            <p className="font-display text-lg font-semibold text-cocoa/40">
              Nothing matches this filter
            </p>
            <button
              onClick={() => setDietFilter('all')}
              className="btn-ghost mt-4 !py-2.5 !px-5 !text-[0.7rem]"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Customizer modal */}
      <AnimatePresence>
        {customizingItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCustomizingItem(null)}
              className="fixed inset-0 z-50 bg-cocoa/50 backdrop-blur-sm cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: 'spring', damping: 24, stiffness: 260 }}
              className="fixed inset-x-5 top-[10%] md:inset-auto md:w-[460px] md:top-[14%] md:left-1/2 md:-translate-x-1/2 z-50 bg-paper rounded-[2rem] p-7 md:p-8 shadow-lift flex flex-col gap-5 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start pb-4 border-b border-cocoa/8">
                <div className="flex flex-col text-left">
                  <span className="text-[0.65rem] font-display font-semibold text-flame uppercase tracking-[0.2em]">
                    Make it yours
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-cocoa mt-1 leading-tight tracking-tight">
                    {customizingItem.name}
                  </h3>
                </div>
                <button
                  onClick={() => setCustomizingItem(null)}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-cream hover:bg-cocoa hover:text-paper transition-colors cursor-pointer shrink-0"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col gap-3 text-left">
                {[
                  { key: 'cheese', label: 'Extra Cheddar Melt', price: 49, icon: 'fa-cheese' },
                  { key: 'extraSpicy', label: 'Extra Dynamite Drip', price: 19, icon: 'fa-pepper-hot' },
                  { key: 'combo', label: 'Make it a Meal (fries + cooler)', price: 129, icon: 'fa-utensils' },
                ].map((opt) => (
                  <label
                    key={opt.key}
                    className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
                      addons[opt.key] ? 'bg-flame/10 shadow-soft' : 'bg-cream hover:bg-blush/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={addons[opt.key]}
                        onChange={(e) => setAddons({ ...addons, [opt.key]: e.target.checked })}
                        className="w-4 h-4 accent-flame cursor-pointer"
                      />
                      <span className="font-display font-medium text-sm text-cocoa flex items-center gap-2">
                        <i className={`fa-solid ${opt.icon} text-flame/70 text-xs`} /> {opt.label}
                      </span>
                    </div>
                    <span className="font-display font-semibold text-xs text-flame">+₹{opt.price}</span>
                  </label>
                ))}
              </div>

              <div className="border-t border-cocoa/8 pt-5 flex items-center justify-between">
                <div className="flex flex-col text-left">
                  <span className="text-[0.65rem] font-semibold text-cocoa/45 uppercase tracking-[0.16em]">Total</span>
                  <motion.span
                    key={calculateCustomPrice()}
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="font-display font-semibold text-3xl text-flame leading-none mt-1"
                  >
                    ₹{calculateCustomPrice()}
                  </motion.span>
                </div>
                <a
                  href={`https://wa.me/919999999999?text=${encodeURIComponent(
                    `Hey S'wich! I'd like to order: ${customizingItem.name}${addons.cheese ? ' + extra cheese' : ''}${addons.extraSpicy ? ' + extra spicy' : ''}${addons.combo ? ' as a meal combo' : ''} (₹${calculateCustomPrice()})`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary !text-[0.72rem]"
                >
                  <ShoppingBag className="w-4 h-4" /> Order on WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
