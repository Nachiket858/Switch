import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MessageSquare, Send, Sparkles } from 'lucide-react';
import CardTilt from '../components/CardTilt';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    craving: 'both',
    message: '',
  });
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

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex-1">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="px-3 py-1 bg-brand-lime text-charcoal font-display text-xs font-bold uppercase tracking-widest rounded border border-charcoal inline-block mb-3 rotate-1">
          Say Hey!
        </span>
        <h1 className="font-display text-4xl md:text-6xl font-black tracking-tight text-charcoal">
          Get In Touch
        </h1>
        <p className="text-charcoal/70 mt-3 font-medium">
          Have feedback, catering inquiries, or just want to tell us your favorite sandwich combo?
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact details */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          <div className="bg-cream border-2 border-charcoal p-8 rounded-2xl shadow-[4px_4px_0px_0px_#1A1410] flex flex-col gap-6">
            <h2 className="font-display text-2xl font-black text-charcoal">
              Quick Connections
            </h2>
            <p className="text-charcoal/70 text-sm leading-relaxed">
              Skip the form? Tap below to chat with us directly or drop us a line. We reply faster than ice melts in a hot shake!
            </p>

            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 border-2 border-charcoal rounded-xl bg-brand-lime/10 hover:bg-brand-lime transition-all cursor-pointer shadow-[3px_3px_0px_0px_#1A1410] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
              >
                <div className="p-2.5 bg-[#25D366] text-white rounded-xl border border-charcoal">
                  <MessageSquare className="w-5 h-5 fill-current" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-display font-bold text-sm text-charcoal">WhatsApp Chat</span>
                  <span className="text-xs text-charcoal/60">Instant support & orders</span>
                </div>
              </a>

              <a
                href="tel:+919999999999"
                className="flex items-center gap-4 p-4 border-2 border-charcoal rounded-xl bg-brand-red/10 hover:bg-brand-red hover:text-cream group transition-all cursor-pointer shadow-[3px_3px_0px_0px_#1A1410] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
              >
                <div className="p-2.5 bg-charcoal text-cream group-hover:bg-cream group-hover:text-charcoal rounded-xl border border-charcoal">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-display font-bold text-sm text-charcoal group-hover:text-cream">Call Customer Care</span>
                  <span className="text-xs text-charcoal/60 group-hover:text-cream/80">Talk to a human: +91 99999 99999</span>
                </div>
              </a>

              <a
                href="mailto:hello@swich.com"
                className="flex items-center gap-4 p-4 border-2 border-charcoal rounded-xl bg-cream hover:bg-charcoal hover:text-cream group transition-all cursor-pointer shadow-[3px_3px_0px_0px_#1A1410] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
              >
                <div className="p-2.5 bg-brand-red text-cream rounded-xl border border-charcoal">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-display font-bold text-sm text-charcoal group-hover:text-cream">Email Queries</span>
                  <span className="text-xs text-charcoal/60 group-hover:text-cream/80">hello@swich.com</span>
                </div>
              </a>
            </div>

            <div className="border-t border-charcoal/10 pt-6">
              <h3 className="font-display text-sm font-bold uppercase tracking-widest text-brand-red mb-3">
                Follow The Vibe
              </h3>
              <div className="flex gap-4">
                <a href="https://instagram.com" className="flex items-center gap-1.5 font-display text-sm font-bold text-charcoal hover:text-brand-red">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span>Instagram</span>
                </a>
                <a href="https://facebook.com" className="flex items-center gap-1.5 font-display text-sm font-bold text-charcoal hover:text-brand-red">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-7"
        >
          <CardTilt>
            <div className="bg-cream border-4 border-charcoal p-8 rounded-3xl shadow-[8px_8px_0px_0px_#1A1410] relative min-h-[420px] flex flex-col justify-center">
              
              {/* Decorative Sticker */}
              <AnimatePresence>
                {focusedField && (
                  <motion.div
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ scale: 1, rotate: -6 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-4 right-4 bg-brand-lime text-charcoal border-2 border-charcoal font-display text-xs font-black uppercase py-1 px-3 shadow-[2px_2px_0px_0px_#1A1410] z-20 pointer-events-none"
                  >
                    Typing... ⚡
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
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="font-display text-xs font-black uppercase tracking-widest text-charcoal">
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
                        placeholder="John Doe"
                        className="p-3 bg-cream border-2 border-charcoal rounded-xl text-charcoal font-semibold text-sm outline-none focus:bg-brand-lime/10 focus:shadow-[2px_2px_0px_0px_#1A1410] transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="font-display text-xs font-black uppercase tracking-widest text-charcoal">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="john@example.com"
                        className="p-3 bg-cream border-2 border-charcoal rounded-xl text-charcoal font-semibold text-sm outline-none focus:bg-brand-lime/10 focus:shadow-[2px_2px_0px_0px_#1A1410] transition-all"
                      />
                    </div>

                    {/* Cravings Selector */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="craving" className="font-display text-xs font-black uppercase tracking-widest text-charcoal">
                        What are you craving?
                      </label>
                      <select
                        id="craving"
                        value={formData.craving}
                        onChange={(e) => setFormData({ ...formData, craving: e.target.value })}
                        className="p-3 bg-cream border-2 border-charcoal rounded-xl text-charcoal font-semibold text-sm outline-none cursor-pointer focus:bg-brand-lime/10 focus:shadow-[2px_2px_0px_0px_#1A1410] transition-all appearance-none"
                      >
                        <option value="sandwiches">Signature Sandwiches 🍔</option>
                        <option value="shakes">Thick Milkshakes 🥤</option>
                        <option value="both">Both, standard double delight! 😍</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="font-display text-xs font-black uppercase tracking-widest text-charcoal">
                        Write a Message
                      </label>
                      <textarea
                        id="message"
                        rows="3"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Tell us what's on your mind..."
                        className="p-3 bg-cream border-2 border-charcoal rounded-xl text-charcoal font-semibold text-sm outline-none resize-none focus:bg-brand-lime/10 focus:shadow-[2px_2px_0px_0px_#1A1410] transition-all"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full mt-2 py-3 bg-brand-red text-cream border-2 border-charcoal font-display text-sm font-black uppercase tracking-wider rounded-xl shadow-[4px_4px_0px_0px_#1A1410] hover:shadow-[2px_2px_0px_0px_#1A1410] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-screen"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center gap-4 py-8"
                  >
                    <div className="w-16 h-16 bg-brand-lime rounded-full border-2 border-charcoal flex items-center justify-center text-3xl shadow-[3px_3px_0px_0px_#1A1410] animate-bounce">
                      🎉
                    </div>
                    <h2 className="font-display text-3xl font-black text-charcoal">
                      Catch You on the Flip Side!
                    </h2>
                    <p className="text-charcoal/70 text-sm max-w-sm">
                      Hey <strong>{formData.name}</strong>, thanks for reaching out. We've locked in your craving preference: <strong>{formData.craving}</strong>. Our team will get back to you at <strong>{formData.email}</strong> soon!
                    </p>
                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 bg-charcoal text-cream font-display text-xs font-bold uppercase rounded-lg border border-charcoal hover:bg-brand-lime hover:text-charcoal transition-all duration-200 mt-2 cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardTilt>
        </motion.div>
      </div>
    </div>
  );
}
