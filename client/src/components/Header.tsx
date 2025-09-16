import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "wouter";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setLocation] = useLocation();
  const isMobile = useIsMobile();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const openInquiryForm = () => {
    setLocation("/inquiry");
  };

  const navigateToHome = () => {
    setLocation("/");
  };

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button 
              onClick={navigateToHome}
              className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 transform hover:scale-105"
              data-testid="button-logo-home"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <i className="fas fa-water text-white text-lg"></i>
              </div>
              <div>
                <h1 className="font-serif font-bold text-xl text-gray-800">Heaven of Munroe</h1>
                <p className="text-xs text-gray-500">Munroe Island Boating Partner</p>
              </div>
            </button>
            
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={openInquiryForm}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 font-medium text-sm"
                data-testid="button-inquiry-header"
              >
                <i className="fas fa-calendar-plus mr-1"></i>
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
                <button 
                  onClick={() => {
                    navigateToHome();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300"
                  data-testid="button-mobile-logo-home"
                >
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <i className="fas fa-water text-white"></i>
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-lg">Heaven of Munroe</h2>
                  </div>
                </button>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
              
              <nav className="space-y-4">
                <button
                  onClick={openInquiryForm}
                  className="block w-full text-left px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all font-medium"
                  data-testid="mobile-nav-inquiry"
                >
                  <i className="fas fa-calendar-plus mr-3"></i>
                  Make Inquiry
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
