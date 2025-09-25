import { useEffect, useState } from "react";
import { getProfile } from "../api/user";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const placeholder = "/images/user-placeholder.jpg";

  useEffect(() => {
    getProfile()
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <div className="flex items-center space-x-4">
        <img
          src={user?.profileImage || placeholder}
          alt={user?.name}
          className="w-24 h-24 rounded-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = placeholder;
          }}
        />
        <div>
          <h2 className="text-2xl font-bold">{user?.name}</h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Account Info</h3>
        <p>
          <strong>Role:</strong> {user?.role}
        </p>
        <p>
          <strong>Joined:</strong> {new Date(user?.createdAt).toDateString()}
        </p>
      </div>
    </div>
  );
};

export default Profile;
