import logo from './logo.svg';
import './assets/styles/App.css';

function App() {
  return (
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
        <button className="signup H2">create account</button>
        <button className="login H2">login to account</button>
      </div>
    </div>
  );
}

export default App;
