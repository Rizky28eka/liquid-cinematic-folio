import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import { staggerContainer, staggerItem, scaleIn, hoverScale, tapScale } from '@/lib/animations';

const easings = {
  easeOut: [0.76, 0, 0.24, 1],
  backOut: [0.34, 1.56, 0.64, 1],
} as const;

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  ];

  const quickLinks = ['Home', 'About', 'Services', 'Portfolio', 'Contact'];

  return (
    <motion.footer
      className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-background text-foreground border-t-4 border-foreground"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-12"
            variants={staggerContainer}
        >
          {/* Brand Section */}
          <motion.div variants={staggerItem}>
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
              r2e
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Premium digital experiences with black & white aesthetics and modern animations.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={staggerItem}>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-foreground transition-colors inline-block text-sm sm:text-base relative group"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-foreground group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Connect */}
          <motion.div variants={staggerItem} className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-lg font-bold mb-4">Connect</h4>
            <motion.div className="flex gap-3 sm:gap-4" variants={staggerContainer}>
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  variants={scaleIn}
                  whileHover={{
                      y: -4,
                      x: -4,
                      boxShadow: '4px 4px 0px 0px var(--foreground)',
                      transition: { duration: 0.3, ease: easings.easeOut },
                  }}
                  whileTap={tapScale}
                  className="group w-11 h-11 sm:w-12 sm:h-12 bg-foreground text-background rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <social.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.a>
              ))}
            </motion.div>
            <p className="text-muted-foreground text-xs sm:text-sm mt-4">
              Follow me on social media
            </p>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
            className="pt-8 border-t-2 border-border text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: easings.easeOut }}
        >
          <p className="text-muted-foreground text-xs sm:text-sm">
            © 2025 R2E Studio. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
