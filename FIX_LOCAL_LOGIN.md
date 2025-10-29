# 🔧 FIX LOCAL LOGIN/REGISTER - NETWORK ERROR

## ❌ Problem

```
Network error. Please check your connection.
```

This happens because:
- Frontend running locally: `localhost:3000`
- Backend on Render: `experiment9.onrender.com`
- Frontend tries to connect to `localhost:5000` (which doesn't exist locally)

---

## ✅ Solution: Update API Configuration

### For Local Testing

You need to run your **backend locally** on `localhost:5000`:

#### Step 1: Open Terminal in Server Folder
```bash
cd d:\exp9\fitness-app\server
```

#### Step 2: Start Backend Server
```bash
npm start
```

Expected output:
```
FITNESS APP SERVER STARTED
Environment: development
Port: 5000
MongoDB Connected: localhost
```

#### Step 3: In Another Terminal, Start Frontend
```bash
cd d:\exp9\fitness-app\client
npm run dev
```

Frontend will run on: `localhost:3000`

#### Step 4: Test Registration/Login
- Go to: http://localhost:3000/register
- Try registering - should work! ✅

---

## 🌍 For Production (On Render)

Once frontend is deployed to Render, it will:
1. Use the `VITE_API_URL` environment variable
2. Connect to: `https://experiment9.onrender.com`
3. Everything works automatically ✅

---

## 📋 Summary

### Local Development:
```
Backend:  npm start      (in server folder) → localhost:5000
Frontend: npm run dev    (in client folder) → localhost:3000
```

### Production (Render):
```
Backend:  https://experiment9.onrender.com
Frontend: https://fitness-app-client.onrender.com
```

---

## 🚀 Next Step

### Start Backend Locally:
```bash
cd d:\exp9\fitness-app\server
npm start
```

Then register/login should work perfectly! ✅

---

*Backend and Frontend need to run together for local testing!* 🔗
