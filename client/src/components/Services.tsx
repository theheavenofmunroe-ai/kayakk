import { useLocation } from "wouter";

export default function Services() {
  const [, setLocation] = useLocation();

  const openDirectBooking = (serviceId: string) => {
    setLocation(`/inquiry?package=${serviceId}`);
  };

  const services = [
    {
      id: "canal-boating",
      title: "Canal Boating",
      description: "Navigate through pristine canals and discover hidden lagoons. Perfect for all skill levels with professional guides.",
      price: "₹500/hour",
      icon: "fas fa-water",
      whatsapp: "https://api.whatsapp.com/send?phone=919633836839&text=Hi! I want to book Canal Boating service",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "mini-houseboat",
      title: "Mini House Boat (Shikkar Boat)",
      description: "Traditional Kerala boat experience with authentic architecture and stunning sunset views.",
      price: "₹1,200/day",
      icon: "fas fa-ship",
      whatsapp: "https://api.whatsapp.com/send?phone=919633836839&text=Hi! I want to book Mini House Boat service",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "homestay-rooms",
      title: "Home Stay Rooms",
      description: "Experience authentic Kerala hospitality in our traditional homes with modern amenities and local cuisine.",
      price: "₹800/night",
      icon: "fas fa-home",
      whatsapp: "https://api.whatsapp.com/send?phone=919633836839&text=Hi! I want to book Home Stay Rooms",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "lake-foods",
      title: "Lake Foods",
      description: "Authentic Kerala cuisine with fresh seafood and traditional recipes. Home-cooked meals with local ingredients.",
      price: "₹250/meal",
      icon: "fas fa-utensils",
      whatsapp: "https://api.whatsapp.com/send?phone=919633836839&text=Hi! I want to book Lake Foods service",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section id="services" className="py-16 bg-gradient-to-b from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Munroe Island Boating Packages
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the beauty of Munroe Island with our authentic services
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 transform hover-lift animate-fade-in-up group animate-zoom-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden">
                <div 
                  className="h-48 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${service.image})`,
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center">
                  <i className={`${service.icon} text-blue-600 text-xl`}></i>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="flex flex-col space-y-3">
                  <div className="text-2xl font-bold text-green-600 text-center">
                    {service.price}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => openDirectBooking(service.id)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:-translate-y-1 active:scale-95"
                      data-testid={`button-book-direct-${service.id}`}
                    >
                      <i className="fas fa-calendar-plus mr-2"></i>
                      Book Direct
                    </button>
                    <button 
                      onClick={() => window.open(service.whatsapp, '_blank')}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:-translate-y-1 active:scale-95"
                      data-testid={`button-whatsapp-${service.id}`}
                    >
                      <i className="fab fa-whatsapp mr-2"></i>
                      WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Need help choosing the right package for you?</p>
          <button 
            onClick={() => window.open("https://api.whatsapp.com/send?phone=919633836839&text=Hi! I need help choosing the right package", '_blank')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            data-testid="button-get-help"
          >
            <i className="fas fa-comments mr-2"></i>
            Get Help Choosing
          </button>
        </div>
      </div>
    </section>
  );
}
