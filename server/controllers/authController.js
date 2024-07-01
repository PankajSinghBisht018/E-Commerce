import User from '../models/userModel.js';
import Otp from '../models/otpModel.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && await user.matchPassword(password)) {
      const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, { expiresIn: '1h' });
      res.json({ token, isAdmin: user.isAdmin });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const signUpUser = async (req, res) => {
  const { email, password, name, phone, address, image, pincode } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = new User({ email, password, name, phone, address, image, pincode });
    await user.save();
    const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'demoid0077@gmail.com',
    pass: 'fdymgtcqpqfqvsvj'
  }
});

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

export const sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = generateOtp();
  try {
    await Otp.create({ email, otp });
    const mailOptions = {
      from:'demoid0077@gmail.com',
      to: email,
      subject: 'OTP for password reset',
      text: `Your OTP is ${otp}`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).json({ message: 'Failed to send OTP' });
      } else {
        res.json({ message: 'OTP sent' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const validOtp = await Otp.findOne({ email, otp });
    if (validOtp) {
      res.json({ message: 'OTP verified' });
    } else {
      res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    const validOtp = await Otp.findOne({ email, otp });
    if (validOtp) {
      const user = await User.findOne({ email });
      if (user) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();
        const token = user.generateAuthToken();
        res.json({ token });
      } else {
        res.status(400).json({ message: 'User not found' });
      }
    } else {
      res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
