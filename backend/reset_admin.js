import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@kadastr.uz';
  const rawPassword = 'admin12345';
  
  console.log(`Hashing password for ${email}...`);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(rawPassword, salt);
  
  console.log('Upserting admin user...');
  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      username: 'Admin',
    },
    create: {
      email,
      username: 'Admin',
      password: hashedPassword,
    },
  });

  // Ensure user statistics exist
  await prisma.userStatistics.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      totalSolved: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      accuracy: 0.0,
      streak: 0,
    },
  });

  console.log('Admin user successfully reset/created!');
  console.log('Email:', email);
  console.log('Password:', rawPassword);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
