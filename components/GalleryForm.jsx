"use client";
import { useState, useEffect } from "react";
import { PlusCircle, UploadCloud } from "lucide-react";

export default function GalleryForm() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [images, setImages] = useState([""]);
  const [eventSuggestions, setEventSuggestions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => setEventSuggestions(data.map((event) => event.title)));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const filteredImages = images.filter((link) => link.trim() !== "");
    if (!title || !date || filteredImages.length === 0) {
      alert("Please fill all fields");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, date, images: filteredImages }),
      });

      const data = await res.json();
      alert(data.message || data.error);
      setTitle("");
      setDate("");
      setImages([""]);
    } catch (error) {
      alert("An error occurred while submitting");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-lg"
    >
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-[#003566]">Add Gallery Event</h2>
        <p className="text-gray-500 mt-2">
          Fill in the details to add a new event to the gallery
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Title
          </label>
          <input
            list="event-titles"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566] focus:border-transparent transition-all"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter event title"
            required
          />
          <datalist id="event-titles">
            {eventSuggestions.map((title, i) => (
              <option key={i} value={title} />
            ))}
          </datalist>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Date
          </label>
          <input
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566] focus:border-transparent transition-all"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image Links
          </label>
          <div className="space-y-3">
            {images.map((img, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="url"
                  value={img}
                  onChange={(e) => {
                    const newImages = [...images];
                    newImages[index] = e.target.value;
                    setImages(newImages);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566] focus:border-transparent transition-all"
                  placeholder={`https://example.com/image${index + 1}.jpg`}
                  required
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() =>
                      setImages(images.filter((_, i) => i !== index))
                    }
                    className="text-red-500 hover:text-red-700 transition-colors text-2xl"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setImages([...images, ""])}
            className="mt-2 flex items-center gap-1 text-sm text-[#003566] hover:text-[#001d3d] transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            Add another image
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#003566] to-[#001d3d] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-70"
      >
        {isSubmitting ? (
          "Submitting..."
        ) : (
          <>
            <UploadCloud className="w-5 h-5" />
            Submit Event
          </>
        )}
      </button>
    </form>
  );
}