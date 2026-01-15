import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Text from '../../components/Text';
import Button from '../../components/Button';
import { useToast } from '../../context/ToastContext';
import type { User } from '../../types';
import { findUser, migrateOldJobsToUser } from '../../utils/storage';
import './Login.css';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user using utility function
      const user = await findUser(username, password);
      if (user) {
        // Migrate any old jobs to this user's storage
        await migrateOldJobsToUser(user.id);
        onLogin(user);
        showToast('Login successful!', 'success');
        navigate('/home');
      } else {
        showToast('Invalid email or password. Please try again.', 'error');
      }
    } catch (err) {
      showToast('Login failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="form-container">
          <div className="form-header">
            <Text variant="h1" size="2xl" weight="bold" color="primary">
              Welcome Back
            </Text>
            <Text variant="p" size="md" color="secondary">
              Sign in to your JobTracker account
            </Text>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                <Text variant="label" size="sm" weight="medium" color="primary">
                  Username
                </Text>
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <Text variant="label" size="sm" weight="medium" color="primary">
                  Password
                </Text>
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              disabled={!username || !password}
            >
              Sign In
            </Button>
          </form>

          <div className="form-footer">
            <Text variant="p" size="sm" color="secondary">
              Don't have an account?{' '}
              <Link to="/register">
                <Text variant="span" size="sm" weight="medium" color="primary">
                  Sign up here
                </Text>
              </Link>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

