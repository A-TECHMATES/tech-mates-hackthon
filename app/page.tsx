import ParticlesBackground from '@/components/ParticlesBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import Build from '@/components/Build';
import Architects from '@/components/Architects';
import Register from '@/components/Register';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-on-surface">
      <ParticlesBackground />
      <div className="relative z-10 noise-overlay">
        <Navbar />
        <Hero />
        <Mission />
        <Build />
        <Architects />
        <Register />
        <Footer />
      </div>
    </main>
  );
}
