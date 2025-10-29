const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')

// Load environment variables
dotenv.config()

// Initialize app
const app = express()

// Connect to database
connectDB()

// Middleware
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://fitness-app-client-iv5b.onrender.com',
      'https://fitness-app-client-lv5b.onrender.com',
      process.env.CLIENT_URL,
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Request logging middleware (optional)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
  next()
})

// Routes
app.use('/api', authRoutes)

// Basic health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err : undefined,
  })
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║    FITNESS APP SERVER STARTED          ║
║    Environment: ${(process.env.NODE_ENV || 'development').padEnd(17)}║
║    Port: ${PORT.toString().padEnd(27)}║
║    Database: MongoDB                   ║
╚════════════════════════════════════════╝
  `)
})
