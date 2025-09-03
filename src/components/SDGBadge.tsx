import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SDGBadgeProps {
  sdg: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const SDGBadge: React.FC<SDGBadgeProps> = ({ sdg, size = 'sm' }) => {
  const navigate = useNavigate();
  
  const sdgInfo: Record<number, { name: string; color: string }> = {
    1: { name: 'No Poverty', color: 'bg-red-600' },
    2: { name: 'Zero Hunger', color: 'bg-yellow-600' },
    3: { name: 'Good Health', color: 'bg-green-600' },
    4: { name: 'Quality Education', color: 'bg-red-700' },
    5: { name: 'Gender Equality', color: 'bg-orange-600' },
    6: { name: 'Clean Water', color: 'bg-blue-500' },
    7: { name: 'Clean Energy', color: 'bg-yellow-500' },
    8: { name: 'Decent Work', color: 'bg-red-800' },
    9: { name: 'Innovation', color: 'bg-orange-700' },
    10: { name: 'Reduced Inequalities', color: 'bg-pink-600' },
    11: { name: 'Sustainable Cities', color: 'bg-yellow-700' },
    12: { name: 'Responsible Consumption', color: 'bg-yellow-800' },
    13: { name: 'Climate Action', color: 'bg-green-700' },
    14: { name: 'Life Below Water', color: 'bg-blue-600' },
    15: { name: 'Life on Land', color: 'bg-green-800' },
    16: { name: 'Peace and Justice', color: 'bg-blue-800' },
    17: { name: 'Partnerships', color: 'bg-blue-900' },
  };

  const info = sdgInfo[sdg];
  if (!info) return null;

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const handleClick = () => {
    navigate(`/sdg/${sdg}`);
  };

  return (
    <div
      className={`${sizeClasses[size]} overflow-hidden cursor-pointer hover:opacity-80 transition-opacity`}
      title={`SDG ${sdg}: ${info.name}`}
      onClick={handleClick}
    >
      <img
        src={`/images/sdgs/E-WEB-Goal-${sdg.toString().padStart(2, '0')}.png`}
        alt={`SDG ${sdg}: ${info.name}`}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          target.parentElement!.innerHTML = `
            <div class="w-full h-full ${info.color} flex items-center justify-center">
              <span class="text-white font-bold text-sm">${sdg}</span>
            </div>
          `;
        }}
      />
    </div>
  );
};

export default SDGBadge;