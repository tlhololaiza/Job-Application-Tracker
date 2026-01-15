import React from 'react';
import { Link } from 'react-router-dom';
import Text from '../../components/Text';
import Button from '../../components/Button';
import './Landing.css';

const Landing: React.FC = () => {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Land Your Dream Job with<br />
              <span className="hero-highlight">Organized Tracking</span>
            </h1>
            <p className="hero-subtitle">
              Stop losing track of applications. JobTracker helps you manage, organize, and stay on top of your entire job search journey.
            </p>
            <div className="hero-actions">
              <Link to="/register">
                <Button variant="primary" size="lg">
                  Start Tracking Free →
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="features-header">
            <h2 className="features-title">Everything You Need to Succeed</h2>
            <p className="features-subtitle">A complete toolkit to organize your job search and maximize your opportunities.</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3>Track Applications</h3>
              <p>Keep all your job applications organized in one place with detailed information.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Smart Filtering</h3>
              <p>Filter and search through your applications by status, company, or role.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Progress Insights</h3>
              <p>See your application stats at a glance with visual progress indicators.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Secure Storage</h3>
              <p>Your data stays private and secure with persistent local storage.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Status Tracking</h3>
              <p>Track each application from applied to interviewed to offer or rejection.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>Clean Interface</h3>
              <p>Modern, distraction-free design so you can focus on your job search.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <h2 className="cta-title">Ready to Get Organized?</h2>
            <p className="cta-text">Join thousands of job seekers who track their applications with JobTracker.</p>
            <Link to="/register">
              <Button variant="secondary" size="lg">
                Create Free Account →
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <footer className="footer">
        <p>© 2026 JobTracker. Built to help you land your dream job.</p>
      </footer>
    </div>
  );
};

export default Landing;

