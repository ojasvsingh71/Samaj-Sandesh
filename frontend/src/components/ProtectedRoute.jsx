import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="text-center mt-20">Checking auth...</div>; // show loading
  if (!user) return <Navigate to="/login" />;
  
  return children;
}