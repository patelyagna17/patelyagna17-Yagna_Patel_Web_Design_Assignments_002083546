import React from 'react';
import image9 from '../images/team2.jpg';
import './about.css';

const AboutUs = () => {
  const cardData = [
    { 
      title: 'Our Vision',
      content: 'The traditional job market was failing everyone—employers couldn’t find the right people, and talented professionals were lost in a sea of irrelevant opportunities. We saw a system in need of reinvention.So we assembled a team of innovators—former recruiters frustrated by outdated processes, engineers passionate about building meaningful solutions, and job seekers who knew firsthand how broken the experience was. Together, we challenged the status quo, fueled by ambition, caffeine, and a shared belief that hiring could—and should—be better.That’s how Synergy was born. Today, we’re more than a platform—we’re a movement. By combining cutting-edge technology with deep industry expertise, we’re transforming how companies and talent connect. Our mission is simple: to create meaningful matches that drive growth—for businesses, careers, and the future of work itself.Because when the right people find the right opportunities, everyone wins.',
    },
    { 
      title: 'Our Team', 
      content: 'Meet our dedicated team of professionals who are revolutionizing the hiring experience. We combine decades of recruitment expertise with cutting-edge technology to create meaningful connections that last.',
      imageSrc: image9,
    }
  ];

  return (
    <div className="about-container">
      <h2 className="about-title">About Growth</h2>
      {cardData.map((card, index) => (
        <div key={index} className="about-card">
          {card.title && <h3>{card.title}</h3>}
          {card.imageSrc && <img src={card.imageSrc} alt="Our Team" className="team-image" />}
          <p className={card.title === 'Our Team' ? 'team-content' : 'story-content'}>
            {card.content}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AboutUs;