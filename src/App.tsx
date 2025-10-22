import { useCallback, useEffect, useRef, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import IEEEMetaNav from './components/IEEEMetaNav';
import InitiativeDetail from './components/InitiativeDetail';
import About from './pages/About';
import Home from './pages/Home';
import Initiatives from './pages/Initiatives';
import Needs from './pages/Needs';
import NotFound from './pages/NotFound';
import Partners from './pages/Partners';
import Projects from './pages/Projects';
import SDGAction from './pages/SDGAction';
import Support from './pages/Support';
import Resources from './pages/Resources';
import Volunteers from './pages/Volunteers';

function App() {
  const [showMetaNav, setShowMetaNav] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const prevScrollY = lastScrollY.current;

        // Only update state if the meta nav visibility actually needs to change
        let shouldShowMetaNav = showMetaNav;

        // Show meta nav when at the very top (scrollY === 0)
        if (currentScrollY === 0) {
          shouldShowMetaNav = true;
        }
        // Hide meta nav when scrolling down
        else if (currentScrollY > prevScrollY && currentScrollY > 40) {
          shouldShowMetaNav = false;
        }
        // Show meta nav when scrolling up and near the top
        else if (currentScrollY < prevScrollY && currentScrollY < 100) {
          shouldShowMetaNav = true;
        }

        // Only update state if there's an actual change
        if (shouldShowMetaNav !== showMetaNav) {
          setShowMetaNav(shouldShowMetaNav);
        }

        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, [showMetaNav]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
        <div className={`transition-transform duration-300 ease-in-out ${showMetaNav ? 'translate-y-0' : '-translate-y-full'}`}>
          <IEEEMetaNav />
        </div>
        <Header showMetaNav={showMetaNav} />
        <main className={`w-full transition-all duration-300 ease-in-out ${
          showMetaNav ? '' : 'pt-16'
        }`}>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Project redirects for backwards compatibility */}
            <Route path="/foh" element={<Navigate to="/projects/foh" replace />} />
            <Route path="/nenasa" element={<Navigate to="/projects/nenasa" replace />} />
            <Route path="/sp" element={<Navigate to="/projects/sp" replace />} />
            <Route path="/sdg-sprints" element={<Navigate to="/projects/sdg-sprints" replace />} />

            <Route path="/initiatives" element={<Initiatives />} />
            <Route path="/initiatives/:slug" element={<InitiativeDetail />} />
            <Route path="/sdg/:sdgId" element={<SDGAction />} />
            <Route path="/projects/:slug" element={<Projects />} />
            <Route path="/needs" element={<Needs />} />
            <Route path="/volunteers" element={<Volunteers />} />
            <Route path="/support" element={<Support />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/about" element={<About />} />
            <Route path="/partners" element={<Partners />} />
            
            {/* Catch-all route for 404 pages */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;