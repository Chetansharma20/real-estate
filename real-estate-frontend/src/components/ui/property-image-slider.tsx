"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PropertyImageSliderProps {
  images: { url: string; alt?: string }[];
  title: string;
  disableHoverPause?: boolean;
  priority?: boolean;
}

export function PropertyImageSlider({ images, title, disableHoverPause = false, priority = false }: PropertyImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slide effect
  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500); // Change image every 3.5 seconds

    return () => clearInterval(timer);
  }, [images.length]);

  const goToNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToPrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToDot = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(index);
  };

  // If there are no images, show a fallback
  if (!images || images.length === 0) {
    return (
      <Image
        src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80"
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        priority={priority}
      />
    );
  }

  // If only 1 image, don't show slider controls
  if (images.length === 1) {
    return (
      <Image
        src={images[0].url}
        alt={images[0].alt || title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        priority={priority}
      />
    );
  }

  return (
    <div
      className="relative w-full h-full overflow-hidden group/slider"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex].url}
            alt={images[currentIndex].alt || `${title} - Image ${currentIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority={priority && currentIndex === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows (Visible on hover) */}
      <button
        onClick={goToPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-100 sm:opacity-0 sm:group-hover/slider:opacity-100 hover:bg-white/40 transition-all duration-300 z-10"
        aria-label="Previous image"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-100 sm:opacity-0 sm:group-hover/slider:opacity-100 hover:bg-white/40 transition-all duration-300 z-10"
        aria-label="Next image"
      >
        <ChevronRight size={16} />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => goToDot(e, idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "bg-white w-4" : "bg-white/50 w-1.5"
            }`}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
