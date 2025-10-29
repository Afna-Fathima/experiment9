# Quick Start Guide - Fitness App

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- Node.js installed
- MongoDB running locally or MongoDB Atlas account

### Step 1: Backend Setup (Terminal 1)

```bash
# Navigate to server directory
cd fitness-app/server

# Install dependencies
npm install

# Start the server
npm start
```

You should see:
```
╔════════════════════════════════════════╗
║    FITNESS APP SERVER STARTED          ║
║    Environment: development            ║
║    Port: 5000                          ║
║    Database: MongoDB                   ║
╚════════════════════════════════════════╝
```

### Step 2: Frontend Setup (Terminal 2)

```bash
# Navigate to client directory
cd fitness-app/client

# Install dependencies
npm install

# Start the development server
npm run dev
```

You should see:
```
➜  Local:   http://localhost:3000/
```

### Step 3: Open Browser

Navigate to `http://localhost:3000` and you should see the login page.

---

## 📋 Testing the Full Flow

### 1. Create an Account
1. Click "Register here" on the login page
2. Fill in the form:
   - **Full Name:** John Fitness
   - **Email:** john@example.com
   - **Username:** john_fitness
   - **Password:** Fitness123
   - **Confirm Password:** Fitness123
3. Click "Create Account"
4. You'll be redirected to the dashboard

### 2. View Your Profile
- The dashboard shows your user information
- Click "Logout" to return to the login page

### 3. Login with Your Account
1. Go back to the login page
2. Enter:
   - **Username/Email:** john_fitness
   - **Password:** Fitness123
3. Click "Login"
4. You're back on the dashboard!

---

## 🔧 Troubleshooting

### Issue: MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
- Make sure MongoDB is installed and running
- Windows: Use MongoDB Compass or start the MongoDB service
- Or use MongoDB Atlas (cloud): Update `MONGODB_URI` in `.env`

### Issue: Port 5000 Already in Use
```
EADDRINUSE: address already in use :::5000
```

**Solution:**
- Change `PORT=5001` in `server/.env`
- Or kill the process using port 5000

### Issue: Can't Connect to Backend
- Check that the server is running on port 5000
- Check the terminal to see server logs
- Make sure firewall isn't blocking port 5000

---

## 📱 Features to Try

✅ **Password Strength Indicator** - See real-time password requirements
✅ **Form Validation** - Try invalid emails or weak passwords
✅ **Error Messages** - Register with duplicate email to see error handling
✅ **Protected Routes** - Try accessing dashboard without logging in
✅ **Responsive Design** - Open browser DevTools and resize window

---

## 🛑 Common Commands

### Backend
```bash
npm start          # Start server
npm run dev        # Start with auto-restart (needs nodemon)
```

### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

---

## 📚 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create new account |
| POST | `/api/auth/login` | Login to account |
| GET | `/api/auth/profile` | Get user profile (protected) |
| POST | `/api/auth/logout` | Logout (protected) |

---

## 🔐 Demo Credentials

After registering, use these credentials to login:
- **Username/Email:** Your registered username or email
- **Password:** Your registered password

---

## 📝 Notes

- Tokens are stored in `localStorage` and persist across browser refreshes
- Tokens expire after 7 days
- Passwords are hashed with bcryptjs before storage
- All user inputs are validated on frontend and backend

---

## 🎯 Next Steps

After getting familiar with the app:
1. Review the `/server` code to understand backend logic
2. Check `/client/src` to see frontend components
3. Read the full README.md for detailed documentation
4. Try modifying styles or adding features!

---

## 💡 Tips

- Use browser DevTools to inspect network requests
- Check MongoDB Compass to view stored user data
- Enable browser DevTools cache disable while developing
- Keep both terminals visible to see logs from both frontend and backend

---

Enjoy using the Fitness App! 💪
