"use client";
import { useEffect, useState } from "react";
import EventCard from "./EventCard";

export default function UpcomingEvents() {
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetch("/api/events");
        if (!res.ok) throw new Error("API request failed");

        const data = await res.json();
        setUpcoming(data.upcoming || []);
      } catch (err) {
        console.error("Failed to load events:", err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);
  if (loading) {
    return (
      <section className="py-10 px-4 md:px-10 bg-white text-black">
      <h2 className="text-2xl md:text-4xl font-bold mb-1 text-[#003566]">Upcoming <span className="text-orange-600">Events</span></h2>
        <p className="text-gray-600 text-lg mb-6">
          Glimpses from our impactful Workshops and competitions
        </p>
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
        </div>
      </section>
    );
  }

  if (!upcoming.length)
    return (
      <section className="py-10 px-4 md:px-10 bg-white text-black">
      <h2 className="text-2xl md:text-4xl font-bold mb-1 text-[#003566]">Upcoming <span className="text-orange-600">Events</span></h2>
        <p className="text-gray-600 text-lg mb-6">
          Glimpses from our impactful Workshops and competitions
        </p>
        <div className="text-center text-xl py-10">No upcoming events</div>
      </section>
    );

  return (
    <section className="py-10 px-4 md:px-10 bg-white text-black">
      <h2 className="text-2xl md:text-4xl font-bold mb-1 text-[#003566]">Upcoming <span className="text-orange-600">Events</span></h2>
      <p className="text-gray-600 text-lg mb-6">
        Glimpses from our impactful Workshops and competitions
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {upcoming.map((event, i) => (
          <EventCard event={event} key={i} btn="Register Now" />
        ))}
      </div>
    </section>
  );
}
