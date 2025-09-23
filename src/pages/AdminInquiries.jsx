import { useEffect, useState } from "react";
import { fetchInquiries } from "../api/inquiries";

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInquiries = async () => {
      try {
        const { data } = await fetchInquiries();
        setInquiries(data);
      } catch (err) {
        console.error("Error loading inquiries", err);
      } finally {
        setLoading(false);
      }
    };
    loadInquiries();
  }, []);

  if (loading) return <p className="text-center">Loading inquiries...</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Inquiries</h1>

      {inquiries.length === 0 ? (
        <p>No inquiries yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Property</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Message</th>
                <th className="p-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq) => (
                <tr key={inq._id} className="hover:bg-gray-50">
                  <td className="p-2 border">
                    {inq.property?.title || "Unknown"} <br />
                    <span className="text-sm text-gray-500">
                      {inq.property?.location}
                    </span>
                  </td>
                  <td className="p-2 border">{inq.name}</td>
                  <td className="p-2 border">{inq.email}</td>
                  <td className="p-2 border">{inq.message}</td>
                  <td className="p-2 border">
                    {new Date(inq.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
