import { useState } from "react";

export default function PhotoGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      alt: "Canal boating experience",
      fullSrc: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      alt: "Mini house boat shikkar boat",
      fullSrc: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      alt: "Home stay rooms",
      fullSrc: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      src: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      alt: "Lake foods",
      fullSrc: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      alt: "Munroe Island boating",
      fullSrc: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      alt: "Backwater experience",
      fullSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    }
  ];

  const openLightbox = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage("");
  };

  return (
    <section id="gallery" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Gallery
          </h2>
          <p className="text-lg text-gray-600">
            Discover Munroe Island through beautiful moments
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              className="aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer group"
              onClick={() => openLightbox(image.fullSrc)}
              data-testid={`gallery-image-${index}`}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button 
            onClick={() => window.open("https://api.whatsapp.com/send?phone=919633836839&text=Hi! I'd like to see more photos of Heaven of Munroe", '_blank')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            data-testid="button-view-full-gallery"
          >
            <i className="fas fa-images mr-2"></i>
            View All Gallery
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full">
            <img 
              src={selectedImage} 
              alt="Gallery image" 
              className="max-w-full max-h-full object-contain"
            />
            <button 
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors"
              onClick={closeLightbox}
              data-testid="button-close-lightbox"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
