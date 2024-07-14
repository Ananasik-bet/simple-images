import { PrismaClient, Role } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { hash } from 'argon2';

const prisma = new PrismaClient();

async function seedUsers() {
  const usersToCreate = 10000;
  const password = await hash('password');
  const users = Array.from({ length: usersToCreate }).map(() => ({
    email: `user${uuidv4()}@example.com`,
    name: `User ${uuidv4().substring(0, 8)}`,
    city: 'City',
    password: password,
    role: Role.USER,
  }));

  try {
    await prisma.user.createMany({
      data: users,
    });
    console.log(`Seeded ${usersToCreate} users.`);
  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedUsers();
