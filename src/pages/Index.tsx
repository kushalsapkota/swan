import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import ImpactDashboard from '@/components/home/ImpactDashboard';
import ImpactAreasGrid from '@/components/home/ImpactAreasGrid';
import StorytellerSection from '@/components/home/StorytellerSection';
import ProgramPreview from '@/components/home/ProgramPreview';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ImpactDashboard />
        <ImpactAreasGrid />
        <StorytellerSection />
        <ProgramPreview />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
