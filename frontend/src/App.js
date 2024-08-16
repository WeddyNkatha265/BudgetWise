import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { fetchData } from './api'; // Import fetchData for API requests
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import AddBudget from './pages/AddBudget';
import ManageExpenses from './pages/ManageExpenses';
import BudgetList from './components/BudgetList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // State to manage budgets
  const [budgets, setBudgets] = useState([]);

  // useEffect hook to fetch budgets when the component mounts
  useEffect(() => {
    async function loadBudgets() {
      try {
        // Fetch budgets from the server
        const fetchedBudgets = await fetchData('budgets');
        setBudgets(fetchedBudgets); // Update state with fetched budgets
      } catch (error) {
        console.error('Failed to load budgets:', error); // Log error if fetching fails
      }
    }

    loadBudgets(); // Call the loadBudgets function to fetch data
  }, []); // Empty dependency array means this runs only once when the component mounts

  // Handler to add a new budget
  const handleAddBudget = (newBudget) => {
    setBudgets([...budgets, newBudget]); // Update state with new budget
  };

  // Handler to update an existing budget
  const handleUpdateBudget = (updatedBudget) => {
    setBudgets(budgets.map(budget => budget.id === updatedBudget.id ? updatedBudget : budget)); // Update state with updated budget
  };

  // Handler to delete a budget
  const handleDeleteBudget = (budgetId) => {
    setBudgets(budgets.filter(budget => budget.id !== budgetId)); // Update state to remove deleted budget
  };

  return (
    <Router>
      <div className="App">
        <NavBar /> {/* Navigation bar for routing */}
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
        <ToastContainer /> {/* Container for toast notifications */}
      </div>
    </Router>
  );
}

export default App;
