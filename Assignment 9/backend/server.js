const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const cors = require('cors');

const app = express();
const PORT = 3001;
const hostName = '127.0.0.1';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userdb', { useNewUrlParser: true, useUnifiedTopology: true });

// Use CORS middleware before the routes
app.use(cors({
  origin: 'http://localhost:3000',  // Allow only this origin
  optionsSuccessStatus: 200, // For legacy browsers
  credentials: true,  // Enable credentials (cookies, etc.)
}));

// Parse incoming request bodies
app.use(bodyParser.json());

// Define routes
app.use('/api/user/', router);

// Handle preflight requests
app.options('*', cors());

// Start the server
app.listen(PORT, hostName, () => {
  console.log(`Server is running on http://${hostName}:${PORT}`);
});
