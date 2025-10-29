import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import '../styles/AuthPage.css'
import { API_BASE_URL } from '../config/api'

function RegistrationPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [generalError, setGeneralError] = useState('')

  // Password strength indicators
  const [passwordStrength, setPasswordStrength] = useState({
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasMinLength: false,
  })

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

    // Check password strength
    if (name === 'password') {
      setPasswordStrength({
        hasUppercase: /[A-Z]/.test(value),
        hasLowercase: /[a-z]/.test(value),
        hasNumber: /[0-9]/.test(value),
        hasMinLength: value.length >= 6,
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Validate Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters'
    }

    // Validate Email
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Validate Username
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    } else if (formData.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    } else if (formData.username.trim().length > 30) {
      newErrors.username = 'Username cannot exceed 30 characters'
    } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, underscores, and hyphens'
    }

    // Validate Password
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter'
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter'
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one digit'
    }

    // Validate Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setGeneralError('')
    setSuccessMessage('')

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        fullName: formData.fullName,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      }, {
        timeout: 10000,
      })

      setSuccessMessage('Registration successful! Redirecting to dashboard...')

      // Store token in localStorage
      localStorage.setItem('token', response.data.token)

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)
    } catch (error) {
      if (error.response?.data) {
        const errorData = error.response.data
        if (errorData.errors) {
          setErrors((prev) => ({
            ...prev,
            general: errorData.errors.join(', '),
          }))
        } else {
          setGeneralError(errorData.message || 'Registration failed. Please try again.')
        }
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
        <h1>Create Your Account</h1>
        <p className="subtitle">Join the fitness revolution</p>

        {generalError && <div className="alert alert-error">{generalError}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className={errors.fullName ? 'input-error' : ''}
            />
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* Username */}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="john_doe"
              className={errors.username ? 'input-error' : ''}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
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
              placeholder="Enter a strong password"
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}

            {formData.password && (
              <div className="password-strength">
                <div className={`strength-item ${passwordStrength.hasMinLength ? 'met' : ''}`}>
                  {passwordStrength.hasMinLength ? '✓' : '✗'} At least 6 characters
                </div>
                <div className={`strength-item ${passwordStrength.hasUppercase ? 'met' : ''}`}>
                  {passwordStrength.hasUppercase ? '✓' : '✗'} One uppercase letter
                </div>
                <div className={`strength-item ${passwordStrength.hasLowercase ? 'met' : ''}`}>
                  {passwordStrength.hasLowercase ? '✓' : '✗'} One lowercase letter
                </div>
                <div className={`strength-item ${passwordStrength.hasNumber ? 'met' : ''}`}>
                  {passwordStrength.hasNumber ? '✓' : '✗'} One digit
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className={errors.confirmPassword ? 'input-error' : ''}
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegistrationPage
