import { useState } from 'react';
import PropTypes from 'prop-types';
import { validateImage, resizeImage, formatFileSize, getImagePreview } from '../utils/imageUtils';

const ImageUploader = ({ 
  onImageUpload, 
  onError,
  currentImage = null,
  folder = 'general',
  maxSize = 5 * 1024 * 1024, // 5MB
  maxWidth = 1920,
  maxHeight = 1080,
  autoResize = false,
  className = ""
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage);
  const [fileInfo, setFileInfo] = useState(null);

  const handleFileSelect = async (file) => {
    if (!file) return;

    try {
      setUploading(true);
      setFileInfo(null);

      // Validation de l'image
      const validation = await validateImage(file, { maxSize, maxWidth, maxHeight });
      
      if (!validation.valid) {
        if (autoResize && validation.dimensions && 
            (validation.dimensions.width > maxWidth || validation.dimensions.height > maxHeight)) {
          
          // Tentative de redimensionnement automatique
          try {
            const resizedFile = await resizeImage(file, { maxWidth, maxHeight });
            file = resizedFile;
            
            // Re-validation après redimensionnement
            const revalidation = await validateImage(file, { maxSize, maxWidth, maxHeight });
            if (!revalidation.valid) {
              onError?.(revalidation.error);
              return;
            }
          } catch (resizeError) {
            onError?.('Erreur lors du redimensionnement automatique: ' + resizeError.message);
            return;
          }
        } else {
          onError?.(validation.error);
          return;
        }
      }

      // Générer l'aperçu
      const previewUrl = await getImagePreview(file);
      setPreview(previewUrl);
      
      // Informations du fichier
      setFileInfo({
        name: file.name,
        size: formatFileSize(file.size),
        dimensions: validation.dimensions
      });

      // Upload du fichier
      await onImageUpload(file, folder);

    } catch (error) {
      console.error('Error handling file:', error);
      onError?.('Erreur lors du traitement du fichier: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    handleFileSelect(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Zone de drop */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-6 text-center transition-colors
          ${isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${uploading ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !uploading && document.getElementById('image-upload-input').click()}
      >
        <input
          id="image-upload-input"
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
          disabled={uploading}
        />
        
        {uploading ? (
          <div className="space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-sm text-gray-600">Upload en cours...</p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-4xl">📸</div>
            <p className="text-sm text-gray-600">
              Glissez-déposez une image ici ou cliquez pour sélectionner
            </p>
            <p className="text-xs text-gray-500">
              Maximum: {formatFileSize(maxSize)} • {maxWidth}x{maxHeight}px
            </p>
          </div>
        )}
      </div>

      {/* Aperçu de l'image */}
      {preview && (
        <div className="space-y-2">
          <img
            src={preview}
            alt="Aperçu"
            className="w-full h-48 object-cover rounded-lg border"
          />
          
          {fileInfo && (
            <div className="text-xs text-gray-600 space-y-1">
              <p><strong>Fichier:</strong> {fileInfo.name}</p>
              <p><strong>Taille:</strong> {fileInfo.size}</p>
              {fileInfo.dimensions && (
                <p><strong>Dimensions:</strong> {fileInfo.dimensions.width}x{fileInfo.dimensions.height}px</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Conseils d'optimisation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-800 mb-2">
          💡 Conseils pour de meilleures performances:
        </h4>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Utilisez des images au format JPG pour les photos</li>
          <li>• Utilisez PNG pour les images avec transparence</li>
          <li>• Optimisez vos images avant upload pour un chargement plus rapide</li>
          <li>• Dimensions recommandées: {maxWidth}x{maxHeight}px maximum</li>
        </ul>
      </div>
    </div>
  );
};

ImageUploader.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
  onError: PropTypes.func,
  currentImage: PropTypes.string,
  folder: PropTypes.string,
  maxSize: PropTypes.number,
  maxWidth: PropTypes.number,
  maxHeight: PropTypes.number,
  autoResize: PropTypes.bool,
  className: PropTypes.string
};

export default ImageUploader;
