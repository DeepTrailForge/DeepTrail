import React, { useEffect, useState } from "react";

type AlertLevel = "low" | "moderate" | "high" | "critical";

interface AnomalyEvent {
  id: string;
  timestamp: string;
  message: string;
  level: AlertLevel;
}

const getGradientForLevel = (level: AlertLevel) => {
  switch (level) {
    case "low":
      return "from-green-400 via-green-500 to-green-600";
    case "moderate":
      return "from-yellow-400 via-yellow-500 to-yellow-600";
    case "high":
      return "from-orange-500 via-orange-600 to-orange-700";
    case "critical":
      return "from-red-600 via-red-700 to-red-800";
    default:
      return "from-gray-400 via-gray-500 to-gray-600";
  }
};

const mockEvents: AnomalyEvent[] = [
  { id: "evt1", timestamp: "2025-06-27T12:01:00Z", message: "Minor latency spike detected", level: "low" },
  { id: "evt2", timestamp: "2025-06-27T12:03:00Z", message: "Token pool drain pattern", level: "moderate" },
  { id: "evt3", timestamp: "2025-06-27T12:06:00Z", message: "Flashloan loop detected", level: "high" },
  { id: "evt4", timestamp: "2025-06-27T12:09:00Z", message: "Critical wallet exploit in progress", level: "critical" },
];

export const DeepAnomalyBanner = () => {
  const [events, setEvents] = useState<AnomalyEvent[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEvents(mockEvents);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-3">
      {events.map((event) => (
        <div
          key={event.id}
          className={`bg-gradient-to-r ${getGradientForLevel(event.level)} text-white text-center py-3 px-4 rounded-lg shadow-md`}
        >
          <p className="text-sm font-medium">
            🛡️ [{event.level.toUpperCase()}] - {event.message}
          </p>
          <p className="text-xs opacity-80">🕒 {new Date(event.timestamp).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};
