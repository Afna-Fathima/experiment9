const jwt = require('jsonwebtoken')

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Please log in.',
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fitness-app-secret-key-change-in-production')
    req.user = decoded
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired. Please log in again.',
      })
    }

    res.status(401).json({
      success: false,
      message: 'Invalid token. Please log in.',
    })
  }
}

module.exports = { verifyToken }
