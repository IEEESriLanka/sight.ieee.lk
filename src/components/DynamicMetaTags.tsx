import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { Initiative } from '../types';

interface DynamicMetaTagsProps {
  initiative?: Initiative | null;
  defaultTitle?: string;
  defaultDescription?: string;
  defaultImage?: string;
}

const DynamicMetaTags: React.FC<DynamicMetaTagsProps> = ({
  initiative,
  defaultTitle = 'IEEE Sri Lanka Section SIGHT',
  defaultDescription = 'Leveraging technology for serving the underserved. IEEE Sri Lanka Section SIGHT creates sustainable humanitarian impact through innovative technology solutions.',
  defaultImage = 'https://sight.ieee.lk/images/logos/sight-sl-logo.png'
}) => {
  const location = useLocation();

  useEffect(() => {
    // Update document title
    const title = initiative?.title ? `${initiative.title} - IEEE Sri Lanka Section SIGHT` : defaultTitle;
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`) || 
                    document.querySelector(`meta[name="${property}"]`);
      
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute(
          property.startsWith('og:') ? 'property' : 'name', 
          property
        );
        document.head.appendChild(metaTag);
      }
      
      metaTag.setAttribute('content', content);
    };

    // Get image - handle both string and array formats
    let imageUrl = defaultImage;
    if (initiative?.image) {
      if (Array.isArray(initiative.image) && initiative.image.length > 0) {
        imageUrl = initiative.image[0].startsWith('http') ? 
                  initiative.image[0] : 
                  `https://sight.ieee.lk${initiative.image[0]}`;
      } else if (typeof initiative.image === 'string') {
        imageUrl = initiative.image.startsWith('http') ? 
                  initiative.image : 
                  `https://sight.ieee.lk${initiative.image}`;
      }
    }

    // Get description - use content or default
    const description = initiative?.content ? 
      initiative.content.substring(0, 160) + '...' : 
      defaultDescription;

    // Get date
    const date = initiative?.date || new Date().toISOString().split('T')[0];

    // Update all meta tags
    updateMetaTag('description', description);
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', imageUrl);
    updateMetaTag('og:url', `https://sight.ieee.lk${location.pathname}`);
    updateMetaTag('og:type', 'website');
    updateMetaTag('og:site_name', 'IEEE Sri Lanka Section SIGHT');
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', imageUrl);

    // Add article-specific tags for initiatives
    if (initiative) {
      updateMetaTag('article:published_time', new Date(date).toISOString());
      if (initiative.related_sdgs && initiative.related_sdgs.length > 0) {
        updateMetaTag('article:tag', initiative.related_sdgs.join(','));
      }
    }

  }, [initiative, location.pathname, defaultTitle, defaultDescription, defaultImage]);

  return null;
};

export default DynamicMetaTags;