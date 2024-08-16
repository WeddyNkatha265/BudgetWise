import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { fetchData } from './api'; // Import fetchData
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import AddBudget from './pages/AddBudget';
import ManageExpenses from './pages/ManageExpenses';
import BudgetList from './components/BudgetList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    async function loadBudgets() {
      try {
        const fetchedBudgets = await fetchData('budgets');
        setBudgets(fetchedBudgets);
      } catch (error) {
        console.error('Failed to load budgets:', error);
      }
    }

    loadBudgets();
  }, []); // This will run once when the component mounts

  const handleAddBudget = (newBudget) => {
    setBudgets([...budgets, newBudget]);
  };

  const handleUpdateBudget = (updatedBudget) => {
    setBudgets(budgets.map(budget => budget.id === updatedBudget.id ? updatedBudget : budget));
  };

  const handleDeleteBudget = (budgetId) => {
    setBudgets(budgets.filter(budget => budget.id !== budgetId));
  };

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/add-budget"
            element={
              <>
                <AddBudget onAddBudget={handleAddBudget} />
                <BudgetList
                  budgets={budgets}
                  onUpdateBudget={handleUpdateBudget}
                  onDeleteBudget={handleDeleteBudget}
                />
              </>
            }
          />
          <Route path="/manage-expenses" element={<ManageExpenses />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
