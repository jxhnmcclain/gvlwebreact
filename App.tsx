import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Header from './components/Header';
import Hero from './components/Hero';
import SplitServices from './components/SplitServices';
import CtaBanner from './components/CtaBanner';
import ServiceGrid from './components/ServiceGrid';
import LeadMagnet from './components/LeadMagnet';
import RecentPosts from './components/RecentPosts';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import InfiniteMovingCardsDemo from './components/InfiniteMovingCardsDemo';

// Import New Pages
import ContentPage from './pages/ContentPage';
import ReelsPage from './pages/ReelsPage';
import WebsitesPage from './pages/WebsitesPage';
import BrandingPage from './pages/BrandingPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import LeadFormPage from './pages/LeadFormPage';
import NotFoundPage from './pages/NotFoundPage';
import WebPortfolioLanding from './pages/WebPortfolioLanding';
// import EbooksLanding from './pages/EbooksLanding';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import MarketingAdvisory from './pages/MarketingAdvisory';

// Private Pages
import PrivateIndex from './pages/priv/PrivateIndex';
import SocialMediaPrivate from './pages/priv/SocialMediaPrivate';
import MarcaDisenoPrivate from './pages/priv/MarcaDisenoPrivate';
import BrandingPrivate from './pages/priv/BrandingPrivate';

// Register ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger);

const Home = () => (
  <>
    <Hero />
    <SplitServices />
    <InfiniteMovingCardsDemo />
    <CtaBanner />
    <LeadMagnet />
  </>
);

// Scroll to top on route change wrapper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    // If we are going to contact page, DO NOT scroll to top
    // This allows the overlay to slide in over the current position
    if (pathname === '/contacto') return;

    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Main Content Wrapper to handle Modal Logic
const AppContent = () => {
  const location = useLocation();
  // Use the background state if it exists (for modal behavior), otherwise use current location
  const state = location.state as { background?: Location };
  // If we have a background location, use it to render the underlying page
  // Otherwise, just render the current location normally
  const locationToRender = (state && state.background) || location;

  // Check if we are on the standalone lead form page or 404 page
  // We want to hide header/footer on these specific pages
  const isLeadPage = location.pathname === '/cotizacion-web';

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col w-full overflow-x-hidden font-sans bg-gvl-cream">
        {/* Header is hidden on LeadFormPage as it has its own minimal header */}
        {!isLeadPage && <Header />}

        <main className="flex-grow">
          <Routes location={locationToRender}>
            <Route path="/" element={<Home />} />
            <Route path="/contenido" element={<ContentPage />} />
            <Route path="/reels" element={<ReelsPage />} />
            <Route path="/websites" element={<WebsitesPage />} />
            <Route path="/branding" element={<BrandingPage />} />
            <Route path="/servicios" element={<ServicesPage />} />
            <Route path="/cotizacion-web" element={<LeadFormPage />} />
            <Route path="/web-portfolio" element={<WebPortfolioLanding />} />
            {/* <Route path="/ebooks-creadores" element={<EbooksLanding />} /> */}

            {/* Blog Routes */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/asesoria" element={<MarketingAdvisory />} />

            {/* Private Routes */}
            <Route path="/priv" element={<PrivateIndex />} />
            <Route path="/priv/social-media" element={<SocialMediaPrivate />} />
            <Route path="/priv/marca-diseno" element={<MarcaDisenoPrivate />} />
            <Route path="/priv/branding" element={<BrandingPrivate />} />

            {/* 
                          We still need this route for direct access (refresh on /contacto) 
                          or if state.background is missing 
                        */}
            <Route path="/contacto" element={<ContactPage />} />

            {/* 404 Catch-all */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        {/*
                    Only show Footer if we are NOT on the contact page primarily (direct access)
                    OR if we are in modal mode (background exists), the footer is part of the background (Home),
                    so it's rendered by Home -> Layout? No, Footer is outside Routes.
                    So Footer is always visible. ContactPage is fixed z-60 covering it.
                    ALSO hide on LeadFormPage
                */}
        {!isLeadPage && <Footer />}
      </div>

      {/* Render ContactPage as an overlay if we have a background location and we are at /contacto */}
      <AnimatePresence>
        {state && state.background && location.pathname === '/contacto' && (
          <ContactPage />
        )}
      </AnimatePresence>
    </>
  );
};

export default function App() {
  // Skip preloader during pre-rendering (Puppeteer/HeadlessChrome)
  const isPrerendering = typeof navigator !== 'undefined' &&
    navigator.userAgent.includes('HeadlessChrome');
  const [isLoading, setIsLoading] = useState(!isPrerendering);

  return (
    <BrowserRouter>
      {isLoading && (
        <Preloader onComplete={() => setIsLoading(false)} />
      )}
      <AppContent />
    </BrowserRouter>
  );
}