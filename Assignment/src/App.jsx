import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import "./App.css";

const Login = lazy(() => import("./pages/login.jsx"));
const DashboardLayout = lazy(() => import("./pages/DashboardLayout.jsx"));
const Logs = lazy(() => import("./pages/Logs.jsx"));
const WaterTracker = lazy(() => import("./pages/WaterTracker.jsx"));

const LoadingFallback = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
    <p>Loading...</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      {/* Suspense provides fallback UI while lazy components load */}
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/water"
            element={
              <ProtectedRoute>
                <WaterTracker />
              </ProtectedRoute>
            }
          />
          <Route
            path="/logs"
            element={
              <ProtectedRoute>
                <Logs />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
