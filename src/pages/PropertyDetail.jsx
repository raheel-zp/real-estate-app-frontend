import { useEffect, useState } from "react";
import { fetchProperty } from "../api/properties";
import { useParams } from "react-router-dom";

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetchProperty(id).then(res => setProperty(res.data)).catch(console.error);
  }, [id]);

  if (!property) return <div className="p-8">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">{property.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <img src={(property.images[0] || "https://via.placeholder.com/900x600")} alt="" className="w-full h-96 object-cover rounded" />
          <p className="mt-4 text-gray-700">{property.description}</p>
        </div>
        <aside className="p-4 border rounded">
          <div className="text-lg font-bold">$ {property.price}</div>
          <div className="mt-2">Bedrooms: {property.bedrooms}</div>
          <div>Bathrooms: {property.bathrooms}</div>
          <div className="mt-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Contact Agent</button>
          </div>
        </aside>
      </div>
    </div>
  );
}