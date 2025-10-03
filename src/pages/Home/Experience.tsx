import { motion, useScroll } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { useRef } from 'react';

const experiences = [
    {
        period: '01/25 - 11/25',
        position: 'Mobile & Web Developer',
        company: 'Bilcode',
        description: 'Contributed to the development of cross-platform mobile apps using Flutter and Kotlin, improving feature delivery speed by 30%.',
        type: 'Full-time'
    },
    {
        period: '08/22 - Now',
        position: 'Freelance Developer',
        company: 'Self-employed',
        description: 'Delivered 10+ cross-platform mobile apps using Flutter (Dart) and native Android with Kotlin.',
        type: 'Freelance'
    },
    {
        period: '06/21 - 09/21',
        position: 'IT Support Intern',
        company: 'PT Telkom Indonesia',
        description: 'Provided daily technical support for 100+ employees, resolving both software and hardware issues.',
        type: 'Internship'
    },
    {
        period: '01/21 - 04/21',
        position: 'Web Developer Intern',
        company: 'PT Global Future Technology',
        description: 'Maintained and optimized company websites using Laravel and React.js, improving site reliability.',
        type: 'Internship'
    },
    {
        period: '07/21 - 09/21',
        position: 'Kotlin Trainer',
        company: 'IDN Boarding School',
        description: 'Delivered structured online training sessions for beginner Android developers using Kotlin.',
        type: 'Training'
    },
    {
        period: '04/21 - 06/21',
        position: 'Laravel Trainer',
        company: 'IDN Boarding School',
        description: 'Trained 70+ students and lecturers in Laravel web development (MVC, routing, templating, database integration).',
        type: 'Training'
    },
];

const titleVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            ease: 'easeOut'
        }
    }
};

const cardVariants = (isLeft: boolean) => ({
    hidden: {
        opacity: 0,
        x: isLeft ? -80 : 80,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: 'easeOut'
        }
    }
});

const circleVariants = {
    hidden: { scale: 0 },
    visible: {
        scale: 1,
        transition: {
            duration: 0.6,
            ease: 'backOut',
            delay: 0.4
        }
    }
};

const Experience = () => {
    const timelineRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ['start 60%', 'end 85%'],
    });

    return (
        <section
            id="experience"
            className="relative py-24 md:py-32 px-4 md:px-6 overflow-hidden bg-background text-foreground"
        >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, var(--foreground) 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            <div className="max-w-6xl mx-auto relative">
                {/* Title */}
                <motion.div
                    className="text-center mb-16 md:mb-24"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={titleVariants}
                >
                    <div className="inline-flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-foreground/40" />
                        <Briefcase className="w-6 h-6 text-muted-foreground" />
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-foreground/40" />
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3">
                        Experience
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
                        My professional journey and contributions
                    </p>
                </motion.div>

                <div className="relative" ref={timelineRef}>
                    {/* Timeline SVG for desktop */}
                    <div className="hidden md:block absolute left-1/2 top-0 h-full w-px -translate-x-1/2 pointer-events-none bg-gradient-to-b from-border/0 via-border to-border/0">
                        <motion.div
                            className="w-full h-full bg-primary origin-top"
                            style={{ scaleY: scrollYProgress }}
                        />
                    </div>


                    {/* Experience cards */}
                    <div className="space-y-12 md:space-y-0 md:grid md:gap-y-20">
                        {experiences.map((exp, index) => {
                            const isLeft = index % 2 === 0;
                            return (
                                <div
                                    key={index}
                                    className="md:grid md:grid-cols-2 md:gap-8 items-center relative"
                                >
                                    {/* Card content */}
                                    <motion.div
                                        className={`md:col-start-${isLeft ? 1 : 2} md:row-start-1`}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.5 }}
                                        variants={cardVariants(isLeft)}
                                    >
                                        <div className="group relative">
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                                            <div className="relative bg-background/70 dark:bg-zinc-900/80 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                                                <div className="inline-block px-3 py-1 mb-4 text-xs font-medium bg-primary/10 border border-primary/20 rounded-full text-primary">
                                                    {exp.type}
                                                </div>
                                                <p className="text-xs md:text-sm text-muted-foreground mb-3 font-mono tracking-wider">
                                                    {exp.period}
                                                </p>
                                                <h3 className="text-xl md:text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                                                    {exp.position}
                                                </h3>
                                                <p className="text-base md:text-lg text-muted-foreground mb-4 font-medium">
                                                    {exp.company}
                                                </p>
                                                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                                                    {exp.description}
                                                </p>
                                                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Timeline circle (desktop only) */}
                                    <motion.div
                                        className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-background/90 backdrop-blur-lg rounded-full border-2 border-primary/20 items-center justify-center z-10 shadow-2xl shadow-primary/10"
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.5 }}
                                        variants={circleVariants}
                                    >
                                        <div className="w-4 h-4 bg-primary rounded-full animate-pulse shadow-lg shadow-primary/50" />
                                        <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping opacity-20" />
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </section>
    );
};

export default Experience;
