import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Announcements from "./pages/Announcements";
import CreateAnnouncement from "./pages/CreateAnnouncement";
import Register from "./pages/Register";
import NewsPage from "./pages/NewsPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route
            path="/news"
            element={<ProtectedRoute>
              <NewsPage />
            </ProtectedRoute>} />
          <Route
            path="/announcements"
            element={
              <ProtectedRoute>
                <Announcements />
              </ProtectedRoute>}
          />
          <Route
            path="/announcements/new"
            element={
              <ProtectedRoute>
                <CreateAnnouncement />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}