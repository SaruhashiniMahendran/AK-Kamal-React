import React from 'react';
import { useAuth } from '../contexts/auth';
import { Link } from 'react-router-dom';
import './style/register.css';

export default function Register() {
  const { register } = useAuth();

  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!formData.email || !formData.password || !formData.name) {
      alert('Please fill in all required fields!');
      return;
    }
    try {
      register(formData.email, formData.password, formData.name);
      // Redirect to login page after successful registration
      window.location.href = '/login';
    } catch (error) {
      alert('Registration failed. Please try again.');
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1 className="register-title">AK Kamal Photography Register</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              className="form-input"
              placeholder="Enter your full name"
              required
              value={formData.name}
              onChange={handleChange}
              id="name"
              name="name"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-input"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
              id="email"
              name="email"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input"
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={handleChange}
              id="password"
              name="password"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input 
              type="password" 
              className="form-input"
              placeholder="Confirm your password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              id="confirmPassword"
              name="confirmPassword"
            />
          </div>
          <button 
            type="submit" 
            className="submit-button"
          >
            Register
          </button>
          <div className="login-link">
            <Link to="/login" className="login-text">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
