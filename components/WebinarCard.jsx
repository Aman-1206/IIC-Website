"use client";
import Image from "next/image";

export default function WebinarCard({ title, speakers, date, time, thumbnail, webinarLink, youtubeLink }) {
  return (
    <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-6 space-y-4">
      {thumbnail && (
        <Image src={thumbnail} alt={title} width={350} height={300} className="rounded-xl w-full h-auto object-cover" />
      )}
      <h2 className="text-2xl font-bold text-blue-800">{title}</h2>
      <div className="space-y-2">
        {speakers.map((speaker, index) => (
          <div key={index} className="text-md text-gray-700 leading-tight">
            <p className="font-semibold">{speaker.name}</p>
            <p className="text-sm text-gray-500">{speaker.designation}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-600">🗓️ {new Date(date).toLocaleDateString()} at 🕒 {time}</p>
      <div className="flex flex-wrap gap-4 mt-4">
        {webinarLink && (
          <a
            href={webinarLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#07B1E0] text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Join Webinar
          </a>
        )}
        {youtubeLink && (
          <a
            href={youtubeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
          >
            Watch on YouTube
          </a>
        )}
      </div>
    </div>
  );
}
