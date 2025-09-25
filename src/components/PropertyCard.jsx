import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "../context/FavoritesContext";
import { deleteProperty } from "../api/properties";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function PropertyCard({ property }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((fav) => fav._id === property._id);
  const { auth } = useContext(AuthContext);
  const placeholder = "/images/placeholder.jpg";
  const image = property.images?.[0] || placeholder;

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      await deleteProperty(id);
      navigate("/properties");
    }
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-sm relative">
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
          src={image}
          alt={property.title}
          className="w-full h-44 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = placeholder;
          }}
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
      {auth?.user?.role === "admin" && (
        <div className="flex space-x-2 mt-2">
          <button
            onClick={() => navigate(`/edit-property/${property._id}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(property._id)}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
