import { Role } from "@prisma/client";

export const dataEmployee = [
    {
      cin: '0011223344',
      nom: 'Amri',
      prenom: 'Aymen',
      adresse: 'mourouj',
      email: 'aymen.amri@sfectoria.com',
      telephone: '55180409',
      role:'admin' as Role,
      //datenaissance: new Date(1985, 0, 18), // Utilisation du mois 0 pour janvier
    },
    {
      cin: '55667788',
      nom: 'kraiem',
      prenom: 'khalil',
      adresse: 'la goulette',
      email: 'khalil.kraiem@sfectoria.com',
      telephone: '55180992',
      role:"chef" as Role,
      //datenaissance: new Date(1992, 9, 21), // Utilisation du mois 0 pour janvier
    },
    {
      cin: '123456789',
      nom: 'arji',
      prenom: 'roua',
      adresse: 'gafsa',
      email: 'roua.arji@sfectoria.com',
      telephone: '0000000',
      role:"commercial" as Role,
      //datenaissance: new Date(1992, 9, 21), // Utilisation du mois 0 pour janvier
    },
    {
      cin: '98765432',
      nom: 'fatma',
      prenom: 'ben ali',
      adresse: 'gafsa',
      email: 'fatma.benali@sfectoria.com',
      telephone: '55180992',
      role:"commercial" as Role,
      //datenaissance: new Date(1992, 9, 21), // Utilisation du mois 0 pour janvier
    },
  ];
  