import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Project {
  _id: string;
  title: { en: string };
  client: string;
  date: string;
  description: { en: string };
  imageUrl: string;
  slug: string;
}

interface ProjectCardProps {
  project: Project;
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, -0.01, 0.9] as const,
    },
  },
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div variants={cardVariants}>
      <Link to={`/project/${project.slug}`}>
        <motion.article
          className="project-item bg-background/50 backdrop-blur-lg rounded-2xl overflow-hidden group cursor-pointer transform-gpu border border-foreground/10 shadow-lg"
          whileHover="hover"
          initial="initial"
          variants={{
            initial: { y: 0, scale: 1, boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.2)' },
            hover: {
              y: -12,
              scale: 1.03,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
              transition: { type: 'spring', stiffness: 300, damping: 20 }
            },
          }}
        >
          {/* Image Container */}
          <div className="relative overflow-hidden h-64 md:h-72">
            <motion.img
              src={project.imageUrl}
              alt={project.title.en}
              className="w-full h-full object-cover"
              variants={{
                initial: { scale: 1 },
                hover: { scale: 1.1 },
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-4 gap-4">
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-semibold mb-2 group-hover:text-foreground/80 transition-colors">
                  {project.title.en}
                </h3>
                <p className="text-base md:text-lg text-muted-foreground">
                  {project.client}
                </p>
              </div>
              <time
                className="text-sm text-muted-foreground whitespace-nowrap"
                dateTime={project.date}
              >
                {new Date(project.date).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                })}
              </time>
            </div>
            <p className="text-muted-foreground leading-relaxed line-clamp-3">
              {project.description.en}
            </p>

            {/* Read more indicator */}
            <motion.div
              className="mt-4 flex items-center text-sm font-medium text-foreground/60 group-hover:text-foreground transition-colors"
              variants={{ hover: { color: 'var(--foreground)' } }}
            >
              <span>View Project</span>
              <motion.svg
                className="ml-2 w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                variants={{ hover: { x: 4 } }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </motion.svg>
            </motion.div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
