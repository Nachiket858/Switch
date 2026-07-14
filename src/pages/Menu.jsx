import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, SlidersHorizontal, Check, ShoppingBag, X } from 'lucide-react';
import CardTilt from '../components/CardTilt';

const categories = ['sandwiches', 'shakes', 'sides', 'beverages'];

const menuItems = [
  // Sandwiches
  {
    id: 0,
    category: 'sandwiches',
    name: 'Peri-Peri Paneer S\'wich',
    desc: 'Spicy paneer chunks, fire-roasted bell peppers, shredded iceberg, and house peri-peri sauce.',
    price: 249,
    type: 'veg',
    spicy: true,
    img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 1,
    category: 'sandwiches',
    name: 'Peri-Peri Chicken S\'wich',
    desc: 'Grilled tender chicken breast, spicy house rub, purple slaw, cheddar slice, and peri-peri drizzle.',
    price: 289,
    type: 'non-veg',
    spicy: true,
    img: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    category: 'sandwiches',
    name: 'Classic Grilled Cheese',
    desc: 'Artisanal sourdough bread, sharp cheddar, mozzarella blend, toasted in whipped herb butter.',
    price: 189,
    type: 'veg',
    spicy: false,
    img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    category: 'sandwiches',
    name: 'Pesto Tomato Mozzarella',
    desc: 'Fresh sliced buffalo mozzarella, vine tomatoes, basil pesto spread, and wild rocket greens.',
    price: 229,
    type: 'veg',
    spicy: false,
    img: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    category: 'sandwiches',
    name: 'Smoked Chicken & Bacon',
    desc: 'Hickory-smoked pulled chicken, crispy smoked bacon bits, cheddar, and honey mustard sauce.',
    price: 319,
    type: 'non-veg',
    spicy: false,
    img: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=400&q=80',
  },
  // Shakes
  {
    id: 5,
    category: 'shakes',
    name: 'Nutella Banana Shake',
    desc: 'Creamy banana base blended with real vanilla gelato, heavily swirled with raw Nutella.',
    price: 199,
    type: 'veg',
    spicy: false,
    img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 6,
    category: 'shakes',
    name: 'Cold Coffee Thickshake',
    desc: 'Double shot espresso blend, premium vanilla gelato, topped with dark chocolate shavings.',
    price: 179,
    type: 'veg',
    spicy: false,
    img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 7,
    category: 'shakes',
    name: 'Strawberry Oreo Crush',
    desc: 'Sweet Mahabaleshwar strawberries blended with crushed Oreos and topped with fresh whipped cream.',
    price: 189,
    type: 'veg',
    spicy: false,
    img: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 8,
    category: 'shakes',
    name: 'Salted Caramel Crunch',
    desc: 'House-burnt butter caramel, butterscotch bits, vanilla bean cream, and a pinch of rock salt.',
    price: 199,
    type: 'veg',
    spicy: false,
    img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80',
  },
  // Sides
  {
    id: 9,
    category: 'sides',
    name: 'Loaded Peri Fries',
    desc: 'Double-fried hand-cut potatoes dusted in spicy peri dust, drowned in warm cheddar cheese sauce.',
    price: 149,
    type: 'veg',
    spicy: true,
    img: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 10,
    category: 'sides',
    name: 'Crispy Dynamite Onion Rings',
    desc: 'Thick-cut panko onion rings served with a side of spicy house dynamite sauce.',
    price: 129,
    type: 'veg',
    spicy: true,
    img: 'https://images.unsplash.com/photo-1518013006304-41470801f247?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 11,
    category: 'sides',
    name: 'Hot Chicken Popcorn',
    desc: 'Crunchy bite-sized chicken chunks tossed in spicy hot paprika powder, garlic dip.',
    price: 179,
    type: 'non-veg',
    spicy: true,
    img: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=400&q=80',
  },
  // Beverages
  {
    id: 12,
    category: 'beverages',
    name: 'Mint Lime Mojito',
    desc: 'Freshly muddled mint leaves, lime juice, sparkling club soda, and organic brown sugar syrup.',
    price: 119,
    type: 'veg',
    spicy: false,
    img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 13,
    category: 'beverages',
    name: 'Cold Iced Peach Tea',
    desc: 'Cold-brewed premium black tea blended with fresh peach nectar, lemon juice, mint garnishing.',
    price: 99,
    type: 'veg',
    spicy: false,
    img: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&w=400&q=80',
  },
];

