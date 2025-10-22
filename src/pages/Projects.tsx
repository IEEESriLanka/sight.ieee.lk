import { motion } from "framer-motion";
import { Calendar, Target } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InitiativeCard from "../components/InitiativeCard";
import SDGBadge from "../components/SDGBadge";
import type { Initiative, Project } from "../types";

const Projects: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedInitiatives, setRelatedInitiatives] = useState<Initiative[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const [projectsResponse, initiativesResponse] = await Promise.all([
          fetch("/data/projects.json"),
          fetch("/data/initiatives.json"),
        ]);

        const projectsData = await projectsResponse.json();
        const initiativesData = await initiativesResponse.json();

        const foundProject = projectsData.find(
          (proj: Project) => proj.slug === slug
        );

        if (foundProject) {
          setProject(foundProject);

          // Get related initiatives by filtering initiatives.json where project matches project id
          const related: Initiative[] = initiativesData
            .filter((init: Initiative) => init.project === foundProject.id)
            .sort(
              (a: Initiative, b: Initiative) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            );

          setRelatedInitiatives(related);
        }
      } catch (error) {
        console.error("Failed to fetch project data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProjectData();
    }
  }, [slug]);

  useEffect(() => {
    if (project) {
      document.title = `${project.name} - IEEE Sri Lanka Section SIGHT`;
    }
  }, [project]);

  const formatStartDate = (dateString: string) => {
    const [year, month] = dateString.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const getSectionTitle = () => {
    return "Related Initiatives";
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

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Project Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The project you're looking for doesn't exist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-8"
          style={{
            backgroundImage: `url(${project.cover_image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center p-2 shadow-lg">
                  <img
                    src={project.logo}
                    alt={`${project.name} logo`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      target.parentElement!.innerHTML = `
                        <div class="w-full h-full bg-blue-600 rounded-lg flex items-center justify-center">
                          <span class="text-white font-bold text-lg">${project.name.charAt(
                            0
                          )}</span>
                        </div>
                      `;
                    }}
                  />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {project.name}
              </h1>
              <p className="text-xl text-gray-200">{project.subtitle}</p>
            </div>
          </div>
        </motion.div>

        {/* Project Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                About the Project
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {project.description}
              </p>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Project Logo (Large) */}
            <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-center">
              <img
                src={project.logo}
                alt={`${project.name} logo`}
                className="h-28 md:h-36 lg:h-40 w-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-gray-600" />
                Timeline
              </h4>
              <p className="text-gray-600">
                <span className="block font-medium">Started:</span>
                <span className="block">
                  {formatStartDate(project.started)} - Present
                </span>
              </p>
            </div>

            {/* Related SDGs */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Target className="h-5 w-5 mr-2 text-gray-600" />
                Related SDGs
              </h4>
              <div className="grid grid-cols-3 gap-1">
                {project.sdgs.map((sdg) => (
                  <SDGBadge key={sdg} sdg={sdg} size="xl" />
                ))}
              </div>
            </div>
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
                {`Explore the specific implementations and initiatives under the ${project.name} project`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedInitiatives.map((initiative, index) => (
                <motion.div
                  key={initiative.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  <InitiativeCard initiative={initiative} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {loading && (
          <div className="animate-pulse mb-16">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-96"></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
