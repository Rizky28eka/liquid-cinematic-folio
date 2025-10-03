import { motion } from 'framer-motion';
import {
  Code2,
  Smartphone,
  Palette,
  Server,
  Cloud,
  BrainCircuit,
} from 'lucide-react';

const services = [
  {
    icon: Code2,
    title: 'Web Development',
    description:
      'Building responsive, dynamic, and high-performance websites using React, Next.js, and Tailwind CSS. From single-page apps to complex e-commerce platforms.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description:
      'Creating beautiful and performant mobile applications with Flutter, React Native, or native. Focused on user experience and fluid animations.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description:
      'Designing intuitive and user-centric interfaces. From wireframes to pixel-perfect Figma designs, ensuring a smooth user journey.',
  },
  {
    icon: Server,
    title: 'Backend Development',
    description:
      'Building scalable APIs with Node.js, Express, and databases. Ensuring security and performance.',
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description:
      'Automating deployment pipelines with Vercel, Netlify, and AWS. Implementing CI/CD for reliable and fast delivery.',
  },
  {
    icon: BrainCircuit,
    title: 'Consulting & Strategy',
    description:
      'Helping you choose the right tech stack and architecture. Avoid pitfalls and create a clear roadmap for success.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const Services = () => {
  return (
    <section
      id="services"
      className="relative py-24 px-6 bg-background text-foreground overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, var(--foreground) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        ></div>
      </div>

      <div className="absolute top-20 left-10 w-96 h-96 bg-foreground/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-foreground/5 rounded-full blur-3xl"></div>

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            My Services
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I offer a range of services to bring your ideas to life. Here's how
            I can help you build your next project.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <div className="group relative bg-background/50 dark:bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-8 border border-border dark:border-zinc-800 transition-all duration-300 hover:border-foreground/30 dark:hover:border-white hover:bg-background/80 dark:hover:bg-zinc-900/80 hover:-translate-y-2 hover:shadow-2xl hover:shadow-foreground/10 dark:hover:shadow-white/10 h-full">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/0 to-foreground/0 group-hover:from-foreground/5 dark:group-hover:from-white/5 group-hover:to-transparent transition-all duration-300"></div>

                  <div className="relative z-10">
                    <motion.div
                      className="mb-5"
                      whileHover={{ scale: 1.1, rotate: 3 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Icon className="w-12 h-12 text-foreground" strokeWidth={1.5} />
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-4 text-foreground transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed text-sm group-hover:text-foreground/80 dark:group-hover:text-gray-300 transition-colors">
                      {service.description}
                    </p>
                  </div>

                  <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-foreground/0 dark:border-white/0 group-hover:border-foreground/20 dark:group-hover:border-white/20 rounded-tr-2xl transition-all duration-300"></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Services;
