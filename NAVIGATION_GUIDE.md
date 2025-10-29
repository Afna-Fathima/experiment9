# 🗺️ Fitness App - Navigation & Feature Guide

## 📱 User Journey

```
START
  ↓
┌─────────────────────┐
│   HOME SCREEN       │
│  (Login / Register) │
└──────────┬──────────┘
           ↓
    🔑 Choose Path
    ├─→ New User? → REGISTER PAGE
    │               Fill form → Create account → Login
    │
    └─→ Existing User? → LOGIN PAGE
                        Enter credentials → Get JWT token
                                  ↓
                        ┌──────────────────────┐
                        │   DASHBOARD (Hub)    │
                        │                      │
                        │  📊 Track Progress   │
                        │  💪 Workout Plans    │
                        │  🥗 Diet Plans       │
                        │  📈 Performance      │
                        │  👤 Profile Info     │
                        │  🚪 Logout          │
                        └──────────┬───────────┘
                                   ↓
                    Click any feature card below:
                
                ┌─────────────────────────────┐
                │   TRACK PROGRESS PAGE       │
                ├─────────────────────────────┤
                │ • Add Goals                 │
                │ • Track with Progress Bars  │
                │ • Adjust with Sliders       │
                │ ← Back to Dashboard         │
                └─────────────────────────────┘
                
                ┌─────────────────────────────┐
                │   WORKOUT PLANS PAGE        │
                ├─────────────────────────────┤
                │ • Browse Workout Plans      │
                │ • View Exercises            │
                │ • Mark Complete ✓           │
                │ ← Back to Dashboard         │
                └─────────────────────────────┘
                
                ┌─────────────────────────────┐
                │   DIET PLANS PAGE           │
                ├─────────────────────────────┤
                │ • View Meal Plans           │
                │ • See Meal Breakdown        │
                │ • Select Plans              │
                │ ← Back to Dashboard         │
                └─────────────────────────────┘
                
                ┌─────────────────────────────┐
                │   PERFORMANCE PAGE          │
                ├─────────────────────────────┤
                │ • View Key Metrics          │
                │ • See Weekly Charts         │
                │ • Check Achievements        │
                │ ← Back to Dashboard         │
                └─────────────────────────────┘
```

---

## 🔐 Authentication Flow

### Registration Process
```
REGISTRATION PAGE
    ↓
Enter Details:
├─ Full Name (2-100 characters)
├─ Email (must be unique & valid)
├─ Username (3-30 chars, alphanumeric+_-)
├─ Password (min 8 chars, must include uppercase, number, special char)
└─ Confirm Password (must match)
    ↓
Validation:
├─ ✓ All fields required
├─ ✓ Email format valid
├─ ✓ Username available
├─ ✓ Password strong
└─ ✓ Passwords match
    ↓
Account Created
    ↓
LOGIN PAGE
    ↓
Enter:
├─ Email or Username
└─ Password
    ↓
JWT Token Generated (7 days)
    ↓
→ DASHBOARD (Logged In)
```

---

## 🎯 Feature Pages Overview

### 1️⃣ TRACK PROGRESS
**Purpose:** Monitor and update your fitness goals

```
┌─────────────────────────────────────┐
│    TRACK PROGRESS                   │
├─────────────────────────────────────┤
│                                     │
│ ADD NEW GOAL                        │
│ ┌──────────────────────────────────┐│
│ │ [Enter goal name...] [Add Goal]  ││
│ └──────────────────────────────────┘│
│                                     │
│ YOUR GOALS                          │
│ ┌──────────────────────────────────┐│
│ │ Run 5K                            ││
│ │ ████████░░░ 60%                  ││
│ │ [━━━━━━━━━━━] (slider)           ││
│ └──────────────────────────────────┘│
│ ┌──────────────────────────────────┐│
│ │ Weight Loss                       ││
│ │ ████████░░░ 8 lbs                ││
│ │ [━━━━━━━━━━━] (slider)           ││
│ └──────────────────────────────────┘│
│ ┌──────────────────────────────────┐│
│ │ Push-ups                          ││
│ │ ████████░░░ 45 reps              ││
│ │ [━━━━━━━━━━━] (slider)           ││
│ └──────────────────────────────────┘│
│                                     │
│ [← Back]                            │
└─────────────────────────────────────┘
```

**Actions:**
- Type goal name and click "Add Goal"
- Use slider to update progress
- Progress updates in real-time

---

### 2️⃣ WORKOUT PLANS
**Purpose:** Browse and track workout exercises

