import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Map, Navigation, CreditCard, Coffee, Sparkles } from 'lucide-react';
import CardTilt from '../components/CardTilt';

export default function VisitUs() {
  const address = "Gut No 20, Plot No 5, Paithan Road, Opposite Dhillon Residency, Kanchanwadi, Chhatrapati Sambhajinagar, Maharashtra 431011";

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex-1">
      {/* Page Title */}
      <div className="text-center mb-12">
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="px-3 py-1 bg-brand-lime text-charcoal font-display text-xs font-bold uppercase tracking-widest rounded border border-charcoal inline-block mb-3 -rotate-1"
        >
          Locate Us
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-6xl font-black tracking-tight text-charcoal"
        >
          Drop By & Say Hi!
        </motion.h1>
        <p className="text-charcoal/70 mt-3 font-medium">
          Dine-in, take away, or get it delivered. We're waiting for you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        {/* Info Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          {/* Address Card */}
          <div className="bg-cream border-2 border-charcoal p-6 rounded-2xl shadow-[4px_4px_0px_0px_#1A1410] flex flex-col gap-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-red/5 rounded-full translate-x-8 -translate-y-8" />
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-brand-red text-cream rounded-xl border border-charcoal">
                <MapPin className="w-5 h-5" />
              </div>
              <h2 className="font-display text-xl font-bold text-charcoal leading-none">
                Our Location
              </h2>
            </div>
            <p className="text-charcoal/80 text-sm leading-relaxed font-sans">
              {address}
            </p>
            <div className="flex gap-3 mt-2">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 bg-brand-lime text-charcoal font-display text-xs font-bold uppercase tracking-wider rounded-xl border border-charcoal text-center shadow-[2px_2px_0px_0px_#1A1410] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
              >
                Get Directions
              </a>
              <a
                href="tel:+919999999999"
                className="px-4 py-3 bg-charcoal text-cream font-display text-xs font-bold uppercase rounded-xl border border-charcoal text-center flex items-center justify-center hover:bg-brand-red hover:text-charcoal transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Hours Card */}
          <div className="bg-cream border-2 border-charcoal p-6 rounded-2xl shadow-[4px_4px_0px_0px_#1A1410] flex flex-col gap-3 relative overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-brand-lime text-charcoal rounded-xl border border-charcoal">
                <Clock className="w-5 h-5" />
              </div>
              <h2 className="font-display text-xl font-bold text-charcoal leading-none">
                Operating Hours
              </h2>
            </div>
            <div className="flex flex-col gap-1.5 mt-2 font-display text-sm font-bold text-charcoal">
              <div className="flex justify-between border-b border-charcoal/10 pb-2">
                <span>Monday - Sunday</span>
                <span className="text-brand-red">11:00 AM - 11:00 PM</span>
              </div>
              <span className="text-xs font-sans font-medium text-charcoal/60 mt-1">
                *Open daily, including holidays. Last order taken at 10:45 PM.
              </span>
            </div>
          </div>

          {/* Vibe Badges */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border-2 border-charcoal rounded-2xl flex flex-col items-center justify-center text-center gap-2 bg-brand-lime/10">
              <Coffee className="w-6 h-6 text-brand-red" />
              <span className="font-display text-sm font-bold text-charcoal">Indoor Seating</span>
              <span className="text-[10px] text-charcoal/60">Chill AC & cool beats</span>
            </div>
            <div className="p-4 border-2 border-charcoal rounded-2xl flex flex-col items-center justify-center text-center gap-2 bg-brand-red/10">
              <CreditCard className="w-6 h-6 text-brand-red" />
              <span className="font-display text-sm font-bold text-charcoal">Digital Payments</span>
              <span className="text-[10px] text-charcoal/60">UPI, Cards, Wallets</span>
            </div>
          </div>
        </motion.div>

        {/* Map Column */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-7 flex"
        >
          <CardTilt className="w-full flex">
            <div className="w-full bg-charcoal border-4 border-charcoal rounded-3xl shadow-[8px_8px_0px_0px_#1A1410] relative overflow-hidden flex min-h-[350px] lg:min-h-full">
              {/* Map Sticker */}
              <div className="absolute top-4 left-4 bg-brand-lime text-charcoal border-2 border-charcoal font-display text-xs font-black uppercase tracking-wider py-1.5 px-3 z-10 -rotate-3 shadow-[2px_2px_0px_0px_#1A1410]">
                We are here! 📍
              </div>

              {/* Rating Sticker */}
              <div className="absolute bottom-4 right-4 bg-brand-red text-cream border-2 border-charcoal font-display text-xs font-black uppercase tracking-wider py-1.5 px-3 z-10 rotate-6 shadow-[2px_2px_0px_0px_#1A1410]">
                ⭐ 4.8 / 5 Rating
              </div>

              {/* Embedded Iframe */}
              <iframe
                title="S'wich Store Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3753.864332906803!2d75.30159497582772!3d19.81395982823871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb997bf6abf945%3A0x6b8bc2eb816999a4!2sPaithan%20Rd%2C%20Kanchanwadi%2C%20Chhatrapati%20Sambhajinagar%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1721000000000!5m2!1sen!2sin"
                className="w-full h-full min-h-[350px] lg:min-h-full border-none grayscale contrast-125 focus:outline-none"
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </CardTilt>
        </motion.div>
      </div>
    </div>
  );
}
