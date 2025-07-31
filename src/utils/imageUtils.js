// Utilitaires pour la validation et gestion des images

/**
 * Valide une image selon les critères de taille et dimensions
 * @param {File} file - Le fichier image à valider
 * @param {Object} options - Options de validation
 * @param {number} options.maxSize - Taille maximum en bytes (défaut: 5MB)
 * @param {number} options.maxWidth - Largeur maximum en pixels (défaut: 1920)
 * @param {number} options.maxHeight - Hauteur maximum en pixels (défaut: 1080)
 * @returns {Promise<{valid: boolean, error?: string, dimensions?: {width: number, height: number}}>}
 */
export const validateImage = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB par défaut
    maxWidth = 1920,
    maxHeight = 1080
  } = options;

  return new Promise((resolve) => {
    // Validation de la taille du fichier
    if (file.size > maxSize) {
      const sizeInMB = (maxSize / (1024 * 1024)).toFixed(1);
      resolve({
        valid: false,
        error: `Le fichier est trop volumineux. Taille maximum : ${sizeInMB}MB`
      });
      return;
    }

    // Validation du type de fichier
    if (!file.type.startsWith('image/')) {
      resolve({
        valid: false,
        error: 'Seuls les fichiers image sont autorisés'
      });
      return;
    }

    // Validation des dimensions
    const img = new Image();
    
    img.onload = () => {
      const dimensions = {
        width: img.width,
        height: img.height
      };

      if (img.width > maxWidth || img.height > maxHeight) {
        resolve({
          valid: false,
          error: `Image trop grande. Dimensions maximum : ${maxWidth}x${maxHeight}px. Votre image : ${img.width}x${img.height}px`,
          dimensions
        });
        return;
      }

      resolve({
        valid: true,
        dimensions
      });
    };
    
    img.onerror = () => {
      resolve({
        valid: false,
        error: 'Erreur lors de la lecture de l\'image'
      });
    };
    
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Redimensionne une image si elle dépasse les dimensions spécifiées
 * @param {File} file - Le fichier image à redimensionner
 * @param {Object} options - Options de redimensionnement
 * @param {number} options.maxWidth - Largeur maximum
 * @param {number} options.maxHeight - Hauteur maximum
 * @param {number} options.quality - Qualité de compression (0-1)
 * @returns {Promise<File>} - Le fichier redimensionné
 */
export const resizeImage = (file, options = {}) => {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.8
  } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Calculer les nouvelles dimensions en gardant le ratio
      let { width, height } = img;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Dessiner l'image redimensionnée
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convertir en blob
      canvas.toBlob((blob) => {
        if (blob) {
          // Créer un nouveau fichier avec le même nom
          const resizedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now()
          });
          resolve(resizedFile);
        } else {
          reject(new Error('Erreur lors du redimensionnement'));
        }
      }, file.type, quality);
    };
    
    img.onerror = () => {
      reject(new Error('Erreur lors de la lecture de l\'image'));
    };
    
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Compresse une image en réduisant sa qualité
 * @param {File} file - Le fichier image à comprimer
 * @param {number} quality - Qualité de compression (0-1)
 * @returns {Promise<File>} - Le fichier comprimé
 */
export const compressImage = (file, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = img.width;
      canvas.height = img.height;
      
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const compressedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now()
          });
          resolve(compressedFile);
        } else {
          reject(new Error('Erreur lors de la compression'));
        }
      }, file.type, quality);
    };
    
    img.onerror = () => {
      reject(new Error('Erreur lors de la lecture de l\'image'));
    };
    
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Formate la taille d'un fichier en format lisible
 * @param {number} bytes - Taille en bytes
 * @returns {string} - Taille formatée (ex: "2.5 MB")
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Génère un aperçu de l'image sous forme de data URL
 * @param {File} file - Le fichier image
 * @returns {Promise<string>} - L'URL de données de l'image
 */
export const getImagePreview = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    
    reader.onerror = () => {
      reject(new Error('Erreur lors de la lecture du fichier'));
    };
    
    reader.readAsDataURL(file);
  });
};
