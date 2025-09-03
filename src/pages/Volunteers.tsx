import { motion } from 'framer-motion';
import { Linkedin, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { Volunteer, VolunteerData } from '../types';

const Volunteers: React.FC = () => {
  const location = useLocation();
  const [selectedYear, setSelectedYear] = useState(2025);
  const [volunteerData, setVolunteerData] = useState<VolunteerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [availableYears] = useState([2025, 2024, 2023, 2022, 2021, 2020]);

  useEffect(() => {
    const fetchVolunteers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/data/volunteers/${selectedYear}.json`);
        if (response.ok) {
          const data = await response.json();
          setVolunteerData(data);
        } else {
          setVolunteerData(null);
        }
      } catch (error) {
        console.error('Failed to fetch volunteers:', error);
        setVolunteerData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, [selectedYear]);

  // Handle URL parameter changes for year selection
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const yearParam = urlParams.get('year');
    if (yearParam && availableYears.includes(parseInt(yearParam))) {
      setSelectedYear(parseInt(yearParam));
    } else {
      // If no year parameter or invalid year, default to 2025
      setSelectedYear(2025);
    }
  }, [location.search, availableYears]);

  useEffect(() => {
    document.title = `Volunteers ${selectedYear} - IEEE Sri Lanka Section SIGHT`;
  }, [selectedYear]);

  const VolunteerCard: React.FC<{ volunteer: Volunteer; index: number }> = ({ volunteer, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            {volunteer.image ? (
              <img
                src={volunteer.image}
                alt={volunteer.name}
                className="w-16 h-16 rounded-full object-cover"
                onError={(e) => {
                  // Fallback to User icon if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center ${volunteer.image ? 'hidden' : ''}`}>
              <User className="h-8 w-8 text-gray-400" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{volunteer.name}</h3>
            <p className="text-blue-600 font-medium">{volunteer.role}</p>
            <p className="text-gray-600 text-sm">{volunteer.affiliation}</p>
          </div>
          {volunteer.linkedin && (
            <a
              href={volunteer.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-16 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Volunteers</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Meet the dedicated engineers and technologists who drive our humanitarian technology initiatives forward.
          </p>
        </div>

        {/* Year Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-4 sm:space-x-6 lg:space-x-8 overflow-x-auto pb-2">
              {availableYears.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`py-2 px-2 sm:px-3 border-b-2 font-medium text-sm transition-colors whitespace-nowrap flex-shrink-0 ${
                    selectedYear === year
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {year}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {loading ? (
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-32"></div>
              ))}
            </div>
          </div>
        ) : volunteerData ? (
          <div className="space-y-12 mb-16">
            {/* Executive Committee */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Executive Committee</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {volunteerData.executive.map((volunteer, index) => (
                  <VolunteerCard key={volunteer.name} volunteer={volunteer} index={index} />
                ))}
              </div>
            </div>

            {/* Committee Members */}
            {volunteerData.committee.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Committee Members</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {volunteerData.committee.map((volunteer, index) => (
                    <VolunteerCard key={volunteer.name} volunteer={volunteer} index={index} />
                  ))}
                </div>
              </div>
            )}

            {/* Project Volunteers */}
            {volunteerData.project_volunteers && volunteerData.project_volunteers.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Volunteers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {volunteerData.project_volunteers.map((volunteer, index) => (
                    <VolunteerCard key={volunteer.name} volunteer={volunteer} index={index} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No volunteer data available for {selectedYear}.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Volunteers;