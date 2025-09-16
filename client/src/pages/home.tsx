import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import PhotoGallery from "../components/PhotoGallery";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <Services />
      <PhotoGallery />
      <ContactSection />
      <Footer />
    </div>
  );
}
