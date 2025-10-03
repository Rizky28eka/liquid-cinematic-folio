import { motion } from 'framer-motion';
import { Code2, Smartphone, Globe, Palette, Zap, Award } from 'lucide-react';

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

const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.6, 0.05, -0.01, 0.9],
        }
    }
}

const About = () => {
  const skills = [
    {
      icon: <Smartphone className="w-7 h-7" />,
      title: 'Mobile Development',
      description: 'Flutter, Kotlin, SwiftUI',
    },
    {
      icon: <Globe className="w-7 h-7" />,
      title: 'Web Development',
      description: 'Laravel, React.js',
    },
    {
      icon: <Palette className="w-7 h-7" />,
      title: 'UI/UX Design',
      description: 'User-focused interfaces',
    },
  ];

  const stats = [
    { icon: <Code2 className="w-5 h-5" />, value: '10+', label: 'Projects' },
    { icon: <Zap className="w-5 h-5" />, value: '3+', label: 'Years' },
    { icon: <Award className="w-5 h-5" />, value: '100%', label: 'Dedication' },
  ];

  return (
    <section
      id="about"
      className="relative py-20 px-6 overflow-hidden bg-background text-foreground"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-foreground/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-foreground/5 rounded-full blur-3xl"></div>

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Section */}
          <motion.div variants={imageVariants}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-foreground/20 to-foreground/5 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=1000&fit=crop"
                  alt="Developer workspace"
                  className="w-full h-[500px] object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              {/* Decorative border */}
              <div className="absolute -inset-4 border-2 border-foreground/10 rounded-2xl -z-10"></div>
            </div>
          </motion.div>

          {/* Text Section */}
          <motion.div variants={containerVariants}>
            <motion.div variants={itemVariants} className="inline-block mb-4 px-4 py-1 bg-foreground text-background text-sm font-semibold rounded-full">
              INTRODUCTION
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              About Me
            </motion.h2>

            <motion.p variants={itemVariants} className="text-xl text-muted-foreground font-semibold mb-6">
              Informatics Student & Full-Stack Developer
            </motion.p>

            <motion.p variants={itemVariants} className="text-base text-muted-foreground leading-relaxed mb-10">
              Passionate undergraduate with hands-on experience in building cross-platform and native mobile applications.
              Specialized in creating scalable web solutions and delivering responsive, user-focused experiences through
              freelance projects and internships. Continuously exploring emerging technologies in mobile and web ecosystems.
            </motion.p>

            {/* Skills Grid */}
            <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-background rounded-xl p-5 border-2 border-border hover:border-foreground/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="flex justify-center mb-3 text-foreground">{skill.icon}</div>
                  <h3 className="text-sm font-bold text-foreground mb-1 text-center">{skill.title}</h3>
                  <p className="text-xs text-muted-foreground text-center">{skill.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div variants={containerVariants} className="flex flex-wrap gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-center gap-3 bg-foreground text-background rounded-full py-3 px-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="text-background">{stat.icon}</div>
                  <div>
                    <p className="text-xl font-bold">{stat.value}</p>
                    <p className="text-xs text-background/70">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
