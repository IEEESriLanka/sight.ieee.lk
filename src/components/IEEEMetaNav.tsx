import React from 'react';

const IEEEMetaNav: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-[40px] flex items-center justify-between px-4 sm:px-6 lg:px-8">
      {/* Left side - IEEE.org links */}
      <div className="hidden sm:flex items-center space-x-4 text-sm">
        <a 
          href="https://www.ieee.org/index.html" 
          className="text-white hover:underline transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          IEEE.org
        </a>
        <span className="text-white">|</span>
        <a 
          href="https://www.ieeexplore.ieee.org/Xplore/guesthome.jsp" 
          className="text-white hover:underline transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          IEEE <em>Xplore</em> Digital Library
        </a>
        <span className="text-white">|</span>
        <a 
          href="https://standards.ieee.org/" 
          className="text-white hover:underline transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          IEEE Standards
        </a>
        <span className="text-white">|</span>
        <a 
          href="https://spectrum.ieee.org/" 
          className="text-white hover:underline transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          IEEE Spectrum
        </a>
        <span className="text-white">|</span>
        <a 
          href="https://www.ieee.org/sitemap.html" 
          className="text-white hover:underline transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          More Sites
        </a>
      </div>

      {/* Mobile view - simplified links */}
      <div className="sm:hidden flex items-center space-x-2 text-xs">
        <a 
          href="https://www.ieee.org/index.html" 
          className="text-white hover:underline transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          IEEE.org
        </a>
        <span className="text-white">|</span>
        <a 
          href="https://www.ieee.org/sitemap.html" 
          className="text-white hover:underline transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          More Sites
        </a>
      </div>

             {/* Right side - Join IEEE and IEEE Master Brand */}
       <div className="flex items-center space-x-4">
         {/* Join IEEE link */}
         <a 
           href="https://www.ieee.org/join" 
           className="text-white hover:underline transition-colors text-sm whitespace-nowrap"
           target="_blank"
           rel="noopener noreferrer"
         >
           Join IEEE
         </a>
         
         {/* IEEE Master Brand Logo */}
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
    </div>
  );
};

export default IEEEMetaNav;
