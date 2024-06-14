import { User, Otp } from './mongos.js';
import nodemailer from 'nodemailer';

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpEntry = new Otp({ email, otp });
    await otpEntry.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'demoid0077@gmail.com',
        pass: 'fdymgtcqpqfqvsvj'
      }
    });

    const mailOptions = {
      from: 'demoid0077@gmail.com',
      to: email,
      subject: 'SnapMart OTP Verification',
      text: `Your OTP for password reset is ${otp}`
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'OTP sent to email' });
  } catch (error) {
    console.error('Error in forgot password:', error);
    res.status(500).json({ message: 'Failed At Server Side' });
  }
};
