import { useEffect, useState } from "react";
import { fetchProperties } from "../api/properties";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 12 });
  const [pages, setPages] = useState(1);
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    minPrice: "",
    maxPrice: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      const { data } = await fetchProperties({
        page,
        limit: meta.limit,
        ...filters,
      });
      setProperties(data.data);
      setMeta(data.meta);
      setPages(data.pages);
    } catch (err) {
      console.error("Error fetching properties", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, [filters]);

  const handlePageChange = (page) => {
    fetchData(page);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="border p-2 rounded w-full"
        >
          <option value="">All Types</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="House">House</option>
        </select>
        <input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Properties Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <img
            src="/house.png"
            alt="Loading"
            className="w-20 h-20 animate-spin"
          />
          <p className="mt-4 text-lg font-semibold text-gray-700">
            Loading properties...
          </p>
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-10 text-gray-600">
          No properties found.
        </div>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <div
                key={property._id}
                className="border rounded-lg shadow hover:shadow-lg transition"
              >
                <img
                  src={
                    property.images?.[0] ||
                    "https://via.placeholder.com/400x250"
                  }
                  alt={property.title}
                  className="h-48 w-full object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{property.title}</h2>
                  <p className="text-gray-600">{property.location}</p>
                  <p className="text-blue-600 font-bold mt-2">
                    ${property.price?.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {property.bedrooms} Beds • {property.bathrooms} Baths •{" "}
                    {property.area} sqft
                  </p>
                  <Link
                    to={`/property/${property._id}`}
                    className="text-sm text-blue-600"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pages > 1 && (
            <Pagination
              page={meta.page}
              pages={pages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Properties;
