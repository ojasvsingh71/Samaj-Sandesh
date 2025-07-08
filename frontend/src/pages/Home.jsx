import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Megaphone, LogIn, UserPlus, PlusCircle, Home as HomeIcon } from "lucide-react";

export default function Home() {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center px-4 py-16">
      <div className="bg-white dark:bg-slate-800 shadow-2xl rounded-3xl p-10 max-w-lg w-full text-center border dark:border-slate-700">
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold text-blue-700 dark:text-white tracking-tight mb-2 flex justify-center items-center gap-2">
            <HomeIcon className="w-7 h-7 text-green-500" />
            Samaj Sandesh 🏡
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-md">
            Your community notice board is live! Stay informed & connected.
          </p>
        </div>

        <div className="space-y-4 mt-6">
          {!user && (
            <>
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold shadow-md"
              >
                <LogIn className="w-5 h-5" />
                Login
              </Link>
              <Link
                to="/register"
                className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold shadow-md"
              >
                <UserPlus className="w-5 h-5" />
                Register
              </Link>
            </>
          )}

          <Link
            to="/announcements"
            className="flex items-center justify-center gap-2 w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition font-semibold shadow-md"
          >
            <Megaphone className="w-5 h-5" />
            View Announcements
          </Link>

          {user?.role === "admin" && (
            <Link
              to="/announcements/new"
              className="flex items-center justify-center gap-2 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition font-semibold shadow-md"
            >
              <PlusCircle className="w-5 h-5" />
              Create Announcement
            </Link>
          )}
          {user && (
            <Link
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-semibold shadow-md"
            >
              Logout
            </Link>
          )}
          <Link
            to="/news"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            📰 View News
          </Link>
        </div>
      </div>
    </div>
  );
}