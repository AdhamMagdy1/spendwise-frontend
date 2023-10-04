import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import '../assets/styles/App.css';
function Home() {
  return (
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
  );
}

export default Home;
