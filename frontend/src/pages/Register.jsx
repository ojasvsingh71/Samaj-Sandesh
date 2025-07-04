import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/register", { name, email, password });
      alert("Registered successfully! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-blue-100 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center px-4">
      <div className="backdrop-blur-md bg-white/70 dark:bg-slate-800/70 shadow-2xl rounded-3xl px-10 py-12 max-w-md w-full transition-all">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-700 dark:text-white tracking-tight">
            Samaj Sandesh 🙌
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Join your community today
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white font-semibold rounded-xl transition shadow-md ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-400">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}