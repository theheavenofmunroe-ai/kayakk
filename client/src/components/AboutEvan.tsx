import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { AboutContent } from "@shared/schema";

export default function AboutEvan() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Fetch about content from database
  const { data: aboutContent, isLoading } = useQuery<AboutContent | null>({
    queryKey: ['/api/about-content'],
    retry: 1
  });

  // Use database content or fallbacks
  const title = aboutContent?.title || "Meet Evan - Your Local Host";
  const hostName = aboutContent?.hostName || "Evan";
  const hostImage = aboutContent?.hostImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  const introText = aboutContent?.introText || "Born and raised on the pristine waters of Munroe Island, Evan has spent over two decades mastering the art of backwater navigation and hospitality.";
  const description1 = aboutContent?.description1 || "His deep connection with the local ecosystem and authentic Kerala culture makes every journey a unique experience filled with stories, local wisdom, and genuine warmth.";
  const description2 = aboutContent?.description2 || "When you book with Heaven of Munroe, you're not just getting a service - you're becoming part of Evan's extended family.";
  const expandedText1 = aboutContent?.expandedText1 || "Evan's expertise extends beyond boating - he's also a certified local guide, traditional chef, and cultural ambassador for Munroe Island. His multilingual abilities ensure comfortable communication with guests from around the world.";
  const expandedText2 = aboutContent?.expandedText2 || "The business started as a family tradition, passed down through generations of fishermen and boat builders. Today, Evan combines this heritage with modern hospitality standards to create unforgettable experiences.";
  const languages = aboutContent?.languages || "English, Hindi, Malayalam";
  const certifications = aboutContent?.certifications || "Tourism Board Approved";

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fade-in-up">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-4 gradient-text">
              {title}
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <div className="relative">
                <div className="w-full h-80 rounded-2xl overflow-hidden shadow-2xl hover-lift">
                  <img 
                    src={hostImage}
                    alt={`${hostName} - Local Host and Guide`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center glass-effect animate-float">
                  <i className="fas fa-anchor text-white text-2xl"></i>
                </div>
              </div>
            </div>
            
            <div className="animate-slide-in-right">
              <div className="space-y-4">
                <p className="text-lg text-gray-700 leading-relaxed animate-fade-in-up delay-200">
                  {introText}
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed animate-fade-in-up delay-300">
                  {description1}
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed animate-fade-in-up delay-400">
                  {description2}
                </p>
                
                {isExpanded && (
                  <div className="mt-6 space-y-4 animate-fade-in-up">
                    <p className="text-gray-700 leading-relaxed">
                      {expandedText1}
                    </p>
                    
                    <p className="text-gray-700 leading-relaxed">
                      {expandedText2}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-blue-50 p-4 rounded-lg text-center hover-lift">
                        <i className="fas fa-language text-blue-600 text-2xl mb-2"></i>
                        <p className="font-medium text-gray-800">Multilingual Guide</p>
                        <p className="text-sm text-gray-600">{languages}</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center hover-lift">
                        <i className="fas fa-certificate text-green-600 text-2xl mb-2"></i>
                        <p className="font-medium text-gray-800">Certified Host</p>
                        <p className="text-sm text-gray-600">{certifications}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="pt-4">
                  <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    data-testid="button-read-more"
                  >
                    <i className={`fas ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} mr-2`}></i>
                    {isExpanded ? 'Read Less' : 'Read More'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}