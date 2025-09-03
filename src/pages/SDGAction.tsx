import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight, ExternalLink, Target } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import type { Initiative, SDGMetadata } from '../types';

const SDGAction: React.FC = () => {
  const { sdgId } = useParams<{ sdgId: string }>();
  const navigate = useNavigate();
  const [selectedSDG, setSelectedSDG] = useState<number>(parseInt(sdgId || '4'));
  const [sdgMetadata, setSDGMetadata] = useState<SDGMetadata[]>([]);
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [expandedTargets, setExpandedTargets] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const sdgColors: Record<number, string> = {
    1: 'bg-red-600', 2: 'bg-yellow-600', 3: 'bg-green-600', 4: 'bg-red-700',
    5: 'bg-orange-600', 6: 'bg-blue-500', 7: 'bg-yellow-500', 8: 'bg-red-800',
    9: 'bg-orange-700', 10: 'bg-pink-600', 11: 'bg-yellow-700', 12: 'bg-yellow-800',
    13: 'bg-green-700', 14: 'bg-blue-600', 15: 'bg-green-800', 16: 'bg-blue-800',
    17: 'bg-blue-900'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [metadataResponse, initiativesResponse] = await Promise.all([
          fetch('/data/sdg.json'),
          fetch('/data/initiatives.json'),
        ]);
        
        const metadataData = await metadataResponse.json();
        const initiativesData = await initiativesResponse.json();
        
        setSDGMetadata(metadataData);
        setInitiatives(initiativesData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (sdgId) {
      setSelectedSDG(parseInt(sdgId));
    }
  }, [sdgId]);

  useEffect(() => {
    document.title = `SDG ${selectedSDG} Action - IEEE Sri Lanka Section SIGHT`;
  }, [selectedSDG]);

  const handleSDGClick = (sdgNumber: number) => {
    setSelectedSDG(sdgNumber);
    navigate(`/sdg/${sdgNumber}`);
    setExpandedTargets(new Set());
  };

  const toggleTarget = (targetCode: string) => {
    const newExpanded = new Set(expandedTargets);
    if (newExpanded.has(targetCode)) {
      newExpanded.delete(targetCode);
    } else {
      newExpanded.add(targetCode);
    }
    setExpandedTargets(newExpanded);
  };

  const scrollToAndExpandTarget = (targetCode: string) => {
    // Extract SDG number from target code (e.g., "12.5" -> 12)
    const targetSDG = parseInt(targetCode.split('.')[0]);
    
    // If the target belongs to a different SDG, navigate to that SDG first
    if (targetSDG !== selectedSDG) {
      navigate(`/sdg/${targetSDG}`);
      // Set the target to expand after navigation
      setTimeout(() => {
        setSelectedSDG(targetSDG);
        // Wait for the page to load and then expand the target
        setTimeout(() => {
          expandAndScrollToTarget(targetCode);
        }, 500);
      }, 100);
    } else {
      expandAndScrollToTarget(targetCode);
    }
  };
  
  const expandAndScrollToTarget = (targetCode: string) => {
    // Expand the target if not already expanded
    if (!expandedTargets.has(targetCode)) {
      toggleTarget(targetCode);
    }
    
    // Scroll to the target after a brief delay to allow expansion
    setTimeout(() => {
      const targetElement = document.getElementById(`target-${targetCode}`);
      if (targetElement) {
        targetElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        // Add a brief highlight effect
        targetElement.classList.add('ring-2', 'ring-blue-400');
        setTimeout(() => {
          targetElement.classList.remove('ring-2', 'ring-blue-400');
        }, 2000);
      }
    }, 100);
  };

  const getRelatedInitiatives = () => {
    return initiatives
      .filter(initiative =>
        Array.isArray(initiative.related_sdgs) && initiative.related_sdgs.includes(selectedSDG)
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const getCurrentSDGData = () => {
    return sdgMetadata.find(sdg => parseInt(sdg.code) === selectedSDG);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-8 gap-2 mb-8">
              {Array.from({ length: 17 }, (_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const currentSDG = getCurrentSDGData();
  const relatedInitiatives = getRelatedInitiatives();

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Driving SDG Action with IEEE in Sri Lanka</h1>
          <p className="text-xl text-gray-600 max-w-4xl">
            Discover how IEEE initiatives across Sri Lanka accelerate progress toward the United Nations Sustainable Development Goals 
            through technology, education, and community partnerships.
          </p>
        </div>

        {/* SDG Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Select a Sustainable Development Goal</h2>
          <div className="grid grid-cols-6 lg:grid-cols-9 gap-3 mb-4">
            {Array.from({ length: 17 }, (_, i) => i + 1).map((sdgNumber) => (
              <motion.button
                key={sdgNumber}
                onClick={() => handleSDGClick(sdgNumber)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  aspect-square rounded-lg flex items-center justify-center p-1
                  transition-all duration-200 hover:shadow-lg
                  bg-white border-2 border-gray-200 hover:border-blue-400
                  ${selectedSDG === sdgNumber ? 'ring-4 ring-blue-400 shadow-lg' : ''}
                `}
              >
                <img
                  src={`/images/sdgs/E-WEB-Goal-${sdgNumber.toString().padStart(2, '0')}.png`}
                  alt={`SDG ${sdgNumber}`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement!;
                    parent.innerHTML = `
                      <div class="w-full h-full ${sdgColors[sdgNumber]} rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        ${sdgNumber}
                      </div>
                    `;
                  }}
                />
              </motion.button>
            ))}
            
            {/* SDG Logo as 18th card */}
            <div className="aspect-square rounded-lg bg-white flex items-center justify-center p-1 border-2 border-gray-200">
              <img
                src="/images/sdgs/susgoal.jpg"
                alt="UN Sustainable Development Goals"
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement!;
                  parent.innerHTML = `
                    <div class="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white">
                      <div class="text-center">
                        <div class="text-xs font-bold mb-1">UN</div>
                        <div class="text-xs font-bold">SDGs</div>
                      </div>
                    </div>
                  `;
                }}
              />
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Click on any SDG number to explore its targets, indicators, and related initiatives
          </p>
        </div>

        {currentSDG && (
          <motion.div
            key={selectedSDG}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* SDG Overview */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-start space-x-6">
                <div className={`w-20 h-20 rounded-lg flex items-center justify-center text-white font-bold text-2xl ${sdgColors[selectedSDG]}`}>
                  {selectedSDG}
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    SDG {selectedSDG}: {currentSDG.title}
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Explore the targets and indicators for this goal, and discover how IEEE Sri Lanka Section SIGHT 
                    is contributing to its achievement through our humanitarian technology initiatives.
                  </p>
                </div>
              </div>
            </div>

            {/* Targets and Indicators */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="h-6 w-6 mr-3 text-blue-600" />
                Targets and Indicators
              </h3>
              <div className="space-y-4">
                {currentSDG.targets.map((target) => (
                  <div 
                    key={target.code} 
                    id={`target-${target.code}`}
                    className="border border-gray-200 rounded-lg transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleTarget(target.code)}
                      className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            Target {target.code}
                          </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{target.description}</p>
                      </div>
                      {expandedTargets.has(target.code) ? (
                        <ChevronDown className="h-5 w-5 text-gray-400 ml-4" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-400 ml-4" />
                      )}
                    </button>
                    
                    {expandedTargets.has(target.code) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 pb-4 border-t border-gray-100"
                      >
                        <h4 className="font-semibold text-gray-900 mb-3 mt-4">Indicators:</h4>
                        <div className="space-y-3">
                          {target.indicators.map((indicator) => (
                            <div key={indicator.code} className="bg-gray-50 rounded-lg p-4">
                              <div className="flex items-start space-x-3">
                                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-medium flex-shrink-0">
                                  {indicator.code}
                                </span>
                                <p className="text-gray-600 text-sm leading-relaxed">{indicator.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Related Initiatives */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                IEEE Initiatives Contributing to SDG {selectedSDG}
              </h3>
              {relatedInitiatives.length > 0 ? (
                <div className="space-y-4">
                  {relatedInitiatives.map((initiative) => (
                    <div key={initiative.slug} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              initiative.type === 'project' ? 'bg-blue-100 text-blue-800' :
                              initiative.type === 'event' ? 'bg-green-100 text-green-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {initiative.type.charAt(0).toUpperCase() + initiative.type.slice(1)}
                            </span>
                            <span className="text-sm text-gray-500">
                              {new Date(initiative.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                          <h4 className="text-xl font-semibold text-gray-900 mb-2">{initiative.title}</h4>
                          <p className="text-gray-600 leading-relaxed mb-3">
                            {initiative.content}
                          </p>
                          
                          {/* Related Targets */}
                          {Array.isArray(initiative.related_sdg_targets) && initiative.related_sdg_targets.length > 0 && (
                            <div className="mb-3">
                              <span className="text-sm font-medium text-gray-700 mr-2">Related Targets:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {initiative.related_sdg_targets.map((targetCode) => (
                                  <button
                                    key={targetCode}
                                    onClick={() => scrollToAndExpandTarget(targetCode)}
                                    className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md hover:bg-blue-100 transition-colors border border-blue-200"
                                    title={`Click to view Target ${targetCode} details`}
                                  >
                                    Target {targetCode}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            {initiative.vtools_event_location && (
                              <span>📍 {initiative.vtools_event_location}</span>
                            )}
                          </div>
                        </div>
                        <Link
                          to={`/initiatives/${initiative.slug}`}
                          className="lg:ml-6 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors lg:flex-shrink-0"
                        >
                          View Details
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Target className="h-16 w-16 mx-auto" />
                  </div>
                  <p className="text-gray-500 text-lg">
                    We don't currently have initiatives specifically targeting SDG {selectedSDG}.
                  </p>
                  <p className="text-gray-400 mt-2">
                    Check back as we continue expanding our humanitarian technology programs.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SDGAction;