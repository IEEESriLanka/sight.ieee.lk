import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import type { Initiative } from '../types';
import SDGBadge from './SDGBadge';

interface InitiativeCardProps {
  initiative: Initiative;
}

const InitiativeCard: React.FC<InitiativeCardProps> = ({ initiative }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getSDGs = () => {
    return initiative.related_sdgs || [];
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg shadow-md overflow-hidden group h-full flex flex-col"
    >
      <Link 
        to={`/initiatives/${initiative.slug}`} 
        className="block"
        onClick={() => window.scrollTo(0, 0)}
      >
        <div className="relative h-48 overflow-hidden">
          {(() => {
            const images = Array.isArray(initiative.image) ? initiative.image : (initiative.image ? [initiative.image] : []);
            return images[0] ? (
              <img
                src={images[0]}
                alt={initiative.title}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                             onError={(e) => {
                 const target = e.target as HTMLImageElement;
                 target.style.display = 'none';
                 const parent = target.parentElement!;
                 parent.className = parent.className.replace('overflow-hidden', '');
                 
                 // Create fallback div without replacing the entire innerHTML
                 const fallbackDiv = document.createElement('div');
                 fallbackDiv.className = 'w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center absolute inset-0';
                 fallbackDiv.innerHTML = `
                   <div class="text-white text-center p-4">
                     <div class="text-2xl font-bold mb-2">${initiative.type.charAt(0).toUpperCase()}</div>
                     <div class="text-sm opacity-90">${initiative.type.charAt(0).toUpperCase() + initiative.type.slice(1)}</div>
                   </div>
                 `;
                 
                 // Insert fallback as first child to keep SDGs visible
                 parent.insertBefore(fallbackDiv, parent.firstChild);
               }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <div className="text-white text-center p-4">
                <div className="text-2xl font-bold mb-2">{initiative.type.charAt(0).toUpperCase()}</div>
                <div className="text-sm opacity-90">{initiative.type.charAt(0).toUpperCase() + initiative.type.slice(1)}</div>
              </div>
            </div>
          );
          })()}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              initiative.type === 'project' ? 'bg-blue-100 text-blue-800' :
              initiative.type === 'event' ? 'bg-green-100 text-green-800' :
              'bg-purple-100 text-purple-800'
            }`}>
              {initiative.type.charAt(0).toUpperCase() + initiative.type.slice(1)}
            </span>
          </div>
          
                     {/* SDGs - bottom right */}
           {getSDGs().length > 0 && (
             <div className="absolute bottom-3 right-3 flex gap-1 justify-end z-10">
               {getSDGs().slice(0, 3).map((sdg) => (
                 <SDGBadge key={sdg} sdg={sdg} size="md" />
               ))}
               {getSDGs().length > 3 && (
                 <div className="w-12 h-12 bg-black bg-opacity-70 flex items-center justify-center rounded">
                   <span className="text-white text-xs font-bold">
                     +{getSDGs().length - 3}
                   </span>
                 </div>
               )}
             </div>
           )}
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {initiative.title}
          </h3>
          
          <div className="flex items-center text-gray-600 text-sm mb-3">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formatDate(initiative.date)}</span>
          </div>



          {initiative.content && (
            <p className="text-gray-600 text-sm line-clamp-3 mt-auto">
              {initiative.content}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default InitiativeCard;