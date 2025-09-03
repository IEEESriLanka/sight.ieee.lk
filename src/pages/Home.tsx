import React, { useEffect, useState } from 'react';
import FeaturedInitiatives from '../components/FeaturedInitiatives';
import FeaturedProjects from '../components/FeaturedProjects';
import FocusCauses from '../components/FocusCauses';
import Hero from '../components/Hero';
import ImpactRecognition from '../components/ImpactRecognition';
import type { SiteStats } from '../types';

const Home: React.FC = () => {
  const [stats, setStats] = useState<SiteStats>({
    initiatives: 0,
    lives_impacted: 0,
    funds_mobilized_usd: 0,
    districts: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/data/site-stats.json');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch site stats:', error);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    document.title = 'IEEE Sri Lanka Section SIGHT - Humanitarian Technology';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Leveraging technology for serving the underserved. IEEE Sri Lanka Section SIGHT creates sustainable humanitarian impact through innovative technology solutions.');
    }
  }, []);

  return (
    <div>
      <Hero stats={stats} />
      <FocusCauses />
      <ImpactRecognition />
      <FeaturedProjects />
      <FeaturedInitiatives />
    </div>
  );
};

export default Home;