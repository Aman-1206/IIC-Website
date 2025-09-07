"use client";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InnovationCouncil() {
  const [openYear, setOpenYear] = useState(null);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const toggleYear = (year) => {
    setOpenYear(openYear === year ? null : year);
  };

  useEffect(() => {
    fetch("/api/add-past-events")
      .then((res) => res.json())
      .then((events) => {
        const grouped = {};
        events.forEach((event) => {
          if (!grouped[event.year]) grouped[event.year] = [];
          grouped[event.year].push({ name: event.name, link: event.link });
        });
        setData(grouped);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading past events...
      </div>
    );
  }

  const sortedYears = Object.keys(data).sort((a, b) => b - a); // Sort descending

  return (
    <section className="p-4 md:p-10 bg-white min-h-screen text-white">
      {sortedYears.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No past events found.</p>
      ) : (
        sortedYears.map((year, i) => (
          <div
            key={i}
            className="border border-[#003566] rounded-lg mb-4 overflow-hidden"
          >
            <button
              className="w-full flex justify-between items-center bg-[#001d3d] hover:bg-[#08246A] px-6 py-4 text-lg font-semibold text-orange-400 transition-all"
              onClick={() => toggleYear(year)}
            >
              <span>🟡 INNOVATION COUNCIL ({year})</span>
              {openYear === year ? <ChevronUp /> : <ChevronDown />}
            </button>

            {openYear === year && (
              <div className="w-full overflow-auto bg-white text-black transition-all duration-300">
                <table className="w-full min-w-[600px] text-sm border border-[#003566]">
                  <thead className="bg-[#123d66] text-white">
                    <tr>
                      <th className="py-3 px-4 text-left border-r border-white">Sr.No</th>
                      <th className="py-3 px-4 text-left border-r border-white">Name</th>
                      <th className="py-3 px-4 text-right">View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data[year].length === 0 ? (
                      <tr>
                        <td colSpan={3} className="text-center p-6 text-gray-500">
                          No records available.
                        </td>
                      </tr>
                    ) : (
                      data[year].map((item, index) => (
                        <tr key={index} className="border-t border-[#003566]">
                          <td className="py-2 px-4 font-medium border-r border-[#003566]">
                            {index + 1}.
                          </td>
                          <td className="py-2 px-4 border-r text-lg border-[#003566]">
                            {item.name}
                          </td>
                          <td className="py-2 px-4 text-right">
                            <a
                              href={item.link}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button
                                variant="outline"
                                className="text-blue-600 border-blue-500 hover:bg-blue-100"
                              >
                                View
                              </Button>
                            </a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))
      )}
    </section>
  );
}
