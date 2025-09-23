import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "../context/FavoritesContext";

export default function PropertyCard({ property }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((fav) => fav._id === property._id);

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm relative">
      <button
        onClick={() => toggleFavorite(property._id)}
        className="absolute top-3 right-3 text-red-500 text-xl focus:outline-none"
      >
        {isFavorite ? <FaHeart /> : <FaRegHeart />}
      </button>
      <Link
        to={`/property/${property._id}`}
        className="block border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      >
        <img
          src={property.images?.[0] || "https://via.placeholder.com/600x400"}
          alt={property.title}
          className="w-full h-44 object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg">{property.title}</h3>
          <p className="text-sm text-gray-600">{property.location}</p>
          <div className="mt-2 flex items-center justify-between">
            <div className="text-xl font-bold">
              ${property.price?.toLocaleString()}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
