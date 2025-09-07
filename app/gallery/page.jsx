"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

export default function GallerySection() {
  const [galleryEvents, setGalleryEvents] = useState([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef(null);

  const currentEvent = galleryEvents[currentEventIndex];

  // Fetch gallery data from backend
  useEffect(() => {
    setIsLoading(true);
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        setGalleryEvents(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load gallery", err);
        setIsLoading(false);
      });
  }, []);

  // Auto slide every 5s
  useEffect(() => {
    if (!currentEvent) return;
    
    const startAutoSlide = () => {
      intervalRef.current = window.setInterval(() => {
        nextImage();
      }, 5000);
    };
    
    startAutoSlide();
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [currentEventIndex, currentImageIndex, currentEvent]);

  const nextImage = () => {
    if (!currentEvent?.images?.length) return;
    setCurrentImageIndex((prev) =>
      prev === currentEvent.images.length - 1 ? 0 : prev + 1
    );
    resetInterval();
  };

  const prevImage = () => {
    if (!currentEvent?.images?.length) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? currentEvent.images.length - 1 : prev - 1
    );
    resetInterval();
  };

  const nextEvent = () => {
    setCurrentEventIndex((prev) =>
      prev === galleryEvents.length - 1 ? 0 : prev + 1
    );
    setCurrentImageIndex(0);
    resetInterval();
  };

  const prevEvent = () => {
    setCurrentEventIndex((prev) =>
      prev === 0 ? galleryEvents.length - 1 : prev - 1
    );
    setCurrentImageIndex(0);
    resetInterval();
  };

  const resetInterval = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      nextImage();
    }, 5000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-[#003566]/20 rounded-full mb-4"></div>
          <p className="text-gray-500 text-lg">Loading gallery...</p>
        </div>
      </div>
    );
  }

  if (!galleryEvents.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 max-w-md bg-white rounded-xl shadow-lg">
          <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Gallery Events Yet
          </h3>
          <p className="text-gray-500">
            There are no events in the gallery. Check back later or add some
            events.
          </p>
        </div>
      </div>
    );
  }

  if (!galleryEvents[currentEventIndex]?.images?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 max-w-md bg-white rounded-xl shadow-lg">
          <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Images for This Event
          </h3>
          <p className="text-gray-500">
            This event doesn't have any images yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="py-16 px-4 md:px-10 bg-gradient-to-b from-[#003566]/10 to-[#003566]/5 min-h-screen">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-[#003566] mb-4"
          >
            Our <span className="text-orange-600">Gallery</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="max-w-3xl mx-auto text-lg text-gray-600"
          >
            Relive the unforgettable moments from our events. Each image tells a
            story of innovation, collaboration, and celebration.
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Event Navigation */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={prevEvent}
              className="p-2 rounded-full hover:bg-white/50 transition-all shadow-md hover:shadow-lg"
              aria-label="Previous event"
            >
              <ChevronLeft className="w-8 h-8 text-[#003566]" />
            </button>

            <motion.div 
              key={currentEventIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mx-4 min-w-[200px]"
            >
              <div className="inline-block relative">
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#003566] relative z-10 px-6 py-2">
                  {currentEvent.title}
                </h3>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full transform scale-105 opacity-20"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-[#003566] to-blue-300 rounded-full"></div>
              </div>
              <p className="text-gray-600 mt-2 font-medium italic">
                {new Date(currentEvent.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </motion.div>

            <button
              onClick={nextEvent}
              className="p-2 rounded-full hover:bg-white/50 transition-all shadow-md hover:shadow-lg"
              aria-label="Next event"
            >
              <ChevronRight className="w-8 h-8 text-[#003566]" />
            </button>
          </div>

          {/* Image Carousel */}
          <div className="relative h-80 md:h-[38rem] w-full overflow-hidden rounded-2xl shadow-2xl bg-gray-100">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentEventIndex}-${currentImageIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <img
                  src={currentEvent.images[currentImageIndex]}
                  alt={`Event image ${currentImageIndex + 1}`}
                  className="object-contain w-full h-full"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/800x500?text=Image+Not+Available";
                  }}
                />
              </motion.div>
            </AnimatePresence>

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-[#003566]" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-[#003566]" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {currentEvent.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentImageIndex(index);
                    resetInterval();
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === currentImageIndex
                      ? "bg-[#003566] w-8"
                      : "bg-white/50 w-4"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>

            {/* Image counter */}
            <div className="absolute bottom-6 right-6 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {currentEvent.images.length}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}