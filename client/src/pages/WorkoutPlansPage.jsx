import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Features.css'

function WorkoutPlansPage() {
  const navigate = useNavigate()
  const [workouts, setWorkouts] = useState([
    {
      id: 1,
      name: 'Full Body Strength',
      duration: '60 mins',
      difficulty: 'Intermediate',
      exercises: ['Squats', 'Bench Press', 'Rows', 'Deadlifts'],
      completed: false
    },
    {
      id: 2,
      name: 'Cardio Blast',
      duration: '45 mins',
      difficulty: 'Beginner',
      exercises: ['Running', 'Jump Rope', 'Cycling'],
      completed: false
    },
    {
      id: 3,
      name: 'HIIT Training',
      duration: '30 mins',
      difficulty: 'Advanced',
      exercises: ['Burpees', 'Mountain Climbers', 'Jump Squats'],
      completed: false
    },
  ])

  const toggleCompleted = (id) => {
    setWorkouts(workouts.map(w => w.id === id ? { ...w, completed: !w.completed } : w))
  }

  return (
    <div className="feature-page">
      <header className="feature-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>← Back</button>
        <h1>🏋️ Workout Plans</h1>
      </header>

      <main className="feature-content">
        <div className="workouts-grid">
          {workouts.map(workout => (
            <div key={workout.id} className={`workout-card ${workout.completed ? 'completed' : ''}`}>
              <div className="workout-header">
                <h3>{workout.name}</h3>
                <input
                  type="checkbox"
                  checked={workout.completed}
                  onChange={() => toggleCompleted(workout.id)}
                  className="workout-checkbox"
                />
              </div>

              <div className="workout-info">
                <span className="duration">⏱️ {workout.duration}</span>
                <span className={`difficulty ${workout.difficulty.toLowerCase()}`}>
                  {workout.difficulty}
                </span>
              </div>

              <div className="exercises">
                <h4>Exercises:</h4>
                <ul>
                  {workout.exercises.map((ex, idx) => (
                    <li key={idx}>✓ {ex}</li>
                  ))}
                </ul>
              </div>

              <button className={`btn-start ${workout.completed ? 'completed-btn' : ''}`}>
                {workout.completed ? '✓ Completed' : 'Start Workout'}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default WorkoutPlansPage
