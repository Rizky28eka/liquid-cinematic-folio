import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { client } from '../lib/sanity';
import ProjectCard from '../components/ProjectCard';

interface Project {
  _id: string;
  title: { en: string };
  client: string;
  date: string;
  description: { en: string };
  imageUrl: string;
  slug: string;
  category: string;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const AllProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const query = `*[_type == "project"]{
        ...,
        "imageUrl": image.asset->url,
        "slug": slug.current,
        "category": category->title
      }`;
      const data = await client.fetch(query);
      setProjects(data);
      setFilteredProjects(data);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    let tempProjects = [...projects];

    // Filter by search query
    if (searchQuery) {
      tempProjects = tempProjects.filter((project) =>
        project.title.en.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      tempProjects = tempProjects.filter(
        (project) => project.category?.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Sort projects
    if (sortBy === 'date-desc') {
      tempProjects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'date-asc') {
      tempProjects.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sortBy === 'title-asc') {
      tempProjects.sort((a, b) => a.title.en.localeCompare(b.title.en));
    } else if (sortBy === 'title-desc') {
      tempProjects.sort((a, b) => b.title.en.localeCompare(a.title.en));
    }

    setFilteredProjects(tempProjects);
  }, [searchQuery, categoryFilter, sortBy, projects]);

  const categories = [...new Set(projects.map(p => p.category).filter(Boolean))];

  return (
    <section id="projects" className="relative py-32 px-6 bg-background text-foreground min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-5xl font-bold mb-8 text-center"
        >
            All Projects
        </motion.h2>

        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4 p-4 rounded-lg bg-card border border-border"
        >
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-1/3 p-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="flex items-center gap-4">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="p-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="date-desc">Newest</option>
              <option value="date-asc">Oldest</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
            </select>
          </div>
        </motion.div>

        {loading ? (
            <div className="text-center">Loading projects...</div>
        ) : (
            <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <AnimatePresence>
                    {filteredProjects.map((project) => (
                        project.slug && (
                            <ProjectCard key={project._id} project={project} />
                        )
                    ))}
                </AnimatePresence>
            </motion.div>
        )}

        {filteredProjects.length === 0 && !loading && (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
            >
                <h3 className="text-2xl font-semibold">No projects found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
            </motion.div>
        )}

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
        >
          <Link to="/" className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
            Back to Home
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AllProjects;