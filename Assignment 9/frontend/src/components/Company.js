import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./Company.css";
import { Figure } from "react-bootstrap";

function Company() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch(`http://localhost:3001/api/user/images`);
        if (!response.ok) throw new Error("Failed to fetch images");
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, []);

  return (
    <div className="company-showcase">
      <header className="showcase-header">
        <h1>Trusted by Leading Companies</h1>
        <p>Discover the organizations partnering with our platform</p>
      </header>

      {loading && <div className="loading-spinner"></div>}

      {error && <p className="error-message">{`Error: ${error}`}</p>}

      <div className="company-grid">
        {images.map((image, index) => (
          <div key={index} className="company-card">
            <div className="logo-container">
              <img 
                src={image.image} 
                alt={image.name}
                className="company-logo"
              />
            </div>
            <h3 className="company-name">{image.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Company;