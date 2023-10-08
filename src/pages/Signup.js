import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import goback from '../assets/images/goback.svg';
import '../assets/styles/Auth.css';
import { registerUser } from '../services/userApi';
function Signup() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate('/home');
  };
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate the form data
    if (!name || !email || password.length < 6) {
      // Display the tooltip for the password field
      setShowPasswordTooltip(true);
      return;
    }
    registerUser(name, email, password);
  };

  const handlePasswordChange = (event) => {
    // Check if the password has reached 6 characters or more
    if (event.target.value.length >= 6) {
      // Hide the password tooltip
      setShowPasswordTooltip(false);
    }
    // Update the password state
    setPassword(event.target.value);
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
            type="text"
            name="name"
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}
          />
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
            onChange={handlePasswordChange}
          />
          {showPasswordTooltip && (
            <div className="tooltip P" style={{ color: 'red' }}>
              Password must be at least 6 characters
            </div>
          )}
        </div>

        <input className="H3 button" type="submit" value="Sign up" />
      </form>
    </div>
  );
}

export default Signup;
