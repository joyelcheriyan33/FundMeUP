const User = require('../models/users');
const jwt = require('jsonwebtoken');

// Register
exports.register = async (req, res) => {
    const { name, email, password, isAdmin= false } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = new User({ name, email, password, isAdmin});
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Registration failed' });
    }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    //  Create JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email, isAdmin: user.isAdmin, },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, }
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};

