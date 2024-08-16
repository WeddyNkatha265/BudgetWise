import React, { useState, useEffect } from 'react';
import { fetchData } from '../api';
import { toast } from 'react-toastify';

function Dashboard() {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const fetchedBudgets = await fetchData('budgets');
        const fetchedExpenses = await fetchData('expenses');
        setBudgets(fetchedBudgets);
        setExpenses(fetchedExpenses);
      } catch (error) {
        toast.error('Failed to load data');
      }
    }

    loadData();
  }, []);

  const totalBudget = budgets.reduce((sum, budget) => sum + parseFloat(budget.amount), 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

  return (
    <div>
      <h1>Budget Dashboard</h1>
      <div className="dashboard-summary">
        <div className="summary-item">
          <h2>Total Budget: ${totalBudget.toFixed(2)}</h2>
        </div>
        <div className="summary-item">
          <h2>Total Expenses: ${totalExpenses.toFixed(2)}</h2>
        </div>
      </div>
      <div className="dashboard-content">
        {budgets.map((budget) => {
          const relatedExpenses = expenses.filter(
            (expense) => expense.budgetId === budget.id
          );
          const totalRelatedExpenses = relatedExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
          const balance = parseFloat(budget.amount) - totalRelatedExpenses;

          return (
            <div key={budget.id} className="budget-card">
              <h2>{budget.name}</h2>
              <p>Amount: ${parseFloat(budget.amount).toFixed(2)}</p>
              <p>Expenses: ${totalRelatedExpenses.toFixed(2)}</p>
              <p>Balance: ${balance.toFixed(2)}</p>
              <h3>Expenses:</h3>
              <ul>
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
