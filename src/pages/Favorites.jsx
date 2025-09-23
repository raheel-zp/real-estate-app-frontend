// src/pages/Favorites.jsx
import { useFavorites } from "../context/FavoritesContext";
import PropertyCard from "../components/PropertyCard";

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">My Favorites</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-600">You haven’t added any favorites yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
