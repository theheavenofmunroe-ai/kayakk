import Header from "../components/Header";
import Hero from "../components/Hero";
import AboutEvan from "../components/AboutEvan";
import Services from "../components/Services";
import BoatingPackages from "../components/BoatingPackages";
import Testimonials from "../components/Testimonials";
import PhotoGallery from "../components/PhotoGallery";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import BottomNavigation from "../components/BottomNavigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <AboutEvan />
      <Services />
      <BoatingPackages />
      <Testimonials />
      <PhotoGallery />
      <ContactSection />
      <Footer />
      <BottomNavigation />
    </div>
  );
}
