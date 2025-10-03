import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";

const skillCategories = [
  {
    title: "Mobile Development",
    skills: ['Dart', 'Flutter', 'Kotlin', 'Java', 'Swift', 'Android Studio', 'Xcode']
  },
  {
    title: "Web Development",
    skills: ['React.js', 'Next.js', 'Express.js', 'Node.js', 'Laravel', 'PHP']
  },
  {
    title: "Database & Cloud",
    skills: ['Firebase', 'MongoDB', 'MySQL', 'PostgreSQL', 'SQLite', 'Cloudinary', 'Amazon S3']
  },
  {
    title: "Tools & Design",
    skills: ['Git', 'GitHub', 'GitLab', 'VSCode', 'Postman', 'Figma', 'Canva', 'Adobe XD']
  },
  {
    title: "Languages",
    skills: ['English', 'Indonesia']
  }
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const badgeVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8, rotationX: -90 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        transition: {
            duration: 0.4,
            ease: 'backOut',
        }
    }
}

const Skills = () => {
  return (
    <section id="skills" className="relative py-32 px-6 bg-background text-foreground">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-5xl font-bold mb-16 text-center"
        >
          Technical Skills
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="space-y-4"
            >
              <h3 className="text-2xl font-semibold text-muted-foreground mb-6">
                {category.title}
              </h3>
              <motion.div
                className="flex flex-wrap gap-3"
                variants={containerVariants}
              >
                {category.skills.map((skill) => (
                  <motion.div key={skill} variants={badgeVariants}>
                    <Badge
                      variant="secondary"
                      className="text-base px-4 py-2"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
