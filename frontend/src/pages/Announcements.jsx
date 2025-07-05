import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import AnnouncementCard from "../components/AnnouncementCard";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Loader2, Megaphone, ArrowLeft } from "lucide-react";

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
      setAnnouncements((prev) => prev.filter((a) => a._id !== id));
    } catch {
      alert("Failed to delete announcement");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 dark:from-slate-900 dark:to-slate-800 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Megaphone className="text-blue-600 dark:text-green-400 w-7 h-7" />
          <h2 className="text-3xl font-bold text-blue-800 dark:text-white text-center">
            Community Announcements
          </h2>
        </div>

        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin text-blue-500 dark:text-white w-6 h-6" />
            <span className="ml-2 text-gray-600 dark:text-gray-300">Loading announcements...</span>
          </div>
        ) : announcements.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-400 italic">
            No announcements have been posted yet.
          </div>
        ) : (
          <div className="space-y-6">
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