import { Link } from "react-router-dom";

export default function PropertyCard({ property }) {
  const img =
    property.images && property.images.length
      ? property.images[0]
      : "https://via.placeholder.com/600x400";

  return (
    <Link
      to={`/property/${property._id}`}
      className="block border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <img
        src={img}
        alt={property.title}
        className="w-full h-44 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{property.title}</h3>
        <p className="text-sm text-gray-600">{property.location}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-xl font-bold">$ {property.price}</div>
          <span className="text-sm text-blue-600">View</span>
        </div>
      </div>
    </Link>
  );
}
