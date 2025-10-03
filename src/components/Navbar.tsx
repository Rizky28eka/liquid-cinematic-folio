import { useEffect, useMemo, useState, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const menuItems = useMemo(() => [
    { label: 'Home', id: 'home', isPage: false },
    { label: 'About', id: 'about', isPage: false },
    { label: 'Services', id: 'services', isPage: false },
    { label: 'Skills', id: 'skills', isPage: false },
    { label: 'Projects', id: 'projects', isPage: true },
    { label: 'Experience', id: 'experience', isPage: false },
    { label: 'Contact', id: 'contact', isPage: false }
  ], []);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  // Active section detection on scroll
  useEffect(() => {
    const sections = menuItems.filter(item => !item.isPage).map(item => document.getElementById(item.id));
    
    const handleScroll = () => {
        if (location.pathname !== '/') return;

        const scrollPosition = window.scrollY + window.innerHeight / 2;

        for (const section of sections) {
            if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                setActiveSection(section.id);
                break;
            }
        }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, menuItems]);


  // Handle active section based on route
  useEffect(() => {
    if (location.pathname === '/projects') {
      setActiveSection('projects');
    } else if (location.pathname === '/') {
        const hash = window.location.hash.replace('#', '');
        setActiveSection(hash || 'home');
    }
  }, [location.pathname]);

  // Smooth scroll to section
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Adjusted offset
        behavior: 'smooth'
      });
    }
  }, []);

  const handleNavClick = useCallback((itemId: string, isPage: boolean) => {
    setMobileMenuOpen(false);
    if (!isPage) {
      if (location.pathname !== '/') {
        window.location.href = `/#${itemId}`;
      } else {
        scrollToSection(itemId);
        setActiveSection(itemId);
      }
    }
  }, [location.pathname, scrollToSection]);

  const navVariants = {
    initial: { y: -100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: 0.3,
        staggerChildren: 0.05
      }
    }
  };

  const menuItemVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 }
  };

  const mobileMenuVariants = {
      initial: { opacity: 0, scale: 0.95, y: -20 },
      animate: { opacity: 1, scale: 1, y: 0, transition: { staggerChildren: 0.05 } },
      exit: { opacity: 0, scale: 0.95, y: -20 }
  }

  const renderNavLink = (item: typeof menuItems[0], isMobile = false) => {
    const isActive = activeSection === item.id;
    const baseClasses = isMobile
      ? `block px-6 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
          isActive
            ? 'bg-foreground text-background shadow-md'
            : 'text-foreground/70 hover:text-foreground hover:bg-foreground/5'
        }`
      : `relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 transform-gpu ${
          isActive
            ? 'text-background'
            : 'text-foreground/70 hover:text-foreground'
        }`;

    const linkContent = (
        <>
            <span className="relative z-10">{item.label}</span>
            {isActive && !isMobile && (
                <motion.div
                    className="absolute inset-0 rounded-full bg-foreground"
                    layoutId="active-nav-item"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
            )}
        </>
    );

    if (item.isPage) {
      return (
        <motion.div key={item.id} variants={menuItemVariants}>
            <Link
              to={`/${item.id}`}
              className={baseClasses}
              onClick={() => setActiveSection(item.id)}
            >
              {linkContent}
            </Link>
        </motion.div>
      );
    }

    return (
      <motion.div key={item.id} variants={menuItemVariants}>
        <a
            href={`#${item.id}`}
            className={baseClasses}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(item.id, false);
            }}
        >
            {linkContent}
        </a>
      </motion.div>
    );
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-background/80 backdrop-blur-lg border-border'
            : 'py-4 bg-transparent border-transparent'
        }`}
        variants={navVariants}
        initial="initial"
        animate="animate"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" onClick={() => setActiveSection('home')}>
            <motion.div
              className="text-2xl font-bold tracking-tight cursor-pointer text-foreground"
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              r2e
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <motion.div className="hidden lg:flex items-center gap-4" variants={navVariants}>
            <div className="flex items-center gap-1 bg-card/60 backdrop-blur-md rounded-full px-2 py-2 border border-border shadow-sm">
              {menuItems.map((item) => renderNavLink(item))}
            </div>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="bg-card/60 backdrop-blur-md p-2.5 rounded-full border border-border shadow-sm"
              aria-label="Toggle theme"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={theme}
                    initial={{ y: -20, opacity: 0, rotate: theme === 'dark' ? 90 : -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 20, opacity: 0, rotate: theme === 'dark' ? -90 : 90 }}
                    transition={{ duration: 0.3 }}
                >
                    {theme === 'dark' ? (
                        <Sun className="w-5 h-5 text-foreground" />
                    ) : (
                        <Moon className="w-5 h-5 text-foreground" />
                    )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              className="bg-card/60 backdrop-blur-md p-2.5 rounded-full border border-border"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-foreground" />
              ) : (
                <Moon className="w-5 h-5 text-foreground" />
              )}
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="bg-card/60 backdrop-blur-md p-2.5 rounded-full border border-border"
              aria-label="Toggle menu"
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={mobileMenuOpen ? 'x' : 'menu'}
                        initial={{ rotate: 45, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -45, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {mobileMenuOpen ? (
                            <X className="w-5 h-5 text-foreground" />
                        ) : (
                            <Menu className="w-5 h-5 text-foreground" />
                        )}
                    </motion.div>
                </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
            <div className="fixed inset-0 z-40 lg:hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => setMobileMenuOpen(false)}
                />
                <motion.div
                    className="absolute top-24 right-4 left-4 bg-card rounded-2xl shadow-2xl border border-border p-4 space-y-2"
                    variants={mobileMenuVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    {menuItems.map((item) => renderNavLink(item, true))}
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
