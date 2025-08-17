import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import AnnouncementCard from "../components/AnnouncementCard";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Megaphone, ArrowLeft, Plus, Search } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import LoadingSpinner from "../components/LoadingSpinner";
import AnimatedCard from "../components/AnimatedCard";
import WeatherWidget from "../components/WeatherWidget";

export default function Announcements() {
  const { user } = useContext(AuthContext);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredAnnouncements = announcements.filter(ann =>
    ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ann.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative">
      <ThemeToggle />
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <AnimatedCard className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-slate-700/50 h-full">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                    <Megaphone className="text-blue-600 dark:text-blue-400 w-8 h-8" />
                  </div>
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
                  Community Announcements
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Stay informed with the latest community updates and important notices
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <ArrowLeft size={18} />
                  Back to Home
                </Link>
                {user?.role === "admin" && (
                  <Link
                    to="/announcements/new"
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <Plus size={18} />
                    Create New
                  </Link>
                )}
              </div>
            </AnimatedCard>
          </div>
          <div>
            <WeatherWidget />
          </div>
        </div>

        {/* Search bar */}
        <AnimatedCard className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-4 mb-8 border border-white/20 dark:border-slate-700/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/80 dark:bg-slate-700/80 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </AnimatedCard>

        {/* Content */}
        {loading ? (
          <AnimatedCard className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-slate-700/50">
            <LoadingSpinner text="Loading announcements..." />
          </AnimatedCard>
        ) : filteredAnnouncements.length === 0 ? (
          <AnimatedCard className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20 dark:border-slate-700/50">
            <div className="text-gray-500 dark:text-gray-400">
              {searchTerm ? (
                <>
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">No announcements found</p>
                  <p>Try adjusting your search terms</p>
                </>
              ) : (
                <>
                  <Megaphone className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">No announcements yet</p>
                  <p>Check back later for community updates</p>
                </>
              )}
            </div>
          </AnimatedCard>
        ) : (
          <div className="space-y-6">
            {filteredAnnouncements.map((ann) => (
              <AnnouncementCard
                key={ann._id}
                ann={ann}
                user={user}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Results count */}
        {!loading && filteredAnnouncements.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredAnnouncements.length} of {announcements.length} announcements
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}