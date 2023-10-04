import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import '../assets/styles/App.css';
import Footer from '../components/Footer';
function Home() {
  return (
    <>
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <header className="App-header">
          <h1 className="H1 LogoText">SpendWise</h1>
          <p className="P">
            <span>"</span>Empowering Budgets,
            <br /> Simplifying Savings!<span>"</span>
          </p>
        </header>
        <div className="actionButtons">
          <Link to="/signup">
            <button className="signup H3">Create Account</button>
          </Link>
          <Link to="/login">
            <button className="login H3">Login to Account</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
