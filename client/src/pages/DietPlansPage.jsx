import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Features.css'

function DietPlansPage() {
  const navigate = useNavigate()
  const [mealPlans, setMealPlans] = useState([
    {
      id: 1,
      name: 'High Protein Diet',
      meals: [
        { name: 'Breakfast', calories: 400, items: ['Oatmeal', 'Eggs', 'Berries'] },
        { name: 'Lunch', calories: 600, items: ['Chicken', 'Rice', 'Broccoli'] },
        { name: 'Dinner', calories: 500, items: ['Salmon', 'Sweet Potato', 'Salad'] },
      ],
      totalCalories: 1500,
      selected: false
    },
    {
      id: 2,
      name: 'Balanced Diet',
      meals: [
        { name: 'Breakfast', calories: 350, items: ['Toast', 'Avocado', 'Coffee'] },
        { name: 'Lunch', calories: 550, items: ['Tuna', 'Quinoa', 'Vegetables'] },
        { name: 'Dinner', calories: 450, items: ['Turkey', 'Pasta', 'Tomato Sauce'] },
      ],
      totalCalories: 1350,
      selected: false
    },
  ])

  const selectPlan = (id) => {
    setMealPlans(mealPlans.map(plan => ({
      ...plan,
      selected: plan.id === id ? !plan.selected : false
    })))
  }

  return (
    <div className="feature-page">
      <header className="feature-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>← Back</button>
        <h1>🥗 Diet Plans</h1>
      </header>

      <main className="feature-content">
        <div className="diet-plans-grid">
          {mealPlans.map(plan => (
            <div key={plan.id} className={`diet-card ${plan.selected ? 'selected' : ''}`}>
              <h3>{plan.name}</h3>
              
              <div className="calories-info">
                <span className="total-calories">📊 {plan.totalCalories} cal/day</span>
              </div>

              <div className="meals-list">
                {plan.meals.map((meal, idx) => (
                  <div key={idx} className="meal">
                    <h4>{meal.name}</h4>
                    <div className="meal-calories">{meal.calories} cal</div>
                    <ul className="meal-items">
                      {meal.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <button 
                className={`btn-select ${plan.selected ? 'selected-btn' : ''}`}
                onClick={() => selectPlan(plan.id)}
              >
                {plan.selected ? '✓ Selected' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default DietPlansPage
