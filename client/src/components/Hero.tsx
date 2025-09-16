export default function Hero() {
  const scrollToServices = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openWhatsApp = () => {
    window.open("https://api.whatsapp.com/send?phone=919633836839&text=Hi! I'm interested in booking Heaven of Munroe services", "_blank");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-green-800/70 to-teal-900/80"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
        }}
      ></div>
      
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="animate-fade-in-up">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
            Heaven of Munroe
          </h1>
          <p className="text-lg md:text-xl mb-2 font-medium">
            Room Stay & Food Boating Service
          </p>
          <p className="text-base md:text-lg mb-8 opacity-90">
            Boating in Munroe Island
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-300">
          <button 
            onClick={scrollToServices}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 min-w-[200px]"
            data-testid="button-discover-services"
          >
            <i className="fas fa-compass mr-2"></i>
            Discover More
          </button>
          <button 
            onClick={openWhatsApp}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 min-w-[200px]"
            data-testid="button-book-whatsapp"
          >
            <i className="fab fa-whatsapp mr-2"></i>
            Book Now
          </button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto animate-fade-in-up delay-500">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
            <i className="fas fa-star text-yellow-400 text-2xl mb-2"></i>
            <p className="text-sm font-medium">Trusted Partner</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
            <i className="fas fa-water text-blue-400 text-2xl mb-2"></i>
            <p className="text-sm font-medium">Best Boating Experience</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
            <i className="fas fa-home text-green-400 text-2xl mb-2"></i>
            <p className="text-sm font-medium">Comfortable Stay</p>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <button onClick={scrollToServices} className="hover:text-white transition-colors">
          <i className="fas fa-chevron-down text-2xl"></i>
        </button>
      </div>
    </section>
  );
}
