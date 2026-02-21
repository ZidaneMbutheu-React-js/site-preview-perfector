import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ParallaxSection from "@/components/ParallaxSection";
import SectionDivider from "@/components/SectionDivider";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <SectionDivider />
        <ParallaxSection offset={30}>
          <AboutSection />
        </ParallaxSection>
        <SectionDivider />
        <ParallaxSection offset={25}>
          <SkillsSection />
        </ParallaxSection>
        <SectionDivider />
        <ParallaxSection offset={35}>
          <ProjectsSection />
        </ParallaxSection>
        <SectionDivider />
        <ParallaxSection offset={20}>
          <TestimonialsSection />
        </ParallaxSection>
        <SectionDivider />
        <ParallaxSection offset={25}>
          <ContactSection />
        </ParallaxSection>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
