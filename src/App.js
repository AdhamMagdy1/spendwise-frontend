import React from 'react';
import logo from './logo.svg';
import './assets/styles/App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <header className="App-header">
          <h1 className="H1 LogoText">SpendWise</h1>
          <p className="P">
            "Empowering Budgets,
            <br /> Simplifying Savings!"
          </p>
        </header>
        <div className="actionButtons">
          <Link to="/signup">
            <button className="signup H2">Create Account</button>
          </Link>
          <Link to="/login">
            <button className="login H2">Login to Account</button>
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
