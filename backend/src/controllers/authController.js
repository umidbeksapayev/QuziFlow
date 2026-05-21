import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/db.js';

// Generate Token helper
const generateToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ message: 'Barcha maydonlarni to\'ldiring' });
    }

    // Check if user exists
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return res.status(400).json({ message: 'Ushbu email ro\'yxatdan o\'tgan' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user and stats atomically in a transaction
    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
        },
      });

      await tx.userStatistics.create({
        data: {
          userId: newUser.id,
          totalSolved: 0,
          correctAnswers: 0,
          wrongAnswers: 0,
          accuracy: 0.0,
          streak: 0,
        },
      });

      return newUser;
    });

    return res.status(201).json({
      id: user.id,
      email: user.email,
      username: user.username,
      token: generateToken(user.id, user.email),
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ message: 'Serverda xatolik yuz berdi' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email va parolni kiriting' });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: 'Email yoki parol noto\'g\'ri' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email yoki parol noto\'g\'ri' });
    }

    return res.json({
      id: user.id,
      email: user.email,
      username: user.username,
      token: generateToken(user.id, user.email),
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Serverda xatolik yuz berdi' });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        statistics: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
    }

    return res.json(user);
  } catch (error) {
    console.error('GetMe error:', error);
    return res.status(500).json({ message: 'Serverda xatolik yuz berdi' });
  }
};
