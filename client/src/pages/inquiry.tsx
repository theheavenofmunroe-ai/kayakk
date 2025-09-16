import { useEffect, useState } from "react";
import InquiryForm from "../components/InquiryForm";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function InquiryPage() {
  const [selectedPackage, setSelectedPackage] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const packageParam = params.get("package") || "";
    setSelectedPackage(packageParam);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Start Your Journey
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fill out the form below to begin your booking process. We'll get back to you quickly to confirm your reservation.
          </p>
        </div>
        
        <InquiryForm 
          selectedPackage={selectedPackage}
          onSuccess={(inquiryId) => {
            console.log("Inquiry submitted with ID:", inquiryId);
          }}
        />
      </main>
      
      <Footer />
    </div>
  );
}