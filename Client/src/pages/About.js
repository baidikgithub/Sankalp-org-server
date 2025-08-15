import React from 'react';
import HeroSection from '../components/AboutHeroSection';
import MissionVisionSection from '../components/AboutMissionVisionSection';
import ImpactStats from '../components/ImpactStats';
import FocusAreas from '../components/FocusAreas';
import LeadershipTeam from '../components/LeadershipTeam';
import CommunitySection from '../components/AboutCommunitySection';

import {
  organizationStats,
  missionVision,
  focusAreas,
  leadership,
} from '../constants/about';

import heroImage from '../assets/about/about1.jpg';
import communityImage from '../assets/about/about6.jpeg';

const About = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>
      <HeroSection sectionVariants={sectionVariants} heroImage={heroImage} />
      <MissionVisionSection sectionVariants={sectionVariants} missionVision={missionVision} />
      <ImpactStats organizationStats={organizationStats} />
      <FocusAreas sectionVariants={sectionVariants} focusAreas={focusAreas} />
      <LeadershipTeam sectionVariants={sectionVariants} leadership={leadership} />
      <CommunitySection sectionVariants={sectionVariants} communityImage={communityImage} />
    </div>
  );
};

export default About;
