import { User, Otp } from './mongos.js';

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: 'Email, otp, and newPassword are required' });
    }
    const otpEntry = await Otp.findOne({ email, otp });
    if (!otpEntry) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.password = newPassword;
    user.passwordUpdatedAt = Date.now();
    await user.save();
    console.log('User password updated :', email);
    await Otp.deleteMany({ email });
    const token = user.generateAuthToken();
    res.json({ message: 'Password reset done', token });
  } catch (error) {
    console.error('Error during reset password:', error);
    res.status(500).json({ message: 'Failed to reset password' });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required!!!!!!!' });
    }
    const otpEntry = await Otp.findOne({ email, otp });
    if (!otpEntry) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
    res.json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error in OTP checking:', error);
    res.status(500).json({ message: 'cant verify the OTP' });
  }
};
