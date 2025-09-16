import { useState } from "react";

export default function BottomNavigation() {
  const [activeSection, setActiveSection] = useState<string>("");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  const openWhatsApp = () => {
    window.open("https://api.whatsapp.com/send?phone=919633836839&text=Hi! I want to book Heaven of Munroe services", "_blank");
  };

  const navItems = [
    {
      id: "services",
      label: "Services",
      icon: "fas fa-ship",
      action: () => scrollToSection("services")
    },
    {
      id: "packages",
      label: "Packages",
      icon: "fas fa-box",
      action: () => scrollToSection("packages")
    },
    {
      id: "gallery",
      label: "Gallery",
      icon: "fas fa-images",
      action: () => scrollToSection("gallery")
    },
    {
      id: "contact",
      label: "Contact",
      icon: "fas fa-map-marker-alt",
      action: () => scrollToSection("contact")
    },
    {
      id: "book",
      label: "Book Now",
      icon: "fab fa-whatsapp",
      action: openWhatsApp,
      special: true
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={item.action}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300 min-w-[60px] ${
                item.special
                  ? "bg-green-600 hover:bg-green-700 text-white transform hover:scale-110 hover:-translate-y-1 animate-pulse-slow"
                  : activeSection === item.id
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
              data-testid={`bottom-nav-${item.id}`}
            >
              <i className={`${item.icon} text-lg mb-1 ${item.special ? 'animate-bounce-gentle' : ''}`}></i>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}