import { memo, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = memo(() => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = useCallback(() => {
    login();
    navigate("/dashboard");
  }, [login, navigate]);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🌱 EcoTrack</h1>
        <p style={styles.subtitle}>Track your carbon footprint and daily habits.</p>
        <hr style={styles.divider} />
        <p style={styles.label}>Click below to continue</p>
        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>
      </div>
    </div>
  );
});

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    textAlign: "center",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    fontSize: "28px",
    margin: "0 0 8px 0",
    color: "#333",
  },
  subtitle: {
    color: "#666",
    marginBottom: "24px",
  },
  divider: {
    border: "none",
    borderTop: "1px solid #eee",
    margin: "16px 0",
  },
  label: {
    color: "#888",
    fontSize: "14px",
    marginBottom: "16px",
  },
  button: {
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    padding: "12px 32px",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    width: "100%",
  },
};

Login.displayName = "Login";

export default Login;
