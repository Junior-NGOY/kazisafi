import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useServices, useProjects } from '../hooks/useApi';
import QuoteModal from '../components/QuoteModal';

const ServiceDetail = () => {
  const { serviceName } = useParams();
  const navigate = useNavigate();
  const [quoteModal, setQuoteModal] = useState(false);
  const { services, loading: servicesLoading } = useServices();
  const { projects, loading: projectsLoading } = useProjects();

  // Trouver le service par nom
  const service = services.find(s => s.name === serviceName);
  
  // Trouver les projets liés à ce service
  const serviceProjects = projects.filter(p => p.serviceId === service?.id);

  const handleQuoteRequest = () => {
    setQuoteModal(true);
  };

  if (servicesLoading || projectsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Service non trouvé</h1>
          <button 
            onClick={() => navigate('/services')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Retour aux services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section du Service */}
      <section className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-4">{service.icon}</span>
              <h1 className="text-5xl font-bold">{service.title}</h1>
            </div>
            <p className="text-xl opacity-90 mb-6">{service.description}</p>
            <div className="flex items-center space-x-4">
              {service.price && (
                <span className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                  <strong>Prix: {service.price}</strong>
                </span>
              )}
              <button 
                onClick={handleQuoteRequest}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Demander un devis
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Description détaillée */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contenu principal */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Description du service
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {service.longDescription || service.description}
                  </p>
                </div>
              </div>

              {/* Projets réalisés */}
              {serviceProjects.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Projets réalisés
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {serviceProjects.map((project) => (
                      <div key={project.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        {project.images && JSON.parse(project.images)[0] && (
                          <img 
                            src={JSON.parse(project.images)[0]} 
                            alt={project.title}
                            className="w-full h-48 object-cover"
                          />
                        )}
                        <div className="p-4">
                          <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {project.location}
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4M5 7h14l-1 10H6L5 7z" />
                            </svg>
                            {new Date(project.date).toLocaleDateString('fr-FR')}
                          </div>
                          {project.testimonial && (
                            <blockquote className="mt-3 text-sm italic text-gray-600 border-l-4 border-blue-500 pl-3">
                              &quot;{project.testimonial}&quot;
                            </blockquote>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Demander un devis
                </h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom complet
                    </label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input 
                      type="email" 
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Téléphone
                    </label>
                    <input 
                      type="tel" 
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea 
                      rows="4"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={`Décrivez votre besoin en ${service.title.toLowerCase()}...`}
                    ></textarea>
                  </div>
                  <button 
                    type="button"
                    onClick={handleQuoteRequest}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Obtenir un devis personnalisé
                  </button>
                </form>

                {/* Contact Info */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Contact direct</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      +243 811 632 595
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      contact@kazisafi.com
                    </div>
                    <div className="flex items-start">
                      <svg className="w-4 h-4 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Lubumbashi, RDC
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Modal */}
      <QuoteModal 
        isOpen={quoteModal} 
        onClose={() => setQuoteModal(false)}
        service={service}
      />
    </div>
  );
};

export default ServiceDetail;
