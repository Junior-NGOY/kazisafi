import { useState } from 'react';
import { useServices, useProjects, useBlog, useUpload, useQuotes } from '../../hooks/useApi';
import PropTypes from 'prop-types';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('services');
  const { services, createService, updateService, deleteService, refetch: refetchServices } = useServices();
  const { projects, createProject, updateProject, deleteProject, refetch: refetchProjects } = useProjects();
  const { posts, createPost, updatePost, deletePost, refetch: refetchPosts } = useBlog();
  const { uploadImage, uploading } = useUpload();
  const { quotes, updateQuote, deleteQuote, refetch: refetchQuotes } = useQuotes();

  // Wrappers pour gérer le refetch automatique
  const handleCreateService = async (serviceData) => {
    await createService(serviceData);
    refetchServices();
  };

  const handleUpdateService = async (id, serviceData) => {
    await updateService(id, serviceData);
    refetchServices();
  };

  const handleDeleteService = async (id) => {
    await deleteService(id);
    refetchServices();
  };

  const handleCreateProject = async (projectData) => {
    await createProject(projectData);
    refetchProjects();
  };

  const handleUpdateProject = async (id, projectData) => {
    await updateProject(id, projectData);
    refetchProjects();
  };

  const handleDeleteProject = async (id) => {
    await deleteProject(id);
    refetchProjects();
  };

  const handleCreatePost = async (postData) => {
    await createPost(postData);
    refetchPosts();
  };

  const handleUpdatePost = async (id, postData) => {
    await updatePost(id, postData);
    refetchPosts();
  };

  const handleDeletePost = async (id) => {
    await deletePost(id);
    refetchPosts();
  };

  const handleUpdateQuote = async (id, quoteData) => {
    await updateQuote(id, quoteData);
    refetchQuotes();
  };

  const handleDeleteQuote = async (id) => {
    await deleteQuote(id);
    refetchQuotes();
  };

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
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
              Voir le site
            </button>
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

        {/* Content */}
        {activeTab === 'services' && (
          <ServicesManager 
            services={services}
            onCreate={handleCreateService}
            onUpdate={handleUpdateService}
            onDelete={handleDeleteService}
            uploadImage={uploadImage}
            uploading={uploading}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsManager 
            projects={projects}
            onCreate={handleCreateProject}
            onUpdate={handleUpdateProject}
            onDelete={handleDeleteProject}
            uploadImage={uploadImage}
            uploading={uploading}
          />
        )}

        {activeTab === 'blog' && (
          <BlogManager 
            posts={posts}
            onCreate={handleCreatePost}
            onUpdate={handleUpdatePost}
            onDelete={handleDeletePost}
            uploadImage={uploadImage}
            uploading={uploading}
          />
        )}

        {activeTab === 'quotes' && (
          <QuotesManager 
            quotes={quotes}
            onUpdate={handleUpdateQuote}
            onDelete={handleDeleteQuote}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsManager />
        )}
      </div>
    </div>
  );
};

// Gestionnaire des services
const ServicesManager = ({ services, onCreate, onUpdate, onDelete, uploadImage, uploading }) => {
  const [editingService, setEditingService] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      if (editingService) {
        await onUpdate(editingService.id, formData);
      } else {
        await onCreate(formData);
      }
      setShowForm(false);
      setEditingService(null);
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Gestion des Services</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Ajouter un Service
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src={service.image} 
              alt={service.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{service.description}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingService(service);
                    setShowForm(true);
                  }}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-3 rounded text-sm"
                >
                  Modifier
                </button>
                <button
                  onClick={() => {
                    if (confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
                      onDelete(service.id);
                    }
                  }}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded text-sm"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Service Form Modal */}
      {showForm && (
        <ServiceForm
          service={editingService}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingService(null);
          }}
          uploadImage={uploadImage}
          uploading={uploading}
        />
      )}
    </div>
  );
};

ServicesManager.propTypes = {
  services: PropTypes.array.isRequired,
  onCreate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired
};

