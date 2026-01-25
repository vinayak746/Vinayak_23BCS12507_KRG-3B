import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 text-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="no-underline text-white">
          EcoTrack
        </Link>
        <nav className="flex gap-6 items-center">
          {isAuthenticated ?
            <>
              <Link to="/" className="no-underline text-white">
                Dashboard
              </Link>
              <Link to="/logs" className="no-underline text-white">
                Logs
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white border-none px-4 py-2 cursor-pointer"
              >
                Logout
              </button>
            </>
          : <Link to="/login" className="no-underline text-white">
              Login
            </Link>
          }
        </nav>
      </div>
    </header>
  );
};

export default Header;
