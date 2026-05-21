import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const cards = await prisma.flashcard.findMany({
    where: { userId: null }
  });
  console.log(`Found ${cards.length} global cards in database.`);
  if (cards.length > 0) {
    console.log('First card:', cards[0]);
    console.log('Last card:', cards[cards.length - 1]);
    // Save them to a file as backup
    fs.writeFileSync('db_cards_backup.json', JSON.stringify(cards, null, 2), 'utf8');
  }
}

// Check fs
import fs from 'fs';

main().catch(console.error).finally(() => prisma.$disconnect());
