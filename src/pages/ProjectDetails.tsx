import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { client } from '../lib/sanity';
import { ScrambledText } from '@/components/ScrambledText';
import { Badge } from '@/components/ui/badge';

interface Technology {
  name: string;
}

interface Project {
  _id: string;
  title: { en: string };
  description: { en: string };
  longDescription?: { en: string };
  imageUrl: string;
  galleryUrls?: string[];
  technologies?: Technology[];
  liveUrl?: string;
  githubUrl?: string;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const ProjectDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      const query = `*[_type == "project" && slug.current == $slug][0]{
        ...,
        "imageUrl": image.asset->url,
        "galleryUrls": gallery[].asset->url,
        "technologies": technologies[]->{name}
      }`;
      const data = await client.fetch(query, { slug });
      setProject(data);
      setLoading(false);
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background">Loading...</div>;
  }

  if (!project) {
    return <div className="min-h-screen flex items-center justify-center bg-background">Project not found.</div>;
  }

  return (
    <motion.section
      id="project-details"
      className="relative py-32 px-6 bg-background text-foreground"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-12">
            <Link to="/projects" className="text-primary hover:underline mb-4 inline-block"> &larr; Back to Projects</Link>
            <h2 className="text-5xl font-bold mb-4"><ScrambledText text={project.title.en} /></h2>
            <p className="text-xl text-muted-foreground">{project.description.en}</p>
        </motion.div>

        <motion.img
            variants={itemVariants}
            src={project.imageUrl}
            alt={project.title.en}
            className="w-full h-auto object-cover rounded-2xl mb-12 shadow-lg"
        />

        <motion.div
            variants={containerVariants}
            className="prose dark:prose-invert max-w-none"
        >
            {project.longDescription && (
                <motion.div variants={itemVariants}>
                    <h3 className="text-3xl font-bold mb-4">About the Project</h3>
                    <p>{project.longDescription.en}</p>
                </motion.div>
            )}

            {project.galleryUrls && project.galleryUrls.length > 0 && (
                <motion.div variants={itemVariants} className="mt-12">
                    <h3 className="text-3xl font-bold mb-4">Gallery</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {project.galleryUrls.map((url: string, index: number) => (
                            <motion.img
                                key={index}
                                src={url}
                                alt={`Gallery image ${index + 1}`}
                                className="rounded-lg shadow-md"
                                variants={itemVariants}
                            />
                        ))}
                    </div>
                </motion.div>
            )}

            {project.technologies && project.technologies.length > 0 && (
                <motion.div variants={itemVariants} className="mt-12">
                    <h3 className="text-3xl font-bold mb-4">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech: Technology, index: number) => (
                            <Badge key={index} variant="secondary">{tech.name}</Badge>
                        ))}
                    </div>
                </motion.div>
            )}

            <motion.div variants={itemVariants} className="mt-12 flex justify-center gap-4">
                {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">View Live</a>}
                {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors">View on GitHub</a>}
            </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProjectDetails;