import React, { useState } from "react";
import { postData } from "../api";
import { toast } from "react-toastify";

function BudgetForm({ addBudget }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newBudget = await postData("budgets", { name, amount });
    addBudget(newBudget);
    setName("");
    setAmount("");
    toast.success("Budget added successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Budget Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Add Budget</button>
    </form>
  );
}

export default BudgetForm;
