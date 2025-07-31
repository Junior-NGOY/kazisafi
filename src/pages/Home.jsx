import React from "react";
import { HeroSection, ServicesSection, StatsSection, CTASection } from "../components/LandingPage/LandingComponents";
import NatureVid from "../assets/video/main.mp4";
import BlogsComp from "../components/Blogs/BlogsComp";
import Testimonial from "../components/Testimonial/Testimonial";
import BannerPic from "../components/BannerPic/BannerPic";
import BannerImg from "../assets/cover-women.jpeg";
import Banner2 from "../assets/travel-cover1.jpg";
import OrderPopup from "../components/OrderPopup/OrderPopup";
import QuoteModal from "../components/QuoteModal";
import ServiceModal from "../components/ServiceModal";
import ContactModal from "../components/ContactModal";
// import { useSettings } from "../hooks/useApi";

const Home = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);
  const [quoteModal, setQuoteModal] = React.useState(false);
  const [contactModal, setContactModal] = React.useState(false);
  const [serviceModal, setServiceModal] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState(null);
  // const { getSetting, loading, error } = useSettings();

  const handleServiceDetails = (service) => {
    setSelectedService(service);
    setServiceModal(true);
  };

  const handleServiceQuote = (service) => {
    setSelectedService(service);
    setQuoteModal(true);
  };

  const handleQuoteFromServiceModal = (service) => {
    setServiceModal(false);
    setSelectedService(service);
    setQuoteModal(true);
  };

  const handleContactClick = () => {
    setContactModal(true);
  };

  const handleQuoteClick = () => {
    setQuoteModal(true);
  };

  return (
    <>
      <div>
        {/* Hero Section Moderne */}
        <HeroSection
          title="KAZISAFI - Excellence en Nettoyage"
          subtitle="Services professionnels de qualité pour tous vos besoins"
          backgroundVideo={NatureVid}
          onCTAClick={handleQuoteClick}
        />

        {/* Services Section */}
        <ServicesSection 
          onServiceQuote={handleServiceQuote}
          onServiceDetails={handleServiceDetails}
        />

        {/* Stats Section */}
        <StatsSection />

        {/* Banner avec image */}
        <BannerPic img={BannerImg} />

        {/* Blog Section */}
        <BlogsComp />

        {/* CTA Section */}
        <CTASection onContactClick={handleContactClick} />

        {/* Banner avec image 2 */}
        <BannerPic img={Banner2} />

        {/* Testimonials */}
        <Testimonial />

        {/* Popup de contact */}
        <OrderPopup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={contactModal} 
        onClose={() => setContactModal(false)}
      />

      {/* Quote Modal */}
      <QuoteModal 
        isOpen={quoteModal} 
        onClose={() => setQuoteModal(false)}
        service={selectedService}
      />

      {/* Service Details Modal */}
      <ServiceModal
        isOpen={serviceModal}
        onClose={() => setServiceModal(false)}
        service={selectedService}
        onRequestQuote={handleQuoteFromServiceModal}
      />
    </div>
    </>
  );
};

export default Home;
