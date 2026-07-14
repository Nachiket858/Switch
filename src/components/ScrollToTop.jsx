import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // If lenis is active, we want to reset scroll via lenis or window
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
