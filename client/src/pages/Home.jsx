import { Helmet } from 'react-helmet-async';
import { siteData } from '../data/siteData';

// Active Section Imports
import HeroSkillsCombo from '../components/home/HeroSkillsCombo';
import AboutSection from '../components/home/AboutSection';
import CurrentFocusSection from '../components/home/CurrentFocusSection';
import ProcessSection from '../components/home/ProcessSection';
import LabWorkSection from '../components/home/LabWorkSection';
import TechStackSection from '../components/home/TechStackSection';
import ContactSection from '../components/home/ContactSection';

// ── Future sections (uncomment when ready) ──
// import SelectedWorkSection from '../components/home/SelectedWorkSection';
// import TimelineSection from '../components/home/TimelineSection';
// import TestimonialsSection from '../components/home/TestimonialsSection';
// import SocialProofSection from '../components/home/SocialProofSection';
// import FaqSection from '../components/home/FaqSection';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{siteData.name} — {siteData.role}</title>
        <meta name="description" content="Vishal Prajapati — Web Developer, Shopify Developer, and Software Developer building modern, premium digital experiences." />
      </Helmet>
      
      <main className="w-full h-full relative">
        {/* Hero + Skills (scroll-synced combo) */}
        <HeroSkillsCombo />

        {/* About */}
        <AboutSection />

        {/* What I'm Currently Building */}
        <CurrentFocusSection />

        {/* My Working Process */}
        <ProcessSection />

        {/* Practice Builds & Experiments */}
        <LabWorkSection />

        {/* Tech Stack */}
        <TechStackSection />

        {/* Contact Form (fully working) */}
        <ContactSection />

        {/* ── Future sections (enable when you have real data) ── */}
        {/* <SelectedWorkSection /> */}
        {/* <TimelineSection /> */}
        {/* <TestimonialsSection /> */}
        {/* <SocialProofSection /> */}
        {/* <FaqSection /> */}
      </main>
    </>
  );
}
