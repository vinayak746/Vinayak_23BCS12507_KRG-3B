import { memo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = memo(() => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  return (
    <nav style={styles.navbar}>
      <Link to="/dashboard" style={styles.brand}>🌱 EcoTrack</Link>
      <div style={styles.links}>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <Link to="/dashboard/water" style={styles.link}>Water Tracker</Link>
            <Link to="/logs" style={styles.link}>Logs</Link>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={styles.link}>Login</Link>
        )}
      </div>
    </nav>
  );
});

const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 24px",
    backgroundColor: "#fff",
    borderBottom: "1px solid #ddd",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  brand: {
    textDecoration: "none",
    color: "#333",
    fontSize: "18px",
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "#1976d2",
    fontSize: "15px",
  },
  logoutBtn: {
    backgroundColor: "#d32f2f",
    color: "#fff",
    border: "none",
    padding: "6px 16px",
    borderRadius: "4px",
    fontSize: "14px",
    cursor: "pointer",
  },
};

Header.displayName = "Header";

export default Header;
