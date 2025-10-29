# Fitness App - Full Stack Authentication System

## Project Overview

This is a complete full-stack fitness application with secure user authentication. It features a modern React frontend and Node.js/Express backend with MongoDB database.

### Features

✅ **User Registration** with validation
✅ **Secure Login** with username/email and password
✅ **Password Hashing** using bcryptjs
✅ **JWT Token Authentication**
✅ **Protected Routes** for authenticated users
✅ **Form Validation** on both frontend and backend
✅ **Responsive Design** for mobile and desktop
✅ **Error Handling** with meaningful messages
✅ **User Dashboard** with profile information

---

## Technology Stack

### Frontend
- **React 18** - UI framework
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling with gradients and animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken (JWT)** - Token-based authentication
- **CORS** - Cross-Origin Resource Sharing

---

## Project Structure

```
fitness-app/
├── client/                          # React Frontend
│   ├── public/                      # Static files
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegistrationPage.jsx
│   │   │   └── DashboardPage.jsx
│   │   ├── styles/
│   │   │   ├── AuthPage.css         # Authentication styling
│   │   │   └── Dashboard.css        # Dashboard styling
│   │   ├── App.jsx                  # Main app with routing
│   │   ├── index.css                # Global styles
│   │   ├── main.jsx                 # React entry point
│   │   └── package.json
│   └── vite.config.js
│
└── server/                          # Node.js/Express Backend
    ├── config/
    │   └── db.js                    # MongoDB connection
    ├── controllers/
    │   └── authController.js        # Authentication logic
    ├── middleware/
    │   └── auth.js                  # JWT verification middleware
    ├── models/
    │   └── User.js                  # User schema
    ├── routes/
    │   └── authRoutes.js            # Authentication routes
    ├── package.json
    ├── server.js                    # Entry point
    └── .env                         # Environment variables
```

---

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd fitness-app/server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/fitness-app
   JWT_SECRET=your-secret-key-here-change-in-production
   CLIENT_URL=http://localhost:3000
   ```

4. **Start MongoDB:**
   - **Local MongoDB:**
     ```bash
     mongod
     ```
   - **MongoDB Atlas:** Update `MONGODB_URI` with your connection string

5. **Start the server:**
   ```bash
   npm start
   # or for development with auto-restart
   npm run dev
   ```

   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory:**
   ```bash
   cd fitness-app/client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   Frontend runs on `http://localhost:3000`

---

## Database Schema

### Users Collection

```javascript
{
  _id: ObjectId,
  fullName: String (required, 2-100 chars),
  email: String (required, unique, indexed),
  username: String (required, unique, 3-30 chars, indexed),
  password: String (required, hashed, 6+ chars),
  emailVerified: Boolean (default: false),
  verificationToken: String (null),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `email` - For quick user lookup during login
- `username` - For username availability check
- `createdAt` - For sorting users by registration date

---

## API Endpoints

### Authentication Endpoints

#### 1. Register User
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "username": "john_doe",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "username": "john_doe",
    "emailVerified": false,
    "createdAt": "2024-10-29T10:00:00Z",
    "updatedAt": "2024-10-29T10:00:00Z"
  }
}
```

**Error Response (400/409):**
```json
{
  "success": false,
  "message": "Email is already registered",
  "errors": []
}
```

#### 2. Login User
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "usernameOrEmail": "john_doe",
  "password": "SecurePass123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "username": "john_doe",
    "emailVerified": false,
    "createdAt": "2024-10-29T10:00:00Z"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid username/email or password"
}
```

#### 3. Get User Profile (Protected)
**GET** `/api/auth/profile`

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "username": "john_doe",
    "createdAt": "2024-10-29T10:00:00Z"
  }
}
```

#### 4. Logout User (Protected)
**POST** `/api/auth/logout`

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Password Requirements

The password must meet the following criteria:
- ✓ At least 6 characters long
- ✓ At least one uppercase letter (A-Z)
- ✓ At least one lowercase letter (a-z)
- ✓ At least one digit (0-9)

**Example of valid password:** `Fitness123`

---

## Form Validation Rules

### Registration Form

| Field | Rules |
|-------|-------|
| Full Name | Required, 2-100 characters |
| Email | Required, valid email format, unique in database |
| Username | Required, 3-30 chars, alphanumeric + underscore/hyphen, unique |
| Password | Required, meets password strength requirements |
| Confirm Password | Required, must match password field |

### Login Form

