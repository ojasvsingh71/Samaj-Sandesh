import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-100 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center px-4 py-10">
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur shadow-lg rounded-2xl p-8 w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center text-green-700 dark:text-green-400 mb-6">
          ✍️ Create Announcement
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a short title"
              className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-700 dark:border-slate-600 focus:ring-2 focus:ring-green-400 focus:outline-none"
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
              placeholder="Write your announcement here..."
              className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-700 dark:border-slate-600 focus:ring-2 focus:ring-green-400 focus:outline-none"
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
              className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-700 dark:border-slate-600 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white font-semibold rounded-lg transition shadow ${
              loading
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Posting..." : "Post Announcement"}
          </button>
        </form>
      </div>
    </div>
  );
}