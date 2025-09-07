"use client";

import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/utils/motion";
import { useEffect, useRef, useState } from "react";

const stories = [
  {
    name: "Aarav Mehta",
    image: "/assets/teams/graphics.jpg",
    title: "Launched a Successful EdTech Startup",
    description:
      "With the support from Shyam Lal College's Innovation Council, Aarav turned his passion into 'LearnEdge' — an EdTech platform now used by 20,000+ students across India. His journey from classroom projects to a thriving business inspires many budding entrepreneurs.",
    achievement: "20,000+ active users",
  },
  {
    name: "Meera Sharma",
    image: "/assets/teams/graphics.jpg",
    title: "Cracked UPSC with AIR 68",
    description:
      "Meera credits her success to the college's mentorship program, extensive library resources, and the supportive peer community that fueled her discipline. She now serves as an inspiration for civil service aspirants across the campus.",
    achievement: "All India Rank 68",
  },
  {
    name: "Rohan Verma",
    image: "/assets/teams/graphics.jpg",
    title: "Secured a Role at Google",
    description:
      "Through college coding bootcamps, hackathons, and faculty mentoring, Rohan honed his skills to land a software engineering role at Google. His projects on AI-driven solutions stood out during the recruitment process.",
    achievement: "Google India",
  },
  {
    name: "Sara Ali",
    image: "/assets/teams/graphics.jpg",
    title: "Founder of EcoThreads",
    description:
      "With seed funding and incubation support from the college, Sara launched her sustainable fashion brand that blends eco-friendly practices with contemporary design. Her venture now provides livelihood to 15 local artisans.",
    achievement: "15 artisans employed",
  },
];

const SuccessStories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const startAutoScroll = () => {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === stories.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Change slide every 5 seconds
    };

    startAutoScroll();
    return () => clearInterval(intervalRef.current);
  }, []);

  const goToStory = (index) => {
    clearInterval(intervalRef.current);
    setCurrentIndex(index);
  };

  return (
    <motion.section
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeIn("up", "spring", 0.2, 1)}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
            <span className="block text-blue-600">Success Stories</span>
            <span className="block text-gray-800">From Our Alumni</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Inspiring journeys of Shyam Lal College students who turned their dreams into reality
          </p>
        </motion.div>

        <div 
          ref={carouselRef}
          className="relative h-[600px] sm:h-[700px] md:h-[500px] lg:h-[550px] w-full overflow-hidden"
        >
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
              animate={{ 
                opacity: currentIndex === index ? 1 : 0,
                x: currentIndex === index ? 0 : index % 2 === 0 ? 100 : -100,
                zIndex: currentIndex === index ? 1 : 0
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className={`absolute inset-0 flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-6 lg:gap-12`}
            >
              <div className="w-full lg:w-1/2 h-full sm:h-80 lg:h-96 relative">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl h-full w-full">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full mb-2">
                      {story.achievement}
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2 h-full flex items-center">
                <div className={`p-4 ${index % 2 === 0 ? "lg:pl-0" : "lg:pr-0"}`}>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{story.name}</h3>
                  <p className="text-lg sm:text-xl font-semibold text-orange-600 mb-3 sm:mb-4">{story.title}</p>
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                    {story.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {stories.map((_, index) => (
            <button
              key={index}
              onClick={() => goToStory(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? "bg-blue-600 w-6" : "bg-gray-300"}`}
              aria-label={`Go to story ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default SuccessStories;