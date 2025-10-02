import { useState, useEffect } from 'react';
import SplashScreen from '@/components/SplashScreen';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Skills from '@/components/Skills';
import Portfolio from '@/components/Portfolio';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Testimonials from '@/components/Testimonials';
import Achievements from '@/components/Achievements';
import Process from '@/components/Process';
import Blog from '@/components/Blog';
import Stats from '@/components/Stats';
import Clients from '@/components/Clients';
import Team from '@/components/Team';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Newsletter from '@/components/Newsletter';
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
        <Skills />
        <Portfolio />
        <Experience />
        <Education />
        <Testimonials />
        <Achievements />
        <Process />
        <Blog />
        <Stats />
        <Clients />
        <Team />
        <FAQ />
        <Contact />
        <Newsletter />
        <Footer />
        <ChatBot />
      </div>
    </>
  );
};

export default Index;
