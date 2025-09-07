"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const FeaturedEvents = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const handleClick = () => {
    router.push("/events");
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        setUpcomingEvents(data.upcoming.slice(0, 4)); // Only top 4 upcoming
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading)
    return (
      <section className="py-6 sm:py-2 px-4 sm:px-6 lg:px-20">
        <div className="max-w-screen-[1200px] mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-[#003566]">
            Featured <span className="text-orange-600">Events</span>
          </h2>
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          </div>
        </div>
      </section>
    );

    if(!upcomingEvents.length) {
      return (
        <section className="py-6 sm:py-2 px-4 sm:px-6 lg:px-20">
          <div className="max-w-screen-[1200px] mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-[#003566]">
              Featured <span className="text-orange-600">Events</span>
            </h2>
            <p className="text-gray-600 text-xl mb-6">
              No events found.
            </p>
          </div>
        </section>
      );
    }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-6 sm:py-2 px-4 sm:px-6 lg:px-20">
      <div className="max-w-screen-[1200px] mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-[#003566]">
          Featured <span className="text-orange-600">Events</span>
        </h2>

        {upcomingEvents.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-50px" }}
            className="flex flex-wrap justify-center gap-4 sm:gap-6 cursor-pointer"
          >
            {upcomingEvents.map((event, index) => (
              <motion.div
                onClick={() => handleClick()}
                key={index}
                variants={item}
                className="w-full sm:w-[calc(50%-12px)] md:w-[calc(25%-18px)] lg:w-[calc(25%-24px)]"
              >
                <img
                  src={event.primaryImage}
                  alt={event.title || `Event ${index + 1}`}
                  className="w-full h-auto rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-500 mt-4">
            No upcoming events yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default FeaturedEvents;
