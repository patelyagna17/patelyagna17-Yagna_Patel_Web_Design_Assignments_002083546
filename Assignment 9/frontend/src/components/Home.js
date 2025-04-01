import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import image2 from '../images/job.jpeg';

const Home = () => {
  const navigate = useNavigate();
  const features = [
    {
      title: 'Smart Matching',
      content: 'Our advanced algorithm connects you with the most relevant job opportunities based on your skills and preferences.',
      icon: '🔍'
    },
    {
      title: 'Diverse Opportunities',
      content: 'Access thousands of jobs from top companies across various industries and locations.',
      icon: '🌎'
    },
    {
      title: 'Career Resources',
      content: 'Get access to expert advice, resume tips, and interview preparation tools.',
      icon: '📚'
    }
  ];

  const handleJobsClick = () => {
    navigate('/jobs');
  };

  const handleEmployersClick = () => {
    navigate('/companies');
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Dream Job Today</h1>
          <p className="hero-subtitle">
            Connecting talented professionals with world-class companies through our innovative platform.
          </p>
          <div className="button-group">
            <button className="cta-button" onClick={handleJobsClick}>Search Jobs</button>
            <button className="cta-button secondary" onClick={handleEmployersClick}>For Employers</button>
          </div>
        </div>
        <img src={image2} alt="Career connection" className="hero-image" />
      </div>

      {/* Story Section */}
      <div className="story-section">
        <h2 className="section-title">Our Mission</h2>
        <div className="story-content">
          <p>
            We're dedicated to revolutionizing the job search experience by creating meaningful connections 
            between exceptional talent and forward-thinking companies. Our platform combines cutting-edge 
            technology with human insight to remove barriers in the hiring process and help people find 
            fulfilling careers.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-container">
        <h2 className="section-title">Why Choose Us</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-content">{feature.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;