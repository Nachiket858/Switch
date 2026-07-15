import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CardTilt from '../components/CardTilt';
import Reveal from '../components/Reveal';
import SplitText from '../components/SplitText';
import MagneticButton from '../components/MagneticButton';

export default function OurStory() {
  return (
    <div className="flex-1 relative overflow-hidden">
      <div className="glow glow-butter w-[30rem] h-[30rem] -top-24 -right-28" />
      <div className="glow glow-flame w-[26rem] h-[26rem] top-[55%] -left-28" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 relative z-10">
        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center mb-28">
          <div className="lg:col-span-7 flex flex-col gap-7">
            <Reveal>
              <span className="sticker bg-paper shadow-soft text-flame self-start">Since 2024 · Sambhajinagar</span>
            </Reveal>
            <h1 className="font-display font-semibold text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.98] tracking-tight text-cocoa">
              <SplitText text="Why Are Sandwiches" stagger={0.02} /><br />
              <span className="text-flame"><SplitText text="So Boring?" stagger={0.03} delay={0.2} /></span>
            </h1>
            <Reveal delay={0.3}>
              <p className="text-cocoa/70 text-base md:text-lg leading-relaxed max-w-xl">
                That's the question that started everything. We were tired of soggy lettuce,
                dry bread, and watered-down milkshakes. Fast-casual had lost its soul to
                boardrooms and mass production — so we decided to
                <span className="hand-note text-flame text-2xl mx-1.5">make the s'wich.</span>
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="text-cocoa/55 text-sm md:text-base leading-relaxed max-w-xl">
                S'wich was built for late-night study sessions, mid-day breaks, and post-party
                munchies. Bold street flavours, high-dopamine energy, zero compromises.
                No pre-packaged anything.
              </p>
            </Reveal>
          </div>

          {/* Polaroid stack */}
          <div className="lg:col-span-5 relative flex justify-center py-8">
            <div className="relative w-72 h-96">
              <Reveal direction="scale">
                <motion.div
                  whileHover={{ rotate: -3, scale: 1.03, zIndex: 10 }}
                  className="absolute top-0 left-0 bg-paper p-3.5 pb-8 shadow-lift rounded-2xl -rotate-6 w-64"
                >
                  <img
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=520&q=80"
                    alt="Inside the first S'wich shop"
                    loading="lazy"
                    className="w-full h-44 object-cover rounded-xl img-warm"
                  />
                  <span className="hand-note text-lg text-cocoa block mt-3 text-center">
                    the first s'wich spot
                  </span>
                </motion.div>
              </Reveal>
              <Reveal direction="scale" delay={0.15}>
                <motion.div
                  whileHover={{ rotate: 3, scale: 1.03, zIndex: 10 }}
                  className="absolute bottom-0 right-0 bg-paper p-3.5 pb-8 shadow-lift rounded-2xl rotate-6 w-60"
                >
                  <img
                    src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=520&q=80"
                    alt="Happy customers at S'wich"
                    loading="lazy"
                    className="w-full h-40 object-cover rounded-xl img-warm"
                  />
                  <span className="hand-note text-lg text-cocoa block mt-3 text-center">
                    good vibes only
                  </span>
                </motion.div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-28">
          <div className="text-center mb-16">
            <Reveal>
              <span className="sticker bg-paper shadow-soft text-flame mb-5">The journey</span>
            </Reveal>
            <h2 className="font-display font-semibold text-[clamp(2.2rem,5vw,3.8rem)] tracking-tight text-cocoa">
              <SplitText text="Small Spot, Big Flavour." stagger={0.02} />
            </h2>
          </div>

          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-[2px] bg-cocoa/10 md:-translate-x-1/2" />
            {[
              { year: '2024', title: 'The first counter opens', body: 'One tiny kitchen on Paithan Road, a griddle, and a stubborn belief that sandwiches deserve better.', icon: 'fa-key', iconBg: 'bg-butter text-cocoa' },
              { year: '2024', title: 'The Peri-Peri era begins', body: 'Our house peri-peri sauce becomes the thing people cross the city for. The cult forms.', icon: 'fa-pepper-hot', iconBg: 'bg-flame text-paper' },
              { year: '2025', title: 'Second outlet, same soul', body: 'Vedant Nagar says hi. Two kitchens now, but every bun still gets toasted in herb butter.', icon: 'fa-store', iconBg: 'bg-pista text-cocoa' },
              { year: 'Now', title: '385+ reviews & counting', body: '4.8 stars on Google, 10k+ cravings satisfied, and a feed full of cheese pulls.', icon: 'fa-rocket', iconBg: 'bg-cocoa text-cream' },
            ].map((step, i) => (
              <Reveal
                key={i}
                direction={i % 2 === 0 ? 'right' : 'left'}
                delay={0.05}
                className={`relative flex mb-12 pl-14 md:pl-0 ${
                  i % 2 === 0 ? 'md:justify-start md:pr-[calc(50%+2.5rem)]' : 'md:justify-end md:pl-[calc(50%+2.5rem)]'
                }`}
              >
                <span className={`absolute left-5 md:left-1/2 top-2 w-10 h-10 -translate-x-1/2 rounded-full ${step.iconBg} shadow-soft flex items-center justify-center text-sm z-10`}>
                  <i className={`fa-solid ${step.icon}`} />
                </span>
                <div className="card-soft p-7 w-full">
                  <span className="hand-note text-xl text-flame">{step.year}</span>
                  <h3 className="font-display text-xl font-semibold text-cocoa tracking-tight mt-1 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-cocoa/55 text-sm leading-relaxed">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Founder note */}
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-cocoa text-cream rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden">
            <div className="absolute -top-20 right-10 w-72 h-72 bg-flame/15 blur-[80px] rounded-full pointer-events-none" />
            <div className="lg:col-span-4 flex justify-center relative z-10">
              <CardTilt>
                <div className="bg-paper p-4 pb-10 rounded-2xl shadow-lift -rotate-3 w-60 md:w-64">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=520&q=80"
                    alt="Maya, founder of S'wich"
                    loading="lazy"
                    className="w-full h-60 object-cover rounded-xl img-warm"
                  />
                  <span className="hand-note text-lg text-cocoa block mt-3 text-center leading-tight">
                    maya — founder & sandwich architect
                  </span>
                </div>
              </CardTilt>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-6 relative z-10">
              <span className="hand-note text-2xl text-butter">a note from maya</span>
              <p className="text-cream/75 text-base md:text-lg leading-relaxed font-medium">
                "S'wich is more than a quick-bite spot — it's a statement. Every recipe and
                every shake consistency was tested hundreds of times in my own kitchen before
                it reached our counter. We're proud of the 4.8★, but we're prouder of the
                community. Come make the S'wich, and taste the difference."
              </p>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex flex-col">
                  <span className="font-display font-semibold text-flame text-2xl tracking-tight">Maya R.</span>
                  <span className="text-[0.65rem] font-semibold text-cream/40 uppercase tracking-[0.2em] mt-1">
                    Founder & Chief Food Architect
                  </span>
                </div>
                <MagneticButton>
                  <Link to="/menu" className="btn-primary">
                    Taste the story <ArrowRight className="w-4 h-4" />
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
