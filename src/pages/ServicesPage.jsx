import { useState, useEffect } from 'react';
import { useServices } from '../hooks/useApi';
import { useSearchParams } from 'react-router-dom';
import ServiceModal from '../components/ServiceModal';
import QuoteModal from '../components/QuoteModal';
import PropTypes from 'prop-types';

const ServicesPage = () => {
  const { services, loading, error } = useServices();
  const [selectedService, setSelectedService] = useState(null);
  const [serviceModal, setServiceModal] = useState(false);
  const [quoteModal, setQuoteModal] = useState(false);
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Récupérer la catégorie depuis l'URL
  const categoryFromUrl = searchParams.get('category');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

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

  // Filtrer les services actifs et par catégorie
  const activeServices = services?.filter(service => service.active) || [];
  
  // Catégories disponibles
  const categories = [
    { id: 'all', name: 'Tous les services', icon: '🏠' },
    { id: 'nettoyage', name: 'Nettoyage', icon: '🧹' },
    { id: 'fumigation', name: 'Fumigation', icon: '💨' },
    { id: 'buanderie', name: 'Buanderie', icon: '👕' },
    { id: 'entretien-piscine', name: 'Entretien piscine', icon: '🏊' },
    { id: 'jardinage', name: 'Jardinage', icon: '🌱' },
    { id: 'evacuation', name: 'Évacuation d\'immondices', icon: '🗑️' },
    { id: 'desinsectisation', name: 'Désinsectisation', icon: '🐛' },
    { id: 'debouchage', name: 'Débouchage', icon: '🔧' }
  ];

  // Filtrer les services selon la catégorie sélectionnée
  const filteredServices = selectedCategory === 'all' 
    ? activeServices 
    : activeServices.filter(service => 
        service.category === selectedCategory || 
        service.name?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        service.title?.toLowerCase().includes(selectedCategory.toLowerCase())
      );

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    // Mettre à jour l'URL
    const url = new URL(window.location);
    if (categoryId === 'all') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', categoryId);
    }
    window.history.pushState({}, '', url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Erreur de chargement</h2>
          <p className="text-gray-600">Impossible de charger les services.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Nos Services
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Découvrez notre gamme complète de services professionnels de nettoyage et d&apos;entretien
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Filtres par catégorie */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Filtrer par spécialité
            </h2>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-500 hover:text-blue-600'
                  }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Résultats */}
          <div className="mb-8">
            <p className="text-center text-gray-600">
              {filteredServices.length} service{filteredServices.length > 1 ? 's' : ''} trouvé{filteredServices.length > 1 ? 's' : ''}
              {selectedCategory !== 'all' && (
                <span className="ml-2">
                  dans la catégorie &ldquo;{categories.find(c => c.id === selectedCategory)?.name}&rdquo;
                </span>
              )}
            </p>
          </div>

          {filteredServices.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Aucun service trouvé
              </h3>
              <p className="text-gray-600 mb-4">
                Aucun service ne correspond à votre recherche dans cette catégorie.
              </p>
              <button
                onClick={() => handleCategoryChange('all')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Voir tous les services
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  onViewDetails={handleServiceDetails}
                  onRequestQuote={handleServiceQuote}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Besoin d&apos;un Service Personnalisé ?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Contactez-nous pour discuter de vos besoins spécifiques et obtenir un devis sur mesure
          </p>
          <button 
            onClick={() => setQuoteModal(true)}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Demander un Devis Gratuit
          </button>
        </div>
      </section>

      {/* Modals */}
      <ServiceModal
        isOpen={serviceModal}
        onClose={() => setServiceModal(false)}
        service={selectedService}
        onRequestQuote={handleQuoteFromServiceModal}
      />

      <QuoteModal
        isOpen={quoteModal}
        onClose={() => setQuoteModal(false)}
        service={selectedService}
      />
    </div>
  );
};

// Composant ServiceCard
const ServiceCard = ({ service, index, onViewDetails, onRequestQuote }) => {
  return (
    <div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={service.image} 
          alt={service.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 bg-white rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow-lg">
          {service.icon || '🔧'}
        </div>
        {service.price && (
          <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {service.price}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          {service.title}
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {service.description}
        </p>
        
        <div className="flex space-x-3">
          <button 
            onClick={() => onViewDetails(service)}
            className="flex-1 text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800 px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
          >
            <span>En savoir plus</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button 
            onClick={() => onRequestQuote(service)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
          >
            Demander un devis
          </button>
        </div>
      </div>
    </div>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    icon: PropTypes.string,
    price: PropTypes.string,
    name: PropTypes.string
  }).isRequired,
  index: PropTypes.number.isRequired,
  onViewDetails: PropTypes.func.isRequired,
  onRequestQuote: PropTypes.func.isRequired
};

export default ServicesPage;