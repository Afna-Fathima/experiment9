import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Features.css'

function PerformancePage() {
  const navigate = useNavigate()
  const [stats] = useState([
    { label: 'Workouts This Week', value: 5, trend: '↑ 20%', unit: '' },
    { label: 'Total Calories Burned', value: 3500, trend: '↑ 15%', unit: 'kcal' },
    { label: 'Average Heart Rate', value: 85, trend: '↓ 5%', unit: 'bpm' },
    { label: 'Total Distance', value: 42, trend: '↑ 8%', unit: 'km' },
    { label: 'Personal Records', value: 8, trend: '↑ 2', unit: '' },
    { label: 'Streak Days', value: 12, trend: '↑ Active', unit: 'days' },
  ])

  const [weekData] = useState([
    { day: 'Mon', calories: 450 },
    { day: 'Tue', calories: 520 },
    { day: 'Wed', calories: 380 },
    { day: 'Thu', calories: 600 },
    { day: 'Fri', calories: 490 },
    { day: 'Sat', calories: 700 },
    { day: 'Sun', calories: 360 },
  ])

  const maxCalories = Math.max(...weekData.map(d => d.calories))

  return (
    <div className="feature-page">
      <header className="feature-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>← Back</button>
        <h1>💪 Performance Metrics</h1>
      </header>

      <main className="feature-content">
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <h4>{stat.label}</h4>
              <div className="stat-value">
                {stat.value}{stat.unit}
              </div>
              <div className="stat-trend">{stat.trend}</div>
            </div>
          ))}
        </div>

        <div className="chart-section">
          <h2>Weekly Calories Burned</h2>
          <div className="bar-chart">
            {weekData.map((data, idx) => (
              <div key={idx} className="bar-container">
                <div 
                  className="bar" 
                  style={{ height: `${(data.calories / maxCalories) * 100}%` }}
                  title={`${data.calories} kcal`}
                ></div>
                <span className="bar-label">{data.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="achievements-section">
          <h2>Recent Achievements</h2>
          <div className="achievements-list">
            <div className="achievement">
              <span className="badge">🥇</span>
              <div>
                <h4>First 5K Run</h4>
                <p>Completed your first 5K run</p>
              </div>
            </div>
            <div className="achievement">
              <span className="badge">🔥</span>
              <div>
                <h4>7-Day Streak</h4>
                <p>Worked out for 7 consecutive days</p>
              </div>
            </div>
            <div className="achievement">
              <span className="badge">⭐</span>
              <div>
                <h4>1000 Calories</h4>
                <p>Burned 1000 calories in a single workout</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default PerformancePage
