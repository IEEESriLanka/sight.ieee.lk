import { AnimatePresence, motion } from "framer-motion";
import { DollarSign, MapPin, Target, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { SiteStats } from "../types";

interface HeroProps {
  stats: SiteStats;
}

const Hero: React.FC<HeroProps> = ({ stats }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const backgroundImages = [
    "/images/ieee-sl-outstanding-ag-2025.jpg",
    "/images/sdg-sprints-2025-workshop-6.jpg",
    "/images/bg1.webp",
    "/images/bg2.webp",
    "/images/bg3.webp",
    "/images/bg4.webp",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [backgroundImages.length]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-8">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${backgroundImages[currentSlide]})`,
            }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black bg-opacity-60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex justify-center mb-8">
            <img
              src="/images/logos/sight-sl-logo.png"
              alt="IEEE Sri Lanka Section SIGHT"
              className="h-24 sm:h-32 md:h-40 w-auto"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Leveraging technology for{" "}
            <span className="text-blue-400">serving the underserved</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-5xl mx-auto mb-8 leading-relaxed">
            IEEE Sri Lanka Section SIGHT (Special Interest Group on Humanitarian
            Technology) is part of a global network of engineers and
            technologists partnering with local communities to create
            sustainable humanitarian impact.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-6 max-w-4xl mx-auto px-2 sm:px-4 mb-8"
        >
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-2 sm:p-6 text-center">
            <div className="flex items-center justify-center mb-1 sm:mb-2">
              <Target className="h-3 w-3 sm:h-6 sm:w-6 text-blue-400 mr-1 sm:mr-2" />
              <span className="text-lg sm:text-3xl font-bold text-white">
                {stats.initiatives}+
              </span>
            </div>
            <p className="text-gray-200 text-xs sm:text-sm">
              Initiatives
            </p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-2 sm:p-6 text-center">
            <div className="flex items-center justify-center mb-1 sm:mb-2">
              <Users className="h-3 w-3 sm:h-6 sm:w-6 text-green-400 mr-1 sm:mr-2" />
              <span className="text-lg sm:text-3xl font-bold text-white">
                {formatNumber(stats.lives_impacted)}+
              </span>
            </div>
            <p className="text-gray-200 text-xs sm:text-sm">Lives Impacted</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-2 sm:p-6 text-center">
            <div className="flex items-center justify-center mb-1 sm:mb-2">
              <DollarSign className="h-3 w-3 sm:h-6 sm:w-6 text-yellow-400 mr-1 sm:mr-2" />
              <span className="text-lg sm:text-3xl font-bold text-white">
                ${formatNumber(stats.funds_mobilized_usd)}+
              </span>
            </div>
            <p className="text-gray-200 text-xs sm:text-sm">Funds Mobilized</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-2 sm:p-6 text-center">
            <div className="flex items-center justify-center mb-1 sm:mb-2">
              <MapPin className="h-3 w-3 sm:h-6 sm:w-6 text-red-400 mr-1 sm:mr-2" />
              <span className="text-lg sm:text-3xl font-bold text-white">
                {stats.districts}+
              </span>
            </div>
            <p className="text-gray-200 text-xs sm:text-sm">
              Districts Reached
            </p>
          </div>
        </motion.div>

        {/* Explore Our Work Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center"
        >
          <Link
            to="/initiatives"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Explore Our Work
          </Link>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
              }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
