# Testing Checklist - Fitness App Authentication

## ✅ Registration Form Tests

### Valid Registration
- [ ] Register with all correct fields
  - Full Name: John Doe
  - Email: john@example.com
  - Username: john_doe
  - Password: Secure123
  - Confirm: Secure123
- [ ] User is created in database
- [ ] Token is generated and stored
- [ ] User is redirected to dashboard

### Invalid Full Name
- [ ] Empty full name shows error
- [ ] Full name with 1 character shows error
- [ ] Full name longer than 100 characters shows error

### Invalid Email
- [ ] Empty email shows error
- [ ] Email without @ shows error
- [ ] Email with invalid format shows error
- [ ] Already registered email shows error
- [ ] Email is case-insensitive (john@example.com = JOHN@EXAMPLE.COM)

### Invalid Username
- [ ] Empty username shows error
- [ ] Username less than 3 characters shows error
- [ ] Username more than 30 characters shows error
- [ ] Username with special characters (except - and _) shows error
- [ ] Already taken username shows error

### Invalid Password
- [ ] Empty password shows error
- [ ] Password less than 6 characters shows error
- [ ] Password without uppercase letter shows error
- [ ] Password without lowercase letter shows error
- [ ] Password without digit shows error
- [ ] Password indicator updates in real-time as you type

### Password Confirmation
- [ ] Mismatched passwords show error
- [ ] Matching passwords allow submission
- [ ] Empty confirmation password shows error

### Form Validation
- [ ] All fields are required
- [ ] Submit button is disabled while loading
- [ ] Error messages disappear when field is corrected
- [ ] Form clears after successful registration

---

## ✅ Login Form Tests

### Valid Login
- [ ] Login with valid username and password
- [ ] Login with valid email and password
- [ ] Token is stored in localStorage
- [ ] User is redirected to dashboard
- [ ] Token remains after page refresh

### Invalid Credentials
- [ ] Non-existent username shows generic error
- [ ] Non-existent email shows generic error
- [ ] Wrong password shows generic error
- [ ] Generic message doesn't reveal which field is wrong (security)

### Empty Fields
- [ ] Empty username/email shows error
- [ ] Empty password shows error
- [ ] Submit button requires both fields filled

### Case Sensitivity
- [ ] Username/email login is case-insensitive
- [ ] Password login is case-sensitive

---

## ✅ Dashboard Tests

### Protected Route Access
- [ ] Dashboard loads only when logged in
- [ ] Redirects to login if token is missing
- [ ] Redirects to login if token is invalid
- [ ] Redirects to login if token is expired

### User Information Display
- [ ] Full name displays correctly
- [ ] Username displays with @ symbol
- [ ] Email displays correctly
- [ ] Registration date displays correctly
- [ ] No sensitive data (password, token) is visible

### Dashboard Features
- [ ] Profile card shows user information
- [ ] Feature cards display correctly (Track Progress, Workout Plans, etc.)
- [ ] Stats section shows default values
- [ ] All sections are responsive

### Logout Functionality
- [ ] Logout button is visible
- [ ] Clicking logout clears localStorage
- [ ] Clicking logout redirects to login page
- [ ] After logout, dashboard is inaccessible
- [ ] After logout, cannot access dashboard by refreshing

---

## ✅ Routing Tests

### Route Navigation
- [ ] `/login` shows login page
- [ ] `/register` shows registration page
- [ ] `/dashboard` shows dashboard (if logged in)
- [ ] `/` redirects to dashboard (if logged in) or login (if not)
- [ ] Invalid routes redirect to home

### Public Routes
- [ ] Can access login without token
- [ ] Can access register without token
- [ ] Can access login after logging out

### Protected Routes
- [ ] Cannot access dashboard without token
- [ ] Cannot access profile without token
- [ ] Redirects to login when trying to access protected routes

---

## ✅ API Tests

### Registration Endpoint
```bash
POST /api/auth/register
```
- [ ] Returns 201 status on success
- [ ] Returns 400 status on validation error
- [ ] Returns 409 status on duplicate email/username
- [ ] Returns token in response
- [ ] Returns user data (without password)

