import { logs } from "../data/logs";

const DashboardAnalytics = () => {
  const filterLogs = logs.filter((log) => log.carbon > 0);
  const highCarbonLogs = filterLogs.filter((log) => log.carbon >= 4);
  const lowCarbonLogs = filterLogs.filter((log) => log.carbon < 4);

  return (
    <div className="flex flex-col gap-6">
      <div className="p-6">
        <h3 className="mb-4">All Carbon Activities</h3>
        <div className="flex flex-col gap-3">
          {filterLogs.map((log) => (
            <div key={log.id} className="flex justify-between items-center p-4">
              <span>{log.activity}</span>
              <span
                className={log.carbon >= 4 ? "text-red-600" : "text-green-600"}
              >
                {log.carbon}kg
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6">
          <h3 className="mb-4 text-red-600">High Carbon Activities</h3>
          {highCarbonLogs.length > 0 ?
            <ul className="flex flex-col gap-3">
              {highCarbonLogs.map((log) => (
                <li
                  key={log.id}
                  className="flex justify-between items-center p-3 text-red-600"
                >
                  <span>{log.activity}</span>
                  <span>{log.carbon}kg</span>
                </li>
              ))}
            </ul>
          : <p className="text-center p-4">No high carbon activities</p>}
        </div>

        <div className="p-6">
          <h3 className="mb-4 text-green-600">Low Carbon Activities</h3>
          {lowCarbonLogs.length > 0 ?
            <ul className="flex flex-col gap-3">
              {lowCarbonLogs.map((log) => (
                <li
                  key={log.id}
                  className="flex justify-between items-center p-3 text-green-600"
                >
                  <span>{log.activity}</span>
                  <span>{log.carbon}kg</span>
                </li>
              ))}
            </ul>
          : <p className="text-center p-4">No low carbon activities</p>}
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytics;
