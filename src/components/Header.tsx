import {
  ChevronDown,
  ChevronRight,
  Cog,
  Droplets,
  ExternalLink,
  GraduationCap,
  Handshake,
  Leaf,
  Menu,
  Recycle,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Cause, Project, Resource } from "../types";

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
  const [resourceLinks, setResourceLinks] = useState<Resource[]>([]);

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

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Our Initiatives", href: "/initiatives", isDropdown: true },
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

  // Load resource links from resources.json
  useEffect(() => {
    const fetchResourceLinks = async () => {
      try {
        const response = await fetch("/data/resources.json");
        const resourcesData: Resource[] = await response.json();
        setResourceLinks(resourcesData);
      } catch (error) {
        console.error("Error fetching resource links:", error);
        // Fallback to empty array if fetch fails
        setResourceLinks([]);
      }
    };

    fetchResourceLinks();
  }, []);

  const volunteerYears = [
    { name: "All Volunteers", href: "/volunteers" },
    { name: "2025", href: "/volunteers?year=2025" },
    { name: "2024", href: "/volunteers?year=2024" },
    { name: "2023", href: "/volunteers?year=2023" },
    { name: "2022", href: "/volunteers?year=2022" },
    { name: "2021", href: "/volunteers?year=2021" },
    { name: "2020", href: "/volunteers?year=2020" },
  ];

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

  const closeDropdowns = () => {
    // Force close all dropdowns by triggering a blur event
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) {
      activeElement.blur();
    }
  };

  return (
    <header className={`bg-white shadow-sm z-50 transition-all duration-300 ease-in-out ${
      showMetaNav ? 'sticky top-0' : 'fixed top-0 left-0 right-0'
    }`}>
      {/* Desktop Dropdown Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .dropdown:hover .dropdown-menu {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
          }
          .dropdown:not(:hover) .dropdown-menu {
            opacity: 0;
            visibility: hidden;
            transform: translateY(8px);
            transition-delay: 150ms;
          }
        `,
        }}
      />
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
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

          {/* IEEE Master Brand - Alternative placement in header */}
          <div className="hidden xl:flex items-center ml-4 flex-shrink-0">
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

          {/* Desktop Navigation */}
          <div className="hidden md:block flex-1">
            <div className="flex items-baseline justify-end space-x-1 lg:space-x-3">
              {navigation.map((item) => {
                // Home - simple link
                if (item.name === "Home") {
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => window.scrollTo(0, 0)}
                      className={`px-1 lg:px-2 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                        isActive(item.href)
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                }

                // Our Initiatives Dropdown
                if (item.name === "Our Initiatives") {
                  return (
                    <div key={item.name} className="relative dropdown">
                      <button
                        className={`px-1 lg:px-2 py-2 rounded-md text-sm font-medium transition-colors flex items-center whitespace-nowrap ${
                          isActive("/initiatives") ||
                          isActive("/foh") ||
                          isActive("/nenasa") ||
                          isActive("/sp")
                            ? "bg-blue-100 text-blue-700"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        Our Initiatives
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>

                      <div className="dropdown-menu absolute right-0 lg:left-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible transform translate-y-2 transition-all duration-200 z-50">
                        <div className="py-2">
                          <Link
                            to="/initiatives"
                            onClick={() => window.scrollTo(0, 0)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium"
                            onMouseDown={closeDropdowns}
                          >
                            Explore All Initiatives
                          </Link>

                          <div className="border-t border-gray-100 my-2"></div>

                          <div className="relative group">
                            <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                              <span className="font-medium">Impact Areas</span>
                              <ChevronRight className="h-4 w-4" />
                            </div>

                            <div className="absolute left-full top-0 w-56 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                              <div className="py-2">
                                {impactAreas.map((area) => (
                                  <Link
                                    key={area.code}
                                    to={area.href}
                                    onClick={() => window.scrollTo(0, 0)}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onMouseDown={closeDropdowns}
                                  >
                                    <span className="flex items-center space-x-3">
                                      {area.icon && (
                                        <area.icon className="w-5 h-5 flex-shrink-0" />
                                      )}
                                      <span className="flex-1">
                                        {area.name}
                                      </span>
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="relative group">
                            <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                              <span className="font-medium">
                                Featured Projects
                              </span>
                              <ChevronRight className="h-4 w-4" />
                            </div>

                            <div className="absolute left-full top-0 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                              <div className="py-2">
                                {featuredProjects.map((project) => (
                                  <Link
                                    key={project.href}
                                    to={project.href}
                                    onClick={() => window.scrollTo(0, 0)}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onMouseDown={closeDropdowns}
                                  >
                                    <span className="flex items-center space-x-3">
                                      <img
                                        src={project.logo}
                                        alt={`${project.name} logo`}
                                        className="w-5 h-5 object-contain flex-shrink-0"
                                        onError={(e) => {
                                          const target =
                                            e.target as HTMLImageElement;
                                          target.style.display = "none";
                                        }}
                                      />
                                      <span className="flex-1">
                                        {project.name}
                                      </span>
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                // SDGs in Action Dropdown
                if (item.name === "SDGs in Action") {
                  return (
                    <div key={item.name} className="relative dropdown">
                      <button
                        className={`px-1 lg:px-2 py-2 rounded-md text-sm font-medium transition-colors flex items-center whitespace-nowrap ${
                          isActive("/sdg/")
                            ? "bg-blue-100 text-blue-700"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        SDGs in Action
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>

                      <div className="dropdown-menu absolute right-0 lg:left-0 mt-2 w-80 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible transform translate-y-2 transition-all duration-200 z-50 max-h-96 overflow-y-auto">
                        <div className="py-2">
                          <Link
                            to="/sdg/4"
                            onClick={() => window.scrollTo(0, 0)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium"
                            onMouseDown={closeDropdowns}
                          >
                            All SDGs Overview
                          </Link>

                          <div className="border-t border-gray-100 my-2"></div>

                          {allSDGs.map((sdgItem) => (
                            <Link
                              key={sdgItem.code}
                              to={`/sdg/${sdgItem.code}`}
                              onClick={() => window.scrollTo(0, 0)}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onMouseDown={closeDropdowns}
                            >
                              <span className="flex items-center space-x-3">
                                <img
                                  src={`/images/sdgs/E Inverted Icons_WEB-${sdgItem.code
                                    .padStart(2, "0")}.png`}
                                  alt={`SDG ${sdgItem.code}`}
                                  className="w-8 h-5 object-contain flex-shrink-0"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = "none";
                                    const parent = target.parentElement!;
                                    const fallback =
                                      document.createElement("span");
                                    fallback.className =
                                      "inline-block w-8 h-5 rounded text-xs text-white text-center leading-5 bg-blue-600 font-medium flex-shrink-0";
                                    fallback.textContent =
                                      sdgItem.code;
                                    parent.insertBefore(fallback, target);
                                  }}
                                />
                                <span className="flex-1">
                                  {sdgItem.short_name}
                                </span>
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                // Support Us Dropdown
                if (item.name === "Support Us") {
                  return (
                    <div key={item.name} className="relative dropdown">
                      <button
                        className={`px-1 lg:px-2 py-2 rounded-md text-sm font-medium transition-colors flex items-center whitespace-nowrap ${
                          isActive("/support")
                            ? "bg-blue-100 text-blue-700"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        Support Us
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>

                      <div className="dropdown-menu absolute right-0 lg:left-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible transform translate-y-2 transition-all duration-200 z-50">
                        <div className="py-2">
                          <Link
                            to="/needs"
                            onClick={() => window.scrollTo(0, 0)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onMouseDown={closeDropdowns}
                          >
                            Community Needs
                          </Link>
                          <div className="border-t border-gray-100 my-2"></div>
                          <a
                            href="/support#donate"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onMouseDown={closeDropdowns}
                          >
                            Donate to a Cause
                          </a>
                          <a
                            href="/support#volunteer"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onMouseDown={closeDropdowns}
                          >
                            Volunteer as an Individual
                          </a>
                          <a
                            href="/support#sight-group"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onMouseDown={closeDropdowns}
                          >
                            Start a SIGHT Group
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                }



                // About Dropdown
                if (item.name === "About") {
                  return (
                    <div key={item.name} className="relative dropdown">
                      <button
                        className={`px-1 lg:px-2 py-2 rounded-md text-sm font-medium transition-colors flex items-center whitespace-nowrap ${
                          isActive("/about") ||
                          isActive("/volunteers") ||
                          isActive("/partners") ||
                          isActive("/resources")
                            ? "bg-blue-100 text-blue-700"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        About
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>

                      <div className="dropdown-menu absolute right-0 lg:left-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible transform translate-y-2 transition-all duration-200 z-50">
                        <div className="py-2">
                          <Link
                            to="/about"
                            onClick={() => window.scrollTo(0, 0)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onMouseDown={closeDropdowns}
                          >
                            About SIGHT
                          </Link>
                          
                                                     <div className="relative group">
                             <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                               <span>Our Volunteers</span>
                               <ChevronRight className="h-4 w-4" />
                             </div>

                             <div className="absolute right-full top-0 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                              <div className="py-2">
                                {volunteerYears.map((yearItem, index) => (
                                  <div key={yearItem.name}>
                                    <Link
                                      to={yearItem.href}
                                      onClick={() => window.scrollTo(0, 0)}
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                      onMouseDown={closeDropdowns}
                                    >
                                      {yearItem.name}
                                    </Link>
                                    {index === 0 && (
                                      <div className="border-t border-gray-100 my-2"></div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <Link
                            to="/partners"
                            onClick={() => window.scrollTo(0, 0)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onMouseDown={closeDropdowns}
                          >
                            Our Partners
                          </Link>
                          
                                                     <div className="relative group">
                             <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                               <span>IEEE Resources</span>
                               <ChevronRight className="h-4 w-4" />
                             </div>

                             <div className="absolute right-full top-0 w-72 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                              <div className="py-2">
                                {resourceLinks.map((resource) => (
                                  <a
                                    key={resource.name}
                                    href={resource.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onMouseDown={closeDropdowns}
                                  >
                                    <span className="flex items-center justify-between">
                                      <span>{resource.name}</span>
                                      <ExternalLink className="h-3 w-3 text-gray-400" />
                                    </span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                // Simple links (should not reach here with current navigation)
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => window.scrollTo(0, 0)}
                    className={`px-1 lg:px-2 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                      isActive(item.href)
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
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
                        {/* Our Initiatives Content */}
                        {item.name === "Our Initiatives" && (
                          <>
                            <Link
                              to="/initiatives"
                              onClick={() => {
                                setIsMenuOpen(false);
                                window.scrollTo(0, 0);
                              }}
                              className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                            >
                              All Initiatives
                            </Link>

                            <Link
                              to="/"
                              onClick={(e) => {
                                setIsMenuOpen(false);
                                // If we're already on home page, just scroll to impact areas
                                if (window.location.pathname === "/") {
                                  e.preventDefault();
                                  const element =
                                    document.getElementById("impact-areas");
                                  if (element) {
                                    element.scrollIntoView({
                                      behavior: "smooth",
                                      block: "start",
                                    });
                                  }
                                }
                                // If we're on a different page, navigate to home and then scroll
                                else {
                                  window.location.href = "/#impact-areas";
                                }
                              }}
                              className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                            >
                              Impact Areas
                            </Link>

                            <div className="text-xs font-medium text-gray-500 px-3 py-1 mt-2">
                              Featured Projects
                            </div>
                            {featuredProjects.map((project) => (
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
                                  <img
                                    src={project.logo}
                                    alt={`${project.name} logo`}
                                    className="w-5 h-5 object-contain flex-shrink-0"
                                    onError={(e) => {
                                      const target =
                                        e.target as HTMLImageElement;
                                      target.style.display = "none";
                                    }}
                                  />
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
                              .filter((sdg) => ["4", "6", "13"].includes(sdg.code))
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
                                  <span className="flex items-center space-x-2">
                                    <img
                                      src={`/images/sdgs/E Inverted Icons_WEB-${sdgItem.code
                                        .padStart(2, "0")}.png`}
                                      alt={`SDG ${sdgItem.code}`}
                                      className="w-5 h-3 object-contain flex-shrink-0"
                                      onError={(e) => {
                                        const target =
                                          e.target as HTMLImageElement;
                                        target.style.display = "none";
                                        const parent = target.parentElement!;
                                        const fallback =
                                          document.createElement("span");
                                        fallback.className =
                                          "inline-block w-5 h-3 rounded text-xs text-white text-center leading-3 bg-blue-600 flex-shrink-0";
                                        fallback.textContent =
                                          sdgItem.code;
                                        parent.insertBefore(fallback, target);
                                      }}
                                    />
                                    <span className="flex-1 text-xs">
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
                              Community Needs
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
                            
                            {/* Our Volunteers with submenu */}
                            <div className="space-y-1">
                              <button
                                onClick={() => toggleSection("Our Volunteers")}
                                className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                              >
                                <span>Our Volunteers</span>
                                <ChevronDown
                                  className={`h-4 w-4 transition-transform ${
                                    expandedSections.has("Our Volunteers") ? "transform rotate-180" : ""
                                  }`}
                                />
                              </button>
                              
                              {expandedSections.has("Our Volunteers") && (
                                <div className="pl-4 space-y-1">
                                  <Link
                                    to="/volunteers"
                                    onClick={() => {
                                      setIsMenuOpen(false);
                                      window.scrollTo(0, 0);
                                    }}
                                    className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                  >
                                    All Volunteers
                                  </Link>
                                  <div className="text-xs font-medium text-gray-500 px-3 py-1 mt-2">
                                    By Year
                                  </div>
                                  {volunteerYears.slice(1, 4).map((yearItem) => (
                                    <Link
                                      key={yearItem.name}
                                      to={yearItem.href}
                                      onClick={() => {
                                        setIsMenuOpen(false);
                                        window.scrollTo(0, 0);
                                      }}
                                      className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                    >
                                      {yearItem.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                            
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
                            
                            {/* IEEE Resources with submenu */}
                            <div className="space-y-1">
                              <button
                                onClick={() => toggleSection("IEEE Resources")}
                                className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                              >
                                <span>IEEE Resources</span>
                                <ChevronDown
                                  className={`h-4 w-4 transition-transform ${
                                    expandedSections.has("IEEE Resources") ? "transform rotate-180" : ""
                                  }`}
                                />
                              </button>
                              
                              {expandedSections.has("IEEE Resources") && (
                                <div className="pl-4 space-y-1">
                                  <div className="text-xs font-medium text-gray-500 px-3 py-1">
                                    External Links
                                  </div>
                                  {resourceLinks.slice(0, 4).map((resource) => (
                                    <a
                                      key={resource.name}
                                      href={resource.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={() => setIsMenuOpen(false)}
                                      className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                    >
                                      <span className="flex items-center justify-between">
                                        <span className="text-xs">
                                          {resource.name}
                                        </span>
                                        <ExternalLink className="h-3 w-3 text-gray-400" />
                                      </span>
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
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
