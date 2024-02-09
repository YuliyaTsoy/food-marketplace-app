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

}

`;

module.exports = typeDefs;
