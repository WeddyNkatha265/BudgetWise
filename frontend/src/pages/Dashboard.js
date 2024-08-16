import React, { useState, useEffect } from 'react';
import { fetchData } from '../api';
import { toast } from 'react-toastify';

function Dashboard() {
  // State variables to hold fetched budgets and expenses
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    async function loadData() {
      try {
        // Fetch budgets and expenses from the server
        const fetchedBudgets = await fetchData('budgets');
        const fetchedExpenses = await fetchData('expenses');
        // Update state with fetched data
        setBudgets(fetchedBudgets);
        setExpenses(fetchedExpenses);
      } catch (error) {
        toast.error('Failed to load data'); // Display an error message if data fetching fails
      }
    }

    loadData(); // Call the loadData function to fetch data
  }, []); // Empty dependency array means this runs only once when the component mounts

  // Calculate total budget and total expenses
  const totalBudget = budgets.reduce((sum, budget) => sum + parseFloat(budget.amount), 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

  return (
    <div>
      <h1>Budget Dashboard</h1>
      <div className="dashboard-summary">
        {/* Display total budget and total expenses */}
        <div className="summary-item">
          <h2>Total Budget: ${totalBudget.toFixed(2)}</h2>
        </div>
        <div className="summary-item">
          <h2>Total Expenses: ${totalExpenses.toFixed(2)}</h2>
        </div>
      </div>
      <div className="dashboard-content">
        {/* Render a card for each budget */}
        {budgets.map((budget) => {
          // Filter expenses related to the current budget
          const relatedExpenses = expenses.filter(
            (expense) => expense.budgetId === budget.id
          );
          // Calculate total expenses for the current budget
          const totalRelatedExpenses = relatedExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
          // Calculate the balance for the current budget
          const balance = parseFloat(budget.amount) - totalRelatedExpenses;

          return (
            <div key={budget.id} className="budget-card">
              <h2>{budget.name}</h2>
              <p>Amount: ${parseFloat(budget.amount).toFixed(2)}</p>
              <p>Expenses: ${totalRelatedExpenses.toFixed(2)}</p>
              <p>Balance: ${balance.toFixed(2)}</p>
              <h3>Expenses:</h3>
              <ul>
                {/* Display a list of expenses for the current budget */}
                {relatedExpenses.length > 0 ? (
                  relatedExpenses.map((expense) => (
                    <li key={expense.id}>
                      {expense.name} - ${parseFloat(expense.amount).toFixed(2)}
                    </li>
                  ))
                ) : (
                  <li>No expenses for this budget</li>
                )}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
