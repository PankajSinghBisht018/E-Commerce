import User from '../models/userModel.js';
import Otp from '../models/otpModel.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && await user.matchPassword(password)) {
      const token = user.generateAuthToken();
      res.json({ token, isAdmin: user.isAdmin });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const signUpUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
    } else {
      const user = new User({ email, password });
      await user.save();
      const token = user.generateAuthToken();
      res.json({ token });
    }
  } catch (error) {
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
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
      const token = user.generateAuthToken();
      res.json({ token });
    } else {
      res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
