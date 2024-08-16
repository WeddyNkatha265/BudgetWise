import React, { useState, useEffect } from 'react';
import { fetchData, postData, deleteData } from '../api';  // Ensure fetchData is imported
import { toast } from 'react-toastify';

function ManageExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [budgetId, setBudgetId] = useState('');
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const fetchedExpenses = await fetchData('expenses');
        const fetchedBudgets = await fetchData('budgets');
        setExpenses(fetchedExpenses);
        setBudgets(fetchedBudgets);
      } catch (error) {
        toast.error('Failed to load data');
      }
    }

    loadData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!budgetId) {
      toast.error('Please select a budget.');
      return;
    }
    try {
      const newExpense = await postData('expenses', { name, amount, budgetId });
      setExpenses([...expenses, newExpense]);
      setName('');
      setAmount('');
      setBudgetId('');
      toast.success('Expense added successfully!');
    } catch (error) {
      toast.error('Failed to add expense');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteData('expenses', id);
      setExpenses(expenses.filter((expense) => expense.id !== id));
      toast.success('Expense deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete expense');
    }
  };

  return (
    <div>
      <h1>Manage Expenses</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Expense Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select
          value={budgetId}
          onChange={(e) => setBudgetId(e.target.value)}
          required
        >
          <option value="">Select Budget</option>
          {budgets.map((budget) => (
            <option key={budget.id} value={budget.id}>
              {budget.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Expense</button>
      </form>

      <h2>Expenses List</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.name} - ${expense.amount} (Budget:{' '}
            {budgets.find((budget) => budget.id === expense.budgetId)?.name ||
              'Unknown'})
            <button onClick={() => handleDelete(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageExpenses;
