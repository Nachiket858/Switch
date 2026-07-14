import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star, Heart, RefreshCw, Layers, Sparkles } from 'lucide-react';
import CardTilt from '../components/CardTilt';

gsap.registerPlugin(ScrollTrigger);

// Animated Counter sub-component
const AnimatedCounter = ({ value, duration = 1500, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(parseFloat(value));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          let start = 0;
          const end = parseFloat(value);
          if (isNaN(end)) return;
          const startTime = performance.now();

          const updateCount = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const ease = progress * (2 - progress);
            const current = ease * (end - start) + start;

            if (end % 1 === 0) {
              setCount(Math.floor(current));
            } else {
              setCount(parseFloat(current.toFixed(1)));
            }

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(updateCount);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration, hasStarted]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// Ingredients meta for S'wich Stacker
const INGREDIENTS_META = {
  bun_top: { name: 'Brioche Top Bun 🍞', color: 'bg-[#E8C587]', border: 'border-charcoal', height: 'h-12 rounded-t-3xl' },
  cheese: { name: 'Cheddar Melt 🧀', color: 'bg-[#FFC72C]', border: 'border-charcoal', height: 'h-4' },
  paneer: { name: 'Peri-Peri Paneer 🧀', color: 'bg-[#D97706]', border: 'border-charcoal', height: 'h-8 rounded-lg' },
  chicken: { name: 'Flame Grilled Chicken 🍗', color: 'bg-[#B45309]', border: 'border-charcoal', height: 'h-9 rounded-lg' },
  lettuce: { name: 'Crisp Lettuce 🥬', color: 'bg-[#4ADE80]', border: 'border-charcoal', height: 'h-5 rounded-md' },
  sauce: { name: 'Dynamite Drip 🌶️', color: 'bg-[#EF4444]', border: 'border-charcoal', height: 'h-3 rounded-full' },
  bun_bottom: { name: 'Brioche Bottom Bun 🍞', color: 'bg-[#E8C587]', border: 'border-charcoal', height: 'h-10 rounded-b-xl' },
};

export default function Home() {
  const heroRef = useRef(null);
  const scrollSectionRef = useRef(null);
  const featuresRef = useRef(null);
  const dragContainerRef = useRef(null);

  const signatureItems = [
    {
      id: 1,
      name: 'Peri-Peri Chicken S\'wich',
      desc: 'Tender chicken breast, house peri-peri sauce, purple slaw, cheddar slice, and peri-peri drizzle.',
      price: '₹289',
      img: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 2,
      name: 'Nutella Banana Shake',
      desc: 'Thick banana blend, heavy Nutella swirl, premium vanilla gelato, and raw sprinkles.',
      price: '₹199',
      img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 3,
      name: 'Loaded Waffle Fries',
      desc: 'Double-fried waffle potatoes, melted cheddar sauce, spicy peri dust, and sliced jalapeños.',
      price: '₹149',
      img: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=400&q=80',
    },
  ];

  // Stacker Game State
  const [sandwichStack, setSandwichStack] = useState(['bun_bottom', 'lettuce', 'cheese', 'bun_top']);

  // Add ingredient helper
  const addIngredient = (type) => {
    if (sandwichStack.length >= 8) return; // Cap stack height
    const topBunIndex = sandwichStack.indexOf('bun_top');
    
    let newStack = [...sandwichStack];
    if (topBunIndex !== -1) {
      // Insert right before top bun to keep it on top
      newStack.splice(topBunIndex, 0, type);
    } else {
      newStack.push(type);
    }
    setSandwichStack(newStack);
  };

  // Remove ingredient helper
  const removeIngredient = (index) => {
    if (sandwichStack.length <= 2) return; // Keep at least bottom/top bun
    const newStack = [...sandwichStack];
    newStack.splice(index, 1);
    setSandwichStack(newStack);
  };

  const resetStack = () => {
    setSandwichStack(['bun_bottom', 'lettuce', 'cheese', 'bun_top']);
  };

  const getSandwichName = () => {
    const hasChicken = sandwichStack.includes('chicken');
    const hasPaneer = sandwichStack.includes('paneer');
    const hasCheese = sandwichStack.includes('cheese');
    const hasSauce = sandwichStack.includes('sauce');
    const count = sandwichStack.length;

    let base = 'S\'wich';
    if (hasChicken && hasPaneer) base = 'Meat-Veg Monster';
    else if (hasChicken) base = 'Spicy Chicken Stack';
    else if (hasPaneer) base = 'Peri-Peri Paneer Club';
    else if (hasCheese) base = 'Double Cheese Melt';

    let modifier = '';
    if (count > 6) modifier = 'Megastack ';
    else if (hasSauce) modifier = 'Dynamite ';

    return `${modifier}${base}`;
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // GSAP Pinned Split-Screen Storyteller
    const scrollCtx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: scrollSectionRef.current,
        start: 'top 10%',
        end: 'bottom 90%',
        pin: '.pin-column',
        pinSpacing: true,
      });
    }, scrollSectionRef);

    // GSAP reveal cards on signature creations
    gsap.fromTo(
      featuresRef.current.querySelectorAll('.reveal-card'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 80%',
        },
      }
    );

    return () => {
      scrollCtx.revert();
    };
  }, []);

  // Parallax Coordinates for Hero
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const { clientX, clientY } = e;
    const x = (clientX - window.innerWidth / 2) / 30;
    const y = (clientY - window.innerHeight / 2) / 30;
    setParallaxOffset({ x, y });
  };

  return (
    <div className="flex-1 w-full bg-grid-dots" onMouseMove={handleMouseMove}>
      
      {/* 1. Kinetic Asymmetric Hero */}
      <section
        ref={heroRef}
        className="min-h-[90vh] flex flex-col justify-center relative px-6 md:px-12 pt-24 pb-16 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
          
          {/* Hero Left Column (Editorial Typography) */}
          <div className="lg:col-span-7 flex flex-col text-left items-start gap-6">
            <motion.div
              initial={{ rotate: -8, scale: 0.8 }}
              animate={{ rotate: -3, scale: 1 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="px-4 py-2 bg-brand-lime text-charcoal border-2 border-charcoal font-display text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_#1A1410] -rotate-3 hover:rotate-0 transition-transform cursor-pointer"
            >
              ⭐ Maharashtra's No. 1 Quick Bite Spot
            </motion.div>

            <h1 className="font-display text-5xl md:text-8xl lg:text-9xl font-black text-charcoal leading-[0.85] tracking-tighter uppercase relative select-none">
              Make the<br />
              <span className="text-brand-red inline-block relative">
                S'wich.
                <span className="absolute bottom-1.5 left-0 w-full h-3 bg-brand-lime -z-10" />
              </span>
            </h1>

            <p className="text-charcoal font-display text-lg md:text-xl font-bold max-w-lg leading-snug">
              Boring food is officially canceled. Satisfy your soul with loaded double-deckers & shakes thick enough to stand a straw in.
            </p>

            <div className="flex flex-wrap gap-4 mt-2">
              <Link
                to="/menu"
                className="px-6 py-4 bg-brand-red text-cream font-display text-sm font-black uppercase tracking-wider rounded-2xl border-4 border-charcoal shadow-[5px_5px_0px_0px_#1A1410] hover:shadow-[1px_1px_0px_0px_#1A1410] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150 cursor-pointer flex items-center gap-2"
              >
                <span>Order Now (WhatsApp/Call)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/visit"
                className="px-6 py-4 bg-cream text-charcoal font-display text-sm font-black uppercase tracking-wider rounded-2xl border-4 border-charcoal hover:bg-brand-lime hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150 shadow-[4px_4px_0px_0px_#1A1410] hover:shadow-[6px_6px_0px_0px_#1A1410] cursor-pointer"
              >
                Find Us 📍
              </Link>
            </div>
          </div>

          {/* Hero Right Column (Collage & Parallax) */}
          <div className="lg:col-span-5 relative flex justify-center items-center h-[400px] md:h-[500px]">
            <motion.div
              style={{ x: parallaxOffset.x, y: parallaxOffset.y }}
              className="relative w-full h-full max-w-[400px] flex items-center justify-center"
            >
              {/* Retro Graphic Circle */}
              <div className="absolute w-72 h-72 rounded-full bg-brand-lime/10 border-4 border-dashed border-charcoal/20 animate-spin-slow pointer-events-none" />

              {/* Main Sandwich PNG */}
              <motion.img
                src="/assets/hero_sandwich.png"
                alt="Stacked S'wich Burger"
                animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-80 h-80 md:w-96 md:h-96 object-contain z-10 filter drop-shadow-[0_20px_20px_rgba(26,20,16,0.3)] cursor-grab active:cursor-grabbing"
                draggable="false"
              />

              {/* Overlapping Polaroid Sticker */}
              <motion.div
                style={{ x: -parallaxOffset.x * 0.5, y: -parallaxOffset.y * 0.5 }}
                className="absolute top-2 right-[-20px] bg-white border-2 border-charcoal p-2.5 pb-6 shadow-[4px_4px_0px_0px_#1A1410] rounded rotate-6 w-36 hidden md:block z-20 hover:scale-105 transition-transform"
              >
                <img
                  src="https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=200&q=80"
                  alt="Delicious shake"
                  className="w-full h-24 object-cover border border-charcoal rounded"
                />
                <span className="font-display text-[9px] font-black text-charcoal block mt-2 text-center">
                  LATE NIGHT MIX 🥤
                </span>
              </motion.div>

              {/* Fun Badges */}
              <div className="absolute bottom-6 left-[-30px] bg-brand-red text-cream border-2 border-charcoal font-display text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 -rotate-12 shadow-[3px_3px_0px_0px_#1A1410] z-20">
                100% Real Gelato 🍦
              </div>
              <div className="absolute top-1/2 left-[-40px] bg-brand-lime text-charcoal border-2 border-charcoal rounded-full w-14 h-14 flex flex-col items-center justify-center font-display font-black text-xs shadow-[3px_3px_0px_0px_#1A1410] rotate-12 z-20">
                <span>4.8★</span>
                <span className="text-[7px] leading-none uppercase text-charcoal/60">Rated</span>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 2. Checkerboard Division Ribbons */}
      <div className="w-full bg-charcoal text-cream py-4 overflow-hidden border-y-4 border-charcoal select-none uppercase font-display font-black text-lg md:text-2xl tracking-wider z-20 relative">
        <div className="animate-marquee flex whitespace-nowrap">
          <span className="mx-6 text-brand-lime">💥 MAKE THE S'WICH</span>
          <span className="mx-6">💥 DINE-IN AC SEATING</span>
          <span className="mx-6 text-brand-red">💥 ONE S'WICH, ZERO REGRETS</span>
          <span className="mx-6">💥 HOME DELIVERY AVAILABLE</span>
          <span className="mx-6 text-brand-lime">💥 MAKE THE S'WICH</span>
          <span className="mx-6">💥 DINE-IN AC SEATING</span>
          <span className="mx-6 text-brand-red">💥 ONE S'WICH, ZERO REGRETS</span>
          <span className="mx-6">💥 HOME DELIVERY AVAILABLE</span>
        </div>
      </div>

      {/* 3. Interactive S'wich Stacker Mini-Game */}
      <section className="py-24 px-6 md:px-12 bg-cream text-charcoal border-b-4 border-charcoal">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="px-3 py-1 bg-brand-red text-cream font-display text-xs font-bold uppercase tracking-widest rounded border border-charcoal inline-block mb-3 rotate-1">
              Dopamine Lab
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight">
              Build Your Custom Stack
            </h2>
            <p className="text-charcoal/70 mt-3 font-semibold">
              Drop ingredients with bouncy spring physics. Name your S'wich and order it!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Control Panel (Left Column) */}
            <div className="lg:col-span-5 flex flex-col gap-6 text-left justify-center">
              <div className="bg-cream border-4 border-charcoal p-6 rounded-3xl shadow-[6px_6px_0px_0px_#1A1410] flex flex-col gap-4">
                <h3 className="font-display text-2xl font-black text-charcoal">
                  Add Layers
                </h3>
                <p className="text-charcoal/70 text-xs leading-relaxed font-sans">
                  Design the ultimate sandwich tower. Your ingredients rest on a bottom bun, and we'll keep the top bun capping the stack. Max 8 layers.
                </p>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <button
                    onClick={() => addIngredient('cheese')}
                    className="p-3 bg-[#FFC72C]/20 hover:bg-[#FFC72C] text-charcoal border-2 border-charcoal font-display text-xs font-bold rounded-xl active:scale-95 transition-all text-left"
                  >
                    🧀 Cheddar Cheese
                  </button>
                  <button
                    onClick={() => addIngredient('paneer')}
                    className="p-3 bg-[#D97706]/20 hover:bg-[#D97706] hover:text-white text-charcoal border-2 border-charcoal font-display text-xs font-bold rounded-xl active:scale-95 transition-all text-left"
                  >
                    🧀 Peri Paneer
                  </button>
                  <button
                    onClick={() => addIngredient('chicken')}
                    className="p-3 bg-[#B45309]/20 hover:bg-[#B45309] hover:text-white text-charcoal border-2 border-charcoal font-display text-xs font-bold rounded-xl active:scale-95 transition-all text-left"
                  >
                    🍗 Grilled Chicken
                  </button>
                  <button
                    onClick={() => addIngredient('lettuce')}
                    className="p-3 bg-[#4ADE80]/20 hover:bg-[#4ADE80] text-charcoal border-2 border-charcoal font-display text-xs font-bold rounded-xl active:scale-95 transition-all text-left"
                  >
                    🥬 Crisp Lettuce
                  </button>
                  <button
                    onClick={() => addIngredient('sauce')}
                    className="p-3 bg-[#EF4444]/20 hover:bg-[#EF4444] hover:text-white text-charcoal border-2 border-charcoal font-display text-xs font-bold rounded-xl active:scale-95 transition-all text-left col-span-2 text-center"
                  >
                    🌶️ Dynamite Hot Sauce Drizzle
                  </button>
                </div>

                <div className="border-t border-charcoal/10 pt-4 flex gap-3">
                  <button
                    onClick={resetStack}
                    className="flex-1 py-2.5 bg-cream hover:bg-brand-lime text-charcoal border-2 border-charcoal font-display text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Reset
                  </button>
                  <Link
                    to="/contact"
                    className="flex-[2] py-2.5 bg-charcoal text-cream border-2 border-charcoal font-display text-xs font-bold uppercase tracking-wider rounded-xl text-center shadow-[3px_3px_0px_0px_#FF4D2E] active:scale-95 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    Order Custom Stack
                  </Link>
                </div>
              </div>
            </div>

            {/* Sandwich Canvas (Right Column) */}
            <div className="lg:col-span-7 flex">
              <div className="w-full min-h-[400px] border-4 border-charcoal bg-white rounded-3xl shadow-[8px_8px_0px_0px_#1A1410] relative flex flex-col justify-between p-8 overflow-hidden bg-grid-dots">
                {/* Canvas Sticker */}
                <div className="absolute top-4 left-4 bg-brand-lime text-charcoal border-2 border-charcoal font-display text-xs font-black uppercase py-1 px-3 -rotate-3 z-20">
                  Sandwich Viewport 🔬
                </div>

                {/* Stacker Box */}
                <div className="flex-1 flex flex-col justify-end items-center py-6 min-h-[300px]">
                  <div className="w-64 flex flex-col gap-1.5 justify-end">
                    <AnimatePresence initial={false}>
                      {sandwichStack.map((ing, idx) => {
                        const meta = INGREDIENTS_META[ing];
                        return (
                          <motion.div
                            key={`${ing}-${idx}`}
                            initial={{ y: -200, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 150, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 280, damping: 14 }}
                            onClick={() => removeIngredient(idx)}
                            className={`w-full ${meta.height} ${meta.color} border-2 ${meta.border} shadow-[2px_2px_0px_0px_#1A1410] flex items-center justify-center cursor-pointer select-none relative group hover:scale-[1.02] active:scale-95`}
                            title="Click to remove layer"
                          >
                            <span className="font-display font-black text-[10px] md:text-xs text-charcoal group-hover:text-brand-red tracking-wide uppercase transition-colors">
                              {meta.name}
                            </span>
                            <div className="absolute right-3 opacity-0 group-hover:opacity-100 text-brand-red font-display text-[9px] font-black transition-opacity">
                              [REMOVE]
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Name Tag Footer */}
                <div className="border-t border-charcoal/10 pt-4 flex flex-col md:flex-row justify-between items-center gap-3">
                  <div className="text-left">
                    <span className="text-[10px] font-sans font-semibold text-charcoal/50 uppercase tracking-widest">
                      Custom Stacker Title
                    </span>
                    <h4 className="font-display text-xl md:text-2xl font-black text-charcoal leading-none mt-1">
                      {getSandwichName()}
                    </h4>
                  </div>
                  <div className="bg-brand-red text-cream border-2 border-charcoal font-display text-xs font-black px-3.5 py-1.5 uppercase shadow-[2px_2px_0px_0px_#1A1410]">
                    🍔 {sandwichStack.length} Layers Stacked
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. GSAP Pinned Split-Screen Storyteller */}
      <section
        ref={scrollSectionRef}
        className="manifesto-section py-24 bg-charcoal text-cream border-b-4 border-charcoal relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10 w-full">
          
          {/* Pinned Left Column */}
          <div className="pin-column lg:col-span-5 text-left flex flex-col gap-6 pt-4">
            <span className="self-start px-3 py-1 bg-brand-lime text-charcoal font-display text-xs font-black uppercase tracking-widest border border-charcoal rotate-[-3deg]">
              Quality manifesto
            </span>
            <h3 className="font-display text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-none tracking-tight text-cream">
              The Rules We Live By.
            </h3>
            <p className="text-cream/70 text-sm max-w-sm font-sans leading-relaxed">
              We started S'wich because fast-casual food lost its soul to sad, pre-packaged ingredients. We hold ourselves to three non-negotiable rules.
            </p>
          </div>

          {/* Scrolling Right Column */}
          <div className="lg:col-span-7 flex flex-col gap-12 w-full pt-4">
            {/* Card 1 */}
            <div className="bg-cream text-charcoal border-4 border-charcoal p-8 rounded-3xl shadow-[6px_6px_0px_0px_#C8FF3D] text-left">
              <span className="font-display font-black text-4xl md:text-5xl text-brand-red">01</span>
              <h4 className="font-display text-2xl font-black uppercase tracking-tight mt-2 mb-3">
                Crust With Character 🍞
              </h4>
              <p className="text-charcoal/80 text-sm leading-relaxed font-sans">
                Our sourdough buns are baked fresh daily in wood-fired ovens. No soggy sandwich sponges, no store-bought cardboard. Crispy outside, pillowy inside, toasted in rich herb butter.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-cream text-charcoal border-4 border-charcoal p-8 rounded-3xl shadow-[6px_6px_0px_0px_#FF4D2E] text-left">
              <span className="font-display font-black text-4xl md:text-5xl text-brand-lime">02</span>
              <h4 className="font-display text-2xl font-black uppercase tracking-tight mt-2 mb-3">
                No Soggy Lettuce 🥬
              </h4>
              <p className="text-charcoal/80 text-sm leading-relaxed font-sans">
                Crisp iceberg lettuce, perfectly ripened tomatoes, hand-sliced onions. If it's sad, wilted, or transparent, it immediately goes into the compost. We only stack the snap-fresh stuff.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-cream text-charcoal border-4 border-charcoal p-8 rounded-3xl shadow-[6px_6px_0px_0px_#1A1410] text-left">
              <span className="font-display font-black text-4xl md:text-5xl text-charcoal">03</span>
              <h4 className="font-display text-2xl font-black uppercase tracking-tight mt-2 mb-3">
                Gelato-Only Thickshakes 🥤
              </h4>
              <p className="text-charcoal/80 text-sm leading-relaxed font-sans">
                No milk diluting, no cheap syrup flavorings. Every single milkshake starts with heavy scoops of churned vanilla or chocolate gelato, blended with raw ingredients and toppings. It's rich, heavy, and satisfying.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Signature Creations Items Showcase */}
      <section ref={featuresRef} className="py-24 px-6 md:px-12 bg-cream text-charcoal border-b-4 border-charcoal">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="px-3 py-1 bg-brand-lime text-charcoal font-display text-xs font-bold uppercase tracking-widest rounded border border-charcoal inline-block mb-3 rotate-2">
              Menu Stars
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight">
              Best Sellers
            </h2>
            <p className="text-charcoal/70 mt-3 font-semibold">
              The ones that started the craze. Fresh buns, heavy shakes, zero regrets.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {signatureItems.map((item) => (
              <div key={item.id} className="reveal-card flex">
                <CardTilt className="w-full flex">
                  <div className="bg-cream border-4 border-charcoal p-6 rounded-3xl shadow-[6px_6px_0px_0px_#1A1410] hover:shadow-[2px_2px_0px_0px_#1A1410] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200 flex flex-col justify-between w-full text-left">
                    <div className="flex flex-col gap-4">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-44 object-cover rounded-2xl border-2 border-charcoal"
                      />
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="font-display text-xl font-bold uppercase leading-tight tracking-tight">
                          {item.name}
                        </h3>
                        <span className="font-display font-black text-brand-red text-lg">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-charcoal/70 text-xs leading-relaxed font-sans">
                        {item.desc}
                      </p>
                    </div>
                    <Link
                      to="/menu"
                      className="mt-6 py-3 bg-charcoal text-cream font-display text-xs font-bold uppercase tracking-wider rounded-xl text-center border-2 border-charcoal hover:bg-brand-red hover:text-charcoal transition-colors cursor-pointer"
                    >
                      Order Stack
                    </Link>
                  </div>
                </CardTilt>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Stats Section with Scroll Counters */}
      <section className="py-20 bg-charcoal text-cream border-b-4 border-charcoal relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10 text-center">
          <div className="flex flex-col items-center">
            <h3 className="font-display text-6xl md:text-7xl font-black text-brand-lime leading-none">
              <AnimatedCounter value="4.8" duration={1200} />
            </h3>
            <span className="font-display text-xs font-bold uppercase tracking-widest text-cream/60 mt-2">
              ⭐ Google Maps Rating
            </span>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="font-display text-6xl md:text-7xl font-black text-brand-red leading-none">
              <AnimatedCounter value="385" suffix="+" duration={1500} />
            </h3>
            <span className="font-display text-xs font-bold uppercase tracking-widest text-cream/60 mt-2">
              💬 Google Map Reviews
            </span>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="font-display text-6xl md:text-7xl font-black text-brand-lime leading-none">
              <AnimatedCounter value="10" suffix="k+" duration={1800} />
            </h3>
            <span className="font-display text-xs font-bold uppercase tracking-widest text-cream/60 mt-2">
              🍔 Satisfied Cravings
            </span>
          </div>
        </div>
      </section>

      {/* 7. Drag-to-Vibe Testimonial Sticker Wall */}
      <section className="py-24 px-6 md:px-12 bg-cream text-charcoal border-b-4 border-charcoal overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="px-3 py-1 bg-brand-red text-cream font-display text-xs font-bold uppercase tracking-widest rounded border border-charcoal inline-block mb-3 -rotate-1">
              Sticky Reviews
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight">
              The Sticker Wall
            </h2>
            <p className="text-charcoal/70 mt-3 font-semibold">
              Grab, drag, and toss these reviews around the fridge!
            </p>
          </div>

          {/* Interactive Bounding Box */}
          <div
            ref={dragContainerRef}
            className="w-full min-h-[480px] bg-white border-4 border-charcoal rounded-3xl shadow-[8px_8px_0px_0px_#1A1410] relative overflow-hidden p-6 bg-grid-dots"
          >
            {/* Wall Instructions */}
            <div className="absolute top-4 right-4 bg-brand-lime text-charcoal border-2 border-charcoal font-display text-xs font-black uppercase py-1 px-3 rotate-2 z-10 select-none">
              Drag them! 🖱️
            </div>

            {/* Testimonial Sticker 1 */}
            <motion.div
              drag
              dragConstraints={dragContainerRef}
              whileDrag={{ scale: 1.05, rotate: 0, zIndex: 40 }}
              initial={{ x: 30, y: 50, rotate: -6 }}
              className="absolute w-72 bg-brand-lime border-4 border-charcoal p-6 rounded-2xl shadow-[4px_4px_0px_0px_#1A1410] cursor-grab active:cursor-grabbing text-left select-none"
            >
              <div className="flex gap-1 text-brand-red mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="font-medium text-xs leading-relaxed italic mb-4">
                "The cheese pull on the Grilled Cheese is actual sorcery. Also, the Cold Coffee Shake is thick enough to stand a straw in! S'wich is my new late-night spot."
              </p>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xs">Ananya S.</span>
                <span className="text-[8px] font-semibold text-charcoal/50 uppercase tracking-widest">Local Guide • Chhatrapati Sambhajinagar</span>
              </div>
            </motion.div>

            {/* Testimonial Sticker 2 */}
            <motion.div
              drag
              dragConstraints={dragContainerRef}
              whileDrag={{ scale: 1.05, rotate: 0, zIndex: 40 }}
              initial={{ x: 320, y: 150, rotate: 8 }}
              className="absolute w-72 bg-brand-red text-cream border-4 border-charcoal p-6 rounded-2xl shadow-[4px_4px_0px_0px_#1A1410] cursor-grab active:cursor-grabbing text-left select-none"
            >
              <div className="flex gap-1 text-brand-lime mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="font-medium text-xs leading-relaxed italic mb-4 text-cream/90">
                "We ordered the Peri-Peri Chicken S'wich and loaded waffle fries for our crew. The chicken was incredibly tender and the peri sauce is spicy enough to keep you on your toes!"
              </p>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xs text-cream">Rohit K.</span>
                <span className="text-[8px] font-semibold text-cream/65 uppercase tracking-widest">Customer • Kanchanwadi</span>
              </div>
            </motion.div>

            {/* Testimonial Sticker 3 */}
            <motion.div
              drag
              dragConstraints={dragContainerRef}
              whileDrag={{ scale: 1.05, rotate: 0, zIndex: 40 }}
              initial={{ x: 180, y: 260, rotate: -3 }}
              className="absolute w-72 bg-cream border-4 border-charcoal p-6 rounded-2xl shadow-[4px_4px_0px_0px_#1A1410] cursor-grab active:cursor-grabbing text-left select-none"
            >
              <div className="flex gap-1 text-brand-red mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="font-medium text-xs leading-relaxed italic mb-4 text-charcoal/90">
                "The vibe inside is awesome. Cool tunes, chilled-out staff, and the Nutella Banana Shake is absolute heaven. Definitely making the S'wich every weekend."
              </p>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xs">Priya M.</span>
                <span className="text-[8px] font-semibold text-charcoal/50 uppercase tracking-widest">Instagram Influencer</span>
              </div>
            </motion.div>

            {/* Wall Background sticker */}
            <div className="absolute bottom-4 left-4 font-display font-black text-xs text-charcoal/20 select-none uppercase pointer-events-none">
              S'WICH FRIDGE REVIEWS ©
            </div>
          </div>
        </div>
      </section>

      {/* 8. UGC Feed */}
      <section className="py-16 px-6 md:px-12 bg-charcoal text-cream relative">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-12 text-center">
          <div className="flex flex-col gap-3">
            <h2 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight">
              Get Featured on the Feed
            </h2>
            <p className="text-cream/70 text-sm max-w-sm mx-auto font-medium">
              Snap a pic of your cheese pull or shake drip, tag <span className="text-brand-lime">@make_the_swich</span> to get added to our vibe wall!
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            <div className="h-40 md:h-52 border-2 border-cream rounded-xl overflow-hidden shadow-[2px_2px_0px_0px_#FFF8EC]">
              <img
                src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=400&q=80"
                alt="Instagram post vibe"
                className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="h-40 md:h-52 border-2 border-cream rounded-xl overflow-hidden shadow-[2px_2px_0px_0px_#FFF8EC]">
              <img
                src="https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80"
                alt="Instagram post shake"
                className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="h-40 md:h-52 border-2 border-cream rounded-xl overflow-hidden shadow-[2px_2px_0px_0px_#FFF8EC]">
              <img
                src="https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80"
                alt="Instagram post sandwich"
                className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="h-40 md:h-52 border-2 border-cream rounded-xl overflow-hidden shadow-[2px_2px_0px_0px_#FFF8EC]">
              <img
                src="https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=400&q=80"
                alt="Instagram post vibes"
                className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <Link
            to="/gallery"
            className="px-5 py-3 border-2 border-cream rounded-xl font-display text-xs font-bold uppercase tracking-wider text-cream hover:bg-brand-lime hover:text-charcoal hover:border-charcoal transition-all duration-200 cursor-pointer"
          >
            Open Feed Gallery
          </Link>
        </div>
      </section>

    </div>
  );
}
