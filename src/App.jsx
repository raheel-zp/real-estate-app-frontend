import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';

export default function App() {
  return (
    <BrowserRouter>
      <header className="bg-white shadow">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">Fine Luxury Property</Link>
          <nav>
            <Link to="/properties" className="mr-4 text-gray-700">Properties</Link>
          </nav>
        </div>
      </header>

      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
        </Routes>
      </main>

      <footer className="bg-gray-100 text-center p-4">© {new Date().getFullYear()} Fine Luxury Property</footer>
    </BrowserRouter>
  );
}
