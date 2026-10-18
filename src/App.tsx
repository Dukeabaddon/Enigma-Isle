import Nav from './components/layout/Nav';
import HeroWorkbench from './components/hero/HeroWorkbench';
import AboutSection from './components/about/AboutSection';
import StepCards from './components/journey/StepCards';
import TryAgain from './components/close/TryAgain';
import Footer from './components/layout/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-ink selection:bg-encrypt/20">
      <Nav />
      <main className="flex-1">
        <HeroWorkbench />
        <AboutSection />
        <StepCards />
        <TryAgain />
      </main>
      <Footer />
    </div>
  );
}
