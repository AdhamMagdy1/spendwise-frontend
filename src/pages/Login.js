import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import goback from '../assets/images/goback.svg';
import { loginUser } from '../services/userApi';
import '../assets/styles/Auth.css';

function Login() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate('/home');
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if already submitting
    if (isSubmitting) {
      return;
    }

    // Start the submission
    setIsSubmitting(true);

    // Validate the form data
    if (!email || !password || password.length < 6) {
      // Display the tooltip for the password field
      setShowPasswordTooltip(true);
      setIsSubmitting(false);
      return;
    }

    try {
      // Send the form data to the backend server
      await loginUser(email, password);
    } finally {
      // Finish the submission, whether successful or not
      setIsSubmitting(false);
    }
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

        <input
          className="H3 button"
          type="submit"
          value={isSubmitting ? "Loading..." : "Login"} // Change button text
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
}

export default Login;
