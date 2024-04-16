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
    const employees = await Promise.all(
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
    const category = await prisma.categorieClient.create({
      data: {
        nom: 'String',
        description: 'String',
      },
    });
    const equipe = await prisma.equipe.create({
      data: {
        nom_equipe: 'String',
        nombre: 1,
        chefId: employees[0].id,
      },
    });
    const opportunity = await prisma.opportunite.create({
      data: {
        title: 'String',
        equipeId: equipe.id,
      },
    });
    await prisma.promotion.create({
      data: {
        date_debut: new Date('10-10-2023').toISOString(),
        date_fin: new Date('10-1-2024').toISOString(),
        description: 'test',
        pourcentage: 10,
        opportuniteId: opportunity.id,
        categorieClientId: category.id,
      },
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
