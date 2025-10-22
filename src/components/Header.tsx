import {
  ChevronDown,
  Cog,
  Droplets,
  GraduationCap,
  Handshake,
  Leaf,
  Menu,
  Recycle,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Cause, Project } from "../types";

// Map icon names to actual icon components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  Droplets,
  Cog,
  Recycle,
  Leaf,
  Handshake,
};

interface HeaderProps {
  showMetaNav?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showMetaNav = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [menuCloseTimeout, setMenuCloseTimeout] = useState<number | null>(null);
  const [impactAreas, setImpactAreas] = useState<
    Array<{
      name: string;
      href: string;
      code: string;
      icon: React.ComponentType<{ className?: string }>;
    }>
  >([]);
  const [featuredProjects, setFeaturedProjects] = useState<
    Array<{ name: string; href: string; logo: string }>
  >([]);
  

  const location = useLocation();

  const toggleSection = (sectionName: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionName)) {
      newExpanded.delete(sectionName);
    } else {
      newExpanded.add(sectionName);
    }
    setExpandedSections(newExpanded);
  };

  const handleMenuEnter = () => {
    if (menuCloseTimeout) {
      clearTimeout(menuCloseTimeout);
      setMenuCloseTimeout(null);
    }
    setIsMegaMenuOpen(true);
  };

  const handleMenuLeave = () => {
    const timeout = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 150); // 150ms delay
    setMenuCloseTimeout(timeout);
  };

  const closeMegaMenu = () => {
    if (menuCloseTimeout) {
      clearTimeout(menuCloseTimeout);
      setMenuCloseTimeout(null);
    }
    setIsMegaMenuOpen(false);
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Impact Areas", href: "/initiatives", isDropdown: true },
    { name: "Projects", href: "/initiatives", isDropdown: true },
    { name: "SDGs in Action", href: "/sdg/", isDropdown: true },
    { name: "Support Us", href: "/support", isDropdown: true },
    { name: "About", href: "/about", isDropdown: true },
  ];

  // Load impact areas from causes.json
  useEffect(() => {
    const fetchImpactAreas = async () => {
      try {
        const response = await fetch("/data/causes.json");
        const causesData: Cause[] = await response.json();

        // Transform causes data to match impactAreas format
        const transformedAreas = causesData.map((cause) => ({
          name: cause.title,
          href: `/initiatives?sdg=${cause.id}`,
          code: cause.id.toString(),
          icon: iconMap[cause.iconName],
        }));

        setImpactAreas(transformedAreas);
      } catch (error) {
        console.error("Error fetching impact areas:", error);
        // Fallback to empty array if fetch fails
        setImpactAreas([]);
      }
    };

    fetchImpactAreas();
  }, []);

  // Load featured projects from projects.json
  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const response = await fetch("/data/projects.json");
        const projectsData: Project[] = await response.json();

        // Transform projects data to match featuredProjects format
        const transformedProjects = projectsData.map((project) => ({
          name: project.name,
          href: `/${project.slug}`,
          logo: project.logo,
        }));

        setFeaturedProjects(transformedProjects);
      } catch (error) {
        console.error("Error fetching featured projects:", error);
        // Fallback to empty array if fetch fails
        setFeaturedProjects([]);
      }
    };

    fetchFeaturedProjects();
  }, []);

  

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (menuCloseTimeout) {
        clearTimeout(menuCloseTimeout);
      }
    };
  }, [menuCloseTimeout]);


  const allSDGs = [
    { code: "1", short_name: "No Poverty" },
    { code: "2", short_name: "Zero Hunger" },
    { code: "3", short_name: "Good Health and Well-Being" },
    { code: "4", short_name: "Quality Education" },
    { code: "5", short_name: "Gender Equality" },
    { code: "6", short_name: "Clean Water and Sanitation" },
    { code: "7", short_name: "Affordable and Clean Energy" },
    { code: "8", short_name: "Decent Work and Economic Growth" },
    { code: "9", short_name: "Industry, Innovation and Infrastructure" },
    { code: "10", short_name: "Reduced Inequalities" },
    { code: "11", short_name: "Sustainable Cities and Communities" },
    { code: "12", short_name: "Responsible Consumption and Production" },
    { code: "13", short_name: "Climate Action" },
    { code: "14", short_name: "Life Below Water" },
    { code: "15", short_name: "Life on Land" },
    { code: "16", short_name: "Peace, Justice and Strong Institutions" },
    { code: "17", short_name: "Partnerships for the Goals" },
  ];



  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };


  return (
    <header className={`bg-white shadow-sm z-50 transition-all duration-300 ease-in-out ${
      showMetaNav ? 'sticky top-0' : 'fixed top-0 left-0 right-0'
    }`}>
      {/* Mega Menu Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .mega-menu.open {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
          }
          .mega-menu {
            opacity: 0;
            visibility: hidden;
            transform: translateY(8px);
            transition: all 0.2s ease-in-out;
          }
        `,
        }}
      />
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2x2 Grid Layout for Desktop */}
        <div className="hidden md:grid md:grid-rows-2 md:gap-x-6 md:gap-y-0 md:min-h-[64px] md:py-1" style={{gridTemplateColumns: 'auto 1fr'}}>
          {/* Column 1 - SIGHT Logo (spans both rows) */}
          <div className="row-span-2 flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/images/logos/sight-sl-logo.png"
                alt="IEEE Sri Lanka Section SIGHT"
                className="h-12 lg:h-16 w-auto flex-shrink-0"
              />
            </Link>
          </div>

          {/* Column 2, Row 1 - Organization Text + IEEE Logo */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="font-bold text-gray-900 text-sm lg:text-base leading-tight whitespace-nowrap">
                IEEE Sri Lanka Section SIGHT | Special Interest Group on Humanitarian Technology
              </span>
            </div>
            
            {/* IEEE Master Brand */}
            <div className="flex items-center ml-4 flex-shrink-0">
              <a 
                href="https://www.ieee.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
                aria-label="IEEE"
              >
                <img 
                  src="/images/logos/ieee-logo.png" 
                  alt="IEEE" 
                  className="h-[33px] w-auto min-w-[100px] max-w-[120px] object-contain"
                  style={{
                    // Clear space: 1/2x where x=height of letters I-E-E-E (approximately 16.5px)
                    margin: '8.25px'
                  }}
                />
              </a>
            </div>
          </div>

          {/* Column 2, Row 2 - Desktop Navigation */}
          <div className="flex items-center relative">
            <div 
              className="flex items-baseline justify-between w-full mega-menu-trigger"
              onMouseEnter={handleMenuEnter}
              onMouseLeave={handleMenuLeave}
            >
              {navigation.map((item) => {
                // Simple link items
                if (!item.isDropdown) {
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => window.scrollTo(0, 0)}
                      className={`pr-1 lg:pr-2 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                        isActive(item.href)
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                }

                // All dropdown items - simplified for mega menu
                return (
                  <button
                    key={item.name}
                    className={`px-1 lg:px-2 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                      isActive(item.href)
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4 inline" />
                  </button>
                );
              })}
            </div>

            {/* Mega Menu Panel */}
            <div 
              className={`mega-menu absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 ${isMegaMenuOpen ? 'open' : ''}`}
              onMouseEnter={handleMenuEnter}
              onMouseLeave={handleMenuLeave}
            >
              <div className="max-w-7xl mx-auto p-6">
                <div className="grid grid-cols-5 gap-8">
                  
                  {/* Impact Areas Column */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Impact Areas</h3>
                    <div className="space-y-2">
                      <Link
                        to="/initiatives"
                        onClick={closeMegaMenu}
                        className="block text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded"
                      >
                        All Impact Areas
                      </Link>
                      {impactAreas.map((area) => (
                        <Link
                          key={area.code}
                          to={area.href}
                          onClick={closeMegaMenu}
                          className="block text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded"
                        >
                          <span className="flex items-center space-x-3">
                            <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                              {area.icon && <area.icon className="w-4 h-4" />}
                            </div>
                            <span className="flex-1">{area.name}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Projects Column */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Projects</h3>
                    <div className="space-y-2">
                      <Link
                        to="/initiatives"
                        onClick={closeMegaMenu}
                        className="block text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded"
                      >
                        All Project Initiatives
                      </Link>
                      {featuredProjects.slice(0, 6).map((project) => (
                        <Link
                          key={project.href}
                          to={project.href}
                          onClick={closeMegaMenu}
                          className="block text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded"
                        >
                          <span className="flex items-center space-x-3">
                            <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                              <img
                                src={project.logo}
                                alt={`${project.name} logo`}
                                className="w-4 h-4 object-contain"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = "none";
                                }}
                              />
                            </div>
                            <span className="flex-1">{project.name}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* SDGs Column */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">SDGs in Action</h3>
                    <div className="space-y-2">
                      <Link
                        to="/sdg/4"
                        onClick={closeMegaMenu}
                        className="block text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded"
                      >
                        All SDGs Overview
                      </Link>
                      {allSDGs.filter(sdg => ["4", "6", "9", "12", "13", "17"].includes(sdg.code)).map((sdg) => (
                        <Link
                          key={sdg.code}
                          to={`/sdg/${sdg.code}`}
                          onClick={closeMegaMenu}
                          className="block text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded"
                        >
                          <span className="flex items-center space-x-3">
                            <div className="w-6 h-4 flex items-center justify-center flex-shrink-0">
                              <img
                                src={`/images/sdgs/E Inverted Icons_WEB-${sdg.code.padStart(2, "0")}.png`}
                                alt={`SDG ${sdg.code}`}
                                className="w-6 h-4 object-contain"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = "none";
                                }}
                              />
                            </div>
                            <span className="text-sm leading-tight flex-1">{sdg.short_name}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Support Us Column */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Support Us</h3>
                    <div className="space-y-2">
                      <Link
                        to="/needs"
                        onClick={closeMegaMenu}
                        className="block text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded"
                      >
                        Look for Community Needs
                      </Link>
                      <a
                        href="/support#donate"
                        onClick={closeMegaMenu}
                        className="block text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded"
                      >
                        Donate to a Cause
                      </a>
                      <a
                        href="/support#volunteer"
                        onClick={closeMegaMenu}
                        className="block text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded"
                      >
                        Volunteer as an Individual
                      </a>
                      <a
                        href="/support#sight-group"
                        onClick={closeMegaMenu}
                        className="block text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded"
                      >
                        Start a SIGHT Group
                      </a>
                    </div>
                  </div>

                  {/* About Column */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">About</h3>
                    <div className="space-y-2">
                      <Link
                        to="/about"
                        onClick={closeMegaMenu}
                        className="block text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded"
                      >
                        About SIGHT
                      </Link>
                      <Link
                        to="/volunteers"
                        onClick={closeMegaMenu}
                        className="block text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded"
                      >
                        Our Volunteers
                      </Link>
                      <Link
                        to="/partners"
                        onClick={closeMegaMenu}
                        className="block text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded"
                      >
                        Our Partners
                      </Link>
                      <Link
                        to="/resources"
                        onClick={closeMegaMenu}
                        className="block text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded"
                      >
                        IEEE SIGHT Resources
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex justify-between items-center h-16">
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/images/logos/sight-sl-logo.png"
                alt="IEEE Sri Lanka Section SIGHT"
                className="h-8 sm:h-10 w-auto flex-shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-gray-900 text-xs sm:text-sm leading-tight truncate">
                  IEEE Sri Lanka Section
                </span>
                <span className="font-bold text-xs text-gray-600 leading-tight truncate">
                  <span className="hidden xs:inline">Special Interest Group on Humanitarian Technology (SIGHT)</span>
                  <span className="xs:hidden">SIG on Humanitarian Technology</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div>
            <button
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                if (isMenuOpen) {
                  // Reset expanded sections when closing menu
                  setExpandedSections(new Set());
                }
              }}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            {/* IEEE Master Brand for mobile */}
            <div className="px-2 pt-2 pb-3 border-b border-gray-200">
              <a 
                href="https://www.ieee.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
                aria-label="IEEE"
              >
                <img 
                  src="/images/logos/ieee-logo.png" 
                  alt="IEEE" 
                  className="h-[33px] w-auto min-w-[100px] max-w-[120px] object-contain"
                  style={{
                    // Clear space: 1/2x where x=height of letters I-E-E-E (approximately 16.5px)
                    margin: '8.25px'
                  }}
                />
              </a>
            </div>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white max-h-[calc(100vh-4rem)] overflow-y-auto">
              {navigation.map((item) => {
                // Simple navigation items (Home only)
                if (!item.isDropdown) {
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => {
                        setIsMenuOpen(false);
                        window.scrollTo(0, 0);
                      }}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        isActive(item.href)
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                }

                // Expandable navigation items
                const isExpanded = expandedSections.has(item.name);

                return (
                  <div key={item.name} className="space-y-1">
                    {/* Main Item with Toggle */}
                    <button
                      onClick={() => toggleSection(item.name)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        isActive(item.href)
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          isExpanded ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Expandable Content */}
                    {isExpanded && (
                      <div className="pl-4 space-y-1">
                        {/* Impact Areas Content */}
                        {item.name === "Impact Areas" && (
                          <>
                            <Link
                              to="/initiatives"
                              onClick={() => {
                                setIsMenuOpen(false);
                                window.scrollTo(0, 0);
                              }}
                              className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                            >
                              All Impact Areas
                            </Link>

                            <div className="text-xs font-medium text-gray-500 px-3 py-1 mt-2">
                              Browse by Area
                            </div>
                            {impactAreas.slice(0, 4).map((area) => (
                              <Link
                                key={area.code}
                                to={area.href}
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  window.scrollTo(0, 0);
                                }}
                                className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                              >
                                <span className="flex items-center space-x-3">
                                  <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                                    {area.icon && (
                                      <area.icon className="w-4 h-4" />
                                    )}
                                  </div>
                                  <span className="flex-1">{area.name}</span>
                                </span>
                              </Link>
                            ))}
                          </>
                        )}

                        {/* Projects Content */}
                        {item.name === "Projects" && (
                          <>
                            <Link
                              to="/initiatives"
                              onClick={() => {
                                setIsMenuOpen(false);
                                window.scrollTo(0, 0);
                              }}
                              className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                            >
                              All Project Initiatives
                            </Link>

                            <div className="text-xs font-medium text-gray-500 px-3 py-1 mt-2">
                              Featured Projects
                            </div>
                            {featuredProjects.slice(0, 4).map((project) => (
                              <Link
                                key={project.href}
                                to={project.href}
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  window.scrollTo(0, 0);
                                }}
                                className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                              >
                                <span className="flex items-center space-x-3">
                                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                                    <img
                                      src={project.logo}
                                      alt={`${project.name} logo`}
                                      className="w-5 h-5 object-contain"
                                      onError={(e) => {
                                        const target =
                                          e.target as HTMLImageElement;
                                        target.style.display = "none";
                                      }}
                                    />
                                  </div>
                                  <span className="flex-1">{project.name}</span>
                                </span>
                              </Link>
                            ))}
                          </>
                        )}

                        {/* SDGs in Action Content */}
                        {item.name === "SDGs in Action" && (
                          <>
                            <Link
                              to="/sdg/4"
                              onClick={() => {
                                setIsMenuOpen(false);
                                window.scrollTo(0, 0);
                              }}
                              className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                            >
                              All SDGs Overview
                            </Link>

                            <div className="text-xs font-medium text-gray-500 px-3 py-1 mt-2">
                              Quick Access SDGs
                            </div>
                            {allSDGs
                              .filter((sdg) => ["4", "6", "9", "12", "13", "17"].includes(sdg.code))
                              .map((sdgItem) => (
                                <Link
                                  key={sdgItem.code}
                                  to={`/sdg/${sdgItem.code}`}
                                  onClick={() => {
                                    setIsMenuOpen(false);
                                    window.scrollTo(0, 0);
                                  }}
                                  className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                >
                                  <span className="flex items-center space-x-3">
                                    <div className="w-6 h-4 flex items-center justify-center flex-shrink-0">
                                      <img
                                        src={`/images/sdgs/E Inverted Icons_WEB-${sdgItem.code
                                          .padStart(2, "0")}.png`}
                                        alt={`SDG ${sdgItem.code}`}
                                        className="w-6 h-4 object-contain"
                                        onError={(e) => {
                                          const target =
                                            e.target as HTMLImageElement;
                                          target.style.display = "none";
                                          const parent = target.parentElement!;
                                          const fallback =
                                            document.createElement("span");
                                          fallback.className =
                                            "inline-block w-6 h-4 rounded text-sm text-white text-center leading-4 bg-blue-600 flex items-center justify-center";
                                          fallback.textContent =
                                            sdgItem.code;
                                          parent.insertBefore(fallback, target);
                                        }}
                                      />
                                    </div>
                                    <span className="flex-1 text-sm leading-tight">
                                      {sdgItem.short_name}
                                    </span>
                                  </span>
                                </Link>
                              ))}
                          </>
                        )}

                        {/* Support Us Content */}
                        {item.name === "Support Us" && (
                          <>
                            <Link
                              to="/needs"
                              onClick={() => {
                                setIsMenuOpen(false);
                                window.scrollTo(0, 0);
                              }}
                              className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            >
                              Look for Community Needs
                            </Link>
                            <div className="border-t border-gray-100 my-2"></div>
                            <a
                              href="/support#donate"
                              onClick={() => setIsMenuOpen(false)}
                              className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            >
                              Donate to a Cause
                            </a>
                            <a
                              href="/support#volunteer"
                              onClick={() => setIsMenuOpen(false)}
                              className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            >
                              Volunteer as an Individual
                            </a>
                            <a
                              href="/support#sight-group"
                              onClick={() => setIsMenuOpen(false)}
                              className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            >
                              Start a SIGHT Group
                            </a>
                          </>
                        )}



                        {/* About Content */}
                        {item.name === "About" && (
                          <>
                            <Link
                              to="/about"
                              onClick={() => {
                                setIsMenuOpen(false);
                                window.scrollTo(0, 0);
                              }}
                              className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            >
                              About SIGHT
                            </Link>
                            
                            <Link
                              to="/volunteers"
                              onClick={() => {
                                setIsMenuOpen(false);
                                window.scrollTo(0, 0);
                              }}
                              className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            >
                              Our Volunteers
                            </Link>
                            
                            <Link
                              to="/partners"
                              onClick={() => {
                                setIsMenuOpen(false);
                                window.scrollTo(0, 0);
                              }}
                              className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            >
                              Our Partners
                            </Link>
                            
                            <Link
                              to="/resources"
                              onClick={() => {
                                setIsMenuOpen(false);
                                window.scrollTo(0, 0);
                              }}
                              className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            >
                              IEEE SIGHT Resources
                            </Link>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
