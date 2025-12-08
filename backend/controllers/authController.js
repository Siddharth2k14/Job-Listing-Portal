
import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './user.js';
import nodemailer from 'nodemailer';

const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return null;
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });
};

const sendOtpEmail = async (email, otp) => {
  const transporter = createTransporter();
  if (!transporter) {
    console.log(`[DEV] OTP for ${email}: ${otp}`);
    return;
  }
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Login OTP',
    text: `Your OTP: ${otp}. It expires in 10 minutes.`,
  });
};

// Signup
export const signupUser = async (req, res) => {
  try {
    const { name, email, password, role, companyName } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }
    if (role === 'recruiter' && !companyName) {
      return res.status(400).json({ message: 'Recruiter sign-up requires a company name.' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists.' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({
      name, email, password: hashed, role,
      companyName: role === 'recruiter' ? companyName : undefined,
    });

    return res.status(201).json({ message: 'Registration successful', email: user.email });
  } catch (err) {
    console.error('Signup Error:', err);
    return res.status(500).json({ message: 'Server error.' });
  }
};

// Login -> verify password -> create OTP & send
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required.' });

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'this email is not registered, kindly signup first' });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpires = otpExpires;
    user.isVerified = false;
    await user.save();

    await sendOtpEmail(user.email, otp);

    // Only in development send otp back for easy testing
    const devOtp = process.env.NODE_ENV === 'development' ? { otp } : {};

    return res.status(200).json({
      message: 'OTP sent to registered email. Verify to complete login.',
      ...devOtp,
    });
  } catch (err) {
    console.error('Login Error:', err);
    return res.status(500).json({ message: 'Server error.' });
  }
};

// Verify OTP -> issue JWT
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: 'Email and otp required.' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'this email is not registered, kindly signup first' });

    if (!user.otp || !user.otpExpires || user.otpExpires < new Date()) {
      return res.status(401).json({ message: 'invalid otp' });
    }

    if (user.otp !== otp) {
      return res.status(401).json({ message: 'invalid otp' });
    }

    // success: clear otp, set verified
    user.otp = undefined;
    user.otpExpires = undefined;
    user.isVerified = true;
    await user.save();

    const payload = { id: user._id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    });

    return res.status(200).json({ message: 'Logged in successfully', token });
  } catch (err) {
    console.error('Verify OTP Error:', err);
    return res.status(500).json({ message: 'Server error.' });
  }
};
