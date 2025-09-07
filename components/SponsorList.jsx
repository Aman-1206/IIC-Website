"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

export default function SponsorList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const controls = useAnimation();
  const [visibleCount] = useState(6);
  const animationRef = useRef(null);

  useEffect(() => {
    const loadSponsor = async () => {
      try {
        const res = await fetch("/api/sponsor");
        if (!res.ok) throw new Error("API request failed");

        const data = await res.json();
        if (data.length > 0) {
          setItems([...data, ...data, ...data]);
        }
      } catch (err) {
        console.error("Failed to load events:", err);
      } finally {
        setLoading(false);
      }
    };

    loadSponsor();
  }, []);

 useEffect(() => {
    if (!containerRef.current || items.length === 0) return;

    const startAnimation = () => {
      const container = containerRef.current;
      const itemWidth = 256 + 32; // w-64 (256px) + gap-8 (32px)
      const scrollDistance = (items.length / 3) * itemWidth;
      const duration = 32;

      const sequence = async () => {
        await controls.start({
          x: -scrollDistance,
          transition: { duration, ease: "linear" },
        });
        controls.set({ x: 0 });
        animationRef.current = requestAnimationFrame(sequence);
      };

      animationRef.current = requestAnimationFrame(sequence);
    };

    // Add small delay to ensure DOM is ready
    const animationTimeout = setTimeout(startAnimation, 100);

    const handleResize = () => {
      cancelAnimationFrame(animationRef.current);
      controls.stop();
      controls.set({ x: 0 });
      startAnimation();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(animationTimeout);
      cancelAnimationFrame(animationRef.current);
      controls.stop();
      window.removeEventListener("resize", handleResize);
    };
  }, [items, controls]);

  if (loading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white bg-orange-600 py-3">
            Our Sponsors
          </h2>
        </div>
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white bg-orange-600 py-3">
          Our Sponsors
        </h2>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10" />

          <div className="overflow-x-hidden py-1">
            <motion.div
              ref={containerRef}
              className="flex gap-8"
              animate={controls}
              style={{ width: "fit-content" }}
            >
              {items.map((item, index) => (
                <motion.div
                  key={`${item._id}-${index}`}
                  className="flex-shrink-0 w-64 bg-white rounded-xl shadow-md overflow-hidden transition-all hover:scale-105 hover:shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="h-28 flex items-center justify-center p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="p-4 border-t border-gray-100">
                    <h3 className="text-lg font-semibold text-center text-gray-800">
                      {item.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
