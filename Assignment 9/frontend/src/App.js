import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate  } from "react-router-dom";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import Jobs from "./components/Jobs";
import Contact from "./components/Contact";
import Login from "./components/Login";
import NavbarComponent from "./components/Navbar";
import Logout from "./components/Logout";
import Company from "./components/Company";

function App() {
  const [isLogged, setLogged] = useState(() => {
    const storedIsLogged = localStorage.getItem("isLogged");
    return storedIsLogged ? JSON.parse(storedIsLogged) : false;
  });

  useEffect(() => {
    localStorage.setItem("isLogged", JSON.stringify(isLogged));
  }, [isLogged]);

  return (
    <Router>
      <div>
        {isLogged && <NavbarComponent onLogout={() => setLogged(false)} />} {/* Pass onLogout here */}
        <Routes>
          <Route
            path="/login"
            element={isLogged ? <Navigate to="/home" /> : <Login onLogin={() => setLogged(true)} />}
          />
          {isLogged && (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/companies" element={<Company />} />
            </>
          )}
          {!isLogged && <Route path="/*" element={<Navigate to="/login" />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
