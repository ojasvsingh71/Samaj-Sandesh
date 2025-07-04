import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 dark:from-slate-800 dark:to-slate-900 flex flex-col items-center justify-center px-4">
      <div className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-white mb-3">
          Welcome to <span className="text-green-600">Samaj Sandesh 🏡</span>
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Your community notice board is live! Stay updated and connected.
        </p>

        <div className="space-y-3">
          {!user && (
            <>
              <Link
                to="/login"
                className="block w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Register
              </Link>
            </>
          )}

          <Link
            to="/announcements"
            className="block w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            View Announcements
          </Link>

          {user?.role === "admin" && (
            <Link
              to="/announcements/new"
              className="block w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Create Announcement
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}