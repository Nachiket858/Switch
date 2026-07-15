import { MapPin, Clock, Phone, CreditCard, Coffee, Navigation } from 'lucide-react';
import CardTilt from '../components/CardTilt';
import Reveal from '../components/Reveal';
import SplitText from '../components/SplitText';
import MagneticButton from '../components/MagneticButton';

export default function VisitUs() {
  const address =
    'Gut No 20, Plot No 5, Paithan Road, Opposite Dhillon Residency, Kanchanwadi, Chhatrapati Sambhajinagar, Maharashtra 431011';

  return (
    <div className="flex-1 relative overflow-hidden">
      <div className="glow glow-blush w-[28rem] h-[28rem] -top-24 -left-28" />
      <div className="glow glow-pista w-[26rem] h-[26rem] bottom-0 -right-28" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <Reveal>
            <span className="sticker bg-paper shadow-soft text-flame mb-5">Find the spot</span>
          </Reveal>
          <h1 className="font-display font-semibold text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.95] tracking-tight text-cocoa">
            <SplitText text="Pull Up," stagger={0.03} />{' '}
            <span className="text-flame"><SplitText text="Say Hi." stagger={0.03} delay={0.15} /></span>
          </h1>
          <Reveal delay={0.25}>
            <p className="text-cocoa/60 mt-4 font-medium">
              Dine-in, takeaway, or delivery.
              <span className="hand-note text-flame text-xl ml-1.5">the AC is always on</span>
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Info column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Reveal direction="right">
              <div className="card-soft p-7 flex flex-col gap-4 relative overflow-hidden">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 bg-flame text-paper rounded-2xl flex items-center justify-center shadow-glow">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h2 className="font-display text-xl font-semibold text-cocoa tracking-tight">
                    Our Location
                  </h2>
                </div>
                <p className="text-cocoa/60 text-sm leading-relaxed">{address}</p>
                <div className="flex gap-3 mt-1">
                  <MagneticButton className="flex-1" strength={0.2}>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full !py-3.5 !text-[0.7rem]"
                    >
                      <Navigation className="w-3.5 h-3.5" /> Get Directions
                    </a>
                  </MagneticButton>
                  <a
                    href="tel:+919999999999"
                    aria-label="Call S'wich"
                    className="w-12 h-12 self-center flex items-center justify-center rounded-full bg-cocoa text-paper hover:bg-flame transition-colors cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.1}>
              <div className="card-soft p-7 flex flex-col gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 bg-butter text-cocoa rounded-2xl flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h2 className="font-display text-xl font-semibold text-cocoa tracking-tight">
                    Opening Hours
                  </h2>
                </div>
                <div className="flex justify-between items-center font-display font-medium text-sm text-cocoa border-b border-cocoa/8 pb-3">
                  <span>Monday – Sunday</span>
                  <span className="text-flame font-semibold">11:00 AM – 11:00 PM</span>
                </div>
                <span className="text-xs text-cocoa/45 leading-relaxed">
                  Open daily, including holidays. Last order at 10:45 PM.
                  <span className="hand-note text-base text-flame ml-1">late-night cravings covered</span>
                </span>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 gap-4">
              <Reveal direction="up" delay={0.15}>
                <div className="card-soft p-6 flex flex-col items-center text-center gap-2">
                  <Coffee className="w-6 h-6 text-flame" />
                  <span className="font-display text-sm font-semibold text-cocoa">Indoor Seating</span>
                  <span className="text-[0.68rem] text-cocoa/45">Chill AC & good playlists</span>
                </div>
              </Reveal>
              <Reveal direction="up" delay={0.2}>
                <div className="card-soft p-6 flex flex-col items-center text-center gap-2">
                  <CreditCard className="w-6 h-6 text-flame" />
                  <span className="font-display text-sm font-semibold text-cocoa">Digital Payments</span>
                  <span className="text-[0.68rem] text-cocoa/45">UPI, cards, wallets</span>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Map column */}
          <Reveal direction="left" delay={0.1} className="lg:col-span-7 flex">
            <CardTilt className="w-full flex" max={3}>
              <div className="w-full rounded-[2rem] shadow-lift relative overflow-hidden flex min-h-[380px] lg:min-h-full">
                <span className="absolute top-5 left-5 sticker bg-paper shadow-soft text-cocoa z-10 -rotate-2">
                  <i className="fa-solid fa-location-dot text-flame" /> We're right here
                </span>
                <span className="absolute bottom-5 right-5 sticker bg-flame text-paper shadow-glow z-10 rotate-2">
                  <i className="fa-solid fa-star text-butter" /> 4.8 rated
                </span>
                <iframe
                  title="S'wich Store Map Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3753.864332906803!2d75.30159497582772!3d19.81395982823871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb997bf6abf945%3A0x6b8bc2eb816999a4!2sPaithan%20Rd%2C%20Kanchanwadi%2C%20Chhatrapati%20Sambhajinagar%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1721000000000!5m2!1sen!2sin"
                  className="w-full h-full min-h-[380px] lg:min-h-full border-none"
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
            </CardTilt>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
