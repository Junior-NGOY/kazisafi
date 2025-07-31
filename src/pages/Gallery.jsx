import { useState } from 'react';

// Import des images depuis les assets
import coverWomen from '../assets/cover-women.jpeg';
import fumigation1 from '../assets/galleries/fumigation.jpg';
import fumigation2 from '../assets/galleries/fumigation.jpg';
import nettoyage1 from '../assets/galleries/nettoyage-1.jpg';
import nettoyage2 from '../assets/galleries/nettoyage-2.jpg';
import jardinage from '../assets/galleries/jardinage.jpg';
import jardinage1 from '../assets/galleries/jardinage1.jpg';
import buanderie from '../assets/galleries/buanderie.jpg';
import piscine from '../assets/galleries/piscine.jpg';
import eau from '../assets/galleries/eau.jpg';

// Données statiques de la galerie avec images depuis les assets
const galleryData = [
  // NETTOYAGE
  {
    id: '1',
    title: "Service de nettoyage professionnel Kazisafi",
    description: "Notre équipe en action lors d'un service de nettoyage professionnel",
    image: coverWomen,
    category: "nettoyage",
    type: "general",
    alt: "Équipe Kazisafi nettoyage professionnel",
    featured: true,
    active: true
  },
  {
    id: '2',
    title: "Nettoyage d'espaces commerciaux",
    description: "Service de nettoyage pour entreprises et commerces",
    image: nettoyage1,
    category: "nettoyage",
    type: "general",
    alt: "Nettoyage commercial Kazisafi",
    featured: false,
    active: true
  },
  {
    id: '3',
    title: "Nettoyage résidentiel",
    description: "Service de nettoyage pour particuliers",
    image: nettoyage2,
    category: "nettoyage",
    type: "general",
    alt: "Nettoyage résidentiel Kazisafi",
    featured: false,
    active: true
  },
  
  // FUMIGATION
  {
    id: '4',
    title: "Service de fumigation professionnelle",
    description: "Traitement de fumigation pour éliminer les nuisibles",
    image: fumigation1,
    category: "fumigation",
    type: "general",
    alt: "Service fumigation Kazisafi",
    featured: true,
    active: true
  },
  {
    id: '5',
    title: "Fumigation d'entrepôts",
    description: "Protection des stocks par fumigation spécialisée",
    image: fumigation2,
    category: "fumigation",
    type: "general",
    alt: "Fumigation entrepôt Kazisafi",
    featured: false,
    active: true
  },

  // JARDINAGE
  {
    id: '6',
    title: "Aménagement paysager",
    description: "Création et entretien d'espaces verts",
    image: jardinage,
    category: "jardinage",
    type: "general",
    alt: "Jardinage Kazisafi",
    featured: true,
    active: true
  },
  {
    id: '7',
    title: "Entretien espaces verts",
    description: "Maintenance régulière de jardins et parcs",
    image: jardinage1,
    category: "jardinage",
    type: "general",
    alt: "Entretien jardins Kazisafi",
    featured: false,
    active: true
  },

  // BUANDERIE
  {
    id: '8',
    title: "Service buanderie professionnelle",
    description: "Lavage et entretien professionnel du linge",
    image: buanderie,
    category: "buanderie",
    type: "general",
    alt: "Service buanderie",
    featured: false,
    active: true
  },

  // PISCINE
  {
    id: '9',
    title: "Entretien de piscines",
    description: "Nettoyage et maintenance complète de piscines",
    image: piscine,
    category: "piscine",
    type: "general",
    alt: "Entretien piscine",
    featured: false,
    active: true
  },

  // EVACUATION
  {
    id: '10',
    title: "Évacuation d'immondices",
    description: "Service d'évacuation rapide et efficace des déchets",
    image: '/placeholder-service.svg',
    category: "evacuation",
    type: "general",
    alt: "Évacuation déchets",
    featured: false,
    active: true
  },

  // DESINSECTISATION
  {
    id: '11',
    title: "Désinsectisation écologique",
    description: "Traitement à l'eau sans produits chimiques",
    image: eau,
    category: "desinsectisation",
    type: "general",
    alt: "Désinsectisation écologique",
    featured: false,
    active: true
  }
];

