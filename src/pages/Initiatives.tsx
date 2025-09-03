import { motion } from 'framer-motion';
import { Filter, Search, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import InitiativeCard from '../components/InitiativeCard';

import type { Initiative } from '../types';

// Helper function to get URL search parameters
const getSearchParams = (search: string) => {
  const searchParams = new URLSearchParams(search);
  return {
    sdg: searchParams.get('sdg') || '',
    year: searchParams.get('year') || '',
    type: searchParams.get('type') || '',
    search: searchParams.get('search') || '',
  };
};

// Helper function to update URL with current filters
const updateURL = (filters: { year: string; type: string; sdg: string }, searchTerm: string, location: { pathname: string }) => {
  const searchParams = new URLSearchParams();

  if (filters.sdg) searchParams.set('sdg', filters.sdg);
  if (filters.year) searchParams.set('year', filters.year);
  if (filters.type) searchParams.set('type', filters.type);
  if (searchTerm) searchParams.set('search', searchTerm);

  const newURL = searchParams.toString()
    ? `${location.pathname}?${searchParams.toString()}`
    : location.pathname;

  window.history.replaceState({}, '', newURL);
};

const Initiatives: React.FC = () => {
  const location = useLocation();
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [filteredInitiatives, setFilteredInitiatives] = useState<Initiative[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    year: '',
    type: '',
    sdg: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize filters from URL parameters on mount and location change
  useEffect(() => {
    const urlParams = getSearchParams(location.search);
    setSearchTerm(urlParams.search);
    setFilters({
      year: urlParams.year,
      type: urlParams.type,
      sdg: urlParams.sdg,
    });
  }, [location.search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const initiativesResponse = await fetch('/data/initiatives.json');
        const initiativesData = await initiativesResponse.json();
        
        // Process the data to match our interface
        const processedData: Initiative[] = (initiativesData as Initiative[]).map((item: Initiative) => ({
          slug: item.slug,
          type: item.type as 'project' | 'event' | 'news' | 'awards',
          title: item.title,
          date: item.date,
          image: Array.isArray(item.image) ? item.image : item.image ? [item.image] : [],
          content: item.content,
          investment: item.investment,
          project: item.project,
          link: item.link,
          related_sdgs: item.related_sdgs || [],
          related_sdg_targets: item.related_sdg_targets || []
        }));

        // Sort by date descending (most recent first)
        const sortedData = processedData.sort((a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setInitiatives(sortedData);
        setFilteredInitiatives(sortedData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = initiatives;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(initiative =>
        initiative.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (initiative.content && initiative.content.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Year filter
    if (filters.year) {
      filtered = filtered.filter(initiative =>
        new Date(initiative.date).getFullYear().toString() === filters.year
      );
    }

    // Type filter
    if (filters.type) {
      filtered = filtered.filter(initiative => initiative.type === filters.type);
    }

    // SDG filter
    if (filters.sdg) {
      filtered = filtered.filter(initiative =>
        (initiative.related_sdgs || []).includes(parseInt(filters.sdg))
      );
    }

    // Sort filtered results by date (most recent first)
    filtered = filtered.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    setFilteredInitiatives(filtered);
  }, [initiatives, searchTerm, filters]);

  // Update URL when filters or search term change
  useEffect(() => {
    updateURL(filters, searchTerm, location);
  }, [filters, searchTerm, location]);

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({ year: '', type: '', sdg: '' });
    // URL will be updated automatically by the useEffect
  };

  const getUniqueValues = (key: string) => {
    const values = new Set<string>();
    initiatives.forEach(initiative => {
      if (key === 'year') {
        values.add(new Date(initiative.date).getFullYear().toString());
      } else if (key === 'type') {
        values.add(initiative.type);
      }
    });
    return Array.from(values).sort();
  };

  const getUniqueSdgs = () => {
    const sdgs = new Set<number>();
    initiatives.forEach(initiative => {
      (initiative.related_sdgs || []).forEach((sdg: number) => sdgs.add(sdg));
    });
    return Array.from(sdgs).sort((a, b) => a - b);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-96"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Social Impact Initiatives</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Explore our humanitarian technology projects, events, and achievements that are making a difference in communities across Sri Lanka.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search initiatives..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </button>

              {/* Clear Filters */}
              {(searchTerm || Object.values(filters).some(f => f)) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <X className="h-5 w-5 mr-2" />
                  Clear
                </button>
              )}
            </div>

            {/* Filter Options */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <select
                  value={filters.year}
                  onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Years</option>
                  {getUniqueValues('year').map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>

                <select
                  value={filters.type}
                  onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Types</option>
                  {getUniqueValues('type').map(type => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>

                <select
                  value={filters.sdg}
                  onChange={(e) => setFilters(prev => ({ ...prev, sdg: e.target.value }))}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All SDGs</option>
                  {getUniqueSdgs().map(sdg => (
                    <option key={sdg} value={sdg.toString()}>SDG {sdg}</option>
                  ))}
                </select>
              </motion.div>
            )}
          </div>

          {/* Results */}
          <div className="mb-4">
            <p className="text-gray-600">
              Showing {filteredInitiatives.length} of {initiatives.length} initiatives
            </p>
          </div>

          {/* Initiatives Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredInitiatives.map((initiative, index) => (
              <motion.div
                key={initiative.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <InitiativeCard
                  initiative={initiative}
                />
              </motion.div>
            ))}
          </div>

          {filteredInitiatives.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No initiatives found matching your criteria.</p>
              <button
                onClick={clearFilters}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear filters to see all initiatives
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Initiatives;