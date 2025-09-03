import { motion } from "framer-motion";
import { DollarSign, Lightbulb, Mail, MapPin } from "lucide-react";
import React, { useEffect, useState } from "react";
import SDGBadge from "../components/SDGBadge";
import type { Need } from "../types";

const Needs: React.FC = () => {
  const [needs, setNeeds] = useState<Need[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNeeds = async () => {
      try {
        const response = await fetch("/data/needs.json");
        const data = await response.json();
        setNeeds(data);
      } catch (error) {
        console.error("Failed to fetch needs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNeeds();
  }, []);

  useEffect(() => {
    document.title = "Community Needs - IEEE Sri Lanka Section SIGHT";
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Community Needs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Identified social challenges where technology can create meaningful
            impact. These needs represent opportunities for collaboration and
            sustainable development.
          </p>
        </div>

        {/* Needs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {needs.map((need, index) => (
            <motion.div
              key={need.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start space-x-3 mb-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Lightbulb className="h-6 w-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {need.title || "Community Need"}
                  </h3>
                  {need.location?.district && (
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{need.location.district} District</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {need.problem && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Problem
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {need.problem}
                    </p>
                  </div>
                )}

                {need.suggested_solution && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Suggested Solution
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {need.suggested_solution}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex flex-col">
                    {need.estimated_cost_usd && (
                      <div className="flex items-center text-gray-700 mb-2">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span className="font-medium">
                          ${need.estimated_cost_usd.toLocaleString()} USD
                        </span>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-1">
                      {need.sdgs &&
                        need.sdgs.map((sdg) => (
                          <SDGBadge key={sdg} sdg={sdg} size="sm" />
                        ))}
                    </div>
                  </div>
                </div>

                {need.contacts && need.contacts.length > 0 && (
                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Contact
                    </h4>
                    {need.contacts.map((contact, contactIndex) => (
                      <div
                        key={contactIndex}
                        className="flex items-center text-gray-600"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        <span className="mr-2">{contact.name}:</span>
                        <a
                          href={`mailto:${contact.email}`}
                          className="text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          {contact.email}
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {needs.length === 0 && (
          <div className="text-center py-16">
            <Lightbulb className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              No community needs identified at this time.
            </p>
            <p className="text-gray-400 mt-2">
              Check back soon for new opportunities to make an impact.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Needs;
