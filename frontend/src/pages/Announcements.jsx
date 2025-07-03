import { useEffect, useState } from "react";
import api from "../api/axios";
import AnnouncementCard from "../components/AnnouncementCard";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    api.get("/announcement")
      .then(res => setAnnouncements(res.data))
      .catch(() => alert("Failed to load announcements"));
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Announcements</h2>
      <div className="space-y-4">
        {announcements.map((ann) => (
          <AnnouncementCard key={ann._id} ann={ann} />
        ))}
      </div>
    </div>
  );
}