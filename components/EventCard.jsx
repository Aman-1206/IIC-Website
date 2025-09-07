// EventCard.jsx
"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import EventDetailsPanel from "./EventDetailsPanel";

const EventCard = ({ event, btn }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="relative w-full max-w-sm h-[400px]">
      {/* Main Event Card */}
      <Card className="group relative w-full h-full overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-0 border-0">
        <div className="absolute inset-0">
          <img
            src={event.primaryImage}
            alt={event.title}
            className="object-fit w-full h-full absolute inset-0 transition-transform duration-500 group-hover:scale-110 rounded-xl"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
              {event.category || "Event"}
            </span>
            <span className="text-sm font-light">
              {event.date
                ? new Date(event.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Coming Soon"}
            </span>
          </div>
          <h3 className="text-2xl mb-10 font-bold line-clamp-2">
            {event.title}
          </h3>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 w-full px-6">
          {btn === "View Event Details" ? (
            <a
              href={event.pdf}
              download={`${event.title.replace(/\s+/g, "_")}_Details.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full"
            >
              <Button
                variant="outline"
                className="w-full bg-transparent backdrop-blur-md border-white/30 text-white hover:bg-white hover:text-black hover:border-white cursor-pointer"
                onClick={() => btn === "Register Now" && setShowDetails(true)}
              >
                {btn}
              </Button>
            </a>
          ) : (
            <Button
              variant="outline"
              className="w-full bg-transparent backdrop-blur-md border-white/30 text-white hover:bg-white hover:text-black hover:border-white cursor-pointer"
              onClick={() => btn === "Register Now" && setShowDetails(true)}
            >
              {btn || "Register Now"}
            </Button>
          )}
          
        </div>
      </Card>

      {showDetails && (
        <EventDetailsPanel
          event={event}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
};

export default EventCard;
