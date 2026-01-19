import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, Trophy, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import type { Award as AwardType } from "../types";

const ImpactRecognition: React.FC = () => {
  const [awards, setAwards] = useState<AwardType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Icon mapping from string to component
  const iconMap = {
    Trophy,
    Award,
  };

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = await fetch("/data/awards.json");
        const data = await response.json();
        setAwards(data);
      } catch (error) {
        console.error("Failed to fetch awards:", error);
      }
    };

    fetchAwards();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxStartIndex = Math.max(0, awards.length - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxStartIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const visibleAwards = awards.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Impact Recognized
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our commitment to humanitarian technology has been acknowledged by
            both global and local communities through various recognition
            programs.
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          {awards.length > itemsPerPage && (
            <>
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className={`absolute left-0 top-1/2 -translate-y-1/2 -ml-4 lg:-ml-12 z-10 bg-white p-2 rounded-full shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentIndex === 0
                  ? "opacity-50 cursor-not-allowed text-gray-400"
                  : "hover:bg-gray-50 text-gray-600"
                  }`}
                aria-label="Previous awards"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentIndex >= maxStartIndex}
                className={`absolute right-0 top-1/2 -translate-y-1/2 -mr-4 lg:-mr-12 z-10 bg-white p-2 rounded-full shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentIndex >= maxStartIndex
                  ? "opacity-50 cursor-not-allowed text-gray-400"
                  : "hover:bg-gray-50 text-gray-600"
                  }`}
                aria-label="Next awards"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[450px]">
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleAwards.map((award) => (
                <motion.div
                  key={award.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`${award.bgColor} rounded-xl p-8 border border-gray-100 h-full flex flex-col`}
                >

                  <div className="flex flex-col space-y-4 flex-grow">
                    {/* Header: icon + title placed side-by-side */}
                    <div className="flex items-start space-x-4">
                      <div
                        className={`${award.color} p-3 rounded-lg bg-white shadow-sm shrink-0`}
                      >
                        {React.createElement(
                          iconMap[award.icon as keyof typeof iconMap] || Trophy,
                          { className: "h-8 w-8" }
                        )}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg md:text-xl font-bold leading-snug text-gray-900 mb-1">
                          {award.title}
                        </h3>
                        <p className="text-sm font-medium text-gray-700">
                          {award.organization}
                        </p>
                      </div>
                    </div>

                    {/* Full-width description and link */}
                    <div className="flex-grow">
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {award.description}
                      </p>
                    </div>
                    {award.image && (
                      <div
                        className={`w-full h-48 overflow-hidden rounded-lg ${award.bgColor} mt-auto`}
                      >
                        <img
                          src={award.image}
                          alt={`${award.title} certificate`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            // Optionally show placeholder only if essential, or just hide
                            const parent = target.parentElement!;
                            parent.innerHTML = `
                              <div class="w-full h-full flex items-center justify-center bg-gray-200 bg-opacity-50">
                                <span class="text-gray-400 text-sm">Image not available</span>
                              </div>
                            `;
                          }}
                        />
                      </div>
                    )}

                    <div className="mt-4 pt-2 border-t border-gray-100 border-opacity-50">
                      {award.link && award.link !== "#" ? (
                        <a
                          href={award.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                        >
                          Read More
                          <ExternalLink className="ml-1 h-4 w-4" />
                        </a>
                      ) : (
                        <span className="inline-flex items-center text-gray-400 font-medium cursor-not-allowed">
                          Read More
                          <ExternalLink className="ml-1 h-4 w-4" />
                        </span>
                      )}
                    </div>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>


        </div>
      </div>
    </section>
  );
};

export default ImpactRecognition;
