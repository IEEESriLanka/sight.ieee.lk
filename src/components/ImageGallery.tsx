import { motion } from 'framer-motion';
import React, { useState } from 'react';
import ImageModal from './ImageModal';

interface ImageGalleryProps {
  images: string[];
  alt: string;
  title: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, alt, title }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Don't render if no images or only one image (handled by main image)
  if (!images || images.length <= 1) {
    return null;
  }

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToIndex = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((image, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={() => openModal(index)}
              className="relative aspect-square rounded-lg overflow-hidden group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <img
                src={image}
                alt={`${alt} - Image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  const container = target.parentElement!;
                  container.innerHTML = `
                    <div class="w-full h-full bg-gray-200 flex items-center justify-center">
                      <div class="text-gray-500 text-xs text-center p-2">
                        <div class="mb-1">📷</div>
                        Image ${index + 1}
                      </div>
                    </div>
                  `;
                }}
              />
              {/* Overlay with hover effect */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </div>
                </div>
              </div>
              {/* Image number indicator */}
              <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                {index + 1}
              </div>
            </motion.button>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-3">
          Click on any image to view in full size • {images.length} photos
        </p>
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        images={images}
        currentIndex={currentImageIndex}
        onPrevious={goToPrevious}
        onNext={goToNext}
        onGoToIndex={goToIndex}
        alt={alt}
      />
    </>
  );
};

export default ImageGallery;