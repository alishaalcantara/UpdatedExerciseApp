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

      {/* Non-functional route map visual */}
      <div className="map-placeholder">
        <span className="map-caption">Route Map</span>
        <svg className="route-svg" viewBox="0 0 300 140" xmlns="http://www.w3.org/2000/svg">
          {/* Grid lines */}
          {[0, 1, 2, 3].map(i => (
            <line
              key={`h${i}`}
              x1="10" y1={30 + i * 28} x2="290" y2={30 + i * 28}
              stroke="#e0e0e0" strokeWidth="1"
            />
          ))}
          {[0, 1, 2, 3, 4, 5].map(i => (
            <line
              key={`v${i}`}
              x1={10 + i * 56} y1="10" x2={10 + i * 56} y2="130"
              stroke="#e0e0e0" strokeWidth="1"
            />
          ))}
          {/* Route path */}
          <polyline
            points="20,115 55,85 90,100 130,55 170,75 210,35 250,55 280,40"
            fill="none"
            stroke="#000"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Start dot */}
          <circle cx="20" cy="115" r="5" fill="#000" />
          {/* End dot */}
          <circle cx="280" cy="40" r="5" fill="#000" opacity="0.4" />
          <text x="24" y="130" fontSize="9" fill="#555" fontFamily="Georgia, serif">Start</text>
          <text x="258" y="36" fontSize="9" fill="#555" fontFamily="Georgia, serif">End</text>
        </svg>
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