export default function Menu() {
  const [activeCat, setActiveCat] = useState('sandwiches');
  const [dietFilter, setDietFilter] = useState('all'); // all, veg, non-veg
  const [customizingItem, setCustomizingItem] = useState(null);

  // Customize Options
  const [addons, setAddons] = useState({
    cheese: false,
    extraSpicy: false,
    combo: false,
  });

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
    (item) =>
      item.category === activeCat &&
      (dietFilter === 'all' || item.type === dietFilter)
  );

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex-1">
      {/* Page Title */}
      <div className="text-center mb-10">
        <span className="px-3 py-1 bg-brand-lime text-charcoal font-display text-xs font-bold uppercase tracking-widest rounded border border-charcoal inline-block mb-3 rotate-1">
          Menu Craze
        </span>
        <h1 className="font-display text-4xl md:text-6xl font-black tracking-tight text-charcoal">
          The S'wich Lineup
        </h1>
        <p className="text-charcoal/70 mt-3 font-medium">
          Fresh buns, heavy cream, massive flavors. Customize ingredients to match your vibe.
        </p>
      </div>

      {/* Categories Bar */}
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-6 py-3 font-display text-sm font-black uppercase tracking-wider rounded-full border-2 border-charcoal relative cursor-pointer ${
              activeCat === cat
                ? 'bg-brand-red text-cream shadow-[3px_3px_0px_0px_#1A1410]'
                : 'bg-cream text-charcoal hover:bg-brand-lime transition-all duration-200'
            }`}
          >
            {cat}
            {activeCat === cat && (
              <motion.span
                layoutId="activeCategory"
                className="absolute inset-0 rounded-full border-2 border-charcoal bg-transparent -z-10"
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Sub Filter: Diet */}
      <div className="flex justify-center items-center gap-3 mb-12">
        <SlidersHorizontal className="w-4 h-4 text-charcoal/50" />
        <div className="flex border-2 border-charcoal bg-cream rounded-xl p-1 shadow-[2px_2px_0px_0px_#1A1410]">
          {['all', 'veg', 'non-veg'].map((filter) => (
            <button
              key={filter}
              onClick={() => setDietFilter(filter)}
              className={`px-4 py-1.5 font-display text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                dietFilter === filter
                  ? 'bg-charcoal text-cream'
                  : 'text-charcoal/70 hover:text-charcoal'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Cards Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex"
            >
              <CardTilt className="w-full flex">
                <div className="bg-cream border-2 border-charcoal rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_#1A1410] hover:shadow-[1px_1px_0px_0px_#1A1410] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200 flex flex-col justify-between w-full">
                  
                  {/* Card Image */}
                  <div className="relative h-48 border-b-2 border-charcoal overflow-hidden group">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Spicy / Diet tags */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span
                        className={`px-2 py-0.5 border border-charcoal rounded font-display text-[10px] font-black uppercase shadow-[1px_1px_0px_0px_#1A1410] ${
                          item.type === 'veg'
                            ? 'bg-[#E1FFEB] text-[#2E7D32]'
                            : 'bg-[#FFEBEC] text-[#C62828]'
                        }`}
                      >
                        {item.type}
                      </span>
                      {item.spicy && (
                        <span className="px-2 py-0.5 bg-brand-red text-cream border border-charcoal rounded font-display text-[10px] font-black uppercase shadow-[1px_1px_0px_0px_#1A1410]">
                          Spicy 🌶️
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-1 text-left justify-between">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="font-display text-xl font-bold text-charcoal tracking-tight leading-tight">
                          {item.name}
                        </h3>
                        <span className="font-display font-black text-lg text-brand-red shrink-0">
                          ₹{item.price}
                        </span>
                      </div>
                      <p className="text-charcoal/70 text-xs leading-relaxed font-sans mt-1">
                        {item.desc}
                      </p>
                    </div>

                    <div className="flex gap-2.5 mt-6 pt-4 border-t border-charcoal/10">
                      <button
                        onClick={() => handleCustomizationOpen(item)}
                        className="flex-1 py-2 bg-brand-lime text-charcoal border border-charcoal font-display text-xs font-bold uppercase tracking-wider rounded-lg shadow-[2px_2px_0px_0px_#1A1410] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer text-center"
                      >
                        Customize
                      </button>
                      <button
                        onClick={() => handleCustomizationOpen(item)}
                        className="p-2 bg-charcoal text-cream hover:bg-brand-red hover:text-charcoal transition-colors border border-charcoal rounded-lg cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              </CardTilt>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-charcoal/20 rounded-2xl mt-8">
          <p className="font-display text-lg font-bold text-charcoal/50 uppercase">
            No items match this filter
          </p>
        </div>
      )}

      {/* Customizer Modal */}
      <AnimatePresence>
        {customizingItem && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setCustomizingItem(null)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-x-6 top-[15%] bottom-[15%] md:inset-auto md:w-[480px] md:top-[18%] md:left-[50%] md:-translate-x-1/2 z-50 bg-cream border-4 border-charcoal rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div>
                <div className="flex justify-between items-start pb-4 border-b border-charcoal/10">
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-display font-black text-brand-red uppercase tracking-widest">
                      Customize Stack
                    </span>
                    <h3 className="font-display text-2xl font-black text-charcoal mt-1 leading-tight">
                      {customizingItem.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setCustomizingItem(null)}
                    className="p-1 border border-charcoal rounded-full hover:bg-brand-lime transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4 text-charcoal" />
                  </button>
                </div>

                {/* Options List */}
                <div className="flex flex-col gap-4 py-6 text-left">
                  {/* Cheese Option */}
                  <label className="flex items-center justify-between p-3 border-2 border-charcoal rounded-xl cursor-pointer hover:bg-brand-lime/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={addons.cheese}
                        onChange={(e) => setAddons({ ...addons, cheese: e.target.checked })}
                        className="w-4 h-4 accent-brand-red cursor-pointer"
                      />
                      <span className="font-display font-bold text-sm text-charcoal">
                        Extra Cheddar Cheese
                      </span>
                    </div>
                    <span className="font-display font-black text-xs text-brand-red">
                      +₹49
                    </span>
                  </label>

                  {/* Spicy Option */}
                  <label className="flex items-center justify-between p-3 border-2 border-charcoal rounded-xl cursor-pointer hover:bg-brand-lime/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={addons.extraSpicy}
                        onChange={(e) => setAddons({ ...addons, extraSpicy: e.target.checked })}
                        className="w-4 h-4 accent-brand-red cursor-pointer"
                      />
                      <span className="font-display font-bold text-sm text-charcoal">
                        Extra Spicy Dynamite Drip
                      </span>
                    </div>
                    <span className="font-display font-black text-xs text-brand-red">
                      +₹19
                    </span>
                  </label>

                  {/* Combo Option */}
                  <label className="flex items-center justify-between p-3 border-2 border-charcoal rounded-xl cursor-pointer hover:bg-brand-lime/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={addons.combo}
                        onChange={(e) => setAddons({ ...addons, combo: e.target.checked })}
                        className="w-4 h-4 accent-brand-red cursor-pointer"
                      />
                      <span className="font-display font-bold text-sm text-charcoal">
                        Upgrade to Meal Combo
                      </span>
                    </div>
                    <span className="font-display font-black text-xs text-brand-red">
                      +₹129
                    </span>
                  </label>
                  <p className="text-[10px] text-charcoal/50 leading-tight">
                    *Meal combo includes dynamic Peri-Peri Waffle Fries + 250ml Mojito or Tea of choice.
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="border-t border-charcoal/10 pt-4 flex items-center justify-between">
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-charcoal/50">Total Price</span>
                  <span className="font-display font-black text-2xl text-brand-red leading-none mt-1">
                    ₹{calculateCustomPrice()}
                  </span>
                </div>
                <button
                  onClick={() => setCustomizingItem(null)}
                  className="px-6 py-3 bg-brand-red text-cream border-2 border-charcoal font-display text-xs font-black uppercase tracking-wider rounded-xl shadow-[3px_3px_0px_0px_#1A1410] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all cursor-pointer flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To order</span>
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
