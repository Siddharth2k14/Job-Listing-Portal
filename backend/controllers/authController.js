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
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
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
    text: `Your OTP is: ${otp}\nIt expires in 10 minutes.`,
  });
};

export const signupUser = async (req, res) => {
  try {
    const { name, email, password, role, companyName } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    if (role === 'recruiter' && !companyName) {
      return res.status(400).json({
        message: 'Recruiters must provide a company name.',
      });
    }

    const existing = await User.findOne({ email });
    if (existing)
      return res
        .status(400)
        .json({ message: 'User already exists with this email.' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      companyName: role === 'recruiter' ? companyName : undefined,
    });

    return res.status(201).json({
      message: 'Registration successful. You can now log in.',
      email: newUser.email,
    });
  } catch (err) {
    console.error('Signup Error:', err);
    return res.status(500).json({ message: 'Server error.' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: 'Email and password are required.' });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({
        message: 'This email is not registered. Kindly sign up first.',
      });

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches)
      return res.status(401).json({
        message: 'Invalid email or password.',
      });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    user.otp = otp;
    user.otpExpires = expiresAt;
    user.isVerified = false;
    await user.save();

    await sendOtpEmail(email, otp);

    const devOtp =
      process.env.NODE_ENV === 'development'
        ? { otp }
        : {};

    return res.status(200).json({
      message: 'OTP sent to registered email. Please verify to continue.',
      ...devOtp,
    });
  } catch (err) {
    console.error('Login Error:', err);
    return res.status(500).json({ message: 'Server error.' });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp)
      return res
        .status(400)
        .json({ message: 'Email and OTP are required.' });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({
        message: 'This email is not registered. Kindly sign up first.',
      });

    if (!user.otp || !user.otpExpires || user.otpExpires < new Date())
      return res.status(401).json({ message: 'Invalid or expired OTP.' });

    if (user.otp !== otp)
      return res.status(401).json({ message: 'Invalid OTP.' });

    user.otp = undefined;
    user.otpExpires = undefined;
    user.isVerified = true;
    await user.save();

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    });

    return res.status(200).json({
      message: 'Login successful.',
      token,
    });
  } catch (err) {
    console.error('Verify OTP Error:', err);
    return res.status(500).json({ message: 'Server error.' });
  }
};


