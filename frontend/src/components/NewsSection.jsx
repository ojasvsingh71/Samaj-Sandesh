import { useEffect, useState } from "react";
import api from "../api/axios";
import AnimatedCard from "./AnimatedCard";
import LoadingSpinner from "./LoadingSpinner";
import { ExternalLink, Clock, Globe } from "lucide-react";

export default function NewsSection() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get("/news/top");
        setArticles(res.data.articles || []);
      } catch (err) {
        console.error("Failed to fetch news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <AnimatedCard className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-slate-700/50">
        <LoadingSpinner text="Loading latest news..." />
      </AnimatedCard>
    );
  }

  if (articles.length === 0) {
    return (
      <AnimatedCard className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20 dark:border-slate-700/50">
        <Globe className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
          No news available at the moment
        </p>
      </AnimatedCard>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {articles.map((article, index) => (
          <AnimatedCard
            key={index}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-white/20 dark:border-slate-700/50 group"
          >
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
            >
              <div className="relative">
                {article.urlToImage ? (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                    <Globe className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {article.description || "No description available"}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </a>
          </AnimatedCard>
        ))}
      </div>
    </section>
  );
}