// Formulaire de service
const ServiceForm = ({ service, onSubmit, onCancel, uploadImage, uploading }) => {
  const [formData, setFormData] = useState({
    name: service?.name || '',
    title: service?.title || '',
    description: service?.description || '',
    longDescription: service?.longDescription || '',
    image: service?.image || '',
    icon: service?.icon || '',
    price: service?.price || '',
    active: service?.active ?? true,
  });

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const imageUrl = await uploadImage(file, 'services');
        setFormData({ ...formData, image: imageUrl });
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">
          {service ? 'Modifier le Service' : 'Nouveau Service'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom (URL)</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Titre</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description courte</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              rows="2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description longue</label>
            <textarea
              value={formData.longDescription}
              onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              rows="4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 block w-full"
              disabled={uploading}
            />
            {formData.image && (
              <img src={formData.image} alt="Preview" className="mt-2 h-32 object-cover rounded" />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Icône (emoji)</label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="🧹"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Prix</label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Sur devis"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="mr-2"
            />
            <label className="text-sm font-medium text-gray-700">Service actif</label>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={uploading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              {uploading ? 'Chargement...' : 'Enregistrer'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ServiceForm.propTypes = {
  service: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    longDescription: PropTypes.string,
    image: PropTypes.string,
    icon: PropTypes.string,
    price: PropTypes.string,
    active: PropTypes.bool
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired
};

// Gestionnaire des projets
const ProjectsManager = ({ projects, onCreate, onUpdate, onDelete, uploadImage, uploading }) => {
  const [editingProject, setEditingProject] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      if (editingProject) {
        await onUpdate(editingProject.id, formData);
      } else {
        await onCreate(formData);
      }
      setShowForm(false);
      setEditingProject(null);
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Gestion des Projets</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Ajouter un Projet
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{project.description}</p>
              <p className="text-sm text-gray-500 mb-4">
                {project.category} • {new Date(project.createdAt).toLocaleDateString('fr-FR')}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingProject(project);
                    setShowForm(true);
                  }}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-3 rounded text-sm"
                >
                  Modifier
                </button>
                <button
                  onClick={() => {
                    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
                      onDelete(project.id);
                    }
                  }}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded text-sm"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Form Modal */}
      {showForm && (
        <ProjectForm
          project={editingProject}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingProject(null);
          }}
          uploadImage={uploadImage}
          uploading={uploading}
        />
      )}
    </div>
  );
};

ProjectsManager.propTypes = {
  projects: PropTypes.array.isRequired,
  onCreate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired
};

