import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './user.js';

/* ------------------------------- SIGNUP ---------------------------- */
export const signupUser = async (req, res) => {
  try {
    const { name, email, password, role, companyName } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    if (role === 'recruiter' && !companyName) {
      return res.status(400).json({ message: 'Recruiter must include a company name.' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
      companyName: role === 'recruiter' ? companyName : undefined,
    });

    return res.status(201).json({
      message: 'Registration successful',
      email: user.email,
      role: user.role // ✅ ADDED (safe, optional but useful)
    });
  } catch (err) {
    console.error('Signup Error:', err);
    return res.status(500).json({ message: 'Server error.' });
  }
};

/* ------------------------------- LOGIN ---------------------------- */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password required.' });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: 'This email is not registered. Please signup first.' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid email or password.' });

    const payload = { id: user._id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '2h'
    });

    return res.status(200).json({
      message: 'Login successful',
      token,
      role: user.role // ✅ THIS IS WHAT FRONTEND NEEDS
    });
  } catch (err) {
    console.error('Login Error:', err);
    return res.status(500).json({ message: 'Server error.' });
  }
};
