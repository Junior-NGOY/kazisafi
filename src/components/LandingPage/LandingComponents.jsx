import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

// Importation des images des services
import cleaningImg from "../../assets/places/cleaning.jpeg";
import fumigationImg from "../../assets/places/fumigation1.jpg";
import fumiImg from "../../assets/places/fumigation.jpg";
import buanderieImg from "../../assets/places/Buanderie.jpg";
import piscineImg from "../../assets/places/piscine.jpeg";
import jardinageImg from "../../assets/places/jardinage1.jpg";
//import evacuationImg from "../../assets/places/cleaning.jpeg"; // Temporaire, à remplacer par une vraie image d'évacuation
import evacuationImg from "../../assets/places/image.png"; // Image générique pour les services

// Hero Section moderne
const HeroSection = ({ title, subtitle, backgroundVideo, onCTAClick }) => {
  const navigate = useNavigate();

  const handleServicesClick = () => {
    navigate('/services');
  };
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" data-aos="fade-up">
          {title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90" data-aos="fade-up" data-aos-delay="200">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="400">
          <button 
            onClick={onCTAClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Demander un Devis
          </button>
          <button 
            onClick={handleServicesClick}
            className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
          >
            Nos Services
          </button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

HeroSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  backgroundVideo: PropTypes.string.isRequired,
  onCTAClick: PropTypes.func.isRequired
};

// Section des services avec grid moderne
const ServicesSection = ({ onServiceQuote, onServiceDetails }) => {
  const services = [
    {
      id: "1",
      slug: "nettoyage-professionnel",
      icon: "🧹",
      title: "Nettoyage Professionnel",
      description: "Service complet pour bureaux, maisons et commerces",
      image: cleaningImg
    },
    {
      id: "2",
      slug: "fumigation",
      icon: "💨",
      title: "Fumigation",
      description: "Élimination des nuisibles et désinfection",
      image: fumiImg
    },
    {
      id: "3",
      slug: "buanderie",
      icon: "👕",
      title: "Buanderie",
      description: "Lavage, séchage et repassage professionnel",
      image: buanderieImg
    },
    {
      id: "4",
      slug: "entretien-piscine",
      icon: "🏊‍♂️",
      title: "Entretien Piscine",
      description: "Maintenance complète de vos piscines",
      image: piscineImg
    },
    {
      id: "5",
      slug: "jardinage",
      icon: "🌿",
      title: "Jardinage",
      description: "Entretien et aménagement paysager",
      image: jardinageImg
    },
    {
      id: "6",
      slug: "evacuation-immondices",
      icon: "🗑️",
      title: "Évacuation d'Immondices",
      description: "Service d'évacuation rapide et efficace des déchets",
      image: evacuationImg
    },
    {
      id: "7",
      slug: "desinsectisation",
      icon: "🐛",
      title: "Désinsectisation",
      description: "Traitement écologique contre les insectes",
      image: fumigationImg
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Nos Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une gamme complète de services professionnels pour répondre à tous vos besoins
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-white rounded-full w-12 h-12 flex items-center justify-center text-2xl">
                  {service.icon}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => onServiceDetails(service)}
                    className="text-blue-600 hover:text-blue-800 font-semibold flex items-center"
                  >
                    En savoir plus
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => onServiceQuote(service)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
                  >
                    Devis
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Section statistiques
const StatsSection = () => {
  const stats = [
    { number: "500+", label: "Clients Satisfaits" },
    { number: "1000+", label: "Projets Réalisés" },
    { number: "5+", label: "Années d'Expérience" },
    { number: "24/7", label: "Support Client" }
  ];

  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {stat.number}
              </div>
              <div className="text-lg opacity-90">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Section CTA (Call to Action)
const CTASection = ({ onContactClick }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6" data-aos="fade-up">
          Prêt à Commencer ?
        </h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          Contactez-nous aujourd&apos;hui pour un devis gratuit et découvrez pourquoi nos clients nous font confiance
        </p>
        <button 
          onClick={onContactClick}
          className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          data-aos="fade-up" 
          data-aos-delay="400"
        >
          Obtenir un Devis Gratuit
        </button>
      </div>
    </section>
  );
};

CTASection.propTypes = {
  onContactClick: PropTypes.func.isRequired
};

ServicesSection.propTypes = {
  onServiceQuote: PropTypes.func,
  onServiceDetails: PropTypes.func
};

export { HeroSection, ServicesSection, StatsSection, CTASection };
