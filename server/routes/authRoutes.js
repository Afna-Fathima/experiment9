const express = require('express')
const { register, login, getProfile, logout } = require('../controllers/authController')
const { verifyToken } = require('../middleware/auth')

const router = express.Router()

// POST /api/auth/register - Register a new user
router.post('/auth/register', register)

// POST /api/auth/login - Login user
router.post('/auth/login', login)

// GET /api/auth/profile - Get user profile (protected route)
router.get('/auth/profile', verifyToken, getProfile)

// POST /api/auth/logout - Logout user
router.post('/auth/logout', verifyToken, logout)

module.exports = router
