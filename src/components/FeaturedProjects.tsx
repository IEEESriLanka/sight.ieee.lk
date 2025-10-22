import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../types';

const FeaturedProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/data/projects.json');
        const projectsData = await response.json();
        setProjects(projectsData);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our flagship humanitarian technology projects that are creating lasting impact across Sri Lankan communities.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden h-full">
                <div className="p-8 animate-pulse">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg mx-auto mb-6"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-6"></div>
                  <div className="h-10 bg-gray-200 rounded w-32 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group h-full flex flex-col"
              >
                <div className="p-8 flex flex-col h-full">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-24 h-24 bg-blue-50 rounded-lg flex items-center justify-center p-2">
                      <img
                        src={project.logo}
                        alt={`${project.name} logo`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement!;
                          parent.innerHTML = `
                            <div class="w-full h-full bg-blue-600 rounded-lg flex items-center justify-center">
                              <span class="text-white font-bold text-lg">${project.name.charAt(0)}</span>
                            </div>
                          `;
                        }}
                      />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                    {project.name}
                  </h3>

                  <p className="text-sm font-medium text-blue-600 mb-4 text-center">
                    {project.subtitle}
                  </p>

                  <p className="text-gray-600 leading-relaxed mb-6 text-center flex-grow">
                    {project.short_description || project.description}
                  </p>

                  <div className="text-center mt-auto">
                    <Link
                      to={`/projects/${project.slug}`}
                      onClick={() => window.scrollTo(0, 0)}
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors group-hover:bg-blue-700"
                    >
                      Explore More
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProjects;