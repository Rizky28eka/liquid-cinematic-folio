import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SplashScreen from '@/components/SplashScreen';
import Navbar from '@/components/Navbar';
import Hero from '@/pages/Home/Hero';
import About from '@/pages/Home/About';
import Skills from '@/pages/Home/Skills';
import Services from '@/pages/Home/Services';
import Projects from '@/pages/Home/Projects';
import Experience from '@/pages/Home/Experience';
import Education from '@/pages/Home/Education';
import Contact from '@/pages/Home/Contact';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  useSmoothScroll();

  useEffect(() => {
    // Prevents scrolling when splash screen is visible
    document.body.style.overflow = showSplash ? 'hidden' : 'auto';
  }, [showSplash]);

  return (
    <>
      <CustomCursor />
      
      <AnimatePresence onExitComplete={() => { document.body.style.overflow = 'auto'; }}>
        {showSplash && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {!showSplash && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-background text-foreground"
          >
            <Navbar />
            <Hero />
            <About />
            <Services />
            <Skills />
            <Projects />
            <Experience />
            <Education />
            <Contact />
            <Footer />
            <ScrollProgress />
          </motion.div>
      )}
    </>
  );
};

export default Index;