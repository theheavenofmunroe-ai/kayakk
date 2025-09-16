import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Images, ChevronUp, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@shared/schema";

export default function PhotoGallery() {
  const [showAllImages, setShowAllImages] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<GalleryImage[]>([]);

  const { data: galleryImages = [], isLoading, isError } = useQuery<GalleryImage[]>({
    queryKey: ['/api/gallery-images'],
  });

  // If no images in database, show default images as fallback
  const defaultImages = [
    {
      id: "default-1",
      title: "Canal boating experience",
      description: "Peaceful canal boating through Kerala backwaters",
      imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      altText: "Canal boating experience",
      category: "boating",
      sortOrder: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "default-2", 
      title: "Mini house boat shikkar boat",
      description: "Traditional shikkar boats for authentic backwater experience",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      altText: "Mini house boat shikkar boat",
      category: "boating",
      sortOrder: 2,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "default-3",
      title: "Home stay rooms",
      description: "Comfortable homestay accommodation with local hospitality",
      imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      altText: "Home stay rooms",
      category: "homestay",
      sortOrder: 3,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "default-4",
      title: "Lake foods",
      description: "Delicious local Kerala cuisine and fresh lake specialties",
      imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      altText: "Lake foods",
      category: "food",
      sortOrder: 4,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "default-5",
      title: "Munroe Island boating",
      description: "Scenic boating around pristine Munroe Island",
      imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      altText: "Munroe Island boating",
      category: "boating",
      sortOrder: 5,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "default-6",
      title: "Backwater experience",
      description: "Immerse yourself in the tranquil backwater ecosystem",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      altText: "Backwater experience",
      category: "boating",
      sortOrder: 6,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ] as GalleryImage[];

  const displayImages = galleryImages.length > 0 ? galleryImages : defaultImages;


  // Get unique categories for filtering
  const categories = ["all", ...Array.from(new Set(displayImages.map(img => img.category || "general")))];

  // Filter images by category
  const filteredImages = selectedCategory === "all" 
    ? displayImages 
    : displayImages.filter(img => img.category === selectedCategory);

  // Show limited images initially, or all if "View All" is clicked
  const imagesToShow = showAllImages ? filteredImages : filteredImages.slice(0, 6);

  // Handle opening lightbox
  const openLightbox = (imageIndex: number) => {
    const allImages = showAllImages ? filteredImages : filteredImages.slice(0, 6);
    setLightboxImages(allImages);
    setCurrentImageIndex(imageIndex);
    setLightboxOpen(true);
  };

  // Handle closing lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // Navigate to next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === lightboxImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Navigate to previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? lightboxImages.length - 1 : prevIndex - 1
    );
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!lightboxOpen) return;
      
      if (event.key === 'Escape') {
        closeLightbox();
      } else if (event.key === 'ArrowRight') {
        nextImage();
      } else if (event.key === 'ArrowLeft') {
        prevImage();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, lightboxImages.length]);

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
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setShowAllImages(false); // Reset view all state when changing category
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              data-testid={`category-filter-${category}`}
            >
              {category === "all" ? "All" : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Error State */}
        {isError && (
          <div className="text-center py-8">
            <p className="text-orange-600 bg-orange-50 px-4 py-2 rounded-lg inline-block">
              Unable to load gallery from database. Showing default images.
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square bg-gray-200 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {imagesToShow.map((image, index) => (
              <div 
                key={image.id}
                className="aspect-square rounded-xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
                onClick={() => openLightbox(index)}
                data-testid={`gallery-image-${image.id}`}
              >
                <img 
                  src={image.imageUrl} 
                  alt={image.altText} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          {!showAllImages && filteredImages.length > 6 && (
            <button 
              onClick={() => setShowAllImages(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2"
              data-testid="button-view-all-gallery"
            >
              <Images size={20} />
              View All Gallery ({filteredImages.length} photos)
            </button>
          )}
          {showAllImages && (
            <button 
              onClick={() => setShowAllImages(false)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2"
              data-testid="button-show-less-gallery"
            >
              <ChevronUp size={20} />
              Show Less
            </button>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && lightboxImages.length > 0 && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
          data-testid="lightbox-overlay"
        >
          <div 
            className="relative max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
              data-testid="lightbox-close"
            >
              <X size={24} />
            </button>

            {/* Navigation Buttons */}
            {lightboxImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all"
                  data-testid="lightbox-prev"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all"
                  data-testid="lightbox-next"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            {/* Main Image */}
            <img
              src={lightboxImages[currentImageIndex]?.imageUrl}
              alt={lightboxImages[currentImageIndex]?.altText}
              className="max-w-full max-h-screen object-contain"
              data-testid="lightbox-image"
            />

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 right-4 text-center text-white bg-black bg-opacity-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">
                {lightboxImages[currentImageIndex]?.title}
              </h3>
              <p className="text-sm opacity-90">
                {lightboxImages[currentImageIndex]?.description}
              </p>
              {lightboxImages.length > 1 && (
                <p className="text-xs mt-2 opacity-75">
                  {currentImageIndex + 1} of {lightboxImages.length}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
