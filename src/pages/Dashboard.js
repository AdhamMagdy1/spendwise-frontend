import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import logoutImg from '../assets/images/logout.svg';
import edit from '../assets/images/edit.svg';
import '../assets/styles/Dashboard.css';

import Today from '../components/Today';
import View from '../components/View';
import Analytics from '../components/Analytics';
function Dashboard() {
  const navigate = useNavigate();
  const logout = () => {
    //add the logout function!!
    navigate('/home');
  };

  const [budget, setBudget] = useState(0);
  const getUserInput = async () => {
    let userInputValue; // Declare a new variable to store the computed user input
    const { value } = await Swal.fire({
      title: 'Budget:',
      input: 'number',
      inputLabel: 'Enter Your Current Budget',
      inputPlaceholder: 'Budget',
      showCancelButton: true,
      confirmButtonColor: '#8bf349',
      color: '#06555a',
      preConfirm: (inputValue) => {
        userInputValue = inputValue; // Assign the input value to the new variable

        // Check if the budget input has a value
        if (!userInputValue) {
          // If not, show an error message and prevent the confirm button from being enabled
          Swal.showValidationMessage('Please enter a budget value.');
          return false;
        }

        // Otherwise, return the budget value
        return userInputValue;
      },
    });

    if (value) {
      setBudget(value); // Update the state with user input
      Swal.fire({
        title: 'Success',
        icon: 'success',
        text: `Your budget: ${value}`,
        confirmButtonColor: '#8bf349',
        color: '#06555a',
      });
    }
  };

  // Create state to track the active button
  const [activeButton, setActiveButton] = useState('Today');

  // Create state to track the active component
  const [activeComponent, setActiveComponent] = useState(<Today />);

  const handleButtonClick = (buttonName) => {
    // Set the active button
    setActiveButton(buttonName);

    // Determine the active component based on the clicked button
    switch (buttonName) {
      case 'Today':
        setActiveComponent(<Today />);
        break;
      case 'View':
        setActiveComponent(<View />);
        break;
      case 'Analytics':
        setActiveComponent(<Analytics />);
        break;
      default:
        setActiveComponent(<Today />); // Default to Today
        break;
    }
  };
  return (
    <div className="dashboard">
      <div className="logout P" onClick={logout}>
        logout <img src={logoutImg} alt="logout" />
      </div>
      <div className="header">
        <div className="text">
          <h1 className="H1">Hello Adham,</h1>
          <h2 className="H2">
            Your Budget: <br /> <span>${budget}</span>
          </h2>
        </div>
        <div className="edit P" onClick={getUserInput}>
          Edit <img src={edit} alt="edit" />
        </div>
      </div>
      <div className="dashboard-navbar">
        <button
          className={`dashboard-button P ${
            activeButton === 'Today' ? 'active' : ''
          }`}
          onClick={() => handleButtonClick('Today')}
        >
          Today
        </button>
        <button
          className={`dashboard-button P ${
            activeButton === 'View' ? 'active' : ''
          }`}
          onClick={() => handleButtonClick('View')}
        >
          View
        </button>
        <button
          className={`dashboard-button P ${
            activeButton === 'Analytics' ? 'active' : ''
          }`}
          onClick={() => handleButtonClick('Analytics')}
        >
          Analytics
        </button>
      </div>
      {activeComponent}
    </div>
  );
}

export default Dashboard;
