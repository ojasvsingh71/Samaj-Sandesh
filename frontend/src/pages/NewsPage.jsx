import NewsSection from "../components/NewsSection";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import AnimatedCard from "../components/AnimatedCard";
import { ArrowLeft, Globe, Newspaper } from "lucide-react";
import WeatherWidget from "../components/WeatherWidget";

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative">
      <ThemeToggle />

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
      </div>
      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <AnimatedCard className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 dark:border-slate-700/50 h-full">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                    <Newspaper className="text-blue-600 dark:text-blue-400 w-8 h-8" />
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-full">
                    <Globe className="text-purple-600 dark:text-purple-400 w-8 h-8" />
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
                  Global News Hub
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
                  Stay informed with the latest headlines from around the world. Fresh news delivered in real-time.
                </p>

                <Link
                  to="/"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <ArrowLeft size={18} />
                  Back to Home
                </Link>
              </AnimatedCard>
            </div>
            <div>
              <WeatherWidget />
            </div>
          </div>
        </div>
      </div>

      <NewsSection />
    </div>
  );
}