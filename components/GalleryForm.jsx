"use client";
import { useState, useEffect } from "react";
import { UploadCloud, Loader2, File, X } from "lucide-react";
import { useEdgeStore } from "@/lib/edgestore"; // EdgeStore hook import karein
import { toast } from "sonner"; // Alert ke bajaaye toast ka istemal

export default function GalleryForm() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [files, setFiles] = useState([]); // URL array ke bajaaye File array
  const [eventSuggestions, setEventSuggestions] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { edgestore } = useEdgeStore();

  useEffect(() => {
    // Event title suggestions fetch karna (yeh pehle jaisa hi hai)
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => setEventSuggestions(data.map((event) => event.title)));
  }, []);

  const handleFilesSelected = (event) => {
    const selected = Array.from(event.target.files || []);
    if (selected.length === 0) return;
    setFiles((prev) => [...prev, ...selected]);
    event.target.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check (ab files check karega)
    if (!title || !date || files.length === 0) {
      toast.error("Please fill all fields and upload at least one image.");
      return;
    }

    setIsUploading(true);
    let imageUrls = []; // Uploaded URLs ko yahan store karenge

    try {
      // Step 1: Saari files ko ek-ek karke EdgeStore par upload karein
      const uploadResponses = await Promise.all(
        files.map(file => 
          edgestore.publicFiles.upload({
            file,
            onProgressChange: (progress) => {
              // Aap yahaan progress bhi dikha sakte hain
              console.log(`Uploading ${file.name}: ${progress}%`);
            },
          })
        )
      );

      // Uploaded URLs ko collect karein
      imageUrls = uploadResponses.map(res => res.url);
      setIsUploading(false);
      setIsSaving(true);

      // Step 2: Sirf URLs ko database mein save karein
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, date, images: imageUrls }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save event");

      toast.success(data.message || "Gallery event submitted successfully!");
      setTitle("");
      setDate("");
      setFiles([]);
    } catch (error) {
      toast.error(error.message || "An error occurred while submitting");
    } finally {
      setIsUploading(false);
      setIsSaving(false);
    }
  };
  
  const isSubmitting = isUploading || isSaving;

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
        {/* Event Title (Same as before) */}
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

        {/* Event Date (Same as before) */}
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

        {/* NEW Image Upload Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image Upload (Required)
          </label>
          <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                >
                  <span>Upload files</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    multiple // Ek saath multiple files select karne ke liye
                    onChange={handleFilesSelected}
                    accept="image/*" // Sirf images accept karega
                    required={files.length === 0} // Agar koi file select nahi hai to required
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
          
          {/* Selected files ka preview dikhayein */}
          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="font-medium text-sm">Selected Files:</p>
              <div className="flex flex-wrap gap-2">
                {files.map((file, i) => (
                  <div key={i} className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1 text-sm">
                    <File className="h-4 w-4 text-gray-500" />
                    <span>{file.name}</span>
                    <button
                      type="button"
                      onClick={() => setFiles(files.filter((_, index) => index !== i))}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Submit Button (Updated Logic) */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#003566] to-[#001d3d] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-70"
      >
        {isUploading ? (
          <><Loader2 className="h-5 w-5 animate-spin" /> Uploading Files...</>
        ) : isSaving ? (
          <><Loader2 className="h-5 w-5 animate-spin" /> Saving to Database...</>
        ) : (
          <><UploadCloud className="w-5 h-5" /> Submit Event</>
        )}
      </button>
    </form>
  );
}
