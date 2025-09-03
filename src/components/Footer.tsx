import { ExternalLink, Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import React from "react";

const Footer: React.FC = () => {
  return (
    <>
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src="/images/logos/sight-sl-logo.png"
                  alt="IEEE Sri Lanka Section SIGHT"
                  className="h-10 w-auto"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-white text-lg">
                    IEEE Sri Lanka Section
                  </span>
                  <span className="font-bold text-sm text-gray-300">
                    Special Interest Group on Humanitarian Technology (SIGHT)
                  </span>
                </div>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                Leveraging technology for serving the underserved. Part of the
                global IEEE SIGHT network, partnering with local communities to
                create sustainable impact.
              </p>

            </div>

            <div className="col-span-1">
              <h3 className="font-semibold text-white mb-4">Connect With Us</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <a
                      href="https://www.facebook.com/IEEESLSIGHT"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2"
                    >
                      <Facebook className="h-5 w-5" />
                      <span>Facebook</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <a
                      href="https://www.instagram.com/ieeeslsight"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2"
                    >
                      <Instagram className="h-5 w-5" />
                      <span>Instagram</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <a
                      href="https://www.linkedin.com/company/ieee-sight-sri-lanka/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span>LinkedIn</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <a
                      href="mailto:sightsl@ieee.org"
                      className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2"
                    >
                      <Mail className="h-5 w-5" />
                      <span>sightsl@ieee.org</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* IEEE Footer */}
      <div className="bg-gray-800 text-gray-300 border-t-3 border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-xs">
            <div className="mb-4">
              <a href="/" className="hover:text-white transition-colors">Home</a>
              {' '}&#160;|&#160;{' '}
              <a href="https://www.ieee.org/sitemap.html" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Sitemap</a>
              {' '}&#160;|&#160;{' '}
              <a href="mailto:sightsl@ieee.org" className="hover:text-white transition-colors">Contact</a>
              {' '}&#160;|&#160;{' '}
              <a href="https://www.ieee.org/accessibility_statement.html" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Accessibility</a>
              {' '}&#160;|&#160;{' '}
              <a href="https://www.ieee.org/nondiscrimination" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Nondiscrimination Policy</a>
              {' '}&#160;|&#160;{' '}
              <a href="http://www.ieee-ethics-reporting.org/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">IEEE Ethics Reporting</a>
              {' '}&#160;|&#160;{' '}
              <a href="https://privacy.ieee.org/policies" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">IEEE Privacy Policy</a>
              {' '}&#160;|&#160;{' '}
              <a href="https://www.ieee.org/site_terms_conditions.html" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Terms & Disclosures</a>
            </div>
            <div className="text-gray-400">
              <p>&copy; Copyright 2025 IEEE - All rights reserved. A public charity, IEEE is the world's largest technical professional organization dedicated to advancing technology for the benefit of humanity.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