```
┌─────────────────────────────────────┐
│    WORKOUT PLANS                    │
├─────────────────────────────────────┤
│                                     │
│ ┌──────────────────────────────────┐│
│ │ Full Body Strength         ☑     ││
│ │ 60 mins | Intermediate           ││
│ │ Exercises:                       ││
│ │  ✓ Squats                        ││
│ │  ✓ Bench Press                   ││
│ │  ✓ Rows                          ││
│ │  ✓ Deadlifts                     ││
│ │ [Start Workout]                  ││
│ └──────────────────────────────────┘│
│ ┌──────────────────────────────────┐│
│ │ Cardio Blast                ☐    ││
│ │ 45 mins | Beginner               ││
│ │ Exercises:                       ││
│ │  ✓ Running                       ││
│ │  ✓ Jump Rope                     ││
│ │  ✓ Cycling                       ││
│ │ [Start Workout]                  ││
│ └──────────────────────────────────┘│
│ ┌──────────────────────────────────┐│
│ │ HIIT Training                ☐   ││
│ │ 30 mins | Advanced               ││
│ │ Exercises:                       ││
│ │  ✓ Burpees                       ││
│ │  ✓ Mountain Climbers             ││
│ │  ✓ Jump Squats                   ││
│ │ [Start Workout]                  ││
│ └──────────────────────────────────┘│
│                                     │
│ [← Back]                            │
└─────────────────────────────────────┘
```

**Actions:**
- Check the checkbox to mark workout complete
- View exercise list in each card
- See difficulty level (Beginner/Intermediate/Advanced)
- Button changes to "✓ Completed" when checked

---

### 3️⃣ DIET PLANS
**Purpose:** Select and track meal plans

```
┌─────────────────────────────────────┐
│    DIET PLANS                       │
├─────────────────────────────────────┤
│                                     │
│ ┌──────────────────────────────────┐│
│ │ High Protein Diet      [Select]  ││
│ │ 📊 1500 cal/day                  ││
│ │ ┌────────────────────────────────┤│
│ │ │ Breakfast (400 cal)            ││
│ │ │  • Oatmeal                     ││
│ │ │  • Eggs                        ││
│ │ │  • Berries                     ││
│ │ ├────────────────────────────────┤│
│ │ │ Lunch (600 cal)                ││
│ │ │  • Chicken                     ││
│ │ │  • Rice                        ││
│ │ │  • Broccoli                    ││
│ │ ├────────────────────────────────┤│
│ │ │ Dinner (500 cal)               ││
│ │ │  • Salmon                      ││
│ │ │  • Sweet Potato                ││
│ │ │  • Salad                       ││
│ │ └────────────────────────────────┘│
│ │ [Select Plan]                    ││
│ └──────────────────────────────────┘│
│ ┌──────────────────────────────────┐│
│ │ Balanced Diet          [Selected] ││
│ │ 📊 1350 cal/day                  ││
│ │ ┌────────────────────────────────┤│
│ │ │ Breakfast (350 cal)            ││
│ │ │ Lunch (550 cal)                ││
│ │ │ Dinner (450 cal)               ││
│ │ └────────────────────────────────┘│
│ │ [Selected ✓]                     ││
│ └──────────────────────────────────┘│
│                                     │
│ [← Back]                            │
└─────────────────────────────────────┘
```

**Actions:**
- Click "Select Plan" to choose a meal plan
- Only one plan can be selected at a time
- View detailed meal breakdown
- See calorie information for each meal

---

### 4️⃣ PERFORMANCE
**Purpose:** View metrics and achievements

```
┌──────────────────────────────────────┐
│    PERFORMANCE METRICS               │
├──────────────────────────────────────┤
│                                      │
│ KEY STATS                            │
│ ┌──────────────────────────────────┐ │
│ │ Workouts: 5    ↑20%              │ │
│ │ Calories: 3500 ↑15%              │ │
│ │ Heart Rate: 85 ↓5%               │ │
│ │ Distance: 42km ↑8%               │ │
│ │ Personal Records: 8 ↑2           │ │
│ │ Streak Days: 12 ↑Active          │ │
│ └──────────────────────────────────┘ │
│                                      │
│ WEEKLY CALORIES BURNED               │
│ ┌──────────────────────────────────┐ │
│ │   ▌     ▌     ▌     ▌     ▌     ▌ │
│ │   ▌ ▌   ▌ ▌   ▌ ▌   ▌ ▌   ▌ ▌   ▌ │
│ │   ▌ ▌   ▌ ▌   ▌ ▌   ▌ ▌   ▌ ▌   ▌ │
│ │  Mon Tue Wed Thu Fri Sat Sun      │
│ └──────────────────────────────────┘ │
│                                      │
│ ACHIEVEMENTS                         │
│ ┌──────────────────────────────────┐ │
│ │ 🥇 First 5K Run                  │ │
│ │    Completed your first 5K run   │ │
│ ├──────────────────────────────────┤ │
│ │ 🔥 7-Day Streak                  │ │
│ │    Worked out for 7 days straight│ │
│ ├──────────────────────────────────┤ │
│ │ ⭐ 1000 Calories                 │ │
│ │    Burned 1000 cal in one workout│ │
│ └──────────────────────────────────┘ │
│                                      │
│ [← Back]                             │
└──────────────────────────────────────┘
```

