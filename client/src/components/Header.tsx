import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const openWhatsApp = () => {
    window.open("https://api.whatsapp.com/send?phone=919633836839&text=Hi! I want to book Heaven of Munroe services", "_blank");
  };

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <i className="fas fa-water text-white text-lg"></i>
              </div>
              <div>
                <h1 className="font-serif font-bold text-xl text-gray-800">Heaven of Munroe</h1>
                <p className="text-xs text-gray-500">Munroe Island Boating Partner</p>
              </div>
            </div>
            
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={openWhatsApp}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 font-medium text-sm"
                data-testid="button-whatsapp-header"
              >
                <i className="fab fa-whatsapp mr-1"></i>
                Book Now
              </button>
              {isMobile && (
                <button 
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="text-gray-700 p-2"
                  data-testid="button-mobile-menu"
                >
                  <i className="fas fa-bars text-xl"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <i className="fas fa-water text-white"></i>
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-lg">Heaven of Munroe</h2>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
              
              <nav className="space-y-4">
                <button
                  onClick={openWhatsApp}
                  className="block w-full text-left px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all font-medium"
                  data-testid="mobile-nav-whatsapp"
                >
                  <i className="fab fa-whatsapp mr-3"></i>
                  Book on WhatsApp
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
