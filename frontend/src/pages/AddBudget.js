import React, { useState } from 'react';
import { postData } from '../api';
import { toast } from 'react-toastify';

const AddBudget = ({ onAddBudget }) => {
  // State variables for form inputs
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
       // Post new budget data to the server
      const newBudget = await postData('budgets', { name, amount });
      if (newBudget && newBudget.id) {
        onAddBudget(newBudget);  // Update the parent component's state with the new budget
        setName('');  // Clear form inputs
        setAmount('');
        toast.success('Budget added successfully!');
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error(error); // Log the error for debugging
      toast.error('Failed to add budget. Please try again.');
    }
  };

  return (
    <div className="budget-form-wrapper">
      <h2>Add a New Budget</h2>
      <form className="budget-form" onSubmit={handleSubmit}>
         {/* Input for budget name */}
        <div className="form-group">
          <label htmlFor="name">Budget Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
          {/* Input for budget amount */}
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn--primary">
          Add Budget
        </button>
      </form>
    </div>
  );
};

export default AddBudget;
