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
    category: Category
}

type Category {
    _id: ID
    name: String
}

type Auth {
    token: String!
    user: User
}


type Query {
    product(_id: ID!): Product
    products: [Product]
    users: [User]
    user: User
    categories: [Category]
    store(_id: ID!): Store
    stores: [Store]
    myStore: User
}

type Mutation {
    addUser(username: String!, email: String!, password: String!, storeName: String!): Auth
    addOrder(productId: ID!): User
    login(email: String!, password: String!): Auth
    addProduct(name: String!, price: Float!, description: String!, category: ID!): Product
    addCategory(name: String!): Category
}

`;

module.exports = typeDefs;
