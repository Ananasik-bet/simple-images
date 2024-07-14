import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';

const prisma = new PrismaClient();

async function seedUserImages() {
  const users = await prisma.user.findMany();

  const imagesToCreate = 100000;

  const images = Array.from({ length: imagesToCreate }).map(() => {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    return {
      name: 'random file :)',
      hash: crypto.randomBytes(16).toString('hex'),
      link: uuidv4(),
      userId: randomUser.id,
    };
  });

  try {
    await prisma.userImage.createMany({
      data: images,
    });
    console.log(`Seeded ${imagesToCreate} user images.`);
  } catch (error) {
    console.error('Error seeding user images:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedUserImages();
