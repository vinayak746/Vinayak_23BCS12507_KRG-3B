import Header from "../components/Header";
import DashboardSummary from "./DashboardSummary";
import DashboardAnalytics from "./DashboardAnalytics";

const DashboardLayout = () => {
  return (
    <div>
      <Header title="Dashboard" />
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="mb-2">EcoTrack Dashboard</h2>
        <p className="mb-8">Track and analyze your carbon footprint</p>
        <DashboardSummary />
        <DashboardAnalytics />
      </div>
    </div>
  );
};

export default DashboardLayout;
