'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsSection } from '@/components/home/StatsSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { TracksSection } from '@/components/home/TracksSection';
import { CTASection } from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <TracksSection />
      <CTASection />
      <Footer />
    </main>
  );
}
