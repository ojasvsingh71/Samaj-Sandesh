import NewsSection from "../components/NewsSection";
import { Link } from "react-router-dom";

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-slate-800 dark:to-slate-900">
      <header className="text-center py-6">
        <h1 className="text-4xl font-bold text-blue-700 dark:text-white">🗞️ Community News</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Stay informed with the latest headlines
        </p>
        <div className="mt-4">
          <Link
            to="/"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            ⬅️ Back to Home
          </Link>
        </div>
      </header>
      <NewsSection />
    </div>
  );
}