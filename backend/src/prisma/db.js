import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let databaseUrl = process.env.DATABASE_URL;

if (process.env.VERCEL) {
  const bundledDbPath = path.join(__dirname, 'dev.db');
  const tmpDbPath = '/tmp/dev.db';

  try {
    if (!fs.existsSync(tmpDbPath)) {
      console.log(`Copying database from ${bundledDbPath} to ${tmpDbPath}...`);
      fs.mkdirSync(path.dirname(tmpDbPath), { recursive: true });
      if (fs.existsSync(bundledDbPath)) {
        fs.copyFileSync(bundledDbPath, tmpDbPath);
        console.log('Database copied successfully.');
      } else {
        console.warn(`Warning: Bundled database not found at ${bundledDbPath}`);
      }
    } else {
      console.log('Database already exists in /tmp.');
    }
    databaseUrl = `file:${tmpDbPath}`;
  } catch (error) {
    console.error('Failed to copy database to /tmp:', error);
  }
}

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});

export default prisma;
