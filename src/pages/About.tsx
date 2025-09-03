import { motion } from "framer-motion";
import { ExternalLink, Globe, Target, Users, Zap } from "lucide-react";
import React, { useEffect } from "react";

const About: React.FC = () => {
  useEffect(() => {
    document.title = "About - IEEE Sri Lanka Section SIGHT";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <img
              src="/images/logos/sight-sl-logo.png"
              alt="IEEE Sri Lanka Section SIGHT"
              className="h-16 w-auto"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About IEEE SIGHT
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understanding our mission, history, and commitment to humanitarian
            technology.
          </p>
        </div>

        {/* What is IEEE SIGHT */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-sm p-8 mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Zap className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">
                  What is IEEE SIGHT?
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                IEEE SIGHT (Special Interest Group on Humanitarian Technology)
                is a global network of IEEE volunteers dedicated to applying
                technology for the benefit of humanity. We partner with
                underserved communities to identify their needs and develop
                sustainable technology solutions.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                As part of the IEEE Humanitarian Technologies Board (HTB), SIGHT
                focuses on creating measurable impact through engineering
                innovation, education, and community engagement.
              </p>
              <a
                href="https://sight.ieee.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Learn More About Global IEEE SIGHT
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>
            <div>
              <img
                src="/images/bg2.webp"
                alt="IEEE SIGHT global network"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </motion.section>

        {/* Our Local Mandate */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-sm p-8 mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="/images/bg3.webp"
                alt="Sri Lanka communities"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center mb-4">
                <Target className="h-8 w-8 text-green-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">
                  Our Local Mandate
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                IEEE Sri Lanka Section SIGHT focuses on addressing critical
                challenges facing Sri Lankan communities, particularly in rural
                and underserved areas. Our initiatives target sustainable
                development through technology innovation.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                We work closely with local communities, educational
                institutions, and government agencies to ensure our solutions
                are culturally appropriate, technically sound, and economically
                sustainable.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span>Clean water and sanitation solutions</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span>STEM education and digital literacy</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span>Climate action and sustainability</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* History */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-sm p-8 mb-12"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Globe className="h-8 w-8 text-purple-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Our History</h2>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <p className="text-gray-600 leading-relaxed mb-6">
              The IEEE Humanitarian Technologies Board was established to
              coordinate IEEE's humanitarian activities and ensure that
              technology serves humanity's greatest needs. SIGHT emerged as a
              key initiative to mobilize IEEE's global volunteer network for
              humanitarian impact.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              IEEE Sri Lanka Section SIGHT was formed to address local
              humanitarian challenges through technology innovation. Since our
              inception, we have focused on sustainable development goals that
              align with Sri Lanka's national priorities and community needs.
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Key Milestones
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <span className="font-medium text-gray-900">2024:</span>
                    <span className="text-gray-600 ml-2">
                      Recognized as IEEE SIGHT Group of the Year
                    </span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <span className="font-medium text-gray-900">2022:</span>
                    <span className="text-gray-600 ml-2">
                      Best Affinity Group Project Award, IEEE Sri Lanka Section
                    </span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <span className="font-medium text-gray-900">Ongoing:</span>
                    <span className="text-gray-600 ml-2">
                      Expanding reach across 8+ districts with multiple active
                      projects
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Affiliations */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-sm p-8 mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Affiliations
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We are proud to be part of the global IEEE network, working
              alongside organizations committed to advancing technology for
              humanity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
              <div className="bg-green-50 rounded-lg p-6 mb-4">
                <Target className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900">
                  IEEE Humanitarian Technologies Board
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Operating under the IEEE Humanitarian Technologies Board
                framework.
              </p>
              <a
                href="https://ieeeht.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center mt-2"
              >
                Visit IEEE HTB
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>

            <div className="text-center">
              <div className="bg-blue-50 rounded-lg p-6 mb-4">
                <Globe className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900">
                  IEEE SIGHT Global
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Part of the worldwide IEEE SIGHT network spanning over 100
                countries.
              </p>
              <a
                href="https://sight.ieee.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center mt-2"
              >
                Visit IEEE SIGHT
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>

            <div className="text-center">
              <div className="bg-purple-50 rounded-lg p-6 mb-4">
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900">
                  IEEE Sri Lanka Section
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Proudly representing IEEE's humanitarian mission in Sri Lanka.
              </p>
              <a
                href="https://ieee.lk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center mt-2"
              >
                Visit IEEE Sri Lanka
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
