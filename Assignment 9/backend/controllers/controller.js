const service = require('../services/service');

const loginController = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await service.validateUser(username, password);
    console.log('user value is', user);

    if (user) {
      console.log('Login successful');
      res.status(200).json({ message: 'Login successful' });
    } else {
      console.log('Invalid credentials');
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { loginController };
