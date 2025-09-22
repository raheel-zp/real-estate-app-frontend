import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateProperty from "./pages/CreateProperty";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";

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
            path="/property/:id"
            element={
              <ProtectedRoute>
                <PropertyDetail />
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
