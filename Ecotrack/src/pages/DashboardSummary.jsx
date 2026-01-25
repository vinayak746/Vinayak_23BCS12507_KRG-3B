import { logs } from "../data/logs";

const DashboardSummary = () => {
  const totalCarbon = logs.reduce((acc, log) => {
    if (log.carbon > 0) acc += log.carbon;
    return acc;
  }, 0);

  const averageCarbon = (totalCarbon / logs.length).toFixed(2);
  const highestActivity = logs.reduce((max, log) =>
    log.carbon > max.carbon ? log : max,
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="p-6">
        <p>{highestActivity.activity}</p>
        <p className="mt-2">{highestActivity.carbon}kg CO₂</p>
      </div>
    </div>
  );
};

export default DashboardSummary;
