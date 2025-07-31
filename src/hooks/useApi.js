import { useState, useEffect, useCallback } from 'react';

// Configuration de l'URL de l'API selon l'environnement
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// Cache simple pour éviter les rechargements inutiles
const apiCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Hook générique pour les appels API
export const useApi = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasAttempted, setHasAttempted] = useState(false);

  const fetchData = useCallback(async (customEndpoint = endpoint, customOptions = {}) => {
    if (!customEndpoint) return;
    
    const cacheKey = `${customEndpoint}_${JSON.stringify(customOptions)}`;
    const cached = apiCache.get(cacheKey);
    
    // Utiliser le cache si disponible et récent
    if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
      setData(cached.data);
      setHasAttempted(true);
      setLoading(false);
      return cached.data;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const url = `${API_BASE_URL}${customEndpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        ...options,
        ...customOptions,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Mettre en cache le résultat
      apiCache.set(cacheKey, {
        data: result,
        timestamp: Date.now()
      });
      
      setData(result);
      setHasAttempted(true);
      return result;
    } catch (err) {
      setError(err.message);
      setHasAttempted(true);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [endpoint, options]);

  useEffect(() => {
    if (endpoint && options.autoFetch !== false && !hasAttempted) {
      fetchData();
    }
  }, [endpoint, options.autoFetch, fetchData, hasAttempted]);

  return { data, loading, error, refetch: fetchData };
};

// Fonction utilitaire pour vider le cache
export const clearApiCache = (pattern = null) => {
  if (pattern) {
    // Vider seulement les entrées qui correspondent au pattern
    for (const [key] of apiCache) {
      if (key.includes(pattern)) {
        apiCache.delete(key);
      }
    }
  } else {
    // Vider tout le cache
    apiCache.clear();
  }
};

// Hook spécifique pour les services
export const useServices = () => {
  const { data, loading, error, refetch } = useApi('/services');
  
  const createService = async (serviceData) => {
    const result = await fetch(`${API_BASE_URL}/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(serviceData),
    }).then(res => res.json());
    
    // Vider le cache des services après création
    clearApiCache('/services');
    return result;
  };

  const updateService = async (id, serviceData) => {
    const result = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(serviceData),
    }).then(res => res.json());
    
    // Vider le cache des services après modification
    clearApiCache('/services');
    return result;
  };

  const deleteService = async (id) => {
    const result = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: 'DELETE',
    }).then(res => res.json());
    
    // Vider le cache des services après suppression
    clearApiCache('/services');
    return result;
  };

  return {
    services: data || [],
    loading,
    error,
    refetch,
    createService,
    updateService,
    deleteService,
  };
};

// Hook spécifique pour les projets/blog
export const useProjects = () => {
  const { data, loading, error, refetch } = useApi('/projects', { autoFetch: false });
  
  const createProject = async (projectData) => {
    return await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData),
    }).then(res => res.json());
  };

  const updateProject = async (id, projectData) => {
    return await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData),
    }).then(res => res.json());
  };

  const deleteProject = async (id) => {
    return await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
    }).then(res => res.json());
  };

  return {
    projects: data || [],
    loading,
    error,
    refetch,
    createProject,
    updateProject,
    deleteProject,
  };
};

// Hook pour les articles de blog
export const useBlog = () => {
  const { data, loading, error, refetch } = useApi('/blog', { autoFetch: false });
  
  const createPost = async (postData) => {
    return await fetch(`${API_BASE_URL}/blog`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    }).then(res => res.json());
  };

  const updatePost = async (id, postData) => {
    return await fetch(`${API_BASE_URL}/blog/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    }).then(res => res.json());
  };

  const deletePost = async (id) => {
    return await fetch(`${API_BASE_URL}/blog/${id}`, {
      method: 'DELETE',
    }).then(res => res.json());
  };

  return {
    posts: data || [],
    loading,
    error,
    refetch,
    createPost,
    updatePost,
    deletePost,
  };
};

// Hook pour les paramètres du site
export const useSettings = () => {
  const { data, loading, error, refetch } = useApi('/settings');
  
  const updateSetting = async (key, value) => {
    return await fetch(`${API_BASE_URL}/settings/${key}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value }),
    }).then(res => res.json());
  };

  const getSetting = (key) => {
    const settings = data || [];
    const setting = settings.find(s => s.key === key);
    return setting ? setting.value : null;
  };

  return {
    settings: data || [],
    loading,
    error,
    refetch,
    updateSetting,
    getSetting,
  };
};

// Hook pour l'upload d'images
export const useUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const uploadImage = async (file, folder = 'general') => {
    setUploading(true);
    setUploadError(null);
    
    try {
      console.log('Starting upload for:', file.name, 'to folder:', folder);
      
      const formData = new FormData();
      formData.append('file', file);
      
      const url = `${API_BASE_URL}/upload/${folder}`;
      console.log('Upload URL:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Upload failed with status:', response.status, 'Error:', errorText);
        throw new Error(`Upload failed: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      console.log('Upload successful:', result);
      return result.file.url;
    } catch (err) {
      console.error('Upload error:', err);
      setUploadError(err.message);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  return { uploadImage, uploading, uploadError };
};

// Hook pour les devis
export const useQuotes = () => {
  const { data, loading, error, refetch } = useApi('/quotes', { autoFetch: false });
  
  const createQuote = async (quoteData) => {
    return await fetch(`${API_BASE_URL}/quotes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quoteData),
    }).then(res => res.json());
  };

  const updateQuote = async (id, quoteData) => {
    return await fetch(`${API_BASE_URL}/quotes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quoteData),
    }).then(res => res.json());
  };

  const deleteQuote = async (id) => {
    return await fetch(`${API_BASE_URL}/quotes/${id}`, {
      method: 'DELETE',
    }).then(res => res.json());
  };

  const getQuoteStats = async () => {
    return await fetch(`${API_BASE_URL}/quotes/stats/summary`)
      .then(res => res.json());
  };

  return {
    quotes: data || [],
    loading,
    error,
    refetch,
    createQuote,
    updateQuote,
    deleteQuote,
    getQuoteStats,
  };
};

// Hook pour les contacts
export const useContacts = () => {
  const { data, loading, error, refetch } = useApi('/contact');

  const createContact = async (contactData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de l\'envoi du message');
      }

      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const markAsRead = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact/${id}/read`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de la mise à jour');
      }

      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const deleteContact = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de la suppression');
      }

      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return {
    contacts: data || [],
    loading,
    error,
    refetch,
    createContact,
    markAsRead,
    deleteContact,
  };
};

// Hook pour la galerie
export const useGallery = () => {
  const { data, loading, error, refetch } = useApi('/gallery', { autoFetch: false });
  
  const addImage = async (imageData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/gallery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(imageData),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de l\'ajout de l\'image');
      }

      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateImage = async (id, imageData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/gallery/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(imageData),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de la mise à jour de l\'image');
      }

      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const deleteImage = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/gallery/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de la suppression de l\'image');
      }

      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const getCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/gallery/categories`);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de la récupération des catégories');
      }

      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return {
    gallery: data || [],
    loading,
    error,
    refetch,
    addImage,
    updateImage,
    deleteImage,
    getCategories,
  };
};
