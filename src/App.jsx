import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateProperty from "./pages/CreateProperty";
import EditProperty from "./pages/EditProperty";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Favorites from "./pages/Favorites";
import AdminInquiries from "./pages/AdminInquiries";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <main className="min-h-screen">
        <Routes>
          <Route
            path="/create-property"
            element={
              <ProtectedRoute>
                <CreateProperty />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-property/:id"
            element={
              <ProtectedRoute>
                <EditProperty />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/inquiries"
            element={
              <ProtectedRoute>
                <AdminInquiries />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/properties"
            element={
              <ProtectedRoute>
                <Properties />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route
            path="/property/:id"
            element={
              <ProtectedRoute>
                <PropertyDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <footer className="bg-gray-100 text-center p-4">
        © {new Date().getFullYear()} Real Estate Website
      </footer>
    </BrowserRouter>
  );
}