### Login Endpoint
```bash
POST /api/auth/login
```
- [ ] Returns 200 status on success
- [ ] Returns 401 status on invalid credentials
- [ ] Returns token in response
- [ ] Returns user data (without password)

### Profile Endpoint
```bash
GET /api/auth/profile
```
- [ ] Returns 200 status with valid token
- [ ] Returns 401 status without token
- [ ] Returns 401 status with invalid token
- [ ] Returns user data in response

### Logout Endpoint
```bash
POST /api/auth/logout
```
- [ ] Returns 200 status
- [ ] Requires valid token
- [ ] Returns success message

---

## ✅ Security Tests

### Password Security
- [ ] Password is never logged in console
- [ ] Password is not visible in network requests
- [ ] Password is hashed in database (not plain text)
- [ ] Same password hashed differently each time

### Token Security
- [ ] Token is stored in localStorage
- [ ] Token is sent in Authorization header
- [ ] Token expires after 7 days
- [ ] Expired token redirects to login

### Data Privacy
- [ ] User password not returned in API responses
- [ ] Verification token not returned in API responses
- [ ] Error messages don't reveal user existence

### CORS
- [ ] Requests from frontend to backend work
- [ ] Requests with valid origin are allowed
- [ ] Invalid origins are rejected

---

## ✅ Form Validation Tests

### Client-Side Validation
- [ ] Form submits only valid data
- [ ] Validation occurs before API call
- [ ] Error messages are specific and helpful
- [ ] Form fields can be corrected after error

### Server-Side Validation
- [ ] Backend validates all inputs
- [ ] Backend rejects invalid formats
- [ ] Backend prevents duplicate entries
- [ ] Backend returns descriptive error messages

---

## ✅ Responsive Design Tests

### Mobile (320px - 480px)
- [ ] Login page responsive on mobile
- [ ] Register page responsive on mobile
- [ ] Dashboard responsive on mobile
- [ ] Forms are usable on small screens
- [ ] Text is readable on mobile

### Tablet (481px - 768px)
- [ ] Layout adapts to tablet size
- [ ] Touch-friendly button sizes
- [ ] Forms display properly

### Desktop (769px+)
- [ ] Full layout displays correctly
- [ ] Cards and grids align properly
- [ ] No horizontal scrolling

---

## ✅ Browser Compatibility Tests

- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge

---

## ✅ Error Handling Tests

### Network Errors
- [ ] Shows error if server is down
- [ ] Shows error if network connection fails
- [ ] User can retry after error

### Database Errors
- [ ] Duplicate email handled gracefully
- [ ] Duplicate username handled gracefully
- [ ] Database connection errors show user-friendly message

### Validation Errors
- [ ] All validation errors are caught
- [ ] Multiple validation errors shown together
- [ ] Errors clear when field is corrected

---

## ✅ User Experience Tests

### Loading States
- [ ] Submit button shows loading state
- [ ] Button text changes to "Logging in..." or "Creating Account..."
- [ ] Button is disabled during loading
- [ ] Loading indicator provides feedback

### Success Feedback
- [ ] Success message appears on registration
- [ ] User is redirected to dashboard
- [ ] Redirect happens after 2 seconds

### Error Feedback
- [ ] Error messages are visible and clear
- [ ] Error messages disappear when appropriate
- [ ] User can retry submission

---

## 🧪 Manual Testing Script

```
1. Open http://localhost:3000
2. Test Registration:
   a. Click "Register here"
   b. Try invalid inputs (see below)
   c. Try valid registration
3. Test Dashboard:
   a. Verify user information displays
   b. Click logout
4. Test Login:
   a. Enter registered credentials
   b. Try invalid credentials
5. Test Protected Routes:
   a. Open DevTools
   b. Clear localStorage
   c. Try accessing /dashboard
   d. Should redirect to /login
```

---

## 📊 Test Results

| Test Category | Status | Notes |
|---------------|--------|-------|
| Registration | ⬜ | |
| Login | ⬜ | |
| Dashboard | ⬜ | |
| Routing | ⬜ | |
| API | ⬜ | |
| Security | ⬜ | |
| Validation | ⬜ | |
| Responsive | ⬜ | |
| Error Handling | ⬜ | |
| UX | ⬜ | |

---

**Note:** Update status to ✅ after successful testing
