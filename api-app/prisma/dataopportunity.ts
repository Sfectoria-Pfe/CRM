export const dataopportunity = [
    {
        title: 'opportunity 1',
        equipeId: 1,
        service_Opportunites: {
            prix: 500,
            isPromotion: true,
            discountAmout: 20,
            Service: {
                name: 'Location',
                description: 'Meilleur site pour la location',
                type: 'location',
                price: 400,
                imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU4b_B8qlxrK6yMV7ZQD_zRsR-X_avOEZBFO4LSWBO8g&s',
                details: {
                    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMEIkrG6DyUJDVISPLIbutQfJobMHTq2Ogew&s",
                    description: "Location appartement meublé, luxueux et moderne avec une vue imprenable",
                    address: "Gafsa",
                    price: 100
                }
            }
        }
    },
    {
        title: 'Opportunity 2',
        equipeId: 1,
        service_Opportunites: {
            prix: 500,
            isPromotion: true,
            discountAmout: 20,
            Service: {
                name: 'Vente',
                description: 'String',
                type: 'vente',
                price: 400,
                imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt-c-rVjr7pYxiDXiy5ixFxkVRySIKcQD0fg&s'
            }
        }
    },
    {
        title: 'opportunity 3',
        equipeId: 1,
        service_Opportunites: {
            prix: 500,
            isPromotion: true,
            discountAmout: 20,
            Service: [
                {
                    name: 'bricolage ',
                    description: 'String',
                    type: 'autre',
                    price: 400,
                    imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf7gQYEh4ezlWTBlPXqWJ8iNvpgm3aYdTvvQ&s'
                },
                {
                    name: 'design ',
                    description: 'String',
                    type: 'autre',
                    price: 200,
                    imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8l70UMfXYO6vLizj_8qmUwaYaDCyQLUpHWA&s'
                },
                {
                    name: 'decoration',
                    description: 'String',
                    type: 'autre',
                    price: 200,
                    imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_7KkpArNy9euHPC2_fepDq3C5hqJEfLksNg&s'
                }
            ]
        }
    }
];
