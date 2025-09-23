import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { auth, logout } = useContext(AuthContext);

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        RealEstate
      </Link>

      <nav className="flex space-x-4">
        {!auth ? (
          <>
            <Link to="/login" className="text-gray-700">
              Login
            </Link>
            <Link to="/register" className="text-gray-700">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/properties" className="text-gray-700">
              Properties
            </Link>

            <Link to="/favorites" className="text-gray-700">
              Favorites
            </Link>

            {auth.user.role === "admin" && (
              <>
                <Link to="/create-property" className="text-gray-700">
                  Create Property
                </Link>
                <Link to="/admin/inquiries" className="text-gray-700">
                  Inquiries
                </Link>
              </>
            )}

            <button onClick={logout} className="text-red-600">
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
