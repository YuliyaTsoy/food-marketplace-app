const typeDefs = `
type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    store: Store
    orders: [Product]
}

type Store {
    _id: ID
    storeOwner: User!
    storeName: String!
    products: [Product]
}

type Product {
    _id: ID
    name: String
    price: Float
    description: String
    image: String
    store: Store
    dateListed: String
    category: [Category]
}

type Category {
    _id: ID
    name: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    product(_id: ID!): Product
    products(category: ID, name: String): [Product]
    user: User
    order(_id: ID!): Order
    categories: [Category]
    store(_id: ID!): Store
    stores: [Store]
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    login(email: String!, password: String!): Auth
    addProduct(name: String!, price: Float!, description: String!, category: ID!): Product
    createStore(storeName: String!, storeOwner: String!): Store
}

`;

module.exports = typeDefs;
