import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import AnnouncementCard from "../components/AnnouncementCard";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Announcements() {
  const { user } = useContext(AuthContext);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const res = await api.get("/announcement/all");
      setAnnouncements(res.data);
    } catch {
      alert("Failed to load announcements");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this announcement?");
    if (!confirm) return;

    try {
      await api.delete(`/announcement/${id}`);
      setAnnouncements(announcements.filter((ann) => ann._id !== id));
    } catch {
      alert("Failed to delete announcement");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-700 dark:text-white mb-6 text-center">
          📢 Community Announcements
        </h2>

        <div className="text-center mb-6">
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            ⬅️ Back to Home
          </Link>
        </div>

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
              <AnnouncementCard
                key={ann._id}
                ann={ann}
                user={user}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}