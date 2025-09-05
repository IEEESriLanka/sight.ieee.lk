import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import React, { useEffect } from 'react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onGoToIndex: (index: number) => void;
  alt: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onPrevious,
  onNext,
  onGoToIndex,
  alt
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Handle arrow keys
  useEffect(() => {
    const handleArrowKeys = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        onPrevious();
      } else if (e.key === 'ArrowRight') {
        onNext();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleArrowKeys);
    }

    return () => {
      document.removeEventListener('keydown', handleArrowKeys);
    };
  }, [isOpen, onPrevious, onNext]);

  if (!isOpen || images.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-60 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute top-4 left-4 z-60 px-3 py-1 bg-black bg-opacity-50 text-white text-sm rounded-full">
            {currentIndex + 1} of {images.length}
          </div>
        )}

        {/* Previous button */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-60 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        {/* Next button */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-60 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}

        {/* Image */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl max-h-[90vh] mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={images[currentIndex]}
            alt={`${alt} - Image ${currentIndex + 1}`}
            className="w-full h-full object-contain rounded-lg"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/fallback-image.jpg'; // You can add a fallback image
            }}
          />
        </motion.div>

        {/* Thumbnail navigation for multiple images */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-60">
            <div className="flex space-x-2 bg-black bg-opacity-50 rounded-lg p-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    onGoToIndex(index);
                  }}
                  className={`w-12 h-12 rounded overflow-hidden transition-opacity ${
                    index === currentIndex ? 'opacity-100 ring-2 ring-white' : 'opacity-60 hover:opacity-80'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageModal;