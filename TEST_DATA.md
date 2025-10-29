# Test Data and Examples

## 📝 Sample User Credentials

### Test User 1 - Valid Registration
```
Full Name: John Fitness
Email: john.fitness@example.com
Username: john_fitness
Password: Fitness123
```

### Test User 2 - Valid Registration
```
Full Name: Sarah Trainer
Email: sarah.trainer@example.com
Username: sarah_trainer
Password: TrainHard456
```

### Test User 3 - Valid Registration
```
Full Name: Mike Runner
Email: mike.runner@example.com
Username: mike_runner
Password: RunFast789
```

---

## 🧪 API Test Cases

### Success Cases

#### 1. Successful Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "username": "testuser",
    "password": "TestPass123",
    "confirmPassword": "TestPass123"
  }'
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "Test User",
    "email": "test@example.com",
    "username": "testuser",
    "emailVerified": false,
    "createdAt": "2024-10-29T10:00:00Z",
    "updatedAt": "2024-10-29T10:00:00Z"
  }
}
```

#### 2. Successful Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "usernameOrEmail": "testuser",
    "password": "TestPass123"
  }'
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "Test User",
    "email": "test@example.com",
    "username": "testuser",
    "createdAt": "2024-10-29T10:00:00Z"
  }
}
```

#### 3. Get Profile (Protected)
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Expected Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "Test User",
    "email": "test@example.com",
    "username": "testuser",
    "createdAt": "2024-10-29T10:00:00Z"
  }
}
```

---

### Error Cases

#### 1. Registration - Duplicate Email
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Another User",
    "email": "test@example.com",
    "username": "anotheruser",
    "password": "AnotherPass123",
    "confirmPassword": "AnotherPass123"
  }'
```

**Expected Response (409):**
```json
{
  "success": false,
  "message": "Email is already registered. Please use a different email or try logging in."
}
```

#### 2. Registration - Duplicate Username
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Another User",
    "email": "another@example.com",
    "username": "testuser",
    "password": "AnotherPass123",
    "confirmPassword": "AnotherPass123"
  }'
```

**Expected Response (409):**
```json
{
  "success": false,
  "message": "Username is already taken. Please choose a different username."
}
```

#### 3. Registration - Weak Password
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "weak@example.com",
    "username": "weakpass",
    "password": "weak",
    "confirmPassword": "weak"
  }'
```

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Password does not meet security requirements",
  "errors": [
    "Password must be at least 6 characters long",
    "Password must contain at least one uppercase letter",
    "Password must contain at least one digit"
  ]
}
```

#### 4. Registration - Mismatched Passwords
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "mismatch@example.com",
    "username": "mismatchuser",
    "password": "Correct123",
    "confirmPassword": "Wrong456"
  }'
```

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Passwords do not match"
}
```

#### 5. Login - Invalid Credentials
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "usernameOrEmail": "testuser",
    "password": "WrongPassword123"
  }'
```

**Expected Response (401):**
```json
{
  "success": false,
  "message": "Invalid username/email or password"
}
```

#### 6. Login - Non-existent User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "usernameOrEmail": "nonexistent",
    "password": "SomePass123"
  }'
```

**Expected Response (401):**
```json
{
  "success": false,
  "message": "Invalid username/email or password"
}
```

#### 7. Protected Route - Missing Token
```bash
curl -X GET http://localhost:5000/api/auth/profile
```

**Expected Response (401):**
```json
{
  "success": false,
  "message": "No token provided. Please log in."
}
```

#### 8. Protected Route - Invalid Token
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer invalid_token_here"
```

**Expected Response (401):**
```json
{
  "success": false,
  "message": "Invalid token. Please log in."
}
```

#### 9. Protected Route - Expired Token
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.expired..."
```

**Expected Response (401):**
```json
{
  "success": false,
  "message": "Token has expired. Please log in again."
}
```

---

## 🧩 Frontend Testing Scenarios

### Scenario 1: Complete Registration Flow
```
1. Navigate to /register
2. Enter all fields correctly
3. See password strength indicator update
4. Click "Create Account"
5. Wait for redirect to dashboard
6. Verify user information displays
```

### Scenario 2: Login Flow
```
1. Navigate to /login
2. Enter username and password
3. Click "Login"
4. Verify redirect to dashboard
5. Verify user information displays
6. Click "Logout"
7. Verify redirect to login
8. Verify token is cleared
```

### Scenario 3: Form Validation
```
1. Leave all fields empty
2. Try to submit
3. See error messages
4. Fill in one field
5. Error for that field disappears
6. Continue with each field
```

### Scenario 4: Password Strength Verification
```
1. Go to /register
2. Type in password field
3. Watch strength indicator:
   - "pass" → shows 3 unmet requirements
   - "Pass" → shows 2 unmet requirements
   - "Pass1" → shows 1 unmet requirement
   - "Pass1" → shows 1 unmet requirement (need uppercase)
   - "Pass1" → ALL MET ✓
```

### Scenario 5: Protected Route Access
```
1. Open DevTools Console
2. Clear localStorage:
   localStorage.clear()
3. Try accessing /dashboard
4. Should redirect to /login
5. Login with valid credentials
6. Token should be stored in localStorage
7. Refresh page
8. Should stay on /dashboard
```

---

## 📊 Database Test Data

### Sample MongoDB Documents

```javascript
// User 1 - Active user
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  fullName: "John Fitness",
  email: "john@example.com",
  username: "john_fitness",
  password: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/KFm",
  emailVerified: false,
  verificationToken: null,
  createdAt: ISODate("2024-10-29T10:00:00Z"),
  updatedAt: ISODate("2024-10-29T10:00:00Z")
}

// User 2 - Active user
{
  _id: ObjectId("507f1f77bcf86cd799439012"),
  fullName: "Sarah Trainer",
  email: "sarah@example.com",
  username: "sarah_trainer",
  password: "$2a$10$5YwRrBCGsUy5/Xf4Jzn3Y.M4VzS7k8qL3jW6hR2nP9oA1bD5fQ7m",
  emailVerified: false,
  verificationToken: null,
  createdAt: ISODate("2024-10-28T08:30:00Z"),
  updatedAt: ISODate("2024-10-29T09:15:00Z")
}
```

---

## 🔐 Password Examples

### Valid Passwords
- ✅ `Fitness123`
- ✅ `TrainHard456`
- ✅ `RunFast789`
- ✅ `Test@Pass123`
- ✅ `SecureP@ss1`

### Invalid Passwords
- ❌ `pass` - Too short, no uppercase, no digit
- ❌ `PASSWORD123` - No lowercase letter
- ❌ `password123` - No uppercase letter
- ❌ `Password` - No digit
- ❌ `12345` - No letters

---

## 📱 Frontend Form Test Data

### Scenario: Complete Registration
```
Full Name: "Michael Johnson"
Email: "michael.j@example.com"
Username: "mike_johnson_2024"
Password: "Secure@2024"
Confirm: "Secure@2024"
```

### Scenario: Email Validation
```
Valid:
- john@example.com
- user.name@domain.co.uk
- test+tag@example.com

Invalid:
- john.example.com (no @)
- @example.com (no local part)
- john@.com (no domain)
- john@@example.com (double @)
```

### Scenario: Username Validation
```
Valid:
- john_doe
- user-name
- test123
- user_123-test

Invalid:
- jo (too short - needs 3 chars)
- user@email (@ not allowed)
- user#name (# not allowed)
- user name (space not allowed)
```

---

## 🎯 Performance Test Data

### Large Dataset Test
- 1000 registered users
- Multiple concurrent login attempts
- Bulk registration verification

### Expected Performance
- Registration: < 500ms
- Login: < 200ms
- Profile fetch: < 100ms
- Token verification: < 50ms

---

## ✅ Checklist for Manual Testing

### Before Testing
- [ ] MongoDB is running
- [ ] Backend server is running on port 5000
- [ ] Frontend is running on port 3000
- [ ] Browser DevTools is open (Console tab)

### During Testing
- [ ] Monitor network requests (Network tab)
- [ ] Check localStorage for token (Application tab)
- [ ] Monitor console for errors

### Test Cases
- [ ] Register new user
- [ ] Login with new user
- [ ] View profile/dashboard
- [ ] Logout
- [ ] Try to access protected route without token
- [ ] Try invalid credentials

---

This test data file can be used with:
- Postman/Insomnia for API testing
- Browser console for localStorage testing
- Manual testing procedures
- Automated testing frameworks
