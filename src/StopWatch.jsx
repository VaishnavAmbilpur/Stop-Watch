import React, { useState, useEffect, useRef } from 'react';
import './StopWatch.css';

const StopWatch = () => {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);
  const startRef = useRef(0);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setElapsed(Date.now() - startRef.current);
      }, 100);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const start = () => {
    setRunning(true);
    startRef.current = Date.now() - elapsed;
  };

  const stop = () => setRunning(false);

  const reset = () => {
    setElapsed(0);
    setRunning(false);
  };

  const format = () => {
    const minutes = String(Math.floor(elapsed / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((elapsed / 1000) % 60)).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="stopwatch">
      <h1 className="stopwatch-heading">Stop Watch</h1>
      <div className="display">{format()}</div>
      <div className="controls">
        <button className="btn" onClick={start}>Start</button>
        <button className="btn" onClick={stop}>Stop</button>
        <button className="btn" onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default StopWatch;