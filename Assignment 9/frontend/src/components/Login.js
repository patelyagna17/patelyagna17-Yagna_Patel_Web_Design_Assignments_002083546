import React, { useState } from "react";
import "./Login.css";
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios("http://localhost:3001/api/user/login", {
        method: "POST",
        url: "http://localhost:3001/api/login",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json'
        },
        data: JSON.stringify({ username, password }),
      });
      // axios.post()
      if (response.status === 200) {
        console.log("Login successful");
        setLoggedIn(true);
        onLogin();
      } else {
        console.log("Invalid credentials");
        setLoggedIn(false);
        // window.alert("Invalid credentials. Please try again.");
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="login-container">
      {loggedIn ? (
        <div>
          <h2>Welcome, {username}!</h2>
          <p>You are now logged in.</p>
        </div>
      ) : (
        <div className="login-form">
          <h2>Login</h2>
          <form className="input-form">
            <label className="input-label">
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
              />
            </label>
            <br />
            <label className="input-label">
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
            </label>
            <br />
            <button
              type="button"
              onClick={handleLogin}
              className="login-button"
            >
              Login
            </button>
          </form>
        </div>
      )}

      <Modal show={showAlert} onHide={handleCloseAlert}>
        <Modal.Header closeButton>
          <Modal.Title>Invalid Credentials</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your username or password is incorrect. Please try again.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseAlert}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;
