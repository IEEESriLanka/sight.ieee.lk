import { motion } from 'framer-motion';
import { Building, ExternalLink, Handshake } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import type { Partner } from '../types';

const Partners: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch('/data/partners.json');
        const data = await response.json();
        setPartners(data);
      } catch (error) {
        console.error('Failed to fetch partners:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  useEffect(() => {
    document.title = 'Partners - IEEE Sri Lanka Section SIGHT';
  }, []);

  const groupPartners = () => {
    const groups = {
      partnership: partners.filter(p => p.type === 'partnership' && p.status === 'active'),
      ieee: partners.filter(p => p.type === 'ieee' && p.status === 'active'),
      supporter: partners.filter(p => p.type === 'supporter' && p.status === 'active'),
    };

    return groups;
  };

  const getGroupInfo = (type: string) => {
    switch (type) {
      case 'partnership':
        return {
          title: 'Partnerships for Impact',
          description: 'We co-create solutions with industry and public institutions to scale humanitarian technology and education across Sri Lanka.',
          icon: Handshake,
          color: 'text-blue-600',
        };
      case 'ieee':
        return {
          title: 'IEEE Alliances',
          description: 'Global and regional IEEE bodies that provide strategy, programs, and expertise for humanitarian technology.',
          icon: Building,
          color: 'text-green-600',
        };
      case 'supporter':
        return {
          title: 'Supporters We Appreciate',
          description: 'Suppliers and service providers who have extended discounts or extra support. Appreciation does not imply exclusivity.',
          icon: Building,
          color: 'text-gray-600',
        };
      default:
        return null;
    }
  };

  const PartnerCard: React.FC<{ partner: Partner; index: number; isSupporter?: boolean }> = ({ 
    partner, 
    index, 
    isSupporter = false 
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${
        isSupporter ? 'border border-gray-200' : ''
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-center mb-4">
          {partner.logo ? (
            <img
              src={partner.logo}
              alt={`${partner.name} logo`}
              className="w-16 h-16 rounded-lg object-contain"
              onError={(e) => {
                // Fallback to Building icon if logo fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${
            isSupporter ? 'bg-gray-100' : 'bg-blue-50'
          } ${partner.logo ? 'hidden' : ''}`}>
            <Building className={`h-8 w-8 ${isSupporter ? 'text-gray-400' : 'text-blue-600'}`} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <h3 className={`text-lg font-semibold mb-2 text-center ${
            isSupporter ? 'text-gray-700' : 'text-gray-900'
          }`}>
            {partner.name}
          </h3>
          
          <p className={`text-sm leading-relaxed text-center flex-1 ${
            isSupporter ? 'text-gray-500' : 'text-gray-600'
          }`}>
            {partner.description}
          </p>

          {/* External link */}
          {partner.url && (
            <div className="mt-4 text-center">
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center text-sm font-medium transition-colors ${
                  isSupporter 
                    ? 'text-gray-500 hover:text-gray-700' 
                    : 'text-blue-600 hover:text-blue-700'
                }`}
                aria-label={`Open ${partner.name} website`}
              >
                Visit Website
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mb-8"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-48"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const groupedPartners = groupPartners();

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Partners</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Building collaborative relationships that amplify our humanitarian technology impact 
            across communities, institutions, and the global IEEE network.
          </p>
        </div>

        {/* Partner Groups */}
        <div className="space-y-16 mb-16">
          {(['partnership', 'ieee', 'supporter'] as const).map((type) => {
            const groupInfo = getGroupInfo(type);
            const groupPartners = groupedPartners[type];
            
            if (!groupInfo || groupPartners.length === 0) return null;

            return (
              <motion.section
                key={type}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Section Header */}
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center mb-4">
                    <groupInfo.icon className={`h-8 w-8 ${groupInfo.color} mr-3`} />
                    <h2 className="text-3xl font-bold text-gray-900">{groupInfo.title}</h2>
                  </div>
                  <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                    {groupInfo.description}
                  </p>
                </div>

                {/* Partners Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {groupPartners.map((partner, index) => (
                    <PartnerCard
                      key={partner.slug}
                      partner={partner}
                      index={index}
                      isSupporter={type === 'supporter'}
                    />
                  ))}
                </div>
              </motion.section>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-center text-white mb-16"
        >
          <h2 className="text-2xl font-bold mb-4">Become a Partner</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join us in creating sustainable humanitarian impact through technology. 
            We welcome partnerships with organizations that share our vision.
          </p>
          <a
            href="mailto:sightsl@ieee.org?subject=Partnership Inquiry&body=Hi, I'm interested in partnering with IEEE Sri Lanka Section SIGHT. Please let me know how we can collaborate."
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-50 transition-colors"
          >
            <Building className="mr-2 h-5 w-5" />
            Partner With Us
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Partners;