import { logs } from "../data/logs";
import Header from "../components/Header";

const Logs = () => {
  const logEntries = logs.reduce((acc, log) => {
    if (log.carbon > 0) acc += log.carbon;
    return acc;
  }, 0);
  const filterLogs = logs.filter((log) => log.carbon > 0);
  const highCarbonLogs = filterLogs.filter((log) => log.carbon >= 4);
  const lowCarbonLogs = filterLogs.filter((log) => log.carbon < 4);

  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-center text-3xl font-bold mb-8 mt-6">
          Activity Logs
        </h2>

        <div className="p-6 mb-8">
          <h3 className="mb-2">Total Carbon Footprint</h3>
          <p>{logEntries}kg</p>
        </div>

        <div className="p-6 mb-8">
          <h3 className="mb-4">All Activities</h3>
          <div className="flex flex-col gap-3">
            {filterLogs.length > 0 ?
              filterLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex justify-between items-center p-4"
                >
                  <span>{log.activity}</span>
                  <span
                    className={
                      log.carbon >= 4 ? "text-red-600" : "text-green-600"
                    }
                  >
                    {log.carbon}kg
                  </span>
                </div>
              ))
            : <p className="text-center p-4">No activities logged</p>}
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
    </div>
  );
};
export default Logs;
