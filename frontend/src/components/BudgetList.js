import React, { useState } from 'react';
import { deleteData, updateData } from '../api';
import { toast } from 'react-toastify';

function BudgetList({ budgets, onUpdateBudget, onDeleteBudget }) {
  const [editBudgetId, setEditBudgetId] = useState(null);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleEdit = (budget) => {
    setEditBudgetId(budget.id);
    setName(budget.name);
    setAmount(budget.amount);
  };

  const handleUpdate = async () => {
    try {
      const updatedBudget = await updateData('budgets', editBudgetId, { name, amount });
      onUpdateBudget(updatedBudget);
      setEditBudgetId(null);
      setName('');
      setAmount('');
      toast.success('Budget updated successfully!');
    } catch (error) {
      toast.error('Failed to update budget');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteData('budgets', id);
      onDeleteBudget(id);
      toast.success('Budget deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete budget');
    }
  };

  return (
    <div>
      <h2>Budgets</h2>
      <ul>
        {budgets.map((budget) => (
          <li key={budget.id}>
            {editBudgetId === budget.id ? (
              <>
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
                <button onClick={handleUpdate}>Update</button>
              </>
            ) : (
              <>
                {budget.name} - ${budget.amount}
                <button onClick={() => handleEdit(budget)}>Edit</button>
                <button onClick={() => handleDelete(budget.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BudgetList;
