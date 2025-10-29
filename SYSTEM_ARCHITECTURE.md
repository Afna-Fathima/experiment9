# 🗺️ COMPLETE SYSTEM ARCHITECTURE & FLOW DIAGRAM

## 🏗️ SYSTEM ARCHITECTURE

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│                    🌍 INTERNET BROWSER                        │
│                   (http://localhost:3000)                      │
│                                                                │
└───────────────────────────┬──────────────────────────────────┘
                            │
                            │ HTTP/AJAX Requests
                            ↓
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│        🔵 REACT FRONTEND (Port 3000)                          │
│                                                                │
│  ├─ LoginPage.jsx                                            │
│  ├─ RegistrationPage.jsx                                     │
│  ├─ DashboardPage.jsx (Hub with 4 feature cards)            │
│  ├─ TrackProgressPage.jsx                                    │
│  ├─ WorkoutPlansPage.jsx                                     │
│  ├─ DietPlansPage.jsx                                        │
│  ├─ PerformancePage.jsx                                      │
│  │                                                             │
│  ├─ Styles: AuthPage.css + Dashboard.css + Features.css      │
│  ├─ Router: React Router v6 (7 routes)                       │
│  ├─ HTTP Client: Axios                                        │
│  └─ Auth: localStorage (JWT tokens)                           │
│                                                                │
└───────────────────────────┬──────────────────────────────────┘
                            │
                            │ Axios HTTP with JWT Token
                            │ (Bearer Token in Header)
                            ↓
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│        🟢 NODE.JS/EXPRESS BACKEND (Port 5000)                │
│                                                                │
│  API Routes:                                                  │
│  ├─ POST   /api/auth/register   → Create User               │
│  ├─ POST   /api/auth/login      → Authenticate              │
│  ├─ GET    /api/auth/profile    → Get User (Protected)      │
│  └─ POST   /api/auth/logout     → Logout (Protected)        │
│                                                                │
│  Controllers:                                                 │
│  └─ authController.js (4 functions)                          │
│                                                                │
│  Middleware:                                                  │
│  └─ auth.js (JWT verification)                               │
│                                                                │
│  Security:                                                    │
│  ├─ bcryptjs (password hashing)                             │
│  ├─ JWT (token generation)                                   │
│  ├─ CORS (cross-origin requests)                             │
│  └─ Input validation                                         │
│                                                                │
└───────────────────────────┬──────────────────────────────────┘
                            │\n                            │ Mongoose ODM
                            ↓
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│        🟠 MONGODB DATABASE (localhost:27017)                 │
│                                                                │
│  Collections:                                                 │
│  └─ Users                                                     │
│     ├─ _id (ObjectId)                                        │
│     ├─ fullName (String)                                     │
│     ├─ email (String, unique, indexed)                       │
│     ├─ username (String, unique, indexed)                    │
│     ├─ password (String, hashed)                             │
│     ├─ emailVerified (Boolean)                               │
│     ├─ verificationToken (String)                            │
│     ├─ createdAt (Date)                                      │
│     └─ updatedAt (Date)                                      │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## 🔄 USER FLOW DIAGRAM

```
┌─────────────────────────────────────────────────────────────────┐
│                    START: Open App                              │
│                  localhost:3000                                 │
└────────────────────┬────────────────────────────────────────────┘
                     ↓
        ┌────────────────────────────┐
        │ Check localStorage Token   │
        └────────┬───────────────────┘
                 │
        ┌────────┴────────┐
        ↓                 ↓
    TOKEN EXISTS      NO TOKEN
        │                 │
        ↓                 ↓
    ┌────────┐      ┌──────────────┐
    │ GO TO  │      │ LOGIN PAGE   │
    │DASHBOARD     │              │
    └────────┘      │ ┌──────────┐ │
        ↓           │ │ Register?│ │
        │           │ └────┬─────┘ │
        │           │      │       │
        │           │      ↓       │
        │           │   ┌──────────┐│
        │           │   │REGISTER  ││
        │           │   │PAGE      ││
        │           │   │          ││
        │           │   │Fill form ││
        │           │   │Check     ││
        │           │   │password  ││
        │           │   │Click Reg ││
        │           │   └────┬─────┘│
        │           │        │      │
        │           │        ↓      │
        │           │   ┌──────────┐│
        │           │   │ Account  ││
        │           │   │ Created  ││
        │           │   └────┬─────┘│
        │           │        │      │
        │           │        ↓      │
        │           │   ┌──────────┐│
        │           │   │ Login   ││
        │           │   │ Form    ││
        │           └───┘        ││
        │               └────┬─────┘
        │                    │
        │ ┌──────────────────┘
        │ │
        │ ↓
        │ ┌──────────────────────────┐
        │ │ Enter Email/Username     │
        │ │ Enter Password           │
        │ │ Click Login              │
        │ └────────┬─────────────────┘
        │          ↓
        │ ┌──────────────────────────┐
        │ │ API Call to Backend      │
        │ │ POST /auth/login         │
        │ └────────┬─────────────────┘
        │          ↓
        │ ┌──────────────────────────┐
        │ │ Backend Verifies:        │
        │ │ • User exists?           │
        │ │ • Password correct?      │
        │ └────────┬─────────────────┘
        │          ↓
        │ ┌──────────────────────────┐
        │ │ Generate JWT Token       │
        │ │ Return Token             │
        │ └────────┬─────────────────┘
        │          ↓
        │ ┌──────────────────────────┐
        │ │ Frontend Stores Token    │
        │ │ in localStorage          │
        │ │ Redirect to Dashboard    │
        │ └────────┬─────────────────┘
        │          ↓
        ├──────────→
        │
        ↓
    ┌────────────────────────────────────┐
    │  📊 DASHBOARD (Main Hub)           │
    ├────────────────────────────────────┤
    │  • User Profile                    │
    │  • Welcome Greeting                │
    │  • Quick Stats                     │
    │  • 4 Feature Cards (Clickable)    │
    │  • Logout Button                   │
    └────┬───────────────────────────────┘
         │
         ├──→ Click 📊 Track Progress
         │    ├─→ Add Goals
         │    ├─→ Adjust Sliders
         │    └─→ ← Back to Dashboard
         │
         ├──→ Click 💪 Workout Plans
         │    ├─→ View Workouts
         │    ├─→ Check Complete
         │    └─→ ← Back to Dashboard
         │
         ├──→ Click 🥗 Diet Plans
         │    ├─→ View Meal Plans
         │    ├─→ Select Plan
         │    └─→ ← Back to Dashboard
         │
         ├──→ Click 📈 Performance
         │    ├─→ View Metrics
         │    ├─→ See Charts
         │    └─→ ← Back to Dashboard
         │
         └──→ Click Logout
              ├─→ Clear Token
              └─→ Go to Login Page
```

---

## 🔐 AUTHENTICATION FLOW

```
┌─────────────────────────────────────────┐
│       User Registration Flow            │
└────────────────────┬────────────────────┘
                     ↓
        ┌────────────────────────┐
        │ Fill Registration Form │
        │ • Full Name            │
        │ • Email                │
        │ • Username             │
        │ • Password (strong)    │
        │ • Confirm Password     │
        └────────┬───────────────┘
                 ↓
        ┌────────────────────────┐
        │ Frontend Validates     │
        │ ✓ All fields required  │
        │ ✓ Email format valid   │
        │ ✓ Username format OK   │
        │ ✓ Password strong      │
        │ ✓ Passwords match      │
        └────────┬───────────────┘
                 ↓
        ┌────────────────────────┐
        │ POST /api/auth/register│
        │ Send to Backend        │
        └────────┬───────────────┘
                 ↓
        ┌────────────────────────┐
        │ Backend Validates      │
        │ ✓ All fields present   │
        │ ✓ Email format valid   │
        │ ✓ Email unique?        │
        │ ✓ Username unique?     │
        │ ✓ Password strong?     │
        └────────┬───────────────┘
                 ↓
        ┌────────────────────────┐
        │ Hash Password          │
        │ (bcryptjs 10 rounds)   │
        └────────┬───────────────┘
                 ↓
        ┌────────────────────────┐
        │ Save to MongoDB        │
        │ Users collection       │
        └────────┬───────────────┘
                 ↓
        ┌────────────────────────┐
        │ Return Success Message │
        │ Redirect to Login      │
        └────────────────────────┘

┌─────────────────────────────────────────┐
│          User Login Flow                │
└────────────────────┬────────────────────┘
                     ↓
        ┌────────────────────────┐
        │ Fill Login Form        │
        │ • Email or Username    │
        │ • Password             │
        └────────┬───────────────┘
                 ↓
        ┌────────────────────────┐
        │ POST /api/auth/login   │
        │ Send Credentials       │
        └────────┬───────────────┘
                 ↓
        ┌────────────────────────┐
        │ Backend Finds User     │
        │ in MongoDB             │
        └────────┬───────────────┘
                 ↓
        ┌────────────────────────┐
        │ Compare Passwords      │
        │ Entered vs Hashed      │
        └────────┬───────────────┘
                 ↓
        ┌────────────────────────┐
        │ Generate JWT Token     │
        │ (7-day expiration)     │
        └────────┬───────────────┘
                 ↓
        ┌────────────────────────┐
        │ Return Token to        │
        │ Frontend               │
        └────────┬───────────────┘
                 ↓
        ┌────────────────────────┐
        │ Frontend Stores Token  │
        │ localStorage.setItem   │
        └────────┬───────────────┘
                 ↓
        ┌────────────────────────┐
        │ Redirect to Dashboard  │
        │ All Future Requests:   │
        │ Header: Authorization  │
        │ Bearer <token>         │
        └────────────────────────┘
```

---

## 📡 API REQUEST/RESPONSE FLOW

```
┌──────────────────────────────────────────────┐
│         Frontend (Axios)                     │
│                                              │
│  axios.post('/api/auth/login', {            │
│    email: 'user@test.com',                   │
│    password: 'Test@12345'                    │
│  })                                          │
└──────────────┬───────────────────────────────┘
               │
               │ HTTP POST Request
               │ ├─ URL: localhost:5000/api/auth/login
               │ ├─ Body: {email, password}
               │ └─ Headers: {'Content-Type': 'application/json'}
               ↓
┌──────────────────────────────────────────────┐
│         Express Backend                      │
│                                              │
│  app.post('/api/auth/login', async (req,res)│
│    ├─ Find user in MongoDB                  │
│    ├─ Compare passwords                     │
│    ├─ Generate JWT                          │
│    └─ Send response                         │
│  )                                           │
└──────────────┬───────────────────────────────┘
               │
               │ HTTP 200 Response
               │ ├─ Status: 200 OK
               │ ├─ Body: {token: 'jwt...', user: {...}}
               │ └─ Headers: {'Content-Type': 'application/json'}
               ↓
┌──────────────────────────────────────────────┐
│         Frontend (React)                     │
│                                              │
│  .then(response => {                         │
│    localStorage.setItem('token',             │
│      response.data.token                     │
│    )                                         │
│    navigate('/dashboard')                    │
│  })                                          │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│    Protected Route Request (with Token)      │
│                                              │
│  axios.get('/api/auth/profile', {           │
│    headers: {                                │
│      'Authorization': 'Bearer <token>'       │
│    }                                         │
│  })                                          │
└──────────────┬───────────────────────────────┘
               │
               │ HTTP GET Request
               │ ├─ URL: localhost:5000/api/auth/profile
               │ ├─ Headers: {'Authorization': 'Bearer token...'}
               │ └─ Middleware: auth.js checks token validity
               ↓
┌──────────────────────────────────────────────┐
│      Backend - Auth Middleware               │
│                                              │
│  const token = req.headers.authorization    │
│  verify(token)                              │
│  ├─ Valid? → Pass to Controller             │
│  └─ Invalid? → Return 401 Error             │
└──────────────┬───────────────────────────────┘
               │
               ↓
┌──────────────────────────────────────────────┐
│      Backend - Get Profile                   │
│                                              │
│  Find user in MongoDB                        │
│  Return user details (without password)      │
└──────────────┬───────────────────────────────┘
               │
               │ HTTP 200 Response
               │ Body: {fullName, email, username, ...}
               ↓
┌──────────────────────────────────────────────┐
│      Frontend - Update UI                    │
│                                              │
│  setUser(response.data)                      │
│  Display user profile on dashboard           │
└──────────────────────────────────────────────┘
```

---

## 🎯 ROUTE CONFIGURATION

```
App.jsx Router Configuration:

Route Tree:
│
├─ /login (Public)
│  └─ Component: LoginPage
│
├─ /register (Public)
│  └─ Component: RegistrationPage
│
├─ /dashboard (Protected)
│  └─ Component: DashboardPage
│     ├─ ProtectedRoute wrapper
│     ├─ Checks localStorage.token
│     └─ Redirects to /login if no token
│
├─ /track-progress (Protected)
│  └─ Component: TrackProgressPage
│     ├─ ProtectedRoute wrapper
│     └─ Redirects if no token
│
├─ /workout-plans (Protected)
│  └─ Component: WorkoutPlansPage
│     ├─ ProtectedRoute wrapper
│     └─ Redirects if no token
│
├─ /diet-plans (Protected)
│  └─ Component: DietPlansPage
│     ├─ ProtectedRoute wrapper
│     └─ Redirects if no token
│
├─ /performance (Protected)
│  └─ Component: PerformancePage
│     ├─ ProtectedRoute wrapper
│     └─ Redirects if no token
│
├─ / (Default)
│  └─ Redirects based on auth state
│     ├─ isAuthenticated ? /dashboard : /login
│
└─ /* (Catch-all)
   └─ Redirects to /
```

---

## 📊 STATE MANAGEMENT

```
Frontend State:

App.jsx:
├─ isAuthenticated (useState)
│  ├─ Updates on storage change
│  └─ Controls default route redirect
│
DashboardPage.jsx:
├─ user (useState)
│  └─ Fetched from GET /api/auth/profile
├─ loading (useState)
│  └─ Shows while fetching
└─ error (useState)
   └─ Shows error messages

LoginPage.jsx:
├─ credentials (useState)
│  ├─ email/username
│  └─ password
├─ loading (useState)
│  └─ During submission
└─ error (useState)
   └─ Shows validation/API errors

RegistrationPage.jsx:
├─ formData (useState)
│  ├─ fullName, email, username
│  ├─ password, confirmPassword
│  └─ passwordMatch
├─ passwordStrength (useState)
│  ├─ Calculated from password
│  └─ Shows 4 criteria
├─ loading (useState)
└─ error (useState)

Feature Pages:
├─ TrackProgressPage:
│  └─ goals (useState)
│     ├─ Array of goal objects
│     └─ Updated by sliders
│
├─ WorkoutPlansPage:
│  └─ workouts (useState)
│     ├─ Array with completed status
│     └─ Toggle on checkbox
│
├─ DietPlansPage:
│  └─ mealPlans (useState)
│     ├─ Array with selected status
│     └─ Toggle on button click
│
└─ PerformancePage:
   ├─ stats (useState)
   │  └─ 6 metrics with trends
   └─ weekData (useState)
      └─ 7 days of data for chart
```

---

**This architecture provides a complete, secure, and scalable fitness application!** 🎉
