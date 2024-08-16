import React, { useState } from "react";
import { postData } from "../api";
import { toast } from "react-toastify";

function BudgetForm({ addBudget }) {
  // State variables for form inputs
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
      // Post new budget data to the server
      const newBudget = await postData("budgets", { name, amount });
      addBudget(newBudget); // Update parent component with new budget
      setName(""); // Clear form inputs
      setAmount("");
      toast.success("Budget added successfully!"); // Display success message
    } catch (error) {
      toast.error("Failed to add budget"); // Display error message if adding budget fails
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input for budget name */}
      <input
        type="text"
        placeholder="Budget Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {/* Input for budget amount */}
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Add Budget</button> {/* Submit button */}
    </form>
  );
}

export default BudgetForm;
