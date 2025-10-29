import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/Dashboard.css'

function DashboardPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        navigate('/login')
        return
      }

      try {
        const API_URL = 'http://localhost:5000'
        const response = await axios.get(`${API_URL}/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        })

        setUser(response.data.user)
        setLoading(false)
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          navigate('/login')
        } else {
          setError('Failed to load profile')
          setLoading(false)
        }
      }
    }

    fetchUserProfile()
  }, [navigate])

  const handleLogout = async () => {
    const token = localStorage.getItem('token')

    try {
      const API_URL = 'http://localhost:5000'
      await axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        }
      )
    } catch (err) {
      console.error('Logout error:', err)
    }

    // Clear local storage
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    // Redirect to login
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-message">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/login')}>Back to Login</button>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>💪 Fitness Dashboard</h1>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="welcome-section">
          <h2>Welcome, {user?.fullName}!</h2>
          <p>Your fitness journey starts here</p>
        </div>

        <div className="user-info-card">
          <h3>Your Profile</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Full Name</label>
              <p>{user?.fullName}</p>
            </div>
            <div className="info-item">
              <label>Username</label>
              <p>@{user?.username}</p>
            </div>
            <div className="info-item">
              <label>Email</label>
              <p>{user?.email}</p>
            </div>
            <div className="info-item">
              <label>Member Since</label>
              <p>{new Date(user?.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="features-grid">
          <div 
            className="feature-card clickable"
            onClick={() => navigate('/track-progress')}
            role="button"
            tabIndex="0"
            onKeyPress={(e) => e.key === 'Enter' && navigate('/track-progress')}
          >
            <div className="feature-icon">📊</div>
            <h3>Track Progress</h3>
            <p>Monitor your fitness goals and achievements</p>
          </div>

          <div 
            className="feature-card clickable"
            onClick={() => navigate('/workout-plans')}
            role="button"
            tabIndex="0"
            onKeyPress={(e) => e.key === 'Enter' && navigate('/workout-plans')}
          >
            <div className="feature-icon">🏋️</div>
            <h3>Workout Plans</h3>
            <p>Access personalized workout routines</p>
          </div>

          <div 
            className="feature-card clickable"
            onClick={() => navigate('/diet-plans')}
            role="button"
            tabIndex="0"
            onKeyPress={(e) => e.key === 'Enter' && navigate('/diet-plans')}
          >
            <div className="feature-icon">🥗</div>
            <h3>Diet Plans</h3>
            <p>Get customized nutrition guidelines</p>
          </div>

          <div 
            className="feature-card clickable"
            onClick={() => navigate('/performance')}
            role="button"
            tabIndex="0"
            onKeyPress={(e) => e.key === 'Enter' && navigate('/performance')}
          >
            <div className="feature-icon">💪</div>
            <h3>Performance</h3>
            <p>Analyze your fitness performance metrics</p>
          </div>
        </div>

        <section className="stats-section">
          <h3>Quick Stats</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">0</div>
              <div className="stat-label">Workouts Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">0</div>
              <div className="stat-label">Calories Burned</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">0</div>
              <div className="stat-label">Goals Achieved</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">0</div>
              <div className="stat-label">Days Streak</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default DashboardPage
