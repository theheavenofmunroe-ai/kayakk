import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Users, MapPin, Award, Heart, Clock, Anchor, Globe, Star } from "lucide-react";
import type { AboutContent, ContentSection } from "@shared/schema";

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState<'story' | 'location' | 'team' | 'mission'>('story');
  
  // Fetch about content from database
  const { data: aboutContent, isLoading } = useQuery<AboutContent | null>({
    queryKey: ['/api/about-content'],
    retry: 1
  });
  
  // Fetch additional content sections for comprehensive about us
  const { data: storyContent } = useQuery<ContentSection | null>({
    queryKey: ['/api/content-sections', 'about-story'],
  });
  
  const { data: locationContent } = useQuery<ContentSection | null>({
    queryKey: ['/api/content-sections', 'about-location'],
  });
  
  const { data: missionContent } = useQuery<ContentSection | null>({
    queryKey: ['/api/content-sections', 'about-mission'],
  });

  const renderTabContent = () => {
    switch (activeTab) {
      case 'story':
        return (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-4">Our Heritage Story</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {storyContent?.content || "Heaven of Munroe began as a vision to share the untouched beauty of Munroe Island with the world while preserving its pristine natural environment and cultural heritage. Founded by local families who have called these waters home for generations, our business represents a perfect blend of traditional Kerala hospitality and sustainable tourism practices."}
                </p>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <Clock className="text-blue-600" size={24} />
                    <h4 className="font-semibold text-lg">Since 2015</h4>
                  </div>
                  <p className="text-muted-foreground">
                    Over 8 years of creating unforgettable backwater experiences while supporting 
                    local families and preserving traditional ways of life.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <Award className="text-green-600" size={24} />
                    <h4 className="font-semibold text-lg">Recognition</h4>
                  </div>
                  <p className="text-muted-foreground">
                    Kerala Tourism Board certified and recognized for sustainable tourism practices 
                    and authentic cultural experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'location':
        return (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-4">Our Paradise Location</h3>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {locationContent?.content || "Nestled in the heart of Kerala's Kollam district, Munroe Island is a collection of eight small islands where the Kallada River gracefully meets Ashtamudi Lake. This unique geographical position creates an extraordinary ecosystem that supports diverse wildlife, traditional fishing communities, and centuries-old cultural practices. Our location offers the perfect escape from urban chaos. Here, time moves differently—synchronized with the gentle rhythm of tides, the morning calls of kingfishers, and the evening glow reflecting off tranquil waters."}
                </p>
                <div className="bg-white p-6 rounded-xl shadow-lg border">
                  <h4 className="font-semibold text-lg mb-4 flex items-center">
                    <MapPin className="text-blue-600 mr-2" size={20} />
                    Location Highlights
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <p><strong>Coordinates:</strong> 8.8932°N, 76.7794°E</p>
                      <p><strong>District:</strong> Kollam, Kerala</p>
                      <p><strong>Nearest Airport:</strong> Trivandrum (90km)</p>
                    </div>
                    <div className="space-y-2">
                      <p><strong>Railway Station:</strong> Kollam (25km)</p>
                      <p><strong>Water Bodies:</strong> Ashtamudi Lake & Kallada River</p>
                      <p><strong>Ecosystem:</strong> Tropical backwater delta</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Munroe Island aerial view"
                  className="w-full h-48 object-cover rounded-xl shadow-lg"
                  loading="lazy"
                />
                <img 
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Traditional Kerala boat"
                  className="w-full h-48 object-cover rounded-xl shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        );
        
      case 'team':
        return (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-4">Meet Our Family</h3>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <img 
                    src={aboutContent?.hostImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"}
                    alt="Evan - Lead Host and Guide"
                    className="w-24 h-24 rounded-full object-cover shadow-lg"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-serif text-xl font-bold">Evan - Lead Host & Guide</h4>
                    <p className="text-muted-foreground mb-2">Founder & Cultural Ambassador</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Born and raised on Munroe Island, Evan brings over 20 years of local expertise. 
                      His deep knowledge of the ecosystem, cultural traditions, and multilingual abilities 
                      make every journey both educational and memorable.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full flex items-center justify-center">
                    <Users className="text-blue-600" size={32} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-bold">Local Guides Team</h4>
                    <p className="text-muted-foreground mb-2">Native Island Experts</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Our team of local guides includes fishermen, coir artisans, and village elders 
                      who share authentic stories and traditional knowledge passed down through generations.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <Globe className="text-blue-600" size={24} />
                    <h4 className="font-semibold">Languages Spoken</h4>
                  </div>
                  <p className="text-muted-foreground">
                    {aboutContent?.languages || "English, Hindi, Malayalam, Tamil"}
                  </p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <Award className="text-green-600" size={24} />
                    <h4 className="font-semibold">Certifications</h4>
                  </div>
                  <p className="text-muted-foreground">
                    {aboutContent?.certifications || "Kerala Tourism Board Approved, First Aid Certified, Eco-Tourism Trained"}
                  </p>
                </div>
                
                <div className="bg-yellow-50 p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <Star className="text-yellow-600" size={24} />
                    <h4 className="font-semibold">Experience</h4>
                  </div>
                  <p className="text-muted-foreground">
                    8+ years in sustainable tourism, 500+ happy families served, 98% guest satisfaction rate
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'mission':
        return (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-4">Our Mission & Values</h3>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-600 to-teal-600 text-white p-6 rounded-xl">
                  <h4 className="font-serif text-xl font-bold mb-4 flex items-center">
                    <Heart className="mr-2" size={24} />
                    Our Mission
                  </h4>
                  <p className="leading-relaxed">
                    {missionContent?.content || "To create authentic, sustainable connections between travelers and the natural beauty of Munroe Island while preserving our cultural heritage and supporting local communities."}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-serif text-xl font-bold">What We Stand For</h4>
                  <div className="grid gap-4">
                    <div className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm border">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                        <span className="text-green-600 font-bold text-sm">1</span>
                      </div>
                      <div>
                        <h5 className="font-semibold">Environmental Conservation</h5>
                        <p className="text-sm text-muted-foreground">Protecting the delicate ecosystem while sharing its wonders responsibly.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm border">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                        <span className="text-blue-600 font-bold text-sm">2</span>
                      </div>
                      <div>
                        <h5 className="font-semibold">Cultural Preservation</h5>
                        <p className="text-sm text-muted-foreground">Maintaining traditional practices and supporting local artisans and families.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm border">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mt-1">
                        <span className="text-yellow-600 font-bold text-sm">3</span>
                      </div>
                      <div>
                        <h5 className="font-semibold">Authentic Experiences</h5>
                        <p className="text-sm text-muted-foreground">Creating genuine connections with nature and local culture, not staged performances.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <img 
                  src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Sustainable tourism at Munroe Island"
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                  loading="lazy"
                />
                
                <div className="bg-green-50 p-6 rounded-xl">
                  <h4 className="font-serif text-lg font-bold mb-4">Community Impact</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Local families supported:</span>
                      <strong>25+ families</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Traditional crafts promoted:</span>
                      <strong>Coir, fishing, cuisine</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Mangroves protected:</span>
                      <strong>15 hectares</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Local employment:</span>
                      <strong>15+ people</strong>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h4 className="font-serif text-lg font-bold mb-4">Awards & Recognition</h4>
                  <div className="space-y-2 text-sm">
                    <p>🏆 Kerala Responsible Tourism Award 2022</p>
                    <p>🌱 Sustainable Tourism Excellence 2021</p>
                    <p>⭐ TripAdvisor Certificate of Excellence</p>
                    <p>📋 Kerala Tourism Board Certification</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <section id="about-us" className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50" data-testid="section-about-us">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="heading-about-us">
            About Heaven of Munroe
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-teal-600 mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the story behind Kerala's most authentic backwater experience and the passionate 
            team dedicated to sharing Munroe Island's natural wonders with the world.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { key: 'story', label: 'Our Story', icon: Anchor },
              { key: 'location', label: 'Location', icon: MapPin },
              { key: 'team', label: 'Our Team', icon: Users },
              { key: 'mission', label: 'Mission', icon: Heart }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  activeTab === key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-muted-foreground hover:bg-blue-50 hover:text-blue-600'
                }`}
                data-testid={`tab-${key}`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 min-h-[600px]">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              renderTabContent()
            )}
          </div>
        </div>
      </div>
    </section>
  );
}