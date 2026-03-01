import { useState, useEffect, useCallback, useMemo } from "react";
import Header from "../components/Header";
import CounterDisplay from "../components/CounterDisplay";

const WaterTracker = () => {
  // State Management
  const [count, setCount] = useState(0);
  const [goal, setGoal] = useState(8);
  const [tipText, setTipText] = useState("");
  const [tipLoading, setTipLoading] = useState(true);
  const [tipError, setTipError] = useState(null);
  const [goalInput, setGoalInput] = useState("8");

  // Load data from localStorage on mount
  useEffect(() => {
    const savedCount = localStorage.getItem("waterCount");
    const savedGoal = localStorage.getItem("waterGoal");
    const savedDate = localStorage.getItem("waterDate");

    const today = new Date().toDateString();

    // Reset count if it's a new day
    if (savedDate !== today) {
      setCount(0);
      localStorage.setItem("waterDate", today);
      localStorage.setItem("waterCount", "0");
    } else if (savedCount !== null) {
      setCount(parseInt(savedCount, 10));
    }

    if (savedGoal !== null) {
      const parsedGoal = parseInt(savedGoal, 10);
      setGoal(parsedGoal);
      setGoalInput(parsedGoal.toString());
    }
  }, []);

  // Save count to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("waterCount", count.toString());
  }, [count]);

  // Fetch health tip from API
  useEffect(() => {
    const fetchTip = async () => {
      try {
        setTipLoading(true);
        setTipError(null);
        const response = await fetch("https://api.adviceslip.com/advice");
        const data = await response.json();

        if (data.slip && data.slip.advice) {
          setTipText(data.slip.advice);
        } else {
          setTipError("Could not fetch health tip");
        }
      } catch (error) {
        setTipError("Failed to fetch health tip. Please try again later.");
        console.error("Error fetching tip:", error);
      } finally {
        setTipLoading(false);
      }
    };

    fetchTip();
  }, []);

  // Memoized handlers using useCallback
  const addWater = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  const removeWater = useCallback(() => {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  }, []);

  const resetCount = useCallback(() => {
    setCount(0);
    localStorage.setItem("waterCount", "0");
  }, []);

  const saveGoal = useCallback(() => {
    const newGoal = parseInt(goalInput, 10);
    if (!isNaN(newGoal) && newGoal > 0) {
      setGoal(newGoal);
      localStorage.setItem("waterGoal", newGoal.toString());
    } else {
      alert("Please enter a valid goal number");
    }
  }, [goalInput]);

  const fetchNewTip = useCallback(async () => {
    try {
      setTipLoading(true);
      setTipError(null);
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.json();

      if (data.slip && data.slip.advice) {
        setTipText(data.slip.advice);
      } else {
        setTipError("Could not fetch health tip");
      }
    } catch (error) {
      setTipError("Failed to fetch health tip. Please try again later.");
      console.error("Error fetching tip:", error);
    } finally {
      setTipLoading(false);
    }
  }, []);

  // Memoize the goal reached status
  const isGoalReached = useMemo(() => count >= goal, [count, goal]);

  return (
    <div>
      <Header />
      <div style={styles.page}>
        <h2 style={styles.heading}>💧 Water Intake Tracker</h2>
        <p style={styles.subtext}>Track how many glasses of water you drink today.</p>

        {/* Counter Display - memoized component */}
        <CounterDisplay count={count} goal={goal} isGoalReached={isGoalReached} />

        {/* Controls */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Controls</h3>
          <div style={styles.btnRow}>
            <button onClick={addWater} style={styles.btnGreen}>+ Add Water</button>
            <button onClick={removeWater} style={styles.btnRed}>– Remove Water</button>
            <button onClick={resetCount} style={styles.btnGray}>Reset</button>
          </div>
        </div>

        {/* Goal Setting */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Daily Goal</h3>
          <div style={styles.goalRow}>
            <input
              type="number"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              min={1}
              max={20}
              style={styles.input}
            />
            <button onClick={saveGoal} style={styles.btnBlue}>Save Goal</button>
          </div>
          <p style={styles.hint}>Current goal: {goal} glasses per day</p>
        </div>

        {/* Health Tip */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>💡 Health Tip</h3>
          {tipLoading ? (
            <p style={styles.hint}>Loading tip...</p>
          ) : tipError ? (
            <p style={{ color: "red" }}>{tipError}</p>
          ) : (
            <>
              <p style={styles.tipText}>Today's Health Tip: {tipText}</p>
              <button onClick={fetchNewTip} style={styles.btnGray}>Get Another Tip</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    maxWidth: "640px",
    margin: "0 auto",
    padding: "24px 16px",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "4px",
    color: "#222",
  },
  subtext: {
    color: "#666",
    marginBottom: "24px",
  },
  card: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "16px",
  },
  cardTitle: {
    margin: "0 0 16px 0",
    fontSize: "16px",
    color: "#333",
  },
  btnRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  btnGreen: {
    backgroundColor: "#2e7d32",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    fontSize: "15px",
    cursor: "pointer",
    flex: 1,
  },
  btnRed: {
    backgroundColor: "#fff",
    color: "#d32f2f",
    border: "1px solid #d32f2f",
    padding: "10px 20px",
    borderRadius: "6px",
    fontSize: "15px",
    cursor: "pointer",
    flex: 1,
  },
  btnGray: {
    backgroundColor: "#fff",
    color: "#555",
    border: "1px solid #aaa",
    padding: "10px 20px",
    borderRadius: "6px",
    fontSize: "15px",
    cursor: "pointer",
    flex: 1,
  },
  btnBlue: {
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    fontSize: "15px",
    cursor: "pointer",
  },
  goalRow: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    marginBottom: "8px",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "15px",
  },
  hint: {
    color: "#888",
    fontSize: "13px",
    margin: "4px 0 0 0",
  },
  tipText: {
    fontStyle: "italic",
    color: "#444",
    marginBottom: "12px",
    lineHeight: "1.6",
  },
};

export default WaterTracker;
