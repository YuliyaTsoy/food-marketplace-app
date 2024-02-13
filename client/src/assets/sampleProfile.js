import tomatoes from '../assets/samplepics/tomato'

const sampleProfile = {
    _id: "123456785412587455",
    username: "BonoFluff",
    storeName: "Bono sells treats",
    products: [
        {
            id: "1",
            name: "Homemade dog treats",
            description: "these are homemade treats, peanut butter, pumpkin puree, yogurt, and broth",
            image: tomatoes,
            dateListed: "02/13/2024",
            price: 7.80,
            category: {
                _id: "4",
                name: "Pet Food"
            }
        },
        {
            id: "2",
            name: "Homemade cat treats",
            description: "these are homemade treats for felines",
            image: tomatoes,
            dateListed: "02/13/2024",
            price: 7.80,
            category: {
                _id: "4",
                name: "Pet Food"
            }
        },

    ],

}

export default sampleProfile