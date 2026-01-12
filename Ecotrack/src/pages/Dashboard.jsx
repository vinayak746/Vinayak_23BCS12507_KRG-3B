import Header from "../components/Header";
import Logs from "./Logs";

const Dashboard = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <Header title="Dashboard" />
      <h2 className="text-center text-2xl font-bold ">EcoTrack</h2>
      <Logs />
    </div>
  );
};
export default Dashboard;