| Field | Rules |
|-------|-------|
| Username/Email | Required, must exist in database |
| Password | Required, must match user's password |

---

## Security Features

### Frontend Security
- ✅ Form validation before submission
- ✅ Password strength indicator
- ✅ Secure token storage (localStorage)
- ✅ Protected routes with JWT verification
- ✅ Automatic redirect to login on token expiration

### Backend Security
- ✅ Password hashing with bcryptjs (salt rounds: 10)
- ✅ Input validation and sanitization
- ✅ JWT token expiration (7 days)
- ✅ Error messages don't leak sensitive information
- ✅ CORS protection
- ✅ Database indexing for fast lookup

---

## Testing the Application

### 1. Register a New User

1. Go to `http://localhost:3000/register`
2. Fill in the registration form:
   - Full Name: `John Fitness`
   - Email: `john@fitness.com`
   - Username: `john_fitness`
   - Password: `Fitness123`
   - Confirm Password: `Fitness123`
3. Click "Create Account"
4. You should be redirected to the dashboard

### 2. Login

1. Go to `http://localhost:3000/login`
2. Enter credentials:
   - Username or Email: `john_fitness` or `john@fitness.com`
   - Password: `Fitness123`
3. Click "Login"
4. You should see the dashboard with your user information

### 3. Test Error Handling

**Duplicate Email:**
- Try registering with an email already in use
- Expected: Error message "Email is already registered"

**Duplicate Username:**
- Try registering with a username already in use
- Expected: Error message "Username is already taken"

**Weak Password:**
- Try password: `pass` (too short)
- Expected: Error message about password requirements

**Password Mismatch:**
- Enter different passwords in password fields
- Expected: Error message "Passwords do not match"

**Invalid Login:**
- Login with wrong credentials
- Expected: Error message "Invalid username/email or password"

### 4. Test Protected Routes

1. Try accessing `/dashboard` without logging in
   - Expected: Redirect to login page
2. After login, try accessing `/login` or `/register`
   - Expected: Redirect to dashboard

---

## API Testing with Postman

### Example: Register User

```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "fullName": "Jane Smith",
  "email": "jane@example.com",
  "username": "jane_smith",
  "password": "JanePass123",
  "confirmPassword": "JanePass123"
}
```

### Example: Login User

```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "usernameOrEmail": "jane_smith",
  "password": "JanePass123"
}
```

### Example: Get Profile (Protected)

```
GET http://localhost:5000/api/auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Environment Variables Reference

### Server (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment (development/production) | development |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/fitness-app |
| `JWT_SECRET` | Secret key for JWT signing | fitness-app-secret-key-change-in-production |
| `CLIENT_URL` | Frontend URL for CORS | http://localhost:3000 |

---

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running. Start with `mongod`

### Token Expired Error
```
"Token has expired. Please log in again."
```
**Solution:** Clear localStorage and login again. Token valid for 7 days.

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:** Check `CLIENT_URL` in `.env` matches your frontend URL

### Port Already in Use
```
listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change `PORT` in `.env` or kill process using port 5000

---

## Future Enhancements

- [ ] Email verification on registration
- [ ] Forgot password functionality with email reset link
- [ ] User profile edit page
- [ ] Two-factor authentication (2FA)
- [ ] Social login (Google, GitHub, etc.)
- [ ] Rate limiting on login attempts
- [ ] Refresh token rotation
- [ ] User session management
- [ ] Activity logging and audit trails
- [ ] Admin dashboard

---

## Exercise Requirements Met

✅ **Front-End Requirements:**
- Registration page with Full Name, Email, Username, Password, Confirm Password
- Login page with Username/Email and Password
- Form validation for required fields and password rules

✅ **Back-End Requirements:**
- Node.js + Express server
- User registration logic with password hashing (bcrypt)
- Secure database storage
- Duplicate username/email handling
- Login logic with username/email and password authentication
- Meaningful error messages

✅ **Database Requirements:**
- MongoDB Users collection with all required fields
- Unique indexes on username and email
- Password hashed before storage
- Timestamps for created_at

✅ **Additional Features:**
- Dashboard redirect on successful login
- JWT token-based authentication
- Protected routes

---

## Development Team

- **Frontend:** React.js with modern CSS3 styling
- **Backend:** Node.js/Express with MongoDB
- **Database:** MongoDB with Mongoose ODM

---

## License

This project is created for educational purposes as part of Exercise 9.

---

## Support

For issues or questions, please check the troubleshooting section or contact the development team.
