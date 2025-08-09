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
            <Text variant="h1" size="3xl" weight="bold" color="primary" align="center">
              Track Your Job Applications
            </Text>
            <Text variant="p" size="lg" color="secondary" align="center" className="hero-subtitle">
              Stay organized and never lose track of your job applications again. 
              Monitor your progress, manage interviews, and land your dream job.
            </Text>
            <div className="hero-actions">
              <Link to="/register">
                <Button variant="primary" size="lg">
                  Get Started
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
          <Text variant="h2" size="2xl" weight="bold" color="primary" align="center" className="section-title">
            Why Choose JobTracker?
          </Text>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <Text variant="h3" size="lg" weight="semibold" color="primary">
                Track Progress
              </Text>
              <Text variant="p" size="md" color="secondary">
                Monitor your application status from applied to interviewed to hired. 
                Keep track of every opportunity.
              </Text>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <Text variant="h3" size="lg" weight="semibold" color="primary">
                Search & Filter
              </Text>
              <Text variant="p" size="md" color="secondary">
                Quickly find specific applications using our powerful search and 
                filtering capabilities.
              </Text>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <Text variant="h3" size="lg" weight="semibold" color="primary">
                Detailed Records
              </Text>
              <Text variant="p" size="md" color="secondary">
                Store company details, job requirements, contact information, 
                and interview notes all in one place.
              </Text>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <Text variant="h3" size="lg" weight="semibold" color="primary">
                Mobile Friendly
              </Text>
              <Text variant="p" size="md" color="secondary">
                Access your job applications anywhere, anytime. Our responsive 
                design works perfectly on all devices.
              </Text>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <Text variant="h2" size="2xl" weight="bold" color="white" align="center">
              Ready to Get Organized?
            </Text>
            <Text variant="p" size="lg" color="white" align="center" className="cta-subtitle">
              Join thousands of job seekers who have streamlined their application process.
            </Text>
            <Link to="/register">
              <Button variant="secondary" size="lg">
                Start Tracking Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;

