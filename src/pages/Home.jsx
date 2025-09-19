import { useEffect, useState } from "react";
import { fetchProperties } from "../api/properties";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
const Home = () => {
  const [properties, setProperties] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 12 });
  const [pages, setPages] = useState(1);
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    minPrice: "",
    maxPrice: "",
  });

  const fetchData = async (page = 1) => {
    try {
      const { data } = await fetchProperties({ page, limit: meta.limit, ...filters });
      setProperties(data.data);
      setMeta(data.meta);
      setPages(data.pages);
    } catch (err) {
      console.error("Error fetching properties", err);
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

      {/* Property Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
           <PropertyCard property={property} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination page={meta.page} pages={pages} onPageChange={handlePageChange} />
      
    </div>
  );
};

export default Home;
