import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { Megaphone, Loader2, ArrowLeft } from "lucide-react";

export default function CreateAnnouncement() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/announcement/add", { title, body, expiresAt });
      navigate("/announcements");
    } catch (err) {
      alert("Failed to create announcement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center px-4 py-12">
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md shadow-2xl rounded-3xl px-8 py-10 max-w-2xl w-full transition-all">
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Megaphone className="text-blue-600 dark:text-blue-400" />
            <h2 className="text-3xl font-extrabold text-blue-700 dark:text-white">
              Create Announcement
            </h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Share important updates with your community
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a short and clear title"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-slate-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Body
            </label>
            <textarea
              rows={4}
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write the announcement details here..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-slate-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Expiry Date (optional)
            </label>
            <input
              type="date"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-slate-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white font-semibold rounded-xl transition shadow-md flex items-center justify-center ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4 mr-2" /> Posting...
              </>
            ) : (
              "Post Announcement"
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            to="/announcements"
            className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeft size={16} /> Back to Announcements
          </Link>
        </div>
      </div>
    </div>
  );
}