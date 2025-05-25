import React from 'react';
import { useAuth } from '../contexts/auth';
import { Link } from 'react-router-dom';
import './style/login.css';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const { login } = useAuth();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-title">AK Kamal Photography Login</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-input"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
            />
          </div>
          <button type="submit" className="submit-button">
            Login
          </button>
          <div className="register-link">
            <Link to="/register" className="register-text">
              Don't have an account? Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

