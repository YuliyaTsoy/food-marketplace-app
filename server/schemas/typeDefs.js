const typeDefs = `
type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    store: Store
    orders: [Order]
}

type Store {
    _id: ID
    storeOwner: User!
    storeName: String!
    products: [Product]
}

type Order {
     _id: ID
     orderDate: String
     products: [Product]   
}

type Product {
    _id: ID
    name: String
    price: Float
    description: String
    image: String
    store: Store
    category: [Category]
}

type Category {
    _id: ID
    name: String
}

`;

module.exports = typeDefs;
