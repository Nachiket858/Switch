import { motion } from 'framer-motion';
import { Sparkles, Trophy, Award, HeartHandshake } from 'lucide-react';
import CardTilt from '../components/CardTilt';

export default function OurStory() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex-1 overflow-hidden">
      {/* Hero section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          <span className="self-start px-3 py-1 bg-brand-red text-cream font-display text-xs font-bold uppercase tracking-widest rounded border border-charcoal rotate-[-2deg]">
            Since 2024
          </span>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-charcoal leading-none">
            We Started With A Simple Question:<br />
            <span className="text-brand-red">Why are sandwiches so boring?</span>
          </h1>
          <p className="text-charcoal/80 text-base md:text-lg leading-relaxed font-sans max-w-2xl">
            Seriously, we got tired of finding soggy lettuce, dry bread, and lukewarm water-downed milkshakes. Fast-casual dining felt like it had lost its soul to boardrooms and mass production. So, we decided to make the S'wich.
          </p>
          <p className="text-charcoal/70 text-sm md:text-base leading-relaxed">
            S'wich was built for late-night study sessions, mid-day breaks, and post-party munchies. We combined bold street-flavors, high-dopamine Gen-Z vibes, and absolutely zero regrets. We don't do pre-packaged, we don't do compromises.
          </p>
        </div>

        {/* Floating Stack Grid */}
        <div className="lg:col-span-5 relative flex justify-center py-8">
          <div className="relative w-72 h-80">
            {/* Polaroid 1 */}
            <motion.div
              initial={{ rotate: -10, scale: 0.95 }}
              whileHover={{ rotate: -4, scale: 1.02, zIndex: 10 }}
              className="absolute top-0 left-0 bg-white border-2 border-charcoal p-3.5 pb-8 shadow-[4px_4px_0px_0px_#1A1410] rounded-lg -rotate-12 w-64"
            >
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80"
                alt="Cafe Vibe"
                className="w-full h-40 object-cover border border-charcoal rounded"
              />
              <span className="font-display text-xs font-bold text-charcoal block mt-3 text-center">
                The First S'wich Shop ⚡
              </span>
            </motion.div>

            {/* Polaroid 2 */}
            <motion.div
              initial={{ rotate: 12, scale: 0.95 }}
              whileHover={{ rotate: 4, scale: 1.02, zIndex: 10 }}
              className="absolute bottom-0 right-0 bg-white border-2 border-charcoal p-3.5 pb-8 shadow-[4px_4px_0px_0px_#1A1410] rounded-lg rotate-12 w-60"
            >
              <img
                src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=400&q=80"
                alt="Happy Customers"
                className="w-full h-36 object-cover border border-charcoal rounded"
              />
              <span className="font-display text-xs font-bold text-charcoal block mt-3 text-center">
                Good Vibes Only 🍕
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Quality Manifesto */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-charcoal">
            The S'wich Manifesto
          </h2>
          <p className="text-charcoal/60 text-sm mt-2">The guidelines we live, bake, and shake by.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {/* Card 1 */}
          <div className="bg-brand-red text-cream border-2 border-charcoal p-8 rounded-2xl shadow-[4px_4px_0px_0px_#1A1410] relative overflow-hidden">
            <div className="absolute right-4 top-4 text-cream/10 text-6xl font-display font-black">01</div>
            <h3 className="font-display text-xl font-bold uppercase tracking-wide mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-lime" /> Real Bread
            </h3>
            <p className="text-cream/90 text-sm leading-relaxed">
              Baked daily, crust with character. No spongy, cardboard placeholder bread. If it's not crisp outside and pillowy inside, it's not a S'wich.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-brand-lime text-charcoal border-2 border-charcoal p-8 rounded-2xl shadow-[4px_4px_0px_0px_#1A1410] relative overflow-hidden">
            <div className="absolute right-4 top-4 text-charcoal/10 text-6xl font-display font-black">02</div>
            <h3 className="font-display text-xl font-bold uppercase tracking-wide mb-3 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-brand-red" /> No Sad Veggies
            </h3>
            <p className="text-charcoal/90 text-sm leading-relaxed">
              Crisp lettuce, perfectly ripened tomatoes, hand-sliced onions. We throw away soggy lettuce instantly. If it isn't fresh enough to snap, it isn't entering our kitchen.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-cream border-2 border-charcoal p-8 rounded-2xl shadow-[4px_4px_0px_0px_#1A1410] relative overflow-hidden">
            <div className="absolute right-4 top-4 text-charcoal/10 text-6xl font-display font-black">03</div>
            <h3 className="font-display text-xl font-bold uppercase tracking-wide mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-brand-red" /> Pure Gelato Shakes
            </h3>
            <p className="text-charcoal/90 text-sm leading-relaxed">
              No water dilution, no generic shake powders. Only premium churned cream base and raw loaded toppings. Think thick, rich, and ridiculously indulgent.
            </p>
          </div>
        </div>
      </div>

      {/* Founder note */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-brand-lime/10 border-2 border-charcoal rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <div className="lg:col-span-4 flex justify-center">
          <CardTilt>
            <div className="bg-white border-2 border-charcoal p-4 pb-12 rounded-2xl shadow-[6px_6px_0px_0px_#1A1410] -rotate-3 w-64 md:w-72">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                alt="Founder"
                className="w-full h-64 object-cover border border-charcoal rounded-xl"
              />
              <span className="font-display text-xs font-bold text-charcoal block mt-4 text-center leading-none">
                Maya, Founder & Sandwich Architect
              </span>
            </div>
          </CardTilt>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-6 text-left">
          <h3 className="font-display text-3xl font-black text-charcoal">
            A Note from Maya
          </h3>
          <p className="text-charcoal/80 text-sm md:text-base leading-relaxed">
            "S'wich is more than just a quick bite spot; it's a statement. We wanted to build a space where food feels like an event, and flavor hits you immediately. Every sandwich recipe, every shake consistency was tested hundreds of times in my own kitchen before it reached our counter. We're proud to have a 4.8★ rating, but we are even prouder of the community we have built here. Come make the S'wich, and see the difference."
          </p>
          <div className="flex flex-col">
            <span className="font-display font-black text-brand-red text-xl leading-none">
              Maya R.
            </span>
            <span className="text-xs font-semibold text-charcoal/50 uppercase tracking-widest mt-1">
              Founder & Chief Food Architect
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
