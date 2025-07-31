import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Configuration de l'URL de l'API selon l'environnement
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
const SERVER_BASE_URL = API_BASE_URL.replace('/api', '');

// Hook simplifié pour les appels API avec chargement manuel
const useApiData = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState({});
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (endpoint, key) => {
    setLoading(prev => ({ ...prev, [key]: true }));
    setError(null);
    
    try {
      console.log(`Fetching data for ${key} from ${API_BASE_URL}${endpoint}`);
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log(`Successfully loaded ${key}:`, result);
      setData(prev => ({ ...prev, [key]: result }));
      return result;
    } catch (err) {
      console.error(`Error fetching ${key}:`, err);
      setError(`Erreur lors du chargement des ${key}: ${err.message}`);
      // Initialiser avec un tableau vide plutôt que de ne rien faire
      setData(prev => ({ ...prev, [key]: [] }));
      return [];
    } finally {
      setLoading(prev => ({ ...prev, [key]: false }));
    }
  }, []);

  return { data, loading, error, fetchData };
};

// Fonction utilitaire pour construire l'URL complète des images
const getImageUrl = (imagePath) => {
  if (!imagePath) return '/placeholder-service.svg';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
  if (imagePath.startsWith('/placeholder')) return imagePath;
  if (imagePath.startsWith('/uploads/')) return `${SERVER_BASE_URL}${imagePath}`;
  return `${SERVER_BASE_URL}/uploads/services/${imagePath}`;
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('services');
  const { data, loading, error, fetchData } = useApiData();

  // Charger les données quand l'onglet change
  useEffect(() => {
    const loadData = async () => {
      try {
        switch (activeTab) {
          case 'services':
            await fetchData('/services', 'services');
            break;
          case 'projects':
            await fetchData('/projects', 'projects');
            break;
          case 'blog':
            await fetchData('/blog', 'posts');
            break;
          case 'quotes':
            await fetchData('/quotes', 'quotes');
            break;
          case 'settings':
            // Les paramètres n'ont pas besoin de chargement de données
            break;
          default:
            break;
        }
      } catch (err) {
        console.error('Error loading data for tab:', activeTab, err);
      }
    };

    // Charger les données seulement pour les onglets qui en ont besoin
    if (['services', 'projects', 'blog', 'quotes'].includes(activeTab)) {
      loadData();
    }
  }, [activeTab, fetchData]); // Ajouter fetchData à la dépendance

  const tabs = [
    { id: 'services', label: 'Services', icon: '🛠️' },
    { id: 'projects', label: 'Projets', icon: '📋' },
    { id: 'blog', label: 'Blog', icon: '📝' },
    { id: 'quotes', label: 'Devis', icon: '💬' },
    { id: 'settings', label: 'Paramètres', icon: '⚙️' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">
              Administration Kazisafi
            </h1>
            <Link 
              to="/" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Voir le site
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="text-red-400">⚠️</div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Erreur de chargement
                </h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
                <button 
                  onClick={() => {
                    const loadData = async () => {
                      switch (activeTab) {
                        case 'services':
                          await fetchData('/services', 'services');
                          break;
                        case 'projects':
                          await fetchData('/projects', 'projects');
                          break;
                        case 'blog':
                          await fetchData('/blog', 'posts');
                          break;
                        case 'quotes':
                          await fetchData('/quotes', 'quotes');
                          break;
                      }
                    };
                    loadData();
                  }}
                  className="mt-2 text-sm text-red-700 underline hover:text-red-600"
                >
                  Réessayer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {loading[activeTab] && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2 text-gray-600">Chargement...</span>
          </div>
        )}

        {!loading[activeTab] && (
          <>
            {activeTab === 'services' && (
              <ServicesManager services={data.services || []} />
            )}

            {activeTab === 'projects' && (
              <ProjectsManager projects={data.projects || []} />
            )}

            {activeTab === 'blog' && (
              <BlogManager posts={data.posts || []} />
            )}

            {activeTab === 'quotes' && (
              <QuotesManager quotes={data.quotes || []} />
            )}

            {activeTab === 'settings' && (
              <SettingsManager />
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Gestionnaire simplifié des services
const ServicesManager = ({ services }) => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Gestion des services
        </h2>
        <p className="text-gray-600">
          Gérez vos services et prestations
        </p>
      </div>

      {services.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-4xl mb-4">🛠️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Aucun service configuré
          </h3>
          <p className="text-gray-600">
            Commencez par ajouter vos premiers services
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <img
                src={getImageUrl(service.image)}
                alt={service.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
                onError={(e) => {
                  e.target.src = '/placeholder-service.svg';
                }}
              />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {service.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {service.description}
              </p>
              {service.price && (
                <p className="text-blue-600 font-semibold">
                  {service.price}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

ServicesManager.propTypes = {
  services: PropTypes.array.isRequired
};

// Gestionnaire simplifié des projets
const ProjectsManager = ({ projects }) => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Gestion des projets
        </h2>
        <p className="text-gray-600">
          Gérez votre portfolio de projets
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Aucun projet publié
          </h3>
          <p className="text-gray-600">
            Ajoutez vos premiers projets pour montrer votre expertise
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <img
                src={getImageUrl(project.image)}
                alt={project.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
                onError={(e) => {
                  e.target.src = '/placeholder-service.svg';
                }}
              />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {project.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    ⭐ Mis en avant
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

ProjectsManager.propTypes = {
  projects: PropTypes.array.isRequired
};

// Gestionnaire simplifié du blog
const BlogManager = ({ posts }) => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Gestion du blog
        </h2>
        <p className="text-gray-600">
          Gérez vos articles de blog
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Aucun article publié
          </h3>
          <p className="text-gray-600">
            Commencez par créer votre premier article de blog
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <img
                src={getImageUrl(post.image)}
                alt={post.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
                onError={(e) => {
                  e.target.src = '/placeholder-service.svg';
                }}
              />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {post.category}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  post.published 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {post.published ? 'Publié' : 'Brouillon'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

BlogManager.propTypes = {
  posts: PropTypes.array.isRequired
};

// Gestionnaire simplifié des devis
const QuotesManager = ({ quotes }) => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Gestion des devis
        </h2>
        <p className="text-gray-600">
          Gérez les demandes de devis de vos clients
        </p>
      </div>

      {quotes.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-4xl mb-4">💬</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Aucun devis reçu
          </h3>
          <p className="text-gray-600">
            Les demandes de devis apparaîtront ici
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {quotes.map((quote) => (
            <div key={quote.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {quote.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {quote.email}
                  </p>
                </div>
                <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {quote.status || 'En attente'}
                </span>
              </div>
              <p className="text-gray-700 mb-4">
                {quote.message}
              </p>
              {quote.serviceName && (
                <p className="text-sm text-gray-600">
                  <strong>Service demandé:</strong> {quote.serviceName}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

QuotesManager.propTypes = {
  quotes: PropTypes.array.isRequired
};

// Gestionnaire des paramètres
const SettingsManager = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Paramètres du site
        </h2>
        <p className="text-gray-600">
          Configurez les paramètres de votre site web
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Configuration générale
        </h3>
        <p className="text-gray-600">
          Les paramètres du site seront bientôt disponibles ici.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
