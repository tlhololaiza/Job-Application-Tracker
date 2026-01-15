import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Text from '../../components/Text';
import Button from '../../components/Button';
import { useToast } from '../../context/ToastContext';
import type { User } from '../../types';
import { userExists, saveUser } from '../../utils/storage';
import './Register.css';

interface RegisterProps {
  onRegister: (user: User) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
      }

      if (password.length < 6) {
        showToast('Password must be at least 6 characters long', 'error');
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (await userExists(username)) {
        showToast('Username already exists', 'error');
        return;
      }

      const newUser: User = {
        id: Date.now().toString(),
        username,
        password
      };

      await saveUser(newUser);
      
      showToast('Account created successfully!', 'success');
      onRegister(newUser);
      navigate('/home');
    } catch (err) {
      showToast('Registration failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="container">
        <div className="form-container">
          <div className="form-header">
            <Text variant="h1" size="2xl" weight="bold" color="primary">
              Create Account
            </Text>
            <Text variant="p" size="md" color="secondary">
              Join JobTracker and start organizing your job search
            </Text>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
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
                placeholder="Choose a username"
                required
                disabled={loading}
                minLength={3}
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
                placeholder="Create a password"
                required
                disabled={loading}
                minLength={6}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                <Text variant="label" size="sm" weight="medium" color="primary">
                  Confirm Password
                </Text>
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                disabled={loading}
                minLength={6}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              disabled={!username || !password || !confirmPassword}
            >
              Create Account
            </Button>
          </form>

          <div className="form-footer">
            <Text variant="p" size="sm" color="secondary">
              Already have an account?{' '}
              <Link to="/login">
                <Text variant="span" size="sm" weight="medium" color="primary">
                  Sign in here
                </Text>
              </Link>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

