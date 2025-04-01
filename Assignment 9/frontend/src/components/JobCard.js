import React from 'react';

const JobCard = ({ jobId, title, description,lastUpdated, applyLink}) => {
  return (
    <div className="job-card">
      <h3>{title}</h3>
      <p>Job ID: {jobId}</p>
      {/* <p>{company}</p> */}
      <p>{description}</p>
      <p>{lastUpdated}</p>
      <a href={applyLink} target="_blank">{applyLink}</a> 
    </div>
  );
};

export default JobCard;