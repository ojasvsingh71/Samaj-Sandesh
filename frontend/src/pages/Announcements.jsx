import { useEffect, useState } from "react";
import api from "../api/axios";
import AnnouncementCard from "../components/AnnouncementCard";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/announcement/all")
      .then((res) => setAnnouncements(res.data))
      .catch(() => alert("Failed to load announcements"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-700 dark:text-white mb-6 text-center">
          📢 Community Announcements
        </h2>

        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            Loading announcements...
          </p>
        ) : announcements.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No announcements posted yet.
          </p>
        ) : (
          <div className="space-y-5">
            {announcements.map((ann) => (
              <AnnouncementCard key={ann._id} ann={ann} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}