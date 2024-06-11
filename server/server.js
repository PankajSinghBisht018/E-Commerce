import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { connectDB, User } from './mongos.js';

const app = express();

connectDB();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Request body:', req.body);
  next();
});

app.get('/', (req, res) => {
  res.send('Welcome to SnapMart!');
});

app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists!' });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    res.json({ message: 'Signup done', status: 'success' });
  } catch (error) {
    console.error('Error in signup:', error);
    res.status(500).json({ message: 'error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (user) {
      res.json({ message: 'Login successful', status: 'success' });
    } else {
      res.status(401).json({ message: 'Invalid email' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});