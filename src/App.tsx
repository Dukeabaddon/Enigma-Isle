import Nav from './components/layout/Nav';
import HeroWorkbench from './components/hero/HeroWorkbench';
import AboutSection from './components/about/AboutSection';
import StepCards from './components/journey/StepCards';
import TryAgain from './components/close/TryAgain';
import Footer from './components/layout/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-[#342319] text-ink selection:bg-encrypt/20">
      <Nav />
      <main className="flex-1 overflow-x-hidden">
        <HeroWorkbench />
        <AboutSection />
        <StepCards />
        {/* One cream plate — kills brown hairline between TryAgain ↔ footer island */}
        <div className="bg-[#eaddbf]">
          <TryAgain />
          <Footer />
        </div>
      </main>
    </div>
  );
}