**Features:**
- 6 key performance metrics with trends
- Weekly calories bar chart
- Achievement/badge system
- Track your progress over time

---

## 📊 Dashboard (Main Hub)

```
┌──────────────────────────────────────────┐
│  💪 FITNESS DASHBOARD        [Logout]   │
├──────────────────────────────────────────┤
│                                          │
│  Welcome, Augustin!                      │
│  Ready to reach your fitness goals?      │
│                                          │
│ ┌──────────────────────────────────────┐ │
│ │ YOUR PROFILE                         │ │
│ │ Full Name: Augustin                  │ │
│ │ Username: @augustin                  │ │
│ │ Email: augustin@test.com             │ │
│ │ Member Since: 01/15/2024             │ │
│ └──────────────────────────────────────┘ │
│                                          │
│ YOUR FEATURES (Click to open)            │
│ ┌──────────────┐ ┌──────────────┐      │
│ │ 📊 TRACK     │ │ 💪 WORKOUT   │      │
│ │ PROGRESS     │ │ PLANS        │      │
│ └──────────────┘ └──────────────┘      │
│ ┌──────────────┐ ┌──────────────┐      │
│ │ 🥗 DIET      │ │ 📈 PERF.     │      │
│ │ PLANS        │ │ METRICS      │      │
│ └──────────────┘ └──────────────┘      │
│                                          │
│ QUICK STATS                              │
│ ┌──────────────┐ ┌──────────────┐      │
│ │ 12 Workouts  │ │ 5 Goals      │      │
│ │ Completed    │ │ Active       │      │
│ └──────────────┘ └──────────────┘      │
│ ┌──────────────┐                        │
│ │ 85% Complete │                        │
│ │ Rate         │                        │
│ └──────────────┘                        │
│                                          │
└──────────────────────────────────────────┘
```

**Available Actions:**
- Click any feature card to open that page
- Click "Logout" to exit the application
- View your profile information
- See quick statistics

---

## ⌨️ Keyboard Navigation

| Shortcut | Action |
|----------|--------|
| `Tab` | Move between form fields |
| `Enter` | Submit form or activate button |
| `Escape` | (In modals if any) Close modal |
| `Backspace` | Back button (alternative) |

---

## 🎮 Interactive Elements

### Sliders
- Drag to adjust progress
- Click on track to jump to position
- Shows percentage in real-time

### Checkboxes
- Click to toggle workout completion
- Button text changes: "Start Workout" ↔ "✓ Completed"

### Buttons
- "Add Goal" - Creates new fitness goal
- "Select Plan" - Chooses meal plan (one at a time)
- "Start Workout" - Marks workout in progress
- "← Back" - Returns to dashboard
- "Logout" - Signs out of application

### Forms
- All fields must be filled
- Password strength shown in real-time
- Validation errors displayed clearly
- Submit on button click or Enter key

---

## 💡 Tips & Tricks

1. **Progress Tracking**
   - Update goals daily for best results
   - Use sliders to track improvements

2. **Workout Planning**
   - Start with Beginner plans if new
   - Progress to Advanced plans over time
   - Check off completed workouts

3. **Nutrition**
   - Select diet plan based on goals
   - Monitor daily calorie intake
   - Switch plans as needed

4. **Performance Review**
   - Check metrics weekly
   - Track your trends
   - Celebrate achievements!

5. **Account Management**
   - Logout when done (clears token)
   - Login anytime to resume
   - Account persists in database

---

## 🔄 Typical Usage Session

```
1. OPEN: http://localhost:3000
2. REGISTER: Create new account or LOGIN
3. VIEW: Dashboard with profile and features
4. CLICK: Choose a feature (e.g., Track Progress)
5. INTERACT: Update goals, workouts, plans, or metrics
6. NAVIGATE: Use back button or dashboard link
7. SWITCH: Browse between features
8. LOGOUT: Click logout when finished
9. CLOSE: Application saved, ready to resume later
```

---

**Everything is connected and ready to use!** 🎉

Start by registering an account, then explore all the features on your dashboard.
