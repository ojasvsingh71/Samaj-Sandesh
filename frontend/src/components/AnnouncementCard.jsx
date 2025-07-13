import { Calendar, User, Trash2 } from "lucide-react";
import AnimatedCard from "./AnimatedCard";

export default function AnnouncementCard({ ann, user, handleDelete }) {
  const isAdmin = user?.role === "admin";

  return (
    <AnimatedCard className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-lg relative overflow-hidden group">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 flex-1 pr-4">
            {ann.title}
          </h3>
          {isAdmin && (
            <button
              onClick={() => handleDelete(ann._id)}
              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
              title="Delete announcement"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
          {ann.body}
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(ann.createdAt).toLocaleDateString()}</span>
          </div>
          {ann.author && (
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{ann.author}</span>
            </div>
          )}
        </div>
      </div>
    </AnimatedCard>
  );
}