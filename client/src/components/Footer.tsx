export default function Footer() {
  const socialLinks = [
    { icon: "fab fa-facebook-f", color: "primary", href: "#" },
    { icon: "fab fa-instagram", color: "secondary", href: "#" },
    { icon: "fab fa-whatsapp", color: "accent", href: "#" },
    { icon: "fab fa-youtube", color: "primary", href: "#" }
  ];

  const essentialLinks = [
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "About Us", href: "#about-us" },
    { label: "Contact", href: "#contact" }
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <i className="fas fa-mountain text-primary-foreground text-xl"></i>
              </div>
              <div>
                <h4 className="font-serif font-bold text-2xl">Heaven of Munroe</h4>
                <p className="text-sm opacity-70">Authentic Kerala Backwater Experience</p>
              </div>
            </div>
            
            <p className="text-background/70 mb-6 leading-relaxed">
              Experience authentic Kerala backwaters at Munroe Island.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className={`w-10 h-10 bg-${link.color} rounded-lg flex items-center justify-center hover:bg-${link.color}/80 transition-colors`}
                  data-testid={`social-link-${index}`}
                >
                  <i className={`${link.icon} text-${link.color}-foreground`}></i>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h5 className="font-semibold text-lg mb-4">Essential Links</h5>
            <ul className="space-y-2">
              {essentialLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection(link.href)}
                    className="text-background/70 hover:text-background transition-colors text-left"
                    data-testid={`essential-link-${index}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-background/20 mt-8 pt-6 text-center">
          <p className="text-background/60 text-sm">
            © 2024 Heaven of Munroe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
