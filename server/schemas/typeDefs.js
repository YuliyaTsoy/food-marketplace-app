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

}

type Order {
     _id: ID
     orderDate: String
     products: [Product]   
}

type Product {

}

`;

module.exports = typeDefs;
