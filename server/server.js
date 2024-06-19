import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { connectDB, User } from './mongos.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { forgotPassword } from './forgotPassword.js';
import { resetPassword, verifyOtp } from './resetPassword.js';

const app = express();
const SECRET_KEY = 'helloworld';

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
    console.log('Signup request received:', email);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Email already exists:', email);
      return res.status(400).json({ message: 'Email already exists' });
    }
    const newUser = new User({ email, password });
    await newUser.save();

    console.log('User saved successfully:', email);
    const token = newUser.generateAuthToken();
    res.json({ message: 'Signup successful', token });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Failed At Server Side' });
  }
});

app.post('/login', async (req, res) => {
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
});


app.post('/forgot-password', forgotPassword);
app.post('/reset-password', resetPassword);
app.post('/verify-otp', verifyOtp);

const auth = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({ message: 'No token given.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next(); 
  } else {
    res.status(403).json({ message: 'Unauthorized' });
  }
};


app.get('/dashboard', auth, isAdmin, (req, res) => {
  res.send('Dashboard');
});

app.get('/site', auth, (req, res) => {
  res.send('Site');
});


app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