// Formulaire de projet
const ProjectForm = ({ project, onSubmit, onCancel, uploadImage, uploading }) => {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    longDescription: project?.longDescription || '',
    image: project?.image || '',
    category: project?.category || 'nettoyage',
    location: project?.location || '',
    completedAt: project?.completedAt || '',
    tags: project?.tags?.join(', ') || '',
    featured: project?.featured ?? false,
  });

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const imageUrl = await uploadImage(file, 'projects');
        setFormData({ ...formData, image: imageUrl });
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      completedAt: formData.completedAt ? new Date(formData.completedAt).toISOString() : null,
    };
    onSubmit(submitData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">
          {project ? 'Modifier le Projet' : 'Nouveau Projet'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Titre</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description courte</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              rows="2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description détaillée</label>
            <textarea
              value={formData.longDescription}
              onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              rows="4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Catégorie</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="nettoyage">Nettoyage</option>
              <option value="buanderie">Buanderie</option>
              <option value="piscine">Piscine</option>
              <option value="fumigation">Fumigation</option>
              <option value="autre">Autre</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Lieu</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Kinshasa, RDC"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date de réalisation</label>
            <input
              type="date"
              value={formData.completedAt.split('T')[0] || ''}
              onChange={(e) => setFormData({ ...formData, completedAt: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tags (séparés par des virgules)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="nettoyage, résidentiel, villa"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 block w-full"
              disabled={uploading}
            />
            {formData.image && (
              <img src={formData.image} alt="Preview" className="mt-2 h-32 object-cover rounded" />
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="mr-2"
            />
            <label className="text-sm font-medium text-gray-700">Projet mis en avant</label>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={uploading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              {uploading ? 'Chargement...' : 'Enregistrer'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ProjectForm.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    longDescription: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    location: PropTypes.string,
    completedAt: PropTypes.string,
    tags: PropTypes.array,
    featured: PropTypes.bool
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired
};

// Gestionnaire des articles de blog
const BlogManager = ({ posts, onCreate, onUpdate, onDelete, uploadImage, uploading }) => {
  const [editingPost, setEditingPost] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      if (editingPost) {
        await onUpdate(editingPost.id, formData);
      } else {
        await onCreate(formData);
      }
      setShowForm(false);
      setEditingPost(null);
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Gestion du Blog</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Nouvel Article
        </button>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex gap-6">
              {post.image && (
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                />
              )}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      post.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.published ? 'Publié' : 'Brouillon'}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-2">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {post.category} • {formatDate(post.createdAt)}
                    {post.tags && post.tags.length > 0 && (
                      <span className="ml-2">
                        {post.tags.map(tag => (
                          <span key={tag} className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs mr-1">
                            {tag}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingPost(post);
                        setShowForm(true);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded text-sm"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
                          onDelete(post.id);
                        }
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Aucun article publié
          </h3>
          <p className="text-gray-600">
            Commencez par créer votre premier article de blog
          </p>
        </div>
      )}

      {/* Blog Form Modal */}
      {showForm && (
        <BlogForm
          post={editingPost}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingPost(null);
          }}
          uploadImage={uploadImage}
          uploading={uploading}
        />
      )}
    </div>
  );
};

BlogManager.propTypes = {
  posts: PropTypes.array.isRequired,
  onCreate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired
};

// Formulaire d'article de blog
const BlogForm = ({ post, onSubmit, onCancel, uploadImage, uploading }) => {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    image: post?.image || '',
    category: post?.category || 'conseils',
    tags: post?.tags?.join(', ') || '',
    published: post?.published ?? false,
  });

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const imageUrl = await uploadImage(file, 'blog');
        setFormData({ ...formData, image: imageUrl });
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[àáâãäå]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôõö]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData({ 
      ...formData, 
      title, 
      slug: formData.slug || generateSlug(title)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      slug: formData.slug || generateSlug(formData.title),
    };
    onSubmit(submitData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">
          {post ? 'Modifier l\'Article' : 'Nouvel Article'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Titre</label>
              <input
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Slug (URL)</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Résumé</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              rows="2"
              placeholder="Un bref résumé de l'article..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contenu</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              rows="12"
              placeholder="Rédigez votre article ici..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Catégorie</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="conseils">Conseils</option>
                <option value="actualites">Actualités</option>
                <option value="temoignages">Témoignages</option>
                <option value="tutoriels">Tutoriels</option>
                <option value="projets">Projets</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tags (séparés par des virgules)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="nettoyage, conseils, maison"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image de couverture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 block w-full"
              disabled={uploading}
            />
            {formData.image && (
              <img src={formData.image} alt="Preview" className="mt-2 h-32 object-cover rounded" />
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="mr-2"
            />
            <label className="text-sm font-medium text-gray-700">Publier immédiatement</label>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={uploading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              {uploading ? 'Chargement...' : 'Enregistrer'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

BlogForm.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
    excerpt: PropTypes.string,
    content: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    tags: PropTypes.array,
    published: PropTypes.bool
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired
};

const SettingsManager = () => (
  <div className="text-center py-16">
    <div className="text-6xl mb-4">⚙️</div>
    <h3 className="text-2xl font-bold text-gray-900 mb-2">Gestionnaire de paramètres</h3>
    <p className="text-gray-600">Cette section sera développée prochainement</p>
  </div>
);

// Gestionnaire des devis
const QuotesManager = ({ quotes, onUpdate, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'contacted': return 'Contacté';
      case 'completed': return 'Terminé';
      case 'cancelled': return 'Annulé';
      default: return status;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'normal': return 'text-blue-600';
      case 'low': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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

      {!quotes || quotes.length === 0 ? (
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
        <div className="grid gap-6">
          {quotes.map((quote) => (
            <div
              key={quote.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {quote.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(quote.createdAt)}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(quote.status)}`}>
                    {getStatusText(quote.status)}
                  </span>
                  <span className={`text-sm font-medium ${getPriorityColor(quote.priority)}`}>
                    {quote.priority === 'urgent' && '🔴'}
                    {quote.priority === 'high' && '🟠'}
                    {quote.priority === 'normal' && '🟢'}
                    {quote.priority === 'low' && '⚪'}
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Email:</span>
                  <p className="text-gray-900">{quote.email}</p>
                </div>
                {quote.phone && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Téléphone:</span>
                    <p className="text-gray-900">{quote.phone}</p>
                  </div>
                )}
              </div>

              {/* Service */}
              {quote.serviceName && (
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-500">Service demandé:</span>
                  <p className="text-gray-900">{quote.serviceName}</p>
                </div>
              )}

              {/* Message */}
              <div className="mb-4">
                <span className="text-sm font-medium text-gray-500">Message:</span>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg mt-1">
                  {quote.message}
                </p>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-4 border-t border-gray-200">
                <select
                  value={quote.status}
                  onChange={(e) => onUpdate(quote.id, { status: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="pending">En attente</option>
                  <option value="contacted">Contacté</option>
                  <option value="completed">Terminé</option>
                  <option value="cancelled">Annulé</option>
                </select>
                
                <a
                  href={`mailto:${quote.email}?subject=Re: Demande de devis - ${quote.serviceName || 'Kazisafi'}&body=Bonjour ${quote.name},%0D%0A%0D%0ANous avons bien reçu votre demande de devis.%0D%0A%0D%0ACordialement,%0D%0AÉquipe Kazisafi%0D%0ATél: +243 811 632 595`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                >
                  Répondre par email
                </a>

                {quote.phone && (
                  <a
                    href={`tel:${quote.phone}`}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                  >
                    Appeler
                  </a>
                )}

                <button
                  onClick={() => {
                    if (confirm('Êtes-vous sûr de vouloir supprimer ce devis ?')) {
                      onDelete(quote.id);
                    }
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

QuotesManager.propTypes = {
  quotes: PropTypes.array,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default AdminDashboard;
