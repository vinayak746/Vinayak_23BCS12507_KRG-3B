import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1>Login</h1>
      <button
        onClick={handleLogin}
        className="bg-green-600 text-white px-6 py-3 border-none cursor-pointer"
      >
        Login to Ecotrack
      </button>
    </div>
  );
};

export default Login;
