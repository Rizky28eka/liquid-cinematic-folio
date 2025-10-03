import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const formVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: 'easeOut',
            staggerChildren: 0.1
        }
    }
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent! (Demo only)');
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-12 lg:mb-16 text-center"
        >
          Get In Touch
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            className="space-y-6 lg:space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Let's Connect
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Have a project in mind or just want to chat? Feel free to reach out through any of these channels.
              </p>
            </motion.div>

            <motion.div variants={containerVariants} className="space-y-4 lg:space-y-5">
              {/* Email */}
              <motion.div variants={itemVariants} className="group flex items-start gap-4 p-5 sm:p-6 rounded-xl bg-card border-2 border-border hover:shadow-[6px_6px_0px_0px_var(--primary)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300">
                <div className="p-3 rounded-lg bg-primary text-primary-foreground group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold mb-1 text-card-foreground text-sm sm:text-base">Email</h4>
                  <a
                    href="mailto:rizky28eka@gmail.com"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base break-all"
                  >
                    rizky28eka@gmail.com
                  </a>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div variants={itemVariants} className="group flex items-start gap-4 p-5 sm:p-6 rounded-xl bg-card border-2 border-border hover:shadow-[6px_6px_0px_0px_var(--primary)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300">
                <div className="p-3 rounded-lg bg-primary text-primary-foreground group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold mb-1 text-card-foreground text-sm sm:text-base">Phone</h4>
                  <a
                    href="tel:+6282120216687"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base"
                  >
                    +62 821-2021-6687
                  </a>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div variants={itemVariants} className="group flex items-start gap-4 p-5 sm:p-6 rounded-xl bg-card border-2 border-border hover:shadow-[6px_6px_0px_0px_var(--primary)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300">
                <div className="p-3 rounded-lg bg-primary text-primary-foreground group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold mb-1 text-card-foreground text-sm sm:text-base">Location</h4>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Wates, Yogyakarta<br />
                    Indonesia
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            className="space-y-5 sm:space-y-6 p-6 sm:p-8 rounded-xl bg-card border-2 border-border shadow-[8px_8px_0px_0px_var(--border)]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={formVariants}
            onSubmit={(e) => e.preventDefault()}
          >
            <motion.div variants={itemVariants} className="space-y-2">
              <label htmlFor="name" className="block text-sm font-bold text-card-foreground">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-lg border-2 border-border bg-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-muted-foreground"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <label htmlFor="email" className="block text-sm font-bold text-card-foreground">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border-2 border-border bg-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-muted-foreground"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <label htmlFor="message" className="block text-sm font-bold text-card-foreground">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message"
                rows={6}
                className="w-full px-4 py-3 rounded-lg border-2 border-border bg-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none placeholder-muted-foreground"
              />
            </motion.div>

            <motion.button
              type="button"
              onClick={handleSubmit}
              variants={itemVariants}
              whileHover={{
                boxShadow: '4px 4px 0px 0px var(--primary)',
                y: -4,
                x: -4,
              }}
              whileTap={{
                boxShadow: '0px 0px 0px 0px var(--primary)',
                y: 0,
                x: 0,
              }}
              transition={{ duration: 0.2 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground font-bold rounded-lg border-2 border-primary"
            >
              <span>Send Message</span>
              <Send className="w-5 h-5" />
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
