import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Building2, BookOpen } from 'lucide-react';

const education = [
  {
    period: '2019 - 2022',
    degree: 'Senior High School',
    institution: 'SMK IDN',
    description: 'Informatic Engineering',
    status: 'Completed',
  },
  {
    period: '2022 - 2026',
    degree: 'University',
    institution: 'Universitas Amikom Yogyakarta',
    description: 'Informatics',
    status: 'In Progress',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: 'easeOut'
        }
    }
}

const cardVariants = (isLeft: boolean) => ({
  hidden: { opacity: 0, x: isLeft ? -80 : 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
});

const dotVariants = {
    hidden: { scale: 0 },
    visible: {
        scale: 1,
        transition: {
            duration: 0.5,
            ease: 'backOut',
            delay: 0.4
        }
    }
}

const Education = () => {
  return (
    <section
      id="education"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-background text-foreground"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
            className="text-center mb-16 lg:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={containerVariants}
        >
          <motion.h2 variants={titleVariants} className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Education Journey
          </motion.h2>
          <motion.p variants={titleVariants} className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            My academic path and learning experience
          </motion.p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Line - Hidden on mobile */}
          <motion.div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 z-0"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />

          <div className="space-y-8 md:space-y-16">
            {education.map((edu, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`relative ${
                    isLeft
                      ? 'md:pr-[calc(50%+2.5rem)]'
                      : 'md:pl-[calc(50%+2.5rem)]'
                  }`}
                >
                  {/* Timeline Dot - Hidden on mobile */}
                  <motion.div
                    className="hidden md:block absolute left-1/2 top-8 w-5 h-5 bg-primary rounded-full -translate-x-1/2 ring-4 ring-background z-10 shadow-lg"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={dotVariants}
                  />

                  {/* Card Content */}
                  <motion.div
                    className="group relative bg-card p-6 sm:p-8 rounded-2xl border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-[8px_8px_0px_0px_var(--primary)] hover:-translate-y-1 hover:-translate-x-1"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={cardVariants(isLeft)}
                  >
                    {/* Status Badge */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-4 border-2 ${
                      edu.status === 'Completed'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-secondary text-secondary-foreground border-border'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        edu.status === 'Completed'
                          ? 'bg-primary-foreground'
                          : 'bg-secondary-foreground animate-pulse'
                      }`} />
                      {edu.status}
                    </div>

                    {/* Icon */}
                    <div className={`inline-flex p-3 sm:p-4 rounded-xl bg-primary text-primary-foreground mb-4 group-hover:scale-110 transition-transform duration-300 ${
                      isLeft ? '' : 'md:float-right md:ml-4'
                    }`}>
                      <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>

                    {/* Content */}
                    <div className={`space-y-3 ${
                      isLeft ? '' : 'md:text-right'
                    }`}>
                      {/* Period */}
                      <div className={`flex items-center gap-2 text-sm text-muted-foreground ${
                        isLeft ? '' : 'md:justify-end'
                      }`}>
                        <Calendar className="w-4 h-4" />
                        <span className="font-semibold">{edu.period}</span>
                      </div>

                      {/* Degree */}
                      <h3 className="text-2xl sm:text-3xl font-bold text-card-foreground">
                        {edu.degree}
                      </h3>

                      {/* Institution */}
                      <div className={`flex items-center gap-2 text-base sm:text-lg ${
                        isLeft ? '' : 'md:justify-end'
                      }`}>
                        <Building2 className={`w-5 h-5 text-card-foreground ${
                          isLeft ? '' : 'md:order-2'
                        }`} />
                        <span className="font-bold text-card-foreground">{edu.institution}</span>
                      </div>

                      {/* Description */}
                      <div className={`flex items-start gap-2 pt-2 ${
                        isLeft ? '' : 'md:justify-end'
                      }`}>
                        <BookOpen className={`w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0 ${
                          isLeft ? '' : 'md:order-2'
                        }`} />
                        <p className="text-muted-foreground leading-relaxed">
                          {edu.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
