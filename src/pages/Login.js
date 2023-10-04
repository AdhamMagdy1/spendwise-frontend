import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import goback from '../assets/images/goback.svg';
import '../assets/styles/Auth.css';

function Login() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate('/home');
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate the form data
    if (!email || !password) {
      return;
    }
    // Send the form data to the backend server
    // ...
    // After successful Login, navigate to the home page
    navigate('/dashboard');
  };
  return (
    <div className="signup">
      <div className="goback" onClick={goBack}>
        <img src={goback} alt="go back" />
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            required
            autoComplete="off"
            className="H3"
            type="email"
            name="email"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            autoComplete="off"
            required
            className="H3"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <input className="H3 button" type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;
