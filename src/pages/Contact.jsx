import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MessageSquare, Send } from 'lucide-react';
import InstagramIcon from '../components/InstagramIcon';
import Reveal from '../components/Reveal';
import SplitText from '../components/SplitText';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', craving: 'both', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', craving: 'both', message: '' });
    setSubmitted(false);
  };

  const inputClass =
    'p-4 bg-cream rounded-2xl text-cocoa font-medium text-sm outline-none focus:bg-blush/40 focus:shadow-soft transition-all placeholder:text-cocoa/30';

  return (
    <div className="flex-1 relative overflow-hidden">
      <div className="glow glow-butter w-[28rem] h-[28rem] -top-24 -right-28" />
      <div className="glow glow-flame w-[24rem] h-[24rem] bottom-0 -left-28" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <Reveal>
            <span className="sticker bg-paper shadow-soft text-flame mb-5">Say hey</span>
          </Reveal>
          <h1 className="font-display font-semibold text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.95] tracking-tight text-cocoa">
            <SplitText text="Slide Into" stagger={0.03} /><br />
            <span className="text-flame"><SplitText text="Our DMs." stagger={0.03} delay={0.15} /></span>
          </h1>
          <Reveal delay={0.25}>
            <p className="text-cocoa/60 mt-4 font-medium max-w-md mx-auto">
              Feedback, catering, collabs — or just your favourite sandwich combo.
              <span className="hand-note text-flame text-xl ml-1.5">we reply fast</span>
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Quick connections */}
          <Reveal direction="right" className="lg:col-span-5">
            <div className="card-soft p-8 flex flex-col gap-6">
              <h2 className="font-display text-2xl font-semibold text-cocoa tracking-tight">
                Quick Connections
              </h2>
              <p className="text-cocoa/55 text-sm leading-relaxed">
                Skip the form? Tap below — we reply faster than ice melts in a hot shake.
              </p>

              <div className="flex flex-col gap-3">
                {[
                  {
                    href: 'https://wa.me/919999999999',
                    icon: <MessageSquare className="w-5 h-5" />,
                    iconBg: 'bg-[#25D366] text-white',
                    title: 'WhatsApp Chat',
                    sub: 'Instant support & orders',
                  },
                  {
                    href: 'tel:+919999999999',
                    icon: <Phone className="w-5 h-5" />,
                    iconBg: 'bg-cocoa text-cream',
                    title: 'Call Us',
                    sub: '+91 99999 99999',
                  },
                  {
                    href: 'mailto:hello@swich.com',
                    icon: <Mail className="w-5 h-5" />,
                    iconBg: 'bg-flame text-paper',
                    title: 'Email',
                    sub: 'hello@swich.com',
                  },
                ].map((c) => (
                  <a
                    key={c.title}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-cream hover:bg-blush/50 hover:-translate-y-0.5 hover:shadow-soft transition-all cursor-pointer"
                  >
                    <div className={`w-11 h-11 flex items-center justify-center rounded-xl ${c.iconBg}`}>
                      {c.icon}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-display font-semibold text-sm text-cocoa">{c.title}</span>
                      <span className="text-xs text-cocoa/50">{c.sub}</span>
                    </div>
                  </a>
                ))}
              </div>

              <div className="border-t border-cocoa/8 pt-6">
                <span className="hand-note text-xl text-cocoa/60 block mb-3">follow the vibe →</span>
                <a
                  href="https://www.instagram.com/swich.ixu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-display text-sm font-semibold text-cocoa hover:text-flame transition-colors"
                >
                  <InstagramIcon className="w-4 h-4" /> @swich.ixu
                </a>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal direction="left" delay={0.1} className="lg:col-span-7">
            <div className="card-soft p-8 md:p-10 relative min-h-[440px] flex flex-col justify-center">
              <AnimatePresence>
                {focusedField && (
                  <motion.div
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ scale: 1, rotate: -4 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-4 right-8 sticker bg-butter text-cocoa shadow-soft z-20 pointer-events-none"
                  >
                    <i className="fa-solid fa-keyboard" /> typing…
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5 text-left"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-cocoa/60">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Aarav Sharma"
                          className={inputClass}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-cocoa/60">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="you@example.com"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="craving" className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-cocoa/60">
                        What are you craving?
                      </label>
                      <select
                        id="craving"
                        value={formData.craving}
                        onChange={(e) => setFormData({ ...formData, craving: e.target.value })}
                        className={`${inputClass} cursor-pointer appearance-none`}
                      >
                        <option value="sandwiches">Signature S'wiches</option>
                        <option value="shakes">Thick Shakes</option>
                        <option value="both">Both. Obviously.</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-cocoa/60">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows="4"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Tell us what's on your mind…"
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    <button type="submit" className="btn-primary w-full mt-1 !py-4">
                      <Send className="w-4 h-4" /> Send Message
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-screen"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center gap-5 py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: [0, -8, 8, 0] }}
                      transition={{ type: 'spring', stiffness: 220, damping: 12 }}
                      className="w-20 h-20 bg-butter rounded-full flex items-center justify-center shadow-soft"
                    >
                      <i className="fa-solid fa-circle-check text-4xl text-cocoa" />
                    </motion.div>
                    <h2 className="font-display text-3xl font-semibold text-cocoa tracking-tight">
                      You're In The Chat!
                    </h2>
                    <p className="text-cocoa/60 text-sm max-w-sm leading-relaxed">
                      Hey <strong>{formData.name}</strong> — got it! We've locked in your craving
                      (<strong>{formData.craving}</strong>) and we'll hit you back at{' '}
                      <strong>{formData.email}</strong> soon.
                    </p>
                    <button onClick={handleReset} className="btn-ghost mt-1 !py-3 !px-6 !text-[0.7rem]">
                      Send Another
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
