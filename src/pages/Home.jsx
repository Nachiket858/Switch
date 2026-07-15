import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowUpRight, Star, Play, Heart, MessageCircle } from 'lucide-react';
import InstagramIcon from '../components/InstagramIcon';
import CardTilt from '../components/CardTilt';
import MagneticButton from '../components/MagneticButton';
import SplitText from '../components/SplitText';
import Reveal from '../components/Reveal';
import Marquee from '../components/Marquee';
import FloatingIngredients from '../components/FloatingIngredients';

gsap.registerPlugin(ScrollTrigger);

/* ---------------- Animated counter ---------------- */
const AnimatedCounter = ({ value, duration = 1500, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(parseFloat(value));
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const end = parseFloat(value);
          if (isNaN(end)) return;
          const startTime = performance.now();
          const update = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = ease * end;
            setCount(end % 1 === 0 ? Math.floor(current) : parseFloat(current.toFixed(1)));
            if (progress < 1) requestAnimationFrame(update);
            else setCount(end);
          };
          requestAnimationFrame(update);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

/* ---------------- Data ---------------- */
const editorialStrip = [
  {
    img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=700&q=80',
    label: 'The cheese pull',
  },
  {
    img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=700&q=80',
    label: 'Gelato-thick shakes',
  },
  {
    img: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=700&q=80',
    label: 'Baked every morning',
  },
  {
    img: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=700&q=80',
    label: 'Loaded peri fries',
  },
];

const bestSellers = [
  {
    id: 1,
    name: "Peri-Peri Chicken S'wich",
    desc: 'Flame-grilled chicken, molten cheddar, crisp lettuce & house peri-peri mayo on a sesame brioche.',
    price: '₹289',
    tag: 'Best Seller',
    tagColor: 'bg-flame text-paper',
    img: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=900&q=80',
    big: true,
  },
  {
    id: 2,
    name: 'Nutella Banana Thickshake',
    desc: 'Gelato-thick. Heavy Nutella swirl. Stand-your-straw-in-it certified.',
    price: '₹199',
    tag: 'Cult Fav',
    tagColor: 'bg-butter text-cocoa',
    img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 3,
    name: 'Loaded Peri Fries',
    desc: 'Double-fried, cheddar-drowned, peri-dusted. Dangerously shareable.',
    price: '₹149',
    tag: 'New Drop',
    tagColor: 'bg-pista text-cocoa',
    img: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=700&q=80',
  },
];

const feedPosts = [
  { img: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=520&q=80', caption: 'the cheese pull that broke the group chat', likes: '1.2k', reel: true },
  { img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=520&q=80', caption: 'thick enough to stand a straw. proof inside', likes: '986', reel: false },
  { img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=520&q=80', caption: 'golden hour, golden crust', likes: '2.1k', reel: true },
  { img: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=520&q=80', caption: 'loaded fries appreciation post', likes: '1.5k', reel: false },
  { img: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=520&q=80', caption: 'squad assembled. sandwiches demolished.', likes: '874', reel: false },
  { img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=520&q=80', caption: 'cold coffee szn never ends', likes: '1.1k', reel: true },
];

const reviews = [
  {
    text: 'The cheese pull on the Grilled Cheese is actual sorcery. Cold Coffee Shake is thick enough to stand a straw in!',
    name: 'Ananya S.',
    role: 'Local Guide',
    initial: 'A',
    avatarBg: 'bg-butter text-cocoa',
    align: 'left',
  },
  {
    text: "Peri-Peri Chicken S'wich + loaded fries for the whole crew. Chicken was crazy tender, sauce keeps you on your toes.",
    name: 'Rohit K.',
    role: 'Regular · Kanchanwadi',
    initial: 'R',
    avatarBg: 'bg-cocoa text-cream',
    align: 'right',
  },
  {
    text: 'The vibe inside is unmatched. Cool tunes, chill staff, and the Nutella Banana Shake is heaven.',
    name: 'Priya M.',
    role: 'Content Creator',
    initial: 'P',
    avatarBg: 'bg-pista text-cocoa',
    align: 'left',
  },
];

/* ---------------- Sandwich layers for scroll assembly ---------------- */
const LAYERS = [
  { key: 'bun-top', label: 'Sesame brioche, baked daily', el: 'bun-top' },
  { key: 'sauce', label: 'House peri-peri drip', el: 'sauce' },
  { key: 'lettuce', label: 'Snap-fresh lettuce', el: 'lettuce' },
  { key: 'tomato', label: 'Vine-ripened tomato', el: 'tomato' },
  { key: 'cheese', label: 'Molten cheddar melt', el: 'cheese' },
  { key: 'patty', label: 'Flame-grilled filling', el: 'patty' },
  { key: 'bun-bottom', label: 'Butter-toasted base', el: 'bun-bottom' },
];

function LayerVisual({ type }) {
  switch (type) {
    case 'bun-top':
      return (
        <div className="w-64 md:w-80 h-16 md:h-20 rounded-t-full rounded-b-2xl bg-gradient-to-b from-[#E8A54B] to-[#C97F2E] shadow-lg relative">
          {[18, 38, 58, 78, 30, 66].map((left, i) => (
            <span
              key={i}
              className="absolute w-2 h-1 rounded-full bg-[#FFF3DC]/80 rotate-12"
              style={{ left: `${left}%`, top: `${25 + (i % 3) * 18}%` }}
            />
          ))}
        </div>
      );
    case 'sauce':
      return (
        <div className="w-60 md:w-[19rem] h-4 -mt-2 rounded-full bg-flame relative">
          <span className="absolute left-[20%] top-2 w-3 h-6 rounded-b-full bg-flame" />
          <span className="absolute left-[55%] top-2 w-3 h-8 rounded-b-full bg-flame" />
          <span className="absolute left-[80%] top-2 w-3 h-5 rounded-b-full bg-flame" />
        </div>
      );
    case 'lettuce':
      return (
        <div
          className="w-[17rem] md:w-[21rem] h-6 md:h-7 bg-pista"
          style={{ borderRadius: '50% 45% 55% 40% / 90% 80% 85% 95%' }}
        />
      );
    case 'tomato':
      return (
        <div className="flex gap-2 -mt-1">
          <span className="w-20 md:w-24 h-5 rounded-full bg-[#E0432B]" />
          <span className="w-20 md:w-24 h-5 rounded-full bg-[#E0432B]" />
          <span className="w-14 md:w-16 h-5 rounded-full bg-[#E0432B]" />
        </div>
      );
    case 'cheese':
      return <div className="w-[16.5rem] md:w-[20rem] h-4 bg-butter rotate-[-1.5deg] rounded-sm shadow-[0_6px_0_rgba(255,185,46,0.5)]" />;
    case 'patty':
      return <div className="w-60 md:w-[18.5rem] h-10 md:h-12 rounded-2xl bg-gradient-to-b from-[#8A5A2B] to-[#6B421C] shadow-md" />;
    case 'bun-bottom':
      return <div className="w-64 md:w-80 h-10 md:h-12 rounded-b-[2rem] rounded-t-lg bg-gradient-to-b from-[#D99441] to-[#B87428]" />;
    default:
      return null;
  }
}

/* ================================================================ */
export default function Home() {
  const heroRef = useRef(null);
  const stackRef = useRef(null);
  const manifestoRef = useRef(null);

  /* Mouse parallax via motion values — zero React re-renders */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parX = useSpring(mouseX, { stiffness: 50, damping: 16, mass: 0.5 });
  const parY = useSpring(mouseY, { stiffness: 50, damping: 16, mass: 0.5 });
  const parXInv = useTransform(parX, (v) => -v * 0.55);
  const parYInv = useTransform(parY, (v) => -v * 0.55);

  const handleMouseMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    mouseX.set((e.clientX - window.innerWidth / 2) / 42);
    mouseY.set((e.clientY - window.innerHeight / 2) / 42);
  };

  /* Scroll-linked hero image drift */
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImgY = useTransform(heroProgress, [0, 1], [0, 70]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      /* --- Sandwich assembly: pinned + scrubbed (kept tight to avoid dead scroll) --- */
      const layers = gsap.utils.toArray('.stack-layer');
      const labels = gsap.utils.toArray('.stack-label');
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stackRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
        },
      });

      layers.forEach((layer, i) => {
        const fromX = i % 2 === 0 ? -260 : 260;
        tl.fromTo(
          layer,
          { y: -260, x: fromX, rotate: i % 2 === 0 ? -20 : 20, opacity: 0 },
          { y: 0, x: 0, rotate: 0, opacity: 1, ease: 'power2.out', duration: 1 },
          i * 0.55
        );
        if (labels[i]) {
          tl.fromTo(
            labels[i],
            { opacity: 0, x: i % 2 === 0 ? 30 : -30 },
            { opacity: 1, x: 0, duration: 0.4 },
            i * 0.55 + 0.3
          ).to(labels[i], { opacity: 0, duration: 0.3 }, i * 0.55 + 1.1);
        }
      });
      tl.fromTo('.stack-final-note', { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.5 }, '>-0.2');

      /* --- Manifesto pin --- */
      ScrollTrigger.create({
        trigger: manifestoRef.current,
        start: 'top 15%',
        end: 'bottom 85%',
        pin: '.manifesto-pin',
        pinSpacing: true,
      });

      /* --- Best sellers image scale-in --- */
      gsap.utils.toArray('.seller-img').forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.2 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: img, start: 'top 95%', end: 'top 45%', scrub: true },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex-1 w-full -mt-24" onMouseMove={handleMouseMove}>

      {/* ============ 1. HERO ============ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden px-6 md:px-12 pt-28 pb-16"
      >
        {/* Ambient glows (cheap radial gradients) */}
        <div className="glow glow-butter w-[42rem] h-[42rem] -top-40 -right-40" />
        <div className="glow glow-flame w-[34rem] h-[34rem] top-1/2 -left-48" />
        <div className="glow glow-blush w-[26rem] h-[26rem] bottom-0 right-1/4" />

        <FloatingIngredients />

        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-4 items-center relative z-10">
          {/* Left — editorial type */}
          <div className="lg:col-span-6 flex flex-col items-start gap-7">
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: -4 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="sticker bg-paper shadow-soft text-cocoa"
            >
              <span className="w-2 h-2 rounded-full bg-pista animate-pulse" />
              Now serving · Chhatrapati Sambhajinagar
            </motion.div>

            <h1 className="font-display font-semibold text-[clamp(3.2rem,9vw,7rem)] leading-[0.92] tracking-tight text-cocoa">
              <SplitText text="Make" delay={0.5} />{' '}
              <SplitText text="the" delay={0.62} />
              <br />
              <span className="text-flame">
                <SplitText text="S'wich." delay={0.75} />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.6 }}
              className="text-cocoa/70 text-lg md:text-xl font-medium max-w-md leading-snug"
            >
              Loaded sandwiches. Gelato-thick shakes.
              <span className="hand-note text-flame text-2xl mx-1.5">zero</span>
              boring bites — ever.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4"
            >
              <MagneticButton>
                <Link to="/menu" className="btn-primary">
                  Explore the Menu <ArrowRight className="w-4 h-4" />
                </Link>
              </MagneticButton>
              <MagneticButton strength={0.25}>
                <Link to="/visit" className="btn-ghost">
                  <i className="fa-solid fa-location-dot text-flame" /> Find the Spot
                </Link>
              </MagneticButton>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="flex items-center gap-3 mt-1"
            >
              <div className="flex -space-x-2.5">
                {[
                  { initial: 'A', bg: 'bg-flame text-paper' },
                  { initial: 'R', bg: 'bg-butter text-cocoa' },
                  { initial: 'P', bg: 'bg-pista text-cocoa' },
                  { initial: 'M', bg: 'bg-cocoa text-cream' },
                ].map((a, i) => (
                  <span
                    key={i}
                    className={`w-9 h-9 rounded-full ${a.bg} shadow-soft flex items-center justify-center font-display font-semibold text-xs border-2 border-cream`}
                  >
                    {a.initial}
                  </span>
                ))}
              </div>
              <div className="flex flex-col">
                <span className="flex items-center gap-1 font-display font-semibold text-sm text-cocoa">
                  4.8 <Star className="w-3.5 h-3.5 fill-butter stroke-butter" /> on Google
                </span>
                <span className="text-xs text-cocoa/50 font-medium">385+ obsessed reviews</span>
              </div>
            </motion.div>
          </div>

          {/* Right — cinematic food stage */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            <motion.div
              style={{ x: parX, y: parY, translateY: heroImgY }}
              className="relative w-full max-w-[560px] flex items-center justify-center"
            >
              {/* Stage: dashed orbit ring */}
              <div className="absolute w-[104%] aspect-square rounded-full border-2 border-dashed border-cocoa/12 animate-spin-slow" />

              {/* Hero shot in an arch-masked card (packaging-window shape) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-[88%] rounded-t-[999px] rounded-b-[2.5rem] overflow-hidden shadow-lift z-10 rotate-[1.5deg]"
              >
                <img
                  src="/assets/hero_sandwich.png"
                  alt="S'wich signature sandwich with flying fresh ingredients"
                  className="w-full h-auto object-cover img-warm select-none scale-[1.04]"
                  draggable="false"
                  fetchPriority="high"
                />
              </motion.div>

              {/* Spinning circular text badge */}
              <motion.div
                style={{ x: parXInv, y: parYInv }}
                className="absolute -bottom-3 -right-2 md:bottom-2 md:-right-4 w-28 h-28 md:w-32 md:h-32 z-20"
              >
                <div className="w-full h-full animate-spin-slow">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <path id="circlePath" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                    </defs>
                    <text className="font-display uppercase" fill="#22150B" fontSize="10.5" letterSpacing="2.5">
                      <textPath href="#circlePath">fresh daily · made loud · s'wich ·</textPath>
                    </text>
                  </svg>
                </div>
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-12 h-12 rounded-full bg-flame text-paper flex items-center justify-center shadow-glow">
                    <i className="fa-solid fa-burger text-lg" />
                  </span>
                </span>
              </motion.div>

              {/* Floating glass chips (outer div = parallax, inner = entrance) */}
              <motion.div
                style={{ x: parXInv, y: parYInv }}
                className="absolute top-8 -right-1 md:top-12 md:-right-6 z-20"
              >
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                  className="glass rounded-2xl shadow-soft px-4 py-3 flex items-center gap-3"
                >
                  <span className="w-9 h-9 rounded-xl bg-butter/90 text-cocoa flex items-center justify-center">
                    <i className="fa-solid fa-ice-cream" />
                  </span>
                  <div className="flex flex-col">
                    <span className="font-display font-semibold text-xs text-cocoa leading-none">Gelato-thick</span>
                    <span className="text-[0.62rem] text-cocoa/55 font-medium mt-1">14 shake flavours</span>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                style={{ x: parXInv, y: parYInv }}
                className="absolute bottom-14 -left-3 md:bottom-20 md:-left-8 z-20"
              >
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.65, duration: 0.6 }}
                  className="glass rounded-2xl shadow-soft px-4 py-3 flex items-center gap-3"
                >
                  <span className="w-9 h-9 rounded-xl bg-flame text-paper flex items-center justify-center">
                    <i className="fa-solid fa-fire" />
                  </span>
                  <div className="flex flex-col">
                    <span className="font-display font-semibold text-xs text-cocoa leading-none">Peri-peri house sauce</span>
                    <span className="text-[0.62rem] text-cocoa/55 font-medium mt-1">The cult favourite</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-cocoa/40 hidden md:flex"
        >
          <span className="text-[0.6rem] uppercase tracking-[0.3em] font-display font-medium">scroll to snack</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-[1.5px] h-8 bg-cocoa/30 rounded-full"
          />
        </motion.div>
      </section>

      {/* ============ 2. MARQUEE RIBBON ============ */}
      <div className="relative z-20 -rotate-1 scale-[1.02]">
        <Marquee
          items={["Make the S'wich", 'Thick Gelato Shakes', "One S'wich Zero Regrets", 'Dine-in · Delivery · Takeaway', 'Fresh Buns Daily']}
          className="bg-flame text-paper py-4 shadow-glow"
          itemClassName="font-display text-lg md:text-2xl font-semibold uppercase tracking-wide"
        />
      </div>

      {/* ============ 3. EDITORIAL PHOTO STRIP ============ */}
      <section className="relative py-24 px-6 md:px-12 bg-cream overflow-hidden">
        <div className="glow glow-blush w-[28rem] h-[28rem] -top-20 left-1/4" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <Reveal>
              <span className="sticker bg-paper shadow-soft text-flame mb-5">
                <i className="fa-solid fa-camera" /> Shot fresh, served fresher
              </span>
            </Reveal>
            <h2 className="font-display font-semibold text-[clamp(2.2rem,5vw,3.8rem)] leading-none tracking-tight text-cocoa">
              <SplitText text="A Day At S'wich." stagger={0.02} />
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {editorialStrip.map((shot, i) => (
              <Reveal key={i} delay={i * 0.08} direction="up">
                <div
                  className={`group relative rounded-[1.6rem] overflow-hidden shadow-soft hover:shadow-lift transition-shadow duration-400 ${
                    i % 2 === 0 ? 'md:mt-8' : ''
                  }`}
                >
                  <img
                    src={shot.img}
                    alt={shot.label}
                    loading="lazy"
                    className="w-full h-56 md:h-72 object-cover img-warm group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cocoa/60 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 right-4 hand-note text-xl text-cream leading-none">
                    {shot.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4. SANDWICH ASSEMBLY (pinned scroll story) ============ */}
      <section ref={stackRef} className="relative bg-cocoa text-cream overflow-hidden">
        <div className="min-h-screen flex flex-col items-center justify-center relative px-6 py-16">
          <span className="hand-note absolute top-[14%] left-[8%] text-2xl text-butter/35 -rotate-6 hidden md:block">no soggy lettuce, promise</span>
          <span className="hand-note absolute bottom-[14%] right-[7%] text-2xl text-flame/45 rotate-3 hidden md:block">stacked with intent ↓</span>

          <div className="text-center mb-10">
            <span className="sticker bg-cream/10 text-butter mb-5">How it's built</span>
            <h2 className="font-display font-semibold text-[clamp(2.2rem,6vw,4.5rem)] leading-none tracking-tight">
              Every Layer,<br />
              <span className="text-outline-cream">On Purpose.</span>
            </h2>
            <p className="text-cream/40 text-sm mt-5 max-w-xs mx-auto font-medium md:hidden">
              Keep scrolling — watch it stack.
            </p>
          </div>

          <div className="stack-wrap relative flex flex-col items-center gap-1.5 min-h-[320px] md:min-h-[380px] justify-end pb-6">
            {LAYERS.map((layer, i) => (
              <div key={layer.key} className="relative flex items-center justify-center">
                <div className="stack-layer">
                  <LayerVisual type={layer.el} />
                </div>
                <span
                  className={`stack-label hand-note absolute whitespace-nowrap text-xl md:text-2xl text-butter ${
                    i % 2 === 0 ? 'left-full ml-6' : 'right-full mr-6'
                  } hidden md:block`}
                >
                  {layer.label}
                </span>
              </div>
            ))}
            <div className="stack-final-note absolute -bottom-9 flex items-center gap-2 opacity-0">
              <i className="fa-solid fa-circle-check text-pista" />
              <span className="hand-note text-2xl text-pista">that's the s'wich</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 5. BEST SELLERS (bento) ============ */}
      <section className="relative py-28 px-6 md:px-12 bg-cream overflow-hidden">
        <div className="glow glow-blush w-[30rem] h-[30rem] top-16 -right-24" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <Reveal>
                <span className="sticker bg-paper shadow-soft text-flame mb-5">Crowd favourites</span>
              </Reveal>
              <h2 className="font-display font-semibold text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.95] tracking-tight text-cocoa">
                <SplitText text="The Ones" stagger={0.02} />{' '}<br className="hidden md:block" />
                <span className="squiggle"><SplitText text="Everyone Orders." stagger={0.02} delay={0.15} /></span>
              </h2>
            </div>
            <Reveal delay={0.2}>
              <MagneticButton>
                <Link to="/menu" className="btn-ghost whitespace-nowrap">
                  Full Menu <ArrowUpRight className="w-4 h-4" />
                </Link>
              </MagneticButton>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bestSellers.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.12} className={item.big ? 'md:row-span-2' : ''}>
                <CardTilt className="h-full">
                  <Link
                    to="/menu"
                    className="card-soft group flex flex-col h-full overflow-hidden !rounded-[2rem]"
                  >
                    <div className={`relative overflow-hidden ${item.big ? 'h-72 md:h-[26rem]' : 'h-52'}`}>
                      <img
                        src={item.img}
                        alt={item.name}
                        loading="lazy"
                        className="seller-img w-full h-full object-cover img-warm group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                      />
                      <span className={`absolute top-4 left-4 sticker ${item.tagColor} shadow-soft`}>
                        {item.tag}
                      </span>
                      <span className="absolute bottom-4 right-4 font-display font-semibold text-lg bg-paper/90 px-4 py-1.5 rounded-full text-cocoa shadow-soft group-hover:bg-flame group-hover:text-paper transition-colors duration-300">
                        {item.price}
                      </span>
                    </div>
                    <div className="p-6 md:p-7 flex flex-col gap-2 flex-1">
                      <h3 className="font-display text-xl md:text-2xl font-semibold text-cocoa tracking-tight group-hover:text-flame transition-colors duration-300">
                        {item.name}
                      </h3>
                      <p className="text-cocoa/60 text-sm leading-relaxed">{item.desc}</p>
                      <span className="mt-auto pt-3 inline-flex items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-[0.16em] text-cocoa/50 group-hover:text-flame group-hover:gap-3 transition-all duration-300">
                        Order this <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                </CardTilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 6. MANIFESTO (pinned split) ============ */}
      <section ref={manifestoRef} className="relative py-28 bg-cocoa text-cream overflow-hidden">
        <div className="glow glow-flame w-[34rem] h-[34rem] -top-24 left-1/3" />
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-14 items-start relative z-10">
          <div className="manifesto-pin lg:col-span-5 flex flex-col gap-6 pt-2">
            <span className="sticker bg-cream/10 text-butter self-start">House rules</span>
            <h3 className="font-display font-semibold text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.95] tracking-tight">
              The Rules<br />We Live By.
            </h3>
            <p className="text-cream/50 text-sm max-w-sm leading-relaxed">
              Fast-casual lost its soul to sad, pre-packaged everything.
              We hold ourselves to three non-negotiables — every single day.
            </p>
            <span className="hand-note text-2xl text-flame rotate-[-2deg]">no shortcuts, no sadness</span>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-8 pt-2">
            {[
              {
                n: '01',
                title: 'Crust With Character',
                icon: 'fa-bread-slice',
                body: 'Brioche and sourdough baked fresh daily. Crispy outside, pillowy inside, toasted in herb butter. No sponge, no cardboard.',
                accent: 'text-flame',
                iconBg: 'bg-flame/15 text-flame',
                img: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=400&q=80',
              },
              {
                n: '02',
                title: 'No Soggy Lettuce',
                icon: 'fa-leaf',
                body: "If it doesn't snap, it doesn't stack. Crisp iceberg, ripe tomatoes, hand-sliced onions — the sad stuff goes straight to compost.",
                accent: 'text-pista',
                iconBg: 'bg-pista/15 text-pista',
                img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80',
              },
              {
                n: '03',
                title: 'Gelato-Only Shakes',
                icon: 'fa-ice-cream',
                body: 'No milk dilution, no cheap syrup. Every shake starts with heavy scoops of churned gelato. Rich, thick, unapologetic.',
                accent: 'text-butter',
                iconBg: 'bg-butter/15 text-butter',
                img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80',
              },
            ].map((rule, i) => (
              <Reveal key={rule.n} delay={i * 0.08}>
                <div className="card-soft !bg-cream/[0.04] !border-cream/10 !shadow-none hover:!bg-cream/[0.07] p-7 md:p-8 flex gap-6 items-start">
                  <img
                    src={rule.img}
                    alt={rule.title}
                    loading="lazy"
                    className="hidden sm:block w-24 h-24 md:w-28 md:h-28 rounded-2xl object-cover img-warm shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`font-display font-semibold text-4xl ${rule.accent}`}>{rule.n}</span>
                      <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${rule.iconBg}`}>
                        <i className={`fa-solid ${rule.icon}`} />
                      </span>
                    </div>
                    <h4 className="font-display text-2xl font-semibold tracking-tight mb-2.5 text-cream">
                      {rule.title}
                    </h4>
                    <p className="text-cream/55 text-sm leading-relaxed">{rule.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Stats band */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 mt-24 pt-14 border-t border-cream/10 grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10">
          {[
            { value: '4.8', suffix: '', label: 'Google rating', color: 'text-butter', dur: 1200 },
            { value: '385', suffix: '+', label: 'Rave reviews', color: 'text-flame', dur: 1500 },
            { value: '10', suffix: 'k+', label: 'Cravings satisfied', color: 'text-pista', dur: 1800 },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2">
              <span className={`font-display font-semibold text-6xl md:text-7xl leading-none ${stat.color}`}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={stat.dur} />
              </span>
              <span className="text-[0.7rem] font-display font-medium uppercase tracking-[0.24em] text-cream/40">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ============ 7. THE FEED (Instagram) ============ */}
      <section className="relative py-28 bg-cream overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Reveal>
              <span className="sticker bg-paper shadow-soft text-flame mb-5">
                <InstagramIcon className="w-3.5 h-3.5" /> Latest moments
              </span>
            </Reveal>
            <h2 className="font-display font-semibold text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.95] tracking-tight text-cocoa">
              <SplitText text="Straight Off" stagger={0.02} /><br />
              <span className="text-flame"><SplitText text="The Feed." stagger={0.02} delay={0.15} /></span>
            </h2>
          </div>
          <Reveal delay={0.2}>
            <MagneticButton>
              <a
                href="https://www.instagram.com/swich.ixu"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary whitespace-nowrap"
              >
                @swich.ixu <ArrowUpRight className="w-4 h-4" />
              </a>
            </MagneticButton>
          </Reveal>
        </div>

        {/* Infinite feed slider */}
        <div className="w-full overflow-hidden group/feed">
          <div className="animate-marquee group-hover/feed:[animation-play-state:paused] gap-5 px-2.5">
            {[...feedPosts, ...feedPosts].map((post, i) => (
              <a
                key={i}
                href="https://www.instagram.com/swich.ixu"
                target="_blank"
                rel="noopener noreferrer"
                className={`relative w-60 md:w-72 shrink-0 rounded-[1.6rem] overflow-hidden shadow-soft hover:shadow-lift hover:-translate-y-2 transition-all duration-400 mx-2.5 group ${
                  i % 2 === 0 ? 'rotate-[1.2deg]' : 'rotate-[-1.2deg]'
                }`}
              >
                <img
                  src={post.img}
                  alt={post.caption}
                  loading="lazy"
                  className="w-full h-80 md:h-96 object-cover img-warm group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cocoa/80 via-transparent to-transparent" />
                {post.reel && (
                  <span className="absolute top-4 right-4 w-9 h-9 rounded-full bg-paper/85 flex items-center justify-center text-cocoa">
                    <Play className="w-4 h-4 fill-current" />
                  </span>
                )}
                <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col gap-2">
                  <p className="text-cream text-sm font-medium leading-snug">{post.caption}</p>
                  <div className="flex items-center gap-4 text-cream/70 text-xs font-semibold">
                    <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> {post.likes}</span>
                    <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> 47</span>
                    <span className="ml-auto font-display uppercase tracking-wider text-[0.6rem]">@swich.ixu</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <Reveal className="text-center mt-10">
          <p className="hand-note text-2xl text-cocoa/50 rotate-[-1deg]">
            tag <span className="text-flame">@swich.ixu</span> in your cheese pull → get featured
          </p>
        </Reveal>
      </section>

      {/* ============ 8. TESTIMONIALS (chat style) ============ */}
      <section className="relative py-28 px-6 md:px-12 bg-cream overflow-hidden">
        <div className="glow glow-pista w-[26rem] h-[26rem] -bottom-20 -left-20" />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <Reveal>
              <span className="sticker bg-paper shadow-soft text-flame mb-5">The group chat</span>
            </Reveal>
            <h2 className="font-display font-semibold text-[clamp(2.4rem,6vw,4rem)] leading-[0.95] tracking-tight text-cocoa">
              <SplitText text="Don't Take Our" stagger={0.02} /><br />
              <SplitText text="Word For It." stagger={0.02} delay={0.15} />
            </h2>
          </div>

          <div className="flex flex-col gap-7">
            {reviews.map((review, i) => (
              <Reveal
                key={i}
                direction={review.align === 'left' ? 'right' : 'left'}
                delay={i * 0.1}
                className={`flex ${review.align === 'left' ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-md flex items-end gap-3 ${review.align === 'right' ? 'flex-row-reverse' : ''}`}>
                  <span className={`w-10 h-10 rounded-full ${review.avatarBg} shadow-soft flex items-center justify-center font-display font-semibold text-sm shrink-0 mb-6`}>
                    {review.initial}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <div
                      className={`p-5 md:p-6 shadow-soft text-sm leading-relaxed font-medium ${
                        review.align === 'left'
                          ? 'bg-paper text-cocoa rounded-[1.4rem] rounded-bl-md'
                          : 'bg-flame text-paper rounded-[1.4rem] rounded-br-md'
                      }`}
                    >
                      {review.text}
                      <div className="flex gap-0.5 mt-3">
                        {[...Array(5)].map((_, s) => (
                          <Star key={s} className={`w-3.5 h-3.5 ${review.align === 'left' ? 'fill-butter stroke-butter' : 'fill-paper stroke-paper'}`} />
                        ))}
                      </div>
                    </div>
                    <span className={`text-xs font-semibold text-cocoa/45 px-2 ${review.align === 'right' ? 'text-right' : ''}`}>
                      {review.name} · {review.role}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-12" delay={0.2}>
            <span className="hand-note text-2xl text-cocoa/50">your review could be here</span>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
