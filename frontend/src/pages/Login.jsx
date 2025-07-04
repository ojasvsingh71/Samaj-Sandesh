import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center px-4">
      <div className="backdrop-blur-md bg-white/70 dark:bg-slate-800/70 shadow-2xl rounded-3xl px-10 py-12 max-w-md w-full transition-all">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-700 dark:text-white tracking-tight">
            Samaj Sandesh 🏡
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Your community notice board
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="••••••••"
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
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}