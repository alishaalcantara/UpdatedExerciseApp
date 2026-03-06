import React, { useState } from 'react';
import './RepetitionExercise.css';

function RepetitionExercise({ name }) {
  const [count, setCount] = useState(0);

  const increment = () => setCount(c => c + 1);
  const reset = () => setCount(0);

  return (
    <div className="repetition-exercise">
      <h1 className="exercise-name">{name}</h1>
      <div className="svg-wrapper">
        <img src="/pushup-icon.png" alt={name} className="exercise-img" />
      </div>
      <div className="counter-display">
        <span className="counter-value">{String(count).padStart(2, '0')}</span>
        <span className="counter-label">reps</span>
      </div>
      <div className="exercise-controls">
        <button className="action-btn increment-btn" onClick={increment}>
          + Rep
        </button>
        <button className="action-btn reset-btn" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default RepetitionExercise;
