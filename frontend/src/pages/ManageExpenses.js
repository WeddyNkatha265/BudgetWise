import React, { useState, useEffect } from 'react';
import { fetchData, postData, deleteData } from '../api';
import { toast } from 'react-toastify';

function ManageExpenses() {
  // State variables to manage expenses and budgets data, and form inputs
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [budgetId, setBudgetId] = useState('');
  const [budgets, setBudgets] = useState([]);

  // useEffect hook to fetch expenses and budgets when the component mounts
  useEffect(() => {
    async function loadData() {
      try {
        // Fetch expenses and budgets from the server
        const fetchedExpenses = await fetchData('expenses');
        const fetchedBudgets = await fetchData('budgets');
        // Update state with fetched data
        setExpenses(fetchedExpenses);
        setBudgets(fetchedBudgets);
      } catch (error) {
        toast.error('Failed to load data'); // Display an error message if data fetching fails
      }
    }

    loadData(); // Call the loadData function to fetch data
  }, []); // Empty dependency array means this runs only once when the component mounts

  // Handle form submission to add a new expense
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form from submitting the default way
    if (!budgetId) {
      toast.error('Please select a budget.'); // Display error if no budget is selected
      return;
    }
    try {
      // Post new expense data to the server
      const newExpense = await postData('expenses', { name, amount, budgetId });
      setExpenses([...expenses, newExpense]); // Update state with new expense
      setName('');
      setAmount('');
      setBudgetId('');
      toast.success('Expense added successfully!'); // Display success message
    } catch (error) {
      toast.error('Failed to add expense'); // Display error message if adding expense fails
    }
  };

  // Handle deletion of an expense
  const handleDelete = async (id) => {
    try {
      await deleteData('expenses', id); // Delete expense from the server
      setExpenses(expenses.filter((expense) => expense.id !== id)); // Update state to remove deleted expense
      toast.success('Expense deleted successfully!'); // Display success message
    } catch (error) {
      toast.error('Failed to delete expense'); // Display error message if deletion fails
    }
  };

  return (
    <div>
      <h1>Manage Expenses</h1>
      <form onSubmit={handleSubmit}>
        {/* Form to add a new expense */}
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
          {/* Populate budget options from state */}
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
        {/* Display list of expenses with delete option */}
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
