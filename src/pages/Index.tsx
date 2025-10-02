import { useState, useEffect } from 'react';
import SplashScreen from '@/components/SplashScreen';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import CustomCursor from '@/components/CustomCursor';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  useSmoothScroll();

  useEffect(() => {
    document.body.style.overflow = showSplash ? 'hidden' : 'auto';
  }, [showSplash]);

  return (
    <>
      <CustomCursor />
      
      {showSplash && (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      )}

      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Contact />
        <Footer />
        <ChatBot />
      </div>
    </>
  );
};

export default Index;
