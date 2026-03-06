import React, { useState, useEffect, useRef } from 'react';
import './DurationExercise.css';


function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function DurationExercise({ name }) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <div className="duration-exercise">
      <h1 className="exercise-name">{name}</h1>
      <div className="svg-wrapper">
        <img src="/running-icon.jpg" alt={name} className="exercise-img" />
      </div>
      <div className="timer-display">
        <span className="timer-value">{formatTime(seconds)}</span>
        <span className="timer-label">elapsed</span>
      </div>
      <div className="exercise-controls">
        {!isRunning ? (
          <button className="action-btn start-btn" onClick={handleStart}>
            Start
          </button>
        ) : (
          <button className="action-btn stop-btn" onClick={handleStop}>
            Stop
          </button>
        )}
        <button className="action-btn reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default DurationExercise;
