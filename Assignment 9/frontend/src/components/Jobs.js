import React from "react";
import JobCard from "./JobCard";
import "./Jobs.css";

const Jobs = () => {
  const jobList = [
    {
      id: 1,
      title: 'Full Stack Developer',
      company: 'Tech Innovations Inc.',
      location: 'San Francisco, CA (Remote)',
      description: 'Join our dynamic team to work on cutting-edge technologies. Develop and maintain sophisticated web applications for our diverse client base.',
      lastUpdated: 'Last updated 2 days ago',
      applyLink: 'https://example.com/apply/full-stack-developer',
    },
    {
      id: 2,
      title: 'Digital Marketing Specialist',
      company: 'Digital Growth Agency',
      location: 'New York, NY (Hybrid)',
      description: 'Elevate our digital marketing strategies to promote our innovative products. Proficiency in SEO, SEM, and social media marketing is highly valued.',
      lastUpdated: 'Last updated 1 day ago',
      applyLink: 'https://example.com/apply/digital-marketing-specialist',
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      company: 'Creative Solutions LLC',
      location: 'Austin, TX (On-site)',
      description: 'Shape engaging user experiences and create visually captivating designs. Work alongside cross-functional teams to turn ideas into reality.',
      lastUpdated: 'Last updated 4 hours ago',
      applyLink: 'https://example.com/apply/ux-ui-designer',
    },
    {
      id: 4,
      title: 'Data Scientist',
      company: 'Analytics Pioneers',
      location: 'Boston, MA (Remote)',
      description: 'Leverage advanced analytics and machine learning to uncover insights from vast data sets. Proficiency with Python and R is a must.',
      lastUpdated: 'Last updated 3 days ago',
      applyLink: 'https://example.com/apply/data-scientist',
    },
    {
      id: 5,
      title: 'Customer Support Representative',
      company: 'Service Excellence Co.',
      location: 'Chicago, IL (On-site)',
      description: 'Deliver unparalleled customer service and support. Exceptional communication skills and a knack for solving problems are key.',
      lastUpdated: 'Last updated 6 hours ago',
      applyLink: 'https://example.com/apply/customer-support-representative',
    }
  ];

  return (
    <div className="jobs-container">
      <h2>Available Career Opportunities</h2>
      {jobList.map((job) => (
        <div key={job.id} className="job-card">
          <h3 className="job-card-title">{job.title}</h3>
          <div className="job-card-company">{job.company}</div>
          <div className="job-card-location">{job.location}</div>
          <p className="job-card-description">{job.description}</p>
          <div className="job-card-updated">{job.lastUpdated}</div>
          <a 
            href={job.applyLink} 
            className="apply-button"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Apply Now
          </a>
        </div>
      ))}
    </div>
  );
};

export default Jobs;