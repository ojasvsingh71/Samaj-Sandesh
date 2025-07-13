import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Megaphone, LogIn, UserPlus, PlusCircle, Home as HomeIcon, Newspaper, LogOut, Sparkles } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import AnimatedCard from "../components/AnimatedCard";

export default function Home() {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      <ThemeToggle />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-6xl">
          {/* Hero Section */}
          <AnimatedCard className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 md:p-12 mb-8 text-center border border-white/20 dark:border-slate-700/50">
            <div className="mb-8">
              <div className="flex justify-center items-center gap-3 mb-4">
                <div className="relative">
                  <HomeIcon className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-bounce" />
                  <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-300 bg-clip-text text-transparent tracking-tight mb-4">
                Samaj Sandesh
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium mb-2">
                🏡 Your Community Hub
              </p>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Connect, share, and stay informed with your community. Access announcements, latest news, and important updates all in one beautiful place.
              </p>
            </div>

            {user && (
              <div className="mb-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-800">
                <p className="text-green-700 dark:text-green-300 font-medium">
                  Welcome back! 👋 You're logged in as <span className="font-bold">{user.role}</span>
                </p>
              </div>
            )}
          </AnimatedCard>

          {/* Action Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {!user && (
              <>
                <AnimatedCard>
                  <Link
                    to="/login"
                    className="block bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-6 rounded-2xl shadow-lg transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <LogIn className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                      <div className="w-2 h-2 bg-white/30 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Login</h3>
                    <p className="text-blue-100 text-sm">Access your account and community features</p>
                  </Link>
                </AnimatedCard>

                <AnimatedCard>
                  <Link
                    to="/register"
                    className="block bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-6 rounded-2xl shadow-lg transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <UserPlus className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                      <div className="w-2 h-2 bg-white/30 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Join Us</h3>
                    <p className="text-green-100 text-sm">Create an account and become part of the community</p>
                  </Link>
                </AnimatedCard>
              </>
            )}

            <AnimatedCard>
              <Link
                to="/announcements"
                className="block bg-gradient-to-br from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white p-6 rounded-2xl shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <Megaphone className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                  <div className="w-2 h-2 bg-white/30 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                </div>
                <h3 className="text-xl font-bold mb-2">Announcements</h3>
                <p className="text-yellow-100 text-sm">Stay updated with community news and important notices</p>
              </Link>
            </AnimatedCard>

            <AnimatedCard>
              <Link
                to="/news"
                className="block bg-gradient-to-br from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white p-6 rounded-2xl shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <Newspaper className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                  <div className="w-2 h-2 bg-white/30 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                </div>
                <h3 className="text-xl font-bold mb-2">Latest News</h3>
                <p className="text-purple-100 text-sm">Read the latest headlines and stay informed</p>
              </Link>
            </AnimatedCard>

            {user?.role === "admin" && (
              <AnimatedCard>
                <Link
                  to="/announcements/new"
                  className="block bg-gradient-to-br from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white p-6 rounded-2xl shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <PlusCircle className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                    <div className="w-2 h-2 bg-white/30 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Create Post</h3>
                  <p className="text-pink-100 text-sm">Share important updates with the community</p>
                </Link>
              </AnimatedCard>
            )}

            {user && (
              <AnimatedCard>
                <button
                  onClick={handleLogout}
                  className="w-full text-left bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-6 rounded-2xl shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <LogOut className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                    <div className="w-2 h-2 bg-white/30 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Logout</h3>
                  <p className="text-red-100 text-sm">Sign out of your account securely</p>
                </button>
              </AnimatedCard>
            )}
          </div>

          {/* Stats Section */}
          <AnimatedCard className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-slate-700/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="group">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">Always Available</div>
              </div>
              <div className="group">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2 group-hover:scale-110 transition-transform duration-300">🔒</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">Secure & Private</div>
              </div>
              <div className="group">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300">⚡</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">Lightning Fast</div>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </div>
  );
}