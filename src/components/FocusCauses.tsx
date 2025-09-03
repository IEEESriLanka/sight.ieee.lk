import { motion } from "framer-motion";
import {
  Cog,
  Droplets,
  GraduationCap,
  Handshake,
  Leaf,
  Recycle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cause } from "../types";

// Map icon names to actual icon components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  Droplets,
  Cog,
  Recycle,
  Leaf,
  Handshake,
};

const FocusCauses: React.FC = () => {
  const [causes, setCauses] = useState<Cause[]>([]);

  useEffect(() => {
    const fetchCauses = async () => {
      try {
        const response = await fetch("/data/causes.json");
        const causesData: Cause[] = await response.json();

        // Transform the data to include actual icon components
        const transformedCauses = causesData.map((cause) => ({
          ...cause,
          icon: iconMap[cause.iconName],
        }));

        setCauses(transformedCauses);
      } catch (error) {
        console.error("Error fetching causes data:", error);
      }
    };

    fetchCauses();
  }, []);

  // Show loading state or nothing while data is being fetched
  if (causes.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Impact Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the Sustainable Development Goals where we've been making
              meaningful humanitarian impact through innovative technology
              solutions and community partnerships.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="impact-areas" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Impact Areas
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the key areas where we've been making meaningful
            humanitarian impact through innovative technology solutions and
            community partnerships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {causes.map((cause, index) => (
            <motion.div
              key={cause.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link
                to={`/initiatives?sdg=${cause.id}`}
                className="block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
                onClick={() => window.scrollTo(0, 0)}
              >
                <div
                  className={`${cause.color} ${cause.hoverColor} p-8 text-white transition-colors h-32 flex items-center gap-6`}
                >
                  {cause.icon && (
                    <cause.icon className="h-16 w-16 flex-shrink-0" />
                  )}
                  <h4 className="text-xl font-semibold leading-tight">
                    {cause.title}
                  </h4>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-gray-600 leading-relaxed">
                    {cause.description}
                  </p>
                  <div className="mt-4 text-blue-600 font-medium group-hover:text-blue-700 transition-colors mt-auto">
                    View Related Initiatives →
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FocusCauses;
