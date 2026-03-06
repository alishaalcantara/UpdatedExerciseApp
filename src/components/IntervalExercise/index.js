import React, { useState, useEffect, useRef } from 'react';
import './IntervalExercise.css';

const WORK_SECONDS = 30;
const REST_SECONDS = 10;

function IntervalExercise({ name }) {
  const [phase, setPhase] = useState('work');
  const [timeLeft, setTimeLeft] = useState(WORK_SECONDS);
  const [intervals, setIntervals] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const phaseRef = useRef('work');
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            const current = phaseRef.current;
            if (current === 'work') {
              phaseRef.current = 'rest';
              setPhase('rest');
              return REST_SECONDS;
            } else {
              phaseRef.current = 'work';
              setPhase('work');
              setIntervals(i => i + 1);
              return WORK_SECONDS;
            }
          }
          return t - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleReset = () => {
    setIsRunning(false);
    phaseRef.current = 'work';
    setPhase('work');
    setTimeLeft(WORK_SECONDS);
    setIntervals(0);
  };

  return (
    <div className="interval-exercise">
      <h1 className="exercise-name">{name}</h1>

      <div className="svg-wrapper">
        <img src="/jumprope-icon.svg" alt={name} className="exercise-img" />
      </div>

      <div className={`phase-badge phase-${phase}`}>
        {phase === 'work' ? 'WORK' : 'REST'}
      </div>

      <div className="timer-display">
        <span className="timer-value">{String(timeLeft).padStart(2, '0')}</span>
        <span className="timer-label">seconds</span>
      </div>

      <div className="intervals-display">
        <span className="intervals-value">{intervals}</span>
        <span className="intervals-label">intervals completed</span>
      </div>

      <div className="phase-info">
        <span>{phase === 'work' ? `Work ${WORK_SECONDS}s / Rest ${REST_SECONDS}s` : `Rest — next: Work ${WORK_SECONDS}s`}</span>
      </div>

      <div className="exercise-controls">
        {!isRunning ? (
          <button className="action-btn start-btn" onClick={() => setIsRunning(true)}>
            Start
          </button>
        ) : (
          <button className="action-btn stop-btn" onClick={() => setIsRunning(false)}>
            Pause
          </button>
        )}
        <button className="action-btn reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default IntervalExercise;
