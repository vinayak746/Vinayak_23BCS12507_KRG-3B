import { memo } from "react";

/**
 * CounterDisplay — React.memo prevents re-renders when props haven't changed.
 */
const CounterDisplay = memo(({ count, goal, isGoalReached }) => {
  const percentage = Math.min((count / goal) * 100, 100);

  return (
    <div style={styles.card}>
      {/* Progress text */}
      <p style={styles.progress}>
        {count} / {goal} glasses completed
      </p>

      {/* Progress bar */}
      <div style={styles.barBg}>
        <div
          style={{
            ...styles.barFill,
            width: `${percentage}%`,
            backgroundColor: isGoalReached ? "#2e7d32" : "#1976d2",
          }}
        />
      </div>
      <p style={styles.percent}>{Math.round(percentage)}% of daily goal</p>

      {/* Goal reached message */}
      {isGoalReached && (
        <p style={styles.goalMsg}>🎉 Goal Reached!</p>
      )}
    </div>
  );
});

const styles = {
  card: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "16px",
  },
  progress: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#222",
    margin: "0 0 12px 0",
  },
  barBg: {
    width: "100%",
    height: "16px",
    backgroundColor: "#e0e0e0",
    borderRadius: "8px",
    overflow: "hidden",
    marginBottom: "6px",
  },
  barFill: {
    height: "100%",
    borderRadius: "8px",
    transition: "width 0.3s ease",
  },
  percent: {
    fontSize: "13px",
    color: "#888",
    margin: "0 0 8px 0",
  },
  goalMsg: {
    color: "#2e7d32",
    fontWeight: "bold",
    fontSize: "16px",
    margin: "8px 0 0 0",
  },
};

CounterDisplay.displayName = "CounterDisplay";

export default CounterDisplay;
