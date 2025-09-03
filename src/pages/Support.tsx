import { motion } from 'framer-motion';
import { Building, ExternalLink, Heart, Users } from 'lucide-react';
import React, { useEffect } from 'react';

const Support: React.FC = () => {
  useEffect(() => {
    document.title = 'Support Us - IEEE Sri Lanka Section SIGHT';
  }, []);

  const ImageWithFallback: React.FC<{ src: string; alt: string; className: string }> = ({ src, alt, className }) => {
    return (
      <div className={`${className} bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center`}>
        <img
          src={src}
          alt={alt}
          className="rounded-lg shadow-lg w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement!;
            parent.innerHTML = `
              <div class="w-full h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg flex items-center justify-center">
                <div class="text-white text-center p-8">
                  <div class="text-4xl mb-4">🤝</div>
                  <div class="text-lg font-semibold">${alt}</div>
                </div>
              </div>
            `;
          }}
        />
      </div>
    );
  };
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Support Our Mission</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us in leveraging technology for humanitarian impact. There are multiple ways 
            to contribute to our mission of serving underserved communities.
          </p>
        </div>

        {/* Support Options */}
        <div className="space-y-16 mb-16">
          {/* Donate Section */}
          <motion.div
            id="donate"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <div className="flex items-center mb-4">
                <Heart className="h-8 w-8 text-red-500 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Donate to a Cause</h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Your financial support directly funds our humanitarian technology projects. 
                Every contribution helps us reach more communities and create lasting impact 
                through innovative solutions.
              </p>
              <a
                href="mailto:sightsl@ieee.org?subject=Donation Inquiry&body=Hi, I'm interested in donating to support IEEE Sri Lanka Section SIGHT's humanitarian technology initiatives. Please provide information on how I can contribute."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
              >
                Donate Now
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </div>
            <ImageWithFallback
              src="/images/bg5.webp"
              alt="Community impact"
              className="relative"
            />
          </motion.div>

          {/* Volunteer Section */}
          <motion.div
            id="volunteer"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <ImageWithFallback
              src="/images/bg6.webp"
              alt="Volunteers working"
              className="order-2 lg:order-1 relative"
            />
            <div className="order-1 lg:order-2">
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 text-blue-500 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Volunteer as an Individual</h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Join our team of passionate engineers and technologists. Whether you're a student, 
                professional, or retiree, your skills and time can make a meaningful difference 
                in humanitarian technology projects.
              </p>
              <a
                href="mailto:sightsl@ieee.org?subject=Volunteer Interest&body=Hi, I'm interested in volunteering with IEEE Sri Lanka Section SIGHT. Please let me know how I can get involved."
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                <Users className="mr-2 h-5 w-5" />
                Join Our Team
              </a>
            </div>
          </motion.div>

          {/* SIGHT Group Section */}
          <motion.div
            id="sight-group"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <div className="flex items-center mb-4">
                <Building className="h-8 w-8 text-green-500 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Start a SIGHT Group</h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Establish a SIGHT group at your university or organization. We provide guidance, 
                resources, and support to help you create meaningful humanitarian technology 
                projects in your local community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:sightsl@ieee.org?subject=Start SIGHT Group&body=Hi, I'm interested in starting a SIGHT group at my organization. Please provide information on how to get started."
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
                >
                  <Building className="mr-2 h-5 w-5" />
                  Get Started
                </a>
                <a
                  href="https://sight.ieee.org/groups/start-a-sight-group/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-green-100 text-green-700 font-medium rounded-md hover:bg-green-200 transition-colors border border-green-200"
                >
                  Learn More
                  <ExternalLink className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
            <ImageWithFallback
              src="/images/bg7.webp"
              alt="SIGHT group formation"
              className="relative"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Support;