// Fonction utilitaire pour construire l'URL complète des images
const getImageUrl = (imagePath) => {
  if (!imagePath) return '/placeholder-service.svg';
  
  // Images externes (http/https)
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
  
  // Images placeholder depuis public
  if (imagePath.startsWith('/placeholder') || imagePath.startsWith('/vite.svg')) return imagePath;
  
  // Images importées depuis assets (déjà des URLs complètes après import)
  if (typeof imagePath === 'string' && imagePath.includes('assets')) return imagePath;
  
  // Images depuis le dossier public
  if (imagePath.startsWith('/')) return imagePath;
  
  // Par défaut, retourner l'image telle quelle (pour les imports)
  return imagePath;
};

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Utilisation des données statiques au lieu de l'API
  const gallery = galleryData;
  const loading = false;
  const error = null;

  // Catégories disponibles - correspondant à vos services
  const categories = [
    { id: 'all', name: 'Tous', icon: '🖼️' },
    { id: 'nettoyage', name: 'Nettoyage', icon: '🧽' },
    { id: 'fumigation', name: 'Fumigation', icon: '💨' },
    { id: 'buanderie', name: 'Buanderie', icon: '👕' },
    { id: 'evacuation', name: 'Évacuation d\'immondices', icon: '�️' },
    { id: 'piscine', name: 'Entretien piscine', icon: '🏊' },
    { id: 'jardinage', name: 'Jardinage', icon: '�' },
    { id: 'desinsectisation', name: 'Désinsectisation à l\'eau', icon: '🚿' }
  ];

  // Filtrer les images par catégorie
  const filteredImages = gallery?.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  ) || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de la galerie...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Galerie temporairement indisponible
          </h2>
          <p className="text-gray-600">
            Nous travaillons à résoudre ce problème. Revenez bientôt !
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Notre Galerie
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos réalisations et la qualité de notre travail. 
              Des transformations qui parlent d&apos;elles-mêmes.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filtres par catégorie */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:shadow-md'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
                {category.id !== 'all' && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full ml-2">
                    {gallery?.filter(item => item.category === category.id).length || 0}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Galerie d'images */}
        {filteredImages.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📷</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {selectedCategory === 'all' 
                ? 'Galerie en construction' 
                : `Aucune image dans la catégorie "${categories.find(c => c.id === selectedCategory)?.name}"`
              }
            </h3>
            <p className="text-gray-600 mb-6">
              Nous ajoutons régulièrement de nouvelles photos de nos réalisations.
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Voir toutes les catégories
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={image.id || index}
                className="group relative aspect-square bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={getImageUrl(image.url || image.image)}
                  alt={image.title || image.alt || `Image ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = '/placeholder-service.svg';
                  }}
                />
                
                {/* Overlay avec informations */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    {image.title && (
                      <h3 className="font-semibold text-sm mb-1">
                        {image.title}
                      </h3>
                    )}
                    {image.category && (
                      <span className="inline-block bg-white/20 backdrop-blur-sm text-xs px-2 py-1 rounded-full">
                        {categories.find(c => c.id === image.category)?.name || image.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Icône de zoom */}
                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Statistiques */}
        {filteredImages.length > 0 && (
          <div className="mt-12 bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {gallery?.length || 0}
                </div>
                <div className="text-gray-600">Photos au total</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {categories.length - 1}
                </div>
                <div className="text-gray-600">Catégories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  100%
                </div>
                <div className="text-gray-600">Satisfaction client</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal d'image agrandie */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={getImageUrl(selectedImage.url || selectedImage.image)}
              alt={selectedImage.title || selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Bouton fermer */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white rounded-full p-2 hover:bg-white/30 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Informations de l'image */}
            {(selectedImage.title || selectedImage.description) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 rounded-b-lg">
                {selectedImage.title && (
                  <h3 className="text-xl font-bold mb-2">
                    {selectedImage.title}
                  </h3>
                )}
                {selectedImage.description && (
                  <p className="text-gray-200">
                    {selectedImage.description}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
