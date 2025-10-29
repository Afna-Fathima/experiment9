// API Configuration
// Uses environment variable VITE_API_URL for production
// Falls back to localhost:5000 for development

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

console.log(`🚀 API Base URL: ${API_BASE_URL}`)
