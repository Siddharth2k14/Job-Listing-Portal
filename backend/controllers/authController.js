import User from '../models/user.js';
import bcrypt from 'bcryptjs';

export const signupUser = async (req, res) => {
  const { name, email, password, role, companyName } = req.body;

  if (role === 'recruiter' && !companyName) {
    return res.status(400).json({ message: 'Recruiter sign-up requires a company name.' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newOTP = Math.floor(100000 + Math.random() * 900000).toString(); 
    const otpExpiration = new Date(Date.now() + 10 * 60 * 1000); 

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      companyName: role === 'recruiter' ? companyName : undefined,
      otp: newOTP,
      otpExpires: otpExpiration,
    });

    if (newUser) {
  
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        message: 'Registration successful. Please verify your email with the OTP.',
      });
    }

  } catch (error) {
    console.error(`Signup Error: ${error.message}`);
    res.status(500).json({ message: 'Server error.' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {

      if (!user.isVerified) {
        return res.status(401).json({ message: 'Account not verified. Please verify your email.' });
      }

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        message: 'Login successful.',
      });
      
    } else {
      res.status(401).json({ message: 'Invalid email or password.' });
    }
  } catch (error) {
    console.error(`Login Error: ${error.message}`);
    res.status(500).json({ message: 'Server error.' });
  }
};
