import PropTypes from 'prop-types';

const ServiceModal = ({ isOpen, onClose, service, onRequestQuote }) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          <img 
            src={service.image} 
            alt={service.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold transition-all"
            >
              ×
            </button>
          </div>
          <div className="absolute bottom-4 left-4 bg-white rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow-lg">
            {service.icon}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              {service.title}
            </h2>
            <p className="text-xl text-gray-600">
              {service.description}
            </p>
          </div>

          {/* Service Details */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Nos prestations incluent :
              </h3>
              <ul className="space-y-3">
                {getServiceFeatures(service.slug).map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Pourquoi nous choisir ?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Service rapide et efficace</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Équipe professionnelle certifiée</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Équipements modernes et écologiques</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Tarifs compétitifs et transparents</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Process Steps */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Notre processus en 4 étapes :
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { step: "1", title: "Consultation", desc: "Évaluation gratuite de vos besoins" },
                { step: "2", title: "Devis", desc: "Proposition détaillée et personnalisée" },
                { step: "3", title: "Planification", desc: "Organisation selon votre emploi du temps" },
                { step: "4", title: "Exécution", desc: "Réalisation professionnelle du service" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-blue-50 rounded-xl p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Intéressé par ce service ?
            </h3>
            <p className="text-gray-600 mb-6">
              Obtenez un devis gratuit et personnalisé en moins de 24h
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onRequestQuote(service)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Demander un devis
              </button>
              <button
                onClick={onClose}
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +243 811 632 595
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  davidshakala@gmail.com
                </span>
              </div>
              <span>Disponible 24h/7j pour les urgences</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get service features based on slug
const getServiceFeatures = (slug) => {
  const features = {
    'nettoyage-professionnel': [
      'Nettoyage de bureaux et espaces commerciaux',
      'Nettoyage résidentiel complet',
      'Désinfection et assainissement',
      'Nettoyage de vitres et surfaces',
      'Aspiration et nettoyage des sols',
      'Vidange des poubelles'
    ],
    'fumigation': [
      'Élimination des insectes nuisibles',
      'Traitement contre les rongeurs',
      'Désinfection complète des locaux',
      'Traitement préventif',
      'Produits certifiés et écologiques',
      'Suivi et garantie du traitement'
    ],
    'buanderie': [
      'Lavage professionnel du linge',
      'Séchage et pliage soignés',
      'Repassage professionnel',
      'Traitement des taches difficiles',
      'Service de collecte et livraison',
      'Produits adaptés aux textiles délicats'
    ],
    'entretien-piscine': [
      'Nettoyage et aspiration du bassin',
      'Équilibrage chimique de l\'eau',
      'Nettoyage des filtres et équipements',
      'Maintenance préventive',
      'Hivernage et remise en service',
      'Conseil et formation'
    ],
    'jardinage': [
      'Tonte et entretien des pelouses',
      'Taille et élagage des arbres',
      'Plantation et aménagement',
      'Arrosage et fertilisation',
      'Nettoyage des espaces verts',
      'Conception paysagère'
    ],
    'desinsectisation': [
      'Traitement écologique contre les insectes',
      'Élimination des nids et colonies',
      'Protection longue durée',
      'Produits respectueux de l\'environnement',
      'Intervention rapide',
      'Garantie et suivi'
    ]
  };

  return features[slug] || [
    'Service professionnel de qualité',
    'Équipe expérimentée et formée',
    'Matériel moderne et efficace',
    'Respect des normes de sécurité',
    'Devis gratuit et personnalisé',
    'Satisfaction garantie'
  ];
};

ServiceModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  service: PropTypes.shape({
    id: PropTypes.string,
    slug: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.string,
    image: PropTypes.string
  }),
  onRequestQuote: PropTypes.func.isRequired
};

export default ServiceModal;
