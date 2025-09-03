import { motion } from "framer-motion";
import { Award, ExternalLink, Trophy } from "lucide-react";
import React, { useEffect, useState } from "react";
import type { Award as AwardType } from "../types";

const ImpactRecognition: React.FC = () => {
  const [awards, setAwards] = useState<AwardType[]>([]);

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

  return (
    <section className="py-16 bg-white">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {awards.map((award, index) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`${award.bgColor} rounded-xl p-8 border border-gray-100`}
            >
              <div className="flex flex-col space-y-4">
                <div className="flex items-start space-x-4">
                  <div
                    className={`${award.color} p-3 rounded-lg bg-white shadow-sm`}
                  >
                    {React.createElement(
                      iconMap[award.icon as keyof typeof iconMap],
                      { className: "h-8 w-8" }
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {award.title}
                    </h3>
                    <p className="text-sm font-medium text-gray-700 mb-3">
                      {award.organization}
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {award.description}
                    </p>
                    {award.link !== "#" && (
                      <a
                        href={award.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                      >
                        Read More
                        <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
                {award.image && (
                  <div
                    className={`w-full h-48 overflow-hidden rounded-lg ${award.bgColor}`}
                  >
                    <img
                      src={award.image}
                      alt={`${award.title} certificate`}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const parent = target.parentElement!;
                        parent.className = parent.className.replace(
                          "overflow-hidden",
                          ""
                        );
                        parent.innerHTML = `
                          <div class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <div class="text-gray-400 text-center p-4">
                              <div class="text-lg font-medium mb-1">Certificate</div>
                              <div class="text-sm">${award.title}</div>
                            </div>
                          </div>
                        `;
                      }}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactRecognition;
