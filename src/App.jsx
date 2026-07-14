import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';

// Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import OurStory from './pages/OurStory';
import VisitUs from './pages/VisitUs';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import FloatingCTA from './components/FloatingCTA';
import IntroLoader from './components/IntroLoader';
import ScrollToTop from './components/ScrollToTop';

// Page Transition wrapper
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
      className="flex-1 flex flex-col pt-20"
    >
      {children}
    </motion.div>
  );
};

// Route Switcher with Location tracking
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />
        <Route
          path="/menu"
          element={
            <PageWrapper>
              <Menu />
            </PageWrapper>
          }
        />
        <Route
          path="/story"
          element={
            <PageWrapper>
              <OurStory />
            </PageWrapper>
          }
        />
        <Route
          path="/visit"
          element={
            <PageWrapper>
              <VisitUs />
            </PageWrapper>
          }
        />
        <Route
          path="/gallery"
          element={
            <PageWrapper>
              <Gallery />
            </PageWrapper>
          }
        />
        <Route
          path="/contact"
          element={
            <PageWrapper>
              <Contact />
            </PageWrapper>
          }
        />
        <Route
          path="*"
          element={
            <PageWrapper>
              <NotFound />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [loaderComplete, setLoaderComplete] = useState(false);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    if (!loaderComplete) return;

    // Skip Lenis if prefers-reduced-motion is active
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom out-quart ease
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [loaderComplete]);

  return (
    <Router>
      <ScrollToTop />
      
      {/* Intro Loader */}
      {!loaderComplete && (
        <IntroLoader onComplete={() => setLoaderComplete(true)} />
      )}

      {/* Main Content */}
      {loaderComplete && (
        <div className="flex flex-col min-h-screen bg-cream selection:bg-brand-lime selection:text-charcoal relative">
          <CustomCursor />
          <Navbar />
          <AnimatedRoutes />
          <Footer />
          <FloatingCTA />
        </div>
      )}
    </Router>
  );
}
