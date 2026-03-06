import React, { Component } from 'react';
import RepetitionExercise from './components/RepetitionExercise';
import DurationExercise from './components/DurationExercise';
import IntervalExercise from './components/IntervalExercise';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentExercise: null,
    };
  }

  handleSelectExercise = (exercise) => {
    this.setState({ currentExercise: exercise });
  };

  render() {
    const { currentExercise } = this.state;

    let screen;

    if (!currentExercise) {
      screen = (
        <div className="main-menu">
          <h1 className="main-title">Your Custom Exercise Plan</h1>

          <div className="exercise-list">
            <div className="exercise-item">
              <h2>Push Ups:</h2>
              <p><em>Reps: 3 sets of 10 push ups</em></p>
              <button
                className="exercise-btn"
                onClick={() => this.handleSelectExercise({ name: 'Push Ups', type: 'repetition' })}
              >
                Start Push Ups
              </button>
            </div>

            <div className="exercise-item">
              <h2>Running:</h2>
              <p><em>Duration: 30 minutes</em></p>
              <button
                className="exercise-btn"
                onClick={() => this.handleSelectExercise({ name: 'Running', type: 'duration' })}
              >
                Start Running
              </button>
            </div>

            <div className="exercise-item">
              <h2>Plank:</h2>
              <p><em>Reps: 6 sets of 10-second holds</em></p>
              <button
                className="exercise-btn"
                onClick={() => this.handleSelectExercise({ name: 'Plank', type: 'repetition' })}
              >
                Start Plank
              </button>
            </div>

            <div className="exercise-item">
              <h2>Jump Rope:</h2>
              <p><em>Intervals: 30s work / 10s rest</em></p>
              <button
                className="exercise-btn"
                onClick={() => this.handleSelectExercise({ name: 'Jump Rope', type: 'interval' })}
              >
                Start Jump Rope
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      const { name, type } = currentExercise;

      let ExerciseComponent;
      if (type === 'repetition') {
        ExerciseComponent = RepetitionExercise;
      } else if (type === 'interval') {
        ExerciseComponent = IntervalExercise;
      } else {
        ExerciseComponent = DurationExercise;
      }

      screen = (
        <div className="exercise-screen">
          <h2 className="currently-label">Currently:</h2>
          <ExerciseComponent name={name} />
        </div>
      );
    }

    return <div className="App">{screen}</div>;
  }
}

export default App;
