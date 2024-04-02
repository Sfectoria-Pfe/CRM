import { PrismaClient } from '@prisma/client';
import { dataAdmins } from './dataAdmins';
import { dataServices } from './dataServices';

const prisma = new PrismaClient();

async function seed() {
  try {
    // Insertion des données des administrateurs
    await prisma.admin.createMany({
      data: dataAdmins,
    });

    // Insertion des données de services
    await prisma.service.createMany({
      data: dataServices,
    });

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
