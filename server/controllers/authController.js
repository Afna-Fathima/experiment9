const User = require('../models/User')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'fitness-app-secret-key-change-in-production', {
    expiresIn: '7d',
  })
}

// Validate password strength
const validatePassword = (password) => {
  const errors = []

  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one digit')
  }

  return errors
}

// Register a new user
exports.register = async (req, res) => {
  try {
    const { fullName, email, username, password, confirmPassword } = req.body

    // Validate all required fields
    if (!fullName || !email || !username || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      })
    }

    // Validate email format
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
      })
    }

    // Validate username format
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      return res.status(400).json({
        success: false,
        message: 'Username can only contain letters, numbers, underscores, and hyphens',
      })
    }

    if (username.length < 3 || username.length > 30) {
      return res.status(400).json({
        success: false,
        message: 'Username must be between 3 and 30 characters',
      })
    }

    // Check password strength
    const passwordErrors = validatePassword(password)
    if (passwordErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Password does not meet security requirements',
        errors: passwordErrors,
      })
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match',
      })
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email: email.toLowerCase() })
    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: 'Email is already registered. Please use a different email or try logging in.',
      })
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username: username.toLowerCase() })
    if (existingUsername) {
      return res.status(409).json({
        success: false,
        message: 'Username is already taken. Please choose a different username.',
      })
    }

    // Create new user
    const user = new User({
      fullName,
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password,
      emailVerified: false,
    })

    // Save user to database
    await user.save()

    // Generate JWT token
    const token = generateToken(user._id)

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: user.toJSON(),
    })
  } catch (error) {
    console.error('Registration error:', error)

    // Handle validation errors from Mongoose
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message)
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: messages,
      })
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0]
      return res.status(409).json({
        success: false,
        message: `${field.charAt(0).toUpperCase() + field.slice(1)} is already in use`,
      })
    }

    res.status(500).json({
      success: false,
      message: 'An error occurred during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
}

// Login user
exports.login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body

    // Validate input
    if (!usernameOrEmail || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username/Email and password are required',
      })
    }

    // Find user by username or email (case-insensitive)
    const user = await User.findOne({
      $or: [
        { username: usernameOrEmail.toLowerCase() },
        { email: usernameOrEmail.toLowerCase() },
      ],
    }).select('+password')

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username/email or password',
      })
    }

    // Compare password
    const isPasswordMatch = await user.comparePassword(password)
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username/email or password',
      })
    }

    // Generate JWT token
    const token = generateToken(user._id)

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: user.toJSON(),
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      message: 'An error occurred during login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
}

// Get current user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    res.json({
      success: true,
      user: user.toJSON(),
    })
  } catch (error) {
    console.error('Get profile error:', error)
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching profile',
    })
  }
}

// Logout user (client-side token deletion)
exports.logout = (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully',
  })
}

