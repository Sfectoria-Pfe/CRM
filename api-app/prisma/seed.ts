import { PrismaClient } from '@prisma/client';
import { dataEmployee } from './dataAdmins';
import { dataServices } from './dataServices';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seed() {
  try {
    // Insertion des données des administrateurs

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash('1234', salt);
    await Promise.all(
      dataEmployee.map(
        async (elem) =>
          await prisma.employee.create({
            data: {
              ...elem,
              user: {
                create: {
                  email: elem.email,
                  password: hashedPassword,
                  isClient: false,
                },
              },
            },
          }),
      ),
    );

    console.log('data seeeeded');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Déconnexion du client Prisma
    await prisma.$disconnect();
  }
}

// Exécution de la fonction de semences
seed();
