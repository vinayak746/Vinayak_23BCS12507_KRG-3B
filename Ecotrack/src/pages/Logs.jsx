import { logs } from "../data/logs";
const Logs = () => {
    const logEntries = logs.reduce((acc, log) => {
        if(log.carbon>0)acc += log.carbon;
        return acc;
    }, 0);
    const filterLogs = logs.filter(log => log.carbon > 0);
    const highCarbonLogs = filterLogs.filter(log => log.carbon >= 4);
    const lowCarbonLogs = filterLogs.filter(log => log.carbon < 4);
    return(
        <div className="flex flex-col items-center mt-5 p-3 ">
            
            <h2 className="font-bold text-xl mb-3">Carbon FootPrint: {logEntries}kgs</h2>
            <ul>
                {filterLogs.map(log =>(
                    <li  key={log.id}
                        style={{color: log.carbon>=4?"red": "green"}}
                    >
                    
                        {log.activity}: {log.carbon}kgs
                    </li>
                ))}
            </ul>
            <h2 className="text-xl mt-3 font-bold mb-3 ">Daily Logs</h2>
             <ul>
                {highCarbonLogs.map(log =>(
                    <li key={log.id}>
                      {log.activity}: <span style={{color: "red"}}>{log.carbon}kg</span>
                    </li>
                ))}
            </ul>
            <h2 className="text-xl mt-3 font-bold mb-3 ">Low Carbon Activity</h2>
            <ul>
                {lowCarbonLogs.map(log =>(
                    <li key={log.id}>
                        {log.activity}: <span style={{color: "green"}}>{log.carbon}kgs</span>
                    </li>
                ))}
            </ul>

           
            
        </div>
    )
}
export default Logs; 