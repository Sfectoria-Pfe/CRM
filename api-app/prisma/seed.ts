import { PrismaClient } from '@prisma/client';
import { dataEmployee } from './dataAdmins';
import { dataServices } from './dataServices';
import * as bcrypt from 'bcrypt';
import { dataClient } from './dataClient';
import { dataLocation, dataVente } from './dataLocation';

const prisma = new PrismaClient();

async function seed() {
  try {
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
            include: {
              user: true,
            },
          }),
      ),
    );
    const category = await prisma.categorieClient.create({
      data: {
        nom: 'Fidele',
        description: 'Clients fidèles et réguliers',
      },
    });
    const category2 = await prisma.categorieClient.create({
      data: {
        nom: 'Nouveau',
        description: 'Nouveaux clients récemment acquis',
      },
    });
    const category3 = await prisma.categorieClient.create({
      data: {
        nom: 'Perdu',
        description: 'Clients perdus ou inactifs',
      },
    });
    const equipe = await prisma.equipe.create({
      data: {
        nom_equipe: 'String',
        chefId: employees[0].id,
      },
    });
    const opportunity = await prisma.opportunite.create({
      data: {
        title: 'String',
        equipeId: equipe.id,
      },
    });
    const service1 = await prisma.service.create({
      data: {
        name: 'String',
        description: 'String',
        type: 'location',
        price: 400,
        imageURL:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU4b_B8qlxrK6yMV7ZQD_zRsR-X_avOEZBFO4LSWBO8g&s',
      },
    });
    const service2 = await prisma.service.create({
      data: {
        name: 'String2',
        description: 'String2',
        type: 'location',
        price: 400,
        imageURL:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU4b_B8qlxrK6yMV7ZQD_zRsR-X_avOEZBFO4LSWBO8g&s',
      },
    });
    

    const servicesOpportunities1 = await prisma.service_Opportunite.create({
      data: {
        prix: 500,
        isPromotion: true,
        discountAmout: 20,
        opportuniteId: opportunity.id,
        serviceId: service1.id,
      },
    });
    const servicesOpportunities2 = await prisma.service_Opportunite.create({
      data: {
        prix: 500,
        isPromotion: true,
        discountAmout: 20,
        opportuniteId: opportunity.id,
        serviceId: service2.id,
      },
    });

    const opportunity1 = await prisma.opportunite.create({
      data: {
        title: 'Opportunity 1',
        equipeId: equipe.id,
        service_Opportunites: {
          create: {
            prix: 500,
            isPromotion: true,
            discountAmout: 20,
            Service: {
              create: {
                name: 'Vente',
                description: 'Description de la vente',
                type: 'vente',
                price: 400,
                imageURL:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBNeE0c29TP4t1CBvhqMvzkb29y8kDPMG7rA&s',
              },
            },
          },
        },
      },
    });
    const opportunity2 = await prisma.opportunite.create({
      data: {
        title: 'Opportunity 2',
        equipeId: equipe.id,
        service_Opportunites: {
          create: {
            prix: 500,
            isPromotion: true,
            discountAmout: 20,
            Service: {
              create: {
                name: 'Location',
                description: 'Description de Notre service',
                type: 'vente',
                price: 400,
                imageURL:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBNeE0c29TP4t1CBvhqMvzkb29y8kDPMG7rA&s',
              },
            },
          },
        },
      },
    });
    const opportunity3 = await prisma.opportunite.create({
      data: {
        title: 'Opportunity 3',
        equipeId: equipe.id,
        service_Opportunites: {
          create: {
            prix: 500,
            isPromotion: true,
            discountAmout: 20,
            Service: {
              create: {
                name: 'Decoration',
                description: 'Description de la vente',
                type: 'autre',
                price: 400,
                imageURL:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjQEtei7v_F9hz-_cPySQGnswzdjQlwCFADQ&s',
              },
            },
          },
        },
      },
    });
    const stage1 = await prisma.stage.create({
      data: {
        nom: 'Stage 1',
        opportuniteId: opportunity1.id, // Assuming you have an 'opportunity1' object from your previous code
      },
    });
    const stage2 = await prisma.stage.create({
      data: {
        nom: 'Stage 2',
        opportuniteId: opportunity2.id, // Assuming you have an 'opportunity2' object from your previous code
      },
    });
    const stage3 = await prisma.stage.create({
      data: {
        nom: 'Stage 3',
        opportuniteId: opportunity3.id, // Assuming you have an 'opportunity3' object from your previous code
      },
    });

    const currentDate = new Date();
    const clients = await Promise.all(
      dataClient.map(
        async (elem) =>
          await prisma.client.create({
            data: {
              ...elem,
              user: {
                create: {
                  email: elem.email,
                  password: hashedPassword,
                  isClient: true,
                },
              },
            },
            include: { user: true },
          }),
         
      ),
    );

    const randomDate = (start, end) => {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };
    
    // Define the range for random dates (e.g., last 6 months)
    // const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, 1); // Start date (6 months ago)
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0); // End date (last day of the previous month)
    
    
    // Array containing data for 15 StageClient entries with different values and random createdAt dates
    const stageClientData = Array(15).fill(null).map((_, index) => ({
      description: `Stage Client ${index + 1}`,
      win: index % 2 === 0, // Alternate between true and false for win field
      archived: index % 2 === 0, // Alternate between true and false for archived field
      clientId: index % 5 + 1, // Assign clientId from 1 to 5 in a loop
      stageId: stage2.id, // Assuming you have a 'stage2' object from the first code snippet
      createdAt: randomDate(startDate, endDate), // Generate a random date within the defined range
    }));
    

// Adding Stage Clients with different creation dates
const createdStageClients = await Promise.all(
  stageClientData.map(async (data) => {
    const stageClient = await prisma.stageClient.create({
      data,
    });
    return stageClient;
  })
);
    await prisma.promotion.create({
      data: {
        date_debut: new Date('10-10-2023').toISOString(),
        description: 'test',
        pourcentage: 10,
        opportuniteId: opportunity.id,
        categorieClientId: category.id,
      },
    });
   
    
    console.log(clients[0].user[0]);
    
    const locations = await prisma.location.createMany({
      data: dataLocation,
    });
    const ventes = await prisma.vente.createMany({
      data: dataVente,
    });

    const msgs = await prisma.msgsClient.createMany({
      data: [
        {
          senderId: clients[0].user[0].id,
         
          opportunityId: 1,
          content: 'hello',
        },
        {
          senderId: employees[0].user[0].id,
          receiverId: clients[0].user[0].id,
          opportunityId: 1,
          content: 'hi',
        },
        {
          senderId: clients[0].user[0].id,
          opportunityId: 1,
          content: 'cv',
        },
        {
          senderId: employees[0].user[0].id,
          receiverId: clients[0].user[0].id,
          opportunityId: 1,
          content: 'labes',
        },
        {
          senderId: clients[1].user[0].id,
          opportunityId: 1,
          content: 'hello',
        },
        {
          senderId: employees[0].user[0].id,
          receiverId: clients[1].user[0].id,
          opportunityId: 1,
          content: 'hi',
        },
       
      ],
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
