import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState<number>(0);
  const [running, setIsRunning] = useState<boolean>(false);

  const randomiseCount = useCallback(() => {
    if (!running) return;
    setCount(Math.floor(Math.random() * 100));
  }, [running]);

  const toggleRunning = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      randomiseCount();
    }, 100);

    // Tzv cleanup funkcia, toto je moja poznámka
    return () => {
      clearInterval(interval);
    };
  }, [randomiseCount]);

  return (
    <>
      <h1>Skušobná PWA app</h1>
      <div className="card">
        <button onClick={toggleRunning}>count is {count}</button>
      </div>
    </>
  );
}

export default App;
