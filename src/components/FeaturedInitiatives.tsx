import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Initiative } from '../types';
import InitiativeCard from './InitiativeCard';

const FeaturedInitiatives: React.FC = () => {
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        const response = await fetch('/data/initiatives.json');
        const data = await response.json();

        // Process the data to match our interface
        const processedData: Initiative[] = (data as Initiative[]).map((item: Initiative) => ({
          slug: item.slug,
          type: item.type as 'project' | 'event' | 'news' | 'awards',
          title: item.title,
          date: item.date,
          image: Array.isArray(item.image) ? item.image : item.image ? [item.image] : [],
          content: item.content,
          investment: item.investment,
          project: item.project,
          link: item.link,
          related_sdgs: Array.isArray(item.related_sdgs) ? item.related_sdgs : [],
          related_sdg_targets: Array.isArray(item.related_sdg_targets) ? item.related_sdg_targets : []
        }));

        // Sort by date descending and take first 3
        const sorted = processedData.sort((a: Initiative, b: Initiative) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setInitiatives(sorted.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch initiatives:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitiatives();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-96"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recent Initiatives
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our latest humanitarian technology projects making a real difference in communities across Sri Lanka.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={initiative.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <InitiativeCard
                  initiative={initiative}
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/initiatives"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              See All Initiatives
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedInitiatives;