import React, { useState } from 'react';
import { deleteData, updateData } from '../api';
import { toast } from 'react-toastify';

function BudgetList({ budgets, onUpdateBudget, onDeleteBudget }) {
  // State variables for editing a budget
  const [editBudgetId, setEditBudgetId] = useState(null);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  // Handle edit button click
  const handleEdit = (budget) => {
    setEditBudgetId(budget.id);
    setName(budget.name);
    setAmount(budget.amount);
  };

  // Handle budget update
  const handleUpdate = async () => {
    try {
      // Update budget data on the server
      const updatedBudget = await updateData('budgets', editBudgetId, { name, amount });
      onUpdateBudget(updatedBudget); // Update parent component with updated budget
      setEditBudgetId(null); // Clear edit state
      setName('');
      setAmount('');
      toast.success('Budget updated successfully!'); // Display success message
    } catch (error) {
      toast.error('Failed to update budget'); // Display error message if update fails
    }
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    try {
      await deleteData('budgets', id); // Delete budget from the server
      onDeleteBudget(id); // Update parent component with deleted budget
      toast.success('Budget deleted successfully!'); // Display success message
    } catch (error) {
      toast.error('Failed to delete budget'); // Display error message if deletion fails
    }
  };

  return (
    <div>
      <h2>Budgets</h2>
      <ul>
        {/* Render a list of budgets */}
        {budgets.map((budget) => (
          <li key={budget.id}>
            {editBudgetId === budget.id ? (
              <>
                {/* Inputs for editing a budget */}
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <button onClick={handleUpdate}>Update</button> {/* Update button */}
              </>
            ) : (
              <>
                {budget.name} - ${budget.amount}
                <button onClick={() => handleEdit(budget)}>Edit</button> {/* Edit button */}
                <button onClick={() => handleDelete(budget.id)}>Delete</button> {/* Delete button */}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BudgetList;
