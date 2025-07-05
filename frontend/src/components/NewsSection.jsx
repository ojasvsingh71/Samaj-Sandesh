import { useEffect, useState } from "react";
import api from "../api/axios";

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
      <div className="text-center py-10 text-gray-600 dark:text-gray-300">
        📰 Loading latest news...
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 dark:text-gray-400">
        No news available at the moment.
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-blue-700 dark:text-white mb-6 text-center">
        🌐 Latest News Headlines
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <a
            key={index}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white dark:bg-slate-800 rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {article.description?.slice(0, 100)}...
              </p>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {new Date(article.publishedAt).toLocaleString()}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}