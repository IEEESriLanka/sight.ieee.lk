import { motion } from 'framer-motion';
import { ArrowLeft, Building, Calendar, DollarSign, ExternalLink, MapPin, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import type { Initiative, OrganizingUnit, Partner, Project } from '../types';
import ImageGallery from './ImageGallery';
import InitiativeCard from './InitiativeCard';
import SDGBadge from './SDGBadge';
import DynamicMetaTags from './DynamicMetaTags';

const InitiativeDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [initiative, setInitiative] = useState<Initiative | null>(null);
  const [matchedProject, setMatchedProject] = useState<Project | null>(null);

  const [relatedInitiatives, setRelatedInitiatives] = useState<Initiative[]>([]);
  const [organizers, setOrganizers] = useState<OrganizingUnit[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [initiativesResponse, projectsResponse] = await Promise.all([
          fetch('/data/initiatives.json'),
          fetch('/data/projects.json')
        ]);
        const initiativesData = await initiativesResponse.json();
        const projectsData = await projectsResponse.json();
        
        const foundInitiative = initiativesData.find((init: Initiative) => init.slug === slug);

        if (foundInitiative) {
          // Process the initiative to match our interface
          const processedInitiative: Initiative = {
            slug: foundInitiative.slug,
            type: foundInitiative.type,
            title: foundInitiative.title,
            date: foundInitiative.date,
            image: Array.isArray(foundInitiative.image) ? foundInitiative.image : (foundInitiative.image ? [foundInitiative.image] : []),
            content: foundInitiative.content,
            investment: foundInitiative.investment,
            project: foundInitiative.project,
            link: foundInitiative.link,
            related_sdgs: Array.isArray(foundInitiative.related_sdgs) ? foundInitiative.related_sdgs : [],
            related_sdg_targets: Array.isArray(foundInitiative.related_sdg_targets) ? foundInitiative.related_sdg_targets : [],
            vtools_id: foundInitiative.vtools_id,
            vtools_event_title: foundInitiative.vtools_event_title,
            vtools_event_location: foundInitiative.vtools_event_location,
            vtools_event_date: foundInitiative.vtools_event_date,
            vtools_number_of_attendance: foundInitiative.vtools_number_of_attendance,
            vtools_event_category: foundInitiative.vtools_event_category,
            vtools_event_sub_category: foundInitiative.vtools_event_sub_category,
            vtools_spoid: foundInitiative.vtools_spoid,
            vtools_organizational_unit: foundInitiative.vtools_organizational_unit,
            vtools_hosts: foundInitiative.vtools_hosts,
            vtools_cosponsor_name: Array.isArray(foundInitiative.vtools_cosponsor_name)
              ? foundInitiative.vtools_cosponsor_name
              : (foundInitiative.vtools_cosponsor_name ? [foundInitiative.vtools_cosponsor_name] : null),
            vtools_tags: foundInitiative.vtools_tags,
            vtools_virtual: foundInitiative.vtools_virtual,
            vtools_number_of_ieee_member_attendees: foundInitiative.vtools_number_of_ieee_member_attendees,
            vtools_number_of_non_member_attendees: foundInitiative.vtools_number_of_non_member_attendees,
            vtools_event_url: foundInitiative.vtools_event_url
          };

          setInitiative(processedInitiative);

          // Find matching project if initiative has a project field
          if (processedInitiative.project) {
            const project = projectsData.find((proj: Project) => proj.id === processedInitiative.project);
            setMatchedProject(project || null);
          } else {
            setMatchedProject(null);
          }

          // Organizers and supporters are not available in the new format, so we'll show empty arrays
          setOrganizers([]);
          setPartners([]);

          // Get related initiatives - since related_initiatives is not available, just show recent ones
          const recentInitiatives = initiativesData
            .filter((init: Initiative) => init.slug !== processedInitiative.slug)
            .sort((a: Initiative, b: Initiative) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .slice(0, 3);

          setRelatedInitiatives(recentInitiatives);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  useEffect(() => {
    if (initiative) {
      document.title = `${initiative.title} - IEEE Sri Lanka Section SIGHT`;
    }
  }, [initiative]);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getSDGs = () => {
    if (!initiative) return [];
    return initiative.related_sdgs || [];
  };

  const getSectionTitle = () => {
    return 'Recent Initiatives';
  };

  const getLocationDisplay = () => {
    if (initiative?.vtools_event_location) {
      return initiative.vtools_event_location;
    } else if (initiative?.vtools_virtual === 'Yes') {
      return 'Online';
    }
    return null;
  };

  const navigateToSDGTarget = (targetCode: string) => {
    // Extract SDG number from target code (e.g., "12.5" -> 12)
    const targetSDG = parseInt(targetCode.split('.')[0]);

    // Navigate to the SDG page
    navigate(`/sdg/${targetSDG}`);

    // After navigation, scroll to and expand the target
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
    }, 500);
  };

  const formatContent = (content: string) => {
    if (!content) return null;

    // URL regex pattern - matches http/https URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    // Split content by double newlines (paragraph breaks)
    const paragraphs = content.split(/\n\n+/).filter(p => p.trim());

    return paragraphs.map((paragraph, pIndex) => {
      const lines = paragraph.split('\n').filter(line => line.trim());
      
      return (
        <div key={pIndex} className={pIndex > 0 ? 'mt-4' : ''}>
          {lines.map((line, lIndex) => {
            // Check if line starts with bullet point
            const isBulletPoint = /^[•·▪▫-]\s/.test(line.trim());
            const lineContent = isBulletPoint ? line.trim().substring(2) : line.trim();

            // Find all URL matches using matchAll (better for global regex)
            const urlMatches = Array.from(lineContent.matchAll(urlRegex));

            // Build parts array
            const parts: React.ReactNode[] = [];
            
            if (urlMatches.length === 0) {
              // No URLs, just render the line
              parts.push(lineContent);
            } else {
              // Has URLs, split and create links
              let currentIndex = 0;
              urlMatches.forEach((match, urlIndex) => {
                const matchIndex = match.index!;
                const matchUrl = match[0];
                
                // Add text before URL
                if (matchIndex > currentIndex) {
                  parts.push(lineContent.substring(currentIndex, matchIndex));
                }
                // Add URL as link
                parts.push(
                  <a
                    key={`url-${pIndex}-${lIndex}-${urlIndex}`}
                    href={matchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 underline break-all"
                  >
                    {matchUrl}
                  </a>
                );
                currentIndex = matchIndex + matchUrl.length;
              });
              // Add remaining text after last URL
              if (currentIndex < lineContent.length) {
                parts.push(lineContent.substring(currentIndex));
              }
            }

            // Render line with or without bullet point styling
            if (isBulletPoint) {
              return (
                <div key={lIndex} className="flex items-start mt-2 first:mt-0">
                  <span className="text-gray-600 mr-2">•</span>
                  <span className="flex-1 text-gray-600 leading-relaxed">{parts}</span>
                </div>
              );
            }

            return (
              <p key={lIndex} className="text-gray-600 leading-relaxed mt-2 first:mt-0">
                {parts}
              </p>
            );
          })}
        </div>
      );
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="space-y-4">
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!initiative) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Initiative Not Found</h1>
            <p className="text-gray-600 mb-8">The initiative you're looking for doesn't exist.</p>
            <Link
              to="/initiatives"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Initiatives
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <DynamicMetaTags initiative={initiative} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            to="/initiatives"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Initiatives
          </Link>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-8"
        >
          {(() => {
            const images = Array.isArray(initiative.image) ? initiative.image : (initiative.image ? [initiative.image] : []);
            return images[0] ? (
              <>
                <img
                  src={images[0]}
                  alt={initiative.title}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  const container = target.parentElement!;
                  if (!container) return;
                  target.style.display = 'none';
                  container.className = container.className.replace('overflow-hidden', '');
                  container.innerHTML = `
                    <div class="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-end">
                      <div class="absolute inset-0 bg-black bg-opacity-20"></div>
                      <div class="relative z-10 p-6 w-full">
                        <div class="flex items-center mb-2">
                          <span class="px-3 py-1 rounded-full text-xs font-medium ${
                            initiative.type === 'project' ? 'bg-blue-100 text-blue-800' :
                            initiative.type === 'event' ? 'bg-green-100 text-green-800' :
                            'bg-purple-100 text-purple-800'
                          }">
                            ${initiative.type.charAt(0).toUpperCase() + initiative.type.slice(1)}
                          </span>
                        </div>
                        <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">${initiative.title}</h1>
                        <div class="flex items-center text-white text-sm">
                          <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          <span>${formatDate(initiative.date)}</span>
                          ${getLocationDisplay() ? `
                            <span class="mx-2 text-gray-300">•</span>
                            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            <span>${getLocationDisplay()}</span>
                          ` : ''}
                        </div>
                      </div>
                    </div>
                  `;
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-30" />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-end">
              <div className="absolute inset-0 bg-black bg-opacity-20" />
            </div>
          );
          })()}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                initiative.type === 'project' ? 'bg-blue-100 text-blue-800' :
                initiative.type === 'event' ? 'bg-green-100 text-green-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {initiative.type.charAt(0).toUpperCase() + initiative.type.slice(1)}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{initiative.title}</h1>
            <div className="flex items-center text-white text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formatDate(initiative.date)}</span>
              {getLocationDisplay() && (
                <>
                  <span className="mx-2 text-gray-300">•</span>
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{getLocationDisplay()}</span>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {initiative.content && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
                <div className="text-gray-600 leading-relaxed">
                  {formatContent(initiative.content)}
                </div>
                {initiative.vtools_tags && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {initiative.vtools_tags.split(' ').map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Image Gallery */}
            {(() => {
              const images = Array.isArray(initiative.image) ? initiative.image : (initiative.image ? [initiative.image] : []);
              return (
                <ImageGallery
                  images={images}
                  alt={initiative.title}
                  title={initiative.title}
                />
              );
            })()}

            {(initiative.link || initiative.vtools_event_url) && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Resources</h3>
                <div className="space-y-3">
                  {initiative.vtools_event_url && (
                    <div className="block">
                      <a
                        href={initiative.vtools_event_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        View on vTools Events
                        <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  )}
                  {initiative.link && (
                    <div className="block">
                      <a
                        href={initiative.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        View Resource
                        <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Related Project */}
            {matchedProject && (
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-900 mb-4">Related Project</h4>
                <Link
                  to={`/projects/${matchedProject.slug}`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="block group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center p-2 flex-shrink-0">
                      <img
                        src={matchedProject.logo}
                        alt={`${matchedProject.name} logo`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement!;
                          parent.innerHTML = `
                            <div class="w-full h-full bg-blue-600 rounded-lg flex items-center justify-center">
                              <span class="text-white font-bold text-lg">${matchedProject.name.charAt(0)}</span>
                            </div>
                          `;
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                        {matchedProject.name}
                      </h5>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {matchedProject.subtitle}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Investment */}
            {initiative.investment && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-gray-600" />
                  Investment
                </h4>
                <p className="text-2xl font-bold text-green-600">
                  {initiative.investment}
                </p>
              </div>
            )}

            {/* Organizers */}
            {organizers.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Building className="h-5 w-5 mr-2 text-gray-600" />
                  Organizers
                </h4>
                <div className="space-y-2">
                  {organizers.map((org) => (
                    <p key={org.id} className="text-gray-600 text-sm">
                      {org.name}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Supporters */}
            {partners.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Supporters</h4>
                <div className="space-y-2">
                  {partners.map((partner) => (
                    <p key={partner.slug} className="text-gray-600 text-sm">
                      {partner.name}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* SDGs and Targets */}
            {(getSDGs().length > 0 || (initiative?.related_sdg_targets && Array.isArray(initiative.related_sdg_targets) && initiative.related_sdg_targets.length > 0)) && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Related SDGs & Targets</h4>

                {/* SDG Logos */}
                {getSDGs().length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Sustainable Development Goals</h5>
                    <div className="grid grid-cols-3 gap-1">
                      {getSDGs().map((sdg) => (
                        <SDGBadge key={sdg} sdg={sdg} size="xl" />
                      ))}
                    </div>
                  </div>
                )}

                {/* SDG Targets */}
                {initiative?.related_sdg_targets && Array.isArray(initiative.related_sdg_targets) && initiative.related_sdg_targets.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">SDG Targets</h5>
                    <div className="flex flex-wrap gap-2">
                      {initiative.related_sdg_targets.map((targetCode) => (
                        <button
                          key={targetCode}
                          onClick={() => navigateToSDGTarget(targetCode)}
                          className="inline-flex items-center px-3 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-md hover:bg-blue-100 transition-colors border border-blue-200"
                          title={`Click to view Target ${targetCode} details`}
                        >
                          Target {targetCode}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Beneficiaries */}
            {initiative?.vtools_number_of_attendance && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-gray-600" />
                  Beneficiaries
                </h4>
                <p className="text-2xl font-bold text-blue-600">
                  {initiative.vtools_number_of_attendance}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Total attendees
                </p>
              </div>
            )}

            {/* Organizers */}
            {initiative?.vtools_hosts && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Building className="h-5 w-5 mr-2 text-gray-600" />
                  Organizers
                </h4>
                <div className="space-y-2">
                  {initiative.vtools_hosts.split('|').map((organizer, index) => (
                    <p key={index} className="text-gray-600 text-sm">
                      {organizer.trim()}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Sponsors */}
            {initiative?.vtools_cosponsor_name && Array.isArray(initiative.vtools_cosponsor_name) && initiative.vtools_cosponsor_name.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-gray-600" />
                  Sponsors
                </h4>
                <div className="space-y-2">
                  {initiative.vtools_cosponsor_name.map((sponsor, index) => (
                    <p key={index} className="text-gray-600 text-sm">
                      {sponsor.trim()}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Related/Recent Initiatives */}
        {relatedInitiatives.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {getSectionTitle()}
              </h2>
              <p className="text-lg text-gray-600">
                {getSectionTitle() === 'Related Initiatives' 
                  ? 'Discover other initiatives connected to this project'
                  : 'Explore our latest humanitarian technology initiatives'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedInitiatives.map((relatedInitiative, index) => (
                <motion.div
                  key={relatedInitiative.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  <InitiativeCard initiative={relatedInitiative} />
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                to="/initiatives"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                View All Initiatives
                <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
              </Link>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default InitiativeDetail;