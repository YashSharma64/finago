import React, { useState } from 'react';
import '../styles/Login.css';

const Login = ({ onClose, onContinue }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onContinue(formData);
  };

  return (
    <div className="login-overlay">
      <div className="login-modal">
        <div className="login-content">
          <h2>Welcome to FINAGO</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
              />
            </div>
            <button type="submit" className="continue-button">
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 