import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:3001/api';

// Hook générique pour les appels API
export const useApi = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (customEndpoint = endpoint, customOptions = {}) => {
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
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (endpoint && options.autoFetch !== false) {
      fetchData();
    }
  }, [endpoint]);

  return { data, loading, error, refetch: fetchData };
};

// Hook spécifique pour les services
export const useServices = () => {
  const { data, loading, error, refetch } = useApi('/services');
  
  const createService = async (serviceData) => {
    return await fetch(`${API_BASE_URL}/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(serviceData),
    }).then(res => res.json());
  };

  const updateService = async (id, serviceData) => {
    return await fetch(`${API_BASE_URL}/services/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(serviceData),
    }).then(res => res.json());
  };

  const deleteService = async (id) => {
    return await fetch(`${API_BASE_URL}/services/${id}`, {
      method: 'DELETE',
    }).then(res => res.json());
  };

  return {
    services: data?.data || [],
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
  const { data, loading, error, refetch } = useApi('/projects');
  
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
    projects: data?.data || [],
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
  const { data, loading, error, refetch } = useApi('/blog');
  
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
    posts: data?.data || [],
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
    const settings = data?.data || [];
    const setting = settings.find(s => s.key === key);
    return setting ? setting.value : null;
  };

  return {
    settings: data?.data || [],
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
      const formData = new FormData();
      formData.append('image', file);
      formData.append('folder', folder);
      
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const result = await response.json();
      return result.url;
    } catch (err) {
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
  const { data, loading, error, refetch } = useApi('/quotes');
  
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
    quotes: data?.data || [],
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
