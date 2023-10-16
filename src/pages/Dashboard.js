import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import logoutImg from '../assets/images/logout.svg';
import edit from '../assets/images/edit.svg';
import '../assets/styles/Dashboard.css';
import { logOut, getBudget, setBudget } from '../services/userApi';
import Today from '../components/Today';
import View from '../components/View';
import Analytics from '../components/Analytics';

function Dashboard() {
  const navigate = useNavigate();

  const logoutUser = () => {
    logOut();
    navigate('/home');
  };

  const [budget, setUserBudget] = useState(null); // Initialize as null
  const [budgetLoaded, setBudgetLoaded] = useState(false); // Track if the budget has loaded
  const [name, setName] = useState('User');
  const getName = () => {
    const nameUser = window.localStorage.getItem('name');
    setName(nameUser);
  };
  const fetchBudget = async () => {
    try {
      const response = await getBudget();
      setUserBudget(response);
      setBudgetLoaded(true); // Set budgetLoaded to true once budget is fetched
    } catch (error) {
      logOut();
      navigate('/');
    }
  };

  useEffect(() => {
    fetchBudget();
    getName();
  }, []);

  const getUserInput = async () => {
    let userInputValue;

    const { value } = await Swal.fire({
      title: 'Budget:',
      input: 'number',
      inputLabel: 'Enter Your Current Budget',
      inputPlaceholder: 'Budget',
      showCancelButton: true,
      confirmButtonColor: '#8bf349',
      color: '#06555a',
      preConfirm: (inputValue) => {
        userInputValue = inputValue;

        if (!userInputValue) {
          Swal.showValidationMessage('Please enter a budget value.');
          return false;
        }

        return userInputValue;
      },
    });

    if (value) {
      const newValue = await setBudget(value);
      setUserBudget(newValue);
      Swal.fire({
        title: 'Success',
        icon: 'success',
        text: `Your budget: $${value}`,
        confirmButtonColor: '#8bf349',
        color: '#06555a',
      });
    }
  };

  const [activeButton, setActiveButton] = useState('Today');
  const [activeComponent, setActiveComponent] = useState(<Today />);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);

    if (budgetLoaded) {
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
          setActiveComponent(<Today />);
          break;
      }
    }
  };

  return (
    <div className="dashboard">
      <div className="logout P" onClick={logoutUser}>
        logout <img src={logoutImg} alt="logout" />
      </div>
      <div className="header">
        <div className="text">
          <h1 className="H1">Hello {name},</h1>
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
