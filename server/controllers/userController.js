import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const newUser = new User({ email, password });
    await newUser.save();
    const token = newUser.generateAuthToken();
    res.json({ message: 'Signup successful', token });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Failed At Server Side' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();
    res.json({ message: 'Login successful', token, isAdmin: user.isAdmin });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Failed At Server Side' });
  }
};
