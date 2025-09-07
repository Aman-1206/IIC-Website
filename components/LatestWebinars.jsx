"use client";
import { useEffect, useState } from "react";
import WebinarCard from "@/components/WebinarCard";

export default function LatestWebinars({ title, sub_title }) {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWebinar = async () => {
      try {
        const res = await fetch("/api/webinar");
        if (!res.ok) throw new Error("API request failed");

        const data = await res.json();
        setWebinars(data || []);
      } catch (err) {
        console.error("Failed to load events:", err);
      } finally {
        setLoading(false);
      }
    };

    loadWebinar();
  }, []);

  if (loading) {
    return (
      <div className="px-4 py-8">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-8">
          {title} <span className="text-orange-600">{sub_title}</span>
        </h2>
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <h2 className="text-4xl font-bold text-center text-blue-900 mb-8">
        {title} <span className="text-orange-600">{sub_title}</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {webinars.map((webinar) => (
          <WebinarCard key={webinar._id} {...webinar} />
        ))}
      </div>
    </div>
  );
}
