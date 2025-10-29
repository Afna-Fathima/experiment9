import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Features.css'

function TrackProgressPage() {
  const navigate = useNavigate()
  const [goals, setGoals] = useState([
    { id: 1, name: 'Run 5K', progress: 60, unit: '%' },
    { id: 2, name: 'Weight Loss', progress: 8, unit: 'lbs' },
    { id: 3, name: 'Push-ups', progress: 45, unit: 'reps' },
  ])

  const [newGoal, setNewGoal] = useState('')

  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, { id: Date.now(), name: newGoal, progress: 0, unit: '%' }])
      setNewGoal('')
    }
  }

  const updateProgress = (id, value) => {
    setGoals(goals.map(goal => goal.id === id ? { ...goal, progress: value } : goal))
  }

  return (
    <div className="feature-page">
      <header className="feature-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>← Back</button>
        <h1>📊 Track Progress</h1>
      </header>

      <main className="feature-content">
        <div className="add-goal-section">
          <h2>Add New Goal</h2>
          <div className="input-group">
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="Enter your fitness goal..."
            />
            <button onClick={addGoal} className="btn-add">Add Goal</button>
          </div>
        </div>

        <div className="goals-list">
          <h2>Your Goals</h2>
          {goals.map(goal => (
            <div key={goal.id} className="goal-card">
              <h3>{goal.name}</h3>
              <div className="progress-bar-container">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
                <span className="progress-text">{goal.progress}{goal.unit}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={goal.progress}
                onChange={(e) => updateProgress(goal.id, parseInt(e.target.value))}
                className="progress-slider"
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default TrackProgressPage
