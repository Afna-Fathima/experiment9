import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import '../styles/AuthPage.css'
import { API_BASE_URL } from '../config/api'

function LoginPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [generalError, setGeneralError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error for this field
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }))
    setGeneralError('')
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.usernameOrEmail.trim()) {
      newErrors.usernameOrEmail = 'Username or email is required'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setGeneralError('')

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        usernameOrEmail: formData.usernameOrEmail,
        password: formData.password,
      }, {
        timeout: 10000,
      })

      // Store token in localStorage
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))

      // Redirect to dashboard
      navigate('/dashboard')
    } catch (error) {
      if (error.response?.data) {
        setGeneralError(error.response.data.message || 'Login failed. Please try again.')
      } else {
        setGeneralError('Network error. Please check your connection.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p className="subtitle">Login to your fitness account</p>

        {generalError && <div className="alert alert-error">{generalError}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Username or Email */}
          <div className="form-group">
            <label htmlFor="usernameOrEmail">Username or Email</label>
            <input
              type="text"
              id="usernameOrEmail"
              name="usernameOrEmail"
              value={formData.usernameOrEmail}
              onChange={handleChange}
              placeholder="Enter your username or email"
              className={errors.usernameOrEmail ? 'input-error' : ''}
              autoComplete="username"
            />
            {errors.usernameOrEmail && (
              <span className="error-message">{errors.usernameOrEmail}</span>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={errors.password ? 'input-error' : ''}
              autoComplete="current-password"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-links">
          <Link to="/forgot-password" className="forgot-password">
            Forgot Password?
          </Link>
        </div>

        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
